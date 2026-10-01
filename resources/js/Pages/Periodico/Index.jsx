import { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
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
    Sparkles,
    Info,
    FileText
} from 'lucide-react';

const TOTAL_PAGES = 51;
const PDF_URL = '/periodico/PERIODICO%20COLEGIO%20SANTA%20ISABEL%20DE%20HUNGRIA.pdf';

// Array de páginas con rutas de imágenes en alta definición
const PAGE_IMAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `/periodico/paginas/pagina_${num}.jpg`;
});

export default function PeriodicoIndex() {
    const bookContainerRef = useRef(null);
    const pageFlipRef = useRef(null);
    const audioCtxRef = useRef(null);

    const [currentPage, setCurrentPage] = useState(0); // 0-indexed
    const [pageCount, setPageCount] = useState(TOTAL_PAGES);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showThumbnails, setShowThumbnails] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(10);
    const [isPortrait, setIsPortrait] = useState(false);

    // Sintetizador Web Audio API para el sonido de paso de hoja realista
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

            // Generar ráfaga corta de ruido filtrado simulando el roce suave y crujido del papel
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
            gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.21);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start(ctx.currentTime);
            noise.stop(ctx.currentTime + 0.22);
        } catch (e) {
            // Silencioso si el navegador bloquea audio sin interacción previa
        }
    };

    // Inicializar el libro interactivo StPageFlip
    useEffect(() => {
        let isMounted = true;
        const container = bookContainerRef.current;
        if (!container) return;

        // Calcular dimensiones iniciales óptimas basadas en la pantalla
        const updateOrientation = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setIsPortrait(width < 900 || width < height);
        };
        updateOrientation();
        window.addEventListener('resize', updateOrientation);

        // Pre-cargar portada inicial
        const img = new Image();
        img.src = PAGE_IMAGES[0];
        img.onload = () => {
            if (isMounted) setLoadProgress(50);
        };

        const timer = setTimeout(() => {
            if (!container || !isMounted) return;

            try {
                // Limpiar cualquier instancia previa en el contenedor
                container.innerHTML = '';

                // Crear nueva instancia de PageFlip con proporción exacta 0.6071
                const pageFlip = new PageFlip(container, {
                    width: 440,
                    height: 725,
                    size: 'stretch',
                    minWidth: 280,
                    maxWidth: 1000,
                    minHeight: 420,
                    maxHeight: 1250,
                    maxShadowOpacity: 0.55,
                    showCover: true, // Portada y contraportada individuales
                    mobileScrollSupport: false,
                    usePortrait: true, // 1 página en móvil / 2 páginas abiertas en escritorio
                    startPage: 0,
                    drawShadow: true,
                    flippingTime: 800,
                    useMouseEvents: true,
                    swipeDistance: 25,
                    clickEventForward: true
                });

                pageFlip.loadFromImages(PAGE_IMAGES);

                pageFlip.on('init', () => {
                    if (isMounted) {
                        setIsLoading(false);
                        setLoadProgress(100);
                        setPageCount(pageFlip.getPageCount());
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
        }, 300);

        return () => {
            isMounted = false;
            clearTimeout(timer);
            window.removeEventListener('resize', updateOrientation);
            if (pageFlipRef.current) {
                try {
                    pageFlipRef.current.destroy();
                } catch (e) {}
                pageFlipRef.current = null;
            }
        };
    }, []);

    // Manejo de teclado (flechas izquierda/derecha para pasar página)
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

    // Métodos de control
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
    const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
    const resetZoom = () => setZoomLevel(1);

    // Texto descriptivo de la página actual
    const getPageLabel = () => {
        if (currentPage === 0) return 'Portada';
        if (currentPage === TOTAL_PAGES - 1) return 'Contraportada';
        if (isPortrait) {
            return `Página ${currentPage + 1} de ${TOTAL_PAGES}`;
        }
        // En modo doble página (spread)
        const leftPage = currentPage;
        const rightPage = Math.min(currentPage + 1, TOTAL_PAGES);
        return `Páginas ${leftPage} - ${rightPage} de ${TOTAL_PAGES}`;
    };

    return (
        <AppLayout>
            <Head>
                <title>Periódico Escolar 3D · Colegio Santa Isabel de Hungría</title>
                <meta 
                    name="description" 
                    content="Edición especial interactiva del Periódico Escolar del Colegio Santa Isabel de Hungría en Floridablanca. Lectura animada en 3D con experiencia realista de cambio de página." 
                />
            </Head>

            {/* Contenedor Principal Inmersivo a Pantalla Completa */}
            <div className="relative w-full h-[100dvh] bg-[#070C16] text-white flex flex-col justify-between overflow-hidden select-none">
                
                {/* Iluminación de fondo cenital y textura de ambiente de biblioteca editorial */}
                <div className="absolute inset-0 bg-radial from-[#15233D]/60 via-[#0A101C] to-[#04070D] pointer-events-none" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

                {/* Barra Superior Minimalista con Datos del Periódico */}
                <div className="relative z-30 pt-10 sm:pt-12 pb-2 px-6 sm:px-12 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white font-medium text-[11px]">
                            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                            <span>Periódico Escolar COLSIH</span>
                        </span>
                        <span className="hidden sm:inline-block text-slate-500">·</span>
                        <span className="hidden sm:inline-block text-[11px] text-slate-400">
                            Floridablanca, Santander
                        </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Botón Ayuda / Gestos */}
                        <button
                            onClick={() => setShowHelp(!showHelp)}
                            className="p-1.5 sm:px-3 sm:py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-slate-300 hover:text-white transition-all text-[11px] flex items-center gap-1 cursor-pointer"
                            title="Ver guía de navegación"
                        >
                            <Info className="w-3.5 h-3.5 text-amber-400" />
                            <span className="hidden sm:inline">Guía de Lectura</span>
                        </button>

                        {/* Botón Descarga directa del PDF original */}
                        <a
                            href={PDF_URL}
                            download="PERIODICO COLEGIO SANTA ISABEL DE HUNGRIA.pdf"
                            className="px-3.5 py-1 rounded-full bg-gradient-to-r from-red-600 to-[#920709] hover:from-red-500 hover:to-red-700 text-white font-bold text-[11px] tracking-wide shadow-lg shadow-red-900/30 flex items-center gap-1.5 transition-all hover:scale-105"
                            title="Descargar el PDF completo (18.9 MB)"
                        >
                            <Download className="w-3.5 h-3.5" />
                            <span className="hidden xs:inline">Descargar PDF</span>
                        </a>
                    </div>
                </div>

                {/* Popover / Modal de Ayuda de Gestos */}
                {showHelp && (
                    <div className="absolute top-20 right-6 sm:right-12 z-50 max-w-xs p-4 rounded-2xl bg-[#0B1424]/95 backdrop-blur-2xl border border-white/20 shadow-2xl text-xs space-y-2 animate-fadeIn">
                        <div className="flex items-center justify-between font-bold text-white pb-1 border-b border-white/10">
                            <span className="flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                <span>Cómo leer el periódico</span>
                            </span>
                            <button onClick={() => setShowHelp(false)} className="text-slate-400 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <ul className="space-y-1.5 text-slate-300 font-light text-[11px] leading-relaxed">
                            <li>📖 <strong>Pasar página:</strong> Arrastra con el cursor la esquina de cualquier hoja o haz clic en los bordes.</li>
                            <li>⌨️ <strong>Teclado:</strong> Usa las flechas <strong>←</strong> y <strong>→</strong> o la barra espaciadora.</li>
                            <li>🔍 <strong>Zoom:</strong> Usa los botones (+) y (-) del dock inferior para leer textos pequeños.</li>
                            <li>📱 <strong>Táctil:</strong> Desliza el dedo sobre la pantalla en teléfonos y tablets.</li>
                        </ul>
                    </div>
                )}

                {/* ========================================================
                    ÁREA CENTRAL: EL LIBRO 3D CON FÍSICA DE PAPEL
                    ======================================================== */}
                <div className="relative flex-grow flex items-center justify-center px-2 sm:px-6 md:px-10 overflow-hidden">
                    
                    {/* Flecha Lateral Flotante Izquierda (Página Anterior) */}
                    <button
                        onClick={flipPrev}
                        disabled={currentPage === 0}
                        className={`absolute left-3 sm:left-6 md:left-8 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xl border border-white/15 text-white flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group ${
                            currentPage === 0 ? 'opacity-20 pointer-events-none' : 'opacity-85 hover:opacity-100'
                        }`}
                        title="Página Anterior (Flecha Izquierda)"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                    </button>

                    {/* Contenedor del Libro con Zoom y Sombra 3D */}
                    <div 
                        className="relative max-w-full max-h-full flex items-center justify-center transition-transform duration-300 ease-out"
                        style={{
                            transform: `scale(${zoomLevel})`,
                            transformOrigin: 'center center'
                        }}
                    >
                        {/* Indicador de Carga Inicial */}
                        {isLoading && (
                            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#070C16]/90 backdrop-blur-md rounded-2xl p-6 text-center space-y-4">
                                <div className="relative w-16 h-16">
                                    <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-amber-400 animate-spin" />
                                    <BookOpen className="w-6 h-6 text-amber-400 absolute inset-0 m-auto animate-pulse" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-bold text-white tracking-wide">
                                        Cargando Periódico Escolar...
                                    </h3>
                                    <p className="text-xs text-slate-400 font-light">
                                        Preparando las 51 páginas con animación 3D
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Elemento raíz de StPageFlip */}
                        <div 
                            ref={bookContainerRef} 
                            id="flipbook-root"
                            className="w-[320px] sm:w-[580px] md:w-[780px] lg:w-[940px] xl:w-[1080px] h-[480px] sm:h-[620px] md:h-[700px] lg:h-[760px] max-h-[82vh] drop-shadow-[0_30px_70px_rgba(0,0,0,0.85)] cursor-grab active:cursor-grabbing"
                        />
                    </div>

                    {/* Flecha Lateral Flotante Derecha (Página Siguiente) */}
                    <button
                        onClick={flipNext}
                        disabled={currentPage >= TOTAL_PAGES - 1}
                        className={`absolute right-3 sm:right-6 md:right-8 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xl border border-white/15 text-white flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group ${
                            currentPage >= TOTAL_PAGES - 1 ? 'opacity-20 pointer-events-none' : 'opacity-85 hover:opacity-100'
                        }`}
                        title="Página Siguiente (Flecha Derecha)"
                    >
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                </div>

                {/* ========================================================
                    DOCK INFERIOR FLOTANTE DE HERRAMIENTAS Y CONTROLES
                    ======================================================== */}
                <div className="relative z-30 pb-4 sm:pb-6 px-4 flex flex-col items-center gap-2">
                    
                    {/* Barra de Controles en Cápsula de Cristal */}
                    <div className="px-4 sm:px-6 py-2 rounded-full bg-[#0B1424]/90 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center gap-2 sm:gap-4 max-w-full overflow-x-auto scrollbar-none">
                        
                        {/* Salto al Inicio */}
                        <button
                            onClick={flipFirst}
                            disabled={currentPage === 0}
                            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Ir a la Portada"
                        >
                            <ChevronsLeft className="w-4 h-4" />
                        </button>

                        {/* Página Anterior */}
                        <button
                            onClick={flipPrev}
                            disabled={currentPage === 0}
                            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Página anterior"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Indicador de Página y Selector Rápido */}
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white whitespace-nowrap">
                            <span className="text-amber-400 font-bold font-mono">
                                {currentPage + 1}
                            </span>
                            <span className="text-slate-400 font-light">/</span>
                            <span className="text-slate-400 font-mono">{TOTAL_PAGES}</span>
                            <span className="hidden md:inline-block ml-1 text-[11px] text-slate-400 font-normal">
                                ({getPageLabel()})
                            </span>
                        </div>

                        {/* Página Siguiente */}
                        <button
                            onClick={flipNext}
                            disabled={currentPage >= TOTAL_PAGES - 1}
                            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Página siguiente"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Salto al Final */}
                        <button
                            onClick={flipLast}
                            disabled={currentPage >= TOTAL_PAGES - 1}
                            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Ir a la Contraportada"
                        >
                            <ChevronsRight className="w-4 h-4" />
                        </button>

                        {/* Separador */}
                        <div className="w-[1px] h-4 bg-white/20 mx-0.5" />

                        {/* Zoom Controles */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={zoomOut}
                                disabled={zoomLevel <= 0.75}
                                className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white disabled:opacity-30 transition-colors"
                                title="Reducir Zoom"
                            >
                                <ZoomOut className="w-4 h-4" />
                            </button>
                            {zoomLevel !== 1 && (
                                <button
                                    onClick={resetZoom}
                                    className="p-1 rounded-full hover:bg-white/10 text-amber-300 text-[10px] font-bold px-1.5"
                                    title="Restablecer tamaño normal"
                                >
                                    {Math.round(zoomLevel * 100)}%
                                </button>
                            )}
                            <button
                                onClick={zoomIn}
                                disabled={zoomLevel >= 2.2}
                                className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white disabled:opacity-30 transition-colors"
                                title="Aumentar Zoom"
                            >
                                <ZoomIn className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Separador */}
                        <div className="w-[1px] h-4 bg-white/20 mx-0.5" />

                        {/* Selector de Miniaturas (Índice Visual) */}
                        <button
                            onClick={() => setShowThumbnails(!showThumbnails)}
                            className={`p-1.5 rounded-full transition-colors ${
                                showThumbnails 
                                    ? 'bg-amber-400 text-black font-bold' 
                                    : 'hover:bg-white/10 text-slate-300 hover:text-white'
                            }`}
                            title="Ver cuadrícula de todas las páginas"
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>

                        {/* Sonido de Hoja ON/OFF */}
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className={`p-1.5 rounded-full transition-colors ${
                                soundEnabled ? 'text-slate-300 hover:text-white' : 'text-red-400 hover:text-red-300'
                            }`}
                            title={soundEnabled ? "Silenciar efecto de papel" : "Activar sonido de pasar hoja"}
                        >
                            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                        </button>

                        {/* Pantalla Completa */}
                        <button
                            onClick={toggleFullscreen}
                            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                            title={isFullscreen ? "Salir de pantalla completa" : "Lectura a pantalla completa"}
                        >
                            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </button>

                    </div>

                    {/* Mensaje de Ayuda Sutil al Fondo */}
                    <p className="text-[10px] text-slate-500 font-light tracking-wide text-center">
                        Colegio Santa Isabel de Hungría · Puedes arrastrar las esquinas de cada hoja como un periódico real
                    </p>

                </div>

                {/* ========================================================
                    TRAY DE MINIATURAS (ÍNDICE DESLIZABLE)
                    ======================================================== */}
                {showThumbnails && (
                    <div className="absolute inset-x-0 bottom-0 z-50 bg-[#060A13]/95 backdrop-blur-3xl border-t border-white/20 p-5 shadow-[0_-20px_50px_rgba(0,0,0,0.9)] animate-slideUp">
                        <div className="max-w-7xl mx-auto space-y-3">
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <LayoutGrid className="w-4 h-4 text-amber-400" />
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                                        Índice de Páginas ({TOTAL_PAGES} páginas)
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowThumbnails(false)}
                                    className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Carrusel horizontal de miniaturas */}
                            <div className="flex items-center gap-3 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-white/20">
                                {PAGE_IMAGES.map((imgUrl, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => jumpToPage(idx)}
                                        className={`flex flex-col items-center gap-1.5 shrink-0 rounded-xl p-1.5 transition-all duration-200 group cursor-pointer ${
                                            currentPage === idx 
                                                ? 'bg-amber-400/20 ring-2 ring-amber-400 scale-105' 
                                                : 'hover:bg-white/10 opacity-70 hover:opacity-100'
                                        }`}
                                    >
                                        <div className="w-20 h-28 rounded-lg overflow-hidden bg-black border border-white/15 shadow-md relative">
                                            <img
                                                src={imgUrl}
                                                alt={`Página ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            {currentPage === idx && (
                                                <div className="absolute inset-0 bg-amber-400/15 border-2 border-amber-400 pointer-events-none" />
                                            )}
                                        </div>
                                        <span className={`text-[10px] font-mono ${
                                            currentPage === idx ? 'text-amber-400 font-bold' : 'text-slate-400'
                                        }`}>
                                            {idx === 0 ? 'Portada' : idx === TOTAL_PAGES - 1 ? 'Contra' : `Pág. ${idx + 1}`}
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
