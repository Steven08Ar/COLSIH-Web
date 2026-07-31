import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function MJSButton() {
    const { url } = usePage();
    const [isHovered, setIsHovered] = useState(false);

    const isMjsPage = url === '/mjs';

    return (
        <div className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-[99999] flex items-center gap-3 select-none pointer-events-auto">
            {/* Botón flotante del MJS / COLSIH */}
            <Link
                href={isMjsPage ? '/' : '/mjs'}
                aria-label={isMjsPage ? 'Volver al Colegio COLSIH' : 'Ir al Movimiento Juvenil Salesiano (MJS)'}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative flex items-center justify-center p-2.5 sm:p-3 bg-[#08111F]/90 hover:bg-[#08111F] text-white rounded-full border border-white/20 shadow-[0_10px_25px_rgba(0,0,0,0.45)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl transform hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none"
            >
                {/* Anillo exterior de pulso sutil */}
                <span className="absolute inset-0 rounded-full border-2 border-blue-400/40 animate-ping opacity-30"></span>

                {/* Logo MJS o COLSIH */}
                <img
                    src={isMjsPage ? '/marca/logo-colsih.svg' : '/marca/logo-mjs.svg'}
                    alt={isMjsPage ? 'Logo COLSIH' : 'Logo MJS'}
                    className="h-9 w-9 sm:h-11 sm:w-11 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
            </Link>

            {/* Tooltip informativo flotante a la derecha */}
            <div 
                className={`hidden sm:flex items-center gap-2 px-3.5 py-2 bg-slate-900/90 dark:bg-slate-950/95 text-white text-xs font-bold rounded-2xl shadow-xl backdrop-blur-md border border-white/10 transition-all duration-300 transform origin-left ${
                    isHovered ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-4 scale-95 pointer-events-none'
                }`}
            >
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span>{isMjsPage ? 'Ir a Colegio COLSIH' : 'Movimiento Juvenil Salesiano (MJS)'}</span>
            </div>
        </div>
    );
}
