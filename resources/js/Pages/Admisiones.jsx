import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from './HomeSections/ScrollReveal';

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
    { titulo: 'Título Técnico en Comercio', descripcion: 'Egresa como Bachiller Técnico con especialidad en Comercio, habilitado para el mundo laboral.' }
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
                        <ScrollReveal distance="translate-y-6">
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
                            <ScrollReveal distance="translate-y-6" delay={300}>
                                <p className="text-[15px] font-semibold text-slate-500 leading-relaxed font-sans">
                                    Las inscripciones para el año lectivo 2027 están abiertas desde Jardín hasta Sexto. El proceso cierra al completarse los cupos disponibles.
                                </p>
                            </ScrollReveal>
                        </div>

                        <div className="lg:col-span-8 space-y-6">
                            {fechas.map((etapa, idx) => (
                                <ScrollReveal key={idx} distance="translate-x-6" delay={idx * 100}>
                                    <div className="p-6 bg-white border border-slate-200/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left hover:border-slate-300 transition-all duration-300">
                                        <div className="space-y-1">
                                            <h3 className="font-extrabold text-[15px] text-[#08111F] font-sans">
                                                {etapa.etapa}
                                            </h3>
                                            <span className="block text-xl font-black text-[#003C8F] font-sans">
                                                {etapa.fecha}
                                            </span>
                                        </div>
                                        <span className="px-3.5 py-1.5 bg-slate-50 border border-slate-100 text-slate-500 rounded-full text-xs font-extrabold uppercase tracking-wider shrink-0 font-sans">
                                            {etapa.estado}
                                        </span>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                    {/* Horarios por nivel */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                        <div className="lg:col-span-4 text-center lg:text-left space-y-4 flex flex-col items-center lg:items-start">
                            <ScrollReveal distance="translate-y-6">
                                <span className="text-[#003C8F] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                    JORNADA ÚNICA
                                </span>
                            </ScrollReveal>
                            <ScrollReveal distance="translate-y-6" delay={150}>
                                <h2 className="text-3xl sm:text-4xl font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                    Horarios por Nivel
                                </h2>
                            </ScrollReveal>
                        </div>
                        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {horarios.map((h, idx) => (
                                <ScrollReveal key={idx} distance="translate-y-6" delay={idx * 120}>
                                    <div className="p-6 bg-white border border-slate-200/50 rounded-2xl text-left space-y-3 hover:border-slate-300 transition-all duration-300">
                                        <div className="space-y-0.5">
                                            <h3 className="font-black text-[#08111F] text-[15px] font-sans">{h.nivel}</h3>
                                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider font-sans">{h.grados}</span>
                                        </div>
                                        <div className="pt-2 border-t border-slate-100">
                                            <span className="block text-[17px] font-black text-[#003C8F] font-sans">{h.horario}</span>
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
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-20">

                    <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left space-y-4 flex flex-col items-center lg:items-start">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#003C8F] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                DOCUMENTACIÓN
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Documentos Requeridos
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-[15px] font-semibold text-slate-500 leading-relaxed font-sans">
                                Los requisitos varían según el nivel al que ingresa el estudiante. Prepara con anticipación los documentos de tu nivel.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {documentos.map((cat, idx) => (
                            <ScrollReveal key={idx} distance="translate-y-6" delay={idx * 150} className="h-full">
                                <div className="p-8 border border-slate-100 rounded-3xl bg-white space-y-6 h-full hover:border-slate-200 transition-colors duration-300 text-left flex flex-col">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black text-[#08111F] flex items-center gap-2 font-sans">
                                            <span className="w-1.5 h-6 rounded-full bg-[#800A15]" />
                                            {cat.categoria}
                                        </h3>
                                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider pl-4 font-sans">{cat.nivel}</span>
                                    </div>
                                    <ul className="space-y-3 flex-1">
                                        {cat.items.map((item, iIdx) => (
                                            <li key={iIdx} className="text-[13px] font-semibold text-slate-500 leading-relaxed font-sans flex items-start gap-2">
                                                <span className="text-[#003C8F] font-bold shrink-0 mt-0.5">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal distance="translate-y-6" className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-left">
                        <p className="text-xs font-semibold text-slate-500 leading-relaxed font-sans">
                            <strong className="text-[#08111F]">Nota:</strong> El recibo de pago y toda la información complementaria serán enviados al correo electrónico registrado en el formulario de inscripción.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* 5. DESTACADOS (Inglés, Becas, Título Técnico) */}
            <section className="relative py-20 bg-[#08111F] overflow-hidden select-none">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-12">
                    <div className="text-center lg:text-left flex flex-col items-center lg:items-start space-y-3">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#800A15] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                ¿POR QUÉ COLSIH?
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-3xl sm:text-4xl font-black text-white leading-[1.1] tracking-tight font-sans">
                                Lo que distingue a nuestros egresados
                            </h2>
                        </ScrollReveal>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {destacados.map((d, idx) => (
                            <ScrollReveal key={idx} distance="translate-y-6" delay={idx * 150}>
                                <div className="p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 text-left space-y-3">
                                    <h3 className="text-[17px] font-black text-white font-sans">{d.titulo}</h3>
                                    <p className="text-[13px] font-semibold text-slate-400 leading-relaxed font-sans">{d.descripcion}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. SECCIÓN FINAL CTA */}
            <section className="relative py-24 bg-white overflow-hidden select-none border-t border-slate-100">
                <div className="max-w-[1000px] mx-auto px-6 text-center space-y-10">
                    <div className="space-y-4">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#003C8F] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                FORMULARIO EN LÍNEA
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Asegura el cupo de tu hijo en COLSIH
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-[15px] md:text-lg font-semibold text-slate-500 leading-relaxed font-sans max-w-2xl mx-auto">
                                Los cupos son limitados. Inscríbete a través de nuestra página web y recibe toda la información directamente en tu correo.
                            </p>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal distance="translate-y-6" delay={450} className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a href="https://colsih.edu.co" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-[#003C8F] hover:bg-[#08111F] text-white font-extrabold text-xs tracking-wider uppercase rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-sans cursor-pointer">
                            Inscribirse en colsih.edu.co
                        </a>
                        <Link href="/contacto" className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-slate-400 text-[#08111F] font-extrabold text-xs tracking-wider uppercase rounded-full transition-all duration-300 font-sans cursor-pointer">
                            Contactar al Colegio
                        </Link>
                    </ScrollReveal>
                </div>
            </section>
        </AppLayout>
    );
}
