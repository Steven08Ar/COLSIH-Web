import { useState, useMemo } from 'react';
import {
    TrendingUp, TrendingDown, CreditCard, Trophy, Newspaper, Users,
    Eye, Globe, Activity, Calendar,
    MessageSquareQuote, Smartphone, Monitor, Tablet, Compass, Clock, ChevronRight,
    ClipboardList, Mail
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { mediaUrl } from '@/utils/mediaUrl';

/* ── Fritsch–Carlson monotone cubic spline ── */
function getMonotoneSplinePath(points) {
    if (!points || points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
    if (points.length === 2) return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
    const n = points.length;
    const dx = [], dy = [], m = [];
    for (let i = 0; i < n - 1; i++) {
        const dX = points[i + 1].x - points[i].x;
        const dY = points[i + 1].y - points[i].y;
        dx.push(dX); dy.push(dY); m.push(dY / (dX || 1));
    }
    const t = [m[0]];
    for (let i = 1; i < n - 1; i++) {
        if (m[i - 1] * m[i] <= 0) { t.push(0); }
        else {
            const c = dx[i - 1] + dx[i];
            t.push((3 * c) / ((c + dx[i]) / m[i - 1] + (c + dx[i - 1]) / m[i]));
        }
    }
    t.push(m[n - 2]);
    let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
    for (let i = 0; i < n - 1; i++) {
        const sd = dx[i] / 3;
        path += ` C ${(points[i].x + sd).toFixed(2)} ${(points[i].y + t[i] * sd).toFixed(2)}, ${(points[i + 1].x - sd).toFixed(2)} ${(points[i + 1].y - t[i + 1] * sd).toFixed(2)}, ${points[i + 1].x.toFixed(2)} ${points[i + 1].y.toFixed(2)}`;
    }
    return path;
}

/* ── Minibarra sparkline ── */
function Sparkbar({ value, max, color = 'bg-indigo-500' }) {
    const pct = max > 0 ? Math.max(4, Math.round((value / max) * 100)) : 4;
    return (
        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
        </div>
    );
}

/* ── Tarjeta KPI ── */
function KpiCard({ label, value, sub, icon: Icon, trend, trendUp, accent = 'indigo' }) {
    const palettes = {
        indigo: { bg: 'bg-indigo-50 dark:bg-indigo-950/20', border: 'border-indigo-100 dark:border-indigo-900/30', icon: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400', badge: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300' },
        emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/20', border: 'border-emerald-100 dark:border-emerald-900/30', icon: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' },
        purple: { bg: 'bg-purple-50 dark:bg-purple-950/20', border: 'border-purple-100 dark:border-purple-900/30', icon: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400', badge: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300' },
        blue: { bg: 'bg-blue-50 dark:bg-blue-950/20', border: 'border-blue-100 dark:border-blue-900/30', icon: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400', badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' },
        amber: { bg: 'bg-amber-50 dark:bg-amber-950/20', border: 'border-amber-100 dark:border-amber-900/30', icon: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400', badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' },
        rose: { bg: 'bg-rose-50 dark:bg-rose-950/20', border: 'border-rose-100 dark:border-rose-900/30', icon: 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400', badge: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300' },
        sky: { bg: 'bg-sky-50 dark:bg-sky-950/20', border: 'border-sky-100 dark:border-sky-900/30', icon: 'bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400', badge: 'bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300' },
        teal: { bg: 'bg-teal-50 dark:bg-teal-950/20', border: 'border-teal-100 dark:border-teal-900/30', icon: 'bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400', badge: 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300' },
    };
    const p = palettes[accent] ?? palettes.indigo;
    return (
        <div className={`${p.bg} border ${p.border} rounded-2xl p-5 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all`}>
            <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl ${p.icon} flex items-center justify-center`}>
                    <Icon className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
                </div>
                {trend !== undefined && (
                    <span className={`text-[11px] font-extrabold flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
                        trendUp ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                    }`}>
                        {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {trend}%
                    </span>
                )}
                {trend === undefined && sub && (
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${p.badge}`}>{sub}</span>
                )}
            </div>
            <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {typeof value === 'number' ? value.toLocaleString('es-CO') : value}
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
                {trend !== undefined && sub && (
                    <div className="text-[11px] text-slate-400 mt-0.5">{sub}</div>
                )}
            </div>
        </div>
    );
}

export default function DashboardOverview({
    adminCounts = {},
    analytics = {},
    basePath = '/sih-panel-308'
}) {
    const [chartMode, setChartMode] = useState('dias');
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // ── Métricas principales ──
    const totalVisitas    = analytics?.total_visitas   ?? 0;
    const visitasHoy      = analytics?.visitas_hoy     ?? 0;
    const visitasAyer     = analytics?.visitas_ayer    ?? 0;
    const visitasSemana   = analytics?.visitas_semana  ?? 0;
    const visitasMes      = analytics?.visitas_mes     ?? 0;
    const crecimientoHoy  = analytics?.crecimiento_hoy ?? 0;

    const totalNoticias      = adminCounts?.noticias      ?? 0;
    const totalTestimonios   = adminCounts?.testimonios   ?? 0;
    const totalCarnets       = adminCounts?.carnets       ?? 0;
    const totalInscripciones = adminCounts?.inscripciones ?? 0;
    const totalEquipo        = adminCounts?.equipo        ?? 0;
    const totalContactos     = adminCounts?.contactos     ?? 0;
    const totalPreguntas     = adminCounts?.preguntas     ?? 0;

    const totalVistasNoticias    = analytics?.total_vistas_noticias    ?? 0;
    const totalVistasTestimonios = analytics?.total_vistas_testimonios ?? 0;

    const diasTrafico       = analytics?.dias_trafico       ?? [];
    const traficoMensual    = analytics?.trafico_mensual    ?? [];
    const topNoticias       = analytics?.top_noticias       ?? [];
    const topTestimonios    = analytics?.top_testimonios    ?? [];
    const dispositivos      = analytics?.dispositivos       ?? [];
    const navegadores       = analytics?.navegadores        ?? [];
    const seccionesPopulares= analytics?.secciones_populares ?? [];
    const actividades       = analytics?.actividades_recientes ?? [];

    // ── SVG chart ──
    const svgWidth = 800, svgHeight = 210;
    const px = 12, pt = 20, pb = 22;
    const cw = svgWidth - px * 2;
    const ch = svgHeight - pt - pb;

    const maxDailyVal = useMemo(() => Math.max(...diasTrafico.map(d => d.visitas), 10), [diasTrafico]);
    const sumPeriodo   = useMemo(() => diasTrafico.reduce((a, d) => a + (d.visitas || 0), 0), [diasTrafico]);
    const avgPeriodo   = useMemo(() => Math.round(sumPeriodo / (diasTrafico.length || 1)), [sumPeriodo, diasTrafico]);

    const points = useMemo(() => {
        const div = diasTrafico.length > 1 ? diasTrafico.length - 1 : 1;
        return diasTrafico.map((d, i) => ({
            x: px + (i / div) * cw,
            y: pt + ch - ((d.visitas || 0) / (maxDailyVal * 1.18)) * ch,
            ...d,
        }));
    }, [diasTrafico, cw, ch, maxDailyVal]);

    const linePath = useMemo(() => getMonotoneSplinePath(points), [points]);
    const areaPath = useMemo(() => {
        if (!points.length || !linePath) return '';
        const by = svgHeight - pb;
        return `${linePath} L ${points[points.length - 1].x.toFixed(2)} ${by} L ${points[0].x.toFixed(2)} ${by} Z`;
    }, [points, linePath]);

    const activePoint = hoveredIndex !== null ? points[hoveredIndex] : null;

    // Accesos rápidos
    const quickLinks = [
        { label: 'Noticias',      icon: Newspaper,          href: `${basePath}/noticias`,       color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
        { label: 'Deportes',      icon: Trophy,             href: `${basePath}/deportes-admin`, color: 'text-amber-600 dark:text-amber-400',   bg: 'bg-amber-50 dark:bg-amber-950/30' },
        { label: 'Testimonios',   icon: MessageSquareQuote, href: `${basePath}/testimonios`,    color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/30' },
        { label: 'Recorrido 360°',icon: Compass,            href: `${basePath}/recorrido`,      color: 'text-sky-600 dark:text-sky-400',       bg: 'bg-sky-50 dark:bg-sky-950/30' },
        { label: 'Carnets NFC',   icon: CreditCard,         href: `${basePath}/carnets-admin`,  color: 'text-blue-600 dark:text-blue-400',     bg: 'bg-blue-50 dark:bg-blue-950/30' },
        { label: 'Equipo',        icon: Users,              href: `${basePath}/equipo`,         color: 'text-rose-600 dark:text-rose-400',     bg: 'bg-rose-50 dark:bg-rose-950/30' },
    ];

    // Icono por tipo de actividad
    const actividadIcono = {
        noticia:    { icon: Newspaper,          color: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' },
        carnet:     { icon: CreditCard,         color: 'bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400' },
        testimonio: { icon: MessageSquareQuote, color: 'bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400' },
        contacto:   { icon: Mail,               color: 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400' },
        inscripcion:{ icon: ClipboardList,      color: 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400' },
    };

    const maxSeccion = Math.max(...seccionesPopulares.map(s => s.visitas), 1);

    return (
        <div className="space-y-6 sm:space-y-7 animate-fadeIn pb-12">

            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 rounded-2xl px-5 py-4 shadow-xs">
                <div>
                    <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <h1 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Panel de Métricas — COLSIH</h1>
                    </div>
                    <p className="text-xs text-slate-400 font-medium mt-0.5 pl-4.5">
                        Datos en tiempo real del portal web institucional
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    {new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
            </div>

            {/* ── KPIs fila 1: Tráfico ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <KpiCard
                    label="Visitas totales"
                    value={totalVisitas}
                    sub={`${visitasMes.toLocaleString()} este mes`}
                    icon={Globe}
                    trend={Math.abs(crecimientoHoy)}
                    trendUp={crecimientoHoy >= 0}
                    accent="indigo"
                />
                <KpiCard
                    label="Visitas hoy"
                    value={visitasHoy}
                    sub={`Ayer: ${visitasAyer}`}
                    icon={Activity}
                    accent="emerald"
                />
                <KpiCard
                    label="Esta semana"
                    value={visitasSemana}
                    sub="Últimos 7 días"
                    icon={Eye}
                    accent="sky"
                />
                <KpiCard
                    label="Vistas en noticias"
                    value={totalVistasNoticias}
                    sub={`${totalNoticias} artículos`}
                    icon={Newspaper}
                    accent="purple"
                />
            </div>

            {/* ── KPIs fila 2: Contenido ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <KpiCard
                    label="Carnets NFC"
                    value={totalCarnets}
                    sub="Control de ingreso"
                    icon={CreditCard}
                    accent="blue"
                />
                <KpiCard
                    label="Inscripciones"
                    value={totalInscripciones}
                    sub="Formularios recibidos"
                    icon={ClipboardList}
                    accent="amber"
                />
                <KpiCard
                    label="Equipo institucional"
                    value={totalEquipo}
                    sub={`+ ${totalTestimonios} testimonios`}
                    icon={Users}
                    accent="rose"
                />
                <KpiCard
                    label="Mensajes recibidos"
                    value={totalContactos}
                    sub={`${totalPreguntas} FAQs publicadas`}
                    icon={Mail}
                    accent="teal"
                />
            </div>

            {/* ── Gráfico de Tráfico ── */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xs">

                {/* Header gráfico */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100 dark:border-slate-800/80">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-base font-black text-slate-900 dark:text-white">Tráfico del Portal</h2>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
                                Tiempo real
                            </span>
                        </div>
                        <div className="flex items-center gap-5 mt-2 text-xs">
                            <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total período</span>
                                <span className="font-black text-slate-900 dark:text-white">{sumPeriodo.toLocaleString()} <span className="text-[10px] text-slate-400 font-medium">visitas</span></span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Promedio / día</span>
                                <span className="font-black text-slate-900 dark:text-white">{avgPeriodo} <span className="text-[10px] text-slate-400 font-medium">/ día</span></span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pico máximo</span>
                                <span className="font-black text-indigo-600 dark:text-indigo-400">{maxDailyVal} <span className="text-[10px] text-slate-400 font-medium">visitas</span></span>
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold border border-slate-200/50 dark:border-slate-700/50 self-start sm:self-auto shrink-0">
                        {['dias', 'meses'].map(mode => (
                            <button key={mode} type="button" onClick={() => setChartMode(mode)}
                                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${chartMode === mode ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-black' : 'text-slate-500 dark:text-slate-400 font-medium'}`}>
                                {mode === 'dias' ? 'Últimos 14 días' : 'Mes a mes'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Línea SVG */}
                {chartMode === 'dias' ? (
                    <div className="select-none">
                        <div className="w-full h-56 sm:h-64 relative cursor-crosshair" onMouseLeave={() => setHoveredIndex(null)}>
                            <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.18" />
                                        <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                                    </linearGradient>
                                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#818CF8" />
                                        <stop offset="100%" stopColor="#4F46E5" />
                                    </linearGradient>
                                </defs>
                                {/* Guías */}
                                {[0, 0.33, 0.66, 1].map((f, i) => (
                                    <line key={i} x1={px} y1={pt + ch * f} x2={svgWidth - px} y2={pt + ch * f}
                                        stroke="currentColor" className="text-slate-100 dark:text-slate-800/60"
                                        strokeDasharray={f === 1 ? undefined : "4 4"} strokeWidth="1" />
                                ))}
                                {/* Área */}
                                {areaPath && <path d={areaPath} fill="url(#areaGrad)" />}
                                {/* Línea */}
                                {linePath && <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" />}
                                {/* Hover */}
                                {activePoint && (
                                    <g>
                                        <line x1={activePoint.x} y1={pt} x2={activePoint.x} y2={svgHeight - pb}
                                            stroke="#6366F1" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />
                                        <circle cx={activePoint.x} cy={activePoint.y} r="9" fill="#6366F1" fillOpacity="0.15" className="animate-ping" />
                                        <circle cx={activePoint.x} cy={activePoint.y} r="4" fill="#fff" stroke="#6366F1" strokeWidth="2.5" />
                                    </g>
                                )}
                                {/* Zonas invisibles de hover */}
                                {points.map((p, i) => {
                                    const w = svgWidth / points.length;
                                    return <rect key={i} x={p.x - w / 2} y={0} width={w} height={svgHeight} fill="transparent" onMouseEnter={() => setHoveredIndex(i)} />;
                                })}
                            </svg>

                            {/* Tooltip */}
                            {activePoint && (
                                <div className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-full -top-1 transition-all duration-100"
                                    style={{ left: `${(activePoint.x / svgWidth) * 100}%` }}>
                                    <div className="bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 px-3 py-2 rounded-xl shadow-2xl border border-slate-700/50 dark:border-slate-200/50 min-w-[120px]">
                                        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">{activePoint.label}</div>
                                        <div className="text-base font-black">{activePoint.visitas} <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">visitas</span></div>
                                        <div className="text-[11px] font-semibold text-emerald-400 dark:text-emerald-600">{activePoint.unicos} únicos</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Eje X */}
                        <div className="flex justify-between text-[10px] font-semibold text-slate-400 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                            {diasTrafico.map((d, i) => (
                                <span key={i} className={`px-1 transition-colors ${activePoint?.fecha === d.fecha ? 'text-indigo-600 dark:text-indigo-400 font-extrabold' : (i % 2 === 0 || i === diasTrafico.length - 1 ? '' : 'opacity-0 sm:opacity-40')}`}>
                                    {d.label}
                                </span>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Barras mensuales */
                    <div className="pt-2">
                        <div className="grid grid-cols-12 gap-1.5 sm:gap-2 items-end h-52">
                            {traficoMensual.map((m, i) => {
                                const maxM = Math.max(...traficoMensual.map(x => x.visitas), 1);
                                const h = maxM > 0 ? Math.max(4, Math.round((m.visitas / maxM) * 100)) : 4;
                                return (
                                    <div key={i} className="flex flex-col items-center gap-1.5 h-full justify-end group cursor-default">
                                        <span className="text-[9px] font-black text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {m.visitas > 0 ? m.visitas.toLocaleString() : '—'}
                                        </span>
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex items-end" style={{ height: '176px' }}>
                                            <div className={`w-full rounded-md transition-all duration-500 ${m.activo ? 'bg-indigo-600 dark:bg-indigo-500' : m.visitas > 0 ? 'bg-indigo-200 dark:bg-indigo-900 group-hover:bg-indigo-400 dark:group-hover:bg-indigo-700' : 'bg-slate-100 dark:bg-slate-800'}`}
                                                style={{ height: `${h}%` }} />
                                        </div>
                                        <span className={`text-[10px] font-bold ${m.activo ? 'text-indigo-600 dark:text-indigo-400 font-extrabold' : 'text-slate-400'}`}>{m.mes}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Fila: Noticias + Testimonios ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Noticias más leídas */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                <Newspaper className="w-4 h-4" />
                            </div>
                            <div>
                                <h2 className="text-sm font-black text-slate-900 dark:text-white">Noticias más leídas</h2>
                                <p className="text-[11px] text-slate-400 font-medium">{totalVistasNoticias.toLocaleString()} lecturas totales</p>
                            </div>
                        </div>
                        <Link href={`${basePath}/noticias`} className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
                            Gestionar <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="space-y-3 flex-1">
                        {topNoticias.length > 0 ? topNoticias.map((n, i) => (
                            <div key={n.id ?? i} className="space-y-1.5">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-2 min-w-0">
                                        <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                                            {i + 1}
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{n.titulo}</p>
                                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                                                <span className="uppercase tracking-wider font-semibold">{n.categoria}</span>
                                                <span>· {n.publicado_en}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1">
                                            <Eye className="w-3 h-3 text-emerald-500" />
                                            {n.vistas.toLocaleString()}
                                        </div>
                                        <div className="text-[10px] text-slate-400">{n.porcentaje}%</div>
                                    </div>
                                </div>
                                <Sparkbar value={n.vistas} max={topNoticias[0]?.vistas ?? 1} color="bg-emerald-400" />
                            </div>
                        )) : (
                            <div className="flex-1 flex items-center justify-center text-xs text-slate-400 py-8">
                                Aún no hay noticias publicadas.
                            </div>
                        )}
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-[11px] text-slate-500">
                        <span>{totalNoticias} artículos totales</span>
                        <span>{adminCounts?.preguntas ?? 0} FAQs</span>
                    </div>
                </div>

                {/* Testimonios */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                <MessageSquareQuote className="w-4 h-4" />
                            </div>
                            <div>
                                <h2 className="text-sm font-black text-slate-900 dark:text-white">Testimonios</h2>
                                <p className="text-[11px] text-slate-400 font-medium">{totalVistasTestimonios.toLocaleString()} impresiones</p>
                            </div>
                        </div>
                        <Link href={`${basePath}/testimonios`} className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
                            Gestionar <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="space-y-3 flex-1">
                        {topTestimonios.length > 0 ? topTestimonios.map((t, i) => (
                            <div key={t.id ?? i} className="space-y-1.5">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-[11px] font-black text-purple-700 dark:text-purple-300 shrink-0 overflow-hidden">
                                            {t.imagen ? <img src={mediaUrl(t.imagen)} alt={t.nombre} className="w-full h-full object-cover" /> : (t.nombre?.charAt(0)?.toUpperCase() ?? 'T')}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{t.nombre}</p>
                                            <p className="text-[10px] text-slate-400 truncate">{t.cargo ?? 'Comunidad COLSIH'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1">
                                            <Eye className="w-3 h-3 text-purple-500" />
                                            {t.vistas.toLocaleString()}
                                        </div>
                                        <div className="text-[10px] text-slate-400">{t.porcentaje}%</div>
                                    </div>
                                </div>
                                <Sparkbar value={t.vistas} max={topTestimonios[0]?.vistas ?? 1} color="bg-purple-400" />
                            </div>
                        )) : (
                            <div className="flex-1 flex items-center justify-center text-xs text-slate-400 py-8">
                                Aún no hay testimonios publicados.
                            </div>
                        )}
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-[11px] text-slate-500">
                        <span>{totalTestimonios} testimonios publicados</span>
                        <span>{totalEquipo} miembros del equipo</span>
                    </div>
                </div>
            </div>

            {/* ── Fila inferior: Dispositivos + Secciones + Actividad ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Dispositivos & Navegadores */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-black text-slate-900 dark:text-white">Accesos por Dispositivo</h2>
                        <Smartphone className="w-4 h-4 text-slate-400" />
                    </div>

                    {/* Barra segmentada */}
                    <div className="flex gap-0.5 h-2.5 rounded-full overflow-hidden mb-4">
                        {dispositivos.map((d, i) => (
                            <div key={i} className={`h-full ${d.color} transition-all duration-500`} style={{ width: d.pct }} title={`${d.name}: ${d.pct}`} />
                        ))}
                    </div>

                    <div className="space-y-2 mb-5">
                        {dispositivos.map((d, i) => {
                            const Icon = d.name.includes('Móvil') ? Smartphone : d.name.includes('Tablet') ? Tablet : Monitor;
                            return (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                                        <Icon className={`w-3.5 h-3.5 ${d.textColor}`} />
                                        {d.name}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11px] text-slate-400">{d.count?.toLocaleString() ?? '—'}</span>
                                        <span className="text-xs font-black text-slate-900 dark:text-white w-8 text-right">{d.pct}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {navegadores.length > 0 && (
                        <>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Navegadores</div>
                            <div className="space-y-1.5">
                                {navegadores.slice(0, 4).map((nav, i) => (
                                    <div key={i} className="flex items-center gap-2.5">
                                        <div className={`w-2 h-2 rounded-full ${nav.color} shrink-0`} />
                                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 flex-1 truncate">{nav.name}</span>
                                        <span className="text-[11px] font-black text-slate-900 dark:text-white">{nav.pct}%</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Secciones más visitadas */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-black text-slate-900 dark:text-white">Páginas más visitadas</h2>
                        <Compass className="w-4 h-4 text-slate-400" />
                    </div>

                    {seccionesPopulares.length > 0 ? (
                        <div className="space-y-3.5">
                            {seccionesPopulares.map((s, i) => (
                                <div key={i} className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-4 ${s.color} rounded-full`} />
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{s.nombre}</span>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="text-[11px] text-slate-400">{s.visitas.toLocaleString()}</span>
                                            <span className="text-[11px] font-black text-slate-700 dark:text-slate-200 w-8 text-right">{s.pct}%</span>
                                        </div>
                                    </div>
                                    <Sparkbar value={s.visitas} max={maxSeccion} color={s.color.replace('bg-', 'bg-')} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-xs text-slate-400 gap-2">
                            <Globe className="w-8 h-8 opacity-20" />
                            Sin datos de tráfico aún
                        </div>
                    )}

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 text-[11px] text-slate-400 font-medium">
                        Fuente: Registro de visitas del portal COLSIH
                    </div>
                </div>

                {/* Actividad reciente + Accesos rápidos */}
                <div className="flex flex-col gap-5">

                    {/* Actividad reciente */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-black text-slate-900 dark:text-white">Actividad reciente</h2>
                            <Clock className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="space-y-3">
                            {actividades.length > 0 ? actividades.slice(0, 4).map((a, i) => {
                                const meta = actividadIcono[a.tipo] ?? actividadIcono.contacto;
                                const Icon = meta.icon;
                                return (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className={`w-7 h-7 rounded-xl ${meta.color} flex items-center justify-center shrink-0 mt-0.5`}>
                                            <Icon className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{a.titulo}</p>
                                            <p className="text-[10px] text-slate-400 truncate">{a.desc}</p>
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-medium shrink-0 mt-0.5">{a.fecha}</span>
                                    </div>
                                );
                            }) : (
                                <p className="text-xs text-slate-400 text-center py-4">Sin actividad reciente</p>
                            )}
                        </div>
                    </div>

                    {/* Accesos rápidos */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs">
                        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-3">Accesos directos</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {quickLinks.map((link, i) => {
                                const Icon = link.icon;
                                return (
                                    <Link key={i} href={link.href}
                                        className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/60 dark:bg-slate-800/20 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all group">
                                        <div className={`w-8 h-8 rounded-xl ${link.bg} flex items-center justify-center`}>
                                            <Icon className={`w-4 h-4 ${link.color}`} />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white text-center leading-tight">{link.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
