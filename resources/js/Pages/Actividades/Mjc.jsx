import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';
import { 
    Users, 
    Sparkles, 
    Heart, 
    Compass, 
    Award, 
    Calendar, 
    CheckCircle2, 
    Flame, 
    Tent, 
    Sun, 
    Mail, 
    Phone, 
    ShieldCheck,
    Smile
} from 'lucide-react';

export default function Mjc() {
    const pilaresMjc = [
        {
            titulo: "Formación Humana y Espiritual",
            subtitulo: "Crecimiento Integral",
            descripcion: "Encuentros semanales donde los jóvenes reflexionan sobre sus proyectos de vida, valores cristianos, autoestima, toma de decisiones y el mensaje transformador del Evangelio.",
            icono: Compass,
            colorBorder: "border-[#003C8F]",
            colorBg: "bg-blue-50/70",
            colorText: "text-[#003C8F]"
        },
        {
            titulo: "Campamentos y Retiros",
            subtitulo: "Experiencias de Vida",
            descripcion: "Jornadas de inmersión al aire libre con dinámicas de integración, caminatas, fogatas, retiros de silencio y momentos de profunda confraternidad y amistad sincera.",
            icono: Tent,
            colorBorder: "border-[#800A15]",
            colorBg: "bg-rose-50/70",
            colorText: "text-[#800A15]"
        },
        {
            titulo: "Misiones y Trabajo Social",
            subtitulo: "Fe en Acción",
            descripcion: "Proyectos de voluntariado, apoyo a comedores comunitarios, campañas navideñas, visitas a hogares de ancianos y jornadas ecológicas al servicio de Floridablanca.",
            icono: Heart,
            colorBorder: "border-amber-500",
            colorBg: "bg-amber-50/70",
            colorText: "text-amber-700"
        },
        {
            titulo: "Expresión Cultural y Deporte",
            subtitulo: "Talentos en Alegría",
            descripcion: "Grupos de teatro, música pastoral, danzas y torneos deportivos de integración que fortalecen la sana convivencia y el uso positivo del tiempo libre.",
            icono: Sparkles,
            colorBorder: "border-emerald-600",
            colorBg: "bg-emerald-50/70",
            colorText: "text-emerald-800"
        }
    ];

    const niveles = [
        {
            fase: "Fase 1",
            nombre: "Semillero MJC",
            grados: "Primaria (3° a 5°)",
            desc: "Primer acercamiento asociativo con juegos de integración, principios básicos de la fe y fomento de la amistad sana.",
            icono: Sun
        },
        {
            fase: "Fase 2",
            nombre: "Pre-Juventud",
            grados: "Bachillerato (6° a 8°)",
            desc: "Desarrollo de habilidades de liderazgo, trabajo en equipo, jornadas de campo y vivencia de la responsabilidad social.",
            icono: Flame
        },
        {
            fase: "Fase 3",
            nombre: "Juventud y Liderazgo",
            grados: "Bachillerato (9° a 11°)",
            desc: "Formación de animadores juveniles, organización de misiones comunitarias, talleres vocacionales y servicio apostólico.",
            icono: Award
        }
    ];

    return (
        <AppLayout>
            <Head title="Movimiento Juvenil Católico (MJC) | COLSIH" />

            {/* SECCIÓN HERO: MJC */}
            <section className="relative min-h-[520px] flex items-center pt-36 pb-20 bg-[#08111F] text-left select-none overflow-hidden border-b border-white/10 font-sans">
                {/* Elementos decorativos de fondo */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(128,10,21,0.25)_0%,transparent_55%)] pointer-events-none" />
                <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#003C8F]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
                        <ScrollReveal distance="translate-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#003C8F] to-[#800A15] text-white text-xs font-black tracking-widest uppercase shadow-md">
                                <Flame className="w-4 h-4 text-amber-300" />
                                PASTORAL JUVENIL · GRUPOS ASOCIATIVOS
                            </div>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-4" delay={150}>
                            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-white leading-[1.08] tracking-tight">
                                Movimiento Juvenil <br className="hidden sm:block" />
                                <span className="text-amber-400">Católico (MJC)</span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-4" delay={300}>
                            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
                                El MJC es el espacio juvenil donde los estudiantes de COLSIH viven la fraternidad, descubren sus fortalezas, sirven a la comunidad y construyen un proyecto de vida inspirado en los valores del Evangelio.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-4" delay={400}>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                                <a
                                    href="#pilares-mjc"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg hover:scale-105 transition-all duration-300"
                                >
                                    Conocer Áreas del MJC
                                </a>
                                <a
                                    href="#contacto-mjc"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-sm transition-all duration-300"
                                >
                                    Unirse al MJC
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="lg:col-span-4 flex justify-center">
                        <ScrollReveal distance="scale-90" delay={450}>
                            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-gradient-to-tr from-[#800A15]/40 to-[#003C8F]/40 p-1 border border-white/20 shadow-2xl flex items-center justify-center">
                                <div className="w-full h-full rounded-[22px] bg-[#08111F]/90 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#800A15] to-amber-500 text-white flex items-center justify-center shadow-lg">
                                        <Flame className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">MJC COLSIH</span>
                                        <h3 className="text-lg font-extrabold text-white">Juventud y Fe</h3>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </section>

            {/* SECCIÓN 1: PILARES DEL MJC */}
            <section id="pilares-mjc" className="py-20 md:py-28 bg-white border-b border-slate-100 font-sans select-none">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
                    
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <ScrollReveal distance="translate-y-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
                                LIDERAZGO Y FRATERNIDAD
                            </span>
                            <div className="w-8 h-[2.5px] bg-amber-400 mx-auto mt-1 rounded-full" />
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-4" delay={150}>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
                                Dimensiones del Movimiento Juvenil Católico
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {pilaresMjc.map((item, idx) => {
                            const IconoItem = item.icono;
                            return (
                                <ScrollReveal key={idx} distance="translate-y-6" delay={idx * 120}>
                                    <div className={`bg-white rounded-3xl p-8 border ${item.colorBorder} hover:shadow-xl transition-all duration-300 space-y-6 h-full flex flex-col justify-between group`}>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between gap-4">
                                                <div className={`w-14 h-14 rounded-2xl ${item.colorBg} ${item.colorText} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                                    <IconoItem className="w-7 h-7" />
                                                </div>
                                                <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${item.colorBg} ${item.colorText} border ${item.colorBorder}/20`}>
                                                    {item.subtitulo}
                                                </span>
                                            </div>

                                            <div>
                                                <h3 className="text-2xl font-extrabold text-[#0B1F3A] font-sans group-hover:text-[#003C8F] transition-colors">{item.titulo}</h3>
                                            </div>

                                            <p className="text-sm text-slate-600 font-medium leading-relaxed font-sans">
                                                {item.descripcion}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-500">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                            <span>Formación semanal y vivencial</span>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* SECCIÓN 2: NIVELES DE PARTICIPACIÓN */}
            <section className="py-20 md:py-28 bg-[#FAFCFF] border-b border-slate-100 font-sans select-none">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
                    
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <ScrollReveal distance="translate-y-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
                                ETAPAS DE CRECIMIENTO
                            </span>
                            <div className="w-8 h-[2.5px] bg-amber-400 mx-auto mt-1 rounded-full" />
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-4" delay={150}>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A]">
                                Fases del Proceso MJC
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {niveles.map((fase, idx) => {
                            const IconoFase = fase.icono;
                            return (
                                <ScrollReveal key={idx} distance="translate-y-6" delay={idx * 120}>
                                    <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-[#800A15] hover:shadow-xl transition-all duration-300 space-y-5 h-full flex flex-col justify-between text-center group">
                                        <div className="space-y-4">
                                            <div className="w-16 h-16 rounded-full bg-rose-50 text-[#800A15] border border-rose-100 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                                <IconoFase className="w-8 h-8" />
                                            </div>

                                            <div>
                                                <span className="text-xs font-bold uppercase text-[#800A15] tracking-wider block">{fase.fase}</span>
                                                <h3 className="text-xl font-extrabold text-[#0B1F3A]">{fase.nombre}</h3>
                                                <span className="text-xs font-semibold text-slate-400 block pt-0.5">{fase.grados}</span>
                                            </div>

                                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                                {fase.desc}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-slate-100">
                                            <span className="text-xs font-bold text-[#003C8F]">Encuentros Semanales</span>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* SECCIÓN 3: CONTACTO E INSCRIPCIONES MJC */}
            <section id="contacto-mjc" className="py-20 md:py-28 bg-white font-sans select-none">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <ScrollReveal distance="translate-y-6">
                        <div className="bg-gradient-to-r from-[#001E50] via-[#800A15] to-[#003C8F] rounded-[36px] p-8 md:p-14 text-white shadow-2xl space-y-8 relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-72 h-full opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#FFFFFF 2px, transparent 2px)", backgroundSize: "18px 18px" }} />

                            <div className="space-y-3 relative z-10 text-center md:text-left">
                                <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block">ÚNETE AL MOVIMIENTO JUVENIL CATÓLICO</span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">¿Quieres ser parte de las experiencias MJC?</h2>
                                <p className="text-blue-100 text-sm sm:text-base font-medium max-w-xl">
                                    Acércate a la Coordinación de Pastoral o escríbenos para integrar los grupos asociativos, campamentos y voluntariados.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                <div className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold uppercase text-amber-300 block">Correo Electrónico Pastoral</span>
                                        <a href="mailto:pastoral@colsih.edu.co" className="text-sm font-extrabold hover:underline font-sans break-all">pastoral@colsih.edu.co</a>
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold uppercase text-amber-300 block">Atención Pastoral</span>
                                        <span className="text-sm font-extrabold font-sans">Coordinación de Pastoral COLSIH</span>
                                        <span className="block text-xs font-medium text-blue-100">(607) 637 1237</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </AppLayout>
    );
}
