import ScrollReveal from './ScrollReveal';

export default function WhyChooseUs() {
    const cards = [
        {
            title: "Excelencia Académica",
            description: "Plan de estudios riguroso e innovador que fomenta el pensamiento crítico y prepara a los estudiantes para los estándares de educación superior del país.",
            icon: (
                <svg className="w-8 h-8 text-[#0057D9] transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            hoverGradient: "group-hover:border-[#0057D9]/30 group-hover:shadow-[0_20px_50px_rgba(0,87,217,0.06)]"
        },
        {
            title: "Formación en Valores",
            description: "Inspirados en la filosofía franciscana, inculcamos el respeto por la vida, la justicia social, el cuidado ambiental y el compromiso con la paz.",
            icon: (
                <svg className="w-8 h-8 text-[#E31C23] transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            hoverGradient: "group-hover:border-[#E31C23]/30 group-hover:shadow-[0_20px_50px_rgba(227,28,35,0.06)]"
        },
        {
            title: "Docentes Comprometidos",
            description: "Un equipo docente altamente calificado con metodologías innovadoras y acompañamiento personalizado para potenciar el talento único de cada alumno.",
            icon: (
                <svg className="w-8 h-8 text-[#0057D9] transition-transform duration-300 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            hoverGradient: "group-hover:border-[#0057D9]/30 group-hover:shadow-[0_20px_50px_rgba(0,87,217,0.06)]"
        },
        {
            title: "Entorno Conectado y Seguro",
            description: "Modernas instalaciones con aulas inteligentes, laboratorios de vanguardia y espacios recreativos en un entorno protegido y de sana convivencia.",
            icon: (
                <svg className="w-8 h-8 text-[#E31C23] transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            hoverGradient: "group-hover:border-[#E31C23]/30 group-hover:shadow-[0_20px_50px_rgba(227,28,35,0.06)]"
        }
    ];

    return (
        <section className="relative py-28 lg:py-36 bg-white overflow-hidden select-none">
            {/* Soft decorative background circles */}
            <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-[#E31C23]/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] text-center space-y-20">
                
                {/* Section Header */}
                <div className="max-w-2xl mx-auto space-y-4">
                    <ScrollReveal distance="translate-y-8" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E31C23]/10 text-[#E31C23] text-[13px] font-bold tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E31C23]"></span>
                        ¿Por qué elegirnos?
                    </ScrollReveal>
                    <ScrollReveal distance="translate-y-8" delay={150}>
                        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                            Pilares de nuestra excelencia
                        </h2>
                    </ScrollReveal>
                </div>

                {/* Staggered Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cards.map((card, index) => (
                        <ScrollReveal 
                            key={index}
                            distance="translate-y-16"
                            delay={index * 150}
                            className="h-full"
                        >
                            <div className={`h-full border border-slate-100 p-8 rounded-3xl bg-white transition-all duration-500 relative group overflow-hidden hover:-translate-y-2 flex flex-col justify-between ${card.hoverGradient}`}>
                                {/* Gradient hover border trace */}
                                <div className="absolute inset-0 rounded-3xl border border-transparent transition-all duration-300 pointer-events-none" />
                                
                                <div className="space-y-6">
                                    {/* Icon container */}
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center transition-colors group-hover:bg-slate-100 shrink-0">
                                        {card.icon}
                                    </div>
                                    <div className="space-y-3 text-left">
                                        <h3 className="font-extrabold text-[20px] text-[#08111F]">
                                            {card.title}
                                        </h3>
                                        <p className="text-sm font-semibold text-slate-500 leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Arrow interaction link */}
                                <div className="pt-6 flex justify-start items-center gap-1.5 text-xs font-extrabold tracking-wider uppercase text-slate-400 group-hover:text-slate-800 transition-colors">
                                    Saber más
                                    <svg className="w-3.5 h-3.5 transition-all duration-300 translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

            </div>
        </section>
    );
}
