import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Valores() {
    const valores = [
        { nombre: 'Espiritualidad', descripcion: 'Vivir la trascendencia y la búsqueda de la felicidad.' },
        { nombre: 'Solidaridad', descripcion: 'Sentir con el otro y comprender su situación.' },
        { nombre: 'Gratitud', descripcion: 'Aceptación de la interdependencia humana desde Dios.' },
        { nombre: 'Honestidad', descripcion: 'Reconocimiento de la dignidad del otro y de su importancia.' },
        { nombre: 'Perdón', descripcion: 'Aceptación de la vulnerabilidad humana y capacidad de convivencia.' },
        { nombre: 'Pertenencia', descripcion: 'Una manera concreta de vivir y estar en el mundo.' },
        { nombre: 'Innovación', descripcion: 'Capacidad de transformar la realidad social humanizándola.' },
        { nombre: 'Respeto', descripcion: 'Reconocimiento del que está a mi lado.' },
        { nombre: 'Calidad de vida', descripcion: 'Respuesta al sueño creador de Dios que nos dio el mundo para cuidarlo.' },
    ];

    return (
        <AppLayout>
            <Head title="Valores Corporativos — Nosotros" />

            {/* Header Hero Section */}
            <section className="relative bg-gradient-to-b from-[#08111F] to-[#0D1B2E] pt-32 pb-20 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,87,217,0.12),transparent_60%)]"></div>
                <div className="relative z-10 max-w-[1200px] mx-auto px-6">
                    <nav className="text-sm font-semibold text-slate-400 mb-4 flex items-center justify-center gap-2">
                        <Link href="/nosotros" className="hover:text-white transition-colors">Quiénes Somos</Link>
                        <span>/</span>
                        <span className="text-white">Valores Corporativos</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-sans">
                        Nuestros Valores
                    </h1>
                </div>
            </section>

            {/* Lema banner */}
            <section className="py-8 bg-slate-100 border-b border-slate-200/60">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
                        Lema Institucional
                    </p>
                    <h3 className="text-2xl font-black text-[#E31C23] mt-1 font-sans">
                        "Buenos Cristianos y Honestos Ciudadanos"
                    </h3>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        {valores.map((item, index) => (
                            <div
                                key={item.nombre}
                                className="bg-slate-50 border border-slate-100/80 p-8 rounded-3xl relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-0.5"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-100/50 to-transparent rounded-bl-full pointer-events-none"></div>
                                <div className="relative z-10">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                                        Valor 0{index + 1}
                                    </span>
                                    <h3 className="text-2xl font-extrabold text-[#08111F] mb-3 font-sans">
                                        {item.nombre}
                                    </h3>
                                    <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
                                        {item.descripcion}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Navigation Tabs */}
            <nav className="py-12 bg-slate-50/50 border-t border-slate-100 flex items-center justify-center gap-6">
                <Link href="/nosotros/mision-vision" className="text-sm font-bold text-slate-500 hover:text-[#E31C23] transition-colors flex items-center gap-1.5">
                    ← Misión y Visión
                </Link>
                <span className="text-slate-300">|</span>
                <Link href="/nosotros/equipo" className="text-sm font-bold text-[#08111F] hover:text-[#E31C23] transition-colors flex items-center gap-1.5">
                    Equipo Docente →
                </Link>
            </nav>
        </AppLayout>
    );
}
