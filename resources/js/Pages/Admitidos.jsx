import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from './HomeSections/ScrollReveal';
import AdmitidosSection from '@/Components/Admisiones/AdmitidosSection';
import { ArrowLeft } from 'lucide-react';

export default function Admitidos() {
    return (
        <AppLayout>
            <Head title="Admitidos 2027 | Colegio Santa Isabel de Hungría" />

            {/* HERO */}
            <section className="relative pt-32 pb-14 md:pt-44 md:pb-20 bg-[#FFFFFF] border-b border-slate-100 overflow-hidden font-sans">
                <div
                    className="absolute top-10 right-10 w-72 h-72 opacity-[0.06] pointer-events-none hidden lg:block"
                    style={{ backgroundImage: 'radial-gradient(#003C8F 2px, transparent 2px)', backgroundSize: '20px 20px' }}
                />
                <div
                    className="absolute bottom-10 left-10 w-60 h-60 opacity-[0.05] pointer-events-none hidden lg:block"
                    style={{ backgroundImage: 'radial-gradient(#800A15 2px, transparent 2px)', backgroundSize: '20px 20px' }}
                />
                <div className="absolute top-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-[#003C8F] rounded-br-[100px] opacity-90 pointer-events-none -translate-x-6 -translate-y-6" />

                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 text-center space-y-5">
                    <ScrollReveal distance="translate-y-4">
                        <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-[#0B1F3A] leading-[1.08] tracking-tight">
                            Estudiantes <span className="text-[#800A15]">admitidos</span> 2027
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal distance="translate-y-4" delay={150}>
                        <p className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                            ¡Felicitaciones a las familias que harán parte de la comunidad del Colegio Santa Isabel de Hungría!
                        </p>
                    </ScrollReveal>
                    <ScrollReveal distance="translate-y-4" delay={250}>
                        <Link
                            href="/admisiones"
                            className="inline-flex items-center gap-2 text-sm font-bold text-[#003C8F] hover:text-[#800A15] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver a Admisiones
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            {/* LISTADO */}
            <section className="py-14 md:py-20 bg-[#FAFCFF] font-sans">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
                    <AdmitidosSection />
                </div>
            </section>
        </AppLayout>
    );
}
