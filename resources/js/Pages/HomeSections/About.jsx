import { Link } from '@inertiajs/react';
import ScrollReveal from './ScrollReveal';

export default function About() {
    const links = [
        {
            num: "01",
            title: "Reseña Histórica",
            desc: "Nuestra trayectoria y el inicio de labores desde el 6 de febrero de 1989.",
            href: "/nosotros/historia"
        },
        {
            num: "02",
            title: "Direccionamiento Estratégico",
            desc: "Nuestra visión proyectada al 2028 y la misión de educar líderes.",
            href: "/nosotros/mision-vision"
        },
        {
            num: "03",
            title: "Valores Salesianos",
            desc: "La vivencia de la Fe, la Justicia, la Ciencia y el Respeto en nuestra comunidad.",
            href: "/nosotros/valores"
        }
    ];

    return (
        <section className="relative py-16 lg:py-32 bg-white overflow-hidden select-none border-b border-slate-100 w-full">
            <div className="max-w-[1680px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[120px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    
                    {/* Left Column: Image with offset line frame */}
                    <div className="relative flex justify-center">
                        <ScrollReveal distance="translate-y-12" className="relative w-full max-w-[540px]">
                            {/* EST 1989 badge overlay */}
                            <div className="absolute top-6 left-6 bg-[#08111F] text-white text-[11px] font-extrabold tracking-[2px] px-4 py-2 rounded-md z-20 shadow-sm uppercase font-sans">
                                EST. 1989
                            </div>

                            {/* Minimal background border outline frame offset */}
                            <div className="absolute inset-4 translate-x-4 translate-y-4 border border-[#003C8F]/20 rounded-2xl -z-10"></div>

                            {/* Main Image Container */}
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                                <img 
                                    src="/Estudiantes COLSIH.png" 
                                    alt="Estudiantes COLSIH" 
                                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-103"
                                />
                                <div className="absolute inset-0 bg-slate-950/5 pointer-events-none"></div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right Column: Information & Horizontal Row Navigation */}
                    <div className="space-y-8 lg:space-y-12 text-left w-full min-w-0">
                        <div className="space-y-4">
                            <ScrollReveal distance="translate-y-6">
                                <span className="text-[#800A15] text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                                    FILOSOFÍA INSTITUCIONAL
                                </span>
                            </ScrollReveal>

                            <ScrollReveal distance="translate-y-6" delay={150} className="space-y-6">
                                <h2 className="text-3xl sm:text-4xl lg:text-[56px] font-black text-[#08111F] leading-[1.05] tracking-tight font-sans">
                                    Nuestra Identidad
                                </h2>
                                <p className="text-[15px] sm:text-[17px] text-slate-500 font-semibold leading-relaxed">
                                    El Colegio Santa Isabel de Hungría de Floridablanca es una institución educativa arquidiocesana de carácter católico y privado, administrada por la Comunidad de Hijas de María Auxiliadora. Formamos de manera integral bajo la pedagogía del <strong>Sistema Preventivo Salesiano</strong> desde los pilares de Razón, Religión y Amor.
                                </p>
                            </ScrollReveal>
                        </div>

                        {/* Flat divided rows (Stripe/Editorial style) */}
                        <ScrollReveal distance="translate-y-8" delay={300} className="border-t border-slate-100 divide-y divide-slate-100">
                            {links.map((link) => (
                                <Link 
                                    key={link.num} 
                                    href={link.href} 
                                    className="group flex items-center justify-between py-5 sm:py-6 transition-all duration-300 cursor-pointer focus:outline-none"
                                >
                                    <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                                        <span className="text-sm font-extrabold text-[#003C8F] tracking-wider font-sans shrink-0">
                                            {link.num}
                                        </span>
                                        <div className="space-y-1 min-w-0">
                                            <h4 className="font-extrabold text-[16px] sm:text-[18px] text-[#08111F] group-hover:text-[#003C8F] transition-colors duration-300">
                                                {link.title}
                                            </h4>
                                            <p className="text-sm font-semibold text-slate-400 leading-normal line-clamp-2">
                                                {link.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-slate-300 group-hover:text-[#800A15] group-hover:translate-x-1.5 transition-all duration-300 shrink-0 ml-3">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </ScrollReveal>

                        {/* Direct detailed Nosotros link button */}
                        <ScrollReveal distance="translate-y-6" delay={400}>
                            <Link
                                href="/nosotros"
                                className="inline-flex items-center gap-2 bg-[#08111F] hover:bg-[#003C8F] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                            >
                                Conocer más
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </Link>
                        </ScrollReveal>

                    </div>
                </div>
            </div>
        </section>
    );
}
