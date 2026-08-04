import { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    QrCode, 
    CheckCircle2, 
    Clock, 
    User, 
    ShieldCheck, 
    Maximize, 
    Minimize, 
    ArrowLeft, 
    Search,
    CreditCard,
    Sparkles,
    Calendar,
    Users,
    LogOut
} from 'lucide-react';

// Base de datos institucional de demostración y escaneo (Estudiantes y Docentes)
const DEMO_PERSONAS = [
    { code: 'EST-101', nfc: 'NFC-101', nombre: 'Santiago', apellido: 'Camacho Corzo', rol: 'Estudiante', info: 'Grado 11° - Bachillerato', foto: 'https://pub-c4ddb3fb75904158bbda5fbc35d6963e.r2.dev/equipo/Yoleida_Patricia_Camacho_Corzo.jpg' },
    { code: 'DOC-102', nfc: 'NFC-102', nombre: 'Yoleida Patricia', apellido: 'Camacho Corzo', rol: 'Docente', info: 'Docente de Primaria y Preescolar', foto: 'https://pub-c4ddb3fb75904158bbda5fbc35d6963e.r2.dev/equipo/Yoleida_Patricia_Camacho_Corzo.jpg' },
    { code: 'EST-103', nfc: 'NFC-103', nombre: 'Carlos Eduardo', apellido: 'Ramírez Silva', rol: 'Estudiante', info: 'Grado 10° - Articulación SENA', foto: null },
    { code: 'DOC-104', nfc: 'NFC-104', nombre: 'María Fernanda', apellido: 'Gómez López', rol: 'Docente', info: 'Coordinadora Académica', foto: null },
    { code: 'EST-105', nfc: 'NFC-105', nombre: 'Andrés Felipe', apellido: 'Mendoza Ruiz', rol: 'Estudiante', info: 'Grado 5° - Primaria', foto: null },
    { code: 'ADM-106', nfc: 'NFC-106', nombre: 'Luz Marina', apellido: 'Valenzuela Castro', rol: 'Administrativo', info: 'Secretaria General', foto: null }
];

export default function CarnetsKiosco({ isOnlyKiosk = false }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [scannedRecord, setScannedRecord] = useState(null);
    const [recentScans, setRecentScans] = useState([]);
    const [manualCode, setManualCode] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [buffer, setBuffer] = useState('');

    const inputRef = useRef(null);
    const autoDismissTimer = useRef(null);

    // 1. Reloj en tiempo real
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // 2. Intento de Pantalla Completa Automática (F11 / RequestFullscreen)
    useEffect(() => {
        const enableFullscreen = () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
            }
        };

        enableFullscreen();
        window.addEventListener('click', enableFullscreen, { once: true });

        const handleFSChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };
        document.addEventListener('fullscreenchange', handleFSChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFSChange);
            window.removeEventListener('click', enableFullscreen);
        };
    }, []);

    // 3. Captura continua del lector HID (Código de Barras + NFC)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (document.activeElement === inputRef.current && e.key !== 'Enter') {
                return;
            }

            if (e.key === 'Enter') {
                if (buffer.trim().length > 0) {
                    procesarEscaneo(buffer.trim());
                    setBuffer('');
                }
            } else if (e.key.length === 1) {
                setBuffer(prev => prev + e.key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [buffer]);

    // Procesar código leído por NFC o Código de Barras
    const procesarEscaneo = (codigo) => {
        const cleaned = codigo.trim().toUpperCase();
        if (!cleaned) return;

        const encontrado = DEMO_PERSONAS.find(
            p => p.code.toUpperCase() === cleaned || p.nfc.toUpperCase() === cleaned
        ) || {
            code: cleaned,
            nombre: 'Usuario',
            apellido: `Registrado (${cleaned})`,
            rol: cleaned.startsWith('DOC') ? 'Docente' : 'Estudiante',
            info: 'Institucional COLSIH',
            foto: null
        };

        const now = new Date();
        const timeStr = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

        const nuevoRegistro = {
            id: Date.now(),
            code: codigo,
            nombre: encontrado.nombre,
            apellido: encontrado.apellido,
            nombreCompleto: `${encontrado.nombre} ${encontrado.apellido}`,
            rol: encontrado.rol,
            info: encontrado.info,
            foto: encontrado.foto,
            hora: timeStr,
            fecha: now.toLocaleDateString('es-CO')
        };

        if (autoDismissTimer.current) clearTimeout(autoDismissTimer.current);
        setScannedRecord(nuevoRegistro);
        setRecentScans(prev => [nuevoRegistro, ...prev.slice(0, 19)]);

        autoDismissTimer.current = setTimeout(() => {
            setScannedRecord(null);
        }, 2500);
    };

    const handleManualSubmit = (e) => {
        e.preventDefault();
        if (manualCode) {
            procesarEscaneo(manualCode);
            setManualCode('');
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const handleSalirKiosco = () => {
        router.post('/carnets/salir');
    };

    const countEstudiantes = recentScans.filter(s => s.rol === 'Estudiante').length;
    const countDocentes = recentScans.filter(s => s.rol === 'Docente').length;

    return (
        <>
            <Head title="Control de Asistencia Kiosco | COLSIH" />

            <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col justify-between select-none font-sans overflow-x-hidden relative">
                
                {/* ── BARRA SUPERIOR INSTITUCIONAL (Blanco, Azul Rey, Vinotinto) ── */}
                <header className="w-full px-6 py-4 border-b-2 border-[#003C8F] bg-white flex items-center justify-between z-20 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="/marca/logo-colsih.svg" alt="COLSIH" className="h-12 w-auto object-contain" />
                        <div>
                            <h1 className="text-base sm:text-lg font-black text-[#003C8F] tracking-tight uppercase">
                                Colegio Santa Isabel de Hungría
                            </h1>
                            <p className="text-[10px] sm:text-xs font-bold text-[#800A15] tracking-wider uppercase">
                                Control de Asistencia por Hora en Tiempo Real
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleFullscreen}
                            className="p-2.5 rounded-full bg-[#003C8F]/10 text-[#003C8F] hover:bg-[#003C8F] hover:text-white transition cursor-pointer border border-[#003C8F]/20"
                            title={isFullscreen ? 'Salir de Pantalla Completa' : 'Modo Pantalla Completa (F11)'}
                        >
                            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                        </button>

                        {!isOnlyKiosk && (
                            <Link
                                href="/sih-panel-308"
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#003C8F] text-white hover:bg-[#002868] transition text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Panel Admin</span>
                            </Link>
                        )}

                        <button
                            onClick={handleSalirKiosco}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#800A15] text-white hover:bg-[#600710] transition text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
                            title="Cerrar Kiosco y regresar a la pantalla de inicio"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Cerrar Kiosco</span>
                        </button>
                    </div>
                </header>

                {/* ── CONTENIDO PRINCIPAL CENTRADO ── */}
                <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full space-y-8 my-auto relative z-10 text-center">
                    
                    {/* RELOJ EN TIEMPO REAL */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-center gap-2 text-[#003C8F] text-xs font-extrabold uppercase tracking-widest">
                            <Clock className="w-4 h-4 text-[#800A15]" />
                            <span>Hora Institucional</span>
                        </div>
                        <div className="text-5xl sm:text-7xl font-black tracking-tight text-[#003C8F] font-mono">
                            {currentTime.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                            {currentTime.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>

                    {/* ── TARJETA PRINCIPAL DE BIENVENIDA (ANIMACIÓN SUPERRÁPIDA AL ESCANEAR) ── */}
                    {scannedRecord ? (
                        <div className="w-full max-w-lg bg-white border-4 border-[#003C8F] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 animate-scaleUp transition-all duration-300">
                            <div className="flex items-center justify-center gap-2">
                                <span className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white ${
                                    scannedRecord.rol === 'Docente' ? 'bg-[#800A15]' : 'bg-[#003C8F]'
                                }`}>
                                    {scannedRecord.rol}
                                </span>
                                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Ingreso Exitoso</span>
                                </span>
                            </div>

                            <div className="w-24 h-24 rounded-full border-4 border-[#003C8F] overflow-hidden mx-auto bg-slate-100 flex items-center justify-center shadow-md">
                                {scannedRecord.foto ? (
                                    <img src={scannedRecord.foto} alt={scannedRecord.nombreCompleto} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12 text-[#003C8F]" />
                                )}
                            </div>

                            <div className="space-y-1">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">¡Bienvenido(a)!</span>
                                <h2 className="text-2xl sm:text-3xl font-black text-[#003C8F] tracking-tight">
                                    {scannedRecord.nombreCompleto}
                                </h2>
                                <p className="text-xs font-extrabold text-[#800A15]">
                                    {scannedRecord.info}
                                </p>
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-4 text-xs font-bold text-slate-500">
                                <span>Código: {scannedRecord.code}</span>
                                <span>•</span>
                                <span>Hora: {scannedRecord.hora}</span>
                            </div>
                        </div>
                    ) : (
                        /* ── PANTALLA EN ESPERA / CENTRO DE ESCANEO ── */
                        <div className="w-full max-w-lg bg-white border-2 border-[#003C8F]/20 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
                            <div className="w-20 h-20 rounded-full bg-[#003C8F] text-white flex items-center justify-center mx-auto shadow-lg">
                                <QrCode className="w-10 h-10" />
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-xl sm:text-2xl font-black text-[#003C8F] tracking-tight uppercase">
                                    Listo para Escanear
                                </h2>
                                <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed max-w-xs mx-auto">
                                    Acerca el carnet institucional al lector de código de barras o sensor NFC
                                </p>
                            </div>

                            <div className="flex items-center justify-center gap-3 pt-2">
                                <span className="px-3 py-1 rounded-full bg-[#003C8F]/10 text-[#003C8F] text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                                    <CreditCard className="w-3.5 h-3.5" />
                                    <span>Código de Barras</span>
                                </span>
                                <span className="px-3 py-1 rounded-full bg-[#800A15]/10 text-[#800A15] text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    <span>NFC Activo</span>
                                </span>
                            </div>
                        </div>
                    )}

                    {/* ── FORMULARIO MANUAL / PRUEBA RÁPIDA ── */}
                    <form onSubmit={handleManualSubmit} className="w-full max-w-md">
                        <div className="relative">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Digitar o probar código (Ej: EST-101, DOC-102)..."
                                value={manualCode}
                                onChange={e => setManualCode(e.target.value)}
                                className="w-full bg-slate-50 border-2 border-[#003C8F]/20 text-slate-800 placeholder-slate-400 rounded-full pl-5 pr-12 py-3 text-xs font-bold focus:outline-none focus:bg-white focus:border-[#003C8F] transition-all"
                            />
                            <button
                                type="submit"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#003C8F] hover:text-[#800A15] cursor-pointer"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </form>

                    {/* ── RESUMEN DE REGISTROS DE LA SESIÓN ── */}
                    <div className="grid grid-cols-3 gap-3 w-full max-w-md text-center">
                        <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Ingresos</span>
                            <span className="text-xl font-black text-[#003C8F]">{recentScans.length}</span>
                        </div>
                        <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estudiantes</span>
                            <span className="text-xl font-black text-[#003C8F]">{countEstudiantes}</span>
                        </div>
                        <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Docentes</span>
                            <span className="text-xl font-black text-[#800A15]">{countDocentes}</span>
                        </div>
                    </div>

                    {/* ── TABLA DE ASISTENCIA EN TIEMPO REAL ── */}
                    {recentScans.length > 0 && (
                        <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                            <div className="px-5 py-3 bg-[#003C8F] text-white flex items-center justify-between">
                                <h3 className="text-xs font-black uppercase tracking-wider flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span>Registro en Tiempo Real (Sesión Actual)</span>
                                </h3>
                                <span className="text-[10px] font-extrabold bg-white/20 px-2.5 py-0.5 rounded-full">
                                    {recentScans.length} Ingresos
                                </span>
                            </div>
                            <div className="max-h-48 overflow-y-auto divide-y divide-slate-100">
                                {recentScans.map((r, idx) => (
                                    <div key={r.id || idx} className="px-5 py-2.5 flex items-center justify-between text-xs hover:bg-slate-50 transition">
                                        <div className="flex items-center gap-3">
                                            <span className="font-extrabold text-slate-400 w-5">#{recentScans.length - idx}</span>
                                            <div>
                                                <span className="font-black text-[#003C8F] block">{r.nombreCompleto}</span>
                                                <span className="text-[10px] text-slate-400 font-semibold">{r.info}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-right">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                                r.rol === 'Docente' ? 'bg-[#800A15]/10 text-[#800A15]' : 'bg-[#003C8F]/10 text-[#003C8F]'
                                            }`}>
                                                {r.rol}
                                            </span>
                                            <span className="font-mono font-bold text-slate-600">{r.hora}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </main>

                {/* ── PIE DE PÁGINA ── */}
                <footer className="w-full py-4 text-center border-t border-slate-200 bg-white text-xs font-bold text-slate-400">
                    <span>Colegio Santa Isabel de Hungría &copy; {new Date().getFullYear()} • Sistema Institucional de Control de Asistencia</span>
                </footer>
            </div>
        </>
    );
}
