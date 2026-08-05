import { useState, useEffect, useRef } from 'react';
import { useForm, router } from '@inertiajs/react';
import { 
    CreditCard, 
    Plus, 
    Search, 
    Edit2, 
    Trash2, 
    Check, 
    X, 
    Cpu, 
    RefreshCw, 
    User, 
    ShieldCheck, 
    Radio, 
    Code, 
    CheckCircle2, 
    AlertCircle,
    Zap,
    Copy
} from 'lucide-react';

export default function CarnetsAdminTab({ carnets = [], flash }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRol, setFilterRol] = useState('Todos');
    const [showModal, setShowModal] = useState(false);
    const [editingCarnet, setEditingCarnet] = useState(null);
    const [showCodeModal, setShowCodeModal] = useState(false);

    // Estado para conexión Web Serial API con Arduino UNO (COM9)
    const [isArduinoConnected, setIsArduinoConnected] = useState(false);
    const [arduinoStatus, setArduinoStatus] = useState('Desconectado');
    const [lastScannedUid, setLastScannedUid] = useState('');
    const [testResult, setTestResult] = useState(null);

    const portRef = useRef(null);

    // Formulario Inertia para Crear / Editar Carnet
    const { data, setData, post, put, processing, errors, reset } = useForm({
        code: '',
        nfc: '',
        nombre: '',
        apellido: '',
        rol: 'Estudiante',
        info: '',
        foto: '',
        activo: true,
    });

    // 1. Conexión Web Serial API con Arduino UNO (COM9)
    const connectArduino = async () => {
        if (!('serial' in navigator)) {
            alert('La Web Serial API no está soportada en este navegador. Por favor usa Google Chrome o Microsoft Edge.');
            return;
        }

        try {
            setArduinoStatus('Solicitando puerto COM...');
            const port = await navigator.serial.requestPort();
            await port.open({ baudRate: 9600 });

            portRef.current = port;
            setIsArduinoConnected(true);
            setArduinoStatus('Conectado a Arduino UNO (COM9)');

            const textDecoder = new TextDecoderStream();
            port.readable.pipeTo(textDecoder.writable);
            const reader = textDecoder.readable.getReader();

            let serialBuffer = '';
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    reader.releaseLock();
                    break;
                }
                if (value) {
                    serialBuffer += value;
                    const lines = serialBuffer.split(/[\r\n]+/);
                    serialBuffer = lines.pop();

                    for (const line of lines) {
                        const cleanUid = line.trim().toUpperCase();
                        if (cleanUid.length >= 4) {
                            handleCardDetected(cleanUid);
                        }
                    }
                }
            }
        } catch (err) {
            console.error('Error al conectar Arduino Serial:', err);
            setIsArduinoConnected(false);
            setArduinoStatus('Error de conexión o puerto cancelado');
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
        setArduinoStatus('Desconectado');
    };

    // Al detectar una tarjeta desde Arduino u otro lector
    const handleCardDetected = (uid) => {
        setLastScannedUid(uid);
        
        // Buscar si la tarjeta ya existe en los registros actuales
        const found = carnets.find(
            c => (c.nfc && c.nfc.toUpperCase() === uid) || (c.code && c.code.toUpperCase() === uid)
        );

        if (found) {
            setTestResult({
                status: 'registrada',
                message: '¡Tarjeta registrada y activa en la base de datos!',
                carnet: found
            });
        } else {
            setTestResult({
                status: 'nueva',
                message: `Tarjeta detectada (${uid}). Puedes asignarla a un nuevo registro.`,
                uid: uid
            });
            // Si el modal de creación está abierto o se desea crear rápido, autocompletar el campo NFC
            setData(prev => ({
                ...prev,
                nfc: prev.nfc || uid,
                code: prev.code || `EST-${Math.floor(100 + Math.random() * 900)}`
            }));
        }
    };

    // Abrir Modal de Creación
    const handleOpenCreate = () => {
        setEditingCarnet(null);
        reset();
        setData({
            code: `EST-${Math.floor(100 + Math.random() * 900)}`,
            nfc: lastScannedUid || '',
            nombre: '',
            apellido: '',
            rol: 'Estudiante',
            info: '',
            foto: '',
            activo: true,
        });
        setShowModal(true);
    };

    // Abrir Modal de Edición
    const handleOpenEdit = (carnet) => {
        setEditingCarnet(carnet);
        setData({
            code: carnet.code || '',
            nfc: carnet.nfc || '',
            nombre: carnet.nombre || '',
            apellido: carnet.apellido || '',
            rol: carnet.rol || 'Estudiante',
            info: carnet.info || '',
            foto: carnet.foto || '',
            activo: carnet.activo ?? true,
        });
        setShowModal(true);
    };

    // Guardar (Crear o Actualizar)
    const handleSubmitForm = (e) => {
        e.preventDefault();
        const basePath = window.location.pathname.split('/')[1] || 'sih-panel-308';
        const url = editingCarnet 
            ? `/${basePath}/carnets-admin/${editingCarnet.id}`
            : `/${basePath}/carnets-admin`;

        if (editingCarnet) {
            put(url, {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        } else {
            post(url, {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        }
    };

    // Eliminar Carnet
    const handleDelete = (carnet) => {
        if (confirm(`¿Estás seguro de eliminar el registro de ${carnet.nombre} ${carnet.apellido}?`)) {
            const basePath = window.location.pathname.split('/')[1] || 'sih-panel-308';
            router.delete(`/${basePath}/carnets-admin/${carnet.id}`);
        }
    };

    // Filtros
    const filteredCarnets = carnets.filter(c => {
        const matchesSearch = 
            c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (c.code && c.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (c.nfc && c.nfc.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesRol = filterRol === 'Todos' || c.rol === filterRol;
        return matchesSearch && matchesRol;
    });

    const arduinoSketchCode = `/*
  =============================================================
  CÓDIGO ARDUINO UNO + LECTOR RFID-RC522 (COLSIH KIOSCO COM9)
  =============================================================
  Conexión SPI RFID-RC522 en Arduino UNO:
  - RST  -> Pin 9
  - SDA (SS) -> Pin 10
  - MOSI -> Pin 11
  - MISO -> Pin 12
  - SCK  -> Pin 13
  - VCC  -> 3.3V (¡NUNCA 5V!)
  - GND  -> GND
*/

#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9

MFRC522 rfid(SS_PIN, RST_PIN);

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();
  Serial.println("ARDUINO_OK");
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent()) return;
  if (!rfid.PICC_ReadCardSerial()) return;

  String uidStr = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    if (rfid.uid.uidByte[i] < 0x10) uidStr += "0";
    uidStr += String(rfid.uid.uidByte[i], HEX);
  }
  uidStr.toUpperCase();

  // Imprime el UID formateado en el puerto Serial (COM9)
  Serial.println(uidStr);

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
  delay(1200);
}
`;

    return (
        <div className="space-y-6 animate-fadeIn">
            
            {/* FLASH MESSAGE */}
            {flash && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>{flash}</span>
                    </div>
                </div>
            )}

            {/* HEADER SECCIÓN & BANNER ARDUINO */}
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
                        Registra, edita, prueba lecturas en tiempo real y vincula tu Arduino UNO (COM9)
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <button
                        type="button"
                        onClick={() => setShowCodeModal(true)}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center gap-2 cursor-pointer border border-slate-200 dark:border-slate-700"
                    >
                        <Code className="w-4 h-4 text-[#003C8F]" />
                        <span>Código Arduino (.ino)</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleOpenCreate}
                        className="px-4 py-2.5 rounded-xl bg-[#003C8F] hover:bg-[#002868] text-white text-xs font-extrabold transition flex items-center gap-2 shadow-md cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Registrar Carnet / NFC</span>
                    </button>
                </div>
            </div>

            {/* ── PANEL DE PRUEBAS DE LECTURA Y CONEXIÓN CON ARDUINO UNO (COM9) ── */}
            <div className="bg-gradient-to-r from-[#003C8F]/5 via-white to-[#800A15]/5 dark:from-slate-900 dark:to-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                            isArduinoConnected ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                        }`}>
                            <Cpu className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                Pruebas de Lectura NFC (Arduino UNO - COM9)
                                <span className={`w-2.5 h-2.5 rounded-full ${isArduinoConnected ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'}`}></span>
                            </h3>
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                {arduinoStatus}
                            </p>
                        </div>
                    </div>

                    <div>
                        {!isArduinoConnected ? (
                            <button
                                type="button"
                                onClick={connectArduino}
                                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition flex items-center gap-2 shadow-sm cursor-pointer"
                            >
                                <Radio className="w-4 h-4" />
                                <span>Conectar Arduino UNO (COM9)</span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={disconnectArduino}
                                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold transition flex items-center gap-2 shadow-sm cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                                <span>Desconectar Arduino</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* PRUEBA MANUAL / ÚLTIMA LECTURA CAPTURADA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    
                    {/* Simular o Digitar Lectura */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
                            Simular o Probar UID de Tarjeta RFID (Ej: NFC-101 / 138A4F2B)
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Escanear o escribir UID..."
                                value={lastScannedUid}
                                onChange={e => setLastScannedUid(e.target.value.toUpperCase())}
                                className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white px-4 py-2.5 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-[#003C8F]"
                            />
                            <button
                                type="button"
                                onClick={() => handleCardDetected(lastScannedUid)}
                                className="px-4 py-2.5 bg-[#003C8F] hover:bg-[#002868] text-white text-xs font-bold rounded-xl transition cursor-pointer"
                            >
                                Probar Lectura
                            </button>
                        </div>
                    </div>

                    {/* Resultado de la Prueba */}
                    <div className="p-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl min-h-[72px] flex items-center justify-between">
                        {testResult ? (
                            <div className="flex items-center gap-3 w-full">
                                {testResult.status === 'registrada' ? (
                                    <>
                                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <span className="text-xs font-black text-emerald-700 block">{testResult.carnet.nombre} {testResult.carnet.apellido}</span>
                                            <span className="text-[10px] font-bold text-slate-500">{testResult.carnet.rol} • Code: {testResult.carnet.code} | NFC: {testResult.carnet.nfc || 'N/A'}</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                                            <AlertCircle className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <span className="text-xs font-bold text-amber-800 block">Tarjeta No Registrada ({testResult.uid})</span>
                                            <button
                                                type="button"
                                                onClick={handleOpenCreate}
                                                className="text-[10px] font-black text-[#003C8F] underline cursor-pointer"
                                            >
                                                + Registrar esta tarjeta ahora
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="text-xs font-semibold text-slate-400 text-center w-full">
                                Acerque una tarjeta al lector RC522 o digite el UID arriba para probar
                            </div>
                        )}
                    </div>

                </div>

            </div>

            {/* ── BARRA DE BÚSQUEDA Y FILTROS ── */}
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
                        <button
                            key={rol}
                            type="button"
                            onClick={() => setFilterRol(rol)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                                filterRol === rol
                                    ? 'bg-[#003C8F] text-white shadow-xs'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                        >
                            {rol}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── TABLA DE REGISTROS DE CARNETS Y TARJETAS NFC ── */}
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
                            {filteredCarnets.length > 0 ? (
                                filteredCarnets.map((c) => (
                                    <tr key={c.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center font-bold text-[#003C8F] shrink-0">
                                                    {c.foto ? (
                                                        <img src={c.foto} alt={c.nombre} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span>{c.nombre[0]}{c.apellido[0]}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-extrabold text-slate-800 dark:text-slate-100 block">{c.nombre} {c.apellido}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                c.rol === 'Docente' ? 'bg-[#800A15]/10 text-[#800A15]' : 'bg-[#003C8F]/10 text-[#003C8F]'
                                            }`}>
                                                {c.rol}
                                            </span>
                                            {c.info && <span className="text-[11px] text-slate-400 block font-normal mt-0.5">{c.info}</span>}
                                        </td>
                                        <td className="px-6 py-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                                            {c.code}
                                        </td>
                                        <td className="px-6 py-4 font-mono font-bold text-[#800A15] dark:text-rose-400">
                                            {c.nfc ? (
                                                <span className="bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-lg border border-rose-200/60 dark:border-rose-900/60">
                                                    {c.nfc}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 font-normal italic">Sin NFC asignado</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                                c.activo ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                                {c.activo ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleOpenEdit(c)}
                                                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#003C8F] hover:text-white text-slate-600 dark:text-slate-300 transition cursor-pointer"
                                                    title="Editar"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(c)}
                                                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-600 dark:text-slate-300 transition cursor-pointer"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-semibold">
                                        No se encontraron registros de tarjetas NFC o Carnets.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── MODAL PARA CREAR / EDITAR CARNET & NFC ── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6" onClick={e => e.stopPropagation()}>
                        
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-base sm:text-lg font-black text-[#003C8F] dark:text-blue-400">
                                {editingCarnet ? 'Editar Tarjeta / Carnet' : 'Registrar Nuevo Carnet / Tarjeta NFC'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmitForm} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1">Nombre</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.nombre}
                                        onChange={e => setData('nombre', e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#003C8F]"
                                        placeholder="Ej: Santiago"
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1">Apellido</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.apellido}
                                        onChange={e => setData('apellido', e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#003C8F]"
                                        placeholder="Ej: Camacho"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1">Rol</label>
                                    <select
                                        value={data.rol}
                                        onChange={e => setData('rol', e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#003C8F]"
                                    >
                                        <option value="Estudiante">Estudiante</option>
                                        <option value="Docente">Docente</option>
                                        <option value="Administrativo">Administrativo</option>
                                        <option value="Visitante">Visitante</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1">Info / Grado</label>
                                    <input
                                        type="text"
                                        value={data.info}
                                        onChange={e => setData('info', e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#003C8F]"
                                        placeholder="Ej: Grado 11°"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[11px] font-black text-[#003C8F] uppercase tracking-wider block mb-1">Código de Barras</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.code}
                                        onChange={e => setData('code', e.target.value.toUpperCase())}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-[#003C8F]"
                                        placeholder="Ej: EST-101"
                                    />
                                </div>

                                <div>
                                    <label className="text-[11px] font-black text-[#800A15] uppercase tracking-wider block mb-1">UID Tarjeta NFC</label>
                                    <input
                                        type="text"
                                        value={data.nfc}
                                        onChange={e => setData('nfc', e.target.value.toUpperCase())}
                                        className="w-full bg-rose-50/50 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 text-slate-800 dark:text-white px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-[#800A15]"
                                        placeholder="Ej: NFC-101 o UID 138A4F2B"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1">Foto Avatar URL (Opcional)</label>
                                <input
                                    type="text"
                                    value={data.foto}
                                    onChange={e => setData('foto', e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#003C8F]"
                                    placeholder="URL de foto o Cloudflare R2"
                                />
                            </div>

                            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2.5 bg-[#003C8F] hover:bg-[#002868] text-white text-xs font-black rounded-xl shadow-md transition cursor-pointer"
                                >
                                    {editingCarnet ? 'Guardar Cambios' : 'Registrar Carnet'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}

            {/* ── MODAL CON CÓDIGO DE ARDUINO UNO (.INO) ── */}
            {showCodeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4" onClick={() => setShowCodeModal(false)}>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-4" onClick={e => e.stopPropagation()}>
                        
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-base sm:text-lg font-black text-[#003C8F] dark:text-blue-400 flex items-center gap-2">
                                <Code className="w-5 h-5 text-[#800A15]" />
                                <span>Código Arduino UNO + RFID-RC522 (COM9)</span>
                            </h3>
                            <button onClick={() => setShowCodeModal(false)} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            Copia y sube este programa a tu **Arduino UNO (COM9)** mediante el Arduino IDE. Asegúrate de conectar el módulo RFID-RC522 a los pines indicados.
                        </p>

                        <div className="relative bg-slate-950 text-slate-100 rounded-2xl p-4 font-mono text-xs overflow-x-auto max-h-80 shadow-inner">
                            <button
                                type="button"
                                onClick={() => navigator.clipboard.writeText(arduinoSketchCode)}
                                className="absolute top-3 right-3 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[10px] font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-700"
                            >
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copiar Código</span>
                            </button>
                            <pre>{arduinoSketchCode}</pre>
                        </div>

                        <div className="pt-2 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setShowCodeModal(false)}
                                className="px-5 py-2.5 bg-[#003C8F] text-white text-xs font-black rounded-xl shadow-md cursor-pointer"
                            >
                                Entendido
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}
