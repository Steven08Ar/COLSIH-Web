import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

export default function Programs() {
    // Default to Primaria (index 1) expanded
    const [hoveredIndex, setHoveredIndex] = useState(1);

    const list = [
        {
            num: "01",
            title: "Preescolar",
            tagline: "Sembrando la curiosidad",
            description: "Enfoque lúdico e interactivo diseñado para promover las habilidades sociales, motoras y cognitivas básicas en un ambiente estimulante y seguro bajo la pedagogía de la confianza.",
            duration: "3 Años (Prejardín a Transición)",
            image: "/Estudiantes COLSIH.png",
            ctaLink: "/oferta-academica",
            ctaText: "Explorar Preescolar"
        },
        {
            num: "02",
            title: "Primaria",
            tagline: "Bases intelectuales y morales",
            description: "Desarrollo profundo de habilidades lógicas, matemáticas, lectoescritura e inglés. Potenciamos el trabajo colaborativo y la formación de valores salesianos en una cultura de paz.",
            duration: "5 Años (Primero a Quinto)",
            image: "/Estudiantes COLSIH.png",
            ctaLink: "/oferta-academica",
            ctaText: "Explorar Primaria"
        },
        {
            num: "03",
            title: "Bachillerato",
            tagline: "Liderazgo, ciencia e innovación",
            description: "Preparación académica avanzada con énfasis en la Media Técnica comercial y contable en convenio de articulación con el SENA, capacitando laboralmente a nuestros egresados.",
            duration: "6 Años (Sexto a Undécimo)",
            image: "/Estudiantes COLSIH.png",
            ctaLink: "/oferta-academica",
            ctaText: "Explorar Bachillerato"
        }
    ];

    return (
        <section className="relative py-24 lg:py-32 bg-white overflow-hidden select-none border-b border-slate-100">
            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-20">
                
                {/* Section Header */}
                <div className="max-w-2xl text-left space-y-4">
                    <ScrollReveal distance="translate-y-6">
                        <span className="text-[#800A15] text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                            NIVELES
                        </span>
                    </ScrollReveal>
                    <ScrollReveal distance="translate-y-6" delay={150}>
                        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#08111F] leading-[1.05] tracking-tight font-sans">
                            Nuestra oferta académica
                        </h2>
                    </ScrollReveal>
                </div>

                {/* Interactive Expanding Accordion Panels */}
                <div className="flex flex-col lg:flex-row items-stretch gap-6 h-auto lg:h-[580px] w-full min-h-[580px]">
                    {list.map((item, index) => {
                        const isExpanded = hoveredIndex === index;

                        return (
                            <div
                                key={index}
                                onMouseEnter={() => setHoveredIndex(index)}
                                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between ${
                                    isExpanded 
                                        ? 'flex-[2.5] h-[480px] lg:h-full bg-slate-900 border-transparent shadow-xl' 
                                        : 'flex-[1] h-[180px] lg:h-full bg-slate-950 border border-white/5'
                                }`}
                            >
                                {/* Layer 1: Background Image with elegant transitions */}
                                <div className="absolute inset-0 w-full h-full z-0 transition-transform duration-[1200ms] ease-out">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className={`w-full h-full object-cover transition-all duration-700 ${
                                            isExpanded 
                                                ? 'scale-103 grayscale-0 brightness-[0.35]' 
                                                : 'scale-100 grayscale brightness-[0.15] blur-[1px]'
                                        }`}
                                    />
                                </div>

                                {/* Layer 2: Interactive Content Overlays */}
                                <div className="relative z-10 w-full h-full p-8 md:p-10 flex flex-col justify-between items-start text-left">
                                    
                                    {/* Top row: Number badge */}
                                    <div className="w-full flex justify-between items-start">
                                        <span className={`text-3xl font-light font-sans tracking-tighter transition-colors duration-300 ${
                                            isExpanded ? 'text-[#003C8F]' : 'text-slate-500'
                                        }`}>
                                            {item.num}
                                        </span>
                                        {!isExpanded && (
                                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 lg:hidden">
                                                {item.duration}
                                            </span>
                                        )}
                                    </div>

                                    {/* Middle/Bottom block: Animated text reveals */}
                                    <div className="w-full flex flex-col lg:flex-row justify-between items-end gap-6 mt-auto">
                                        
                                        {/* Left text column */}
                                        <div className="space-y-3 max-w-xl">
                                            {/* Accordion title block */}
                                            <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors duration-300 ${
                                                isExpanded ? 'text-white' : 'text-slate-400'
                                            }`}>
                                                {item.title}
                                            </h3>

                                            {/* Expand details on hover */}
                                            <AnimatePresence initial={false}>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                                        className="space-y-4 overflow-hidden"
                                                    >
                                                        <p className="text-xs font-extrabold text-[#800A15] tracking-widest uppercase">
                                                            {item.tagline}
                                                        </p>
                                                        <p className="text-sm font-medium text-slate-300 leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                        <span className="block text-xs font-bold text-slate-400">
                                                            {item.duration}
                                                        </span>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Right action column: Link triggers */}
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.1, duration: 0.3 }}
                                                className="shrink-0 pt-2 lg:pt-0"
                                            >
                                                <Link
                                                    href={item.ctaLink}
                                                    className="inline-flex items-center gap-2 bg-white text-[#08111F] hover:bg-[#003C8F] hover:text-white font-extrabold text-xs uppercase tracking-wider px-6 py-4.5 rounded-xl transition-all cursor-pointer focus:outline-none"
                                                >
                                                    {item.ctaText}
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                    </svg>
                                                </Link>
                                            </motion.div>
                                        )}

                                    </div>

                                </div>

                                {/* Desktop vertical spine text label if contracted */}
                                {!isExpanded && (
                                    <div 
                                        className="absolute hidden lg:flex items-center justify-center pointer-events-none z-10"
                                        style={{
                                            left: '50%',
                                            top: '45%',
                                            transform: 'translate(-50%, -50%) rotate(90deg)',
                                            width: '300px',
                                            transformOrigin: 'center center'
                                        }}
                                    >
                                        <span className="text-xs font-extrabold uppercase tracking-[4px] text-slate-500 whitespace-nowrap">
                                            {item.title}
                                        </span>
                                    </div>
                                )}

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
