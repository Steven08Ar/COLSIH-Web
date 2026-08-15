import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';
import { 
    Heart, 
    BookOpen, 
    Sparkles, 
    Users, 
    Award, 
    Calendar, 
    CheckCircle2, 
    Sun, 
    Mail, 
    Phone, 
    FileText, 
    Smile,
    ShieldCheck
} from 'lucide-react';

export default function Catequesis() {
    const sacramentos = [
        {
            titulo: "Primera Comunión",
            subtitulo: "Encuentro con la Eucaristía",
            descripcion: "Proceso de preparación espiritual dirigido a los estudiantes de educación primaria. A través de la oración, el estudio del Evangelio y dinámicas comunitarias, los niños viven el gozo de recibir por primera vez a Jesús en el Sacramento de la Eucaristía.",
            destacado: "Grados 4° y 5° de Primaria",
            icono: Sun,
            colorBorder: "border-[#003C8F]",
            colorBg: "bg-blue-50/70",
            colorText: "text-[#003C8F]"
        },
        {
            titulo: "Confirmación",
            subtitulo: "Fortaleza en el Espíritu Santo",
            descripcion: "Experiencia profunda de fe y compromiso cristiano para los jóvenes de secundaria y media. Con el apoyo de catequistas y el equipo pastoral, se reafirma la fe bautismal mediante retiros, talleres vocacionales y servicio a la comunidad.",
            destacado: "Grados 9°, 10° y 11°",
            icono: Sparkles,
            colorBorder: "border-[#800A15]",
            colorBg: "bg-rose-50/70",
            colorText: "text-[#800A15]"
        },
        {
            titulo: "Catequesis de Padres y Padrinos",
            subtitulo: "Iglesia Doméstica",
            descripcion: "Jornadas de reflexión y formación espiritual para los padres de familia y padrinos. Fortalecemos el rol de los progenitores como primeros educadores en la fe y acompañantes amorosos del crecimiento espiritual de sus hijos.",
            destacado: "Encuentros Mensuales",
            icono: Users,
            colorBorder: "border-amber-500",
            colorBg: "bg-amber-50/70",
            colorText: "text-amber-700"
        },
        {
            titulo: "Misas y Tiempos Litúrgicos",
            subtitulo: "Celebración de la Fe",
            descripcion: "Eucaristías comunitarias los primeros viernes de cada mes, celebraciones patronales de Santa Isabel de Hungría y San Juan Bosco, así como vivencias especiales en Adviento, Cuaresma y Pascua.",
            destacado: "Toda la Comunidad Educativa",
            icono: Heart,
            colorBorder: "border-emerald-600",
            colorBg: "bg-emerald-50/70",
            colorText: "text-emerald-800"
        }
    ];

    const pilares = [
        {
            numero: "01",
            titulo: "Oración y Vida Espiritual",
            desc: "Fomentamos la oración diaria, la escucha de la Palabra de Dios y la devoción mariana en un ambiente alegre y cercano.",
            icono: BookOpen
        },
        {
            numero: "02",
            titulo: "Comunidad y Fraternidad",
            desc: "Promovemos el trabajo en equipo, la solidaridad entre compañeros y la vivencia de valores cristianos como el respeto y la caridad.",
            icono: Users
        },
        {
            numero: "03",
            titulo: "Compromiso Social",
            desc: "La fe se expresa en obras: impulsamos campañas de apoyo a los más necesitados y voluntariados en la comunidad de Floridablanca.",
            icono: ShieldCheck
        },
        {
            numero: "04",
            titulo: "Acompañamiento Familiar",
            desc: "Involucramos a las familias en cada etapa del proceso catequético para consolidar hogares llenos de amor y esperanza.",
            icono: Heart
        }
    ];

    const pasosInscripcion = [
        { paso: "1", titulo: "Convocatoria", desc: "Apertura de inscripciones a principio del año lectivo a través de la Coordinación Pastoral." },
        { paso: "2", titulo: "Documentación", desc: "Entrega de la Partida de Bautismo y Registro Civil del estudiante." },
        { paso: "3", titulo: "Encuentros", desc: "Asistencia regular a las sesiones semanales de catequesis escolar y convivencias." },
        { paso: "4", titulo: "Celebración", desc: "Misa solemne de recepción del Sacramento en compañía de la comunidad educativa." }
    ];

    return (
        <AppLayout>
            <Head title="Catequesis y Vida Sacramental | Colegio Santa Isabel de Hungría" />

            {/* SECCIÓN HERO: CATEQUESIS */}
            <section className="relative min-h-[520px] flex items-center pt-36 pb-20 bg-[#08111F] text-left select-none overflow-hidden border-b border-white/10 font-sans">
                {/* Elementos decorativos de fondo */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(0,60,143,0.25)_0%,transparent_55%)] pointer-events-none" />
                <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#800A15]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
                        <ScrollReveal distance="translate-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#800A15] to-[#003C8F] text-white text-xs font-black tracking-widest uppercase shadow-md">
                                <Sun className="w-4 h-4 text-amber-300" />
                                PASTORAL INSTITUCIONAL · FORMACIÓN EN LA FE
                            </div>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-4" delay={150}>
                            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-white leading-[1.08] tracking-tight">
                                Catequesis y <br className="hidden sm:block" />
                                <span className="text-amber-400">Vida Sacramental</span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-4" delay={300}>
                            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
                                En el Colegio Santa Isabel de Hungría acompañamos a nuestros estudiantes y sus familias en los momentos más significativos del encuentro con Dios, fortaleciendo la fe, la esperanza y el amor fraterno.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-4" delay={400}>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                                <a
                                    href="#sacramentos"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg hover:scale-105 transition-all duration-300"
                                >
                                    Conocer Sacramentos
                                </a>
                                <a
                                    href="#contacto-pastoral"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-sm transition-all duration-300"
                                >
                                    Contactar Pastoral
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="lg:col-span-4 flex justify-center">
                        <ScrollReveal distance="scale-90" delay={450}>
                            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-gradient-to-tr from-[#003C8F]/40 to-[#800A15]/40 p-1 border border-white/20 shadow-2xl flex items-center justify-center">
                                <div className="w-full h-full rounded-[22px] bg-[#08111F]/90 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center shadow-inner">
                                        <Sun className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">COLSIH PASTORAL</span>
                                        <h3 className="text-lg font-extrabold text-white">Formación Integral</h3>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </section>

            {/* SECCIÓN 1: SACRAMENTOS Y PROGRAMAS */}
            <section id="sacramentos" className="py-20 md:py-28 bg-white border-b border-slate-100 font-sans select-none">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
                    
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <ScrollReveal distance="translate-y-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
                                NUESROS PROGRAMAS SACRAMENTALES
                            </span>
                            <div className="w-8 h-[2.5px] bg-amber-400 mx-auto mt-1 rounded-full" />
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-4" delay={150}>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
                                Vivencia de los Sacramentos en COLSIH
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {sacramentos.map((item, idx) => {
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
                                                    {item.destacado}
                                                </span>
                                            </div>

                                            <div>
                                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">{item.subtitulo}</span>
                                                <h3 className="text-2xl font-extrabold text-[#0B1F3A] font-sans group-hover:text-[#003C8F] transition-colors">{item.titulo}</h3>
                                            </div>

                                            <p className="text-sm text-slate-600 font-medium leading-relaxed font-sans">
                                                {item.descripcion}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-500">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                            <span>Acompañamiento pastoral continuo</span>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* SECCIÓN 2: PILARES CATEQUÉTICOS */}
            <section className="py-20 md:py-28 bg-[#FAFCFF] border-b border-slate-100 font-sans select-none">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
                    
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <ScrollReveal distance="translate-y-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
                                PRINCIPIOS PASTORALES
                            </span>
                            <div className="w-8 h-[2.5px] bg-amber-400 mx-auto mt-1 rounded-full" />
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-4" delay={150}>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A]">
                                Pilares de Nuestra Formación Cristiana
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {pilares.map((pilar, idx) => {
                            const IconoPilar = pilar.icono;
                            return (
                                <ScrollReveal key={idx} distance="translate-y-6" delay={idx * 100}>
                                    <div className="bg-white rounded-3xl p-7 border border-slate-200/80 hover:border-[#003C8F] hover:shadow-lg transition-all duration-300 space-y-4 h-full flex flex-col justify-between group">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-3xl font-black text-slate-300 font-sans group-hover:text-[#003C8F] transition-colors">{pilar.numero}</span>
                                                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#003C8F] flex items-center justify-center shrink-0">
                                                    <IconoPilar className="w-6 h-6" />
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-[#0B1F3A] font-sans">{pilar.titulo}</h3>
                                            <p className="text-xs text-slate-500 font-medium leading-relaxed font-sans">{pilar.desc}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* SECCIÓN 3: PROCESO DE INSCRIPCIÓN A CATEQUESIS */}
            <section className="py-20 md:py-28 bg-white border-b border-slate-100 font-sans select-none">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
                    
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <ScrollReveal distance="translate-y-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
                                ¿CÓMO PARTICIPAR?
                            </span>
                            <div className="w-8 h-[2.5px] bg-amber-400 mx-auto mt-1 rounded-full" />
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-4" delay={150}>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A]">
                                Pasos para la Inscripción a Catequesis
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pasosInscripcion.map((item, idx) => (
                            <ScrollReveal key={idx} distance="translate-y-6" delay={idx * 100}>
                                <div className="bg-[#FAFCFF] rounded-3xl p-6 border border-slate-100 text-center space-y-3 h-full flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <div className="w-10 h-10 rounded-full bg-[#003C8F] text-white font-bold text-sm flex items-center justify-center mx-auto shadow-md">
                                            {item.paso}
                                        </div>
                                        <h3 className="text-lg font-bold text-[#0B1F3A]">{item.titulo}</h3>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                </div>
            </section>

            {/* SECCIÓN 4: CONTACTO DE PASTORAL */}
            <section id="contacto-pastoral" className="py-20 md:py-28 bg-[#FAFCFF] font-sans select-none">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <ScrollReveal distance="translate-y-6">
                        <div className="bg-gradient-to-r from-[#001E50] via-[#003C8F] to-[#800A15] rounded-[36px] p-8 md:p-14 text-white shadow-2xl space-y-8 relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-72 h-full opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#FFFFFF 2px, transparent 2px)", backgroundSize: "18px 18px" }} />

                            <div className="space-y-3 relative z-10 text-center md:text-left">
                                <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block">COORDINACIÓN DE PASTORAL</span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">¿Tienes inquietudes sobre la Catequesis?</h2>
                                <p className="text-blue-100 text-sm sm:text-base font-medium max-w-xl">
                                    Estamos disponibles para brindarte toda la información sobre fechas, documentos y preparación sacramental.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                <div className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold uppercase text-amber-300 block">Correo Institucional Pastoral</span>
                                        <a href="mailto:pastoral@colsih.edu.co" className="text-sm font-extrabold hover:underline font-sans break-all">pastoral@colsih.edu.co</a>
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold uppercase text-amber-300 block">Coordinación de Pastoral</span>
                                        <span className="text-sm font-extrabold font-sans">Erika Tatiana Delgadillo Avella</span>
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
