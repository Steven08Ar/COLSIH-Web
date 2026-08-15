import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';
import { Construction, Sparkles, Heart, Users, ShieldCheck, Sun, Mail, Phone, Flame } from 'lucide-react';

export default function Mjs() {
    useEffect(() => {
        function setFavicon(href) {
            document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());
            const link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/svg+xml';
            link.href = href + '?v=' + Date.now();
            document.head.appendChild(link);
        }
        setFavicon('/marca/logo-mjs.svg');
        return () => setFavicon('/marca/logo-colsih.svg');
    }, []);

    const groups = [
        {
            num: "01",
            name: "Líderes Salesianos",
            tagline: "Protagonismo y animación",
            description: "Formación integral en liderazgo cristiano y salesiano. Nuestros jóvenes se capacitan para animar campamentos, dirigir dinámicas grupales y ser motores de cambio alegre en la institución.",
            color: "border-t-[#001659]",
            glowColor: "hover:border-[#001659]/20 hover:shadow-[0_20px_50px_rgba(0,22,89,0.03)]"
        },
        {
            num: "02",
            name: "Servidores del Altar (Acólitos)",
            tagline: "Liturgia y espiritualidad",
            description: "Jóvenes comprometidos con el servicio litúrgico del altar. Fomentan la oración comunitaria, la solemnidad en las celebraciones eucarísticas institucionales y el crecimiento espiritual.",
            color: "border-t-[#800A15]",
            glowColor: "hover:border-[#800A15]/20 hover:shadow-[0_20px_50px_rgba(128,10,21,0.03)]"
        },
        {
            num: "03",
            name: "Infancia Misionera",
            tagline: "Semillero de amor al prójimo",
            description: "Grupo asociativo para los más pequeños del colegio. Aprenden a compartir la fe, a ser solidarios con los más necesitados y a vivir el espíritu misionero salesiano.",
            color: "border-t-[#001659]",
            glowColor: "hover:border-[#001659]/20 hover:shadow-[0_20px_50px_rgba(0,22,89,0.03)]"
        },
        {
            num: "04",
            name: "Gestores de Convivencia y Ecología",
            tagline: "Constructores de paz (Laudato Si')",
            description: "Inspirados en la ecología integral y la cultura del encuentro, este grupo promueve la mediación escolar de conflictos, el cuidado de la casa común y campañas de reciclaje activo.",
            color: "border-t-[#800A15]",
            glowColor: "hover:border-[#800A15]/20 hover:shadow-[0_20px_50px_rgba(128,10,21,0.03)]"
        }
    ];

    return (
        <AppLayout>
            <Head title="Movimiento Juvenil Salesiano (MJS) | COLSIH" />

            {/* Hero MJS Header Block */}
            <section className="relative min-h-[500px] flex items-center pt-40 pb-20 bg-[#08111F] text-left select-none overflow-hidden border-b border-white/5 font-sans">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(0,60,143,0.15)_0%,transparent_50%)]" />
                <div className="max-w-[1680px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[120px] relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    <div className="col-span-full lg:col-span-8 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
                        
                        <ScrollReveal distance="translate-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#800A15] text-white text-xs font-black tracking-widest uppercase mb-1 shadow-lg">
                                <Flame className="w-4 h-4 text-amber-300" />
                                MJS COLOMBIA · ESPIRITUALIDAD JUVENIL SALESIANA
                            </div>
                        </ScrollReveal>

                        <ScrollReveal distance="translate-y-6" delay={100}>
                            <span className="text-[#800A15] text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                                PASTORAL JUVENIL SALESIANA
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h1 className="text-3xl sm:text-4xl lg:text-[64px] font-black text-white leading-[1.05] tracking-tight font-sans">
                                Movimiento Juvenil Salesiano
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-base sm:text-lg lg:text-xl font-medium text-slate-300 leading-relaxed max-w-3xl">
                                El MJS Colombia es el espacio donde los jóvenes de COLSIH viven el protagonismo, la fe y la alegría salesiana. Formamos "buenos cristianos y honestos ciudadanos" mediante grupos de liderazgo, arte, espiritualidad y servicio social.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="col-span-full lg:col-span-4 flex justify-center lg:justify-end">
                        <ScrollReveal distance="scale-90" delay={450}>
                            <div className="w-48 h-48 md:w-56 md:h-56 bg-white/5 rounded-full flex items-center justify-center p-6 border border-white/10 backdrop-blur-md relative">
                                <img 
                                    src="/marca/logo-mjs.svg" 
                                    alt="MJS Colombia Logo" 
                                    className="w-full h-full object-contain animate-fadeIn"
                                />
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </section>

            {/* Aviso Destacado */}
            <section className="bg-[#800A15]/10 border-b border-[#800A15]/20 py-4 px-6 font-sans">
                <div className="max-w-[1680px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[120px] flex items-center justify-center gap-3 text-center">
                    <Sparkles className="w-5 h-5 text-[#800A15] shrink-0" />
                    <p className="text-xs sm:text-sm font-bold text-[#800A15]">
                        Formamos parte de la red nacional del Movimiento Juvenil Salesiano. ¡Te invitamos a integrarte a los encuentros semanales en el patio escolar!
                    </p>
                </div>
            </section>

            {/* MJS Groups section */}
            <section className="relative py-24 lg:py-32 bg-white overflow-hidden select-none border-b border-slate-100 font-sans">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-20">
                    
                    {/* Header */}
                    <div className="max-w-2xl text-left space-y-4">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#003C8F] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                GRUPOS ASOCIATIVOS
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Líneas de acción y experiencia MJS
                            </h2>
                        </ScrollReveal>
                    </div>

                    {/* Cards grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {groups.map((item, idx) => (
                            <ScrollReveal key={idx} distance="translate-y-8" delay={idx * 150} className="h-full">
                                <div className={`group border border-slate-100 ${item.color} border-t-4 p-8 sm:p-10 rounded-3xl bg-slate-50/50 hover:bg-white ${item.glowColor} transition-all duration-500 flex flex-col justify-between h-full text-left`}>
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-3xl font-black text-[#08111F]/20 group-hover:text-[#08111F]/40 transition-colors font-sans">
                                                {item.num}
                                            </span>
                                            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#800A15] bg-[#800A15]/10 px-3 py-1 rounded-full font-sans">
                                                {item.tagline}
                                            </span>
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-xl sm:text-2xl font-black text-[#08111F] font-sans group-hover:text-[#003C8F] transition-colors">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm font-semibold text-slate-500 leading-relaxed font-sans">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                </div>
            </section>

            {/* SECCIÓN CONTACTO MJS */}
            <section className="py-20 md:py-28 bg-[#FAFCFF] font-sans select-none">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <ScrollReveal distance="translate-y-6">
                        <div className="bg-gradient-to-r from-[#001E50] via-[#003C8F] to-[#800A15] rounded-[36px] p-8 md:p-14 text-white shadow-2xl space-y-8 relative overflow-hidden">
                            <div className="space-y-3 relative z-10 text-center md:text-left">
                                <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block">VIVE LA ESPIRITUALIDAD SALESIANA</span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">¿Quieres ser parte del MJS?</h2>
                                <p className="text-blue-100 text-sm sm:text-base font-medium max-w-xl">
                                    Pregunta por nuestros horarios de grupo asociativo en la Coordinación de Pastoral o escríbenos directamente.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                <div className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold uppercase text-amber-300 block">Correo Institucional MJS</span>
                                        <a href="mailto:pastoral@colsih.edu.co" className="text-sm font-extrabold hover:underline font-sans break-all">pastoral@colsih.edu.co</a>
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold uppercase text-amber-300 block">Coordinación de Pastoral</span>
                                        <span className="text-sm font-extrabold font-sans">Erika Tatiana Delgadillo Avella</span>
                                        <span className="block text-xs font-medium text-blue-100">(607) 637 1237</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </AppLayout>
    );
}
