import { useState, useEffect, useRef, memo } from 'react';
import { Head, Link } from '@inertiajs/react';
import TourViewer from '@/Components/Tour360/TourViewer';
import { ChevronLeft, ChevronUp, ChevronDown, ChevronRight, Compass, MapPin, Grid, Layers } from 'lucide-react';

const SceneThumbnail = memo(function SceneThumbnail({ src, alt, imgClassName, containerRef }) {
    const wrapRef = useRef(null);
    const [show, setShow] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el || !src) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) { setShow(true); obs.disconnect(); }
            },
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

const R2_RECORRIDO_BASE = "https://media.colsih.edu.co/recorrido_360/";
const getRecorridoR2Url = (file) => `${R2_RECORRIDO_BASE}${encodeURIComponent(file)}`;

// Default fallback 360° scenes built from Cloudflare R2 recorrido_360 images
const DEFAULT_SCENES = [
    {
        id: 1,
        slug: 'entrada',
        nombre: 'Entrada Principal',
        imagen_url: getRecorridoR2Url('1.entrada.jpg'),
        yaw_inicial: 0,
        pitch_inicial: 0,
        hfov_inicial: 100,
        es_escena_inicial: true,
        x_porcentaje: 15,
        y_porcentaje: 80,
        hotspots: [
            { tipo: 'enlace', yaw: 0, pitch: -2, texto: "Ingresar al Lobby", scene_destino_slug: 'lobby' },
            { tipo: 'info', yaw: -25, pitch: 8, texto: 'Acceso Peatonal y Portería Principal' }
        ]
    },
    {
        id: 2,
        slug: 'lobby',
        nombre: 'Lobby de Bienvenida',
        imagen_url: getRecorridoR2Url('2.lobby.jpg'),
        yaw_inicial: 0,
        pitch_inicial: 0,
        hfov_inicial: 100,
        es_escena_inicial: false,
        x_porcentaje: 25,
        y_porcentaje: 70,
        hotspots: [
            { tipo: 'enlace', yaw: 30, pitch: 0, texto: "Ir a la Capilla", scene_destino_slug: 'capilla' },
            { tipo: 'enlace', yaw: -40, pitch: 0, texto: "Volver a la Entrada", scene_destino_slug: 'entrada' },
            { tipo: 'enlace', yaw: 100, pitch: -5, texto: "Pasillo Cafetería", scene_destino_slug: 'cafeteria' },
            { tipo: 'info', yaw: 0, pitch: 12, texto: 'Recepción y Atención al Visitante' }
        ]
    },
    {
        id: 3,
        slug: 'capilla',
        nombre: 'Capilla Institucional',
        imagen_url: getRecorridoR2Url('5.capilla.jpg'),
        yaw_inicial: 0,
        pitch_inicial: 0,
        hfov_inicial: 100,
        es_escena_inicial: false,
        x_porcentaje: 35,
        y_porcentaje: 60,
        hotspots: [
            { tipo: 'enlace', yaw: 180, pitch: 0, texto: "Regresar al Lobby", scene_destino_slug: 'lobby' },
            { tipo: 'info', yaw: 0, pitch: 15, texto: 'Espacio de Oración y Formación Espiritual' }
        ]
    },
    {
        id: 4,
        slug: 'cafeteria',
        nombre: 'Parque y Cafetería',
        imagen_url: getRecorridoR2Url('4.parque_cafeteria.jpg'),
        yaw_inicial: 0,
        pitch_inicial: 0,
        hfov_inicial: 100,
        es_escena_inicial: false,
        x_porcentaje: 45,
        y_porcentaje: 50,
        hotspots: [
            { tipo: 'enlace', yaw: -60, pitch: 0, texto: "Ir a las Canchas", scene_destino_slug: 'canchas' },
            { tipo: 'enlace', yaw: 120, pitch: 0, texto: "Volver al Lobby", scene_destino_slug: 'lobby' },
            { tipo: 'info', yaw: 0, pitch: 10, texto: 'Zona de Descanso y Alimentación Saludable' }
        ]
    },
    {
        id: 5,
        slug: 'canchas',
        nombre: 'Canchas Deportivas',
        imagen_url: getRecorridoR2Url('20.cancha_grande.jpg'),
        yaw_inicial: 0,
        pitch_inicial: 0,
        hfov_inicial: 100,
        es_escena_inicial: false,
        x_porcentaje: 65,
        y_porcentaje: 40,
        hotspots: [
            { tipo: 'enlace', yaw: 80, pitch: -2, texto: "Ir a la Sala de Informática", scene_destino_slug: 'informatica' },
            { tipo: 'enlace', yaw: -100, pitch: 0, texto: "Ir al Gimnasio", scene_destino_slug: 'gimnasio' },
            { tipo: 'info', yaw: 0, pitch: 15, texto: 'Cancha Múltiple de Baloncesto y Fútbol Sala' }
        ]
    },
    {
        id: 6,
        slug: 'informatica',
        nombre: 'Sala de Informática',
        imagen_url: getRecorridoR2Url('13.informatica_a.jpg'),
        yaw_inicial: 0,
        pitch_inicial: 0,
        hfov_inicial: 100,
        es_escena_inicial: false,
        x_porcentaje: 75,
        y_porcentaje: 30,
        hotspots: [
            { tipo: 'enlace', yaw: -140, pitch: 0, texto: "Ir a la Biblioteca", scene_destino_slug: 'biblioteca' },
            { tipo: 'enlace', yaw: 40, pitch: 0, texto: "Volver a las Canchas", scene_destino_slug: 'canchas' },
            { tipo: 'info', yaw: 0, pitch: 10, texto: 'Laboratorio con Equipos de Última Generación' }
        ]
    },
    {
        id: 7,
        slug: 'gimnasio',
        nombre: 'Gimnasio Deportivo',
        imagen_url: getRecorridoR2Url('34.gimnasio.jpg'),
        yaw_inicial: 0,
        pitch_inicial: 0,
        hfov_inicial: 100,
        es_escena_inicial: false,
        x_porcentaje: 85,
        y_porcentaje: 25,
        hotspots: [
            { tipo: 'enlace', yaw: 160, pitch: 0, texto: "Volver a las Canchas", scene_destino_slug: 'canchas' },
            { tipo: 'info', yaw: 0, pitch: 8, texto: 'Espacio Acondicionado para Educación Física' }
        ]
    },
    {
        id: 8,
        slug: 'biblioteca',
        nombre: 'Biblioteca Institucional',
        imagen_url: getRecorridoR2Url('38.biblioteca.jpg'),
        yaw_inicial: 0,
        pitch_inicial: 0,
        hfov_inicial: 100,
        es_escena_inicial: false,
        x_porcentaje: 90,
        y_porcentaje: 15,
        hotspots: [
            { tipo: 'enlace', yaw: 180, pitch: 0, texto: "Ir a Informática", scene_destino_slug: 'informatica' },
            { tipo: 'info', yaw: 0, pitch: 12, texto: 'Centro de Recursos para el Aprendizaje e Investigación' }
        ]
    }
];

export default function Show({ tour = null, is_preview = false }) {
    if (tour?.en_construccion && !is_preview) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center select-none font-sans relative overflow-hidden">
                <Head title="Recorrido 360° en Construcción | COLSIH" />

                {/* Ambient Glows */}
                <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#800A15]/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 max-w-lg bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto shadow-xl shadow-amber-500/10">
                        <span className="text-5xl animate-bounce">🚧</span>
                    </div>

                    <div className="space-y-3">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-amber-500/30">
                            Modo en Construcción
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                            Recorrido Virtual 360°
                        </h1>
                        <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
                            Estamos actualizando las instalaciones virtuales de nuestra institución para ofrecerte una experiencia interactiva inmersiva renovada. ¡Próximamente disponible!
                        </p>
                    </div>

                    <div className="pt-4">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#800A15] hover:bg-[#600710] text-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-rose-950/40 hover:scale-105"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Volver al Inicio</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const rawScenes = (tour && tour.scenes && tour.scenes.length > 0) 
        ? tour.scenes 
        : DEFAULT_SCENES;

    // Obtener slug inicial respetando query param ?scene=slug si proviene del editor de vista previa
    const getInitialSlug = () => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const queryScene = params.get('scene');
            if (queryScene && rawScenes.some(s => s.slug === queryScene)) {
                return queryScene;
            }
        }
        return rawScenes.find(s => s.es_escena_inicial)?.slug || rawScenes[0]?.slug;
    };

    const initialSlug = getInitialSlug();
    const [activeSceneSlug, setActiveSceneSlug] = useState(initialSlug);
    const [showSceneTray, setShowSceneTray] = useState(false);
    const sceneTrayScrollRef = useRef(null);

    const activeScene = rawScenes.find(s => s.slug === activeSceneSlug) || rawScenes[0];

    const handleSceneChange = (targetSlug) => {
        if (!targetSlug) return;
        const exists = rawScenes.some(s => s.slug === targetSlug);
        if (exists) {
            setActiveSceneSlug(targetSlug);
        } else {
            console.warn(`La escena "${targetSlug}" no se encuentra en el mapa actual.`);
        }
    };

    const scrollTray = (direction) => {
        if (!sceneTrayScrollRef.current) return;
        const amount = direction === 'left' ? -260 : 260;
        sceneTrayScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    };

    return (
        <>
            <Head title={`Recorrido Virtual 360° | ${activeScene?.nombre || 'COLSIH'}`} />

            <div className="relative w-screen h-screen bg-slate-950 flex flex-col overflow-hidden font-sans select-none">
                
                {/* ── TARJETA FLOTANTE SUPERIOR IZQUIERDA (Estilo Google Maps Place Header) ── */}
                <header className="absolute top-4 sm:top-6 left-4 sm:left-6 z-30 flex items-start gap-2.5 pointer-events-auto max-w-[calc(100vw-32px)]">
                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xl p-2.5 sm:p-3 flex items-center gap-3 transition-all">
                        <Link
                            href="/"
                            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition cursor-pointer shrink-0"
                            title="Volver al Portal Institucional"
                        >
                            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                        </Link>

                        <div className="flex items-center gap-2.5 min-w-0 pr-1 sm:pr-3">
                            <img src="/marca/logo-colsih.svg" alt="COLSIH" className="h-7 w-auto object-contain shrink-0 hidden sm:block" />
                            <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-slate-900 dark:text-white font-extrabold text-xs sm:text-sm leading-tight truncate max-w-[140px] sm:max-w-[240px]">
                                        {activeScene?.nombre || 'Espacio 360°'}
                                    </h1>
                                    {is_preview && (
                                        <span className="bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                                            Vista Previa
                                        </span>
                                    )}
                                </div>
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">
                                    Colegio Santa Isabel de Hungría • Tour 360°
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Botón Explorar Espacios estilo Google Maps Chip */}
                    <button
                        onClick={() => setShowSceneTray(!showSceneTray)}
                        className={`h-11 sm:h-12 px-3 sm:px-4 rounded-2xl border shadow-xl flex items-center gap-2 font-bold text-xs transition cursor-pointer backdrop-blur-md shrink-0 ${
                            showSceneTray
                                ? 'bg-[#1a73e8] border-blue-500 text-white shadow-blue-600/30'
                                : 'bg-white/95 dark:bg-slate-900/95 border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                        title="Explorar galería de espacios"
                    >
                        <Grid className="w-4 h-4 text-inherit" />
                        <span className="hidden sm:inline">Lugares</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                            showSceneTray
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}>
                            {rawScenes.length}
                        </span>
                    </button>
                </header>

                {/* ── VISOR 360 PHOTO SPHERE VIEWER ── */}
                <main className="relative flex-1 w-full h-full">
                    <TourViewer
                        scenes={rawScenes}
                        initialSceneSlug={initialSlug}
                        activeSceneSlug={activeSceneSlug}
                        onSceneChange={handleSceneChange}
                        className="rounded-none border-none shadow-none min-h-screen"
                    />
                </main>

                {/* ── BOTÓN FLOTANTE INFERIOR: EXPLORAR LUGARES (Cuando la bandeja está cerrada) ── */}
                {!showSceneTray && (
                    <div className="absolute bottom-6 left-5 sm:left-6 z-20 pointer-events-auto">
                        <button
                            onClick={() => setShowSceneTray(true)}
                            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-extrabold hover:scale-105 active:scale-95 transition cursor-pointer group"
                        >
                            <Compass className="w-4 h-4 text-[#1a73e8] group-hover:rotate-45 transition-transform" />
                            <span>Lugares ({rawScenes.length})</span>
                            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                    </div>
                )}

                {/* ── BANDEJA INFERIOR DE LUGARES ESTILO GOOGLE MAPS STREET VIEW ── */}
                {showSceneTray && (
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-20 sm:right-24 z-30 pointer-events-auto max-w-5xl animate-fadeIn">
                        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl p-3 sm:p-4 shadow-2xl flex flex-col gap-2.5">
                            {/* Cabecera de la bandeja */}
                            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 px-1">
                                <div className="flex items-center gap-2">
                                    <Compass className="w-4 h-4 text-[#1a73e8]" />
                                    <span className="text-xs font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">
                                        Espacios de la Institución
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-bold">
                                        ({rawScenes.length} ubicaciones 360°)
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    {/* Botones de desplazamiento horizontal */}
                                    <button
                                        onClick={() => scrollTray('left')}
                                        className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition cursor-pointer"
                                        title="Desplazar a la izquierda"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => scrollTray('right')}
                                        className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition cursor-pointer"
                                        title="Desplazar a la derecha"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                    <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
                                    <button
                                        onClick={() => setShowSceneTray(false)}
                                        className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                                    >
                                        <ChevronDown className="w-3.5 h-3.5" />
                                        <span>Ocultar</span>
                                    </button>
                                </div>
                            </div>

                            {/* Carrusel Horizontal de Miniaturas */}
                            <div
                                ref={sceneTrayScrollRef}
                                className="flex items-center gap-3 overflow-x-auto pb-1 custom-scrollbar scroll-smooth"
                            >
                                {rawScenes.map((scene, idx) => {
                                    const isActive = scene.slug === activeSceneSlug;

                                    return (
                                        <div
                                            key={scene.slug || idx}
                                            onClick={() => handleSceneChange(scene.slug)}
                                            className={`group flex flex-col w-36 sm:w-44 shrink-0 rounded-2xl overflow-hidden border transition-all cursor-pointer select-none ${
                                                isActive
                                                    ? 'border-[#1a73e8] ring-2 ring-[#1a73e8]/50 shadow-md scale-[1.02] bg-blue-50/50 dark:bg-blue-950/30'
                                                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-900/60'
                                            }`}
                                        >
                                            <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                                                <SceneThumbnail
                                                    src={scene.thumbnail_url || scene.imagen_url}
                                                    alt={scene.nombre}
                                                    imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    containerRef={sceneTrayScrollRef}
                                                />
                                                {isActive && (
                                                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-[#1a73e8] text-white text-[9px] font-black flex items-center gap-1 shadow-md">
                                                        <MapPin className="w-2.5 h-2.5" />
                                                        <span>Viendo</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-2 sm:p-2.5 flex flex-col">
                                                <span className={`text-xs font-bold truncate ${
                                                    isActive
                                                        ? 'text-[#1a73e8] dark:text-blue-400'
                                                        : 'text-slate-800 dark:text-white'
                                                }`}>
                                                    {scene.nombre}
                                                </span>
                                                <span className="text-[10px] text-slate-400 font-medium truncate">
                                                    {scene.hotspots?.length || 0} puntos
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
