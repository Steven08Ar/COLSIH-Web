import React from 'react';
import { Heart, Users, Compass, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ValuesHero() {
    return (
        <section className="relative z-10 pt-28 pb-16 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto overflow-hidden">
            {/* Definición de animación CSS pura en GPU para los 3 íconos flotantes */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes hero-badge-1 {
                    0%, 100% { transform: translateY(0px) rotate(12deg); }
                    50% { transform: translateY(-8px) rotate(12deg); }
                }
                @keyframes hero-badge-2 {
                    0%, 100% { transform: translateY(0px) rotate(-12deg); }
                    50% { transform: translateY(8px) rotate(-12deg); }
                }
                @keyframes hero-badge-3 {
                    0%, 100% { transform: translateY(0px) rotate(15deg); }
                    50% { transform: translateY(-6px) rotate(15deg); }
                }
            `}} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                
                {/* Left Side: Content & Features */}
                <div className="col-span-full lg:col-span-6 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
                    
                    {/* Upper Badge Tag */}
                    <motion.span 
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 dark:bg-rose-950/20 text-[#800A15] dark:text-rose-400 border border-rose-100 dark:border-rose-900/30 select-none"
                    >
                        <SparkleIcon className="w-3.5 h-3.5" />
                        Lo que nos define
                    </motion.span>

                    {/* Main Title */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white"
                    >
                        Nuestros <br />
                        <span className="bg-gradient-to-r from-[#001659] to-[#800A15] bg-clip-text text-transparent">
                            Valores Corporativos
                        </span>
                    </motion.h1>

                    {/* Description Paragraph */}
                    <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-semibold max-w-xl mx-auto lg:mx-0 leading-relaxed"
                    >
                        Son los principios que guían nuestras acciones, decisiones y relaciones. Vivimos nuestros valores y los reflejamos en cada paso que damos en nuestra comunidad educativa.
                    </motion.p>

                    {/* Features row of 3 points (Diseño ligero sin backdrop-blur) */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 w-full"
                    >
                        <div className="flex flex-row items-center justify-center sm:flex-col lg:flex-row lg:justify-start gap-3.5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-3.5 rounded-2xl shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-rose-50 text-[#800A15] dark:bg-rose-950/40 dark:text-rose-400 flex items-center justify-center shrink-0">
                                <Heart className="w-4.5 h-4.5" fill="currentColor" />
                            </div>
                            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 leading-tight text-center sm:text-left">
                                Forman <br className="hidden sm:inline lg:hidden" /><span className="text-slate-400 font-medium">nuestro carácter</span>
                            </span>
                        </div>

                        <div className="flex flex-row items-center justify-center sm:flex-col lg:flex-row lg:justify-start gap-3.5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-3.5 rounded-2xl shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 flex items-center justify-center shrink-0">
                                <Users className="w-4.5 h-4.5" fill="currentColor" />
                            </div>
                            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 leading-tight text-center sm:text-left">
                                Fortalecen <br className="hidden sm:inline lg:hidden" /><span className="text-slate-400 font-medium">nuestra comunidad</span>
                            </span>
                        </div>

                        <div className="flex flex-row items-center justify-center sm:flex-col lg:flex-row lg:justify-start gap-3.5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-3.5 rounded-2xl shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 dark:bg-amber-950/40 dark:text-amber-400 flex items-center justify-center shrink-0">
                                <Star className="w-4.5 h-4.5" fill="currentColor" />
                            </div>
                            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 leading-tight text-center sm:text-left">
                                Nos impulsan <br className="hidden sm:inline lg:hidden" /><span className="text-slate-400 font-medium">a ser mejores</span>
                            </span>
                        </div>
                    </motion.div>

                </div>

                {/* Right Side: Shield and Students Graphic Composition */}
                <div className="col-span-full lg:col-span-6 flex justify-center relative select-none">
                    
                    {/* Main Shield Layout Wrapper */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="relative w-full max-w-[430px] aspect-[4/5] flex items-center justify-center"
                    >
                        
                        {/* Outer Shield Frame shape in background blur */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#800A15]/10 to-[#001659]/10 dark:from-slate-900 dark:to-slate-950 rounded-[48px] blur-xl pointer-events-none" />

                        {/* Single Graphic Frame - Shield / Diamond Mask */}
                        <div 
                            className="w-[90%] h-[90%] bg-slate-100 dark:bg-slate-900 border-[6px] border-white dark:border-slate-800 shadow-xl relative overflow-hidden flex items-center justify-center z-10"
                            style={{
                                clipPath: 'polygon(50% 0%, 100% 15%, 100% 80%, 50% 100%, 0% 80%, 0% 15%)'
                            }}
                        >
                            {/* 1. Full Background JPG/WebP Photo */}
                            <picture>
                                <source srcSet="/valores/hermanos.webp" type="image/webp" />
                                <img 
                                    src="/valores/hermanos.JPG"
                                    alt="Hermanos Salesianos"
                                    className="absolute inset-0 w-full h-full object-cover object-[center_82%] scale-[1.45] -translate-y-12"
                                    loading="eager"
                                    fetchPriority="high"
                                />
                            </picture>

                            {/* 2. Soft Darkening Vignette Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                            {/* 3. Transparent WebP/PNG Cutout Layer (57KB WebP vs 1MB PNG) */}
                            <picture>
                                <source srcSet="/valores/hermanos_sin_fondo.webp" type="image/webp" />
                                <img 
                                    src="/valores/hermanos_sin_fondo.png"
                                    alt="Hermanos Salesianos (Sin Fondo)"
                                    className="absolute inset-0 w-full h-full object-cover object-[center_82%] scale-[1.45] -translate-y-12 filter drop-shadow-[0_15px_22px_rgba(0,0,0,0.65)] will-change-transform"
                                    loading="eager"
                                />
                            </picture>
                        </div>

                        {/* Floating elements surrounding the shield - Pure CSS GPU Animation */}
                        {/* 1. Left Heart (Blue) */}
                        <div 
                            style={{ animation: 'hero-badge-1 4s ease-in-out infinite' }}
                            className="absolute top-[12%] -left-4 w-12 h-12 rounded-2xl bg-blue-600 dark:bg-blue-800 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center z-30 will-change-transform"
                        >
                            <Heart className="w-5.5 h-5.5" fill="currentColor" />
                        </div>

                        {/* 2. Right Star (Gold) */}
                        <div 
                            style={{ animation: 'hero-badge-2 4.5s ease-in-out infinite 0.5s' }}
                            className="absolute top-[8%] -right-2 w-14 h-14 rounded-2xl bg-amber-400 text-white shadow-lg shadow-amber-400/25 flex items-center justify-center z-30 will-change-transform"
                        >
                            <Star className="w-7 h-7" fill="currentColor" />
                        </div>

                        {/* 3. Bottom Shield Overlay (Red) */}
                        <div 
                            style={{ animation: 'hero-badge-3 5s ease-in-out infinite 1s' }}
                            className="absolute bottom-[10%] right-[10%] w-12 h-12 rounded-2xl bg-[#800A15] text-white shadow-lg shadow-red-500/25 flex items-center justify-center z-30 will-change-transform"
                        >
                            <Compass className="w-6 h-6" />
                        </div>

                    </motion.div>
                </div>

            </div>
        </section>
    );
}

function SparkleIcon(props) {
    return (
        <svg 
            {...props} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <path d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    );
}
