import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { User, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        usuario: '',
        password: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(window.location.pathname, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Acceso Administrativo | COLSIH" />
            <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white dark:bg-slate-900 m-0 p-0 overflow-x-hidden font-sans">
                
                {/* ── 1. COLUMNA IZQUIERDA: Panel Completo 100% Pantalla (Vino Tinto Sólido + Figuras Transparentes) ── */}
                <div className="hidden lg:flex lg:w-1/2 min-h-screen bg-[#800A15] text-white p-12 xl:p-16 relative flex-col justify-between overflow-hidden">
                    
                    {/* ── Figuras Geométricas Overlapping (Sólidas y Transparentes - Sin Degradé) ── */}
                    {/* Círculo superior derecho en Azul Rey */}
                    <div className="absolute top-[-100px] right-[-100px] w-[450px] h-[450px] rounded-full bg-[#003C8F] pointer-events-none"></div>
                    {/* Círculo superior transparente blanco */}
                    <div className="absolute top-[-40px] right-[-40px] w-[360px] h-[360px] rounded-full bg-white/15 pointer-events-none"></div>
                    
                    {/* Círculo inferior izquierdo transparente */}
                    <div className="absolute bottom-[-120px] left-[-120px] w-[550px] h-[550px] rounded-full bg-[#003C8F]/40 pointer-events-none"></div>
                    {/* Círculo inferior negro transparente */}
                    <div className="absolute bottom-[-60px] left-[-60px] w-[420px] h-[420px] rounded-full bg-black/20 pointer-events-none"></div>
                    
                    {/* Figura Curva Orgánica SVG divisora a la derecha */}
                    <svg 
                        className="absolute right-0 top-0 bottom-0 h-full w-24 text-white dark:text-slate-900 hidden lg:block fill-current pointer-events-none z-10" 
                        viewBox="0 0 100 100" 
                        preserveAspectRatio="none"
                    >
                        <path d="M0,0 C60,35 60,65 0,100 L100,100 L100,0 Z" />
                    </svg>

                    {/* Insignia Superior */}
                    <div className="relative z-20">
                        <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-sm">
                            <ShieldCheck className="w-4 h-4 text-emerald-300" />
                            <span>Acceso Restringido</span>
                        </span>
                    </div>

                    {/* Contenido Central: Escudo Flotante en Círculo Blanco + Identidad */}
                    <div className="relative z-20 my-auto py-8 text-center flex flex-col items-center">
                        {/* Escudo Circular Blanco Flotante */}
                        <div className="w-32 h-32 xl:w-40 xl:h-40 rounded-full bg-white shadow-2xl p-6 flex items-center justify-center border-4 border-white/30 hover:scale-105 transition-transform duration-300 mb-8 group">
                            <img 
                                src="/marca/logo-colsih.svg" 
                                alt="Escudo COLSIH" 
                                className="w-full h-full object-contain filter drop-shadow-md group-hover:rotate-3 transition-transform duration-300" 
                            />
                        </div>

                        <h2 className="text-2xl xl:text-3xl font-black leading-tight tracking-tight uppercase drop-shadow-sm max-w-md">
                            Colegio Santa Isabel de Hungría
                        </h2>
                        <p className="text-xs xl:text-sm font-semibold text-rose-100/90 mt-3 italic max-w-sm leading-relaxed">
                            "Formamos buenos cristianos y honestos ciudadanos"
                        </p>

                        <div className="w-16 h-1 bg-white/30 rounded-full my-6"></div>
                        <span className="text-xs font-black uppercase tracking-[2.5px] text-blue-200">
                            Floridablanca • Santander
                        </span>
                    </div>

                    {/* Pie de página Izquierdo */}
                    <div className="relative z-20 text-xs font-bold text-rose-200/80 flex items-center justify-between border-t border-white/15 pt-5">
                        <span>COLSIH &copy; {new Date().getFullYear()}</span>
                        <span>Panel de Administración</span>
                    </div>
                </div>

                {/* ── 2. CABECERA MOVIL (Visibilidad en Pantalla Completa Móvil / Tablet) ── */}
                <div className="lg:hidden w-full bg-[#800A15] text-white p-8 sm:p-10 relative flex flex-col items-center justify-center text-center overflow-hidden rounded-b-[48px] shadow-xl">
                    {/* Figuras geométricas en móvil */}
                    <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full bg-[#003C8F] pointer-events-none"></div>
                    <div className="absolute top-[-30px] right-[-30px] w-52 h-52 rounded-full bg-white/15 pointer-events-none"></div>
                    <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 rounded-full bg-black/20 pointer-events-none"></div>

                    {/* Escudo Circular Blanco Flotante */}
                    <div className="w-24 h-24 rounded-full bg-white shadow-2xl p-4 flex items-center justify-center border-4 border-white/30 mb-4 relative z-10">
                        <img src="/marca/logo-colsih.svg" alt="Escudo COLSIH" className="w-full h-full object-contain" />
                    </div>

                    <h2 className="text-xl font-black uppercase tracking-tight relative z-10 leading-tight">
                        Colegio Santa Isabel de Hungría
                    </h2>
                    <span className="text-xs font-bold text-rose-100 uppercase tracking-widest mt-1 relative z-10">
                        Panel Administrativo
                    </span>
                </div>

                {/* ── 3. COLUMNA DERECHA: Formulario en Pantalla Completa ── */}
                <div className="w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen flex flex-col justify-center items-center p-6 sm:p-12 lg:p-20 bg-white dark:bg-slate-900">
                    
                    <div className="max-w-md w-full my-auto space-y-8">
                        
                        {/* Encabezado del Formulario (Sin "Welcome Back") */}
                        <div className="text-center lg:text-left">
                            <span className="text-xs font-black uppercase tracking-[2px] text-[#003C8F] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-4 py-1.5 rounded-full inline-block mb-3">
                                Iniciar Sesión
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                Acceso al Panel
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2 font-semibold">
                                Ingresa tus credenciales para continuar
                            </p>
                        </div>

                        {/* Formulario de Login */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Campo Usuario (Estilo Píldora Redondeada) */}
                            <div>
                                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5 pl-2">
                                    Usuario
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Ingresa tu usuario"
                                        value={data.usuario}
                                        onChange={e => setData('usuario', e.target.value)}
                                        autoComplete="username"
                                        required
                                        className="w-full bg-[#800A15]/5 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 rounded-full pl-13 pr-6 py-4 text-xs sm:text-sm font-bold focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#800A15] focus:ring-4 focus:ring-[#800A15]/10 transition-all duration-200"
                                    />
                                </div>
                                {errors.usuario && (
                                    <p className="mt-2 text-xs text-rose-600 font-extrabold pl-4 flex items-center gap-1">
                                        <span>•</span> {errors.usuario}
                                    </p>
                                )}
                            </div>

                            {/* Campo Contraseña (Estilo Píldora Redondeada) */}
                            <div>
                                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5 pl-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••••••"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        autoComplete="current-password"
                                        required
                                        className="w-full bg-[#800A15]/5 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 rounded-full pl-13 pr-14 py-4 text-xs sm:text-sm font-bold focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#800A15] focus:ring-4 focus:ring-[#800A15]/10 transition-all duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer transition"
                                        tabIndex="-1"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-xs text-rose-600 font-extrabold pl-4 flex items-center gap-1">
                                        <span>•</span> {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Botón de Acción Principal (Píldora Sólida Vino Tinto - Sin Degradé) */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-full py-4 text-xs sm:text-sm font-black text-white bg-[#800A15] hover:bg-[#600710] active:scale-[0.98] disabled:opacity-50 transition-all duration-300 shadow-xl shadow-[#800A15]/30 cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2 group"
                                >
                                    <span>{processing ? 'Autenticando…' : 'Iniciar Sesión'}</span>
                                    {!processing && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>
                        </form>

                        {/* Pie de página del Formulario */}
                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-[#003C8F] dark:text-blue-400 text-xs font-black uppercase tracking-wider">
                                Colegio Santa Isabel de Hungría
                            </p>
                            <p className="text-slate-400 text-[11px] font-medium mt-1">
                                Todos los derechos reservados &copy; {new Date().getFullYear()}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
