import { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import 'pannellum/src/css/pannellum.css';
import 'pannellum/src/js/libpannellum.js';
import 'pannellum/src/js/pannellum.js';
import { 
    Globe, Image as ImageIcon, MousePointer, MapPin, Sun, Moon, 
    Eye, Save, Trash2, Link as LinkIcon, Info, RotateCcw, RotateCw, 
    MoreVertical, X, Check, Settings, Compass, Layers, Sparkles, Camera
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
        case 'admin.recorrido.scenes.update': return `${adminPrefix}/recorrido/scenes/${params}`;
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
    const [activeTool, setActiveTool] = useState('select'); // 'select' (cursor) | 'hotspot' (location)
    const [viewMode, setViewMode] = useState('360'); // '360' (Pannellum 360) | '2d' (Plano 2:1)
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('sih-dark-mode') === 'true');
    
    const [savingCameraView, setSavingCameraView] = useState(false);
    const [cameraFlashMessage, setCameraFlashMessage] = useState(null);

    // Sincronizar modo oscuro / claro
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('sih-dark-mode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('sih-dark-mode', 'false');
        }
    }, [darkMode]);

    // Guardar Encuadre y Zoom Inicial de la Cámara 360°
    const fijarVistaInicial = () => {
        if (!viewerRef.current) return;
        setSavingCameraView(true);

        const currentYaw = Math.round(viewerRef.current.getYaw() * 100) / 100;
        const currentPitch = Math.round(viewerRef.current.getPitch() * 100) / 100;
        const currentHfov = Math.round(viewerRef.current.getHfov() * 100) / 100;

        router.put(safeRoute('admin.recorrido.scenes.update', scene.id), {
            yaw_inicial: currentYaw,
            pitch_inicial: currentPitch,
            hfov_inicial: currentHfov,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setSavingCameraView(false);
                setCameraFlashMessage('¡Encuadre inicial guardado! Los usuarios verán este ángulo y zoom por defecto.');
                setTimeout(() => setCameraFlashMessage(null), 4000);
            },
            onError: () => {
                setSavingCameraView(false);
            }
        });
    };

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

    // Configurar e inicializar Pannellum en modo Editor 360°
    useEffect(() => {
        if (viewMode !== '360' || !containerRef.current) return;

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

                const containerEl = containerRef.current;
                const handleCanvasClick = (e) => {
                    if (e.target.closest('.pnm-hotspot') || e.target.closest('.custom-hotspot-link-editor') || e.target.closest('.custom-hotspot-info-editor')) {
                        return;
                    }

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
    }, [scene, localHotspots, viewMode]);

    // Clic en la imagen 2:1 para colocar hotspot en plano equirrectangular 2D
    const handle2DCanvasClick = (e) => {
        if (activeTool !== 'hotspot') return;
        if (e.target.closest('.custom-hotspot-link-editor') || e.target.closest('.custom-hotspot-info-editor')) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const width = rect.width;
        const height = rect.height;

        if (width <= 0 || height <= 0) return;

        // Calcular Yaw (-180 a 180) y Pitch (-90 a 90)
        const yaw = (clickX / width) * 360 - 180;
        const pitch = 90 - (clickY / height) * 180;

        abrirCrearHotspot(pitch, yaw);
    };

    // Abrir modal para crear un hotspot
    const abrirCrearHotspot = (pitch, yaw, defaultTipo = 'enlace') => {
        setSelectedHotspot(null);
        form.setData({
            scene_id: scene.id,
            tipo: defaultTipo,
            yaw: Number(pitch ? yaw.toFixed(4) : 0),
            pitch: Number(pitch ? pitch.toFixed(4) : 0),
            texto: '',
            scene_destino_id: '', // NO preseleccionar entrada principal por defecto
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
    const imageSrc = scene.imagen_url || `/storage/${scene.imagen_path}`;

    return (
        <>
            <Head title={`Editor de Recorrido 360° | ${scene.nombre}`} />

            <div className="h-screen w-screen flex bg-slate-100 dark:bg-[#0b0f19] text-slate-800 dark:text-white font-sans overflow-hidden select-none relative transition-colors duration-200">

                {/* ── BARRA LATERAL IZQUIERDA MINIMALISTA ── */}
                <aside className="w-16 bg-white dark:bg-[#090d16] border-r border-slate-200 dark:border-slate-800/80 flex flex-col items-center justify-between py-6 z-30 shrink-0 h-full shadow-sm dark:shadow-none">
                    
                    {/* Top Group: Botón de Alternancia 360° vs Plano 2:1 */}
                    <div className="flex flex-col items-center space-y-4">
                        <button
                            onClick={() => setViewMode(viewMode === '360' ? '2d' : '360')}
                            className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#800A15] to-blue-700 text-white font-black text-xs flex items-center justify-center shadow-lg shadow-rose-950/30 border border-white/20 transition hover:scale-105 active:scale-95 cursor-pointer"
                            title={viewMode === '360' ? 'Cambiar a Vista Plano 2:1' : 'Cambiar a Vista 360°'}
                        >
                            {viewMode === '360' ? <Compass className="w-5 h-5 animate-pulse" /> : <ImageIcon className="w-5 h-5" />}
                        </button>

                        <div className="w-8 h-px bg-slate-200 dark:bg-slate-800/80 my-1" />

                        {/* Herramienta 1: Modo Cursor / Selección */}
                        <button
                            onClick={() => setActiveTool('select')}
                            className={`w-10 h-10 rounded-2xl transition flex items-center justify-center cursor-pointer ${
                                activeTool === 'select'
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                            }`}
                            title="Modo Cursor (Navegación normal)"
                        >
                            <MousePointer className="w-4 h-4" />
                        </button>

                        {/* Herramienta 2: Modo Ubicación / Agregar Puntos */}
                        <button
                            onClick={() => setActiveTool('hotspot')}
                            className={`w-10 h-10 rounded-2xl transition flex items-center justify-center cursor-pointer relative ${
                                activeTool === 'hotspot'
                                    ? 'bg-[#800A15] text-white shadow-md shadow-rose-950/40 scale-105'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                            }`}
                            title="Modo Ubicación (Agregar puntos)"
                        >
                            <MapPin className="w-4 h-4" />
                            {activeTool === 'hotspot' && (
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-[#090d16] animate-ping" />
                            )}
                        </button>

                        {/* Herramienta 3: Fijar Vista / Cámara 360° */}
                        {viewMode === '360' && (
                            <button
                                onClick={fijarVistaInicial}
                                disabled={savingCameraView}
                                className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white transition flex items-center justify-center cursor-pointer active:scale-95 disabled:opacity-50"
                                title="Fijar encuadre y zoom actual como vista por defecto para los usuarios"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                        )}

                        {/* Herramienta 4: Galería de Imágenes */}
                        <button
                            onClick={() => setShowImageList(!showImageList)}
                            className={`w-10 h-10 rounded-2xl transition flex items-center justify-center cursor-pointer ${
                                showImageList
                                    ? 'bg-slate-800 text-white dark:bg-slate-700 shadow-md scale-105'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                            }`}
                            title="Lista de Imágenes"
                        >
                            <Layers className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Bottom Group: Modo Claro / Oscuro */}
                    <div className="flex flex-col items-center space-y-3">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition flex items-center justify-center cursor-pointer"
                            title={darkMode ? 'Modo Luz' : 'Modo Nocturno'}
                        >
                            {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                        </button>
                    </div>
                </aside>

                {/* ── ÁREA PRINCIPAL DE VISUALIZACIÓN ── */}
                <main className="flex-1 relative w-full h-full bg-slate-200 dark:bg-[#050811] overflow-hidden flex items-center justify-center">
                    
                    {/* ── VISTA 1: MODO 360° INTERACTIVO (PANNELLUM) ── */}
                    {viewMode === '360' && (
                        <div ref={containerRef} className="w-full h-full" />
                    )}

                    {/* ── VISTA 2: MODO PLANO 2:1 EQUIRECTANGULAR ── */}
                    {viewMode === '2d' && (
                        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 overflow-auto">
                            <div 
                                className="relative max-w-6xl w-full aspect-[2/1] rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700/80 shadow-2xl bg-slate-900 select-none group/canvas"
                                onClick={handle2DCanvasClick}
                                style={{ cursor: activeTool === 'hotspot' ? 'crosshair' : 'default' }}
                            >
                                <img 
                                    src={imageSrc} 
                                    alt={scene.nombre}
                                    className="w-full h-full object-cover pointer-events-none"
                                />

                                {/* Renderizar Puntos Interactivos Superpuestos sobre el Plano 2:1 */}
                                {localHotspots.map((hs) => {
                                    const isEnlace = hs.tipo === 'enlace';
                                    const leftPct = ((Number(hs.yaw) + 180) / 360) * 100;
                                    const topPct = ((90 - Number(hs.pitch)) / 180) * 100;

                                    const targetScene = allScenes.find((s) => s.id === hs.scene_destino_id);
                                    const previewText = !isEnlace && hs.texto
                                        ? (hs.texto.length > 25 ? hs.texto.substring(0, 25) + '...' : hs.texto)
                                        : (isEnlace ? `Ir a: ${targetScene?.nombre || hs.texto}` : 'Información');

                                    return (
                                        <div
                                            key={`2d-hs-${hs.id}`}
                                            style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                                            className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-transform hover:scale-125 cursor-pointer ${
                                                isEnlace ? 'custom-hotspot-link-editor' : 'custom-hotspot-info-editor'
                                            }`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                abrirEditarHotspot(hs);
                                            }}
                                            title={hs.texto || (isEnlace ? 'Punto de Ruta' : 'Información')}
                                        >
                                            {isEnlace ? (
                                                <div className="hotspot-link-inner">
                                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="18 15 12 9 6 15"></polyline>
                                                    </svg>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="hotspot-info-inner">i</div>
                                                    <div className="hotspot-tooltip-preview">{previewText}</div>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ── BOTONES FLOTANTES SUPERIOR DERECHO MINIMALISTAS ── */}
                    <div className="absolute top-6 right-6 z-30 flex items-center gap-3">
                        {/* Botón para Fijar Vista Inicial (Ángulo y Zoom por defecto) */}
                        {viewMode === '360' && (
                            <button
                                onClick={fijarVistaInicial}
                                disabled={savingCameraView}
                                className="bg-amber-600 hover:bg-amber-700 border border-amber-400/30 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition backdrop-blur-md shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                                title="Establece la vista y zoom actual como los que verán los usuarios por defecto"
                            >
                                <Camera className="w-4 h-4 text-amber-200" />
                                <span>{savingCameraView ? 'Guardando...' : 'Fijar Vista Inicial'}</span>
                            </button>
                        )}

                        <a
                            href={safeRoute('tour.show')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#800A15] hover:bg-[#600710] border border-rose-400/30 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition backdrop-blur-md shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
                        >
                            <Eye className="w-4 h-4 text-rose-200" />
                            <span>Vista previa</span>
                        </a>

                        <Link
                            href={safeRoute('admin.recorrido')}
                            className="bg-blue-600 hover:bg-blue-700 border border-blue-400/30 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition backdrop-blur-md cursor-pointer active:scale-95 flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            <span>Guardar</span>
                        </Link>
                    </div>

                    {/* NOTIFICACIÓN TOAST CUANDO SE GUARDA LA VISTA INICIAL */}
                    {cameraFlashMessage && (
                        <div className="absolute top-20 right-6 z-40 bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce border border-emerald-400/30">
                            <Check className="w-4 h-4" />
                            <span>{cameraFlashMessage}</span>
                        </div>
                    )}

                    {/* MENSAJE FLOTANTE MINIMALISTA DE ESTADO */}
                    {activeTool === 'hotspot' && (
                        <div className="absolute top-6 left-6 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#800A15] text-white text-xs font-bold shadow-lg animate-pulse">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Modo Ubicación</span>
                        </div>
                    )}

                    {/* Indicador de Vista Plano 2:1 */}
                    {viewMode === '2d' && (
                        <div className="absolute top-6 left-24 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-800/80 border border-slate-700 text-white text-xs font-bold shadow-lg backdrop-blur-md">
                            <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                            <span>Plano 2:1</span>
                        </div>
                    )}

                    {/* Loader de Carga */}
                    {isLoading && viewMode === '360' && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md">
                            <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-[#800A15] animate-spin mb-3"></div>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300">
                                Cargando...
                            </span>
                        </div>
                    )}

                    {/* Controles Flotantes Inferiores Izquierda (Sólo en 360°) */}
                    {viewMode === '360' && (
                        <div className="absolute bottom-6 left-6 z-20 flex items-center bg-white/90 dark:bg-[#111827]/90 border border-slate-200 dark:border-slate-800 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden p-1">
                            <button
                                onClick={() => viewerRef.current?.setYaw(viewerRef.current.getYaw() - 15)}
                                className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                                title="Girar Izquierda"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => viewerRef.current?.setYaw(viewerRef.current.getYaw() + 15)}
                                className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                                title="Girar Derecha"
                            >
                                <RotateCw className="w-4 h-4" />
                            </button>
                            <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-1" />
                            <button
                                onClick={() => viewerRef.current?.setHfov(Math.min(120, viewerRef.current.getHfov() + 15))}
                                className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition font-extrabold text-sm"
                                title="Alejar (-)"
                            >
                                －
                            </button>
                            <button
                                onClick={() => viewerRef.current?.setHfov(Math.max(30, viewerRef.current.getHfov() - 15))}
                                className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition font-extrabold text-sm"
                                title="Acercar (+)"
                            >
                                ＋
                            </button>
                        </div>
                    )}

                    {/* Lista de Imágenes Flotante Desplegable */}
                    {showImageList && (
                        <div className="absolute bottom-6 right-6 z-30 w-80 bg-white/95 dark:bg-[#111827]/95 border border-slate-200 dark:border-slate-800 backdrop-blur-xl rounded-2xl p-4 shadow-2xl flex flex-col max-h-[360px] animate-fadeIn">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-800 dark:text-white">
                                        Escenas ({allScenes.length})
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowImageList(false)}
                                    className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                                {allScenes.map((s) => {
                                    const isActive = s.id === scene.id;

                                    return (
                                        <div
                                            key={s.id}
                                            onClick={() => router.get(safeRoute('admin.recorrido.editor', s.id))}
                                            className={`group relative rounded-xl overflow-hidden border transition-all cursor-pointer ${
                                                isActive
                                                    ? 'border-[#800A15] ring-2 ring-[#800A15]/40 shadow-md'
                                                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
                                            }`}
                                        >
                                            <div className="relative h-16 w-full bg-slate-900">
                                                <img
                                                    src={s.imagen_url || `/storage/${s.imagen_path}`}
                                                    alt={s.nombre}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent p-2 flex items-end justify-between">
                                                    <span className="text-xs font-bold text-white truncate max-w-[200px]">
                                                        {s.nombre}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </main>

                {/* ── MODAL FLOTANTE CREAR / EDITAR HOTSPOT ── */}
                {activeModal && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fadeIn"
                        onClick={() => setActiveModal(false)}
                    >
                        <div 
                            className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-5"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-[#800A15]/20 text-[#800A15] dark:text-rose-400 flex items-center justify-center font-bold text-sm">
                                        {selectedHotspot ? '✎' : '+'}
                                    </div>
                                    <h4 className="text-base font-bold tracking-tight">
                                        {selectedHotspot ? 'Editar Punto' : 'Nuevo Punto'}
                                    </h4>
                                </div>
                                <button 
                                    onClick={() => setActiveModal(false)}
                                    className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-white flex items-center justify-center text-sm transition"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={guardarHotspot} className="space-y-4">
                                
                                {/* Coordenadas */}
                                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                                    <span>Coordenadas:</span>
                                    <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                                        Pitch: {form.data.pitch}° | Yaw: {form.data.yaw}°
                                    </span>
                                </div>

                                {/* Selección de Tipo */}
                                <div>
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                                        Tipo *
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => form.setData('tipo', 'enlace')}
                                            className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                                                form.data.tipo === 'enlace'
                                                    ? 'bg-blue-50 dark:bg-blue-600/25 border-blue-500 text-blue-600 dark:text-blue-300 ring-2 ring-blue-500/20'
                                                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                                            }`}
                                        >
                                            <LinkIcon className="w-4 h-4 text-blue-500" />
                                            <span>Ruta</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => form.setData('tipo', 'info')}
                                            className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                                                form.data.tipo === 'info'
                                                    ? 'bg-rose-50 dark:bg-[#800A15]/30 border-[#800A15] text-[#800A15] dark:text-rose-300 ring-2 ring-rose-600/20'
                                                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                                            }`}
                                        >
                                            <Info className="w-4 h-4 text-rose-500" />
                                            <span>Información</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Selección de escena destino con imágenes y nombres */}
                                {form.data.tipo === 'enlace' && (
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Escena Destino *
                                            </label>
                                            <span className="text-[10px] text-slate-400">
                                                Haz clic en una escena
                                            </span>
                                        </div>

                                        {otherScenes.length === 0 ? (
                                            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 rounded-xl text-xs font-medium">
                                                No hay otras escenas disponibles. Agrega más escenas 360° para enlazar.
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-2.5 max-h-52 overflow-y-auto pr-1 custom-scrollbar p-0.5">
                                                {otherScenes.map((s) => {
                                                    const isSelected = String(form.data.scene_destino_id) === String(s.id);
                                                    const sImg = s.imagen_url || `/storage/${s.imagen_path}`;

                                                    return (
                                                        <div
                                                            key={s.id}
                                                            onClick={() => form.setData('scene_destino_id', s.id)}
                                                            className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all flex flex-col ${
                                                                isSelected
                                                                    ? 'border-[#800A15] dark:border-rose-500 ring-2 ring-[#800A15]/40 shadow-md scale-[1.02]'
                                                                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-900'
                                                            }`}
                                                        >
                                                            <div className="relative h-20 w-full bg-slate-900 overflow-hidden">
                                                                <img
                                                                    src={sImg}
                                                                    alt={s.nombre}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                />
                                                                {isSelected && (
                                                                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#800A15] text-white flex items-center justify-center text-[10px] font-black shadow-lg border border-white/40">
                                                                        ✓
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="p-2 bg-white dark:bg-slate-900 flex items-center justify-between">
                                                                <span className={`text-xs font-bold truncate ${isSelected ? 'text-[#800A15] dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}`}>
                                                                    {s.nombre}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Texto */}
                                <div>
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                                        {form.data.tipo === 'enlace' ? 'Texto Tooltip' : 'Descripción *'}
                                    </label>
                                    <textarea
                                        value={form.data.texto}
                                        onChange={(e) => form.setData('texto', e.target.value)}
                                        rows={3}
                                        required={form.data.tipo === 'info'}
                                        placeholder={form.data.tipo === 'enlace' ? 'Ej: Ir al Patio Central' : 'Detalle informativo...'}
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition resize-none font-medium"
                                    />
                                </div>

                                {/* Botones */}
                                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 gap-3">
                                    {selectedHotspot && (
                                        <button
                                            type="button"
                                            onClick={eliminarHotspot}
                                            className="px-4 py-2.5 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-100 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span>Eliminar</span>
                                        </button>
                                    )}

                                    <div className="flex items-center gap-2 ml-auto">
                                        <button
                                            type="button"
                                            onClick={() => setActiveModal(false)}
                                            className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={form.processing}
                                            className="px-5 py-2.5 bg-gradient-to-r from-[#800A15] via-blue-600 to-blue-700 hover:opacity-95 text-white font-bold rounded-xl text-xs transition shadow-md shadow-blue-600/30 disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                                        >
                                            <Check className="w-4 h-4" />
                                            <span>{form.processing ? 'Guardando...' : 'Guardar'}</span>
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
