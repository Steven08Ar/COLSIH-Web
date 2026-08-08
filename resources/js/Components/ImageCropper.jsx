import React, { useState, useCallback, useEffect, useRef } from 'react';
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

    ctx.drawImage(
        image,
        pixelCrop.x, pixelCrop.y,
        pixelCrop.width, pixelCrop.height,
        0, 0,
        pixelCrop.width, pixelCrop.height,
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(new File([blob], 'foto-perfil.jpg', { type: 'image/jpeg' }));
        }, 'image/jpeg', 0.92);
    });
}

async function convertirHeic(file) {
    const nombre = file.name.toLowerCase();
    const esHeic = nombre.endsWith('.heic') || nombre.endsWith('.heif') ||
        file.type === 'image/heic' || file.type === 'image/heif';
    if (!esHeic) return file;

    try {
        const heic2any = (await import('heic2any')).default;
        const blob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.92 });
        const resultado = Array.isArray(blob) ? blob[0] : blob;
        return new File([resultado], file.name.replace(/\.(heic|heif)$/i, '.jpg'), { type: 'image/jpeg' });
    } catch {
        return file;
    }
}

export default function ImageCropper({ file, aspectRatio = 1, onConfirm, onCancel, titulo = 'Ajustar foto' }) {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [procesando, setProcesando] = useState(false);
    const [cargando, setCargando] = useState(true);
    const objectUrlRef = useRef(null);

    useEffect(() => {
        if (!file) return;
        setCargando(true);
        convertirHeic(file).then((fileConvertido) => {
            const url = URL.createObjectURL(fileConvertido);
            objectUrlRef.current = url;
            setImageSrc(url);
            setCargando(false);
        });
        return () => {
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
        } finally {
            setProcesando(false);
        }
    };

    const restablecer = () => {
        setCrop({ x: 0, y: 0 });
        setZoom(1);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-stretch sm:items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative w-full sm:w-[480px] sm:max-w-[95vw] bg-[#111] sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl"
                style={{ maxHeight: '100dvh' }}>

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
                        title="Restablecer"
                        className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Área de recorte */}
                <div className="relative flex-1 min-h-[280px] sm:min-h-[360px] bg-black">
                    {cargando ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        </div>
                    ) : imageSrc ? (
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
                                cropAreaStyle: {
                                    border: '2px solid rgba(255,255,255,0.8)',
                                },
                                mediaStyle: {},
                            }}
                        />
                    ) : null}

                    {/* Botones zoom flotantes */}
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
                        className="flex-1 accent-white h-1 cursor-pointer"
                    />
                    <ZoomIn className="w-3.5 h-3.5 text-white/40 shrink-0" />

                    <button
                        onClick={confirmar}
                        disabled={procesando || cargando}
                        className="ml-3 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-xs font-extrabold hover:bg-white/90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
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
}
