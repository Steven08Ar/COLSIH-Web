import React from 'react';

export default function SectionBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Fine Dotted Grid Pattern - Ligero y optimizado */}
            <div 
                className="absolute inset-0 opacity-[0.035] dark:opacity-[0.015]" 
                style={{
                    backgroundImage: 'radial-gradient(#001659 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }} 
            />

            {/* Glowing Gradient Orbs Estáticos (0% costo de CPU/GPU en repintado) */}
            <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-[#001659]/5 blur-[70px]" />
            <div className="absolute top-[800px] right-10 w-96 h-96 rounded-full bg-[#800A15]/5 blur-[80px]" />
            <div className="absolute top-[2000px] left-1/4 w-72 h-72 rounded-full bg-amber-400/[0.025] blur-[60px]" />

            {/* Subtle Abstract Lines */}
            <svg className="absolute top-20 left-0 w-full h-[600px] opacity-[0.025] dark:opacity-[0.01]" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-100 100 C 300 400, 600 -100, 1000 300 C 1200 450, 1300 200, 1600 400" stroke="#001659" strokeWidth="2" strokeLinecap="round" />
                <path d="M-50 200 C 350 450, 550 -50, 950 350 C 1150 480, 1250 250, 1550 450" stroke="#800A15" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            {/* Detalles estáticos decorativos */}
            <div className="absolute top-1/4 left-[15%] text-amber-500/20 dark:text-amber-500/5 text-lg font-mono select-none">+</div>
            <div className="absolute top-1/2 right-[18%] text-blue-500/20 dark:text-blue-500/5 text-xl font-mono select-none">✦</div>
            <div className="absolute bottom-[20%] left-[8%] text-rose-500/20 dark:text-rose-500/5 text-base font-mono select-none">✦</div>
            <div className="absolute top-[8%] right-[32%] text-slate-400/20 text-xs font-mono select-none">+</div>
        </div>
    );
}
