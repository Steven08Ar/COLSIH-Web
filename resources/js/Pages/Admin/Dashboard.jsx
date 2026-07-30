import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import PageBuilder from './PageBuilder/PageBuilder';
import { Sun, Moon } from 'lucide-react';
import { processImageFile } from '@/utils/heicConverter';

/* ── helpers ── */
function Flash({ message }) {
    if (!message) return null;
    return (
        <div className="mb-6 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-2xl flex items-center gap-2 shadow-sm font-medium animate-fadeIn">
            <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {message}
        </div>
    );
}

function Modal({ title, onClose, isWide = false, children }) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-6 md:p-8 animate-fadeIn" onClick={onClose}>
            <div className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl sm:rounded-[28px] p-4 sm:p-6 md:p-8 w-full ${isWide ? 'max-w-5xl' : 'max-w-xl'} max-h-[92vh] overflow-y-auto shadow-2xl transform scale-100 transition-all duration-300`} onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-slate-800 dark:text-slate-100 font-extrabold text-base sm:text-lg tracking-tight">{title}</h3>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition flex items-center justify-center text-lg leading-none cursor-pointer">✕</button>
                </div>
                {children}
            </div>
        </div>
    );
}

/* ── Testimonios ── */
const ROLES_TESTIMONIO = ['Estudiante', 'Docente', 'Administrativo', 'Planta'];

function FotoPositionEditor({ previewImage, posicion, onChange }) {
    const containerRef = useRef(null);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startPos = useRef(50);

    function getClientY(e) {
        return e.touches ? e.touches[0].clientY : e.clientY;
    }

    function onStart(e) {
        isDragging.current = true;
        startY.current = getClientY(e);
        startPos.current = posicion;
        e.preventDefault();
    }

    function onMove(e) {
        if (!isDragging.current) return;
        const dy = getClientY(e) - startY.current;
        const h = containerRef.current?.offsetHeight || 1;
        const next = Math.round(Math.max(0, Math.min(100, startPos.current + (dy / h) * 100)));
        onChange(next);
    }

    function onEnd() { isDragging.current = false; }

    return (
        <div className="space-y-2">
            <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">
                Posición de la Foto
            </label>
            <div
                ref={containerRef}
                className="relative rounded-xl overflow-hidden h-36 cursor-ns-resize select-none border border-slate-200 dark:border-slate-700"
                onMouseDown={onStart} onMouseMove={onMove} onMouseUp={onEnd} onMouseLeave={onEnd}
                onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onEnd}
            >
                {previewImage ? (
                    <img
                        src={previewImage}
                        alt="Posición"
                        draggable={false}
                        className="w-full h-full object-cover pointer-events-none"
                        style={{ objectPosition: `center ${posicion}%` }}
                    />
                ) : (
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <span className="text-slate-400 text-xs">Sube una foto primero</span>
                    </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        Arrastra para ajustar
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button type="button" onClick={() => onChange(Math.max(0, posicion - 10))}
                    className="flex-1 text-xs font-bold py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition cursor-pointer">
                    ↑ Arriba
                </button>
                <span className="text-[11px] font-bold text-slate-400 w-12 text-center shrink-0">{posicion}%</span>
                <button type="button" onClick={() => onChange(Math.min(100, posicion + 10))}
                    className="flex-1 text-xs font-bold py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition cursor-pointer">
                    ↓ Abajo
                </button>
            </div>
        </div>
    );
}

function TestimoniosTab({ testimonios, flash }) {
    const [editando, setEditando] = useState(null);
    const [creando, setCreando] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const form = useForm({
        nombre: '',
        cargo: 'Estudiante',
        texto: '',
        imagen: null,
        foto_posicion: 50,
        video_url: '',
        video_activo: false,
        activo: true,
        orden: 0
    });

    function abrirCrear() {
        form.reset();
        form.setData('cargo', 'Estudiante');
        form.setData('foto_posicion', 50);
        form.setData('video_activo', false);
        setEditando(null);
        setCreando(true);
    }

    function abrirEditar(t) {
        form.setData({
            nombre: t.nombre,
            cargo: t.cargo ?? 'Estudiante',
            texto: t.texto,
            imagen: null,
            foto_posicion: Number(t.foto_posicion ?? 50),
            video_url: t.video_url ?? '',
            video_activo: !!t.video_activo,
            activo: !!t.activo,
            orden: t.orden ?? 0
        });
        setEditando(t);
        setCreando(false);
    }

    function cerrar() {
        setCreando(false);
        setEditando(null);
        form.clearErrors();
    }

    useEffect(() => {
        if (form.data.imagen) {
            if (form.data.imagen instanceof File) {
                const objectUrl = URL.createObjectURL(form.data.imagen);
                setPreviewImage(objectUrl);
                return () => URL.revokeObjectURL(objectUrl);
            } else {
                setPreviewImage(form.data.imagen);
            }
        } else if (editando && editando.imagen) {
            setPreviewImage(`/storage/${editando.imagen}`);
        } else {
            setPreviewImage(null);
        }
    }, [form.data.imagen, editando, creando]);

    function guardar(e) {
        e.preventDefault();
        if (editando) {
            // Spoofed PUT inside Inertia POST request to support binary uploads
            router.post(`${window.location.pathname.replace(/\/[^/]+$/, '')}/testimonios/${editando.id}`, {
                _method: 'PUT',
                ...form.data
            }, {
                onSuccess: cerrar,
                onError: (errs) => {
                    Object.keys(errs).forEach(key => form.setError(key, errs[key]));
                }
            });
        } else {
            form.post(`${window.location.pathname.replace(/\/[^/]+$/, '')}/testimonios`, { onSuccess: cerrar });
        }
    }

    function eliminar(id) {
        setDeletingId(null);
        router.delete(`${window.location.pathname.replace(/\/[^/]+$/, '')}/testimonios/${id}`, {
            preserveState: true, preserveScroll: true,
        });
    }

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl sm:rounded-[24px] p-4 sm:p-6 lg:p-8 shadow-sm">
            <Flash message={flash} />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div>
                    <h2 className="text-slate-800 dark:text-slate-100 font-extrabold text-base sm:text-lg tracking-tight">Testimonios ({testimonios.length})</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Gestiona las citas del carrusel de inicio</p>
                </div>
                <button onClick={abrirCrear} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/10 transition duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Nuevo Testimonio
                </button>
            </div>

            <div className="space-y-4">
                {testimonios.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-400 text-sm">No hay testimonios registrados aún.</p>
                    </div>
                )}
                {testimonios.map(t => (
                    <div key={t.id} className="bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 hover:border-slate-300/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-4 transition duration-200">
                        {t.imagen && (
                            <img src={`/storage/${t.imagen}`} alt={t.nombre} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700" />
                        )}
                        <div className="flex-1 min-w-0 w-full">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{t.nombre}</span>
                                {t.cargo && <span className="text-slate-400 dark:text-slate-500 text-xs font-medium bg-slate-100 dark:bg-slate-800/65 px-2 py-0.5 rounded-md">{t.cargo}</span>}
                                {t.video_url && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30">Video</span>
                                )}
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                    t.activo
                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
                                        : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30'
                                }`}>
                                    {t.activo ? 'Visible' : 'Oculto'}
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 italic leading-relaxed">«{t.texto}»</p>
                        </div>
                        <div className="flex gap-2 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200/60 dark:border-slate-800/60">
                            <button onClick={() => abrirEditar(t)} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition cursor-pointer">Editar</button>
                            {deletingId === t.id ? (
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400">¿Seguro?</span>
                                    <button onClick={() => eliminar(t.id)} className="text-[11px] font-extrabold bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 rounded-lg transition cursor-pointer">Sí</button>
                                    <button onClick={() => setDeletingId(null)} className="text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg transition cursor-pointer">No</button>
                                </div>
                            ) : (
                                <button onClick={() => setDeletingId(t.id)} className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-800 hover:bg-rose-50 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition cursor-pointer">Eliminar</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {(creando || editando) && (
                <Modal title={editando ? 'Editar Testimonio' : 'Crear Nuevo Testimonio'} onClose={cerrar} isWide={true}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

                        {/* Left: Card Preview */}
                        <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col items-center justify-start space-y-4">
                            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Vista Previa en Web</span>
                            <div className="w-full bg-[#030712] p-4 sm:p-6 rounded-3xl flex items-center justify-center border border-slate-900 shadow-inner min-h-[360px] sm:min-h-[440px]">
                                <div className="w-full max-w-[280px] min-h-[360px] sm:min-h-[380px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 bg-slate-900/50 relative flex flex-col justify-between p-6 select-none">
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="Vista Previa"
                                            className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
                                            style={{ objectPosition: `center ${form.data.foto_posicion}%` }}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-slate-800 z-0 flex items-center justify-center">
                                            <span className="text-slate-600 text-xs">Sin imagen</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-slate-950/75 z-10"></div>
                                    {form.data.video_activo && form.data.video_url && (
                                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/25 pointer-events-none">
                                            <div className="w-14 h-14 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-md flex items-center justify-center shadow-xl">
                                                <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                            </div>
                                        </div>
                                    )}
                                    <div className="relative z-30 flex flex-col justify-between h-full flex-1">
                                        <div className="flex justify-between items-start">
                                            <span className="text-6xl font-serif text-white/25 leading-none">"</span>
                                            {form.data.video_activo && form.data.video_url && (
                                                <div className="bg-[#800A15] text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                                    Video
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-h-[60px]"></div>
                                        <div className="space-y-3">
                                            <p className="text-white text-[11px] font-bold italic leading-relaxed text-left"
                                                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.95)' }}>
                                                {form.data.texto ? `«${form.data.texto}»` : '«Texto del testimonio...»'}
                                            </p>
                                            <div className="text-left">
                                                <span className="block text-xs font-extrabold text-white drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">
                                                    {form.data.nombre || 'Nombre de la Persona'}
                                                </span>
                                                <span className="block text-[9px] font-bold text-[#3b82f6] uppercase tracking-wider mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                                    {form.data.cargo || 'Rol'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <form onSubmit={guardar} className="order-1 lg:order-2 lg:col-span-7 space-y-4 text-left flex flex-col justify-between">
                            <div className="space-y-4">

                                {/* Nombre */}
                                <div>
                                    <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Nombre Completo *</label>
                                    <input
                                        value={form.data.nombre}
                                        onChange={e => form.setData('nombre', e.target.value)}
                                        required
                                        placeholder="Ej: María Camila Restrepo"
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium"
                                    />
                                    {form.errors.nombre && <p className="text-rose-500 text-xs mt-1 font-semibold">{form.errors.nombre}</p>}
                                </div>

                                {/* Rol — select fijo */}
                                <div>
                                    <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Rol *</label>
                                    <select
                                        value={form.data.cargo}
                                        onChange={e => form.setData('cargo', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium cursor-pointer"
                                    >
                                        {ROLES_TESTIMONIO.map(r => (
                                            <option key={r} value={r}>{r}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Texto */}
                                <div>
                                    <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Texto del Testimonio *</label>
                                    <textarea
                                        value={form.data.texto}
                                        onChange={e => form.setData('texto', e.target.value)}
                                        required
                                        rows={3}
                                        placeholder="Escribe el testimonio aquí..."
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium resize-none"
                                    />
                                    {form.errors.texto && <p className="text-rose-500 text-xs mt-1 font-semibold">{form.errors.texto}</p>}
                                </div>

                                {/* Foto + botón subir */}
                                <div>
                                    <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1.5">Foto de Fondo *</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="file"
                                            accept="image/*,.heic,.heif,image/heic,image/heif"
                                            onChange={async (e) => {
                                                const f = e.target.files[0];
                                                if (!f) return;
                                                const processed = await processImageFile(f);
                                                form.setData('imagen', processed);
                                            }}
                                            required={!editando}
                                            className="hidden"
                                            id="testimonio-file-upload"
                                        />
                                        <label htmlFor="testimonio-file-upload"
                                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition cursor-pointer select-none whitespace-nowrap">
                                            {form.data.imagen ? 'Cambiar Foto' : 'Seleccionar Foto'}
                                        </label>
                                        <span className="text-xs text-slate-400 font-medium truncate">
                                            {form.data.imagen ? form.data.imagen.name : (editando ? 'Conservar foto actual' : 'Ningún archivo')}
                                        </span>
                                    </div>
                                    {form.errors.imagen && <p className="text-rose-500 text-xs mt-1 font-semibold">{form.errors.imagen}</p>}
                                </div>

                                {/* Editor de posición de foto */}
                                <FotoPositionEditor
                                    previewImage={previewImage}
                                    posicion={form.data.foto_posicion}
                                    onChange={v => form.setData('foto_posicion', v)}
                                />

                                {/* Toggle de video */}
                                <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-slate-700 dark:text-slate-200 text-sm font-bold">Video del testimonio</span>
                                            <p className="text-slate-400 text-[11px] mt-0.5">
                                                {form.data.video_activo ? 'Habilitado — se mostrará botón de reproducción' : 'Deshabilitado — la tarjeta no tendrá video'}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => form.setData('video_activo', !form.data.video_activo)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none cursor-pointer ${
                                                form.data.video_activo ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
                                            }`}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                                form.data.video_activo ? 'translate-x-6' : 'translate-x-1'
                                            }`} />
                                        </button>
                                    </div>
                                    {form.data.video_activo && (
                                        <div>
                                            <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">URL de YouTube</label>
                                            <input
                                                value={form.data.video_url}
                                                onChange={e => form.setData('video_url', e.target.value)}
                                                placeholder="https://www.youtube.com/watch?v=..."
                                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium"
                                            />
                                            {form.errors.video_url && <p className="text-rose-500 text-xs mt-1 font-semibold">{form.errors.video_url}</p>}
                                        </div>
                                    )}
                                </div>

                                {/* Orden + Visible */}
                                <div className="flex gap-4 items-center">
                                    <div className="flex-1">
                                        <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Orden</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={form.data.orden}
                                            onChange={e => form.setData('orden', Number(e.target.value))}
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium"
                                        />
                                    </div>
                                    <div className="flex items-end pb-0.5 h-full pt-5">
                                        <label className="flex items-center gap-2 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                checked={form.data.activo}
                                                onChange={e => form.setData('activo', e.target.checked)}
                                                className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-slate-600 text-sm font-semibold">Visible</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-5">
                                <button type="submit" disabled={form.processing} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl py-3 text-sm transition cursor-pointer shadow-md shadow-blue-500/10 active:scale-[0.98]">
                                    {form.processing ? 'Guardando…' : 'Guardar Testimonio'}
                                </button>
                                <button type="button" onClick={cerrar} className="w-full sm:w-auto px-5 bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-xl py-3 text-sm transition font-bold cursor-pointer">Cancelar</button>
                            </div>
                        </form>

                    </div>
                </Modal>
            )}
        </div>
    );
}

/* ── Noticias: editor de bloques ── */
const TIPO_META = {
    texto:     { label: 'Texto',     color: 'bg-slate-100 text-slate-600',   icon: 'T' },
    titulo:    { label: 'Título',    color: 'bg-amber-50 text-amber-600',    icon: 'H' },
    imagen:    { label: 'Imagen',    color: 'bg-blue-50 text-blue-600',      icon: 'I' },
    video:     { label: 'Video',     color: 'bg-purple-50 text-purple-600',  icon: 'V' },
    cita:      { label: 'Cita',      color: 'bg-emerald-50 text-emerald-600', icon: 'Q' },
    ficha:     { label: 'Ficha',     color: 'bg-cyan-50 text-cyan-600',      icon: 'F' },
    separador: { label: 'Separador', color: 'bg-rose-50 text-rose-600',      icon: '—' },
};

function BloqueEditor({ bloque, idx, total, onChange, onDelete, onMoveUp, onMoveDown, fileRef }) {
    const meta = TIPO_META[bloque.tipo] || TIPO_META.texto;
    const width = bloque.width || 'completo';
    const widthClass = width === 'estrecho' ? 'w-full md:w-1/3 px-2 mb-4' : (width === 'mediano' ? 'w-full md:w-1/2 px-2 mb-4' : 'w-full px-2 mb-4');

    async function handleFile(e) {
        const f = e.target.files[0];
        if (!f) return;
        const processed = await processImageFile(f);
        fileRef(idx, processed);
        onChange(idx, { ...bloque, _preview: URL.createObjectURL(processed), imagen: '' });
    }

    const previewSrc = bloque._preview || (bloque.imagen ? `/storage/${bloque.imagen}` : null);

    // Formato state helpers for Text Blocks
    const toggleFormat = (key) => {
        const formato = { ...bloque.formato };
        formato[key] = !formato[key];
        onChange(idx, { ...bloque, formato });
    };

    const changeFormatValue = (key, value) => {
        const formato = { ...bloque.formato };
        formato[key] = value;
        onChange(idx, { ...bloque, formato });
    };

    const formato = bloque.formato || { size: 'normal', bold: false, italic: false, underline: false, color: 'gris' };

    return (
        <div className={widthClass}>
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-xs hover:border-slate-300 transition duration-150 text-left">
                {/* Block Header */}
                <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-100 select-none flex-wrap">
                    <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black ${meta.color}`}>{meta.icon}</span>
                        <span className="text-xs font-extrabold text-slate-600">{meta.label}</span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Ancho:</span>
                        <div className="flex bg-slate-200/60 p-0.5 rounded-lg border border-slate-300/10 text-[9px] font-bold">
                            <button type="button" onClick={() => onChange(idx, { ...bloque, width: 'estrecho' })} className={`px-2 py-0.5 rounded transition ${width === 'estrecho' ? 'bg-white text-slate-800 shadow-xs font-extrabold' : 'text-slate-500 hover:text-slate-800'}`}>33%</button>
                            <button type="button" onClick={() => onChange(idx, { ...bloque, width: 'mediano' })} className={`px-2 py-0.5 rounded transition ${width === 'mediano' ? 'bg-white text-slate-800 shadow-xs font-extrabold' : 'text-slate-500 hover:text-slate-800'}`}>50%</button>
                            <button type="button" onClick={() => onChange(idx, { ...bloque, width: 'completo' })} className={`px-2 py-0.5 rounded transition ${width === 'completo' ? 'bg-white text-slate-800 shadow-xs font-extrabold' : 'text-slate-500 hover:text-slate-800'}`}>100%</button>
                        </div>

                        <div className="h-4 w-px bg-slate-200"></div>

                        <div className="flex gap-0.5">
                            <button type="button" onClick={() => onMoveUp(idx)} disabled={idx === 0}
                                className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer hover:bg-slate-100 transition">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/></svg>
                            </button>
                            <button type="button" onClick={() => onMoveDown(idx)} disabled={idx === total - 1}
                                className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer hover:bg-slate-100 transition">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                            </button>
                            <button type="button" onClick={() => onDelete(idx)}
                                className="w-6 h-6 rounded flex items-center justify-center text-rose-400 hover:text-rose-700 cursor-pointer hover:bg-rose-50 transition ml-1">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Editable Content */}
                <div className="p-4 space-y-3">
                    {bloque.tipo === 'texto' && (
                        <div className="space-y-3">
                            {/* Text formatting bar */}
                            <div className="flex flex-wrap items-center gap-2 bg-slate-100/60 p-1.5 rounded-lg border border-slate-200/50">
                                {/* Font styles */}
                                <button type="button" onClick={() => toggleFormat('bold')} className={`px-2.5 py-1 text-xs font-bold rounded-md transition ${formato.bold ? 'bg-slate-700 text-white' : 'hover:bg-slate-200 text-slate-600'}`}>N</button>
                                <button type="button" onClick={() => toggleFormat('italic')} className={`px-2.5 py-1 text-xs italic rounded-md transition ${formato.italic ? 'bg-slate-700 text-white' : 'hover:bg-slate-200 text-slate-600'}`}>K</button>
                                <button type="button" onClick={() => toggleFormat('underline')} className={`px-2.5 py-1 text-xs underline rounded-md transition ${formato.underline ? 'bg-slate-700 text-white' : 'hover:bg-slate-200 text-slate-600'}`}>S</button>
                                
                                <div className="w-px h-4 bg-slate-300 mx-1"></div>

                                {/* Size selector */}
                                <select 
                                    value={formato.size || 'normal'} 
                                    onChange={e => changeFormatValue('size', e.target.value)}
                                    className="bg-transparent text-xs font-bold text-slate-600 focus:outline-none cursor-pointer"
                                >
                                    <option value="normal">Normal</option>
                                    <option value="grande">Grande</option>
                                    <option value="muy-grande">Muy Grande</option>
                                </select>

                                <div className="w-px h-4 bg-slate-300 mx-1"></div>

                                {/* Color Selector */}
                                <select 
                                    value={formato.color || 'gris'} 
                                    onChange={e => changeFormatValue('color', e.target.value)}
                                    className="bg-transparent text-xs font-bold text-slate-600 focus:outline-none cursor-pointer"
                                >
                                    <option value="gris">Gris (Normal)</option>
                                    <option value="rojo">Rojo Colegio</option>
                                    <option value="azul">Azul Colegio</option>
                                </select>
                            </div>
                            
                            <textarea 
                                rows={3} 
                                value={bloque.contenido || ''} 
                                onChange={e => onChange(idx, { ...bloque, contenido: e.target.value })}
                                placeholder="Escribe el párrafo aquí..."
                                className={`w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition resize-none ${
                                    formato.bold ? 'font-bold' : ''
                                } ${
                                    formato.italic ? 'italic' : ''
                                } ${
                                    formato.underline ? 'underline' : ''
                                } ${
                                    formato.size === 'grande' ? 'text-base md:text-lg font-bold' : (formato.size === 'muy-grande' ? 'text-lg md:text-xl font-black' : '')
                                } ${
                                    formato.color === 'rojo' ? 'text-[#800A15]' : (formato.color === 'azul' ? 'text-[#003C8F]' : '')
                                }`} 
                            />
                        </div>
                    )}

                    {bloque.tipo === 'titulo' && (
                        <input 
                            value={bloque.contenido || ''} 
                            onChange={e => onChange(idx, { ...bloque, contenido: e.target.value })}
                            placeholder="Título de la sección..."
                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition" 
                        />
                    )}

                    {bloque.tipo === 'separador' && (
                        <div className="flex items-center gap-3 py-1">
                            <div className="flex-1 h-px bg-slate-200"></div>
                            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">Línea Divisoria</span>
                            <div className="flex-1 h-px bg-slate-200"></div>
                        </div>
                    )}

                    {bloque.tipo === 'video' && (
                        <div className="space-y-3">
                            <input 
                                value={bloque.url || ''} 
                                onChange={e => onChange(idx, { ...bloque, url: e.target.value })}
                                placeholder="Enlace de YouTube (Ej: https://www.youtube.com/watch?v=...)"
                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium" 
                            />
                            {bloque.url && (
                                <div className="aspect-video rounded-xl bg-slate-100 overflow-hidden border border-slate-200 flex items-center justify-center relative">
                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Mockup Video Player</span>
                                </div>
                            )}
                        </div>
                    )}

                    {bloque.tipo === 'imagen' && (
                        <div className="space-y-3">
                            {previewSrc && (
                                <img src={previewSrc} alt="preview" className="w-full max-h-40 object-cover rounded-xl border border-slate-200" />
                            )}
                            <label className="flex items-center gap-3 cursor-pointer w-full border-2 border-dashed border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/30 rounded-xl px-4 py-2.5 transition">
                                <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-xs text-slate-400 font-semibold">{previewSrc ? 'Cambiar imagen' : 'Seleccionar imagen'}</span>
                                <input type="file" accept="image/*,.heic,.heif,image/heic,image/heif" className="hidden" onChange={handleFile} />
                            </label>
                            <input 
                                value={bloque.leyenda || ''} 
                                onChange={e => onChange(idx, { ...bloque, leyenda: e.target.value })}
                                placeholder="Leyenda de la imagen (opcional)..."
                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium" 
                            />
                        </div>
                    )}

                    {bloque.tipo === 'cita' && (
                        <div className="space-y-3">
                            <textarea 
                                rows={2} 
                                value={bloque.contenido || ''} 
                                onChange={e => onChange(idx, { ...bloque, contenido: e.target.value })}
                                placeholder="Texto de la cita destacada..."
                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium italic resize-none" 
                            />
                            <input 
                                value={bloque.autor || ''} 
                                onChange={e => onChange(idx, { ...bloque, autor: e.target.value })}
                                placeholder="Autor de la cita (Ej: Coordinador de Robótica)..."
                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium" 
                            />
                        </div>
                    )}

                    {bloque.tipo === 'ficha' && (
                        <div className="space-y-3">
                            <input 
                                value={bloque.titulo || ''} 
                                onChange={e => onChange(idx, { ...bloque, titulo: e.target.value })}
                                placeholder="Título de la ficha técnica (Ej: Ficha Informativa)..."
                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition" 
                            />
                            <textarea 
                                rows={3} 
                                value={bloque.items || ''} 
                                onChange={e => onChange(idx, { ...bloque, items: e.target.value })}
                                placeholder="Escribe cada viñeta en una línea distinta..."
                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition resize-none font-medium" 
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function NoticiasTab({ noticias, flash }) {
    const [editando, setEditando] = useState(null);
    const [creando, setCreando] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [paso, setPaso] = useState(1);
    const [deletingId, setDeletingId] = useState(null);

    const [titulo, setTitulo] = useState('');
    const [resumen, setResumen] = useState('');
    const [categoria, setCategoria] = useState('noticia');
    const [publicado_en, setPublicadoEn] = useState('');
    const [activo, setActivo] = useState(true);
    const [portadaFile, setPortadaFile] = useState(null);
    const [portadaPreview, setPortadaPreview] = useState(null);

    const [bloques, setBloques] = useState([]);
    const blockFilesRef = useState({})[0];
    const [errors, setErrors] = useState({});

    const basePath = window.location.pathname.replace(/\/[^/]+$/, '');
    const categoriaLabel = { noticia: 'Noticia', evento: 'Evento', comunicado: 'Comunicado' };

    const formatDate = (dateStr) => {
        try {
            return new Date(dateStr).toLocaleDateString('es-CO', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch {
            return dateStr;
        }
    };

    function resetForm() {
        setTitulo(''); setResumen(''); setCategoria('noticia');
        setPublicadoEn(''); setActivo(true);
        setPortadaFile(null); setPortadaPreview(null);
        setBloques([]); Object.keys(blockFilesRef).forEach(k => delete blockFilesRef[k]);
        setErrors({}); setPaso(1);
    }

    function abrirCrear() { resetForm(); setEditando(null); setCreando(true); }

    function abrirEditar(n) {
        resetForm();
        setTitulo(n.titulo); setResumen(n.resumen ?? '');
        setCategoria(n.categoria);
        setPublicadoEn(n.publicado_en ? n.publicado_en.substring(0, 10) : '');
        setActivo(!!n.activo);
        if (n.imagen) setPortadaPreview(`/storage/${n.imagen}`);
        setBloques(n.bloques || []);
        setEditando(n); setCreando(false);
    }

    function cerrar() { setCreando(false); setEditando(null); resetForm(); }

    function setBlockFile(idx, file) { blockFilesRef[idx] = file; }

    function cambiarBloque(idx, nuevo) {
        setBloques(prev => prev.map((b, i) => i === idx ? nuevo : b));
    }

    function borrarBloque(idx) {
        if (blockFilesRef[idx]) delete blockFilesRef[idx];
        setBloques(prev => prev.filter((_, i) => i !== idx));
    }

    function moverArriba(idx) {
        if (idx === 0) return;
        setBloques(prev => {
            const arr = [...prev];
            [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
            const tmp = blockFilesRef[idx - 1];
            blockFilesRef[idx - 1] = blockFilesRef[idx];
            blockFilesRef[idx] = tmp;
            if (!blockFilesRef[idx - 1]) delete blockFilesRef[idx - 1];
            if (!blockFilesRef[idx]) delete blockFilesRef[idx];
            return arr;
        });
    }

    function moverAbajo(idx) {
        setBloques(prev => {
            if (idx >= prev.length - 1) return prev;
            const arr = [...prev];
            [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
            const tmp = blockFilesRef[idx];
            blockFilesRef[idx] = blockFilesRef[idx + 1];
            blockFilesRef[idx + 1] = tmp;
            if (!blockFilesRef[idx]) delete blockFilesRef[idx];
            if (!blockFilesRef[idx + 1]) delete blockFilesRef[idx + 1];
            return arr;
        });
    }

    function agregarBloque(tipo) {
        const base = { tipo, _key: Math.random().toString(36).slice(2), width: 'completo' };
        if (tipo === 'texto') setBloques(p => [...p, { ...base, contenido: '', formato: { size: 'normal', bold: false, italic: false, underline: false, color: 'gris' } }]);
        else if (tipo === 'titulo') setBloques(p => [...p, { ...base, contenido: '' }]);
        else if (tipo === 'imagen') setBloques(p => [...p, { ...base, imagen: '', leyenda: '' }]);
        else if (tipo === 'video') setBloques(p => [...p, { ...base, url: '', titulo: '' }]);
        else if (tipo === 'separador') setBloques(p => [...p, base]);
        else if (tipo === 'cita') setBloques(p => [...p, { ...base, contenido: '', autor: '' }]);
        else if (tipo === 'ficha') setBloques(p => [...p, { ...base, titulo: 'Ficha Técnica', items: '' }]);
    }

    async function handlePortada(e) {
        const f = e.target.files[0];
        if (!f) return;
        const processed = await processImageFile(f);
        setPortadaFile(processed);
        setPortadaPreview(URL.createObjectURL(processed));
    }

    async function guardar(e, builderData = null) {
        if (e && e.preventDefault) e.preventDefault();
        
        const currentTitle = builderData ? builderData.titulo : titulo;
        const currentResumen = builderData ? builderData.resumen : resumen;
        const currentCategoria = builderData ? builderData.categoria : categoria;
        const currentPublicadoEn = builderData ? builderData.publicado_en : publicado_en;
        const currentActivo = builderData ? builderData.activo : activo;
        const currentBloques = builderData ? builderData.blocks : bloques;

        if (!currentTitle || !currentTitle.trim()) { 
            setErrors({ titulo: 'El titulo es obligatorio.' }); 
            setPaso(1); 
            return; 
        }
        setSubmitting(true);

        const fd = new FormData();
        fd.append('titulo', currentTitle);
        fd.append('resumen', currentResumen || '');
        fd.append('categoria', currentCategoria);
        fd.append('publicado_en', currentPublicadoEn || '');
        fd.append('activo', currentActivo ? '1' : '0');
        if (portadaFile) fd.append('portada', portadaFile);

        const bloquesData = currentBloques.map((b, idx) => {
            const { _preview, ...rest } = b;
            if (b.tipo === 'imagen' && blockFilesRef[idx]) {
                return { ...rest, _file_idx: idx };
            }
            return rest;
        });
        fd.append('bloques', JSON.stringify(bloquesData));

        Object.entries(blockFilesRef).forEach(([key, file]) => {
            if (key.startsWith('v_')) {
                fd.append(`video_bloque_${key.slice(2)}`, file);
            } else {
                fd.append(`img_bloque_${key}`, file);
            }
        });

        if (editando) fd.append('_method', 'PUT');

        router.post(
            editando ? `${basePath}/noticias/${editando.id}` : `${basePath}/noticias`,
            fd,
            {
                onSuccess: () => { setSubmitting(false); cerrar(); },
                onError: (errs) => { setSubmitting(false); setErrors(errs); },
            }
        );
    }

    function eliminar(id) {
        setDeletingId(null);
        router.delete(`${basePath}/noticias/${id}`, {
            preserveState: true, preserveScroll: true,
        });
    }

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl sm:rounded-[24px] p-4 sm:p-6 lg:p-8 shadow-sm">
            <Flash message={flash} />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div>
                    <h2 className="text-slate-800 dark:text-slate-100 font-extrabold text-base sm:text-lg tracking-tight">Noticias y Eventos ({noticias.length})</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Gestiona las publicaciones y eventos escolares</p>
                </div>
                <button onClick={abrirCrear} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/10 transition duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Nueva Publicacion
                </button>
            </div>

            <div className="space-y-4">
                {noticias.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-400 text-sm">No hay publicaciones registradas aun.</p>
                    </div>
                )}
                {noticias.map(n => (
                    <div key={n.id} className="bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 hover:border-slate-300/80 rounded-2xl p-4 flex items-center gap-4 transition duration-200">
                        {n.imagen ? (
                            <img src={`/storage/${n.imagen}`} alt={n.titulo} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700" />
                        ) : (
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 shrink-0 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm truncate">{n.titulo}</span>
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border uppercase tracking-wider ${
                                    n.categoria === 'evento' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30' :
                                    n.categoria === 'comunicado' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30' :
                                    'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30'
                                }`}>
                                    {categoriaLabel[n.categoria]}
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${n.activo ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30'}`}>
                                    {n.activo ? 'Visible' : 'Oculto'}
                                </span>
                            </div>
                            {n.resumen && <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 line-clamp-1">{n.resumen}</p>}
                            {n.publicado_en && (
                                <p className="text-slate-400 dark:text-slate-500 text-[10px] font-semibold mt-1 flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    {new Date(n.publicado_en).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </p>
                            )}
                        </div>
                        <div className="flex gap-2 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200/60 dark:border-slate-800/60">
                            <button onClick={() => abrirEditar(n)} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition cursor-pointer">Editar</button>
                            {deletingId === n.id ? (
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400">¿Seguro?</span>
                                    <button onClick={() => eliminar(n.id)} className="text-[11px] font-extrabold bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 rounded-lg transition cursor-pointer">Sí</button>
                                    <button onClick={() => setDeletingId(null)} className="text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg transition cursor-pointer">No</button>
                                </div>
                            ) : (
                                <button onClick={() => setDeletingId(n.id)} className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-800 hover:bg-rose-50 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition cursor-pointer">Eliminar</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {(creando || editando) && paso === 1 && (
                <Modal title={editando ? 'Editar Publicacion' : 'Nueva Publicacion'} onClose={cerrar} isWide>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        <div className="lg:col-span-5 flex flex-col items-center justify-start space-y-4">
                            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Vista Previa de la Tarjeta</span>
                            <div className="w-full bg-slate-100 border border-slate-200 p-6 rounded-[32px] flex items-center justify-center shadow-inner flex-1 min-h-[420px]">
                                <div className="w-full max-w-[280px] min-h-[380px] rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-white relative flex flex-col justify-between group cursor-pointer transition-all duration-300 select-none">
                                    <div className="aspect-video w-full overflow-hidden bg-slate-50 relative shrink-0">
                                        {portadaPreview ? (
                                            <img src={portadaPreview} alt={titulo} className="w-full h-full object-cover transition duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-50 relative">
                                                <img src="/galeria/estudiantes-colsih.png" className="w-full h-full object-cover grayscale opacity-15" />
                                                <img src="/marca/logo-colsih.svg" className="w-10 h-auto opacity-10 absolute center" />
                                            </div>
                                        )}
                                        <span className="absolute top-3 left-3 bg-[#800A15] text-white font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                                            {categoriaLabel[categoria]}
                                        </span>
                                    </div>
                                    <div className="p-5 flex-grow flex flex-col justify-between text-left space-y-3">
                                        <div className="space-y-2">
                                            <time className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                                {publicado_en ? new Date(publicado_en + 'T00:00:00').toLocaleDateString('es-CO') : 'Hoy'}
                                            </time>
                                            <h3 className="font-extrabold text-sm text-[#08111F] leading-snug group-hover:text-[#800A15] transition-colors duration-200">
                                                {titulo || 'Título de la Noticia'}
                                            </h3>
                                            <p className="text-[11px] font-semibold text-slate-500 line-clamp-3 leading-relaxed">
                                                {resumen || 'Resumen o copete de la noticia que se mostrará en la tarjeta de la página de inicio...'}
                                            </p>
                                        </div>
                                        <div className="pt-1">
                                            <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-[#08111F] uppercase tracking-wider">
                                                Leer noticia
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7 space-y-4 text-left flex flex-col justify-between">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Título de la Publicación *</label>
                                    <input value={titulo} onChange={e => setTitulo(e.target.value)} required placeholder="Ej: Gran feria de ciencias COLSIH 2026" className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium" />
                                    {errors.titulo && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.titulo}</p>}
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Resumen / Copete de Tarjeta</label>
                                        <span className="text-[10px] text-slate-400 font-bold">{resumen.length}/400</span>
                                    </div>
                                    <textarea value={resumen} onChange={e => setResumen(e.target.value.substring(0, 400))} rows={3} placeholder="Escribe un breve resumen descriptivo para la tarjeta..." className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium resize-none" />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Categoría *</label>
                                        <select value={categoria} onChange={e => setCategoria(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium">
                                            <option value="noticia">Noticia</option>
                                            <option value="evento">Evento</option>
                                            <option value="comunicado">Comunicado</option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Fecha de Publicación</label>
                                        <input type="date" value={publicado_en} onChange={e => setPublicadoEn(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1.5">Foto de Portada</label>
                                    <div className="flex items-center gap-3">
                                        <input type="file" accept="image/*,.heic,.heif,image/heic,image/heif" onChange={handlePortada} className="hidden" id="noticia-portada-upload" />
                                        <label htmlFor="noticia-portada-upload" className="px-4.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition cursor-pointer select-none">
                                            {portadaFile ? 'Cambiar Portada' : 'Seleccionar Portada'}
                                        </label>
                                        <span className="text-xs text-slate-400 font-medium truncate max-w-[200px]">{portadaFile ? portadaFile.name : (editando ? 'Conservar imagen actual' : 'Ninguno seleccionado')}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input type="checkbox" checked={activo} onChange={e => setActivo(e.target.checked)} className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-opacity-25" />
                                        <span className="text-slate-600 text-sm font-semibold">Visible en la Web</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-6 border-t border-slate-100 mt-6 justify-end">
                                <button type="button" onClick={() => setPaso(2)} disabled={!titulo} className="px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl py-3 text-sm transition cursor-pointer shadow-md shadow-blue-500/10 active:scale-[0.98] flex items-center gap-2">
                                    Siguiente: Escribir Contenido
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                                </button>
                                <button type="button" onClick={() => guardar()} disabled={!titulo || submitting} className="px-6 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl py-3 text-sm transition cursor-pointer shadow-md shadow-emerald-500/10 active:scale-[0.98]">
                                    {submitting ? 'Guardando...' : 'Guardar'}
                                </button>
                                <button type="button" onClick={cerrar} className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl py-3 text-sm transition font-bold cursor-pointer">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
            {(creando || editando) && paso === 2 && (
                <PageBuilder
                    initialTitle={titulo}
                    initialResumen={resumen}
                    initialCategoria={categoria}
                    initialPublicadoEn={publicado_en}
                    initialPortada={portadaPreview}
                    initialBlocks={bloques}
                    initialActivo={activo}
                    onClose={() => setPaso(1)}
                    onSave={(data) => {
                        setTitulo(data.titulo);
                        setResumen(data.resumen);
                        setCategoria(data.categoria);
                        setBloques(data.blocks);
                        setActivo(data.activo);
                        // Extraer archivos pendientes desde los bloques del editor
                        Object.keys(blockFilesRef).forEach(k => delete blockFilesRef[k]);
                        if (data.rawBlocks) {
                            data.rawBlocks.forEach((raw, idx) => {
                                if (raw.tipo === 'imagen' && raw.content?._pendingFile) {
                                    blockFilesRef[idx] = raw.content._pendingFile;
                                }
                                if (raw.tipo === 'video' && raw.content?._pendingVideoFile) {
                                    blockFilesRef[`v_${idx}`] = raw.content._pendingVideoFile;
                                }
                            });
                        }
                        guardar(null, data);
                    }}
                />
            )}
        </div>
    );
}

/* ── Preguntas Frecuentes ── */
function PreguntasTab({ preguntas, flash }) {
    const [editando, setEditando] = useState(null);
    const [creando, setCreando] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const form = useForm({ pregunta: '', respuesta: '', activo: true, orden: 0 });

    function abrirCrear() { form.reset(); form.setData('activo', true); setEditando(null); setCreando(true); }

    function abrirEditar(p) {
        form.setData({ pregunta: p.pregunta, respuesta: p.respuesta, activo: p.activo, orden: p.orden });
        setEditando(p);
        setCreando(false);
    }

    function cerrar() { setCreando(false); setEditando(null); form.clearErrors(); }

    const basePath = window.location.pathname.replace(/\/[^/]+$/, '');

    function guardar(e) {
        e.preventDefault();
        if (editando) {
            form.put(`${basePath}/preguntas/${editando.id}`, { onSuccess: cerrar });
        } else {
            form.post(`${basePath}/preguntas`, { onSuccess: cerrar });
        }
    }

    function eliminar(id) {
        setDeletingId(null);
        router.delete(`${basePath}/preguntas/${id}`, {
            preserveState: true, preserveScroll: true,
        });
    }

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[24px] p-8 shadow-sm">
            <Flash message={flash} />
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div>
                    <h2 className="text-slate-800 dark:text-slate-100 font-extrabold text-lg tracking-tight">Preguntas Frecuentes ({preguntas.length})</h2>
                    <p className="text-slate-400 text-xs mt-1">Gestiona las dudas habituales de las Admisiones escolares</p>
                </div>
                <button onClick={abrirCrear} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/10 transition duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Nueva Pregunta
                </button>
            </div>

            <div className="space-y-4">
                {preguntas.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-400 text-sm">No hay preguntas registradas aún.</p>
                    </div>
                )}
                {preguntas.map(p => (
                    <div key={p.id} className="bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 hover:border-slate-300/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-4 transition duration-200">
                        <div className="flex-1 min-w-0 w-full">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{p.pregunta}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                    p.activo 
                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30' 
                                        : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30'
                                }`}>
                                    {p.activo ? 'Visible' : 'Oculto'}
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">{p.respuesta}</p>
                        </div>
                        <div className="flex gap-2 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200/60 dark:border-slate-800/60">
                            <button onClick={() => abrirEditar(p)} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition cursor-pointer">Editar</button>
                            {deletingId === p.id ? (
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400">¿Seguro?</span>
                                    <button onClick={() => eliminar(p.id)} className="text-[11px] font-extrabold bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 rounded-lg transition cursor-pointer">Sí</button>
                                    <button onClick={() => setDeletingId(null)} className="text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg transition cursor-pointer">No</button>
                                </div>
                            ) : (
                                <button onClick={() => setDeletingId(p.id)} className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-800 hover:bg-rose-50 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition cursor-pointer">Eliminar</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {(creando || editando) && (
                <Modal title={editando ? 'Editar Pregunta' : 'Crear Nueva Pregunta'} onClose={cerrar}>
                    <form onSubmit={guardar} className="space-y-5">
                        <div>
                            <label className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block mb-2">Pregunta / Título *</label>
                            <input 
                                value={form.data.pregunta} 
                                onChange={e => form.setData('pregunta', e.target.value)} 
                                required 
                                placeholder="Ej: ¿Cuáles son los requisitos de matrícula?"
                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium" 
                            />
                            {form.errors.pregunta && <p className="text-rose-500 text-xs mt-1.5 font-semibold">{form.errors.pregunta}</p>}
                        </div>
                        <div>
                            <label className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block mb-2">Respuesta Detallada *</label>
                            <textarea 
                                value={form.data.respuesta} 
                                onChange={e => form.setData('respuesta', e.target.value)} 
                                required 
                                rows={5} 
                                placeholder="Escribe la respuesta estructurada..."
                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium resize-none" 
                            />
                            {form.errors.respuesta && <p className="text-rose-500 text-xs mt-1.5 font-semibold">{form.errors.respuesta}</p>}
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="flex-1">
                                <label className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block mb-2">Orden de Visualización</label>
                                <input 
                                    type="number" 
                                    min="0" 
                                    value={form.data.orden} 
                                    onChange={e => form.setData('orden', Number(e.target.value))} 
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium" 
                                />
                            </div>
                            <div className="flex items-end h-full pt-6">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input 
                                        type="checkbox" 
                                        checked={form.data.activo} 
                                        onChange={e => form.setData('activo', e.target.checked)} 
                                        className="w-5.5 h-5.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-opacity-25" 
                                    />
                                    <span className="text-slate-600 text-sm font-semibold">Visible en la Web</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4 border-t border-slate-100">
                            <button type="submit" disabled={form.processing} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl py-3 text-sm transition cursor-pointer shadow-md shadow-blue-500/10 active:scale-[0.98]">
                                {form.processing ? 'Guardando…' : 'Guardar Pregunta'}
                            </button>
                            <button type="button" onClick={cerrar} className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl py-3 text-sm transition font-bold cursor-pointer">Cancelar</button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}

/* ── Recorrido Virtual 360° ── */
function RecorridoTab({ tour, scenes = [], flash, basePath }) {
    const [creando, setCreando] = useState(false);
    const [vistaModo, setVistaModo] = useState(
        () => localStorage.getItem('admin-recorrido-vista') || 'lista'
    );
    const [deletingId, setDeletingId] = useState(null);
    const [localScenes, setLocalScenes] = useState(scenes);

    useEffect(() => { setLocalScenes(scenes); }, [scenes]);

    const cambiarVista = (modo) => {
        setVistaModo(modo);
        localStorage.setItem('admin-recorrido-vista', modo);
    };

    const form = useForm({
        nombre: '',
        imagen_url_manual: '',
        imagen: null,
    });

    const guardarEscena = (e) => {
        e.preventDefault();
        form.post(`${basePath}/recorrido/scenes`, {
            forceFormData: true,
            onSuccess: () => {
                setCreando(false);
                form.reset();
            }
        });
    };

    const eliminarEscena = (id) => {
        setDeletingId(null);
        setLocalScenes(prev => prev.filter(s => s.id !== id));
        router.delete(`${basePath}/recorrido/scenes/${id}`, {
            preserveState: true, preserveScroll: true,
        });
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl sm:rounded-[24px] p-4 sm:p-6 lg:p-8 shadow-sm">
            <Flash message={flash} />
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div>
                    <h2 className="text-slate-800 dark:text-slate-100 font-extrabold text-base sm:text-lg tracking-tight">
                        Recorrido Virtual 360° ({localScenes.length} Espacios)
                    </h2>
                    <p className="text-slate-400 text-xs mt-0.5">
                        Administra las escenas e imágenes 360° y configura los puntos interactivos de ruta e información.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* Selector de Modo de Visualización (Lista por defecto vs Recuadro) */}
                    <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 p-1 rounded-xl">
                        <button
                            type="button"
                            onClick={() => cambiarVista('lista')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                                vistaModo === 'lista'
                                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                            title="Ver en Lista (Por Defecto)"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <span>Lista</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => cambiarVista('recuadro')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                                vistaModo === 'recuadro'
                                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                            title="Ver en Recuadro / Grilla"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            <span>Recuadro</span>
                        </button>
                    </div>

                    <a
                        href={`/recorrido-virtual/${tour?.slug || 'colsih'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl transition duration-200 cursor-pointer flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700"
                    >
                        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Ver Vista Previa
                    </a>
                    <button
                        onClick={() => setCreando(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/10 transition duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Agregar Nueva Escena 360°
                    </button>
                </div>
            </div>

            {/* ── MODO 1: LISTA (POR DEFECTO) ── */}
            {vistaModo === 'lista' && (
                <div className="space-y-3">
                    {localScenes.map((s) => (
                        <div
                            key={s.id}
                            className="bg-slate-50/60 dark:bg-slate-800/30 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition duration-200 group"
                        >
                            <div className="flex items-center gap-4 min-w-0">
                                {/* Thumbnail */}
                                <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-900 shadow-sm">
                                    <img
                                        src={s.imagen_url || `/storage/${s.imagen_path}`}
                                        alt={s.nombre}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {s.es_escena_inicial && (
                                        <span className="absolute top-1 left-1 bg-blue-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
                                            Inicial
                                        </span>
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm truncate">{s.nombre}</h3>
                                        <span className="bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0">
                                            {s.hotspots?.length || 0} puntos
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-xs mt-1 font-mono truncate">Slug: {s.slug}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-800/60">
                                <Link
                                    href={`${basePath}/recorrido/scenes/${s.id}/editor`}
                                    className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/10 transition cursor-pointer flex items-center justify-center gap-1.5"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Abrir Editor 360°
                                </Link>

                                {deletingId === s.id ? (
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-bold text-rose-600 dark:text-rose-400">¿Seguro?</span>
                                        <button onClick={() => eliminarEscena(s.id)} className="text-[11px] font-extrabold bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1.5 rounded-lg transition cursor-pointer">Sí</button>
                                        <button onClick={() => setDeletingId(null)} className="text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1.5 rounded-lg transition cursor-pointer">No</button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setDeletingId(s.id)}
                                        className="px-3.5 py-2.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition cursor-pointer border border-rose-200/50 dark:border-rose-900/30"
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── MODO 2: RECUADRO / GRILLA ── */}
            {vistaModo === 'recuadro' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {localScenes.map((s) => (
                        <div
                            key={s.id}
                            className="bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 hover:border-slate-300/80 rounded-2xl p-4 flex flex-col justify-between transition duration-200 group"
                        >
                            <div>
                                {/* Thumbnail Preview */}
                                <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3 border border-slate-200 dark:border-slate-700 bg-slate-900">
                                    <img
                                        src={s.imagen_url || `/storage/${s.imagen_path}`}
                                        alt={s.nombre}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {s.es_escena_inicial && (
                                        <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-md">
                                            Escena Inicial
                                        </span>
                                    )}
                                    <span className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-md text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/20">
                                        {s.hotspots?.length || 0} puntos
                                    </span>
                                </div>

                                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{s.nombre}</h3>
                                <p className="text-slate-400 text-xs mt-0.5 font-mono">Slug: {s.slug}</p>
                            </div>

                            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                                <Link
                                    href={`${basePath}/recorrido/scenes/${s.id}/editor`}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-xl text-center shadow-md shadow-blue-500/10 transition cursor-pointer flex items-center justify-center gap-1.5"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Abrir Editor 360°
                                </Link>

                                {deletingId === s.id ? (
                                    <div className="flex items-center gap-1">
                                        <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">¿Seguro?</span>
                                        <button onClick={() => eliminarEscena(s.id)} className="text-[10px] font-extrabold bg-rose-600 hover:bg-rose-700 text-white px-2 py-1 rounded-lg transition cursor-pointer">Sí</button>
                                        <button onClick={() => setDeletingId(null)} className="text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-lg transition cursor-pointer">No</button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setDeletingId(s.id)}
                                        className="px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition cursor-pointer"
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {creando && (
                <Modal title="Agregar Nueva Escena 360°" onClose={() => setCreando(false)}>
                    <form onSubmit={guardarEscena} className="space-y-4">
                        <div>
                            <label className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block mb-2">Nombre del Espacio / Escena *</label>
                            <input
                                value={form.data.nombre}
                                onChange={(e) => form.setData('nombre', e.target.value)}
                                required
                                placeholder="Ej: Laboratorio de Biología"
                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-600 transition font-medium"
                            />
                        </div>

                        <div>
                            <label className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block mb-2">Ruta de Imagen en Servidor (Opcional)</label>
                            <input
                                value={form.data.imagen_url_manual}
                                onChange={(e) => form.setData('imagen_url_manual', e.target.value)}
                                placeholder="Ej: recorrido_virtual/12.informatica_a.jpg"
                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-600 transition font-medium font-mono"
                            />
                        </div>

                        <div>
                            <label className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block mb-2">O Subir archivo de Imagen Equirrectangular 360°</label>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg"
                                onChange={(e) => form.setData('imagen', e.target.files[0])}
                                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-slate-100">
                            <button type="submit" disabled={form.processing} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3 text-sm transition cursor-pointer">
                                {form.processing ? 'Guardando...' : 'Guardar Escena 360°'}
                            </button>
                            <button type="button" onClick={() => setCreando(false)} className="px-5 bg-slate-100 text-slate-600 rounded-xl py-3 text-sm font-bold">Cancelar</button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}

/* ── Dashboard principal ── */
const TABS = [
    { key: 'testimonios', label: 'Testimonios' },
    { key: 'noticias',    label: 'Noticias y Eventos' },
    { key: 'preguntas',   label: 'Preguntas Frecuentes' },
    { key: 'recorrido',   label: 'Recorrido 360°' },
];

export default function AdminDashboard({ seccion, testimonios, noticias, preguntas, tour, scenes = [], flash, adminCounts }) {
    const basePath = window.location.pathname.replace(/\/[^/]+$/, '');
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('sih-dark-mode') === 'true');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('sih-dark-mode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('sih-dark-mode', 'false');
        }
    }, [darkMode]);

    // Search bar shortcut placeholder hook
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                alert('Función de búsqueda del panel decorativa en este mockup.');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <Head title="Panel Administrativo | COLSIH" />
            <div className="min-h-screen bg-[#F4F7FA] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans antialiased flex relative">

                {/* Mobile Sidebar Overlay Backdrop */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* ── Sidebar Izquierda (Able Pro layout, 100% Responsive) ── */}
                <aside className={`w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800/80 h-screen fixed left-0 top-0 z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
                }`}>
                    <div>
                        {/* Sidebar Header Brand */}
                        <div className="h-20 px-6 sm:px-8 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80">
                            <div className="flex items-center gap-3">
                                <img src="/marca/logo-colsih.svg" alt="COLSIH" className="h-10 w-auto object-contain" />
                                <div className="flex flex-col">
                                    <span className="font-black text-slate-800 dark:text-white text-sm leading-tight uppercase tracking-wide">COLSIH</span>
                                    <span className="text-[10px] font-bold text-blue-600 uppercase">Admin Panel</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            >
                                ✕
                            </button>
                        </div>

                        {/* User profile card inside sidebar */}
                        <div className="m-4 sm:m-5 p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 rounded-2xl flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md shadow-blue-500/10">
                                    A
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 leading-tight">Administrador</span>
                                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-0.5">Gestor Portal</span>
                                </div>
                            </div>
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border-2 border-white dark:border-slate-800 shadow-sm"></div>
                        </div>

                        {/* Sidebar Nav Links */}
                        <div className="mt-4 space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-[1.5px] uppercase block px-8 mb-3">
                                Módulos de Gestión
                            </span>

                            {TABS.map(tab => {
                                const isActive = seccion === tab.key;
                                return (
                                    <Link
                                        key={tab.key}
                                        href={`${basePath}/${tab.key}`}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center justify-between px-7 py-3.5 mx-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                                            isActive
                                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600 pl-6'
                                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {tab.key === 'testimonios' && (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                                </svg>
                                            )}
                                            {tab.key === 'noticias' && (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                </svg>
                                            )}
                                            {tab.key === 'preguntas' && (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                            {tab.key === 'recorrido' && (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                            {tab.label}
                                        </div>
                                        
                                        {/* Count badge */}
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                            isActive ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                        }`}>
                                            {tab.key === 'testimonios' && (adminCounts?.testimonios ?? testimonios.length)}
                                            {tab.key === 'noticias'    && (adminCounts?.noticias    ?? noticias.length)}
                                            {tab.key === 'preguntas'   && (adminCounts?.preguntas   ?? preguntas.length)}
                                            {tab.key === 'recorrido'   && (adminCounts?.scenes      ?? scenes.length)}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
                        <form method="POST" action={`${basePath}/logout`} onSubmit={e => { e.preventDefault(); router.post(`${basePath}/logout`); }}>
                            <button type="submit" className="w-full flex items-center justify-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100/60 dark:hover:bg-rose-900/30 border border-rose-100 dark:border-rose-900/30 px-4 py-3 rounded-xl transition duration-200 cursor-pointer shadow-sm active:scale-[0.98]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Cerrar Sesión
                            </button>
                        </form>
                    </div>
                </aside>

                {/* ── Right Content Container ── */}
                <div className="flex-1 pl-0 lg:pl-72 flex flex-col min-h-screen w-full">
                    
                    {/* Header Top Navbar (Sticky Normal Flow to Never Overlap Main Content) */}
                    <header className="h-16 sm:h-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 shadow-[0_1px_3px_rgba(0,0,0,0.01)] shrink-0">
                        
                        <div className="flex items-center gap-3">
                            {/* Mobile drawer hamburger menu button */}
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                                aria-label="Abrir Menú"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>

                            {/* Search input mock */}
                            <div className="hidden sm:flex relative bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-2 flex items-center gap-3 w-44 md:w-80">
                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input 
                                    type="text" 
                                    placeholder="Buscar en el panel..." 
                                    className="bg-transparent text-xs font-medium text-slate-600 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none w-full"
                                    readOnly
                                />
                                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[9px] font-bold text-slate-400 px-1.5 py-0.5 rounded shadow-sm">
                                    Ctrl + K
                                </div>
                            </div>
                        </div>

                        {/* Topbar Right Tools */}
                        <div className="flex items-center gap-2.5 sm:gap-4">
                            {/* Functional Dark/Light Mode Switch */}
                            <button 
                                onClick={() => setDarkMode(!darkMode)}
                                className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-700/80 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition cursor-pointer"
                                title="Cambiar Tema"
                            >
                                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>
                            <button className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 border border-slate-200/50 dark:border-slate-700/80 flex items-center justify-center text-slate-500 hover:text-slate-800 transition relative cursor-pointer">
                                <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-blue-600 border border-white"></span>
                                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
                            
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center text-xs shadow-sm">
                                    A
                                </div>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 hidden sm:inline-block">Administrador</span>
                            </div>
                        </div>
                    </header>

                    {/* Main Scrollable Area */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#F4F7FA] dark:bg-slate-950 overflow-y-auto">
                        
                        {/* ── Active Module Content Card ── */}
                        <div className="transition-all duration-300">
                            {seccion === 'testimonios' && <TestimoniosTab testimonios={testimonios} flash={flash} />}
                            {seccion === 'noticias'    && <NoticiasTab    noticias={noticias}       flash={flash} />}
                            {seccion === 'preguntas'   && <PreguntasTab   preguntas={preguntas}     flash={flash} />}
                            {seccion === 'recorrido'   && <RecorridoTab   tour={tour} scenes={scenes} flash={flash} basePath={basePath} />}
                        </div>

                    </main>

                    {/* Footer branding */}
                    <footer className="py-4 px-4 sm:px-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 font-semibold select-none">
                        <span>Colegio Santa Isabel de Hungría &copy; {new Date().getFullYear()}</span>
                        <span>Desarrollado con React & InertiaJS</span>
                    </footer>

                </div>
            </div>
        </>
    );
}
