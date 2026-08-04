import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';
import { FileText, Briefcase, GraduationCap, Award, CheckCircle2, ArrowRight, Building, TrendingUp, Check, Sparkles } from 'lucide-react';

const programaSena = {
    codigo: 'TECNICO-SENA',
    titulo: 'Técnico en Contabilización de Operaciones Comerciales y Financieras',
    duracion: '2 Años (Grados 10° y 11°)',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    borderColor: 'border-emerald-200',
    headerGradient: 'from-emerald-600 via-teal-600 to-emerald-800',
    icon: FileText,
    descripcion: 'Formación de excelencia empresarial en gestión contable, manejo de software financiero de última generación, legislación tributaria y análisis de operaciones comerciales de empresas.',
    competencias: [
        'Registro y procesamiento de transacciones contables y financieras',
        'Manejo de sistemas de información y software empresarial contable',
        'Preparación y análisis de estados financieros y liquidación de tributos',
        'Ética profesional empresarial y aplicación de la legislación comercial vigente'
    ]
};

const beneficiosSena = [
    {
        icon: GraduationCap,
        color: 'bg-emerald-100 text-emerald-700 border-emerald-300',
        titulo: 'Doble Titulación Oficial',
        desc: 'Al graduarse de Grado 11°, el estudiante obtiene simultáneamente su título de Bachiller Académico COLSIH y su Título Técnico Profesional expedido directamente por el SENA.'
    },
    {
        icon: Briefcase,
        color: 'bg-teal-100 text-teal-700 border-teal-300',
        titulo: 'Inserción Laboral Temprana',
        desc: 'Habilita al estudiante para acceder al mercado laboral empresarial y financiero de forma inmediata o realizar prácticas técnicas reales.'
    },
    {
        icon: TrendingUp,
        color: 'bg-emerald-100 text-emerald-700 border-emerald-300',
        titulo: 'Homologación Universitaria',
        desc: 'Los módulos y competencias aprobados durante el convenio SENA son homologables en carreras profesionales de Contaduría, Administración y Economía.'
    },
    {
        icon: Award,
        color: 'bg-teal-100 text-teal-700 border-teal-300',
        titulo: 'Formación Gratuita e Incluida',
        desc: 'El programa de articulación SENA está 100% integrado dentro de la jornada escolar de la Media Técnica sin ningún costo adicional de matrícula.'
    }
];

export default function Sena() {
    return (
        <AppLayout>
            <Head title="Articulación SENA | Oferta Académica COLSIH" />

            {/* 1. HERO TEMÁTICO SENA (Verde Esmeralda / Menta / Deep Forest) */}
            <section className="relative min-h-[680px] md:min-h-[760px] pt-36 pb-32 md:pt-44 md:pb-40 bg-[#022C22] overflow-hidden select-none flex items-center">
                
                {/* Imagen vertical de fondo enfocada a los estudiantes técnicos SENA */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                    <img
                        src="https://pub-c4ddb3fb75904158bbda5fbc35d6963e.r2.dev/ofertas_academicas/SENA.JPG"
                        alt="Estudiantes Convenio SENA COLSIH"
                        className="absolute top-0 right-0 w-full md:w-[65%] lg:w-[58%] h-full object-cover object-[center_40%] contrast-[1.05] brightness-90 md:brightness-95 scale-105"
                    />
                </div>

                {/* Sombra gradiente para móvil */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#022C22] via-[#022C22]/90 to-[#022C22]/60 md:hidden z-10 pointer-events-none"></div>

                {/* Sombra gradiente de izquierda a derecha para escritorio */}
                <div className="absolute inset-y-0 left-0 w-full md:w-[70%] lg:w-[60%] z-10 hidden md:block pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-r from-[#022C22] via-[#022C22] via-75% to-transparent"></div>
                </div>

                {/* Blobs luminosos Verde Esmeralda y Menta */}
                <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-emerald-500/25 rounded-full blur-[130px] pointer-events-none z-10 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-teal-500/20 rounded-full blur-[120px] pointer-events-none z-10"></div>

                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-20 w-full">
                    <div className="max-w-3xl space-y-6">
                        <ScrollReveal distance="translate-y-6">
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-600/20 border border-emerald-400/30 backdrop-blur-md shadow-lg shadow-emerald-500/10">
                                <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" />
                                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-200 bg-clip-text text-transparent text-xs md:text-sm font-black tracking-wider uppercase font-sans">
                                    Convenio Oficial COLSIH - SENA
                                </span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-white leading-[1.08] tracking-tight font-sans">
                                Articulación SENA: <br className="hidden sm:block" />
                                <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-md">
                                    Doble Titulación Técnica Empresarial
                                </span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-lg md:text-xl font-medium text-emerald-100/90 leading-relaxed max-w-2xl font-sans">
                                Convenio institucional que capacita a nuestros estudiantes de educación media (10° y 11°) como Técnicos en Contabilización de Operaciones Comerciales y Financieras validados por el SENA.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={450}>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    href="/admisiones"
                                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white font-black text-sm md:text-base shadow-xl shadow-emerald-500/25 hover:scale-105 transition-all duration-300 border border-emerald-300/30 flex items-center gap-2"
                                >
                                    <span>Conocer Requisitos e Inscripción</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <a
                                    href="#programa"
                                    className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/25 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                >
                                    <span>Ver Especialidad</span>
                                    <FileText className="w-4 h-4 text-emerald-300" />
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Divisor de ola inferior */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                    <svg className="relative block w-full h-[50px] md:h-[80px]" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path d="M0,100 C380,20 760,90 1080,30 C1200,10 1320,20 1440,60 L1440,100 L0,100 Z" fill="#ECFDF5"></path>
                    </svg>
                </div>
            </section>

            {/* 2. PROGRAMA TÉCNICO SENA ÚNICO (Verde Esmeralda) */}
            <section id="programa" className="py-20 md:py-28 bg-[#ECFDF5] relative z-10">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-xs tracking-[3px] uppercase mb-4 border border-emerald-200">
                            <Briefcase className="w-4 h-4 text-emerald-700" />
                            ESPECIALIDAD TÉCNICA OFICIAL
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            Programa de Articulación SENA
                        </h2>
                        <p className="text-slate-600 text-base md:text-lg mt-4 font-medium">
                            Formación técnica profesional orientada a la contabilidad, las finanzas y la gestión comercial de organizaciones.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <ScrollReveal distance="translate-y-8">
                            <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl border-2 border-emerald-200 hover:shadow-emerald-500/10 transition-all duration-300 group">
                                <div className="p-8 md:p-10 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                                            <FileText className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-black tracking-widest text-emerald-200 uppercase block mb-1">CONVENIO OFICIAL SENA</span>
                                            <h3 className="text-2xl md:text-3xl font-black leading-tight">{programaSena.titulo}</h3>
                                        </div>
                                    </div>
                                    <span className="px-4 py-2 rounded-full text-xs md:text-sm font-black tracking-wider bg-white text-emerald-900 shadow-md shrink-0">
                                        {programaSena.duracion}
                                    </span>
                                </div>
                                <div className="p-8 md:p-10">
                                    <p className="text-slate-600 font-medium text-base md:text-lg leading-relaxed mb-8">
                                        {programaSena.descripcion}
                                    </p>
                                    <div className="space-y-4 pt-6 border-t border-emerald-100">
                                        <h4 className="text-xs md:text-sm font-black text-emerald-900 uppercase tracking-wider block mb-4">Competencias del Técnico SENA:</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {programaSena.competencias.map((item) => (
                                                <div key={item} className="flex items-start gap-3 text-sm font-semibold text-slate-700 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
                                                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 3. BENEFICIOS CLAVE DEL CONVENIO */}
            <section className="py-20 md:py-28 bg-white relative z-10">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 text-teal-800 font-extrabold text-xs tracking-[3px] uppercase mb-4 border border-teal-200">
                            <Sparkles className="w-4 h-4 text-teal-600" />
                            VENTAJAS COMPETITIVAS
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            ¿Por qué realizar la Articulación SENA?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {beneficiosSena.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <ScrollReveal key={item.titulo} delay={idx * 120} distance="translate-y-6">
                                    <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-emerald-50/20 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 flex items-start gap-5 group hover:-translate-y-1 shadow-lg shadow-emerald-500/5">
                                        <div className={`p-4 rounded-2xl ${item.color} group-hover:scale-110 transition-transform duration-300 shrink-0 border`}>
                                            <IconComponent className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">{item.titulo}</h3>
                                            <p className="text-slate-600 text-sm font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. BANNER FINAL ADMISIONES SENA */}
            <section className="py-20 bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-800 text-white relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-md">
                        ¡Egresa como Bachiller y Técnico Profesional del SENA!
                    </h2>
                    <p className="text-emerald-100 text-base md:text-xl font-medium max-w-2xl mx-auto">
                        Inscríbete en el Colegio Santa Isabel de Hungría y asegura tu doble titulación académica para el futuro.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/admisiones"
                            className="inline-flex items-center gap-3 px-9 py-4 rounded-2xl bg-white text-slate-900 font-black text-sm md:text-base shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-emerald-50"
                        >
                            <span>Solicitar Información de Admisiones</span>
                            <ArrowRight className="w-5 h-5 text-emerald-700" />
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
