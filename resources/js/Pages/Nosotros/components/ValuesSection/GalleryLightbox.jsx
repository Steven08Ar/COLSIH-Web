import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryLightbox({ isOpen, images, activeIndex, onClose, onPrev, onNext }) {
    
    // Add keyboard controls
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

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center select-none"
            >
                {/* Close Button overlay area */}
                <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

                {/* Header Controls */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50 text-white">
                    <span className="text-xs font-black tracking-wider uppercase bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        Imagen {activeIndex + 1} de {images.length}
                    </span>
                    
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
                        aria-label="Cerrar galería"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Left Arrow Button */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrev();
                    }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 hover:scale-105 active:scale-95 flex items-center justify-center transition-all text-white cursor-pointer"
                    aria-label="Imagen anterior"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Arrow Button */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onNext();
                    }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 hover:scale-105 active:scale-95 flex items-center justify-center transition-all text-white cursor-pointer"
                    aria-label="Siguiente imagen"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Active Image Viewport */}
                <div className="relative max-w-[90%] max-h-[80%] flex items-center justify-center pointer-events-none">
                    <motion.img 
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        src={images[activeIndex]} 
                        alt={`Imagen ${activeIndex + 1}`} 
                        className="max-w-full max-h-full rounded-2xl object-contain shadow-2xl pointer-events-auto cursor-zoom-out"
                        onClick={onClose}
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
