import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import { 
    ChevronRight,
    ChevronLeft,
    Trophy,
    Flame
} from 'lucide-react';

export default function Deportes({ noticias = [], torneoPartidos = [], deportesBanners = [] }) {
    const [sliderIndex, setSliderIndex] = useState(0);

    // Helper for media URLs
    const getNewsImageUrl = (img, fallback = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80') => {
        if (!img) return fallback;
        if (img.startsWith('http')) return img;
        return `/storage/${img}`;
    };

    // Calculate actual lists from admin DB ONLY
    const mainFeaturedNews = noticias.length > 0 ? noticias[0] : null;
    const sideNewsList = noticias.length > 1 ? noticias.slice(1, 4) : [];

    // Fallback banners if none created in DB
    const defaultBanners = [
        {
            id: 1,
            tag: 'Microfútbol Intercolegiado',
            subtitulo: 'Deportes COLSIH • 03 Junio 2026',
            titulo: 'NUESTRO EQUIPO DE MICROFÚTBOL SE PROCLAMA CAMPEÓN DEL TORNEO REGIONAL',
            descripcion: 'El equipo representativo del Colegio Santa Isabel de Hungría conquistó el primer lugar tras una final emocionante donde prevalecieron la unión, la estrategia y el espíritu salesiano.',
            imagen: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1600&q=80'
        },
        {
            id: 2,
            tag: 'Voleibol Femenino',
            subtitulo: 'Deportes COLSIH • 01 Junio 2026',
            titulo: 'SELECCIÓN FEMENINA DE VOLEIBOL CLASIFICA A LA GRAN FINAL DEPARTAMENTAL',
            descripcion: 'Con un desempeño brillante en saques y remates, nuestras estudiantes aseguraron su cupo directo al torneo departamental.',
            imagen: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1600&q=80'
        },
        {
            id: 3,
            tag: 'Baloncesto Masculino',
            subtitulo: 'Deportes COLSIH • 28 Mayo 2026',
            titulo: 'VICTORIA MEMORABLE EN EL ÚLTIMO SEGUNDO DEL TORNEO DE BALONCESTO',
            descripcion: 'Un triple histórico a falta de 3 segundos selló la remontada de nuestro equipo en el coliseo municipal.',
            imagen: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1600&q=80'
        }
    ];

    const activeBanners = deportesBanners.length > 0 ? deportesBanners : defaultBanners;
    const currentBanner = activeBanners[sliderIndex % activeBanners.length];

    // Partidos para el Mapa de Eliminatorias (Cuadrangulares)
    const cuartos1 = torneoPartidos.find(p => p.fase === 'cuartos' && p.posicion_llave === 1) || { equipo_local: 'Casa Don Bosco', equipo_visitante: 'Casa Domingo Savio', goles_local: null, goles_visitante: null };
    const cuartos2 = torneoPartidos.find(p => p.fase === 'cuartos' && p.posicion_llave === 2) || { equipo_local: 'Casa María Auxiliadora', equipo_visitante: 'Casa Santa Isabel', goles_local: null, goles_visitante: null };
    const cuartos3 = torneoPartidos.find(p => p.fase === 'cuartos' && p.posicion_llave === 3) || { equipo_local: 'Casa Laura Vicuña', equipo_visitante: 'Casa Ceferino Namuncurá', goles_local: null, goles_visitante: null };
    const cuartos4 = torneoPartidos.find(p => p.fase === 'cuartos' && p.posicion_llave === 4) || { equipo_local: 'Selección Docentes', equipo_visitante: 'Selección Estudiantes', goles_local: null, goles_visitante: null };

    const semifinal1 = torneoPartidos.find(p => p.fase === 'semifinal' && p.posicion_llave === 1) || { equipo_local: 'Ganador Llave 1', equipo_visitante: 'Ganador Llave 2', goles_local: null, goles_visitante: null };
    const semifinal2 = torneoPartidos.find(p => p.fase === 'semifinal' && p.posicion_llave === 2) || { equipo_local: 'Ganador Llave 3', equipo_visitante: 'Ganador Llave 4', goles_local: null, goles_visitante: null };

    const finalMatch = torneoPartidos.find(p => p.fase === 'final') || { equipo_local: 'Ganador Semi 1', equipo_visitante: 'Ganador Semi 2', goles_local: null, goles_visitante: null };

    const campeon = finalMatch.ganador 
        ? (finalMatch.ganador === 'local' ? finalMatch.equipo_local : finalMatch.equipo_visitante)
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
                                        VER MAPA DE ELIMINATORIAS
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
                                    VER MAPA DE ELIMINATORIAS
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


                    {/* ── 4. FEATURED BANNER CAROUSEL ── */}
                    <section className="py-16 md:py-24">
                        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-6">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[420px] sm:min-h-[500px] flex items-end p-8 sm:p-14 group cursor-pointer border border-slate-900">
                                <img src={getNewsImageUrl(currentBanner.imagen, 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1600&q=80')} alt={currentBanner.titulo} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2">
                                    {activeBanners.map((_, idx) => (
                                        <button key={idx} onClick={() => setSliderIndex(idx)} className={`w-9 h-9 rounded-full font-black text-xs transition ${sliderIndex === idx ? 'bg-[#262626] text-white scale-110 shadow-md' : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200'}`}>
                                            {idx + 1}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setSliderIndex(prev => (prev > 0 ? prev - 1 : activeBanners.length - 1))} className="w-11 h-11 rounded-xl bg-slate-100/80 hover:bg-[#001659] hover:text-white transition flex items-center justify-center text-slate-700 cursor-pointer">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => setSliderIndex(prev => (prev < activeBanners.length - 1 ? prev + 1 : 0))} className="w-11 h-11 rounded-xl bg-slate-100/80 hover:bg-[#001659] hover:text-white transition flex items-center justify-center text-slate-700 cursor-pointer">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* ── 5. MAPA DE ELIMINATORIAS (CUADRANGULARES INTER-CASAS) ── */}
                    <section id="cuadrangulares-mapa" className="py-16 md:py-24">
                        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-10">

                            <div className="text-center space-y-2">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#001659] border border-blue-200 text-xs font-black uppercase tracking-widest">
                                    <Flame className="w-4 h-4 text-amber-500" />
                                    <span>FASE FINAL • CAMINO AL TÍTULO</span>
                                </div>
                                <h2 className="text-3xl sm:text-5xl font-black text-[#262626] uppercase tracking-tight font-sans">
                                    CUADRANGULARES INTER-CASAS 2026
                                </h2>
                                <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-xl mx-auto font-['DM_Sans',sans-serif]">
                                    Sigue el mapa oficial de llaves, encuentros directos y posiciones hasta coronar a la Casa Salesiana Campeona.
                                </p>
                            </div>

                            {/* HIGH TECH TOURNAMENT BRACKET BOARD */}
                            <div className="relative rounded-3xl bg-gradient-to-b from-[#06122E] via-[#091B42] to-[#040C20] p-6 sm:p-12 shadow-2xl border-2 border-[#1E3A8A] overflow-hidden text-white">
                                
                                {/* Background Watermark Logo */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                                    <Trophy className="w-[600px] h-[600px] text-white" />
                                </div>

                                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                                    {/* LEFT BRANCH (Cuartos 1 & 2 -> Semifinal 1) */}
                                    <div className="lg:col-span-4 space-y-6">
                                        <div className="text-xs font-black text-amber-400 uppercase tracking-widest border-b border-blue-500/30 pb-2 text-left">
                                            Rama Izquierda • Cuartos de Final
                                        </div>

                                        {/* Match 1 */}
                                        <div className={`p-4 rounded-2xl border transition-all ${cuartos1.ganador ? 'bg-slate-900/90 border-emerald-500/60 shadow-lg shadow-emerald-500/10' : 'bg-slate-900/70 border-slate-700'}`}>
                                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase mb-2">
                                                <span>Llave #1</span>
                                                <span className="text-amber-400">{cuartos1.estado}</span>
                                            </div>
                                            <div className="space-y-2 text-sm font-bold">
                                                <div className={`flex justify-between items-center p-2 rounded-xl ${cuartos1.ganador === 'local' ? 'bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/50' : 'text-slate-200'}`}>
                                                    <span>{cuartos1.equipo_local}</span>
                                                    <span className="bg-slate-950 px-2.5 py-0.5 rounded text-amber-400 font-mono">{cuartos1.goles_local ?? '-'}</span>
                                                </div>
                                                <div className={`flex justify-between items-center p-2 rounded-xl ${cuartos1.ganador === 'visitante' ? 'bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/50' : 'text-slate-200'}`}>
                                                    <span>{cuartos1.equipo_visitante}</span>
                                                    <span className="bg-slate-950 px-2.5 py-0.5 rounded text-amber-400 font-mono">{cuartos1.goles_visitante ?? '-'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Match 2 */}
                                        <div className={`p-4 rounded-2xl border transition-all ${cuartos2.ganador ? 'bg-slate-900/90 border-emerald-500/60 shadow-lg shadow-emerald-500/10' : 'bg-slate-900/70 border-slate-700'}`}>
                                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase mb-2">
                                                <span>Llave #2</span>
                                                <span className="text-amber-400">{cuartos2.estado}</span>
                                            </div>
                                            <div className="space-y-2 text-sm font-bold">
                                                <div className={`flex justify-between items-center p-2 rounded-xl ${cuartos2.ganador === 'local' ? 'bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/50' : 'text-slate-200'}`}>
                                                    <span>{cuartos2.equipo_local}</span>
                                                    <span className="bg-slate-950 px-2.5 py-0.5 rounded text-amber-400 font-mono">{cuartos2.goles_local ?? '-'}</span>
                                                </div>
                                                <div className={`flex justify-between items-center p-2 rounded-xl ${cuartos2.ganador === 'visitante' ? 'bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/50' : 'text-slate-200'}`}>
                                                    <span>{cuartos2.equipo_visitante}</span>
                                                    <span className="bg-slate-950 px-2.5 py-0.5 rounded text-amber-400 font-mono">{cuartos2.goles_visitante ?? '-'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Semifinal 1 */}
                                        <div className="pt-2">
                                            <div className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-2 text-left">
                                                Semifinal 1 (Ganadores L1 vs L2)
                                            </div>
                                            <div className={`p-4 rounded-2xl border-2 transition-all ${semifinal1.ganador ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/20' : 'bg-slate-900/80 border-cyan-500/40'}`}>
                                                <div className="space-y-2 text-sm font-bold">
                                                    <div className={`flex justify-between items-center p-2.5 rounded-xl ${semifinal1.ganador === 'local' ? 'bg-emerald-500/30 text-emerald-200 font-black border border-emerald-400' : 'text-slate-100'}`}>
                                                        <span>{semifinal1.equipo_local}</span>
                                                        <span className="bg-slate-950 px-3 py-1 rounded text-amber-400 font-mono text-base">{semifinal1.goles_local ?? '-'}</span>
                                                    </div>
                                                    <div className={`flex justify-between items-center p-2.5 rounded-xl ${semifinal1.ganador === 'visitante' ? 'bg-emerald-500/30 text-emerald-200 font-black border border-emerald-400' : 'text-slate-100'}`}>
                                                        <span>{semifinal1.equipo_visitante}</span>
                                                        <span className="bg-slate-950 px-3 py-1 rounded text-amber-400 font-mono text-base">{semifinal1.goles_visitante ?? '-'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CENTER: TROPHY & FINAL MATCH */}
                                    <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-6 text-center py-6">
                                        
                                        <div className="relative">
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/40 border-4 border-amber-300">
                                                <Trophy className="w-12 h-12" />
                                            </div>
                                            {campeon && (
                                                <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-3 -right-3 bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg border border-white">
                                                    ¡CAMPEÓN!
                                                </motion.div>
                                            )}
                                        </div>

                                        <div className="w-full space-y-3">
                                            <span className="text-xs font-black text-amber-300 uppercase tracking-widest block bg-amber-400/10 py-1 rounded-lg border border-amber-400/30">
                                                🏆 GRAN FINAL INTER-CASAS
                                            </span>

                                            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-400 rounded-3xl p-6 shadow-2xl space-y-3 text-left">
                                                <div className={`flex justify-between items-center p-3 rounded-2xl ${finalMatch.ganador === 'local' ? 'bg-amber-500/30 text-amber-200 font-black border border-amber-400' : 'text-white'}`}>
                                                    <span className="text-base font-black truncate">{finalMatch.equipo_local}</span>
                                                    <span className="bg-slate-950 px-3.5 py-1 rounded-xl text-amber-400 font-mono text-lg font-black">{finalMatch.goles_local ?? '-'}</span>
                                                </div>

                                                <div className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">VS</div>

                                                <div className={`flex justify-between items-center p-3 rounded-2xl ${finalMatch.ganador === 'visitante' ? 'bg-amber-500/30 text-amber-200 font-black border border-amber-400' : 'text-white'}`}>
                                                    <span className="text-base font-black truncate">{finalMatch.equipo_visitante}</span>
                                                    <span className="bg-slate-950 px-3.5 py-1 rounded-xl text-amber-400 font-mono text-lg font-black">{finalMatch.goles_visitante ?? '-'}</span>
                                                </div>
                                            </div>

                                            {campeon && (
                                                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2">
                                                    <span>🎉 CAMPEÓN 2026: {campeon} 🎉</span>
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                    {/* RIGHT BRANCH (Cuartos 3 & 4 -> Semifinal 2) */}
                                    <div className="lg:col-span-4 space-y-6">
                                        <div className="text-xs font-black text-amber-400 uppercase tracking-widest border-b border-blue-500/30 pb-2 text-right">
                                            Rama Derecha • Cuartos de Final
                                        </div>

                                        {/* Match 3 */}
                                        <div className={`p-4 rounded-2xl border transition-all ${cuartos3.ganador ? 'bg-slate-900/90 border-emerald-500/60 shadow-lg shadow-emerald-500/10' : 'bg-slate-900/70 border-slate-700'}`}>
                                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase mb-2">
                                                <span>Llave #3</span>
                                                <span className="text-amber-400">{cuartos3.estado}</span>
                                            </div>
                                            <div className="space-y-2 text-sm font-bold">
                                                <div className={`flex justify-between items-center p-2 rounded-xl ${cuartos3.ganador === 'local' ? 'bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/50' : 'text-slate-200'}`}>
                                                    <span>{cuartos3.equipo_local}</span>
                                                    <span className="bg-slate-950 px-2.5 py-0.5 rounded text-amber-400 font-mono">{cuartos3.goles_local ?? '-'}</span>
                                                </div>
                                                <div className={`flex justify-between items-center p-2 rounded-xl ${cuartos3.ganador === 'visitante' ? 'bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/50' : 'text-slate-200'}`}>
                                                    <span>{cuartos3.equipo_visitante}</span>
                                                    <span className="bg-slate-950 px-2.5 py-0.5 rounded text-amber-400 font-mono">{cuartos3.goles_visitante ?? '-'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Match 4 */}
                                        <div className={`p-4 rounded-2xl border transition-all ${cuartos4.ganador ? 'bg-slate-900/90 border-emerald-500/60 shadow-lg shadow-emerald-500/10' : 'bg-slate-900/70 border-slate-700'}`}>
                                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase mb-2">
                                                <span>Llave #4</span>
                                                <span className="text-amber-400">{cuartos4.estado}</span>
                                            </div>
                                            <div className="space-y-2 text-sm font-bold">
                                                <div className={`flex justify-between items-center p-2 rounded-xl ${cuartos4.ganador === 'local' ? 'bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/50' : 'text-slate-200'}`}>
                                                    <span>{cuartos4.equipo_local}</span>
                                                    <span className="bg-slate-950 px-2.5 py-0.5 rounded text-amber-400 font-mono">{cuartos4.goles_local ?? '-'}</span>
                                                </div>
                                                <div className={`flex justify-between items-center p-2 rounded-xl ${cuartos4.ganador === 'visitante' ? 'bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/50' : 'text-slate-200'}`}>
                                                    <span>{cuartos4.equipo_visitante}</span>
                                                    <span className="bg-slate-950 px-2.5 py-0.5 rounded text-amber-400 font-mono">{cuartos4.goles_visitante ?? '-'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Semifinal 2 */}
                                        <div className="pt-2">
                                            <div className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-2 text-right">
                                                Semifinal 2 (Ganadores L3 vs L4)
                                            </div>
                                            <div className={`p-4 rounded-2xl border-2 transition-all ${semifinal2.ganador ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/20' : 'bg-slate-900/80 border-cyan-500/40'}`}>
                                                <div className="space-y-2 text-sm font-bold">
                                                    <div className={`flex justify-between items-center p-2.5 rounded-xl ${semifinal2.ganador === 'local' ? 'bg-emerald-500/30 text-emerald-200 font-black border border-emerald-400' : 'text-slate-100'}`}>
                                                        <span>{semifinal2.equipo_local}</span>
                                                        <span className="bg-slate-950 px-3 py-1 rounded text-amber-400 font-mono text-base">{semifinal2.goles_local ?? '-'}</span>
                                                    </div>
                                                    <div className={`flex justify-between items-center p-2.5 rounded-xl ${semifinal2.ganador === 'visitante' ? 'bg-emerald-500/30 text-emerald-200 font-black border border-emerald-400' : 'text-slate-100'}`}>
                                                        <span>{semifinal2.equipo_visitante}</span>
                                                        <span className="bg-slate-950 px-3 py-1 rounded text-amber-400 font-mono text-base">{semifinal2.goles_visitante ?? '-'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </section>

                </div>

            </div>
        </AppLayout>
    );
}
