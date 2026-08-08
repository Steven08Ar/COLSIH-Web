import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Cropper from 'react-easy-crop';
import { X, ZoomIn, ZoomOut, Check, RotateCcw, AlertCircle } from 'lucide-react';

async function cargarImagen(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', reject);
        img.src = src;
    });
}

async function generarRecorte(imageSrc, pixelCrop) {
    const image = await cargarImagen(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // fondo blanco para evitar negro en JPEG cuando hay transparencia
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        image,
        pixelCrop.x, pixelCrop.y,
        pixelCrop.width, pixelCrop.height,
        0, 0,
        pixelCrop.width, pixelCrop.height,
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) { reject(new Error('canvas vacío')); return; }
            resolve(new File([blob], 'foto-perfil.jpg', { type: 'image/jpeg' }));
        }, 'image/jpeg', 0.92);
    });
}

function esArchivoHeic(file) {
    const nombre = file.name.toLowerCase();
    return nombre.endsWith('.heic') || nombre.endsWith('.heif') ||
        file.type === 'image/heic' || file.type === 'image/heif';
}

async function convertirHeic(file) {
    if (!esArchivoHeic(file)) return { ok: true, file };

    try {
        // heic2any puede devolver un módulo CJS; manejar ambos casos
        const mod = await import('heic2any');
        const heic2any = mod.default ?? mod;
        const resultado = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.92 });
        const blob = Array.isArray(resultado) ? resultado[0] : resultado;
        const convertido = new File(
            [blob],
            file.name.replace(/\.(heic|heif)$/i, '.jpg'),
            { type: 'image/jpeg' }
        );
        return { ok: true, file: convertido };
    } catch (err) {
        console.error('heic2any error:', err);
        return { ok: false, file, error: 'No se pudo convertir el archivo HEIC. Intenta exportarlo como JPG desde la galería.' };
    }
}

// Intenta cargar la URL en un <img> para verificar que el browser la puede renderizar
function probarCarga(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

export default function ImageCropper({ file, aspectRatio = 1, onConfirm, onCancel, titulo = 'Ajustar foto' }) {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [procesando, setProcesando] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const objectUrlRef = useRef(null);

    useEffect(() => {
        if (!file) return;
        let cancelado = false;

        setCargando(true);
        setError(null);

        (async () => {
            const { ok, file: fileConvertido, error: convError } = await convertirHeic(file);

            if (cancelado) return;

            if (!ok) {
                setError(convError);
                setCargando(false);
                return;
            }

            const url = URL.createObjectURL(fileConvertido);
            objectUrlRef.current = url;

            // Verificar que el browser puede renderizar la imagen
            const cargaOk = await probarCarga(url);
            if (cancelado) return;

            if (!cargaOk) {
                URL.revokeObjectURL(url);
                setError('El browser no puede mostrar este formato. Convierte la imagen a JPG o PNG e inténtalo de nuevo.');
                setCargando(false);
                return;
            }

            setImageSrc(url);
            setCargando(false);
        })();

        return () => {
            cancelado = true;
            if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        };
    }, [file]);

    const onCropComplete = useCallback((_, pixels) => {
        setCroppedAreaPixels(pixels);
    }, []);

    const confirmar = async () => {
        if (!croppedAreaPixels || !imageSrc) return;
        setProcesando(true);
        try {
            const recortada = await generarRecorte(imageSrc, croppedAreaPixels);
            onConfirm(recortada);
        } catch {
            setError('Error al procesar la imagen. Intenta con otro archivo.');
        } finally {
            setProcesando(false);
        }
    };

    const restablecer = () => {
        setCrop({ x: 0, y: 0 });
        setZoom(1);
    };

    const contenido = (
        <div className="fixed inset-0 z-[99999] flex items-stretch sm:items-center justify-center bg-black/90 backdrop-blur-sm">
            <div
                className="relative w-full sm:w-[480px] sm:max-w-[95vw] bg-[#111] sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl"
                style={{ maxHeight: '100dvh' }}
            >
                {/* Barra superior */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
                    <button
                        onClick={onCancel}
                        className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-white">{titulo}</span>
                    <button
                        onClick={restablecer}
                        title="Restablecer posición"
                        className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Área de recorte */}
                <div className="relative flex-1 min-h-[280px] sm:min-h-[360px] bg-black">
                    {cargando && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            {esArchivoHeic(file) && (
                                <p className="text-white/50 text-xs">Convirtiendo HEIC a JPEG…</p>
                            )}
                        </div>
                    )}

                    {!cargando && error && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                            <AlertCircle className="w-8 h-8 text-red-400" />
                            <p className="text-white/80 text-sm">{error}</p>
                            <button
                                onClick={onCancel}
                                className="mt-2 px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition cursor-pointer"
                            >
                                Cerrar
                            </button>
                        </div>
                    )}

                    {!cargando && !error && imageSrc && (
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={aspectRatio}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                            showGrid={true}
                            cropShape="round"
                            style={{
                                containerStyle: { background: '#000' },
                                cropAreaStyle: { border: '2px solid rgba(255,255,255,0.8)' },
                            }}
                        />
                    )}

                    {/* Botones zoom flotantes */}
                    {!cargando && !error && (
                        <div className="absolute right-3 bottom-3 flex flex-col gap-1.5 z-10">
                            <button
                                onClick={() => setZoom(z => Math.min(5, +(z + 0.2).toFixed(2)))}
                                className="w-8 h-8 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center hover:bg-black/80 transition cursor-pointer border border-white/20"
                            >
                                <ZoomIn className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setZoom(z => Math.max(1, +(z - 0.2).toFixed(2)))}
                                className="w-8 h-8 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center hover:bg-black/80 transition cursor-pointer border border-white/20"
                            >
                                <ZoomOut className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Barra inferior: slider + confirmar */}
                <div className="px-4 py-3 border-t border-white/10 flex items-center gap-3 shrink-0">
                    <ZoomOut className="w-3.5 h-3.5 text-white/40 shrink-0" />
                    <input
                        type="range"
                        min={1}
                        max={5}
                        step={0.02}
                        value={zoom}
                        onChange={e => setZoom(Number(e.target.value))}
                        disabled={cargando || !!error}
                        className="flex-1 accent-white h-1 cursor-pointer disabled:opacity-30"
                    />
                    <ZoomIn className="w-3.5 h-3.5 text-white/40 shrink-0" />

                    <button
                        onClick={confirmar}
                        disabled={procesando || cargando || !!error}
                        className="ml-3 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-xs font-extrabold hover:bg-white/90 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                    >
                        {procesando ? (
                            <div className="w-3.5 h-3.5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        ) : (
                            <Check className="w-3.5 h-3.5" />
                        )}
                        Subir
                    </button>
                </div>
            </div>
        </div>
    );

    if (typeof document === 'undefined') return null;
    return createPortal(contenido, document.body);
}
