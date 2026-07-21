import React from 'react';
import { 
    ArrowLeft, Type, Heading, Image, Video, Grid, Play, Quote, Minus, 
    Box, Columns, ChevronDown, HelpCircle, MapPin, Code, FileText, 
    Terminal, Star, CreditCard, PlaySquare, Clock, List, ArrowUpDown, 
    Monitor, Tablet, Phone, Eye, EyeOff, Save, CheckCircle
} from 'lucide-react';

const ADD_BUTTONS = [
    { tipo: 'texto', label: 'Texto', icon: Type, color: 'hover:text-blue-600 hover:bg-blue-50/50 border-blue-100' },
    { tipo: 'titulo', label: 'Título', icon: Heading, color: 'hover:text-amber-600 hover:bg-amber-50/50 border-amber-100' },
    { tipo: 'imagen', label: 'Imagen', icon: Image, color: 'hover:text-emerald-600 hover:bg-emerald-50/50 border-emerald-100' },
    { tipo: 'video', label: 'Video', icon: Video, color: 'hover:text-purple-600 hover:bg-purple-50/50 border-purple-100' },
    { tipo: 'galeria', label: 'Galería', icon: Grid, color: 'hover:text-cyan-600 hover:bg-cyan-50/50 border-cyan-100' },
    { tipo: 'boton', label: 'Botón', icon: PlaySquare, color: 'hover:text-indigo-600 hover:bg-indigo-50/50 border-indigo-100' },
    { tipo: 'cita', label: 'Cita', icon: Quote, color: 'hover:text-rose-600 hover:bg-rose-50/50 border-rose-100' },
    { tipo: 'separador', label: 'Línea', icon: Minus, color: 'hover:text-slate-600 hover:bg-slate-50 border-slate-100' },
    { tipo: 'contenedor', label: 'Contenedor', icon: Box, color: 'hover:text-violet-600 hover:bg-violet-50 border-violet-100' },
    { tipo: 'columnas', label: 'Columnas', icon: Columns, color: 'hover:text-orange-600 hover:bg-orange-50 border-orange-100' },
    { tipo: 'acordeon', label: 'Acordeón', icon: ChevronDown, color: 'hover:text-sky-600 hover:bg-sky-50 border-sky-100' },
    { tipo: 'faq', label: 'Preguntas', icon: HelpCircle, color: 'hover:text-teal-600 hover:bg-teal-50 border-teal-100' },
    { tipo: 'mapa', label: 'Mapa', icon: MapPin, color: 'hover:text-pink-600 hover:bg-pink-50 border-pink-100' },
    { tipo: 'html', label: 'HTML', icon: Code, color: 'hover:text-yellow-600 hover:bg-yellow-50 border-yellow-100' },
    { tipo: 'formulario', label: 'Formulario', icon: FileText, color: 'hover:text-lime-600 hover:bg-lime-50 border-lime-100' },
    { tipo: 'codigo', label: 'Código', icon: Terminal, color: 'hover:text-zinc-600 hover:bg-zinc-50 border-zinc-100' },
    { tipo: 'icono', label: 'Ícono', icon: Star, color: 'hover:text-red-600 hover:bg-red-50 border-red-100' },
    { tipo: 'tarjeta', label: 'Tarjeta', icon: CreditCard, color: 'hover:text-teal-600 hover:bg-teal-50 border-teal-100' },
    { tipo: 'carrusel', label: 'Carrusel', icon: Play, color: 'hover:text-indigo-600 hover:bg-indigo-50 border-indigo-100' },
    { tipo: 'timeline', label: 'Línea Temporal', icon: Clock, color: 'hover:text-fuchsia-600 hover:bg-fuchsia-50 border-fuchsia-100' },
    { tipo: 'lista', label: 'Lista', icon: List, color: 'hover:text-blue-600 hover:bg-blue-50 border-blue-100' },
    { tipo: 'espaciador', label: 'Espacio', icon: ArrowUpDown, color: 'hover:text-stone-600 hover:bg-stone-50 border-stone-100' }
];

export default function EditorToolbar({ 
    pageTitle, setPageTitle, 
    status, setStatus, 
    canvasWidth, setCanvasWidth, 
    previewMode, setPreviewMode, 
    onAddBlock, onClose, onSave 
}) {
    return (
        <header className="sticky top-0 bg-white border-b border-slate-200/80 px-6 py-3 flex items-center justify-between shadow-xs z-50 select-none h-[76px] shrink-0">
            
            {/* Left section: Volver + editable title + Status badge */}
            <div className="flex items-center gap-4 shrink-0">
                <button 
                    onClick={onClose} 
                    className="group flex items-center justify-center w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/50 transition duration-200 cursor-pointer"
                    title="Volver al Listado"
                >
                    <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-slate-800 transition duration-150" />
                </button>
                <div className="h-6 w-px bg-slate-200"></div>
                <div>
                    <input 
                        type="text" 
                        value={pageTitle}
                        onChange={(e) => setPageTitle(e.target.value)}
                        placeholder="Sin título de página"
                        className="text-slate-800 font-extrabold text-sm border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none bg-transparent transition py-0.5 px-1 truncate max-w-[200px] lg:max-w-[280px]"
                    />
                    <div className="flex items-center gap-2 mt-0.5 px-1">
                        <select 
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="text-[10px] text-slate-500 font-bold bg-transparent focus:outline-none cursor-pointer hover:text-slate-800"
                        >
                            <option value="draft">Borrador</option>
                            <option value="published">Publicado</option>
                        </select>
                        <span className={`w-1.5 h-1.5 rounded-full ${status === 'published' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
                    </div>
                </div>
            </div>

            {/* Middle section: Add block buttons slider (scrollable horizontally if small) */}
            <div className="flex-1 max-w-[900px] overflow-x-auto mx-4 scrollbar-none px-2 flex items-center gap-1.5 py-1 mask-linear-r select-none">
                {ADD_BUTTONS.map(({ tipo, label, icon: Icon, color }) => (
                    <button
                        key={tipo}
                        type="button"
                        onClick={() => onAddBlock(tipo)}
                        className={`group shrink-0 flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-2 text-[11px] font-bold text-slate-600 rounded-full transition duration-150 active:scale-95 cursor-pointer shadow-2xs ${color}`}
                        title={`Agregar bloque de ${label}`}
                    >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{label}</span>
                    </button>
                ))}
            </div>

            {/* Right section: responsive switches + preview toggle + save */}
            <div className="flex items-center gap-2.5 shrink-0">
                
                {/* Viewport controls */}
                <div className="bg-slate-100 p-0.5 rounded-lg flex items-center border border-slate-200/50">
                    <button 
                        onClick={() => setCanvasWidth('desktop')} 
                        className={`p-1.5 rounded-md transition duration-200 cursor-pointer ${canvasWidth === 'desktop' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-400 hover:text-slate-600'}`}
                        title="Escritorio (1200px)"
                    >
                        <Monitor className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => setCanvasWidth('tablet')} 
                        className={`p-1.5 rounded-md transition duration-200 cursor-pointer ${canvasWidth === 'tablet' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-400 hover:text-slate-600'}`}
                        title="Tablet (768px)"
                    >
                        <Tablet className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => setCanvasWidth('mobile')} 
                        className={`p-1.5 rounded-md transition duration-200 cursor-pointer ${canvasWidth === 'mobile' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-400 hover:text-slate-600'}`}
                        title="Móvil (390px)"
                    >
                        <Phone className="w-4 h-4" />
                    </button>
                </div>

                {/* Preview toggle */}
                <button 
                    onClick={() => setPreviewMode(!previewMode)}
                    className={`p-2 border border-slate-200/50 rounded-xl transition duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-bold ${previewMode ? 'bg-[#003C8F] text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-600'}`}
                    title={previewMode ? 'Salir de Vista Previa' : 'Vista Previa'}
                >
                    {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span className="hidden sm:inline">{previewMode ? 'Editar' : 'Previsualizar'}</span>
                </button>

                <div className="h-6 w-px bg-slate-200"></div>

                {/* Save main CTA */}
                <button 
                    onClick={onSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition duration-150 cursor-pointer active:scale-95 flex items-center gap-1.5"
                >
                    <Save className="w-3.5 h-3.5" />
                    <span>Guardar página</span>
                </button>

            </div>
        </header>
    );
}
