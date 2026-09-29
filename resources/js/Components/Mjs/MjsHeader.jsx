import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Sparkles, ArrowLeft, Menu, X, User, ChevronDown } from 'lucide-react';

export default function MjsHeader() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        setMobileOpen(false);
        const el = document.querySelector(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-[9990] select-none transition-all duration-300 px-4 sm:px-8 pt-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                
                {/* 1. Left Side: Brand Logo (Limpio, Grande y sin contenedores) */}
                <div className="flex items-center">
                    <a
                        href="#inicio"
                        onClick={(e) => { e.preventDefault(); scrollTo('#inicio'); }}
                        className="group flex items-center focus:outline-none transition-transform duration-300 hover:scale-105"
                    >
                        <img 
                            src="/marca/logo-mjs.svg" 
                            alt="Logo MJS" 
                            className="h-14 sm:h-16 md:h-20 w-auto object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                        />
                    </a>
                </div>

                {/* 2. Center: Floating White Capsule Pill Navbar (Exacto al Mockup) */}
                <nav className="hidden lg:flex items-center bg-white text-slate-900 rounded-full p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.35)] border border-white/20">
                    <button
                        onClick={() => scrollTo('#inicio')}
                        className="px-5 py-2 rounded-full text-xs font-bold bg-[#080D3B] text-white shadow-xs transition-all"
                    >
                        Inicio
                    </button>

                    <button
                        onClick={() => scrollTo('#manifiesto')}
                        className="px-4 py-2 rounded-full text-xs font-semibold text-slate-700 hover:text-black transition-colors cursor-pointer"
                    >
                        Manifiesto
                    </button>

                    <button
                        onClick={() => scrollTo('#floridablanca')}
                        className="px-4 py-2 rounded-full text-xs font-semibold text-slate-700 hover:text-black transition-colors cursor-pointer"
                    >
                        Floridablanca
                    </button>

                    <button
                        onClick={() => scrollTo('#mundo')}
                        className="px-4 py-2 rounded-full text-xs font-semibold text-slate-700 hover:text-black transition-colors cursor-pointer"
                    >
                        SYM Global
                    </button>

                    {/* Botón CTA dentro de la cápsula */}
                    <button
                        onClick={() => scrollTo('#contacto')}
                        className="ml-1 px-5 py-2 rounded-full text-xs font-bold bg-[#080D3B] hover:bg-[#920709] text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer group"
                    >
                        <span>Información</span>
                        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </button>
                </nav>

                {/* 3. Right Side: Logo Institucional + Botón Iniciar Sesión (En toda la derecha) */}
                <div className="flex items-center gap-3 sm:gap-4">
                    {/* Logo Institucional del Colegio (Limpio y sin encerrar) */}
                    <Link
                        href="/"
                        className="group flex items-center focus:outline-none transition-transform duration-300 hover:scale-105"
                        title="Ir al Portal Institucional del Colegio Santa Isabel de Hungría"
                        aria-label="Ir al Colegio Santa Isabel de Hungría"
                    >
                        <img 
                            src="/marca/logo-colsih.svg" 
                            alt="Logo Institucional COLSIH" 
                            className="h-11 sm:h-13 md:h-16 w-auto object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                        />
                    </Link>

                    {/* Botón Icono de Usuario para Iniciar Sesión (En toda la derecha) */}
                    <Link
                        href="/mjs/login"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-white transition-all duration-300 shadow-lg hover:scale-105 group"
                        title="Iniciar Sesión MJS"
                        aria-label="Iniciar Sesión MJS"
                    >
                        <User className="w-5 h-5 text-white/90 group-hover:text-white transition-colors" />
                    </Link>

                    {/* Botón Mobile Menu */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-lg focus:outline-none"
                        aria-label="Abrir menú"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

            </div>

            {/* Mobile Drawer Estilo Cápsula */}
            {mobileOpen && (
                <div className="lg:hidden mt-3 max-w-sm mx-auto p-5 rounded-3xl bg-black/90 backdrop-blur-2xl border border-white/15 text-white shadow-2xl space-y-3 animate-fadeIn">
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => scrollTo('#inicio')}
                            className="py-2.5 px-4 rounded-2xl bg-white/10 text-left font-bold text-sm"
                        >
                            Inicio
                        </button>
                        <button
                            onClick={() => scrollTo('#manifiesto')}
                            className="py-2.5 px-4 rounded-2xl hover:bg-white/10 text-left font-semibold text-sm text-slate-300"
                        >
                            Manifiesto
                        </button>
                        <button
                            onClick={() => scrollTo('#floridablanca')}
                            className="py-2.5 px-4 rounded-2xl hover:bg-white/10 text-left font-semibold text-sm text-slate-300"
                        >
                            Floridablanca & COLSIH
                        </button>
                        <button
                            onClick={() => scrollTo('#mundo')}
                            className="py-2.5 px-4 rounded-2xl hover:bg-white/10 text-left font-semibold text-sm text-slate-300"
                        >
                            SYM en el Mundo
                        </button>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                        <button
                            onClick={() => scrollTo('#contacto')}
                            className="w-full py-3 rounded-2xl bg-[#920709] text-white font-bold text-xs uppercase tracking-wider text-center"
                        >
                            Información de Encuentros →
                        </button>
                        <Link
                            href="/mjs/login"
                            className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold text-center flex items-center justify-center gap-2"
                        >
                            <User className="w-3.5 h-3.5" />
                            Iniciar Sesión MJS
                        </Link>
                        <Link
                            href="/"
                            className="w-full py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/80 text-xs font-semibold text-center flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Regresar a COLSIH
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
