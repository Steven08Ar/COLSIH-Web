import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import { mediaUrl } from '@/utils/mediaUrl';
import { 
    ChevronRight,
    ChevronLeft,
    Trophy,
    Flame,
    Sparkles,
    Shield
} from 'lucide-react';

export default function Deportes({ noticias = [], torneoPartidos = [], deportesBanners = [], cuadrangularesBloqueado = false }) {
    const [sliderIndex, setSliderIndex] = useState(0);

    // Helper for news media URLs
    const getNewsImageUrl = (img, fallback = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80') => {
        if (!img) return fallback;
        return mediaUrl(img) || fallback;
    };

// Helper for rendering team escudos / logos (NO emojis, official logo images or minimalist shield icon)
    const renderEscudo = (escudo) => {
        if (!escudo) return <Shield className="w-4 h-4 text-[#001659] shrink-0" />;
        const src = mediaUrl(escudo);
        if (src) {
            return <img src={src} alt="Logo de Equipo" className="w-5 h-5 object-contain rounded shrink-0 shadow-xs" />;
        }
        return <Shield className="w-4 h-4 text-[#001659] shrink-0" />;
    };

    // Calculate actual lists from admin DB ONLY (No fake data)
    const mainFeaturedNews = noticias.length > 0 ? noticias[0] : null;
    const sideNewsList = noticias.length > 1 ? noticias.slice(1, 4) : [];

    // Active sports banners (Only if published by admin)
    const currentBanner = deportesBanners.length > 0 ? deportesBanners[sliderIndex % deportesBanners.length] : null;

    // Partidos para el Mapa de Eliminatorias (Inter-Clases)
    const cuartos1 = torneoPartidos.find(p => p.fase === 'cuartos' && p.posicion_llave === 1) || { equipo_local: 'Grado 6°A', equipo_visitante: 'Grado 7°B', escudo_local: null, escudo_visitante: null, goles_local: null, goles_visitante: null };
    const cuartos2 = torneoPartidos.find(p => p.fase === 'cuartos' && p.posicion_llave === 2) || { equipo_local: 'Grado 8°A', equipo_visitante: 'Grado 9°B', escudo_local: null, escudo_visitante: null, goles_local: null, goles_visitante: null };
    const cuartos3 = torneoPartidos.find(p => p.fase === 'cuartos' && p.posicion_llave === 3) || { equipo_local: 'Grado 10°A', equipo_visitante: 'Grado 11°A', escudo_local: null, escudo_visitante: null, goles_local: null, goles_visitante: null };
    const cuartos4 = torneoPartidos.find(p => p.fase === 'cuartos' && p.posicion_llave === 4) || { equipo_local: 'Docentes', equipo_visitante: 'Estudiantes', escudo_local: null, escudo_visitante: null, goles_local: null, goles_visitante: null };

    const semifinal1 = torneoPartidos.find(p => p.fase === 'semifinal' && p.posicion_llave === 1) || { equipo_local: 'Ganador Llave 1', equipo_visitante: 'Ganador Llave 2', goles_local: null, goles_visitante: null };
    const semifinal2 = torneoPartidos.find(p => p.fase === 'semifinal' && p.posicion_llave === 2) || { equipo_local: 'Ganador Llave 3', equipo_visitante: 'Ganador Llave 4', goles_local: null, goles_visitante: null };

    const finalMatch = torneoPartidos.find(p => p.fase === 'final') || { equipo_local: 'Ganador Semi 1', equipo_visitante: 'Ganador Semi 2', goles_local: null, goles_visitante: null };

    const campeon = finalMatch.ganador 
        ? (finalMatch.ganador === 'local' ? finalMatch.equipo_local : finalMatch.equipo_visitante)
        : null;

    const campeonEscudo = finalMatch.ganador
        ? (finalMatch.ganador === 'local' ? finalMatch.escudo_local : finalMatch.escudo_visitante)
        : null;

    return (
        <AppLayout>
            <Head title="Deportes y Talento Salesiano | COLSIH">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
            </Head>

            <div className="relative bg-[#FFFFFF] text-[#262626] overflow-hidden font-['DM_Sans',sans-serif] select-none">

                {/* ── AMBIENT INSTITUTIONAL COLOR BACKGROUND GLOWS (50% TRANSPARENCY) ── */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1], y: [0, 20, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -top-[120px] -left-[120px] w-[600px] h-[600px] bg-[#001659]/50 rounded-full blur-[140px]" 
                    />
                    <motion.div 
                        animate={{ scale: [1, 1.15, 1], y: [0, -25, 0] }}
                        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-[80px] -right-[120px] w-[500px] h-[500px] bg-[#4DB6FF]/50 rounded-full blur-[140px]" 
                    />
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-[22%] -right-[100px] w-[550px] h-[550px] bg-[#800A15]/50 rounded-full blur-[150px]" 
                    />
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1], x: [0, 25, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-[35%] -left-[100px] w-[450px] h-[450px] bg-[#FFC107]/50 rounded-full blur-[140px]" 
                    />
                </div>

                <div className="relative z-10">

                    {/* ── 1. HERO SECTION ── */}
                    <section className="relative w-full pt-28 pb-12 overflow-hidden min-h-[640px]">
                        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative">
                            
                            {/* Desktop Pixel-Perfect Layout */}
                            <div className="hidden lg:block relative w-full h-[620px]">
                                <img 
                                    src="/images/deportes/balon_basket_fondo.png" 
                                    alt="Fondo Balón" 
                                    className="absolute left-[0px] top-[0px] w-[720px] h-[550px] object-contain opacity-65 pointer-events-none"
                                />

                                <div className="absolute left-[130px] top-[75px] w-[500px] text-[68px] xl:text-[76px] font-black uppercase leading-[0.90] tracking-tighter font-sans z-10 select-none">
                                    <span className="text-[#262626]">MÁXIMO</span> <br />
                                    <span className="text-[#262626]">ANOTADOR</span> <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001659] to-[#08111F]">DE LA GRAN</span> <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001659] via-[#08111F] to-slate-700">FINAL</span>
                                </div>

                                <img 
                                    src="/images/deportes/persona_basket_saltando.png" 
                                    alt="Jugador de Baloncesto Saltando" 
                                    className="absolute left-[260px] top-[20px] w-[720px] h-[580px] object-contain z-20 pointer-events-none drop-shadow-xl"
                                />

                                <div className="absolute left-[560px] top-[445px] w-[360px] flex flex-col items-start gap-4 z-30">
                                    <p className="text-[#4A4A4A] text-[14px] xl:text-[15px] font-medium leading-[22px] font-['DM_Sans',sans-serif]">
                                        El premio al máximo anotador de las finales es la distinción individual otorgada al estudiante que obtuvo el mayor puntaje y rendimiento en el torneo intercolegiado.
                                    </p>
                                    <a 
                                        href="#cuadrangulares-mapa"
                                        className="inline-flex items-center justify-center px-8 py-3.5 bg-[#262626] hover:bg-[#001659] text-white text-xs font-bold uppercase tracking-[1.8px] rounded-md transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer font-['DM_Sans',sans-serif]"
                                    >
                                        VER MAPA INTER-CLASES
                                    </a>
                                </div>

                                {/* Dynamic Right Cards */}
                                {noticias.length > 0 && (
                                    <>
                                        <div className="absolute left-[1040px] top-[75px] z-30 bg-[#EAEFF4]/90 backdrop-blur-sm px-4 py-1 rounded-sm text-center border border-slate-200/60">
                                            <span className="text-[#8E9CAE] text-xs font-semibold uppercase tracking-wider font-['DM_Sans',sans-serif]">
                                                Destacados
                                            </span>
                                        </div>

                                        {noticias.slice(0, 2).map((newsItem, idx) => (
                                            <Link 
                                                key={newsItem.id}
                                                href={`/noticias/${newsItem.slug}`}
                                                className={`absolute left-[1040px] ${idx === 0 ? 'top-[120px]' : 'top-[340px]'} w-[270px] h-[195px] rounded-xl overflow-hidden shadow-sm group cursor-pointer border border-slate-200/80 bg-white/90 backdrop-blur-md z-30`}
                                            >
                                                <img 
                                                    src={getNewsImageUrl(newsItem.imagen)} 
                                                    alt={newsItem.titulo} 
                                                    className="w-full h-[120px] object-cover group-hover:scale-105 transition-transform duration-500" 
                                                />
                                                <div className="p-3 text-left space-y-1">
                                                    <span className="text-[10px] font-bold text-[#888888] uppercase block font-['DM_Sans',sans-serif]">
                                                        {newsItem.categoria || 'Deportes'} • {newsItem.publicado_en ? new Date(newsItem.publicado_en).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }) : 'Reciente'}
                                                    </span>
                                                    <h4 className="text-xs font-black text-[#262626] leading-tight font-sans line-clamp-2">
                                                        {newsItem.titulo}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}
                                    </>
                                )}
                            </div>

                            {/* Mobile Responsive Layout */}
                            <div className="lg:hidden flex flex-col items-center text-center space-y-6 relative py-6">
                                <h1 className="text-3xl sm:text-5xl font-black text-[#262626] uppercase leading-none tracking-tighter font-sans z-10">
                                    MÁXIMO ANOTADOR <br />
                                    <span className="text-[#001659]">DE LA GRAN FINAL</span>
                                </h1>
                                <div className="relative w-full max-w-[380px] aspect-[4/3] z-20">
                                    <img src="/images/deportes/persona_basket_saltando.png" alt="Jugador de Baloncesto" className="w-full h-full object-contain drop-shadow-lg" />
                                </div>
                                <a href="#cuadrangulares-mapa" className="inline-flex items-center justify-center px-8 py-3.5 bg-[#262626] hover:bg-[#001659] text-white text-sm font-bold uppercase tracking-[1.8px] rounded-lg transition-all shadow-md font-['DM_Sans',sans-serif]">
                                    VER MAPA INTER-CLASES
                                </a>
                            </div>

                        </div>
                    </section>


                    {/* ── 2. CATEGORY MOSAIC GRID ── */}
                    <section className="py-12 md:py-20">
                        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl sm:text-4xl font-black text-[#262626] tracking-tight uppercase font-sans">
                                    Category
                                </h2>
                                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-['DM_Sans',sans-serif]">
                                    Microfútbol • Baloncesto • Voleibol
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] items-start text-center">
                                <div className="flex flex-col gap-[20px]">
                                    <motion.div whileHover={{ scale: 1.02 }} className="w-full h-[116px] bg-[#EBEEF3]/90 backdrop-blur-sm rounded-[10px] flex items-center justify-center p-4 border border-slate-200/60 shadow-xs">
                                        <span className="text-[34px] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#262626] to-[#78889B] font-sans">MICROFÚTBOL</span>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.02 }} className="w-full h-[288px] rounded-[10px] overflow-hidden shadow-xs border border-slate-200/60">
                                        <img src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80" alt="Microfútbol" className="w-full h-full object-cover" />
                                    </motion.div>
                                </div>

                                <div className="flex flex-col gap-[20px]">
                                    <motion.div whileHover={{ scale: 1.02 }} className="w-full h-[235px] rounded-[10px] overflow-hidden shadow-xs border border-slate-200/60">
                                        <img src="https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=600&q=80" alt="Baloncesto" className="w-full h-full object-cover" />
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.02 }} className="w-full h-[169px] bg-[#EBEEF3]/90 backdrop-blur-sm rounded-[10px] flex items-center justify-center p-4 border border-slate-200/60 shadow-xs">
                                        <span className="text-[34px] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#262626] to-[#78889B] font-sans">BALONCESTO</span>
                                    </motion.div>
                                </div>

                                <div className="flex flex-col gap-[20px]">
                                    <motion.div whileHover={{ scale: 1.02 }} className="w-full h-[116px] bg-[#EBEEF3]/90 backdrop-blur-sm rounded-[10px] flex items-center justify-center p-4 border border-slate-200/60 shadow-xs">
                                        <span className="text-[34px] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#262626] to-[#78889B] font-sans">VOLEIBOL</span>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.02 }} className="w-full h-[288px] rounded-[10px] overflow-hidden shadow-xs border border-slate-200/60">
                                        <img src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=600&q=80" alt="Voleibol" className="w-full h-full object-cover" />
                                    </motion.div>
                                </div>

                                <div className="flex flex-col gap-[20px]">
                                    <motion.div whileHover={{ scale: 1.02 }} className="w-full h-[286px] rounded-[10px] overflow-hidden shadow-xs border border-slate-200/60">
                                        <img src="https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=600&q=80" alt="Torneos" className="w-full h-full object-cover" />
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.02 }} className="w-full h-[118px] bg-[#EBEEF3]/90 backdrop-blur-sm rounded-[10px] flex items-center justify-center p-4 border border-slate-200/60 shadow-xs">
                                        <span className="text-[28px] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#262626] to-[#78889B] font-sans">TORNEOS COLSIH</span>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* ── 3. TRENDING NEWS (BD REAL) ── */}
                    <section id="noticias-tendencia" className="py-16 md:py-24">
                        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-10">

                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl sm:text-4xl font-black text-[#262626] tracking-tight uppercase font-sans">
                                    Trending News
                                </h2>
                                <span className="text-xs font-extrabold text-[#001659] uppercase tracking-wider font-['DM_Sans',sans-serif]">
                                    Actualidad Deportiva COLSIH
                                </span>
                            </div>

                            {noticias.length === 0 ? (
                                <div className="w-full bg-slate-50/90 backdrop-blur-md border border-dashed border-slate-300 rounded-3xl p-12 text-center space-y-3">
                                    <div className="w-14 h-14 rounded-full bg-blue-50 text-[#001659] flex items-center justify-center mx-auto text-2xl shadow-xs">
                                        🏆
                                    </div>
                                    <h3 className="text-lg font-black text-[#262626] uppercase font-sans">No hay noticias deportivas publicadas aún</h3>
                                    <p className="text-xs font-medium text-slate-500 max-w-md mx-auto font-['DM_Sans',sans-serif]">
                                        Las publicaciones deportivas creadas por la administración aparecerán automáticamente en esta sección.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                                    <div className="lg:col-span-6 space-y-5 flex flex-col justify-between">
                                        {sideNewsList.map((news) => (
                                            <Link key={news.id} href={`/noticias/${news.slug}`}>
                                                <motion.div whileHover={{ x: 4 }} className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition duration-300 flex flex-col sm:flex-row gap-5 items-center cursor-pointer group text-left h-full">
                                                    <img src={getNewsImageUrl(news.imagen)} alt={news.titulo} className="w-full sm:w-44 h-36 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300" />
                                                    <div className="space-y-2">
                                                        <span className="text-[11px] font-black uppercase text-[#800A15] block font-['DM_Sans',sans-serif]">
                                                            {news.categoria || 'Deportes'} • {news.publicado_en ? new Date(news.publicado_en).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }) : 'Reciente'}
                                                        </span>
                                                        <h3 className="text-base sm:text-lg font-black text-[#262626] group-hover:text-[#001659] transition-colors leading-snug font-sans">
                                                            {news.titulo}
                                                        </h3>
                                                        <p className="text-xs font-medium text-slate-500 leading-relaxed font-['DM_Sans',sans-serif] line-clamp-2">
                                                            {news.resumen || 'Haz clic para ver todos los detalles.'}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        ))}
                                    </div>

                                    {mainFeaturedNews && (
                                        <div className="lg:col-span-6 relative min-h-[460px] rounded-3xl overflow-hidden shadow-xl group cursor-pointer border border-slate-800">
                                            <Link href={`/noticias/${mainFeaturedNews.slug}`}>
                                                <img src={getNewsImageUrl(mainFeaturedNews.imagen)} alt={mainFeaturedNews.titulo} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#262626] via-[#262626]/60 to-transparent" />
                                                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between text-left relative z-10">
                                                    <div>
                                                        <span className="px-4 py-1.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest">
                                                            {mainFeaturedNews.categoria || 'Noticia Deportiva'}
                                                        </span>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block font-['DM_Sans',sans-serif]">Destacado Principal</span>
                                                        <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight uppercase font-sans tracking-tight drop-shadow-md">{mainFeaturedNews.titulo}</h3>
                                                        <p className="text-xs sm:text-sm font-medium text-slate-300 max-w-lg leading-relaxed line-clamp-3">{mainFeaturedNews.resumen}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </section>


                    {/* ── 4. FEATURED BANNER CAROUSEL (VACÍO SI NO HAY BANNERS PUBLICADOS) ── */}
                    {deportesBanners.length > 0 && currentBanner && (
                        <section className="py-16 md:py-24">
                            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-6">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[420px] sm:min-h-[500px] flex items-end p-8 sm:p-14 group cursor-pointer border border-slate-900">
                                    <img src={getNewsImageUrl(currentBanner.imagen)} alt={currentBanner.titulo} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#262626] via-[#262626]/70 to-transparent" />
                                    <div className="relative z-10 max-w-3xl text-left space-y-4">
                                        <div className="inline-flex items-center gap-3">
                                            <span className="px-3.5 py-1 rounded-md bg-[#800A15] text-white text-xs font-black uppercase tracking-widest font-['DM_Sans',sans-serif]">
                                                {currentBanner.tag || 'Deportes'}
                                            </span>
                                            <span className="text-xs font-bold text-slate-300 font-['DM_Sans',sans-serif]">
                                                {currentBanner.subtitulo}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tight font-sans drop-shadow-lg">
                                            {currentBanner.titulo}
                                        </h2>
                                        <p className="text-xs sm:text-sm font-semibold text-slate-300 max-w-2xl leading-relaxed font-['DM_Sans',sans-serif]">
                                            {currentBanner.descripcion}
                                        </p>
                                    </div>
                                </div>

                                {deportesBanners.length > 1 && (
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center gap-2">
                                            {deportesBanners.map((_, idx) => (
                                                <button key={idx} onClick={() => setSliderIndex(idx)} className={`w-9 h-9 rounded-full font-black text-xs transition ${sliderIndex === idx ? 'bg-[#262626] text-white scale-110 shadow-md' : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200'}`}>
                                                    {idx + 1}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => setSliderIndex(prev => (prev > 0 ? prev - 1 : deportesBanners.length - 1))} className="w-11 h-11 rounded-xl bg-slate-100/80 hover:bg-[#001659] hover:text-white transition flex items-center justify-center text-slate-700 cursor-pointer">
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => setSliderIndex(prev => (prev < deportesBanners.length - 1 ? prev + 1 : 0))} className="w-11 h-11 rounded-xl bg-slate-100/80 hover:bg-[#001659] hover:text-white transition flex items-center justify-center text-slate-700 cursor-pointer">
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}


                    {/* ── 5. MAPA DE ELIMINATORIAS (CUADRANGULARES INTER-CLASES - LOGOS DE EQUIPOS SIN EMOJIS) ── */}
                    <section id="cuadrangulares-mapa" className="relative overflow-hidden py-16 md:py-24">

                        {cuadrangularesBloqueado && (
                            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#08111F]/96 backdrop-blur-md">
                                <div className="text-center px-6 space-y-5">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/60 border border-white/20 text-xs font-black uppercase tracking-widest">
                                        <Sparkles className="w-4 h-4 text-amber-400" />
                                        <span>TEMPORADA EN RECESO</span>
                                    </div>
                                    <h2 className="text-5xl sm:text-7xl font-black text-white uppercase tracking-tight leading-none">
                                        Nos veremos<br />
                                        en <span className="text-amber-400">{new Date().getFullYear() + 1}</span>
                                    </h2>
                                    <p className="text-white/55 text-sm sm:text-base font-semibold max-w-sm mx-auto">
                                        El torneo inter-clases regresará con más emoción y competencia el próximo año.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-10">

                            <div className="text-center space-y-2">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#001659]/5 text-[#001659] border border-[#001659]/15 text-xs font-black uppercase tracking-widest shadow-xs">
                                    <Flame className="w-4 h-4 text-[#800A15]" />
                                    <span>FASE FINAL • TORNEO INTER-CLASES</span>
                                </div>
                                <h2 className="text-3xl sm:text-5xl font-black text-[#001659] uppercase tracking-tight font-sans">
                                    CUADRANGULARES INTER-CLASES 2026
                                </h2>
                                <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-xl mx-auto font-['DM_Sans',sans-serif]">
                                    Sigue la tabla interactiva con nombres y logos oficiales de los equipos representativos.
                                </p>
                            </div>

                            {/* MINIMALIST WHITE & INSTITUTIONAL BRACKET BOARD WITH LOGOS */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-12 shadow-xl border border-slate-200/90 overflow-hidden text-[#262626]"
                            >
                                
                                {/* Ambient Colors Subtle Watermarks */}
                                <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#001659]/5 rounded-full blur-3xl pointer-events-none" />
                                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#800A15]/5 rounded-full blur-3xl pointer-events-none" />

                                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                                    {/* LEFT BRANCH (Cuartos 1 & 2 -> Semifinal 1) */}
                                    <div className="lg:col-span-4 space-y-6">
                                        <div className="text-xs font-black text-[#800A15] uppercase tracking-widest border-b border-slate-200 pb-2.5 text-left flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[#800A15]" />
                                            <span>Rama Izquierda • Cuartos de Final</span>
                                        </div>

                                        {/* Match 1 */}
                                        <motion.div 
                                            whileHover={{ y: -3, scale: 1.01 }}
                                            className={`p-4 rounded-2xl border transition-all ${cuartos1.ganador ? 'bg-white border-emerald-400 shadow-md ring-2 ring-emerald-400/20' : 'bg-slate-50/90 border-slate-200'}`}
                                        >
                                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase mb-2">
                                                <span>Llave #1</span>
                                                <span className="text-[#001659] font-black">{cuartos1.estado}</span>
                                            </div>
                                            <div className="space-y-2 text-sm font-bold">
                                                <div className={`flex justify-between items-center p-2.5 rounded-xl transition ${cuartos1.ganador === 'local' ? 'bg-emerald-500 text-white font-black shadow-xs' : 'bg-white border border-slate-100 text-slate-800'}`}>
                                                    <div className="flex items-center gap-2 truncate">
                                                        {renderEscudo(cuartos1.escudo_local)}
                                                        <span className="truncate">{cuartos1.equipo_local}</span>
                                                    </div>
                                                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-black ${cuartos1.ganador === 'local' ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#001659]'}`}>{cuartos1.goles_local ?? '-'}</span>
                                                </div>
                                                <div className={`flex justify-between items-center p-2.5 rounded-xl transition ${cuartos1.ganador === 'visitante' ? 'bg-emerald-500 text-white font-black shadow-xs' : 'bg-white border border-slate-100 text-slate-800'}`}>
                                                    <div className="flex items-center gap-2 truncate">
                                                        {renderEscudo(cuartos1.escudo_visitante)}
                                                        <span className="truncate">{cuartos1.equipo_visitante}</span>
                                                    </div>
                                                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-black ${cuartos1.ganador === 'visitante' ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#001659]'}`}>{cuartos1.goles_visitante ?? '-'}</span>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Match 2 */}
                                        <motion.div 
                                            whileHover={{ y: -3, scale: 1.01 }}
                                            className={`p-4 rounded-2xl border transition-all ${cuartos2.ganador ? 'bg-white border-emerald-400 shadow-md ring-2 ring-emerald-400/20' : 'bg-slate-50/90 border-slate-200'}`}
                                        >
                                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase mb-2">
                                                <span>Llave #2</span>
                                                <span className="text-[#001659] font-black">{cuartos2.estado}</span>
                                            </div>
                                            <div className="space-y-2 text-sm font-bold">
                                                <div className={`flex justify-between items-center p-2.5 rounded-xl transition ${cuartos2.ganador === 'local' ? 'bg-emerald-500 text-white font-black shadow-xs' : 'bg-white border border-slate-100 text-slate-800'}`}>
                                                    <div className="flex items-center gap-2 truncate">
                                                        {renderEscudo(cuartos2.escudo_local)}
                                                        <span className="truncate">{cuartos2.equipo_local}</span>
                                                    </div>
                                                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-black ${cuartos2.ganador === 'local' ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#001659]'}`}>{cuartos2.goles_local ?? '-'}</span>
                                                </div>
                                                <div className={`flex justify-between items-center p-2.5 rounded-xl transition ${cuartos2.ganador === 'visitante' ? 'bg-emerald-500 text-white font-black shadow-xs' : 'bg-white border border-slate-100 text-slate-800'}`}>
                                                    <div className="flex items-center gap-2 truncate">
                                                        {renderEscudo(cuartos2.escudo_visitante)}
                                                        <span className="truncate">{cuartos2.equipo_visitante}</span>
                                                    </div>
                                                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-black ${cuartos2.ganador === 'visitante' ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#001659]'}`}>{cuartos2.goles_visitante ?? '-'}</span>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Semifinal 1 */}
                                        <div className="pt-2">
                                            <div className="text-xs font-black text-[#001659] uppercase tracking-widest mb-2 text-left flex items-center gap-1.5">
                                                <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
                                                <span>Semifinal 1 (Ganadores L1 vs L2)</span>
                                            </div>
                                            <motion.div 
                                                whileHover={{ y: -3, scale: 1.01 }}
                                                className={`p-4 rounded-2xl border-2 transition-all ${semifinal1.ganador ? 'bg-white border-[#001659] shadow-lg ring-4 ring-[#001659]/10' : 'bg-slate-50 border-blue-200'}`}
                                            >
                                                <div className="space-y-2 text-sm font-bold">
                                                    <div className={`flex justify-between items-center p-3 rounded-xl transition ${semifinal1.ganador === 'local' ? 'bg-[#001659] text-white font-black shadow-sm' : 'bg-white border border-slate-200 text-slate-800'}`}>
                                                        <div className="flex items-center gap-2 truncate">
                                                            {renderEscudo(semifinal1.escudo_local)}
                                                            <span className="truncate">{semifinal1.equipo_local}</span>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded text-xs font-mono font-black ${semifinal1.ganador === 'local' ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#001659]'}`}>{semifinal1.goles_local ?? '-'}</span>
                                                    </div>
                                                    <div className={`flex justify-between items-center p-3 rounded-xl transition ${semifinal1.ganador === 'visitante' ? 'bg-[#001659] text-white font-black shadow-sm' : 'bg-white border border-slate-200 text-slate-800'}`}>
                                                        <div className="flex items-center gap-2 truncate">
                                                            {renderEscudo(semifinal1.escudo_visitante)}
                                                            <span className="truncate">{semifinal1.equipo_visitante}</span>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded text-xs font-mono font-black ${semifinal1.ganador === 'visitante' ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#001659]'}`}>{semifinal1.goles_visitante ?? '-'}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* CENTER: TROPHY & FINAL MATCH */}
                                    <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-6 text-center py-6">
                                        
                                        <motion.div 
                                            animate={campeon ? { scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] } : {}}
                                            transition={{ duration: 2.5, repeat: Infinity }}
                                            className="relative"
                                        >
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#001659] to-[#002799] text-amber-400 flex items-center justify-center shadow-xl border-4 border-amber-400">
                                                <Trophy className="w-12 h-12" />
                                            </div>
                                            {campeon && (
                                                <div className="absolute -top-3 -right-3 bg-[#800A15] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-md border border-white">
                                                    ¡CAMPEÓN!
                                                </div>
                                            )}
                                        </motion.div>

                                        <div className="w-full space-y-3">
                                            <span className="text-xs font-black text-[#001659] uppercase tracking-widest block bg-blue-50 py-1.5 rounded-xl border border-blue-200">
                                                🏆 GRAN FINAL INTER-CLASES
                                            </span>

                                            <motion.div 
                                                whileHover={{ scale: 1.02 }}
                                                className="bg-white border-2 border-[#001659] rounded-3xl p-6 shadow-2xl space-y-3 text-left relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFC107]/10 rounded-bl-full pointer-events-none" />

                                                <div className={`flex justify-between items-center p-3 rounded-2xl transition ${finalMatch.ganador === 'local' ? 'bg-[#001659] text-white font-black shadow-md' : 'bg-slate-50 border border-slate-200 text-slate-900'}`}>
                                                    <div className="flex items-center gap-2 truncate">
                                                        {renderEscudo(finalMatch.escudo_local)}
                                                        <span className="text-base font-black truncate">{finalMatch.equipo_local}</span>
                                                    </div>
                                                    <span className={`px-3.5 py-1 rounded-xl font-mono text-lg font-black ${finalMatch.ganador === 'local' ? 'bg-white/20 text-white' : 'bg-slate-200 text-[#001659]'}`}>{finalMatch.goles_local ?? '-'}</span>
                                                </div>

                                                <div className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">VS</div>

                                                <div className={`flex justify-between items-center p-3 rounded-2xl transition ${finalMatch.ganador === 'visitante' ? 'bg-[#001659] text-white font-black shadow-md' : 'bg-slate-50 border border-slate-200 text-slate-900'}`}>
                                                    <div className="flex items-center gap-2 truncate">
                                                        {renderEscudo(finalMatch.escudo_visitante)}
                                                        <span className="text-base font-black truncate">{finalMatch.equipo_visitante}</span>
                                                    </div>
                                                    <span className={`px-3.5 py-1 rounded-xl font-mono text-lg font-black ${finalMatch.ganador === 'visitante' ? 'bg-white/20 text-white' : 'bg-slate-200 text-[#001659]'}`}>{finalMatch.goles_visitante ?? '-'}</span>
                                                </div>
                                            </motion.div>

                                            {campeon && (
                                                <motion.div 
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="p-4 rounded-2xl bg-gradient-to-r from-[#001659] to-[#800A15] text-amber-300 font-black text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 border border-amber-400/40"
                                                >
                                                    <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                                                    <div className="flex items-center gap-2">
                                                        {renderEscudo(campeonEscudo)}
                                                        <span>CAMPEÓN INTER-CLASES 2026: {campeon}</span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>

                                    </div>

                                    {/* RIGHT BRANCH (Cuartos 3 & 4 -> Semifinal 2) */}
                                    <div className="lg:col-span-4 space-y-6">
                                        <div className="text-xs font-black text-[#800A15] uppercase tracking-widest border-b border-slate-200 pb-2.5 text-right flex items-center justify-end gap-2">
                                            <span>Rama Derecha • Cuartos de Final</span>
                                            <span className="w-2 h-2 rounded-full bg-[#800A15]" />
                                        </div>

                                        {/* Match 3 */}
                                        <motion.div 
                                            whileHover={{ y: -3, scale: 1.01 }}
                                            className={`p-4 rounded-2xl border transition-all ${cuartos3.ganador ? 'bg-white border-emerald-400 shadow-md ring-2 ring-emerald-400/20' : 'bg-slate-50/90 border-slate-200'}`}
                                        >
                                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase mb-2">
                                                <span>Llave #3</span>
                                                <span className="text-[#001659] font-black">{cuartos3.estado}</span>
                                            </div>
                                            <div className="space-y-2 text-sm font-bold">
                                                <div className={`flex justify-between items-center p-2.5 rounded-xl transition ${cuartos3.ganador === 'local' ? 'bg-emerald-500 text-white font-black shadow-xs' : 'bg-white border border-slate-100 text-slate-800'}`}>
                                                    <div className="flex items-center gap-2 truncate">
                                                        {renderEscudo(cuartos3.escudo_local)}
                                                        <span className="truncate">{cuartos3.equipo_local}</span>
                                                    </div>
                                                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-black ${cuartos3.ganador === 'local' ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#001659]'}`}>{cuartos3.goles_local ?? '-'}</span>
                                                </div>
                                                <div className={`flex justify-between items-center p-2.5 rounded-xl transition ${cuartos3.ganador === 'visitante' ? 'bg-emerald-500 text-white font-black shadow-xs' : 'bg-white border border-slate-100 text-slate-800'}`}>
                                                    <div className="flex items-center gap-2 truncate">
                                                        {renderEscudo(cuartos3.escudo_visitante)}
                                                        <span className="truncate">{cuartos3.equipo_visitante}</span>
                                                    </div>
                                                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-black ${cuartos3.ganador === 'visitante' ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#001659]'}`}>{cuartos3.goles_visitante ?? '-'}</span>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Match 4 */}
                                        <motion.div 
                                            whileHover={{ y: -3, scale: 1.01 }}
                                            className={`p-4 rounded-2xl border transition-all ${cuartos4.ganador ? 'bg-white border-emerald-400 shadow-md ring-2 ring-emerald-400/20' : 'bg-slate-50/90 border-slate-200'}`}
                                        >
                                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase mb-2">
                                                <span>Llave #4</span>
                                                <span className="text-[#001659] font-black">{cuartos4.estado}</span>
                                            </div>
                                            <div className="space-y-2 text-sm font-bold">
                                                <div className={`flex justify-between items-center p-2.5 rounded-xl transition ${cuartos4.ganador === 'local' ? 'bg-emerald-500 text-white font-black shadow-xs' : 'bg-white border border-slate-100 text-slate-800'}`}>
                                                    <div className="flex items-center gap-2 truncate">
                                                        {renderEscudo(cuartos4.escudo_local)}
                                                        <span className="truncate">{cuartos4.equipo_local}</span>
                                                    </div>
                                                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-black ${cuartos4.ganador === 'local' ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#001659]'}`}>{cuartos4.goles_local ?? '-'}</span>
                                                </div>
                                                <div className={`flex justify-between items-center p-2.5 rounded-xl transition ${cuartos4.ganador === 'visitante' ? 'bg-emerald-500 text-white font-black shadow-xs' : 'bg-white border border-slate-100 text-slate-800'}`}>
                                                    <div className="flex items-center gap-2 truncate">
                                                        {renderEscudo(cuartos4.escudo_visitante)}
                                                        <span className="truncate">{cuartos4.equipo_visitante}</span>
                                                    </div>
                                                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-black ${cuartos4.ganador === 'visitante' ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#001659]'}`}>{cuartos4.goles_visitante ?? '-'}</span>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Semifinal 2 */}
                                        <div className="pt-2">
                                            <div className="text-xs font-black text-[#001659] uppercase tracking-widest mb-2 text-right flex items-center justify-end gap-1.5">
                                                <span>Semifinal 2 (Ganadores L3 vs L4)</span>
                                                <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
                                            </div>
                                            <motion.div 
                                                whileHover={{ y: -3, scale: 1.01 }}
                                                className={`p-4 rounded-2xl border-2 transition-all ${semifinal2.ganador ? 'bg-white border-[#001659] shadow-lg ring-4 ring-[#001659]/10' : 'bg-slate-50 border-blue-200'}`}
                                            >
                                                <div className="space-y-2 text-sm font-bold">
                                                    <div className={`flex justify-between items-center p-3 rounded-xl transition ${semifinal2.ganador === 'local' ? 'bg-[#001659] text-white font-black shadow-sm' : 'bg-white border border-slate-200 text-slate-800'}`}>
                                                        <div className="flex items-center gap-2 truncate">
                                                            {renderEscudo(semifinal2.escudo_local)}
                                                            <span className="truncate">{semifinal2.equipo_local}</span>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded text-xs font-mono font-black ${semifinal2.ganador === 'local' ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#001659]'}`}>{semifinal2.goles_local ?? '-'}</span>
                                                    </div>
                                                    <div className={`flex justify-between items-center p-3 rounded-xl transition ${semifinal2.ganador === 'visitante' ? 'bg-[#001659] text-white font-black shadow-sm' : 'bg-white border border-slate-200 text-slate-800'}`}>
                                                        <div className="flex items-center gap-2 truncate">
                                                            {renderEscudo(semifinal2.escudo_visitante)}
                                                            <span className="truncate">{semifinal2.equipo_visitante}</span>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded text-xs font-mono font-black ${semifinal2.ganador === 'visitante' ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#001659]'}`}>{semifinal2.goles_visitante ?? '-'}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>

                        </div>
                    </section>

                </div>

            </div>
        </AppLayout>
    );
}
