import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';

const CATEGORIAS = [
    { value: '', label: 'Todas' },
    { value: 'noticia', label: 'Noticias' },
    { value: 'evento', label: 'Eventos' },
    { value: 'comunicado', label: 'Comunicados' },
];

export default function NoticiasIndex({ noticias, categoriaActual }) {
    function filtrarPorCategoria(categoria) {
        router.get('/noticias', categoria ? { categoria } : {}, { preserveState: true });
    }

    const getBadgeStyle = (cat) => {
        switch (cat?.toLowerCase()) {
            case 'evento':
                return 'bg-[#800A15]/10 text-[#800A15] border-[#800A15]/20';
            case 'comunicado':
                return 'bg-[#FBBF24]/10 text-[#D97706] border-[#FBBF24]/20';
            default:
                return 'bg-[#003C8F]/10 text-[#003C8F] border-[#003C8F]/20';
        }
    };

    return (
        <AppLayout>
            <Head title="Comunidad y Noticias | COLSIH" />

            {/* 1. HERO SECTION (Dark theme matching brand style) */}
            <section className="relative pt-36 pb-32 md:pt-44 md:pb-40 bg-[#08111F] overflow-hidden select-none">
                
                {/* Glowing background elements */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#003C8F]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#800A15]/8 rounded-full blur-[120px] pointer-events-none z-0"></div>

                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-10 text-left">
                    <div className="max-w-3xl space-y-6">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#800A15] text-xs md:text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                                VIDA ESCOLAR
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black text-white leading-[1.05] tracking-tight font-sans">
                                Comunidad COLSIH
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-lg md:text-[20px] font-medium text-slate-300 leading-relaxed max-w-2xl font-sans">
                                Mantente al día con las últimas noticias, comunicados oficiales, logros escolares y eventos de nuestra familia salesiana.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Bottom Wave Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                    <svg className="relative block w-full h-[50px] md:h-[90px]" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path d="M0,100 C380,10 760,90 1080,30 C1200,10 1320,20 1440,60 L1440,100 L0,100 Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            {/* 2. MAIN LAYOUT (12 columns on desktop) */}
            <section className="relative py-20 bg-white overflow-hidden select-none">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        
                        {/* LEFT COLUMN: Sidebar (Filters & MJS Callout Card) */}
                        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
                            
                            {/* Filter panel */}
                            <div className="p-6 md:p-8 bg-slate-50 border border-slate-100 rounded-3xl text-left space-y-6">
                                <h2 className="text-lg font-black text-[#08111F] font-sans">
                                    Categorías
                                </h2>
                                <nav className="flex flex-col gap-2" aria-label="Filtrar por categoría">
                                    {CATEGORIAS.map((cat) => {
                                        const isActive = categoriaActual === cat.value || (!categoriaActual && cat.value === '');
                                        return (
                                            <button
                                                key={cat.value}
                                                onClick={() => filtrarPorCategoria(cat.value)}
                                                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-extrabold tracking-wider uppercase border transition-all duration-300 cursor-pointer ${
                                                    isActive 
                                                        ? 'bg-[#003C8F] text-white border-[#003C8F] shadow-sm'
                                                        : 'bg-white text-slate-500 border-slate-200/60 hover:bg-slate-100/50 hover:text-[#08111F]'
                                                }`}
                                            >
                                                {cat.label}
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>

                            {/* MJS Banner Promo */}
                            <div className="relative p-8 overflow-hidden rounded-3xl bg-[#08111F] border border-white/10 text-left shadow-lg group select-none">
                                {/* Decorative elements */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#800A15]/20 rounded-full blur-[30px] group-hover:bg-[#800A15]/30 transition-colors duration-500"></div>
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#003C8F]/20 rounded-full blur-[30px]"></div>

                                <div className="relative z-10 space-y-6 flex flex-col justify-between h-full">
                                    <div className="space-y-3">
                                        <span className="text-[#800A15] text-[10px] font-black tracking-widest uppercase font-sans">
                                            PASTORAL ASOCIATIVA
                                        </span>
                                        <h3 className="text-xl font-black text-white leading-tight font-sans">
                                            Movimiento Juvenil Salesiano (MJS)
                                        </h3>
                                        <p className="text-xs font-semibold text-slate-300 leading-relaxed font-sans">
                                            Sé el protagonista de tu propia formación en valores, fe y alegría. ¡Únete a los grupos asociativos del MJS y vive la experiencia Don Bosco!
                                        </p>
                                    </div>
                                    <div className="pt-2">
                                        <Link href="/mjs" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#08111F] hover:bg-[#800A15] hover:text-white font-extrabold text-[10px] tracking-wider uppercase rounded-full shadow-md transition-all duration-300 font-sans cursor-pointer">
                                            Conocer el MJS
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: News listing */}
                        <div className="lg:col-span-8 space-y-10">
                            
                            {noticias.data.length === 0 ? (
                                <ScrollReveal distance="translate-y-6">
                                    <div className="p-12 border border-slate-100 rounded-3xl text-center space-y-3 bg-slate-50/50">
                                        <p className="text-[15px] font-bold text-slate-400 font-sans">
                                            No hay publicaciones en esta categoría por el momento.
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {noticias.data.map((noticia, idx) => (
                                        <ScrollReveal key={noticia.id} distance="translate-y-8" delay={idx * 100}>
                                            <article className="group h-full border border-slate-100 rounded-3xl overflow-hidden hover:border-slate-200/80 bg-white hover:shadow-[0_20px_50px_rgba(8,17,31,0.04)] transition-all duration-300 flex flex-col justify-between text-left">
                                                
                                                <div className="space-y-6">
                                                    {/* Image header */}
                                                    {noticia.imagen ? (
                                                        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                                                            <img 
                                                                src={`/storage/${noticia.imagen}`} 
                                                                alt={noticia.titulo} 
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                            />
                                                            <span className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md border shadow-sm font-sans ${getBadgeStyle(noticia.categoria)}`}>
                                                                {noticia.categoria}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="p-6 pb-0 flex justify-between items-center">
                                                            <span className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md border font-sans ${getBadgeStyle(noticia.categoria)}`}>
                                                                {noticia.categoria}
                                                            </span>
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#800A15]" />
                                                        </div>
                                                    )}

                                                    {/* Content body */}
                                                    <div className="px-6 pb-6 space-y-3">
                                                        <time dateTime={noticia.publicado_en} className="block text-[11px] font-bold text-slate-400 font-sans">
                                                            {new Date(noticia.publicado_en).toLocaleDateString('es-CO', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            })}
                                                        </time>
                                                        
                                                        <h3 className="text-lg font-black text-[#08111F] group-hover:text-[#003C8F] transition-colors duration-300 leading-snug font-sans">
                                                            <Link href={`/noticias/${noticia.slug}`}>{noticia.titulo}</Link>
                                                        </h3>
                                                        
                                                        <p className="text-xs font-semibold text-slate-500 leading-relaxed font-sans line-clamp-3">
                                                            {noticia.resumen}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Card footer link */}
                                                <div className="px-6 py-4 border-t border-slate-50 bg-slate-50/20 flex justify-end">
                                                    <Link 
                                                        href={`/noticias/${noticia.slug}`} 
                                                        className="text-xs font-extrabold text-[#003C8F] hover:text-[#800A15] flex items-center gap-1.5 transition-colors duration-300 font-sans"
                                                    >
                                                        Leer más
                                                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                        </svg>
                                                    </Link>
                                                </div>

                                            </article>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            )}

                            {/* Pagination bar */}
                            {noticias.last_page > 1 && (
                                <ScrollReveal distance="translate-y-4" className="pt-8">
                                    <nav aria-label="Paginación" className="flex flex-wrap gap-2 justify-center items-center">
                                        {noticias.links.map((link, i) => {
                                            const isActive = link.active;
                                            const isEllipsis = !link.url;
                                            return link.url ? (
                                                <Link
                                                    key={i}
                                                    href={link.url}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                    className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all duration-300 select-none ${
                                                        isActive
                                                            ? 'bg-[#003C8F] text-white border-[#003C8F]'
                                                            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-[#08111F]'
                                                    }`}
                                                    aria-current={isActive ? 'page' : undefined}
                                                />
                                            ) : (
                                                <span 
                                                    key={i} 
                                                    dangerouslySetInnerHTML={{ __html: link.label }} 
                                                    className="px-4 py-2 border border-transparent rounded-xl text-xs font-bold text-slate-400 select-none"
                                                />
                                            );
                                        })}
                                    </nav>
                                </ScrollReveal>
                            )}

                        </div>

                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
