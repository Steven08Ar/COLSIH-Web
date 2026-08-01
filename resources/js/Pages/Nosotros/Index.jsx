import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AboutHero from './components/AboutHero';
import { 
    Lightbulb, 
    Heart, 
    Sparkles, 
    Landmark, 
    ShieldCheck, 
    Calendar, 
    Award, 
    Compass, 
    Users, 
    Globe, 
    Building2, 
    History, 
    Layers, 
    ChevronRight,
    CheckCircle2,
    BookOpen
} from 'lucide-react';

export default function NosotrosIndex() {
    return (
        <AppLayout>
            <Head title="Quiénes Somos | COLSIH">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap" rel="stylesheet" />
            </Head>

            {/* ── SECTION 1: HERO IMPONENTE ── */}
            <AboutHero />

            {/* ── SECTION 2: NUESTRA FILOSOFÍA Y SISTEMA PREVENTIVO ── */}
            <section className="py-24 bg-slate-50/50 text-left relative overflow-hidden">
                <div className="absolute top-1/2 -right-64 w-[500px] h-[500px] bg-[#003C8F]/5 rounded-full blur-3xl pointer-events-none" />
                
                {/* Divisor de Ola */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
                    <svg className="relative block w-full h-[30px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,110 1200,60 L1200,120 L0,120 Z" fill="#ffffff" />
                    </svg>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                        
                        {/* Columna Izquierda: Presentación */}
                        <div className="col-span-full lg:col-span-5 space-y-6">
                            <span className="text-[#800A15] font-extrabold text-xs uppercase tracking-widest block font-sans">
                                NUESTRA FILOSOFÍA
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#08111F] leading-[1.08] tracking-tight font-sans">
                                El Sistema Preventivo:<br />
                                <span className="relative text-[#003C8F] inline-block mt-1" style={{ fontFamily: "'Caveat', cursive" }}>
                                    Razón, Religión y Amor.
                                </span>
                            </h2>
                            <p className="text-slate-500 text-[16px] leading-relaxed font-semibold pt-2">
                                Fundamentamos nuestra propuesta educativa en la pedagogía salesiana de San Juan Bosco y Santa María Mazzarello. Nuestro enfoque busca la formación de personas de bien, liderando con valores éticos y cristianos.
                            </p>
                        </div>

                        {/* Columna Derecha: 3 Pilares Salesianos con Iconos de React (Lucide) */}
                        <div className="col-span-full lg:col-span-7 space-y-6">
                            {/* Pilar 1: Razón */}
                            <div className="bg-white border border-slate-100 p-8 rounded-[28px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-[#003C8F]/10 text-[#003C8F] flex items-center justify-center shrink-0 shadow-sm">
                                    <Lightbulb className="w-6 h-6 text-[#003C8F]" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-extrabold text-[#08111F] font-sans">Razón</h3>
                                    <p className="text-slate-500 text-[13px] font-semibold leading-relaxed">
                                        Se manifiesta en el estudio riguroso, la autodisciplina reflexiva, la corrección fraterna oportuna y el diálogo abierto, propiciando un clima educativo de confianza y optimismo.
                                    </p>
                                </div>
                            </div>

                            {/* Pilar 2: Religión */}
                            <div className="bg-white border border-slate-100 p-8 rounded-[28px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-[#800A15]/10 text-[#800A15] flex items-center justify-center shrink-0 shadow-sm">
                                    <BookOpen className="w-6 h-6 text-[#800A15]" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-extrabold text-[#08111F] font-sans">Religión</h3>
                                    <p className="text-slate-500 text-[13px] font-semibold leading-relaxed">
                                        Inspirados en la verdad del Evangelio y la fe cristiano-católica, educamos en la trascendencia espiritual de la persona, viendo en el amor el motivo supremo de la vida y el desarrollo moral.
                                    </p>
                                </div>
                            </div>

                            {/* Pilar 3: Amabilidad (Amorevolezza) */}
                            <div className="bg-white border border-slate-100 p-8 rounded-[28px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-[#08111F]/10 text-[#08111F] flex items-center justify-center shrink-0 shadow-sm">
                                    <Heart className="w-6 h-6 text-[#800A15]" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-extrabold text-[#08111F] font-sans">Amabilidad (Amorevolezza)</h3>
                                    <p className="text-slate-500 text-[13px] font-semibold leading-relaxed">
                                        Fomentamos una relación cercana, respetuosa y sincera entre educadores y estudiantes, creando un auténtico espíritu de familia donde cada persona se siente valorada y querida.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* ── SECTION 3: IDENTIFICACIÓN Y GOBIERNO INSTITUCIONAL ── */}
            <section className="py-24 bg-white text-left relative">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <span className="text-[#003C8F] font-extrabold text-xs uppercase tracking-widest block font-sans">
                            INFORMACIÓN INSTITUCIONAL
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#08111F] tracking-tight font-sans">
                            Identificación de la Institución
                        </h2>
                        <p className="text-slate-400 text-sm font-semibold max-w-xl mx-auto">
                            Detalles oficiales y marco administrativo que definen nuestra identidad legal y organizativa en el territorio.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Naturaleza y Convenio */}
                        <div className="bg-slate-50/60 border border-slate-100 rounded-3xl p-8 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#800A15] flex items-center justify-center shrink-0 shadow-sm">
                                <Landmark className="w-6 h-6 text-[#800A15]" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-extrabold text-[17px] text-[#08111F] font-sans">Naturaleza Educativa</h3>
                                <p className="text-slate-500 text-[13px] leading-relaxed font-semibold">
                                    Establecimiento educativo privado de carácter católico y arquidiocesano. Mantiene una alianza en convenio con la Arquidiócesis de Bucaramanga.
                                </p>
                            </div>
                        </div>

                        {/* Dirección Pastoral */}
                        <div className="bg-slate-50/60 border border-slate-100 rounded-3xl p-8 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#003C8F] flex items-center justify-center shrink-0 shadow-sm">
                                <ShieldCheck className="w-6 h-6 text-[#003C8F]" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-extrabold text-[17px] text-[#08111F] font-sans">Administración Salesiana</h3>
                                <p className="text-slate-500 text-[13px] leading-relaxed font-semibold">
                                    Dirigido y administrado por la Comunidad Hijas de María Auxiliadora (HMA), integrando en cada espacio del plantel el carisma preventivo y la alegría salesiana.
                                </p>
                            </div>
                        </div>

                        {/* Oferta Escolar */}
                        <div className="bg-slate-50/60 border border-slate-100 rounded-3xl p-8 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-sm">
                                <Calendar className="w-6 h-6 text-amber-600" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-extrabold text-[17px] text-[#08111F] font-sans">Niveles y Calendario</h3>
                                <p className="text-slate-500 text-[13px] leading-relaxed font-semibold">
                                    Ofrecemos educación formal en Preescolar, Básica Primaria, Secundaria y Media Técnica, estructurado bajo jornada única y Calendario A.
                                </p>
                            </div>
                        </div>

                        {/* Aprobación Oficial */}
                        <div className="bg-slate-50/60 border border-slate-100 rounded-3xl p-8 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                                <Award className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-extrabold text-[17px] text-[#08111F] font-sans">Aprobación Legal</h3>
                                <p className="text-slate-500 text-[13px] leading-relaxed font-semibold">
                                    Reconocimiento oficial e institucional según la Resolución de Aprobación del Servicio Educativo No. 0306 del 10 de octubre de 2005.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ── SECTION 4: ¿POR QUÉ ELEGIRNOS? (Dark slate section) ── */}
            <section className="py-24 bg-[#08111F] text-white relative overflow-hidden text-left">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,60,143,0.18),transparent_60%)] pointer-events-none" />

                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        
                        {/* Columna Izquierda */}
                        <div className="col-span-full lg:col-span-5 space-y-4">
                            <span className="text-[#800A15] bg-white px-3 py-1 rounded-full font-extrabold text-xs uppercase tracking-widest inline-block font-sans">
                                ¿POR QUÉ ELEGIRNOS?
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white leading-[1.1] tracking-tight font-sans">
                                Formamos para la<br />
                                vida, preparamos<br />
                                para el{' '}
                                <span className="relative text-[#003C8F] inline-block font-sans">
                                    futuro.
                                    <span className="absolute bottom-1.5 left-0 w-full h-1.5 bg-[#003C8F]" />
                                </span>
                            </h2>
                        </div>

                        {/* Columna Derecha Grid con Iconos de React (Lucide) */}
                        <div className="col-span-full lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            
                            {/* Educación integral */}
                            <div className="flex gap-4.5 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-[#003C8F]/25 text-white flex items-center justify-center shrink-0 shadow-sm">
                                    <Compass className="w-6 h-6 text-blue-300" />
                                </div>
                                <div className="space-y-1.5">
                                    <h4 className="font-bold text-[16px] text-white font-sans">Educación integral</h4>
                                    <p className="text-slate-400 text-[13px] leading-relaxed font-semibold">
                                        Desarrollamos todas las dimensiones del ser humano: intelectual, emocional, social, espiritual y física.
                                    </p>
                                </div>
                            </div>

                            {/* Acompañamiento personalizado */}
                            <div className="flex gap-4.5 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-[#800A15]/25 text-white flex items-center justify-center shrink-0 shadow-sm">
                                    <Users className="w-6 h-6 text-rose-300" />
                                </div>
                                <div className="space-y-1.5">
                                    <h4 className="font-bold text-[16px] text-white font-sans">Acompañamiento personalizado</h4>
                                    <p className="text-slate-400 text-[13px] leading-relaxed font-semibold">
                                        Cada estudiante es único. Brindamos orientación y apoyo constante en su proceso de crecimiento.
                                    </p>
                                </div>
                            </div>

                            {/* Proyección global */}
                            <div className="flex gap-4.5 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-500/25 text-white flex items-center justify-center shrink-0 shadow-sm">
                                    <Globe className="w-6 h-6 text-indigo-300" />
                                </div>
                                <div className="space-y-1.5">
                                    <h4 className="font-bold text-[16px] text-white font-sans">Proyección global</h4>
                                    <p className="text-slate-400 text-[13px] leading-relaxed font-semibold">
                                        Formamos ciudadanos con visión internacional, competencias para el siglo XXI y compromiso con su entorno.
                                    </p>
                                </div>
                            </div>

                            {/* Infraestructura de calidad */}
                            <div className="flex gap-4.5 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/25 text-white flex items-center justify-center shrink-0 shadow-sm">
                                    <Building2 className="w-6 h-6 text-emerald-300" />
                                </div>
                                <div className="space-y-1.5">
                                    <h4 className="font-bold text-[16px] text-white font-sans">Infraestructura de calidad</h4>
                                    <p className="text-slate-400 text-[13px] leading-relaxed font-semibold">
                                        Espacios modernos, seguros y diseñados para inspirar el aprendizaje y la creatividad.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            {/* ── SECTION 5: NUESTRO IMPACTO (Tarjetas Flotantes con Iconos React) ── */}
            <section className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-12 -mt-16 text-center">
                <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/40 p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {/* Stat 1 */}
                    <div className="flex items-center gap-4.5 text-left md:justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#800A15]/10 text-[#800A15] flex items-center justify-center shrink-0 shadow-sm">
                            <History className="w-6 h-6 text-[#800A15]" />
                        </div>
                        <div>
                            <span className="text-3xl font-black text-[#08111F] block leading-none font-sans">40+</span>
                            <span className="text-[12px] text-slate-400 font-bold leading-tight block mt-1">Años de trayectoria educativa</span>
                        </div>
                    </div>

                    {/* Stat 2 */}
                    <div className="flex items-center gap-4.5 text-left md:justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#003C8F]/10 text-[#003C8F] flex items-center justify-center shrink-0 shadow-sm">
                            <Users className="w-6 h-6 text-[#003C8F]" />
                        </div>
                        <div>
                            <span className="text-3xl font-black text-[#08111F] block leading-none font-sans">2.000+</span>
                            <span className="text-[12px] text-slate-400 font-bold leading-tight block mt-1">Estudiantes formados</span>
                        </div>
                    </div>

                    {/* Stat 3 */}
                    <div className="flex items-center gap-4.5 text-left md:justify-center">
                        <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 shadow-sm">
                            <Award className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                            <span className="text-3xl font-black text-[#08111F] block leading-none font-sans">150+</span>
                            <span className="text-[12px] text-slate-400 font-bold leading-tight block mt-1">Docentes comprometidos</span>
                        </div>
                    </div>

                    {/* Stat 4 */}
                    <div className="flex items-center gap-4.5 text-left md:justify-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                            <Layers className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <span className="text-3xl font-black text-[#08111F] block leading-none font-sans">4</span>
                            <span className="text-[12px] text-slate-400 font-bold leading-tight block mt-1">Niveles educativos</span>
                        </div>
                    </div>
                </div>
            </section>


            {/* ── SECTION 6: BANNER FINAL DE LLAMADO A LA ACCIÓN ── */}
            <section className="py-8 bg-white text-center mt-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="relative bg-[#800A15] text-white py-16 px-8 md:px-16 rounded-[40px] shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-left">
                        {/* Wavy background shape */}
                        <div className="absolute right-0 top-0 w-[40%] h-[150%] bg-white/5 rounded-bl-full pointer-events-none transform -rotate-12" />
                        
                        <div className="space-y-2 relative z-10">
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight font-sans">
                                Te invitamos a ser parte de nuestra historia
                            </h2>
                            <p className="text-white/85 text-[15px] font-semibold">
                                Juntos, educamos con amor y construimos un futuro mejor.
                            </p>
                        </div>

                        <Link
                            href="/contacto"
                            className="bg-white hover:bg-slate-100 text-[#800A15] font-black text-sm px-8 py-4.5 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shrink-0 relative z-10 flex items-center gap-2 cursor-pointer"
                        >
                            Agenda tu visita
                            <ChevronRight className="w-4 h-4 text-[#800A15]" />
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
