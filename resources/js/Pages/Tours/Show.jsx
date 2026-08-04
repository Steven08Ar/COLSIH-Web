import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import TourViewer from '@/Components/Tour360/TourViewer';
import { ChevronLeft, Grid, Compass, Info, MapPin } from 'lucide-react';

const R2_RECORRIDO_BASE = "https://pub-c4ddb3fb75904158bbda5fbc35d6963e.r2.dev/recorrido_360/";
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

export default function Show({ tour = null }) {
    const rawScenes = (tour && tour.scenes && tour.scenes.length > 0) 
        ? tour.scenes 
        : DEFAULT_SCENES;

    // Active scene state
    const initialSlug = rawScenes.find(s => s.es_escena_inicial)?.slug || rawScenes[0]?.slug;
    const [activeSceneSlug, setActiveSceneSlug] = useState(initialSlug);
    const [showSceneList, setShowSceneList] = useState(false);

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

    return (
        <>
            <Head title={`Recorrido Virtual 360° | ${activeScene?.nombre || 'COLSIH'}`} />

            <div className="relative w-screen h-screen bg-slate-950 flex flex-col overflow-hidden font-sans select-none">
                
                {/* Top Navigation Bar */}
                <header className="absolute top-0 inset-x-0 z-30 h-16 sm:h-20 px-4 sm:px-8 flex items-center justify-between bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent pointer-events-auto">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-2xl backdrop-blur-md transition-all text-xs font-bold shadow-lg hover:scale-105"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Volver al Sitio</span>
                        </Link>
                        
                        <div className="h-6 w-px bg-white/20 hidden sm:block"></div>

                        <div className="flex items-center gap-3">
                            <img src="/marca/logo-colsih.svg" alt="COLSIH" className="h-8 w-auto object-contain hidden sm:block" />
                            <div className="flex flex-col">
                                <span className="text-white font-extrabold text-sm sm:text-base leading-tight tracking-tight">
                                    {tour?.nombre || 'Recorrido Virtual 360°'}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                                    Colegio Santa Isabel de Hungría
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Toggle Scene Drawer List button */}
                        <button
                            onClick={() => setShowSceneList(!showSceneList)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-bold transition-all backdrop-blur-md cursor-pointer ${
                                showSceneList
                                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg'
                                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                            }`}
                        >
                            <Grid className="w-4 h-4" />
                            <span className="hidden sm:inline">Lista de Espacios</span>
                        </button>
                    </div>
                </header>

                {/* 360 Pannellum Tour Viewer */}
                <main className="relative flex-1 w-full h-full">
                    <TourViewer
                        scenes={rawScenes}
                        initialSceneSlug={initialSlug}
                        activeSceneSlug={activeSceneSlug}
                        onSceneChange={handleSceneChange}
                        className="rounded-none border-none shadow-none min-h-screen"
                    />
                </main>

                {/* Drawer / Sidebar List of Scenes */}
                {showSceneList && (
                    <div className="fixed top-20 left-6 z-40 w-80 max-h-[calc(100vh-140px)] bg-slate-950/90 border border-white/20 backdrop-blur-xl rounded-3xl p-4 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <Compass className="w-4 h-4 text-blue-400" />
                                <span className="text-xs font-extrabold text-white uppercase tracking-wider">
                                    Espacios Disponibles
                                </span>
                            </div>
                            <button
                                onClick={() => setShowSceneList(false)}
                                className="text-slate-400 hover:text-white text-xs font-bold p-1 rounded-lg"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
                            {rawScenes.map((scene, idx) => {
                                const isActive = scene.slug === activeSceneSlug;

                                return (
                                    <div
                                        key={scene.slug || idx}
                                        onClick={() => {
                                            handleSceneChange(scene.slug);
                                            setShowSceneList(false);
                                        }}
                                        className={`group flex items-center gap-3 p-2.5 rounded-2xl border transition-all cursor-pointer ${
                                            isActive
                                                ? 'bg-blue-600/30 border-blue-500/60 text-white shadow-md'
                                                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
                                        }`}
                                    >
                                        <div className="relative w-14 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-slate-900">
                                            <img
                                                src={scene.imagen_url}
                                                alt={scene.nombre}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            {isActive && (
                                                <div className="absolute inset-0 bg-blue-600/40 flex items-center justify-center">
                                                    <MapPin className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <span className="block text-xs font-bold truncate">
                                                {scene.nombre}
                                            </span>
                                            <span className="block text-[10px] text-slate-400 font-medium truncate">
                                                {scene.hotspots?.length || 0} puntos interactivos
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
