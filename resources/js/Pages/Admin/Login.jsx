import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { User, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, QrCode, KeyRound, Check } from 'lucide-react';

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

    function switchMode(newMode) {
        if (newMode === loginMode) return;
        reset('password', 'pin');
        setLoginMode(newMode);
    }

    return (
        <>
            <Head title={loginMode === 'pin' ? "Kiosco de Asistencia (PIN) | COLSIH" : "Acceso Administrativo | COLSIH"} />
            
            <div className="min-h-screen w-full relative flex flex-col justify-between items-center p-4 sm:p-6 bg-slate-100 dark:bg-slate-950 font-sans select-none overflow-x-hidden">
                
                {/* ── BORDES PLANOS Y ACENTOS GEOMÉTRICOS INSTITUCIONALES (Sin Ondas Típicas) ── */}
                <div className="absolute top-0 inset-x-0 h-2 bg-[#003C8F] z-20"></div>
                <div className="absolute top-2 inset-x-0 h-1 bg-[#800A15] z-20"></div>
                <div className="absolute bottom-0 inset-x-0 h-2 bg-[#800A15] z-20"></div>

                {/* Insignia Superior */}
                <div className="pt-4 z-10">
                    <span className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider text-[#003C8F] dark:text-blue-400 shadow-sm">
                        <ShieldCheck className="w-4 h-4 text-[#800A15] dark:text-rose-400" />
                        <span>Portal Institucional COLSIH</span>
                    </span>
                </div>

                {/* ── TARJETA PLANAMENEE CENTRADA EN PANTALLA ── */}
                <div className="my-auto w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 relative z-10">
                    
                    {/* LOGO COLSIH ARRIBA */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 mb-3 flex items-center justify-center">
                            <img 
                                src="/marca/logo-colsih.svg" 
                                alt="Escudo COLSIH" 
                                className="w-full h-full object-contain filter drop-shadow-md" 
                            />
                        </div>

                        <h1 className="text-lg sm:text-xl font-black text-[#003C8F] dark:text-blue-400 tracking-tight uppercase leading-tight">
                            Colegio Santa Isabel de Hungría
                        </h1>
                        <p className="text-[11px] font-bold text-[#800A15] dark:text-rose-400 uppercase tracking-wider mt-0.5">
                            "Formamos buenos cristianos y honestos ciudadanos"
                        </p>
                    </div>

                    {/* SELECTOR PLANO DE MODO DE INGRESO */}
                    <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                        <button
                            type="button"
                            onClick={() => switchMode('standard')}
                            className={`py-2 text-xs font-black rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                loginMode === 'standard'
                                    ? 'bg-[#003C8F] text-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                        >
                            <User className="w-3.5 h-3.5" />
                            <span>Panel Admin</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => switchMode('pin')}
                            className={`py-2 text-xs font-black rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                loginMode === 'pin'
                                    ? 'bg-[#800A15] text-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                        >
                            <QrCode className="w-3.5 h-3.5" />
                            <span>Kiosco (PIN)</span>
                        </button>
                    </div>

                    {/* DESCRIPCIÓN DEL MODO SELECCIONADO */}
                    <div className="text-center">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                            {loginMode === 'standard' 
                                ? 'Credenciales para gestionar el sitio y contenidos en el Panel Admin'
                                : 'Acceso exclusivo al Kiosco de Registro de Asistencia (sin panel admin)'
                            }
                        </p>
                    </div>

                    {/* FORMULARIO */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {loginMode === 'standard' ? (
                            <>
                                {/* Campo 1: Usuario */}
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#003C8F] dark:text-blue-400">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Email o Usuario................"
                                            value={data.usuario}
                                            onChange={e => setData('usuario', e.target.value)}
                                            autoComplete="username"
                                            required
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 rounded-xl pl-11 pr-5 py-3 text-xs sm:text-sm font-bold focus:outline-none focus:border-[#003C8F] transition-all"
                                        />
                                    </div>
                                    {errors.usuario && (
                                        <p className="mt-1.5 text-xs text-rose-600 font-extrabold pl-2 flex items-center gap-1">
                                            <span>•</span> {errors.usuario}
                                        </p>
                                    )}
                                </div>

                                {/* Campo 2: Contraseña */}
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#003C8F] dark:text-blue-400">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password................"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            autoComplete="current-password"
                                            required
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 rounded-xl pl-11 pr-12 py-3 text-xs sm:text-sm font-bold focus:outline-none focus:border-[#003C8F] transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#003C8F] dark:hover:text-blue-400 cursor-pointer transition"
                                            tabIndex="-1"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1.5 text-xs text-rose-600 font-extrabold pl-2 flex items-center gap-1">
                                            <span>•</span> {errors.password}
                                        </p>
                                    )}
                                </div>
                            </>
                        ) : (
                            /* MODO PIN (SOLO PARA KIOSCO DE ASISTENCIA) */
                            <div className="space-y-3">
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#800A15] dark:text-rose-400">
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
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 rounded-xl pl-12 pr-5 py-3 text-center text-lg font-black tracking-widest focus:outline-none focus:border-[#800A15] transition-all"
                                        />
                                    </div>
                                    {errors.pin && (
                                        <p className="mt-1.5 text-xs text-rose-600 font-extrabold text-center flex items-center justify-center gap-1">
                                            <span>•</span> {errors.pin}
                                        </p>
                                    )}
                                </div>
                                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl text-amber-900 dark:text-amber-300 text-[11px] font-bold text-center">
                                    <span>El PIN habilita únicamente el Kiosco de Registro de Asistencia en tiempo real.</span>
                                </div>
                            </div>
                        )}

                        {/* BOTÓN DE INICIO DE SESIÓN */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-full rounded-xl py-3.5 text-xs sm:text-sm font-black text-white ${
                                    loginMode === 'pin' 
                                        ? 'bg-[#800A15] hover:bg-[#600710]' 
                                        : 'bg-[#003C8F] hover:bg-[#002868]'
                                } active:scale-[0.99] disabled:opacity-50 transition-all duration-200 cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2 shadow-md`}
                            >
                                <span>
                                    {processing 
                                        ? 'Autenticando…' 
                                        : (loginMode === 'pin' ? 'Activar Kiosco de Asistencia' : 'Ingresar al Panel Admin')
                                    }
                                </span>
                                {!processing && <ArrowRight className="w-4 h-4" />}
                            </button>
                        </div>
                    </form>

                    {/* PIE DE TARJETA */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                            Floridablanca • Santander
                        </p>
                    </div>

                </div>

                {/* ── PIE DE PÁGINA ── */}
                <footer className="py-3 text-center text-xs font-bold text-slate-400 dark:text-slate-500">
                    <span>Colegio Santa Isabel de Hungría &copy; {new Date().getFullYear()} • Todos los derechos reservados</span>
                </footer>

            </div>
        </>
    );
}
