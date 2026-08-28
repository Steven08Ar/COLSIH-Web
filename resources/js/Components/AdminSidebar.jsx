import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, router, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Users, 
    CreditCard, 
    Trophy, 
    Newspaper, 
    MessageSquareQuote, 
    HelpCircle, 
    Compass, 
    Terminal, 
    Layout, 
    ChevronDown, 
    ChevronRight, 
    ChevronLeft, 
    LogOut, 
    FolderKanban, 
    Layers, 
    Sparkles, 
    User,
    Settings,
    X
} from 'lucide-react';

export default function AdminSidebar({
    seccion,
    basePath = '/sih-panel-308',
    sidebarOpen,
    setSidebarOpen,
    isCollapsed,
    setIsCollapsed,
    adminCounts = {},
}) {
    const adminSesion = usePage().props.adminSesion;

    // Claves de sección accesibles según el rol del usuario
    const PERMISOS = {
        admin:    ['dashboard', 'noticias', 'testimonios', 'preguntas', 'builder', 'equipo', 'recorrido', 'deportes-admin'],
        deportes: ['dashboard', 'deportes-admin'],
        marketing:['dashboard', 'noticias', 'testimonios', 'preguntas', 'builder'],
    };

    const esSuperenv = adminSesion?.tipo === 'superenv';
    const rol = esSuperenv ? null : (adminSesion?.rol ?? 'marketing');
    // null = acceso total; array = claves permitidas
    const permitidos = rol === null ? null : (PERMISOS[rol] ?? PERMISOS.marketing);

    const tieneAcceso = (key) => permitidos === null || permitidos.includes(key);

    // Estado para controlar qué acordeones/grupos están expandidos en modo desplegado
    const [openGroups, setOpenGroups] = useState({
        contenido: true,
        modulos: true,
    });

    // Popover flotante vía Portal en estado colapsado (evita que se corte en el sidebar)
    const [popoverGroup, setPopoverGroup] = useState(null);
    const [popoverPos, setPopoverPos] = useState(null);
    const [tooltipData, setTooltipData] = useState(null);

    const popoverTimeoutRef = useRef(null);

    const toggleGroup = (groupKey) => {
        setOpenGroups(prev => ({ ...prev, [groupKey]: !prev[groupKey] }));
    };

    const handleGroupClick = (e, item) => {
        if (isCollapsed && typeof window !== 'undefined' && window.innerWidth >= 1024) {
            const rect = e.currentTarget.getBoundingClientRect();
            if (popoverGroup?.groupKey === item.groupKey) {
                closePopoverImmediately();
            } else {
                setPopoverPos({ top: rect.top, left: rect.right + 10 });
                setPopoverGroup(item);
            }
        } else {
            toggleGroup(item.groupKey);
        }
    };

    const handleGroupMouseEnter = (e, item) => {
        if (!isCollapsed || typeof window === 'undefined' || window.innerWidth < 1024) return;
        if (popoverTimeoutRef.current) clearTimeout(popoverTimeoutRef.current);
        const rect = e.currentTarget.getBoundingClientRect();
        setPopoverPos({ top: rect.top, left: rect.right + 10 });
        setPopoverGroup(item);
    };

    const handleGroupMouseLeave = () => {
        if (!isCollapsed || typeof window === 'undefined' || window.innerWidth < 1024) return;
        popoverTimeoutRef.current = setTimeout(() => {
            setPopoverGroup(null);
            setPopoverPos(null);
        }, 180);
    };

    const cancelClosePopover = () => {
        if (popoverTimeoutRef.current) clearTimeout(popoverTimeoutRef.current);
    };

    const closePopoverImmediately = () => {
        if (popoverTimeoutRef.current) clearTimeout(popoverTimeoutRef.current);
        setPopoverGroup(null);
        setPopoverPos(null);
    };

    const showTooltip = (e, label) => {
        if (!isCollapsed || typeof window === 'undefined' || window.innerWidth < 1024) return;
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltipData({
            label,
            top: rect.top + rect.height / 2,
            left: rect.right + 12
        });
    };

    const hideTooltip = () => {
        setTooltipData(null);
    };

    // Estructura de navegación con categorías y submenús
    const menuStructure = [
        {
            category: 'MAIN',
            items: [
                {
                    key: 'dashboard',
                    label: 'Dashboard',
                    icon: LayoutDashboard,
                    href: `${basePath}`,
                    count: null
                }
            ].filter(i => tieneAcceso(i.key))
        },
        {
            category: 'GESTIÓN',
            items: [
                {
                    groupKey: 'contenido',
                    label: 'Contenido Web',
                    icon: FolderKanban,
                    subItems: [
                        { key: 'noticias',     label: 'Noticias y Eventos',    icon: Newspaper,          href: `${basePath}/noticias`,     count: adminCounts?.noticias },
                        { key: 'testimonios',  label: 'Testimonios',            icon: MessageSquareQuote, href: `${basePath}/testimonios`,  count: adminCounts?.testimonios },
                        { key: 'preguntas',    label: 'Preguntas Frecuentes',   icon: HelpCircle,         href: `${basePath}/preguntas`,    count: adminCounts?.preguntas },
                        { key: 'builder',      label: 'Editor de Páginas',      icon: Layout,             href: `${basePath}/builder`,      count: null },
                    ].filter(s => tieneAcceso(s.key))
                },
                {
                    groupKey: 'modulos',
                    label: 'Módulos Institucionales',
                    icon: Layers,
                    subItems: [
                        { key: 'carnets-admin', label: 'Tarjetas NFC & Carnets',  icon: CreditCard, href: `${basePath}/carnets-admin`, count: adminCounts?.carnets },
                        { key: 'deportes-admin', label: 'Deportes & Torneos',     icon: Trophy,     href: `${basePath}/deportes-admin`, count: 7 },
                        { key: 'recorrido',     label: 'Recorrido Virtual 360°',  icon: Compass,    href: `${basePath}/recorrido`,     count: adminCounts?.scenes },
                        { key: 'equipo',        label: 'Equipo Institucional',    icon: Users,      href: `${basePath}/equipo`,        count: adminCounts?.equipo },
                    ].filter(s => tieneAcceso(s.key))
                },
            ].filter(i => !i.subItems || i.subItems.length > 0)
        },
        {
            category: 'SISTEMA',
            items: [
                ...(tieneAcceso('mantenimiento') ? [{
                    key: 'mantenimiento',
                    label: 'Servidor / cPanel',
                    icon: Terminal,
                    href: `${basePath}/mantenimiento`,
                    count: 'PHP'
                }] : []),
                ...(adminSesion?.tipo === 'superenv' ? [{
                    key: 'usuarios',
                    label: 'Gestión de Usuarios',
                    icon: Settings,
                    href: `${basePath}/usuarios`,
                    count: null
                }] : [])
            ]
        }
    ].filter(section => section.items.length > 0);

    return (
        <>
            <aside className={`bg-white dark:bg-[#0E1726] border-r border-slate-200/80 dark:border-slate-800/80 h-screen fixed left-0 top-0 z-50 flex flex-col justify-between transition-all duration-300 ease-in-out w-[280px] sm:w-[300px] max-w-[85vw] ${
                isCollapsed ? 'lg:w-[84px]' : 'lg:w-[260px]'
            } ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}`}>
                
                {/* ── Botón flotante para colapsar/expandir en el borde derecho (Solo en escritorio) ── */}
                <button
                    type="button"
                    onClick={() => {
                        closePopoverImmediately();
                        setIsCollapsed(!isCollapsed);
                    }}
                    className="hidden lg:flex absolute -right-3.5 top-7 w-7 h-7 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-transform hover:scale-105 cursor-pointer z-50"
                    title={isCollapsed ? "Expandir Menú" : "Colapsar Menú"}
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
                    
                    {/* ── Header Perfil (Avatar + Info + Rol + Botón Cerrar en móvil) ── */}
                    <div className={`pt-6 pb-4 border-b border-slate-100 dark:border-slate-800/80 transition-all duration-300 px-5 ${
                        isCollapsed ? 'lg:px-2 lg:text-center lg:flex lg:justify-center' : 'lg:px-6'
                    }`}>
                        <div className="flex items-center justify-between gap-3 w-full">
                            <div className="flex items-center gap-3.5 min-w-0">
                                <div className="relative shrink-0">
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#800A15] to-[#003C8F] p-0.5 shadow-md">
                                        {adminSesion?.foto ? (
                                            <img src={adminSesion.foto} alt={adminSesion.nombre} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center font-black text-sm text-[#800A15] dark:text-blue-400">
                                                {(adminSesion?.nombre ?? 'A').charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>
                                </div>

                                <div className={`flex flex-col min-w-0 ${isCollapsed ? 'lg:hidden' : 'flex'}`}>
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider truncate">
                                        {adminSesion?.tipo === 'superenv' ? 'Super Admin' : 'Administrador'}
                                    </span>
                                    <span className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                                        {adminSesion?.nombre ?? 'Admin'}
                                    </span>
                                </div>
                            </div>

                            {/* Botón Cerrar en Móvil */}
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition cursor-pointer"
                                aria-label="Cerrar Menú"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* ── Navegación Categorizada ── */}
                    <nav className="mt-4 px-2.5 space-y-6 flex-1">
                        {menuStructure.map((section, idx) => (
                            <div key={idx} className="space-y-1">
                                {/* Cabecera de Categoría */}
                                <span className={`text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-[1.5px] uppercase block px-3 mb-2 transition-all duration-300 ${
                                    isCollapsed ? 'lg:text-center lg:opacity-60 lg:text-[9px]' : ''
                                }`}>
                                    <span className={isCollapsed ? 'lg:hidden' : 'inline'}>{section.category}</span>
                                    <span className={isCollapsed ? 'hidden lg:inline' : 'hidden'}>•••</span>
                                </span>

                                {/* Ítems de la categoría */}
                                {section.items.map((item, itemIdx) => {
                                    // Caso 1: Ítem Simple sin hijos
                                    if (!item.subItems) {
                                        const Icon = item.icon;
                                        const isActive = seccion === item.key || (item.key === 'dashboard' && (!seccion || seccion === 'dashboard'));

                                        return (
                                            <div key={itemIdx} className="relative">
                                                <Link
                                                    href={item.href}
                                                    onClick={() => {
                                                        closePopoverImmediately();
                                                        setSidebarOpen(false);
                                                    }}
                                                    onMouseEnter={e => showTooltip(e, item.label)}
                                                    onMouseLeave={hideTooltip}
                                                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 ${
                                                        isCollapsed ? 'lg:justify-center lg:px-0' : 'px-3'
                                                    } ${
                                                        isActive
                                                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md font-bold'
                                                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`} />
                                                        <span className={`truncate ${isCollapsed ? 'lg:hidden' : 'inline'}`}>{item.label}</span>
                                                    </div>

                                                    {item.count !== null && (
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                                            isCollapsed ? 'lg:hidden' : 'inline-block'
                                                        } ${
                                                            isActive 
                                                                ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900' 
                                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                                        }`}>
                                                            {item.count}
                                                        </span>
                                                    )}
                                                </Link>
                                            </div>
                                        );
                                    }

                                    // Caso 2: Ítem Padre con Submenú Desplegable
                                    const GroupIcon = item.icon;
                                    const isGroupOpen = !!openGroups[item.groupKey];
                                    const hasActiveSubItem = item.subItems.some(sub => sub.key === seccion);
                                    const isPopoverOpen = popoverGroup?.groupKey === item.groupKey;

                                    return (
                                        <div key={itemIdx} className="relative space-y-1">
                                            {/* Botón Padre del grupo */}
                                            <button
                                                type="button"
                                                onClick={e => handleGroupClick(e, item)}
                                                onMouseEnter={e => handleGroupMouseEnter(e, item)}
                                                onMouseLeave={handleGroupMouseLeave}
                                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 cursor-pointer ${
                                                    isCollapsed ? 'lg:justify-center lg:px-0' : 'px-3'
                                                } ${
                                                    (hasActiveSubItem || (isCollapsed && isPopoverOpen))
                                                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs'
                                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <GroupIcon className={`w-5 h-5 shrink-0 ${
                                                        (hasActiveSubItem || (isCollapsed && isPopoverOpen))
                                                            ? 'text-slate-900 dark:text-white' 
                                                            : 'text-slate-500 dark:text-slate-400'
                                                    }`} />
                                                    <span className={`truncate ${isCollapsed ? 'lg:hidden' : 'inline'}`}>{item.label}</span>
                                                </div>

                                                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                                                    isCollapsed ? 'lg:hidden' : 'inline-block'
                                                } ${
                                                    isGroupOpen ? 'rotate-180' : ''
                                                }`} />
                                            </button>

                                            {/* Submenú en estado Expandido (Árbol vertical) */}
                                            {isGroupOpen && (
                                                <div className={`border-l border-slate-200 dark:border-slate-800 ml-5 pl-3 space-y-1 my-1 ${
                                                    isCollapsed ? 'lg:hidden' : 'block'
                                                }`}>
                                                    {item.subItems.map(sub => {
                                                        const SubIcon = sub.icon;
                                                        const isSubActive = seccion === sub.key;

                                                        return (
                                                            <Link
                                                                key={sub.key}
                                                                href={sub.href}
                                                                onClick={() => setSidebarOpen(false)}
                                                                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                                                                    isSubActive
                                                                        ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold shadow-sm'
                                                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/30'
                                                                }`}
                                                            >
                                                                <div className="flex items-center gap-2.5 truncate">
                                                                    <SubIcon className={`w-3.5 h-3.5 shrink-0 ${isSubActive ? 'text-white dark:text-slate-900' : 'text-slate-400'}`} />
                                                                    <span className="truncate">{sub.label}</span>
                                                                </div>

                                                                {sub.count !== undefined && sub.count !== null && (
                                                                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                                                                        isSubActive ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                                                    }`}>
                                                                        {sub.count}
                                                                    </span>
                                                                )}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </nav>
                </div>

                {/* ── Sidebar Footer (Ayuda & Logout) ── */}
                <div className="p-2.5 border-t border-slate-100 dark:border-slate-800/80 space-y-1 bg-slate-50/50 dark:bg-slate-900/50">
                    {/* Botón Ayuda */}
                    <button
                        type="button"
                        onClick={() => alert("Soporte Técnico COLSIH: Contacte a soporte@colsih.edu.co")}
                        onMouseEnter={e => showTooltip(e, 'Ayuda y Soporte')}
                        onMouseLeave={hideTooltip}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer ${
                            isCollapsed ? 'lg:justify-center lg:px-0' : 'px-3'
                        }`}
                        title="Ayuda y Soporte"
                    >
                        <HelpCircle className="w-5 h-5 text-slate-400 shrink-0" />
                        <span className={isCollapsed ? 'lg:hidden' : 'inline'}>Ayuda y Soporte</span>
                    </button>

                    {/* Botón Cerrar Sesión */}
                    <form method="POST" action={`${basePath}/logout`} onSubmit={e => { e.preventDefault(); router.post(`${basePath}/logout`); }}>
                        <button
                            type="submit"
                            onMouseEnter={e => showTooltip(e, 'Cerrar Sesión')}
                            onMouseLeave={hideTooltip}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer ${
                                isCollapsed ? 'lg:justify-center lg:px-0' : 'px-3'
                            }`}
                            title="Cerrar Sesión"
                        >
                            <LogOut className="w-5 h-5 text-rose-500 shrink-0" />
                            <span className={isCollapsed ? 'lg:hidden' : 'inline'}>Cerrar Sesión</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* ── Popover Flotante vía React Portal (Nube flotante fuera del sidebar container) ── */}
            {isCollapsed && popoverGroup && popoverPos && typeof document !== 'undefined' && createPortal(
                <div 
                    style={{ 
                        top: `${popoverPos.top}px`, 
                        left: `${popoverPos.left}px` 
                    }}
                    onMouseEnter={cancelClosePopover}
                    onMouseLeave={handleGroupMouseLeave}
                    className="fixed w-56 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-[9999] space-y-1 animate-fadeIn font-sans"
                >
                    <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                            {popoverGroup.label}
                        </span>
                    </div>

                    {popoverGroup.subItems.map(sub => {
                        const SubIcon = sub.icon;
                        const isSubActive = seccion === sub.key;

                        return (
                            <Link
                                key={sub.key}
                                href={sub.href}
                                onClick={() => {
                                    closePopoverImmediately();
                                    setSidebarOpen(false);
                                }}
                                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                                    isSubActive
                                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-extrabold shadow-sm'
                                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 font-semibold'
                                }`}
                            >
                                <div className="flex items-center gap-2.5 truncate">
                                    <SubIcon className={`w-4 h-4 shrink-0 ${isSubActive ? 'text-white dark:text-slate-900' : 'text-slate-400'}`} />
                                    <span className="truncate">{sub.label}</span>
                                </div>

                                {sub.count !== undefined && sub.count !== null && (
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                                        isSubActive 
                                            ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900' 
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                    }`}>
                                        {sub.count}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>,
                document.body
            )}

            {/* ── Tooltip Flotante vía React Portal (Colapsado) ── */}
            {isCollapsed && tooltipData && typeof document !== 'undefined' && createPortal(
                <div
                    style={{
                        top: `${tooltipData.top}px`,
                        left: `${tooltipData.left}px`
                    }}
                    className="fixed -translate-y-1/2 bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl z-[9999] whitespace-nowrap pointer-events-none animate-fadeIn"
                >
                    {tooltipData.label}
                </div>,
                document.body
            )}
        </>
    );
}
