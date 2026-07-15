import { useEffect, useState, useRef } from 'react';
import { Link } from '@inertiajs/react';
import ScrollReveal from './ScrollReveal';

export default function Admissions() {
    const [inView, setInView] = useState(false);
    const [activeSteps, setActiveSteps] = useState([false, false, false, false]);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.15 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    // Staggered activation of steps once in view
    useEffect(() => {
        if (!inView) return;
        
        const timers = [
            setTimeout(() => setActiveSteps(prev => [true, false, false, false]), 200),
            setTimeout(() => setActiveSteps(prev => [true, true, false, false]), 800),
            setTimeout(() => setActiveSteps(prev => [true, true, true, false]), 1400),
            setTimeout(() => setActiveSteps(prev => [true, true, true, true]), 2000),
        ];

        return () => timers.forEach(clearTimeout);
    }, [inView]);

    const steps = [
        {
            num: "01",
            title: "Inscripción Online",
            description: "Diligencia el formulario digital de admisión y carga los documentos del estudiante de forma rápida.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            num: "02",
            title: "Entrevista y Pruebas",
            description: "Presenta las pruebas básicas y asiste a la entrevista psicológica virtual o presencial.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            num: "03",
            title: "Resultados",
            description: "Revisa el estado de la postulación en nuestra plataforma y recibe la confirmación vía correo.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            num: "04",
            title: "Matrícula Financiera",
            description: "Efectúa el pago del cupo y firma el contrato de matrícula digitalmente para asegurar la vacante.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            )
        }
    ];

    return (
        <section 
            ref={ref}
            className="relative py-28 lg:py-36 bg-white overflow-hidden select-none"
        >
            {/* Background Blob decoration */}
            <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-[#0057D9]/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-24">
                
                {/* Section Header */}
                <div className="max-w-2xl mx-auto text-center space-y-4">
                    <ScrollReveal distance="translate-y-8" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0057D9]/10 text-[#0057D9] text-[13px] font-bold tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0057D9]"></span>
                        Proceso de Admisión
                    </ScrollReveal>
                    <ScrollReveal distance="translate-y-8" delay={150}>
                        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                            Tu camino a COLSIH en 4 pasos
                        </h2>
                    </ScrollReveal>
                </div>

                {/* Horizontal Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
                    {steps.map((step, index) => {
                        const isActive = activeSteps[index];
                        const isLast = index === steps.length - 1;

                        return (
                            <ScrollReveal 
                                key={index}
                                distance="translate-y-12"
                                delay={index * 150}
                                className="relative flex flex-col items-center md:items-start text-center md:text-left space-y-6"
                            >
                                {/* Connecting line for desktop */}
                                {!isLast && (
                                    <div className="absolute top-7 left-[calc(50%+30px)] md:left-[80px] right-[calc(-50%+30px)] md:right-[-40px] h-[2px] bg-slate-100 -translate-y-1/2 hidden md:block z-0">
                                        <div 
                                            className="h-full bg-[#E31C23] transition-all duration-1000 ease-in-out" 
                                            style={{ width: isActive && activeSteps[index + 1] ? '100%' : '0%' }}
                                        />
                                    </div>
                                )}

                                {/* Step Circle Indicator */}
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 relative z-10 ${
                                    isActive 
                                        ? 'border-[#E31C23] bg-[#E31C23] text-white shadow-lg shadow-red-700/20' 
                                        : 'border-slate-200 bg-white text-slate-400'
                                }`}>
                                    {step.icon}
                                    <span className={`absolute -bottom-4 text-[9px] font-extrabold tracking-widest ${
                                        isActive ? 'text-[#E31C23]' : 'text-slate-400'
                                    }`}>
                                        {step.num}
                                    </span>
                                </div>

                                {/* Step Details */}
                                <div className="space-y-3 pt-2">
                                    <h3 className={`font-extrabold text-[18px] transition-colors duration-500 ${
                                        isActive ? 'text-[#08111F]' : 'text-slate-400'
                                    }`}>
                                        {step.title}
                                    </h3>
                                    <p className="text-sm font-semibold text-slate-500 leading-relaxed max-w-[260px] mx-auto md:mx-0">
                                        {step.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <ScrollReveal distance="translate-y-8" delay={400} className="text-center pt-8">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-6 justify-center">
                        <Link 
                            href="/inscripcion" 
                            className="inline-flex items-center justify-center bg-[#E31C23] hover:bg-[#c4181e] text-white font-extrabold text-sm px-8 py-4.5 rounded-full shadow-lg shadow-red-700/10 active:scale-[0.98] transition-all cursor-pointer"
                        >
                            Iniciar inscripción online
                        </Link>
                        <Link 
                            href="/admisiones" 
                            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#08111F] hover:text-[#E31C23] uppercase tracking-wider transition-colors"
                        >
                            Ver costos y requisitos
                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
}
