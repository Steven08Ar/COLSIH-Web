import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';

const gradosPreescolar = [
    {
        nombre: 'Prejardín',
        edad: '3 Años',
        color: 'from-amber-400 to-orange-500',
        borderColor: 'border-amber-200',
        badgeBg: 'bg-amber-100 text-amber-800',
        descripcion: 'Primer acercamiento a la vida escolar en un entorno seguro, afectuoso y enriquecedor.',
        enfoques: ['Adaptación feliz y autónoma', 'Estimulación sensorial y del lenguaje', 'Juego guiado y socialización']
    },
    {
        nombre: 'Jardín',
        edad: '4 Años',
        color: 'from-orange-400 to-amber-500',
        borderColor: 'border-orange-200',
        badgeBg: 'bg-orange-100 text-orange-800',
        descripcion: 'Desarrollo de la curiosidad natural, exploración del entorno y primer acercamiento al pensamiento lógico.',
        enfoques: ['Pre-escritura y garabateo creativo', 'Iniciación al inglés recreativo', 'Desarrollo motriz fino y grueso']
    },
    {
        nombre: 'Transición',
        edad: '5 - 6 Años',
        color: 'from-amber-500 to-yellow-500',
        borderColor: 'border-yellow-200',
        badgeBg: 'bg-yellow-100 text-yellow-800',
        descripcion: 'Consolidación de competencias lectoras iniciales y preparación integral para la Básica Primaria.',
        enfoques: ['Procesos de conciencia fonológica', 'Pensamiento matemático inicial', 'Autonomía y convivencia salesiana']
    }
];

const pilaresPreescolar = [
    {
        icon: (
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        titulo: 'Pedagogía de la Alegría',
        desc: 'Inspirados en Don Bosco, creamos un ambiente donde aprender es una experiencia alegre, llena de afecto, música y celebración del crecimiento diario.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
        ),
        titulo: 'Iniciación al Bilingüismo',
        desc: 'Sensibilización continua al idioma inglés a través de canciones, juegos interactivos, comandos de aula y vocabulario cotidiano.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        titulo: 'Desarrollo Psicomotriz e Integral',
        desc: 'Espacios de exploración corporal, coordinación viso-motora, expresión plástica y actividades rítmicas al aire libre.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        titulo: 'Acompañamiento de Familia',
        desc: 'Alianza continua entre educadores salesianos y padres de familia para respaldar el bienestar emocional y adaptativo de cada niño.'
    }
];

export default function Preescolar() {
    return (
        <AppLayout>
            <Head title="Preescolar | Oferta Académica COLSIH" />

            {/* 1. HERO TEMÁTICO PREESCOLAR */}
            <section className="relative min-h-[680px] md:min-h-[760px] pt-36 pb-32 md:pt-44 md:pb-40 bg-[#1C1002] overflow-hidden select-none flex items-center">
                
                {/* Imagen vertical de fondo enfocada a los niños (niño y niña completos) en la derecha */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                    <img
                        src="/galeria/preescolar.JPG"
                        alt="Niños de Preescolar COLSIH"
                        className="absolute top-0 right-0 w-full md:w-[65%] lg:w-[58%] h-full object-cover object-[center_bottom] md:object-[center_85%] contrast-[1.05] brightness-90 md:brightness-95"
                    />
                </div>

                {/* Sombra gradiente completa para móvil */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1C1002] via-[#1C1002]/90 to-[#1C1002]/60 md:hidden z-10 pointer-events-none"></div>

                {/* Sombra gradiente de izquierda a derecha para escritorio */}
                <div className="absolute inset-y-0 left-0 w-full md:w-[70%] lg:w-[60%] z-10 hidden md:block pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-r from-[#1C1002] via-[#1C1002] via-75% to-transparent"></div>
                </div>

                {/* Blobs luminosos de color ámbar/cálido */}
                <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-amber-500/15 rounded-full blur-[130px] pointer-events-none z-10"></div>

                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-20 w-full">
                    <div className="max-w-3xl space-y-6">
                        <ScrollReveal distance="translate-y-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md">
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                                <span className="text-amber-300 text-xs md:text-sm font-bold tracking-wider uppercase">
                                    Educación Inicial • 3 a 6 Años
                                </span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-white leading-[1.08] tracking-tight font-sans">
                                Descubrir el mundo con <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 bg-clip-text text-transparent">alegría, amor y curiosidad</span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-lg md:text-xl font-medium text-slate-300 leading-relaxed max-w-2xl font-sans">
                                En el Preescolar COLSIH brindamos una formación amorosa que estimula los talentos, la creatividad y la dimensión afectiva de nuestros niños bajo la tradición pedagógica salesiana.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={450}>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    href="/admisiones"
                                    className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:scale-105 transition-all duration-300 border border-amber-400/30"
                                >
                                    Iniciar Admisión Preescolar
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
                        <path d="M0,100 C380,20 760,90 1080,30 C1200,10 1320,20 1440,60 L1440,100 L0,100 Z" fill="#FFFBEB"></path>
                    </svg>
                </div>
            </section>

            {/* 2. GRADOS DE PREESCOLAR */}
            <section id="grados" className="py-20 md:py-28 bg-[#FFFBEB] relative z-10">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-amber-600 text-xs md:text-sm font-bold tracking-[3px] uppercase block mb-3">
                            NIVELES FORMATIVOS
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            Nuestros Grados de Preescolar
                        </h2>
                        <p className="text-slate-600 text-base md:text-lg mt-4 font-medium">
                            Cada grado está diseñado según la etapa evolutiva del niño, promoviendo su desarrollo motriz, socioafectivo y cognitivo.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {gradosPreescolar.map((grado, idx) => (
                            <ScrollReveal key={grado.nombre} delay={idx * 150} distance="translate-y-8">
                                <div className={`bg-white rounded-3xl p-8 shadow-xl border ${grado.borderColor} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full relative overflow-hidden`}>
                                    <div className={`h-2 w-full absolute top-0 left-0 bg-gradient-to-r ${grado.color}`}></div>
                                    <div className="flex justify-between items-center mb-6 pt-2">
                                        <h3 className="text-2xl font-black text-slate-900">{grado.nombre}</h3>
                                        <span className={`px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider ${grado.badgeBg}`}>
                                            {grado.edad}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">
                                        {grado.descripcion}
                                    </p>
                                    <div className="mt-auto space-y-3 pt-4 border-t border-amber-100">
                                        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">Énfasis del Nivel:</span>
                                        {grado.enfoques.map((item) => (
                                            <div key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                                                <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. PILARES PEDAGÓGICOS */}
            <section className="py-20 md:py-28 bg-white relative z-10">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-amber-600 text-xs md:text-sm font-bold tracking-[3px] uppercase block mb-3">
                            PROPUESTA EDUCATIVA
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            ¿Por qué elegir el Preescolar COLSIH?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {pilaresPreescolar.map((pilar, idx) => (
                            <ScrollReveal key={pilar.titulo} delay={idx * 120} distance="translate-y-6">
                                <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-amber-50/20 border border-amber-100 hover:border-amber-300 transition-all duration-300 flex items-start gap-5 group">
                                    <div className="p-4 rounded-2xl bg-amber-100/80 text-amber-600 group-hover:scale-110 transition-transform duration-300 shrink-0">
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

            {/* 4. BANNER FINAL ADMISIONES PREESCOLAR */}
            <section className="py-20 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 text-white relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                        ¡Acompaña los primeros pasos escolares de tu hijo con nosotros!
                    </h2>
                    <p className="text-amber-100 text-base md:text-xl font-medium max-w-2xl mx-auto">
                        Inscripciones abiertas para Prejardín, Jardín y Transición. Ven y conoce nuestras instalaciones y equipo docente salesiano.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/admisiones"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-amber-900 font-extrabold text-sm md:text-base shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <span>Solicitar Información de Admisión</span>
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
