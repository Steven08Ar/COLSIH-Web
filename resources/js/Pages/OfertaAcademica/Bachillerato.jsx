import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';
import { GraduationCap, Atom, Target, Users, Building2, CheckCircle2, ArrowRight, Sparkles, BookMarked, Award, Search, Check } from 'lucide-react';

const ciclosBachillerato = [
    {
        titulo: 'Básica Secundaria (6° a 9°)',
        edad: '11 a 15 Años',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
        borderColor: 'border-blue-200',
        headerGradient: 'from-[#003C8F] via-blue-700 to-indigo-800',
        icon: Atom,
        descripcion: 'Fortalecimiento de la autonomía, pensamiento abstracto, ciencia experimental e informática avanzada.',
        destacados: [
            'Robótica aplicada e informática avanzada',
            'Laboratorios prácticos de Física, Química y Biología',
            'Formación en ciudadanía crítica y pensamiento social',
            'Inglés intensivo con enfoque de proyectos'
        ]
    },
    {
        titulo: 'Educación Media (10° y 11°)',
        edad: '15 a 17 Años',
        badgeColor: 'bg-rose-100 text-[#800A15] border-rose-300',
        borderColor: 'border-rose-200',
        headerGradient: 'from-[#800A15] via-rose-700 to-[#003C8F]',
        icon: GraduationCap,
        descripcion: 'Preparación de excelencia enfocada en las pruebas Saber 11, orientación vocacional e ingreso a la universidad.',
        destacados: [
            'Simulacros y preparación intensiva Pre-ICFES Saber 11',
            'Doble Titulación Técnica Profesional con el SENA',
            'Proyecto de vida y orientación universitaria',
            'Proyectos de investigación y emprendimiento juvenil'
        ]
    }
];

const fortalezasBachillerato = [
    {
        icon: Atom,
        titulo: 'Laboratorios de Ciencias y Tecnología',
        desc: 'Espacios de experimentación real equipados para química, biología, física e informática con programación.'
    },
    {
        icon: Target,
        titulo: 'Entrenamiento Pre-ICFES Saber 11',
        desc: 'Acompañamiento especializado con entrenamiento intensivo por competencias para asegurar puntajes destacados en Saber 11.'
    },
    {
        icon: Users,
        titulo: 'Liderazgo Juvenil Salesiano',
        desc: 'Gobierno escolar activo, grupos pastorales MJS y voluntariado social que forman ciudadanos éticos y comprometidos.'
    },
    {
        icon: Building2,
        titulo: 'Orientación Vocacional y Universitaria',
        desc: 'Ferias de universidades, talleres de proyecto de vida y convenios institucionales para la transición a la educación superior.'
    }
];

export default function Bachillerato() {
    return (
        <AppLayout>
            <Head title="Bachillerato | Oferta Académica COLSIH" />

            {/* 1. HERO TEMÁTICO BACHILLERATO (Institucional Elevado) */}
            <section className="relative min-h-[680px] md:min-h-[760px] pt-36 pb-32 md:pt-44 md:pb-40 bg-[#08111F] overflow-hidden select-none flex items-center">
                
                {/* Imagen vertical de fondo enfocada a los jóvenes de bachillerato */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                    <img
                        src="https://media.colsih.edu.co/ofertas_academicas/bachillerato.JPG"
                        alt="Jóvenes de Bachillerato COLSIH"
                        className="absolute top-0 right-0 w-full md:w-[65%] lg:w-[58%] h-full object-cover object-[center_35%] contrast-[1.05] brightness-90 md:brightness-95 scale-105"
                    />
                </div>

                {/* Sombra gradiente para móvil */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#08111F] via-[#08111F]/90 to-[#08111F]/60 md:hidden z-10 pointer-events-none"></div>

                {/* Sombra gradiente de izquierda a derecha para escritorio */}
                <div className="absolute inset-y-0 left-0 w-full md:w-[70%] lg:w-[60%] z-10 hidden md:block pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-r from-[#08111F] via-[#08111F] via-75% to-transparent"></div>
                </div>

                {/* Blobs luminosos azul institucional y vinotinto */}
                <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#003C8F]/25 rounded-full blur-[130px] pointer-events-none z-10 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-[#800A15]/20 rounded-full blur-[120px] pointer-events-none z-10"></div>

                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-20 w-full">
                    <div className="max-w-3xl space-y-6">
                        <ScrollReveal distance="translate-y-6">
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#003C8F]/30 via-blue-500/20 to-[#800A15]/30 border border-blue-400/40 backdrop-blur-md shadow-lg shadow-blue-500/10">
                                <Award className="w-4 h-4 text-blue-300" />
                                <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-rose-300 bg-clip-text text-transparent text-xs md:text-sm font-black tracking-wider uppercase font-sans">
                                    Básica Secundaria y Media • Grados 6° a 11°
                                </span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-white leading-[1.08] tracking-tight font-sans">
                                Rigor académico, <br className="hidden sm:block" />
                                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-rose-400 bg-clip-text text-transparent drop-shadow-md">
                                    liderazgo ético y proyección laboral
                                </span>
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
                                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#003C8F] via-blue-700 to-indigo-800 hover:from-blue-700 hover:to-indigo-900 text-white font-black text-sm md:text-base shadow-xl shadow-blue-500/25 hover:scale-105 transition-all duration-300 border border-blue-400/40 flex items-center gap-2"
                                >
                                    <span>Iniciar Admisión Bachillerato</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <a
                                    href="#ciclos"
                                    className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/25 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                >
                                    <span>Ver Ciclos Formativos</span>
                                    <Search className="w-4 h-4 text-blue-300" />
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

            {/* 2. CICLOS FORMATIVOS PERFECCIONADOS */}
            <section id="ciclos" className="py-20 md:py-28 bg-[#F8FAFC] relative z-10">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-[#003C8F] font-extrabold text-xs tracking-[3px] uppercase mb-4 border border-blue-200">
                            <GraduationCap className="w-4 h-4 text-[#003C8F]" />
                            ETAPAS DE APRENDIZAJE SECTORIAL
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            Ciclos Formativos del Bachillerato
                        </h2>
                        <p className="text-slate-600 text-base md:text-lg mt-4 font-medium">
                            Una formación secundaria exigente dividida en dos ciclos que potencian la ciencia, la ética y el proyecto de vida.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {ciclosBachillerato.map((ciclo, idx) => {
                            const IconComponent = ciclo.icon;
                            return (
                                <ScrollReveal key={ciclo.titulo} delay={idx * 150} distance="translate-y-8">
                                    <div className={`bg-white rounded-3xl overflow-hidden shadow-xl border ${ciclo.borderColor} hover:shadow-2xl transition-all duration-300 flex flex-col h-full group hover:-translate-y-1`}>
                                        <div className={`p-8 bg-gradient-to-r ${ciclo.headerGradient} text-white flex justify-between items-center`}>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </div>
                                                <h3 className="text-2xl font-black">{ciclo.titulo}</h3>
                                            </div>
                                            <span className={`px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider ${ciclo.badgeColor}`}>
                                                {ciclo.edad}
                                            </span>
                                        </div>
                                        <div className="p-8 flex flex-col justify-between flex-grow">
                                            <p className="text-slate-600 font-medium text-base leading-relaxed mb-6">
                                                {ciclo.descripcion}
                                            </p>
                                            <div className="space-y-3 pt-6 border-t border-slate-100">
                                                <span className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-2">Componentes Clave:</span>
                                                {ciclo.destacados.map((item) => (
                                                    <div key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                                                        <Check className="w-4 h-4 text-[#003C8F] shrink-0" />
                                                        <span>{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3. FORTALEZAS Y PROPUESTA DE VALOR */}
            <section className="py-20 md:py-28 bg-white relative z-10">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-[#800A15] font-extrabold text-xs tracking-[3px] uppercase mb-4 border border-rose-200">
                            <Building2 className="w-4 h-4 text-[#800A15]" />
                            EXCELENCIA INSTITUCIONAL
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            Fortalezas de Nuestra Educación Media
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {fortalezasBachillerato.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <ScrollReveal key={item.titulo} delay={idx * 120} distance="translate-y-6">
                                    <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all duration-300 flex items-start gap-5 group hover:-translate-y-1 shadow-lg shadow-slate-900/5">
                                        <div className="p-4 rounded-2xl bg-blue-100/80 text-[#003C8F] group-hover:scale-110 transition-transform duration-300 shrink-0 border border-blue-200">
                                            <IconComponent className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">{item.titulo}</h3>
                                            <p className="text-slate-600 text-sm font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. BANNER FINAL ADMISIONES BACHILLERATO */}
            <section className="py-20 bg-gradient-to-r from-[#003C8F] via-blue-800 to-[#800A15] text-white relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-md">
                        ¡Proyecta el futuro universitario y profesional de tus hijos!
                    </h2>
                    <p className="text-blue-100 text-base md:text-xl font-medium max-w-2xl mx-auto">
                        Inscripciones abiertas para Básica Secundaria y Media Técnica. Forma parte de la comunidad salesiana COLSIH.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/admisiones"
                            className="inline-flex items-center gap-3 px-9 py-4 rounded-2xl bg-white text-slate-900 font-black text-sm md:text-base shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-blue-50"
                        >
                            <span>Solicitar Admisión a Bachillerato</span>
                            <ArrowRight className="w-5 h-5 text-[#003C8F]" />
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
