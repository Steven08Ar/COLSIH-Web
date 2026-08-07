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
    AlertCircle, 
    Clock, 
    Building2, 
    ShieldCheck, 
    HelpCircle,
    Copy,
    Check,
    ChevronDown,
    ChevronRight,
    Users,
    BookmarkCheck,
    Heart,
    Trophy,
    BookOpen,
    Award,
    Briefcase,
    Search,
    ClipboardList,
    PieChart,
    Bus,
    MessageSquare,
    User,
    X,
    School,
    CheckCircle
} from 'lucide-react';
import { useState } from 'react';

const LINK_INSCRIPCIONES = "https://e.plataformaintegra.net/sihungria/index.php/cupo";
const CORREO_ADMISIONES = "admisionescolsihfloridablanca@gmail.com";

const cuposGrados = [
    { nivel: 'Preescolar', grados: ['Prejardín', 'Jardín', 'Transición'], bgBadge: 'bg-[#003C8F]', textBadge: 'text-white' },
    { nivel: 'Primaria', grados: ['Primero (1°)', 'Segundo (2°)', 'Tercero (3°)', 'Cuarto (4°)'], bgBadge: 'bg-[#800A15]', textBadge: 'text-white' },
    { nivel: 'Bachillerato', grados: ['Sexto (6°)', 'Séptimo (7°)', 'Octavo (8°)', 'Noveno (9°)'], bgBadge: 'bg-[#003C8F]', textBadge: 'text-white' }
];

const pasosProceso = [
    {
        paso: '1',
        titulo: 'Conoce el colegio',
        subtitulo: 'Explora nuestra propuesta educativa',
        descripcion: 'Explora nuestra propuesta educativa, valores y todo lo que nos hace diferentes en la comunidad salesiana.',
        icono: Search,
        badge: 'PASO 1 · INICIAL',
        detalles: [
            'Conoce nuestras instalaciones y modelo pedagógico salesiano.',
            'Identifica los cupos habilitados para el grado de tu interés.'
        ]
    },
    {
        paso: '2',
        titulo: 'Consulta requisitos',
        subtitulo: 'Documentos y papelería obligatoria',
        descripcion: 'Revisa los requisitos y documentos necesarios para el proceso según el nivel académico.',
        icono: ClipboardList,
        badge: 'HASTA EL 10 DE SEPTIEMBRE',
        detalles: [
            'Envía al correo admisionescolsihfloridablanca@gmail.com en PDF.',
            'Preescolar: Registro Civil de Nacimiento del aspirante.',
            'Primaria y Bachillerato: Observador del estudiante, documento de identidad y boletines de los 3 periodos 2026.'
        ],
        asuntoCorreo: 'Admisiones 2027, [Nombre y Apellidos del Hijo/a], [Grado que solicita]'
    },
    {
        paso: '3',
        titulo: 'Inscríbete',
        subtitulo: 'Formulario web y entrevista',
        descripcion: 'Diligencia el formulario en la plataforma y envía los documentos solicitados para la cita.',
        icono: FileText,
        badge: 'PRESENCIAL Y OBLIGATORIO',
        detalles: [
            'Diligencia el formulario oficial en línea (Costo: $70.000 COP en Banco Caja Social).',
            'Presenta la prueba académica presencial y asiste a la entrevista con papá, mamá y aspirante.'
        ]
    },
    {
        paso: '4',
        titulo: 'Bienvenido',
        subtitulo: 'Publicación de admitidos',
        descripcion: 'Te contactaremos para acompañarte en los siguientes pasos de la matrícula escolar 2027.',
        icono: Sparkles,
        badge: '1 DE OCTUBRE DE 2026',
        detalles: [
            'Publicación oficial de admitidos en colsih.edu.co/admisiones.',
            'Formalización de la matrícula y bienvenida a la familia COLSIH.'
        ]
    }
];

const cardsGuia = [
    {
        id: 'oferta',
        titulo: 'Oferta Académica',
        descripcion: 'Programas de calidad para cada etapa de crecimiento escolar.',
        icono: ClipboardList,
        colorBg: 'bg-blue-50/80 text-[#003C8F]'
    },
    {
        id: 'costos',
        titulo: 'Costos',
        descripcion: 'Conoce nuestras tarifas, formas de pago y descuentos disponibles.',
        icono: PieChart,
        colorBg: 'bg-rose-50/80 text-[#800A15]'
    },
    {
        id: 'becas',
        titulo: 'Becas',
        descripcion: 'Apoyamos el talento y el esfuerzo de nuestros estudiantes.',
        icono: Award,
        colorBg: 'bg-amber-50/80 text-amber-700'
    },
    {
        id: 'transporte',
        titulo: 'Transporte',
        descripcion: 'Rutas seguras y acompañamiento para tu tranquilidad.',
        icono: Bus,
        colorBg: 'bg-[#F0F4FA] text-[#003C8F]'
    },
    {
        id: 'faq',
        titulo: 'Preguntas frecuentes',
        descripcion: 'Resuelve tus dudas sobre el proceso de admisión 2027.',
        icono: MessageSquare,
        colorBg: 'bg-[#FDF2F4] text-[#800A15]'
    }
];

const statsData = [
    {
        valor: '25+',
        titulo: 'Años de experiencia',
        desc: 'Formando generaciones con excelencia académica y humana.',
        icono: User
    },
    {
        valor: '100%',
        titulo: 'Formación en valores',
        desc: 'Educación integral que trasciende las aulas escolares.',
        icono: Heart
    },
    {
        valor: '1200+',
        titulo: 'Estudiantes felices',
        desc: 'Una comunidad educativa que inspira y acompaña.',
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
        respuesta: 'El proceso consta de 4 pasos principales: 1) Conocer el colegio y cupos habilitados. 2) Consultar requisitos y enviar papelería a admisionescolsihfloridablanca@gmail.com. 3) Diligenciar formulario en la plataforma integra ($70.000 COP) y asistir a la prueba presencial con entrevista familiar. 4) Publicación de admitidos el 1 de octubre de 2026.'
    },
    {
        pregunta: '¿Qué documentos necesito para inscribirme?',
        respuesta: 'Para Preescolar (Jardín y Transición): Registro civil de nacimiento. Para Primaria y Bachillerato (1° a 9°): Fotocopia del observador del estudiante 2026, documento de identidad (Registro civil o Tarjeta de identidad) y boletines de calificaciones de los 3 periodos 2026 cursados a la fecha.'
    },
    {
        pregunta: '¿Hay descuentos por hermanos?',
        respuesta: 'Sí, la institución cuenta con beneficios e incentivos familiares por matriculación de hermanos, así como convenios especiales de Becas UPB del 90% para los mejores bachilleres y articulación SENA.'
    },
    {
        pregunta: '¿Cuáles son las formas de pago?',
        respuesta: 'El valor del formulario ($70.000 COP) se cancela únicamente en el Banco Caja Social a través del recibo enviado al correo tras el pre-registro en la plataforma oficial.'
    },
    {
        pregunta: '¿Cuándo inician las clases?',
        respuesta: 'El calendario académico 2027 inicia según las directrices oficiales del Ministerio de Educación y la Secretaría de Educación de Floridablanca en la última semana de enero o primera de febrero.'
    }
];

export default function Admisiones() {
    const [faqAbierta, setFaqAbierta] = useState(0);
    const [modalCard, setModalCard] = useState(null);
    const [asuntoCopiado, setAsuntoCopiado] = useState(false);
    const [correoCopiado, setCorreoCopiado] = useState(false);

    const copiarTexto = (texto, esAsunto = true) => {
        navigator.clipboard.writeText(texto);
        if (esAsunto) {
            setAsuntoCopiado(true);
            setTimeout(() => setAsuntoCopiado(false), 2500);
        } else {
            setCorreoCopiado(true);
            setTimeout(() => setCorreoCopiado(false), 2500);
        }
    };

    return (
        <AppLayout>
            <Head title="Admisiones e Inscripciones 2027 | Colegio Santa Isabel de Hungría" />

            {/* SECCIÓN 1: HERO (Limpio, blanco con acentos rojos y azules institucional) */}
            <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-[#FFFFFF] border-b border-slate-100 select-none overflow-hidden">
                {/* Patrón de Puntos de Fondo Fiel al Diseño */}
                <div 
                    className="absolute top-10 right-10 w-72 h-72 opacity-[0.08] pointer-events-none hidden lg:block"
                    style={{ backgroundImage: "radial-gradient(#003C8F 2px, transparent 2px)", backgroundSize: "20px 20px" }} 
                />
                <div 
                    className="absolute bottom-10 left-10 w-60 h-60 opacity-[0.06] pointer-events-none hidden lg:block"
                    style={{ backgroundImage: "radial-gradient(#800A15 2px, transparent 2px)", backgroundSize: "20px 20px" }} 
                />

                {/* Forma decorativa superior izquierda en azul institucional */}
                <div className="absolute top-0 left-0 w-32 h-32 md:w-44 md:h-44 bg-[#003C8F] rounded-br-[100px] opacity-95 pointer-events-none -translate-x-6 -translate-y-6" />

                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        
                        {/* Columna Izquierda: Textos y Botones */}
                        <div className="lg:col-span-6 space-y-8 text-left">
                            <ScrollReveal distance="translate-y-4">
                                <div className="space-y-4">
                                    <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-[#0B1F3A] leading-[1.1] tracking-tight font-sans">
                                        Comienza aquí <br />
                                        el <span className="text-[#800A15] relative inline-block">
                                            futuro
                                            <span className="absolute left-0 bottom-1 w-full h-[4px] bg-[#800A15]/30 rounded-full" />
                                        </span> de <br className="hidden sm:block" />
                                        tu hijo.
                                    </h1>
                                    <p className="text-base sm:text-lg text-slate-600 font-medium max-w-lg leading-relaxed font-sans pt-2">
                                        En el Colegio Santa Isabel formamos personas íntegras, felices y comprometidas con transformar su entorno.
                                    </p>
                                </div>
                            </ScrollReveal>

                            {/* Botones estilo Píldora como la imagen de referencia */}
                            <ScrollReveal distance="translate-y-4" delay={150}>
                                <div className="flex flex-wrap items-center gap-4 pt-2">
                                    <a
                                        href={LINK_INSCRIPCIONES}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#800A15] hover:bg-[#9E0D1C] text-white text-sm font-extrabold shadow-lg shadow-[#800A15]/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                                    >
                                        <span>Ir a inscripciones</span>
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </a>

                                    <a
                                        href="#proceso"
                                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0B1F3A] text-sm font-bold border-2 border-slate-200 shadow-xs hover:border-[#003C8F] transition-all duration-300"
                                    >
                                        <span>Conocer el proceso</span>
                                        <ChevronDown className="w-4 h-4 text-slate-500" />
                                    </a>
                                </div>
                            </ScrollReveal>

                            {/* Badges de Grados Disponibles */}
                            <ScrollReveal distance="translate-y-4" delay={300}>
                                <div className="pt-4 border-t border-slate-100 space-y-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block font-sans">
                                        Cupos exclusivos 2027:
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {['Prejardín', 'Jardín', 'Transición', 'Primero (1°)', 'Sexto (6°)'].map((grado) => (
                                            <span 
                                                key={grado}
                                                className="px-3.5 py-1.5 rounded-lg bg-[#F0F4FA] text-[#003C8F] font-extrabold text-xs border border-blue-100"
                                            >
                                                {grado}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                        </div>

                        {/* Columna Derecha: Ilustración Compuesta 3D de Tarjetas Educativas */}
                        <div className="lg:col-span-6 relative flex justify-center items-center py-6">
                            
                            {/* Círculo de Fondo Neumórfico Suave */}
                            <div className="w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full bg-gradient-to-tr from-blue-50 via-slate-50 to-rose-50 border border-slate-100 absolute -z-10 animate-pulse opacity-80" />

                            {/* Elementos Isométricos y Tarjetas Flotantes */}
                            <div className="relative w-full max-w-[480px] h-[400px] sm:h-[460px] flex items-center justify-center">
                                
                                {/* 1. Tarjeta Diploma */}
                                <div className="absolute top-4 left-6 sm:left-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce [animation-duration:5s]">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs font-black text-slate-800 uppercase">Diploma Oficial</span>
                                </div>

                                {/* 2. Tarjeta Colegio Grande Azul */}
                                <div className="absolute top-2 right-4 bg-[#001E50] text-white p-6 rounded-3xl shadow-2xl border border-white/10 flex flex-col items-center justify-center w-36 sm:w-44 text-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <School className="w-12 h-12 text-blue-200 mb-2" />
                                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-100">Colegio Salesiano</span>
                                </div>

                                {/* 3. Tarjeta Calendario */}
                                <div className="absolute top-28 left-2 sm:left-6 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 w-44">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                                        <span className="text-[10px] font-black text-slate-400 uppercase">Calendario 2027</span>
                                        <Calendar className="w-3.5 h-3.5 text-[#800A15]" />
                                    </div>
                                    <div className="grid grid-cols-4 gap-1 text-center text-[10px] font-bold text-slate-600">
                                        <span className="bg-slate-100 rounded py-0.5">M</span>
                                        <span className="bg-slate-100 rounded py-0.5">T</span>
                                        <span className="bg-slate-100 rounded py-0.5">W</span>
                                        <span className="bg-blue-600 text-white rounded py-0.5">F</span>
                                    </div>
                                </div>

                                {/* 4. Libros Estacados */}
                                <div className="absolute bottom-24 right-6 bg-[#800A15] text-white p-5 rounded-2xl shadow-2xl flex items-center gap-3 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                                    <BookOpen className="w-8 h-8 text-amber-300" />
                                    <div className="text-left">
                                        <span className="text-xs font-black block">Excelencia</span>
                                        <span className="text-[10px] font-medium text-rose-200">Académica SENA</span>
                                    </div>
                                </div>

                                {/* 5. Birrete de Graduación Central */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#003C8F] text-white p-6 rounded-3xl shadow-2xl border-2 border-white/20 flex flex-col items-center justify-center w-40 h-40 transform hover:scale-105 transition-transform duration-300 z-20">
                                    <GraduationCap className="w-16 h-16 text-amber-300 mb-1" />
                                    <span className="text-xs font-black uppercase tracking-wider text-white">Formación Integral</span>
                                </div>

                                {/* 6. Badge de Permiso Autorizado */}
                                <div className="absolute bottom-6 left-12 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
                                        <CheckCircle className="w-5 h-5 text-slate-950" />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[10px] font-black text-slate-400 uppercase block">Inscripciones</span>
                                        <span className="text-xs font-bold text-slate-800">Proceso Habilitado</span>
                                    </div>
                                </div>

                                {/* Círculos decorativos flotantes */}
                                <div className="absolute top-8 left-1/2 w-4 h-4 rounded-full bg-amber-400" />
                                <div className="absolute bottom-16 right-2 w-3 h-3 rounded-full bg-[#800A15]" />
                                <div className="absolute top-36 right-0 w-2.5 h-2.5 rounded-full bg-[#003C8F]" />
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* SECCIÓN 2: ASÍ ES NUESTRO PROCESO (4 Pasos con Stepper Horizontal) */}
            <section id="proceso" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-slate-100 select-none">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
                    
                    {/* Encabezado de Sección */}
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <ScrollReveal distance="translate-y-4">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block font-sans">
                                ASÍ ES NUESTRO PROCESO
                            </span>
                            <div className="w-10 h-[3px] bg-amber-400 mx-auto mt-1 rounded-full" />
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-4" delay={150}>
                            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-[#0B1F3A] tracking-tight font-sans">
                                Admisiones en 4 pasos
                            </h2>
                        </ScrollReveal>
                    </div>

                    {/* Stepper Horizontal de 4 Pasos Conectados */}
                    <div className="relative">
                        {/* Línea Curva Conectora en Pantallas Grandes */}
                        <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-slate-200 z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                            {pasosProceso.map((paso, idx) => {
                                const IconoPaso = paso.icono;
                                return (
                                    <ScrollReveal key={idx} distance="translate-y-6" delay={idx * 120}>
                                        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 hover:border-[#003C8F] hover:shadow-xl transition-all duration-300 text-center space-y-4 group h-full flex flex-col justify-between">
                                            
                                            <div className="space-y-4">
                                                {/* Círculo con Número e Ícono */}
                                                <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                                                    {/* Badge con el Número */}
                                                    <span className={`absolute -top-1 -left-1 w-7 h-7 rounded-full ${idx % 2 === 0 ? 'bg-[#003C8F]' : 'bg-[#800A15]'} text-white text-xs font-black flex items-center justify-center shadow-md z-10`}>
                                                        {paso.paso}
                                                    </span>

                                                    {/* Círculo Principal del Ícono */}
                                                    <div className="w-16 h-16 rounded-full bg-slate-50 border-2 border-slate-200 group-hover:border-[#003C8F] group-hover:bg-[#F0F4FA] text-[#003C8F] group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-xs">
                                                        <IconoPaso className="w-7 h-7" />
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-extrabold text-[#0B1F3A] font-sans group-hover:text-[#003C8F] transition-colors">
                                                    {paso.titulo}
                                                </h3>

                                                <p className="text-sm text-slate-500 font-medium leading-relaxed font-sans">
                                                    {paso.descripcion}
                                                </p>
                                            </div>

                                            {/* Badge de Requisito/Fecha */}
                                            <div className="pt-4 border-t border-slate-100">
                                                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#800A15] bg-rose-50 px-3 py-1 rounded-full border border-rose-100 inline-block">
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

            {/* SECCIÓN 3: TODO LO QUE NECESITAS SABER (Información que te guía) */}
            <section className="py-20 md:py-28 bg-[#FAFCFF] border-b border-slate-100 select-none">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">
                    
                    {/* Encabezado */}
                    <div className="text-left space-y-2">
                        <ScrollReveal distance="translate-y-4">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block font-sans">
                                Todo lo que necesitas saber
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-4" delay={150}>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] font-sans">
                                Información que te guía
                            </h2>
                        </ScrollReveal>
                    </div>

                    {/* Grid de Tarjetas Informativas + Tarjeta Calendario Horizontal */}
                    <div className="space-y-6">
                        
                        {/* 5 Tarjetas Superiores */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cardsGuia.map((card, idx) => {
                                const IconoCard = card.icono;
                                return (
                                    <ScrollReveal key={card.id} distance="translate-y-6" delay={idx * 100}>
                                        <div 
                                            onClick={() => setModalCard(card.id)}
                                            className="bg-white rounded-3xl p-7 border border-slate-200/80 hover:border-[#003C8F] hover:shadow-lg transition-all duration-300 text-left space-y-4 cursor-pointer group flex flex-col justify-between h-full"
                                        >
                                            <div className="space-y-3">
                                                <div className={`w-12 h-12 rounded-2xl ${card.colorBg} flex items-center justify-center shrink-0`}>
                                                    <IconoCard className="w-6 h-6" />
                                                </div>
                                                <h3 className="text-lg font-extrabold text-[#0B1F3A] font-sans group-hover:text-[#003C8F] transition-colors">
                                                    {card.titulo}
                                                </h3>
                                                <p className="text-sm font-medium text-slate-500 leading-relaxed font-sans">
                                                    {card.descripcion}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-1 text-xs font-bold text-[#003C8F] pt-2 group-hover:translate-x-1 transition-transform">
                                                <span>Ver más</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                );
                            })}
                        </div>

                        {/* Tarjeta Ancha Inferior: Calendario de Admisiones */}
                        <ScrollReveal distance="translate-y-6" delay={500}>
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:border-[#003C8F] hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                
                                <div className="flex items-start gap-4 text-left">
                                    <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#800A15] border border-rose-100 flex items-center justify-center shrink-0">
                                        <Calendar className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-extrabold text-[#0B1F3A] font-sans">
                                            Calendario de admisiones
                                        </h3>
                                        <p className="text-sm font-medium text-slate-500 font-sans">
                                            Fechas importantes para que no te pierdas ningún paso del proceso.
                                        </p>
                                    </div>
                                </div>

                                {/* Banner Rosado Destacado con Fecha */}
                                <div className="w-full md:w-auto bg-[#FDF2F4] border border-rose-200/60 rounded-2xl p-4 flex items-center justify-between md:justify-start gap-6 shrink-0">
                                    <div className="text-left">
                                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#800A15] block font-sans">
                                            Próxima fecha importante
                                        </span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-black text-[#800A15] font-sans">15</span>
                                            <span className="text-xs font-bold uppercase text-[#800A15]">JUN</span>
                                        </div>
                                    </div>
                                    <div className="h-10 w-[1px] bg-rose-200 hidden sm:block" />
                                    <span className="text-xs font-bold text-slate-700 text-left max-w-[160px] font-sans">
                                        Cierre de inscripciones primer periodo.
                                    </span>
                                </div>

                            </div>
                        </ScrollReveal>

                    </div>

                </div>
            </section>

            {/* SECCIÓN 4: ¿POR QUÉ ELEGIRNOS? (Líderes para el mañana - Stats Grid) */}
            <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-slate-100 select-none">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
                    
                    {/* Encabezado de Sección */}
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <ScrollReveal distance="translate-y-4">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block font-sans">
                                ¿POR QUÉ ELEGIRNOS?
                            </span>
                            <div className="w-10 h-[3px] bg-amber-400 mx-auto mt-1 rounded-full" />
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-4" delay={150}>
                            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-[#0B1F3A] tracking-tight font-sans">
                                Formamos hoy <span className="text-[#800A15]">líderes</span> <br className="hidden sm:block" />
                                para el mañana.
                            </h2>
                        </ScrollReveal>
                    </div>

                    {/* Grid de 4 Estadísticas / Pilares */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {statsData.map((stat, idx) => {
                            const IconoStat = stat.icono;
                            return (
                                <ScrollReveal key={idx} distance="translate-y-6" delay={idx * 100}>
                                    <div className="bg-[#FAFCFF] rounded-3xl p-8 border border-slate-200/80 hover:border-[#003C8F] hover:bg-white hover:shadow-xl transition-all duration-300 text-left space-y-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#003C8F] flex items-center justify-center shrink-0 group-hover:bg-[#003C8F] group-hover:text-white transition-colors duration-300">
                                            <IconoStat className="w-6 h-6" />
                                        </div>

                                        <div className="space-y-1">
                                            <span className="text-4xl font-extrabold text-[#0B1F3A] font-sans block group-hover:text-[#003C8F] transition-colors">
                                                {stat.valor}
                                            </span>
                                            <h3 className="text-base font-extrabold text-slate-800 font-sans">
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

            {/* SECCIÓN 5: PREGUNTAS FRECUENTES (Acordeón limpio) */}
            <section className="py-20 md:py-28 bg-[#FAFCFF] border-b border-slate-100 select-none">
                <div className="max-w-[1000px] mx-auto px-6 md:px-12 space-y-12">
                    
                    {/* Encabezado */}
                    <div className="text-left space-y-2 relative pl-6 border-l-4 border-[#003C8F]">
                        <ScrollReveal distance="translate-y-4">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block font-sans">
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
                                            estaAbierto ? 'border-[#003C8F] shadow-md ring-2 ring-blue-500/10' : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <button
                                            onClick={() => setFaqAbierta(estaAbierto ? null : idx)}
                                            className="w-full p-6 text-left font-extrabold text-base sm:text-lg text-[#0B1F3A] flex items-center justify-between gap-4 cursor-pointer font-sans"
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
            <section className="py-16 md:py-24 bg-[#FFFFFF] select-none">
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
                                    className="group inline-flex items-center justify-between sm:justify-center gap-4 w-full sm:w-auto px-8 py-4.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
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

            {/* MODAL / DRAWER INFORMATIVO PARA TARJETAS GUÍA */}
            {modalCard && (
                <div className="fixed inset-0 z-[99999] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                        <button 
                            onClick={() => setModalCard(null)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="space-y-3 text-left">
                            <span className="text-xs font-black uppercase tracking-wider text-[#800A15] block">
                                INFORMACIÓN DETALLADA
                            </span>
                            <h3 className="text-2xl font-extrabold text-[#0B1F3A] capitalize">
                                {cardsGuia.find(c => c.id === modalCard)?.titulo}
                            </h3>
                            <p className="text-sm font-medium text-slate-600 leading-relaxed">
                                {cardsGuia.find(c => c.id === modalCard)?.descripcion}
                            </p>
                        </div>

                        {/* Contenido Modal Dinámico */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs font-semibold text-slate-700">
                            {modalCard === 'oferta' && (
                                <p>Ofrecemos niveles educativos desde Preescolar (Prejardín, Jardín, Transición), Básica Primaria (1° a 5°) y Bachillerato Técnico SENA (6° a 11°) con formación integral en valores cristianos salesianos.</p>
                            )}
                            {modalCard === 'costos' && (
                                <p>El costo del formulario de inscripción es de $70.000 COP (no reembolsable), pagaderos únicamente en el Banco Caja Social. Las tarifas de matrícula y pensión 2027 se socializarán tras la admisión.</p>
                            )}
                            {modalCard === 'becas' && (
                                <p>Los mejores bachilleres graduados de nuestra institución acceden a Becas del 90% en la Universidad Pontificia Bolivariana (UPB) según convenio interinstitucional vigente.</p>
                            )}
                            {modalCard === 'transporte' && (
                                <p>Contamos con servicio de rutas escolares seguras contratadas con empresas de transporte escolar autorizadas para Floridablanca y Bucaramanga.</p>
                            )}
                            {modalCard === 'faq' && (
                                <p>Puedes enviar tus inquietudes adicionales al correo oficial: <strong className="text-[#003C8F]">admisionescolsihfloridablanca@gmail.com</strong></p>
                            )}
                        </div>

                        <div className="pt-2">
                            <button
                                onClick={() => setModalCard(null)}
                                className="w-full py-3 rounded-xl bg-[#003C8F] text-white font-extrabold text-sm hover:bg-[#002E6E] transition-colors"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </AppLayout>
    );
}
