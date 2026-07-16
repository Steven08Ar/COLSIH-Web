import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AboutHero from './components/AboutHero';

export default function NosotrosIndex() {
    return (
        <AppLayout>
            <Head>
                <title>Quiénes Somos</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap" rel="stylesheet" />
            </Head>

            {/* SECTION 1: HERO SECTION */}
            <AboutHero />


            {/* SECTION 2: NUESTRA FILOSOFÍA Y SISTEMA PREVENTIVO */}
            <section className="py-24 bg-slate-50/50 text-left relative overflow-hidden">
                <div className="absolute top-1/2 -right-64 w-[500px] h-[500px] bg-[#0057D9]/5 rounded-full blur-3xl pointer-events-none"></div>
                
                {/* Wavy bottom decoration */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
                    <svg className="relative block w-full h-[30px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,110 1200,60 L1200,120 L0,120 Z" fill="#ffffff" />
                    </svg>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        
                        {/* Left column */}
                        <div className="col-span-12 lg:col-span-5 space-y-6">
                            <span className="text-[#E31C23] font-extrabold text-[12px] uppercase tracking-widest block font-sans">
                                NUESTRA FILOSOFÍA
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#08111F] leading-[1.08] tracking-tight font-sans">
                                El Sistema Preventivo:<br />
                                <span className="relative text-[#0057D9] inline-block mt-1" style={{ fontFamily: "'Caveat', cursive" }}>
                                    Razón, Religión y Amor.
                                </span>
                            </h2>
                            <p className="text-slate-500 text-[16px] leading-relaxed font-semibold pt-2">
                                Fundamentamos nuestra propuesta educativa en la pedagogía salesiana de San Juan Bosco y Santa María Mazzarello. Nuestro enfoque busca la formación de personas de bien, liderando con valores éticos y cristianos.
                            </p>
                        </div>

                        {/* Right column: 3 Pillars Cards */}
                        <div className="col-span-12 lg:col-span-7 space-y-6">
                            {/* Razón */}
                            <div className="bg-white border border-slate-100 p-8 rounded-[28px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-[#0057D9]/10 text-[#0057D9] flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-[#08111F] font-sans">Razón</h3>
                                    <p className="text-[#72859A] text-[13px] font-semibold leading-relaxed">
                                        Se manifiesta en el estudio riguroso, la autodisciplina reflexiva, la corrección fraterna oportuna y el diálogo abierto, propiciando un clima educativo de confianza y optimismo.
                                    </p>
                                </div>
                            </div>

                            {/* Religión */}
                            <div className="bg-white border border-slate-100 p-8 rounded-[28px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-[#E31C23]/10 text-[#E31C23] flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                    </svg>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-[#08111F] font-sans">Religión</h3>
                                    <p className="text-[#72859A] text-[13px] font-semibold leading-relaxed">
                                        Inspirados en la verdad del Evangelio y la fe cristiano-católica, educamos en la trascendencia espiritual de la persona, viendo en el amor el motivo supremo de la vida y el desarrollo moral.
                                    </p>
                                </div>
                            </div>

                            {/* Amabilidad (Amorevolezza) */}
                            <div className="bg-white border border-slate-100 p-8 rounded-[28px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-[#08111F]/10 text-[#08111F] flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-[#08111F] font-sans">Amabilidad (Amorevolezza)</h3>
                                    <p className="text-[#72859A] text-[13px] font-semibold leading-relaxed">
                                        Fomentamos una relación cercana, respetuosa y sincera entre educadores y estudiantes, creando un auténtico espíritu de familia donde cada persona se siente valorada y querida.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* SECTION 3: IDENTIFICACIÓN Y GOBIERNO */}
            <section className="py-24 bg-white text-left relative">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <span className="text-[#0057D9] font-extrabold text-[12px] uppercase tracking-widest block font-sans">
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
                        <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-8 hover:shadow-md transition-all duration-300 flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#E31C23] flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-extrabold text-[17px] text-[#08111F] font-sans">Naturaleza Educativa</h3>
                                <p className="text-slate-400 text-[13px] leading-relaxed font-semibold">
                                    Establecimiento educativo privado de carácter católico y arquidiocesano. Mantiene una alianza en convenio con la Arquidiócesis de Bucaramanga.
                                </p>
                            </div>
                        </div>

                        {/* Dirección Pastoral */}
                        <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-8 hover:shadow-md transition-all duration-300 flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0057D9] flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-extrabold text-[17px] text-[#08111F] font-sans">Administración Salesiana</h3>
                                <p className="text-slate-400 text-[13px] leading-relaxed font-semibold">
                                    Dirigido y administrado por la Comunidad Hijas de María Auxiliadora (HMA), integrando en cada espacio del plantel el carisma preventivo y la alegría salesiana.
                                </p>
                            </div>
                        </div>

                        {/* Oferta Escolar */}
                        <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-8 hover:shadow-md transition-all duration-300 flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-extrabold text-[17px] text-[#08111F] font-sans">Niveles y Calendario</h3>
                                <p className="text-slate-400 text-[13px] leading-relaxed font-semibold">
                                    Ofrecemos educación formal en Preescolar, Básica Primaria, Secundaria y Media Técnica, estructurado bajo jornada única y Calendario A.
                                </p>
                            </div>
                        </div>

                        {/* Aprobación Oficial */}
                        <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-8 hover:shadow-md transition-all duration-300 flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138z" />
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-extrabold text-[17px] text-[#08111F] font-sans">Aprobación Legal</h3>
                                <p className="text-slate-400 text-[13px] leading-relaxed font-semibold">
                                    Reconocimiento oficial e institucional según la Resolución de Aprobación del Servicio Educativo No. 0306 del 10 de octubre de 2005.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* SECTION 4: ¿POR QUÉ ELEGIRNOS? (Dark slate section) */}
            <section className="py-24 bg-[#08111F] text-white relative overflow-hidden text-left">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,87,217,0.18),transparent_60%)] pointer-events-none"></div>

                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        
                        {/* Left column */}
                        <div className="col-span-12 lg:col-span-5 space-y-4">
                            <span className="text-red-500 font-extrabold text-[12px] uppercase tracking-widest block font-sans">
                                ¿Por qué elegirnos?
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white leading-[1.1] tracking-tight font-sans">
                                Formamos para la<br />
                                vida, preparamos<br />
                                para el{' '}
                                <span className="relative text-[#0057D9] inline-block font-sans">
                                    futuro.
                                    <span className="absolute bottom-1.5 left-0 w-full h-1.5 bg-[#0057D9]"></span>
                                </span>
                            </h2>
                        </div>

                        {/* Right column grid */}
                        <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            
                            {/* Educación integral */}
                            <div className="flex gap-4.5 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-[#0057D9]/25 text-white flex items-center justify-center shrink-0">
                                    <svg className="w-5.5 h-5.5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    </svg>
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
                                <div className="w-12 h-12 rounded-2xl bg-[#E31C23]/25 text-white flex items-center justify-center shrink-0">
                                    <svg className="w-5.5 h-5.5 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
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
                                <div className="w-12 h-12 rounded-2xl bg-indigo-500/25 text-white flex items-center justify-center shrink-0">
                                    <svg className="w-5.5 h-5.5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
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
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/25 text-white flex items-center justify-center shrink-0">
                                    <svg className="w-5.5 h-5.5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
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


            {/* SECTION 5: NUESTRO IMPACTO (Floating card overlay) */}
            <section className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-12 -mt-16 text-center">
                <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/40 p-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Stat 1 */}
                    <div className="flex items-center gap-4.5 text-left md:justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#E31C23]/10 text-[#E31C23] flex items-center justify-center shrink-0">
                            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-3xl font-black text-[#08111F] block leading-none font-sans">40+</span>
                            <span className="text-[12px] text-slate-400 font-bold leading-tight block mt-1">Años de experiencia educativa</span>
                        </div>
                    </div>

                    {/* Stat 2 */}
                    <div className="flex items-center gap-4.5 text-left md:justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#0057D9]/10 text-[#0057D9] flex items-center justify-center shrink-0">
                            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-3xl font-black text-[#08111F] block leading-none font-sans">2.000+</span>
                            <span className="text-[12px] text-slate-400 font-bold leading-tight block mt-1">Estudiantes formados</span>
                        </div>
                    </div>

                    {/* Stat 3 */}
                    <div className="flex items-center gap-4.5 text-left md:justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#E77918]/10 text-[#E77918] flex items-center justify-center shrink-0">
                            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-3xl font-black text-[#08111F] block leading-none font-sans">150+</span>
                            <span className="text-[12px] text-slate-400 font-bold leading-tight block mt-1">Docentes comprometidos</span>
                        </div>
                    </div>

                    {/* Stat 4 */}
                    <div className="flex items-center gap-4.5 text-left md:justify-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-3xl font-black text-[#08111F] block leading-none font-sans">4</span>
                            <span className="text-[12px] text-slate-400 font-bold leading-tight block mt-1">Niveles educativos</span>
                        </div>
                    </div>
                </div>
            </section>


            {/* SECTION 6: BOTTOM RED CTA BANNER */}
            <section className="py-8 bg-white text-center mt-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="relative bg-[#E31C23] text-white py-16 px-8 md:px-16 rounded-[40px] shadow-xl shadow-red-700/10 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-left">
                        {/* Wavy background shapes inside the banner */}
                        <div className="absolute right-0 top-0 w-[40%] h-[150%] bg-white/5 rounded-bl-full pointer-events-none transform -rotate-12"></div>
                        
                        <div className="space-y-2 relative z-10">
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-serif leading-tight">
                                Te invitamos a ser parte de nuestra historia
                            </h2>
                            <p className="text-white/85 text-[15px] font-semibold">
                                Juntos, educamos con amor y construimos un futuro mejor.
                            </p>
                        </div>

                        <Link
                            href="/contacto"
                            className="bg-white hover:bg-slate-50 text-[#E31C23] font-black text-sm px-8 py-4.5 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shrink-0 relative z-10 flex items-center gap-2 cursor-pointer"
                        >
                            Agenda tu visita
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
