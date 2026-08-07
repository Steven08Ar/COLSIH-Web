import React from 'react';
import { 
    TrendingUp, 
    TrendingDown, 
    CreditCard, 
    Trophy, 
    Newspaper, 
    Users, 
    ArrowUpRight, 
    Sparkles, 
    ExternalLink, 
    Eye, 
    BarChart3, 
    Globe, 
    ShieldCheck, 
    Activity, 
    Calendar,
    FileText,
    HelpCircle
} from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function DashboardOverview({ 
    adminCounts = {}, 
    carnets = [], 
    torneoPartidos = [], 
    equipo = [], 
    noticias = [], 
    basePath = '/sih-panel-308' 
}) {
    // Valores numéricos para las métricas superiores
    const totalCarnets = adminCounts?.carnets ?? carnets.length;
    const totalDeportes = torneoPartidos.length || 7;
    const totalNoticias = adminCounts?.noticias ?? noticias.length;
    const totalEquipo = adminCounts?.equipo ?? equipo.length;

    // Accesos rápidos minimalistas
    const quickLinks = [
        { label: 'Editor de Páginas', icon: FileText, href: `${basePath}/builder`, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
        { label: 'Carnets NFC', icon: CreditCard, href: `${basePath}/carnets-admin`, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30' },
        { label: 'Deportes & Torneos', icon: Trophy, href: `${basePath}/deportes-admin`, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30' },
        { label: 'Noticias y Eventos', icon: Newspaper, href: `${basePath}/noticias`, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
        { label: 'Preguntas Frecuentes', icon: HelpCircle, href: `${basePath}/preguntas`, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-950/30' },
        { label: 'Recorrido 360°', icon: Globe, href: `${basePath}/recorrido`, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/30' },
    ];

    // Actividades recientes mock para el panel derecho estilo SnowUI
    const recentActivities = [
        { title: 'Publicación enviada', desc: 'Se actualizó el banner de Admisiones 2027', time: 'Hace 10 min', icon: Newspaper, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' },
        { title: 'Carnet NFC expedido', desc: 'Estudiante Grado 11° validó su carnet inteligente', time: 'Hace 45 min', icon: CreditCard, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40' },
        { title: 'Resultado Deportivo', desc: 'Se registró el marcador del Torneo COLSIH', time: 'Hace 2 horas', icon: Trophy, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' },
        { title: 'Sincronización cPanel', desc: 'Servidores HTTP & SSL operativos', time: 'Hoy, 08:30 AM', icon: ShieldCheck, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40' },
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            
            {/* Header del Overview */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Resumen General
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Monitoreo en tiempo real del portal institucional COLSIH.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-2xs flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Hoy: {new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                </div>
            </div>

            {/* ── 1. Cuatro Tarjetas de Métricas Pasteles (Estilo SnowUI / Apple Minimal) ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                
                {/* Tarjeta 1: Carnets NFC (Lila Pastel) */}
                <div className="bg-[#F2F1FF] dark:bg-purple-950/20 border border-purple-100/60 dark:border-purple-900/30 rounded-2xl p-5 flex flex-col justify-between transition-transform hover:-translate-y-0.5">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#5B50E6] dark:text-purple-300">
                            Carnets Registrados
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 bg-white/60 dark:bg-slate-900/60 px-2 py-0.5 rounded-full">
                            +12.4% <TrendingUp className="w-3 h-3" />
                        </span>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            {totalCarnets}
                        </span>
                        <CreditCard className="w-5 h-5 text-[#5B50E6]/60 dark:text-purple-400/60" />
                    </div>
                </div>

                {/* Tarjeta 2: Torneos & Deportes (Azul Cielo Pastel) */}
                <div className="bg-[#E8F5FF] dark:bg-sky-950/20 border border-sky-100/60 dark:border-sky-900/30 rounded-2xl p-5 flex flex-col justify-between transition-transform hover:-translate-y-0.5">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#0070F3] dark:text-sky-300">
                            Torneos & Deportes
                        </span>
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-0.5 bg-white/60 dark:bg-slate-900/60 px-2 py-0.5 rounded-full">
                            -0.03% <TrendingDown className="w-3 h-3" />
                        </span>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            {totalDeportes}
                        </span>
                        <Trophy className="w-5 h-5 text-[#0070F3]/60 dark:text-sky-400/60" />
                    </div>
                </div>

                {/* Tarjeta 3: Noticias Publicadas (Fucsia Pastel) */}
                <div className="bg-[#F7F0FF] dark:bg-fuchsia-950/20 border border-fuchsia-100/60 dark:border-fuchsia-900/30 rounded-2xl p-5 flex flex-col justify-between transition-transform hover:-translate-y-0.5">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#9333EA] dark:text-fuchsia-300">
                            Noticias Publicadas
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 bg-white/60 dark:bg-slate-900/60 px-2 py-0.5 rounded-full">
                            +15.03% <TrendingUp className="w-3 h-3" />
                        </span>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            {totalNoticias}
                        </span>
                        <Newspaper className="w-5 h-5 text-[#9333EA]/60 dark:text-fuchsia-400/60" />
                    </div>
                </div>

                {/* Tarjeta 4: Equipo Institucional (Azul Helado Pastel) */}
                <div className="bg-[#EDF6FF] dark:bg-blue-950/20 border border-blue-100/60 dark:border-blue-900/30 rounded-2xl p-5 flex flex-col justify-between transition-transform hover:-translate-y-0.5">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#0284C7] dark:text-blue-300">
                            Equipo Institucional
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 bg-white/60 dark:bg-slate-900/60 px-2 py-0.5 rounded-full">
                            +6.08% <TrendingUp className="w-3 h-3" />
                        </span>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            {totalEquipo}
                        </span>
                        <Users className="w-5 h-5 text-[#0284C7]/60 dark:text-blue-400/60" />
                    </div>
                </div>

            </div>

            {/* ── 2. Grid Principal: Gráfico de Actividad & Accesos Rápidos (SnowUI Flat Grid) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
                
                {/* Columna Izquierda: Gráfico de Rendimiento & Accesos Rápidos */}
                <div className="lg:col-span-8 space-y-5 sm:space-y-6">
                    
                    {/* Gráfico Estilo Spline de SnowUI (Contenedor Blanco Plano) */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                                    Tráfico & Consultas al Portal
                                </h2>
                                <p className="text-xs text-slate-400 font-medium">
                                    Picos de navegación por jornada académica.
                                </p>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Año Actual
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></span> Año Anterior
                                </span>
                            </div>
                        </div>

                        {/* Gráfico SVG Plano Minimalista estilo SnowUI */}
                        <div className="w-full h-56 relative flex items-end pt-4">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" fill="none">
                                {/* Líneas de cuadrícula de fondo */}
                                <line x1="0" y1="30" x2="500" y2="30" stroke="currentColor" className="text-slate-100 dark:text-slate-800/60" strokeDasharray="4 4" />
                                <line x1="0" y1="75" x2="500" y2="75" stroke="currentColor" className="text-slate-100 dark:text-slate-800/60" strokeDasharray="4 4" />
                                <line x1="0" y1="120" x2="500" y2="120" stroke="currentColor" className="text-slate-100 dark:text-slate-800/60" strokeDasharray="4 4" />

                                {/* Trazo Año Anterior (Dashed) */}
                                <path 
                                    d="M 10 110 Q 75 90, 150 95 T 300 70 T 490 35" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    className="text-slate-300 dark:text-slate-700" 
                                    strokeWidth="2" 
                                    strokeDasharray="4 4" 
                                />

                                {/* Trazo Año Actual (Curva Suave Indigo) */}
                                <path 
                                    d="M 10 95 C 70 45, 120 120, 180 75 C 240 30, 280 90, 350 40 C 410 10, 460 60, 490 20" 
                                    fill="none" 
                                    stroke="#6366F1" 
                                    strokeWidth="3" 
                                    strokeLinecap="round"
                                />

                                {/* Puntos interactivos decorativos */}
                                <circle cx="350" cy="40" r="5" fill="#6366F1" className="animate-pulse" />
                                <circle cx="490" cy="20" r="5" fill="#6366F1" />
                            </svg>
                        </div>

                        {/* Meses en eje X */}
                        <div className="flex justify-between text-[11px] font-semibold text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                            <span>Ene</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Abr</span>
                            <span>May</span>
                            <span>Jun</span>
                            <span>Jul</span>
                            <span>Ago</span>
                        </div>
                    </div>

                    {/* Accesos Rápidos Módulos (Grid Blanco Minimalista) */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                        <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">
                            Accesos Directos a Módulos
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {quickLinks.map((link, i) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={i}
                                        href={link.href}
                                        className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group flex flex-col justify-between h-24"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className={`w-8 h-8 rounded-lg ${link.bg} flex items-center justify-center`}>
                                                <Icon className={`w-4 h-4 ${link.color}`} />
                                            </div>
                                            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </div>
                                        <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
                                            {link.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Columna Derecha: Registro de Actividad y Distribución de Módulos (Estilo SnowUI Right Panel) */}
                <div className="lg:col-span-4 space-y-5 sm:space-y-6">
                    
                    {/* Actividad Reciente */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                                Registro de Actividad
                            </h2>
                            <Activity className="w-4 h-4 text-slate-400" />
                        </div>

                        <div className="space-y-4">
                            {recentActivities.map((act, idx) => {
                                const Icon = act.icon;
                                return (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${act.color}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                                                {act.title}
                                            </p>
                                            <p className="text-[11px] text-slate-400 truncate mt-0.5">
                                                {act.desc}
                                            </p>
                                            <span className="text-[10px] text-slate-400 font-medium block mt-1">
                                                {act.time}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Distribución del Tráfico por Sección */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                        <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">
                            Secciones Más Consultadas
                        </h2>
                        
                        <div className="space-y-3">
                            {[
                                { name: 'Admisiones & Cupos', pct: '48%', color: 'bg-indigo-500' },
                                { name: 'Oferta Académica', pct: '26%', color: 'bg-sky-500' },
                                { name: 'Carnets NFC Kiosco', pct: '14%', color: 'bg-emerald-500' },
                                { name: 'Noticias & Eventos', pct: '12%', color: 'bg-purple-500' },
                            ].map((sec, i) => (
                                <div key={i} className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                                        <span>{sec.name}</span>
                                        <span>{sec.pct}</span>
                                    </div>
                                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                        <div className={`h-full ${sec.color} rounded-full`} style={{ width: sec.pct }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}
