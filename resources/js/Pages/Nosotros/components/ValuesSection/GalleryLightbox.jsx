import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export default function GalleryLightbox({ isOpen, images = [], activeIndex = 0, onClose, onPrev, onNext }) {
    const [imgLoading, setImgLoading] = useState(false);
    const touchStartX = useRef(null);

    // 1. Bloqueo de scroll en el fondo mientras el visor está abierto (evita repintados de la página)
    useEffect(() => {
        if (!isOpen) return;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    // 2. Controles de teclado
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onPrev, onNext, onClose]);

    // 3. Pre-carga inteligente de la imagen siguiente y anterior en segundo plano
    useEffect(() => {
        if (!isOpen || !images.length) return;
        
        const nextIdx = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
        const prevIdx = activeIndex === 0 ? images.length - 1 : activeIndex - 1;

        if (images[nextIdx]) {
            const nextImg = new Image();
            nextImg.src = images[nextIdx];
        }
        if (images[prevIdx]) {
            const prevImg = new Image();
            prevImg.src = images[prevIdx];
        }
    }, [isOpen, activeIndex, images]);

    if (!isOpen || !images.length) return null;

    const currentImgUrl = images[activeIndex];

    // Soporte táctil para deslizar (swipe) en móviles
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const deltaX = touchStartX.current - e.changedTouches[0].clientX;
        if (deltaX > 45) {
            onNext();
        } else if (deltaX < -45) {
            onPrev();
        }
        touchStartX.current = null;
    };

    return (
        <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center select-none will-change-transform"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Fondo clicable para cerrar */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

            {/* Barra superior de controles */}
            <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 flex items-center justify-between z-50 text-white pointer-events-none">
                <span className="text-xs font-black tracking-wider uppercase bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 shadow-sm pointer-events-auto">
                    {activeIndex + 1} / {images.length}
                </span>
                
                <button 
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 flex items-center justify-center transition-all cursor-pointer pointer-events-auto border border-white/10"
                    aria-label="Cerrar visor"
                >
                    <X className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Flecha Izquierda */}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                }}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 flex items-center justify-center transition-all text-white cursor-pointer border border-white/10 shadow-lg"
                aria-label="Imagen anterior"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Flecha Derecha */}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                }}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 flex items-center justify-center transition-all text-white cursor-pointer border border-white/10 shadow-lg"
                aria-label="Siguiente imagen"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Contenedor de la Imagen Activa con aceleración por hardware */}
            <div className="relative max-w-[92%] max-h-[82%] flex items-center justify-center pointer-events-none">
                {imgLoading && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/50">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                )}
                <img 
                    key={currentImgUrl}
                    src={currentImgUrl} 
                    alt={`Foto ${activeIndex + 1}`} 
                    loading="eager"
                    decoding="async"
                    onLoadStart={() => setImgLoading(true)}
                    onLoad={() => setImgLoading(false)}
                    onError={() => setImgLoading(false)}
                    className="max-w-full max-h-[82vh] rounded-2xl object-contain shadow-2xl pointer-events-auto cursor-zoom-out transition-opacity duration-200"
                    onClick={onClose}
                />
            </div>

            {/* Miniaturas inferiores para navegación rápida directa */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 max-w-[90vw] overflow-x-auto no-scrollbar py-1 px-3 rounded-full bg-black/60 border border-white/10">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                const diff = i - activeIndex;
                                if (diff > 0) {
                                    for (let step = 0; step < diff; step++) onNext();
                                } else if (diff < 0) {
                                    for (let step = 0; step < Math.abs(diff); step++) onPrev();
                                }
                            }}
                            className={`w-7 h-7 rounded-lg overflow-hidden transition-all border ${
                                i === activeIndex 
                                    ? 'border-white scale-110 shadow-md ring-2 ring-white/40' 
                                    : 'border-transparent opacity-50 hover:opacity-100'
                            }`}
                            aria-label={`Ir a foto ${i + 1}`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
