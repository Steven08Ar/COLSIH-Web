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
            
            <div className="min-h-screen w-full relative flex flex-col justify-between items-center p-4 sm:p-6 md:p-8 bg-slate-100 overflow-hidden font-sans select-none">
                
                {/* ── 1. FONDO CON ONDAS ORGÁNICAS (Azul Rey y Vino Tinto Sólidos, sin degradados) ── */}
                
                {/* ONDAS SUPERIORES */}
                <div className="absolute top-0 left-0 w-full h-[180px] sm:h-[240px] md:h-[280px] z-0 pointer-events-none select-none overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none" fill="none">
                        {/* Onda Vino Tinto (Fondo) */}
                        <path d="M 0 0 L 1200 0 L 1200 180 C 900 280, 600 200, 300 240 C 150 260, 50 230, 0 190 Z" fill="#800A15" />
                        {/* Onda Azul Rey (Frente) */}
                        <path d="M 0 0 L 1200 0 L 1200 120 C 850 240, 550 140, 250 200 C 100 220, 0 150, 0 150 Z" fill="#003C8F" />
                    </svg>
                </div>

                {/* ONDAS INFERIORES */}
                <div className="absolute bottom-0 left-0 w-full h-[180px] sm:h-[240px] md:h-[280px] z-0 pointer-events-none select-none overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none" fill="none">
                        {/* Onda Azul Rey (Atrás) */}
                        <path d="M 0 300 L 1200 300 L 1200 120 C 950 20, 650 160, 350 80 C 150 30, 0 140, 0 140 Z" fill="#003C8F" />
                        {/* Onda Vino Tinto (Frente) */}
                        <path d="M 0 300 L 1200 300 L 1200 190 C 850 110, 550 220, 250 160 C 100 130, 0 200, 0 200 Z" fill="#800A15" />
                    </svg>
                </div>

                {/* Círculo decorativo discreto en la esquina superior izquierda */}
                <div className="absolute top-4 left-4 z-10 hidden sm:block">
                    <span className="inline-flex items-center gap-2 bg-white/20 border border-white/30 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider text-white shadow-sm">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Panel Administrativo</span>
                    </span>
                </div>

                {/* ── 2. TARJETA DE LOGIN 100% CENTRADA EN LA PANTALLA ── */}
                <div className="my-auto w-full max-w-md bg-white border-2 border-[#003C8F]/20 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 relative z-10 animate-fadeIn">
                    
                    {/* LOGO COLSIH PROMINENTE ARRIBA DE LA TARJETA */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 mb-3 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                            <img 
                                src="/marca/logo-colsih.svg" 
                                alt="Escudo COLSIH" 
                                className="w-full h-full object-contain filter drop-shadow-lg" 
                            />
                        </div>

                        <h1 className="text-xl sm:text-2xl font-black text-[#003C8F] tracking-tight uppercase leading-tight">
                            Colegio Santa Isabel de Hungría
                        </h1>
                        <p className="text-[11px] font-bold text-[#800A15] uppercase tracking-wider mt-1">
                            "Formamos buenos cristianos y honestos ciudadanos"
                        </p>
                    </div>

                    <div className="w-full h-0.5 bg-slate-100 rounded-full my-2"></div>

                    {/* BOTÓN DE ALTERNANCIA (ÍCONO QR) */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                            {loginMode === 'standard' ? 'Acceso Estándar' : 'Acceso por PIN'}
                        </span>
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#003C8F]/10 text-[#003C8F] hover:bg-[#800A15] hover:text-white transition-all duration-300 text-xs font-black cursor-pointer border border-[#003C8F]/20"
                            title={loginMode === 'standard' ? 'Cambiar a Inicio por PIN' : 'Cambiar a Inicio por Usuario'}
                        >
                            <QrCode className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                            <span>{loginMode === 'standard' ? 'Ingreso por PIN' : 'Ingreso Usuario'}</span>
                        </button>
                    </div>

                    {/* FORMULARIO */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {loginMode === 'standard' ? (
                            <>
                                {/* Campo 1: Usuario */}
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#003C8F]">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Email o Usuario................"
                                            value={data.usuario}
                                            onChange={e => setData('usuario', e.target.value)}
                                            autoComplete="username"
                                            required
                                            className="w-full bg-[#003C8F]/5 border-2 border-slate-200 text-slate-800 placeholder-slate-400 rounded-full pl-11 pr-5 py-3.5 text-xs sm:text-sm font-bold focus:outline-none focus:bg-white focus:border-[#003C8F] focus:ring-4 focus:ring-[#003C8F]/10 transition-all duration-200"
                                        />
                                    </div>
                                    {errors.usuario && (
                                        <p className="mt-1.5 text-xs text-rose-600 font-extrabold pl-3 flex items-center gap-1">
                                            <span>•</span> {errors.usuario}
                                        </p>
                                    )}
                                </div>

                                {/* Campo 2: Contraseña */}
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#003C8F]">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password................"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            autoComplete="current-password"
                                            required
                                            className="w-full bg-[#003C8F]/5 border-2 border-slate-200 text-slate-800 placeholder-slate-400 rounded-full pl-11 pr-12 py-3.5 text-xs sm:text-sm font-bold focus:outline-none focus:bg-white focus:border-[#003C8F] focus:ring-4 focus:ring-[#003C8F]/10 transition-all duration-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#003C8F] cursor-pointer transition"
                                            tabIndex="-1"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1.5 text-xs text-rose-600 font-extrabold pl-3 flex items-center gap-1">
                                            <span>•</span> {errors.password}
                                        </p>
                                    )}
                                </div>
                            </>
                        ) : (
                            /* MODO PIN */
                            <div className="space-y-3">
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#800A15]">
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
                                            className="w-full bg-[#800A15]/5 border-2 border-slate-200 text-slate-800 placeholder-slate-400 rounded-full pl-12 pr-5 py-3.5 text-center text-lg font-black tracking-widest focus:outline-none focus:bg-white focus:border-[#800A15] focus:ring-4 focus:ring-[#800A15]/10 transition-all duration-200"
                                        />
                                    </div>
                                    {errors.pin && (
                                        <p className="mt-1.5 text-xs text-rose-600 font-extrabold text-center flex items-center justify-center gap-1">
                                            <span>•</span> {errors.pin}
                                        </p>
                                    )}
                                </div>
                                <p className="text-[11px] font-bold text-center text-slate-400">
                                    Escanea tu carnet o digita tu PIN numérico institucional
                                </p>
                            </div>
                        )}

                        {/* BOTÓN DE INICIO DE SESIÓN (Azul Rey o Vino Tinto Sólido) */}
                        <div className="pt-2 flex justify-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-full rounded-full py-4 text-xs sm:text-sm font-black text-white ${
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

                    {/* PIE DE TARJETA */}
                    <div className="pt-4 border-t border-slate-100 text-center">
                        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                            Floridablanca • Santander
                        </p>
                    </div>

                </div>

                {/* ── 3. PIE DE PÁGINA CENTRADO EN LA PARTE INFERIOR ── */}
                <footer className="relative z-10 py-2 text-center text-xs font-bold text-white drop-shadow-md">
                    <span>Colegio Santa Isabel de Hungría &copy; {new Date().getFullYear()} • Todos los derechos reservados</span>
                </footer>

            </div>
        </>
    );
}
