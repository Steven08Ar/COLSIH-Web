import { useEffect, useRef, useState } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/virtual-tour-plugin/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import { mediaUrl } from '@/utils/mediaUrl';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCw, RefreshCw, X } from 'lucide-react';

const DEG_TO_RAD = Math.PI / 180;
const MIN_FOV = 30;
const MAX_FOV = 100;
const hfovToZoom = (h) => Math.max(0, Math.min(100, Math.round(((Number(h || 75) - MIN_FOV) / (MAX_FOV - MIN_FOV)) * 100)));

const INFO_MARKER_HTML = `<div style="width:34px;height:34px;background:rgba(37,99,235,0.92);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:15px;cursor:pointer;box-shadow:0 0 0 6px rgba(37,99,235,0.22),0 2px 8px rgba(0,0,0,0.45);border:2px solid rgba(255,255,255,0.45);font-family:system-ui,sans-serif;letter-spacing:0;user-select:none">i</div>`;

function buildNodes(scenes) {
    return scenes.map((scene) => {
        const links = [];
        const markers = [];

        (scene.hotspots || []).forEach((hs) => {
            if (hs.tipo === 'enlace') {
                const target = scenes.find(s => s.id === hs.scene_destino_id || s.slug === hs.scene_destino_slug);
                const targetSlug = target?.slug || hs.scene_destino_slug || '';
                if (targetSlug) {
                    links.push({
                        nodeId: targetSlug,
                        position: {
                            yaw: `${Number(hs.yaw || 0)}deg`,
                            pitch: `${Number(hs.pitch || 0)}deg`,
                        },
                        name: hs.texto || (target ? `Ir a ${target.nombre}` : 'Siguiente espacio'),
                    });
                }
            } else {
                markers.push({
                    id: `info-${hs.id ?? Math.random().toString(36).slice(2)}`,
                    position: {
                        yaw: `${Number(hs.yaw || 0)}deg`,
                        pitch: `${Number(hs.pitch || 0)}deg`,
                    },
                    html: INFO_MARKER_HTML,
                    anchor: 'center center',
                    tooltip: hs.texto ? { content: hs.texto.substring(0, 60), position: 'top center' } : undefined,
                    data: { hotspot: hs },
                });
            }
        });

        return {
            id: scene.slug,
            panorama: mediaUrl(scene.imagen_url || scene.imagen_path) || '',
            name: scene.nombre || '',
            links,
            markers,
        };
    });
}

export default function TourViewer({
    scenes = [],
    initialSceneSlug = null,
    activeSceneSlug = null,
    onSceneChange = null,
    className = '',
}) {
    const containerRef = useRef(null);
    const viewerRef = useRef(null);
    const autoRotateRef = useRef(null);
    const onSceneChangeRef = useRef(onSceneChange);

    const [isLoading, setIsLoading] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isAutoRotating, setIsAutoRotating] = useState(false);
    const [loadError, setLoadError] = useState(null);
    const [selectedInfoHotspot, setSelectedInfoHotspot] = useState(null);

    useEffect(() => { onSceneChangeRef.current = onSceneChange; }, [onSceneChange]);

    // Initialize PSV
    useEffect(() => {
        if (!containerRef.current || !scenes || scenes.length === 0) return;

        setIsLoading(true);
        setLoadError(null);

        if (autoRotateRef.current) { clearInterval(autoRotateRef.current); autoRotateRef.current = null; }
        if (viewerRef.current) { try { viewerRef.current.destroy(); } catch (_) {} viewerRef.current = null; }

        const initialSlug = activeSceneSlug
            || initialSceneSlug
            || scenes.find(s => s.es_escena_inicial)?.slug
            || scenes[0]?.slug;

        const nodes = buildNodes(scenes);

        try {
            const viewer = new Viewer({
                container: containerRef.current,
                // No panorama here — VirtualTourPlugin manages all panorama loading via startNodeId
                navbar: false,
                loadingImg: null,
                loadingTxt: '',
                plugins: [
                    [VirtualTourPlugin, {
                        nodes,
                        startNodeId: initialSlug,
                    }],
                    [MarkersPlugin, {}],
                ],
            });

            viewerRef.current = viewer;

            const tourPlugin = viewer.getPlugin(VirtualTourPlugin);
            const markersPlugin = viewer.getPlugin(MarkersPlugin);

            // Use node-changed (fired by VirtualTourPlugin when first panorama loads)
            // as the primary ready signal — more reliable than 'ready' when using VirtualTourPlugin
            tourPlugin.addEventListener('node-changed', () => setIsLoading(false), { once: true });
            // 'ready' as secondary fallback
            viewer.addEventListener('ready', () => setIsLoading(false), { once: true });

            tourPlugin.addEventListener('node-changed', ({ node }) => {
                // Apply stored initial view for this scene
                const scene = scenes.find(s => s.slug === node?.id);
                if (scene) {
                    viewer.rotate({
                        yaw: Number(scene.yaw_inicial || 0) * DEG_TO_RAD,
                        pitch: Number(scene.pitch_inicial || 0) * DEG_TO_RAD,
                    });
                    viewer.zoom(hfovToZoom(scene.hfov_inicial));
                }
                if (onSceneChangeRef.current && node?.id) {
                    onSceneChangeRef.current(node.id);
                }
            });

            markersPlugin.addEventListener('select-marker', ({ marker }) => {
                if (marker.data?.hotspot) {
                    setSelectedInfoHotspot(marker.data.hotspot);
                }
            });
        } catch (err) {
            console.error('PSV init error:', err);
            setIsLoading(false);
            setLoadError('No se pudo inicializar el visor 360°');
        }

        return () => {
            if (autoRotateRef.current) { clearInterval(autoRotateRef.current); autoRotateRef.current = null; }
            if (viewerRef.current) { try { viewerRef.current.destroy(); } catch (_) {} viewerRef.current = null; }
        };
    }, [scenes]);

    // Sync active scene from parent
    useEffect(() => {
        if (!viewerRef.current || !activeSceneSlug) return;
        const tourPlugin = viewerRef.current.getPlugin(VirtualTourPlugin);
        if (!tourPlugin) return;
        try {
            const current = tourPlugin.getCurrentNode();
            if (current?.id && current.id !== activeSceneSlug) {
                tourPlugin.setCurrentNode(activeSceneSlug).catch(() => {});
            }
        } catch (_) {}
    }, [activeSceneSlug]);

    // Control handlers
    const handleZoomIn = () => {
        if (!viewerRef.current) return;
        viewerRef.current.zoom(Math.max(0, viewerRef.current.getZoomLevel() - 20));
    };
    const handleZoomOut = () => {
        if (!viewerRef.current) return;
        viewerRef.current.zoom(Math.min(100, viewerRef.current.getZoomLevel() + 20));
    };
    const handleResetView = () => {
        if (!viewerRef.current) return;
        const tourPlugin = viewerRef.current.getPlugin(VirtualTourPlugin);
        let currentId;
        try { currentId = tourPlugin?.getCurrentNode()?.id; } catch (_) {}
        const scene = scenes.find(s => s.slug === currentId);
        if (scene) {
            viewerRef.current.rotate({
                yaw: Number(scene.yaw_inicial || 0) * DEG_TO_RAD,
                pitch: Number(scene.pitch_inicial || 0) * DEG_TO_RAD,
            });
            viewerRef.current.zoom(hfovToZoom(scene.hfov_inicial));
        }
    };
    const toggleAutoRotate = () => {
        if (!viewerRef.current) return;
        if (isAutoRotating) {
            clearInterval(autoRotateRef.current);
            autoRotateRef.current = null;
            setIsAutoRotating(false);
        } else {
            autoRotateRef.current = setInterval(() => {
                if (!viewerRef.current) return;
                const pos = viewerRef.current.getPosition();
                viewerRef.current.rotate({ yaw: pos.yaw + 0.005, pitch: pos.pitch });
            }, 16);
            setIsAutoRotating(true);
        }
    };
    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
        }
    };

    return (
        <div className={`relative w-full h-full min-h-[450px] bg-[#003C8F] overflow-hidden select-none group ${className}`}>

            {/* PSV Container */}
            <div ref={containerRef} className="w-full h-full min-h-[450px]" />

            {/* Custom Loader */}
            {isLoading && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#003C8F]">
                    <div className="w-16 h-16 rounded-full border-4 border-white/30 border-t-[#800A15] border-r-white animate-spin" />
                </div>
            )}

            {/* Error Overlay */}
            {loadError && (
                <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mb-3 text-xl font-bold">!</div>
                    <h4 className="text-base font-bold text-white mb-1">No se pudo cargar la escena</h4>
                    <p className="text-xs text-slate-400 max-w-sm mb-4">{loadError}</p>
                    <button
                        onClick={() => { setIsLoading(true); setLoadError(null); }}
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reintentar
                    </button>
                </div>
            )}

            {/* Control Dock */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-900/80 border border-white/15 backdrop-blur-md px-4 py-2 rounded-2xl shadow-2xl transition-opacity duration-300 opacity-90 group-hover:opacity-100">
                <button onClick={handleZoomIn} className="p-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/15 transition cursor-pointer" title="Acercar">
                    <ZoomIn className="w-4 h-4" />
                </button>
                <button onClick={handleZoomOut} className="p-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/15 transition cursor-pointer" title="Alejar">
                    <ZoomOut className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-white/20" />
                <button onClick={handleResetView} className="p-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/15 transition cursor-pointer" title="Restablecer vista">
                    <RefreshCw className="w-4 h-4" />
                </button>
                <button
                    onClick={toggleAutoRotate}
                    className={`p-2.5 rounded-xl transition cursor-pointer ${isAutoRotating ? 'bg-blue-600 text-white' : 'text-slate-200 hover:text-white hover:bg-white/15'}`}
                    title={isAutoRotating ? 'Detener rotación' : 'Rotación automática'}
                >
                    <RotateCw className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-white/20" />
                <button onClick={toggleFullscreen} className="p-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/15 transition cursor-pointer" title={isFullscreen ? 'Salir pantalla completa' : 'Pantalla completa'}>
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
            </div>

            {/* Info Hotspot Modal */}
            {selectedInfoHotspot && (
                <div
                    className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4"
                    onClick={() => setSelectedInfoHotspot(null)}
                >
                    <div
                        className="bg-[#0f172a]/95 border border-slate-700/80 text-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl space-y-4 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedInfoHotspot(null)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-extrabold text-base">i</div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block">Punto Informativo</span>
                                <h4 className="text-base font-extrabold text-white tracking-tight">Información del Espacio</h4>
                            </div>
                        </div>
                        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl text-slate-200 text-sm font-medium leading-relaxed max-h-60 overflow-y-auto">
                            {selectedInfoHotspot.texto || 'No hay descripción para este punto.'}
                        </div>
                        <button
                            onClick={() => setSelectedInfoHotspot(null)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl py-3 text-xs transition shadow-lg shadow-blue-600/30 cursor-pointer"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
