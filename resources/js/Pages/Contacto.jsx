import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from './HomeSections/ScrollReveal';
import { Briefcase, Phone, Mail, Award } from 'lucide-react';

export default function Contacto() {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: '',
    });

    // Same administrative contact card records
    const administracion = [
        { area: 'Rectoría', encargado: 'Sor María Eugenia', cargo: 'Rectora', tel: '(601) 123 4567', email: 'rectoria@santaisabel.edu.co' },
        { area: 'Contabilidad', encargado: 'Paola Andrea Silva', cargo: 'Contadora', tel: '(601) 123 4568', email: 'contabilidad@santaisabel.edu.co' },
        { area: 'Secretaría', encargado: 'Carolina Martínez', cargo: 'Secretaria', tel: '(601) 123 4569', email: 'secretaria@santaisabel.edu.co' }
    ];

    function handleSubmit(e) {
        e.preventDefault();
        post('/contacto', { onSuccess: () => reset() });
    }

    return (
        <AppLayout>
            <Head title="Contáctanos | COLSIH" />

            {/* 1. HERO SECTION (Dark theme matching brand style) */}
            <section className="relative pt-36 pb-32 md:pt-44 md:pb-40 bg-[#08111F] overflow-hidden select-none">
                
                {/* Glowing light blobs */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#003C8F]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#800A15]/8 rounded-full blur-[120px] pointer-events-none z-0"></div>

                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-10 text-left">
                    <div className="max-w-3xl space-y-6">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#800A15] text-xs md:text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                                CANALES OFICIALES
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black text-white leading-[1.05] tracking-tight font-sans">
                                Ponte en contacto
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-lg md:text-[20px] font-medium text-slate-300 leading-relaxed max-w-2xl font-sans">
                                Estamos a tu disposición para atender tus consultas académicas, administrativas o sugerencias sobre el proceso formativo.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Bottom Wave Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                    <svg className="relative block w-full h-[50px] md:h-[90px]" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path d="M0,100 C380,10 760,90 1080,30 C1200,10 1320,20 1440,60 L1440,100 L0,100 Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            {/* 2. CONTACT LAYOUT (Two-column grid) */}
            <section className="relative py-24 md:py-32 bg-white overflow-hidden select-none">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                        
                        {/* LEFT COLUMN: Contact Information & Interactive Map */}
                        <div className="col-span-12 lg:col-span-5 space-y-8 text-left">
                            
                            <div className="space-y-4">
                                <ScrollReveal distance="translate-y-6">
                                    <span className="text-[#003C8F] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                        UBICACIÓN
                                    </span>
                                </ScrollReveal>
                                <ScrollReveal distance="translate-y-6" delay={150}>
                                    <h2 className="text-2xl sm:text-3xl font-black text-[#08111F] leading-tight font-sans">
                                        Atención y Ubicación
                                    </h2>
                                </ScrollReveal>
                            </div>

                            {/* Contact info cards */}
                            <div className="space-y-4 pt-2">
                                <ScrollReveal distance="translate-y-6" delay={250}>
                                    <div className="p-6 border border-slate-100 bg-slate-50/50 rounded-2xl space-y-2">
                                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#003C8F] font-sans">Dirección</span>
                                        <p className="text-sm font-semibold text-slate-600 font-sans leading-relaxed">
                                            Calle 13 # 13-30 Barrio Villabel, Floridablanca, Santander
                                        </p>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal distance="translate-y-6" delay={350}>
                                    <div className="p-6 border border-slate-100 bg-slate-50/50 rounded-2xl space-y-2">
                                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#800A15] font-sans">Correo electrónico</span>
                                        <p className="text-sm font-semibold text-slate-600 font-sans leading-relaxed">
                                            santaisabeldehungria@hotmail.com
                                        </p>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal distance="translate-y-6" delay={450}>
                                    <div className="p-6 border border-slate-100 bg-slate-50/50 rounded-2xl space-y-2">
                                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#003C8F] font-sans">Horario de atención</span>
                                        <p className="text-sm font-semibold text-slate-600 font-sans leading-relaxed">
                                            Lunes a viernes, 6:30 A.M. - 2:00 P.M. (Jornada Única)
                                        </p>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Working Interactive Google Maps */}
                            <ScrollReveal distance="translate-y-6" delay={550} className="w-full">
                                <div className="border border-slate-200/60 p-2 bg-white rounded-3xl overflow-hidden shadow-sm">
                                    <iframe 
                                        src="https://maps.google.com/maps?q=Calle%2013%20%23%2013-30,%20Floridablanca,%20Santander,%20Colombia&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                                        width="100%" 
                                        height="320" 
                                        style={{ border: 0 }} 
                                        className="rounded-2xl saturate-[0.8] hover:saturate-[1] transition-all duration-300 pointer-events-auto" 
                                        allowFullScreen={true}
                                    />
                                </div>
                            </ScrollReveal>

                        </div>

                        {/* RIGHT COLUMN: Contact Form */}
                        <div className="col-span-12 lg:col-span-7 text-left">
                            
                            <ScrollReveal distance="translate-y-6" className="p-8 md:p-10 border border-slate-100 bg-slate-50/50 rounded-3xl space-y-8 h-full">
                                <div className="space-y-3">
                                    <h2 className="text-2xl font-black text-[#08111F] font-sans">
                                        Envíanos un mensaje
                                    </h2>
                                    <p className="text-xs font-semibold text-slate-500 font-sans">
                                        Los campos marcados con (*) son requeridos obligatoriamente.
                                    </p>
                                </div>

                                {wasSuccessful && (
                                    <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl text-xs font-bold font-sans" role="alert">
                                        Tu mensaje fue enviado correctamente. Te responderemos pronto.
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="nombre" className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 font-sans">Nombre completo *</label>
                                            <input
                                                id="nombre"
                                                type="text"
                                                value={data.nombre}
                                                onChange={(e) => setData('nombre', e.target.value)}
                                                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-[#08111F] focus:outline-none focus:ring-2 focus:ring-[#003C8F] focus:border-transparent transition-all duration-300 font-sans"
                                                required
                                            />
                                            {errors.nombre && <span className="block text-xs font-bold text-red-500 font-sans" role="alert">{errors.nombre}</span>}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 font-sans">Correo electrónico *</label>
                                            <input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-[#08111F] focus:outline-none focus:ring-2 focus:ring-[#003C8F] focus:border-transparent transition-all duration-300 font-sans"
                                                required
                                            />
                                            {errors.email && <span className="block text-xs font-bold text-red-500 font-sans" role="alert">{errors.email}</span>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="telefono" className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 font-sans">Teléfono (opcional)</label>
                                            <input
                                                id="telefono"
                                                type="tel"
                                                value={data.telefono}
                                                onChange={(e) => setData('telefono', e.target.value)}
                                                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-[#08111F] focus:outline-none focus:ring-2 focus:ring-[#003C8F] focus:border-transparent transition-all duration-300 font-sans"
                                            />
                                            {errors.telefono && <span className="block text-xs font-bold text-red-500 font-sans" role="alert">{errors.telefono}</span>}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="asunto" className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 font-sans">Asunto *</label>
                                            <input
                                                id="asunto"
                                                type="text"
                                                value={data.asunto}
                                                onChange={(e) => setData('asunto', e.target.value)}
                                                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-[#08111F] focus:outline-none focus:ring-2 focus:ring-[#003C8F] focus:border-transparent transition-all duration-300 font-sans"
                                                required
                                            />
                                            {errors.asunto && <span className="block text-xs font-bold text-red-500 font-sans" role="alert">{errors.asunto}</span>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="mensaje" className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 font-sans">Mensaje *</label>
                                        <textarea
                                            id="mensaje"
                                            rows={5}
                                            value={data.mensaje}
                                            onChange={(e) => setData('mensaje', e.target.value)}
                                            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-[#08111F] focus:outline-none focus:ring-2 focus:ring-[#003C8F] focus:border-transparent transition-all duration-300 font-sans"
                                            required
                                        />
                                        {errors.mensaje && <span className="block text-xs font-bold text-red-500 font-sans" role="alert">{errors.mensaje}</span>}
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full py-4 bg-[#003C8F] hover:bg-[#08111F] disabled:bg-slate-300 text-white font-extrabold text-xs tracking-wider uppercase rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-sans cursor-pointer flex justify-center items-center gap-2"
                                    >
                                        {processing ? (
                                            <>
                                                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                                Enviando…
                                            </>
                                        ) : 'Enviar mensaje'}
                                    </button>
                                </form>
                            </ScrollReveal>

                        </div>

                    </div>
                </div>
            </section>

            {/* 3. ADMINISTRACIÓN CONTACT CARDS (Placed at the very bottom as requested) */}
            <section className="relative py-24 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800/80 overflow-hidden select-none text-left">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-12">
                    
                    {/* Section Header */}
                    <div className="flex items-center gap-3.5 border-b border-slate-200/60 dark:border-slate-800 pb-4 max-w-[1240px] mx-auto">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
                            <Briefcase className="w-5.5 h-5.5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight font-sans">
                                Contactos Administrativos
                            </h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5 font-sans">
                                Canales de comunicación directa con el personal de oficina
                            </p>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch max-w-[1240px] mx-auto">
                        {administracion.map((item, idx) => {
                            const isVino = idx % 2 === 0;
                            const borderClass = isVino ? 'border-l-4 border-l-[#800A15]' : 'border-l-4 border-l-[#003C8F]';
                            const badgeBg = isVino ? 'bg-[#800A15]/10 text-[#800A15]' : 'bg-[#003C8F]/10 text-[#003C8F]';

                            return (
                                <ScrollReveal key={idx} distance="translate-y-6" delay={idx * 100}>
                                    <div 
                                        className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden h-full ${borderClass}`}
                                    >
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-lg font-black text-slate-800 dark:text-white font-sans">
                                                    {item.area}
                                                </h4>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${badgeBg}`}>
                                                    <Briefcase className="w-4 h-4" />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight font-sans">
                                                    {item.encargado}
                                                </p>
                                                <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-sans">
                                                    {item.cargo}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-left">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans">
                                                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                {item.tel}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 break-all font-sans">
                                                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                {item.email}
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}

                        {/* Elegant banner card (Column 4) */}
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <div 
                                className="bg-gradient-to-tr from-blue-500/10 to-indigo-500/5 dark:from-blue-950/20 dark:to-transparent border border-blue-100/50 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-center gap-4 relative overflow-hidden text-left h-full"
                            >
                                {/* Shield background design vector */}
                                <div className="absolute top-1/2 -right-8 -translate-y-1/2 opacity-25 text-blue-500 pointer-events-none">
                                    <Award className="w-32 h-32" />
                                </div>

                                <div className="space-y-3 relative z-10">
                                    <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm font-bold leading-relaxed font-sans">
                                        Cada área trabaja con compromiso y dedicación para brindar una educación de calidad.
                                    </p>
                                    <div className="w-10 h-[3px] bg-[#800A15] rounded-full" />
                                </div>
                            </div>
                        </ScrollReveal>

                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
