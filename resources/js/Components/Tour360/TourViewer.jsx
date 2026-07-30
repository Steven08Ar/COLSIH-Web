import { useEffect, useRef, useState } from 'react';
import 'pannellum/src/css/pannellum.css';
import 'pannellum/src/js/libpannellum.js';
import 'pannellum/src/js/pannellum.js';
import { buildPannellumConfig } from '@/utils/pannellumAdapter';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCw, RefreshCw, Compass, X, MapPin } from 'lucide-react';

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
    const [selectedInfoHotspot, setSelectedInfoHotspot] = useState(null);

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
        const config = buildPannellumConfig(
            scenes,
            (targetSlug) => {
                if (onSceneChange) onSceneChange(targetSlug);
            },
            initialSlug,
            (hs) => {
                setSelectedInfoHotspot(hs);
            }
        );

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
        if (viewerRef.current) {
            viewerRef.current.setPitch(0);
            viewerRef.current.setYaw(0);
            viewerRef.current.setHfov(100);
        }
    };

    const toggleAutoRotate = () => {
        if (!viewerRef.current) return;

        if (isAutoRotating) {
            viewerRef.current.stopAutoRotate();
            setIsAutoRotating(false);
        } else {
            viewerRef.current.startAutoRotate(-2);
            setIsAutoRotating(true);
        }
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().then(() => {
                setIsFullscreen(true);
            }).catch(err => {
                console.warn('Fullscreen request failed:', err);
            });
        } else {
            document.exitFullscreen().then(() => {
                setIsFullscreen(false);
            }).catch(err => {
                console.warn('Exit fullscreen failed:', err);
            });
        }
    };

    return (
        <div className={`relative w-full h-full min-h-[450px] bg-slate-950 overflow-hidden select-none group ${className}`}>
            
            {/* Pannellum Container */}
            <div ref={containerRef} className="w-full h-full min-h-[450px]" />

            {/* Custom Minimalist COLSIH Loader */}
            {isLoading && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-xl transition-opacity duration-300">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                        {/* Anillo giratorio de marca: Vinotinto a Azul Rey */}
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#800A15] border-r-[#003c8f] border-b-blue-500 animate-spin"></div>
                        {/* Pulso traslúcido */}
                        <div className="absolute inset-2 rounded-full border-2 border-white/20 animate-ping opacity-25"></div>
                        {/* Badge Central con Icono de Mapa */}
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#800A15] to-[#003c8f] flex items-center justify-center shadow-lg border border-white/30">
                            <MapPin className="w-5 h-5 text-white animate-pulse" />
                        </div>
                    </div>
                    
                    <div className="mt-5 text-center space-y-1">
                        <span className="block text-[11px] font-extrabold tracking-[2px] text-white uppercase font-sans">
                            Colegio Santa Isabel de Hungría
                        </span>
                        <span className="block text-[10px] font-bold tracking-wider text-blue-400 font-sans">
                            Cargando Recorrido 360°...
                        </span>
                    </div>
                </div>
            )}

            {/* Error Overlay */}
            {loadError && (
                <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mb-3">
                        !
                    </div>
                    <h4 className="text-base font-bold text-white mb-1">No se pudo cargar la escena</h4>
                    <p className="text-xs text-slate-400 max-w-sm mb-4">{loadError}</p>
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

            {/* Custom Control Dock */}
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

            {/* FLOATING INFO CARD MODAL IN 360 MODE */}
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
                            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-extrabold text-base">
                                i
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block">Punto Informativo</span>
                                <h4 className="text-base font-extrabold text-white tracking-tight">Información del Espacio</h4>
                            </div>
                        </div>

                        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl text-slate-200 text-sm font-medium leading-relaxed max-h-60 overflow-y-auto">
                            {selectedInfoHotspot.texto || 'No hay descripción detallada para este punto.'}
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
