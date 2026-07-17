import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';

function TiltCard({ pillar, index }) {
    const cardRef = useRef(null);

    // Motion values for tracking cursor offset coordinates inside the card
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    // Springs for smooth rotation return and tilt transition
    const springX = useSpring(rotateX, { damping: 25, stiffness: 120 });
    const springY = useSpring(rotateY, { damping: 25, stiffness: 120 });

    // Cursor tracking coordinate spots for the radial spotlight gradient
    const spotlightX = useMotionValue(-1000);
    const spotlightY = useMotionValue(-1000);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        // Calculate mouse relative coordinates
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        spotlightX.set(x);
        spotlightY.set(y);

        // Normalize coordinates relative to card center (-0.5 to 0.5)
        const normX = (x / rect.width) - 0.5;
        const normY = (y / rect.height) - 0.5;

        // Apply a gentle 12 degree 3D rotation tilt
        rotateX.set(-normY * 12);
        rotateY.set(normX * 12);
    };

    const handleMouseLeave = () => {
        // Smoothly snap back to center and throw spotlight out of view
        rotateX.set(0);
        rotateY.set(0);
        spotlightX.set(-1000);
        spotlightY.set(-1000);
    };

    // Parallax depth shifts for card interior elements
    const parallaxX = useTransform(springY, val => val * 0.8);
    const parallaxY = useTransform(springX, val => -val * 0.8);

    // Dynamic color radial gradient spotlight tracking computed at CSS layer
    const spotlightBackground = useTransform(
        [spotlightX, spotlightY],
        ([x, y]) => {
            const glowColor = pillar.num === "02" || pillar.num === "04" 
                ? "rgba(128, 10, 21, 0.38)" // More intense Vinotinto glow accent
                : "rgba(0, 60, 143, 0.25)";  // Blue glow accent
            return `radial-gradient(circle 240px at ${x}px ${y}px, ${glowColor} 0%, transparent 70%)`;
        }
    );

    return (
        <ScrollReveal 
            distance="translate-y-8"
            delay={index * 100}
            className="h-full"
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: springX,
                    rotateY: springY,
                    transformStyle: 'preserve-3d',
                    perspective: 1000
                }}
                className="relative h-full min-h-[340px] border border-white/10 p-8 md:p-10 lg:p-12 rounded-3xl bg-white/[0.02] backdrop-blur-md select-none transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] cursor-pointer group flex flex-col justify-between"
            >
                {/* Spotlight Tracker Background Layer */}
                <motion.div 
                    className="absolute inset-0 z-0 pointer-events-none rounded-3xl"
                    style={{ background: spotlightBackground }}
                />

                {/* Floating Content container with 3D Pop depth */}
                <div 
                    className="space-y-6 text-left relative z-10" 
                    style={{ transform: 'translateZ(30px)' }}
                >
                    {/* Parallaxing Number Tag */}
                    <motion.span 
                        style={{ x: parallaxX, y: parallaxY }}
                        className="block text-5xl font-light text-white/10 group-hover:text-white/30 transition-colors duration-300 font-sans tracking-tighter"
                    >
                        {pillar.num}
                    </motion.span>
                    
                    <div className="space-y-3">
                        <h3 className={`font-extrabold text-[20px] text-white transition-colors duration-300 ${
                            pillar.num === "02" || pillar.num === "04"
                                ? 'group-hover:text-[#800A15]'
                                : 'group-hover:text-[#003C8F]'
                        }`}>
                            {pillar.title}
                        </h3>
                        <p className="text-[15px] font-semibold text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                            {pillar.description}
                        </p>
                    </div>
                </div>

                {/* Arrow indicator slide-in at the bottom */}
                <div 
                    className="pt-6 flex justify-start items-center gap-1.5 text-xs font-extrabold tracking-wider uppercase text-slate-500 group-hover:text-white transition-colors duration-300 relative z-10"
                    style={{ transform: 'translateZ(15px)' }}
                >
                    Saber más
                    <svg className="w-3.5 h-3.5 transition-all duration-300 translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </div>
            </motion.div>
        </ScrollReveal>
    );
}

export default function WhyChooseUs() {
    const pillars = [
        {
            num: "01",
            title: "Excelencia Académica",
            description: "Plan de estudios riguroso e innovador que fomenta el pensamiento crítico y prepara a los estudiantes para los estándares de educación superior del país."
        },
        {
            num: "02",
            title: "Formación en Valores",
            description: "Fundamentados en el Sistema Preventivo Salesiano (Razón, Religión y Amor), inculcamos valores éticos y cristianos para formar buenos cristianos y honestos ciudadanos."
        },
        {
            num: "03",
            title: "Docentes Comprometidos",
            description: "Un equipo docente altamente calificado con metodologías innovadoras y acompañamiento personalizado para potenciar el talento único de cada alumno."
        },
        {
            num: "04",
            title: "Entorno Seguro",
            description: "Aulas inteligentes, laboratorios de robótica y amplios espacios recreativos en un entorno protegido y de sana convivencia salesiana."
        }
    ];

    return (
        <section className="relative py-36 lg:py-48 bg-[#08111F] overflow-hidden select-none">
            
            {/* Top Wave (White SVG transition) */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path d="M0,0 C380,90 760,10 1080,70 C1200,90 1320,80 1440,40 L1440,0 L0,0 Z" fill="#ffffff"></path>
                </svg>
            </div>

            {/* Background glowing effects for visual depth */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#003C8F]/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#800A15]/8 rounded-full blur-[140px] pointer-events-none z-0"></div>

            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-20 relative z-10">
                
                {/* Section Header */}
                <div className="max-w-2xl text-left space-y-4">
                    <ScrollReveal distance="translate-y-6">
                        <span className="text-[#800A15] text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                            DIFERENCIAL
                        </span>
                    </ScrollReveal>
                    <ScrollReveal distance="translate-y-6" delay={150}>
                        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white leading-[1.05] tracking-tight font-sans">
                            Pilares de nuestra excelencia
                        </h2>
                    </ScrollReveal>
                </div>

                {/* 3D Tilt Glassmorphic Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pillars.map((pillar, index) => (
                        <TiltCard key={index} pillar={pillar} index={index} />
                    ))}
                </div>

            </div>

            {/* Bottom Wave (White SVG transition back to white background) */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path d="M0,100 C380,10 760,90 1080,30 C1200,10 1320,20 1440,60 L1440,100 L0,100 Z" fill="#ffffff"></path>
                </svg>
            </div>

        </section>
    );
}
