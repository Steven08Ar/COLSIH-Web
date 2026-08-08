import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Cropper from 'react-easy-crop';
import { X, ZoomIn, ZoomOut, Check, RotateCcw } from 'lucide-react';

async function cargarImagen(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
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

    // fondo blanco para JPEG (sin canal alpha)
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

/**
 * Componente reutilizable de recorte de imagen.
 * Recibe siempre un File de formato web estándar (jpg/png/webp).
 * La conversión HEIC debe hacerse ANTES de abrir este componente.
 */
export default function ImageCropper({ file, aspectRatio = 1, onConfirm, onCancel, titulo = 'Ajustar foto' }) {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [procesando, setProcesando] = useState(false);

    useEffect(() => {
        if (!file) return;
        let cancelado = false;
        const reader = new FileReader();
        reader.onload = (e) => { if (!cancelado) setImageSrc(e.target.result); };
        reader.readAsDataURL(file);
        return () => { cancelado = true; };
    }, [file]);

    const onCropComplete = useCallback((_, pixels) => setCroppedAreaPixels(pixels), []);

    const confirmar = async () => {
        if (!croppedAreaPixels || !imageSrc) return;
        setProcesando(true);
        try {
            const recortada = await generarRecorte(imageSrc, croppedAreaPixels);
            onConfirm(recortada);
        } finally {
            setProcesando(false);
        }
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
                        onClick={() => { setCrop({ x: 0, y: 0 }); setZoom(1); }}
                        title="Restablecer"
                        className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Área de recorte */}
                <div className="relative flex-1 min-h-[280px] sm:min-h-[360px] bg-black">
                    {imageSrc && (
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={aspectRatio}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                            showGrid
                            cropShape="round"
                            style={{
                                containerStyle: { background: '#000' },
                                cropAreaStyle: { border: '2px solid rgba(255,255,255,0.8)' },
                            }}
                        />
                    )}

                    {/* Zoom flotante */}
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
                </div>

                {/* Barra inferior */}
                <div className="px-4 py-3 border-t border-white/10 flex items-center gap-3 shrink-0">
                    <ZoomOut className="w-3.5 h-3.5 text-white/40 shrink-0" />
                    <input
                        type="range"
                        min={1} max={5} step={0.02}
                        value={zoom}
                        onChange={e => setZoom(Number(e.target.value))}
                        className="flex-1 accent-white h-1 cursor-pointer"
                    />
                    <ZoomIn className="w-3.5 h-3.5 text-white/40 shrink-0" />

                    <button
                        onClick={confirmar}
                        disabled={procesando}
                        className="ml-3 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-xs font-extrabold hover:bg-white/90 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                    >
                        {procesando
                            ? <div className="w-3.5 h-3.5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            : <Check className="w-3.5 h-3.5" />
                        }
                        Subir
                    </button>
                </div>
            </div>
        </div>
    );

    if (typeof document === 'undefined') return null;
    return createPortal(contenido, document.body);
}
