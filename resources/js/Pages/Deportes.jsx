import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import { 
    Send,
    CheckCircle2,
    ChevronRight,
    ChevronLeft
} from 'lucide-react';

export default function Deportes({ noticias = [] }) {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const [sliderIndex, setSliderIndex] = useState(0);

    function handleSubscribe(e) {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setTimeout(() => {
                setSubscribed(false);
                setEmail('');
            }, 4000);
        }
    }

    // Helper for media URLs
    const getNewsImageUrl = (img, fallback = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80') => {
        if (!img) return fallback;
        if (img.startsWith('http')) return img;
        return `/storage/${img}`;
    };

    // Calculate actual lists from admin DB ONLY (no fake mock data)
    const mainFeaturedNews = noticias.length > 0 ? noticias[0] : null;
    const sideNewsList = noticias.length > 1 ? noticias.slice(1, 4) : [];

    // Featured Full Width Event Banners
    const featuredBanners = [
        {
            tag: 'Microfútbol Intercolegiado',
            subtitulo: 'Deportes COLSIH • 03 Junio 2026',
            titulo: 'NUESTRO EQUIPO DE MICROFÚTBOL SE PROCLAMA CAMPEÓN DEL TORNEO REGIONAL',
            descripcion: 'El equipo representativo del Colegio Santa Isabel de Hungría conquistó el primer lugar tras una final emocionante donde prevalecieron la unión, la estrategia y el espíritu salesiano.',
            imagen: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1600&q=80'
        },
        {
            tag: 'Voleibol Femenino',
            subtitulo: 'Deportes COLSIH • 01 Junio 2026',
            titulo: 'SELECCIÓN FEMENINA DE VOLEIBOL CLASIFICA A LA GRAN FINAL DEPARTAMENTAL',
            descripcion: 'Con un desempeño brillante en saques y remates, nuestras estudiantes aseguraron su cupo directo al torneo departamental.',
            imagen: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1600&q=80'
        },
        {
            tag: 'Baloncesto Masculino',
            subtitulo: 'Deportes COLSIH • 28 Mayo 2026',
            titulo: 'VICTORIA MEMORABLE EN EL ÚLTIMO SEGUNDO DEL TORNEO DE BALONCESTO',
            descripcion: 'Un triple histórico a falta de 3 segundos selló la remontada de nuestro equipo en el coliseo municipal.',
            imagen: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1600&q=80'
        }
    ];

    // Inter-Casas Ranking Table
    const rankingTabla = [
        { pos: 1, casa: 'Casa Don Bosco', pj: 10, pg: 8, pe: 1, pp: 1, gf: 24, gc: 8, pts: 25, badge: '🥇' },
        { pos: 2, casa: 'Casa María Auxiliadora', pj: 10, pg: 7, pe: 2, pp: 1, gf: 21, gc: 9, pts: 23, badge: '🥈' },
        { pos: 3, casa: 'Casa Domingo Savio', pj: 10, pg: 5, pe: 3, pp: 2, gf: 18, gc: 12, pts: 18, badge: '🥉' },
        { pos: 4, casa: 'Casa Santa Isabel', pj: 10, pg: 4, pe: 2, pp: 4, gf: 15, gc: 15, pts: 14, badge: '4°' },
        { pos: 5, casa: 'Casa Laura Vicuña', pj: 10, pg: 3, pe: 1, pp: 6, gf: 11, gc: 19, pts: 10, badge: '5°' },
        { pos: 6, casa: 'Casa Ceferino Namuncurá', pj: 10, pg: 1, pe: 1, pp: 8, gf: 7, gc: 25, pts: 4, badge: '6°' },
    ];

    const currentBanner = featuredBanners[sliderIndex];

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
                    {/* Glow 1: Azul Institucional (#001659) Top-Left */}
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1], y: [0, 20, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -top-[120px] -left-[120px] w-[600px] h-[600px] bg-[#001659]/50 rounded-full blur-[140px]" 
                    />

                    {/* Glow 2: Celeste Institucional (#4DB6FF) Top-Right */}
                    <motion.div 
                        animate={{ scale: [1, 1.15, 1], y: [0, -25, 0] }}
                        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-[80px] -right-[120px] w-[500px] h-[500px] bg-[#4DB6FF]/50 rounded-full blur-[140px]" 
                    />

                    {/* Glow 3: Rojo Institucional (#800A15) Mid-Right */}
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-[22%] -right-[100px] w-[550px] h-[550px] bg-[#800A15]/50 rounded-full blur-[150px]" 
                    />

                    {/* Glow 4: Amarillo Institucional (#FFC107) Mid-Left */}
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1], x: [0, 25, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-[35%] -left-[100px] w-[450px] h-[450px] bg-[#FFC107]/50 rounded-full blur-[140px]" 
                    />

                    {/* Glow 5: Azul Institucional (#001659) Trending News Area */}
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1], y: [0, 30, 0] }}
                        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-[52%] -left-[120px] w-[550px] h-[550px] bg-[#001659]/50 rounded-full blur-[150px]" 
                    />

                    {/* Glow 6: Amarillo Institucional (#FFC107) Newsletter Area */}
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
                        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-[-100px] left-[15%] w-[650px] h-[650px] bg-[#FFC107]/40 rounded-full blur-[160px]" 
                    />

                    {/* Glow 7: Celeste Institucional (#4DB6FF) Bottom Right */}
                    <motion.div 
                        animate={{ scale: [1, 1.15, 1], x: [0, -25, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-[20px] -right-[100px] w-[500px] h-[500px] bg-[#4DB6FF]/50 rounded-full blur-[150px]" 
                    />
                </div>

                <div className="relative z-10">

                    {/* ── 1. HERO SECTION ── */}
                    <section className="relative w-full pt-28 pb-12 overflow-hidden min-h-[640px]">
                        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative">
                            
                            {/* Desktop Pixel-Perfect Layout (lg screens) */}
                            <div className="hidden lg:block relative w-full h-[620px]">

                                {/* 1. Watermark Basketball Background */}
                                <img 
                                    src="/images/deportes/balon_basket_fondo.png" 
                                    alt="Fondo Balón" 
                                    className="absolute left-[0px] top-[0px] w-[720px] h-[550px] object-contain opacity-65 pointer-events-none"
                                />

                                {/* 2. Main Title Text with Degradé & Bigger Font Size */}
                                <div className="absolute left-[130px] top-[75px] w-[500px] text-[68px] xl:text-[76px] font-black uppercase leading-[0.90] tracking-tighter font-sans z-10 select-none">
                                    <span className="text-[#262626]">MÁXIMO</span> <br />
                                    <span className="text-[#262626]">ANOTADOR</span> <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001659] to-[#08111F]">DE LA GRAN</span> <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001659] via-[#08111F] to-slate-700">FINAL</span>
                                </div>

                                {/* 3. Player Cutout Image */}
                                <img 
                                    src="/images/deportes/persona_basket_saltando.png" 
                                    alt="Jugador de Baloncesto Saltando" 
                                    className="absolute left-[260px] top-[20px] w-[720px] h-[580px] object-contain z-20 pointer-events-none drop-shadow-xl"
                                />

                                {/* 4. Description Paragraph & Button */}
                                <div className="absolute left-[560px] top-[445px] w-[360px] flex flex-col items-start gap-4 z-30">
                                    <p className="text-[#4A4A4A] text-[14px] xl:text-[15px] font-medium leading-[22px] font-['DM_Sans',sans-serif]">
                                        El premio al máximo anotador de las finales es la distinción individual otorgada al estudiante que obtuvo el mayor puntaje y rendimiento en el torneo intercolegiado.
                                    </p>
                                    <a 
                                        href="#noticias-tendencia"
                                        className="inline-flex items-center justify-center px-8 py-3.5 bg-[#262626] hover:bg-[#001659] text-white text-xs font-bold uppercase tracking-[1.8px] rounded-md transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer font-['DM_Sans',sans-serif]"
                                    >
                                        CONTINUAR LEYENDO
                                    </a>
                                </div>

                                {/* 5. Stacked Right Cards (Dynamic from DB) */}
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
                                <img 
                                    src="/images/deportes/balon_basket_fondo.png" 
                                    alt="Fondo Balón" 
                                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[260px] object-contain opacity-50 pointer-events-none"
                                />
                                <h1 className="text-3xl sm:text-5xl font-black text-[#262626] uppercase leading-none tracking-tighter font-sans z-10">
                                    MÁXIMO ANOTADOR <br />
                                    <span className="text-[#001659]">DE LA GRAN FINAL</span>
                                </h1>
                                <div className="relative w-full max-w-[380px] aspect-[4/3] z-20">
                                    <img src="/images/deportes/persona_basket_saltando.png" alt="Jugador de Baloncesto" className="w-full h-full object-contain drop-shadow-lg" />
                                </div>
                                <p className="text-sm font-medium text-[#666666] max-w-md leading-relaxed font-['DM_Sans',sans-serif]">
                                    El premio al máximo anotador de las finales es la distinción individual otorgada al estudiante que obtuvo el mayor puntaje y rendimiento en el torneo intercolegiado.
                                </p>
                                <a href="#noticias-tendencia" className="inline-flex items-center justify-center px-8 py-3.5 bg-[#262626] hover:bg-[#001659] text-white text-sm font-bold uppercase tracking-[1.8px] rounded-lg transition-all shadow-md font-['DM_Sans',sans-serif]">
                                    CONTINUAR LEYENDO
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

                            {/* Asymmetrical 4-Column Masonry Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] items-start text-center">

                                {/* Column 1 */}
                                <div className="flex flex-col gap-[20px]">
                                    <motion.div 
                                        whileHover={{ scale: 1.02 }}
                                        className="w-full h-[116px] bg-[#EBEEF3]/90 backdrop-blur-sm rounded-[10px] flex items-center justify-center p-4 border border-slate-200/60 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                                    >
                                        <span className="text-[34px] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#262626] to-[#78889B] font-sans leading-none">
                                            MICROFÚTBOL
                                        </span>
                                    </motion.div>

                                    <motion.div 
                                        whileHover={{ scale: 1.02 }}
                                        className="w-full h-[288px] rounded-[10px] overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer group border border-slate-200/60"
                                    >
                                        <img 
                                            src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80" 
                                            alt="Microfútbol" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                    </motion.div>
                                </div>

                                {/* Column 2 */}
                                <div className="flex flex-col gap-[20px]">
                                    <motion.div 
                                        whileHover={{ scale: 1.02 }}
                                        className="w-full h-[235px] rounded-[10px] overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer group border border-slate-200/60"
                                    >
                                        <img 
                                            src="https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=600&q=80" 
                                            alt="Balón de Baloncesto" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                    </motion.div>

                                    <motion.div 
                                        whileHover={{ scale: 1.02 }}
                                        className="w-full h-[169px] bg-[#EBEEF3]/90 backdrop-blur-sm rounded-[10px] flex items-center justify-center p-4 border border-slate-200/60 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                                    >
                                        <span className="text-[34px] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#262626] to-[#78889B] font-sans leading-tight">
                                            BALONCESTO
                                        </span>
                                    </motion.div>
                                </div>

                                {/* Column 3 */}
                                <div className="flex flex-col gap-[20px]">
                                    <motion.div 
                                        whileHover={{ scale: 1.02 }}
                                        className="w-full h-[116px] bg-[#EBEEF3]/90 backdrop-blur-sm rounded-[10px] flex items-center justify-center p-4 border border-slate-200/60 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                                    >
                                        <span className="text-[34px] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#262626] to-[#78889B] font-sans leading-none">
                                            VOLEIBOL
                                        </span>
                                    </motion.div>

                                    <motion.div 
                                        whileHover={{ scale: 1.02 }}
                                        className="w-full h-[288px] rounded-[10px] overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer group border border-slate-200/60"
                                    >
                                        <img 
                                            src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=600&q=80" 
                                            alt="Cancha Voleibol" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                    </motion.div>
                                </div>

                                {/* Column 4 */}
                                <div className="flex flex-col gap-[20px]">
                                    <motion.div 
                                        whileHover={{ scale: 1.02 }}
                                        className="w-full h-[286px] rounded-[10px] overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer group border border-slate-200/60"
                                    >
                                        <img 
                                            src="https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=600&q=80" 
                                            alt="Selección Voleibol" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                    </motion.div>

                                    <motion.div 
                                        whileHover={{ scale: 1.02 }}
                                        className="w-full h-[118px] bg-[#EBEEF3]/90 backdrop-blur-sm rounded-[10px] flex items-center justify-center p-4 border border-slate-200/60 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                                    >
                                        <span className="text-[28px] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#262626] to-[#78889B] font-sans leading-none">
                                            TORNEOS COLSIH
                                        </span>
                                    </motion.div>
                                </div>

                            </div>

                        </div>
                    </section>


                    {/* ── 3. TRENDING NEWS (ÚNICAMENTE NOTICIAS REALES DE LA BASE DE DATOS) ── */}
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

                                    {/* Left Stacked Cards (Dynamic from DB) */}
                                    <div className="lg:col-span-6 space-y-5 flex flex-col justify-between">
                                        {sideNewsList.map((news) => (
                                            <Link 
                                                key={news.id}
                                                href={`/noticias/${news.slug}`}
                                            >
                                                <motion.div 
                                                    whileHover={{ x: 4 }}
                                                    className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 items-center cursor-pointer group text-left h-full"
                                                >
                                                    <img 
                                                        src={getNewsImageUrl(news.imagen)} 
                                                        alt={news.titulo} 
                                                        className="w-full sm:w-44 h-36 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <div className="space-y-2">
                                                        <span className="text-[11px] font-black uppercase tracking-wider text-[#800A15] block font-['DM_Sans',sans-serif]">
                                                            {news.categoria || 'Deportes'} • {news.publicado_en ? new Date(news.publicado_en).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Reciente'}
                                                        </span>
                                                        <h3 className="text-base sm:text-lg font-black text-[#262626] group-hover:text-[#001659] transition-colors leading-snug font-sans">
                                                            {news.titulo}
                                                        </h3>
                                                        <p className="text-xs font-medium text-slate-500 leading-relaxed font-['DM_Sans',sans-serif] line-clamp-2">
                                                            {news.resumen || 'Haz clic para ver todos los detalles de esta publicación.'}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Right 1 Large Full Overlay Card (Dynamic Main Featured News) */}
                                    {mainFeaturedNews && (
                                        <div className="lg:col-span-6 relative min-h-[460px] rounded-3xl overflow-hidden shadow-xl group cursor-pointer border border-slate-800">
                                            <Link href={`/noticias/${mainFeaturedNews.slug}`}>
                                                <img 
                                                    src={getNewsImageUrl(mainFeaturedNews.imagen)} 
                                                    alt={mainFeaturedNews.titulo} 
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#262626] via-[#262626]/60 to-transparent" />
                                                
                                                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between text-left relative z-10">
                                                    <div className="inline-flex">
                                                        <span className="px-4 py-1.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest font-['DM_Sans',sans-serif]">
                                                            {mainFeaturedNews.categoria || 'Noticia Deportiva'}
                                                        </span>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block font-['DM_Sans',sans-serif]">
                                                            Destacado Principal • {mainFeaturedNews.publicado_en ? new Date(mainFeaturedNews.publicado_en).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Reciente'}
                                                        </span>
                                                        <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight uppercase font-sans tracking-tight drop-shadow-md">
                                                            {mainFeaturedNews.titulo}
                                                        </h3>
                                                        <p className="text-xs sm:text-sm font-medium text-slate-300 max-w-lg leading-relaxed font-['DM_Sans',sans-serif] line-clamp-3">
                                                            {mainFeaturedNews.resumen || 'Descubre los detalles de esta noticia destacada.'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )}

                                </div>
                            )}

                        </div>
                    </section>


                    {/* ── 4. BIG FEATURED EVENT BANNER ── */}
                    <section className="py-16 md:py-24">
                        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-6">

                            <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[420px] sm:min-h-[500px] flex items-end p-8 sm:p-14 group cursor-pointer border border-slate-900">
                                <img 
                                    src={currentBanner.imagen} 
                                    alt={currentBanner.titulo} 
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#262626] via-[#262626]/70 to-transparent" />

                                <div className="relative z-10 max-w-3xl text-left space-y-4">
                                    <div className="inline-flex items-center gap-3">
                                        <span className="px-3.5 py-1 rounded-md bg-[#800A15] text-white text-xs font-black uppercase tracking-widest font-['DM_Sans',sans-serif]">
                                            {currentBanner.tag}
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

                            {/* Slider Controls */}
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2">
                                    {[0, 1, 2].map((idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSliderIndex(idx)}
                                            className={`w-9 h-9 rounded-full font-black text-xs transition-all ${
                                                sliderIndex === idx 
                                                    ? 'bg-[#262626] text-white scale-110 shadow-md' 
                                                    : 'bg-slate-100/80 backdrop-blur-sm text-slate-600 hover:bg-slate-200'
                                            }`}
                                        >
                                            {idx + 1}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => setSliderIndex((prev) => (prev > 0 ? prev - 1 : 2))}
                                        className="w-11 h-11 rounded-xl bg-slate-100/80 backdrop-blur-sm hover:bg-[#001659] hover:text-white transition-all flex items-center justify-center text-slate-700 shadow-xs cursor-pointer"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => setSliderIndex((prev) => (prev < 2 ? prev + 1 : 0))}
                                        className="w-11 h-11 rounded-xl bg-slate-100/80 backdrop-blur-sm hover:bg-[#001659] hover:text-white transition-all flex items-center justify-center text-slate-700 shadow-xs cursor-pointer"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </section>


                    {/* ── 5. RECENT NEWS & CLUB RANKING ── */}
                    <section className="py-16 md:py-24">
                        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                                {/* Left Side: Recent News Cards (Dynamic from DB) */}
                                <div className="lg:col-span-5 space-y-6 text-left">
                                    <h3 className="text-2xl font-black text-[#262626] tracking-tight uppercase font-sans">
                                        Noticias Recientes
                                    </h3>

                                    {noticias.length > 3 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
                                            {noticias.slice(3, 6).map((recNews) => (
                                                <Link key={recNews.id} href={`/noticias/${recNews.slug}`}>
                                                    <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer">
                                                        <img 
                                                            src={getNewsImageUrl(recNews.imagen)} 
                                                            alt={recNews.titulo} 
                                                            className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform" 
                                                        />
                                                        <div className="space-y-1">
                                                            <span className="text-[9px] font-black uppercase text-[#001659] block font-['DM_Sans',sans-serif]">
                                                                {recNews.categoria || 'Deportes'} • {recNews.publicado_en ? new Date(recNews.publicado_en).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }) : 'Reciente'}
                                                            </span>
                                                            <h5 className="text-xs font-black text-[#262626] group-hover:text-[#001659] transition-colors leading-snug font-sans">
                                                                {recNews.titulo}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl text-slate-500 text-xs font-semibold text-center font-['DM_Sans',sans-serif]">
                                            No hay más publicaciones deportivas en este momento.
                                        </div>
                                    )}
                                </div>

                                {/* Right Side: Clubs Ranking Table */}
                                <div className="lg:col-span-7 space-y-6 text-left">
                                    <div className="flex items-center justify-between pb-1">
                                        <h3 className="text-2xl font-black text-[#262626] tracking-tight uppercase font-sans">
                                            Clubs Ranking
                                        </h3>
                                        <span className="text-xs font-bold text-slate-400 font-['DM_Sans',sans-serif]">Posiciones Inter-Casas 2026</span>
                                    </div>

                                    <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-100/90 text-[11px] font-black text-slate-700 uppercase tracking-wider border-b border-slate-200 font-sans">
                                                        <th className="py-3.5 px-4">Club / Casa</th>
                                                        <th className="py-3.5 px-3 text-center">GP</th>
                                                        <th className="py-3.5 px-3 text-center">W</th>
                                                        <th className="py-3.5 px-3 text-center">D</th>
                                                        <th className="py-3.5 px-3 text-center">L</th>
                                                        <th className="py-3.5 px-3 text-center">F</th>
                                                        <th className="py-3.5 px-3 text-center">A</th>
                                                        <th className="py-3.5 px-4 text-center text-[#001659]">PTS</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 text-xs font-semibold font-['DM_Sans',sans-serif]">
                                                    {rankingTabla.map((row) => (
                                                        <tr 
                                                            key={row.pos} 
                                                            className="hover:bg-slate-50/80 transition-colors duration-150"
                                                        >
                                                            <td className="py-3.5 px-4 font-black text-[#262626] flex items-center gap-2.5 font-sans">
                                                                <span className="text-base shrink-0">{row.badge}</span>
                                                                <span>{row.casa}</span>
                                                            </td>
                                                            <td className="py-3.5 px-3 text-center text-slate-600 font-bold font-sans">{row.pj}</td>
                                                            <td className="py-3.5 px-3 text-center text-emerald-600 font-bold font-sans">{row.pg}</td>
                                                            <td className="py-3.5 px-3 text-center text-slate-500 font-sans">{row.pe}</td>
                                                            <td className="py-3.5 px-3 text-center text-rose-500 font-sans">{row.pp}</td>
                                                            <td className="py-3.5 px-3 text-center text-slate-600 font-sans">{row.gf}</td>
                                                            <td className="py-3.5 px-3 text-center text-slate-600 font-sans">{row.gc}</td>
                                                            <td className="py-3.5 px-4 text-center font-black text-sm text-[#001659] bg-blue-50/50 font-sans">
                                                                {row.pts}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </section>


                    {/* ── 6. NEWSLETTER SUBSCRIPTION BANNER ── */}
                    <section className="py-16 md:py-24">
                        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">

                            <div className="relative rounded-3xl bg-[#EAEFF4]/90 backdrop-blur-md p-8 sm:p-14 overflow-hidden border border-slate-300/70 shadow-lg">

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

                                    {/* Left Input & Heading */}
                                    <div className="lg:col-span-7 space-y-6 text-left">
                                        <div className="space-y-2">
                                            <span className="text-xs font-black uppercase tracking-[3px] text-[#800A15] block font-['DM_Sans',sans-serif]">
                                                Boletín Oficial
                                            </span>
                                            <h2 className="text-3xl sm:text-5xl font-black text-[#262626] uppercase tracking-tighter font-sans leading-none">
                                                NEWSLETTER <br />
                                                <span className="text-[#001659]">SUBSCRIPTION</span>
                                            </h2>
                                        </div>

                                        <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-md font-['DM_Sans',sans-serif]">
                                            Recibe semanalmente los resultados de competencias intercolegiadas, horarios de entrenamiento y destacados del talento deportivo COLSIH.
                                        </p>

                                        {subscribed ? (
                                            <div className="p-4 rounded-2xl bg-emerald-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-3 shadow-md max-w-md font-['DM_Sans',sans-serif]">
                                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                                <span>¡Te has suscrito al boletín deportivo correctamente!</span>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-md">
                                                <input 
                                                    type="email" 
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Alexandro89@gmail.com" 
                                                    className="w-full px-5 py-4 rounded-xl bg-white border border-slate-300 text-sm font-semibold text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#001659] shadow-xs font-['DM_Sans',sans-serif]"
                                                />
                                                <button 
                                                    type="submit" 
                                                    className="w-full sm:w-auto px-6 py-4 bg-[#262626] hover:bg-[#001659] text-white rounded-xl font-black transition-all flex items-center justify-center shrink-0 shadow-md cursor-pointer"
                                                >
                                                    <Send className="w-5 h-5" />
                                                </button>
                                            </form>
                                        )}
                                    </div>

                                    {/* Right Athlete Cutout Image */}
                                    <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                                        <div className="relative w-64 sm:w-80 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform hover:rotate-1 transition-transform">
                                            <img 
                                                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80" 
                                                alt="Boletín Deportivo COLSIH" 
                                                className="w-full h-full object-cover" 
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* Bottom Pagination & Social Bar */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                                <div className="flex items-center gap-3">
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-100/80 backdrop-blur-sm hover:bg-[#001659] hover:text-white transition-all flex items-center justify-center text-slate-700 font-black text-xs">
                                        f
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-100/80 backdrop-blur-sm hover:bg-[#001659] hover:text-white transition-all flex items-center justify-center text-slate-700 font-black text-xs">
                                        ig
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-100/80 backdrop-blur-sm hover:bg-[#001659] hover:text-white transition-all flex items-center justify-center text-slate-700 font-black text-xs">
                                        x
                                    </a>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="w-9 h-9 rounded-lg bg-slate-100/80 backdrop-blur-sm text-slate-500 hover:bg-slate-200 flex items-center justify-center">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    {[1, 2, 3, 4].map((num) => (
                                        <button 
                                            key={num}
                                            onClick={() => setActivePage(num)}
                                            className={`w-9 h-9 rounded-lg font-black text-xs transition-all ${
                                                activePage === num 
                                                    ? 'bg-[#262626] text-white shadow-xs' 
                                                    : 'bg-slate-100/80 backdrop-blur-sm text-slate-600 hover:bg-slate-200'
                                            }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                    <button className="w-9 h-9 rounded-lg bg-slate-100/80 backdrop-blur-sm text-slate-500 hover:bg-slate-200 flex items-center justify-center">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </section>

                </div>

            </div>
        </AppLayout>
    );
}
