import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import TourViewer from '@/Components/Tour360/TourViewer';
import ScrollReveal from './ScrollReveal';
import { Compass, X, Play } from 'lucide-react';

export default function VideoExperience({ scenes = [], tour = null }) {
    const bgRef = useRef(null);
    const [tour360Open, setTour360Open] = useState(false);

    const activeScenes = Array.isArray(scenes) && scenes.length > 0 ? scenes : [];
    const initialScene = activeScenes.find(s => s.es_escena_inicial) || activeScenes[0] || null;
    const [activeSceneSlug, setActiveSceneSlug] = useState(initialScene?.slug ?? null);

    const enConstruccion = Boolean(tour?.en_construccion);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && tour360Open) setTour360Open(false);
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

    const bgImage = 'https://media.colsih.edu.co/home/panoramica.png';

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
            {/* Background Image from DB */}
            <div className="absolute inset-0 z-0 opacity-40 overflow-hidden">
                <div
                    ref={bgRef}
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out scale-105"
                    style={bgImage ? { backgroundImage: `url('${bgImage}')` } : {}}
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
                enConstruccion ? (
                    <div className="fixed inset-0 z-[999999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
                        <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl overflow-hidden font-sans">
                            {/* Background Glow */}
                            <div className="absolute -top-12 -right-12 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                            {/* Close Button */}
                            <button
                                onClick={() => setTour360Open(false)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition cursor-pointer"
                                aria-label="Cerrar aviso"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Icon & Badge */}
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto shadow-lg shadow-amber-500/10">
                                <span className="text-4xl animate-bounce">🚧</span>
                            </div>

                            <div className="space-y-3">
                                <div className="inline-block px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-widest border border-amber-500/30">
                                    Modo en Construcción
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                    Recorrido 360° en Construcción
                                </h3>
                                <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed max-w-sm mx-auto">
                                    Estamos actualizando las instalaciones virtuales de nuestra institución para ofrecerte una experiencia interactiva renovada. ¡Próximamente disponible!
                                </p>
                            </div>

                            <div className="pt-2">
                                <button
                                    onClick={() => setTour360Open(false)}
                                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#800A15] to-[#a00d1b] hover:from-[#600710] hover:to-[#800A15] text-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-rose-950/40 cursor-pointer"
                                >
                                    Entendido
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="fixed inset-0 z-[999999] bg-slate-950 flex flex-col overflow-hidden animate-fadeIn">
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

                        <div className="w-full h-full flex-1 relative">
                            <TourViewer
                                scenes={activeScenes}
                                initialSceneSlug={initialScene?.slug}
                                activeSceneSlug={activeSceneSlug}
                                onSceneChange={(slug) => setActiveSceneSlug(slug)}
                                className="rounded-none border-none shadow-none min-h-screen"
                            />
                        </div>
                    </div>
                ),
                document.body
            )}
        </section>
    );
}
