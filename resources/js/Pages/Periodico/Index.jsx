import { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { PageFlip } from 'page-flip';
import { 
    ChevronLeft, 
    ChevronRight, 
    ZoomIn, 
    ZoomOut, 
    Volume2, 
    VolumeX, 
    Download, 
    BookOpen
} from 'lucide-react';

const TOTAL_PAGES = 51;
const PDF_URL = '/periodico/PERIODICO%20COLEGIO%20SANTA%20ISABEL%20DE%20HUNGRIA.pdf';

// Array con las rutas de las 51 páginas optimizadas en alta definición
const PAGE_IMAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `/periodico/paginas/pagina_${num}.jpg`;
});

export default function PeriodicoIndex() {
    const bookContainerRef = useRef(null);
    const pageFlipRef = useRef(null);
    const audioCtxRef = useRef(null);

    const [currentPage, setCurrentPage] = useState(0); // 0-indexed
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // Sintetizador Web Audio API para el sonido de paso de hoja de papel real
    const playPaperSound = () => {
        if (!soundEnabled) return;
        try {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            const bufferSize = ctx.sampleRate * 0.22;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1100, ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.2);
            filter.Q.setValueAtTime(1.5, ctx.currentTime);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.01, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.21);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start(ctx.currentTime);
            noise.stop(ctx.currentTime + 0.22);
        } catch (e) {
            // Ignorar si el navegador bloquea audio sin interacción previa
        }
    };

    // Inicializar el libro interactivo StPageFlip con vista de revista abierta (2 páginas)
    useEffect(() => {
        let isMounted = true;
        const container = bookContainerRef.current;
        if (!container) return;

        const timer = setTimeout(() => {
            if (!container || !isMounted) return;

            try {
                container.innerHTML = '';
                const isMobileScreen = window.innerWidth < 768;

                // Configuración de StPageFlip para revista abierta gigante a doble página
                const pageFlip = new PageFlip(container, {
                    width: isMobileScreen ? 420 : 580,
                    height: isMobileScreen ? 680 : 900,
                    size: 'stretch',
                    minWidth: 280,
                    maxWidth: 1650,
                    minHeight: 450,
                    maxHeight: 1400,
                    maxShadowOpacity: 0.35,
                    showCover: false, // Revista siempre abierta a doble página
                    mobileScrollSupport: false,
                    usePortrait: isMobileScreen, // 1 pág en teléfonos, 2 págs abiertas en computadores
                    startPage: 0,
                    drawShadow: true,
                    flippingTime: 750,
                    useMouseEvents: true,
                    swipeDistance: 20,
                    clickEventForward: true
                });

                pageFlip.loadFromImages(PAGE_IMAGES);

                pageFlip.on('init', () => {
                    if (isMounted) {
                        setIsLoading(false);
                    }
                });

                pageFlip.on('flip', (e) => {
                    if (isMounted) {
                        setCurrentPage(e.data);
                        playPaperSound();
                    }
                });

                pageFlipRef.current = pageFlip;
            } catch (err) {
                console.error('Error al inicializar PageFlip:', err);
                if (isMounted) setIsLoading(false);
            }
        }, 150);

        return () => {
            isMounted = false;
            clearTimeout(timer);
            if (pageFlipRef.current) {
                try {
                    pageFlipRef.current.destroy();
                } catch (e) {}
                pageFlipRef.current = null;
            }
        };
    }, []);

    // Manejo de teclado (flechas ← y →)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!pageFlipRef.current) return;
            if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
                e.preventDefault();
                pageFlipRef.current.flipNext();
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                pageFlipRef.current.flipPrev();
            } else if (e.key === 'Home') {
                e.preventDefault();
                pageFlipRef.current.turnToPage(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                pageFlipRef.current.turnToPage(TOTAL_PAGES - 1);
            } else if (e.key === 'Escape') {
                if (zoomLevel > 1) setZoomLevel(1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [zoomLevel]);

    const flipNext = () => {
        if (pageFlipRef.current) pageFlipRef.current.flipNext();
    };

    const flipPrev = () => {
        if (pageFlipRef.current) pageFlipRef.current.flipPrev();
    };

    const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.2));
    const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.8));
    const resetZoom = () => setZoomLevel(1);

    return (
        <AppLayout>
            <Head>
                <title>Periódico Escolar Abierto · Colegio Santa Isabel de Hungría</title>
                <meta 
                    name="description" 
                    content="Edición especial interactiva del Periódico Escolar del Colegio Santa Isabel de Hungría. Revista abierta en 3D a doble página con animación de papel." 
                />
            </Head>

            {/* Estilos CSS dedicados: SOMBRA PROFUNDA REALISTA EXCLUSIVA PARA EL PERIÓDICO */}
            <style>{`
                #flipbook-root {
                    filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.28)) 
                            drop-shadow(0 10px 20px rgba(0, 0, 0, 0.14))
                            drop-shadow(0 2px 6px rgba(0, 0, 0, 0.08));
                }
                #flipbook-root .stf__parent {
                    box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.35) !important;
                }
                #flipbook-root .stf__item {
                    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
                }
            `}</style>

            {/* Contenedor Principal Inmersivo a Pantalla Completa con FONDO 100% BLANCO PURO */}
            <div className="relative w-full h-[100dvh] bg-white text-slate-800 flex flex-col justify-between overflow-hidden select-none">
                
                {/* Barra Superior Minimalista Blanca */}
                <div className="relative z-30 pt-9 sm:pt-11 pb-1 px-4 sm:px-8 flex items-center justify-between text-xs bg-white">
                    <div className="flex items-center gap-2.5">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-800 font-semibold text-[11px] shadow-sm">
                            <BookOpen className="w-3.5 h-3.5 text-red-600" />
                            <span>Periódico Escolar COLSIH</span>
                        </span>
                        <span className="hidden sm:inline-block text-slate-400">·</span>
                        <span className="hidden sm:inline-block text-[11px] text-slate-500 font-medium">
                            Revista Abierta · Doble Página
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Botón Descarga directa del PDF original */}
                        <a
                            href={PDF_URL}
                            download="PERIODICO COLEGIO SANTA ISABEL DE HUNGRIA.pdf"
                            className="px-3.5 py-1 rounded-full bg-[#08111F] hover:bg-red-700 text-white font-bold text-[11px] tracking-wide shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
                            title="Descargar el PDF completo (18.9 MB)"
                        >
                            <Download className="w-3.5 h-3.5" />
                            <span className="hidden xs:inline">Descargar PDF</span>
                        </a>
                    </div>
                </div>

                {/* ========================================================
                    ÁREA CENTRAL: REVISTA ABIERTA GIGANTE A PANTALLA COMPLETA
                    ======================================================== */}
                <div className="relative flex-grow flex items-center justify-center px-1 sm:px-4 md:px-8 overflow-hidden bg-white">
                    
                    {/* Flecha Lateral Flotante Izquierda para pasar hojas */}
                    <button
                        onClick={flipPrev}
                        disabled={currentPage === 0}
                        className={`absolute left-2 sm:left-5 md:left-7 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group ${
                            currentPage === 0 ? 'opacity-20 pointer-events-none' : 'opacity-95 hover:opacity-100'
                        }`}
                        title="Página Anterior (Flecha Izquierda)"
                    >
                        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform text-slate-800" />
                    </button>

                    {/* Contenedor del Libro que Ocupa Casi Todo el Viewport */}
                    <div 
                        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
                        style={{
                            transform: `scale(${zoomLevel})`,
                            transformOrigin: 'center center'
                        }}
                    >
                        {/* Indicador de Carga */}
                        {isLoading && (
                            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-white/95 rounded-2xl p-6 text-center space-y-3">
                                <div className="w-14 h-14 rounded-full border-4 border-slate-200 border-t-red-600 animate-spin" />
                                <div className="space-y-0.5">
                                    <h3 className="text-sm font-bold text-slate-900">
                                        Abriendo Periódico Escolar...
                                    </h3>
                                    <p className="text-xs text-slate-500 font-light">
                                        Cargando vista a doble página
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Elemento raíz de StPageFlip: ¡Ocupa casi toda la pantalla con sombra profunda en el libro! */}
                        <div 
                            ref={bookContainerRef} 
                            id="flipbook-root"
                            className="w-[96vw] max-w-[1550px] h-[88vh] max-h-[960px] cursor-grab active:cursor-grabbing"
                        />
                    </div>

                    {/* Flecha Lateral Flotante Derecha para pasar hojas */}
                    <button
                        onClick={flipNext}
                        disabled={currentPage >= TOTAL_PAGES - 1}
                        className={`absolute right-2 sm:right-5 md:right-7 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group ${
                            currentPage >= TOTAL_PAGES - 1 ? 'opacity-20 pointer-events-none' : 'opacity-95 hover:opacity-100'
                        }`}
                        title="Página Siguiente (Flecha Derecha)"
                    >
                        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform text-slate-800" />
                    </button>

                </div>

                {/* ========================================================
                    ESQUINA INFERIOR IZQUIERDA: BOTÓN DE SILENCIAR
                    ======================================================== */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-30">
                    <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className={`p-2.5 sm:px-3.5 sm:py-2 rounded-full bg-white border border-slate-200 shadow-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                            soundEnabled ? 'text-slate-700 hover:text-black hover:bg-slate-50' : 'text-red-600 bg-red-50/50'
                        }`}
                        title={soundEnabled ? "Silenciar sonido de papel" : "Activar sonido de pasar hoja"}
                    >
                        {soundEnabled ? (
                            <>
                                <Volume2 className="w-4 h-4 text-slate-700" />
                                <span className="hidden sm:inline text-xs font-medium text-slate-700">Sonido</span>
                            </>
                        ) : (
                            <>
                                <VolumeX className="w-4 h-4 text-red-600" />
                                <span className="hidden sm:inline text-xs font-semibold text-red-600">Silenciado</span>
                            </>
                        )}
                    </button>
                </div>

                {/* ========================================================
                    ESQUINA INFERIOR DERECHA: CONTROLES DE ZOOM
                    ======================================================== */}
                <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-30 flex items-center gap-1 p-1 sm:p-1.5 rounded-full bg-white border border-slate-200 shadow-md">
                    <button
                        onClick={zoomOut}
                        disabled={zoomLevel <= 0.8}
                        className="p-1.5 sm:p-2 rounded-full hover:bg-slate-100 text-slate-700 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        title="Reducir Zoom"
                    >
                        <ZoomOut className="w-4 h-4" />
                    </button>
                    {zoomLevel !== 1 && (
                        <button
                            onClick={resetZoom}
                            className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] sm:text-[11px] font-bold transition-colors"
                            title="Restablecer tamaño normal"
                        >
                            {Math.round(zoomLevel * 100)}%
                        </button>
                    )}
                    <button
                        onClick={zoomIn}
                        disabled={zoomLevel >= 2.2}
                        className="p-1.5 sm:p-2 rounded-full hover:bg-slate-100 text-slate-700 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        title="Aumentar Zoom"
                    >
                        <ZoomIn className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </AppLayout>
    );
}
