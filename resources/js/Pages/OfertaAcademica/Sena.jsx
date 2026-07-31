import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';

const programasSena = [
    {
        codigo: 'TECNICO-01',
        titulo: 'Técnico en Contabilización de Operaciones Comerciales y Financieras',
        duración: '2 Años (Grados 10° y 11°)',
        badgeColor: 'bg-orange-100 text-orange-900 border-orange-200',
        descripcion: 'Formación especializada en gestión contable, manejo de software financiero, legislación tributaria básica y operaciones comerciales de empresas.',
        competencias: [
            'Registro y procesamiento de transacciones contables',
            'Manejo de herramientas de software financiero',
            'Preparación de estados financieros preliminares',
            'Ética profesional y legislación comercial vigente'
        ]
    },
    {
        codigo: 'TECNICO-02',
        titulo: 'Técnico en Sistemas e Informática',
        duración: '2 Años (Grados 10° y 11°)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
        descripcion: 'Formación en ensamble, mantenimiento preventivo de computadores, configuración de redes locales y lógica de desarrollo de software.',
        competencias: [
            'Mantenimiento preventivo y correctivo de hardware',
            'Instalación y configuración de redes LAN',
            'Lógica de programación y diseño web básico',
            'Soporte técnico y gestión de sistemas informáticos'
        ]
    }
];

const beneficiosSena = [
    {
        icon: (
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
        titulo: 'Doble Titulación Oficial',
        desc: 'Al graduarse de Grado 11°, el estudiante obtiene simultáneamente su título de Bachiller Académico COLSIH y su Título Técnico Profesional expedido por el SENA.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        titulo: 'Inserción Laboral Temprana',
        desc: 'Habilita al estudiante para acceder al mercado laboral técnico de forma inmediata o realizar prácticas empresariales reales.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
        ),
        titulo: 'Homologación en la Educación Superior',
        desc: 'Los créditos académicos aprobados durante el convenio SENA son homologables en tecnólogos y carreras profesionales universitarias.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        titulo: 'Formación Gratuita e Incluida',
        desc: 'El programa de articulación SENA está 100% integrado dentro de la jornada escolar de la Media Técnica sin costos adicionales de matrícula.'
    }
];

export default function Sena() {
    return (
        <AppLayout>
            <Head title="Articulación SENA | Oferta Académica COLSIH" />

            {/* 1. HERO TEMÁTICO SENA (Orange / Industrial Slate) */}
            <section className="relative min-h-[680px] md:min-h-[760px] pt-36 pb-32 md:pt-44 md:pb-40 bg-[#1C0D02] overflow-hidden select-none flex items-center">
                
                {/* Imagen vertical de fondo enfocada a los estudiantes técnicos SENA en la derecha */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                    <img
                        src="/galeria/SENA.JPG"
                        alt="Estudiantes Convenio SENA COLSIH"
                        className="absolute top-0 right-0 w-full md:w-[65%] lg:w-[58%] h-full object-cover object-[center_40%] contrast-[1.05] brightness-90 md:brightness-95 scale-105"
                    />
                </div>

                {/* Sombra gradiente completa para móvil */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1C0D02] via-[#1C0D02]/90 to-[#1C0D02]/60 md:hidden z-10 pointer-events-none"></div>

                {/* Sombra gradiente de izquierda a derecha para escritorio */}
                <div className="absolute inset-y-0 left-0 w-full md:w-[70%] lg:w-[60%] z-10 hidden md:block pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-r from-[#1C0D02] via-[#1C0D02] via-75% to-transparent"></div>
                </div>

                {/* Blobs luminosos de color naranja SENA */}
                <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-orange-500/20 rounded-full blur-[130px] pointer-events-none z-10"></div>

                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-20 w-full">
                    <div className="max-w-3xl space-y-6">
                        <ScrollReveal distance="translate-y-6">
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-orange-500/15 border border-orange-500/40 backdrop-blur-md">
                                <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse"></span>
                                <span className="text-orange-300 text-xs md:text-sm font-black tracking-wider uppercase">
                                    Convenio Institucional COLSIH - SENA
                                </span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-white leading-[1.08] tracking-tight font-sans">
                                Articulación SENA: <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-300 bg-clip-text text-transparent">Doble Titulación para el Futuro</span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-lg md:text-xl font-medium text-slate-300 leading-relaxed max-w-2xl font-sans">
                                Un convenio estratégico que capacita a nuestros estudiantes de educación media (10° y 11°) con competencias técnicas empresariales e informáticas validadas oficialmente por el SENA.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={450}>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    href="/admisiones"
                                    className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-sm shadow-xl shadow-orange-500/20 hover:scale-105 transition-all duration-300 border border-orange-400/30"
                                >
                                    Conocer Requisitos e Inscripción
                                </Link>
                                <a
                                    href="#programas"
                                    className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm backdrop-blur-md border border-white/20 hover:scale-105 transition-all duration-300"
                                >
                                    Ver Especialidades
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Divisor de ola inferior */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                    <svg className="relative block w-full h-[50px] md:h-[80px]" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path d="M0,100 C380,20 760,90 1080,30 C1200,10 1320,20 1440,60 L1440,100 L0,100 Z" fill="#FFF7ED"></path>
                    </svg>
                </div>
            </section>

            {/* 2. PROGRAMAS TÉCNICOS SENA */}
            <section id="programas" className="py-20 md:py-28 bg-[#FFF7ED] relative z-10">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-orange-700 text-xs md:text-sm font-bold tracking-[3px] uppercase block mb-3">
                            ESPECIALIDADES TÉCNICAS
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            Programas de Articulación Técnica
                        </h2>
                        <p className="text-slate-600 text-base md:text-lg mt-4 font-medium">
                            Los estudiantes escogen su especialidad técnica desde grado décimo recibiendo acompañamiento de instructores SENA e instructores COLSIH.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {programasSena.map((prog, idx) => (
                            <ScrollReveal key={prog.codigo} delay={idx * 150} distance="translate-y-8">
                                <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-200 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full">
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-xs font-black text-orange-600 tracking-widest uppercase">{prog.codigo}</span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${prog.badgeColor}`}>
                                                {prog.duración}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-3">{prog.titulo}</h3>
                                        <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">
                                            {prog.descripcion}
                                        </p>
                                        <div className="space-y-3 pt-4 border-t border-orange-100">
                                            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Competencias del Egresado:</span>
                                            {prog.competencias.map((c) => (
                                                <div key={c} className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                                                    <svg className="w-4 h-4 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>{c}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. BENEFICIOS DE LA DOBLE TITULACIÓN */}
            <section className="py-20 md:py-28 bg-white relative z-10">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-orange-700 text-xs md:text-sm font-bold tracking-[3px] uppercase block mb-3">
                            VENTAJAS Y VALOR AGREGADO
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            Beneficios de la Doble Titulación SENA
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {beneficiosSena.map((b, idx) => (
                            <ScrollReveal key={b.titulo} delay={idx * 120} distance="translate-y-6">
                                <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-50/70 via-amber-50/30 to-orange-50/10 border border-orange-200 hover:border-orange-400 transition-all duration-300 flex items-start gap-5 group">
                                    <div className="p-4 rounded-2xl bg-orange-100 text-orange-600 group-hover:scale-110 transition-transform duration-300 shrink-0">
                                        {b.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{b.titulo}</h3>
                                        <p className="text-slate-600 text-sm font-medium leading-relaxed">{b.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. BANNER ADMISIONES SENA */}
            <section className="py-20 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                        ¡Proyéctate al mundo laboral y universitario con la Doble Titulación SENA!
                    </h2>
                    <p className="text-orange-100 text-base md:text-xl font-medium max-w-2xl mx-auto">
                        Inicia el proceso de inscripción y asegura tu cupo en la educación media del Colegio Santa Isabel de Hungría.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/admisiones"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-orange-950 font-extrabold text-sm md:text-base shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <span>Solicitar Admisión para Educación Media SENA</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
