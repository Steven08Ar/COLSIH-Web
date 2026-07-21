import React from 'react';

export default function SectionBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Fine Dotted Grid Pattern */}
            <div 
                className="absolute inset-0 opacity-[0.05] dark:opacity-[0.02]" 
                style={{
                    backgroundImage: 'radial-gradient(#003C8F 1.2px, transparent 1.2px)',
                    backgroundSize: '24px 24px'
                }} 
            />

            {/* Glowing Blurry Gradient Orbs */}
            <div 
                className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#003C8F] opacity-[0.04] blur-[100px]"
                style={{
                    animation: 'float-slow 22s ease-in-out infinite alternate'
                }}
            />
            <div 
                className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-[#800A15] opacity-[0.04] blur-[120px]"
                style={{
                    animation: 'float-slow-reverse 26s ease-in-out infinite alternate'
                }}
            />
            <div 
                className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-amber-400 opacity-[0.03] blur-[90px]"
                style={{
                    animation: 'float-slow 20s ease-in-out infinite alternate-reverse'
                }}
            />

            {/* Subtle Abstract Lines */}
            <svg className="absolute top-20 left-0 w-full h-[600px] opacity-[0.03] dark:opacity-[0.01]" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-100 100 C 300 400, 600 -100, 1000 300 C 1200 450, 1300 200, 1600 400" stroke="#003C8F" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M-50 200 C 350 450, 550 -50, 950 350 C 1150 480, 1250 250, 1550 450" stroke="#800A15" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            {/* Decorative Sparkles & Sparks */}
            <div className="absolute top-1/4 left-[15%] text-amber-500/20 dark:text-amber-500/5 text-lg animate-pulse font-mono select-none">+</div>
            <div className="absolute top-1/2 right-[18%] text-blue-500/20 dark:text-blue-500/5 text-xl animate-pulse font-mono select-none" style={{ animationDelay: '1s' }}>✦</div>
            <div className="absolute bottom-[20%] left-[8%] text-rose-500/20 dark:text-rose-500/5 text-base animate-pulse font-mono select-none" style={{ animationDelay: '2.5s' }}>✦</div>
            <div className="absolute top-[8%] right-[32%] text-slate-400/20 text-xs animate-pulse font-mono select-none">+</div>

            {/* Floating Dots */}
            <div className="absolute top-[60%] left-[28%] w-1.5 h-1.5 rounded-full bg-blue-500/10 animate-ping" style={{ animationDuration: '4s' }} />
            <div className="absolute top-[80%] right-[35%] w-2 h-2 rounded-full bg-rose-500/10 animate-pulse" style={{ animationDuration: '5.5s' }} />

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes float-slow {
                    0% { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(40px, 50px) scale(1.1); }
                }
                @keyframes float-slow-reverse {
                    0% { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(-50px, -40px) scale(1.05); }
                }
            `}} />
        </div>
    );
}
