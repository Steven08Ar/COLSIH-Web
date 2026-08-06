import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function PlataformaMobileButton() {
    const { url } = usePage();
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

    // No mostrar en MJS si ya está en MJS
    if (url === '/mjs') return null;

    return (
        <div 
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[99995] md:hidden select-none pointer-events-auto transition-all duration-500 ${
                hideForFooter ? 'opacity-0 pointer-events-none translate-y-10' : 'opacity-100 translate-y-0'
            }`}
        >
            {/* Único botón flotante en pantalla móvil fija: PLATAFORMA */}
            <a
                href="https://e.plataformaintegra.net/sihungria/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ingreso a Plataforma Integra"
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#800A15] hover:bg-[#9e0d1c] text-white text-xs font-extrabold shadow-lg shadow-[#800A15]/40 border border-white/20 active:scale-95 transition-all duration-200"
            >
                <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <span className="uppercase tracking-wider">PLATAFORMA</span>
            </a>
        </div>
    );
}
