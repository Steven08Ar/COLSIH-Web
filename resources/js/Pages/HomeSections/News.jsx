import { Link } from '@inertiajs/react';
import ScrollReveal from './ScrollReveal';

export default function News({ noticias }) {
    // Elegant fallback news items if the DB is empty
    const fallbackNews = [
        {
            id: 1,
            titulo: "Inauguración de los nuevos laboratorios de robótica y tecnología",
            resumen: "COLSIH estrena modernas instalaciones diseñadas para fomentar las competencias STEM en programación y diseño 3D desde grados de primaria.",
            slug: "inauguracion-laboratorios-robotica",
            imagen: null,
            categoria: "Tecnología",
            publicado_en: "2026-07-10"
        },
        {
            id: 2,
            titulo: "Excelente desempeño de la promoción 2025 en las Pruebas Saber 11",
            resumen: "Nuestros estudiantes se posicionan nuevamente en el nivel Muy Superior, destacando el liderazgo académico integral que nos caracteriza.",
            slug: "excelente-desempeno-pruebas-saber",
            imagen: null,
            categoria: "Académico",
            publicado_en: "2026-06-25"
        },
        {
            id: 3,
            titulo: "Olimpiadas Deportivas Franciscanas y convivencia COLSIH 2026",
            resumen: "Una semana dedicada al deporte, la sana recreación y el fortalecimiento de los valores de solidaridad y paz de toda la comunidad educativa.",
            slug: "olimpiadas-deportivas-franciscanas",
            imagen: null,
            categoria: "Comunidad",
            publicado_en: "2026-06-18"
        }
    ];

    const activeNews = noticias && noticias.length > 0 ? noticias.slice(0, 3) : fallbackNews;

    const formatDate = (dateStr) => {
        try {
            return new Date(dateStr).toLocaleDateString('es-CO', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <section className="relative py-28 lg:py-36 bg-[#F8F9FB] overflow-hidden select-none">
            {/* Background Blob decoration */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[#0057D9]/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-16">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                    <div className="text-left space-y-4 max-w-xl">
                        <ScrollReveal distance="translate-y-8" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E31C23]/10 text-[#E31C23] text-[13px] font-bold tracking-widest uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E31C23]"></span>
                            Nuestra Comunidad
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-8" delay={150}>
                            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Últimas noticias y eventos
                            </h2>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal distance="translate-y-8" delay={250} className="shrink-0">
                        <Link 
                            href="/noticias" 
                            className="group inline-flex items-center gap-2 text-sm font-extrabold text-[#E31C23] hover:text-[#c4181e] transition-colors"
                        >
                            Ver todas las noticias
                            <svg className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </ScrollReveal>
                </div>

                {/* News 3-column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activeNews.map((item, index) => (
                        <ScrollReveal 
                            key={item.id}
                            distance="translate-y-16"
                            delay={index * 150}
                            className="h-full"
                        >
                            <article className="h-full bg-white rounded-3xl border border-slate-100/60 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                                
                                {/* Image cover */}
                                <div className="aspect-video w-full overflow-hidden bg-slate-50 relative shrink-0">
                                    {item.imagen ? (
                                        <img 
                                            src={`/storage/${item.imagen}`} 
                                            alt={item.titulo} 
                                            className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-50 relative">
                                            {/* Grayscale school image fallback */}
                                            <img src="/Estudiantes COLSIH.png" alt="COLSIH" className="w-full h-full object-cover grayscale opacity-15" />
                                            <img src="/Logo COLSIH.svg" alt="Logo COLSIH" className="w-14 h-auto opacity-10 absolute center" />
                                        </div>
                                    )}
                                    {item.categoria && (
                                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#08111F] font-extrabold text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-xs">
                                            {item.categoria}
                                        </span>
                                    )}
                                </div>

                                {/* Body */}
                                <div className="p-8 flex-grow flex flex-col justify-between text-left space-y-6">
                                    <div className="space-y-3">
                                        <time className="text-[10px] font-black text-slate-400 uppercase tracking-widest" dateTime={item.publicado_en}>
                                            {formatDate(item.publicado_en)}
                                        </time>
                                        <h3 className="font-extrabold text-[20px] text-[#08111F] leading-snug group-hover:text-[#E31C23] transition-colors duration-200">
                                            <Link href={`/noticias/${item.slug}`} className="focus:outline-none">
                                                {item.titulo}
                                            </Link>
                                        </h3>
                                        <p className="text-xs font-semibold text-slate-500 line-clamp-3 leading-relaxed">
                                            {item.resumen}
                                        </p>
                                    </div>

                                    {/* Arrow slides on hover link */}
                                    <div className="pt-2">
                                        <Link 
                                            href={`/noticias/${item.slug}`}
                                            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#08111F] group-hover:text-[#E31C23] uppercase tracking-wider transition-colors"
                                        >
                                            Leer noticia
                                            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>

                            </article>
                        </ScrollReveal>
                    ))}
                </div>

            </div>
        </section>
    );
}
