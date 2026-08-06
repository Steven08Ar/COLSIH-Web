import { Link } from '@inertiajs/react';
import ScrollReveal from './ScrollReveal';
import { mediaUrl } from '@/utils/mediaUrl';

export default function News({ noticias }) {
    if (!noticias || noticias.length === 0) return null;

    const activeNews = noticias.slice(0, 3);

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
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[#003C8F]/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-16">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                    <div className="text-left space-y-4 max-w-xl">
                        <ScrollReveal distance="translate-y-8" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#800A15]/10 text-[#800A15] text-[13px] font-bold tracking-widest uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#800A15]"></span>
                            Nuestra Comunidad
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-8" delay={150}>
                            <h2 className="text-3xl sm:text-4xl lg:text-[56px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Últimas noticias y eventos
                            </h2>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal distance="translate-y-8" delay={250} className="shrink-0">
                        <Link 
                            href="/noticias" 
                            className="group inline-flex items-center gap-2 text-sm font-extrabold text-[#800A15] hover:text-[#c4181e] transition-colors"
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
                            <Link 
                                href={`/noticias/${item.slug}`}
                                className="block h-full cursor-pointer group"
                            >
                                <article className="h-full bg-white rounded-3xl border border-slate-100/60 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                                    
                                    {/* Image cover */}
                                    <div className="aspect-video w-full overflow-hidden bg-slate-50 relative shrink-0">
                                        {item.imagen ? (
                                            <img 
                                                src={mediaUrl(item.imagen)} 
                                                alt={item.titulo} 
                                                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-50 relative">
                                                {/* Grayscale school image fallback */}
                                                <img src="https://media.colsih.edu.co/home/estudiantes-colsih.png" alt="COLSIH" className="w-full h-full object-cover grayscale opacity-15" />
                                                <img src="/marca/logo-colsih.svg" alt="Logo COLSIH" className="w-14 h-auto opacity-10 absolute center" />
                                            </div>
                                        )}
                                        {item.categoria && (
                                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#08111F] font-extrabold text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-xs">
                                                {item.categoria}
                                            </span>
                                        )}
                                    </div>
 
                                    {/* Body */}
                                    <div className="p-5 sm:p-8 flex-grow flex flex-col justify-between text-left space-y-6">
                                        <div className="space-y-3">
                                            <time className="text-[10px] font-black text-slate-400 uppercase tracking-widest" dateTime={item.publicado_en}>
                                                {formatDate(item.publicado_en)}
                                            </time>
                                            <h3 className="font-extrabold text-[20px] text-[#08111F] leading-snug group-hover:text-[#800A15] transition-colors duration-200">
                                                {item.titulo}
                                            </h3>
                                            <p className="text-xs font-semibold text-slate-500 line-clamp-3 leading-relaxed">
                                                {item.resumen}
                                            </p>
                                        </div>
 
                                        {/* Arrow slides on hover link */}
                                        <div className="pt-2">
                                            <div 
                                                className="inline-flex items-center gap-2 text-xs font-extrabold text-[#08111F] group-hover:text-[#800A15] uppercase tracking-wider transition-colors"
                                            >
                                                Leer noticia
                                                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
 
                                </article>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>

            </div>
        </section>
    );
}
