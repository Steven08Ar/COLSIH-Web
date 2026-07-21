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
        <AppLayout>
            <Head title="Noticias e Hitos | COLSIH" />

            {/* Custom CSS overrides to hide browser scrollbar for horizontal categories */}
            <style dangerouslySetInnerHTML={{__html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none !important;
                }
                .no-scrollbar {
                    -ms-overflow-style: none !important;
                    scrollbar-width: none !important;
                }
            `}} />

            {/* 1. HERO SECTION (Premium Dark Blue matching layout style) */}
            <section className="relative pt-36 pb-32 md:pt-44 md:pb-40 bg-[#08111F] overflow-hidden select-none">
                
                {/* Dotted Grid Backdrop Decoration */}
                <div 
                    className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{
                        backgroundImage: 'radial-gradient(#ffffff 1.2px, transparent 1.2px)',
                        backgroundSize: '24px 24px'
                    }} 
                />

                {/* Glowing background elements */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#003C8F]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#800A15]/8 rounded-full blur-[120px] pointer-events-none z-0"></div>

                <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center lg:text-left">
                    <div className="max-w-3xl mx-auto lg:mx-0 space-y-6 flex flex-col items-center lg:items-start">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-amber-400 text-xs md:text-[13px] font-black tracking-[3px] uppercase block font-sans">
                                Boletín Escolar
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black text-white leading-[1.05] tracking-tight font-sans">
                                Noticias COLSIH
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-lg md:text-[20px] font-medium text-slate-300 leading-relaxed max-w-2xl font-sans">
                                Mantente al día con las últimas novedades, comunicados oficiales, logros y eventos de nuestra comunidad educativa salesiana.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Wave SVG transition to light/dark page body backgrounds */}
                <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                    <svg 
                        className="relative block w-full h-[30px] md:h-[60px] translate-y-[2px] scale-y-105" 
                        viewBox="0 0 1440 120" 
                        preserveAspectRatio="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" 
                            className="fill-white dark:fill-slate-950" 
                        />
                    </svg>
                </div>
            </section>

            {/* 2. MAIN LAYOUT (Single-Column Premium Content Layout) */}
            <section className="relative py-20 bg-white dark:bg-slate-950 overflow-hidden select-none">
                <div className="max-w-[1240px] mx-auto px-6">
                    
                    {/* Centered category sliding selector tabs bar */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-14 no-scrollbar w-full select-none snap-x">
                        {CATEGORIAS.map((cat) => {
                            const isActive = categoriaActual === cat.value || (!categoriaActual && cat.value === '');
                            return (
                                <button
                                    key={cat.value}
                                    onClick={() => filtrarPorCategoria(cat.value)}
                                    className={`px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shrink-0 snap-center transition-all duration-300 cursor-pointer ${
                                        isActive
                                            ? 'bg-[#800A15] text-white shadow-md'
                                            : 'bg-slate-50 hover:bg-slate-100/50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 text-slate-500 dark:text-slate-400'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* News 3-column Grid (matches the exact home news creation standard) */}
                    {noticias.data.length === 0 ? (
                        <ScrollReveal distance="translate-y-6">
                            <div className="p-16 border border-slate-100 dark:border-slate-800/80 rounded-3xl text-center space-y-3 bg-slate-50/50 dark:bg-slate-900/30">
                                <p className="text-[15px] font-bold text-slate-400 dark:text-slate-500 font-sans">
                                    No hay publicaciones en esta categoría por el momento.
                                </p>
                            </div>
                        </ScrollReveal>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {noticias.data.map((noticia, idx) => (
                                <ScrollReveal key={noticia.id} distance="translate-y-12" delay={idx * 80}>
                                    <Link 
                                        href={`/noticias/${noticia.slug}`}
                                        className="block h-full cursor-pointer group text-left"
                                    >
                                        <article className="h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-100/60 dark:border-slate-800/60 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                                            
                                            {/* Image Header with Badge Overlay */}
                                            <div className="aspect-video w-full overflow-hidden bg-slate-50 dark:bg-slate-950 relative shrink-0">
                                                {noticia.imagen ? (
                                                    <img 
                                                        src={`/storage/${noticia.imagen}`} 
                                                        alt={noticia.titulo} 
                                                        className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 relative">
                                                        <img src="/Estudiantes COLSIH.png" alt="COLSIH" className="w-full h-full object-cover grayscale opacity-10" />
                                                        <img src="/Logo COLSIH.svg" alt="Logo COLSIH" className="w-14 h-auto opacity-10 absolute" />
                                                    </div>
                                                )}
                                                {noticia.categoria && (
                                                    <span className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs text-[#08111F] dark:text-slate-200 font-extrabold text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-xs">
                                                        {noticia.categoria}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Body */}
                                            <div className="p-8 flex-grow flex flex-col justify-between text-left space-y-6">
                                                <div className="space-y-3">
                                                    <time className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest" dateTime={noticia.publicado_en}>
                                                        {formatDate(noticia.publicado_en)}
                                                    </time>
                                                    <h3 className="font-extrabold text-[20px] text-[#08111F] dark:text-slate-200 leading-snug group-hover:text-[#800A15] dark:group-hover:text-rose-400 transition-colors duration-200">
                                                        {noticia.titulo}
                                                    </h3>
                                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                                        {noticia.resumen}
                                                    </p>
                                                </div>

                                                {/* Action indicator link */}
                                                <div className="pt-2">
                                                    <div 
                                                        className="inline-flex items-center gap-2 text-xs font-extrabold text-[#08111F] dark:text-slate-300 group-hover:text-[#800A15] dark:group-hover:text-rose-400 uppercase tracking-wider transition-colors"
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
                    )}

                    {/* Pagination bar */}
                    {noticias.last_page > 1 && (
                        <ScrollReveal distance="translate-y-4" className="pt-12">
                            <nav aria-label="Paginación" className="flex flex-wrap gap-2 justify-center items-center">
                                {noticias.links.map((link, i) => {
                                    const isActive = link.active;
                                    const isEllipsis = !link.url;
                                    return link.url ? (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`px-4.5 py-2.5 border rounded-2xl text-xs font-bold transition-all duration-300 select-none cursor-pointer ${
                                                isActive
                                                    ? 'bg-[#003C8F] text-white border-[#003C8F]'
                                                    : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 hover:text-[#08111F] dark:hover:bg-slate-850'
                                            }`}
                                            aria-current={isActive ? 'page' : undefined}
                                        />
                                    ) : (
                                        <span 
                                            key={i} 
                                            dangerouslySetInnerHTML={{ __html: link.label }} 
                                            className="px-4.5 py-2.5 border border-transparent rounded-2xl text-xs font-bold text-slate-400 dark:text-slate-600 select-none"
                                        />
                                    );
                                })}
                            </nav>
                        </ScrollReveal>
                    )}

                    {/* 3. MJS PROMO BANNER (Wide premium card at bottom) */}
                    <ScrollReveal distance="translate-y-12">
                        <div className="relative overflow-hidden rounded-[32px] bg-[#08111F] border border-white/10 text-left shadow-lg group p-8 md:p-12 mt-20 select-none max-w-[1240px] mx-auto">
                            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#800A15]/10 rounded-full blur-[60px] group-hover:bg-[#800A15]/20 transition-colors duration-500"></div>
                            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#003C8F]/10 rounded-full blur-[60px]"></div>

                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                                <div className="col-span-full lg:col-span-8 space-y-4">
                                    <span className="text-[#800A15] text-xs font-black tracking-widest uppercase font-sans">
                                        PASTORAL ASOCIATIVA
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight font-sans">
                                        Movimiento Juvenil Salesiano (MJS)
                                    </h3>
                                    <p className="text-sm font-semibold text-slate-300 leading-relaxed font-sans max-w-3xl">
                                        Sé el protagonista de tu propia formación en valores, fe y alegría. ¡Únete a los grupos asociativos del MJS y vive la experiencia Don Bosco de cerca!
                                    </p>
                                </div>
                                <div className="col-span-full lg:col-span-4 lg:text-right">
                                    <Link href="/mjs" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#08111F] hover:bg-[#800A15] hover:text-white font-black text-xs tracking-wider uppercase rounded-full shadow-md transition-all duration-300 font-sans cursor-pointer">
                                        Conocer el MJS
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                </div>
            </section>
        </AppLayout>
    );
}
