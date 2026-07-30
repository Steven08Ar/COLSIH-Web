import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import TourViewer from '@/Components/Tour360/TourViewer';
import ScrollReveal from './ScrollReveal';
import { Compass, X, Sparkles, ExternalLink, Play } from 'lucide-react';

const VIRTUAL_TOUR_SCENES = [
    {
        id: 1,
        slug: 'entrada',
        nombre: 'Entrada Principal',
        imagen_url: '/recorrido_virtual/1.entrada.jpg',
        yaw_inicial: 0,
        pitch_inicial: 0,
        hfov_inicial: 100,
        es_escena_inicial: true,
        x_porcentaje: 12,
        y_porcentaje: 82,
        hotspots: [
            { tipo: 'enlace', yaw: 0, pitch: -2, texto: 'Ingresar al Lobby', scene_destino_slug: 'lobby' },
            { tipo: 'info', yaw: -25, pitch: 8, texto: 'Acceso Peatonal y Portería Principal COLSIH' }
        ]
    },
    {
        id: 2,
        slug: 'lobby',
        nombre: 'Lobby de Bienvenida',
        imagen_url: '/recorrido_virtual/2.lobby.jpg',
        yaw_inicial: 0,
        pitch_inicial: 0,
        hfov_inicial: 100,
        es_escena_inicial: false,
        x_porcentaje: 22,
        y_porcentaje: 72,
        hotspots: [
            { tipo: 'enlace', yaw: 40, pitch: 0, texto: 'Ir a la Capilla', scene_destino_slug: 'capilla' },
            { tipo: 'enlace', yaw: -45, pitch: 0, texto: 'Volver a la Entrada', scene_destino_slug: 'entrada' },
            { tipo: 'enlace', yaw: 110, pitch: -3, texto: 'Pasillo a Cafetería', scene_destino_slug: 'cafeteria' },
            { tipo: 'info', yaw: 0, pitch: 10, texto: 'Recepción General y Atención al Público' }
        ]
    },
    {
        id: 3,
        slug: 'capilla',
        nombre: 'Capilla Institucional',
        imagen_url: '/recorrido_virtual/5.capilla.jpg',
        yaw_inicial: 0,
        pitch_inicial: 0,
        hfov_inicial: 100,
        es_escena_inicial: false,
        x_porcentaje: 32,
        y_porcentaje: 60,
        hotspots: [
            { tipo: 'enlace', yaw: 180, pitch: 0, texto: 'Regresar al Lobby', scene_destino_slug: 'lobby' },
            { tipo: 'info', yaw: 0, pitch: 15, texto: 'Espacio de Formación Espiritual y Eucarística' }
        ]
    },
    {
        id: 4,
        slug: 'cafeteria',
        nombre: 'Parque y Cafetería',
        imagen_url: '/recorrido_virtual/4.parque_cafeteria.jpg',
        yaw_inicial: 0,
        pitch_inicial: 0,
        hfov_inicial: 100,
        es_escena_inicial: false,
        x_porcentaje: 42,
        y_porcentaje: 52,
        hotspots: [
            { tipo: 'enlace', yaw: -70, pitch: 0, texto: 'Ir al Coliseo Deportivo', scene_destino_slug: 'cancha_grande' },
            { tipo: 'enlace', yaw: 130, pitch: 0, texto: 'Volver al Lobby', scene_destino_slug: 'lobby' },
            { tipo: 'info', yaw: 0, pitch: 10, texto: 'Zona de Recreación y Alimentación Saludable' }
        ]
    },
    {
        id: 5,
        slug: 'cancha_grande',
        nombre: 'Coliseo Deportivo Principal',
        imagen_url: '/recorrido_virtual/19.cancha_grande.jpg',
        yaw_inicial: 0,
        pitch_inicial: 0,
        hfov_inicial: 100,
        es_escena_inicial: false,
        x_porcentaje: 62,
        y_porcentaje: 42,
        hotspots: [
            { tipo: 'enlace', yaw: 85, pitch: -2, texto: 'Ir a Sala de Informática', scene_destino_slug: 'informatica' },
            { tipo: 'enlace', yaw: -110, pitch: 0, texto: 'Ir al Gimnasio', scene_destino_slug: 'gimnasio' },
            { tipo: 'info', yaw: 0, pitch: 15, texto: 'Cancha Polideportiva Reglamentaria' }
        ]
    },
    {
        id: 6,
        slug: 'informatica',
        nombre: 'Sala de Informática',
        imagen_url: '/recorrido_virtual/12.informatica_a.jpg',
        yaw_inicial: 0,
        pitch_inicial: 0,
        hfov_inicial: 100,
        es_escena_inicial: false,
        x_porcentaje: 76,
        y_porcentaje: 32,
        hotspots: [
            { tipo: 'enlace', yaw: -130, pitch: 0, texto: 'Ir a la Biblioteca', scene_destino_slug: 'biblioteca' },
            { tipo: 'enlace', yaw: 50, pitch: 0, texto: 'Volver a Canchas', scene_destino_slug: 'cancha_grande' },
            { tipo: 'info', yaw: 0, pitch: 10, texto: 'Laboratorio de Computación e Investigación' }
        ]
    },
    {
        id: 7,
        slug: 'gimnasio',
        nombre: 'Gimnasio Deportivo',
        imagen_url: '/recorrido_virtual/34.gimnasio.jpg',
        yaw_inicial: 0,
        pitch_inicial: 0,
        hfov_inicial: 100,
        es_escena_inicial: false,
        x_porcentaje: 84,
        y_porcentaje: 48,
        hotspots: [
            { tipo: 'enlace', yaw: 160, pitch: 0, texto: 'Volver a Canchas', scene_destino_slug: 'cancha_grande' },
            { tipo: 'info', yaw: 0, pitch: 8, texto: 'Área para Acondicionamiento Físico' }
        ]
    },
    {
        id: 8,
        slug: 'biblioteca',
        nombre: 'Biblioteca Institucional',
        imagen_url: '/recorrido_virtual/38.biblioteca.jpg',
        yaw_inicial: 0,
        pitch_inicial: 0,
        hfov_inicial: 100,
        es_escena_inicial: false,
        x_porcentaje: 88,
        y_porcentaje: 18,
        hotspots: [
            { tipo: 'enlace', yaw: 180, pitch: 0, texto: 'Ir a Informática', scene_destino_slug: 'informatica' },
            { tipo: 'info', yaw: 0, pitch: 12, texto: 'Biblioteca General y Sala de Lectura' }
        ]
    }
];

export default function VideoExperience({ scenes = [], tour = null }) {
    const bgRef = useRef(null);
    const [tour360Open, setTour360Open] = useState(false);
    const [activeSceneSlug, setActiveSceneSlug] = useState('entrada');

    const activeScenes = scenes && scenes.length > 0 ? scenes : VIRTUAL_TOUR_SCENES;

    // Handle ESC key to exit 360 viewer modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && tour360Open) {
                setTour360Open(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        if (tour360Open) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [tour360Open]);

    const handleMouseMove = (e) => {
        if (!bgRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        bgRef.current.style.transform = `scale(1.1) translate(${x * 20}px, ${y * 20}px)`;
        bgRef.current.style.transition = 'transform 0.1s ease-out';
    };

    return (
        <section className="relative w-full py-28 md:py-36 bg-slate-950 overflow-hidden select-none">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0 opacity-40 overflow-hidden">
                <div
                    ref={bgRef}
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out scale-105"
                    style={{ backgroundImage: `url('/recorrido_virtual/1.entrada.jpg')` }}
                    onMouseMove={handleMouseMove}
                />
            </div>

            <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/90 pointer-events-none" />

            <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
                <ScrollReveal distance="translate-y-6" className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-extrabold text-xs tracking-wider uppercase mb-8 backdrop-blur-md shadow-lg shadow-blue-500/10">
                    <Compass className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '10s' }} />
                    <span>Experiencia Virtual Interactiva</span>
                </ScrollReveal>

                <ScrollReveal distance="translate-y-8" delay={150} className="mb-10 flex justify-center">
                    <button
                        onClick={() => setTour360Open(true)}
                        className="group relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_50px_rgba(37,99,235,0.5)] hover:shadow-[0_0_70px_rgba(37,99,235,0.8)] hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md border border-white/20"
                        aria-label="Abrir Recorrido Virtual 360"
                    >
                        <span className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping opacity-25" style={{ animationDuration: '3.5s' }}></span>

                        <Play className="w-7 h-7 md:w-8 md:h-8 fill-white ml-1 transition-transform duration-300 group-hover:scale-110" />
                    </button>
                </ScrollReveal>

                <ScrollReveal distance="translate-y-8" delay={300} className="space-y-4">
                    <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        Explora el campus en 360° interactivo
                    </h3>
                    <p className="text-slate-400 font-semibold text-[15px] md:text-[17px] max-w-lg mx-auto leading-relaxed">
                        Navega de forma inmersiva por las instalaciones del colegio y descubre cada rincón de nuestra institución.
                    </p>
                </ScrollReveal>
            </div>

            {/* FULLSCREEN 360° INTERACTIVE LIGHTBOX PORTAL */}
            {tour360Open && createPortal(
                <div className="fixed inset-0 z-[999999] bg-slate-950 flex flex-col overflow-hidden animate-fadeIn">
                    
                    {/* Top Right Corner Floating Exit Button */}
                    <div className="absolute top-6 right-6 z-[999999] flex items-center gap-3">
                        <button
                            onClick={() => setTour360Open(false)}
                            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-black px-5 py-3 rounded-2xl shadow-[0_10px_30px_rgba(225,29,72,0.6)] backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer border border-rose-400/40"
                            aria-label="Cerrar Recorrido Virtual 360"
                        >
                            <X className="w-5 h-5 stroke-[3]" />
                            <span>Salir del Recorrido 360°</span>
                        </button>
                    </div>

                    {/* Pannellum 360 Tour Viewer Component */}
                    <div className="w-full h-full flex-1 relative">
                        <TourViewer
                            scenes={activeScenes}
                            initialSceneSlug={activeScenes[0]?.slug || 'entrada'}
                            activeSceneSlug={activeSceneSlug}
                            onSceneChange={(slug) => setActiveSceneSlug(slug)}
                            className="rounded-none border-none shadow-none min-h-screen"
                        />
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
}
