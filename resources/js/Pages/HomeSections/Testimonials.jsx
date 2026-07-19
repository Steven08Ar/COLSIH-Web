import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

const FALLBACK = [
    {
        texto: 'La educación integral del colegio potenció mi excelencia académica y me enseñó el valor de liderar con justicia social y valores cristianos.',
        nombre: 'María Camila Restrepo',
        cargo: 'Egresada Promoción 2024',
        image: '/testimonio_egresada.png',
        videoUrl: 'https://www.youtube.com/embed/g3jS1rD5Kwk',
    },
    {
        texto: 'Como padre de familia, me siento plenamente respaldado. El acompañamiento docente y la formación en valores salesianos guía a mis hijos cada día.',
        nombre: 'Dr. Alejandro Gómez',
        cargo: 'Padre de Familia - Primaria',
        image: '/testimonio_padre.png',
        videoUrl: 'https://www.youtube.com/embed/qK10_2gR_U4',
    },
    {
        texto: 'Aprender con laboratorios interactivos me motiva a explorar mi pasión por la ciencia. Los profesores siempre nos impulsan a ir más allá.',
        nombre: 'Mateo Suárez',
        cargo: 'Estudiante de 10° Grado',
        image: '/testimonio_estudiante.png',
        videoUrl: 'https://www.youtube.com/embed/4b_W-N90e0c',
    },
];

function toEmbedUrl(url) {
    if (!url) return null;
    if (url.includes('/embed/')) return url;
    const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : url;
}

export default function Testimonials({ testimonios }) {
    const defaultImages = ['/testimonio_egresada.png', '/testimonio_padre.png', '/testimonio_estudiante.png'];
    const defaultVideos = [
        'https://www.youtube-nocookie.com/embed/g3jS1rD5Kwk',
        'https://www.youtube-nocookie.com/embed/qK10_2gR_U4',
        'https://www.youtube-nocookie.com/embed/4b_W-N90e0c',
    ];

    const list = (testimonios && testimonios.length > 0 ? testimonios : FALLBACK).slice(0, 3).map((t, idx) => ({
        texto: t.texto,
        nombre: t.nombre,
        cargo: t.cargo ?? '',
        image: t.imagen ? `/storage/${t.imagen}` : (t.image || defaultImages[idx % defaultImages.length]),
        videoUrl: toEmbedUrl(t.video_url || t.videoUrl) || defaultVideos[idx % defaultVideos.length],
    }));

    const [activeIndex, setActiveIndex] = useState(0);
    const [activeVideoUrl, setActiveVideoUrl] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    // Responsive listener
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % list.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
    };

    // Auto rotate every 7 seconds
    useEffect(() => {
        const interval = setInterval(handleNext, 7000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    // Escape key listener to close modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setActiveVideoUrl(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (activeVideoUrl) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [activeVideoUrl]);

    // Absolute positioned style configurations for smooth slide transitions
    const getCardStyle = (index) => {
        const offset = (index - activeIndex + list.length) % list.length;

        let style = {
            transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)',
            width: '100%',
            maxWidth: isMobile ? '310px' : '340px',
        };

        if (isMobile) {
            if (offset === 0) {
                // Active Center
                return {
                    ...style,
                    transform: 'translateX(-50%) scale(1)',
                    left: '50%',
                    opacity: 1,
                    zIndex: 20,
                    boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.85), 0 0 20px rgba(0, 0, 0, 0.65)',
                    pointerEvents: 'auto',
                };
            } else {
                // Hidden sides on mobile
                return {
                    ...style,
                    transform: 'translateX(-50%) scale(0.7)',
                    left: '50%',
                    opacity: 0,
                    zIndex: 0,
                    pointerEvents: 'none',
                };
            }
        } else {
            // Desktop 3D layout
            if (offset === 0) {
                // Center
                return {
                    ...style,
                    transform: 'translateX(-50%) scale(1.05)',
                    left: '50%',
                    opacity: 1,
                    zIndex: 20,
                    boxShadow: '0 25px 45px -10px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.7)',
                    pointerEvents: 'auto',
                };
            } else if (offset === 1) {
                // Right
                return {
                    ...style,
                    transform: 'translateX(-50%) scale(0.88)',
                    left: '80%',
                    opacity: 0.5,
                    zIndex: 10,
                    pointerEvents: 'none',
                };
            } else {
                // Left (offset === 2)
                return {
                    ...style,
                    transform: 'translateX(-50%) scale(0.88)',
                    left: '20%',
                    opacity: 0.5,
                    zIndex: 10,
                    pointerEvents: 'none',
                };
            }
        }
    };

    return (
        <section className="relative py-32 lg:py-40 bg-[#030712] overflow-hidden select-none">
            {/* Top Wave (White SVG transition) */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path d="M0,0 C380,90 760,10 1080,70 C1200,90 1320,80 1440,40 L1440,0 L0,0 Z" fill="#ffffff"></path>
                </svg>
            </div>

            {/* Layered Blue Waves Background */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#071329] to-[#020617]"></div>
                <svg className="absolute inset-x-0 bottom-0 w-full h-[600px] text-[#003C8F]/20" viewBox="0 0 1440 600" fill="currentColor" preserveAspectRatio="none">
                    <path d="M0,320L48,298.7C96,277,192,235,288,218.7C384,203,480,213,576,240C672,267,768,309,864,293.3C960,277,1056,203,1152,176C1248,149,1344,171,1392,181.3L1440,192L1440,600L1392,600C1344,600,1248,600,1152,600C1056,600,960,600,864,600C768,600,672,600,576,600C480,600,384,600,288,600C192,600,96,600,48,600L0,600Z" opacity="0.5"></path>
                    <path d="M0,240L48,229.3C96,219,192,197,288,213.3C384,230,480,283,576,272C672,261,768,187,864,176C960,165,1056,219,1152,224C1248,229,1344,187,1392,165.3L1440,144L1440,600L1392,600C1344,600,1248,600,1152,600C1056,600,960,600,864,600C768,600,672,600,576,600C480,600,384,600,288,600C192,600,96,600,48,600L0,600Z" opacity="0.3"></path>
                </svg>
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 space-y-16">
                {/* Section Header */}
                <div className="max-w-2xl mx-auto text-center space-y-4">
                    <span className="text-[#3b82f6] text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                        TESTIMONIOS
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight font-sans">
                        Nuestra voz comunitaria
                    </h2>
                </div>

                {/* 3D Highlight Carousel Container */}
                <ScrollReveal distance="translate-y-8">
                    <div className="relative max-w-6xl mx-auto px-12 md:px-4">
                        {/* Slide Track Container with relative height */}
                        <div className="relative w-full h-[480px] md:h-[500px] overflow-visible py-8">
                            {list.map((item, idx) => {
                                const offset = (idx - activeIndex + list.length) % list.length;
                                const isCenter = offset === 0;

                                return (
                                    <div
                                        key={idx}
                                        style={getCardStyle(idx)}
                                        onClick={() => isCenter && setActiveVideoUrl(item.videoUrl)}
                                        className="absolute top-1/2 -translate-y-1/2 flex flex-col justify-between min-h-[420px] rounded-3xl overflow-hidden shadow-lg border border-slate-800/80 bg-slate-900/50 cursor-pointer group"
                                    >
                                        {/* Background Image */}
                                        <img 
                                            src={item.image} 
                                            alt={item.nombre} 
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none z-0"
                                        />
                                        
                                        {/* Dark overlay mask - z-10 to stay on top of the image */}
                                        <div className="absolute inset-0 bg-slate-950/75 group-hover:bg-slate-950/80 transition-colors duration-500 z-10"></div>

                                        {/* Absolute Play Button Overlay (appears on hover) - z-40 to stay on top of the text */}
                                        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                                            <div className="w-16 h-16 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-md flex items-center justify-center transform scale-90 group-hover:scale-105 transition-all duration-500 shadow-xl">
                                                <svg className="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Content layer - z-30 to stay on top of all masks */}
                                        <div className="relative z-30 flex flex-col justify-between h-full p-8 flex-1">
                                            <div className="flex justify-between items-start">
                                                <span className="text-7xl font-serif text-white/25 select-none pointer-events-none leading-none">“</span>
                                                <div className="bg-[#800A15] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 select-none">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                                    Video
                                                </div>
                                            </div>

                                            {/* Spacing */}
                                            <div className="flex-1 min-h-[100px]"></div>

                                            {/* Bottom row */}
                                            <div className="space-y-4 pt-4">
                                                {/* Text Quote with layered dark shadows */}
                                                <p 
                                                    className="text-white text-sm md:text-base font-bold italic leading-relaxed font-sans"
                                                    style={{
                                                        textShadow: '0 2px 4px rgba(0,0,0,0.95), 0 4px 10px rgba(0,0,0,0.85), 0 0 15px rgba(0,0,0,0.5)'
                                                    }}
                                                >
                                                    «{item.texto}»
                                                </p>
                                                
                                                <div>
                                                    <span className="block text-base font-extrabold text-white font-sans drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">
                                                        {item.nombre}
                                                    </span>
                                                    {/* Role label directly on card background in Royal Blue */}
                                                    <span className="block text-xs font-bold text-[#3b82f6] uppercase tracking-wider mt-2 font-sans drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                                        {item.cargo}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Transparent Left Arrow Button */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm shadow-md"
                            aria-label="Testimonio anterior"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        {/* Transparent Right Arrow Button */}
                        <button
                            onClick={handleNext}
                            className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm shadow-md"
                            aria-label="Siguiente testimonio"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </ScrollReveal>

                {/* Floating Video Modal */}
                {activeVideoUrl && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity duration-300"
                        onClick={() => setActiveVideoUrl(null)}
                    >
                        {/* Close button outside wrapper */}
                        <button
                            onClick={() => setActiveVideoUrl(null)}
                            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-xl transition-all cursor-pointer border border-white/10 z-55"
                            aria-label="Cerrar video"
                        >
                            ✕
                        </button>

                        {/* Responsive Video Container */}
                        <div
                            className="relative bg-black rounded-3xl overflow-hidden max-w-4xl w-full aspect-video shadow-2xl border border-white/10 transform scale-100 transition-transform duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                src={`${activeVideoUrl}?autoplay=1`}
                                title="Testimonio de Video"
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Wave (White SVG transition back to white background) */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path d="M0,100 C380,10 760,90 1080,30 C1200,10 1320,20 1440,60 L1440,100 L0,100 Z" fill="#ffffff"></path>
                </svg>
            </div>
        </section>
    );
}
