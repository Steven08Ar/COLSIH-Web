import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';
import { Rocket, BookOpen, Microscope, Brain, Globe, Trees, Trophy, Sparkles, ArrowRight, CheckCircle2, Calculator, Laptop, Compass } from 'lucide-react';

const gradosPrimaria = [
    {
        grado: 'Primero (1°)',
        edad: '6 - 7 Años',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
        icon: BookOpen,
        iconColor: 'text-cyan-600 bg-cyan-100 border-cyan-200',
        enfoque: 'Consolidación de la lectoescritura fluida, iniciación al laboratorio de lógica y razonamiento numérico.'
    },
    {
        grado: 'Segundo (2°)',
        edad: '7 - 8 Años',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
        icon: Calculator,
        iconColor: 'text-blue-600 bg-blue-100 border-blue-200',
        enfoque: 'Comprensión lectora avanzada, operaciones matemáticas fundamentales y proyectos de aula interactivos.'
    },
    {
        grado: 'Tercero (3°)',
        edad: '8 - 9 Años',
        badgeColor: 'bg-violet-100 text-violet-800 border-violet-300',
        icon: Microscope,
        iconColor: 'text-violet-600 bg-violet-100 border-violet-200',
        enfoque: 'Desarrollo del pensamiento científico inicial, experiencias de laboratorio y trabajo en equipo.'
    },
    {
        grado: 'Cuarto (4°)',
        edad: '9 - 10 Años',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
        icon: Laptop,
        iconColor: 'text-indigo-600 bg-indigo-100 border-indigo-200',
        enfoque: 'Autonomía académica, informática aplicada, habilidades digitales y cultura de investigación.'
    },
    {
        grado: 'Quinto (5°)',
        edad: '10 - 11 Años',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        icon: Trophy,
        iconColor: 'text-emerald-600 bg-emerald-100 border-emerald-200',
        enfoque: 'Liderazgo escolar, investigación guiada, inglés avanzado y preparación integral para la secundaria.'
    },
];

const pilaresPrimaria = [
    {
        icon: Calculator,
        color: 'bg-cyan-100 text-cyan-700 border-cyan-300',
        titulo: 'Pensamiento Lógico y STEM',
        desc: 'Desarrollo de la capacidad analítica, resolución de problemas prácticos y razonamiento cuantitativo mediante retos creativos.'
    },
    {
        icon: BookOpen,
        color: 'bg-violet-100 text-violet-700 border-violet-300',
        titulo: 'Lectoescritura Creativa',
        desc: 'Fomento del pensamiento crítico a través de la producción de textos, debates de aula y amor por la literatura juvenil.'
    },
    {
        icon: Globe,
        color: 'bg-blue-100 text-blue-700 border-blue-300',
        titulo: 'Inglés Intensivo',
        desc: 'Enfoque comunicativo práctico con estándares internacionales, fortaleciendo la conversación, lectura e interacción bilingüe.'
    },
    {
        icon: Trees,
        color: 'bg-emerald-100 text-emerald-700 border-emerald-300',
        titulo: 'Conciencia Ambiental y Cuidado',
        desc: 'Proyectos ecológicos escolares de investigación y cuidado de la naturaleza orientados al compromiso con el entorno.'
    }
];

export default function Primaria() {
    return (
        <AppLayout>
            <Head title="Básica Primaria | Oferta Académica COLSIH" />

            {/* 1. HERO JUVENIL PRIMARIA (Cian / Índigo / Violeta / Esmeralda) */}
            <section className="relative min-h-[680px] md:min-h-[760px] pt-36 pb-32 md:pt-44 md:pb-40 bg-[#061826] overflow-hidden select-none flex items-center">
                
                {/* Imagen vertical de fondo enfocada a los estudiantes de primaria */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                    <img
                        src="https://pub-c4ddb3fb75904158bbda5fbc35d6963e.r2.dev/ofertas_academicas/primaria.JPG"
                        alt="Estudiantes de Primaria COLSIH"
                        className="absolute top-0 right-0 w-full md:w-[65%] lg:w-[58%] h-full object-cover object-[center_60%] contrast-[1.05] brightness-90 md:brightness-95 scale-105"
                    />
                </div>

                {/* Sombra gradiente para móvil */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#061826] via-[#061826]/90 to-[#061826]/60 md:hidden z-10 pointer-events-none"></div>

                {/* Sombra gradiente de izquierda a derecha para escritorio */}
                <div className="absolute inset-y-0 left-0 w-full md:w-[70%] lg:w-[60%] z-10 hidden md:block pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-r from-[#061826] via-[#061826] via-75% to-transparent"></div>
                </div>

                {/* Blobs luminosos juveniles Cian y Violeta */}
                <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[130px] pointer-events-none z-10 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[120px] pointer-events-none z-10"></div>

                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-20 w-full">
                    <div className="max-w-3xl space-y-6">
                        <ScrollReveal distance="translate-y-6">
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20 border border-cyan-400/30 backdrop-blur-md shadow-lg shadow-cyan-500/10">
                                <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
                                <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-violet-300 bg-clip-text text-transparent text-xs md:text-sm font-black tracking-wider uppercase font-sans">
                                    Básica Primaria • Grados 1° a 5°
                                </span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-white leading-[1.08] tracking-tight font-sans">
                                Exploración y bases para <br className="hidden sm:block" />
                                <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent drop-shadow-md">
                                    aprender, indagar y liderar
                                </span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-lg md:text-xl font-medium text-cyan-100/90 leading-relaxed max-w-2xl font-sans">
                                Acompañamos el desarrollo del pensamiento crítico, la investigación científica y la convivencia juvenil de nuestros niños en un ambiente estimulante y fraterno.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={450}>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    href="/admisiones"
                                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-white font-black text-sm md:text-base shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all duration-300 border border-cyan-300/30 flex items-center gap-2"
                                >
                                    <span>Iniciar Admisión Primaria</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <a
                                    href="#grados"
                                    className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/25 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                >
                                    <span>Ver Grados</span>
                                    <Compass className="w-4 h-4 text-cyan-300" />
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Divisor de ola inferior */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                    <svg className="relative block w-full h-[50px] md:h-[80px]" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path d="M0,100 C380,20 760,90 1080,30 C1200,10 1320,20 1440,60 L1440,100 L0,100 Z" fill="#F0F9FF"></path>
                    </svg>
                </div>
            </section>

            {/* 2. ESTRUCTURA DE GRADOS (Juvenil y dinámico) */}
            <section id="grados" className="py-20 md:py-28 bg-gradient-to-b from-[#F0F9FF] via-[#E0F2FE] to-[#F5F3FF] relative z-10">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-900 font-extrabold text-xs tracking-[3px] uppercase mb-4 border border-cyan-200">
                            <Compass className="w-4 h-4 text-cyan-600" />
                            PLAN DE ESTUDIOS JUVENIL
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            Grados de la Básica Primaria
                        </h2>
                        <p className="text-slate-600 text-base md:text-lg mt-4 font-medium">
                            Un recorrido continuo desde 1° hasta 5° grado que fortalece la autonomía, el trabajo en equipo y el pensamiento científico.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gradosPrimaria.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <ScrollReveal key={item.grado} delay={idx * 100} distance="translate-y-6">
                                    <div className="bg-white rounded-3xl p-7 shadow-xl border border-cyan-100 hover:shadow-2xl hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
                                        <div>
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2.5 rounded-xl border ${item.iconColor} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                                        <IconComponent className="w-5 h-5" />
                                                    </div>
                                                    <h3 className="text-xl font-black text-slate-900">{item.grado}</h3>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-black border ${item.badgeColor}`}>
                                                    {item.edad}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 text-sm font-medium leading-relaxed">
                                                {item.enfoque}
                                            </p>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-extrabold text-cyan-600">
                                            <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                                            <span>Formación Integral Salesiana</span>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3. PILARES PEDAGÓGICOS PRIMARIA */}
            <section className="py-20 md:py-28 bg-white relative z-10">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-800 font-extrabold text-xs tracking-[3px] uppercase mb-4 border border-violet-200">
                            <Sparkles className="w-4 h-4 text-violet-600" />
                            FORTALEZAS Y ÁREAS DE ENFOQUE
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            Áreas de Enfoque y Fortalezas
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {pilaresPrimaria.map((pilar, idx) => {
                            const IconComponent = pilar.icon;
                            return (
                                <ScrollReveal key={pilar.titulo} delay={idx * 120} distance="translate-y-6">
                                    <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-50/50 via-blue-50/40 to-violet-50/40 border border-cyan-100 hover:border-cyan-300 transition-all duration-300 flex items-start gap-5 group hover:-translate-y-1 shadow-lg shadow-cyan-500/5">
                                        <div className={`p-4 rounded-2xl ${pilar.color} group-hover:scale-110 transition-transform duration-300 shrink-0 border`}>
                                            <IconComponent className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">{pilar.titulo}</h3>
                                            <p className="text-slate-600 text-sm font-medium leading-relaxed">{pilar.desc}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. BANNER FINAL ADMISIONES PRIMARIA */}
            <section className="py-20 bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-700 text-white relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-md">
                        ¡Construye el futuro académico de tus hijos con la familia COLSIH!
                    </h2>
                    <p className="text-cyan-100 text-base md:text-xl font-medium max-w-2xl mx-auto">
                        Inscripciones abiertas para todos los grados de Básica Primaria (1° a 5°).
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/admisiones"
                            className="inline-flex items-center gap-3 px-9 py-4 rounded-2xl bg-white text-slate-900 font-black text-sm md:text-base shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-cyan-50"
                        >
                            <span>Solicitar Admisión a Primaria</span>
                            <ArrowRight className="w-5 h-5 text-cyan-600" />
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
