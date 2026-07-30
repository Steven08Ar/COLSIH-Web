import { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import 'pannellum/src/css/pannellum.css';
import 'pannellum/src/js/libpannellum.js';
import 'pannellum/src/js/pannellum.js';
import { 
    Plus, Eye, Save, Trash2, Link as LinkIcon, Info, 
    MousePointer, MapPin, Image as ImageIcon, Settings, 
    RotateCcw, RotateCw, MoreVertical, X, Check
} from 'lucide-react';

const safeRoute = (name, params) => {
    if (typeof window !== 'undefined' && typeof window.route === 'function') {
        try {
            return window.route(name, params);
        } catch (e) {}
    }
    const adminPrefix = (typeof window !== 'undefined' && window.location.pathname.includes('/sih-panel-308'))
        ? '/sih-panel-308'
        : '/panel-admin';

    switch (name) {
        case 'admin.recorrido': return `${adminPrefix}/recorrido`;
        case 'admin.recorrido.editor': return `${adminPrefix}/recorrido/scenes/${params}/editor`;
        case 'admin.recorrido.scenes.store': return `${adminPrefix}/recorrido/scenes`;
        case 'admin.recorrido.scenes.destroy': return `${adminPrefix}/recorrido/scenes/${params}`;
        case 'admin.hotspots.store': return `${adminPrefix}/hotspots`;
        case 'admin.hotspots.update': return `${adminPrefix}/hotspots/${params}`;
        case 'admin.hotspots.destroy': return `${adminPrefix}/hotspots/${params}`;
        case 'tour.show': return '/recorrido-virtual';
        default: return '#';
    }
};

export default function HotspotEditor({ tour, scene, hotspots = [], allScenes = [], flash }) {
    const containerRef = useRef(null);
    const viewerRef = useRef(null);

    const [isLoading, setIsLoading] = useState(true);
    const [localHotspots, setLocalHotspots] = useState(hotspots);
    const [activeModal, setActiveModal] = useState(false);
    const [selectedHotspot, setSelectedHotspot] = useState(null); // null = nuevo, object = editando
    const [showImageList, setShowImageList] = useState(false); // CERRADO por defecto
    const [activeTool, setActiveTool] = useState('select'); // 'select' (cursor por defecto) | 'hotspot' (location)

    const activeToolRef = useRef(activeTool);
    useEffect(() => {
        activeToolRef.current = activeTool;
    }, [activeTool]);

    const form = useForm({
        scene_id: scene.id,
        tipo: 'enlace',
        yaw: 0,
        pitch: 0,
        texto: '',
        scene_destino_id: '',
    });

    useEffect(() => {
        setLocalHotspots(hotspots);
    }, [hotspots]);

    // Configurar e inicializar Pannellum en modo Editor
    useEffect(() => {
        if (!containerRef.current) return;

        setIsLoading(true);

        if (viewerRef.current) {
            try { viewerRef.current.destroy(); } catch (e) { console.warn(e); }
            viewerRef.current = null;
        }

        // Formatear hotspots para Pannellum
        const pannellumHotspots = localHotspots.map((hs) => {
            const isEnlace = hs.tipo === 'enlace';
            const targetScene = allScenes.find((s) => s.id === hs.scene_destino_id);
            const labelText = isEnlace
                ? `Ir a: ${targetScene?.nombre || hs.texto || 'Escena'}`
                : hs.texto || 'Información';

            const previewText = !isEnlace && hs.texto
                ? (hs.texto.length > 28 ? hs.texto.substring(0, 28) + '...' : hs.texto)
                : 'Información';

            return {
                id: `hs-${hs.id}`,
                pitch: Number(hs.pitch),
                yaw: Number(hs.yaw),
                type: isEnlace ? 'scene' : 'info',
                text: labelText,
                cssClass: isEnlace ? 'custom-hotspot-link-editor' : 'custom-hotspot-info-editor',
                createTooltipFunc: (hotSpotDiv) => {
                    hotSpotDiv.innerHTML = isEnlace
                        ? `<div class="hotspot-link-inner"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg></div>`
                        : `<div class="hotspot-info-inner">i</div><div class="hotspot-tooltip-preview">${previewText}</div>`;
                },
                clickHandlerFunc: () => {
                    abrirEditarHotspot(hs);
                }
            };
        });

        const imageSrc = scene.imagen_url || `/storage/${scene.imagen_path}`;

        try {
            if (window.pannellum) {
                const viewer = window.pannellum.viewer(containerRef.current, {
                    type: 'equirectangular',
                    panorama: imageSrc,
                    autoLoad: true,
                    yaw: Number(scene.yaw_inicial || 0),
                    pitch: Number(scene.pitch_inicial || 0),
                    hfov: Number(scene.hfov_inicial || 100),
                    showControls: false,
                    compass: true,
                    hotSpots: pannellumHotspots
                });

                viewerRef.current = viewer;

                viewer.on('load', () => {
                    setIsLoading(false);
                });

                // Escuchar clics sobre el panorama:
                // Si la herramienta activa es 'select' (cursor), SOLO gira y mueve la imagen.
                // Si la herramienta activa es 'hotspot' (location), abre el modal para colocar punto.
                const containerEl = containerRef.current;
                const handleCanvasClick = (e) => {
                    if (e.target.closest('.pnm-hotspot') || e.target.closest('.custom-hotspot-link-editor') || e.target.closest('.custom-hotspot-info-editor')) {
                        return;
                    }

                    // SOLO SI ESTÁ ACTIVA LA HERRAMIENTA LOCATION (MAP PIN)
                    if (activeToolRef.current === 'hotspot') {
                        if (viewerRef.current) {
                            const coords = viewerRef.current.mouseEventToCoords(e);
                            if (coords && Array.isArray(coords) && coords.length >= 2) {
                                const [pitch, yaw] = coords;
                                if (!isNaN(pitch) && !isNaN(yaw)) {
                                    abrirCrearHotspot(pitch, yaw);
                                }
                            }
                        }
                    }
                };

                containerEl.addEventListener('click', handleCanvasClick);

                return () => {
                    containerEl.removeEventListener('click', handleCanvasClick);
                    if (viewerRef.current) {
                        try { viewerRef.current.destroy(); } catch (err) {}
                        viewerRef.current = null;
                    }
                };
            }
        } catch (err) {
            console.error('Error al iniciar visor Pannellum:', err);
            setIsLoading(false);
        }
    }, [scene, localHotspots]);

    // Abrir modal para crear un hotspot
    const abrirCrearHotspot = (pitch, yaw, defaultTipo = 'enlace') => {
        setSelectedHotspot(null);
        form.setData({
            scene_id: scene.id,
            tipo: defaultTipo,
            yaw: Number(yaw.toFixed(4)),
            pitch: Number(pitch.toFixed(4)),
            texto: '',
            scene_destino_id: allScenes.find((s) => s.id !== scene.id)?.id || '',
        });
        setActiveModal(true);
    };

    // Abrir modal para editar hotspot existente
    const abrirEditarHotspot = (hs) => {
        setSelectedHotspot(hs);
        form.setData({
            scene_id: scene.id,
            tipo: hs.tipo,
            yaw: Number(hs.yaw),
            pitch: Number(hs.pitch),
            texto: hs.texto || '',
            scene_destino_id: hs.scene_destino_id || '',
        });
        setActiveModal(true);
    };

    // Guardar / Actualizar
    const guardarHotspot = (e) => {
        e.preventDefault();

        if (selectedHotspot) {
            form.put(safeRoute('admin.hotspots.update', selectedHotspot.id), {
                onSuccess: () => {
                    setActiveModal(false);
                }
            });
        } else {
            form.post(safeRoute('admin.hotspots.store'), {
                onSuccess: () => {
                    setActiveModal(false);
                }
            });
        }
    };

    // Eliminar
    const eliminarHotspot = () => {
        if (!selectedHotspot) return;
        if (confirm('¿Eliminar este punto interactivo?')) {
            router.delete(safeRoute('admin.hotspots.destroy', selectedHotspot.id), {
                onSuccess: () => {
                    setActiveModal(false);
                }
            });
        }
    };

    const otherScenes = allScenes.filter((s) => s.id !== scene.id);

    return (
        <>
            <Head title={`Editor de Recorrido 360° | ${scene.nombre}`} />



            <div className="h-screen w-screen flex bg-[#0b0f19] text-white font-sans overflow-hidden select-none relative">

                {/* ── BARRA LATERAL IZQUIERDA (Centrada Verticalmente en la mitad del sidebar) ── */}
                <aside className="w-16 bg-[#090d16] border-r border-slate-800/80 flex flex-col items-center justify-center space-y-5 z-20 shrink-0 h-full">
                    {/* Top Logo Monogram Badge */}
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#800A15] to-blue-700 text-white font-black text-xs flex items-center justify-center shadow-lg shadow-rose-950/40 border border-white/20 mb-2 select-none">
                        360
                    </div>

                    {/* Opción 1: Cursor (Arrastrar/Mover imagen por defecto) */}
                    <button
                        onClick={() => setActiveTool('select')}
                        className={`p-3 rounded-2xl transition cursor-pointer ${
                            activeTool === 'select'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 scale-105'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                        }`}
                        title="Modo Cursor (Movimiento de imagen por defecto)"
                    >
                        <MousePointer className="w-5 h-5" />
                    </button>

                    {/* Opción 2: Location (Habilita dar clic en la imagen para colocar punto) */}
                    <button
                        onClick={() => setActiveTool('hotspot')}
                        className={`p-3 rounded-2xl transition cursor-pointer relative ${
                            activeTool === 'hotspot'
                                ? 'bg-[#800A15] text-white shadow-lg shadow-rose-950/50 scale-105'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                        }`}
                        title="Modo Ubicación / Agregar Puntos (Haz clic en la imagen 360°)"
                    >
                        <MapPin className="w-5 h-5" />
                        {activeTool === 'hotspot' && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#090d16] animate-ping" />
                        )}
                    </button>

                    {/* Opción 3: Galería (Ver / Ocultar Lista de Imágenes) */}
                    <button
                        onClick={() => setShowImageList(!showImageList)}
                        className={`p-3 rounded-2xl transition cursor-pointer ${
                            showImageList
                                ? 'bg-gradient-to-r from-[#800A15] to-blue-700 text-white shadow-lg shadow-blue-900/40 scale-105'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                        }`}
                        title="Alternar Lista de Imágenes"
                    >
                        <ImageIcon className="w-5 h-5" />
                    </button>

                    <div className="w-6 h-px bg-slate-800/80 my-1" />

                    {/* Opción 4: Ajustes */}
                    <button
                        className="p-3 rounded-2xl text-slate-500 hover:text-slate-300 transition cursor-pointer"
                        title="Configuración"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </aside>

                {/* ── ÁREA DE VISOR 360° PANORAMA EN TAMAÑO TOTAL ── */}
                <main className="flex-1 relative w-full h-full bg-[#050811] overflow-hidden">
                    
                    {/* Contenedor DOM Pannellum */}
                    <div ref={containerRef} className="w-full h-full" />

                    {/* ── BOTONES FLOTANTES ESQUINA SUPERIOR DERECHA (Sin Header) ── */}
                    <div className="absolute top-6 right-6 z-30 flex items-center gap-3">
                        <a
                            href={safeRoute('tour.show')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#800A15] hover:bg-[#600710] border border-rose-400/30 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition backdrop-blur-md shadow-lg shadow-rose-950/40 flex items-center gap-2 cursor-pointer active:scale-95"
                        >
                            <Eye className="w-4 h-4 text-rose-200" />
                            <span>Vista previa</span>
                        </a>

                        <Link
                            href={safeRoute('admin.recorrido')}
                            className="bg-blue-600 hover:bg-blue-700 border border-blue-400/30 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/40 transition backdrop-blur-md cursor-pointer active:scale-95 flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            <span>Guardar recorrido</span>
                        </Link>
                    </div>

                    {/* Indicador de modo activo en pantalla si está en modo Location */}
                    {activeTool === 'hotspot' && (
                        <div className="absolute top-6 left-6 z-30 bg-gradient-to-r from-[#800A15] to-blue-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl backdrop-blur-md shadow-2xl border border-white/20 flex items-center gap-2 animate-bounce">
                            <MapPin className="w-4 h-4" />
                            <span>Modo Ubicación Activo: Haz clic donde quieras colocar el punto.</span>
                        </div>
                    )}

                    {/* Skeleton / Loader de Carga */}
                    {isLoading && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-md">
                            <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-[#800A15] animate-spin mb-4"></div>
                            <span className="text-xs font-black uppercase tracking-[3px] text-blue-400">
                                Cargando Escena 360°...
                            </span>
                        </div>
                    )}

                    {/* Controles Flotantes Inferiores Izquierda (Girar y Zoom) */}
                    <div className="absolute bottom-6 left-6 z-20 flex items-center bg-[#111827]/90 border border-slate-800 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden p-1">
                        <button
                            onClick={() => viewerRef.current?.setYaw(viewerRef.current.getYaw() - 15)}
                            className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition"
                            title="Girar Izquierda"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => viewerRef.current?.setYaw(viewerRef.current.getYaw() + 15)}
                            className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition"
                            title="Girar Derecha"
                        >
                            <RotateCw className="w-4 h-4" />
                        </button>
                        <div className="w-px h-5 bg-slate-800 mx-1" />
                        <button
                            onClick={() => viewerRef.current?.setHfov(Math.min(120, viewerRef.current.getHfov() + 15))}
                            className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition font-extrabold text-sm"
                            title="Alejar (-)"
                        >
                            －
                        </button>
                        <button
                            onClick={() => viewerRef.current?.setHfov(Math.max(30, viewerRef.current.getHfov() - 15))}
                            className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition font-extrabold text-sm"
                            title="Acercar (+)"
                        >
                            ＋
                        </button>
                    </div>

                    {/* Botón flotante para abrir la Lista de Imágenes si está cerrada */}
                    {!showImageList && (
                        <button
                            onClick={() => setShowImageList(true)}
                            className="absolute bottom-6 right-6 z-20 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#800A15] to-blue-700 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition cursor-pointer"
                            title="Ver Lista de Imágenes"
                        >
                            <ImageIcon className="w-6 h-6" />
                        </button>
                    )}

                    {/* Lista de Imágenes Flotante (CERRADA POR DEFECTO, desplegable al dar clic) */}
                    {showImageList && (
                        <div className="absolute bottom-6 right-6 z-20 w-80 bg-[#111827]/95 border border-slate-800 backdrop-blur-xl rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[360px] animate-fadeIn">
                            
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-extrabold text-white tracking-tight">
                                        Lista de imágenes
                                    </span>
                                    <span className="bg-[#800A15] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                                        {allScenes.length}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowImageList(false)}
                                    className="text-slate-400 hover:text-white p-1 rounded-lg"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
                                {allScenes.map((s) => {
                                    const isActive = s.id === scene.id;

                                    return (
                                        <div
                                            key={s.id}
                                            onClick={() => router.get(safeRoute('admin.recorrido.editor', s.id))}
                                            className={`group relative rounded-xl overflow-hidden border transition-all cursor-pointer ${
                                                isActive
                                                    ? 'border-[#800A15] ring-2 ring-[#800A15]/60 shadow-lg'
                                                    : 'border-slate-800 hover:border-slate-600'
                                            }`}
                                        >
                                            <div className="relative h-20 w-full bg-slate-900">
                                                <img
                                                    src={s.imagen_url || `/storage/${s.imagen_path}`}
                                                    alt={s.nombre}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent p-2.5 flex items-end justify-between">
                                                    <span className="text-xs font-bold text-white truncate max-w-[200px]">
                                                        {s.nombre}
                                                    </span>
                                                    <div className="p-1 rounded bg-black/40 text-slate-300 hover:text-white">
                                                        <MoreVertical className="w-3.5 h-3.5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </main>

                {/* ── MODAL / POPOVER FLOTANTE PARA CREAR / EDITAR HOTSPOT ── */}
                {activeModal && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fadeIn"
                        onClick={() => setActiveModal(false)}
                    >
                        <div 
                            className="bg-[#111827] border border-slate-800 text-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-5"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-2xl bg-[#800A15]/20 border border-[#800A15]/40 text-rose-400 flex items-center justify-center font-bold text-sm">
                                        {selectedHotspot ? '✎' : '+'}
                                    </div>
                                    <h4 className="text-base font-extrabold tracking-tight">
                                        {selectedHotspot ? 'Editar Punto Interactivo' : 'Nuevo Punto Interactivo'}
                                    </h4>
                                </div>
                                <button 
                                    onClick={() => setActiveModal(false)}
                                    className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm transition"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={guardarHotspot} className="space-y-4">
                                
                                {/* Coordenadas capturadas */}
                                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                                    <span>Ubicación Exacta:</span>
                                    <span className="font-mono text-blue-400 font-bold">
                                        Pitch: {form.data.pitch}° | Yaw: {form.data.yaw}°
                                    </span>
                                </div>

                                {/* Selección de Tipo */}
                                <div>
                                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                                        Tipo de Punto *
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => form.setData('tipo', 'enlace')}
                                            className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2.5 transition cursor-pointer ${
                                                form.data.tipo === 'enlace'
                                                    ? 'bg-blue-600/25 border-blue-500 text-blue-300 ring-2 ring-blue-500/30'
                                                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                                            }`}
                                        >
                                            <LinkIcon className="w-4 h-4 text-blue-400" />
                                            <span>Punto de Ruta</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => form.setData('tipo', 'info')}
                                            className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2.5 transition cursor-pointer ${
                                                form.data.tipo === 'info'
                                                    ? 'bg-[#800A15]/30 border-[#800A15] text-rose-300 ring-2 ring-rose-600/30'
                                                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                                            }`}
                                        >
                                            <Info className="w-4 h-4 text-rose-400" />
                                            <span>Información</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Si es Enlace: Selección de escena destino */}
                                {form.data.tipo === 'enlace' && (
                                    <div>
                                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                                            Escena a la que salta este punto *
                                        </label>
                                        <select
                                            value={form.data.scene_destino_id}
                                            onChange={(e) => form.setData('scene_destino_id', e.target.value)}
                                            required
                                            className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:border-blue-500 transition"
                                        >
                                            <option value="">-- Seleccionar Escena --</option>
                                            {otherScenes.map((s) => (
                                                <option key={s.id} value={s.id}>
                                                    {s.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Texto o descripción del punto */}
                                <div>
                                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                                        {form.data.tipo === 'enlace' ? 'Texto Tooltip / Botón' : 'Descripción Informativa *'}
                                    </label>
                                    <textarea
                                        value={form.data.texto}
                                        onChange={(e) => form.setData('texto', e.target.value)}
                                        rows={3}
                                        required={form.data.tipo === 'info'}
                                        placeholder={form.data.tipo === 'enlace' ? 'Ej: Ir al Patio Central' : 'Escribe el detalle informativo...'}
                                        className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition resize-none font-medium"
                                    />
                                </div>

                                {/* Botones del Formulario */}
                                <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-3">
                                    {selectedHotspot && (
                                        <button
                                            type="button"
                                            onClick={eliminarHotspot}
                                            className="px-4 py-2.5 bg-rose-600/20 border border-rose-500/40 text-rose-400 hover:bg-rose-600 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span>Eliminar</span>
                                        </button>
                                    )}

                                    <div className="flex items-center gap-3 ml-auto">
                                        <button
                                            type="button"
                                            onClick={() => setActiveModal(false)}
                                            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={form.processing}
                                            className="px-5 py-2.5 bg-gradient-to-r from-[#800A15] via-blue-600 to-blue-700 hover:opacity-95 text-white font-extrabold rounded-xl text-xs transition shadow-lg shadow-blue-900/40 disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                                        >
                                            <Check className="w-4 h-4" />
                                            <span>{form.processing ? 'Guardando...' : 'Guardar Punto'}</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
