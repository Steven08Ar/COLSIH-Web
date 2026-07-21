import React from 'react';
import { Heart, Users, Compass, ShieldAlert, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ValuesHero() {
    return (
        <section className="relative z-10 pt-28 pb-16 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                
                {/* Left Side: Content & Features */}
                <div className="col-span-full lg:col-span-6 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
                    
                    {/* Upper Badge Tag */}
                    <motion.span 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 dark:bg-rose-950/20 text-[#800A15] dark:text-rose-400 border border-rose-100 dark:border-rose-900/30 select-none"
                    >
                        <SparkleIcon className="w-3.5 h-3.5" />
                        Lo que nos define
                    </motion.span>

                    {/* Main Title */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white"
                    >
                        Nuestros <br />
                        <span className="bg-gradient-to-r from-[#003C8F] to-[#800A15] bg-clip-text text-transparent">
                            Valores Corporativos
                        </span>
                    </motion.h1>

                    {/* Description Paragraph */}
                    <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-semibold max-w-xl mx-auto lg:mx-0 leading-relaxed"
                    >
                        Son los principios que guían nuestras acciones, decisiones y relaciones. Vivimos nuestros valores y los reflejamos en cada paso que damos en nuestra comunidad educativa.
                    </motion.p>

                    {/* Features row of 3 points */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 w-full"
                    >
                        <div className="flex flex-row items-center justify-center sm:flex-col lg:flex-row lg:justify-start gap-3.5 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm border border-slate-100 dark:border-slate-800/80 p-3.5 rounded-2xl">
                            <div className="w-10 h-10 rounded-full bg-rose-50 text-[#800A15] dark:bg-rose-950/40 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-sm shadow-red-500/5">
                                <Heart className="w-4.5 h-4.5" fill="currentColor" />
                            </div>
                            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 leading-tight text-center sm:text-left">
                                Forman <br className="hidden sm:inline lg:hidden" /><span className="text-slate-400 font-medium">nuestro carácter</span>
                            </span>
                        </div>

                        <div className="flex flex-row items-center justify-center sm:flex-col lg:flex-row lg:justify-start gap-3.5 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm border border-slate-100 dark:border-slate-800/80 p-3.5 rounded-2xl">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/5">
                                <Users className="w-4.5 h-4.5" fill="currentColor" />
                            </div>
                            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 leading-tight text-center sm:text-left">
                                Fortalecen <br className="hidden sm:inline lg:hidden" /><span className="text-slate-400 font-medium">nuestra comunidad</span>
                            </span>
                        </div>

                        <div className="flex flex-row items-center justify-center sm:flex-col lg:flex-row lg:justify-start gap-3.5 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm border border-slate-100 dark:border-slate-800/80 p-3.5 rounded-2xl">
                            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 dark:bg-amber-950/40 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/5">
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
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="relative w-full max-w-[430px] aspect-[4/5] flex items-center justify-center"
                    >
                        
                        {/* Outer Shield Frame shape in background */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#800A15]/10 to-[#003C8F]/10 dark:from-slate-900 dark:to-slate-950 rounded-[48px] blur-2xl pointer-events-none" />

                        {/* Styled Graphic Frame - Shield Mask */}
                        <div 
                            className="w-[90%] h-[90%] bg-slate-100 dark:bg-slate-900 border-[6px] border-white dark:border-slate-800 shadow-2xl relative overflow-hidden flex items-center justify-center"
                            style={{
                                clipPath: 'polygon(50% 0%, 100% 15%, 100% 80%, 50% 100%, 0% 80%, 0% 15%)'
                            }}
                        >
                            <img 
                                src="/Estudiantes COLSIH.png" 
                                alt="Estudiantes del Colegio" 
                                className="w-full h-full object-cover scale-110 -translate-y-2"
                            />
                        </div>

                        {/* Floating elements surrounding the shield */}
                        {/* 1. Left Heart (Blue) */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute top-[12%] -left-4 w-12 h-12 rounded-2xl bg-blue-600 dark:bg-blue-800 text-white shadow-xl shadow-blue-500/20 flex items-center justify-center rotate-12"
                        >
                            <Heart className="w-5.5 h-5.5" fill="currentColor" />
                        </motion.div>

                        {/* 2. Right Star (Gold) */}
                        <motion.div 
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                            className="absolute top-[8%] -right-2 w-14 h-14 rounded-2xl bg-amber-400 text-white shadow-xl shadow-amber-400/20 flex items-center justify-center -rotate-12"
                        >
                            <Star className="w-7 h-7" fill="currentColor" />
                        </motion.div>

                        {/* 3. Bottom Shield Overlay (Red) */}
                        <motion.div 
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            className="absolute bottom-[10%] right-[10%] w-12 h-12 rounded-2xl bg-[#800A15] text-white shadow-xl shadow-red-500/20 flex items-center justify-center rotate-[15deg]"
                        >
                            <Compass className="w-6 h-6" />
                        </motion.div>

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
