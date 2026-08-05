import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { User, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Delete, KeyRound } from 'lucide-react';

export default function AdminLogin() {
    const [loginMode, setLoginMode] = useState('standard'); // 'standard' | 'pin'
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        usuario: '',
        password: '',
        pin: '',
    });

    // Enviar PIN automáticamente al completar 4 dígitos
    const handlePinDigit = (digit) => {
        if (processing) return;
        if (data.pin.length < 4) {
            const nextPin = data.pin + digit;
            setData('pin', nextPin);
            if (nextPin.length === 4) {
                router.post(window.location.pathname, { pin: nextPin }, {
                    preserveScroll: true,
                    onError: () => {
                        setData('pin', '');
                    }
                });
            }
        }
    };

    const handlePinDelete = () => {
        if (processing) return;
        setData('pin', data.pin.slice(0, -1));
    };

    // Escuchar entrada de teclado físico en el modo PIN
    useEffect(() => {
        if (loginMode !== 'pin') return;

        const handleKeyDown = (e) => {
            if (e.key >= '0' && e.key <= '9') {
                handlePinDigit(e.key);
            } else if (e.key === 'Backspace') {
                handlePinDelete();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [loginMode, data.pin, processing]);

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
            <Head title={loginMode === 'pin' ? "Kiosco de Asistencia (PIN) | COLSIH" : "Inicio de Sesión | Panel Administrador COLSIH"} />
            
            <div className="min-h-screen w-full relative flex items-center justify-center bg-white font-sans select-none overflow-hidden p-4 sm:p-6">
                
                {/* ── FONDO DE ONDAS FLUIDAS ORGÁNICAS (FIGMA DESIGN) ── */}
                {/* Ondas Superiores Rojas */}
                <div className="absolute top-0 inset-x-0 w-full h-[45vh] overflow-hidden pointer-events-none z-0">
                    <svg className="w-full h-full" viewBox="0 0 1440 450" fill="none" preserveAspectRatio="none">
                        <path d="M0 0H1440V240C1250 340 980 180 680 300C380 420 180 260 0 320V0Z" fill="#F7C4C8" />
                        <path d="M0 0H1440V160C1180 280 920 120 620 230C320 340 140 180 0 220V0Z" fill="#E63946" />
                        <path d="M0 0H1440V90C1100 210 820 50 520 160C220 270 90 90 0 140V0Z" fill="#C81E2B" />
                    </svg>
                </div>

                {/* Ondas Inferiores Azules */}
                <div className="absolute bottom-0 inset-x-0 w-full h-[45vh] overflow-hidden pointer-events-none z-0">
                    <svg className="w-full h-full" viewBox="0 0 1440 450" fill="none" preserveAspectRatio="none">
                        <path d="M0 450H1440V180C1220 110 940 300 640 160C340 20 160 200 0 130V450Z" fill="#C2DCFF" />
                        <path d="M0 450H1440V240C1180 170 900 340 580 220C280 100 120 260 0 190V450Z" fill="#2B68E0" />
                        <path d="M0 450H1440V310C1120 250 820 380 500 280C220 180 80 310 0 260V450Z" fill="#003C8F" />
                    </svg>
                </div>

                {/* ── TARJETA PRINCIPAL DE INICIO DE SESIÓN (ESTILO FIGMA EXACTO) ── */}
                <div className="my-auto w-full max-w-[440px] bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 relative z-10 flex flex-col items-center text-center space-y-6">
                    
                    {/* MARCA DE AGUA DEL ESCUDO EN EL FONDO DE LA TARJETA */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-[32px]">
                        <img 
                            src="/marca/logo-colsih.svg" 
                            alt="" 
                            className="w-80 h-80 object-contain opacity-[0.04] grayscale" 
                        />
                    </div>

                    {/* LOGO SUPERIOR COLSIH */}
                    <div className="flex flex-col items-center relative z-10">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 mb-2 flex items-center justify-center">
                            <img 
                                src="/marca/logo-colsih.svg" 
                                alt="Escudo COLSIH" 
                                className="w-full h-full object-contain filter drop-shadow-sm" 
                            />
                        </div>

                        <p className="text-xs font-semibold text-slate-700 tracking-tight">
                            Colegio Santa Isabel de Hungría
                        </p>
                    </div>

                    {loginMode === 'standard' ? (
                        /* ── MODO ESTÁNDAR: USUARIO Y CONTRASEÑA (FIGMA REPLICA) ── */
                        <div className="w-full space-y-6 relative z-10">
                            
                            {/* TÍTULO EN SECCIÓN PRINCIPAL */}
                            <div className="space-y-0.5">
                                <h1 className="text-2xl sm:text-3xl font-black text-[#003C8F] tracking-tight">
                                    Inicio de Sesión
                                </h1>
                                <h2 className="text-base sm:text-lg font-bold text-[#003C8F]/90">
                                    Panel Administrador
                                </h2>
                            </div>

                            {/* FORMULARIO FIGMA */}
                            <form onSubmit={handleSubmit} className="space-y-4 text-left">
                                
                                {/* INPUT 1: USUARIO (BORDE AZUL REY) */}
                                <div>
                                    <div className="relative flex items-center w-full bg-white rounded-2xl border-[2px] border-[#003C8F] shadow-sm hover:border-[#002868] transition-all">
                                        <div className="pl-4 pr-2 text-[#003C8F] flex items-center justify-center pointer-events-none">
                                            <User className="w-5 h-5 stroke-[2.2]" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Usuario"
                                            value={data.usuario}
                                            onChange={e => setData('usuario', e.target.value)}
                                            autoComplete="username"
                                            required
                                            className="w-full bg-transparent pr-4 py-3.5 text-sm sm:text-base font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
                                        />
                                    </div>
                                    {errors.usuario && (
                                        <p className="mt-1 text-xs text-rose-600 font-bold pl-2">
                                            • {errors.usuario}
                                        </p>
                                    )}
                                </div>

                                {/* INPUT 2: CONTRASEÑA (BORDE VINOTINTO) */}
                                <div>
                                    <div className="relative flex items-center w-full bg-white rounded-2xl border-[2px] border-[#800A15] shadow-sm hover:border-[#600710] transition-all">
                                        <div className="pl-4 pr-2 text-[#800A15] flex items-center justify-center pointer-events-none">
                                            <Lock className="w-5 h-5 stroke-[2.2]" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Contraseña"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            autoComplete="current-password"
                                            required
                                            className="w-full bg-transparent pr-12 py-3.5 text-sm sm:text-base font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 text-[#800A15] hover:opacity-75 transition cursor-pointer p-1"
                                            tabIndex="-1"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5 stroke-[2.2]" /> : <Eye className="w-5 h-5 stroke-[2.2]" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-xs text-rose-600 font-bold pl-2">
                                            • {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* BOTÓN DE INGRESO PRINCIPAL */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full rounded-2xl py-3.5 text-sm sm:text-base font-bold text-white bg-[#003C8F] hover:bg-[#002868] active:scale-[0.99] disabled:opacity-50 transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2"
                                    >
                                        <span>{processing ? 'Iniciando sesión…' : 'Ingresar al Panel'}</span>
                                        {!processing && <ArrowRight className="w-5 h-5" />}
                                    </button>
                                </div>
                            </form>

                            {/* OPCIÓN INFERIOR FIGMA: INGRESO MEDIANTE CARNETS (QR / PIN) */}
                            <div className="pt-2 flex flex-col items-center justify-center">
                                <button
                                    type="button"
                                    onClick={() => switchMode('pin')}
                                    className="group flex flex-col items-center gap-1.5 transition cursor-pointer"
                                >
                                    {/* Ícono de Marco QR Figma */}
                                    <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#800A15] p-2 flex items-center justify-center text-[#800A15] group-hover:scale-105 transition-all shadow-sm">
                                        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                                            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                                            <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                                            <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                                            <rect x="7" y="7" width="3" height="3" fill="currentColor" />
                                            <rect x="14" y="7" width="3" height="3" fill="currentColor" />
                                            <rect x="7" y="14" width="3" height="3" fill="currentColor" />
                                            <path d="M14 14h3v3h-3z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-extrabold text-[#800A15] group-hover:underline">
                                        Ingreso mediante Carnets
                                    </span>
                                </button>
                            </div>

                        </div>
                    ) : (
                        /* ── MODO KIOSCO PIN: VISTA TECLADO INTERACTIVO ── */
                        <div className="w-full space-y-5 relative z-10 animate-fadeIn">
                            
                            {/* BOTÓN REGRESAR AL ACCESO ESTÁNDAR */}
                            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => switchMode('standard')}
                                    className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#003C8F] transition cursor-pointer"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Volver</span>
                                </button>
                                <span className="text-xs font-black uppercase tracking-wider text-[#800A15]">
                                    Acceso Kiosco
                                </span>
                            </div>

                            {/* TÍTULO KIOSCO */}
                            <div className="space-y-1">
                                <h2 className="text-2xl font-black text-[#800A15] tracking-tight">
                                    Escribe tu PIN
                                </h2>
                                <p className="text-xs font-medium text-slate-500">
                                    Ingresa el PIN de 4 dígitos para activar el Kiosco de Asistencia
                                </p>
                            </div>

                            {/* 4 CASILLAS DE DÍGITOS */}
                            <div className="flex justify-center items-center gap-3 my-3">
                                {[0, 1, 2, 3].map((index) => {
                                    const digit = data.pin[index];
                                    const isFilled = digit !== undefined;
                                    return (
                                        <div
                                            key={index}
                                            className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border-[2.5px] flex items-center justify-center text-2xl font-black transition-all duration-200 ${
                                                isFilled
                                                    ? 'border-[#800A15] bg-[#800A15]/10 text-[#800A15] shadow-sm scale-105'
                                                    : 'border-slate-200 bg-slate-50 text-slate-300'
                                            }`}
                                        >
                                            {isFilled ? '●' : ''}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* ERROR PIN */}
                            {errors.pin && (
                                <p className="text-xs text-rose-600 font-bold animate-bounce">
                                    • {errors.pin}
                                </p>
                            )}

                            {/* TECLADO NUMÉRICO 3x4 INTERACTIVO */}
                            <div className="max-w-xs mx-auto grid grid-cols-3 gap-2.5 pt-1">
                                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => handlePinDigit(num)}
                                        disabled={processing}
                                        className="h-12 rounded-2xl bg-slate-100 hover:bg-[#800A15] hover:text-white text-[#800A15] text-xl font-black transition-all active:scale-95 cursor-pointer flex items-center justify-center shadow-xs"
                                    >
                                        {num}
                                    </button>
                                ))}

                                <div className="h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
                                    <KeyRound className="w-5 h-5 text-[#800A15]/40" />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handlePinDigit('0')}
                                    disabled={processing}
                                    className="h-12 rounded-2xl bg-slate-100 hover:bg-[#800A15] hover:text-white text-[#800A15] text-xl font-black transition-all active:scale-95 cursor-pointer flex items-center justify-center shadow-xs"
                                >
                                    0
                                </button>

                                <button
                                    type="button"
                                    onClick={handlePinDelete}
                                    disabled={processing || data.pin.length === 0}
                                    className="h-12 rounded-2xl bg-slate-100 hover:bg-rose-600 hover:text-white text-slate-600 transition-all active:scale-95 cursor-pointer flex items-center justify-center disabled:opacity-30 shadow-xs"
                                    title="Borrar último dígito"
                                >
                                    <Delete className="w-5 h-5" />
                                </button>
                            </div>

                        </div>
                    )}

                </div>

            </div>
        </>
    );
}
