import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { 
    Trophy, Award, Medal, Flame, Calendar, Star, Users, ArrowRight, 
    Activity, Target, ShieldCheck, Heart, Sparkles, Filter, ChevronRight, 
    CheckCircle2, X
} from 'lucide-react';

const DEPORTISTAS = [
    {
        id: 1,
        nombre: 'Mateo Rodríguez Flórez',
        grado: 'Grado 11°B',
        disciplina: 'Fútbol',
        disciplinaKey: 'futbol',
        categoria: 'Selección Santander Sub-17',
        logros: [
            'Máximo Goleador Intercolegiados Supérate 2025 (14 Goles)',
            'Capitán Selección Santander Sub-17',
            'Medalla de Oro Torneo Departamental'
        ],
        cita: '"El deporte en el COLSIH me ha enseñado disciplina, trabajo en equipo y a nunca rendirme dentro ni fuera de la cancha."',
        foto: '/docentes/equipo-01.jpg',
        insignia: '🥇 Deporte de Alto Rendimiento',
        medallas: { oro: 3, plata: 1, bronce: 0 }
    },
    {
        id: 2,
        nombre: 'Valentina Mendoza Gómez',
        grado: 'Grado 9°A',
        disciplina: 'Natación',
        disciplinaKey: 'natacion',
        categoria: 'Categoría Juvenil A',
        logros: [
            '3 Medallas de Oro en 100m y 200m Libres',
            'RRecord Departamental Escolar 2025',
            'Clasificada a los Juegos Nacionales Intercolegiados'
        ],
        cita: '"Representar al colegio en cada brazada es un orgullo inmenso. El apoyo de mis profesores ha sido fundamental."',
        foto: '/docentes/equipo-02.jpg',
        insignia: '🏊 Record Departamental Escolar',
        medallas: { oro: 4, plata: 2, bronce: 1 }
    },
    {
        id: 3,
        nombre: 'Juan Diego Hernández',
        grado: 'Grado 10°A',
        disciplina: 'Taekwondo',
        disciplinaKey: 'taekwondo',
        categoria: 'Cinturón Negro - Poomsae y Combate',
        logros: [
            'Campeón Departamental de Taekwondo Escolar',
            'Medalla de Oro en Combate División -59kg',
            'Reconocimiento a la Excelencia Marcial COLSIH'
        ],
        cita: '"El Taekwondo promueve el respeto y el autocontrol, valores que vivimos a diario en el Colegio Santa Isabel de Hungría."',
        foto: '/docentes/equipo-03.jpg',
        insignia: '🥋 Cinturón Negro Institucional',
        medallas: { oro: 2, plata: 1, bronce: 0 }
    },
    {
        id: 4,
        nombre: 'Isabella Villamizar',
        grado: 'Grado 8°C',
        disciplina: 'Voleibol',
        disciplinaKey: 'voleibol',
        categoria: 'Selección Voleibol Femenino COLSIH',
        logros: [
            'Mejor Armadora del Torneo Regional Intercolegiado',
            'Subcampeona Departamental Supérate 2025',
            'Capitana Categoría Infantil'
        ],
        cita: '"Cada punto lo jugamos con el corazón por el colegio. La pasión del equipo es nuestra mayor fuerza."',
        foto: '/docentes/equipo-04.jpg',
        insignia: '🏐 Mejor Armadora Regional',
        medallas: { oro: 1, plata: 3, bronce: 0 }
    },
    {
        id: 5,
        nombre: 'Carlos Eduardo Silva',
        grado: 'Grado 11°A',
        disciplina: 'Atletismo',
        disciplinaKey: 'atletismo',
        categoria: 'Pista y Campo (400m y Relevos)',
        logros: [
            'Medalla de Oro en 400m Planos Juegos Intercolegiados',
            'Medalla de Oro Relevo 4x100m Masculino',
            'Atleta del Año COLSIH 2024'
        ],
        cita: '"Correr por mi colegio me motiva a dar cada día un paso más hacia mis sueños académicos y deportivos."',
        foto: '/docentes/equipo-05.jpg',
        insignia: '🏃 Atleta de Alto Rendimiento',
        medallas: { oro: 5, plata: 0, bronce: 1 }
    },
    {
        id: 6,
        nombre: 'Mariana Suárez Rueda',
        grado: 'Grado 7°B',
        disciplina: 'Baloncesto',
        disciplinaKey: 'baloncesto',
        categoria: 'Selección Infantil Femenina',
        logros: [
            'Campeona Torneo Escolar Metropolitana 2025',
            'Líder en Triples y Asistencias',
            'Premio Espíritu Deportivo'
        ],
        cita: '"En la cancha somos una familia. Entrenar en COLSIH nos enseña a superar cualquier desafío juntos."',
        foto: '/docentes/equipo-06.jpg',
        insignia: '🏀 Revelación Deportiva 2025',
        medallas: { oro: 2, plata: 1, bronce: 1 }
    }
];

const PUBLICACIONES_TORNEOS = [
    {
        id: 1,
        titulo: '¡COLSIH Campeón del Torneo Intercolegiado de Baloncesto 2025!',
        categoria: 'Baloncesto Masculino',
        fecha: '18 de Julio, 2025',
        lugar: 'Coliseo Municipal de Floridablanca',
        resumen: 'Con una demostración impecable de estrategia y garra deportiva, la selección masculina de baloncesto del Colegio Santa Isabel de Hungría se coronó campeona invicta del Torneo Intercolegiado 2025.',
        detalle: 'En una electrizante final contra el Colegio San José, nuestros deportistas lograron imponerse con un marcador final de 78-65. Destacamos la brillante actuación de todo el plantel dirigido por el profesor Fernando Castro. Este título nos clasifica directamente a la Fase Departamental de los Juegos Supérate.',
        trofeo: '🏆 Gran Trofeo de Oro Intercolegiado',
        imagen: '/nosotros_assets/sede-principal.jpg',
        marcador: 'COLSIH 78 - 65 San José',
        destacados: ['Mateo Rodríguez', 'Carlos Silva', 'Andrés Morales']
    },
    {
        id: 2,
        titulo: 'Cosecha de Medallas en el Campeonato Departamental de Natación',
        categoria: 'Natación Escolar',
        fecha: '5 de Junio, 2025',
        lugar: 'Piscina Olímpica de Bucaramanga',
        resumen: 'El equipo de natación del colegio obtuvo 12 medallas de oro, 6 de plata y 3 de bronce en la competencia departamental escolar.',
        detalle: 'Nuestros nadadores demostraron un nivel excepcional en las pruebas de 50m, 100m y 200m estilo libre y mariposa. Valentina Mendoza impuso además un nuevo récord departamental en los 100m libres con un tiempo de 58.4 segundos.',
        trofeo: '🥇 12 Medallas de Oro Departamentales',
        imagen: '/nosotros_assets/planta-fisica.jpg',
        marcador: '1er Lugar General por Equipos',
        destacados: ['Valentina Mendoza', 'Gabriel Ortiz', 'Sofía Ramírez']
    },
    {
        id: 3,
        titulo: 'Subcampeonato Nacional y Medallas en Taekwondo Escolar',
        categoria: 'Artes Marciales / Taekwondo',
        fecha: '22 de Mayo, 2025',
        lugar: 'Palacio de Deportes - Santander',
        resumen: 'Cinco deportistas COLSIH representaron con honor al municipio logrando la clasificación a la final nacional de Taekwondo.',
        detalle: 'Juan Diego Hernández logró medalla de oro en la modalidad de combate -59kg, mientras que sus compañeros conquistaron 2 platas y 2 bronces. La delegación escolar recibió felicitación especial por parte de la Liga Santandereana de Taekwondo.',
        trofeo: '🥋 5 Medallas de Honor Marcial',
        imagen: '/nosotros_assets/fundacion-colsih.jpg',
        marcador: '5 Atletas Clasificados a Nacionales',
        destacados: ['Juan Diego Hernández', 'Lucas Gómez', 'Camila Vargas']
    },
    {
        id: 4,
        titulo: 'Subcampeonas de Voleibol Femenino en los Juegos Supérate',
        categoria: 'Voleibol Femenino',
        fecha: '14 de Abril, 2025',
        lugar: 'Polideportivo Villabel',
        resumen: 'El equipo femenino luchó en una reñida final de 5 sets, logrando el subcampeonato metropolitano y un cupo al zonal.',
        detalle: 'Con una defensa sólida y gran espíritu deportivo, las atletas del COLSIH dejaron en alto el nombre de la institución. Felicitaciones a todo el equipo y al cuerpo técnico por su esfuerzo y constancia.',
        trofeo: '🥈 Medalla de Plata Metropolitana',
        imagen: '/nosotros_assets/escudo-colsih-antiguo.jpg',
        marcador: 'COLSIH 2 - 3 Colegio Caldas',
        destacados: ['Isabella Villamizar', 'Mariana Suárez', 'Lucía Torres']
    }
];

const ESCUELAS_DEPORTIVAS = [
    {
        nombre: 'Escuela de Fútbol COLSIH',
        horario: 'Lunes a Jueves • 3:30 PM - 5:30 PM',
        entrenador: 'Prof. Fernando Castro',
        lugar: 'Cancha Polideportiva Villabel',
        icono: '⚽'
    },
    {
        nombre: 'Club de Baloncesto',
        horario: 'Martes y Jueves • 3:30 PM - 5:30 PM',
        entrenador: 'Prof. Jorge Eliécer Martínez',
        lugar: 'Coliseo Abierto COLSIH',
        icono: '🏀'
    },
    {
        nombre: 'Academia de Natación',
        horario: 'Miércoles y Viernes • 3:00 PM - 5:00 PM',
        entrenador: 'Dra. María Elena Gutiérrez',
        lugar: 'Complejo Acuático Institucional',
        icono: '🏊'
    },
    {
        nombre: 'Formativa de Taekwondo & Artes Marciales',
        horario: 'Lunes y Miércoles • 4:00 PM - 6:00 PM',
        entrenador: 'Master Carlos Alberto Niño',
        lugar: 'Salón de Artes Marciales',
        icono: '🥋'
    },
    {
        nombre: 'Semillero de Voleibol',
        horario: 'Martes y Viernes • 3:30 PM - 5:30 PM',
        entrenador: 'Prof. Diana Marcela Pérez',
        lugar: 'Cancha Abierta 2',
        icono: '🏐'
    },
    {
        nombre: 'Liga de Atletismo & Fondo',
        horario: 'Sábados • 7:00 AM - 10:00 AM',
        entrenador: 'Prof. Ricardo Fonseca',
        lugar: 'Pista de Atletismo & Parque La Florida',
        icono: '🏃'
    }
];

export default function Deportes() {
    const [filtroCategoria, setFiltroCategoria] = useState('todos');
    const [logroSeleccionado, setLogroSeleccionado] = useState(null);

    const deportistasFiltrados = filtroCategoria === 'todos'
        ? DEPORTISTAS
        : DEPORTISTAS.filter(d => d.disciplinaKey === filtroCategoria);

    return (
        <AppLayout>
            <Head title="Zona Deportiva & Excelencia Escolar | COLSIH" />

            <div className="min-h-screen bg-[#08111F] text-slate-100 font-sans selection:bg-[#800A15] selection:text-white pb-24">
                
                {/* ── HERO SECTION ZONA DEPORTIVA ── */}
                <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
                    {/* Fondo decorativo con luces y formas deportivas */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none z-0 opacity-40">
                        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#800A15]/40 blur-[130px]"></div>
                        <div className="absolute top-40 right-10 w-96 h-96 rounded-full bg-[#003C8F]/40 blur-[140px]"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-3xl mx-auto space-y-6">
                            
                            {/* Badges superiores */}
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#800A15]/30 via-white/10 to-[#003C8F]/30 border border-white/15 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-amber-300 backdrop-blur-md shadow-lg">
                                <Trophy className="w-4 h-4 text-amber-400 animate-bounce" />
                                <span>Orgullo Deportivo COLSIH</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
                                Zona Deportiva & <br className="hidden sm:inline" />
                                <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-blue-400 bg-clip-text text-transparent">
                                    Deportistas de Excelencia
                                </span>
                            </h1>

                            <p className="text-slate-300 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                                En el Colegio Santa Isabel de Hungría formamos campeones de la vida. Celebramos la dedicación, la disciplina y los triunfos de nuestros estudiantes atletas en torneos locales, regionales y nacionales.
                            </p>

                            {/* Botones de Acción */}
                            <div className="pt-4 flex flex-wrap justify-center gap-4">
                                <a 
                                    href="#deportistas" 
                                    className="px-6 py-3.5 rounded-full bg-[#800A15] hover:bg-[#a00d1b] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#800A15]/40 flex items-center gap-2 group"
                                >
                                    <Star className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                                    <span>Deportistas Destacados</span>
                                </a>

                                <a 
                                    href="#torneos" 
                                    className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-extrabold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md transition-all duration-300 flex items-center gap-2"
                                >
                                    <Trophy className="w-4 h-4 text-amber-400" />
                                    <span>Torneos & Campeonatos</span>
                                </a>
                            </div>
                        </div>

                        {/* ── METRICAS / ESTADISTICAS DEPORTIVAS ── */}
                        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl text-center space-y-1 hover:border-amber-400/40 transition-colors">
                                <span className="block text-3xl sm:text-4xl font-black text-amber-400">45+</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Títulos Ganados</span>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl text-center space-y-1 hover:border-rose-400/40 transition-colors">
                                <span className="block text-3xl sm:text-4xl font-black text-rose-400">120+</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Atletas en Selección</span>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl text-center space-y-1 hover:border-blue-400/40 transition-colors">
                                <span className="block text-3xl sm:text-4xl font-black text-blue-400">6</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Disciplinas Formativas</span>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl text-center space-y-1 hover:border-emerald-400/40 transition-colors">
                                <span className="block text-3xl sm:text-4xl font-black text-emerald-400">100%</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Apoyo Académico</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── SECCION 1: DEPORTISTAS DESTACADOS COLSIH ── */}
                <section id="deportistas" className="py-16 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                            <div>
                                <span className="text-xs font-black uppercase tracking-[3px] text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-amber-400/20">
                                    Excelencia Individual & Colectiva
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                                    Nuestros Deportistas Destacados
                                </h2>
                                <p className="text-slate-400 text-sm mt-1 max-w-xl font-medium">
                                    Estudiantes que combinan el rendimiento académico de alto nivel con triunfos en el deporte representativo.
                                </p>
                            </div>

                            {/* Filtro de Disciplinas */}
                            <div className="flex flex-wrap gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
                                {[
                                    { key: 'todos', label: 'Todos' },
                                    { key: 'futbol', label: 'Fútbol ⚽' },
                                    { key: 'natacion', label: 'Natación 🏊' },
                                    { key: 'taekwondo', label: 'Taekwondo 🥋' },
                                    { key: 'voleibol', label: 'Voleibol 🏐' },
                                    { key: 'atletismo', label: 'Atletismo 🏃' },
                                    { key: 'baloncesto', label: 'Baloncesto 🏀' },
                                ].map((cat) => (
                                    <button
                                        key={cat.key}
                                        onClick={() => setFiltroCategoria(cat.key)}
                                        className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                                            filtroCategoria === cat.key
                                                ? 'bg-[#800A15] text-white shadow-lg shadow-[#800A15]/40'
                                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* GRID DE DEPORTISTAS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {deportistasFiltrados.map((atleta) => (
                                <div 
                                    key={atleta.id}
                                    className="bg-gradient-to-b from-slate-900/90 to-slate-900/60 border border-white/10 rounded-3xl overflow-hidden hover:border-amber-400/40 transition-all duration-300 group flex flex-col justify-between shadow-xl"
                                >
                                    <div>
                                        {/* Foto de Portada con Aspect 4/5 */}
                                        <div className="relative aspect-[4/5] overflow-hidden bg-slate-800">
                                            <img 
                                                src={atleta.foto} 
                                                alt={atleta.nombre}
                                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/nosotros_assets/sede-principal.jpg';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                                            {/* Insignia Flotante */}
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md">
                                                    {atleta.insignia}
                                                </span>
                                            </div>

                                            {/* Conteo de Medallas */}
                                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-bold text-white z-10">
                                                <span className="bg-[#003C8F]/80 backdrop-blur-md px-3 py-1 rounded-full border border-blue-400/30">
                                                    {atleta.grado}
                                                </span>
                                                <div className="flex gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                                                    <span title="Medallas de Oro">🥇 {atleta.medallas.oro}</span>
                                                    <span title="Medallas de Plata">🥈 {atleta.medallas.plata}</span>
                                                    <span title="Medallas de Bronce">🥉 {atleta.medallas.bronce}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Información del Atleta */}
                                        <div className="p-6 space-y-4">
                                            <div>
                                                <span className="text-xs font-extrabold text-blue-400 uppercase tracking-wider block">
                                                    {atleta.disciplina} • {atleta.categoria}
                                                </span>
                                                <h3 className="text-xl font-black text-white mt-1 group-hover:text-amber-300 transition-colors">
                                                    {atleta.nombre}
                                                </h3>
                                            </div>

                                            {/* Lista de Logros Destacados */}
                                            <div className="space-y-2">
                                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">
                                                    Logros Principales:
                                                </span>
                                                <ul className="space-y-1.5">
                                                    {atleta.logros.map((logro, idx) => (
                                                        <li key={idx} className="text-xs text-slate-300 font-medium flex items-start gap-2">
                                                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                                            <span>{logro}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Cita o Mensaje */}
                                            <div className="bg-white/5 border border-white/5 p-3.5 rounded-2xl">
                                                <p className="text-xs text-slate-300 italic leading-relaxed">
                                                    {atleta.cita}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* ── SECCION 2: PUBLICACIONES DE TORNEOS GANADOS & CAMPEONATOS ── */}
                <section id="torneos" className="py-16 relative bg-slate-950/60 border-y border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        
                        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                            <span className="text-xs font-black uppercase tracking-[3px] text-rose-400 bg-rose-400/10 px-4 py-1.5 rounded-full inline-block border border-rose-400/20">
                                Galería de Victorias Institucionales
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                                Publicaciones de Torneos & Campeonatos
                            </h2>
                            <p className="text-slate-400 text-sm font-medium">
                                Revive las crónicas y triunfos más destacados de nuestras selecciones deportivas en competencias oficiales.
                            </p>
                        </div>

                        {/* GRID DE PUBLICACIONES DE TORNEOS */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {PUBLICACIONES_TORNEOS.map((post) => (
                                <div 
                                    key={post.id}
                                    className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-blue-400/40 transition-all duration-300 group shadow-xl"
                                >
                                    <div className="space-y-5">
                                        {/* Header de la Publicación */}
                                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                                            <span className="bg-[#003C8F] text-white px-3.5 py-1 rounded-full font-black uppercase tracking-wider shadow-sm">
                                                {post.categoria}
                                            </span>
                                            <div className="flex items-center gap-2 text-slate-400 font-semibold">
                                                <Calendar className="w-4 h-4 text-rose-400" />
                                                <span>{post.fecha}</span>
                                            </div>
                                        </div>

                                        {/* Título & Resumen */}
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug group-hover:text-blue-300 transition-colors">
                                                {post.titulo}
                                            </h3>
                                            <p className="text-slate-300 text-xs sm:text-sm mt-3 font-medium leading-relaxed">
                                                {post.resumen}
                                            </p>
                                        </div>

                                        {/* Tarjeta de Resultado / Trofeo */}
                                        <div className="bg-gradient-to-r from-amber-400/10 via-rose-400/10 to-blue-400/10 border border-white/10 p-4 rounded-2xl flex items-center justify-between gap-4">
                                            <div>
                                                <span className="block text-[11px] font-black text-amber-300 uppercase tracking-wider">
                                                    {post.trofeo}
                                                </span>
                                                <span className="text-xs text-white font-extrabold mt-0.5 block">
                                                    Marcador: {post.marcador}
                                                </span>
                                            </div>
                                            <span className="text-xs text-slate-400 font-semibold shrink-0">
                                                📍 {post.lugar}
                                            </span>
                                        </div>

                                        {/* Atletas Destacados del Partido */}
                                        <div>
                                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-2">
                                                Jugadores Clave del Encuentro:
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {post.destacados.map((jugador, i) => (
                                                    <span key={i} className="bg-white/5 border border-white/10 text-slate-200 text-xs px-3 py-1 rounded-full font-semibold">
                                                        ⭐ {jugador}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Botón Ver Crónica Completa */}
                                    <div className="pt-6 mt-6 border-t border-white/10 flex justify-end">
                                        <button
                                            onClick={() => setLogroSeleccionado(post)}
                                            className="text-xs font-black uppercase tracking-wider text-amber-300 hover:text-white flex items-center gap-2 cursor-pointer transition-colors group/btn"
                                        >
                                            <span>Ver Crónica Completa & Galería</span>
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* ── SECCION 3: ESCUELAS & ESCENARIOS DEPORTIVOS ── */}
                <section className="py-16 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        
                        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
                            <span className="text-xs font-black uppercase tracking-[3px] text-emerald-400 bg-emerald-400/10 px-4 py-1.5 rounded-full inline-block border border-emerald-400/20">
                                Formación Integral
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                                Escuelas & Selecciones Deportivas
                            </h2>
                            <p className="text-slate-400 text-sm font-medium">
                                Ofrecemos programas extracurriculares guiados por entrenadores profesionales en nuestras instalaciones propias.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {ESCUELAS_DEPORTIVAS.map((escuela, idx) => (
                                <div 
                                    key={idx}
                                    className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:border-emerald-400/40 transition-all duration-300 space-y-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#800A15] to-[#003C8F] flex items-center justify-center text-2xl shadow-md">
                                            {escuela.icono}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-white">
                                                {escuela.nombre}
                                            </h3>
                                            <span className="text-xs text-emerald-400 font-bold">
                                                {escuela.entrenador}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-xs font-semibold text-slate-300 pt-2 border-t border-white/5">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                                            <span>{escuela.horario}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Activity className="w-4 h-4 text-blue-400 shrink-0" />
                                            <span>{escuela.lugar}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* ── MODAL DETALLE DE PUBLICACION DE TORNEO ── */}
                {logroSeleccionado && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
                        <div className="bg-slate-900 border border-white/20 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
                            
                            <button
                                onClick={() => setLogroSeleccionado(null)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="space-y-2">
                                <span className="bg-[#003C8F] text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-block">
                                    {logroSeleccionado.categoria}
                                </span>
                                <h3 className="text-2xl font-black text-white">
                                    {logroSeleccionado.titulo}
                                </h3>
                                <p className="text-xs text-rose-300 font-bold">
                                    🗓️ {logroSeleccionado.fecha} • 📍 {logroSeleccionado.lugar}
                                </p>
                            </div>

                            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-800 border border-white/10">
                                <img 
                                    src={logroSeleccionado.imagen} 
                                    alt={logroSeleccionado.titulo}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="bg-gradient-to-r from-amber-400/10 to-rose-400/10 border border-white/10 p-4 rounded-2xl">
                                <span className="block text-xs font-black text-amber-300 uppercase tracking-wider">
                                    {logroSeleccionado.trofeo}
                                </span>
                                <span className="text-sm font-black text-white mt-1 block">
                                    Resultado Final: {logroSeleccionado.marcador}
                                </span>
                            </div>

                            <div className="space-y-3 text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                                <p>{logroSeleccionado.detalle}</p>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex justify-end">
                                <button
                                    onClick={() => setLogroSeleccionado(null)}
                                    className="px-6 py-2.5 rounded-full bg-[#800A15] hover:bg-[#a00d1b] text-white font-black text-xs uppercase tracking-wider transition cursor-pointer"
                                >
                                    Cerrar Publicación
                                </button>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}
