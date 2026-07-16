import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from './HomeSections/ScrollReveal';

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
        setFavicon('/Logo-MJS.svg');
        return () => setFavicon('/Logo COLSIH.svg');
    }, []);
    const groups = [
        {
            num: "01",
            name: "Líderes Salesianos",
            tagline: "Protagonismo y animación",
            description: "Formación integral en liderazgo cristiano y salesiano. Nuestros jóvenes se capacitan para animar campamentos, dirigir dinámicas grupales y ser motores de cambio alegre en la institución.",
            color: "border-t-[#0057D9]",
            glowColor: "hover:border-[#0057D9]/20 hover:shadow-[0_20px_50px_rgba(0,87,217,0.03)]"
        },
        {
            num: "02",
            name: "Servidores del Altar (Acólitos)",
            tagline: "Liturgia y espiritualidad",
            description: "Jóvenes comprometidos con el servicio litúrgico del altar. Fomentan la oración comunitaria, la solemnidad en las celebraciones eucarísticas institucionales y el crecimiento espiritual.",
            color: "border-t-[#E31C23]",
            glowColor: "hover:border-[#E31C23]/20 hover:shadow-[0_20px_50px_rgba(227,28,35,0.03)]"
        },
        {
            num: "03",
            name: "Infancia Misionera",
            tagline: "Semillero de amor al prójimo",
            description: "Grupo asociativo para los más pequeños del colegio. Aprenden a compartir la fe, a ser solidarios con los más necesitados y a vivir el espíritu misionero salesiano.",
            color: "border-t-[#0057D9]",
            glowColor: "hover:border-[#0057D9]/20 hover:shadow-[0_20px_50px_rgba(0,87,217,0.03)]"
        },
        {
            num: "04",
            name: "Gestores de Convivencia y Ecología",
            tagline: "Constructores de paz (Laudato Si')",
            description: "Inspirados en la ecología integral y la cultura del encuentro, este grupo promueve la mediación escolar de conflictos, el cuidado de la casa común y campañas de reciclaje activo.",
            color: "border-t-[#E31C23]",
            glowColor: "hover:border-[#E31C23]/20 hover:shadow-[0_20px_50px_rgba(227,28,35,0.03)]"
        }
    ];

    return (
        <AppLayout>
            <Head title="Movimiento Juvenil Salesiano (MJS) | COLSIH" />

            {/* Hero MJS Header Block */}
            <section className="relative min-h-[500px] flex items-center pt-40 pb-20 bg-[#08111F] text-left select-none overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(0,87,217,0.15)_0%,transparent_50%)]"></div>
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-10 w-full grid grid-cols-12 gap-8 items-center">
                    
                    <div className="col-span-12 lg:col-span-8 space-y-6">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#E31C23] text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                                PASTORAL JUVENIL
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black text-white leading-[1.05] tracking-tight font-sans">
                                Movimiento Juvenil Salesiano
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-base sm:text-lg lg:text-xl font-medium text-slate-300 leading-relaxed max-w-3xl">
                                El MJS Colombia es el espacio donde los jóvenes de COLSIH viven el protagonismo, la fe y la alegría salesiana. Formamos "buenos cristianos y honestos ciudadanos" mediante grupos de liderazgo, arte, espiritualidad y servicio social.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
                        <ScrollReveal distance="scale-90" delay={450}>
                            <div className="w-48 h-48 md:w-56 md:h-56 bg-white/5 rounded-full flex items-center justify-center p-6 border border-white/10 backdrop-blur-md">
                                <img 
                                    src="/Logo-MJS.svg" 
                                    alt="MJS Colombia Logo" 
                                    className="w-full h-full object-contain animate-fadeIn"
                                />
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </section>

            {/* MJS Groups section */}
            <section className="relative py-24 lg:py-32 bg-white overflow-hidden select-none border-b border-slate-100">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-20">
                    
                    {/* Header */}
                    <div className="max-w-2xl text-left space-y-4">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#0057D9] text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                                GRUPOS ASOCIATIVOS
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Nuestras experiencias de vida asociativa
                            </h2>
                        </ScrollReveal>
                    </div>

                    {/* Groups Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {groups.map((group, index) => (
                            <ScrollReveal 
                                key={index}
                                distance="translate-y-8"
                                delay={index * 100}
                                className="h-full"
                            >
                                <div className={`h-full border border-slate-100 border-t-[3px] ${group.color} p-8 rounded-3xl bg-[#FAFAFA] transition-all duration-500 relative flex flex-col justify-between hover:-translate-y-2 group overflow-hidden ${group.glowColor}`}>
                                    <div className="space-y-6 text-left">
                                        <span className="block text-4xl font-light text-slate-300 group-hover:text-[#0057D9] transition-colors duration-300 font-sans tracking-tighter">
                                            {group.num}
                                        </span>
                                        <div className="space-y-2">
                                            <h3 className="font-extrabold text-[19px] text-[#08111F] group-hover:text-[#0057D9] transition-colors duration-300">
                                                {group.name}
                                            </h3>
                                            <p className="text-xs font-extrabold text-[#E31C23] tracking-widest uppercase">
                                                {group.tagline}
                                            </p>
                                            <p className="text-sm font-semibold text-slate-500 leading-relaxed pt-2">
                                                {group.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                </div>
            </section>
        </AppLayout>
    );
}
