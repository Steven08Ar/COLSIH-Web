import { Link } from '@inertiajs/react';
import ScrollReveal from './ScrollReveal';
import { Sparkles } from 'lucide-react';

export default function Admissions() {
    const steps = [
        {
            num: "01",
            title: "Inscripción Online",
            description: "Diligencia el formulario digital de admisión y carga los documentos del estudiante de forma rápida.",
            color: "border-t-[#003C8F]",
        },
        {
            num: "02",
            title: "Entrevista y Pruebas",
            description: "Presenta las pruebas básicas y asiste a la entrevista psicológica virtual o presencial.",
            color: "border-t-[#800A15]",
        },
        {
            num: "03",
            title: "Resultados",
            description: "Revisa el estado de la postulación en nuestra plataforma y recibe la confirmación vía correo.",
            color: "border-t-[#003C8F]",
        },
        {
            num: "04",
            title: "Matrícula Financiera",
            description: "Efectúa el pago del cupo y firma el contrato de matrícula digitalmente para asegurar la vacante.",
            color: "border-t-[#800A15]",
        }
    ];

    return (
        <section className="relative py-24 lg:py-32 bg-[#F8F9FB] overflow-hidden select-none border-b border-slate-100">
            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-16">
                
                {/* Section Header */}
                <div className="max-w-2xl text-left space-y-4">
                    <ScrollReveal distance="translate-y-6">
                        <span className="text-[#800A15] text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                            ADMISIÓN
                        </span>
                    </ScrollReveal>
                    <ScrollReveal distance="translate-y-6" delay={150}>
                        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#08111F] leading-[1.05] tracking-tight font-sans">
                            Tu camino a COLSIH
                        </h2>
                    </ScrollReveal>
                </div>

                {/* Contenedor relativo con los pasos y la capa gris transparente "PRÓXIMAMENTE INSCRIPCIONES ONLINE" */}
                <div className="relative rounded-3xl">
                    
                    {/* Tarjetas de pasos al fondo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div 
                                key={index}
                                className={`h-full border border-slate-200/60 border-t-[3px] ${step.color} p-8 rounded-3xl bg-white shadow-xs opacity-75 flex flex-col justify-between text-left`}
                            >
                                <div className="space-y-6">
                                    <span className="block text-4xl font-light text-slate-300 font-sans tracking-tighter">
                                        {step.num}
                                    </span>
                                    <div className="space-y-2">
                                        <h3 className="font-extrabold text-[18px] text-[#08111F]">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm font-semibold text-slate-500 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Botones al fondo */}
                    <div className="pt-8 text-left opacity-60 flex flex-col sm:flex-row items-center gap-6">
                        <span
                            className="inline-flex items-center justify-center bg-[#800A15] text-white font-extrabold text-xs sm:text-sm px-8 py-4.5 rounded-xl shadow-sm cursor-not-allowed"
                        >
                            Iniciar inscripción online
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#08111F] uppercase tracking-wider">
                            Ver costos y requisitos →
                        </span>
                    </div>

                    {/* CAPA GRIS TRANSPARENTE ENCIMA CON EL LETRERO MINIMALISTA EN VINOTINTO */}
                    <div className="absolute inset-0 -m-3 bg-slate-900/65 backdrop-blur-md rounded-3xl z-30 flex flex-col items-center justify-center p-6 text-center shadow-2xl border border-white/10">
                        <div className="bg-[#08111F]/90 border border-[#800A15]/40 p-8 sm:p-10 rounded-3xl shadow-2xl max-w-xl space-y-5 backdrop-blur-lg transform hover:scale-[1.01] transition-transform">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#800A15] text-white text-xs font-black tracking-widest uppercase shadow-md">
                                <Sparkles className="w-3.5 h-3.5 text-white" />
                                PRÓXIMAMENTE INSCRIPCIONES ONLINE
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight font-sans">
                                Proceso de Inscripción 2027
                            </h3>
                            <p className="text-xs sm:text-sm font-semibold text-slate-300 leading-relaxed font-sans max-w-md mx-auto">
                                La plataforma digital de admisiones se habilitará próximamente para la recepción de solicitudes. Revisa los requisitos de inscripción institucionales.
                            </p>
                            <div className="pt-2">
                                <Link 
                                    href="/admisiones" 
                                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#800A15] hover:bg-[#9c0d1b] text-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-xl"
                                >
                                    Ver Requisitos de Admisión
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
