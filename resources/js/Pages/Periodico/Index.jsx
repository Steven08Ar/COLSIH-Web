import { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { PageFlip } from 'page-flip';
import { 
    ChevronLeft, 
    ChevronRight, 
    ZoomIn, 
    ZoomOut, 
    Volume2, 
    VolumeX, 
    Download, 
    BookOpen
} from 'lucide-react';

const TOTAL_PAGES = 51;
const PDF_URL = '/periodico/PERIODICO%20COLEGIO%20SANTA%20ISABEL%20DE%20HUNGRIA.pdf';

// Array con las rutas de las 51 páginas optimizadas en alta definición
const PAGE_IMAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `/periodico/paginas/pagina_${num}.jpg`;
});

export default function PeriodicoIndex() {
    const bookContainerRef = useRef(null);
    const pageFlipRef = useRef(null);
    const audioCtxRef = useRef(null);

    const [currentPage, setCurrentPage] = useState(0); // 0-indexed
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [reinitKey, setReinitKey] = useState(0);

    const dragStartRef = useRef({ x: 0, y: 0 });
    const panStartRef = useRef({ x: 0, y: 0 });
    const isPinchingRef = useRef(false);
    const initialPinchDistRef = useRef(null);
    const initialPinchZoomRef = useRef(1);

    // Sintetizador Web Audio API original para el sonido de paso de hoja realista
    const playPaperSound = () => {
        if (!soundEnabled) return;
        try {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            // Generar ráfaga corta de ruido filtrado simulando el roce suave y crujido del papel
            const bufferSize = ctx.sampleRate * 0.22;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1100, ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.2);
            filter.Q.setValueAtTime(1.5, ctx.currentTime);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.01, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.21);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start(ctx.currentTime);
            noise.stop(ctx.currentTime + 0.22);
        } catch (e) {}
    };

    // Detectar cambios entre móvil y escritorio para reajustar fluidamente el flipbook
    useEffect(() => {
        let lastIsMobile = window.innerWidth < 768;
        const handleResize = () => {
            const currentIsMobile = window.innerWidth < 768;
            if (currentIsMobile !== lastIsMobile) {
                lastIsMobile = currentIsMobile;
                setIsLoading(true);
                setReinitKey(prev => prev + 1);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Inicializar el libro interactivo StPageFlip altamente optimizado
    useEffect(() => {
        let isMounted = true;
        const container = bookContainerRef.current;
        if (!container) return;

        const timer = setTimeout(() => {
            if (!container || !isMounted) return;

            try {
                container.innerHTML = '';
                const isMobileScreen = window.innerWidth < 768;
                const winW = window.innerWidth;
                const winH = window.innerHeight;

                // En móvil: Calculamos dimensiones óptimas para que la página sea mucho más grande
                // Aspect ratio real del periódico = ~1.646
                const mobileWidth = Math.min(winW - 16, 480);
                const mobileHeight = Math.min(Math.round(mobileWidth * 1.62), Math.floor(winH - 125));

                const desktopWidth = 560;
                const desktopHeight = 860;

                const pageFlip = new PageFlip(container, {
                    width: isMobileScreen ? mobileWidth : desktopWidth,
                    height: isMobileScreen ? mobileHeight : desktopHeight,
                    size: 'stretch',
                    // En móvil, minWidth alto garantiza que SIEMPRE se mantenga en modo portrait de 1 sola página
                    minWidth: isMobileScreen ? 800 : 280,
                    maxWidth: isMobileScreen ? 600 : 1650,
                    minHeight: isMobileScreen ? 400 : 420,
                    maxHeight: isMobileScreen ? 1200 : 1350,
                    maxShadowOpacity: 0,
                    showCover: !isMobileScreen, // En móvil portrait, cada página (0..50) se visualiza completa
                    mobileScrollSupport: false,
                    usePortrait: isMobileScreen,
                    startPage: 0,
                    drawShadow: false, // Sin cálculo de sombras en canvas para máxima fluidez a 60 FPS
                    flippingTime: 420, // Animación natural de paso de hoja
                    useMouseEvents: true,
                    swipeDistance: 20,
                    clickEventForward: true
                });

                pageFlip.loadFromImages(PAGE_IMAGES);

                pageFlip.on('init', () => {
                    if (isMounted) {
                        setIsLoading(false);
                    }
                });

                pageFlip.on('flip', (e) => {
                    if (isMounted) {
                        setCurrentPage(e.data);
                        playPaperSound();
                    }
                });

                pageFlipRef.current = pageFlip;
            } catch (err) {
                console.error('Error al inicializar PageFlip:', err);
                if (isMounted) setIsLoading(false);
            }
        }, 100);

        return () => {
            isMounted = false;
            clearTimeout(timer);
            if (pageFlipRef.current) {
                try {
                    pageFlipRef.current.destroy();
                } catch (e) {}
                pageFlipRef.current = null;
            }
        };
    }, [reinitKey]);

    // Manejo de teclado (flechas ← y →)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!pageFlipRef.current) return;
            if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
                e.preventDefault();
                pageFlipRef.current.flipNext();
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                pageFlipRef.current.flipPrev();
            } else if (e.key === 'Home') {
                e.preventDefault();
                pageFlipRef.current.turnToPage(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                pageFlipRef.current.turnToPage(TOTAL_PAGES - 1);
            } else if (e.key === 'Escape') {
                if (zoomLevel > 1) resetZoom();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [zoomLevel]);

    const flipNext = () => {
        if (pageFlipRef.current) pageFlipRef.current.flipNext();
    };

    const flipPrev = () => {
        if (pageFlipRef.current) pageFlipRef.current.flipPrev();
    };

    const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.35, 2.8));
    const zoomOut = () => {
        setZoomLevel(prev => {
            const next = Math.max(prev - 0.35, 1.0);
            if (next <= 1.0) {
                setPanOffset({ x: 0, y: 0 });
            }
            return next;
        });
    };
    const resetZoom = () => {
        setZoomLevel(1);
        setPanOffset({ x: 0, y: 0 });
    };

    // Control de arrastre / paneo libre de cámara cuando hay zoom (PC y móvil)
    const handlePointerDown = (e) => {
        if (zoomLevel <= 1.0) return;
        if (e.button !== undefined && e.button !== 0) return;
        setIsDragging(true);
        dragStartRef.current = { x: e.clientX, y: e.clientY };
        panStartRef.current = { ...panOffset };
        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch (err) {}
    };

    const handlePointerMove = (e) => {
        if (!isDragging || zoomLevel <= 1.0) return;
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;

        const maxPanX = (zoomLevel - 1) * (window.innerWidth * 0.7);
        const maxPanY = (zoomLevel - 1) * (window.innerHeight * 0.7);

        setPanOffset({
            x: Math.max(-maxPanX, Math.min(maxPanX, panStartRef.current.x + dx)),
            y: Math.max(-maxPanY, Math.min(maxPanY, panStartRef.current.y + dy))
        });
    };

    const handlePointerUp = (e) => {
        if (isDragging) {
            setIsDragging(false);
            try {
                e.currentTarget.releasePointerCapture(e.pointerId);
            } catch (err) {}
        }
    };

    // Gestos táctiles de pellizco (pinch-to-zoom) en móvil
    const handleTouchStart = (e) => {
        if (e.touches.length === 2) {
            isPinchingRef.current = true;
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            initialPinchDistRef.current = dist;
            initialPinchZoomRef.current = zoomLevel;
        }
    };

    const handleTouchMove = (e) => {
        if (e.touches.length === 2 && isPinchingRef.current && initialPinchDistRef.current) {
            e.preventDefault();
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const factor = dist / initialPinchDistRef.current;
            const targetZoom = Math.min(Math.max(initialPinchZoomRef.current * factor, 1.0), 2.8);
            setZoomLevel(targetZoom);
            if (targetZoom <= 1.0) {
                setPanOffset({ x: 0, y: 0 });
            }
        }
    };

    const handleTouchEnd = (e) => {
        if (e.touches.length < 2) {
            isPinchingRef.current = false;
            initialPinchDistRef.current = null;
        }
    };

    return (
        <AppLayout>
            <Head>
                <title>Periódico Escolar · Colegio Santa Isabel de Hungría</title>
                <meta 
                    name="description" 
                    content="Edición especial interactiva del Periódico Escolar del Colegio Santa Isabel de Hungría." 
                />
            </Head>

            {/* Estilos optimizados para aceleración por hardware y cero sombras */}
            <style>{`
                #flipbook-root {
                    will-change: transform;
                    transform: translateZ(0);
                    contain: layout paint;
                }
                #flipbook-root.stf__parent {
                    min-width: 0 !important;
                    width: 100% !important;
                    margin: 0 auto !important;
                }
                #flipbook-root .stf__parent,
                #flipbook-root .stf__wrapper,
                #flipbook-root .stf__item {
                    box-shadow: none !important;
                    filter: none !important;
                }
            `}</style>

            {/* Contenedor Principal Inmersivo a Pantalla Completa con FONDO 100% BLANCO PURO */}
            <div className="relative w-full h-[100dvh] bg-white text-slate-800 flex flex-col justify-between overflow-hidden select-none">
                
                {/* Barra Superior Minimalista Blanca */}
                <div className="relative z-30 pt-9 sm:pt-11 pb-1 px-3 sm:px-8 flex items-center justify-between text-xs bg-white flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-800 font-semibold text-[11px] shadow-sm">
                            <BookOpen className="w-3.5 h-3.5 text-red-600" />
                            <span>Periódico Escolar COLSIH</span>
                        </span>
                        <span className="hidden sm:inline-block text-slate-400">·</span>
                        <span className="hidden sm:inline-block text-[11px] text-slate-500 font-medium">
                            {currentPage === 0 
                                ? 'Portada' 
                                : currentPage >= TOTAL_PAGES - 1 
                                    ? 'Contraportada' 
                                    : `Páginas ${currentPage} - ${currentPage + 1} de ${TOTAL_PAGES}`}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Botón Descarga directa del PDF original */}
                        <a
                            href={PDF_URL}
                            download="PERIODICO COLEGIO SANTA ISABEL DE HUNGRIA.pdf"
                            className="px-3.5 py-1 rounded-full bg-[#08111F] hover:bg-red-700 text-white font-bold text-[11px] tracking-wide shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
                            title="Descargar el PDF completo (18.9 MB)"
                        >
                            <Download className="w-3.5 h-3.5" />
                            <span className="hidden xs:inline">Descargar PDF</span>
                        </a>
                    </div>
                </div>

                {/* ========================================================
                    ÁREA CENTRAL: REVISTA A PANTALLA COMPLETA CON CÁMARA LIBRE
                    ======================================================== */}
                <div 
                    className="relative flex-grow flex items-center justify-center px-1 sm:px-4 md:px-8 overflow-hidden bg-white select-none"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{
                        cursor: zoomLevel > 1.0 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                        touchAction: zoomLevel > 1.0 ? 'none' : 'auto'
                    }}
                >
                    
                    {/* Flecha Lateral Flotante Izquierda: SOLO ESCRITORIO (hidden md:flex) */}
                    <button
                        onClick={flipPrev}
                        disabled={currentPage === 0}
                        className={`hidden md:flex absolute left-3 lg:left-6 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 items-center justify-center shadow-md transition-all duration-150 hover:scale-110 active:scale-95 cursor-pointer group ${
                            currentPage === 0 ? 'opacity-20 pointer-events-none' : 'opacity-95 hover:opacity-100'
                        }`}
                        title="Página Anterior (Flecha Izquierda)"
                    >
                        <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 group-hover:-translate-x-0.5 transition-transform text-slate-800" />
                    </button>

                    {/* Contenedor del Libro con Zoom y Cámara Libre (Pan) */}
                    <div 
                        className="relative w-full h-full flex items-center justify-center"
                        style={{
                            transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0) scale(${zoomLevel})`,
                            transformOrigin: 'center center',
                            transition: isDragging ? 'none' : 'transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                            willChange: 'transform'
                        }}
                    >
                        {/* Indicador de Carga */}
                        {isLoading && (
                            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-white/95 rounded-2xl p-6 text-center space-y-3">
                                <div className="w-14 h-14 rounded-full border-4 border-slate-200 border-t-red-600 animate-spin" />
                                <div className="space-y-0.5">
                                    <h3 className="text-sm font-bold text-slate-900">
                                        Abriendo Periódico Escolar...
                                    </h3>
                                    <p className="text-xs text-slate-500 font-light">
                                        Cargando edición interactiva
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Elemento raíz de StPageFlip: Cero sombras, máxima fluidez y aceleración por GPU */}
                        <div 
                            ref={bookContainerRef} 
                            id="flipbook-root"
                            className={`w-full max-w-[1550px] h-[calc(100dvh-130px)] md:h-[88vh] md:max-h-[960px] flex items-center justify-center ${
                                zoomLevel > 1.0 ? 'pointer-events-none' : 'cursor-grab active:cursor-grabbing'
                            }`}
                        />
                    </div>

                    {/* Flecha Lateral Flotante Derecha: SOLO ESCRITORIO (hidden md:flex) */}
                    <button
                        onClick={flipNext}
                        disabled={currentPage >= TOTAL_PAGES - 1}
                        className={`hidden md:flex absolute right-3 lg:right-6 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 items-center justify-center shadow-md transition-all duration-150 hover:scale-110 active:scale-95 cursor-pointer group ${
                            currentPage >= TOTAL_PAGES - 1 ? 'opacity-20 pointer-events-none' : 'opacity-95 hover:opacity-100'
                        }`}
                        title="Página Siguiente (Flecha Derecha)"
                    >
                        <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 group-hover:translate-x-0.5 transition-transform text-slate-800" />
                    </button>

                </div>

                {/* ========================================================
                    BARRA INFERIOR EN MÓVIL: BOTONES DE NAVEGACIÓN JUNTOS ABAJO
                    ======================================================== */}
                <div className="flex md:hidden relative z-30 px-3 pb-3 pt-1 bg-white items-center justify-between border-t border-slate-100">
                    {/* Botón Silenciar / Sonido en Móvil */}
                    <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className={`p-2 rounded-full border shadow-sm flex items-center justify-center transition-all active:scale-90 ${
                            soundEnabled ? 'border-slate-200 text-slate-700 bg-white' : 'border-red-200 text-red-600 bg-red-50'
                        }`}
                        title={soundEnabled ? "Silenciar sonido" : "Activar sonido"}
                    >
                        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>

                    {/* DOCK CENTRAL: BOTONES IZQUIERDA Y DERECHA JUNTOS EN MÓVIL */}
                    <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-full shadow-md">
                        <button
                            onClick={flipPrev}
                            disabled={currentPage === 0}
                            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-90 disabled:opacity-20 disabled:pointer-events-none text-slate-800 flex items-center justify-center transition-all cursor-pointer"
                            title="Página Anterior"
                            aria-label="Página Anterior"
                        >
                            <ChevronLeft className="w-5 h-5 text-slate-800" />
                        </button>

                        <span className="px-2.5 text-xs font-bold text-slate-800 tabular-nums select-none min-w-[62px] text-center">
                            {currentPage === 0 ? 'Portada' : `${currentPage + 1} / ${TOTAL_PAGES}`}
                        </span>

                        <button
                            onClick={flipNext}
                            disabled={currentPage >= TOTAL_PAGES - 1}
                            className="w-9 h-9 rounded-full bg-[#08111F] hover:bg-red-700 active:scale-90 disabled:opacity-20 disabled:pointer-events-none text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
                            title="Página Siguiente"
                            aria-label="Página Siguiente"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Controles de Zoom en Móvil */}
                    <div className="flex items-center gap-0.5 p-1 rounded-full bg-white border border-slate-200 shadow-sm">
                        <button
                            onClick={zoomOut}
                            disabled={zoomLevel <= 0.8}
                            className="p-1 rounded-full hover:bg-slate-100 text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Reducir Zoom"
                        >
                            <ZoomOut className="w-3.5 h-3.5" />
                        </button>
                        {zoomLevel !== 1 && (
                            <button
                                onClick={resetZoom}
                                className="px-1 text-[10px] font-bold text-slate-700"
                                title="100%"
                            >
                                {Math.round(zoomLevel * 100)}%
                            </button>
                        )}
                        <button
                            onClick={zoomIn}
                            disabled={zoomLevel >= 2.0}
                            className="p-1 rounded-full hover:bg-slate-100 text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Aumentar Zoom"
                        >
                            <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* ========================================================
                    CONTROLES DE ESCRITORIO: LATERALES INFERIORES (hidden en móvil)
                    ======================================================== */}
                <div className="hidden md:block absolute bottom-5 left-6 z-30">
                    <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className={`p-2.5 sm:px-3.5 sm:py-2 rounded-full bg-white border border-slate-200 shadow-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                            soundEnabled ? 'text-slate-700 hover:text-black hover:bg-slate-50' : 'text-red-600 bg-red-50/50'
                        }`}
                        title={soundEnabled ? "Silenciar sonido de papel" : "Activar sonido de pasar hoja"}
                    >
                        {soundEnabled ? (
                            <>
                                <Volume2 className="w-4 h-4 text-slate-700" />
                                <span className="hidden sm:inline text-xs font-medium text-slate-700">Sonido</span>
                            </>
                        ) : (
                            <>
                                <VolumeX className="w-4 h-4 text-red-600" />
                                <span className="hidden sm:inline text-xs font-semibold text-red-600">Silenciado</span>
                            </>
                        )}
                    </button>
                </div>

                <div className="hidden md:flex absolute bottom-5 right-6 z-30 items-center gap-1 p-1 sm:p-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
                    <button
                        onClick={zoomOut}
                        disabled={zoomLevel <= 0.8}
                        className="p-1.5 sm:p-2 rounded-full hover:bg-slate-100 text-slate-700 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        title="Reducir Zoom"
                    >
                        <ZoomOut className="w-4 h-4" />
                    </button>
                    {zoomLevel !== 1 && (
                        <button
                            onClick={resetZoom}
                            className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] sm:text-[11px] font-bold transition-colors"
                            title="Restablecer tamaño normal"
                        >
                            {Math.round(zoomLevel * 100)}%
                        </button>
                    )}
                    <button
                        onClick={zoomIn}
                        disabled={zoomLevel >= 2.0}
                        className="p-1.5 sm:p-2 rounded-full hover:bg-slate-100 text-slate-700 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        title="Aumentar Zoom"
                    >
                        <ZoomIn className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </AppLayout>
    );
}
