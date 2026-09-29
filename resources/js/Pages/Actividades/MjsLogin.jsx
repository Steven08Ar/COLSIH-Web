import { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { 
    User, 
    Lock, 
    Eye, 
    EyeOff, 
    ArrowLeft, 
    KeyRound, 
    Sparkles, 
    ShieldCheck, 
    ArrowRight,
    Delete
} from 'lucide-react';

export default function MjsLogin() {
    const [loginMode, setLoginMode] = useState('standard'); // 'standard' | 'pin'
    const [showPassword, setShowPassword] = useState(false);

    // Dynamic favicon for MJS
    useEffect(() => {
        function setFavicon(href) {
            document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());
            const link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/svg+xml';
            link.href = href + '?v=' + Date.now();
            document.head.appendChild(link);
        }
        setFavicon('/marca/logo-mjs.svg');
        return () => setFavicon('/marca/logo-colsih.svg');
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        usuario: '',
        password: '',
        pin: '',
        recordar: true,
    });

    // Enviar PIN automáticamente al completar 4 dígitos
    const handlePinDigit = (digit) => {
        if (processing) return;
        if (data.pin.length < 4) {
            const nextPin = data.pin + digit;
            setData('pin', nextPin);
            if (nextPin.length === 4) {
                router.post('/mjs/login', { pin: nextPin }, {
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
        post('/mjs/login', { preserveScroll: true });
    }

    function switchMode(newMode) {
        if (newMode === loginMode) return;
        reset('password', 'pin');
        setLoginMode(newMode);
    }

    return (
        <div className="h-screen max-h-screen bg-[#05081E] text-white flex flex-col justify-between selection:bg-[#FFC606] selection:text-[#080D3B] relative overflow-hidden font-sans">
            <Head>
                <title>Acceso Pastoral & Animadores | MJS Floridablanca</title>
                <meta name="description" content="Portal de acceso para animadores, coordinadores y pastoral juvenil del Movimiento Juvenil Salesiano en Floridablanca." />
            </Head>

            {/* Volumetric ambient background lighting */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#920709]/20 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0B09A1]/25 blur-[140px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,8,30,0.85)_100%)] pointer-events-none" />

            {/* Top Navigation Bar */}
            <header className="relative z-20 px-6 sm:px-12 pt-4 sm:pt-6 flex items-center justify-between shrink-0">
                <Link
                    href="/mjs"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-[11px] font-bold uppercase tracking-wider text-white transition-all shadow-md group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Volver al MJS</span>
                </Link>

                <Link
                    href="/"
                    className="group flex items-center focus:outline-none transition-transform duration-300 hover:scale-105"
                    title="Colegio Santa Isabel de Hungría"
                >
                    <img 
                        src="/marca/logo-colsih.svg" 
                        alt="Logo Institucional COLSIH" 
                        className="h-8 sm:h-9 w-auto object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                    />
                </Link>
            </header>

            {/* Main Centered Login Card */}
            <main className="relative z-20 flex-grow flex items-center justify-center px-4 py-2 sm:py-4">
                <div className="w-full max-w-sm sm:max-w-md">
                    
                    <div className="p-6 sm:p-8 rounded-3xl bg-black/55 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.7)] relative">
                        
                        {/* Glow top border line */}
                        <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                        {/* Top: Large Unenclosed MJS Logo */}
                        <div className="flex flex-col items-center text-center mb-5">
                            <Link href="/mjs" className="hover:scale-105 transition-transform duration-300">
                                <img 
                                    src="/marca/logo-mjs.svg" 
                                    alt="Logo MJS" 
                                    className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
                                />
                            </Link>

                            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[9px] font-bold uppercase tracking-widest text-slate-300">
                                <ShieldCheck className="w-3 h-3 text-white/80" />
                                <span>Portal de Coordinación & Animadores</span>
                            </div>

                            <h1 className="mt-2 text-xl sm:text-2xl font-black uppercase tracking-tight font-['Poppins'] text-white">
                                ACCESO MJS
                            </h1>
                            <p className="mt-0.5 text-[11px] text-slate-400 font-light max-w-xs">
                                Gestión de grupos juveniles, proyectos formativos y coordinación pastoral.
                            </p>
                        </div>

                        {/* Mode Selector Tabs (Estándar vs PIN) */}
                        <div className="flex p-1 bg-white/10 rounded-2xl mb-4 border border-white/10">
                            <button
                                type="button"
                                onClick={() => switchMode('standard')}
                                className={`flex-1 py-1.5 text-[11px] font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                    loginMode === 'standard'
                                        ? 'bg-[#080D3B] text-white shadow-md border border-white/20'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                <User className="w-3.5 h-3.5" />
                                <span>Credenciales</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => switchMode('pin')}
                                className={`flex-1 py-1.5 text-[11px] font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                    loginMode === 'pin'
                                        ? 'bg-[#080D3B] text-white shadow-md border border-white/20'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                <KeyRound className="w-3.5 h-3.5" />
                                <span>PIN Rápido</span>
                            </button>
                        </div>

                        {/* Error Alert Display */}
                        {(errors.usuario || errors.password || errors.pin) && (
                            <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-medium animate-fadeIn">
                                {errors.usuario || errors.password || errors.pin}
                            </div>
                        )}

                        {/* MODE 1: Standard Username & Password Form */}
                        {loginMode === 'standard' && (
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-slate-300 font-semibold mb-1">
                                        Usuario o Correo Pastoral
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <User className="w-3.5 h-3.5" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={data.usuario}
                                            onChange={(e) => setData('usuario', e.target.value)}
                                            placeholder="ej: animador.mjs"
                                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-white focus:bg-white/[0.08] transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <label className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">
                                            Contraseña
                                        </label>
                                        <a
                                            href="https://www.instagram.com/mjsbosco_floridablanca/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[9px] text-slate-400 hover:text-white transition-colors"
                                        >
                                            ¿Olvidaste tu clave?
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Lock className="w-3.5 h-3.5" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="••••••••••••"
                                            className="w-full pl-9 pr-9 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-white focus:bg-white/[0.08] transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                                            tabIndex="-1"
                                        >
                                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-1.5">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-2.5 rounded-full bg-white hover:bg-slate-200 text-black font-black text-xs uppercase tracking-wider shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-50"
                                    >
                                        <span>{processing ? 'Verificando...' : 'Ingresar al Portal MJS'}</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* MODE 2: PIN Pad for Field Animators / Fast pastoral access */}
                        {loginMode === 'pin' && (
                            <div className="space-y-4">
                                <div className="text-center">
                                    <p className="text-[11px] text-slate-400 font-light mb-2">
                                        Ingresa el PIN de 4 dígitos asignado a tu grupo pastoral.
                                    </p>

                                    {/* 4 PIN Dots */}
                                    <div className="flex justify-center gap-3 mb-1">
                                        {[0, 1, 2, 3].map((idx) => {
                                            const isFilled = data.pin.length > idx;
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                                                        isFilled 
                                                            ? 'bg-white scale-125 shadow-[0_0_12px_rgba(255,255,255,0.8)]' 
                                                            : 'bg-white/20 border border-white/20'
                                                    }`}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Keypad */}
                                <div className="grid grid-cols-3 gap-2 max-w-[230px] mx-auto">
                                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                                        <button
                                            key={digit}
                                            type="button"
                                            disabled={processing}
                                            onClick={() => handlePinDigit(digit)}
                                            className="w-14 h-11 rounded-xl bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 active:scale-95 text-base font-bold text-white transition-all mx-auto flex items-center justify-center cursor-pointer shadow-sm"
                                        >
                                            {digit}
                                        </button>
                                    ))}
                                    
                                    <button
                                        type="button"
                                        onClick={() => reset('pin')}
                                        className="w-14 h-11 rounded-xl bg-transparent hover:bg-white/[0.08] text-[10px] font-bold text-slate-400 hover:text-white transition-all mx-auto flex items-center justify-center cursor-pointer"
                                    >
                                        Borrar
                                    </button>

                                    <button
                                        type="button"
                                        disabled={processing}
                                        onClick={() => handlePinDigit('0')}
                                        className="w-14 h-11 rounded-xl bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 active:scale-95 text-base font-bold text-white transition-all mx-auto flex items-center justify-center cursor-pointer shadow-sm"
                                    >
                                        0
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handlePinDelete}
                                        className="w-14 h-11 rounded-xl bg-transparent hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all mx-auto flex items-center justify-center cursor-pointer"
                                    >
                                        <Delete className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Help / Community Note */}
                        <div className="mt-4 pt-3 border-t border-white/10 text-center space-y-1">
                            <p className="text-[10px] text-slate-400 font-light">
                                ¿Eres animador nuevo o requieres activación de cuenta?
                            </p>
                            <a
                                href="https://www.instagram.com/mjsbosco_floridablanca/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white/90 hover:text-white transition-colors"
                            >
                                <svg className="w-3 h-3 fill-current text-rose-400" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                                <span>Contactar Coordinación vía Instagram</span>
                            </a>
                        </div>

                    </div>

                </div>
            </main>

            {/* Bottom Minimalist Bar */}
            <footer className="relative z-20 px-6 py-3 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto w-full gap-2 border-t border-white/10 shrink-0">
                <p>
                    © {new Date().getFullYear()} Movimiento Juvenil Salesiano · Floridablanca, Santander
                </p>
                <p className="text-slate-400 flex items-center gap-2">
                    <span>Colegio Santa Isabel de Hungría</span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span>Carisma Salesiano de Don Bosco</span>
                </p>
            </footer>

        </div>
    );
}
