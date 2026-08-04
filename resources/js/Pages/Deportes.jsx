import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { 
    Trophy, Medal, Star, User, Calendar, Megaphone, ArrowRight, 
    Award, Activity, Sparkles, Users, Target, Flame, ChevronRight, 
    CheckCircle2, X, ShieldCheck
} from 'lucide-react';

const DESTACADOS = [
    {
        id: 1,
        nombre: 'María José Palacios',
        disciplina: 'Voleibol',
        grado: 'Grado 11°',
        resumen: 'Mejor jugadora del torneo intercolegiado 2024. Líder en puntos y en espíritu deportivo.',
        foto: '/docentes/Daniela Villamizar Villamizar.JPG',
        logros: ['MVP Torneo Regional 2024', 'Capitana Selección Femenina', '15 Puntos por Partido']
    },
    {
        id: 2,
        nombre: 'Mateo Rodríguez',
        disciplina: 'Fútbol',
        grado: 'Grado 10°',
        resumen: 'Goleador del torneo intercolegiado departamental con 14 tantos anotados.',
        foto: '/docentes/Jeyson Eduardo Suárez Ardila.JPG',
        logros: ['Botín de Oro Intercolegiados', 'Selección Santander Sub-17', 'Capitán Equipo']
    },
    {
        id: 3,
        nombre: 'Carlos Eduardo Silva',
        disciplina: 'Atletismo',
        grado: 'Grado 11°',
        resumen: 'Medalla de Oro en 400m planos y relevos 4x100m en los Juegos Supérate.',
        foto: '/docentes/Edgar Javier García Estupiñán.JPG',
        logros: ['Medalla de Oro 400m', 'Record Regional 52.3s', 'Atleta del Año COLSIH']
    }
];

const NOTICIAS_LOGROS = [
    {
        id: 1,
        dia: '20',
        mes: 'MAY',
        titulo: '¡Campeones Intercolegiados 2024!',
        descripcion: 'Nuestro equipo de fútbol masculino obtuvo el primer lugar en la categoría juvenil.',
        imagen: 'https://pub-c4ddb3fb75904158bbda5fbc35d6963e.r2.dev/nuestro_colegio/quienes_somos/colegio-afuera.JPG',
        destacado: true
    },
    {
        id: 2,
        dia: '12',
        mes: 'MAY',
        titulo: 'Segundo lugar en Voleibol Femenino',
        descripcion: 'Gran participación de nuestro equipo en el torneo intercolegiado regional.',
        imagen: '/galeria/bachillerato.JPG',
        destacado: false
    },
    {
        id: 3,
        dia: '05',
        mes: 'MAY',
        titulo: 'Atletas Santa Isabel en el Podio',
        descripcion: 'Destacada participación en atletismo: 3 oros, 2 platas y 1 bronce.',
        imagen: 'https://pub-c4ddb3fb75904158bbda5fbc35d6963e.r2.dev/nuestro_colegio/quienes_somos/estudiantes-espaldas.png',
        destacado: false
    }
];

const PROXIMOS_TORNEOS = [
    {
        id: 1,
        titulo: 'Torneo Intercolegiado de Fútbol',
        fecha: 'Del 10 al 20 de junio',
        lugar: 'Coliseo Municipal',
        iconType: Activity
    },
    {
        id: 2,
        titulo: 'Copa Regional de Voleibol',
        fecha: 'Del 25 al 28 de junio',
        lugar: 'Polideportivo UIS',
        iconType: Flame
    },
    {
        id: 3,
        titulo: 'Festival de Baloncesto',
        fecha: 'Del 5 al 12 de julio',
        lugar: 'Gimnasio La Juventud',
        iconType: Target
    }
];

const DISCIPLINAS = [
    { nombre: 'Fútbol', icon: Activity },
    { nombre: 'Voleibol', icon: Flame },
    { nombre: 'Baloncesto', icon: Target },
    { nombre: 'Atletismo', icon: Award },
    { nombre: 'Tenis de Mesa', icon: Trophy },
    { nombre: 'Ajedrez', icon: Sparkles }
];

export default function Deportes() {
    const [indexDestacado, setIndexDestacado] = useState(0);
    const [modalPerfil, setModalPerfil] = useState(null);

    const atletaActual = DESTACADOS[indexDestacado];

    return (
        <AppLayout>
            <Head title="Zona Deportiva | COLSIH" />

            <div className="min-h-screen bg-[#F4F7FA] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-[#800A15] selection:text-white pb-20">
                
                {/* ── 1. HERO BANNER ZONA DEPORTIVA ── */}
                <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-[#800A15] via-[#600710] to-[#003C8F] text-white overflow-hidden shadow-2xl">
                    
                    {/* Formas curvadas orgánicas de fondo */}
                    <div className="absolute top-0 right-0 w-[650px] h-[650px] rounded-full bg-white/10 blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[550px] h-[550px] rounded-full bg-black/25 blur-2xl pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            
                            {/* Columna Izquierda: Título y Textos */}
                            <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-amber-300 shadow-sm">
                                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                                    <span>Excelencia e Identidad COLSIH</span>
                                </div>

                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                    <span>Zona Deportiva</span>
                                    <Medal className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 shrink-0 inline-block drop-shadow-md" />
                                </h1>

                                <p className="text-amber-300 text-lg font-bold italic tracking-wide">
                                    "Pasión que nos impulsa, logros que nos unen."
                                </p>

                                <p className="text-slate-100 text-sm sm:text-base leading-relaxed max-w-lg font-medium">
                                    Reconocemos el esfuerzo, la disciplina y el talento de nuestros estudiantes que nos representan dentro y fuera del colegio.
                                </p>

                                <div className="pt-2">
                                    <a 
                                        href="#grid-deportes" 
                                        className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#800A15] hover:bg-[#600710] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-black/25 border border-white/20 group cursor-pointer"
                                    >
                                        <span>CONOCE MÁS</span>
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>

                            {/* Columna Central: Imagen de Atletas */}
                            <div className="lg:col-span-4 flex justify-center">
                                <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 group">
                                    <img 
                                        src="https://pub-c4ddb3fb75904158bbda5fbc35d6963e.r2.dev/home/estudiantes-colsih.png" 
                                        alt="Deportistas COLSIH" 
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                </div>
                            </div>

                            {/* Columna Derecha: Tarjeta Don Bosco */}
                            <div className="lg:col-span-3 flex justify-center lg:justify-end">
                                <div className="bg-black/40 backdrop-blur-md border border-amber-400/40 p-6 rounded-3xl text-slate-100 space-y-3 max-w-xs shadow-xl relative">
                                    <span className="text-4xl text-amber-400 font-serif leading-none block">“</span>
                                    <p className="text-xs sm:text-sm italic font-semibold leading-relaxed">
                                        No se trata de ser el mejor, se trata de dar siempre lo mejor de uno mismo.
                                    </p>
                                    <span className="block text-right text-xs font-black uppercase text-amber-300 tracking-wider">
                                        — DON BOSCO
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* ── 2. GRID PRINCIPAL (AJUSTADO PARA AJUSTE PERFECTO DE ANCHO) ── */}
                <section id="grid-deportes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                        
                        {/* ── COLUMNA 1: Destacados del Mes (3 cols en LG) ── */}
                        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col justify-between space-y-4">
                            <div>
                                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                                    <Star className="w-5 h-5 text-amber-500 shrink-0" />
                                    <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                                        Destacados del Mes
                                    </h2>
                                </div>

                                {/* Tarjeta Atleta Actual */}
                                <div className="space-y-3">
                                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-md">
                                        <img 
                                            src={atletaActual.foto} 
                                            alt={atletaActual.nombre} 
                                            className="w-full h-full object-cover object-top"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://pub-c4ddb3fb75904158bbda5fbc35d6963e.r2.dev/home/estudiantes-colsih.png';
                                            }}
                                        />
                                        <div className="absolute top-3 right-3 bg-[#800A15] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                                            {atletaActual.disciplina}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                                            {atletaActual.nombre}
                                        </h3>
                                        <span className="text-xs font-extrabold text-[#003C8F] dark:text-blue-400 block mt-0.5">
                                            {atletaActual.grado}
                                        </span>
                                        <p className="text-slate-600 dark:text-slate-400 text-xs mt-1.5 font-medium leading-relaxed">
                                            {atletaActual.resumen}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Botón Ver Perfil & Puntos Paginación */}
                            <div className="space-y-3 pt-1">
                                <button
                                    onClick={() => setModalPerfil(atletaActual)}
                                    className="w-full py-2.5 px-3 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 transition flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <span>VER PERFIL</span>
                                    <User className="w-4 h-4" />
                                </button>

                                {/* Dots */}
                                <div className="flex justify-center gap-2">
                                    {DESTACADOS.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setIndexDestacado(idx)}
                                            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                                                indexDestacado === idx 
                                                    ? 'bg-[#800A15] w-6' 
                                                    : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                                            }`}
                                            title={`Ver atleta ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── COLUMNA 2: Noticias y Logros (4 cols en LG) ── */}
                        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col justify-between space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <Megaphone className="w-5 h-5 text-[#800A15] shrink-0" />
                                        <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                                            Noticias y Logros
                                        </h2>
                                    </div>
                                    <Link href="/noticias" className="text-[11px] font-black uppercase text-[#800A15] hover:underline flex items-center gap-1">
                                        <span>VER TODAS</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>

                                {/* Noticia Destacada Principal */}
                                {NOTICIAS_LOGROS.filter(n => n.destacado).map((noticia) => (
                                    <div key={noticia.id} className="relative rounded-2xl overflow-hidden bg-slate-900 text-white group mb-3 shadow-md">
                                        <div className="aspect-[16/9] overflow-hidden">
                                            <img 
                                                src={noticia.imagen} 
                                                alt={noticia.titulo}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80" 
                                            />
                                        </div>
                                        <div className="absolute top-2.5 left-2.5 bg-white text-slate-900 px-2.5 py-1 rounded-xl text-center shadow-md">
                                            <span className="block text-xs font-black leading-none">{noticia.dia}</span>
                                            <span className="block text-[8px] font-black uppercase text-slate-500">{noticia.mes}</span>
                                        </div>
                                        <div className="p-3.5 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
                                            <h3 className="text-xs sm:text-sm font-black leading-snug text-white">
                                                {noticia.titulo}
                                            </h3>
                                            <p className="text-slate-300 text-[11px] font-medium mt-1 line-clamp-2">
                                                {noticia.descripcion}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {/* Lista de Otras Noticias */}
                                <div className="space-y-2.5">
                                    {NOTICIAS_LOGROS.filter(n => !n.destacado).map((noticia) => (
                                        <div key={noticia.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                                            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                                                <span className="text-xs font-black leading-none text-slate-900 dark:text-white">{noticia.dia}</span>
                                                <span className="text-[8px] font-black uppercase text-slate-400">{noticia.mes}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                                                    {noticia.titulo}
                                                </h4>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                                    {noticia.descripcion}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── COLUMNA 3: Próximos Torneos (3 cols en LG) ── */}
                        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col justify-between space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-[#800A15] shrink-0" />
                                        <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                                            Próximos Torneos
                                        </h2>
                                    </div>
                                </div>

                                {/* Lista de Eventos */}
                                <div className="space-y-2.5">
                                    {PROXIMOS_TORNEOS.map((torneo) => {
                                        const IconComponent = torneo.iconType;
                                        return (
                                            <div key={torneo.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                                                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center shrink-0 text-[#003C8F] dark:text-blue-400">
                                                    <IconComponent className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight">
                                                        {torneo.titulo}
                                                    </h4>
                                                    <span className="text-[11px] font-bold text-[#800A15] dark:text-rose-400 block mt-0.5">
                                                        {torneo.fecha}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400 font-medium block">
                                                        {torneo.lugar}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Tarjeta Banner al pie */}
                            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 p-3.5 rounded-2xl flex items-center gap-2.5">
                                <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
                                <p className="text-[10px] font-bold text-amber-900 dark:text-amber-200 leading-tight">
                                    Representamos más que un colegio, representamos valores. ¡Vamos Santa Isabel!
                                </p>
                            </div>
                        </div>

                        {/* ── COLUMNA 4: Sidebar Deportes (2 cols en LG - ANCHO Y TIPOGRAFÍA 100% AJUSTADOS SIN DEFORMACIÓN) ── */}
                        <div className="lg:col-span-2 bg-[#800A15] text-white rounded-3xl p-4 xl:p-5 shadow-xl flex flex-col justify-between space-y-4 overflow-hidden">
                            <div>
                                <h2 className="text-sm xl:text-base font-black text-white uppercase tracking-wider pb-2.5 border-b border-white/20 mb-3">
                                    Deportes
                                </h2>

                                <ul className="space-y-1.5">
                                    {DISCIPLINAS.map((item, idx) => {
                                        const DiscipIcon = item.icon;
                                        return (
                                            <li 
                                                key={idx} 
                                                className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/15 transition-all cursor-pointer font-bold text-xs text-white group"
                                            >
                                                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                                                    <DiscipIcon className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                                                </div>
                                                <span className="text-white text-xs font-bold leading-tight whitespace-nowrap truncate">{item.nombre}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ── 3. BARRA INFERIOR DE VALORES Y FE SANTA ISABEL ── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        
                        {/* 4 Valores Institucionales */}
                        <div className="md:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 shadow-sm">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-[#800A15] dark:text-rose-400">
                                    <Award className="w-5 h-5 shrink-0" />
                                    <span className="text-xs font-black uppercase tracking-wider">DISCIPLINA</span>
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
                                    Entrenamos nuestra mente y nuestro cuerpo.
                                </p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-[#800A15] dark:text-rose-400">
                                    <Activity className="w-5 h-5 shrink-0" />
                                    <span className="text-xs font-black uppercase tracking-wider">ESFUERZO</span>
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
                                    Cada gota de sudor tiene su recompensa.
                                </p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-[#800A15] dark:text-rose-400">
                                    <Users className="w-5 h-5 shrink-0" />
                                    <span className="text-xs font-black uppercase tracking-wider">EQUIPO</span>
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
                                    Juntos somos más fuertes, juntos llegamos más lejos.
                                </p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-[#800A15] dark:text-rose-400">
                                    <Sparkles className="w-5 h-5 shrink-0" />
                                    <span className="text-xs font-black uppercase tracking-wider">SUPERACIÓN</span>
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
                                    Hoy es el resultado de tus decisiones de ayer.
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta Escudo e Identidad Final */}
                        <div className="md:col-span-4 bg-[#08111F] text-white border border-white/10 rounded-3xl p-5 flex items-center gap-4 shadow-xl">
                            <img 
                                src="/marca/logo-colsih.svg" 
                                alt="Logo COLSIH" 
                                className="h-12 w-auto shrink-0 filter drop-shadow-md"
                            />
                            <div>
                                <span className="block text-[11px] font-black uppercase tracking-wider text-amber-300">
                                    Fe, Ciencia, Justicia y Hungría
                                </span>
                                <p className="text-xs font-medium text-slate-300 mt-0.5 leading-snug">
                                    Formamos buenos cristianos y honrados ciudadanos.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ── MODAL DETALLE DE PERFIL DE ATLETA ── */}
                {modalPerfil && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 relative shadow-2xl">
                            
                            <button
                                onClick={() => setModalPerfil(null)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-full transition cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200 shrink-0">
                                    <img src={modalPerfil.foto} alt={modalPerfil.nombre} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <span className="bg-[#800A15] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-block">
                                        {modalPerfil.disciplina}
                                    </span>
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                                        {modalPerfil.nombre}
                                    </h3>
                                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                                        {modalPerfil.grado}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                                <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                                    Palmarés y Reconocimientos:
                                </span>
                                <ul className="space-y-2">
                                    {modalPerfil.logros.map((logro, i) => (
                                        <li key={i} className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                            <span>{logro}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    onClick={() => setModalPerfil(null)}
                                    className="px-6 py-2.5 rounded-full bg-[#800A15] hover:bg-[#600710] text-white font-black text-xs uppercase tracking-wider transition cursor-pointer"
                                >
                                    Cerrar Perfil
                                </button>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}
