import { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';

const nosotrosLinks = [
    { label: 'Quiénes somos', href: '/nosotros' },
    { label: 'Historia', href: '/nosotros/historia' },
    { label: 'Misión y Visión', href: '/nosotros/mision-vision' },
    { label: 'Valores', href: '/nosotros/valores' },
    { label: 'Equipo', href: '/nosotros/equipo' },
];

const ofertaLinks = [
    { label: 'Visión General', href: '/oferta-academica' },
    { label: 'Preescolar', href: '/oferta-academica/preescolar' },
    { label: 'Básica Primaria', href: '/oferta-academica/primaria' },
    { label: 'Bachillerato', href: '/oferta-academica/bachillerato' },
    { label: 'Convenio SENA', href: '/oferta-academica/sena' },
];

export default function Hero({ setVideoOpen }) {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Dropdown animation state
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const closeDelayTimer = useRef(null);
    const unmountTimer = useRef(null);

    // Oferta Dropdown
    const [ofertaVisible, setOfertaVisible] = useState(false);
    const [ofertaOpenState, setOfertaOpenState] = useState(false);
    const ofertaCloseTimer = useRef(null);
    const ofertaUnmountTimer = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        return () => {
            clearTimeout(closeDelayTimer.current);
            clearTimeout(unmountTimer.current);
            clearTimeout(ofertaCloseTimer.current);
            clearTimeout(ofertaUnmountTimer.current);
        };
    }, []);

    function handleDropdownEnter() {
        clearTimeout(closeDelayTimer.current);
        clearTimeout(unmountTimer.current);
        setDropdownVisible(true);
        requestAnimationFrame(() => setDropdownOpen(true));
    }

    function handleDropdownLeave() {
        closeDelayTimer.current = setTimeout(() => {
            setDropdownOpen(false);
            unmountTimer.current = setTimeout(() => {
                setDropdownVisible(false);
            }, 150);
        }, 100);
    }

    function handleOfertaEnter() {
        clearTimeout(ofertaCloseTimer.current);
        clearTimeout(ofertaUnmountTimer.current);
        setOfertaVisible(true);
        requestAnimationFrame(() => setOfertaOpenState(true));
    }

    function handleOfertaLeave() {
        ofertaCloseTimer.current = setTimeout(() => {
            setOfertaOpenState(false);
            ofertaUnmountTimer.current = setTimeout(() => {
                setOfertaVisible(false);
            }, 150);
        }, 100);
    }

    return (
        <section className="relative flex items-center min-h-[900px] lg:min-h-[980px] h-screen w-full bg-[#08111F] overflow-hidden select-none">
            {/* Transparent Borderless Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 bg-gradient-to-b from-[#08111F]/60 to-transparent ${scrolled ? 'bg-[#08111F]/40 backdrop-blur-md' : 'backdrop-blur-[2px]'
                }`}>
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] flex items-center justify-between">
                    {/* Logo (left) */}
                    <Link href="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
                        <img
                            src="/marca/logo-colsih.svg"
                            alt="Logo COLSIH"
                            className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="flex flex-col leading-none text-white">
                            <span className="text-[11px] tracking-widest uppercase opacity-60 font-semibold">Colegio</span>
                            <span className="text-[20px] font-black tracking-tight text-white mt-0.5">
                                SANTA ISABEL
                            </span>
                            <span className="text-[12px] tracking-wide font-medium opacity-80 mt-0.5">de Hungría</span>
                        </div>
                    </Link>

                    {/* Navigation centered */}
                    <div className="hidden lg:flex items-center gap-10 text-[15px] font-semibold text-white/70">
                        <Link href="/" className="text-white hover:text-white transition-colors">Inicio</Link>

                        {/* Nuestro Colegio dropdown */}
                        <div
                            className="relative py-2"
                            onMouseEnter={handleDropdownEnter}
                            onMouseLeave={handleDropdownLeave}
                        >
                            <button className="flex items-center gap-1 hover:text-white transition-colors focus:outline-none cursor-pointer">
                                Nuestro Colegio
                                <svg
                                    className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {dropdownVisible && (
                                <div
                                    className={`absolute left-1/2 -translate-x-1/2 top-full mt-1.5 w-52 bg-gradient-to-b from-[#08111F]/95 to-[#08111F]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] py-2.5 z-50 origin-top
                                        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                                        ${dropdownOpen
                                            ? 'opacity-100 translate-y-0 scale-100'
                                            : 'opacity-0 -translate-y-2 scale-[0.98]'
                                        }`}
                                >
                                    {nosotrosLinks.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`block px-4 py-2.5 mx-1.5 text-[14px] font-semibold rounded-xl transition-all duration-200 hover:bg-white/[0.08] hover:text-white ${url === item.href ? 'text-white bg-white/[0.06]' : 'text-white/70'
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Oferta Académica Dropdown */}
                        <div
                            className="relative py-2"
                            onMouseEnter={handleOfertaEnter}
                            onMouseLeave={handleOfertaLeave}
                        >
                            <Link
                                href="/oferta-academica"
                                className="flex items-center gap-1 hover:text-white transition-colors focus:outline-none cursor-pointer"
                            >
                                Oferta Académica
                                <svg
                                    className={`w-3.5 h-3.5 transition-transform duration-300 ${ofertaOpenState ? 'rotate-180' : ''}`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                            </Link>

                            {ofertaVisible && (
                                <div
                                    className={`absolute left-1/2 -translate-x-1/2 top-full mt-1.5 w-56 bg-gradient-to-b from-[#08111F]/95 to-[#08111F]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] py-2.5 z-50 origin-top
                                        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                                        ${ofertaOpenState
                                            ? 'opacity-100 translate-y-0 scale-100'
                                            : 'opacity-0 -translate-y-2 scale-[0.98]'
                                        }`}
                                >
                                    {ofertaLinks.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`block px-4 py-2.5 mx-1.5 text-[14px] font-semibold rounded-xl transition-all duration-200 hover:bg-white/[0.08] hover:text-white ${url === item.href ? 'text-white bg-white/[0.06]' : 'text-white/70'
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link href="/admisiones" className="hover:text-white transition-colors">Admisiones</Link>
                        <Link href="/noticias" className="hover:text-white transition-colors">Noticias</Link>
                        <Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link>
                    </div>

                    {/* CTA + Mobile toggle */}
                    <div className="flex items-center gap-3 shrink-0">
                        {url === '/mjs' ? (
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center focus:outline-none cursor-pointer"
                                title="Ir al Colegio Santa Isabel de Hungría"
                            >
                                <img
                                    src="/marca/logo-colsih.svg"
                                    alt="Logo COLSIH"
                                    className="h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-all duration-300"
                                />
                            </Link>
                        ) : (
                            <a
                                href="https://e.plataformaintegra.net/sihungria/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#800A15] hover:bg-[#9e0d1c] text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg shadow-[#800A15]/30 hover:scale-105 transition-all duration-300 border border-white/20"
                                title="Ingreso a Plataforma Integra"
                            >
                                <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                </svg>
                                <span>Plataforma</span>
                            </a>
                        )}

                        {/* Mobile toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
                            aria-label="Abrir menú"
                        >
                            {mobileOpen ? (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile panel */}
                {mobileOpen && (
                    <div className="lg:hidden mt-2 mx-6 md:mx-12 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="px-4 py-4 space-y-1">
                            <Link href="/" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-white rounded-lg hover:bg-white/10 transition-colors">Inicio</Link>
                            <div>
                                <span className="block px-3 py-2 text-xs font-bold text-white/40 uppercase tracking-wider">Nuestro Colegio</span>
                                <div className="ml-3 border-l border-white/20 pl-3 space-y-1">
                                    {nosotrosLinks.map((item) => (
                                        <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-medium text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <Link href="/oferta-academica" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-white/75 hover:text-white rounded-lg hover:bg-white/10 transition-colors">Oferta Académica</Link>
                            <Link href="/admisiones" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-white/75 hover:text-white rounded-lg hover:bg-white/10 transition-colors">Admisiones</Link>
                            <Link href="/noticias" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-white/75 hover:text-white rounded-lg hover:bg-white/10 transition-colors">Noticias</Link>
                            <Link href="/contacto" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-white/75 hover:text-white rounded-lg hover:bg-white/10 transition-colors">Contacto</Link>
                            {url !== '/mjs' && (
                                <div className="pt-2 border-t border-white/10">
                                    <a
                                        href="https://e.plataformaintegra.net/sihungria/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#800A15] hover:bg-[#9e0d1c] text-white text-xs font-extrabold shadow-md border border-white/20 transition-all duration-300"
                                    >
                                        <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        </svg>
                                        <span>Ingreso a Plataforma</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Background Video ("Video Home.mp4" nativo HTML5, autoplay sin bloqueo, bucle perfecto e indetectable por Brave) */}
            <div className="absolute inset-0 w-full h-full z-0 select-none overflow-hidden pointer-events-none">
                <video
                    ref={(videoEl) => {
                        if (videoEl) {
                            videoEl.muted = true;
                            videoEl.play().catch(() => {});
                        }
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    controls={false}
                    disablePictureInPicture
                    onEnded={(e) => {
                        e.target.currentTime = 0;
                        e.target.play().catch(() => {});
                    }}
                    className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover contrast-[1.05] brightness-75 md:brightness-[0.85] scale-105 pointer-events-none"
                >
                    <source src="/Video%20Home.mp4" type="video/mp4" />
                    <source src="/Video Home.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Dark Gradient Overlay for Mobile (full overlay) */}
            <div className="absolute inset-0 bg-slate-950/70 md:hidden z-10 pointer-events-none"></div>

            {/* Wavy Dark Gradient Overlay for Desktop (left 50%) */}
            <div className="absolute top-[-50px] bottom-[-50px] h-[calc(100%+100px)] left-0 w-full md:w-[60%] lg:w-[50%] z-10 hidden md:block pointer-events-none">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 600 800"
                    preserveAspectRatio="none"
                    fill="none"
                >
                    <defs>
                        <linearGradient id="darkWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#08111F" stopOpacity="1" />
                            <stop offset="70%" stopColor="#08111F" stopOpacity="1" />
                            <stop offset="90%" stopColor="#08111F" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#08111F" stopOpacity="0" />
                        </linearGradient>
                        <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="30" />
                        </filter>
                    </defs>
                    <path
                        d="M -150 0 L 540 0 C 510 200, 480 350, 480 400 C 480 450, 460 650, 420 800 L -150 800 Z"
                        fill="url(#darkWaveGrad)"
                        filter="url(#softBlur)"
                    />
                </svg>
            </div>

            {/* BOTTOM organic layered waves (Red, Blue, and White) */}
            <div className="absolute bottom-0 left-0 w-full h-[120px] sm:h-[150px] md:h-[220px] z-20 pointer-events-none select-none">
                <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="none">
                    {/* Onda Roja (Atrás izquierda) */}
                    <path d="M 0 70 C 200 150, 450 180, 700 180 L 1200 200 L 0 200 Z" fill="#800A15" />

                    {/* Onda Azul (Atrás derecha) */}
                    <path d="M 0 130 C 350 190, 700 150, 1200 0 L 1200 200 L 0 200 Z" fill="#003C8F" />

                    {/* Onda Blanca (Al frente) */}
                    <path d="M 0 130 C 250 210, 600 190, 900 110 C 1050 70, 1150 35, 1200 15 L 1200 200 L 0 200 Z" fill="white" />
                </svg>
            </div>

            {/* Main Content Container (Figma grid aligned) */}
            <div className="relative z-30 max-w-[1680px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full pt-24 pb-16">
                <div className="grid grid-cols-12 gap-6 items-center">

                    {/* Left Side Content (shifted left) */}
                    <div className="col-span-12 md:col-span-7 lg:col-span-6 space-y-8 text-left -ml-1 sm:-ml-2 lg:-ml-4">
                        {/* Headline con tipografias y colores combinados */}
                        <h1 className="text-4xl sm:text-5xl lg:text-[64px] xl:text-[72px] font-black text-white leading-[1.1] tracking-tight font-sans animate-fadeIn">
                            {/* Linea 1: Formamos */}
                            <span className="block text-white/90 text-2xl sm:text-3xl lg:text-[42px] font-extrabold tracking-widest uppercase font-sans mb-1 text-slate-200 drop-shadow-md">
                                Formamos
                            </span>

                            {/* Linea 2: buenos Cristianos */}
                            <span className="block leading-tight my-1">
                                <span className="font-serif text-amber-300 text-4xl sm:text-5xl lg:text-[72px] xl:text-[82px] font-normal lowercase tracking-normal mr-3 inline-block transform -rotate-2 drop-shadow-[0_4px_20px_rgba(251,191,36,0.5)]">
                                    buenos
                                </span>
                                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent font-black tracking-tight drop-shadow-[0_4px_25px_rgba(245,158,11,0.6)]">
                                    Cristianos
                                </span>
                            </span>

                            {/* Linea 3: Honestos ciudadanos */}
                            <span className="block leading-tight mt-1">
                                <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-200 bg-clip-text text-transparent font-black tracking-tight drop-shadow-[0_4px_25px_rgba(56,189,248,0.6)]">
                                    Honestos
                                </span>{" "}
                                <span className="text-white font-extrabold tracking-tight drop-shadow-lg">
                                    ciudadanos
                                </span>
                            </span>
                        </h1>


                    </div>

                </div>
            </div>
        </section>
    );
}
