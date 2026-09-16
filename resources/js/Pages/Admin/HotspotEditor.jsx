import { useState, useEffect, useRef, useMemo, memo, startTransition } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { mediaUrl } from '@/utils/mediaUrl';
import { Viewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import {
    Globe, Image as ImageIcon, MousePointer, MapPin, Sun, Moon,
    Eye, Save, Trash2, Link as LinkIcon, Info, RotateCcw, RotateCw,
    MoreVertical, X, Check, Settings, Compass, Layers, Sparkles, Camera, Search, ArrowLeft
} from 'lucide-react';

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;
const MIN_FOV = 30;
const MAX_FOV = 100;
const hfovToZoom = (h) => Math.max(0, Math.min(100, Math.round(((Number(h || 75) - MIN_FOV) / (MAX_FOV - MIN_FOV)) * 100)));
const zoomToHfov = (z) => Math.round(MIN_FOV + (z / 100) * (MAX_FOV - MIN_FOV));

const LINK_MARKER_HTML = `<div style="width:34px;height:34px;background:rgba(16,185,129,0.92);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 0 0 6px rgba(16,185,129,0.22),0 2px 8px rgba(0,0,0,0.45);border:2px solid rgba(255,255,255,0.45)"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg></div>`;
const INFO_MARKER_HTML  = `<div style="width:34px;height:34px;background:rgba(37,99,235,0.92);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:15px;cursor:pointer;box-shadow:0 0 0 6px rgba(37,99,235,0.22),0 2px 8px rgba(0,0,0,0.45);border:2px solid rgba(255,255,255,0.45);font-family:system-ui,sans-serif;letter-spacing:0;user-select:none">i</div>`;

const SceneThumbnail = memo(function SceneThumbnail({ src, alt, imgClassName, containerRef }) {
    const wrapRef = useRef(null);
    const [show, setShow] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el || !src) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setShow(true); obs.disconnect(); } },
            { root: containerRef?.current ?? null, rootMargin: '80px', threshold: 0 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [src, containerRef]);

    return (
        <div ref={wrapRef} className="absolute inset-0 bg-slate-900">
            {!loaded && <div className="absolute inset-0 bg-slate-800 animate-pulse" />}
            {show && (
                <img
                    src={src}
                    alt={alt}
                    decoding="async"
                    onLoad={() => setLoaded(true)}
                    className={`${imgClassName} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                />
            )}
        </div>
    );
});

const safeRoute = (name, params) => {
    if (typeof window !== 'undefined' && typeof window.route === 'function') {
        try { return window.route(name, params); } catch (e) {}
    }
    const adminPrefix = (typeof window !== 'undefined')
        ? '/' + window.location.pathname.split('/').filter(Boolean)[0]
        : '/panel-admin';
    switch (name) {
        case 'admin.recorrido': return `${adminPrefix}/recorrido`;
        case 'admin.recorrido.editor': return `${adminPrefix}/recorrido/scenes/${params}/editor`;
        case 'admin.recorrido.scenes.store': return `${adminPrefix}/recorrido/scenes`;
        case 'admin.recorrido.scenes.update': return `${adminPrefix}/recorrido/scenes/${params}`;
        case 'admin.recorrido.scenes.principal': return `${adminPrefix}/recorrido/scenes/${params}/principal`;
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
    const imageListScrollRef = useRef(null);
    const sceneGridScrollRef = useRef(null);
    const activeToolRef = useRef('select');

    const [isLoading, setIsLoading] = useState(true);
    const [localHotspots, setLocalHotspots] = useState(hotspots);
    const [activeModal, setActiveModal] = useState(false);
    const [selectedHotspot, setSelectedHotspot] = useState(null);
    const [showImageList, setShowImageList] = useState(false);
    const [activeTool, setActiveTool] = useState('select');
    const [viewMode, setViewMode] = useState('360');
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('sih-dark-mode') === 'true');

    const [savingCameraView, setSavingCameraView] = useState(false);
    const [cameraFlashMessage, setCameraFlashMessage] = useState(null);
    const [sceneSearchQuery, setSceneSearchQuery] = useState('');

    const otherScenesList = useMemo(() => allScenes.filter((s) => s.id !== scene.id), [allScenes, scene.id]);
    const filteredScenes = useMemo(() => {
        if (!sceneSearchQuery.trim()) return otherScenesList;
        const q = sceneSearchQuery.toLowerCase();
        return otherScenesList.filter((s) => (s.nombre || '').toLowerCase().includes(q));
    }, [otherScenesList, sceneSearchQuery]);

    // Ref to MarkersPlugin instance and viewer-ready flag — used by marker sync effect
    const markersPluginRef = useRef(null);
    const viewerReadyRef = useRef(false);
    // Always-fresh refs so PSV callbacks never capture stale closures
    const localHotspotsRef = useRef(localHotspots);
    const allScenesRef = useRef(allScenes);
    useEffect(() => { localHotspotsRef.current = localHotspots; }, [localHotspots]);
    useEffect(() => { allScenesRef.current = allScenes; }, [allScenes]);

    useEffect(() => {
        if (darkMode) { document.documentElement.classList.add('dark'); localStorage.setItem('sih-dark-mode', 'true'); }
        else { document.documentElement.classList.remove('dark'); localStorage.setItem('sih-dark-mode', 'false'); }
    }, [darkMode]);

    useEffect(() => { activeToolRef.current = activeTool; }, [activeTool]);
    useEffect(() => { setLocalHotspots(hotspots); }, [hotspots]);

    // Guardar encuadre y zoom inicial de la cámara 360°
    const fijarVistaInicial = () => {
        if (!viewerRef.current) return;
        setSavingCameraView(true);

        const pos = viewerRef.current.getPosition(); // radians
        const zoom = viewerRef.current.getZoomLevel(); // 0-100

        const currentYaw   = Math.round(pos.yaw   * RAD_TO_DEG * 100) / 100;
        const currentPitch = Math.round(pos.pitch  * RAD_TO_DEG * 100) / 100;
        const currentHfov  = zoomToHfov(zoom);

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
            onError: () => { setSavingCameraView(false); }
        });
    };

    const [savingInitialScene, setSavingInitialScene] = useState(false);
    const marcarComoPrincipal = () => {
        setSavingInitialScene(true);
        router.post(safeRoute('admin.recorrido.scenes.principal', scene.id), {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setSavingInitialScene(false);
                setCameraFlashMessage('¡Esta escena fue configurada como la Escena Principal del Recorrido 360°!');
                setTimeout(() => setCameraFlashMessage(null), 4000);
            },
            onError: () => { setSavingInitialScene(false); }
        });
    };

    const form = useForm({
        scene_id: scene.id,
        tipo: 'enlace',
        yaw: 0,
        pitch: 0,
        texto: '',
        scene_destino_id: '',
    });

    // Build marker configs from hotspot data
    const buildMarkerConfigs = (hsList, allScenesList) => hsList.map((hs) => {
        const isEnlace = hs.tipo === 'enlace';
        const targetScene = allScenesList.find((s) => s.id === hs.scene_destino_id);
        const tooltipLabel = isEnlace
            ? `Ir a: ${targetScene?.nombre || hs.texto || 'Escena'}`
            : (hs.texto ? (hs.texto.length > 40 ? hs.texto.substring(0, 40) + '…' : hs.texto) : 'Información');
        return {
            id: `hs-${hs.id}`,
            position: { yaw: `${Number(hs.yaw || 0)}deg`, pitch: `${Number(hs.pitch || 0)}deg` },
            html: isEnlace ? LINK_MARKER_HTML : INFO_MARKER_HTML,
            anchor: 'center center',
            tooltip: { content: tooltipLabel, position: 'top center' },
            data: { hotspot: hs },
        };
    });

    // Initialize PSV only when the scene or view mode actually changes — NOT on hotspot edits
    useEffect(() => {
        if (viewMode !== '360' || !containerRef.current) return;

        setIsLoading(true);
        viewerReadyRef.current = false;
        markersPluginRef.current = null;

        if (viewerRef.current) {
            try { viewerRef.current.destroy(); } catch (_) {}
            viewerRef.current = null;
        }

        const imageSrc = scene.imagen_url || mediaUrl(scene.imagen_path);

        try {
            const viewer = new Viewer({
                container: containerRef.current,
                panorama: imageSrc,
                defaultYaw: `${Number(scene.yaw_inicial || 0)}deg`,
                defaultPitch: `${Number(scene.pitch_inicial || 0)}deg`,
                defaultZoomLvl: hfovToZoom(scene.hfov_inicial),
                navbar: false,
                loadingImg: null,
                loadingTxt: '',
                plugins: [[MarkersPlugin, {}]],
            });

            viewerRef.current = viewer;

            viewer.addEventListener('ready', () => {
                setIsLoading(false);
                const mp = viewer.getPlugin(MarkersPlugin);
                markersPluginRef.current = mp;
                viewerReadyRef.current = true;
                // Add initial markers using always-fresh refs (not stale closure)
                buildMarkerConfigs(localHotspotsRef.current, allScenesRef.current).forEach(m => {
                    try { mp.addMarker(m); } catch (_) {}
                });
                // Wire up marker click → edit
                mp.addEventListener('select-marker', ({ marker }) => {
                    if (marker.data?.hotspot) abrirEditarHotspot(marker.data.hotspot);
                });
            }, { once: true });

            // Click on empty panorama → place hotspot
            viewer.addEventListener('click', ({ data }) => {
                if (activeToolRef.current !== 'hotspot') return;
                if (data?.target?.closest?.('.psv-marker')) return;
                abrirCrearHotspot((data.pitch ?? 0) * RAD_TO_DEG, (data.yaw ?? 0) * RAD_TO_DEG);
            });

            return () => {
                viewerReadyRef.current = false;
                markersPluginRef.current = null;
                if (viewerRef.current) {
                    try { viewerRef.current.destroy(); } catch (_) {}
                    viewerRef.current = null;
                }
            };
        } catch (err) {
            console.error('PSV editor init error:', err);
            setIsLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scene.id, viewMode]); // Only re-init when switching scene or view mode

    // Sync markers in real-time when hotspots change — NO PSV re-init
    useEffect(() => {
        if (!viewerReadyRef.current || !markersPluginRef.current) return;
        const mp = markersPluginRef.current;
        try { mp.clearMarkers(); } catch (_) {}
        buildMarkerConfigs(localHotspots, allScenes).forEach(m => {
            try { mp.addMarker(m); } catch (_) {}
        });
    }, [localHotspots]); // eslint-disable-line react-hooks/exhaustive-deps

    // 2D flat mode click handler
    const handle2DCanvasClick = (e) => {
        if (activeTool !== 'hotspot') return;
        if (e.target.closest('.custom-hotspot-link-editor') || e.target.closest('.custom-hotspot-info-editor')) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const yaw   = ((e.clientX - rect.left) / rect.width) * 360 - 180;
        const pitch = 90 - ((e.clientY - rect.top) / rect.height) * 180;
        abrirCrearHotspot(pitch, yaw);
    };

    const abrirCrearHotspot = (pitch, yaw, defaultTipo = 'enlace') => {
        setSelectedHotspot(null);
        setSceneSearchQuery('');
        form.setData({
            scene_id: scene.id,
            tipo: defaultTipo,
            yaw: Number(yaw ? yaw.toFixed(4) : 0),
            pitch: Number(pitch ? pitch.toFixed(4) : 0),
            texto: '',
            scene_destino_id: '',
        });
        startTransition(() => setActiveModal(true));
    };

    const abrirEditarHotspot = (hs) => {
        setSelectedHotspot(hs);
        setSceneSearchQuery('');
        form.setData({
            scene_id: scene.id,
            tipo: hs.tipo,
            yaw: Number(hs.yaw),
            pitch: Number(hs.pitch),
            texto: hs.texto || '',
            scene_destino_id: hs.scene_destino_id || '',
        });
        startTransition(() => setActiveModal(true));
    };

    const guardarHotspot = (e) => {
        e.preventDefault();
        const opts = {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setActiveModal(false),
        };
        if (selectedHotspot) {
            form.put(safeRoute('admin.hotspots.update', selectedHotspot.id), opts);
        } else {
            form.post(safeRoute('admin.hotspots.store'), opts);
        }
    };

    const eliminarHotspot = () => {
        if (!selectedHotspot) return;
        if (confirm('¿Eliminar este punto interactivo?')) {
            router.delete(safeRoute('admin.hotspots.destroy', selectedHotspot.id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setActiveModal(false),
            });
        }
    };

    const imageSrc = scene.imagen_url || mediaUrl(scene.imagen_path);

    // PSV rotation helpers (radians)
    const psvRotateYaw = (deltaRad) => {
        if (!viewerRef.current) return;
        const pos = viewerRef.current.getPosition();
        viewerRef.current.rotate({ yaw: pos.yaw + deltaRad, pitch: pos.pitch });
    };
    const psvZoom = (delta) => {
        if (!viewerRef.current) return;
        viewerRef.current.zoom(Math.max(0, Math.min(100, viewerRef.current.getZoomLevel() + delta)));
    };

    return (
        <>
            <Head title={`Editor de Recorrido 360° | ${scene.nombre}`} />

            <div className="h-screen w-screen flex bg-slate-100 dark:bg-[#0b0f19] text-slate-800 dark:text-white font-sans overflow-hidden select-none relative transition-colors duration-200">

                {/* ── BARRA LATERAL IZQUIERDA ── */}
                <aside className="w-16 bg-white dark:bg-[#090d16] border-r border-slate-200 dark:border-slate-800/80 flex flex-col items-center justify-between py-6 z-30 shrink-0 h-full shadow-sm dark:shadow-none">
                    <div className="flex flex-col items-center space-y-4">
                        <button
                            onClick={() => setViewMode(viewMode === '360' ? '2d' : '360')}
                            className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#800A15] to-blue-700 text-white font-black text-xs flex items-center justify-center shadow-lg shadow-rose-950/30 border border-white/20 transition hover:scale-105 active:scale-95 cursor-pointer"
                            title={viewMode === '360' ? 'Cambiar a Vista Plano 2:1' : 'Cambiar a Vista 360°'}
                        >
                            {viewMode === '360' ? <Compass className="w-5 h-5 animate-pulse" /> : <ImageIcon className="w-5 h-5" />}
                        </button>

                        <div className="w-8 h-px bg-slate-200 dark:bg-slate-800/80 my-1" />

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

                        {viewMode === '360' && (
                            <button
                                onClick={fijarVistaInicial}
                                disabled={savingCameraView}
                                className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white transition flex items-center justify-center cursor-pointer active:scale-95 disabled:opacity-50"
                                title="Fijar encuadre y zoom actual como vista por defecto"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                        )}

                        <button
                            onClick={() => setShowImageList(!showImageList)}
                            className={`w-10 h-10 rounded-2xl transition flex items-center justify-center cursor-pointer ${
                                showImageList
                                    ? 'bg-slate-800 text-white dark:bg-slate-700 shadow-md scale-105'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                            }`}
                            title="Lista de Escenas"
                        >
                            <Layers className="w-4 h-4" />
                        </button>
                    </div>

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

                {/* ── ÁREA PRINCIPAL ── */}
                <main className="flex-1 relative w-full h-full bg-slate-200 dark:bg-[#050811] overflow-hidden flex items-center justify-center">

                    {/* Vista 360° PSV */}
                    {viewMode === '360' && (
                        <div ref={containerRef} className="w-full h-full" />
                    )}

                    {/* Vista Plano 2:1 */}
                    {viewMode === '2d' && (
                        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 overflow-auto">
                            <div
                                className="relative max-w-6xl w-full aspect-[2/1] rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700/80 shadow-2xl bg-slate-900 select-none group/canvas"
                                onClick={handle2DCanvasClick}
                                style={{ cursor: activeTool === 'hotspot' ? 'crosshair' : 'default' }}
                            >
                                <img src={imageSrc} alt={scene.nombre} className="w-full h-full object-cover pointer-events-none" />

                                {localHotspots.map((hs) => {
                                    const isEnlace = hs.tipo === 'enlace';
                                    const leftPct = ((Number(hs.yaw) + 180) / 360) * 100;
                                    const topPct  = ((90 - Number(hs.pitch)) / 180) * 100;
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
                                            onClick={(e) => { e.stopPropagation(); abrirEditarHotspot(hs); }}
                                            title={hs.texto || (isEnlace ? 'Punto de Ruta' : 'Información')}
                                        >
                                            {isEnlace ? (
                                                <div className="hotspot-link-inner">
                                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="18 15 12 9 6 15" />
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

                    {/* Botones flotantes superiores derechos */}
                    <div className="absolute top-6 right-6 z-30 flex items-center gap-3">
                        <button
                            onClick={marcarComoPrincipal}
                            disabled={savingInitialScene || scene.es_escena_inicial}
                            className={`font-bold text-xs px-4 py-2.5 rounded-xl transition backdrop-blur-md shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 border ${
                                scene.es_escena_inicial
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 cursor-default'
                                    : 'bg-amber-500 hover:bg-amber-600 text-white border-amber-300/40'
                            }`}
                            title={scene.es_escena_inicial ? 'Esta es la imagen principal' : 'Establecer como escena principal'}
                        >
                            <Sparkles className="w-4 h-4 text-amber-200" />
                            <span>{scene.es_escena_inicial ? '⭐ Escena Principal' : 'Marcar Escena Principal'}</span>
                        </button>

                        {viewMode === '360' && (
                            <button
                                onClick={fijarVistaInicial}
                                disabled={savingCameraView}
                                className="bg-amber-600 hover:bg-amber-700 border border-amber-400/30 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition backdrop-blur-md shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                            >
                                <Camera className="w-4 h-4 text-amber-200" />
                                <span>{savingCameraView ? 'Guardando...' : 'Fijar Vista Inicial'}</span>
                            </button>
                        )}

                        <a
                            href={`/recorrido-virtual/${tour?.slug || 'colsih'}?scene=${scene?.slug || ''}&preview=1`}
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

                    {/* Toast */}
                    {cameraFlashMessage && (
                        <div className="absolute top-20 right-6 z-40 bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce border border-emerald-400/30">
                            <Check className="w-4 h-4" />
                            <span>{cameraFlashMessage}</span>
                        </div>
                    )}

                    {/* Indicador modo ubicación */}
                    {activeTool === 'hotspot' && (
                        <div className="absolute top-6 left-6 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#800A15] text-white text-xs font-bold shadow-lg animate-pulse">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Modo Ubicación</span>
                        </div>
                    )}

                    {viewMode === '2d' && (
                        <div className="absolute top-6 left-24 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-800/80 border border-slate-700 text-white text-xs font-bold shadow-lg backdrop-blur-md">
                            <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                            <span>Plano 2:1</span>
                        </div>
                    )}

                    {/* Loader */}
                    {isLoading && viewMode === '360' && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md">
                            <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-[#800A15] animate-spin mb-3" />
                            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300">Cargando...</span>
                        </div>
                    )}

                    {/* Controles inferiores 360° */}
                    {viewMode === '360' && (
                        <div className="absolute bottom-6 left-6 z-20 flex items-center bg-white/90 dark:bg-[#111827]/90 border border-slate-200 dark:border-slate-800 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden p-1">
                            <button
                                onClick={() => psvRotateYaw(-15 * DEG_TO_RAD)}
                                className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                                title="Girar Izquierda"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => psvRotateYaw(15 * DEG_TO_RAD)}
                                className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                                title="Girar Derecha"
                            >
                                <RotateCw className="w-4 h-4" />
                            </button>
                            <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-1" />
                            <button
                                onClick={() => psvZoom(20)}
                                className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition font-extrabold text-sm"
                                title="Alejar (－)"
                            >
                                －
                            </button>
                            <button
                                onClick={() => psvZoom(-20)}
                                className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition font-extrabold text-sm"
                                title="Acercar (＋)"
                            >
                                ＋
                            </button>
                        </div>
                    )}

                    {/* Lista de escenas flotante */}
                    {showImageList && (
                        <div className="absolute bottom-6 right-6 z-30 w-80 bg-white/95 dark:bg-[#111827]/95 border border-slate-200 dark:border-slate-800 backdrop-blur-xl rounded-2xl p-4 shadow-2xl flex flex-col max-h-[360px] animate-fadeIn">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
                                <span className="text-xs font-bold text-slate-800 dark:text-white">Escenas ({allScenes.length})</span>
                                <button onClick={() => setShowImageList(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div ref={imageListScrollRef} className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                                {allScenes.map((s) => (
                                    <div
                                        key={s.id}
                                        onClick={() => router.get(safeRoute('admin.recorrido.editor', s.id))}
                                        className={`group relative rounded-xl overflow-hidden border transition-all cursor-pointer ${
                                            s.id === scene.id
                                                ? 'border-[#800A15] ring-2 ring-[#800A15]/40 shadow-md'
                                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
                                        }`}
                                    >
                                        <div className="relative h-16 w-full bg-slate-900">
                                            <SceneThumbnail
                                                src={s.thumbnail_url || s.imagen_url || `/storage/${s.imagen_path}`}
                                                alt={s.nombre}
                                                imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                containerRef={imageListScrollRef}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent p-2 flex items-end">
                                                <span className="text-xs font-bold text-white truncate max-w-[200px]">{s.nombre}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>

                {/* ── MODAL CREAR / EDITAR HOTSPOT ── */}
                {activeModal && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fadeIn overflow-y-auto"
                        onClick={() => setActiveModal(false)}
                    >
                        <div
                            className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-3xl p-6 sm:p-7 w-full max-w-2xl lg:max-w-3xl shadow-2xl space-y-5 my-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-[#800A15]/20 text-[#800A15] dark:text-rose-400 flex items-center justify-center font-bold text-base">
                                        {selectedHotspot ? '✎' : '+'}
                                    </div>
                                    <div>
                                        <h4 className="text-base font-extrabold tracking-tight">
                                            {selectedHotspot ? 'Editar Punto Interactivo' : 'Nuevo Punto Interactivo'}
                                        </h4>
                                        <span className="text-[11px] text-slate-400">Configura el tipo, destino o información del punto</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveModal(false)}
                                    className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-white flex items-center justify-center transition cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <form onSubmit={guardarHotspot} className="space-y-4">
                                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                                    <span>Coordenadas en la escena 360°:</span>
                                    <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                                        Pitch: {form.data.pitch}° | Yaw: {form.data.yaw}°
                                    </span>
                                </div>

                                <div>
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">Tipo de Punto *</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => form.setData('tipo', 'enlace')}
                                            className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                                                form.data.tipo === 'enlace'
                                                    ? 'bg-blue-50 dark:bg-blue-600/25 border-blue-500 text-blue-600 dark:text-blue-300 ring-2 ring-blue-500/20'
                                                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                                            }`}
                                        >
                                            <LinkIcon className="w-4 h-4 text-blue-500" />
                                            <span>Ruta (Navegación 360°)</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => form.setData('tipo', 'info')}
                                            className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                                                form.data.tipo === 'info'
                                                    ? 'bg-rose-50 dark:bg-[#800A15]/30 border-[#800A15] text-[#800A15] dark:text-rose-300 ring-2 ring-rose-600/20'
                                                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                                            }`}
                                        >
                                            <Info className="w-4 h-4 text-rose-500" />
                                            <span>Información (Ventana flotante)</span>
                                        </button>
                                    </div>
                                </div>

                                {form.data.tipo === 'enlace' && (
                                    <div className="space-y-2.5 pt-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                                            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Escena Destino *</label>
                                            <span className="text-[10px] font-bold text-slate-400">{filteredScenes.length} de {otherScenesList.length} escenas</span>
                                        </div>

                                        {otherScenesList.length > 0 && (
                                            <div className="relative">
                                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="text"
                                                    value={sceneSearchQuery}
                                                    onChange={(e) => setSceneSearchQuery(e.target.value)}
                                                    placeholder="Buscar escena por nombre..."
                                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-xl pl-10 pr-9 py-2.5 text-xs font-bold focus:outline-none focus:border-blue-500 transition"
                                                />
                                                {sceneSearchQuery && (
                                                    <button type="button" onClick={() => setSceneSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        {otherScenesList.length === 0 ? (
                                            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 rounded-xl text-xs font-medium">
                                                No hay otras escenas disponibles. Agrega más escenas 360° para enlazar.
                                            </div>
                                        ) : filteredScenes.length === 0 ? (
                                            <div className="p-5 text-center bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-400 font-bold">
                                                No se encontró ninguna escena que coincida con "{sceneSearchQuery}".
                                            </div>
                                        ) : (
                                            <div ref={sceneGridScrollRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto pr-1 custom-scrollbar p-0.5">
                                                {filteredScenes.map((s) => {
                                                    const isSelected = String(form.data.scene_destino_id) === String(s.id);
                                                    const sImg = s.thumbnail_url || s.imagen_url || `/storage/${s.imagen_path}`;
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
                                                            <div className="relative h-24 w-full bg-slate-900 overflow-hidden">
                                                                <SceneThumbnail
                                                                    src={sImg}
                                                                    alt={s.nombre}
                                                                    imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                    containerRef={sceneGridScrollRef}
                                                                />
                                                                {isSelected && (
                                                                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#800A15] text-white flex items-center justify-center text-xs font-black shadow-lg border border-white/40">✓</div>
                                                                )}
                                                            </div>
                                                            <div className="p-2.5 bg-white dark:bg-slate-900 flex items-center justify-between">
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
