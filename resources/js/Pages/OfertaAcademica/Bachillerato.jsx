import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';

const ciclosBachillerato = [
    {
        titulo: 'Básica Secundaria (6° a 9°)',
        edad: '11 a 15 Años',
        badgeColor: 'bg-blue-100 text-blue-900',
        borderColor: 'border-blue-200',
        headerGradient: 'from-blue-600 to-indigo-700',
        descripcion: 'Fortalecimiento de la autonomía, pensamiento abstracto, ciencia experimental e informática aplicada.',
        destacados: [
            'Robótica básica e informática avanzada',
            'Laboratorios prácticos de Física y Química',
            'Formación en ciudadanía crítica y ciencias sociales',
            'Inglés con enfoque de proyectos'
        ]
    },
    {
        titulo: 'Educación Media (10° y 11°)',
        edad: '15 a 17 Años',
        badgeColor: 'bg-red-100 text-red-900',
        borderColor: 'border-red-200',
        headerGradient: 'from-[#800A15] to-rose-800',
        descripcion: 'Preparación de excelencia enfocada en las pruebas ICFES Saber 11, vinculación universitaria e ingreso laboral.',
        destacados: [
            'Simulacros y preparación intensiva Pre-ICFES',
            'Articulación Técnica Profesional con el SENA',
            'Proyecto de vida y orientación vocacional',
            'Proyectos de investigación y emprendimiento'
        ]
    }
];

const fortalezasBachillerato = [
    {
        icon: (
            <svg className="w-8 h-8 text-[#003C8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        titulo: 'Laboratorios de Ciencias y Tecnología',
        desc: 'Espacios de experimentación real equipados para química, biología, física e informática con lógica de programación.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-[#003C8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
        titulo: 'Pre-ICFES Continuo',
        desc: 'Acompañamiento especializado con entrenamiento por competencias para asegurar puntajes destacados en Saber 11.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-[#003C8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        titulo: 'Liderazgo Juvenil Salesiano',
        desc: 'Gobierno escolar activo, grupos pastorales y voluntariado social que forman ciudadanos éticos y comprometidos.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-[#003C8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        titulo: 'Orientación Vocacional y Universitaria',
        desc: 'Ferias de universidades, talleres de proyecto de vida y convenios institucionales para la transición a la educación superior.'
    }
];

export default function Bachillerato() {
    return (
        <AppLayout>
            <Head title="Bachillerato | Oferta Académica COLSIH" />

            {/* 1. HERO TEMÁTICO BACHILLERATO */}
            <section className="relative min-h-[680px] md:min-h-[760px] pt-36 pb-32 md:pt-44 md:pb-40 bg-[#08111F] overflow-hidden select-none flex items-center">
                
                {/* Imagen vertical de fondo enfocada a los jóvenes de bachillerato en la derecha */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                    <img
                        src="/galeria/bachillerato.JPG"
                        alt="Jóvenes de Bachillerato COLSIH"
                        className="absolute top-0 right-0 w-full md:w-[65%] lg:w-[58%] h-full object-cover object-[center_35%] contrast-[1.05] brightness-90 md:brightness-95 scale-105"
                    />
                </div>

                {/* Sombra gradiente completa para móvil */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#08111F] via-[#08111F]/90 to-[#08111F]/60 md:hidden z-10 pointer-events-none"></div>

                {/* Sombra gradiente de izquierda a derecha para escritorio */}
                <div className="absolute inset-y-0 left-0 w-full md:w-[70%] lg:w-[60%] z-10 hidden md:block pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-r from-[#08111F] via-[#08111F] via-75% to-transparent"></div>
                </div>

                {/* Blobs luminosos azul institucional y vinotinto */}
                <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#003C8F]/20 rounded-full blur-[130px] pointer-events-none z-10"></div>

                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-20 w-full">
                    <div className="max-w-3xl space-y-6">
                        <ScrollReveal distance="translate-y-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-md">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
                                <span className="text-blue-300 text-xs md:text-sm font-bold tracking-wider uppercase">
                                    Básica Secundaria y Media • Grados 6° a 11°
                                </span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-white leading-[1.08] tracking-tight font-sans">
                                Rigor académico, <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-rose-400 bg-clip-text text-transparent">liderazgo ético y proyección laboral</span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-lg md:text-xl font-medium text-slate-300 leading-relaxed max-w-2xl font-sans">
                                Preparamos jóvenes líderes capaces de transformar la sociedad mediante una formación científica exigente, valores cristianos salesianos y orientación universitaria.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={450}>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    href="/admisiones"
                                    className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#003C8F] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-sm shadow-xl shadow-blue-500/20 hover:scale-105 transition-all duration-300 border border-blue-400/30"
                                >
                                    Iniciar Admisión Bachillerato
                                </Link>
                                <a
                                    href="#ciclos"
                                    className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm backdrop-blur-md border border-white/20 hover:scale-105 transition-all duration-300"
                                >
                                    Ver Ciclos Formativos
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Divisor de ola inferior */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                    <svg className="relative block w-full h-[50px] md:h-[80px]" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path d="M0,100 C380,20 760,90 1080,30 C1200,10 1320,20 1440,60 L1440,100 L0,100 Z" fill="#F8FAFC"></path>
                    </svg>
                </div>
            </section>

            {/* 2. CICLOS FORMATIVOS */}
            <section id="ciclos" className="py-20 md:py-28 bg-[#F8FAFC] relative z-10">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[#003C8F] text-xs md:text-sm font-bold tracking-[3px] uppercase block mb-3">
                            ETAPAS DE APRENDIZAJE
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            Ciclos de la Educación Secundaria y Media
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {ciclosBachillerato.map((ciclo, idx) => (
                            <ScrollReveal key={ciclo.titulo} delay={idx * 150} distance="translate-y-8">
                                <div className={`bg-white rounded-3xl p-8 shadow-xl border ${ciclo.borderColor} hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full`}>
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-2xl font-black text-slate-900">{ciclo.titulo}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-black ${ciclo.badgeColor}`}>
                                                {ciclo.edad}
                                            </span>
                                        </div>
                                        <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">
                                            {ciclo.descripcion}
                                        </p>
                                        <div className="space-y-3 pt-4 border-t border-slate-100">
                                            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Componentes Clave:</span>
                                            {ciclo.destacados.map((item) => (
                                                <div key={item} className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                                                    <svg className="w-4 h-4 text-[#003C8F] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>{item}</span>
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

            {/* 3. FORTALEZAS DEL BACHILLERATO */}
            <section className="py-20 md:py-28 bg-white relative z-10">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[#003C8F] text-xs md:text-sm font-bold tracking-[3px] uppercase block mb-3">
                            EXCELENCIA PEDAGÓGICA
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            Fortalezas de Nuestro Bachillerato
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {fortalezasBachillerato.map((f, idx) => (
                            <ScrollReveal key={f.titulo} delay={idx * 120} distance="translate-y-6">
                                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all duration-300 flex items-start gap-5 group">
                                    <div className="p-4 rounded-2xl bg-blue-100/70 text-[#003C8F] group-hover:scale-110 transition-transform duration-300 shrink-0">
                                        {f.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{f.titulo}</h3>
                                        <p className="text-slate-600 text-sm font-medium leading-relaxed">{f.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. BANNER ADMISIONES BACHILLERATO */}
            <section className="py-20 bg-gradient-to-r from-[#003C8F] via-[#0F172A] to-[#800A15] text-white relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                        ¡Prepara a tu hijo para destacar en las Pruebas Saber y la Universidad!
                    </h2>
                    <p className="text-slate-200 text-base md:text-xl font-medium max-w-2xl mx-auto">
                        Abre las puertas a una formación secundaria de excelencia salesiana.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/admisiones"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-slate-950 font-extrabold text-sm md:text-base shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <span>Solicitar Admisión a Bachillerato</span>
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
