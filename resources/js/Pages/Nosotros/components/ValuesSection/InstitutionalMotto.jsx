import React from 'react';
import { motion } from 'framer-motion';

export default function InstitutionalMotto() {
    return (
        <section className="relative z-10 py-16 px-6 max-w-[1240px] mx-auto text-center select-none overflow-hidden">
            
            {/* Fine decorative horizontal lines with center motto */}
            <div className="relative flex items-center justify-center gap-6 max-w-4xl mx-auto">
                {/* Left decorative line */}
                <div className="hidden sm:block h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-800 to-[#800A15]/40" />

                {/* Motto Container */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-2 relative px-4"
                >
                    {/* Small star icon at the top */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-amber-500/80 animate-pulse text-lg">✦</div>

                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] block">
                        Lema Institucional
                    </span>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic font-extrabold text-[#800A15] dark:text-rose-400 leading-tight">
                        "Buenos Cristianos y Honestos Ciudadanos"
                    </h2>

                    {/* Small subtitle or detail at bottom */}
                    <span className="text-[11px] font-bold text-slate-500/80 dark:text-slate-400 italic block mt-1.5">
                        Don Bosco
                    </span>
                </motion.div>

                {/* Right decorative line */}
                <div className="hidden sm:block h-[1px] flex-1 bg-gradient-to-l from-transparent via-slate-300 dark:via-slate-800 to-[#003C8F]/40" />
            </div>

            {/* Sparkle decorative background details */}
            <div className="absolute top-1/2 left-[12%] -translate-y-1/2 text-[#003C8F]/25 text-xl font-light font-mono select-none pointer-events-none">✦</div>
            <div className="absolute top-1/2 right-[12%] -translate-y-1/2 text-[#800A15]/25 text-xl font-light font-mono select-none pointer-events-none">✦</div>
        </section>
    );
}
