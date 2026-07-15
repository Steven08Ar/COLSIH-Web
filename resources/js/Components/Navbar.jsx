import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

const nosotrosLinks = [
    { label: 'Quiénes somos', href: '/nosotros' },
    { label: 'Historia', href: '/nosotros/historia' },
    { label: 'Misión y Visión', href: '/nosotros/mision-vision' },
    { label: 'Valores', href: '/nosotros/valores' },
    { label: 'Equipo', href: '/nosotros/equipo' },
];

export default function Navbar() {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const closeDelayTimer = useRef(null);
    const unmountTimer = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
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

    const nosotrosActive = nosotrosLinks.some(l => url === l.href || url.startsWith(l.href + '/'));

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-4' : 'bg-white py-6'
        }`}>
            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] flex items-center justify-between">

                {/* Logo — mismo layout que Hero, colores para fondo blanco */}
                <Link href="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
                    <img
                        src="/escudo.png"
                        alt="Escudo COLSIH"
                        className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="flex flex-col leading-none">
                        <span className="text-[11px] tracking-widest uppercase text-slate-400 font-semibold">Colegio</span>
                        <span className="text-[20px] font-black tracking-tight text-red-700 mt-0.5">SANTA ISABEL</span>
                        <span className="text-[12px] tracking-wide font-medium text-slate-500 mt-0.5">de Hungría</span>
                    </div>
                </Link>

                {/* Desktop nav — misma estructura y gaps que Hero */}
                <div className="hidden lg:flex items-center gap-10 text-[15px] font-semibold text-slate-500">
                    <Link href="/" className={`transition-colors ${url === '/' ? 'text-red-700' : 'hover:text-slate-800'}`}>
                        Inicio
                    </Link>

                    {/* Nuestro Colegio — mismo dropdown animado que Hero */}
                    <div
                        className="relative py-2"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                    >
                        <button
                            className={`flex items-center gap-1 transition-colors focus:outline-none cursor-pointer ${
                                nosotrosActive ? 'text-red-700' : 'hover:text-slate-800'
                            }`}
                            aria-expanded={dropdownOpen}
                        >
                            Nuestro Colegio
                            <svg
                                className={`w-3.5 h-3.5 transition-transform duration-150 ${dropdownOpen ? 'rotate-180' : ''}`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {dropdownVisible && (
                            <div
                                className={`absolute left-1/2 -translate-x-1/2 top-full mt-3 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 origin-top
                                    transition-all duration-150 ease-out
                                    ${dropdownOpen
                                        ? 'opacity-100 translate-y-0 scale-100'
                                        : 'opacity-0 -translate-y-2 scale-95'
                                    }`}
                            >
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-t border-l border-slate-100" />
                                <div className="relative">
                                    {nosotrosLinks.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`block px-5 py-2.5 text-sm font-medium transition-colors hover:bg-slate-50 hover:text-red-700 ${
                                                url === item.href ? 'text-red-700 bg-red-50/50' : 'text-slate-600'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/oferta-academica" className={`transition-colors ${url === '/oferta-academica' ? 'text-red-700' : 'hover:text-slate-800'}`}>Oferta Académica</Link>
                    <Link href="/admisiones" className={`transition-colors ${url === '/admisiones' ? 'text-red-700' : 'hover:text-slate-800'}`}>Admisiones</Link>
                    <Link href="/noticias" className={`transition-colors ${url.startsWith('/noticias') ? 'text-red-700' : 'hover:text-slate-800'}`}>Comunidad</Link>
                    <Link href="/contacto" className={`transition-colors ${url === '/contacto' ? 'text-red-700' : 'hover:text-slate-800'}`}>Contacto</Link>
                </div>

                {/* CTA + mobile toggle — mismo estilo que Hero */}
                <div className="flex items-center gap-3 shrink-0">
                    <Link
                        href="/inscripcion"
                        className="hidden lg:inline-flex items-center justify-center bg-[#E31C23] hover:bg-[#c4181e] text-white font-extrabold text-sm px-6 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                        Matricúlate
                    </Link>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
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

            {/* Mobile panel — mismo estilo que Hero pero en blanco */}
            {mobileOpen && (
                <div className="lg:hidden mt-2 mx-6 md:mx-12 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-4 py-4 space-y-1">
                        <Link href="/" onClick={() => setMobileOpen(false)}
                            className={`block px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${url === '/' ? 'text-red-700 bg-red-50/80' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'}`}
                        >
                            Inicio
                        </Link>
                        <div>
                            <span className="block px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Nuestro Colegio</span>
                            <div className="ml-3 border-l-2 border-slate-100 pl-3 space-y-1">
                                {nosotrosLinks.map((item) => (
                                    <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                                        className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${url === item.href ? 'text-red-700 bg-red-50/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        {[
                            { label: 'Oferta Académica', href: '/oferta-academica' },
                            { label: 'Admisiones', href: '/admisiones' },
                            { label: 'Comunidad', href: '/noticias' },
                            { label: 'Contacto', href: '/contacto' },
                        ].map((link) => (
                            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                                className={`block px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${url === link.href ? 'text-red-700 bg-red-50/80' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-2 border-t border-slate-100">
                            <Link href="/inscripcion" onClick={() => setMobileOpen(false)}
                                className="w-full flex items-center justify-center bg-[#E31C23] hover:bg-[#c4181e] text-white font-extrabold py-3 px-4 rounded-xl transition-colors"
                            >
                                Matricúlate
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
