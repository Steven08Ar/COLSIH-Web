import { Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function AppLayout({ children }) {
    const { props } = usePage();
    const flash = props.flash ?? {};

    return (
        <div className="min-h-screen bg-slate-50/30 flex flex-col font-sans selection:bg-red-100 selection:text-red-900">
            <Navbar />

            {/* Flash Message Banner */}
            {flash.success && (
                <div className="bg-emerald-50 border-b border-emerald-100 py-3.5 px-4 shadow-inner">
                    <div className="max-w-7xl mx-auto flex items-center gap-3">
                        <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-[14px] font-medium text-emerald-800">{flash.success}</p>
                    </div>
                </div>
            )}

            {/* Page Content */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <footer className="bg-slate-900 text-white border-t border-slate-800">
                <div className="bg-slate-900 h-2 flex overflow-hidden">
                    <div className="bg-red-700 w-1/2" />
                    <div className="bg-emerald-700 w-1/2" />
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Info Colegio */}
                        <div className="space-y-5">
                            <div className="flex items-center gap-3">
                                <img src="/escudo.png" alt="Escudo COLSIH" className="h-12 w-auto brightness-0 invert" />
                                <div className="leading-tight">
                                    <h3 className="font-extrabold text-[17px] tracking-tight text-white">COLSIH</h3>
                                    <p className="text-[12px] text-slate-400 font-medium">Santa Isabel de Hungría</p>
                                </div>
                            </div>
                            <p className="text-[14px] text-slate-400 leading-relaxed font-medium">
                                Formamos de manera integral líderes íntegros, comprometidos con la fe, la ciencia y la justicia.
                            </p>
                            <div className="space-y-2.5 pt-2">
                                <div className="flex items-start gap-2.5 text-slate-400 text-sm">
                                    <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="font-medium">Cl. 39a Sur #3-28, Bogotá, Colombia</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                                    <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="font-medium">+57 (601) 203-8555</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                                    <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="font-medium">contacto@colsih.edu.co</span>
                                </div>
                            </div>
                        </div>

                        {/* Navegación */}
                        <div className="space-y-4">
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider relative pb-2.5">
                                Nuestro Colegio
                                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-red-700 rounded-full" />
                            </h4>
                            <div className="flex flex-col gap-2.5 text-sm font-semibold text-slate-400">
                                <Link href="/nosotros" className="hover:text-red-500 transition-colors duration-200">Quiénes Somos</Link>
                                <Link href="/nosotros/historia" className="hover:text-red-500 transition-colors duration-200">Historia</Link>
                                <Link href="/nosotros/mision-vision" className="hover:text-red-500 transition-colors duration-200">Misión y Visión</Link>
                                <Link href="/nosotros/valores" className="hover:text-red-500 transition-colors duration-200">Valores</Link>
                                <Link href="/nosotros/equipo" className="hover:text-red-500 transition-colors duration-200">Nuestro Equipo</Link>
                            </div>
                        </div>

                        {/* Procesos */}
                        <div className="space-y-4">
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider relative pb-2.5">
                                Procesos
                                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-emerald-700 rounded-full" />
                            </h4>
                            <div className="flex flex-col gap-2.5 text-sm font-semibold text-slate-400">
                                <Link href="/oferta-academica" className="hover:text-emerald-500 transition-colors duration-200">Oferta Académica</Link>
                                <Link href="/admisiones" className="hover:text-emerald-500 transition-colors duration-200">Admisiones</Link>
                                <Link href="/inscripcion" className="hover:text-emerald-500 transition-colors duration-200">Formulario de Inscripción</Link>
                                <Link href="/noticias" className="hover:text-emerald-500 transition-colors duration-200">Comunidad y Noticias</Link>
                                <Link href="/contacto" className="hover:text-emerald-500 transition-colors duration-200">Contacto</Link>
                            </div>
                        </div>

                        {/* Matrículas */}
                        <div className="space-y-4">
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider relative pb-2.5">
                                Matrículas
                                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-red-700 rounded-full" />
                            </h4>
                            <p className="text-[14px] text-slate-400 leading-relaxed font-medium">
                                Si estás interesado en pertenecer a nuestra institución, inscríbete hoy de manera virtual.
                            </p>
                            <Link
                                href="/inscripcion"
                                className="inline-flex w-full items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all duration-300 shadow-md active:scale-[0.98] cursor-pointer"
                            >
                                Iniciar Proceso Online
                            </Link>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
                        <p>© {new Date().getFullYear()} COLSIH. Todos los derechos reservados.</p>
                        <p>Diseño y Educación con Excelencia para el Liderazgo del Mañana.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
