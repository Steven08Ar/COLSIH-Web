import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import { 
    Trophy, 
    ArrowRight, 
    Send,
    CheckCircle2,
    ChevronRight,
    ChevronLeft
} from 'lucide-react';

export default function Deportes() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
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

    // Categories grid strictly scoped to Microfútbol, Baloncesto, and Voleibol per user request
    const categories = [
        { id: 'microfutbol', label: 'MICROFÚTBOL', type: 'text', bg: 'bg-[#EAEFF4]' },
        { id: 'baloncesto-img', label: 'Baloncesto', type: 'image', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80' },
        { id: 'voleibol', label: 'VOLEIBOL', type: 'text', bg: 'bg-[#EAEFF4]' },
        { id: 'voleibol-img', label: 'Voleibol', type: 'image', img: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=800&q=80' },
        { id: 'microfutbol-img', label: 'Microfútbol', type: 'image', img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80' },
        { id: 'baloncesto', label: 'BALONCESTO', type: 'text', bg: 'bg-[#EAEFF4]' },
        { id: 'baloncesto-cancha', label: 'Cancha Baloncesto', type: 'image', img: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80' },
        { id: 'torneos', label: 'TORNEOS COLSIH', type: 'text', bg: 'bg-[#EAEFF4]' },
    ];

    // Trending News (Filtered for Microfútbol, Baloncesto, Voleibol)
    const trendingNews = [
        {
            id: 1,
            tag: 'Microfútbol',
            fecha: '03 Junio 2026',
            titulo: 'Selección de microfútbol asegura el pase a semifinales regionales',
            resumen: 'Destacada participación del equipo COLSIH tras una emocionante victoria 4-2 en el torneo intercolegiado.',
            imagen: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 2,
            tag: 'Baloncesto',
            fecha: '03 Junio 2026',
            titulo: 'Equipo de baloncesto inicia fase de preparación de alta intensidad',
            resumen: 'Nuestros basquetbolistas intensifican prácticas tácticas de tiro de tres puntos y defensa en zona.',
            imagen: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 3,
            tag: 'Voleibol',
            fecha: '03 Junio 2026',
            titulo: 'Voleibol femenino consigue invicto de 5 partidos seguidos',
            resumen: 'Demostración magistral de saques y bloqueos defensivos en la copa intercolegiada metropolitana.',
            imagen: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=800&q=80'
        }
    ];

    // Featured Full Width Event Banners
    const featuredBanners = [
        {
            tag: 'Microfútbol Intercolegiado',
            subtitulo: 'Deportes COLSIH • 03 Junio 2026',
            titulo: 'NUESTRO EQUIPO DE MICROFÚTBOL SE PROCLAMA CAMPEÓN DEL TORNEO REGIONAL',
            descripcion: 'El equipo representativo del Colegio Santa Isabel de Hungría conquistó el primer lugar tras una final emocionante donde prevalecieron la unión, la estrategia y el espíritu salesiano.',
            imagen: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80'
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

    // Sports Articles (Authors with Roboto font style as specified in Figma json)
    const sportsArticles = [
        {
            id: 1,
            tag: 'Acondicionamiento',
            imagen: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
            autor: 'Prof. Ana Ruiz',
            autorFoto: 'https://media.colsih.edu.co/nuestro_colegio/equipo/docentes/Daniela%20Villamizar%20Villamizar.JPG',
            fecha: '22 Junio 2026',
            titulo: '5 Ejercicios de Fuerza que Todo Baloncestista Debe Desarrollar',
            resumen: 'Guía práctica para mejorar el salto vertical, la estabilidad articular y la resistencia durante el partido.'
        },
        {
            id: 2,
            tag: 'Estrategia Táctica',
            imagen: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
            autor: 'Prof. Carlos Gómez',
            autorFoto: 'https://media.colsih.edu.co/nuestro_colegio/equipo/docentes/Jeyson%20Eduardo%20Su%C3%A1rez%20Ardila.JPG',
            fecha: '22 Junio 2026',
            titulo: 'Técnicas de Presión y Movilidad en Microfútbol Escolar',
            resumen: 'Estrategias de acondicionamiento físico y rotación rápida en cancha reducida recomendadas para torneos.'
        },
        {
            id: 3,
            tag: 'Coordinación Ocular',
            imagen: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=800&q=80',
            autor: 'Prof. David Suárez',
            autorFoto: 'https://media.colsih.edu.co/nuestro_colegio/equipo/docentes/Edgar%20Javier%20Garc%C3%ADa%20Estupi%C3%B1%C3%A1n.JPG',
            fecha: '22 Junio 2026',
            titulo: 'Técnicas de Coordinación y Remate Potente en Voleibol',
            resumen: 'Cómo la concentración y el ritmo de salto aumentan la precisión del remate y la agilidad defensiva en voleibol.'
        }
    ];

    const currentBanner = featuredBanners[sliderIndex];

    return (
        <AppLayout>
            <Head title="Deportes y Talento Salesiano | COLSIH">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
            </Head>

            <div className="bg-[#FFFFFF] text-[#262626] overflow-x-hidden font-['DM_Sans',sans-serif] select-none">

                {/* ── 1. HERO SECTION (Top Scorer To The Final Match) ── */}
                <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-[#F5F7FA] border-b border-[#E2E8F0] overflow-hidden">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                            {/* Left Display Headline & Center Athlete Cutout (7 Cols) */}
                            <div className="lg:col-span-7 relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">

                                {/* Watermark Background Circle */}
                                <div className="absolute top-1/2 left-1/2 lg:left-1/3 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] lg:w-[540px] h-[340px] sm:h-[460px] lg:h-[540px] rounded-full border border-slate-200/80 bg-gradient-to-br from-slate-100/70 to-slate-200/40 -z-10 pointer-events-none flex items-center justify-center">
                                    <div className="w-[86%] h-[86%] rounded-full border border-dashed border-slate-300/60" />
                                </div>

                                <motion.div 
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-1"
                                >
                                    <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#800A15] block font-['DM_Sans',sans-serif]">
                                        TALENTO DEPORTIVO COLSIH
                                    </span>
                                </motion.div>

                                <motion.h1 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="text-4xl sm:text-5xl lg:text-[66px] font-black text-[#262626] leading-[0.92] tracking-tighter uppercase font-sans"
                                >
                                    TOP SCORER TO <br />
                                    <span className="text-[#001659]">THE FINAL MATCH</span>
                                </motion.h1>

                                {/* Action Cutout Athlete Image */}
                                <motion.div 
                                    initial={{ scale: 0.92, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                    className="relative w-full max-w-[420px] aspect-[4/3] my-2 cursor-pointer group"
                                >
                                    <img 
                                        src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80" 
                                        alt="Atleta Destacado COLSIH" 
                                        className="w-full h-full object-cover rounded-3xl shadow-2xl group-hover:scale-[1.02] transition-transform duration-500 border-4 border-white"
                                    />
                                    <div className="absolute -bottom-4 right-4 bg-[#262626] text-white px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20">
                                        <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                                        <span className="text-xs font-black uppercase tracking-wider font-['DM_Sans',sans-serif]">Máximo Anotador</span>
                                    </div>
                                </motion.div>

                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="text-[#666666] text-sm sm:text-base font-medium max-w-lg leading-relaxed font-['DM_Sans',sans-serif]"
                                >
                                    El premio al máximo anotador de las finales intercolegiadas es la distinción individual otorgada al estudiante que obtuvo el mayor puntaje y liderazgo deportivo en microfútbol, baloncesto y voleibol.
                                </motion.p>

                                <motion.div 
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="pt-1"
                                >
                                    <a 
                                        href="#noticias-tendencia" 
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#262626] hover:bg-[#001659] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer font-['DM_Sans',sans-serif]"
                                    >
                                        <span>CONTINUAR LEYENDO</span>
                                        <ArrowRight className="w-4 h-4 text-amber-400" />
                                    </a>
                                </motion.div>

                            </div>

                            {/* Right Side Stacked Cards ("Today" / "Hoy") (5 Cols) */}
                            <div className="lg:col-span-5 space-y-5 text-left">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                                    <span className="px-3.5 py-1 rounded-md bg-[#E2E8F0] text-slate-800 text-xs font-extrabold tracking-wider uppercase font-['DM_Sans',sans-serif]">
                                        Today
                                    </span>
                                    <span className="text-xs font-bold text-slate-400 font-['DM_Sans',sans-serif]">Destacados de Hoy</span>
                                </div>

                                {/* Sidebar Card 1 */}
                                <motion.div 
                                    whileHover={{ y: -3 }}
                                    className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-300 flex items-center gap-4 cursor-pointer group"
                                >
                                    <img 
                                        src="https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=400&q=80" 
                                        alt="Voleibol" 
                                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="space-y-1.5">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-[#800A15] block font-['DM_Sans',sans-serif]">
                                            Voleibol • 03 Junio 2026
                                        </span>
                                        <h4 className="text-sm font-black text-[#262626] group-hover:text-[#001659] transition-colors leading-snug font-sans">
                                            Selección de voleibol obtiene los primeros cuatro puestos en la copa escolar
                                        </h4>
                                    </div>
                                </motion.div>

                                {/* Sidebar Card 2 */}
                                <motion.div 
                                    whileHover={{ y: -3 }}
                                    className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-300 flex items-center gap-4 cursor-pointer group"
                                >
                                    <img 
                                        src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80" 
                                        alt="Microfútbol" 
                                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="space-y-1.5">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-[#001659] block font-['DM_Sans',sans-serif]">
                                            Microfútbol • 01 Junio 2026
                                        </span>
                                        <h4 className="text-sm font-black text-[#262626] group-hover:text-[#001659] transition-colors leading-snug font-sans">
                                            Microfútbol COLSIH: Gran desempeño y victoria en la segunda jornada
                                        </h4>
                                    </div>
                                </motion.div>
                            </div>

                        </div>
                    </div>
                </section>


                {/* ── 2. CATEGORY MOSAIC GRID ("Category") ── */}
                <section className="py-16 md:py-24 bg-white border-b border-slate-200/70">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-8">

                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl sm:text-4xl font-black text-[#262626] tracking-tight uppercase font-sans">
                                Category
                            </h2>
                            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-['DM_Sans',sans-serif]">
                                Microfútbol • Baloncesto • Voleibol
                            </span>
                        </div>

                        {/* 4-Column x 2-Row Mosaic Grid matching Figma Layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {categories.map((cat) => {
                                const isText = cat.type === 'text';

                                return (
                                    <motion.div
                                        key={cat.id}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => setSelectedCategory(cat.label)}
                                        className={`relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer min-h-[140px] sm:min-h-[170px] flex items-center justify-center p-6 ${
                                            isText ? `${cat.bg} border border-slate-200/80` : 'group'
                                        }`}
                                    >
                                        {isText ? (
                                            <div className="text-center space-y-1">
                                                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#262626] via-[#001659] to-slate-600 uppercase font-sans">
                                                    {cat.label}
                                                </h3>
                                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#800A15] block font-['DM_Sans',sans-serif]">
                                                    Explorar Selección
                                                </span>
                                            </div>
                                        ) : (
                                            <>
                                                <img 
                                                    src={cat.img} 
                                                    alt={cat.label} 
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#262626]/85 via-[#262626]/30 to-transparent" />
                                                <div className="relative z-10 text-center">
                                                    <span className="text-white font-black text-lg sm:text-xl uppercase tracking-wider font-sans drop-shadow-md">
                                                        {cat.label}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                    </div>
                </section>


                {/* ── 3. TRENDING NEWS ("Trending News") ── */}
                <section id="noticias-tendencia" className="py-20 md:py-28 bg-[#F5F7FA] border-b border-slate-200/70">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-10">

                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl sm:text-4xl font-black text-[#262626] tracking-tight uppercase font-sans">
                                Trending News
                            </h2>
                            <span className="text-xs font-extrabold text-[#001659] uppercase tracking-wider font-['DM_Sans',sans-serif]">
                                Actualidad Deportiva COLSIH
                            </span>
                        </div>

                        {/* Split 2-Column: Left 3 Horizontal Cards | Right 1 Giant Hero Card */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                            {/* Left 3 Stacked Cards (6 Cols) */}
                            <div className="lg:col-span-6 space-y-5 flex flex-col justify-between">
                                {trendingNews.map((news) => (
                                    <motion.div 
                                        key={news.id}
                                        whileHover={{ x: 4 }}
                                        className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 items-center cursor-pointer group text-left"
                                    >
                                        <img 
                                            src={news.imagen} 
                                            alt={news.titulo} 
                                            className="w-full sm:w-44 h-36 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="space-y-2">
                                            <span className="text-[11px] font-black uppercase tracking-wider text-[#800A15] block font-['DM_Sans',sans-serif]">
                                                {news.tag} • {news.fecha}
                                            </span>
                                            <h3 className="text-base sm:text-lg font-black text-[#262626] group-hover:text-[#001659] transition-colors leading-snug font-sans">
                                                {news.titulo}
                                            </h3>
                                            <p className="text-xs font-medium text-slate-500 leading-relaxed font-['DM_Sans',sans-serif] line-clamp-2">
                                                {news.resumen}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Right 1 Large Full Overlay Card (6 Cols) */}
                            <div className="lg:col-span-6 relative min-h-[460px] rounded-3xl overflow-hidden shadow-xl group cursor-pointer border border-slate-800">
                                <img 
                                    src="https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1200&q=80" 
                                    alt="Voleibol Salesiano" 
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#262626] via-[#262626]/60 to-transparent" />
                                
                                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between text-left relative z-10">
                                    <div className="inline-flex">
                                        <span className="px-4 py-1.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest font-['DM_Sans',sans-serif]">
                                            Voleibol
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block font-['DM_Sans',sans-serif]">
                                            Noticias • 03 Junio 2026
                                        </span>
                                        <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight uppercase font-sans tracking-tight drop-shadow-md">
                                            ¡DESCUBRE LOS BENEFICIOS Y LOGROS DE NUESTROS DEPORTISTAS SALESIANOS!
                                        </h3>
                                        <p className="text-xs sm:text-sm font-medium text-slate-300 max-w-lg leading-relaxed font-['DM_Sans',sans-serif]">
                                            El deporte escolar en microfútbol, baloncesto y voleibol fortalece la salud, el trabajo en equipo y los valores en nuestros estudiantes.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>


                {/* ── 4. BIG FEATURED EVENT BANNER ── */}
                <section className="py-16 md:py-24 bg-white border-b border-slate-200/70">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-6">

                        {/* Large Wide Banner Card */}
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

                        {/* Slider Controls Below */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                                {[0, 1, 2].map((idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSliderIndex(idx)}
                                        className={`w-9 h-9 rounded-full font-black text-xs transition-all ${
                                            sliderIndex === idx 
                                                ? 'bg-[#262626] text-white scale-110 shadow-md' 
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => setSliderIndex((prev) => (prev > 0 ? prev - 1 : 2))}
                                    className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-[#001659] hover:text-white transition-all flex items-center justify-center text-slate-700 shadow-xs cursor-pointer"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => setSliderIndex((prev) => (prev < 2 ? prev + 1 : 0))}
                                    className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-[#001659] hover:text-white transition-all flex items-center justify-center text-slate-700 shadow-xs cursor-pointer"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                    </div>
                </section>


                {/* ── 5. RECENT NEWS & CLUB RANKING (Clubs Ranking) ── */}
                <section className="py-20 md:py-28 bg-[#F5F7FA] border-b border-slate-200/70">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                            {/* Left Side: Recent News Cards (5 Cols) */}
                            <div className="lg:col-span-5 space-y-6 text-left">
                                <h3 className="text-2xl font-black text-[#262626] tracking-tight uppercase font-sans">
                                    Recent News
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
                                    {/* Main Card */}
                                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer">
                                        <img 
                                            src="https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=800&q=80" 
                                            alt="Voleibol" 
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        <div className="p-5 space-y-2">
                                            <span className="text-[10px] font-black uppercase tracking-wider text-[#800A15] block font-['DM_Sans',sans-serif]">
                                                Voleibol • 03 Junio 2026
                                            </span>
                                            <h4 className="text-base font-black text-[#262626] group-hover:text-[#001659] transition-colors leading-snug font-sans">
                                                Torneo Intercolegiado de Voleibol Femenino y Masculino
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Small Card 1 */}
                                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center gap-4 group cursor-pointer">
                                        <img 
                                            src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=300&q=80" 
                                            alt="Baloncesto" 
                                            className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform" 
                                        />
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-black uppercase text-[#001659] block font-['DM_Sans',sans-serif]">Baloncesto • 02 Junio</span>
                                            <h5 className="text-xs font-black text-[#262626] group-hover:text-[#001659] transition-colors leading-snug font-sans">
                                                Gran Torneo de Baloncesto Inter-Casas
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Clubs Ranking Table Inter-Casas (7 Cols) */}
                            <div className="lg:col-span-7 space-y-6 text-left">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                    <h3 className="text-2xl font-black text-[#262626] tracking-tight uppercase font-sans">
                                        Clubs Ranking
                                    </h3>
                                    <span className="text-xs font-bold text-slate-400 font-['DM_Sans',sans-serif]">Posiciones Inter-Casas 2026</span>
                                </div>

                                {/* Table Component */}
                                <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
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
                                                        className="hover:bg-slate-50 transition-colors duration-150"
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


                {/* ── 6. SPORTS ARTICLES ("Sports Article") ── */}
                <section className="py-20 md:py-28 bg-white border-b border-slate-200/70">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">

                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl sm:text-4xl font-black text-[#262626] tracking-tight uppercase font-sans">
                                Sports Article
                            </h2>
                            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-['DM_Sans',sans-serif]">
                                Consejos Deportivos COLSIH
                            </span>
                        </div>

                        {/* 3 Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {sportsArticles.map((art) => (
                                <motion.div 
                                    key={art.id}
                                    whileHover={{ y: -6 }}
                                    className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group text-left"
                                >
                                    <div className="space-y-4">
                                        <div className="relative h-52 overflow-hidden">
                                            <img 
                                                src={art.imagen} 
                                                alt={art.titulo} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                            />
                                            <span className="absolute top-4 left-4 px-3 py-1 bg-[#262626]/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider rounded-md font-['DM_Sans',sans-serif]">
                                                {art.tag}
                                            </span>
                                        </div>

                                        <div className="px-6 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <img 
                                                    src={art.autorFoto} 
                                                    alt={art.autor} 
                                                    className="w-8 h-8 rounded-full object-cover border border-slate-200" 
                                                />
                                                <div>
                                                    {/* Roboto Medium font for author names as specified in Figma json */}
                                                    <span className="text-xs font-medium text-slate-800 block font-['Roboto',sans-serif]">{art.autor}</span>
                                                    <span className="text-[10px] font-semibold text-slate-400 block font-['DM_Sans',sans-serif]">{art.fecha}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-black text-[#262626] group-hover:text-[#001659] transition-colors leading-snug font-sans">
                                                {art.titulo}
                                            </h3>

                                            <p className="text-xs font-medium text-slate-500 leading-relaxed font-['DM_Sans',sans-serif] pb-4">
                                                {art.resumen}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Arrow Controls */}
                        <div className="flex justify-start gap-3 pt-2">
                            <button className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-[#262626] hover:text-white transition-all flex items-center justify-center text-slate-700 shadow-xs cursor-pointer">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-[#262626] hover:text-white transition-all flex items-center justify-center text-slate-700 shadow-xs cursor-pointer">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                    </div>
                </section>


                {/* ── 7. NEWSLETTER SUBSCRIPTION BANNER ── */}
                <section className="py-20 md:py-28 bg-[#F5F7FA]">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">

                        <div className="relative rounded-3xl bg-[#EAEFF4] p-8 sm:p-14 overflow-hidden border border-slate-300/70 shadow-lg">

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

                                {/* Left Input & Heading (7 Cols) */}
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

                                {/* Right Athlete Cutout Image (5 Cols) */}
                                <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                                    <div className="relative w-64 sm:w-80 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform hover:rotate-1 transition-transform">
                                        <img 
                                            src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80" 
                                            alt="Boletín Deportivo COLSIH" 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Bottom Pagination & Social Bar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-200">
                            <div className="flex items-center gap-3">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#001659] hover:text-white transition-all flex items-center justify-center text-slate-700 font-black text-xs">
                                    f
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#001659] hover:text-white transition-all flex items-center justify-center text-slate-700 font-black text-xs">
                                    ig
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#001659] hover:text-white transition-all flex items-center justify-center text-slate-700 font-black text-xs">
                                    x
                                </a>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                {[1, 2, 3, 4].map((num) => (
                                    <button 
                                        key={num}
                                        onClick={() => setActivePage(num)}
                                        className={`w-9 h-9 rounded-lg font-black text-xs transition-all ${
                                            activePage === num 
                                                ? 'bg-[#262626] text-white shadow-xs' 
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                                <button className="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </AppLayout>
    );
}
