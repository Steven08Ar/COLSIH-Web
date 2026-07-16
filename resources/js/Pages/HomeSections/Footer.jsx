import { Link, usePage } from '@inertiajs/react';
import ScrollReveal from './ScrollReveal';

export default function Footer() {
    const { url } = usePage();
    const isMjs = url === '/mjs';

    return (
        <footer className="relative bg-[#08111F] text-white overflow-hidden border-t border-white/5 select-none">
            {/* Soft background glow circles */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#E31C23]/5 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#0057D9]/5 blur-[120px] pointer-events-none"></div>

            {/* Large Animated Divider on top */}
            <div className="bg-gradient-to-r from-[#E31C23] via-[#0057D9] to-[#E31C23] h-[3px] w-full"></div>

            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] py-16 md:py-24 space-y-16">
                
                {/* Upper Footer: Branding & Columns */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
                    
                    {/* Brand Info (4 columns) */}
                    <div className="col-span-12 lg:col-span-4 space-y-6 text-left">
                        {isMjs ? (
                            <Link href="/mjs" className="flex items-center gap-3 group focus:outline-none shrink-0">
                                <img 
                                    src="/MJS-Colombia.png" 
                                    alt="Logo MJS Colombia" 
                                    className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                                />
                                <div className="flex flex-col leading-none text-white font-sans">
                                    <span className="text-[11px] tracking-widest uppercase opacity-60 font-semibold">Movimiento</span>
                                    <span className="text-[20px] font-black tracking-tight text-white mt-0.5">
                                        JUVENIL
                                    </span>
                                    <span className="text-[12px] tracking-wide font-medium opacity-80 mt-0.5">Salesiano</span>
                                </div>
                            </Link>
                        ) : (
                            <Link href="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
                                <img 
                                    src="/Logo COLSIH.svg" 
                                    alt="Logo COLSIH" 
                                    className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                                />
                                <div className="flex flex-col leading-none text-white font-sans">
                                    <span className="text-[11px] tracking-widest uppercase opacity-60 font-semibold">Colegio</span>
                                    <span className="text-[20px] font-black tracking-tight text-white mt-0.5">
                                        SANTA ISABEL
                                    </span>
                                    <span className="text-[12px] tracking-wide font-medium opacity-80 mt-0.5">de Hungría</span>
                                </div>
                            </Link>
                        )}
                        <p className="text-sm font-semibold text-slate-400 leading-relaxed max-w-sm">
                            {isMjs 
                                ? "Espacio asociativo de fe, alegría y protagonismo juvenil que acompaña el crecimiento integral y el liderazgo de la juventud en COLSIH."
                                : "Formando líderes integrales con fe, ciencia y justicia desde 1989, en Floridablanca, Santander, Colombia."
                            }
                        </p>
                        
                        {/* Social Icons */}
                        <div className="flex gap-4 pt-2">
                            {/* Facebook */}
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#0057D9] text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-xs">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                </svg>
                            </a>
                            {/* Instagram */}
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#E31C23] text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-xs">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Columns (4 columns for categories) */}
                    <div className="col-span-12 lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
                        {isMjs ? (
                            <>
                                {/* MJS groups */}
                                <div className="space-y-4 text-left">
                                    <h4 className="text-sm font-extrabold uppercase tracking-wider relative pb-2.5 text-white font-sans">
                                        Líneas MJS
                                        <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#E31C23] rounded-full" />
                                    </h4>
                                    <div className="flex flex-col gap-3 text-sm font-semibold text-slate-400">
                                        <a href="#" className="hover:text-white transition-colors">Líderes Salesianos</a>
                                        <a href="#" className="hover:text-white transition-colors">Servidores del Altar</a>
                                        <a href="#" className="hover:text-white transition-colors">Infancia Misionera</a>
                                        <a href="#" className="hover:text-white transition-colors">Gestores Ambientales</a>
                                    </div>
                                </div>

                                {/* Institutional MJS */}
                                <div className="space-y-4 text-left">
                                    <h4 className="text-sm font-extrabold uppercase tracking-wider relative pb-2.5 text-white font-sans">
                                        Navegación
                                        <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#0057D9] rounded-full" />
                                    </h4>
                                    <div className="flex flex-col gap-3 text-sm font-semibold text-slate-400">
                                        <Link href="/" className="hover:text-white transition-colors">Volver al Colegio</Link>
                                        <Link href="/oferta-academica" className="hover:text-white transition-colors">Oferta Académica</Link>
                                        <Link href="/noticias" className="hover:text-white transition-colors">Comunidad</Link>
                                        <Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Quick links */}
                                <div className="space-y-4 text-left">
                                    <h4 className="text-sm font-extrabold uppercase tracking-wider relative pb-2.5 text-white font-sans">
                                        Institución
                                        <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#E31C23] rounded-full" />
                                    </h4>
                                    <div className="flex flex-col gap-3 text-sm font-semibold text-slate-400">
                                        <Link href="/nosotros" className="hover:text-white transition-colors">Quiénes Somos</Link>
                                        <Link href="/nosotros/historia" className="hover:text-white transition-colors">Historia</Link>
                                        <Link href="/nosotros/mision-vision" className="hover:text-white transition-colors">Misión y Visión</Link>
                                        <Link href="/nosotros/valores" className="hover:text-white transition-colors">Valores</Link>
                                        <Link href="/nosotros/equipo" className="hover:text-white transition-colors">Nuestro Equipo</Link>
                                    </div>
                                </div>

                                {/* Academics */}
                                <div className="space-y-4 text-left">
                                    <h4 className="text-sm font-extrabold uppercase tracking-wider relative pb-2.5 text-white font-sans">
                                        Procesos
                                        <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#0057D9] rounded-full" />
                                    </h4>
                                    <div className="flex flex-col gap-3 text-sm font-semibold text-slate-400">
                                        <Link href="/oferta-academica" className="hover:text-white transition-colors">Oferta Académica</Link>
                                        <Link href="/admisiones" className="hover:text-white transition-colors">Admisiones</Link>
                                        <Link href="/inscripcion" className="hover:text-white transition-colors">Matrículas</Link>
                                        <Link href="/noticias" className="hover:text-white transition-colors">Noticias</Link>
                                        <Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Newsletter (3 columns) */}
                    <div className="col-span-12 lg:col-span-3 space-y-4 text-left">
                        <h4 className="text-sm font-extrabold uppercase tracking-wider relative pb-2.5 text-white font-sans">
                            {isMjs ? "Únete al MJS" : "Boletín"}
                            <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#E31C23] rounded-full" />
                        </h4>
                        <p className="text-sm font-semibold text-slate-400">
                            {isMjs 
                                ? "Suscríbete para recibir noticias de campamentos, retiros y servicio social."
                                : "Suscríbete para recibir circulares, noticias y eventos escolares."
                            }
                        </p>
                        
                        {/* Signup Form */}
                        <div className="flex flex-col gap-2 pt-2">
                            <input 
                                type="email" 
                                className="w-full px-5 py-3 border border-white/10 bg-white/5 rounded-full text-xs font-semibold focus:outline-none focus:border-[#0057D9] transition-all"
                                placeholder="tu@correo.com"
                            />
                            <button className="w-full bg-white/10 hover:bg-white text-[#08111F] hover:text-slate-900 font-extrabold text-xs py-3 rounded-full transition-all cursor-pointer">
                                {isMjs ? "Participar" : "Suscribirme"}
                            </button>
                        </div>
                    </div>

                </div>

                {/* Lower Footer: Copyright */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
                    <p>© {new Date().getFullYear()} {isMjs ? "MJS COLSIH" : "COLSIH"}. Todos los derechos reservados.</p>
                    <p>
                        {isMjs 
                            ? "Formando buenos cristianos y honestos ciudadanos en la alegría salesiana."
                            : "Diseñado para la excelencia escolar y el liderazgo del mañana."
                        }
                    </p>
                </div>

            </div>
        </footer>
    );
}
