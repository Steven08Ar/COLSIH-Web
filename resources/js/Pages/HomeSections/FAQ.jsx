import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function FAQ() {
    const list = [
        {
            question: "¿Cuáles son los requisitos principales para la inscripción virtual?",
            answer: "Los documentos básicos incluyen el registro civil de nacimiento del aspirante, certificados de notas de los años anteriores, copia de los documentos de identidad de los padres o acudientes y la ficha de observador del colegio procedencia."
        },
        {
            question: "¿El colegio cuenta con servicio de transporte y alimentación escolar?",
            answer: "Sí, disponemos de rutas escolares seguras y certificadas que cubren las principales zonas de la ciudad. Asimismo, contamos con un servicio de restaurante escolar supervisado por nutricionistas, ofreciendo menús balanceados."
        },
        {
            question: "¿Qué convenios universitarios e idiomas ofrecen en el bachillerato?",
            answer: "Mantenemos alianzas estratégicas con universidades reconocidas para la articulación académica y orientación profesional. Nuestro plan de estudios incluye la intensificación del idioma inglés, preparando a los alumnos para exámenes internacionales."
        },
        {
            question: "¿Cómo funciona el proceso de pago y legalización de matrícula?",
            answer: "Una vez admitido el estudiante, recibirás las credenciales para acceder al portal de pagos PSE de la institución. Tras realizar la matrícula financiera, los contratos de matrícula se firman de manera electrónica desde tu cuenta familiar."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleIndex = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section className="relative py-28 lg:py-36 bg-[#F8F9FB] overflow-hidden select-none">
            {/* Background Blob decoration */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[#0057D9]/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-20">
                
                {/* Section Header */}
                <div className="max-w-2xl mx-auto text-center space-y-4">
                    <ScrollReveal distance="translate-y-8" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0057D9]/10 text-[#0057D9] text-[13px] font-bold tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0057D9]"></span>
                        Preguntas Frecuentes
                    </ScrollReveal>
                    <ScrollReveal distance="translate-y-8" delay={150}>
                        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                            Resolvemos tus dudas
                        </h2>
                    </ScrollReveal>
                </div>

                {/* FAQ Accordion List */}
                <ScrollReveal distance="translate-y-16" delay={300} className="max-w-3xl mx-auto space-y-4">
                    {list.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div 
                                key={index}
                                className="bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden transition-all duration-300"
                            >
                                {/* Accordion Header */}
                                <button
                                    onClick={() => toggleIndex(index)}
                                    className="w-full py-6 px-8 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                                >
                                    <span className="font-extrabold text-[16px] md:text-[18px] text-[#08111F] pr-4">
                                        {item.question}
                                    </span>
                                    {/* Chevron icon */}
                                    <span className={`w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center shrink-0 text-slate-400 transition-transform duration-300 ${
                                        isOpen ? 'rotate-180 border-[#E31C23]/20 text-[#E31C23] bg-red-50/20' : ''
                                    }`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </span>
                                </button>

                                {/* Accordion Content utilizing Grid-Rows auto transition */}
                                <div className={`grid transition-all duration-300 ease-in-out px-8 ${
                                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
                                }`}>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-semibold text-slate-500 leading-relaxed max-w-2xl border-t border-slate-50 pt-4">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollReveal>

            </div>
        </section>
    );
}
