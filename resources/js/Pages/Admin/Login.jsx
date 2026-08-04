import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { User, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, QrCode, KeyRound } from 'lucide-react';

export default function AdminLogin() {
    const [loginMode, setLoginMode] = useState('standard'); // 'standard' | 'pin'
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        usuario: '',
        password: '',
        pin: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(window.location.pathname, { preserveScroll: true });
    }

    function toggleMode() {
        reset('password', 'pin');
        setLoginMode(loginMode === 'standard' ? 'pin' : 'standard');
    }

    return (
        <>
            <Head title={loginMode === 'pin' ? "Ingreso por PIN | COLSIH" : "Acceso Administrativo | COLSIH"} />
            <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white dark:bg-slate-900 m-0 p-0 overflow-hidden font-sans select-none">
                
                {/* ── 1. PANEL IZQUIERDO (Azul Rey Predominante + Figuras Sólidas) ── */}
                <div className="hidden lg:flex lg:w-1/2 min-h-screen bg-[#003C8F] text-white p-12 xl:p-16 relative flex-col justify-between overflow-hidden">
                    
                    {/* Figuras Círculo (Azul Rey y Vino Tinto Sólidos - Sin Degradados) */}
                    <div className="absolute -bottom-36 -left-36 w-[440px] h-[440px] rounded-full bg-[#800A15] pointer-events-none z-0"></div>
                    <div className="absolute top-1/2 -right-44 -translate-y-1/2 w-[720px] h-[720px] rounded-full bg-[#003C8F] pointer-events-none z-0"></div>
                    <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] rounded-full bg-white/10 pointer-events-none z-0"></div>

                    {/* Insignia Superior */}
                    <div className="relative z-10">
                        <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-sm">
                            <ShieldCheck className="w-4 h-4 text-emerald-300" />
                            <span>Acceso Restringido</span>
                        </span>
                    </div>

                    {/* Contenido Central Identidad COLSIH */}
                    <div className="relative z-10 my-auto py-8 text-center flex flex-col items-center">
                        <div className="w-36 h-36 xl:w-44 xl:h-44 flex items-center justify-center hover:scale-105 transition-transform duration-300 mb-8 group">
                            <img 
                                src="/marca/logo-colsih.svg" 
                                alt="Escudo COLSIH" 
                                className="w-full h-full object-contain filter drop-shadow-2xl group-hover:rotate-3 transition-transform duration-300" 
                            />
                        </div>

                        <h2 className="text-2xl xl:text-3xl font-black leading-tight tracking-tight uppercase drop-shadow-sm max-w-md">
                            Colegio Santa Isabel de Hungría
                        </h2>
                        <p className="text-xs xl:text-sm font-semibold text-blue-100/90 mt-3 italic max-w-sm leading-relaxed">
                            "Formamos buenos cristianos y honestos ciudadanos"
                        </p>

                        <div className="w-16 h-1 bg-white/30 rounded-full my-6"></div>
                        <span className="text-xs font-black uppercase tracking-[2.5px] text-rose-200">
                            Floridablanca • Santander
                        </span>
                    </div>

                    {/* Pie de página Izquierdo */}
                    <div className="relative z-10 text-xs font-bold text-blue-200/80 flex items-center justify-between border-t border-white/15 pt-5">
                        <span>COLSIH &copy; {new Date().getFullYear()}</span>
                        <span>Panel de Administración</span>
                    </div>
                </div>

                {/* ── 2. CABECERA MÓVIL (< lg) ── */}
                <div className="lg:hidden w-full bg-[#003C8F] text-white p-8 sm:p-10 relative flex flex-col items-center justify-center text-center overflow-hidden rounded-b-[48px] shadow-xl">
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#800A15] pointer-events-none"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 pointer-events-none"></div>

                    <div className="w-28 h-28 flex items-center justify-center mb-4 relative z-10">
                        <img src="/marca/logo-colsih.svg" alt="Escudo COLSIH" className="w-full h-full object-contain filter drop-shadow-2xl" />
                    </div>

                    <h2 className="text-xl font-black uppercase tracking-tight relative z-10 leading-tight">
                        Colegio Santa Isabel de Hungría
                    </h2>
                    <span className="text-xs font-bold text-blue-200 uppercase tracking-widest mt-1 relative z-10">
                        Panel Administrativo
                    </span>
                </div>

                {/* ── 3. PANEL DERECHO (Formulario Blanco Centrado) ── */}
                <div className="w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen flex flex-col justify-center items-center p-6 sm:p-12 lg:p-20 bg-white dark:bg-slate-900 relative overflow-hidden">
                    
                    <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#003C8F] pointer-events-none hidden lg:block z-0"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#800A15]/20 pointer-events-none hidden lg:block z-0"></div>

                    <div className="max-w-md w-full my-auto space-y-8 relative z-10">
                        
                        {/* Botón de Alternancia de Modo (Ícono QR) */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={toggleMode}
                                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#003C8F]/10 dark:bg-slate-800 text-[#003C8F] dark:text-blue-400 hover:bg-[#800A15] hover:text-white transition-all duration-300 text-xs font-black cursor-pointer border border-[#003C8F]/20"
                                title={loginMode === 'standard' ? 'Cambiar a Inicio por PIN' : 'Cambiar a Inicio por Usuario'}
                            >
                                <QrCode className="w-4 h-4 transition-transform group-hover:scale-110" />
                                <span>{loginMode === 'standard' ? 'Ingreso por PIN' : 'Ingreso Estándar'}</span>
                            </button>
                        </div>

                        {/* Encabezado Dinámico */}
                        <div className="text-center">
                            <h1 className="text-3xl sm:text-4xl font-black text-[#003C8F] dark:text-blue-400 tracking-tight">
                                {loginMode === 'standard' ? 'Iniciar Sesión' : 'Ingreso por PIN'}
                            </h1>
                            <p className="text-slate-400 dark:text-slate-400 text-xs sm:text-sm mt-2 font-semibold">
                                {loginMode === 'standard' 
                                    ? 'Ingresa tus credenciales administrativas para continuar'
                                    : 'Ingresa el PIN numérico para acceder al Kiosco de Asistencia'
                                }
                            </p>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {loginMode === 'standard' ? (
                                <>
                                    {/* Campo 1: Usuario */}
                                    <div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#003C8F] dark:text-blue-400">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Email o Usuario................"
                                                value={data.usuario}
                                                onChange={e => setData('usuario', e.target.value)}
                                                autoComplete="username"
                                                required
                                                className="w-full bg-[#003C8F]/10 dark:bg-slate-800 border-2 border-transparent text-slate-800 dark:text-white placeholder-slate-400 rounded-full pl-13 pr-6 py-4 text-xs sm:text-sm font-bold focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#003C8F] focus:ring-4 focus:ring-[#003C8F]/15 transition-all duration-200"
                                            />
                                        </div>
                                        {errors.usuario && (
                                            <p className="mt-2 text-xs text-rose-600 font-extrabold pl-4 flex items-center gap-1">
                                                <span>•</span> {errors.usuario}
                                            </p>
                                        )}
                                    </div>

                                    {/* Campo 2: Contraseña */}
                                    <div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#003C8F] dark:text-blue-400">
                                                <Lock className="w-5 h-5" />
                                            </div>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Password................"
                                                value={data.password}
                                                onChange={e => setData('password', e.target.value)}
                                                autoComplete="current-password"
                                                required
                                                className="w-full bg-[#003C8F]/10 dark:bg-slate-800 border-2 border-transparent text-slate-800 dark:text-white placeholder-slate-400 rounded-full pl-13 pr-14 py-4 text-xs sm:text-sm font-bold focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#003C8F] focus:ring-4 focus:ring-[#003C8F]/15 transition-all duration-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-[#003C8F] dark:hover:text-blue-400 cursor-pointer transition"
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
                                </>
                            ) : (
                                /* MODO PIN */
                                <div className="space-y-4">
                                    <div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#800A15] dark:text-rose-400">
                                                <KeyRound className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="password"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                maxLength={8}
                                                placeholder="PIN de Asistencia (Ej: 1234)...."
                                                value={data.pin}
                                                onChange={e => setData('pin', e.target.value)}
                                                autoFocus
                                                required
                                                className="w-full bg-[#800A15]/10 dark:bg-slate-800 border-2 border-transparent text-slate-800 dark:text-white placeholder-slate-400 rounded-full pl-13 pr-6 py-4 text-center text-lg sm:text-xl font-black tracking-widest focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#800A15] focus:ring-4 focus:ring-[#800A15]/15 transition-all duration-200"
                                            />
                                        </div>
                                        {errors.pin && (
                                            <p className="mt-2 text-xs text-rose-600 font-extrabold text-center flex items-center justify-center gap-1">
                                                <span>•</span> {errors.pin}
                                            </p>
                                        )}
                                    </div>
                                    <p className="text-[11px] font-bold text-center text-slate-400">
                                        Escanea la tarjeta o digita tu código PIN institucional
                                    </p>
                                </div>
                            )}

                            {/* Botón de Envío */}
                            <div className="pt-2 flex justify-center">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`w-full sm:w-64 rounded-full py-4 text-xs sm:text-sm font-black text-white ${
                                        loginMode === 'pin' 
                                            ? 'bg-[#800A15] hover:bg-[#600710] shadow-[#800A15]/30' 
                                            : 'bg-[#003C8F] hover:bg-[#002868] shadow-[#003C8F]/30'
                                    } active:scale-[0.98] disabled:opacity-50 transition-all duration-300 shadow-xl cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2 group`}
                                >
                                    <span>
                                        {processing 
                                            ? 'Autenticando…' 
                                            : (loginMode === 'pin' ? 'Acceder a Asistencia' : 'Iniciar Sesión')
                                        }
                                    </span>
                                    {!processing && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>
                        </form>

                        {/* Pie de página */}
                        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
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
