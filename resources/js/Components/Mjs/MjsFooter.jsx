import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowUpRight, Heart, Sparkles, MapPin, Globe } from 'lucide-react';

export default function MjsFooter() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-[#05081E] text-white border-t border-white/10 select-none font-sans overflow-hidden">
            {/* Volumetric ambient background glow */}
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#920709]/20 blur-3xl pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-[#0B09A1]/20 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 relative z-10">
                
                {/* Top Row: Massive Brand Logo & Editorial Headline */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 border-b border-white/10">
                    <div>
                        <div className="mb-6">
                            <img 
                                src="/marca/logo-mjs.svg" 
                                alt="Logo MJS" 
                                className="h-16 sm:h-24 w-auto object-contain filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
                            />
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-['Poppins'] tracking-tight text-white uppercase leading-[0.95]">
                            ESTE LUGAR<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                                ES TU HOGAR.
                            </span>
                        </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <a
                            href="https://www.instagram.com/mjsbosco_floridablanca/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-white/20 shadow-lg group"
                        >
                            <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                            <span>Instagram MJS</span>
                        </a>

                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-white/20 shadow-lg"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Portal Colegio COLSIH</span>
                        </Link>

                        <button
                            onClick={scrollToTop}
                            className="w-12 h-12 rounded-full border border-white/20 hover:border-white flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all"
                            title="Volver arriba"
                        >
                            <ArrowUpRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* 4 Minimalist Editorial Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-white/10">
                    
                    {/* Col 01: Origen */}
                    <div className="space-y-4">
                        <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                            01 / CARISMA
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                            Inspirado en San Juan Bosco y Santa María Mazzarello. Formamos buenos cristianos y honestos ciudadanos a través de la pedagogía de la alegría, la razón y el cariño.
                        </p>
                    </div>

                    {/* Col 02: Floridablanca */}
                    <div className="space-y-4">
                        <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                            02 / FLORIDABLANCA
                        </div>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-light">
                            <li>Colegio Santa Isabel de Hungría</li>
                            <li>Calle 11 # 8-15, Casco Urbano</li>
                            <li>Sede Oficial y Casa Juvenil</li>
                            <li>Floridablanca · Santander</li>
                        </ul>
                    </div>

                    {/* Col 03: Espiritualidad Juvenil Salesiana */}
                    <div className="space-y-4">
                        <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                            03 / ESPIRITUALIDAD (EJS)
                        </div>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-light">
                            <li>Amistad sincera y alegría cotidiana</li>
                            <li>Pedagogía del Sistema Preventivo</li>
                            <li>Razón, Religión y Amor (Amorevolezza)</li>
                            <li>Presencia cercana y acompañamiento</li>
                            <li>Compromiso solidario con la vida</li>
                        </ul>
                    </div>

                    {/* Col 04: Red Global */}
                    <div className="space-y-4">
                        <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                            04 / SYM MUNDIAL
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                            Más de 1.2 millones de jóvenes en 130+ países. Conectados con las Inspectorías Salesianas de Colombia (SDB: COM y COB · FMA: CBC, CBN, CMM y CMA) y los Encuentros Mundiales en las JMJ.
                        </p>
                    </div>

                </div>

                {/* Bottom Bar: Clean Minimalist Line */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                    <p>
                        © {new Date().getFullYear()} Movimiento Juvenil Salesiano (MJS) · Floridablanca, Santander, Colombia.
                    </p>
                    <p className="flex items-center gap-2 text-slate-400">
                        <span>La santidad consiste en estar siempre alegres</span>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span>Don Bosco</span>
                    </p>
                </div>

                {/* Firma WEB Santiago Arias al final de todo en el MJS */}
                <div className="pt-6 pb-2 flex flex-col items-center justify-center text-center">
                    <img
                        src="/Firma%20WEB%20-%20Santiago%20Arias.svg"
                        alt="Firma WEB Santiago Arias"
                        className="h-16 sm:h-20 w-auto object-contain brightness-0 invert opacity-85 hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none"
                    />
                </div>

            </div>
        </footer>
    );
}
