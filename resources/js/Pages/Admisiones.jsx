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
    ChevronRight,
    Users,
    BookmarkCheck,
    Heart,
    Trophy,
    BookOpen,
    Award,
    Briefcase
} from 'lucide-react';
import { useState } from 'react';

const LINK_INSCRIPCIONES = "https://e.plataformaintegra.net/sihungria/index.php/cupo";
const CORREO_ADMISIONES = "admisionescolsihfloridablanca@gmail.com";

const cuposGrados = [
    { nivel: 'Preescolar', grados: ['Jardín', 'Transición'], bgBadge: 'bg-[#003C8F]', textBadge: 'text-white' },
    { nivel: 'Primaria', grados: ['1°', '2°', '3°', '4°'], bgBadge: 'bg-[#800A15]', textBadge: 'text-white' },
    { nivel: 'Bachillerato', grados: ['6°', '7°', '8°', '9°'], bgBadge: 'bg-[#0B1F3A]', textBadge: 'text-white' }
];

const beneficiosInstitucionales = [
    {
        titulo: 'Formación Espiritual y en Valores',
        descripcion: 'Acompañamiento pastoral salesiano, desarrollo humano integral, vivencia activa de la fe y educación en valores cristianos basados en el Sistema Preventivo de San Juan Bosco.',
        icono: Heart,
        badge: 'Identidad Salesiana',
        badgeBg: 'bg-[#800A15]',
        badgeText: 'text-white'
    },
    {
        titulo: 'Actividades Extraescolares',
        descripcion: 'Escuelas deportivas (fútbol, voleibol, atletismo), expresiones artísticas, música, coro, robótica educativa y pertenencia activa al Movimiento Juvenil Salesiano (MJS).',
        icono: Trophy,
        badge: 'Deporte & Cultura',
        badgeBg: 'bg-[#003C8F]',
        badgeText: 'text-white'
    },
    {
        titulo: 'Inglés desde Jardín',
        descripcion: 'Aprendizaje del idioma inglés desde los primeros niveles de formación inicial mediante metodologías lúdicas, interactivas y continuas durante toda la etapa escolar.',
        icono: BookOpen,
        badge: 'Bilingüismo Inicial',
        badgeBg: 'bg-[#0B1F3A]',
        badgeText: 'text-white'
    },
    {
        titulo: 'Becas UPB del 90%',
        descripcion: 'Los mejores bachilleres de nuestra institución acceden a becas del 90% de matrícula para estudios superiores en la Universidad Pontificia Bolivariana.',
        icono: Award,
        badge: 'Convenio Universitario',
        badgeBg: 'bg-emerald-700',
        badgeText: 'text-white'
    },
    {
        titulo: 'Técnico en Contabilización SENA',
        descripcion: 'Articulación directa con el SENA para egresar con doble titulación oficial como Bachiller Técnico en Contabilización de Operaciones Comerciales y Financieras.',
        icono: Briefcase,
        badge: 'Doble Titulación SENA',
        badgeBg: 'bg-amber-500',
        badgeText: 'text-slate-950'
    }
];

const pasosProceso = [
    {
        paso: '01',
        titulo: 'Diligenciar Formulario de Inscripción',
        subtitulo: 'Registro inicial en la plataforma web',
        icono: FileText,
        badge: 'PASO 1 · EN LÍNEA',
        colorBadge: 'bg-[#003C8F] text-white',
        detalles: [
            'Ingresa a la plataforma oficial de cupos e inicia el formulario de tu hijo(a).',
            'Diligencia los datos completos del aspirante y los acudientes.'
        ],
        asuntoCorreo: 'Admisiones 2027, [Nombre y Apellidos del Hijo/a], [Grado que solicita]'
    },
    {
        paso: '02',
        titulo: 'Envío de Documentación Obligatoria',
        subtitulo: 'Requisito previo e indispensable a la entrevista',
        icono: ShieldCheck,
        badge: 'HASTA EL 10 DE SEPTIEMBRE',
        colorBadge: 'bg-[#800A15] text-white',
        detalles: [
            'Envía al correo oficial admisionescolsihfloridablanca@gmail.com todos los documentos requeridos escaneados en PDF o imagen nítida.',
            'La entrega oportuna habilita la cita con la psicóloga.'
        ],
        documentosPorNivel: [
            {
                nivel: 'PREESCOLAR (Jardín y Transición)',
                requisitos: [
                    'Registro Civil de Nacimiento del aspirante.'
                ]
            },
            {
                nivel: 'PRIMARIA Y BACHILLERATO (1° a 9°)',
                requisitos: [
                    'Fotocopia del observador del estudiante o constancia de comportamiento del año 2026.',
                    'Registro Civil y/o Tarjeta de Identidad (mayores de 7 años).',
                    'Boletines de calificaciones de los 3 periodos académicos del año 2026 cursados a la fecha.'
                ]
            }
        ]
    },
    {
        paso: '03',
        titulo: 'Prueba Académica y Entrevista Presencial',
        subtitulo: 'Evaluación presencial en la sede principal',
        icono: UserCheck,
        badge: 'PRESENCIAL Y OBLIGATORIO',
        colorBadge: 'bg-[#003C8F] text-white',
        detalles: [
            'Tanto la prueba académica como la entrevista se realizarán de manera presencial.',
            'En la entrevista es de asistencia obligatoria: Papá, Mamá y el aspirante.',
            'Tanto la prueba, la entrevista y los documentos serán evaluados por el Comité de Admisiones para la decisión final.'
        ]
    },
    {
        paso: '04',
        titulo: 'Publicación de Lista de Admitidos',
        subtitulo: 'Resultados finales en el portal oficial',
        icono: GraduationCap,
        badge: '1 DE OCTUBRE DE 2026',
        colorBadge: 'bg-emerald-600 text-white',
        detalles: [
            'La lista de estudiantes admitidos será publicada el 1 de octubre de 2026 en colsih.edu.co/admisiones',
            'Válido para las familias que completaron oportunamente el formulario, pago, documentos, prueba y entrevista.'
        ]
    }
];

const notasClave = [
    {
        titulo: 'Costo del Formulario',
        valor: '$70.000 COP',
        desc: 'El valor de la inscripción es de setenta mil pesos m/cte. Este valor no es reembolsable.',
        icono: CreditCard,
        destacado: true
    },
    {
        titulo: 'Pago Autorizado',
        valor: 'BANCO CAJA SOCIAL',
        desc: 'Único banco autorizado para el pago del recibo enviado el 26 de agosto al correo.',
        icono: Building2,
        destacado: false
    },
    {
        titulo: 'Condición de Selección',
        valor: 'Sujeto a Evaluación',
        desc: 'El diligenciamiento y pago no aseguran el cupo; está sujeto a la prueba y entrevista.',
        icono: AlertCircle,
        destacado: false
    },
    {
        titulo: 'Canal Oficial',
        valor: 'Correo Electrónico',
        desc: 'admisionescolsihfloridablanca@gmail.com para el envío de comprobantes y papelería.',
        icono: Mail,
        destacado: false
    }
];

const horariosJornadas = [
    { nivel: 'Preescolar', grados: 'Jardín y Transición', horario: '7:00 a.m. – 12:30 p.m.', badge: 'Jornada Mañana' },
    { nivel: 'Básica Primaria', grados: '1° a 5° Grado', horario: '6:30 a.m. – 1:00 p.m.', badge: 'Jornada Única' },
    { nivel: 'Bachillerato', grados: '6° a 11° Grado', horario: '6:30 a.m. – 2:00 p.m.', badge: 'Jornada Única' }
];

export default function Admisiones() {
    const [pasoActivo, setPasoActivo] = useState(0);
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
            <Head title="Inscripciones y Admisiones 2027 | COLSIH" />

            {/* 1. HERO LUMINOSO Y CLARO CON TIPOGRAFÍA GIGANTE */}
            <section className="relative pt-36 pb-24 md:pt-48 md:pb-36 bg-[#FAFCFF] border-b border-slate-200 select-none overflow-hidden">
                {/* Micro patrones limpios */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#003C8F 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
                
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        
                        {/* Badge Gigante y Claro */}
                        <ScrollReveal distance="translate-y-6">
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#800A15] text-white text-xs sm:text-sm md:text-base font-black tracking-widest uppercase shadow-lg shadow-[#800A15]/20">
                                <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
                                <span>PROCESO DE INSCRIPCIÓN · ESTUDIANTES NUEVOS 2027</span>
                            </div>
                        </ScrollReveal>

                        {/* Título Gigante Claro */}
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-[#0B1F3A] leading-[0.95] tracking-tight font-sans">
                                Proceso de Admisiones <br className="hidden sm:block" />
                                <span className="text-[#003C8F]">
                                    Año Escolar 2027
                                </span>
                            </h1>
                        </ScrollReveal>

                        {/* Subtítulo Grande */}
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-xl sm:text-2xl font-semibold text-slate-600 leading-relaxed font-sans max-w-3xl mx-auto">
                                Te damos la bienvenida al Colegio Santa Isabel de Hungría. Revisa los grados disponibles, sigue la guía paso a paso e inicia la solicitud de cupo en la plataforma oficial.
                            </p>
                        </ScrollReveal>

                        {/* BOTÓN GIGANTE LLAMATIVO SIN DEGRADADOS */}
                        <ScrollReveal distance="translate-y-6" delay={450}>
                            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
                                <a
                                    href={LINK_INSCRIPCIONES}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center justify-center gap-4 px-10 py-5 rounded-2xl bg-[#003C8F] hover:bg-[#002e6e] text-white font-black text-lg md:text-xl shadow-xl shadow-[#003C8F]/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border-2 border-[#003C8F] cursor-pointer"
                                >
                                    <FileText className="w-6 h-6 text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
                                    <span>ENTRAR A INSCRIPCIONES (SOLICITAR CUPO)</span>
                                    <ExternalLink className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                                </a>

                                <a
                                    href="#guia-pasos"
                                    className="inline-flex items-center gap-2 px-8 py-5 rounded-2xl bg-white hover:bg-slate-100 text-[#0B1F3A] font-extrabold text-base md:text-lg border-2 border-slate-300 shadow-md hover:scale-[1.02] transition-all duration-300"
                                >
                                    <span>Ver Instrucciones</span>
                                    <ArrowRight className="w-5 h-5 text-[#003C8F]" />
                                </a>
                            </div>
                        </ScrollReveal>

                    </div>
                </div>
            </section>

            {/* 2. BARRA DESTACADA DE CUPOS DISPONIBLES (CLARA Y MODERNA) */}
            <section className="py-16 bg-white border-b border-slate-200 select-none">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="bg-[#F0F4FA] border-2 border-[#003C8F]/20 rounded-3xl p-8 md:p-10 shadow-sm space-y-6">
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-slate-200/80 pb-6">
                            <div className="space-y-1 text-left">
                                <span className="text-xs font-black uppercase tracking-widest text-[#800A15] block font-sans">
                                    DISPONIBILIDAD CONFIRMADA DE CUPOS
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-[#0B1F3A] font-sans">
                                    Cupos Disponibles para el Año 2027:
                                </h2>
                            </div>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#003C8F] text-white font-black text-sm tracking-wider uppercase self-start md:self-auto">
                                <BookmarkCheck className="w-5 h-5 text-amber-300" />
                                <span>Inscripciones Habilitadas</span>
                            </div>
                        </div>

                        {/* Grid de Grados por Nivel */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            {cuposGrados.map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl border-2 border-slate-200 space-y-3 hover:border-[#003C8F] transition-colors shadow-xs">
                                    <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-sans block">
                                        {item.nivel}:
                                    </span>
                                    <div className="flex flex-wrap gap-2.5">
                                        {item.grados.map((grado, gIdx) => (
                                            <span key={gIdx} className={`px-4 py-2 rounded-xl ${item.bgBadge} ${item.textBadge} font-black text-sm shadow-sm`}>
                                                Grado {grado}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Banner del Costo */}
                        <div className="p-5 rounded-2xl bg-white border-2 border-[#800A15]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3 text-left">
                                <div className="w-12 h-12 rounded-2xl bg-[#800A15] text-white flex items-center justify-center shrink-0 font-black">
                                    $
                                </div>
                                <div>
                                    <span className="text-xs font-black uppercase text-[#800A15] tracking-wider block font-sans">COSTO DEL FORMULARIO</span>
                                    <p className="text-lg font-black text-[#0B1F3A] font-sans">
                                        SETENTA MIL PESOS ($70.000 COP) · <span className="text-slate-500 font-semibold text-sm">Valor no reembolsable</span>
                                    </p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                                Pago en Banco Caja Social
                            </span>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. BENEFICIOS INSTITUCIONALES (POR QUÉ ELEGIR COLSIH - TEMA CLARO CON TIPOGRAFÍA GIGANTE) */}
            <section className="py-20 md:py-32 bg-[#F8FAFC] border-b border-slate-200 select-none">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-16">
                    
                    <div className="text-center max-w-4xl mx-auto space-y-4">
                        <ScrollReveal distance="translate-y-6">
                            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#800A15] text-white font-black text-xs md:text-sm tracking-widest uppercase shadow-md">
                                <Award className="w-4 h-4 text-amber-300" />
                                BENEFICIOS INSTITUCIONALES
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#0B1F3A] leading-[1.05] tracking-tight font-sans">
                                ¿Por qué elegir COLSIH?
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-slate-600 font-semibold text-lg md:text-xl max-w-3xl mx-auto font-sans">
                                Una propuesta educativa integral que combina la excelencia académica, la formación en valores cristianos salesianos y valiosas oportunidades para el futuro de tus hijos.
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* Grid de 5 Beneficios Institucionales Grandes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        {beneficiosInstitucionales.map((ben, bIdx) => {
                            const IconoBen = ben.icono;
                            return (
                                <ScrollReveal key={bIdx} distance="translate-y-8" delay={bIdx * 100}>
                                    <div className="bg-white rounded-3xl p-8 border-2 border-slate-200/80 hover:border-[#003C8F] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 space-y-5 h-full flex flex-col justify-between group">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="w-14 h-14 rounded-2xl bg-[#003C8F] text-white group-hover:bg-[#800A15] transition-colors duration-300 flex items-center justify-center shrink-0 shadow-md">
                                                    <IconoBen className="w-7 h-7" />
                                                </div>
                                                <span className={`px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider ${ben.badgeBg} ${ben.badgeText}`}>
                                                    {ben.badge}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-black text-[#0B1F3A] font-sans group-hover:text-[#003C8F] transition-colors">
                                                {ben.titulo}
                                            </h3>

                                            <p className="text-base font-semibold text-slate-600 leading-relaxed font-sans">
                                                {ben.descripcion}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#003C8F]">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                            <span>Componente Clave COLSIH</span>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* 4. GUÍA PASO A PASO INTERACTIVA (MÁS GRANDE, DINÁMICA Y DETALLADA) */}
            <section id="guia-pasos" className="py-20 md:py-36 bg-[#FAFCFF] border-b border-slate-200 select-none">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-16">
                    
                    <div className="text-center max-w-4xl mx-auto space-y-4">
                        <ScrollReveal distance="translate-y-6">
                            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#003C8F] text-white font-black text-xs md:text-sm tracking-widest uppercase shadow-md">
                                <Calendar className="w-4 h-4 text-amber-300" />
                                PASOS PARA SEGUIR
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#0B1F3A] leading-[1.05] tracking-tight font-sans">
                                Instrucciones y Cronograma 2027
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-slate-600 font-semibold text-lg md:text-xl max-w-2xl mx-auto">
                                Haz clic en las etapas o desplázate para conocer en detalle las fechas, documentos obligatorios y requisitos presenciales.
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* Selector Dinámico de Pasos */}
                    <div className="flex justify-center gap-3 overflow-x-auto pb-4 no-scrollbar">
                        {pasosProceso.map((p, idx) => (
                            <button
                                key={idx}
                                onClick={() => setPasoActivo(idx)}
                                className={`px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base transition-all duration-300 flex items-center gap-3 whitespace-nowrap cursor-pointer border-2 ${
                                    pasoActivo === idx
                                        ? 'bg-[#003C8F] text-white border-[#003C8F] shadow-lg scale-105'
                                        : 'bg-white text-slate-700 border-slate-300 hover:border-[#003C8F]'
                                }`}
                            >
                                <span className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center ${pasoActivo === idx ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-800'}`}>
                                    {p.paso}
                                </span>
                                <span>Etapa {p.paso}</span>
                            </button>
                        ))}
                    </div>

                    {/* Contenido Completo de Todos los Pasos */}
                    <div className="space-y-10">
                        {pasosProceso.map((paso, idx) => {
                            const IconoPaso = paso.icono;
                            const esSeleccionado = pasoActivo === idx;
                            return (
                                <ScrollReveal key={idx} distance="translate-y-8">
                                    <div 
                                        onClick={() => setPasoActivo(idx)}
                                        className={`bg-white rounded-3xl p-8 sm:p-12 border-2 transition-all duration-300 text-left cursor-pointer ${
                                            esSeleccionado
                                                ? 'border-[#003C8F] shadow-2xl ring-4 ring-[#003C8F]/10 scale-[1.01]'
                                                : 'border-slate-200 hover:border-slate-300 shadow-md'
                                        }`}
                                    >
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                            
                                            {/* Columna Izquierda: Título y Datos */}
                                            <div className="lg:col-span-5 space-y-5 lg:border-r-2 lg:border-slate-100 lg:pr-8">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-5xl font-black text-[#003C8F] font-sans">
                                                        Paso {paso.paso}
                                                    </span>
                                                    <span className={`px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider ${paso.colorBadge}`}>
                                                        {paso.badge}
                                                    </span>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="w-14 h-14 rounded-2xl bg-[#003C8F] text-white flex items-center justify-center shrink-0 shadow-md">
                                                        <IconoPaso className="w-7 h-7" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] leading-snug font-sans">
                                                            {paso.titulo}
                                                        </h3>
                                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">
                                                            {paso.subtitulo}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Asunto de correo interactivo */}
                                                {paso.asuntoCorreo && (
                                                    <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2">
                                                        <span className="text-xs font-black uppercase tracking-wider text-amber-900 block font-sans">
                                                            ASUNTO DEL CORREO (OBLIGATORIO):
                                                        </span>
                                                        <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-amber-300">
                                                            <code className="text-xs sm:text-sm font-extrabold text-slate-900 break-all">
                                                                {paso.asuntoCorreo}
                                                            </code>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); copiarTexto(paso.asuntoCorreo, true); }}
                                                                className="ml-3 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                                                                title="Copiar asunto al portapapeles"
                                                            >
                                                                {asuntoCopiado ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
                                                                <span>{asuntoCopiado ? '¡Copiado!' : 'Copiar'}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Columna Derecha: Requisitos y Fechas */}
                                            <div className="lg:col-span-7 space-y-6">
                                                <div className="space-y-3">
                                                    <h4 className="text-xs font-black uppercase tracking-widest text-[#800A15] block font-sans">
                                                        DETALLES DE ESTA ETAPA:
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {paso.detalles.map((det, dIdx) => (
                                                            <li key={dIdx} className="flex items-start gap-3 text-base sm:text-lg font-semibold text-slate-800 leading-relaxed font-sans">
                                                                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                                                                <span>{det}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>



                                                {/* Documentos por Nivel (Paso 2) */}
                                                {paso.documentosPorNivel && (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                                        {paso.documentosPorNivel.map((doc, docIdx) => (
                                                            <div key={docIdx} className="p-5 rounded-2xl bg-[#F0F4FA] border-2 border-[#003C8F]/30 space-y-3">
                                                                <span className="text-xs font-black uppercase tracking-wider text-[#003C8F] block font-sans border-b border-blue-200 pb-2">
                                                                    {doc.nivel}
                                                                </span>
                                                                <ul className="space-y-2">
                                                                    {doc.requisitos.map((req, rIdx) => (
                                                                        <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-slate-800 leading-relaxed font-sans">
                                                                            <span className="w-2 h-2 rounded-full bg-[#003C8F] mt-1.5 shrink-0" />
                                                                            <span>{req}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                            </div>

                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* 5. SECCIÓN INFORMACIÓN CLAVE & HORARIOS */}
            <section className="py-20 bg-white select-none">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-16">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        
                        {/* Notas Clave */}
                        <div className="lg:col-span-6 space-y-6 text-left">
                            <div className="space-y-2">
                                <span className="text-xs font-black uppercase tracking-widest text-[#800A15] block font-sans">
                                    INFORMACIÓN GENERAL DE ADMISIÓN
                                </span>
                                <h3 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] font-sans">
                                    Aspectos Clave a Tener en Cuenta
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {notasClave.map((nota, idx) => {
                                    const IconoNota = nota.icono;
                                    return (
                                        <div key={idx} className="p-6 rounded-2xl bg-[#F8FAFC] border-2 border-slate-200 space-y-2.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-[#003C8F] text-white flex items-center justify-center shrink-0 font-bold">
                                                    <IconoNota className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-bold text-slate-400 uppercase block">{nota.titulo}</span>
                                                    <span className="text-sm font-black text-[#0B1F3A] font-sans">{nota.valor}</span>
                                                </div>
                                            </div>
                                            <p className="text-xs font-semibold text-slate-600 leading-relaxed font-sans pt-1">
                                                {nota.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Horarios Escolares */}
                        <div className="lg:col-span-6 space-y-6 text-left">
                            <div className="space-y-2">
                                <span className="text-xs font-black uppercase tracking-widest text-[#003C8F] block font-sans">
                                    HORARIOS DE ATENCIÓN ESCOLAR
                                </span>
                                <h3 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] font-sans">
                                    Jornada Única e Inicial
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {horariosJornadas.map((h, idx) => (
                                    <div key={idx} className="p-6 rounded-2xl bg-white border-2 border-slate-200 hover:border-[#003C8F] transition-colors flex items-center justify-between gap-4 shadow-xs">
                                        <div className="space-y-1">
                                            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#800A15] text-white inline-block mb-1">
                                                {h.badge}
                                            </span>
                                            <h4 className="text-lg font-black text-[#0B1F3A] font-sans">
                                                {h.nivel}
                                            </h4>
                                            <span className="text-xs font-bold text-slate-500 block">
                                                Grados: {h.grados}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-bold text-slate-400 block uppercase">Horario:</span>
                                            <span className="text-base sm:text-lg font-black text-[#003C8F] font-sans">
                                                {h.horario}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            {/* 6. LLAMADO A LA ACCIÓN FINAL GIGANTE Y CLARO */}
            <section className="py-24 bg-[#003C8F] text-white select-none">
                <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
                    
                    <ScrollReveal distance="translate-y-6">
                        <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#800A15] text-amber-300 text-xs sm:text-sm font-black uppercase tracking-widest shadow-lg">
                            <Sparkles className="w-4 h-4 text-amber-300" />
                            <span>PLATAFORMA OFICIAL DE INSCRIPCIÓN 2027</span>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal distance="translate-y-6" delay={150}>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white font-sans">
                            ¡Ingresa a la plataforma e inicia la solicitud de cupo!
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal distance="translate-y-6" delay={300}>
                        <p className="text-blue-100 text-lg sm:text-2xl font-semibold max-w-3xl mx-auto font-sans leading-relaxed">
                            Forma parte de nuestra comunidad educativa salesiana en Floridablanca. Registra la información de tu hijo(a) en pocos minutos.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal distance="translate-y-6" delay={450}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
                            <a
                                href={LINK_INSCRIPCIONES}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-4 px-10 py-5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-lg md:text-xl shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            >
                                <FileText className="w-6 h-6 text-slate-950" />
                                <span>ENTRAR A INSCRIPCIONES (SOLICITAR CUPO)</span>
                                <ExternalLink className="w-6 h-6 text-slate-950 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <button
                                onClick={() => copiarTexto(CORREO_ADMISIONES, false)}
                                className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-base border-2 border-white/20 backdrop-blur-md transition-all cursor-pointer"
                            >
                                <Mail className="w-5 h-5 text-amber-300" />
                                <span>{correoCopiado ? '¡Correo Copiado!' : 'Copiar Correo de Admisiones'}</span>
                            </button>
                        </div>
                    </ScrollReveal>

                </div>
            </section>

        </AppLayout>
    );
}
