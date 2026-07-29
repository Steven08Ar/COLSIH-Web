import { useEffect, useRef, useState } from 'react';
import 'pannellum/src/css/pannellum.css';
import 'pannellum/src/js/libpannellum.js';
import 'pannellum/src/js/pannellum.js';
import { buildPannellumConfig } from '@/utils/pannellumAdapter';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCw, RefreshCw, Compass } from 'lucide-react';

export default function TourViewer({
    scenes = [],
    initialSceneSlug = null,
    activeSceneSlug = null,
    onSceneChange = null,
    className = ''
}) {
    const containerRef = useRef(null);
    const viewerRef = useRef(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isAutoRotating, setIsAutoRotating] = useState(false);
    const [loadError, setLoadError] = useState(null);

    const activeSceneData = scenes.find((s) => s.slug === activeSceneSlug) || scenes[0];

    // Initialize & cleanup Pannellum
    useEffect(() => {
        if (!containerRef.current || !scenes || scenes.length === 0) return;

        setIsLoading(true);
        setLoadError(null);

        // Destroy existing instance if any
        if (viewerRef.current) {
            try {
                viewerRef.current.destroy();
            } catch (err) {
                console.warn('Destroying previous pannellum instance:', err);
            }
            viewerRef.current = null;
        }

        const initialSlug = activeSceneSlug || initialSceneSlug || scenes[0]?.slug;
        const config = buildPannellumConfig(scenes, (targetSlug) => {
            if (onSceneChange) onSceneChange(targetSlug);
        }, initialSlug);

        try {
            if (window.pannellum) {
                const viewer = window.pannellum.viewer(containerRef.current, config);
                viewerRef.current = viewer;

                // Event listeners for loader and error handling
                viewer.on('load', () => {
                    setIsLoading(false);
                    setLoadError(null);
                });

                viewer.on('error', (errMsg) => {
                    console.error('Pannellum error:', errMsg);
                    setIsLoading(false);
                    setLoadError(typeof errMsg === 'string' ? errMsg : 'Error al cargar la imagen 360°');
                });

                viewer.on('scenechange', () => {
                    setIsLoading(true);
                    const currentSlug = viewer.getScene();
                    if (onSceneChange && currentSlug && currentSlug !== activeSceneSlug) {
                        onSceneChange(currentSlug);
                    }
                });
            }
        } catch (err) {
            console.error('Failed to initialize Pannellum viewer:', err);
            setIsLoading(false);
            setLoadError('No se pudo inicializar el visor 360°');
        }

        // Cleanup on unmount
        return () => {
            if (viewerRef.current) {
                try {
                    viewerRef.current.destroy();
                } catch (err) {
                    console.warn('Pannellum cleanup on unmount:', err);
                }
                viewerRef.current = null;
            }
        };
    }, [scenes]);

    // Synchronize scene changes from parent (props) without re-initializing Pannellum
    useEffect(() => {
        if (!viewerRef.current || !activeSceneSlug) return;

        try {
            const currentScene = viewerRef.current.getScene();
            if (currentScene && currentScene !== activeSceneSlug) {
                setIsLoading(true);
                viewerRef.current.loadScene(activeSceneSlug);
            }
        } catch (err) {
            console.warn('Error loading scene in Pannellum:', err);
        }
    }, [activeSceneSlug]);

    // Control Handlers
    const handleZoomIn = () => {
        if (viewerRef.current) {
            const currentHfov = viewerRef.current.getHfov();
            viewerRef.current.setHfov(Math.max(30, currentHfov - 15));
        }
    };

    const handleZoomOut = () => {
        if (viewerRef.current) {
            const currentHfov = viewerRef.current.getHfov();
            viewerRef.current.setHfov(Math.min(120, currentHfov + 15));
        }
    };

    const handleResetView = () => {
        if (viewerRef.current && activeSceneData) {
            viewerRef.current.setPitch(Number(activeSceneData.pitch_inicial || 0));
            viewerRef.current.setYaw(Number(activeSceneData.yaw_inicial || 0));
            viewerRef.current.setHfov(Number(activeSceneData.hfov_inicial || 100));
        }
    };

    const toggleAutoRotate = () => {
        if (viewerRef.current) {
            if (isAutoRotating) {
                viewerRef.current.stopAutoRotate();
                setIsAutoRotating(false);
            } else {
                viewerRef.current.startAutoRotate(-2);
                setIsAutoRotating(true);
            }
        }
    };

    const toggleFullscreen = () => {
        if (viewerRef.current) {
            try {
                viewerRef.current.toggleFullWindow();
                setIsFullscreen(!isFullscreen);
            } catch {
                if (!document.fullscreenElement) {
                    containerRef.current?.requestFullscreen?.();
                    setIsFullscreen(true);
                } else {
                    document.exitFullscreen?.();
                    setIsFullscreen(false);
                }
            }
        }
    };

    return (
        <div className={`relative w-full h-full min-h-[500px] bg-slate-950 overflow-hidden rounded-3xl border border-slate-800 shadow-2xl select-none group ${className}`}>
            
            {/* Pannellum DOM Container */}
            <div
                ref={containerRef}
                className="w-full h-full min-h-[500px] z-0"
                style={{ width: '100%', height: '100%' }}
            />

            {/* Skeleton / Loader Overlay */}
            {isLoading && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-md transition-opacity duration-300">
                    <div className="relative flex items-center justify-center mb-6">
                        {/* Outer pulsing ring */}
                        <div className="w-20 h-20 rounded-full border-4 border-blue-500/20 border-t-blue-600 animate-spin"></div>
                        {/* Inner icon */}
                        <Compass className="w-8 h-8 text-blue-500 absolute animate-pulse" />
                    </div>

                    <div className="text-center space-y-2 px-6">
                        <span className="text-xs font-black tracking-[3px] uppercase text-blue-400 block font-sans">
                            RECORRIDO VIRTUAL 360°
                        </span>
                        <h4 className="text-xl font-extrabold text-white font-sans tracking-tight">
                            Cargando {activeSceneData?.nombre || 'espacio'}...
                        </h4>
                        <p className="text-xs font-medium text-slate-400 max-w-sm">
                            Procesando imagen equirrectangular de alta resolución. Por favor espera.
                        </p>
                    </div>
                </div>
            )}

            {/* Error Overlay */}
            {loadError && !isLoading && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/90 p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mb-4">
                        !
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">No se pudo cargar la vista 360°</h4>
                    <p className="text-xs text-slate-400 max-w-md mb-6">{loadError}</p>
                    <button
                        onClick={() => {
                            setIsLoading(true);
                            setLoadError(null);
                            if (viewerRef.current && activeSceneSlug) {
                                viewerRef.current.loadScene(activeSceneSlug);
                            }
                        }}
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reintentar Carga
                    </button>
                </div>
            )}

            {/* Floating Top Info Pill */}
            <div className="absolute top-6 left-6 z-20 pointer-events-none">
                <div className="bg-slate-900/80 border border-white/15 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <div>
                        <span className="block text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
                            {scenes.length > 0 ? `Vista 360° (${scenes.findIndex(s => s.slug === activeSceneSlug) + 1}/${scenes.length})` : 'Vista 360°'}
                        </span>
                        <span className="block text-sm font-black text-white leading-tight font-sans">
                            {activeSceneData?.nombre || 'Espacio Escolar'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Custom Control Dock (Floating Bottom Bar) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-900/80 border border-white/15 backdrop-blur-md px-4 py-2 rounded-2xl shadow-2xl transition-all duration-300 opacity-90 group-hover:opacity-100">
                <button
                    onClick={handleZoomIn}
                    className="p-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/15 transition cursor-pointer"
                    title="Acercar (Zoom In)"
                >
                    <ZoomIn className="w-4 h-4" />
                </button>
                <button
                    onClick={handleZoomOut}
                    className="p-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/15 transition cursor-pointer"
                    title="Alejar (Zoom Out)"
                >
                    <ZoomOut className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-white/20"></div>
                <button
                    onClick={handleResetView}
                    className="p-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/15 transition cursor-pointer"
                    title="Restablecer Ángulo Inicial"
                >
                    <RefreshCw className="w-4 h-4" />
                </button>
                <button
                    onClick={toggleAutoRotate}
                    className={`p-2.5 rounded-xl transition cursor-pointer ${
                        isAutoRotating ? 'bg-blue-600 text-white' : 'text-slate-200 hover:text-white hover:bg-white/15'
                    }`}
                    title={isAutoRotating ? 'Detener Rotación Automática' : 'Iniciar Rotación Automática'}
                >
                    <RotateCw className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-white/20"></div>
                <button
                    onClick={toggleFullscreen}
                    className="p-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/15 transition cursor-pointer"
                    title={isFullscreen ? 'Salir de Pantalla Completa' : 'Pantalla Completa'}
                >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
}
