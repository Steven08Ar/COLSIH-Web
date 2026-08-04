import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { User, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, QrCode, KeyRound, ArrowLeft, Delete, Fingerprint } from 'lucide-react';

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
                // Auto-submit enviando el valor exacto de 4 dígitos
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
            <Head title={loginMode === 'pin' ? "Escribe tu PIN | Kiosco COLSIH" : "Acceso Administrativo | COLSIH"} />
            
            <div className="min-h-screen w-full relative flex flex-col justify-between items-center p-4 sm:p-6 bg-slate-100 dark:bg-slate-950 font-sans select-none overflow-x-hidden">
                
                {/* ── BORDES PLANOS Y ACENTOS GEOMÉTRICOS INSTITUCIONALES (Sin Ondas) ── */}
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

                {/* ── TARJETA PLANAMENTE CENTRADA EN PANTALLA ── */}
                <div className="my-auto w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative z-10">
                    
                    {loginMode === 'standard' ? (
                        /* ── MODO 1: INGRESO PANEL ADMIN (ESTÁNDAR) ── */
                        <>
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
                                    className="py-2 text-xs font-black rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 bg-[#003C8F] text-white shadow-sm"
                                >
                                    <User className="w-3.5 h-3.5" />
                                    <span>Panel Admin</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => switchMode('pin')}
                                    className="py-2 text-xs font-black rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                                >
                                    <QrCode className="w-3.5 h-3.5" />
                                    <span>Kiosco (PIN)</span>
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                    Credenciales para gestionar el sitio y contenidos en el Panel Admin
                                </p>
                            </div>

                            {/* FORMULARIO ESTÁNDAR */}
                            <form onSubmit={handleSubmit} className="space-y-4">
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

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full rounded-xl py-3.5 text-xs sm:text-sm font-black text-white bg-[#003C8F] hover:bg-[#002868] active:scale-[0.99] disabled:opacity-50 transition-all duration-200 cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                                    >
                                        <span>{processing ? 'Autenticando…' : 'Ingresar al Panel Admin'}</span>
                                        {!processing && <ArrowRight className="w-4 h-4" />}
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        /* ── MODO 2: TECLADO PIN INTERACTIVO PARA KIOSCO DE ASISTENCIA ── */
                        <div className="space-y-6 animate-fadeIn">
                            {/* Header Superior con Botón Atrás */}
                            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => switchMode('standard')}
                                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition cursor-pointer"
                                    title="Volver al inicio estándar"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <span className="text-xs font-black uppercase tracking-wider text-[#800A15] dark:text-rose-400">
                                    Kiosco de Asistencia
                                </span>
                                <div className="w-9"></div> {/* Espaciador balance */}
                            </div>

                            {/* Título de Clave */}
                            <div className="text-center space-y-1">
                                <h2 className="text-2xl sm:text-3xl font-black text-[#800A15] dark:text-rose-400 tracking-tight">
                                    Escribe tu clave
                                </h2>
                                <p className="text-xs font-bold text-slate-400">
                                    Ingresa tu PIN de 4 dígitos para activar el Kiosco
                                </p>
                            </div>

                            {/* 4 CASILLAS DE DÍGITOS DEL PIN */}
                            <div className="flex justify-center items-center gap-3 sm:gap-4 my-4">
                                {[0, 1, 2, 3].map((index) => {
                                    const digit = data.pin[index];
                                    const isFilled = digit !== undefined;
                                    return (
                                        <div
                                            key={index}
                                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 flex items-center justify-center text-2xl sm:text-3xl font-black transition-all duration-200 ${
                                                isFilled
                                                    ? 'border-[#800A15] bg-[#800A15]/10 text-[#800A15] dark:text-rose-400 shadow-md scale-105'
                                                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-300'
                                            }`}
                                        >
                                            {isFilled ? '●' : ''}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Mensaje de Error si aplica */}
                            {errors.pin && (
                                <p className="text-xs text-rose-600 font-black text-center animate-bounce">
                                    • {errors.pin}
                                </p>
                            )}

                            {/* TECLADO NUMÉRICO 3x4 INTERACTIVO */}
                            <div className="max-w-xs mx-auto grid grid-cols-3 gap-3 pt-2">
                                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => handlePinDigit(num)}
                                        disabled={processing}
                                        className="h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-[#800A15] hover:text-white dark:hover:bg-[#800A15] text-[#800A15] dark:text-rose-300 text-2xl font-black transition-all active:scale-95 cursor-pointer flex items-center justify-center shadow-sm"
                                    >
                                        {num}
                                    </button>
                                ))}

                                {/* Botón Ícono QR / Escáner (Esquina inferior izquierda) */}
                                <div className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center text-slate-400">
                                    <QrCode className="w-6 h-6 text-[#800A15]/60" />
                                </div>

                                {/* Botón '0' */}
                                <button
                                    type="button"
                                    onClick={() => handlePinDigit('0')}
                                    disabled={processing}
                                    className="h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-[#800A15] hover:text-white dark:hover:bg-[#800A15] text-[#800A15] dark:text-rose-300 text-2xl font-black transition-all active:scale-95 cursor-pointer flex items-center justify-center shadow-sm"
                                >
                                    0
                                </button>

                                {/* Botón Borrar (Esquina inferior derecha) */}
                                <button
                                    type="button"
                                    onClick={handlePinDelete}
                                    disabled={processing || data.pin.length === 0}
                                    className="h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-600 dark:text-slate-300 transition-all active:scale-95 cursor-pointer flex items-center justify-center disabled:opacity-30 shadow-sm"
                                    title="Borrar último dígito"
                                >
                                    <Delete className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Enlace de ayuda o cambiar a usuario */}
                            <div className="text-center pt-2">
                                <button
                                    type="button"
                                    onClick={() => switchMode('standard')}
                                    className="text-xs font-bold text-slate-400 hover:text-[#800A15] transition cursor-pointer underline"
                                >
                                    ¿Acceso por usuario y contraseña?
                                </button>
                            </div>
                        </div>
                    )}

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
