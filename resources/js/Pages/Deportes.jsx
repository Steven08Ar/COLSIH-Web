import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '@/Components/ScrollReveal';
import { 
    Trophy, 
    Medal, 
    Calendar, 
    ArrowRight, 
    ArrowLeft,
    Search,
    Send,
    CheckCircle2,
    Flame,
    Activity,
    Award,
    Sparkles,
    ChevronRight,
    ChevronLeft,
    Share2,
    Users,
    ChevronDown,
    Zap
} from 'lucide-react';

export default function Deportes() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [sliderIndex, setSliderIndex] = useState(0);
    const [articlePage, setArticlePage] = useState(1);

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

    // Category Mosaic Items matching Figma layout
    const categories = [
        { id: 'futbol', label: 'FÚTBOL', type: 'text', bg: 'bg-[#EBF0F5]' },
        { id: 'baloncesto-img', label: 'Baloncesto', type: 'image', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80' },
        { id: 'atletismo', label: 'ATLETISMO', type: 'text', bg: 'bg-[#EBF0F5]' },
        { id: 'pingpong-img', label: 'Tenis de Mesa', type: 'image', img: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=800&q=80' },
        { id: 'futbol-img', label: 'Fútbol', type: 'image', img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80' },
        { id: 'baloncesto', label: 'BALONCESTO', type: 'text', bg: 'bg-[#EBF0F5]' },
        { id: 'ciclismo-img', label: 'Ciclismo', type: 'image', img: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80' },
        { id: 'tenis', label: 'TENIS DE MESA', type: 'text', bg: 'bg-[#EBF0F5]' },
    ];

    // Trending News (Left list + Right featured hero)
    const trendingNews = [
        {
            id: 1,
            tag: 'Atletismo',
            fecha: '03 Junio 2026',
            titulo: 'Atleta de 16 años rompe marca en los 400m planos intercolegiados',
            resumen: 'Destacada participación del estudiante COLSIH en la jornada regional de atletismo, imponiendo un nuevo récord departamental.',
            imagen: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 2,
            tag: 'Ciclismo',
            fecha: '03 Junio 2026',
            titulo: 'Selección de ciclismo se prepara para la Copa Nacional Escolar',
            resumen: 'Los atletas iniciaron su fase de entrenamiento en ruta de alta montaña con miras a las eliminatorias del próximo mes.',
            imagen: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 3,
            tag: 'Artes Marciales',
            fecha: '03 Junio 2026',
            titulo: 'Victoria en el campeonato juvenil de Taekwondo y disciplina',
            resumen: 'Gran demostración de técnica, autocontrol y espíritu salesiano en el torneo intercolegiado metropolitano.',
            imagen: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
        }
    ];

    // Featured Full Width Event Slides
    const featuredBanners = [
        {
            tag: 'Fútbol Intercolegiado',
            subtitulo: 'Deportes COLSIH • 03 Junio 2026',
            titulo: 'LIONEL MESSI DEJA SU HUELLA: NUESTRO EQUIPO DE FÚTBOL SE PROCLAMA CAMPEÓN REGIONAL',
            descripcion: 'El equipo escolar de fútbol del Colegio Santa Isabel de Hungría conquistó el primer lugar tras una final emocionante donde prevaleció la unión, la disciplina y los valores salesianos.',
            imagen: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80'
        },
        {
            tag: 'Voleibol Femenino',
            subtitulo: 'Deportes COLSIH • 01 Junio 2026',
            titulo: 'SELECCIÓN FEMENINA DE VOLEIBOL CLASIFICA A LA FINAL DEPARTAMENTAL',
            descripcion: 'Con un desempeño impecable en saques y bloqueos, nuestras estudiantes aseguraron su cupo directo a la gran final intercolegiada.',
            imagen: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1600&q=80'
        },
        {
            tag: 'Baloncesto Masculino',
            subtitulo: 'Deportes COLSIH • 28 Mayo 2026',
            titulo: 'VICTORIA ÉPICA EN EL ÚLTIMO SEGUNDO DEL CAMPEONATO DE BALONCESTO',
            descripcion: 'Un triple memorable en los últimos 3 segundos selló la remontada histórica de nuestro equipo en el coliseo municipal.',
            imagen: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1600&q=80'
        }
    ];

    // Ranking Table Inter-Casas (Clubs Ranking)
    const rankingTabla = [
        { pos: 1, casa: 'Casa Don Bosco', pj: 10, pg: 8, pe: 1, pp: 1, gf: 24, gc: 8, pts: 25, color: 'text-amber-500', badge: '🥇' },
        { pos: 2, casa: 'Casa María Auxiliadora', pj: 10, pg: 7, pe: 2, pp: 1, gf: 21, gc: 9, pts: 23, color: 'text-slate-400', badge: '🥈' },
        { pos: 3, casa: 'Casa Domingo Savio', pj: 10, pg: 5, pe: 3, pp: 2, gf: 18, gc: 12, pts: 18, color: 'text-amber-700', badge: '🥉' },
        { pos: 4, casa: 'Casa Santa Isabel', pj: 10, pg: 4, pe: 2, pp: 4, gf: 15, gc: 15, pts: 14, color: 'text-slate-700', badge: '4°' },
        { pos: 5, casa: 'Casa Laura Vicuña', pj: 10, pg: 3, pe: 1, pp: 6, gf: 11, gc: 19, pts: 10, color: 'text-slate-700', badge: '5°' },
        { pos: 6, casa: 'Casa Ceferino Namuncurá', pj: 10, pg: 1, pe: 1, pp: 8, gf: 7, gc: 25, pts: 4, color: 'text-slate-700', badge: '6°' },
    ];

    // Sports Articles
    const sportsArticles = [
        {
            id: 1,
            tag: 'Acondicionamiento',
            imagen: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
            autor: 'Prof. Ana Ruiz',
            autorFoto: 'https://media.colsih.edu.co/nuestro_colegio/equipo/docentes/Daniela%20Villamizar%20Villamizar.JPG',
            fecha: '22 Junio 2026',
            titulo: '5 Ejercicios de Fuerza que Todo Baloncestista Debe Desarrollar',
            resumen: 'Guía práctica para mejorar el salto vertical, la estabilidad articular y la resistencia durante el partido.'
        },
        {
            id: 2,
            tag: 'Alto Rendimiento',
            imagen: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80',
            autor: 'Prof. Carlos Gómez',
            autorFoto: 'https://media.colsih.edu.co/nuestro_colegio/equipo/docentes/Jeyson%20Eduardo%20Su%C3%A1rez%20Ardila.JPG',
            fecha: '22 Junio 2026',
            titulo: 'Técnicas de Velocidad y Resistencia en la Pista Escolar',
            resumen: 'Estrategias de acondicionamiento físico de alta frecuencia recomendadas para torneos intercolegiados.'
        },
        {
            id: 3,
            tag: 'Coordinación Ocular',
            imagen: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=800&q=80',
            autor: 'Prof. David Suárez',
            autorFoto: 'https://media.colsih.edu.co/nuestro_colegio/equipo/docentes/Edgar%20Javier%20Garc%C3%ADa%20Estupi%C3%B1%C3%A1n.JPG',
            fecha: '22 Junio 2026',
            titulo: 'Beneficios de los Deportes de Raqueta en la Concentración',
            resumen: 'Cómo el tenis de mesa y el bádminton aceleran los reflejos neuromusculares y el enfoque académico.'
        }
    ];

    const currentBanner = featuredBanners[sliderIndex];

    return (
        <AppLayout>
            <Head title="Deportes y Talento Salesiano | COLSIH" />

            <div className="bg-[#FFFFFF] text-slate-900 overflow-x-hidden font-sans select-none">

                {/* ── 1. HERO SECTION (Top Scorer To The Final Match) ── */}
                <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#F8F9FB] border-b border-slate-200/70 overflow-hidden">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                            {/* Left & Center Main Athlete Display (7 Cols) */}
                            <div className="lg:col-span-7 relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">

                                {/* Watermark Background Circle */}
                                <div className="absolute top-1/2 left-1/2 lg:left-1/3 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] lg:w-[540px] h-[340px] sm:h-[460px] lg:h-[540px] rounded-full border border-slate-200/80 bg-gradient-to-br from-slate-100/60 to-slate-200/30 -z-10 pointer-events-none flex items-center justify-center">
                                    <div className="w-[85%] h-[85%] rounded-full border border-dashed border-slate-300/60" />
                                </div>

                                <motion.span 
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#001659]/10 text-[#001659] text-xs font-black tracking-[3px] uppercase font-sans"
                                >
                                    <Trophy className="w-3.5 h-3.5 text-[#800A15]" />
                                    TALENTO DEPORTIVO COLSIH
                                </motion.span>

                                <motion.h1 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="text-4xl sm:text-5xl lg:text-[68px] font-black text-[#08111F] leading-[0.95] tracking-tight uppercase font-sans"
                                >
                                    MÁXIMO GOLEADOR <br />
                                    <span className="text-[#001659]">DE LA GRAN FINAL</span>
                                </motion.h1>

                                {/* Action Cutout Athlete Image */}
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                    className="relative w-full max-w-[420px] aspect-[4/3] my-2 cursor-pointer group"
                                >
                                    <img 
                                        src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80" 
                                        alt="Atleta Destacado COLSIH" 
                                        className="w-full h-full object-cover rounded-3xl shadow-2xl group-hover:scale-[1.02] transition-transform duration-500 border-4 border-white"
                                    />
                                    <div className="absolute -bottom-4 right-4 bg-[#08111F] text-white px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20">
                                        <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                                        <span className="text-xs font-black uppercase tracking-wider font-sans">15 Puntos en el Partido</span>
                                    </div>
                                </motion.div>

                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="text-slate-600 text-sm sm:text-base font-medium max-w-lg leading-relaxed font-sans"
                                >
                                    Reconocimiento especial al estudiante del Colegio Santa Isabel de Hungría que obtuvo el mayor rendimiento, fair play y liderazgo en el torneo intercolegiado regional.
                                </motion.p>

                                <motion.div 
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="pt-2"
                                >
                                    <a 
                                        href="#noticias-tendencia" 
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#08111F] hover:bg-[#001659] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer font-sans"
                                    >
                                        <span>CONTINUAR LEYENDO</span>
                                        <ArrowRight className="w-4 h-4 text-amber-400" />
                                    </a>
                                </motion.div>

                            </div>

                            {/* Right Side Stacked Cards ("HOY" / "Destacados") (5 Cols) */}
                            <div className="lg:col-span-5 space-y-6">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                    <span className="px-3.5 py-1 rounded-md bg-slate-200 text-slate-800 text-xs font-extrabold tracking-wider uppercase font-sans">
                                        HOY
                                    </span>
                                    <span className="text-xs font-bold text-slate-400 font-sans">Destacados de la Jornada</span>
                                </div>

                                {/* Sidebar Card 1 */}
                                <motion.div 
                                    whileHover={{ y: -4 }}
                                    className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 cursor-pointer group"
                                >
                                    <img 
                                        src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80" 
                                        alt="Atletismo" 
                                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="space-y-1.5 text-left">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-[#800A15] block font-sans">
                                            Atletismo • 03 Junio 2026
                                        </span>
                                        <h4 className="text-sm font-black text-[#08111F] group-hover:text-[#001659] transition-colors leading-snug font-sans">
                                            Equipo femenino de velocidad logra el primer puesto en relevos 4x100m
                                        </h4>
                                        <p className="text-xs font-medium text-slate-500 line-clamp-2 font-sans">
                                            Demostración impecable de técnica y coordinación en la pista de atletismo.
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Sidebar Card 2 */}
                                <motion.div 
                                    whileHover={{ y: -4 }}
                                    className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 cursor-pointer group"
                                >
                                    <img 
                                        src="https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=400&q=80" 
                                        alt="Ciclismo" 
                                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="space-y-1.5 text-left">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-[#001659] block font-sans">
                                            Ciclismo • 01 Junio 2026
                                        </span>
                                        <h4 className="text-sm font-black text-[#08111F] group-hover:text-[#001659] transition-colors leading-snug font-sans">
                                            Gran participación de nuestros ciclistas en el circuito metropolitano
                                        </h4>
                                        <p className="text-xs font-medium text-slate-500 line-clamp-2 font-sans">
                                            Tres podios obtenidos en las categorías juvenil y prejuvenil.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                        </div>
                    </div>
                </section>


                {/* ── 2. CATEGORY MOSAIC GRID ("Category" / "Disciplinas Deportivas") ── */}
                <section className="py-20 md:py-24 bg-white border-b border-slate-200/60">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-10">

                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl sm:text-4xl font-black text-[#08111F] tracking-tight uppercase font-sans">
                                Categorías
                            </h2>
                            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-sans">
                                Disciplinas Deportivas COLSIH
                            </span>
                        </div>

                        {/* 4-Column x 2-Row Mosaic Grid matching Figma Layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {categories.map((cat, idx) => {
                                const isText = cat.type === 'text';

                                return (
                                    <motion.div
                                        key={cat.id}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => setSelectedCategory(cat.label)}
                                        className={`relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer min-h-[140px] sm:min-h-[170px] flex items-center justify-center p-6 ${
                                            isText ? `${cat.bg} border border-slate-200/80` : 'group'
                                        }`}
                                    >
                                        {isText ? (
                                            <div className="text-center space-y-1">
                                                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#08111F] via-[#001659] to-slate-700 uppercase font-sans">
                                                    {cat.label}
                                                </h3>
                                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#800A15] block font-sans">
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
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#08111F]/80 via-[#08111F]/30 to-transparent" />
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


                {/* ── 3. TRENDING NEWS ("Noticias Tendencia") ── */}
                <section id="noticias-tendencia" className="py-20 md:py-28 bg-[#F8F9FB] border-b border-slate-200/70">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-10">

                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl sm:text-4xl font-black text-[#08111F] tracking-tight uppercase font-sans">
                                Noticias Tendencia
                            </h2>
                            <span className="text-xs font-extrabold text-[#001659] uppercase tracking-wider font-sans">
                                Actualidad Deportiva
                            </span>
                        </div>

                        {/* Split 2-Column: Left 3 Horizontal Cards | Right 1 Giant Hero Card */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                            {/* Left 3 Stacked Cards (7 Cols) */}
                            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
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
                                            <span className="text-[11px] font-black uppercase tracking-wider text-[#800A15] block font-sans">
                                                {news.tag} • {news.fecha}
                                            </span>
                                            <h3 className="text-base sm:text-lg font-black text-[#08111F] group-hover:text-[#001659] transition-colors leading-snug font-sans">
                                                {news.titulo}
                                            </h3>
                                            <p className="text-xs font-medium text-slate-500 leading-relaxed font-sans line-clamp-2">
                                                {news.resumen}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Right 1 Large Full Overlay Card (6 Cols) */}
                            <div className="lg:col-span-6 relative min-h-[460px] rounded-3xl overflow-hidden shadow-xl group cursor-pointer border border-slate-800">
                                <img 
                                    src="https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=1200&q=80" 
                                    alt="Ciclismo Salesiano" 
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#08111F] via-[#08111F]/60 to-transparent" />
                                
                                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between text-left relative z-10">
                                    <div className="inline-flex">
                                        <span className="px-4 py-1.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest font-sans">
                                            Ciclismo & Ruta
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block font-sans">
                                            Noticias • 03 Junio 2026
                                        </span>
                                        <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight uppercase font-sans tracking-tight drop-shadow-md">
                                            ¡DESCUBRE LOS BENEFICIOS Y LOGROS DE NUESTROS DEPORTISTAS SALESIANOS!
                                        </h3>
                                        <p className="text-xs sm:text-sm font-medium text-slate-300 max-w-lg leading-relaxed font-sans">
                                            El deporte escolar fortalece la perseverancia, la salud integral y el espíritu de solidaridad en nuestros jóvenes.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>


                {/* ── 4. BIG FEATURED EVENT BANNER (Lionel Messi / Gran Evento) ── */}
                <section className="py-16 md:py-24 bg-white border-b border-slate-200/60">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-6">

                        {/* Large Wide Card */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[420px] sm:min-h-[500px] flex items-end p-8 sm:p-14 group cursor-pointer border border-slate-900">
                            <img 
                                src={currentBanner.imagen} 
                                alt={currentBanner.titulo} 
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#08111F] via-[#08111F]/70 to-transparent" />

                            <div className="relative z-10 max-w-3xl text-left space-y-4">
                                <div className="inline-flex items-center gap-3">
                                    <span className="px-3.5 py-1 rounded-md bg-[#800A15] text-white text-xs font-black uppercase tracking-widest font-sans">
                                        {currentBanner.tag}
                                    </span>
                                    <span className="text-xs font-bold text-slate-300 font-sans">
                                        {currentBanner.subtitulo}
                                    </span>
                                </div>

                                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tight font-sans drop-shadow-lg">
                                    {currentBanner.titulo}
                                </h2>

                                <p className="text-xs sm:text-sm font-semibold text-slate-300 max-w-2xl leading-relaxed font-sans">
                                    {currentBanner.descripcion}
                                </p>
                            </div>
                        </div>

                        {/* Banner Slider Controls Below */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                                {[0, 1, 2].map((idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSliderIndex(idx)}
                                        className={`w-9 h-9 rounded-full font-black text-xs transition-all ${
                                            sliderIndex === idx 
                                                ? 'bg-[#08111F] text-white scale-110 shadow-md' 
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


                {/* ── 5. RECENT NEWS & CLUB RANKING (Tabla de Posiciones Inter-Casas) ── */}
                <section className="py-20 md:py-28 bg-[#F8F9FB] border-b border-slate-200/70">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                            {/* Left Side: Recent News Cards (5 Cols) */}
                            <div className="lg:col-span-5 space-y-6 text-left">
                                <h3 className="text-2xl font-black text-[#08111F] tracking-tight uppercase font-sans">
                                    Noticias Recientes
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
                                    {/* Main Card */}
                                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer">
                                        <img 
                                            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80" 
                                            alt="Taekwondo" 
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        <div className="p-5 space-y-2">
                                            <span className="text-[10px] font-black uppercase tracking-wider text-[#800A15] block font-sans">
                                                Artes Marciales • 03 Junio 2026
                                            </span>
                                            <h4 className="text-base font-black text-[#08111F] group-hover:text-[#001659] transition-colors leading-snug font-sans">
                                                Torneo Intercolegiado de Taekwondo y Defensa Personal
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Small Card 1 */}
                                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-4 group cursor-pointer">
                                        <img 
                                            src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=300&q=80" 
                                            alt="Ajedrez" 
                                            className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform" 
                                        />
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-black uppercase text-[#001659] block font-sans">Ajedrez • 02 Junio</span>
                                            <h5 className="text-xs font-black text-[#08111F] group-hover:text-[#001659] transition-colors leading-snug font-sans">
                                                Gran Torneo Mente y Estrategia Escolar
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Clubs Ranking Table Inter-Casas (7 Cols) */}
                            <div className="lg:col-span-7 space-y-6 text-left">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                    <h3 className="text-2xl font-black text-[#08111F] tracking-tight uppercase font-sans">
                                        Clubs Ranking Inter-Casas
                                    </h3>
                                    <span className="text-xs font-bold text-slate-400 font-sans">Temporada 2026</span>
                                </div>

                                {/* Table Component */}
                                <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-100/80 text-[11px] font-black text-slate-600 uppercase tracking-wider border-b border-slate-200 font-sans">
                                                    <th className="py-3.5 px-4">Club / Casa</th>
                                                    <th className="py-3.5 px-3 text-center">PJ</th>
                                                    <th className="py-3.5 px-3 text-center">PG</th>
                                                    <th className="py-3.5 px-3 text-center">PE</th>
                                                    <th className="py-3.5 px-3 text-center">PP</th>
                                                    <th className="py-3.5 px-3 text-center">GF</th>
                                                    <th className="py-3.5 px-3 text-center">GC</th>
                                                    <th className="py-3.5 px-4 text-center text-[#001659]">PTS</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 text-xs font-semibold font-sans">
                                                {rankingTabla.map((row) => (
                                                    <tr 
                                                        key={row.pos} 
                                                        className="hover:bg-slate-50/80 transition-colors duration-150"
                                                    >
                                                        <td className="py-3.5 px-4 font-extrabold text-[#08111F] flex items-center gap-2.5">
                                                            <span className="text-base shrink-0">{row.badge}</span>
                                                            <span>{row.casa}</span>
                                                        </td>
                                                        <td className="py-3.5 px-3 text-center text-slate-600 font-bold">{row.pj}</td>
                                                        <td className="py-3.5 px-3 text-center text-emerald-600 font-bold">{row.pg}</td>
                                                        <td className="py-3.5 px-3 text-center text-slate-500">{row.pe}</td>
                                                        <td className="py-3.5 px-3 text-center text-rose-500">{row.pp}</td>
                                                        <td className="py-3.5 px-3 text-center text-slate-600">{row.gf}</td>
                                                        <td className="py-3.5 px-3 text-center text-slate-600">{row.gc}</td>
                                                        <td className="py-3.5 px-4 text-center font-black text-sm text-[#001659] bg-blue-50/50">
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


                {/* ── 6. SPORTS ARTICLES / CONSEJOS DEPORTIVOS ── */}
                <section className="py-20 md:py-28 bg-white border-b border-slate-200/60">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">

                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl sm:text-4xl font-black text-[#08111F] tracking-tight uppercase font-sans">
                                Artículos y Consejos
                            </h2>
                            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-sans">
                                Salud & Rendimiento
                            </span>
                        </div>

                        {/* 3 Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {sportsArticles.map((art) => (
                                <motion.div 
                                    key={art.id}
                                    whileHover={{ y: -6 }}
                                    className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group text-left"
                                >
                                    <div className="space-y-4">
                                        <div className="relative h-52 overflow-hidden">
                                            <img 
                                                src={art.imagen} 
                                                alt={art.titulo} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                            />
                                            <span className="absolute top-4 left-4 px-3 py-1 bg-[#08111F]/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider rounded-md font-sans">
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
                                                    <span className="text-xs font-bold text-slate-800 block font-sans">{art.autor}</span>
                                                    <span className="text-[10px] font-semibold text-slate-400 block font-sans">{art.fecha}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-black text-[#08111F] group-hover:text-[#001659] transition-colors leading-snug font-sans">
                                                {art.titulo}
                                            </h3>

                                            <p className="text-xs font-medium text-slate-500 leading-relaxed font-sans pb-4">
                                                {art.resumen}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Arrow Controls */}
                        <div className="flex justify-start gap-3 pt-2">
                            <button 
                                onClick={() => setArticlePage((prev) => (prev > 1 ? prev - 1 : 1))}
                                className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-[#08111F] hover:text-white transition-all flex items-center justify-center text-slate-700 shadow-xs cursor-pointer"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={() => setArticlePage((prev) => prev + 1)}
                                className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-[#08111F] hover:text-white transition-all flex items-center justify-center text-slate-700 shadow-xs cursor-pointer"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                    </div>
                </section>


                {/* ── 7. NEWSLETTER SUBSCRIPTION BANNER ("Boletín Deportivo") ── */}
                <section className="py-20 md:py-28 bg-[#F8F9FB]">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">

                        <div className="relative rounded-3xl bg-gradient-to-r from-[#E2E8F0] via-[#EBF0F5] to-slate-200 p-8 sm:p-14 overflow-hidden border border-slate-300/70 shadow-lg">

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

                                {/* Left Input & Heading (7 Cols) */}
                                <div className="lg:col-span-7 space-y-6 text-left">
                                    <div className="space-y-2">
                                        <span className="text-xs font-black uppercase tracking-[3px] text-[#800A15] block font-sans">
                                            Suscripción Oficial
                                        </span>
                                        <h2 className="text-3xl sm:text-5xl font-black text-[#08111F] uppercase tracking-tight font-sans leading-none">
                                            BOLETÍN DEPORTIVO <br />
                                            <span className="text-[#001659]">COLSIH</span>
                                        </h2>
                                    </div>

                                    <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-md font-sans">
                                        Recibe semanalmente los resultados de competencias, horarios de entrenamiento y destacados del talento salesiano.
                                    </p>

                                    {subscribed ? (
                                        <div className="p-4 rounded-2xl bg-emerald-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-3 shadow-md max-w-md font-sans">
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
                                                placeholder="Ingresa tu correo institucional..." 
                                                className="w-full px-5 py-4 rounded-xl bg-white border border-slate-300 text-sm font-semibold text-[#08111F] focus:outline-none focus:ring-2 focus:ring-[#001659] shadow-xs font-sans"
                                            />
                                            <button 
                                                type="submit" 
                                                className="w-full sm:w-auto px-6 py-4 bg-[#08111F] hover:bg-[#001659] text-white rounded-xl font-black transition-all flex items-center justify-center shrink-0 shadow-md cursor-pointer"
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
                                            src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80" 
                                            alt="Boletín Deportivo" 
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
                                                ? 'bg-[#08111F] text-white shadow-sm' 
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
