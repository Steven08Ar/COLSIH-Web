import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Testimonials() {
    const list = [
        {
            quote: "La educación integral del colegio no solo potenció mi excelencia académica en ciencias, sino que me enseñó el verdadero valor de liderar con justicia social y valores cristianos.",
            name: "María Camila Restrepo",
            program: "Egresada Promoción 2024",
            image: "/Estudiantes COLSIH.png"
        },
        {
            quote: "Como padre de familia, me siento plenamente respaldado. El acompañamiento docente y la formación en valores franciscanos son el pilar fundamental que guía a mis hijos cada día.",
            name: "Dr. Alejandro Gómez",
            program: "Padre de Familia - Primaria",
            image: "/Estudiantes COLSIH.png"
        },
        {
            quote: "Aprender en aulas modernas con laboratorios interactivos me motiva a explorar mi pasión por la ciencia. Los profesores siempre nos impulsan a ir más allá.",
            name: "Mateo Suárez",
            program: "Estudiante de 10º Grado",
            image: "/Estudiantes COLSIH.png"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % list.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
    };

    // Auto-advance
    useEffect(() => {
        const interval = setInterval(handleNext, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative py-28 lg:py-36 bg-[#F8F9FB] overflow-hidden select-none">
            {/* Background Blob decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#0057D9]/5 blur-[130px] pointer-events-none"></div>

            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-16">
                
                {/* Section Header */}
                <div className="max-w-2xl mx-auto text-center space-y-4">
                    <ScrollReveal distance="translate-y-8" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0057D9]/10 text-[#0057D9] text-[13px] font-bold tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0057D9]"></span>
                        Testimonios
                    </ScrollReveal>
                    <ScrollReveal distance="translate-y-8" delay={150}>
                        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                            Nuestra voz comunitaria
                        </h2>
                    </ScrollReveal>
                </div>

                {/* Premium Testimonials Slide Deck */}
                <ScrollReveal distance="translate-y-16" delay={300} className="relative max-w-4xl mx-auto">
                    <div className="min-h-[350px] relative flex flex-col justify-center items-center">
                        {list.map((item, index) => {
                            const isActive = index === activeIndex;
                            const isPrev = index === (activeIndex - 1 + list.length) % list.length;
                            const isNext = index === (activeIndex + 1) % list.length;

                            let positionStyles = "opacity-0 scale-75 pointer-events-none z-0";
                            if (isActive) {
                                positionStyles = "opacity-100 scale-100 z-20 shadow-2xl relative";
                            } else if (isPrev) {
                                positionStyles = "opacity-40 scale-90 -translate-x-[20%] z-10 filter blur-[1.5px] absolute hidden md:flex";
                            } else if (isNext) {
                                positionStyles = "opacity-40 scale-90 translate-x-[20%] z-10 filter blur-[1.5px] absolute hidden md:flex";
                            }

                            return (
                                <div 
                                    key={index}
                                    className={`w-full max-w-3xl bg-white border border-slate-100 rounded-3xl p-8 md:p-12 transition-all duration-700 ease-out flex flex-col md:flex-row items-center gap-8 ${positionStyles}`}
                                >
                                    {/* Student photo (circle shape) */}
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shrink-0 border-2 border-slate-100/50 shadow-md">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover grayscale" 
                                        />
                                    </div>

                                    {/* Quote and credits */}
                                    <div className="space-y-6 text-left flex-grow">
                                        <div className="relative">
                                            {/* Decorative Quote Mark */}
                                            <span className="absolute -top-6 -left-3 text-7xl font-serif text-[#0057D9]/10 select-none pointer-events-none">“</span>
                                            <p className="text-[16px] md:text-[18px] font-medium text-slate-600 leading-relaxed italic relative z-10">
                                                {item.quote}
                                            </p>
                                        </div>
                                        <div className="border-t border-slate-100 pt-4">
                                            <span className="block font-black text-[#08111F] text-base leading-none">
                                                {item.name}
                                            </span>
                                            <span className="block text-xs font-bold text-slate-400 mt-1.5 uppercase tracking-wider">
                                                {item.program}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation buttons and Pagination dots */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-10">
                        {/* Arrows */}
                        <div className="flex gap-3 order-last sm:order-first">
                            <button 
                                onClick={handlePrev}
                                className="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-800 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-xs cursor-pointer focus:outline-none"
                                aria-label="Anterior testimonio"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button 
                                onClick={handleNext}
                                className="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-800 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-xs cursor-pointer focus:outline-none"
                                aria-label="Siguiente testimonio"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>

                        {/* Dots */}
                        <div className="flex items-center gap-2">
                            {list.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-2 rounded-full transition-all cursor-pointer focus:outline-none ${
                                        activeIndex === index ? 'w-6 bg-[#E31C23]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                                    }`}
                                    aria-label={`Ir al testimonio ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
}
