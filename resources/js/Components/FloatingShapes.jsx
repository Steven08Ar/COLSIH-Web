import React from 'react';

export default function FloatingShapes() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Interactive Dotted Grid Backdrop */}
            <div 
                className="absolute inset-0 opacity-[0.06] dark:opacity-[0.02]" 
                style={{
                    backgroundImage: 'radial-gradient(#003C8F 1.5px, transparent 1.5px)',
                    backgroundSize: '28px 28px'
                }} 
            />

            {/* Glowing Blurry Orbs (6 total for high visual detail) */}
            {/* Orb 1: Blue Top-Left */}
            <div 
                className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[#003C8F] opacity-[0.08] blur-3xl"
                style={{
                    animation: 'float-slow 25s ease-in-out infinite alternate'
                }}
            />

            {/* Orb 2: Red/Wine Bottom-Right */}
            <div 
                className="absolute -bottom-40 -right-20 w-[550px] h-[550px] rounded-full bg-[#800A15] opacity-[0.07] blur-[120px]"
                style={{
                    animation: 'float-slow-reverse 30s ease-in-out infinite alternate'
                }}
            />

            {/* Orb 3: Green Left Mid */}
            <div 
                className="absolute top-[25%] left-[5%] w-80 h-80 rounded-full bg-[#10B981] opacity-[0.05] blur-[100px]"
                style={{
                    animation: 'float-slow 22s ease-in-out infinite alternate-reverse'
                }}
            />

            {/* Orb 4: Purple Right Mid */}
            <div 
                className="absolute top-[50%] right-[5%] w-[400px] h-[400px] rounded-full bg-purple-600 opacity-[0.05] blur-[120px]"
                style={{
                    animation: 'float-slow-reverse 26s ease-in-out infinite alternate'
                }}
            />

            {/* Orb 5: Amber Top-Right */}
            <div 
                className="absolute top-10 right-[25%] w-80 h-80 rounded-full bg-amber-400 opacity-[0.04] blur-[95px]"
                style={{
                    animation: 'float-slow 28s ease-in-out infinite alternate'
                }}
            />

            {/* Orb 6: Cyan Bottom-Left */}
            <div 
                className="absolute bottom-[10%] left-[20%] w-96 h-96 rounded-full bg-cyan-400 opacity-[0.05] blur-[110px]"
                style={{
                    animation: 'float-slow-reverse 24s ease-in-out infinite alternate-reverse'
                }}
            />

            {/* Rotating & Floating Geometric Vector Decorators */}
            {/* Shape 1: Large Blue Ring Top-Right */}
            <svg 
                className="absolute top-36 right-[12%] w-20 h-20 opacity-[0.09]" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    animation: 'float-ring 16s ease-in-out infinite'
                }}
            >
                <circle cx="50" cy="50" r="35" stroke="#003C8F" strokeWidth="12" strokeLinecap="round" />
            </svg>

            {/* Shape 2: Red Triangle Left Mid */}
            <svg 
                className="absolute top-[45%] left-[8%] w-16 h-16 opacity-[0.08]" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    animation: 'float-triangle 20s ease-in-out infinite'
                }}
            >
                <path d="M50 15 L85 80 H15 Z" stroke="#800A15" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* Shape 3: Green Diamond Left Top */}
            <div 
                className="absolute top-24 left-[22%] w-8 h-8 border-2 border-emerald-500/20 dark:border-emerald-500/10 rounded-lg transform rotate-45"
                style={{
                    animation: 'float-triangle 26s ease-in-out infinite'
                }}
            />

            {/* Shape 4: Amber Star Right Bottom */}
            <svg 
                className="absolute bottom-[20%] right-[18%] w-8 h-8 text-amber-500/20 dark:text-amber-500/5 animate-spin" 
                style={{ animationDuration: '16s' }}
                viewBox="0 0 24 24" 
                fill="currentColor"
            >
                <path d="M12 1.5l2.9 6.2 6.7.7-5 4.6 1.4 6.7-6-3.7-6 3.7 1.4-6.7-5-4.6 6.7-.7L12 1.5z"/>
            </svg>

            {/* Shape 5: Purple Cube Outline Left Bottom */}
            <div 
                className="absolute bottom-[15%] left-[12%] w-10 h-10 border border-purple-500/20 dark:border-purple-500/10 rounded-xl transform rotate-12"
                style={{
                    animation: 'float-ring 22s ease-in-out infinite'
                }}
            />

            {/* Pulsating Micro-particles / Grid Dots */}
            <div className="absolute top-[15%] left-[62%] text-slate-300 dark:text-slate-800 opacity-40 select-none text-xl font-light font-mono animate-pulse">+</div>
            <div className="absolute top-[48%] left-[78%] text-slate-300 dark:text-slate-800 opacity-35 select-none text-2xl font-light font-mono animate-pulse" style={{ animationDelay: '1.5s' }}>+</div>
            <div className="absolute top-[72%] left-[25%] text-slate-300 dark:text-slate-800 opacity-40 select-none text-xl font-light font-mono animate-pulse" style={{ animationDelay: '0.8s' }}>+</div>
            <div className="absolute top-[35%] left-[8%] text-slate-300 dark:text-slate-800 opacity-30 select-none text-lg font-light font-mono animate-pulse">+</div>
            
            {/* Additional moving colored bubbles */}
            <div className="absolute top-[20%] left-[35%] w-3 h-3 rounded-full bg-blue-500/20 dark:bg-blue-500/10 animate-ping" style={{ animationDuration: '4.5s' }} />
            <div className="absolute top-[52%] right-[22%] w-2 h-2 rounded-full bg-rose-500/30 dark:bg-rose-500/15 animate-pulse" style={{ animationDuration: '3.5s' }} />
            <div className="absolute bottom-[28%] left-[15%] w-3 h-3 rounded-full bg-emerald-500/20 dark:bg-emerald-500/10 animate-bounce" style={{ animationDuration: '6s' }} />
            <div className="absolute top-[8%] left-[80%] w-2.5 h-2.5 rounded-full bg-purple-500/20 dark:bg-purple-500/10 animate-ping" style={{ animationDuration: '5s' }} />
            <div className="absolute top-[68%] left-[45%] w-2 h-2 rounded-full bg-amber-500/30 dark:bg-amber-500/15 animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-[45%] right-[8%] w-3.5 h-3.5 rounded-full bg-cyan-500/20 dark:bg-cyan-500/10 animate-bounce" style={{ animationDuration: '8s' }} />

            {/* Inject slow CSS floating animation keyframes */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes float-slow {
                    0% { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(50px, 60px) scale(1.15); }
                }
                @keyframes float-slow-reverse {
                    0% { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(-60px, -50px) scale(1.08); }
                }
                @keyframes float-ring {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-25px) rotate(180deg); }
                    100% { transform: translateY(0px) rotate(360deg); }
                }
                @keyframes float-triangle {
                    0% { transform: translateY(0px) rotate(0deg) scale(1); }
                    50% { transform: translateY(30px) rotate(-180deg) scale(0.9); }
                    100% { transform: translateY(0px) rotate(-360deg) scale(1); }
                }
            `}} />
        </div>
    );
}
