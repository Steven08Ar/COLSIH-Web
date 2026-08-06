import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

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

export default function Navbar() {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Nosotros Dropdown
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
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
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

    const nosotrosActive = nosotrosLinks.some(l => url === l.href || url.startsWith(l.href + '/'));
    const ofertaActive = ofertaLinks.some(l => url === l.href || url.startsWith(l.href));

    return (
        <header className={`fixed top-0 left-0 w-full z-50 py-4 transition-all duration-300 bg-gradient-to-b from-[#08111F]/60 to-transparent ${
            scrolled ? 'bg-[#08111F]/40 backdrop-blur-md' : 'backdrop-blur-[2px]'
        }`}>
            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] flex items-center justify-between">

                {/* Logo */}
                <Link href={url === '/mjs' ? '/mjs' : '/'} className="flex items-center gap-3 group focus:outline-none shrink-0">
                    <img
                        src={url === '/mjs' ? '/marca/logo-mjs.svg' : '/marca/logo-colsih.svg'}
                        alt={url === '/mjs' ? 'Logo MJS' : 'Logo COLSIH'}
                        className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    {url === '/mjs' ? (
                        <div className="flex flex-col leading-none text-white">
                            <span className="text-[11px] tracking-widest uppercase opacity-60 font-semibold">Movimiento</span>
                            <span className="text-[20px] font-black tracking-tight text-white mt-0.5">JUVENIL</span>
                            <span className="text-[12px] tracking-wide font-medium opacity-80 mt-0.5">Salesiano</span>
                        </div>
                    ) : (
                        <div className="flex flex-col leading-none text-white">
                            <span className="text-[11px] tracking-widest uppercase opacity-60 font-semibold">Colegio</span>
                            <span className="text-[20px] font-black tracking-tight text-white mt-0.5">SANTA ISABEL</span>
                            <span className="text-[12px] tracking-wide font-medium opacity-80 mt-0.5">de Hungría</span>
                        </div>
                    )}
                </Link>

                {/* Desktop nav */}
                <div className="hidden lg:flex items-center gap-10 text-[15px] font-semibold text-white/80">
                    <Link href="/" className={`transition-colors ${url === '/' ? 'text-white font-extrabold' : 'hover:text-white'}`}>
                        Inicio
                    </Link>

                    {/* Nuestro Colegio */}
                    <div
                        className="relative py-2"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                    >
                        <button
                            className={`flex items-center gap-1 transition-colors focus:outline-none cursor-pointer ${
                                nosotrosActive ? 'text-white font-extrabold' : 'hover:text-white'
                            }`}
                            aria-expanded={dropdownOpen}
                        >
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
                                <div className="relative">
                                    {nosotrosLinks.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`block px-4 py-2.5 mx-1.5 text-[14px] font-semibold rounded-xl transition-all duration-200 hover:bg-white/[0.08] hover:text-white ${
                                                url === item.href ? 'text-white bg-white/[0.06]' : 'text-white/70'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
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
                            className={`flex items-center gap-1 transition-colors focus:outline-none cursor-pointer ${
                                ofertaActive ? 'text-white font-extrabold' : 'hover:text-white'
                            }`}
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
                                <div className="relative">
                                    {ofertaLinks.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`block px-4 py-2.5 mx-1.5 text-[14px] font-semibold rounded-xl transition-all duration-200 hover:bg-white/[0.08] hover:text-white ${
                                                url === item.href ? 'text-white bg-white/[0.06]' : 'text-white/70'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/admisiones" className={`transition-colors ${url === '/admisiones' ? 'text-white font-extrabold' : 'hover:text-white'}`}>Admisiones</Link>
                    <Link href="/deportes" className={`transition-colors ${url === '/deportes' ? 'text-white font-extrabold' : 'hover:text-white'}`}>Deportes</Link>
                    <Link href="/noticias" className={`transition-colors ${url.startsWith('/noticias') ? 'text-white font-extrabold' : 'hover:text-white'}`}>Noticias</Link>
                    <Link href="/contacto" className={`transition-colors ${url === '/contacto' ? 'text-[#800A15] font-extrabold' : 'hover:text-white'}`}>Contacto</Link>
                </div>

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
                        <div className="hidden md:flex items-center gap-2">
                            <a
                                href="https://e.plataformaintegra.net/sihungria/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#800A15] hover:bg-[#9e0d1c] text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg shadow-[#800A15]/30 hover:scale-105 transition-all duration-300 border border-white/20"
                                title="Ingreso a Plataforma Integra"
                            >
                                <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                </svg>
                                <span>Plataforma</span>
                            </a>
                            <a
                                href="https://e.plataformaintegra.net/sihungria/index.php/cupo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#003C8F] hover:bg-[#002e6e] text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg shadow-blue-900/40 hover:scale-105 transition-all duration-300 border border-white/20"
                                title="Solicitud de Cupo e Inscripción 2026"
                            >
                                <svg className="w-4 h-4 text-amber-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span>INSCRIPCIONES</span>
                            </a>
                        </div>
                    )}

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
                <div className="lg:hidden mt-2 mx-6 md:mx-12 bg-[#08111F]/95 backdrop-blur-md border border-white/15 rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">
                    <div className="px-4 py-4 space-y-1">
                        <Link href="/" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 text-sm font-semibold rounded-lg ${url === '/' ? 'text-white bg-white/10' : 'text-white/85'}`}>Inicio</Link>
                        
                        <div>
                            <span className="block px-3 py-2 text-xs font-bold text-white/40 uppercase tracking-wider">Nuestro Colegio</span>
                            <div className="ml-3 border-l border-white/20 pl-3 space-y-1">
                                {nosotrosLinks.map((item) => (
                                    <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`block px-3 py-1.5 text-sm font-medium rounded-lg ${url === item.href ? 'text-white bg-white/10' : 'text-white/75'}`}>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <span className="block px-3 py-2 text-xs font-bold text-white/40 uppercase tracking-wider">Oferta Académica</span>
                            <div className="ml-3 border-l border-white/20 pl-3 space-y-1">
                                {ofertaLinks.map((item) => (
                                    <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`block px-3 py-1.5 text-sm font-medium rounded-lg ${url === item.href ? 'text-white bg-white/10' : 'text-white/75'}`}>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link href="/admisiones" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 text-sm font-semibold rounded-lg ${url === '/admisiones' ? 'text-white bg-white/10' : 'text-white/85'}`}>Admisiones</Link>
                        <Link href="/deportes" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 text-sm font-semibold rounded-lg ${url === '/deportes' ? 'text-white bg-white/10' : 'text-white/85'}`}>Zona Deportiva</Link>
                        <Link href="/noticias" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 text-sm font-semibold rounded-lg ${url.startsWith('/noticias') ? 'text-white bg-white/10' : 'text-white/85'}`}>Noticias</Link>
                        <Link href="/contacto" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 text-sm font-semibold rounded-lg ${url === '/contacto' ? 'text-white bg-white/10' : 'text-white/85'}`}>Contacto</Link>

                        {url !== '/mjs' ? (
                            <div className="pt-2 border-t border-white/10 space-y-2">
                                <a
                                    href="https://e.plataformaintegra.net/sihungria/index.php/cupo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#003C8F] hover:bg-[#002e6e] text-white text-xs font-extrabold shadow-md border border-white/20 transition-all duration-300"
                                >
                                    <svg className="w-4 h-4 text-amber-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <span>INSCRIPCIONES 2026</span>
                                </a>
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
                        ) : (
                            <div className="pt-2 border-t border-white/10 flex justify-center">
                                <Link
                                    href="/"
                                    onClick={() => setMobileOpen(false)}
                                    className="py-2 focus:outline-none cursor-pointer"
                                    title="Ir al Colegio Santa Isabel de Hungría"
                                >
                                    <img
                                        src="/marca/logo-colsih.svg"
                                        alt="Logo COLSIH"
                                        className="h-10 w-auto object-contain hover:scale-105 transition-all duration-300"
                                    />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
