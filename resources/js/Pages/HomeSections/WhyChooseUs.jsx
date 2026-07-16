import ScrollReveal from './ScrollReveal';

export default function WhyChooseUs() {
    const pillars = [
        {
            num: "01",
            title: "Excelencia Académica",
            description: "Plan de estudios riguroso e innovador que fomenta el pensamiento crítico y prepara a los estudiantes para los estándares de educación superior del país.",
            accentColor: "bg-[#0057D9]"
        },
        {
            num: "02",
            title: "Formación en Valores",
            description: "Fundamentados en el Sistema Preventivo Salesiano (Razón, Religión y Amor), inculcamos valores éticos y cristianos para formar buenos cristianos y honestos ciudadanos.",
            accentColor: "bg-[#E31C23]"
        },
        {
            num: "03",
            title: "Docentes Comprometidos",
            description: "Un equipo docente altamente calificado con metodologías innovadoras y acompañamiento personalizado para potenciar el talento único de cada alumno.",
            accentColor: "bg-[#0057D9]"
        },
        {
            num: "04",
            title: "Entorno Seguro",
            description: "Aulas inteligentes, laboratorios de robótica y amplios espacios recreativos en un entorno protegido y de sana convivencia salesiana.",
            accentColor: "bg-[#E31C23]"
        }
    ];

    return (
        <section className="relative py-24 lg:py-32 bg-white overflow-hidden select-none border-b border-slate-100">
            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-20">
                
                {/* Section Header */}
                <div className="max-w-2xl text-left space-y-4">
                    <ScrollReveal distance="translate-y-6">
                        <span className="text-[#E31C23] text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                            DIFERENCIAL
                        </span>
                    </ScrollReveal>
                    <ScrollReveal distance="translate-y-6" delay={150}>
                        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#08111F] leading-[1.05] tracking-tight font-sans">
                            Pilares de nuestra excelencia
                        </h2>
                    </ScrollReveal>
                </div>

                {/* Flat Border-only Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b lg:border-r lg:border-l border-slate-100 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    {pillars.map((pillar, index) => (
                        <ScrollReveal 
                            key={index}
                            distance="translate-y-8"
                            delay={index * 100}
                            className="relative group p-8 md:p-10 lg:p-12 transition-all duration-300 hover:bg-slate-50/50 flex flex-col justify-between min-h-[300px]"
                        >
                            <div className="space-y-6 text-left">
                                {/* Number Marker in fine serif/sans format */}
                                <span className="block text-4xl font-light text-slate-200 group-hover:text-[#0057D9] transition-colors duration-300 font-sans tracking-tighter">
                                    {pillar.num}
                                </span>
                                
                                <div className="space-y-3">
                                    <h3 className="font-extrabold text-[20px] text-[#08111F] group-hover:text-[#0057D9] transition-colors duration-300">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-[15px] font-semibold text-slate-500 leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </div>
                            </div>

                            {/* Minimal slide up accent bar indicator on hover */}
                            <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-transparent transition-all duration-300 group-hover:${pillar.accentColor}`} />
                        </ScrollReveal>
                    ))}
                </div>

            </div>
        </section>
    );
}
