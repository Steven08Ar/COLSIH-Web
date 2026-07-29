import { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import 'pannellum/src/css/pannellum.css';
import 'pannellum/src/js/libpannellum.js';
import 'pannellum/src/js/pannellum.js';
import { 
    ChevronLeft, Compass, Eye, Save, Trash2, Plus, 
    Link as LinkIcon, Info, RefreshCw, X, MapPin 
} from 'lucide-react';

export default function HotspotEditor({ tour, scene, hotspots = [], allScenes = [], flash }) {
    // Extrae la base del panel admin (/sih-panel-308) sin depender de Ziggy
    const adminBase = '/' + window.location.pathname.split('/')[1];

    const containerRef = useRef(null);
    const viewerRef = useRef(null);

    const [isLoading, setIsLoading] = useState(true);
    const [localHotspots, setLocalHotspots] = useState(hotspots);
    const [activeModal, setActiveModal] = useState(false);
    const [selectedHotspot, setSelectedHotspot] = useState(null); // null = nuevo, object = editando

    // Coordenadas capturadas del clic
    const [clickCoords, setClickCoords] = useState({ yaw: 0, pitch: 0 });

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

    // Cargar y configurar Pannellum en modo Editor
    useEffect(() => {
        if (!containerRef.current) return;

        setIsLoading(true);

        if (viewerRef.current) {
            try { viewerRef.current.destroy(); } catch (e) { console.warn(e); }
            viewerRef.current = null;
        }

        // Construir hotspots para Pannellum
        const pannellumHotspots = localHotspots.map((hs) => {
            const isEnlace = hs.tipo === 'enlace';
            const targetScene = allScenes.find((s) => s.id === hs.scene_destino_id);
            const labelText = isEnlace
                ? `Ir a: ${targetScene?.nombre || hs.texto || 'Escena'}`
                : hs.texto || 'Información';

            return {
                id: `hs-${hs.id}`,
                pitch: Number(hs.pitch),
                yaw: Number(hs.yaw),
                type: isEnlace ? 'scene' : 'info',
                text: labelText,
                cssClass: isEnlace ? 'custom-hotspot-link' : 'custom-hotspot-info',
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
                    showControls: true,
                    compass: true,
                    hotSpots: pannellumHotspots
                });

                viewerRef.current = viewer;

                viewer.on('load', () => {
                    setIsLoading(false);
                });

                // Escuchar el clic sobre la imagen 360° para capturar [pitch, yaw]
                const containerEl = containerRef.current;
                const handleCanvasClick = (e) => {
                    // Evitar disparar si el clic fue en un elemento de hotspot existente
                    if (e.target.closest('.pnm-hotspot') || e.target.closest('.custom-hotspot-link') || e.target.closest('.custom-hotspot-info')) {
                        return;
                    }

                    if (viewerRef.current) {
                        // Pannellum API para traducir coordenadas del puntero a [pitch, yaw]
                        const coords = viewerRef.current.mouseEventToCoords(e);
                        if (coords && Array.isArray(coords) && coords.length >= 2) {
                            const [pitch, yaw] = coords;
                            // Validar que las coordenadas sean números reales
                            if (!isNaN(pitch) && !isNaN(yaw)) {
                                setClickCoords({ pitch, yaw });
                                abrirCrearHotspot(pitch, yaw);
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
            console.error('Error al iniciar editor Pannellum:', err);
            setIsLoading(false);
        }
    }, [scene, localHotspots]);

    // Abrir modal para crear hotspot en coordenadas de clic
    const abrirCrearHotspot = (pitch, yaw) => {
        setSelectedHotspot(null);
        form.setData({
            scene_id: scene.id,
            tipo: 'enlace',
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

    // Guardar o actualizar hotspot
    const guardarHotspot = (e) => {
        e.preventDefault();

        if (selectedHotspot) {
            form.put(`${adminBase}/hotspots/${selectedHotspot.id}`, {
                onSuccess: () => {
                    setActiveModal(false);
                }
            });
        } else {
            form.post(`${adminBase}/hotspots`, {
                onSuccess: () => {
                    setActiveModal(false);
                }
            });
        }
    };

    // Eliminar hotspot
    const eliminarHotspot = () => {
        if (!selectedHotspot) return;
        if (confirm('¿Estás seguro de eliminar este punto interactivo?')) {
            router.delete(`${adminBase}/hotspots/${selectedHotspot.id}`, {
                onSuccess: () => {
                    setActiveModal(false);
                }
            });
        }
    };

    const otherScenes = allScenes.filter((s) => s.id !== scene.id);

    return (
        <>
            <Head title={`Editor 360° | ${scene.nombre}`} />

            <div className="h-screen w-screen flex flex-col bg-slate-950 text-white font-sans overflow-hidden select-none">
                
                {/* ── HEADER SUPERIOR COMPLETO DE EDICIÓN ── */}
                <header className="h-20 bg-slate-900/90 border-b border-slate-800 px-6 flex items-center justify-between z-30 backdrop-blur-md shrink-0">
                    
                    {/* LADO IZQUIERDO: Navegación & Desplegable de Escenas */}
                    <div className="flex items-center gap-4">
                        <Link
                            href={`${adminBase}/recorrido`}
                            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700"
                            title="Volver al Panel Administrativo"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Link>

                        <div className="h-8 w-px bg-slate-800"></div>

                        {/* Desplegable Selector de Imagen / Escena */}
                        <div className="flex flex-col">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
                                Escena Activa ({allScenes.findIndex(s => s.id === scene.id) + 1}/{allScenes.length})
                            </span>
                            <select
                                value={scene.id}
                                onChange={(e) => {
                                    const nextId = e.target.value;
                                    const nextScene = allScenes.find(s => s.id == nextId);
                                    if (nextScene) {
                                        router.get(`${adminBase}/recorrido/scenes/${nextScene.id}/editor`);
                                    }
                                }}
                                className="bg-slate-800 border border-slate-700 text-white font-bold text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 transition cursor-pointer mt-0.5"
                            >
                                {allScenes.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.nombre} {s.es_escena_inicial ? '⭐ (Inicial)' : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* CENTRO: Instrucción / Herramienta */}
                    <div className="hidden md:flex items-center gap-3 bg-slate-800/80 border border-slate-700/80 px-4 py-2 rounded-2xl text-xs font-semibold text-slate-300">
                        <MapPin className="w-4 h-4 text-blue-400 animate-bounce" />
                        <span>Haz clic sobre cualquier lugar de la imagen 360° para colocar o editar un punto.</span>
                    </div>

                    {/* LADO DERECHO: Acciones & Vista Previa */}
                    <div className="flex items-center gap-3">
                        <a
                            href={`/recorrido-virtual/${tour.slug || 'colsih'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2"
                        >
                            <Eye className="w-4 h-4 text-emerald-400" />
                            <span className="hidden sm:inline">Vista Previa</span>
                        </a>

                        <Link
                            href={`${adminBase}/recorrido`}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition cursor-pointer flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            <span>Guardar y Salir</span>
                        </Link>
                    </div>
                </header>

                {/* ── ÁREA PRINCIPAL CENTRAL Y ABAJO: Visor 360° en Tamaño Total ── */}
                <main className="relative flex-1 w-full h-full bg-slate-950 overflow-hidden">
                    
                    {/* Contenedor Pannellum */}
                    <div ref={containerRef} className="w-full h-full" />

                    {/* Skeleton / Loader de Carga */}
                    {isLoading && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm">
                            <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin mb-4"></div>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                                Cargando Imagen 360°...
                            </span>
                        </div>
                    )}

                    {/* Notificación Flash */}
                    {flash && (
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-2xl shadow-2xl animate-fadeIn">
                            {flash}
                        </div>
                    )}
                </main>

                {/* ── MODAL / POPOVER FLOTANTE DE CONFIGURACIÓN DE HOTSPOT ── */}
                {activeModal && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fadeIn"
                        onClick={() => setActiveModal(false)}
                    >
                        <div 
                            className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-5"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-sm">
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
                                    <span>Coordenadas en Imagen:</span>
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
                                                    ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                                                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                                            }`}
                                        >
                                            <LinkIcon className="w-4 h-4" />
                                            <span>Enlace a Escena</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => form.setData('tipo', 'info')}
                                            className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2.5 transition cursor-pointer ${
                                                form.data.tipo === 'info'
                                                    ? 'bg-amber-600/20 border-amber-500 text-amber-400'
                                                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                                            }`}
                                        >
                                            <Info className="w-4 h-4" />
                                            <span>Información</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Si es Enlace: Selección de escena destino */}
                                {form.data.tipo === 'enlace' && (
                                    <div>
                                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                                            Escena Destino al Hacer Clic *
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
                                        {form.data.tipo === 'enlace' ? 'Texto del Botón / Tooltip' : 'Detalle Informativo *'}
                                    </label>
                                    <textarea
                                        value={form.data.texto}
                                        onChange={(e) => form.setData('texto', e.target.value)}
                                        rows={3}
                                        required={form.data.tipo === 'info'}
                                        placeholder={form.data.tipo === 'enlace' ? 'Ej: Ingresar a la Biblioteca' : 'Escribe la descripción de este espacio...'}
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
                                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/20 disabled:opacity-50 cursor-pointer"
                                        >
                                            {form.processing ? 'Guardando...' : 'Guardar Punto'}
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
