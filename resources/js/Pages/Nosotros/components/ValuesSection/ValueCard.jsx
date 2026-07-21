import React from 'react';
import { motion } from 'framer-motion';
import { Images } from 'lucide-react';
import FloatingValueIcon from './FloatingValueIcon';

export default function ValueCard({ value, index, onOpenGallery }) {
    const isEven = index % 2 === 0;

    // Outer card container entrance reveal animation properties
    const cardVariants = {
        hidden: { opacity: 0, y: 60, scale: 0.98 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="w-[90%] md:w-[88%] lg:max-w-[1140px] mx-auto bg-white/75 dark:bg-slate-900/60 backdrop-blur-md border border-slate-100 dark:border-slate-800/80 rounded-[36px] shadow-[0_15px_40px_rgba(0,0,0,0.02)] dark:shadow-none relative p-6 md:p-8 lg:p-6 lg:min-h-[290px] flex flex-col justify-center transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
        >
            {/* Overlapping circle icon badge */}
            <FloatingValueIcon 
                iconName={value.iconName} 
                alignment={isEven ? 'left' : 'right'} 
                index={index} 
            />

            {/* Alternating Horizontal Columns Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                
                {/* 1. Main Cover Image Zone */}
                <div 
                    className={`col-span-12 relative w-full aspect-[4/3] lg:aspect-auto lg:h-[230px] rounded-2xl overflow-hidden shadow-sm group cursor-pointer ${
                        isEven ? 'lg:col-span-4 lg:order-1' : 'lg:col-span-4 lg:order-3'
                    }`}
                    onClick={() => onOpenGallery(0)}
                >
                    <img 
                        src={value.portada} 
                        alt={`Portada de ${value.titulo}`} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                </div>

                {/* 2. Central Information Zone */}
                <div 
                    className={`col-span-12 space-y-4 text-left ${
                        isEven ? 'lg:col-span-5 lg:order-2' : 'lg:col-span-5 lg:order-2 lg:pl-4'
                    }`}
                >
                    <div className="flex items-baseline gap-2.5">
                        <span className="text-xl font-black text-slate-300 dark:text-slate-700 select-none">
                            {value.numero}
                        </span>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-none">
                            {value.titulo}
                        </h3>
                    </div>
                    
                    {/* Tiny styled separator line */}
                    <div className={`w-14 h-[3px] rounded-full ${isEven ? 'bg-[#800A15]' : 'bg-[#003C8F]'}`} />

                    <p className="text-sm md:text-base font-semibold text-slate-500 dark:text-slate-400 leading-relaxed max-w-md line-clamp-3">
                        {value.descripcion}
                    </p>
                </div>

                <div 
                    className={`col-span-12 flex flex-col gap-4 items-center sm:items-start lg:items-center ${
                        isEven ? 'lg:col-span-3 lg:order-3' : 'lg:col-span-3 lg:order-1'
                    }`}
                >
                    {/* Three Mini Thumbnails Grid */}
                    <div className="grid grid-cols-3 gap-2.5 w-full">
                        {value.galeria.map((imgUrl, thumbIdx) => (
                            <div 
                                key={thumbIdx}
                                onClick={() => onOpenGallery(thumbIdx)}
                                className="aspect-square rounded-xl overflow-hidden border border-slate-100/80 dark:border-slate-800 shadow-sm cursor-zoom-in group relative"
                            >
                                <img 
                                    src={imgUrl} 
                                    alt={`Miniatura ${thumbIdx + 1} de ${value.titulo}`} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            </div>
                        ))}
                    </div>

                    {/* Ver Galería Button */}
                    <button 
                        onClick={() => onOpenGallery(0)}
                        className={`w-full py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 select-none cursor-pointer ${
                            isEven 
                                ? 'border-[#800A15]/15 text-[#800A15] hover:bg-[#800A15] hover:text-white dark:border-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-950/20' 
                                : 'border-[#003C8F]/15 text-[#003C8F] hover:bg-[#003C8F] hover:text-white dark:border-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-950/20'
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
