import { useState, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import { X, Check } from 'lucide-react';

// Base de datos institucional de demostración para escaneo NFC y Código de Barras
const DEMO_PERSONAS = [
    { code: 'EST-101', nfc: 'NFC-101', nombre: 'Santiago', apellido: 'Camacho Corzo', rol: 'Estudiante', info: 'Grado 11° - Bachillerato' },
    { code: 'DOC-102', nfc: 'NFC-102', nombre: 'Yoleida Patricia', apellido: 'Camacho Corzo', rol: 'Docente', info: 'Docente de Primaria y Preescolar' },
    { code: 'EST-103', nfc: 'NFC-103', nombre: 'Carlos Eduardo', apellido: 'Ramírez Silva', rol: 'Estudiante', info: 'Grado 10° - Articulación SENA' },
    { code: 'DOC-104', nfc: 'NFC-104', nombre: 'María Fernanda', apellido: 'Gómez López', rol: 'Docente', info: 'Coordinadora Académica' },
    { code: 'EST-105', nfc: 'NFC-105', nombre: 'Andrés Felipe', apellido: 'Mendoza Ruiz', rol: 'Estudiante', info: 'Grado 5° - Primaria' },
    { code: 'ADM-106', nfc: 'NFC-106', nombre: 'Luz Marina', apellido: 'Valenzuela Castro', rol: 'Administrativo', info: 'Secretaria General' }
];

export default function CarnetsKiosco({ salirUrl }) {
    const [scannedRecord, setScannedRecord] = useState(null);
    const [buffer, setBuffer] = useState('');
    const autoDismissTimer = useRef(null);

    // Captura continua del lector HID (Código de Barras + NFC)
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
            apellido: 'Registrado',
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
                                Acerque el carnet institucional al lector
                            </p>
                        </div>
                    )}

                </div>

            </div>
        </>
    );
}
