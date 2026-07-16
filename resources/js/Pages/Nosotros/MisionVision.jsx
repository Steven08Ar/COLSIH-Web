import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function MisionVision() {
    const objetivos = [
        'Administrar los recursos del colegio, para su buen funcionamiento.',
        'Planear los proyectos basados en las necesidades del colegio según los avances tecnológicos.',
        'Ofrecer un servicio educativo completo que prepare a los estudiantes al ingreso a la educación terciaria.',
        'Desarrollar los lineamientos curriculares en contexto y según el convenio del colegio con el SENA.',
        'Orientar el proceso de formación integral del estudiante para su vinculación activa con la comunidad.',
        'Promover la formación en valores cristianos católicos.',
        'Facilitar convenios con Instituciones privadas, propiciando espacios prácticos de formación laboral y comercial.'
    ];

    return (
        <AppLayout>
            <Head title="Misión y Visión | COLSIH" />

            {/* Header Hero Section */}
            <section className="relative bg-gradient-to-b from-[#08111F] to-[#0D1B2E] pt-32 pb-20 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,87,217,0.12),transparent_60%)]"></div>
                <div className="relative z-10 max-w-[1200px] mx-auto px-6">
                    <nav className="text-sm font-semibold text-slate-400 mb-4 flex items-center justify-center gap-2">
                        <Link href="/nosotros" className="hover:text-white transition-colors">Quiénes Somos</Link>
                        <span>/</span>
                        <span className="text-white">Misión y Visión</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-sans">
                        Misión y Visión
                    </h1>
                </div>
            </section>

            {/* Mission & Vision grid */}
            <section className="py-20 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                        {/* Misión */}
                        <div className="bg-slate-50 border border-slate-100 p-8 md:p-10 rounded-3xl text-left flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-[#E31C23]/10 text-[#E31C23] flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-[#08111F] mb-4">Nuestra Misión</h2>
                                <p className="text-[16px] text-slate-600 leading-relaxed font-medium">
                                    El Colegio Santa Isabel de Hungría es una institución educativa de carácter privado de la Arquidiócesis de Bucaramanga, que educa con principios evangélicos según el sistema preventivo salesiano, fundamentado en la religión, la amabilidad y la razón. Ofrecemos los niveles de jardín, preescolar, primaria, básica y media técnica, con énfasis en comercio, empeñados en alcanzar una educación contextual que pase de la enseñanza al aprendizaje.
                                </p>
                            </div>
                        </div>

                        {/* Visión */}
                        <div className="bg-[#08111F] text-white p-8 md:p-10 rounded-3xl text-left relative overflow-hidden flex flex-col justify-between">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,87,217,0.15),transparent_70%)]"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4">Nuestra Visión (Meta 2028)</h2>
                                <p className="text-[16px] text-slate-300 leading-relaxed font-medium">
                                    En el año 2028, el Colegio Santa Isabel de Hungría será reconocido en la región por la formación integral de líderes comprometidos con el cuidado de la vida en todas sus manifestaciones, aportando a la ecología integral en el respeto y cuidado de la Casa Común, fundamentados en el sistema salesiano, viviendo como "Buenos Cristianos y Honestos Ciudadanos".
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Institutional Objectives */}
            <section className="py-20 bg-slate-50/50">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-left">
                        <h2 className="text-3xl font-extrabold text-[#08111F] tracking-tight mb-2">
                            Objetivos Institucionales
                        </h2>
                        <div className="w-16 h-1 bg-[#E31C23] rounded-full mb-8"></div>
                        
                        <div className="space-y-4">
                            {objetivos.map((obj, index) => (
                                <div key={index} className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
                                    <span className="w-8 h-8 rounded-full bg-[#0057D9]/10 text-[#0057D9] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                                        {index + 1}
                                    </span>
                                    <p className="text-[15px] text-[#08111F] font-bold leading-relaxed">
                                        {obj}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Navigation Tabs */}
            <nav className="py-12 bg-white border-t border-slate-100 flex items-center justify-center gap-6">
                <Link href="/nosotros/historia" className="text-sm font-bold text-slate-500 hover:text-[#E31C23] transition-colors flex items-center gap-1.5">
                    ← Reseña Histórica
                </Link>
                <span className="text-slate-300">|</span>
                <Link href="/nosotros/valores" className="text-sm font-bold text-[#08111F] hover:text-[#E31C23] transition-colors flex items-center gap-1.5">
                    Valores Corporativos →
                </Link>
            </nav>
        </AppLayout>
    );
}
