import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function MJSButton() {
    const { url } = usePage();
    const [isHovered, setIsHovered] = useState(false);
    const [hideForFooter, setHideForFooter] = useState(false);

    useEffect(() => {
        const footer = document.getElementById('site-footer') || document.querySelector('footer');
        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setHideForFooter(entry.isIntersecting);
            },
            { threshold: 0.05 }
        );

        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    // Solo se muestra en páginas de COLSIH (en /mjs el logo de COLSIH está en el header)
    if (url === '/mjs') return null;

    return (
        <div 
            id="floating-mjs-btn"
            className={`floating-mobile-btn fixed bottom-4 left-3 sm:bottom-8 sm:left-8 z-[99990] flex items-center gap-3 select-none pointer-events-auto transition-all duration-500 ${
                hideForFooter ? 'opacity-0 pointer-events-none translate-y-10' : 'opacity-100 translate-y-0'
            }`}
        >
            {/* Definición de Keyframes de Animación Levitación Suave */}
            <style>{`
                @keyframes mjsFloatAnim {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                        filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.55));
                    }
                    50% {
                        transform: translateY(-7px) rotate(2deg);
                        filter: drop-shadow(0 16px 26px rgba(0, 0, 0, 0.75));
                    }
                }
            `}</style>

            {/* Logo MJS Flotante sin Círculo */}
            <Link
                href="/mjs"
                aria-label="Ir al Movimiento Juvenil Salesiano (MJS)"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative flex items-center justify-center focus:outline-none transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            >
                {/* Logo Flotante con Animación de Levitación Orgánica y Sombra Realzada */}
                <img
                    src="/marca/logo-mjs.svg"
                    alt="Logo MJS Colombia"
                    style={{ animation: 'mjsFloatAnim 3.8s ease-in-out infinite' }}
                    className="h-14 sm:h-16 w-auto object-contain transition-all duration-300 group-hover:pause"
                />
            </Link>

            {/* Tooltip informativo flotante a la derecha */}
            <div 
                className={`hidden sm:flex items-center gap-2 px-3.5 py-2 bg-slate-900/90 dark:bg-slate-950/95 text-white text-xs font-bold rounded-2xl shadow-2xl backdrop-blur-md border border-white/10 transition-all duration-300 transform origin-left ${
                    isHovered ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-4 scale-95 pointer-events-none'
                }`}
            >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>Movimiento Juvenil Salesiano (MJS)</span>
            </div>
        </div>
    );
}
