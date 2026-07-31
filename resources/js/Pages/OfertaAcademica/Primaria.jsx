import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';

const gradosPrimaria = [
    { grado: 'Primero (1°)', edad: '6 - 7 Años', enfoque: 'Consolidación de la lectoescritura y razonamiento numérico básico.' },
    { grado: 'Segundo (2°)', edad: '7 - 8 Años', enfoque: 'Comprensión lectora fluida y operaciones matemáticas fundamentales.' },
    { grado: 'Tercero (3°)', edad: '8 - 9 Años', enfoque: 'Desarrollo de pensamiento científico inicial y trabajo colaborativo.' },
    { grado: 'Cuarto (4°)', edad: '9 - 10 Años', enfoque: 'Autonomía académica, informática aplicada e historia de Colombia.' },
    { grado: 'Quinto (5°)', edad: '10 - 11 Años', enfoque: 'Liderazgo escolar, investigación guiada y transición a la secundaria.' },
];

const pilaresPrimaria = [
    {
        icon: (
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        titulo: 'Pensamiento Lógico y Matemático',
        desc: 'Desarrollo de la capacidad analítica, resolución de problemas prácticos y razonamiento cuantitativo mediante retos en el aula.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        titulo: 'Comprensión Lectora y Expresión',
        desc: 'Fomento del amor por la lectura, producción textual libre y exposiciones orales que fortalecen la confianza communicativa.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
        ),
        titulo: 'Inglés Intensivo',
        desc: 'Enfoque comunicativo práctico con estándares internacionales, fortaleciendo la escucha, la lectura y la interacción en el segundo idioma.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2v1a2 2 0 002 2h2.945M8 3.935A9 9 0 1020.065 16H18a2 2 0 01-2-2v-1a2 2 0 00-2-2h-1.064M8 3.935A8.998 8.998 0 003 11" />
            </svg>
        ),
        titulo: 'Conciencia Ambiental y Cuidado',
        desc: 'Proyectos de recolección ecológica, cuidado de la casa común y sensibilización con el entorno natural según la encíclica Laudato Si.'
    }
];

export default function Primaria() {
    return (
        <AppLayout>
            <Head title="Básica Primaria | Oferta Académica COLSIH" />

            {/* 1. HERO TEMÁTICO PRIMARIA */}
            <section className="relative min-h-[680px] md:min-h-[760px] pt-36 pb-32 md:pt-44 md:pb-40 bg-[#022C22] overflow-hidden select-none flex items-center">
                
                {/* Imagen vertical de fondo enfocada a los estudiantes de primaria en la derecha */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                    <img
                        src="/galeria/primaria.JPG"
                        alt="Estudiantes de Primaria COLSIH"
                        className="absolute top-0 right-0 w-full md:w-[65%] lg:w-[58%] h-full object-cover object-[center_60%] contrast-[1.05] brightness-90 md:brightness-95 scale-105"
                    />
                </div>

                {/* Sombra gradiente completa para móvil */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#022C22] via-[#022C22]/90 to-[#022C22]/60 md:hidden z-10 pointer-events-none"></div>

                {/* Sombra gradiente de izquierda a derecha para escritorio */}
                <div className="absolute inset-y-0 left-0 w-full md:w-[70%] lg:w-[60%] z-10 hidden md:block pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-r from-[#022C22] via-[#022C22] via-75% to-transparent"></div>
                </div>

                {/* Blobs luminosos esmeralda */}
                <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-emerald-500/15 rounded-full blur-[130px] pointer-events-none z-10"></div>

                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-20 w-full">
                    <div className="max-w-3xl space-y-6">
                        <ScrollReveal distance="translate-y-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span className="text-emerald-300 text-xs md:text-sm font-bold tracking-wider uppercase">
                                    Básica Primaria • Grados 1° a 5°
                                </span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-white leading-[1.08] tracking-tight font-sans">
                                Bases sólidas para <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">aprender, indagar y crecer</span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-lg md:text-xl font-medium text-slate-300 leading-relaxed max-w-2xl font-sans">
                                Acompañamos el pensamiento crítico, la convivencia fraternal y el conocimiento científico inicial de nuestros niños en un ambiente seguro y estimulante.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={450}>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    href="/admisiones"
                                    className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all duration-300 border border-emerald-400/30"
                                >
                                    Iniciar Admisión Primaria
                                </Link>
                                <a
                                    href="#grados"
                                    className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm backdrop-blur-md border border-white/20 hover:scale-105 transition-all duration-300"
                                >
                                    Ver Grados
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Divisor de ola inferior */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                    <svg className="relative block w-full h-[50px] md:h-[80px]" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path d="M0,100 C380,20 760,90 1080,30 C1200,10 1320,20 1440,60 L1440,100 L0,100 Z" fill="#ECFDF5"></path>
                    </svg>
                </div>
            </section>

            {/* 2. ESTRUCTURA DE GRADOS */}
            <section id="grados" className="py-20 md:py-28 bg-[#ECFDF5] relative z-10">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-emerald-700 text-xs md:text-sm font-bold tracking-[3px] uppercase block mb-3">
                            PLAN DE ESTUDIOS
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            Grados de la Básica Primaria
                        </h2>
                        <p className="text-slate-600 text-base md:text-lg mt-4 font-medium">
                            Un recorrido continuo desde primero a quinto grado que consolida las competencias de pensamiento y valor humano.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gradosPrimaria.map((item, idx) => (
                            <ScrollReveal key={item.grado} delay={idx * 100} distance="translate-y-6">
                                <div className="bg-white rounded-3xl p-7 shadow-lg border border-emerald-100 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between h-full">
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-black text-slate-900">{item.grado}</h3>
                                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                                                {item.edad}
                                            </span>
                                        </div>
                                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                                            {item.enfoque}
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-600">
                                        <span>Formación Integral Salesiana</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. PILARES PEDAGÓGICOS PRIMARIA */}
            <section className="py-20 md:py-28 bg-white relative z-10">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-emerald-700 text-xs md:text-sm font-bold tracking-[3px] uppercase block mb-3">
                            ENFOQUE DE ENSEÑANZA
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            Áreas de Enfoque y Fortalezas
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {pilaresPrimaria.map((pilar, idx) => (
                            <ScrollReveal key={pilar.titulo} delay={idx * 120} distance="translate-y-6">
                                <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50/70 via-teal-50/30 to-emerald-50/10 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 flex items-start gap-5 group">
                                    <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-600 group-hover:scale-110 transition-transform duration-300 shrink-0">
                                        {pilar.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{pilar.titulo}</h3>
                                        <p className="text-slate-600 text-sm font-medium leading-relaxed">{pilar.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. BANNER FINAL ADMISIONES PRIMARIA */}
            <section className="py-20 bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-800 text-white relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                        ¡Construye el futuro académico de tus hijos con la familia COLSIH!
                    </h2>
                    <p className="text-emerald-100 text-base md:text-xl font-medium max-w-2xl mx-auto">
                        Inscripciones abiertas para todos los grados de Básica Primaria.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/admisiones"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-emerald-900 font-extrabold text-sm md:text-base shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <span>Solicitar Admisión a Primaria</span>
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
