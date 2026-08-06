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
            className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-[99995] md:hidden select-none pointer-events-auto transition-all duration-500 ${
                hideForFooter ? 'opacity-0 pointer-events-none translate-y-10' : 'opacity-100 translate-y-0'
            }`}
        >
            {/* Barra flotante compacta e independiente sin colisionar con MJS o WhatsApp */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-950/85 backdrop-blur-xl border border-white/25 shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
                {/* Botón 1: INSCRIPCIONES (Azul Salesiano + Borde Dorado) */}
                <a
                    href="https://e.plataformaintegra.net/sihungria/index.php/cupo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Inscripciones y Solicitud de Cupo"
                    className="flex items-center gap-1 px-3 py-2 rounded-full bg-[#003C8F] hover:bg-[#002e6e] text-white text-[10px] font-black tracking-wider border border-amber-300 active:scale-95 transition-all duration-300"
                >
                    <svg className="w-3 h-3 text-amber-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>INSCRIPCIONES</span>
                </a>

                {/* Botón 2: PLATAFORMA (Rojo Salesiano) */}
                <a
                    href="https://e.plataformaintegra.net/sihungria/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ingreso a Plataforma Integra"
                    className="flex items-center gap-1 px-2.5 py-2 rounded-full bg-[#800A15] hover:bg-[#9e0d1c] text-white text-[10px] font-extrabold tracking-wider border border-white/20 active:scale-95 transition-all duration-300"
                >
                    <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    <span>PLATAFORMA</span>
                </a>
            </div>
        </div>
    );
}
