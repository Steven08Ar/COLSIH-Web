import { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { PageFlip } from 'page-flip';
import { 
    ChevronLeft, 
    ChevronRight, 
    ChevronsLeft, 
    ChevronsRight, 
    ZoomIn, 
    ZoomOut, 
    RotateCcw, 
    Maximize2, 
    Minimize2, 
    Volume2, 
    VolumeX, 
    Download, 
    LayoutGrid, 
    X, 
    BookOpen, 
    Info
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
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showThumbnails, setShowThumbnails] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isPortrait, setIsPortrait] = useState(false);

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
            // Ignorar si el navegador bloquea audio sin interacción
        }
    };

    // Inicializar el libro interactivo StPageFlip con vista de revista abierta (2 páginas)
    useEffect(() => {
        let isMounted = true;
        const container = bookContainerRef.current;
        if (!container) return;

        const checkMobile = () => {
            const width = window.innerWidth;
            setIsPortrait(width < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

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
                    maxWidth: 1600,
                    minHeight: 450,
                    maxHeight: 1400,
                    maxShadowOpacity: 0.35,
                    showCover: false, // ¡Revista siempre abierta a doble página!
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

                pageFlip.on('changeOrientation', (e) => {
                    if (isMounted) {
                        setIsPortrait(e.data === 'portrait');
                    }
                });

                pageFlipRef.current = pageFlip;
            } catch (err) {
                console.error('Error al inicializar PageFlip:', err);
                if (isMounted) setIsLoading(false);
            }
        }, 200);

        return () => {
            isMounted = false;
            clearTimeout(timer);
            window.removeEventListener('resize', checkMobile);
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
                if (showThumbnails) setShowThumbnails(false);
                if (zoomLevel > 1) setZoomLevel(1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showThumbnails, zoomLevel]);

    const flipNext = () => {
        if (pageFlipRef.current) pageFlipRef.current.flipNext();
    };

    const flipPrev = () => {
        if (pageFlipRef.current) pageFlipRef.current.flipPrev();
    };

    const flipFirst = () => {
        if (pageFlipRef.current) pageFlipRef.current.turnToPage(0);
    };

    const flipLast = () => {
        if (pageFlipRef.current) pageFlipRef.current.turnToPage(TOTAL_PAGES - 1);
    };

    const jumpToPage = (index) => {
        if (pageFlipRef.current && index >= 0 && index < TOTAL_PAGES) {
            pageFlipRef.current.turnToPage(index);
            setShowThumbnails(false);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
        }
    };

    const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.2));
    const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.8));
    const resetZoom = () => setZoomLevel(1);

    // Texto de páginas abiertas
    const getPageLabel = () => {
        if (isPortrait) {
            return `Página ${currentPage + 1} de ${TOTAL_PAGES}`;
        }
        const leftPage = currentPage + 1;
        const rightPage = Math.min(currentPage + 2, TOTAL_PAGES);
        if (leftPage === rightPage) {
            return `Página ${leftPage} de ${TOTAL_PAGES}`;
        }
        return `Páginas ${leftPage} - ${rightPage} de ${TOTAL_PAGES}`;
    };

    return (
        <AppLayout>
            <Head>
                <title>Periódico Escolar Abierto · Colegio Santa Isabel de Hungría</title>
                <meta 
                    name="description" 
                    content="Edición especial interactiva del Periódico Escolar del Colegio Santa Isabel de Hungría. Revista abierta en 3D a doble página con animación de papel." 
                />
            </Head>

            {/* Contenedor Principal Inmersivo a Pantalla Completa con FONDO BLANCO */}
            <div className="relative w-full h-[100dvh] bg-[#F8FAFC] text-slate-800 flex flex-col justify-between overflow-hidden select-none">
                
                {/* Sutil gradiente luminoso de fondo editorial */}
                <div className="absolute inset-0 bg-radial from-white via-[#F8FAFC] to-[#EDF2F7] pointer-events-none" />

                {/* Barra Superior Minimalista Blanca */}
                <div className="relative z-30 pt-9 sm:pt-11 pb-1 px-4 sm:px-8 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/90 text-slate-800 font-semibold text-[11px] shadow-sm">
                            <BookOpen className="w-3.5 h-3.5 text-red-600" />
                            <span>Periódico Escolar COLSIH</span>
                        </span>
                        <span className="hidden sm:inline-block text-slate-400">·</span>
                        <span className="hidden sm:inline-block text-[11px] text-slate-500 font-medium">
                            Revista Abierta · Doble Página
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Botón Ayuda / Gestos */}
                        <button
                            onClick={() => setShowHelp(!showHelp)}
                            className="p-1.5 sm:px-3 sm:py-1 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-black transition-all text-[11px] flex items-center gap-1 cursor-pointer shadow-sm"
                            title="Ver guía de navegación"
                        >
                            <Info className="w-3.5 h-3.5 text-red-600" />
                            <span className="hidden sm:inline font-medium">Guía</span>
                        </button>

                        {/* Botón Descarga directa del PDF original */}
                        <a
                            href={PDF_URL}
                            download="PERIODICO COLEGIO SANTA ISABEL DE HUNGRIA.pdf"
                            className="px-3.5 py-1 rounded-full bg-[#08111F] hover:bg-red-700 text-white font-bold text-[11px] tracking-wide shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
                            title="Descargar el PDF completo (18.9 MB)"
                        >
                            <Download className="w-3.5 h-3.5" />
                            <span className="hidden xs:inline">Descargar PDF</span>
                        </a>
                    </div>
                </div>

                {/* Popover de Ayuda */}
                {showHelp && (
                    <div className="absolute top-20 right-4 sm:right-8 z-50 max-w-xs p-4 rounded-2xl bg-white border border-slate-200 shadow-2xl text-xs space-y-2 animate-fadeIn text-slate-700">
                        <div className="flex items-center justify-between font-bold text-slate-900 pb-1 border-b border-slate-100">
                            <span className="flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5 text-red-600" />
                                <span>Lectura a Doble Página</span>
                            </span>
                            <button onClick={() => setShowHelp(false)} className="text-slate-400 hover:text-black">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <ul className="space-y-1.5 text-slate-600 text-[11px] leading-relaxed">
                            <li>📖 <strong>Pasar página:</strong> Arrastra la esquina de cualquier hoja o haz clic en los bordes.</li>
                            <li>⌨️ <strong>Teclado:</strong> Usa las flechas <strong>←</strong> y <strong>→</strong>.</li>
                            <li>🔍 <strong>Zoom:</strong> Usa los botones (+) y (-) del dock inferior.</li>
                        </ul>
                    </div>
                )}

                {/* ========================================================
                    ÁREA CENTRAL: REVISTA ABIERTA GIGANTE A PANTALLA COMPLETA
                    ======================================================== */}
                <div className="relative flex-grow flex items-center justify-center px-1 sm:px-4 md:px-8 overflow-hidden">
                    
                    {/* Flecha Lateral Flotante Izquierda */}
                    <button
                        onClick={flipPrev}
                        disabled={currentPage === 0}
                        className={`absolute left-2 sm:left-5 md:left-7 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group ${
                            currentPage === 0 ? 'opacity-20 pointer-events-none' : 'opacity-90 hover:opacity-100'
                        }`}
                        title="Página Anterior (Flecha Izquierda)"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform text-slate-800" />
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
                            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center space-y-3">
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

                        {/* Elemento raíz de StPageFlip: ¡Ocupa el 95% del alto y ancho! */}
                        <div 
                            ref={bookContainerRef} 
                            id="flipbook-root"
                            className="w-[96vw] max-w-[1550px] h-[85vh] max-h-[920px] drop-shadow-[0_20px_45px_rgba(0,0,0,0.18)] cursor-grab active:cursor-grabbing"
                        />
                    </div>

                    {/* Flecha Lateral Flotante Derecha */}
                    <button
                        onClick={flipNext}
                        disabled={currentPage >= TOTAL_PAGES - 1}
                        className={`absolute right-2 sm:right-5 md:right-7 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group ${
                            currentPage >= TOTAL_PAGES - 1 ? 'opacity-20 pointer-events-none' : 'opacity-90 hover:opacity-100'
                        }`}
                        title="Página Siguiente (Flecha Derecha)"
                    >
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform text-slate-800" />
                    </button>

                </div>

                {/* ========================================================
                    DOCK INFERIOR FLOTANTE BLANCO
                    ======================================================== */}
                <div className="relative z-30 pb-3 sm:pb-4 px-4 flex flex-col items-center gap-1.5">
                    
                    {/* Barra de Controles en Cápsula Blanca Elegante */}
                    <div className="px-4 sm:px-6 py-2 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_15px_35px_rgba(0,0,0,0.1)] flex items-center gap-2 sm:gap-3.5 max-w-full overflow-x-auto scrollbar-none">
                        
                        {/* Salto al Inicio */}
                        <button
                            onClick={flipFirst}
                            disabled={currentPage === 0}
                            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Ir a las primeras páginas"
                        >
                            <ChevronsLeft className="w-4 h-4" />
                        </button>

                        {/* Página Anterior */}
                        <button
                            onClick={flipPrev}
                            disabled={currentPage === 0}
                            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Página anterior"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Indicador de Páginas Abiertas */}
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-900 whitespace-nowrap">
                            <span className="text-red-700 font-bold font-mono">
                                {getPageLabel()}
                            </span>
                        </div>

                        {/* Página Siguiente */}
                        <button
                            onClick={flipNext}
                            disabled={currentPage >= TOTAL_PAGES - 1}
                            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Página siguiente"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Salto al Final */}
                        <button
                            onClick={flipLast}
                            disabled={currentPage >= TOTAL_PAGES - 1}
                            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Ir a las últimas páginas"
                        >
                            <ChevronsRight className="w-4 h-4" />
                        </button>

                        {/* Separador */}
                        <div className="w-[1px] h-4 bg-slate-200 mx-0.5" />

                        {/* Zoom Controles */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={zoomOut}
                                disabled={zoomLevel <= 0.8}
                                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-black disabled:opacity-30 transition-colors"
                                title="Reducir Zoom"
                            >
                                <ZoomOut className="w-4 h-4" />
                            </button>
                            {zoomLevel !== 1 && (
                                <button
                                    onClick={resetZoom}
                                    className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold px-1.5"
                                    title="Restablecer tamaño normal"
                                >
                                    {Math.round(zoomLevel * 100)}%
                                </button>
                            )}
                            <button
                                onClick={zoomIn}
                                disabled={zoomLevel >= 2.2}
                                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-black disabled:opacity-30 transition-colors"
                                title="Aumentar Zoom"
                            >
                                <ZoomIn className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Separador */}
                        <div className="w-[1px] h-4 bg-slate-200 mx-0.5" />

                        {/* Selector de Miniaturas */}
                        <button
                            onClick={() => setShowThumbnails(!showThumbnails)}
                            className={`p-1.5 rounded-full transition-colors ${
                                showThumbnails 
                                    ? 'bg-red-600 text-white font-bold' 
                                    : 'hover:bg-slate-100 text-slate-600 hover:text-black'
                            }`}
                            title="Ver cuadrícula de todas las páginas"
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>

                        {/* Sonido de Hoja ON/OFF */}
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className={`p-1.5 rounded-full transition-colors ${
                                soundEnabled ? 'text-slate-600 hover:text-black' : 'text-red-600'
                            }`}
                            title={soundEnabled ? "Silenciar efecto de papel" : "Activar sonido de pasar hoja"}
                        >
                            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                        </button>

                        {/* Pantalla Completa */}
                        <button
                            onClick={toggleFullscreen}
                            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-black transition-colors"
                            title={isFullscreen ? "Salir de pantalla completa" : "Lectura a pantalla completa"}
                        >
                            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </button>

                    </div>

                    <p className="text-[10px] text-slate-400 font-light tracking-wide text-center">
                        Colegio Santa Isabel de Hungría · Arrastra las esquinas del papel o usa las flechas para hojear
                    </p>

                </div>

                {/* ========================================================
                    TRAY DE MINIATURAS (ÍNDICE DESLIZABLE BLANCO)
                    ======================================================== */}
                {showThumbnails && (
                    <div className="absolute inset-x-0 bottom-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-slate-200 p-4 shadow-[0_-15px_40px_rgba(0,0,0,0.15)] animate-slideUp">
                        <div className="max-w-7xl mx-auto space-y-2.5">
                            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                                <div className="flex items-center gap-2">
                                    <LayoutGrid className="w-4 h-4 text-red-600" />
                                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                                        Índice de Páginas ({TOTAL_PAGES} páginas)
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowThumbnails(false)}
                                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-black transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-center gap-3 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-slate-300">
                                {PAGE_IMAGES.map((imgUrl, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => jumpToPage(idx)}
                                        className={`flex flex-col items-center gap-1 shrink-0 rounded-xl p-1 transition-all duration-200 group cursor-pointer ${
                                            currentPage === idx || currentPage + 1 === idx
                                                ? 'bg-red-50 ring-2 ring-red-600 scale-105' 
                                                : 'hover:bg-slate-100 opacity-75 hover:opacity-100'
                                        }`}
                                    >
                                        <div className="w-20 h-28 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm relative">
                                            <img
                                                src={imgUrl}
                                                alt={`Página ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <span className={`text-[10px] font-mono ${
                                            currentPage === idx || currentPage + 1 === idx ? 'text-red-700 font-bold' : 'text-slate-500'
                                        }`}>
                                            {`Pág. ${idx + 1}`}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}
