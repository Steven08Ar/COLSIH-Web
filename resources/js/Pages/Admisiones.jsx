import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from './HomeSections/ScrollReveal';
import { 
    Sparkles, 
    ArrowRight, 
    ExternalLink, 
    FileText, 
    Calendar, 
    CheckCircle2, 
    CreditCard, 
    Mail, 
    UserCheck, 
    GraduationCap, 
    Clock, 
    Building2, 
    ShieldCheck, 
    Copy, 
    Check, 
    ChevronDown, 
    Users, 
    Heart, 
    BookOpen, 
    Award, 
    Briefcase, 
    Search, 
    ClipboardList, 
    PieChart, 
    Bus, 
    MessageSquare, 
    User, 
    School, 
    CheckCircle
} from 'lucide-react';
import { useState } from 'react';

const LINK_INSCRIPCIONES = "https://e.plataformaintegra.net/sihungria/index.php/cupo";
const CORREO_ADMISIONES = "admisionescolsihfloridablanca@gmail.com";

const cuposGrados = [
    { nivel: 'Preescolar', grados: ['Prejardín', 'Jardín', 'Transición'] },
    { nivel: 'Primaria', grados: ['Primero (1°)', 'Segundo (2°)', 'Tercero (3°)', 'Cuarto (4°)'] },
    { nivel: 'Bachillerato', grados: ['Sexto (6°)', 'Séptimo (7°)', 'Octavo (8°)', 'Noveno (9°)'] }
];

const pasosProceso = [
    {
        paso: '1',
        titulo: 'Conoce el colegio',
        descripcion: 'Explora nuestra propuesta educativa, valores y todo lo que nos hace diferentes.',
        icono: Search,
        badge: 'PASO 1 · INICIAL'
    },
    {
        paso: '2',
        titulo: 'Consulta requisitos',
        descripcion: 'Revisa los requisitos y documentos necesarios para el proceso.',
        icono: ClipboardList,
        badge: 'DOCUMENTACIÓN Y PAPELERÍA'
    },
    {
        paso: '3',
        titulo: 'Inscríbete',
        descripcion: 'Diligencia el formulario y envía los documentos solicitados.',
        icono: FileText,
        badge: 'PRUEBA Y ENTREVISTA'
    },
    {
        paso: '4',
        titulo: 'Bienvenido',
        descripcion: 'Te contactaremos para acompañarte en los siguientes pasos.',
        icono: Sparkles,
        badge: 'MATRÍCULA 2027'
    }
];

const statsData = [
    {
        valor: '25+',
        titulo: 'Años de experiencia',
        desc: 'Formando generaciones con excelencia.',
        icono: User
    },
    {
        valor: '100%',
        titulo: 'Formación en valores',
        desc: 'Educación integral que trasciende aulas.',
        icono: Heart
    },
    {
        valor: '1200+',
        titulo: 'Estudiantes felices',
        desc: 'Una comunidad que inspira y acompaña.',
        icono: Users
    },
    {
        valor: '80+',
        titulo: 'Docentes expertos',
        desc: 'Profesionales comprometidos con cada estudiante.',
        icono: GraduationCap
    }
];

const faqsData = [
    {
        pregunta: '¿Cuál es el proceso de admisión?',
        respuesta: 'El proceso consta de 4 pasos sencillos: 1) Conocer el colegio y cupos habilitados. 2) Consultar requisitos y enviar la papelería en PDF al correo admisionescolsihfloridablanca@gmail.com. 3) Diligenciar el formulario en la plataforma integra ($70.000 COP en Banco Caja Social) y asistir a la prueba presencial con entrevista familiar. 4) Publicación de admitidos y formalización de matrícula.'
    },
    {
        pregunta: '¿Qué documentos necesito para inscribirme?',
        respuesta: 'Para Preescolar (Jardín y Transición): Fotocopia del Registro civil de nacimiento. Para Primaria y Bachillerato (1° a 9°): Fotocopia del observador del estudiante 2026, documento de identidad (Registro civil o Tarjeta de identidad) y boletines de calificaciones del año en curso.'
    },
    {
        pregunta: '¿Hay descuentos por hermanos o convenios?',
        respuesta: 'Sí, la institución cuenta con convenios de Becas UPB del 90% de matrícula universitaria para los mejores bachilleres y articulación SENA para doble titulación técnica.'
    },
    {
        pregunta: '¿Cuáles son las formas de pago?',
        respuesta: 'El valor de la inscripción ($70.000 COP) se cancela únicamente en el Banco Caja Social mediante el recibo impreso o digital generado en la plataforma oficial.'
    },
    {
        pregunta: '¿Cuándo inician las clases?',
        respuesta: 'El calendario académico 2027 iniciará oficialmente según los lineamientos del Ministerio de Educación Nacional y la Secretaría de Educación de Floridablanca.'
    }
];

export default function Admisiones() {
    const [faqAbierta, setFaqAbierta] = useState(0);
    const [correoCopiado, setCorreoCopiado] = useState(false);

    const copiarCorreo = () => {
        navigator.clipboard.writeText(CORREO_ADMISIONES);
        setCorreoCopiado(true);
        setTimeout(() => setCorreoCopiado(false), 2500);
    };

    return (
        <AppLayout>
            <Head title="Admisiones e Inscripciones 2027 | Colegio Santa Isabel de Hungría" />

            {/* SECCIÓN 1: HERO MINIMALISTA PLANO */}
            <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-[#FFFFFF] border-b border-slate-100 select-none overflow-hidden font-sans">
                {/* Micro Patrón de Puntos Limpios de Fondo */}
                <div 
                    className="absolute top-10 right-10 w-72 h-72 opacity-[0.06] pointer-events-none hidden lg:block"
                    style={{ backgroundImage: "radial-gradient(#003C8F 2px, transparent 2px)", backgroundSize: "20px 20px" }} 
                />
                <div 
                    className="absolute bottom-10 left-10 w-60 h-60 opacity-[0.05] pointer-events-none hidden lg:block"
                    style={{ backgroundImage: "radial-gradient(#800A15 2px, transparent 2px)", backgroundSize: "20px 20px" }} 
                />

                {/* Forma plana decorativa superior en azul institucional */}
                <div className="absolute top-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-[#003C8F] rounded-br-[100px] opacity-90 pointer-events-none -translate-x-6 -translate-y-6" />

                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
                        
                        {/* Columna Izquierda: Tipografía y Botones Planos (Centrados en móvil, a la izquierda en desktop) */}
                        <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
                            <ScrollReveal distance="translate-y-4">
                                <div className="space-y-4">
                                    <h1 className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-extrabold text-[#0B1F3A] leading-[1.08] tracking-tight font-sans text-center lg:text-left">
                                        Comienza aquí <br />
                                        el <span className="text-[#800A15]">futuro</span> de <br className="hidden sm:block" />
                                        tu hijo.
                                    </h1>
                                    <p className="text-base sm:text-lg text-slate-500 font-medium max-w-lg leading-relaxed font-sans pt-1 text-center lg:text-left mx-auto lg:mx-0">
                                        En el Colegio Santa Isabel formamos personas íntegras, felices y comprometidas con transformar su entorno.
                                    </p>
                                </div>
                            </ScrollReveal>

                            {/* Botones estilo Píldora Planos */}
                            <ScrollReveal distance="translate-y-4" delay={150}>
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                                    <a
                                        href={LINK_INSCRIPCIONES}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#800A15] hover:bg-[#9E0D1C] text-white text-sm font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer w-full sm:w-auto"
                                    >
                                        <span>Ir a inscripciones</span>
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </a>

                                    <a
                                        href="#proceso"
                                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0B1F3A] text-sm font-bold border border-slate-200 shadow-xs hover:border-[#003C8F] transition-all duration-300 w-full sm:w-auto"
                                    >
                                        <span>Conocer el proceso</span>
                                        <ChevronDown className="w-4 h-4 text-slate-400" />
                                    </a>
                                </div>
                            </ScrollReveal>

                            {/* Badges de Grados Disponibles */}
                            <ScrollReveal distance="translate-y-4" delay={300}>
                                <div className="pt-4 border-t border-slate-100 space-y-2 text-center lg:text-left">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block font-sans">
                                        Cupos exclusivos 2027:
                                    </span>
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                                        {['Prejardín', 'Jardín', 'Transición', 'Primero (1°)', 'Sexto (6°)'].map((grado) => (
                                            <span 
                                                key={grado}
                                                className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-[#003C8F] font-bold text-xs"
                                            >
                                                {grado}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                        </div>

                        {/* Columna Derecha: Imagen destacada de gran tamaño de admisiones */}
                        <div className="lg:col-span-7 relative flex justify-center items-center py-2 select-none">
                            
                            {/* Resplandor decorativo ambiental ampliado */}
                            <div className="w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-tr from-blue-100/40 via-slate-50 to-rose-100/40 blur-3xl absolute -z-10" />

                            {/* Imagen Admisiones.png en tamano grande */}
                            <img 
                                src="/admisiones/Imagen%20Admisiones.png" 
                                alt="Estudiantes COLSIH - Admisiones 2027" 
                                className="w-full max-w-[650px] sm:max-w-[720px] lg:max-w-[780px] xl:max-w-[850px] h-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                            />

                        </div>

                    </div>
                </div>
            </section>

            {/* SECCIÓN 2: ASÍ ES NUESTRO PROCESO (4 Pasos con Stepper Minimalista) */}
            <section id="proceso" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-slate-100 select-none font-sans">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
                    
                    {/* Encabezado de Sección */}
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <ScrollReveal distance="translate-y-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block font-sans">
                                ASÍ ES NUESTRO PROCESO
                            </span>
                            <div className="w-8 h-[2.5px] bg-amber-400 mx-auto mt-1 rounded-full" />
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-4" delay={150}>
                            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-[#0B1F3A] tracking-tight font-sans">
                                Admisiones en 4 pasos
                            </h2>
                        </ScrollReveal>
                    </div>

                    {/* Stepper Horizontal de 4 Pasos Conectados */}
                    <div className="relative">
                        <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-slate-200 z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                            {pasosProceso.map((paso, idx) => {
                                const IconoPaso = paso.icono;
                                return (
                                    <ScrollReveal key={idx} distance="translate-y-6" delay={idx * 100}>
                                        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 hover:border-[#003C8F] hover:shadow-xl transition-all duration-300 text-center space-y-4 group h-full flex flex-col justify-between">
                                            
                                            <div className="space-y-4">
                                                <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                                                    <span className={`absolute -top-1 -left-1 w-7 h-7 rounded-full ${idx % 2 === 0 ? 'bg-[#003C8F]' : 'bg-[#800A15]'} text-white text-xs font-bold flex items-center justify-center shadow-sm z-10`}>
                                                        {paso.paso}
                                                    </span>

                                                    <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 group-hover:border-[#003C8F] text-[#003C8F] transition-all duration-300 flex items-center justify-center">
                                                        <IconoPaso className="w-7 h-7" />
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-bold text-[#0B1F3A] font-sans group-hover:text-[#003C8F] transition-colors">
                                                    {paso.titulo}
                                                </h3>

                                                <p className="text-sm text-slate-500 font-medium leading-relaxed font-sans">
                                                    {paso.descripcion}
                                                </p>
                                            </div>

                                            <div className="pt-4 border-t border-slate-100">
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#800A15] bg-rose-50 px-3 py-1 rounded-full border border-rose-100 inline-block">
                                                    {paso.badge}
                                                </span>
                                            </div>

                                        </div>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </section>

            {/* SECCIÓN 3: INFORMACIÓN QUE TE GUÍA (INFORMACIÓN 100% DIRECTA Y VISIBLE EN CADA TARJETA) */}
            <section className="py-20 md:py-28 bg-[#FAFCFF] border-b border-slate-100 select-none font-sans">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">
                    
                    {/* Encabezado Plano */}
                    <div className="text-left space-y-1">
                        <ScrollReveal distance="translate-y-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block font-sans">
                                Todo lo que necesitas saber
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-4" delay={150}>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] font-sans">
                                Información que te guía
                            </h2>
                        </ScrollReveal>
                    </div>

                    {/* Grid de Tarjetas Planas con Toda la Información Directamente Visible (0 Ventanas Emergentes) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        
                        {/* TARJETA 1: Oferta Académica */}
                        <ScrollReveal distance="translate-y-6">
                            <div className="bg-white rounded-3xl p-7 md:p-8 border border-slate-200/80 hover:border-[#003C8F] hover:shadow-lg transition-all duration-300 space-y-5 h-full flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#003C8F] flex items-center justify-center shrink-0">
                                            <ClipboardList className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#0B1F3A] font-sans">
                                            Oferta Académica
                                        </h3>
                                    </div>

                                    <p className="text-sm font-medium text-slate-500 leading-relaxed font-sans">
                                        Programas de calidad para cada etapa de crecimiento:
                                    </p>

                                    <ul className="space-y-2.5 pt-1 text-xs font-semibold text-slate-700 font-sans">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <span><strong>Preescolar:</strong> Prejardín, Jardín y Transición.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <span><strong>Primaria:</strong> Grados 1° a 5° (Jornada Única).</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <span><strong>Bachillerato:</strong> Grados 6° a 11° + Titulación SENA.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-3 border-t border-slate-100">
                                    <span className="text-xs font-bold text-[#003C8F]">
                                        Formación bilingüe e integral
                                    </span>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* TARJETA 2: Costos */}
                        <ScrollReveal distance="translate-y-6" delay={100}>
                            <div className="bg-white rounded-3xl p-7 md:p-8 border border-slate-200/80 hover:border-[#800A15] hover:shadow-lg transition-all duration-300 space-y-5 h-full flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#800A15] flex items-center justify-center shrink-0">
                                            <PieChart className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#0B1F3A] font-sans">
                                            Costos y Pago
                                        </h3>
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-0.5">
                                        <span className="text-[10px] font-bold uppercase text-[#800A15] block">Formulario de Inscripción:</span>
                                        <span className="text-xl font-extrabold text-[#800A15] font-sans block">$70.000 COP</span>
                                    </div>

                                    <ul className="space-y-2 text-xs font-semibold text-slate-700 font-sans">
                                        <li className="flex items-start gap-2">
                                            <Building2 className="w-4 h-4 text-[#003C8F] shrink-0 mt-0.5" />
                                            <span><strong>Pago:</strong> Banco Caja Social (único canal autorizado).</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <span>Tarifas aprobadas oficialmente.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-3 border-t border-slate-100">
                                    <span className="text-xs font-bold text-[#800A15]">
                                        Valor único no reembolsable
                                    </span>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* TARJETA 3: Becas */}
                        <ScrollReveal distance="translate-y-6" delay={200}>
                            <div className="bg-white rounded-3xl p-7 md:p-8 border border-slate-200/80 hover:border-amber-500 hover:shadow-lg transition-all duration-300 space-y-5 h-full flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#0B1F3A] font-sans">
                                            Becas y Convenios
                                        </h3>
                                    </div>

                                    <p className="text-sm font-medium text-slate-500 leading-relaxed font-sans">
                                        Apoyamos el talento y futuro de nuestros estudiantes:
                                    </p>

                                    <ul className="space-y-2.5 pt-1 text-xs font-semibold text-slate-700 font-sans">
                                        <li className="flex items-start gap-2">
                                            <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                            <span><strong>Becas UPB del 90%:</strong> Para mejores bachilleres.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Briefcase className="w-4 h-4 text-[#003C8F] shrink-0 mt-0.5" />
                                            <span><strong>Doble Titulación SENA:</strong> Técnico en Contabilización.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-3 border-t border-slate-100">
                                    <span className="text-xs font-bold text-amber-700">
                                        Convenios universitarios vigentes
                                    </span>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* TARJETA 4: Transporte */}
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <div className="bg-white rounded-3xl p-7 md:p-8 border border-slate-200/80 hover:border-[#003C8F] hover:shadow-lg transition-all duration-300 space-y-5 h-full flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#003C8F] flex items-center justify-center shrink-0">
                                            <Bus className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#0B1F3A] font-sans">
                                            Transporte Escolar
                                        </h3>
                                    </div>

                                    <p className="text-sm font-medium text-slate-500 leading-relaxed font-sans">
                                        Rutas seguras y acompañamiento para tu tranquilidad:
                                    </p>

                                    <ul className="space-y-2.5 pt-1 text-xs font-semibold text-slate-700 font-sans">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <span>Cobertura en Floridablanca y Bucaramanga.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <span>Monitores de acompañamiento autorizados.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-3 border-t border-slate-100">
                                    <span className="text-xs font-bold text-[#003C8F]">
                                        Seguridad en cada desplazamiento
                                    </span>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* TARJETA 5: Atención y Correo Oficial (Con Botón de Copiar Directo) */}
                        <ScrollReveal distance="translate-y-6" delay={400} className="md:col-span-2 lg:col-span-2">
                            <div className="bg-white rounded-3xl p-7 md:p-8 border border-slate-200/80 hover:border-[#800A15] hover:shadow-lg transition-all duration-300 space-y-5 h-full flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#800A15] flex items-center justify-center shrink-0">
                                                <Mail className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold uppercase text-[#800A15] tracking-wider block">CANAL ÚNICO DE ADMISIONES</span>
                                                <h3 className="text-xl font-bold text-[#0B1F3A] font-sans">Recepción de Documentos y Consultas</h3>
                                            </div>
                                        </div>

                                        <button
                                            onClick={copiarCorreo}
                                            className="px-4 py-2 rounded-xl bg-[#800A15] hover:bg-[#9E0D1C] text-white font-bold text-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer self-start sm:self-auto"
                                        >
                                            {correoCopiado ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                                            <span>{correoCopiado ? '¡Correo Copiado!' : 'Copiar Correo'}</span>
                                        </button>
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                                        <span className="text-xs font-bold text-slate-800 font-sans break-all">{CORREO_ADMISIONES}</span>
                                    </div>

                                    <p className="text-xs font-medium text-slate-500 leading-relaxed font-sans">
                                        Envía aquí todos tus documentos escaneados en PDF e inquietudes. Atención presencial y virtual de Lunes a Viernes (7:00 a.m. – 2:00 p.m.).
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                                    <span>Atención Oficial COLSIH</span>
                                    <span className="text-[#003C8F]">Floridablanca, Santander</span>
                                </div>
                            </div>
                        </ScrollReveal>

                    </div>

                    {/* Tarjeta Ancha Inferior: Calendario y Etapas (Sin fechas específicas) */}
                    <ScrollReveal distance="translate-y-6" delay={500}>
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:border-[#003C8F] hover:shadow-lg transition-all duration-300 space-y-6">
                            
                            <div className="flex items-center gap-4 text-left border-b border-slate-100 pb-4">
                                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#800A15] border border-rose-100 flex items-center justify-center shrink-0">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="text-xl font-bold text-[#0B1F3A] font-sans">
                                        Calendario de Admisiones
                                    </h3>
                                    <p className="text-xs font-medium text-slate-500 font-sans">
                                        Etapas continuas para la asignación de cupos escolares 2027.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                                    <span className="text-xs font-bold text-[#003C8F] uppercase block font-sans">1. Solicitud Web</span>
                                    <p className="text-xs font-medium text-slate-600">Formulario inicial en la plataforma oficial.</p>
                                </div>

                                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-1">
                                    <span className="text-xs font-bold text-[#800A15] uppercase block font-sans">2. Documentos</span>
                                    <p className="text-xs font-medium text-slate-600">Recepción de papelería en PDF al correo.</p>
                                </div>

                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                                    <span className="text-xs font-bold text-[#003C8F] uppercase block font-sans">3. Entrevista</span>
                                    <p className="text-xs font-medium text-slate-600">Prueba presencial y entrevista familiar.</p>
                                </div>

                                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                                    <span className="text-xs font-bold text-emerald-900 uppercase block font-sans">4. Admitidos</span>
                                    <p className="text-xs font-medium text-emerald-950">Notificación oficial y matrícula.</p>
                                </div>
                            </div>

                        </div>
                    </ScrollReveal>

                </div>
            </section>

            {/* SECCIÓN 4: ¿POR QUÉ ELEGIRNOS? (Líderes para el mañana - Stats Minimalistas) */}
            <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-slate-100 select-none font-sans">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
                    
                    {/* Encabezado de Sección */}
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <ScrollReveal distance="translate-y-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block font-sans">
                                ¿POR QUÉ ELEGIRNOS?
                            </span>
                            <div className="w-8 h-[2.5px] bg-amber-400 mx-auto mt-1 rounded-full" />
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-4" delay={150}>
                            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-[#0B1F3A] tracking-tight font-sans">
                                Formamos hoy <span className="text-[#800A15]">líderes</span> <br className="hidden sm:block" />
                                para el mañana.
                            </h2>
                        </ScrollReveal>
                    </div>

                    {/* Grid de 4 Estadísticas Minimalistas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {statsData.map((stat, idx) => {
                            const IconoStat = stat.icono;
                            return (
                                <ScrollReveal key={idx} distance="translate-y-6" delay={idx * 100}>
                                    <div className="bg-[#FAFCFF] rounded-3xl p-8 border border-slate-100 hover:border-[#003C8F] hover:bg-white hover:shadow-xl transition-all duration-300 text-left space-y-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#003C8F] flex items-center justify-center shrink-0 group-hover:bg-[#003C8F] group-hover:text-white transition-colors duration-300">
                                            <IconoStat className="w-6 h-6" />
                                        </div>

                                        <div className="space-y-1">
                                            <span className="text-4xl font-extrabold text-[#0B1F3A] font-sans block group-hover:text-[#003C8F] transition-colors">
                                                {stat.valor}
                                            </span>
                                            <h3 className="text-base font-bold text-slate-800 font-sans">
                                                {stat.titulo}
                                            </h3>
                                            <p className="text-xs font-medium text-slate-500 leading-relaxed font-sans pt-1">
                                                {stat.desc}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* SECCIÓN 5: PREGUNTAS FRECUENTES (Acordeón Plano) */}
            <section className="py-20 md:py-28 bg-[#FAFCFF] border-b border-slate-100 select-none font-sans">
                <div className="max-w-[1000px] mx-auto px-6 md:px-12 space-y-12">
                    
                    {/* Encabezado */}
                    <div className="text-left space-y-2 relative pl-6 border-l-4 border-[#003C8F]">
                        <ScrollReveal distance="translate-y-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block font-sans">
                                PREGUNTAS FRECUENTES
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-4" delay={150}>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] font-sans">
                                Resolvemos tus dudas
                            </h2>
                        </ScrollReveal>
                    </div>

                    {/* Acordeón de FAQs */}
                    <div className="space-y-4 text-left">
                        {faqsData.map((faq, idx) => {
                            const estaAbierto = faqAbierta === idx;
                            return (
                                <ScrollReveal key={idx} distance="translate-y-4" delay={idx * 80}>
                                    <div 
                                        className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                                            estaAbierto ? 'border-[#003C8F] shadow-sm' : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <button
                                            onClick={() => setFaqAbierta(estaAbierto ? null : idx)}
                                            className="w-full p-6 text-left font-bold text-base sm:text-lg text-[#0B1F3A] flex items-center justify-between gap-4 cursor-pointer font-sans"
                                        >
                                            <span>{faq.pregunta}</span>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${estaAbierto ? 'rotate-180 bg-[#003C8F] text-white' : 'bg-slate-100 text-slate-600'}`}>
                                                <ChevronDown className="w-4 h-4" />
                                            </div>
                                        </button>

                                        {estaAbierto && (
                                            <div className="px-6 pb-6 pt-1 text-sm font-medium text-slate-600 leading-relaxed border-t border-slate-100 font-sans">
                                                {faq.respuesta}
                                            </div>
                                        )}
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* SECCIÓN 6: BANNER FINAL CTA DE ADMISIÓN (Gradient Card Institucional) */}
            <section className="py-16 md:py-24 bg-[#FFFFFF] select-none font-sans">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
                    <ScrollReveal distance="translate-y-6">
                        <div className="relative rounded-[36px] bg-gradient-to-r from-[#001E50] via-[#003C8F] to-[#800A15] p-10 md:p-16 text-white overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
                            
                            {/* Decoración de Puntos */}
                            <div 
                                className="absolute right-0 top-0 w-64 h-full opacity-10 pointer-events-none"
                                style={{ backgroundImage: "radial-gradient(#FFFFFF 2px, transparent 2px)", backgroundSize: "18px 18px" }} 
                            />

                            {/* Contenido Izquierda */}
                            <div className="space-y-3 text-left max-w-2xl relative z-10">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight font-sans">
                                    El primer paso hacia <br />
                                    un futuro extraordinario
                                </h2>
                                <p className="text-blue-100 text-base sm:text-lg font-medium font-sans">
                                    Estamos listos para acompañarte en esta decisión tan importante.
                                </p>
                            </div>

                            {/* Botón Derecha en Amarillo Institucional */}
                            <div className="shrink-0 relative z-10 w-full lg:w-auto">
                                <a
                                    href={LINK_INSCRIPCIONES}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center justify-between sm:justify-center gap-4 w-full sm:w-auto px-8 py-4.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                                >
                                    <span>Comenzar inscripción</span>
                                    <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </a>
                            </div>

                        </div>
                    </ScrollReveal>
                </div>
            </section>

        </AppLayout>
    );
}
