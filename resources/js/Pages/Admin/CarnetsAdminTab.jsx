import { useState, useEffect, useRef, useCallback } from 'react';
import { useForm, router } from '@inertiajs/react';
import { createPortal } from 'react-dom';
import {
    CreditCard, Plus, Search, Edit2, Trash2, X, Cpu, Radio,
    Code, CheckCircle2, Copy, Terminal, Wifi, WifiOff
} from 'lucide-react';

export default function CarnetsAdminTab({ carnets = [], flash }) {
    const [searchTerm, setSearchTerm]       = useState('');
    const [filterRol, setFilterRol]         = useState('Todos');
    const [showModal, setShowModal]         = useState(false);
    const [editingCarnet, setEditingCarnet] = useState(null);
    const [showCodeModal, setShowCodeModal] = useState(false);

    // Estado serial
    const [isConnected, setIsConnected]     = useState(false);
    const [serialStatus, setSerialStatus]   = useState('Desconectado');
    const [lastUid, setLastUid]             = useState('');
    const [serialLogs, setSerialLogs]       = useState([]);

    const portRef    = useRef(null);
    const readerRef  = useRef(null);

    // Ref para carnets — evita stale closure en el read loop
    const carnetsRef = useRef(carnets);
    useEffect(() => { carnetsRef.current = carnets; }, [carnets]);

    const { data, setData, post, processing, reset } = useForm({
        code: '', nfc: '', nombre: '', apellido: '',
        rol: 'Estudiante', info: '', foto: '', activo: true,
    });

    // ── Helpers ──────────────────────────────────────────────────────────────

    const addLog = useCallback((msg) => {
        const time = new Date().toLocaleTimeString('es-CO');
        setSerialLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 29)]);
    }, []);

    const openCreate = useCallback((uid = '') => {
        setEditingCarnet(null);
        reset();
        setData({
            code: `EST-${Math.floor(100 + Math.random() * 900)}`,
            nfc: uid, nombre: '', apellido: '',
            rol: 'Estudiante', info: '', foto: '', activo: true,
        });
        setShowModal(true);
    }, [reset, setData]);

    const openEdit = useCallback((carnet) => {
        setEditingCarnet(carnet);
        setData({
            code: carnet.code || '', nfc: carnet.nfc || '',
            nombre: carnet.nombre || '', apellido: carnet.apellido || '',
            rol: carnet.rol || 'Estudiante', info: carnet.info || '',
            foto: carnet.foto || '', activo: carnet.activo ?? true,
        });
        setShowModal(true);
    }, [setData]);

    // Ref para los handlers de modal — evita que el read loop capture versiones viejas
    const openCreateRef = useRef(openCreate);
    const openEditRef   = useRef(openEdit);
    const addLogRef     = useRef(addLog);
    useEffect(() => { openCreateRef.current = openCreate; }, [openCreate]);
    useEffect(() => { openEditRef.current   = openEdit;   }, [openEdit]);
    useEffect(() => { addLogRef.current     = addLog;     }, [addLog]);

    // ── Procesamiento de línea serial ─────────────────────────────────────────

    const processLine = useCallback((line) => {
        const raw = line.trim();
        if (!raw) return;
        // Extraer UID: acepta "AABBCCDD", "AA BB CC DD", "Card UID: AA BB CC DD"
        let uid = '';
        const uidMatch = raw.match(/(?:card\s+)?uid\s*:?\s*([0-9a-f\s]+)/i);
        if (uidMatch) {
            uid = uidMatch[1].replace(/\s/g, '');
        } else if (/^[0-9a-f\s]{4,23}$/i.test(raw)) {
            uid = raw.replace(/\s/g, '');
        }

        if (uid.length < 4 || uid.length > 16) return;
        uid = uid.toUpperCase();

        addLogRef.current(`⚡ UID: ${uid}`);
        setLastUid(uid);

        // Buscar en carnets vía ref (siempre actualizado)
        const found = carnetsRef.current.find(
            c => (c.nfc  && c.nfc.toUpperCase()  === uid) ||
                 (c.code && c.code.toUpperCase() === uid)
        );

        if (found) {
            addLogRef.current(`✅ Registrado: ${found.nombre} ${found.apellido}`);
            openEditRef.current(found);
        } else {
            addLogRef.current(`🆕 Tarjeta nueva — abriendo registro`);
            openCreateRef.current(uid);
        }
    }, []);

    // ── Read loop del puerto serial ───────────────────────────────────────────

    const startReadLoop = useCallback(async (port) => {
        const decoder = new TextDecoder();
        let buffer = '';

        readerRef.current = port.readable.getReader();
        try {
            while (true) {
                const { value, done } = await readerRef.current.read();
                if (done) break;
                if (!value) continue;

                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk;

                // Log raw para diagnóstico (solo si tiene contenido visible)
                const rawVisible = chunk.replace(/[\r\n]/g, '').trim();
                if (rawVisible) addLogRef.current(`📡 Raw: "${rawVisible}"`);

                const lines = buffer.split(/\r?\n/);
                buffer = lines.pop() ?? '';
                for (const line of lines) {
                    if (line.trim()) processLine(line);
                }
            }
        } catch (err) {
            addLogRef.current(`⚠️ Puerto: ${err.message}`);
        } finally {
            try { readerRef.current.releaseLock(); } catch {}
            readerRef.current = null;
            setIsConnected(false);
            setSerialStatus('Desconectado (puerto cerrado)');
        }
    }, [processLine]);

    // ── Conectar a un puerto ya obtenido ─────────────────────────────────────

    const connectToPort = useCallback(async (port) => {
        try {
            await port.open({ baudRate: 9600 });
            portRef.current = port;
            setIsConnected(true);
            setSerialStatus('Conectado a Arduino UNO (COM10)');
            addLog('✅ Puerto abierto a 9600 baudios — esperando tarjeta RFID...');
            startReadLoop(port);   // loop infinito, no await
        } catch (err) {
            setIsConnected(false);
            setSerialStatus('Error: ' + err.message);
            addLog(`❌ ${err.message}`);
        }
    }, [addLog, startReadLoop]);

    // ── Auto-connect: si el usuario ya autorizó el puerto, reconectar al montar ──

    useEffect(() => {
        if (!('serial' in navigator)) return;
        let cancelled = false;
        (async () => {
            try {
                const ports = await navigator.serial.getPorts();
                if (ports.length > 0 && !cancelled) {
                    addLog('🔄 Puerto autorizado encontrado — reconectando...');
                    connectToPort(ports[0]);
                }
            } catch {}
        })();
        return () => { cancelled = true; };
    }, [addLog, connectToPort]);

    // ── Botón de conexión manual (requestPort muestra el selector) ────────────

    const handleConnect = async () => {
        if (!('serial' in navigator)) {
            alert('Web Serial API no disponible. Usa Google Chrome o Edge en escritorio.');
            return;
        }
        try {
            setSerialStatus('Selecciona el puerto COM del Arduino...');
            const port = await navigator.serial.requestPort();
            await connectToPort(port);
        } catch (err) {
            setIsConnected(false);
            setSerialStatus('Conexión cancelada');
            addLog(`❌ ${err.message || 'Cancelado por el usuario'}`);
        }
    };

    const handleDisconnect = async () => {
        try { readerRef.current?.cancel(); } catch {}
        try { await portRef.current?.close(); } catch {}
        portRef.current = null;
        setIsConnected(false);
        setSerialStatus('Desconectado');
        addLog('Conexión serial finalizada por el usuario.');
    };

    // ── Lector HID (escáner USB que emula teclado) ────────────────────────────

    const hidBufferRef = useRef('');
    useEffect(() => {
        const onKeyDown = (e) => {
            if (showModal || showCodeModal) return;
            if (e.key === 'Enter') {
                const buf = hidBufferRef.current.trim();
                hidBufferRef.current = '';
                if (buf.length >= 3) {
                    addLog(`⌨️ HID: "${buf}"`);
                    processLine(buf);
                }
            } else if (e.key.length === 1) {
                hidBufferRef.current += e.key;
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [showModal, showCodeModal, processLine, addLog]);

    // ── CRUD ──────────────────────────────────────────────────────────────────

    const handleSubmit = (e) => {
        e.preventDefault();
        const base = window.location.pathname.replace(/\/[^/]+$/, '');
        if (editingCarnet) {
            router.post(`${base}/carnets-admin/${editingCarnet.id}`, { _method: 'PUT', ...data }, {
                forceFormData: true,
                onSuccess: () => { setShowModal(false); reset(); },
            });
        } else {
            post(`${base}/carnets-admin`, { onSuccess: () => { setShowModal(false); reset(); } });
        }
    };

    const handleDelete = (carnet) => {
        if (!confirm(`¿Eliminar el registro de ${carnet.nombre} ${carnet.apellido}?`)) return;
        const base = window.location.pathname.replace(/\/[^/]+$/, '');
        router.delete(`${base}/carnets-admin/${carnet.id}`);
    };

    // ── Filtros ───────────────────────────────────────────────────────────────

    const filtered = carnets.filter(c => {
        const q = searchTerm.toLowerCase();
        const matchQ = c.nombre.toLowerCase().includes(q) ||
                       c.apellido.toLowerCase().includes(q) ||
                       (c.code && c.code.toLowerCase().includes(q)) ||
                       (c.nfc  && c.nfc.toLowerCase().includes(q));
        return matchQ && (filterRol === 'Todos' || c.rol === filterRol);
    });

    // ── Código Arduino ────────────────────────────────────────────────────────

    const sketchCode = `/*
  COLSIH — Arduino UNO + RFID-RC522
  Pines SPI:
    VCC  → 3.3V  (¡NUNCA 5V!)
    GND  → GND
    RST  → Pin 9
    SDA  → Pin 10
    MOSI → Pin 11
    MISO → Pin 12
    SCK  → Pin 13
    IRQ  → No conectar
*/
#include <SPI.h>
#include <MFRC522.h>

#define PIN_SS        10
#define PIN_RST        9
#define DEBOUNCE_MS 2000

MFRC522 rfid(PIN_SS, PIN_RST);
String ultimoUID = "";
unsigned long ultimoMs = 0;

String uidAHex(byte *buffer, byte longitud) {
  String hex = "";
  for (byte i = 0; i < longitud; i++) {
    if (buffer[i] < 0x10) hex += "0";
    hex += String(buffer[i], HEX);
  }
  hex.toUpperCase();
  return hex;
}

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent()) return;
  if (!rfid.PICC_ReadCardSerial())   return;

  String uid = uidAHex(rfid.uid.uidByte, rfid.uid.size);
  unsigned long ahora = millis();

  if (uid != ultimoUID || ahora - ultimoMs >= DEBOUNCE_MS) {
    Serial.println(uid);
    ultimoUID = uid;
    ultimoMs  = ahora;
  }

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
}`;

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className="space-y-6 animate-fadeIn">

            {flash && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{flash}</span>
                </div>
            )}

            {/* HEADER */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-black text-[#003C8F] uppercase tracking-wider mb-1">
                        <CreditCard className="w-4 h-4 text-[#800A15]" />
                        <span>Módulo de Control Físico</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                        Gestión de Carnets y Tarjetas NFC
                    </h2>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                        Conecta el Arduino UNO — al acercar una tarjeta NFC se abre el formulario automáticamente
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                    <button type="button" onClick={() => setShowCodeModal(true)}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center gap-2 cursor-pointer border border-slate-200 dark:border-slate-700">
                        <Code className="w-4 h-4 text-[#003C8F]" />
                        Código Arduino (.ino)
                    </button>
                    <button type="button" onClick={() => openCreate()}
                        className="px-4 py-2.5 rounded-xl bg-[#003C8F] hover:bg-[#002868] text-white text-xs font-extrabold transition flex items-center gap-2 shadow-md cursor-pointer">
                        <Plus className="w-4 h-4" />
                        Registrar Carnet / NFC
                    </button>
                </div>
            </div>

            {/* PANEL LECTOR RFID */}
            <div className="bg-gradient-to-r from-[#003C8F]/5 via-white to-[#800A15]/5 dark:from-slate-900 dark:to-slate-900 border-2 border-[#003C8F]/20 dark:border-slate-800 rounded-3xl p-6 space-y-5 shadow-sm">

                {/* Estado conexión */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition ${
                            isConnected ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                        }`}>
                            <Cpu className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                Lector RFID / NFC — Arduino UNO
                                <span className={`w-2.5 h-2.5 rounded-full inline-block ${
                                    isConnected ? 'bg-emerald-500 animate-ping' : 'bg-amber-400'
                                }`} />
                            </h3>
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{serialStatus}</p>
                        </div>
                    </div>
                    {!isConnected ? (
                        <button type="button" onClick={handleConnect}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition flex items-center gap-2 shadow-sm cursor-pointer">
                            <Wifi className="w-4 h-4" />
                            Conectar Puerto COM
                        </button>
                    ) : (
                        <button type="button" onClick={handleDisconnect}
                            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold transition flex items-center gap-2 shadow-sm cursor-pointer">
                            <WifiOff className="w-4 h-4" />
                            Desconectar
                        </button>
                    )}
                </div>

                {/* Monitor + Logs */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                    {/* Monitor */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4 shadow-xs">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-[#003C8F] uppercase tracking-wider">Monitor de Lectura RFID</span>
                            <span className="text-[10px] font-bold text-slate-400">Detección Automática Activa</span>
                        </div>

                        {/* Input manual */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Escribe un UID manualmente y presiona Enter..."
                                value={lastUid}
                                onChange={e => setLastUid(e.target.value.toUpperCase())}
                                onKeyDown={e => { if (e.key === 'Enter') processLine(lastUid); }}
                                className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white px-4 py-3 rounded-xl text-sm font-mono font-bold focus:outline-none focus:border-[#003C8F]"
                            />
                            <button type="button" onClick={() => processLine(lastUid)}
                                className="px-5 py-3 bg-[#003C8F] hover:bg-[#002868] text-white text-xs font-extrabold rounded-xl transition cursor-pointer shadow-sm">
                                Consultar
                            </button>
                        </div>

                        {/* Estado de espera */}
                        <div className={`p-5 border border-dashed rounded-2xl text-center space-y-1 transition ${
                            isConnected
                                ? 'border-emerald-400/50 bg-emerald-50/40 dark:bg-emerald-950/20'
                                : 'border-slate-300 dark:border-slate-700'
                        }`}>
                            {isConnected ? (
                                <>
                                    <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 block uppercase tracking-wider animate-pulse">
                                        ● Esperando tarjeta RFID...
                                    </span>
                                    <p className="text-xs font-medium text-slate-500">
                                        Acerca tu tarjeta o llavero NFC al lector. El formulario se abrirá automáticamente.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                                        Arduino Desconectado
                                    </span>
                                    <p className="text-xs font-medium text-slate-400">
                                        Haz clic en "Conectar Puerto COM" y selecciona el Arduino UNO (COM10).
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Log serial */}
                    <div className="bg-slate-950 text-slate-200 border border-slate-800 rounded-2xl p-4 flex flex-col font-mono text-[11px] min-h-[220px]">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                                <Terminal className="w-3.5 h-3.5" />
                                Log Serial
                            </span>
                            <span className="text-[10px] text-slate-500">9600 Baud</span>
                        </div>
                        <div className="flex-1 space-y-1 overflow-y-auto pr-1">
                            {serialLogs.length > 0 ? serialLogs.map((log, i) => (
                                <div key={i} className="text-slate-300 leading-tight">{log}</div>
                            )) : (
                                <div className="text-slate-600 italic">Sin actividad...</div>
                            )}
                        </div>
                        <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between mt-2">
                            <span>COLSIH NFC System</span>
                            <span>{serialLogs.length} eventos</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* BÚSQUEDA Y FILTROS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar por Nombre, Código o NFC..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#003C8F]"
                    />
                </div>
                <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                    {['Todos', 'Estudiante', 'Docente', 'Administrativo'].map(rol => (
                        <button key={rol} type="button" onClick={() => setFilterRol(rol)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                                filterRol === rol ? 'bg-[#003C8F] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}>
                            {rol}
                        </button>
                    ))}
                </div>
            </div>

            {/* TABLA */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-200/80 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Usuario</th>
                                <th className="px-6 py-4">Rol / Grado</th>
                                <th className="px-6 py-4">Código Barras</th>
                                <th className="px-6 py-4">UID Tarjeta NFC</th>
                                <th className="px-6 py-4 text-center">Estado</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-300">
                            {filtered.length > 0 ? filtered.map(c => (
                                <tr key={c.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center font-bold text-[#003C8F] shrink-0">
                                                {c.foto
                                                    ? <img src={c.foto} alt={c.nombre} className="w-full h-full object-cover" />
                                                    : <span>{c.nombre[0]}{c.apellido[0]}</span>
                                                }
                                            </div>
                                            <span className="font-extrabold text-slate-800 dark:text-slate-100">{c.nombre} {c.apellido}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                            c.rol === 'Docente' ? 'bg-[#800A15]/10 text-[#800A15]' : 'bg-[#003C8F]/10 text-[#003C8F]'
                                        }`}>{c.rol}</span>
                                        {c.info && <span className="text-[11px] text-slate-400 block font-normal mt-0.5">{c.info}</span>}
                                    </td>
                                    <td className="px-6 py-4 font-mono font-bold text-slate-800 dark:text-slate-200">{c.code}</td>
                                    <td className="px-6 py-4 font-mono font-bold text-[#800A15] dark:text-rose-400">
                                        {c.nfc
                                            ? <span className="bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-lg border border-rose-200/60 dark:border-rose-900/60">{c.nfc}</span>
                                            : <span className="text-slate-400 font-normal italic">Sin NFC</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                            c.activo ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                                        }`}>{c.activo ? 'Activo' : 'Inactivo'}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button type="button" onClick={() => openEdit(c)}
                                                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#003C8F] hover:text-white text-slate-600 dark:text-slate-300 transition cursor-pointer" title="Editar">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button type="button" onClick={() => handleDelete(c)}
                                                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-600 dark:text-slate-300 transition cursor-pointer" title="Eliminar">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-semibold">
                                        No se encontraron carnets o tarjetas NFC.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL CREAR / EDITAR */}
            {showModal && createPortal(
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4"
                    onClick={() => setShowModal(false)}>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5"
                        onClick={e => e.stopPropagation()}>

                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-base sm:text-lg font-black text-[#003C8F] dark:text-blue-400">
                                {editingCarnet ? 'Editar Tarjeta / Carnet' : 'Registrar Nuevo Carnet / Tarjeta NFC'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {data.nfc && (
                            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl px-4 py-2.5 flex items-center gap-2">
                                <Radio className="w-4 h-4 text-amber-600 shrink-0" />
                                <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                                    UID detectado: <span className="font-mono">{data.nfc}</span>
                                </span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1">Nombre</label>
                                    <input type="text" required value={data.nombre} onChange={e => setData('nombre', e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#003C8F]"
                                        placeholder="Ej: Santiago" />
                                </div>
                                <div>
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1">Apellido</label>
                                    <input type="text" required value={data.apellido} onChange={e => setData('apellido', e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#003C8F]"
                                        placeholder="Ej: Camacho" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1">Rol</label>
                                    <select value={data.rol} onChange={e => setData('rol', e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#003C8F]">
                                        <option>Estudiante</option>
                                        <option>Docente</option>
                                        <option>Administrativo</option>
                                        <option>Visitante</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1">Info / Grado</label>
                                    <input type="text" value={data.info} onChange={e => setData('info', e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#003C8F]"
                                        placeholder="Ej: Grado 11°" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[11px] font-black text-[#003C8F] uppercase tracking-wider block mb-1">Código de Barras</label>
                                    <input type="text" required value={data.code} onChange={e => setData('code', e.target.value.toUpperCase())}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-[#003C8F]"
                                        placeholder="Ej: EST-101" />
                                </div>
                                <div>
                                    <label className="text-[11px] font-black text-[#800A15] uppercase tracking-wider block mb-1">UID Tarjeta NFC</label>
                                    <input type="text" value={data.nfc} onChange={e => setData('nfc', e.target.value.toUpperCase())}
                                        className="w-full bg-rose-50/50 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 text-slate-800 dark:text-white px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-[#800A15]"
                                        placeholder="Ej: AABBCCDD" />
                                </div>
                            </div>

                            <div>
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1">Foto URL (Opcional)</label>
                                <input type="text" value={data.foto} onChange={e => setData('foto', e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#003C8F]"
                                    placeholder="URL de imagen o Cloudflare R2" />
                            </div>

                            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer">
                                    Cancelar
                                </button>
                                <button type="submit" disabled={processing}
                                    className="px-5 py-2.5 bg-[#003C8F] hover:bg-[#002868] text-white text-xs font-black rounded-xl shadow-md transition cursor-pointer disabled:opacity-50">
                                    {editingCarnet ? 'Guardar Cambios' : 'Registrar Carnet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {/* MODAL CÓDIGO ARDUINO */}
            {showCodeModal && createPortal(
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4"
                    onClick={() => setShowCodeModal(false)}>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-4"
                        onClick={e => e.stopPropagation()}>

                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-base sm:text-lg font-black text-[#003C8F] dark:text-blue-400 flex items-center gap-2">
                                <Code className="w-5 h-5 text-[#800A15]" />
                                Código Arduino UNO + RFID-RC522
                            </h3>
                            <button onClick={() => setShowCodeModal(false)} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            Copia y sube este sketch al Arduino UNO a través del Arduino IDE. Baudrate: <strong>9600</strong>.
                        </p>

                        <div className="relative bg-slate-950 text-slate-100 rounded-2xl p-4 font-mono text-xs overflow-x-auto max-h-80 shadow-inner">
                            <button type="button" onClick={() => navigator.clipboard.writeText(sketchCode)}
                                className="absolute top-3 right-3 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[10px] font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-700">
                                <Copy className="w-3.5 h-3.5" />
                                Copiar
                            </button>
                            <pre>{sketchCode}</pre>
                        </div>

                        <div className="pt-2 flex justify-end">
                            <button type="button" onClick={() => setShowCodeModal(false)}
                                className="px-5 py-2.5 bg-[#003C8F] text-white text-xs font-black rounded-xl shadow-md cursor-pointer">
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

        </div>
    );
}
