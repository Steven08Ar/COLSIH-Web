import ScrollReveal from './ScrollReveal';

const R2_ESPACIOS_BASE = "https://media.colsih.edu.co/espacios_academicos/";

export default function Gallery() {
    const items = [
        {
            title: "Aulas de Tecnología e Informática",
            category: "Instalaciones de Vanguardia",
            size: "col-span-12 md:col-span-8 h-[350px] md:h-[400px]",
            image: `${R2_ESPACIOS_BASE}informatica_A.JPG`
        },
        {
            title: "Biblioteca Escolar",
            category: "Espacios de Lectura",
            size: "col-span-12 md:col-span-4 h-[350px] md:h-[400px]",
            image: `${R2_ESPACIOS_BASE}biblioteca.JPG`
        },
        {
            title: "Cancha Múltiple y Zonas Deportivas",
            category: "Deportes y Convivencia",
            size: "col-span-12 md:col-span-4 h-[320px] md:h-[360px]",
            image: `${R2_ESPACIOS_BASE}cancha.JPG`
        },
        {
            title: "Parque e Instalaciones de Preescolar",
            category: "Recreación e Infancia",
            size: "col-span-12 md:col-span-8 h-[320px] md:h-[360px]",
            image: `${R2_ESPACIOS_BASE}jardin.JPG`
        }
    ];

    return (
        <section className="relative py-28 lg:py-36 bg-white overflow-hidden select-none">
            {/* Background Blob decoration */}
            <div className="absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full bg-[#800A15]/5 blur-[130px] pointer-events-none"></div>

            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-16">
                
                {/* Section Header */}
                <div className="max-w-2xl text-left space-y-4">
                    <ScrollReveal distance="translate-y-8" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#800A15]/10 text-[#800A15] text-[13px] font-extrabold tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#800A15]"></span>
                        Nuestra Infraestructura
                    </ScrollReveal>
                    <ScrollReveal distance="translate-y-8" delay={150}>
                        <h2 className="text-3xl sm:text-4xl lg:text-[56px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                            Nuestros espacios educativos
                        </h2>
                    </ScrollReveal>
                </div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-12 gap-6">
                    {items.map((item, index) => (
                        <ScrollReveal 
                            key={index}
                            distance="translate-y-16"
                            delay={index * 150}
                            className={item.size}
                        >
                            <div className="w-full h-full relative overflow-hidden rounded-3xl group cursor-pointer shadow-lg border border-slate-100/80">
                                {/* Gradient dark overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#08111F]/90 via-[#08111F]/30 to-transparent opacity-80 group-hover:opacity-95 z-10 transition-opacity duration-500 pointer-events-none" />
                                
                                {/* Image */}
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-all duration-[1000ms] group-hover:scale-105"
                                />

                                {/* Floating info (Overlay title) */}
                                <div className="absolute bottom-6 left-6 right-6 z-20 transition-all duration-500 text-left">
                                    <span className="inline-block px-3 py-1 rounded-full bg-[#800A15] text-[11px] font-extrabold uppercase tracking-widest text-white shadow-md mb-2">
                                        {item.category}
                                    </span>
                                    <h3 className="text-[22px] md:text-[26px] font-black text-white leading-tight tracking-tight drop-shadow-md">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

            </div>
        </section>
    );
}
