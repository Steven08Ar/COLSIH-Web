import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from './HomeSections/ScrollReveal';

const pasos = [
    {
        numero: '01',
        titulo: 'Inscripción en Línea',
        descripcion: 'Diligencia el formulario de pre-inscripción digital con la información básica del aspirante y de los padres de familia.',
        consejo: 'Asegúrate de contar con un correo electrónico activo para recibir las notificaciones y el estado de la solicitud.'
    },
    {
        numero: '02',
        titulo: 'Entrega de Documentación',
        descripcion: 'Adjunta los documentos requeridos (registro civil, certificados de notas y paz y salvo) en formato PDF a través de nuestro portal.',
        consejo: 'Los certificados de notas deben corresponder al último período cursado en la institución de procedencia.'
    },
    {
        numero: '03',
        titulo: 'Valoración Psicoorientadora',
        descripcion: 'Programamos un encuentro virtual o presencial de conocimiento mutuo entre el aspirante, los padres y nuestro equipo de orientación.',
        consejo: 'Es un espacio relajado enfocado en comprender los talentos, intereses y afinidad del estudiante con la filosofía salesiana.'
    },
    {
        numero: '04',
        titulo: 'Matrícula Financiera y Académica',
        descripcion: 'Una vez admitido, formaliza la matrícula realizando el pago de derechos y firmando el acta de compromiso escolar de forma digital.',
        consejo: 'Revisa las fechas del calendario de descuentos pronto-pago para derechos de matrícula y seguros escolares.'
    }
];

const documentos = [
    { categoria: 'Personales', items: ['Registro civil de nacimiento (menores de 7 años)', 'Tarjeta de identidad (mayores de 7 años)', 'Cédula de ciudadanía de ambos padres / acudiente', '1 foto tipo documento (3x4 fondo azul)'] },
    { categoria: 'Académicos', items: ['Certificado de notas del año anterior y del año en curso', 'Constancia de conducta y disciplina firmada', 'Certificado de paz y salvo financiero del colegio de procedencia'] },
    { categoria: 'Médicos', items: ['Copia del carné de vacunación al día (Preescolar y Primaria)', 'Certificado médico general vigente', 'Copia de afiliación a EPS o medicina prepagada'] }
];

const fechas = [
    { etapa: 'Apertura de Pre-inscripciones', fecha: 'Septiembre 1, 2026', estado: 'Próximamente' },
    { etapa: 'Entrevistas y Valoraciones', fecha: 'Septiembre - Noviembre', estado: 'Personalizado' },
    { etapa: 'Publicación de Resultados', fecha: '5 días hábiles post-entrevista', estado: 'En línea' },
    { etapa: 'Legalización de Matrículas', fecha: 'Noviembre - Diciembre', estado: 'Ordinario' },
    { etapa: 'Inicio de Clases', fecha: 'Última semana de Enero, 2027', estado: 'Proyectado' }
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

                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-10 text-left">
                    <div className="max-w-3xl space-y-6">
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

            {/* 2. TU CAMINO EN 4 PASOS (Interactive Steps) */}
            <section className="relative py-24 md:py-32 bg-white overflow-hidden select-none">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-20">
                    
                    <div className="max-w-2xl text-left space-y-4">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#003C8F] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                RUTAS DE ADMISIÓN
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Tu camino a COLSIH en 4 pasos
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

                                    {/* Collapsible/Details Drawer style at step card bottom */}
                                    <div className="border-t border-slate-100 pt-5 mt-6 space-y-2">
                                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#800A15] font-sans block">
                                            Consejo útil:
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

            {/* 3. CALENDARIO DE FECHAS (Timeline component) */}
            <section className="relative py-24 bg-slate-50 border-y border-slate-100 overflow-hidden select-none">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    <div className="lg:col-span-4 text-left space-y-4 lg:sticky lg:top-28">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#800A15] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                FECHAS CLAVE
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-3xl sm:text-4xl font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Calendario de Admisiones
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-[15px] font-semibold text-slate-500 leading-relaxed font-sans">
                                Sigue nuestro cronograma escolar para apartar y asegurar tu cupo a tiempo.
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
                                        <span className="block text-2xl font-black text-[#003C8F] font-sans">
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
            </section>

            {/* 4. REQUISITOS DE DOCUMENTOS (Category blocks) */}
            <section className="relative py-24 md:py-32 bg-white overflow-hidden select-none">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-20">
                    
                    <div className="max-w-2xl text-left space-y-4">
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
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {documentos.map((cat, idx) => (
                            <ScrollReveal key={idx} distance="translate-y-6" delay={idx * 150} className="h-full">
                                <div className="p-8 border border-slate-100 rounded-3xl bg-white space-y-6 h-full hover:border-slate-200 transition-colors duration-300 text-left flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-black text-[#08111F] flex items-center gap-2 font-sans">
                                            <span className="w-1.5 h-6 rounded-full bg-[#800A15]" />
                                            Requisitos {cat.categoria}
                                        </h3>
                                        <ul className="space-y-3 pt-2">
                                            {cat.items.map((item, iIdx) => (
                                                <li key={iIdx} className="text-xs font-semibold text-slate-500 leading-relaxed font-sans flex items-start gap-2">
                                                    <span className="text-[#003C8F] font-bold shrink-0 mt-0.5">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal distance="translate-y-6" className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-left">
                        <p className="text-xs font-semibold text-slate-500 leading-relaxed font-sans">
                            <strong className="text-[#08111F]">Nota Importante:</strong> Todos los documentos deben adjuntarse de forma digital en formato PDF o imagen (con peso máximo de 2 MB por archivo) durante el cargue de información en el formulario de inscripción en línea.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* 5. SECCIÓN FINAL CTA */}
            <section className="relative py-24 bg-slate-50 overflow-hidden select-none border-t border-slate-100">
                <div className="max-w-[1000px] mx-auto px-6 text-center space-y-10">
                    <div className="space-y-4">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#003C8F] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                FORMULARIO EN LÍNEA
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Comienza la inscripción de tu hijo
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-[15px] md:text-lg font-semibold text-slate-500 leading-relaxed font-sans max-w-2xl mx-auto">
                                Nuestro formulario de pre-inscripción digital está disponible para agilizar tu proceso sin salir de casa.
                            </p>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal distance="translate-y-6" delay={450} className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link href="/inscripcion" className="w-full sm:w-auto px-8 py-4 bg-[#003C8F] hover:bg-[#08111F] text-white font-extrabold text-xs tracking-wider uppercase rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-sans cursor-pointer">
                            Iniciar Inscripción en Línea
                        </Link>
                        <Link href="/contacto" className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-slate-400 text-[#08111F] font-extrabold text-xs tracking-wider uppercase rounded-full transition-all duration-300 font-sans cursor-pointer">
                            Solicitar Asesoría Personalizada
                        </Link>
                    </ScrollReveal>
                </div>
            </section>
        </AppLayout>
    );
}
