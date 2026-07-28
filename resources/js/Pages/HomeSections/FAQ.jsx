import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function FAQ({ preguntas }) {
    if (!preguntas || preguntas.length === 0) return null;

    const list = preguntas.map(p => ({
        question: p.pregunta ?? p.question,
        answer:   p.respuesta ?? p.answer,
    }));

    const [openIndex, setOpenIndex] = useState(null);

    const toggleIndex = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section className="relative py-24 lg:py-32 bg-white overflow-hidden select-none border-b border-slate-100">
            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-20">
                
                {/* Section Header */}
                <div className="max-w-2xl mx-auto text-center space-y-4">
                    <span className="text-[#800A15] text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                        SOPORTE
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-[56px] font-black text-[#08111F] leading-[1.05] tracking-tight font-sans">
                        Preguntas frecuentes
                    </h2>
                </div>

                {/* Minimalist divided accordion list (Stripe/Vercel style) */}
                <ScrollReveal 
                    distance="translate-y-12" 
                    delay={300} 
                    className="max-w-3xl mx-auto border-t border-b border-slate-100 divide-y divide-slate-100"
                >
                    {list.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div key={index} className="w-full">
                                {/* Accordion Header */}
                                <button
                                    onClick={() => toggleIndex(index)}
                                    className="w-full py-6 flex items-center justify-between text-left cursor-pointer focus:outline-none group"
                                >
                                    <span className="font-extrabold text-[17px] md:text-[19px] text-[#08111F] group-hover:text-[#003C8F] transition-colors duration-300 pr-8">
                                        {item.question}
                                    </span>
                                    {/* Minimal Plus/Minus Icon */}
                                    <span className="text-slate-400 group-hover:text-[#003C8F] transition-colors duration-300 shrink-0 pr-2">
                                        {isOpen ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        )}
                                    </span>
                                </button>

                                {/* Accordion Content Grid-Rows Transition */}
                                <div className={`grid transition-all duration-300 ease-in-out ${
                                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                }`}>
                                    <div className="overflow-hidden">
                                        <p className="text-sm lg:text-base font-semibold text-slate-500 leading-relaxed pb-6 pr-8">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollReveal>

            </div>
        </section>
    );
}
