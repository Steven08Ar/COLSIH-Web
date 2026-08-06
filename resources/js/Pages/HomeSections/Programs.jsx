import { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import ScrollReveal from './ScrollReveal';

export default function Programs() {
    // Default to Primaria (index 1) expanded
    const [hoveredIndex, setHoveredIndex] = useState(1);
    const hoverTimeoutRef = useRef(null);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

    const handleMouseEnter = (index) => {
        // Desktop only (>= 1024px)
        if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }

        // Must hover continuously for 250ms (quarter of a second) before expanding
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredIndex(index);
        }, 250);
    };

    const handleMouseLeave = () => {
        // If cursor leaves before 1 second, cancel expansion
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
    };

    const handleClick = (index) => {
        // On click (especially on mobile/responsive), expand immediately
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setHoveredIndex(index);
    };

    const list = [
        {
            num: "01",
            title: "Preescolar",
            tagline: "Sembrando la curiosidad",
            description: "Enfoque lúdico e interactivo diseñado para promover las habilidades sociales, motoras y cognitivas básicas en un ambiente estimulante y seguro bajo la pedagogía de la confianza.",
            duration: "3 Años (Prejardín a Transición)",
            image: "https://media.colsih.edu.co/ofertas_academicas/preescolar.JPG",
            imagePos: "object-[center_55%]",
            ctaLink: "/oferta-academica/preescolar",
            ctaText: "Explorar Preescolar"
        },
        {
            num: "02",
            title: "Primaria",
            tagline: "Bases intelectuales y morales",
            description: "Desarrollo profundo de habilidades lógicas, matemáticas, lectoescritura e inglés. Potenciamos el trabajo colaborativo y la formación de valores salesianos en una cultura de paz.",
            duration: "5 Años (Primero a Quinto)",
            image: "https://media.colsih.edu.co/ofertas_academicas/primaria.JPG",
            imagePos: "object-[center_80%]",
            ctaLink: "/oferta-academica/primaria",
            ctaText: "Explorar Primaria"
        },
        {
            num: "03",
            title: "Bachillerato",
            tagline: "Liderazgo, ciencia e innovación",
            description: "Preparación académica avanzada enfocada en el pensamiento crítico, la investigación y la excelencia, capacitando integralmente a nuestros jóvenes para la educación superior.",
            duration: "6 Años (Sexto a Undécimo)",
            image: "https://media.colsih.edu.co/ofertas_academicas/bachillerato.JPG",
            imagePos: "object-center",
            ctaLink: "/oferta-academica/bachillerato",
            ctaText: "Explorar Bachillerato"
        },
        {
            num: "04",
            title: "Técnico SENA",
            tagline: "Articulación con la Media Técnica",
            description: "Convenio institucional con el SENA. Formación como Técnico en Contabilización de Operaciones Comerciales y Financieras, con doble titulación oficial que prepara a nuestros bachilleres para el mundo profesional y universitario.",
            duration: "Grados 10° y 11° (Titulación Nacional)",
            image: "https://media.colsih.edu.co/ofertas_academicas/SENA.JPG",
            imagePos: "object-center",
            ctaLink: "/oferta-academica/sena",
            ctaText: "Explorar SENA"
        }
    ];

    return (
        <section className="relative py-24 lg:py-32 bg-white overflow-hidden select-none border-b border-slate-100">
            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-16">
                
                {/* Section Header */}
                <div className="max-w-2xl text-left space-y-4">
                    <ScrollReveal distance="translate-y-6">
                        <span className="text-[#800A15] text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                            NIVELES Y FORMACIÓN
                        </span>
                    </ScrollReveal>
                    <ScrollReveal distance="translate-y-6" delay={150}>
                        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#08111F] leading-[1.05] tracking-tight font-sans">
                            Nuestra oferta académica
                        </h2>
                    </ScrollReveal>
                </div>

                {/* Interactive Expanding Accordion Panels (GPU Accelerated, Ultra-Fluid 60 FPS) */}
                <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-5 h-auto lg:h-[560px] w-full lg:min-h-[560px]">
                    {list.map((item, index) => {
                        const isExpanded = hoveredIndex === index;
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={index}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(index)}
                                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between transform-gpu flex-none lg:will-change-[flex-grow] ${
                                    isExpanded 
                                        ? 'h-[420px] sm:h-[460px] lg:flex-[2.5] lg:h-full bg-slate-900 shadow-2xl ring-1 ring-white/10' 
                                        : 'h-[200px] sm:h-[220px] lg:flex-[1] lg:h-full bg-slate-950 border border-slate-200/20'
                                }`}
                            >
                                {/* Layer 1: Background Image with depth zoom */}
                                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        loading="lazy"
                                        decoding="async"
                                        className={`w-full h-full object-cover ${item.imagePos || 'object-center'} transform-gpu transition-all duration-700 ease-out ${
                                            isExpanded ? 'opacity-100 scale-105' : 'opacity-80 scale-100'
                                        }`}
                                    />
                                </div>

                                {/* Layer 2: Vibrant Gradient Overlay */}
                                <div className={`absolute inset-0 z-5 transition-opacity duration-500 pointer-events-none ${
                                    isExpanded 
                                        ? 'bg-gradient-to-t from-[#08111F]/95 via-[#08111F]/50 to-transparent opacity-100' 
                                        : 'bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent opacity-85'
                                }`} />

                                {/* Layer 3: Content Overlay */}
                                <div className="relative z-10 w-full h-full p-5 sm:p-8 flex flex-col justify-between items-start text-left">
                                    
                                    {/* Top row: Number badge & Mobile CTA button */}
                                    <div className="w-full flex justify-between items-center">
                                        <span className={`text-3xl font-black font-sans tracking-tighter transition-colors duration-300 ${
                                            isExpanded 
                                                ? (isEven ? 'text-[#800A15] dark:text-rose-400' : 'text-[#003C8F] dark:text-blue-400')
                                                : 'text-slate-300'
                                        }`}>
                                            {item.num}
                                        </span>

                                        {/* Mobile Only: CTA Button on Top Right when Expanded */}
                                        <div className={`lg:hidden transition-all duration-500 ease-out transform-gpu ${
                                            isExpanded ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                        }`}>
                                            <Link
                                                href={item.ctaLink}
                                                onClick={(e) => e.stopPropagation()}
                                                className={`inline-flex items-center gap-1.5 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-xl shadow-lg active:scale-95 transition-all cursor-pointer text-white ${
                                                    isEven 
                                                        ? 'bg-[#800A15] hover:bg-rose-900' 
                                                        : 'bg-[#003C8F] hover:bg-blue-900'
                                                }`}
                                            >
                                                <span>{item.ctaText}</span>
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Bottom block: Text reveals with GPU acceleration */}
                                    <div className="w-full flex flex-col lg:flex-row justify-between items-end gap-6 mt-auto">
                                        
                                        {/* Left text column */}
                                        <div className="space-y-1.5 sm:space-y-2.5 max-w-xl w-full">
                                            {/* Accordion title block */}
                                            <h3 className={`font-black tracking-tight transition-all duration-300 ${
                                                 isExpanded 
                                                     ? 'text-2xl sm:text-3xl lg:text-4xl text-white' 
                                                     : 'text-lg sm:text-xl text-slate-200 truncate'
                                             }`}>
                                                {item.title}
                                            </h3>

                                            {/* Smooth reveal container */}
                                            <div className={`transition-all duration-500 ease-out space-y-2 lg:space-y-3 overflow-hidden transform-gpu will-change-[opacity,max-height] ${
                                                isExpanded ? 'opacity-100 max-h-96 translate-y-0' : 'opacity-0 max-h-0 translate-y-2 pointer-events-none'
                                            }`}>
                                                <p className={`text-xs font-extrabold tracking-widest uppercase ${
                                                    isEven ? 'text-rose-400' : 'text-blue-400'
                                                }`}>
                                                    {item.tagline}
                                                </p>

                                                {/* Description Paragraph: Desktop Only */}
                                                <p className="hidden lg:block text-sm font-medium text-slate-200 leading-relaxed">
                                                    {item.description}
                                                </p>

                                                {/* Duration Badge: Desktop Only */}
                                                <span className="hidden lg:inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-slate-200 border border-white/15">
                                                    {item.duration}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right action button: Desktop Only */}
                                        <div className={`hidden lg:block shrink-0 pt-2 lg:pt-0 transition-all duration-500 delay-75 transform-gpu ${
                                            isExpanded ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-3 pointer-events-none'
                                        }`}>
                                            <Link
                                                href={item.ctaLink}
                                                className={`inline-flex items-center gap-2 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none w-full sm:w-auto justify-center sm:justify-start ${
                                                    isEven 
                                                        ? 'bg-[#800A15] hover:bg-rose-900 text-white' 
                                                        : 'bg-[#003C8F] hover:bg-blue-900 text-white'
                                                }`}
                                            >
                                                {item.ctaText}
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                </svg>
                                            </Link>
                                        </div>

                                    </div>

                                </div>

                                {/* Desktop vertical spine text label if contracted */}
                                {!isExpanded && (
                                    <>
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
                                            <span className="text-xs font-extrabold uppercase tracking-[4px] text-slate-200 drop-shadow-md whitespace-nowrap bg-slate-950/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
                                                {item.title}
                                            </span>
                                        </div>

                                        {/* Desktop duration label positioned at the bottom of the card */}
                                        <div 
                                            className="absolute hidden lg:flex items-center justify-center pointer-events-none z-10 w-full px-3 text-center"
                                            style={{
                                                bottom: '24px',
                                                left: '50%',
                                                transform: 'translateX(-50%)'
                                            }}
                                        >
                                            <span className="text-[9px] xl:text-[10px] font-extrabold uppercase tracking-widest text-slate-200 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-xl truncate max-w-[92%]">
                                                {item.duration}
                                            </span>
                                        </div>
                                    </>
                                )}

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
