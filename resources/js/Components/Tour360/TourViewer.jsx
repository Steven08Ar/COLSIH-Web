import { useEffect, useRef, useState } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/virtual-tour-plugin/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import { mediaUrl } from '@/utils/mediaUrl';
import { Maximize2, Minimize2, Plus, Minus, RotateCw, RefreshCw, X, MapPin, Compass } from 'lucide-react';

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;
const MIN_FOV = 30;
const MAX_FOV = 100;
const hfovToZoom = (h) => Math.max(0, Math.min(100, Math.round(((Number(h || 75) - MIN_FOV) / (MAX_FOV - MIN_FOV)) * 100)));

/**
 * Genera el HTML del marcador de navegación estilo Google Maps Street View.
 * Los marcadores se anclan como 2D en coordenadas esféricas exactas (yaw, pitch),
 * rotando con la esfera 360° en lugar de flotar o deslizarse como flechas 3D.
 */
function createGoogleMapsNavMarkerHtml(targetName) {
    return `
    <div class="gmaps-nav-marker">
        <div class="gmaps-nav-halo"></div>
        <div class="gmaps-nav-disc">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#1a73e8" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        </div>
        <div class="gmaps-nav-pill">
            <span style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:11px;font-weight:700;color:#202124;">${targetName}</span>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#1a73e8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </div>
    </div>
    `;
}

/**
 * Genera el HTML del marcador de información estilo Google Maps Place Pin.
 */
function createGoogleMapsInfoMarkerHtml(label) {
    return `
    <div class="gmaps-info-marker">
        <div class="gmaps-info-halo"></div>
        <div class="gmaps-info-disc">
            <span style="color:#ffffff;font-family:system-ui,sans-serif;font-weight:900;font-size:14px;line-height:1;">i</span>
        </div>
        <div class="gmaps-info-pill">
            <span>${label}</span>
        </div>
    </div>
    `;
}

function buildNodes(scenes) {
    return scenes.map((scene) => {
        const markers = [];

        (scene.hotspots || []).forEach((hs) => {
            const yaw = Number(hs.yaw || 0);
            const pitch = Number(hs.pitch || 0);

            if (hs.tipo === 'enlace') {
                const target = scenes.find(s => s.id === hs.scene_destino_id || s.slug === hs.scene_destino_slug);
                const targetSlug = target?.slug || hs.scene_destino_slug || '';
                const targetName = hs.texto || (target ? target.nombre : 'Siguiente espacio');

                if (targetSlug) {
                    markers.push({
                        id: `nav-${hs.id ?? Math.random().toString(36).slice(2)}`,
                        position: {
                            yaw: `${yaw}deg`,
                            pitch: `${pitch}deg`,
                        },
                        html: createGoogleMapsNavMarkerHtml(targetName),
                        anchor: 'center center',
                        data: {
                            tipo: 'enlace',
                            targetSlug,
                            hotspot: hs,
                        },
                    });
                }
            } else {
                const label = hs.texto
                    ? (hs.texto.length > 30 ? hs.texto.substring(0, 30) + '…' : hs.texto)
                    : 'Información';

                markers.push({
                    id: `info-${hs.id ?? Math.random().toString(36).slice(2)}`,
                    position: {
                        yaw: `${yaw}deg`,
                        pitch: `${pitch}deg`,
                    },
                    html: createGoogleMapsInfoMarkerHtml(label),
                    anchor: 'center center',
                    data: {
                        tipo: 'info',
                        hotspot: hs,
                    },
                });
            }
        });

        return {
            id: scene.slug,
            panorama: mediaUrl(scene.imagen_url || scene.imagen_path) || '',
            name: scene.nombre || '',
            // No links para evitar las flechas CSS3D del suelo que se desvían de las coordenadas
            links: [],
            // Todos los puntos están como markers esféricos 100% fijos a sus coordenadas (yaw, pitch)
            markers,
            data: {
                yaw_inicial: Number(scene.yaw_inicial || 0),
                pitch_inicial: Number(scene.pitch_inicial || 0),
                hfov_inicial: scene.hfov_inicial,
                nombre: scene.nombre,
            },
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
    const [currentYawDeg, setCurrentYawDeg] = useState(0);

    useEffect(() => { onSceneChangeRef.current = onSceneChange; }, [onSceneChange]);

    // Inicializar Photo Sphere Viewer
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
        const initialScene = scenes.find(s => s.slug === initialSlug) || scenes[0];

        try {
            const viewer = new Viewer({
                container: containerRef.current,
                defaultYaw: `${Number(initialScene?.yaw_inicial || 0)}deg`,
                defaultPitch: `${Number(initialScene?.pitch_inicial || 0)}deg`,
                defaultZoomLvl: hfovToZoom(initialScene?.hfov_inicial),
                navbar: false,
                loadingImg: null,
                loadingTxt: '',
                plugins: [
                    [VirtualTourPlugin, {
                        nodes,
                        startNodeId: initialSlug,
                        transitionOptions: (toNode) => {
                            const targetScene = scenes.find(s => s.slug === toNode.id);
                            return {
                                showLoader: false,
                                speed: '25rpm',
                                effect: 'fade',
                                rotation: true,
                                // rotateTo expects Position = {yaw, pitch} in RADIANS (not degree strings)
                                rotateTo: {
                                    yaw: Number(targetScene?.yaw_inicial || 0) * DEG_TO_RAD,
                                    pitch: Number(targetScene?.pitch_inicial || 0) * DEG_TO_RAD,
                                },
                                zoomTo: hfovToZoom(targetScene?.hfov_inicial),
                            };
                        },
                    }],
                    [MarkersPlugin, {}],
                ],
            });

            viewerRef.current = viewer;

            const tourPlugin = viewer.getPlugin(VirtualTourPlugin);
            const markersPlugin = viewer.getPlugin(MarkersPlugin);

            tourPlugin.addEventListener('node-changed', () => setIsLoading(false), { once: true });
            viewer.addEventListener('ready', () => setIsLoading(false), { once: true });

            // Rastrear posición de cámara para la brújula dinámica en tiempo real
            viewer.addEventListener('position-updated', ({ position }) => {
                if (position && typeof position.yaw === 'number') {
                    setCurrentYawDeg(Math.round(position.yaw * RAD_TO_DEG));
                }
            });

            // Notificar cambio de escena al padre y restaurar estado
            tourPlugin.addEventListener('node-changed', ({ node }) => {
                setIsLoading(false);
                if (containerRef.current) {
                    containerRef.current.classList.remove('psv-walking-forward');
                }
                if (onSceneChangeRef.current && node?.id) {
                    onSceneChangeRef.current(node.id);
                }
            });

            // Manejar clic en marcadores con transición de avance + zoom cinemático
            let isNavigating = false;
            markersPlugin.addEventListener('select-marker', async ({ marker }) => {
                if (isNavigating) return;

                if (marker.data?.tipo === 'enlace' && marker.data?.targetSlug) {
                    isNavigating = true;
                    const hs = marker.data.hotspot;
                    const targetSlug = marker.data.targetSlug;

                    try {
                        // 1. Efecto cinemático de avance / zoom-in hacia el punto (sensación de caminar)
                        if (hs && viewer) {
                            if (containerRef.current) {
                                containerRef.current.classList.add('psv-walking-forward');
                            }

                            const markerYaw = Number(hs.yaw || 0) * DEG_TO_RAD;
                            const markerPitch = Number(hs.pitch || 0) * DEG_TO_RAD;
                            const currentZoom = viewer.getZoomLevel();

                            // Acercar la cámara rápidamente hacia la dirección del punto
                            await viewer.animate({
                                yaw: markerYaw,
                                pitch: markerPitch,
                                zoom: Math.min(100, Math.max(70, currentZoom + 35)),
                                speed: '55rpm',
                            }).catch(() => {});
                        }

                        // 2. Transición suave de desvanecimiento hacia el nuevo espacio 360°
                        await tourPlugin.setCurrentNode(targetSlug);
                    } catch (err) {
                        tourPlugin.setCurrentNode(targetSlug).catch(() => {});
                    } finally {
                        setTimeout(() => {
                            if (containerRef.current) {
                                containerRef.current.classList.remove('psv-walking-forward');
                            }
                            isNavigating = false;
                        }, 400);
                    }
                } else if (marker.data?.tipo === 'info' && marker.data?.hotspot) {
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

    // Sincronizar escena activa si se cambia desde el exterior
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

    // Controles estilo Google Maps
    const handleZoomIn = () => {
        if (!viewerRef.current) return;
        viewerRef.current.zoom(Math.max(0, viewerRef.current.getZoomLevel() - 15));
    };

    const handleZoomOut = () => {
        if (!viewerRef.current) return;
        viewerRef.current.zoom(Math.min(100, viewerRef.current.getZoomLevel() + 15));
    };

    const handleResetNorth = () => {
        if (!viewerRef.current) return;
        const tourPlugin = viewerRef.current.getPlugin(VirtualTourPlugin);
        let currentId;
        try { currentId = tourPlugin?.getCurrentNode()?.id; } catch (_) {}
        currentId = currentId || activeSceneSlug;
        const scene = scenes.find(s => s.slug === currentId);
        viewerRef.current.animate({
            yaw: Number(scene?.yaw_inicial || 0) * DEG_TO_RAD,
            pitch: Number(scene?.pitch_inicial || 0) * DEG_TO_RAD,
            zoom: hfovToZoom(scene?.hfov_inicial),
            speed: '25rpm',
        });
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
                viewerRef.current.rotate({ yaw: pos.yaw + 0.004, pitch: pos.pitch });
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
        <div className={`relative w-full h-full min-h-[450px] bg-slate-950 overflow-hidden select-none group ${className}`}>

            {/* Contenedor Photo Sphere Viewer */}
            <div ref={containerRef} className="w-full h-full min-h-[450px]" />

            {/* Cargador Google Maps Style */}
            {isLoading && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300">
                    <div className="relative w-14 h-14">
                        <div className="w-14 h-14 rounded-full border-3 border-white/20 border-t-[#1a73e8] animate-spin" />
                    </div>
                    <span className="mt-4 text-xs font-bold text-white/90 tracking-wider uppercase">
                        Cargando Espacio 360°...
                    </span>
                </div>
            )}

            {/* Error Overlay */}
            {loadError && (
                <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mb-3 text-xl font-bold">!</div>
                    <h4 className="text-base font-bold text-white mb-1">No se pudo cargar el espacio</h4>
                    <p className="text-xs text-slate-400 max-w-sm mb-4">{loadError}</p>
                    <button
                        onClick={() => { setIsLoading(true); setLoadError(null); }}
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reintentar
                    </button>
                </div>
            )}

            {/* Barra de Controles Flotante Estilo Google Maps (Esquina inferior derecha) */}
            <div className="absolute bottom-6 right-5 sm:right-6 z-20 flex flex-col items-center gap-2.5 select-none pointer-events-auto">
                {/* Brújula dinámica interactiva orientada al Norte */}
                <button
                    onClick={handleResetNorth}
                    className="w-10 h-10 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer active:scale-95 group"
                    title="Orientar al Norte / Reestablecer encuadre inicial"
                >
                    <div
                        className="w-6 h-6 relative flex items-center justify-center transition-transform duration-75 ease-out"
                        style={{ transform: `rotate(${-currentYawDeg}deg)` }}
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-xs" fill="none">
                            <polygon points="12,2 15.5,12 12,10 8.5,12" fill="#EA4335" />
                            <polygon points="12,22 15.5,12 12,10 8.5,12" fill="#9AA0A6" />
                            <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
                        </svg>
                    </div>
                </button>

                {/* Controles de Zoom (+ / -) apilados */}
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                    <button
                        onClick={handleZoomIn}
                        className="w-10 h-10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer border-b border-slate-200/80 dark:border-slate-800 active:scale-95"
                        title="Acercar (+)"
                    >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                    </button>
                    <button
                        onClick={handleZoomOut}
                        className="w-10 h-10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer active:scale-95"
                        title="Alejar (-)"
                    >
                        <Minus className="w-4 h-4 stroke-[2.5]" />
                    </button>
                </div>

                {/* Controles de Vista (Auto-rotar y Pantalla Completa) */}
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                    <button
                        onClick={toggleAutoRotate}
                        className={`w-10 h-10 flex items-center justify-center transition cursor-pointer active:scale-95 border-b border-slate-200/80 dark:border-slate-800 ${
                            isAutoRotating
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title={isAutoRotating ? 'Detener rotación automática' : 'Giro automático 360°'}
                    >
                        <RotateCw className={`w-4 h-4 stroke-[2.2] ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                    </button>
                    <button
                        onClick={toggleFullscreen}
                        className="w-10 h-10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer active:scale-95"
                        title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
                    >
                        {isFullscreen ? <Minimize2 className="w-4 h-4 stroke-[2.2]" /> : <Maximize2 className="w-4 h-4 stroke-[2.2]" />}
                    </button>
                </div>
            </div>

            {/* Tarjeta de Información Estilo Google Maps Place Sheet */}
            {selectedInfoHotspot && (
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-40 max-w-sm w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-6 text-slate-900 dark:text-white transition-all animate-fadeIn">
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-2xl bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center font-extrabold text-sm shrink-0">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 block">
                                    Punto de Interés
                                </span>
                                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                                    Información del Espacio
                                </h4>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedInfoHotspot(null)}
                            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center justify-center transition cursor-pointer shrink-0"
                            title="Cerrar"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="mt-3.5 bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/80 p-3.5 rounded-2xl text-slate-600 dark:text-slate-300 text-xs font-medium leading-relaxed max-h-56 overflow-y-auto">
                        {selectedInfoHotspot.texto || 'No hay descripción disponible para este punto.'}
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        <button
                            onClick={() => setSelectedInfoHotspot(null)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-md shadow-blue-600/20 cursor-pointer"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
