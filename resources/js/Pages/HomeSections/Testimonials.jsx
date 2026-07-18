import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

const FALLBACK = [
    {
        texto: 'La educacion integral del colegio potencio mi excelencia academica y me enseno el valor de liderar con justicia social y valores cristianos.',
        nombre: 'Maria Camila Restrepo',
        cargo: 'Egresada Promocion 2024',
    },
    {
        texto: 'Como padre de familia, me siento plenamente respaldado. El acompanamiento docente y la formacion en valores salesianos guia a mis hijos cada dia.',
        nombre: 'Dr. Alejandro Gomez',
        cargo: 'Padre de Familia - Primaria',
    },
    {
        texto: 'Aprender con laboratorios interactivos me motiva a explorar mi pasion por la ciencia. Los profesores siempre nos impulsan a ir mas alla.',
        nombre: 'Mateo Suarez',
        cargo: 'Estudiante de 10 Grado',
    },
];

export default function Testimonials({ testimonios }) {
    const list = (testimonios && testimonios.length > 0 ? testimonios : FALLBACK).map(t => ({
        quote: `«${t.texto}»`,
        name: t.nombre,
        program: t.cargo ?? '',
        image: '/Estudiantes COLSIH.png',
    }));

    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % list.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
    };

    useEffect(() => {
        const interval = setInterval(handleNext, 7000);
        return () => clearInterval(interval);
    }, []);

    const activeItem = list[activeIndex];

    return (
        <section className="relative py-24 lg:py-32 bg-white overflow-hidden select-none border-b border-slate-100">
            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-16">
                
                {/* Section Header */}
                <div className="max-w-2xl mx-auto text-center space-y-4">
                    <span className="text-[#800A15] text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                        TESTIMONIOS
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#08111F] leading-[1.05] tracking-tight font-sans">
                        Nuestra voz comunitaria
                    </h2>
                </div>

                {/* Typography Testimonial Slider (No bulky cards or box shadows) */}
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-10 min-h-[320px] justify-center relative">
                    
                    {/* Big Quote text in italic serif-like styling */}
                    <div className="space-y-6 animate-fadeIn">
                        <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-medium italic text-slate-800 leading-relaxed max-w-3xl mx-auto font-sans tracking-tight">
                            {activeItem.quote}
                        </blockquote>
                    </div>

                    {/* Author Details Block */}
                    <div className="flex flex-col items-center space-y-3 animate-fadeIn">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100">
                            <img 
                                src={activeItem.image} 
                                alt={activeItem.name} 
                                className="w-full h-full object-cover grayscale"
                            />
                        </div>
                        <div>
                            <cite className="not-italic block text-base font-extrabold text-[#08111F]">
                                {activeItem.name}
                            </cite>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                                {activeItem.program}
                            </span>
                        </div>
                    </div>

                    {/* Minimal Slider Dot Indicators & Arrows */}
                    <div className="flex items-center gap-6 pt-4">
                        {/* Prev Arrow */}
                        <button 
                            onClick={handlePrev}
                            className="w-10 h-10 rounded-full border border-slate-100 text-slate-400 hover:text-[#003C8F] hover:border-[#003C8F]/30 flex items-center justify-center transition-all cursor-pointer focus:outline-none"
                            aria-label="Anterior testimonio"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        {/* Pagination dots */}
                        <div className="flex gap-2">
                            {list.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        activeIndex === index ? 'w-6 bg-[#800A15]' : 'w-2 bg-slate-200'
                                    } cursor-pointer focus:outline-none`}
                                    aria-label={`Ir al testimonio ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Next Arrow */}
                        <button 
                            onClick={handleNext}
                            className="w-10 h-10 rounded-full border border-slate-100 text-slate-400 hover:text-[#003C8F] hover:border-[#003C8F]/30 flex items-center justify-center transition-all cursor-pointer focus:outline-none"
                            aria-label="Siguiente testimonio"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
}
