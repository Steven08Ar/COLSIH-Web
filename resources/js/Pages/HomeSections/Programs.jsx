import { Link } from '@inertiajs/react';
import ScrollReveal from './ScrollReveal';

export default function Programs() {
    const programs = [
        {
            title: "Preescolar / Jardín",
            tagline: "Sembrando la curiosidad e imaginación",
            description: "Enfoque lúdico e interactivo diseñado para promover las habilidades sociales, motoras y cognitivas básicas. Fomentamos la fe y los valores desde los primeros años en un ambiente estimulante y seguro.",
            duration: "3 Años (Prejardín, Jardín y Transición)",
            image: "/Estudiantes COLSIH.png", // Reutilizando la imagen de alta calidad
            ctaLink: "/oferta-academica",
            ctaText: "Explorar Preescolar"
        },
        {
            title: "Primaria",
            tagline: "Construyendo las bases intelectuales y morales",
            description: "Desarrollo profundo de habilidades lógicas, de lectoescritura e idiomas. Potenciamos la creatividad, el trabajo colaborativo y la formación de valores cívicos y espirituales franciscanos.",
            duration: "5 Años (Primero a Quinto)",
            image: "/Estudiantes COLSIH.png",
            ctaLink: "/oferta-academica",
            ctaText: "Explorar Primaria"
        },
        {
            title: "Bachillerato",
            tagline: "Liderazgo, ciencia e innovación para el futuro",
            description: "Preparación académica avanzada enfocada en ciencias, tecnología y humanidades. Desarrollamos el liderazgo responsable, la ética profesional y preparamos a los estudiantes para el ingreso a la universidad.",
            duration: "6 Años (Sexto a Undécimo)",
            image: "/Estudiantes COLSIH.png",
            ctaLink: "/oferta-academica",
            ctaText: "Explorar Bachillerato"
        }
    ];

    return (
        <section className="relative py-28 lg:py-36 bg-[#F8F9FB] overflow-hidden select-none">
            {/* Background Blob decoration */}
            <div className="absolute top-1/3 left-0 w-[450px] h-[450px] rounded-full bg-[#0057D9]/5 blur-[130px] pointer-events-none"></div>

            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-20">
                
                {/* Section Header */}
                <div className="max-w-2xl text-left space-y-4">
                    <ScrollReveal distance="translate-y-8" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0057D9]/10 text-[#0057D9] text-[13px] font-bold tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0057D9]"></span>
                        Oferta Educativa
                    </ScrollReveal>
                    <ScrollReveal distance="translate-y-8" delay={150}>
                        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                            Nuestros niveles académicos
                        </h2>
                    </ScrollReveal>
                </div>

                {/* Alternating Horizontal Program Cards */}
                <div className="space-y-12">
                    {programs.map((program, index) => (
                        <ScrollReveal 
                            key={index}
                            distance="translate-y-16"
                            delay={index * 100}
                        >
                            <div className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:scale-[1.01] hover:rotate-[0.3deg] odd:hover:-rotate-[0.3deg] transition-all duration-500 grid grid-cols-1 md:grid-cols-12">
                                
                                {/* Image side (5 cols) - Alternates left/right on md screen */}
                                <div className={`col-span-12 md:col-span-5 relative aspect-video md:aspect-auto overflow-hidden min-h-[300px] ${
                                    index % 2 === 1 ? 'md:order-last' : ''
                                }`}>
                                    {/* Grayscale overlay with opacity transition */}
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 z-10 transition-colors duration-500" />
                                    <img 
                                        src={program.image} 
                                        alt={program.title} 
                                        className="w-full h-full object-cover grayscale transition-all duration-[1500ms] group-hover:scale-105 group-hover:grayscale-0"
                                    />
                                </div>

                                {/* Content side (7 cols) */}
                                <div className="col-span-12 md:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-between text-left space-y-8">
                                    <div className="space-y-4">
                                        <span className="text-[12px] font-extrabold uppercase tracking-widest text-[#0057D9]">
                                            {program.duration}
                                        </span>
                                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#08111F] tracking-tight">
                                            {program.title}
                                        </h3>
                                        <p className="text-slate-400 font-bold text-sm tracking-wide">
                                            {program.tagline}
                                        </p>
                                        <p className="text-base font-semibold text-slate-500 leading-relaxed max-w-2xl">
                                            {program.description}
                                        </p>
                                    </div>

                                    {/* Slide up CTA Link */}
                                    <div className="pt-2">
                                        <Link 
                                            href={program.ctaLink}
                                            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#E31C23] hover:text-[#c4181e] group/link transition-colors"
                                        >
                                            {program.ctaText}
                                            <svg className="w-4 h-4 transition-transform duration-300 translate-x-0 group-hover/link:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </ScrollReveal>
                    ))}
                </div>

            </div>
        </section>
    );
}
