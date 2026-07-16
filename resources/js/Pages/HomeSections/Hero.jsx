import { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';

const nosotrosLinks = [
    { label: 'Quiénes somos', href: '/nosotros' },
    { label: 'Historia', href: '/nosotros/historia' },
    { label: 'Misión y Visión', href: '/nosotros/mision-vision' },
    { label: 'Valores', href: '/nosotros/valores' },
    { label: 'Equipo', href: '/nosotros/equipo' },
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

    return (
        <section className="relative flex items-center min-h-[900px] lg:min-h-[980px] h-screen w-full bg-[#08111F] overflow-hidden select-none">
            {/* Transparent Borderless Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 bg-gradient-to-b from-[#08111F]/60 to-transparent ${scrolled ? 'bg-[#08111F]/40 backdrop-blur-md' : 'backdrop-blur-[2px]'
                }`}>
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] flex items-center justify-between">
                    {/* Logo (left) */}
                    <Link href="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
                        <img
                            src="/Logo COLSIH.svg"
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

                        <Link href="/oferta-academica" className="hover:text-white transition-colors">Oferta Académica</Link>
                        <Link href="/admisiones" className="hover:text-white transition-colors">Admisiones</Link>
                        <Link href="/noticias" className="hover:text-white transition-colors">Comunidad</Link>
                        <Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link>
                    </div>

                    {/* CTA + Mobile toggle */}
                    <div className="flex items-center gap-3 shrink-0">
                        <a
                            href="/mjs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden lg:inline-flex items-center justify-center focus:outline-none cursor-pointer"
                            title="Movimiento Juvenil Salesiano"
                        >
                            <img 
                                src="/Logo-MJS.svg" 
                                alt="Logo MJS Colombia" 
                                className="h-12 w-auto object-contain hover:scale-105 transition-all duration-300"
                            />
                        </a>

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
                            <Link href="/noticias" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-white/75 hover:text-white rounded-lg hover:bg-white/10 transition-colors">Comunidad</Link>
                            <Link href="/contacto" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-white/75 hover:text-white rounded-lg hover:bg-white/10 transition-colors">Contacto</Link>
                            <div className="pt-2 border-t border-white/10 flex justify-center">
                                <a 
                                    href="/mjs" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    onClick={() => setMobileOpen(false)}
                                    className="py-2 focus:outline-none cursor-pointer"
                                    title="Movimiento Juvenil Salesiano"
                                >
                                    <img 
                                        src="/Logo-MJS.svg" 
                                        alt="Logo MJS Colombia" 
                                        className="h-10 w-auto object-contain hover:scale-105 transition-all duration-300"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Background Video (60% right side / Immersive) */}
            <div className="absolute inset-0 w-full h-full z-0 select-none overflow-hidden">
                <iframe
                    className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none contrast-[1.05] brightness-75 md:brightness-[0.85] scale-105"
                    src="https://www.youtube.com/embed/7hO_uWb8aLs?autoplay=1&mute=1&loop=1&playlist=7hO_uWb8aLs&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1&disablekb=1&fs=0&modestbranding=1&cc_load_policy=0"
                    title="Background Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
                {/* Transparent cover overlay to shield iframe from any touch, focus or clicks */}
                <div className="absolute inset-0 z-10 w-full h-full bg-transparent pointer-events-auto"></div>
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

            {/* TOP LEFT wave removed */}

            {/* BOTTOM organic layered waves (Red, Blue, and White) */}
            <div className="absolute bottom-0 left-0 w-full h-[120px] sm:h-[150px] md:h-[220px] z-20 pointer-events-none select-none">
                <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="none">
                    {/* Onda Roja (Atrás izquierda) */}
                    <path d="M 0 70 C 200 150, 450 180, 700 180 L 1200 200 L 0 200 Z" fill="#E31C23" />

                    {/* Onda Azul (Atrás derecha) */}
                    <path d="M 0 130 C 350 190, 700 150, 1200 0 L 1200 200 L 0 200 Z" fill="#0057D9" />

                    {/* Onda Blanca (Al frente) */}
                    <path d="M 0 130 C 250 210, 600 190, 900 110 C 1050 70, 1150 35, 1200 15 L 1200 200 L 0 200 Z" fill="white" />
                </svg>
            </div>

            {/* Main Content Container (Figma grid aligned) */}
            <div className="relative z-30 max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] w-full pt-24 pb-16">
                <div className="grid grid-cols-12 gap-6 items-center">

                    {/* Left Side Content (40% width / 5 columns) */}
                    <div className="col-span-12 md:col-span-6 lg:col-span-5 space-y-8 text-left">
                        {/* Headline (72-80px on desktop) */}
                        <h1 className="text-4xl sm:text-5xl lg:text-[72px] xl:text-[80px] font-black text-white leading-[1.03] tracking-tight font-sans animate-fadeIn">
                            Formamos hoy<br />
                            a los líderes<br />
                            del mañana
                        </h1>

                        {/* Subtitle (22px) */}
                        <p className="text-[17px] md:text-[22px] text-slate-300/90 font-medium leading-relaxed font-sans max-w-md animate-fadeIn">
                            Educación integral con excelencia académica, fe y valores para inspirar, transformar y liderar el futuro.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4">
                            {/* Primary CTA */}
                            <Link
                                href="/inscripcion"
                                className="inline-flex items-center justify-center bg-[#E31C23] hover:bg-[#c4181e] text-white font-extrabold text-sm px-8 py-4.5 rounded-full shadow-lg shadow-red-700/10 active:scale-[0.98] transition-all cursor-pointer"
                            >
                                Iniciar Proceso Online
                            </Link>

                            {/* Secondary Play Button */}
                            <button
                                onClick={() => setVideoOpen(true)}
                                className="inline-flex items-center gap-3 text-sm font-extrabold text-white/90 hover:text-white group cursor-pointer focus:outline-none py-2"
                            >
                                <span className="w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-all shadow-md group-hover:scale-105 active:scale-95">
                                    <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </span>
                                Conoce más
                            </button>
                        </div>
                    </div>



                </div>
            </div>
        </section>
    );
}
