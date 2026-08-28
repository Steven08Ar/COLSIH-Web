import React from 'react';
import { Link } from '@inertiajs/react';
import ScrollReveal from './ScrollReveal';
import { 
    FileText, 
    UserCheck, 
    Award, 
    CheckCircle2, 
    ArrowRight, 
    ExternalLink, 
    Sparkles, 
    GraduationCap,
    Check
} from 'lucide-react';

const LINK_INSCRIPCIONES = "https://e.plataformaintegra.net/sihungria/index.php/cupo";

export default function Admissions() {
    const steps = [
        {
            num: "01",
            icon: FileText,
            title: "Inscripción Online",
            description: "Diligencia el formulario digital de admisión en la plataforma y adjunta los documentos solicitados.",
            accent: "from-[#001659] to-[#002b80]",
            borderTop: "border-t-[#001659]",
            stepTag: "Paso 1"
        },
        {
            num: "02",
            icon: UserCheck,
            title: "Entrevista y Pruebas",
            description: "Presentación de la prueba académica diagnóstica y espacio de entrevista familiar con psicología.",
            accent: "from-[#800A15] to-[#a00d1b]",
            borderTop: "border-t-[#800A15]",
            stepTag: "Paso 2"
        },
        {
            num: "03",
            icon: Award,
            title: "Resultados",
            description: "Consulta el estado de la postulación y recibe la notificación oficial de admisión vía correo electrónico.",
            accent: "from-[#001659] to-[#002b80]",
            borderTop: "border-t-[#001659]",
            stepTag: "Paso 3"
        },
        {
            num: "04",
            icon: CheckCircle2,
            title: "Matrícula Financiera",
            description: "Efectúa el pago de la matrícula y formaliza la firma del contrato escolar para asegurar el cupo.",
            accent: "from-[#800A15] to-[#a00d1b]",
            borderTop: "border-t-[#800A15]",
            stepTag: "Paso 4"
        }
    ];

    const gradosDisponibles = [
        { nivel: 'Preescolar', grados: ['Prejardín', 'Jardín', 'Transición'] },
        { nivel: 'Primaria', grados: ['Primero (1°)', 'Segundo (2°)', 'Tercero (3°)', 'Cuarto (4°)', 'Quinto (5°)'] },
        { nivel: 'Bachillerato', grados: ['Sexto (6°)'] }
    ];

    return (
        <section id="admisiones" className="relative py-20 lg:py-28 bg-[#F8F9FB] overflow-hidden select-none border-b border-slate-100">
            {/* Elementos de fondo decorativos sutiles */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#001659]/5 via-[#800A15]/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#800A15]/5 via-[#001659]/5 to-transparent rounded-full blur-3xl pointer-events-none -ml-48 -mb-48" />

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-[100px] space-y-12 sm:space-y-16 relative z-10">
                
                {/* ── ENCABEZADO DE SECCIÓN ── */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                    <div className="max-w-2xl text-left space-y-3">
                        <ScrollReveal distance="translate-y-4">
                            <span className="inline-flex items-center gap-2 text-[#800A15] text-xs sm:text-[13px] font-black tracking-[3px] uppercase font-sans">
                                <span className="w-2 h-2 rounded-full bg-[#800A15]" />
                                ADMISIÓN & MATRÍCULAS
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-4" delay={100}>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Tu camino a <span className="text-[#001659]">COLSIH</span>
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-4" delay={200}>
                            <p className="text-sm sm:text-base font-medium text-slate-500 max-w-xl leading-relaxed">
                                Formamos líderes con excelencia académica y sólida formación en valores. Inicia tu proceso de admisión hoy mismo.
                            </p>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal distance="translate-y-4" delay={300}>
                        <div className="flex items-center gap-3">
                            <Link 
                                href="/admisiones"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs text-xs sm:text-sm font-bold text-slate-700 hover:text-[#001659] transition-all"
                            >
                                <span>Guía de Admisiones</span>
                                <ArrowRight className="w-4 h-4 text-slate-400" />
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>

                {/* ── BANNER DESTACADO: INSCRIPCIONES ABIERTAS & CUPOS HABILITADOS ── */}
                <ScrollReveal distance="translate-y-6" delay={150}>
                    <div className="relative rounded-3xl bg-gradient-to-br from-[#08111F] via-[#0b172a] to-[#08111F] border border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-12 overflow-hidden">
                        {/* Acento decorativo luminoso */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#800A15]/20 via-[#001659]/20 to-transparent rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#001659]/30 to-transparent rounded-full blur-2xl pointer-events-none" />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            
                            {/* Columna Izquierda: Información Principal y Call-to-Action */}
                            <div className="lg:col-span-7 space-y-6 text-left">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#800A15] border border-red-400/30 text-white text-xs font-black tracking-wider uppercase shadow-md">
                                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                                    <span>CUPOS HABILITADOS</span>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight uppercase font-sans">
                                        Inscripciones Abiertas para Grados Seleccionados
                                    </h3>
                                    <p className="text-sm sm:text-base font-medium text-slate-300 leading-relaxed max-w-xl">
                                        Garantiza el cupo de tus hijos para el próximo año escolar. Vacantes disponibles en los siguientes niveles académicos:
                                    </p>
                                </div>

                                {/* Botones de Acción */}
                                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                                    <a
                                        href={LINK_INSCRIPCIONES}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#800A15] hover:bg-[#9b0f1a] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-rose-950/40 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <span>Solicitar Cupo Directo</span>
                                        <ArrowRight className="w-4 h-4 text-amber-300" />
                                    </a>
                                    <Link 
                                        href="/admisiones" 
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-extrabold text-xs sm:text-sm transition-all duration-200 border border-white/15 hover:border-white/30"
                                    >
                                        <span>Ver Requisitos Completos</span>
                                        <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                                    </Link>
                                </div>
                            </div>

                            {/* Columna Derecha: Grados Disponibles en Chips Organizados */}
                            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-white/10 space-y-4 text-left">
                                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                                    <GraduationCap className="w-5 h-5 text-amber-400" />
                                    <span className="text-xs font-black tracking-wider text-white uppercase">
                                        Grados con Disponibilidad
                                    </span>
                                </div>

                                <div className="space-y-3.5">
                                    {gradosDisponibles.map((grupo) => (
                                        <div key={grupo.nivel} className="space-y-1.5">
                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                                                {grupo.nivel}
                                            </span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {grupo.grados.map((grado) => (
                                                    <span 
                                                        key={grado}
                                                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold border border-white/10 transition-colors flex items-center gap-1.5"
                                                    >
                                                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                                                        {grado}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </ScrollReveal>

                {/* ── PASOS DEL PROCESO DE ADMISIÓN (4 Columnas) ── */}
                <div className="space-y-8 pt-4">
                    <div className="text-left">
                        <ScrollReveal distance="translate-y-4">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">
                                Paso a paso
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-[#08111F]">
                                ¿Cómo es el proceso de admisión?
                            </h3>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, index) => {
                            const IconComponent = step.icon;
                            return (
                                <ScrollReveal key={step.num} distance="translate-y-6" delay={index * 100}>
                                    <div 
                                        className={`h-full border border-slate-200/80 border-t-[3px] ${step.borderTop} p-6 sm:p-7 rounded-2xl bg-white shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left group hover:-translate-y-1`}
                                    >
                                        <div className="space-y-5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-3xl font-black text-slate-300 group-hover:text-[#001659] transition-colors font-sans tracking-tight">
                                                    {step.num}
                                                </span>
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 flex items-center justify-center group-hover:bg-[#001659] group-hover:text-white transition-colors shadow-xs">
                                                    <IconComponent className="w-5 h-5" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <span className="text-[10px] font-black uppercase tracking-wider text-[#800A15] block">
                                                    {step.stepTag}
                                                </span>
                                                <h4 className="font-extrabold text-base sm:text-[17px] text-[#08111F] group-hover:text-[#001659] transition-colors">
                                                    {step.title}
                                                </h4>
                                                <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-slate-400 group-hover:text-[#001659] transition-colors">
                                            <span className="text-[11px] font-bold uppercase tracking-wider">Detalles</span>
                                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
