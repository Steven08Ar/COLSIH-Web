import React from 'react';
import {
    ArrowLeft, Type, Heading, Image, Video, Quote, Minus,
    PlaySquare, List, ArrowUpDown, Star,
    Monitor, Tablet, Phone, Eye, EyeOff, Save
} from 'lucide-react';

function HeroIcon(props) {
    return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h10M4 14h7M4 18h5" />
        </svg>
    );
}

const ADD_BUTTONS = [
    { tipo: 'hero',      label: 'Hero',    icon: HeroIcon,   color: 'hover:text-indigo-600 hover:bg-indigo-50/50 border-indigo-100' },
    { tipo: 'texto',     label: 'Texto',   icon: Type,       color: 'hover:text-blue-600 hover:bg-blue-50/50 border-blue-100' },
    { tipo: 'titulo',    label: 'Título',  icon: Heading,    color: 'hover:text-amber-600 hover:bg-amber-50/50 border-amber-100' },
    { tipo: 'imagen',    label: 'Imagen',  icon: Image,      color: 'hover:text-emerald-600 hover:bg-emerald-50/50 border-emerald-100' },
    { tipo: 'video',     label: 'Video',   icon: Video,      color: 'hover:text-purple-600 hover:bg-purple-50/50 border-purple-100' },
    { tipo: 'boton',     label: 'Botón',   icon: PlaySquare, color: 'hover:text-indigo-600 hover:bg-indigo-50/50 border-indigo-100' },
    { tipo: 'cita',      label: 'Cita',    icon: Quote,      color: 'hover:text-rose-600 hover:bg-rose-50/50 border-rose-100' },
    { tipo: 'lista',     label: 'Lista',   icon: List,       color: 'hover:text-cyan-600 hover:bg-cyan-50/50 border-cyan-100' },
    { tipo: 'ficha',     label: 'Ficha',   icon: Star,       color: 'hover:text-teal-600 hover:bg-teal-50 border-teal-100' },
    { tipo: 'separador', label: 'Línea',   icon: Minus,      color: 'hover:text-slate-600 hover:bg-slate-50 border-slate-100' },
    { tipo: 'espaciador',label: 'Espacio', icon: ArrowUpDown,color: 'hover:text-stone-600 hover:bg-stone-50 border-stone-100' },
];

export default function EditorToolbar({ 
    pageTitle, setPageTitle, 
    status, setStatus, 
    canvasWidth, setCanvasWidth, 
    previewMode, setPreviewMode, 
    onAddBlock, onClose, onSave 
}) {
    return (
        <header className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 py-2.5 sm:py-3 shadow-xs z-50 select-none shrink-0 flex flex-col gap-2">
            
            {/* Fila Principal: Volver + Título + Controles de Visualización + Guardar */}
            <div className="flex items-center justify-between gap-2 w-full">
                {/* Left section: Volver + editable title + Status badge */}
                <div className="flex items-center gap-2 sm:gap-3.5 min-w-0 flex-1">
                    <button 
                        onClick={onClose} 
                        className="group flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl border border-slate-200/50 dark:border-slate-700 transition duration-200 cursor-pointer shrink-0"
                        title="Volver al Listado"
                    >
                        <ArrowLeft className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white transition duration-150" />
                    </button>
                    <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 shrink-0"></div>
                    <div className="min-w-0 flex-1">
                        <input 
                            type="text" 
                            value={pageTitle}
                            onChange={(e) => setPageTitle(e.target.value)}
                            placeholder="Sin título de página"
                            className="text-slate-800 dark:text-white font-extrabold text-xs sm:text-sm border-b border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:border-blue-600 focus:outline-none bg-transparent transition py-0.5 px-0.5 truncate w-full max-w-[130px] sm:max-w-[240px] md:max-w-[320px]"
                        />
                        <div className="flex items-center gap-1.5 px-0.5">
                            <select 
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-bold bg-transparent focus:outline-none cursor-pointer hover:text-slate-800 dark:hover:text-slate-200"
                            >
                                <option value="draft" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">Borrador</option>
                                <option value="published" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">Publicado</option>
                            </select>
                            <span className={`w-1.5 h-1.5 rounded-full ${status === 'published' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
                        </div>
                    </div>
                </div>

                {/* Right section: responsive switches + preview toggle + save */}
                <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                    
                    {/* Viewport controls (Desktop only) */}
                    <div className="hidden lg:flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg items-center border border-slate-200/50 dark:border-slate-700">
                        <button 
                            onClick={() => setCanvasWidth('desktop')} 
                            className={`p-1.5 rounded-md transition duration-200 cursor-pointer ${canvasWidth === 'desktop' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-2xs' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                            title="Escritorio (1200px)"
                        >
                            <Monitor className="w-3.5 h-3.5" />
                        </button>
                        <button 
                            onClick={() => setCanvasWidth('tablet')} 
                            className={`p-1.5 rounded-md transition duration-200 cursor-pointer ${canvasWidth === 'tablet' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-2xs' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                            title="Tablet (768px)"
                        >
                            <Tablet className="w-3.5 h-3.5" />
                        </button>
                        <button 
                            onClick={() => setCanvasWidth('mobile')} 
                            className={`p-1.5 rounded-md transition duration-200 cursor-pointer ${canvasWidth === 'mobile' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-2xs' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                            title="Móvil (390px)"
                        >
                            <Phone className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Preview toggle */}
                    <button 
                        onClick={() => setPreviewMode(!previewMode)}
                        className={`p-1.5 sm:p-2 border border-slate-200/50 dark:border-slate-700 rounded-xl transition duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-bold ${previewMode ? 'bg-[#003C8F] text-white' : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
                        title={previewMode ? 'Salir de Vista Previa' : 'Vista Previa'}
                    >
                        {previewMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{previewMode ? 'Editar' : 'Vista'}</span>
                    </button>

                    <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

                    {/* Save main CTA */}
                    <button 
                        onClick={onSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-sm transition duration-150 cursor-pointer active:scale-95 flex items-center gap-1.5"
                    >
                        <Save className="w-3.5 h-3.5" />
                        <span>Guardar</span>
                    </button>

                </div>
            </div>

            {/* Fila Secundaria: Barra de Bloques Desplazable Horizontalmente */}
            {!previewMode && (
                <div className="w-full overflow-x-auto scrollbar-none flex items-center gap-1.5 py-0.5 select-none -mx-1 px-1 border-t border-slate-100 dark:border-slate-800/80 pt-2">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 shrink-0 mr-1 hidden sm:inline">
                        Añadir:
                    </span>
                    {ADD_BUTTONS.map(({ tipo, label, icon: Icon, color }) => (
                        <button
                            key={tipo}
                            type="button"
                            onClick={() => onAddBlock(tipo)}
                            className={`group shrink-0 flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold text-slate-600 dark:text-slate-300 rounded-full transition duration-150 active:scale-95 cursor-pointer shadow-2xs ${color}`}
                            title={`Agregar bloque de ${label}`}
                        >
                            <Icon className="w-3 h-3" />
                            <span>{label}</span>
                        </button>
                    ))}
                </div>
            )}
        </header>
    );
}

