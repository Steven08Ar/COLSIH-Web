import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import MjsHeader from '@/Components/Mjs/MjsHeader';
import MjsFooter from '@/Components/Mjs/MjsFooter';

export default function MjsLayout({ children }) {
    const { props } = usePage();
    const flash = props.flash ?? {};

    useEffect(() => {
        function setFavicon(href) {
            document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());
            const link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/svg+xml';
            link.href = href + '?v=' + Date.now();
            document.head.appendChild(link);
        }
        setFavicon('/marca/logo-mjs.svg');
        return () => setFavicon('/marca/logo-colsih.svg');
    }, []);

    return (
        <div className="min-h-screen bg-[#05081E] text-white flex flex-col font-sans selection:bg-[#FFC606] selection:text-[#080D3B] overflow-x-hidden">
            {/* Header Flotante Editorial Estilo Mockup */}
            <MjsHeader />

            {/* Flash Message Banner si aplica */}
            {flash.success && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[9995] bg-emerald-500/90 text-white px-6 py-2 rounded-full text-xs font-bold shadow-2xl backdrop-blur-md">
                    {flash.success}
                </div>
            )}

            {/* Contenido Principal Full-Bleed */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer Editorial Independiente */}
            <MjsFooter />
        </div>
    );
}
