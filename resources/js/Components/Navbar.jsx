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
        <header className={`fixed top-0 left-0 w-full z-50 py-4 transition-all duration-300 bg-gradient-to-b from-[#08111F]/60 to-transparent ${
            scrolled ? 'bg-[#08111F]/40 backdrop-blur-md' : 'backdrop-blur-[2px]'
        }`}>
            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] flex items-center justify-between">

                {/* Logo — mismo layout que Hero, colores para fondo oscuro */}
                <Link href={url === '/mjs' ? '/mjs' : '/'} className="flex items-center gap-3 group focus:outline-none shrink-0">
                    <img
                        src={url === '/mjs' ? '/Logo-MJS.svg' : '/Logo COLSIH.svg'}
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

                {/* Desktop nav — misma estructura y gaps que Hero */}
                <div className="hidden lg:flex items-center gap-10 text-[15px] font-semibold text-white/80">
                    <Link href="/" className={`transition-colors ${url === '/' ? 'text-white font-extrabold' : 'hover:text-white'}`}>
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

                    <Link href="/oferta-academica" className={`transition-colors ${url === '/oferta-academica' ? 'text-white font-extrabold' : 'hover:text-white'}`}>Oferta Académica</Link>
                    <Link href="/admisiones" className={`transition-colors ${url === '/admisiones' ? 'text-white font-extrabold' : 'hover:text-white'}`}>Admisiones</Link>
                    <Link href="/noticias" className={`transition-colors ${url.startsWith('/noticias') ? 'text-white font-extrabold' : 'hover:text-white'}`}>Comunidad</Link>
                    <Link href="/contacto" className={`transition-colors ${url === '/contacto' ? 'text-white font-extrabold' : 'hover:text-white'}`}>Contacto</Link>
                </div>

                {/* CTA + mobile toggle — mismo estilo que Hero */}
                <div className="flex items-center gap-3 shrink-0">
                    {url === '/mjs' ? (
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden lg:inline-flex items-center justify-center focus:outline-none cursor-pointer"
                            title="Ir al Colegio Santa Isabel de Hungría"
                        >
                            <img 
                                src="/Logo COLSIH.svg" 
                                alt="Logo COLSIH" 
                                className="h-12 w-auto object-contain hover:scale-105 transition-all duration-300"
                            />
                        </a>
                    ) : (
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

            {/* Mobile panel — mismo estilo que Hero */}
            {mobileOpen && (
                <div className="lg:hidden mt-2 mx-6 md:mx-12 bg-[#08111F]/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="px-4 py-4 space-y-1">
                        <Link href="/" onClick={() => setMobileOpen(false)}
                            className={`block px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${url === '/' ? 'text-white bg-white/10' : 'text-white/85 hover:text-white hover:bg-white/5'}`}
                        >
                            Inicio
                        </Link>
                        <div>
                            <span className="block px-3 py-2 text-xs font-bold text-white/40 uppercase tracking-wider">Nuestro Colegio</span>
                            <div className="ml-3 border-l border-white/20 pl-3 space-y-1">
                                {nosotrosLinks.map((item) => (
                                    <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                                        className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${url === item.href ? 'text-white bg-white/10' : 'text-white/75 hover:text-white hover:bg-white/5'}`}
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
                                className={`block px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${url === link.href ? 'text-white bg-white/10' : 'text-white/85 hover:text-white hover:bg-white/5'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-2 border-t border-white/10 flex justify-center">
                            {url === '/mjs' ? (
                                <a 
                                    href="/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    onClick={() => setMobileOpen(false)}
                                    className="py-2 focus:outline-none cursor-pointer"
                                    title="Ir al Colegio Santa Isabel de Hungría"
                                >
                                    <img 
                                        src="/Logo COLSIH.svg" 
                                        alt="Logo COLSIH" 
                                        className="h-10 w-auto object-contain hover:scale-105 transition-all duration-300"
                                    />
                                </a>
                            ) : (
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
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
