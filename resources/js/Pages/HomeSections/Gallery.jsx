import ScrollReveal from './ScrollReveal';

export default function Gallery() {
    const items = [
        {
            title: "Aulas de Innovación",
            category: "Instalaciones",
            size: "col-span-12 md:col-span-8 h-[350px]",
            image: "/Estudiantes COLSIH.png"
        },
        {
            title: "Biblioteca Escolar",
            category: "Espacios de Lectura",
            size: "col-span-12 md:col-span-4 h-[350px]",
            image: "/Estudiantes COLSIH.png"
        },
        {
            title: "Zonas Deportivas",
            category: "Deportes y Convivencia",
            size: "col-span-12 md:col-span-4 h-[300px]",
            image: "/Estudiantes COLSIH.png"
        },
        {
            title: "Laboratorio de Ciencias",
            category: "Investigación",
            size: "col-span-12 md:col-span-8 h-[300px]",
            image: "/Estudiantes COLSIH.png"
        }
    ];

    return (
        <section className="relative py-28 lg:py-36 bg-white overflow-hidden select-none">
            {/* Background Blob decoration */}
            <div className="absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full bg-[#800A15]/5 blur-[130px] pointer-events-none"></div>

            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-16">
                
                {/* Section Header */}
                <div className="max-w-2xl text-left space-y-4">
                    <ScrollReveal distance="translate-y-8" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#800A15]/10 text-[#800A15] text-[13px] font-bold tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#800A15]"></span>
                        Galería
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
                            <div className="w-full h-full relative overflow-hidden rounded-3xl group cursor-pointer shadow-sm border border-slate-100/50">
                                {/* Gradient dark overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#08111F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-500 pointer-events-none" />
                                
                                {/* Image */}
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    loading="lazy"
                                    className="w-full h-full object-cover grayscale transition-all duration-[1200ms] group-hover:scale-105 group-hover:grayscale-0"
                                />

                                {/* Floating info (Overlay title) */}
                                <div className="absolute bottom-6 left-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-left">
                                    <span className="block text-[11px] font-extrabold uppercase tracking-widest text-[#800A15]">
                                        {item.category}
                                    </span>
                                    <h3 className="text-[20px] font-black text-white mt-1 leading-tight tracking-tight">
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
