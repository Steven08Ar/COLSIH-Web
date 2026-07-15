import { useState } from 'react';
import { Link } from '@inertiajs/react';
import ScrollReveal from './ScrollReveal';

export default function About() {
    const [activeTab, setActiveTab] = useState('mision');

    const timelineData = {
        mision: {
            title: "Nuestra Misión",
            description: "Ofrecer una formación integral de alta calidad académica basada en valores humanos, cristianos y franciscanos. Capacitamos a los estudiantes para liderar con ética, fe y ciencia, preparándolos para responder activamente a los desafíos de la sociedad.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        vision: {
            title: "Nuestra Visión",
            description: "Para el año 2030, seremos una institución educativa líder en Colombia por nuestra excelencia pedagógica, innovación y formación en valores cívicos. Consolidaremos una comunidad comprometida con la transformación social y el éxito profesional.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            )
        },
        valores: {
            title: "Nuestros Valores",
            description: "Vivimos bajo los pilares franciscanos de Fe, Ciencia y Justicia. Fomentamos el respeto mutuo, la solidaridad, el liderazgo honesto y la búsqueda de la verdad como guías de cada acción de nuestros estudiantes.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        }
    };

    return (
        <section className="relative py-28 lg:py-36 bg-[#F8F9FB] overflow-hidden select-none">
            {/* Soft decorative background circles */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#0057D9]/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                    
                    {/* Left Column: Image with float decoration (5 columns) */}
                    <div className="col-span-12 lg:col-span-6 relative flex justify-center">
                        <ScrollReveal distance="translate-y-16" className="relative w-full max-w-[540px]">
                            {/* Floating decorative dot grid */}
                            <div className="absolute -top-6 -left-6 w-20 h-20 bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-60 hidden md:block"></div>
                            
                            {/* Floating card decoration */}
                            <div className="absolute -bottom-8 -right-6 bg-white border border-slate-100 rounded-2xl shadow-xl p-5 z-20 max-w-[200px] hidden md:block animate-bounce" style={{ animationDuration: '6s' }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#E31C23]">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-bold">Fundado</span>
                                        <span className="block text-[15px] font-black text-slate-800">1982</span>
                                    </div>
                                </div>
                            </div>

                            {/* Main Image Container */}
                            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-slate-100/30 group">
                                <img 
                                    src="/Estudiantes COLSIH.png" 
                                    alt="Estudiantes COLSIH" 
                                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none"></div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right Column: Information & Timeline (6 columns) */}
                    <div className="col-span-12 lg:col-span-6 space-y-10 text-left">
                        <ScrollReveal distance="translate-y-8" delay={150}>
                            {/* Section Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0057D9]/10 text-[#0057D9] text-[13px] font-bold tracking-widest uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0057D9]"></span>
                                Nuestro Colegio
                            </div>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-8" delay={300} className="space-y-6">
                            {/* Section Title */}
                            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Educación con<br />propósito y fe
                            </h2>
                            {/* Short description */}
                            <p className="text-[17px] text-slate-600 font-medium leading-relaxed max-w-xl">
                                En el Colegio Santa Isabel de Hungría formamos líderes con principios inquebrantables. Inspiramos el desarrollo académico y espiritual de nuestros alumnos, guiándolos en cada paso hacia un futuro exitoso.
                            </p>
                        </ScrollReveal>

                        {/* Interactive Timeline Tabs */}
                        <ScrollReveal distance="translate-y-12" delay={450} className="space-y-6">
                            <div className="flex border-b border-slate-200">
                                {Object.keys(timelineData).map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveTab(key)}
                                        className={`pb-4 px-2 font-extrabold text-[15px] transition-all relative cursor-pointer focus:outline-none ${
                                            activeTab === key ? 'text-[#E31C23]' : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                    >
                                        {timelineData[key].title}
                                        {activeTab === key && (
                                            <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E31C23] rounded-full animate-fadeIn" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Active Tab Details */}
                            <div className="min-h-[140px] flex gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E31C23] flex items-center justify-center shrink-0">
                                    {timelineData[activeTab].icon}
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-extrabold text-[17px] text-slate-800">
                                        {timelineData[activeTab].title}
                                    </h4>
                                    <p className="text-sm font-semibold text-slate-500 leading-relaxed">
                                        {timelineData[activeTab].description}
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* CTA button */}
                        <ScrollReveal distance="translate-y-8" delay={550}>
                            <Link
                                href="/nosotros"
                                className="inline-flex items-center justify-center bg-[#E31C23] hover:bg-[#c4181e] text-white font-extrabold text-sm px-8 py-4.5 rounded-full shadow-lg shadow-red-700/10 hover:shadow-red-700/20 active:scale-[0.98] transition-all cursor-pointer"
                            >
                                Ver nuestra historia
                            </Link>
                        </ScrollReveal>

                    </div>
                </div>
            </div>
        </section>
    );
}
