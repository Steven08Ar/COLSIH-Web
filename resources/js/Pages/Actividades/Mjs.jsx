import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';
import { Construction } from 'lucide-react';

export default function Mjs() {
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
        <AppLayout>
            <Head title="MJS | Colegio Santa Isabel de Hungría" />

            <section className="relative min-h-[75vh] flex items-center justify-center pt-36 pb-24 bg-[#08111F] text-center select-none overflow-hidden font-sans">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,60,143,0.2)_0%,transparent_65%)] pointer-events-none" />

                <div className="max-w-3xl mx-auto px-6 relative z-10 space-y-6 flex flex-col items-center">
                    <ScrollReveal distance="translate-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#800A15] text-white text-xs font-black tracking-widest uppercase shadow-lg">
                            <Construction className="w-4 h-4 text-amber-300" />
                            MJS · EN CONSTRUCCIÓN
                        </div>
                    </ScrollReveal>

                    <ScrollReveal distance="scale-90" delay={100}>
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center p-3 border border-white/10 backdrop-blur-md">
                            <img 
                                src="/marca/logo-mjs.svg" 
                                alt="MJS Logo" 
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal distance="translate-y-4" delay={150}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                            En Construcción...
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal distance="translate-y-4" delay={300}>
                        <p className="text-base sm:text-lg text-slate-300 font-medium max-w-xl leading-relaxed">
                            Estamos trabajando en la sección del Movimiento Juvenil Salesiano (MJS). Muy pronto estará disponible con toda la información.
                        </p>
                    </ScrollReveal>
                </div>
            </section>
        </AppLayout>
    );
}
