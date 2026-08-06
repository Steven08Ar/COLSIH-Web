import { useState, useEffect, useRef, useCallback } from 'react';
import { Head, router } from '@inertiajs/react';
import { X, Check, Radio, Cpu, AlertCircle } from 'lucide-react';

// Registro de demostración local con soporte para Jesús David y plantilla institucional
const DEMO_PERSONAS = [
    { code: 'EST-952', nfc: '1D8EDA36', nombre: 'Jesús David', apellido: 'Arias Estupiñán', rol: 'Docente', info: 'Informática', foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JesusDavid' },
    { code: 'EST-101', nfc: 'NFC-101', nombre: 'Santiago', apellido: 'Camacho Corzo', rol: 'Estudiante', info: 'Grado 11° - Bachillerato', foto: '' },
    { code: 'DOC-102', nfc: 'NFC-102', nombre: 'Yoleida Patricia', apellido: 'Camacho Corzo', rol: 'Docente', info: 'Docente de Primaria y Preescolar', foto: '' },
    { code: 'EST-103', nfc: 'NFC-103', nombre: 'Carlos Eduardo', apellido: 'Ramírez Silva', rol: 'Estudiante', info: 'Grado 10° - Articulación SENA', foto: '' },
    { code: 'DOC-104', nfc: 'NFC-104', nombre: 'María Fernanda', apellido: 'Gómez López', rol: 'Docente', info: 'Coordinadora Académica', foto: '' },
    { code: 'EST-105', nfc: 'NFC-105', nombre: 'Andrés Felipe', apellido: 'Mendoza Ruiz', rol: 'Estudiante', info: 'Grado 5° - Primaria', foto: '' },
    { code: 'ADM-106', nfc: 'NFC-106', nombre: 'Luz Marina', apellido: 'Valenzuela Castro', rol: 'Administrativo', info: 'Secretaria General', foto: '' }
];

export default function CarnetsKiosco({ salirUrl, carnetsRegistrados = [] }) {
    const [scannedRecord, setScannedRecord] = useState(null);
    const [isArduinoConnected, setIsArduinoConnected] = useState(false);
    const [serialStatus, setSerialStatus] = useState('Arduino COM10 listo');
    
    const portRef = useRef(null);
    const autoDismissTimer = useRef(null);
    const carnetsRef = useRef(carnetsRegistrados);
    const bufferRef = useRef('');
    const lastScanRef = useRef({ code: '', time: 0 });

    useEffect(() => {
        carnetsRef.current = carnetsRegistrados;
    }, [carnetsRegistrados]);

    // Procesar código escaneado (NFC, Código de Barras o Arduino COM10)
    const procesarEscaneo = useCallback((codigoRaw) => {
        if (!codigoRaw) return;
        const line = codigoRaw.trim();

        // 1. Filtrar líneas de depuración emitidas por bibliotecas Arduino MFRC522
        if (/(MIFARE|PICC|TYPE|CARD DETECTED|ANTICOLL|S50|S70|ARDUINO_OK|READY)/i.test(line)) {
            return;
        }

        // 2. Extraer el UID hexadecimal o código de carnet limpio
        let cleaned = '';
        const match = line.match(/(?:card\s+)?uid\s*:?\s*([0-9a-f\s:-]+)/i);
        if (match && match[1]) {
            cleaned = match[1].replace(/[\s:-]/g, '');
        } else if (/^[0-9a-f\s:-]{4,24}$/i.test(line)) {
            cleaned = line.replace(/[\s:-]/g, '');
        } else {
            cleaned = line.replace(/^CARD\s*/i, '').replace(/^NFC:\s*/i, '').replace(/[\s:-]/g, '');
        }

        cleaned = cleaned.toUpperCase();

        if (cleaned.length < 4 || cleaned.length > 20) return;

        // Debounce: Evitar procesar el mismo escaneo repetitivo en menos de 1.2 segundos (por tarjetas apoyadas en el sensor)
        const now = Date.now();
        if (lastScanRef.current.code === cleaned && (now - lastScanRef.current.time) < 1200) {
            return;
        }
        lastScanRef.current = { code: cleaned, time: now };

        // 3. Buscar coincidencia exacta en la Base de Datos o Lista Demo
        const deBD = carnetsRef.current.find(
            c => (c.nfc && c.nfc.toUpperCase() === cleaned) || (c.code && c.code.toUpperCase() === cleaned)
        );

        const deDemo = DEMO_PERSONAS.find(
            p => p.nfc.toUpperCase() === cleaned || p.code.toUpperCase() === cleaned
        );

        const encontrado = deBD || deDemo;

        if (autoDismissTimer.current) clearTimeout(autoDismissTimer.current);

        if (encontrado) {
            setScannedRecord({
                status: 'exito',
                nombreCompleto: `${encontrado.nombre} ${encontrado.apellido}`,
                rol: encontrado.rol || 'Estudiante',
                info: encontrado.info || 'Institucional COLSIH',
                foto: encontrado.foto || null,
                iniciales: `${encontrado.nombre ? encontrado.nombre[0] : ''}${encontrado.apellido ? encontrado.apellido[0] : ''}`.toUpperCase()
            });
        } else {
            setScannedRecord({
                status: 'desconocida',
                nombreCompleto: 'Tarjeta No Registrada',
                rol: 'Aviso de Asistencia',
                info: `UID Detectado: ${cleaned}`,
                foto: null,
                iniciales: '?'
            });
        }

        // Regresar suavemente a estado en espera tras 4 segundos
        autoDismissTimer.current = setTimeout(() => {
            setScannedRecord(null);
        }, 4000);
    }, []);

    // 1. Captura continua ultra-estable del lector USB HID (Barcodes + NFC Keyboard) sin des-suscripciones constantes
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                const text = bufferRef.current.trim();
                bufferRef.current = '';
                if (text.length > 0) {
                    procesarEscaneo(text);
                }
            } else if (e.key.length === 1) {
                bufferRef.current += e.key;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [procesarEscaneo]);

    // Read loop permanente del puerto serial Arduino COM10
    const startReadLoop = useCallback(async (port) => {
        const reader = port.readable.getReader();
        const decoder = new TextDecoder();
        let serialBuffer = '';

        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                if (!value) continue;

                const chunk = decoder.decode(value, { stream: true });
                serialBuffer += chunk;

                const lines = serialBuffer.split(/\r?\n/);
                serialBuffer = lines.pop() ?? ''; // Conservar fragmento incompleto hasta la llegada completa del salto de línea

                for (const line of lines) {
                    if (line.trim()) {
                        try {
                            procesarEscaneo(line.trim());
                        } catch (pErr) {
                            console.error('Error al procesar línea serial:', pErr);
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
    }, [procesarEscaneo]);

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
    }, [startReadLoop]);

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
                    
                    {/* ÍCONO / AVATAR DENTRO DEL CÍRCULO CON ANIMACIÓN */}
                    <div className="relative flex items-center justify-center">
                        <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full border-[5px] flex items-center justify-center shadow-xl transition-all duration-500 overflow-hidden ${
                            scannedRecord
                                ? scannedRecord.status === 'exito'
                                    ? 'border-emerald-500 bg-emerald-50 scale-105 ring-8 ring-emerald-100 shadow-emerald-500/30'
                                    : 'border-amber-500 bg-amber-50 scale-105 ring-8 ring-amber-100 shadow-amber-500/30'
                                : 'border-emerald-500 bg-white opacity-90'
                        }`}>
                            {scannedRecord ? (
                                scannedRecord.foto ? (
                                    <img
                                        src={scannedRecord.foto}
                                        alt={scannedRecord.nombreCompleto}
                                        className="w-full h-full object-cover rounded-full p-1 animate-fadeIn"
                                    />
                                ) : scannedRecord.status === 'exito' ? (
                                    <div className="w-full h-full flex items-center justify-center bg-[#003C8F] text-white font-extrabold text-3xl sm:text-4xl rounded-full">
                                        {scannedRecord.iniciales}
                                    </div>
                                ) : (
                                    <AlertCircle className="w-18 h-18 sm:w-24 sm:h-24 text-amber-500" />
                                )
                            ) : (
                                <Check className="w-20 h-20 sm:w-26 sm:h-26 stroke-[3] text-emerald-500" />
                            )}
                        </div>
                    </div>

                    {/* ANIMACIÓN Y TEXTO DE VERIFICACIÓN Y ASISTENCIA */}
                    {scannedRecord ? (
                        <div key={scannedRecord.nombreCompleto} className="space-y-2 animate-fadeIn transition-all duration-300">
                            {scannedRecord.status === 'exito' ? (
                                <>
                                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                                        ¡Bienvenido(a)!
                                    </h1>
                                    <p className="text-2xl sm:text-3xl font-extrabold text-[#003C8F]">
                                        {scannedRecord.nombreCompleto}
                                    </p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pt-1">
                                        {scannedRecord.rol} • {scannedRecord.info}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-600 tracking-tight">
                                        Tarjeta No Registrada
                                    </h1>
                                    <p className="text-lg font-mono font-bold text-slate-700">
                                        {scannedRecord.info}
                                    </p>
                                    <p className="text-xs font-semibold text-slate-400 pt-1">
                                        Por favor regístrela en el panel de administración
                                    </p>
                                </>
                            )}
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
