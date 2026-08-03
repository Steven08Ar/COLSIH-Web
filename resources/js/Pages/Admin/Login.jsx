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
            <div className="min-h-screen bg-[#F4F7FA] dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans relative overflow-hidden">
                
                {/* ── Luces de Fondo Decorativas (Vino Tinto y Azul Rey) ── */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#800A15]/15 blur-[140px] pointer-events-none z-0"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#003C8F]/15 blur-[150px] pointer-events-none z-0"></div>

                {/* Patrón sutil de puntos de fondo */}
                <div 
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0" 
                    style={{ 
                        backgroundImage: 'radial-gradient(#800A15 1px, transparent 1px)', 
                        backgroundSize: '28px 28px' 
                    }}
                ></div>

                {/* ── Contenedor Principal de la Card ── */}
                <div className="w-full max-w-4xl relative z-10">
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[36px] sm:rounded-[48px] shadow-[0_25px_70px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col lg:flex-row transition-all duration-300">
                        
                        {/* ── COLUMNA IZQUIERDA: Panel Curvo Orgánico (Vino Tinto + Azul Rey + Escudo COLSIH) ── */}
                        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#800A15] via-[#600710] to-[#003C8F] text-white p-10 xl:p-12 relative flex-col justify-between overflow-hidden">
                            {/* Formas curvadas orgánicas de fondo */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl transform translate-x-20 -translate-y-20 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#003C8F]/40 rounded-full blur-3xl transform -translate-x-20 translate-y-20 pointer-events-none"></div>
                            
                            {/* SVG de corte curvo orgánico a la derecha */}
                            <svg 
                                className="absolute right-[-1px] top-0 bottom-0 h-full w-16 text-white dark:text-slate-900 hidden lg:block pointer-events-none fill-current z-10" 
                                viewBox="0 0 100 100" 
                                preserveAspectRatio="none"
                            >
                                <path d="M0,0 C40,30 40,70 0,100 L100,100 L100,0 Z" />
                            </svg>

                            {/* Contenido Superior: Insignia de Seguridad */}
                            <div className="relative z-20">
                                <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-white border border-white/20 shadow-sm">
                                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                                    <span>Acceso Seguro Restringido</span>
                                </span>
                            </div>

                            {/* Contenido Central: Escudo Flotante y Nombre Institucional */}
                            <div className="relative z-20 my-auto py-8 text-center flex flex-col items-center">
                                {/* Escudo en Círculo Blanco Flotante */}
                                <div className="w-28 h-28 xl:w-32 xl:h-32 rounded-full bg-white shadow-2xl p-5 flex items-center justify-center border-4 border-white/20 hover:scale-105 transition-transform duration-300 mb-6 group">
                                    <img 
                                        src="/marca/logo-colsih.svg" 
                                        alt="Escudo COLSIH" 
                                        className="w-full h-full object-contain filter drop-shadow-md group-hover:rotate-3 transition-transform duration-300" 
                                    />
                                </div>

                                <h2 className="text-xl xl:text-2xl font-black leading-tight tracking-tight drop-shadow-sm uppercase">
                                    Colegio Santa Isabel de Hungría
                                </h2>
                                <p className="text-xs xl:text-sm font-semibold text-rose-100/90 mt-2 italic max-w-xs leading-relaxed">
                                    "Formamos buenos cristianos y honestos ciudadanos"
                                </p>

                                <div className="w-12 h-1 bg-white/30 rounded-full my-5"></div>
                                <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-blue-200">
                                    Floridablanca • Santander
                                </span>
                            </div>

                            {/* Contenido Inferior: Créditos */}
                            <div className="relative z-20 text-[11px] font-bold text-rose-200/80 flex items-center justify-between border-t border-white/10 pt-4">
                                <span>COLSIH &copy; {new Date().getFullYear()}</span>
                                <span>Panel de Gestión v9.6</span>
                            </div>
                        </div>

                        {/* ── BANNER CABECERA MOVIL (Visible únicamente en Mobile / Tablet < lg) ── */}
                        <div className="lg:hidden bg-gradient-to-r from-[#800A15] via-[#600710] to-[#003C8F] p-8 rounded-b-[40px] relative text-center flex flex-col items-center justify-center text-white overflow-hidden shadow-lg">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                            
                            {/* Escudo Circular Blanco Flotante Móvil */}
                            <div className="w-20 h-20 rounded-full bg-white shadow-xl p-3 flex items-center justify-center mb-3 border-4 border-white/20 relative z-10">
                                <img src="/marca/logo-colsih.svg" alt="Escudo COLSIH" className="w-full h-full object-contain" />
                            </div>

                            <h2 className="text-lg font-black uppercase tracking-tight relative z-10 leading-tight">
                                Colegio Santa Isabel de Hungría
                            </h2>
                            <span className="text-[10px] font-bold text-rose-100 uppercase tracking-widest mt-1 relative z-10">
                                Panel Administrativo
                            </span>
                        </div>

                        {/* ── COLUMNA DERECHA: Formulario de Login ── */}
                        <div className="lg:w-1/2 p-6 sm:p-10 md:p-12 flex flex-col justify-center bg-white dark:bg-slate-900">
                            
                            {/* Encabezado del Formulario (Sin "Welcome Back") */}
                            <div className="mb-8 text-center lg:text-left">
                                <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#003C8F] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full inline-block mb-3">
                                    Iniciar Sesión
                                </span>
                                <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                                    Acceso al Panel
                                </h1>
                                <p className="text-slate-400 text-xs sm:text-sm mt-1.5 font-medium">
                                    Ingresa tus credenciales para continuar
                                </p>
                            </div>

                            {/* Formulario */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* 1. Campo Usuario (Estilo Píldora Redondeada) */}
                                <div>
                                    <label className="block text-[11px] font-extrabold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2 pl-1">
                                        Usuario
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Ingresa tu usuario"
                                            value={data.usuario}
                                            onChange={e => setData('usuario', e.target.value)}
                                            autoComplete="username"
                                            required
                                            className="w-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-white placeholder-slate-400 rounded-full pl-12 pr-4 py-3.5 text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#003C8F] focus:ring-4 focus:ring-[#003C8F]/10 transition-all duration-200"
                                        />
                                    </div>
                                    {errors.usuario && (
                                        <p className="mt-2 text-xs text-rose-500 font-bold pl-3 flex items-center gap-1">
                                            <span>•</span> {errors.usuario}
                                        </p>
                                    )}
                                </div>

                                {/* 2. Campo Contraseña (Estilo Píldora Redondeada) */}
                                <div>
                                    <label className="block text-[11px] font-extrabold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2 pl-1">
                                        Contraseña
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••••••"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            autoComplete="current-password"
                                            required
                                            className="w-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-white placeholder-slate-400 rounded-full pl-12 pr-12 py-3.5 text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#003C8F] focus:ring-4 focus:ring-[#003C8F]/10 transition-all duration-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition"
                                            tabIndex="-1"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-xs text-rose-500 font-bold pl-3 flex items-center gap-1">
                                            <span>•</span> {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* 3. Botón de Acción Principal (Estilo Píldora Vino Tinto + Azul Rey) */}
                                <div className="pt-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full rounded-full py-4 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-[#800A15] via-[#600710] to-[#003C8F] hover:from-[#600710] hover:to-[#002868] active:scale-[0.98] disabled:opacity-50 transition-all duration-300 shadow-lg shadow-[#800A15]/25 hover:shadow-xl hover:shadow-[#800A15]/35 cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2 group"
                                    >
                                        <span>{processing ? 'Autenticando…' : 'Iniciar Sesión'}</span>
                                        {!processing && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                    </button>
                                </div>
                            </form>

                            {/* Nota al pie */}
                            <div className="mt-8 text-center border-t border-slate-100 dark:border-slate-800 pt-5">
                                <p className="text-[#003C8F] dark:text-blue-400 text-xs font-extrabold uppercase tracking-wider">
                                    Colegio Santa Isabel de Hungría
                                </p>
                                <p className="text-slate-400 text-[11px] font-medium mt-0.5">
                                    Todos los derechos reservados &copy; {new Date().getFullYear()}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
