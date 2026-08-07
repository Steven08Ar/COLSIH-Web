import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
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
    Settings
} from 'lucide-react';

export default function AdminSidebar({
    seccion,
    basePath = '/sih-panel-308',
    sidebarOpen,
    setSidebarOpen,
    isCollapsed,
    setIsCollapsed,
    adminCounts = {},
    user = { name: 'Administrador', role: 'Gestor del Portal' }
}) {
    // Estado para controlar qué acordeones/grupos están expandidos
    const [openGroups, setOpenGroups] = useState({
        contenido: true,
        modulos: true,
    });

    // Popover flotante en estado colapsado
    const [activePopover, setActivePopover] = useState(null);
    const [tooltipItem, setTooltipItem] = useState(null);

    const toggleGroup = (groupKey) => {
        if (isCollapsed) return;
        setOpenGroups(prev => ({ ...prev, [groupKey]: !prev[groupKey] }));
    };

    // Estructura de navegación con categorías y submenús (Estilo Figma Referencia)
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
            ]
        },
        {
            category: 'GESTIÓN',
            items: [
                {
                    groupKey: 'contenido',
                    label: 'Contenido Web',
                    icon: FolderKanban,
                    subItems: [
                        { key: 'noticias', label: 'Noticias y Eventos', icon: Newspaper, href: `${basePath}/noticias`, count: adminCounts?.noticias },
                        { key: 'testimonios', label: 'Testimonios', icon: MessageSquareQuote, href: `${basePath}/testimonios`, count: adminCounts?.testimonios },
                        { key: 'preguntas', label: 'Preguntas Frecuentes', icon: HelpCircle, href: `${basePath}/preguntas`, count: adminCounts?.preguntas },
                        { key: 'builder', label: 'Editor de Páginas', icon: Layout, href: `${basePath}/builder`, count: null },
                    ]
                },
                {
                    groupKey: 'modulos',
                    label: 'Módulos Institucionales',
                    icon: Layers,
                    subItems: [
                        { key: 'carnets-admin', label: 'Tarjetas NFC & Carnets', icon: CreditCard, href: `${basePath}/carnets-admin`, count: adminCounts?.carnets },
                        { key: 'deportes-admin', label: 'Deportes & Torneos', icon: Trophy, href: `${basePath}/deportes-admin`, count: 7 },
                        { key: 'recorrido', label: 'Recorrido Virtual 360°', icon: Compass, href: `${basePath}/recorrido`, count: adminCounts?.scenes },
                        { key: 'equipo', label: 'Equipo Institucional', icon: Users, href: `${basePath}/equipo`, count: adminCounts?.equipo },
                    ]
                }
            ]
        },
        {
            category: 'SISTEMA',
            items: [
                {
                    key: 'mantenimiento',
                    label: 'Servidor / cPanel',
                    icon: Terminal,
                    href: `${basePath}/mantenimiento`,
                    count: 'PHP'
                }
            ]
        }
    ];

    return (
        <aside className={`bg-white dark:bg-[#0E1726] border-r border-slate-200/80 dark:border-slate-800/80 h-screen fixed left-0 top-0 z-50 flex flex-col justify-between transition-all duration-300 ease-in-out ${
            isCollapsed ? 'w-20' : 'w-72'
        } ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}`}>
            
            {/* ── Botón flotante para colapsar/expandir en el borde derecho (Diseño Figma) ── */}
            <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex absolute -right-3.5 top-7 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-transform hover:scale-110 cursor-pointer z-50"
                title={isCollapsed ? "Expandir Menú" : "Colapsar Menú"}
            >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
                
                {/* ── Header Perfil (Avatar + Info + Rol) ── */}
                <div className={`pt-6 pb-4 border-b border-slate-100 dark:border-slate-800/80 transition-all duration-300 ${
                    isCollapsed ? 'px-3 text-center' : 'px-6'
                }`}>
                    <div className="flex items-center gap-3.5">
                        <div className="relative shrink-0">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#800A15] to-[#003C8F] p-0.5 shadow-md">
                                <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center font-black text-sm text-[#800A15] dark:text-blue-400">
                                    {user.name.charAt(0)}
                                </div>
                            </div>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>
                        </div>

                        {!isCollapsed && (
                            <div className="flex flex-col min-w-0">
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider truncate">
                                    {user.role}
                                </span>
                                <span className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                                    {user.name}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Navegación Categorizada ── */}
                <nav className="mt-4 px-3 space-y-6 flex-1">
                    {menuStructure.map((section, idx) => (
                        <div key={idx} className="space-y-1">
                            {/* Cabecera de Categoría */}
                            <span className={`text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-[1.5px] uppercase block px-3 mb-2 transition-all duration-300 ${
                                isCollapsed ? 'text-center opacity-60' : ''
                            }`}>
                                {isCollapsed ? '•••' : section.category}
                            </span>

                            {/* Ítems de la categoría */}
                            {section.items.map((item, itemIdx) => {
                                // Caso 1: Ítem Simple sin hijos
                                if (!item.subItems) {
                                    const Icon = item.icon;
                                    const isActive = seccion === item.key || (item.key === 'dashboard' && (!seccion || seccion === 'dashboard'));

                                    return (
                                        <div key={itemIdx} className="relative group">
                                            <Link
                                                href={item.href}
                                                onClick={() => setSidebarOpen(false)}
                                                onMouseEnter={() => isCollapsed && setTooltipItem(item.label)}
                                                onMouseLeave={() => setTooltipItem(null)}
                                                className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 ${
                                                    isActive
                                                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md font-bold'
                                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`} />
                                                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                                                </div>

                                                {!isCollapsed && item.count !== null && (
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                                        isActive 
                                                            ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900' 
                                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                                    }`}>
                                                        {item.count}
                                                    </span>
                                                )}
                                            </Link>

                                            {/* Tooltip en modo colapsado */}
                                            {isCollapsed && tooltipItem === item.label && (
                                                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl z-50 whitespace-nowrap pointer-events-none animate-fadeIn">
                                                    {item.label}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                // Caso 2: Ítem Padre con Submenú Desplegable
                                const GroupIcon = item.icon;
                                const isGroupOpen = !!openGroups[item.groupKey];
                                const hasActiveSubItem = item.subItems.some(sub => sub.key === seccion);

                                return (
                                    <div key={itemIdx} className="relative space-y-1">
                                        {/* Botón Padre del grupo */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (isCollapsed) {
                                                    setActivePopover(activePopover === item.groupKey ? null : item.groupKey);
                                                } else {
                                                    toggleGroup(item.groupKey);
                                                }
                                            }}
                                            onMouseEnter={() => isCollapsed && setActivePopover(item.groupKey)}
                                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 cursor-pointer ${
                                                (hasActiveSubItem || (isCollapsed && activePopover === item.groupKey))
                                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs'
                                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <GroupIcon className={`w-4 h-4 shrink-0 ${
                                                    (hasActiveSubItem || (isCollapsed && activePopover === item.groupKey))
                                                        ? 'text-slate-900 dark:text-white' 
                                                        : 'text-slate-500 dark:text-slate-400'
                                                }`} />
                                                {!isCollapsed && <span className="truncate">{item.label}</span>}
                                            </div>

                                            {!isCollapsed && (
                                                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                                                    isGroupOpen ? 'rotate-180' : ''
                                                }`} />
                                            )}
                                        </button>

                                        {/* Submenú en estado Expandido (Árbol con conector) */}
                                        {!isCollapsed && isGroupOpen && (
                                            <div className="border-l border-slate-200 dark:border-slate-800 ml-5 pl-3 space-y-1 my-1">
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

                                        {/* Popover Flotante en estado Colapsado (Figma mockup exact layout) */}
                                        {isCollapsed && activePopover === item.groupKey && (
                                            <div 
                                                onMouseEnter={() => setActivePopover(item.groupKey)}
                                                onMouseLeave={() => setActivePopover(null)}
                                                className="absolute left-full ml-3.5 top-0 w-52 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1 animate-fadeIn"
                                            >
                                                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                                        {item.label}
                                                    </span>
                                                </div>

                                                {item.subItems.map(sub => {
                                                    const SubIcon = sub.icon;
                                                    const isSubActive = seccion === sub.key;

                                                    return (
                                                        <Link
                                                            key={sub.key}
                                                            href={sub.href}
                                                            onClick={() => {
                                                                setActivePopover(null);
                                                                setSidebarOpen(false);
                                                            }}
                                                            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                                                                isSubActive
                                                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold shadow-xs'
                                                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40 font-medium'
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-2.5 truncate">
                                                                <SubIcon className={`w-3.5 h-3.5 shrink-0 ${isSubActive ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`} />
                                                                <span className="truncate">{sub.label}</span>
                                                            </div>

                                                            {sub.count !== undefined && sub.count !== null && (
                                                                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                                                                    isSubActive 
                                                                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' 
                                                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
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

            {/* ── Sidebar Footer (Ayuda & Logout en estilo Figma) ── */}
            <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1 bg-slate-50/50 dark:bg-slate-900/50">
                {/* Botón Ayuda */}
                <button
                    type="button"
                    onClick={() => alert("Soporte Técnico COLSIH: Contacte a soporte@colsih.edu.co")}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer ${
                        isCollapsed ? 'justify-center' : ''
                    }`}
                    title="Ayuda y Soporte"
                >
                    <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                    {!isCollapsed && <span>Ayuda y Soporte</span>}
                </button>

                {/* Botón Cerrar Sesión */}
                <form method="POST" action={`${basePath}/logout`} onSubmit={e => { e.preventDefault(); router.post(`${basePath}/logout`); }}>
                    <button
                        type="submit"
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer ${
                            isCollapsed ? 'justify-center' : ''
                        }`}
                        title="Cerrar Sesión"
                    >
                        <LogOut className="w-4 h-4 text-rose-500 shrink-0" />
                        {!isCollapsed && <span>Cerrar Sesión</span>}
                    </button>
                </form>
            </div>
        </aside>
    );
}
