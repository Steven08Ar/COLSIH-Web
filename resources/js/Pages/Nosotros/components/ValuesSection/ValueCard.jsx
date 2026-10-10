import React from 'react';
import { motion } from 'framer-motion';
import { Images, Eye } from 'lucide-react';
import FloatingValueIcon from './FloatingValueIcon';

/**
 * ValueImage
 * Renderiza el recuadro gris neutro elegante para la portada y miniaturas de los valores
 * optimizado para rendimiento (sin gradientes pesados ni filtros de desenfoque).
 */
function ValueImage({ isThumbnail = false }) {
    if (isThumbnail) {
        return (
            <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center p-1 text-center select-none border border-slate-200/60 dark:border-slate-700/50">
                <Images className="w-4 h-4 text-slate-400 dark:text-slate-500 mb-0.5" />
                <span className="text-[8px] font-black text-slate-500 dark:text-slate-400 tracking-tighter uppercase leading-tight">
                    En espera
                </span>
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center p-6 text-center select-none border border-slate-200/80 dark:border-slate-700/60 rounded-2xl group-hover:bg-slate-200/70 dark:group-hover:bg-slate-750 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-700 flex items-center justify-center mb-2.5 text-slate-500 dark:text-slate-400 shadow-sm group-hover:scale-105 transition-transform">
                <Images className="w-6 h-6 text-slate-500 dark:text-slate-300" />
            </div>
            <span className="text-xs font-black text-slate-700 dark:text-slate-200 tracking-wider uppercase">
                Imagen en espera de subida
            </span>
            <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-widest bg-slate-200/80 dark:bg-slate-700/60 px-2.5 py-0.5 rounded-full">
                En espera
            </span>
        </div>
    );
}

export default function ValueCard({ value, index, onOpenGallery }) {
    const isEven = index % 2 === 0;

    // Variante optimizada (solo opacity y translateY para ejecución 100% en GPU sin reflow de layout)
    const cardVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.35, ease: 'easeOut' } 
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            id={`valor-${value.id}`}
            className="w-[92%] md:w-[88%] lg:max-w-[1140px] mx-auto bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-[32px] md:rounded-[36px] shadow-sm relative p-6 md:p-8 lg:p-6 lg:min-h-[290px] flex flex-col justify-center transition-shadow duration-300 hover:shadow-md group/card will-change-transform"
        >
            {/* Medalla circular de ícono */}
            <FloatingValueIcon 
                iconName={value.iconName} 
                alignment={isEven ? 'left' : 'right'} 
                index={index} 
            />

            {/* Alternating Horizontal Columns Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                
                {/* 1. Main Cover Image Zone */}
                <div 
                    className={`col-span-full relative w-full aspect-[4/3] lg:aspect-auto lg:h-[230px] rounded-2xl overflow-hidden shadow-sm group cursor-pointer ${
                        isEven ? 'lg:col-span-4 lg:order-1' : 'lg:col-span-4 lg:order-3'
                    }`}
                    onClick={() => onOpenGallery(0)}
                >
                    <ValueImage />
                    
                    {/* Floating Zoom Indicator Tag - Sin backdrop-blur pesado */}
                    <div className="absolute bottom-3 right-3 bg-black/75 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 select-none">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver más</span>
                    </div>
                </div>

                {/* 2. Central Information Zone */}
                <div 
                    className={`col-span-full space-y-3.5 text-center lg:text-left flex flex-col items-center lg:items-start ${
                        isEven ? 'lg:col-span-5 lg:order-2' : 'lg:col-span-5 lg:order-2 lg:pl-4'
                    }`}
                >
                    {/* Category Tag Badge */}
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {value.categoria || 'Valor COLSIH'}
                        </span>
                    </div>

                    <div className="flex items-baseline gap-2.5">
                        <span className="text-xl font-black text-slate-300 dark:text-slate-700 select-none">
                            {value.numero}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tight leading-none">
                            {value.titulo}
                        </h3>
                    </div>
                    
                    {value.subtitulo && (
                        <p className="text-xs font-bold uppercase tracking-wider text-[#800A15] dark:text-rose-400">
                            {value.subtitulo}
                        </p>
                    )}

                    {/* Tiny styled separator line */}
                    <div className={`w-14 h-[3px] rounded-full ${isEven ? 'bg-[#800A15]' : 'bg-[#001659]'}`} />

                    <p className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
                        {value.descripcion}
                    </p>
                </div>

                {/* 3. Thumbnails & Action Button Zone */}
                <div 
                    className={`col-span-full flex flex-col gap-4 items-center sm:items-start lg:items-center ${
                        isEven ? 'lg:col-span-3 lg:order-3' : 'lg:col-span-3 lg:order-1'
                    }`}
                >
                    {/* Three Mini Thumbnails Grid */}
                    <div className="grid grid-cols-3 gap-2.5 w-full">
                        {[0, 1, 2].map((thumbIdx) => (
                            <div 
                                key={thumbIdx}
                                onClick={() => onOpenGallery(thumbIdx + 1)}
                                className="aspect-square rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm cursor-zoom-in group relative"
                            >
                                <ValueImage isThumbnail={true} />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                                    <Eye className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Ver Galería Button */}
                    <button 
                        onClick={() => onOpenGallery(0)}
                        className={`w-full py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-200 select-none cursor-pointer ${
                            isEven 
                                ? 'border-[#800A15]/15 text-[#800A15] hover:bg-[#800A15] hover:text-white dark:border-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-950/20' 
                                : 'border-[#001659]/15 text-[#001659] hover:bg-[#001659] hover:text-white dark:border-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-950/20'
                        }`}
                    >
                        <Images className="w-4 h-4 shrink-0" />
                        Ver galería
                    </button>
                </div>

            </div>
        </motion.div>
    );
}
