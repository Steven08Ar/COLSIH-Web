import { useState, useRef } from 'react';

export default function CopiarTexto({ texto, children, className = '' }) {
    const [tooltip, setTooltip] = useState(null);
    const timer = useRef(null);

    function copiar(e) {
        const val = texto ?? '';
        navigator.clipboard.writeText(val).catch(() => {
            try {
                const el = document.createElement('textarea');
                el.value = val;
                el.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
                document.body.appendChild(el);
                el.focus();
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
            } catch (_) {}
        });

        const x = e.clientX || (e.touches?.[0]?.clientX ?? window.innerWidth / 2);
        const y = e.clientY || (e.touches?.[0]?.clientY ?? window.innerHeight / 2);
        setTooltip({ x, y });

        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setTooltip(null), 1800);
    }

    return (
        <>
            <span
                onClick={copiar}
                className={`cursor-copy select-text ${className}`}
                title="Toca para copiar"
            >
                {children}
            </span>

            {tooltip && (
                <span
                    style={{
                        position: 'fixed',
                        left: tooltip.x,
                        top: Math.max(tooltip.y - 44, 8),
                        transform: 'translateX(-50%)',
                        zIndex: 9999,
                        pointerEvents: 'none',
                        animation: 'copiar-tooltip 1.8s ease forwards',
                    }}
                    className="inline-flex items-center gap-1.5 bg-[#08111F] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-xl whitespace-nowrap border border-white/20"
                >
                    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    ¡Copiado!
                </span>
            )}

            <style>{`
                @keyframes copiar-tooltip {
                    0%   { opacity: 0; transform: translateX(-50%) translateY(6px) scale(0.9); }
                    12%  { opacity: 1; transform: translateX(-50%) translateY(0)   scale(1);   }
                    72%  { opacity: 1; }
                    100% { opacity: 0; transform: translateX(-50%) translateY(-6px) scale(0.95); }
                }
            `}</style>
        </>
    );
}
