import { Link } from '@inertiajs/react';
import ScrollReveal from './ScrollReveal';

export default function Admissions() {
    const steps = [
        {
            num: "01",
            title: "Inscripción Online",
            description: "Diligencia el formulario digital de admisión y carga los documentos del estudiante de forma rápida.",
            tip: "Ten a la mano el Registro Civil del aspirante y los certificados de notas previos en formato PDF.",
            color: "border-t-[#0057D9]",
            glowColor: "hover:border-[#0057D9]/20 hover:shadow-[0_20px_50px_rgba(0,87,217,0.03)]"
        },
        {
            num: "02",
            title: "Entrevista y Pruebas",
            description: "Presenta las pruebas básicas y asiste a la entrevista psicológica virtual o presencial.",
            tip: "Las pruebas evalúan lógica y comprensión lectora básica. La entrevista se realiza junto a los padres.",
            color: "border-t-[#E31C23]",
            glowColor: "hover:border-[#E31C23]/20 hover:shadow-[0_20px_50px_rgba(227,28,35,0.03)]"
        },
        {
            num: "03",
            title: "Resultados",
            description: "Revisa el estado de la postulación en nuestra plataforma y recibe la confirmación vía correo.",
            tip: "Los resultados se notifican formalmente en un plazo de 3 a 5 días hábiles tras concluir las pruebas.",
            color: "border-t-[#0057D9]",
            glowColor: "hover:border-[#0057D9]/20 hover:shadow-[0_20px_50px_rgba(0,87,217,0.03)]"
        },
        {
            num: "04",
            title: "Matrícula Financiera",
            description: "Efectúa el pago del cupo y firma el contrato de matrícula digitalmente para asegurar la vacante.",
            tip: "Puedes realizar el pago de matrícula cómodamente por PSE o descargar el recibo para pago en ventanilla bancaria.",
            color: "border-t-[#E31C23]",
            glowColor: "hover:border-[#E31C23]/20 hover:shadow-[0_20px_50px_rgba(227,28,35,0.03)]"
        }
    ];

    return (
        <section className="relative py-24 lg:py-32 bg-[#F8F9FB] overflow-hidden select-none border-b border-slate-100">
            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-20">
                
                {/* Section Header */}
                <div className="max-w-2xl text-left space-y-4">
                    <ScrollReveal distance="translate-y-6">
                        <span className="text-[#E31C23] text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                            ADMISIÓN
                        </span>
                    </ScrollReveal>
                    <ScrollReveal distance="translate-y-6" delay={150}>
                        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#08111F] leading-[1.05] tracking-tight font-sans">
                            Tu camino a COLSIH
                        </h2>
                    </ScrollReveal>
                </div>

                {/* Horizontal Step Cards Deck */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <ScrollReveal 
                            key={index}
                            distance="translate-y-8"
                            delay={index * 100}
                            className="h-full"
                        >
                            <div className={`h-full border border-slate-100/80 border-t-[3px] ${step.color} p-8 rounded-3xl bg-white transition-all duration-500 relative flex flex-col justify-between hover:-translate-y-2 group overflow-hidden ${step.glowColor}`}>
                                <div className="space-y-6 text-left">
                                    <span className="block text-4xl font-light text-slate-200 group-hover:text-[#0057D9] transition-colors duration-300 font-sans tracking-tighter">
                                        {step.num}
                                    </span>
                                    <div className="space-y-2">
                                        <h3 className="font-extrabold text-[18px] text-[#08111F] group-hover:text-[#0057D9] transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm font-semibold text-slate-500 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Expanding Tip Drawer on Hover */}
                                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:pt-4 transition-all duration-[600ms] ease-in-out overflow-hidden border-t border-slate-50 mt-0 group-hover:mt-4 text-left">
                                    <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">
                                        CONSEJO DE ADMISIÓN
                                    </span>
                                    <p className="text-[13px] font-semibold text-[#E31C23] leading-relaxed">
                                        {step.tip}
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Bottom CTA block */}
                <ScrollReveal distance="translate-y-6" delay={300} className="pt-8 text-left">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-6">
                        <Link 
                            href="/inscripcion" 
                            className="inline-flex items-center justify-center bg-[#E31C23] hover:bg-[#c4181e] text-white font-extrabold text-sm px-8 py-4.5 rounded-xl shadow-sm active:scale-[0.98] transition-all cursor-pointer"
                        >
                            Iniciar inscripción online
                        </Link>
                        <Link 
                            href="/admisiones" 
                            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#08111F] hover:text-[#E31C23] uppercase tracking-wider transition-colors"
                        >
                            Ver costos y requisitos
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
}
