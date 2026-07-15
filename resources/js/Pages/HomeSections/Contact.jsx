import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
    const [form, setForm] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate premium form submission
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setForm({ nombre: '', email: '', telefono: '', mensaje: '' });
        }, 3000);
    };

    return (
        <section className="relative py-28 lg:py-36 bg-white overflow-hidden select-none">
            {/* Background Blob decoration */}
            <div className="absolute top-1/3 left-0 w-[450px] h-[450px] rounded-full bg-[#E31C23]/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                    
                    {/* Left Column: Contact info (5 columns) */}
                    <div className="col-span-12 lg:col-span-5 space-y-12 text-left">
                        <div className="space-y-4">
                            <ScrollReveal distance="translate-y-8" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0057D9]/10 text-[#0057D9] text-[13px] font-bold tracking-widest uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0057D9]"></span>
                                Contacto
                            </ScrollReveal>
                            <ScrollReveal distance="translate-y-8" delay={150}>
                                <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                    Conéctate con nosotros
                                </h2>
                            </ScrollReveal>
                        </div>

                        <ScrollReveal distance="translate-y-12" delay={300} className="space-y-8">
                            <p className="text-[17px] text-slate-500 font-semibold leading-relaxed">
                                ¿Tienes alguna pregunta sobre admisiones, pensiones o proyectos académicos? Nuestro equipo está listo para brindarte el apoyo necesario.
                            </p>

                            {/* Contact items */}
                            <div className="space-y-6">
                                {/* Address */}
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-slate-50 text-[#0057D9] flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Dirección</span>
                                        <span className="block text-base font-extrabold text-[#08111F] mt-0.5">Cl. 39a Sur #3-28, Bogotá, Colombia</span>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-slate-50 text-[#E31C23] flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Teléfono</span>
                                        <span className="block text-base font-extrabold text-[#08111F] mt-0.5">+57 (601) 203-8555</span>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-slate-50 text-[#0057D9] flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Correo Electrónico</span>
                                        <span className="block text-base font-extrabold text-[#08111F] mt-0.5">contacto@colsih.edu.co</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right Column: Modern Contact Form (7 columns) */}
                    <div className="col-span-12 lg:col-span-7">
                        <ScrollReveal distance="translate-y-16" delay={450} className="w-full max-w-xl mx-auto lg:mr-0 bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 shadow-xs">
                            {submitted ? (
                                <div className="min-h-[300px] flex flex-col justify-center items-center text-center space-y-4 animate-fadeIn">
                                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-md animate-bounce">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    </div>
                                    <h3 className="font-extrabold text-[22px] text-[#08111F]">
                                        ¡Mensaje Enviado!
                                    </h3>
                                    <p className="text-sm font-semibold text-slate-500 max-w-sm">
                                        Gracias por contactarnos. Nuestro equipo de atención revisará tu solicitud y se pondrá en contacto pronto.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h3 className="text-xl font-extrabold text-[#08111F] text-left">
                                        Envíanos un mensaje
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Nombre */}
                                        <div className="flex flex-col text-left space-y-2">
                                            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Nombre completo</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={form.nombre}
                                                onChange={(e) => setForm({...form, nombre: e.target.value})}
                                                className="w-full px-5 py-4 border border-slate-200 bg-white rounded-2xl text-sm font-semibold focus:outline-none focus:border-[#0057D9] focus:ring-1 focus:ring-[#0057D9] transition-all"
                                                placeholder="Ej. Juan Pérez"
                                            />
                                        </div>

                                        {/* Telefono */}
                                        <div className="flex flex-col text-left space-y-2">
                                            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Teléfono</label>
                                            <input 
                                                type="tel" 
                                                required
                                                value={form.telefono}
                                                onChange={(e) => setForm({...form, telefono: e.target.value})}
                                                className="w-full px-5 py-4 border border-slate-200 bg-white rounded-2xl text-sm font-semibold focus:outline-none focus:border-[#0057D9] focus:ring-1 focus:ring-[#0057D9] transition-all"
                                                placeholder="Ej. 300 123 4567"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex flex-col text-left space-y-2">
                                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Correo electrónico</label>
                                        <input 
                                            type="email" 
                                            required
                                            value={form.email}
                                            onChange={(e) => setForm({...form, email: e.target.value})}
                                            className="w-full px-5 py-4 border border-slate-200 bg-white rounded-2xl text-sm font-semibold focus:outline-none focus:border-[#0057D9] focus:ring-1 focus:ring-[#0057D9] transition-all"
                                            placeholder="juan.perez@ejemplo.com"
                                        />
                                    </div>

                                    {/* Mensaje */}
                                    <div className="flex flex-col text-left space-y-2">
                                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Mensaje</label>
                                        <textarea 
                                            required
                                            rows="4"
                                            value={form.mensaje}
                                            onChange={(e) => setForm({...form, mensaje: e.target.value})}
                                            className="w-full px-5 py-4 border border-slate-200 bg-white rounded-2xl text-sm font-semibold focus:outline-none focus:border-[#0057D9] focus:ring-1 focus:ring-[#0057D9] transition-all resize-none"
                                            placeholder="Escribe tu consulta aquí..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-2 text-left">
                                        <button 
                                            type="submit" 
                                            className="w-full inline-flex items-center justify-center bg-[#0057D9] hover:bg-[#004bb8] text-white font-extrabold text-sm px-8 py-4.5 rounded-full shadow-lg shadow-blue-700/10 active:scale-[0.98] transition-all cursor-pointer focus:outline-none"
                                        >
                                            Enviar mensaje
                                        </button>
                                    </div>
                                </form>
                            )}
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </section>
    );
}
