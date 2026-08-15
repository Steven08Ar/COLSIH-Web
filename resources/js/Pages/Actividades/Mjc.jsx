import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';
import { Construction } from 'lucide-react';

export default function Mjc() {
    return (
        <AppLayout>
            <Head title="Movimiento Juvenil de Comunicadores (MJC) | COLSIH" />

            <section className="relative min-h-[75vh] flex items-center justify-center pt-36 pb-24 bg-[#08111F] text-center select-none overflow-hidden font-sans">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(128,10,21,0.2)_0%,transparent_65%)] pointer-events-none" />

                <div className="max-w-3xl mx-auto px-6 relative z-10 space-y-6 flex flex-col items-center">
                    <ScrollReveal distance="translate-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#800A15] text-white text-xs font-black tracking-widest uppercase shadow-lg">
                            <Construction className="w-4 h-4 text-amber-300" />
                            MJC · MOVIMIENTO JUVENIL DE COMUNICADORES
                        </div>
                    </ScrollReveal>

                    <ScrollReveal distance="translate-y-4" delay={150}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                            En Construcción...
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal distance="translate-y-4" delay={300}>
                        <p className="text-base sm:text-lg text-slate-300 font-medium max-w-xl leading-relaxed">
                            Estamos trabajando en la sección del Movimiento Juvenil de Comunicadores (MJC). Muy pronto estará disponible con toda la información.
                        </p>
                    </ScrollReveal>
                </div>
            </section>
        </AppLayout>
    );
}
