import { useState, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import { X, Check, Radio, Cpu } from 'lucide-react';

// Base de datos institucional local de demostración para escaneo NFC y Código de Barras
const DEMO_PERSONAS = [
    { code: 'EST-101', nfc: 'NFC-101', nombre: 'Santiago', apellido: 'Camacho Corzo', rol: 'Estudiante', info: 'Grado 11° - Bachillerato' },
    { code: 'DOC-102', nfc: 'NFC-102', nombre: 'Yoleida Patricia', apellido: 'Camacho Corzo', rol: 'Docente', info: 'Docente de Primaria y Preescolar' },
    { code: 'EST-103', nfc: 'NFC-103', nombre: 'Carlos Eduardo', apellido: 'Ramírez Silva', rol: 'Estudiante', info: 'Grado 10° - Articulación SENA' },
    { code: 'DOC-104', nfc: 'NFC-104', nombre: 'María Fernanda', apellido: 'Gómez López', rol: 'Docente', info: 'Coordinadora Académica' },
    { code: 'EST-105', nfc: 'NFC-105', nombre: 'Andrés Felipe', apellido: 'Mendoza Ruiz', rol: 'Estudiante', info: 'Grado 5° - Primaria' },
    { code: 'ADM-106', nfc: 'NFC-106', nombre: 'Luz Marina', apellido: 'Valenzuela Castro', rol: 'Administrativo', info: 'Secretaria General' }
];

export default function CarnetsKiosco({ salirUrl, carnetsRegistrados = [] }) {
    const [scannedRecord, setScannedRecord] = useState(null);
    const [buffer, setBuffer] = useState('');
    const [isArduinoConnected, setIsArduinoConnected] = useState(false);
    const [serialStatus, setSerialStatus] = useState('Arduino COM10 listo');
    const portRef = useRef(null);
    const autoDismissTimer = useRef(null);

    // 1. Captura continua del lector USB HID (Código de Barras + NFC Teclado)
    useEffect(() => {
        const handleKeyDown = (e) => {
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
    }, [buffer, carnetsRegistrados]);

    // Read loop del puerto serial
    const startReadLoop = async (port) => {
        const reader = port.readable.getReader();
        const decoder = new TextDecoder();
        let serialBuffer = '';

        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                if (value) {
                    const chunk = decoder.decode(value, { stream: true });
                    serialBuffer += chunk;

                    let lines = serialBuffer.split(/\r?\n/);
                    if (lines.length > 1) {
                        serialBuffer = lines.pop();
                        for (let line of lines) {
                            const trimmed = line.trim();
                            if (trimmed.length >= 3) {
                                procesarEscaneo(trimmed);
                            }
                        }
                    } else if (serialBuffer.trim().length >= 4 && !serialBuffer.includes('\n')) {
                        const candidate = serialBuffer.trim();
                        if (/^[0-9A-Z]{4,16}$/i.test(candidate)) {
                            procesarEscaneo(candidate);
                            serialBuffer = '';
                        }
                    }
                }
            }
        } catch (err) {
            console.error('Error al leer de Arduino Serial:', err);
            setIsArduinoConnected(false);
            setSerialStatus('Desconectado');
        } finally {
            try { reader.releaseLock(); } catch {}
        }
    };

    // Auto-reconectar al puerto COM10 autorizado al cargar la página
    useEffect(() => {
        if (!('serial' in navigator)) return;
        let cancelled = false;
        (async () => {
            try {
                const ports = await navigator.serial.getPorts();
                if (ports.length > 0 && !cancelled) {
                    const port = ports[0];
                    await port.open({ baudRate: 9600 });
                    portRef.current = port;
                    setIsArduinoConnected(true);
                    setSerialStatus('Arduino COM10 Conectado');
                    startReadLoop(port);
                }
            } catch (e) {
                console.log('Sin auto-conexión previa en COM10');
            }
        })();
        return () => { cancelled = true; };
    }, []);

    // 2. Conexión Web Serial API manual para Arduino UNO (COM10 / RFID-RC522)
    const connectArduino = async () => {
        if (!('serial' in navigator)) {
            alert('La Web Serial API no está disponible en este navegador. Usa Chrome o Edge.');
            return;
        }

        try {
            setSerialStatus('Conectando a COM10...');
            const port = await navigator.serial.requestPort();
            await port.open({ baudRate: 9600 });

            portRef.current = port;
            setIsArduinoConnected(true);
            setSerialStatus('Arduino COM10 Conectado');
            startReadLoop(port);

        } catch (err) {
            console.error('Error al solicitar puerto COM10:', err);
            setIsArduinoConnected(false);
            setSerialStatus('Error de conexión');
        }
    };

    const disconnectArduino = async () => {
        if (portRef.current) {
            try {
                await portRef.current.close();
            } catch (e) {}
            portRef.current = null;
        }
        setIsArduinoConnected(false);
        setSerialStatus('Desconectado');
    };

    // Procesar código escaneado (NFC, Código de Barras o Arduino COM10)
    const procesarEscaneo = (codigoRaw) => {
        if (!codigoRaw) return;

        // Limpiar sufijos/prefijos y convertir a mayúsculas
        let cleaned = codigoRaw.trim().toUpperCase();
        const match = cleaned.match(/(?:UID\s*:?\s*)([0-9A-F\s:-]+)/i);
        if (match && match[1]) {
            cleaned = match[1].replace(/[\s:-]/g, '');
        } else {
            cleaned = cleaned.replace(/^CARD\s*/i, '').replace(/^NFC:\s*/i, '').replace(/[\s:-]/g, '');
        }

        if (!cleaned) return;

        // Buscar primero en la base de datos local / servidor
        const deBD = carnetsRegistrados.find(
            c => (c.code && c.code.toUpperCase() === cleaned) || (c.nfc && c.nfc.toUpperCase() === cleaned)
        );

        // Buscar en el registro local de demostración
        const deDemo = DEMO_PERSONAS.find(
            p => p.code.toUpperCase() === cleaned || p.nfc.toUpperCase() === cleaned
        );

        const encontrado = deBD || deDemo || {
            code: cleaned,
            nombre: 'Usuario',
            apellido: `Registrado (${cleaned})`,
            rol: cleaned.startsWith('DOC') ? 'Docente' : 'Estudiante',
            info: 'Institucional COLSIH'
        };

        if (autoDismissTimer.current) clearTimeout(autoDismissTimer.current);

        setScannedRecord({
            nombreCompleto: `${encontrado.nombre} ${encontrado.apellido}`,
            rol: encontrado.rol,
            info: encontrado.info
        });

        // Regresar suavemente a estado en espera tras 3.5 segundos
        autoDismissTimer.current = setTimeout(() => {
            setScannedRecord(null);
        }, 3500);
    };

    const handleSalirKiosco = () => {
        const url = salirUrl || `${window.location.pathname.replace(/\/$/, '')}/salir`;
        router.post(url);
    };

    return (
        <>
            <Head title="Registro de Asistencia | COLSIH" />

            <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center relative select-none overflow-hidden font-sans p-6">
                
                {/* ── BOTÓN DISCRETO ARDUINO COM10 (ARRIBA A LA IZQUIERDA) ── */}
                <div className="absolute top-6 left-6 flex items-center gap-2">
                    {!isArduinoConnected ? (
                        <button
                            type="button"
                            onClick={connectArduino}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 transition text-xs font-bold border border-slate-200 cursor-pointer"
                            title="Conectar a Arduino UNO en COM10"
                        >
                            <Radio className="w-3.5 h-3.5 text-slate-400" />
                            <span>Conectar Arduino COM10</span>
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={disconnectArduino}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 transition text-xs font-extrabold border border-emerald-200 cursor-pointer shadow-xs"
                            title="Arduino COM10 Conectado y Activo"
                        >
                            <Cpu className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                            <span>COM10 Activo</span>
                        </button>
                    )}
                </div>

                {/* ── BOTÓN SALIR ÚNICAMENTE CON UNA "X" (ARRIBA A LA DERECHA) ── */}
                <button
                    type="button"
                    onClick={handleSalirKiosco}
                    className="absolute top-6 right-6 p-3 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition duration-200 cursor-pointer"
                    title="Cerrar Kiosco"
                >
                    <X className="w-8 h-8 stroke-[2.5]" />
                </button>

                {/* ── CONTENIDO CENTRADO ULTRA-MINIMALISTA ── */}
                <div className="flex flex-col items-center text-center space-y-8 max-w-lg mx-auto">
                    
                    {/* ÍCONO VERDE CON VERIFICACIÓN Y SUAVE CHECKMARK */}
                    <div className="relative flex items-center justify-center">
                        <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full border-[5px] border-emerald-500 bg-white flex items-center justify-center text-emerald-500 shadow-lg transition-all duration-500 ${
                            scannedRecord ? 'scale-105 ring-8 ring-emerald-100 shadow-emerald-500/20' : 'opacity-90'
                        }`}>
                            <Check className={`w-18 h-18 sm:w-24 sm:h-24 stroke-[3] transition-all duration-300 ${
                                scannedRecord ? 'scale-110 text-emerald-500' : 'text-emerald-500/70'
                            }`} />
                        </div>
                    </div>

                    {/* ANIMACIÓN Y TEXTO DE VERIFICACIÓN SUAVE */}
                    {scannedRecord ? (
                        <div key={scannedRecord.nombreCompleto} className="space-y-2 animate-fadeIn transition-all duration-300">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                                ¡Bienvenido(a)!
                            </h1>
                            <p className="text-2xl sm:text-3xl font-extrabold text-[#003C8F]">
                                {scannedRecord.nombreCompleto}
                            </p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pt-1">
                                {scannedRecord.rol} • {scannedRecord.info}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2 transition-all duration-300">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                                Escanee su carnet
                            </h1>
                            <p className="text-sm font-medium text-slate-400">
                                Acerque el carnet institucional al lector NFC o código de barras
                            </p>
                        </div>
                    )}

                </div>

            </div>
        </>
    );
}
