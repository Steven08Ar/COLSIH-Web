import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from './HomeSections/ScrollReveal';
import { Sparkles } from 'lucide-react';

const pasos = [
    {
        numero: '01',
        titulo: 'Formulario en Línea',
        descripcion: 'Diligencia el formulario de inscripción disponible en nuestra página web colsih.edu.co con los datos del aspirante y los padres de familia.',
        consejo: 'Ten a mano un correo electrónico activo — allí recibirás el recibo de pago y toda la información del proceso.'
    },
    {
        numero: '02',
        titulo: 'Entrega de Documentos',
        descripcion: 'Reúne y entrega los documentos requeridos según el nivel al que va a ingresar el estudiante (Preescolar, Primaria o Bachillerato).',
        consejo: 'Los boletines deben ser de los 3 periodos académicos del año 2026 del colegio de procedencia.'
    },
    {
        numero: '03',
        titulo: 'Confirmación por Correo',
        descripcion: 'Una vez radicada la solicitud, recibirás al correo electrónico el recibo de pago y toda la información necesaria para completar la matrícula.',
        consejo: 'Revisa tu carpeta de spam si no recibes el correo en las primeras 24 horas hábiles.'
    }
];

const documentos = [
    {
        categoria: 'Preescolar',
        nivel: 'Jardín y Transición',
        items: [
            'Registro Civil de nacimiento'
        ]
    },
    {
        categoria: 'Primaria',
        nivel: '1° a 5°',
        items: [
            'Fotocopia del observador del alumno o constancia de comportamiento del colegio de procedencia',
            'Registro civil y/o tarjeta de identidad (mayores de 7 años)',
            'Boletines de los 3 periodos académicos del año 2026'
        ]
    },
    {
        categoria: 'Bachillerato',
        nivel: '6° a 11°',
        items: [
            'Fotocopia del observador del alumno o constancia de comportamiento del colegio de procedencia',
            'Registro civil y/o tarjeta de identidad',
            'Boletines de los 3 periodos académicos del año 2026'
        ]
    }
];

const fechas = [
    { etapa: 'Admisiones 2027 Abiertas', fecha: 'Cupos: Jardín a Sexto', estado: 'Abierta' },
    { etapa: 'Cierre de inscripciones', fecha: 'Hasta completar cupos disponibles', estado: 'En curso' },
    { etapa: 'Calendario escolar', fecha: 'Jornada Única · Calendario A', estado: 'Confirmado' }
];

const horarios = [
    { nivel: 'Preescolar', grados: 'Jardín y Transición', horario: '7:00 a.m. – 12:30 p.m.' },
    { nivel: 'Primaria', grados: '1° a 5°', horario: '6:30 a.m. – 1:00 p.m.' },
    { nivel: 'Bachillerato', grados: '6° a 11°', horario: '6:30 a.m. – 2:00 p.m.' }
];

const destacados = [
    { titulo: 'Inglés desde Jardín', descripcion: 'Aprendizaje del idioma inglés desde los primeros niveles de formación.' },
    { titulo: 'Becas UPB 90%', descripcion: 'Los mejores bachilleres acceden a becas del 90% en la Universidad Pontificia Bolivariana.' },
    { titulo: 'Técnico en Contabilización SENA', descripcion: 'Egresa como Bachiller Técnico con el título de Técnico en Contabilización de Operaciones Comerciales y Financieras, habilitado para el mundo laboral.' }
];

export default function Admisiones() {
    return (
        <AppLayout>
            <Head title="Admisiones y Matrículas | COLSIH" />

            {/* 1. HERO SECTION (Dark theme matching established style) */}
            <section className="relative pt-36 pb-32 md:pt-44 md:pb-40 bg-[#08111F] overflow-hidden select-none">
                {/* Glowing light blobs */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#003C8F]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#800A15]/8 rounded-full blur-[120px] pointer-events-none z-0"></div>

                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-10 text-center lg:text-left">
                    <div className="max-w-3xl mx-auto lg:mx-0 space-y-6 flex flex-col items-center lg:items-start">
                        
                        {/* Letrero minimalista "PRÓXIMAMENTE 2027..." en Vinotinto justo encima de "Tu camino a COLSIH" */}
                        <ScrollReveal distance="translate-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#800A15] text-white text-xs font-black tracking-widest uppercase mb-1 shadow-lg">
                                <Sparkles className="w-3.5 h-3.5 text-white" />
                                PRÓXIMAMENTE 2027...
                            </div>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={100}>
                            <span className="text-[#800A15] text-xs md:text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                                PROCESO DE MATRÍCULA
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black text-white leading-[1.05] tracking-tight font-sans">
                                Tu camino a COLSIH
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-lg md:text-[20px] font-medium text-slate-300 leading-relaxed max-w-2xl font-sans">
                                Te acompañamos paso a paso en el proceso de ingreso a nuestra institución. El trámite es digital, ágil y transparente.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Bottom Wave Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                    <svg className="relative block w-full h-[50px] md:h-[90px]" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path d="M0,100 C380,10 760,90 1080,30 C1200,10 1320,20 1440,60 L1440,100 L0,100 Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            {/* 2. PROCESO EN 3 PASOS */}
            <section className="relative py-24 md:py-32 bg-white overflow-hidden select-none">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-20">

                    <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left space-y-4 flex flex-col items-center lg:items-start">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#003C8F] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                RUTAS DE ADMISIÓN
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Proceso de admisión en 3 pasos
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pasos.map((paso, idx) => (
                            <ScrollReveal key={idx} distance="translate-y-8" delay={idx * 150} className="h-full">
                                <div className="group h-full border border-slate-100 p-8 rounded-3xl bg-slate-50/50 hover:bg-white hover:border-slate-200/80 hover:shadow-[0_20px_50px_rgba(8,17,31,0.04)] transition-all duration-300 flex flex-col justify-between text-left">
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-3xl font-black text-[#003C8F] opacity-40 group-hover:opacity-100 transition-opacity duration-300 font-sans">
                                                {paso.numero}
                                            </span>
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#800A15]" />
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-extrabold text-[#08111F] font-sans group-hover:text-[#003C8F] transition-colors duration-300">
                                                {paso.titulo}
                                            </h3>
                                            <p className="text-[14px] font-semibold text-slate-500 leading-relaxed font-sans">
                                                {paso.descripcion}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border-t border-slate-100 pt-5 mt-6 space-y-2">
                                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#800A15] font-sans block">
                                            Ten en cuenta:
                                        </span>
                                        <p className="text-xs font-semibold text-slate-400 leading-relaxed font-sans">
                                            {paso.consejo}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. ESTADO DE ADMISIONES + HORARIOS */}
            <section className="relative py-24 bg-slate-50 border-y border-slate-100 overflow-hidden select-none">
                <div className="max-w-[1680px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[120px] space-y-16">

                    {/* Estado admisiones */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                        <div className="lg:col-span-4 text-center lg:text-left space-y-4 flex flex-col items-center lg:items-start">
                            <ScrollReveal distance="translate-y-6">
                                <span className="text-[#800A15] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                    ADMISIONES 2027
                                </span>
                            </ScrollReveal>
                            <ScrollReveal distance="translate-y-6" delay={150}>
                                <h2 className="text-3xl sm:text-4xl font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                    Cupos Disponibles
                                </h2>
                            </ScrollReveal>
                        </div>

                        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                            {fechas.map((item, idx) => (
                                <ScrollReveal key={idx} distance="translate-y-8" delay={idx * 150} className="h-full">
                                    <div className="p-6 border border-slate-200/80 bg-white rounded-3xl space-y-3 shadow-sm h-full flex flex-col justify-between text-left">
                                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#003C8F] font-sans">
                                            {item.estado}
                                        </span>
                                        <div className="space-y-1">
                                            <h3 className="text-base font-extrabold text-[#08111F] font-sans">
                                                {item.etapa}
                                            </h3>
                                            <p className="text-xs font-semibold text-slate-500 font-sans">
                                                {item.fecha}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                    {/* Horarios */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pt-8 border-t border-slate-200/60">
                        <div className="lg:col-span-4 text-center lg:text-left space-y-4 flex flex-col items-center lg:items-start">
                            <ScrollReveal distance="translate-y-6">
                                <span className="text-[#003C8F] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                    JORNADA ÚNICA
                                </span>
                            </ScrollReveal>
                            <ScrollReveal distance="translate-y-6" delay={150}>
                                <h2 className="text-3xl sm:text-4xl font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                    Horarios Escolares
                                </h2>
                            </ScrollReveal>
                        </div>

                        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                            {horarios.map((item, idx) => (
                                <ScrollReveal key={idx} distance="translate-y-8" delay={idx * 150} className="h-full">
                                    <div className="p-6 border border-slate-200/80 bg-white rounded-3xl space-y-3 shadow-sm h-full flex flex-col justify-between text-left">
                                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#800A15] font-sans">
                                            {item.nivel}
                                        </span>
                                        <div className="space-y-1">
                                            <h3 className="text-base font-extrabold text-[#08111F] font-sans">
                                                {item.grados}
                                            </h3>
                                            <p className="text-xs font-semibold text-[#003C8F] font-sans">
                                                {item.horario}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* 4. DOCUMENTOS REQUERIDOS */}
            <section className="relative py-24 md:py-32 bg-white overflow-hidden select-none">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-16">
                    <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left space-y-4 flex flex-col items-center lg:items-start">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#800A15] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                REQUISITOS
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Documentos según nivel
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {documentos.map((doc, idx) => (
                            <ScrollReveal key={idx} distance="translate-y-8" delay={idx * 150} className="h-full">
                                <div className="border border-slate-100 p-8 rounded-3xl bg-slate-50/50 space-y-6 h-full text-left">
                                    <div className="space-y-1 border-b border-slate-200/60 pb-4">
                                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#003C8F] font-sans">
                                            {doc.categoria}
                                        </span>
                                        <h3 className="text-lg font-black text-[#08111F] font-sans">
                                            {doc.nivel}
                                        </h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {doc.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-xs font-semibold text-slate-600 leading-relaxed font-sans">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#800A15] mt-1.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. DESTACADOS COLSIH */}
            <section className="relative py-24 bg-gradient-to-r from-[#003C8F] via-blue-900 to-[#800A15] text-white overflow-hidden select-none">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-16">
                    <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left space-y-4 flex flex-col items-center lg:items-start">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#800A15] bg-white px-3 py-1 rounded-full text-xs font-bold tracking-[3px] uppercase block font-sans">
                                BENEFICIOS INSTITUCIONALES
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-white leading-[1.1] tracking-tight font-sans">
                                ¿Por qué elegir COLSIH?
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {destacados.map((item, idx) => (
                            <ScrollReveal key={idx} distance="translate-y-8" delay={idx * 150} className="h-full">
                                <div className="p-8 border border-white/10 bg-white/5 rounded-3xl space-y-4 backdrop-blur-md h-full text-left">
                                    <h3 className="text-xl font-black text-white font-sans">
                                        {item.titulo}
                                    </h3>
                                    <p className="text-sm font-medium text-slate-200 leading-relaxed font-sans">
                                        {item.descripcion}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <div className="text-center pt-8">
                        <Link
                            href="/contacto"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#003C8F] font-extrabold text-sm uppercase tracking-wider hover:bg-slate-100 transition-all duration-300 shadow-xl cursor-pointer"
                        >
                            Solicitar Asesoría de Admisiones
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
