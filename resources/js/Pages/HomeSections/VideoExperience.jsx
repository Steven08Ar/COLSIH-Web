import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';

export default function VideoExperience({ setVideoOpen }) {
    const bgRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!bgRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        // Directly set styles to avoid React re-renders on mousemove
        bgRef.current.style.transform = `scale(1.08) translate(${x * 20}px, ${y * 20}px)`;
        bgRef.current.style.transition = 'transform 0.1s ease-out';
    };

    const handleMouseLeave = () => {
        if (!bgRef.current) return;
        bgRef.current.style.transform = 'scale(1.08) translate(0px, 0px)';
        bgRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    };

    return (
        <section 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-[550px] lg:h-[650px] w-full bg-[#08111F] overflow-hidden flex items-center justify-center select-none"
        >
            {/* Cinematic Background Image with Parallax */}
            <div 
                ref={bgRef}
                style={{
                    transform: 'scale(1.08) translate(0px, 0px)',
                    transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
                className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none"
            >
                <img 
                    src="/Estudiantes COLSIH.png" 
                    alt="Colegio" 
                    className="w-full h-full object-cover grayscale brightness-50 contrast-105"
                />
            </div>

            {/* Dark Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08111F] via-[#08111F]/60 to-[#08111F] z-10 pointer-events-none"></div>

            {/* Floating Light Particles */}
            <div className="absolute inset-0 z-15 overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-[20%] left-[15%] w-3 h-3 bg-white rounded-full blur-[2px] animate-pulse [animation-duration:3s]"></div>
                <div className="absolute top-[60%] left-[30%] w-4.5 h-4.5 bg-white rounded-full blur-[3px] animate-pulse [animation-duration:5s] [animation-delay:1.5s]"></div>
                <div className="absolute top-[15%] left-[75%] w-2.5 h-2.5 bg-white rounded-full blur-[1px] animate-pulse [animation-duration:4s] [animation-delay:0.5s]"></div>
                <div className="absolute top-[75%] left-[80%] w-5 h-5 bg-white rounded-full blur-[4px] animate-pulse [animation-duration:6s] [animation-delay:2s]"></div>
            </div>

            {/* Content & Play Button (z-20) */}
            <div className="relative z-20 text-center space-y-8 max-w-2xl px-6">
                <ScrollReveal distance="translate-y-8">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/95 text-[12px] font-extrabold tracking-widest uppercase backdrop-blur-xs">
                        Experiencia Virtual
                    </span>
                </ScrollReveal>

                {/* Central Pulser Play Button */}
                <ScrollReveal distance="scale-90" delay={150} className="flex justify-center">
                    <button 
                        onClick={() => setVideoOpen(true)}
                        className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center rounded-full border border-white/20 bg-white/15 backdrop-blur-md text-white shadow-2xl hover:scale-105 hover:bg-white/20 active:scale-95 transition-all duration-300 group cursor-pointer"
                        aria-label="Reproducir Video Institucional"
                    >
                        {/* Ripple waves */}
                        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-60 pointer-events-none"></div>
                        <div className="absolute inset-0 rounded-full bg-white/10 animate-ping opacity-35 [animation-delay:1s] pointer-events-none"></div>
                        
                        {/* Play Triangle Icon */}
                        <svg className="w-8 h-8 md:w-12 md:h-12 fill-current ml-2 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                </ScrollReveal>

                <ScrollReveal distance="translate-y-8" delay={300} className="space-y-4">
                    <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        Conoce las instalaciones y nuestra filosofía
                    </h3>
                    <p className="text-slate-300 font-semibold text-[15px] md:text-[17px] max-w-lg mx-auto leading-relaxed">
                        Acompaña a nuestros alumnos en un recorrido guiado en video y descubre los espacios educativos y deportivos que tenemos preparados.
                    </p>
                </ScrollReveal>
            </div>
        </section>
    );
}
