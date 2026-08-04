import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';
import { Sparkles, Heart, Smile, Palette, Music, BookOpen, Sun, Gamepad2, Star, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

const gradosPreescolar = [
    {
        nombre: 'Prejardín',
        edad: '3 Años',
        color: 'from-pink-400 via-rose-400 to-amber-400',
        borderColor: 'border-pink-200',
        badgeBg: 'bg-pink-100 text-pink-700 border border-pink-300',
        cardBg: 'from-pink-50/40 via-orange-50/30 to-amber-50/20',
        icon: Heart,
        iconColor: 'text-pink-500 bg-pink-100 border-pink-200',
        descripcion: 'Primer acercamiento a la vida escolar en un entorno seguro, afectuoso y enriquecedor.',
        enfoques: ['Adaptación feliz y autónoma', 'Estimulación sensorial y del lenguaje', 'Juego guiado y socialización']
    },
    {
        nombre: 'Jardín',
        edad: '4 Años',
        color: 'from-cyan-400 via-sky-400 to-blue-500',
        borderColor: 'border-cyan-200',
        badgeBg: 'bg-cyan-100 text-cyan-800 border border-cyan-300',
        cardBg: 'from-cyan-50/40 via-sky-50/30 to-blue-50/20',
        icon: Palette,
        iconColor: 'text-cyan-600 bg-cyan-100 border-cyan-200',
        descripcion: 'Desarrollo de la curiosidad natural, exploración del entorno y primer acercamiento al pensamiento lógico.',
        enfoques: ['Pre-escritura y garabateo creativo', 'Iniciación al inglés recreativo', 'Desarrollo motriz fino y grueso']
    },
    {
        nombre: 'Transición',
        edad: '5 - 6 Años',
        color: 'from-emerald-400 via-teal-400 to-amber-400',
        borderColor: 'border-emerald-200',
        badgeBg: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
        cardBg: 'from-emerald-50/40 via-teal-50/30 to-amber-50/20',
        icon: Star,
        iconColor: 'text-emerald-600 bg-emerald-100 border-emerald-200',
        descripcion: 'Consolidación de competencias lectoras iniciales y preparación integral para la Básica Primaria.',
        enfoques: ['Procesos de conciencia fonológica', 'Pensamiento matemático inicial', 'Autonomía y convivencia salesiana']
    }
];

const pilaresPreescolar = [
    {
        icon: Smile,
        color: 'bg-amber-100 text-amber-600 border-amber-300',
        titulo: 'Pedagogía de la Alegría',
        desc: 'Inspirados en Don Bosco, creamos un ambiente donde aprender es una experiencia alegre, llena de afecto, música, teatro y celebración del crecimiento diario.'
    },
    {
        icon: BookOpen,
        color: 'bg-cyan-100 text-cyan-600 border-cyan-300',
        titulo: 'Iniciación al Bilingüismo',
        desc: 'Sensibilización continua al idioma inglés a través de canciones divertidas, juegos interactivos, comandos de aula y vocabulario cotidiano.'
    },
    {
        icon: Music,
        color: 'bg-pink-100 text-pink-600 border-pink-300',
        titulo: 'Expresión Artística y Motriz',
        desc: 'Espacios de exploración corporal, desarrollo de la psicomotricidad fina y gruesa, pintura, moldeado y actividades rítmicas al aire libre.'
    },
    {
        icon: Heart,
        color: 'bg-emerald-100 text-emerald-600 border-emerald-300',
        titulo: 'Acompañamiento de Familia',
        desc: 'Alianza continua entre educadores salesianos y padres de familia para respaldar el bienestar emocional, espiritual y adaptativo de cada niño.'
    }
];

export default function Preescolar() {
    return (
        <AppLayout>
            <Head title="Preescolar | Oferta Académica COLSIH" />

            {/* 1. HERO INFANTIL MULTICOLOR PREESCOLAR */}
            <section className="relative min-h-[680px] md:min-h-[760px] pt-36 pb-32 md:pt-44 md:pb-40 bg-[#1C1002] overflow-hidden select-none flex items-center">
                
                {/* Imagen vertical de fondo en los columpios con ambos niños */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                    <img
                        src="https://pub-c4ddb3fb75904158bbda5fbc35d6963e.r2.dev/ofertas_academicas/preescolar/preescolar_dos.JPG"
                        alt="Niños de Preescolar COLSIH en columpios"
                        className="absolute top-0 right-0 w-full md:w-[65%] lg:w-[58%] h-full object-cover object-[center_45%] contrast-[1.05] brightness-90 md:brightness-95 scale-105"
                    />
                </div>

                {/* Sombra gradiente para móvil */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1C1002] via-[#1C1002]/90 to-[#1C1002]/60 md:hidden z-10 pointer-events-none"></div>

                {/* Sombra gradiente de izquierda a derecha para escritorio */}
                <div className="absolute inset-y-0 left-0 w-full md:w-[70%] lg:w-[60%] z-10 hidden md:block pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-r from-[#1C1002] via-[#1C1002] via-75% to-transparent"></div>
                </div>

                {/* Burbujas y Blobs Animados Infantiles Multicolores */}
                <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-amber-500/20 rounded-full blur-[100px] pointer-events-none z-10 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-[90px] pointer-events-none z-10 animate-pulse delay-700"></div>
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-[110px] pointer-events-none z-10 animate-pulse delay-1000"></div>

                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-20 w-full">
                    <div className="max-w-3xl space-y-6">
                        <ScrollReveal distance="translate-y-6">
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-cyan-500/20 border border-amber-400/40 backdrop-blur-md shadow-lg shadow-amber-500/10">
                                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                                <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent text-xs md:text-sm font-black tracking-wider uppercase font-sans">
                                    Educación Inicial • 3 a 6 Años
                                </span>
                                <Sun className="w-4 h-4 text-pink-300 animate-pulse" />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-white leading-[1.08] tracking-tight font-sans">
                                Descubrir el mundo con <br className="hidden sm:block" />
                                <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-md">
                                    alegría, amor y curiosidad
                                </span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-lg md:text-xl font-medium text-amber-100/90 leading-relaxed max-w-2xl font-sans">
                                En el Preescolar COLSIH brindamos una formación amorosa y divertida que estimula los talentos, la creatividad y la dimensión afectiva de nuestros niños bajo la tradición salesiana.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={450}>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    href="/admisiones"
                                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-black text-sm md:text-base shadow-xl shadow-orange-500/25 hover:scale-105 transition-all duration-300 border border-amber-300/40 flex items-center gap-2"
                                >
                                    <span>Iniciar Admisión Preescolar</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <a
                                    href="#grados"
                                    className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/25 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                >
                                    <span>Ver Grados</span>
                                    <Star className="w-4 h-4 text-amber-300" />
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

            {/* 2. GRADOS DE PREESCOLAR (Multicolor e Infantil) */}
            <section id="grados" className="py-20 md:py-28 bg-gradient-to-b from-[#FFFBEB] via-[#FFF7ED] to-[#FEF2F2] relative z-10">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs tracking-[3px] uppercase mb-4 border border-amber-200">
                            <Palette className="w-4 h-4 text-amber-600" />
                            NIVELES FORMATIVOS INFANTILES
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            Nuestros Grados de Preescolar
                        </h2>
                        <p className="text-slate-600 text-base md:text-lg mt-4 font-medium">
                            Cada etapa evolutiva está llena de color, juegos estimulantes y experiencias diseñadas para promover el crecimiento feliz de nuestros niños.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {gradosPreescolar.map((grado, idx) => {
                            const IconComponent = grado.icon;
                            return (
                                <ScrollReveal key={grado.nombre} delay={idx * 150} distance="translate-y-8">
                                    <div className={`bg-gradient-to-br ${grado.cardBg} bg-white rounded-[32px] p-8 shadow-xl border-2 ${grado.borderColor} hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full relative overflow-hidden group`}>
                                        <div className={`h-2.5 w-full absolute top-0 left-0 bg-gradient-to-r ${grado.color}`}></div>
                                        <div className="flex justify-between items-center mb-6 pt-2">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-3 rounded-2xl border ${grado.iconColor} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                                    <IconComponent className="w-6 h-6" />
                                                </div>
                                                <h3 className="text-2xl font-black text-slate-900">{grado.nombre}</h3>
                                            </div>
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wider shadow-sm ${grado.badgeBg}`}>
                                                {grado.edad}
                                            </span>
                                        </div>
                                        <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">
                                            {grado.descripcion}
                                        </p>
                                        <div className="mt-auto space-y-3 pt-5 border-t border-amber-200/60">
                                            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Énfasis del Nivel:</span>
                                            {grado.enfoques.map((item) => (
                                                <div key={item} className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                                                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3. PILARES PEDAGÓGICOS MULTICOLORES */}
            <section className="py-20 md:py-28 bg-white relative z-10">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-800 font-extrabold text-xs tracking-[3px] uppercase mb-4 border border-pink-200">
                            <Sparkles className="w-4 h-4 text-pink-600" />
                            PROPUESTA EDUCATIVA ALEGRE
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            ¿Por qué elegir el Preescolar COLSIH?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {pilaresPreescolar.map((pilar, idx) => {
                            const IconComponent = pilar.icon;
                            return (
                                <ScrollReveal key={pilar.titulo} delay={idx * 120} distance="translate-y-6">
                                    <div className="p-8 rounded-[32px] bg-gradient-to-br from-amber-50/50 via-pink-50/40 to-cyan-50/40 border-2 border-amber-100 hover:border-amber-300 shadow-lg shadow-amber-500/5 transition-all duration-300 flex items-start gap-5 group hover:-translate-y-1">
                                        <div className={`p-4 rounded-2xl ${pilar.color} group-hover:scale-110 transition-transform duration-300 shrink-0 shadow-sm border`}>
                                            <IconComponent className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 mb-2">{pilar.titulo}</h3>
                                            <p className="text-slate-600 text-sm font-medium leading-relaxed">{pilar.desc}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. BANNER FINAL ADMISIONES PREESCOLAR MULTICOLOR */}
            <section className="py-20 bg-gradient-to-r from-amber-500 via-pink-500 to-cyan-500 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white font-black text-xs uppercase tracking-widest border border-white/30">
                        <Award className="w-4 h-4 text-amber-200" />
                        <span>¡INSCRIPCIONES ABIERTAS 2026!</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-md">
                        ¡Acompaña los primeros pasos escolares de tu hijo con nosotros!
                    </h2>
                    <p className="text-amber-50 text-base md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        Inscripciones abiertas para Prejardín, Jardín y Transición. Ven y conoce nuestras instalaciones y nuestro cálido equipo docente salesiano.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/admisiones"
                            className="inline-flex items-center gap-3 px-9 py-4 rounded-2xl bg-white text-slate-900 font-black text-sm md:text-base shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-amber-50"
                        >
                            <span>Solicitar Información de Admisión</span>
                            <ArrowRight className="w-5 h-5 text-amber-600" />
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
