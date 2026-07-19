import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4 py-8 animate-fadeIn" onClick={onClose}>
            <div className={`bg-white border border-slate-100 rounded-[28px] p-8 w-full ${isWide ? 'max-w-4xl' : 'max-w-xl'} max-h-[90vh] overflow-y-auto shadow-2xl transform scale-100 transition-all duration-300`} onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <h3 className="text-slate-800 font-extrabold text-lg tracking-tight">{title}</h3>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition flex items-center justify-center text-lg leading-none cursor-pointer">✕</button>
                </div>
                {children}
            </div>
        </div>
    );
}

/* ── Testimonios ── */
function TestimoniosTab({ testimonios, flash }) {
    const [editando, setEditando] = useState(null);
    const [creando, setCreando] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const form = useForm({ 
        nombre: '', 
        cargo: '', 
        texto: '', 
        imagen: null, 
        video_url: '', 
        activo: true, 
        orden: 0 
    });

    function abrirCrear() {
        form.reset();
        setEditando(null);
        setCreando(true);
    }

    function abrirEditar(t) {
        form.setData({ 
            nombre: t.nombre, 
            cargo: t.cargo ?? '', 
            texto: t.texto, 
            imagen: null, 
            video_url: t.video_url ?? '', 
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

    // Effect hook to load selected or existing image in real-time
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
            setPreviewImage('/testimonio_egresada.png');
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
        if (!confirm('¿Eliminar este testimonio?')) return;
        router.delete(`${window.location.pathname.replace(/\/[^/]+$/, '')}/testimonios/${id}`);
    }

    return (
        <div className="bg-white border border-slate-100 rounded-[24px] p-8 shadow-sm">
            <Flash message={flash} />
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                    <h2 className="text-slate-800 font-extrabold text-lg tracking-tight">Testimonios ({testimonios.length})</h2>
                    <p className="text-slate-400 text-xs mt-1">Gestiona las citas del carrusel de inicio</p>
                </div>
                <button onClick={abrirCrear} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/10 transition duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5">
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
                    <div key={t.id} className="bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 hover:border-slate-300/80 rounded-2xl p-5 flex items-start gap-4 transition duration-200">
                        {t.imagen && (
                            <img src={`/storage/${t.imagen}`} alt={t.nombre} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200" />
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-slate-800 text-sm">{t.nombre}</span>
                                {t.cargo && <span className="text-slate-400 text-xs font-medium bg-slate-100 px-2 py-0.5 rounded-md">{t.cargo}</span>}
                                {t.video_url && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 border border-purple-100">Video</span>
                                )}
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                    t.activo
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        : 'bg-rose-50 text-rose-600 border-rose-100'
                                }`}>
                                    {t.activo ? 'Visible' : 'Oculto'}
                                </span>
                            </div>
                            <p className="text-slate-500 text-xs mt-2 italic leading-relaxed">«{t.texto}»</p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                            <button onClick={() => abrirEditar(t)} className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition cursor-pointer">Editar</button>
                            <button onClick={() => eliminar(t.id)} className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition cursor-pointer">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

            {(creando || editando) && (
                <Modal title={editando ? 'Editar Testimonio' : 'Crear Nuevo Testimonio'} onClose={cerrar} isWide={true}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        
                        {/* Left column: Card Preview (lg:col-span-5) */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-start space-y-4">
                            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Vista Previa en Web</span>
                            <div className="w-full bg-[#030712] p-6 rounded-3xl flex items-center justify-center border border-slate-900 shadow-inner flex-1 min-h-[440px]">
                                
                                {/* Card preview wrapper */}
                                <div className="w-full max-w-[280px] min-h-[380px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 bg-slate-900/50 relative flex flex-col justify-between p-6 select-none">
                                    {/* Background Image */}
                                    <img 
                                        src={previewImage} 
                                        alt="Vista Previa" 
                                        className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
                                    />
                                    
                                    {/* Dark overlay mask */}
                                    <div className="absolute inset-0 bg-slate-950/75 transition-colors duration-500 z-10"></div>
                                    
                                    {/* Absolute Play Button Overlay */}
                                    {form.data.video_url && (
                                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/25 opacity-100 pointer-events-none">
                                            <div className="w-14 h-14 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-md flex items-center justify-center shadow-xl">
                                                <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}

                                    {/* Content layer */}
                                    <div className="relative z-30 flex flex-col justify-between h-full flex-1">
                                        <div className="flex justify-between items-start">
                                            <span className="text-6xl font-serif text-white/25 select-none pointer-events-none leading-none">“</span>
                                            {form.data.video_url && (
                                                <div className="bg-[#800A15] text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 select-none">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                                    Video
                                                </div>
                                            )}
                                        </div>

                                        {/* Spacing */}
                                        <div className="flex-1 min-h-[60px]"></div>

                                        {/* Bottom row */}
                                        <div className="space-y-3">
                                            {/* Text Quote with layered shadows */}
                                            <p 
                                                className="text-white text-[11px] md:text-xs font-bold italic leading-relaxed font-sans text-left"
                                                style={{
                                                    textShadow: '0 2px 4px rgba(0,0,0,0.95), 0 4px 10px rgba(0,0,0,0.85), 0 0 15px rgba(0,0,0,0.5)'
                                                }}
                                            >
                                                {form.data.texto ? `«${form.data.texto}»` : '«Aquí se mostrará el texto de tu testimonio...»'}
                                            </p>
                                            
                                            <div className="text-left">
                                                <span className="block text-xs font-extrabold text-white font-sans drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">
                                                    {form.data.nombre || 'Nombre de la Persona'}
                                                </span>
                                                <span className="block text-[9px] font-bold text-[#3b82f6] uppercase tracking-wider mt-1 font-sans drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                                    {form.data.cargo || 'Cargo / Rol en el Colegio'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Right column: Form Inputs (lg:col-span-7) */}
                        <form onSubmit={guardar} className="lg:col-span-7 space-y-4 text-left flex flex-col justify-between">
                            <div className="space-y-4">
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
                                <div>
                                    <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Cargo / Rol</label>
                                    <input 
                                        value={form.data.cargo} 
                                        onChange={e => form.setData('cargo', e.target.value)} 
                                        placeholder="Ej: Egresada Promoción 2024"
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium" 
                                    />
                                </div>
                                <div>
                                    <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Texto del Testimonio *</label>
                                    <textarea 
                                        value={form.data.texto} 
                                        onChange={e => form.setData('texto', e.target.value)} 
                                        required 
                                        rows={4} 
                                        placeholder="Escribe el testimonio aquí..."
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium resize-none" 
                                    />
                                    {form.errors.texto && <p className="text-rose-500 text-xs mt-1 font-semibold">{form.errors.texto}</p>}
                                </div>
                                
                                {/* Photo upload field */}
                                <div>
                                    <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1.5">Foto de Fondo *</label>
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={e => form.setData('imagen', e.target.files[0])} 
                                            required={!editando}
                                            className="hidden" 
                                            id="testimonio-file-upload"
                                        />
                                        <label 
                                            htmlFor="testimonio-file-upload" 
                                            className="px-4.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition cursor-pointer select-none"
                                        >
                                            {form.data.imagen ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
                                        </label>
                                        <span className="text-xs text-slate-400 font-medium truncate max-w-[200px]">
                                            {form.data.imagen ? form.data.imagen.name : (editando ? 'Conservar imagen actual' : 'Ningún archivo seleccionado')}
                                        </span>
                                    </div>
                                    {form.errors.imagen && <p className="text-rose-500 text-xs mt-1 font-semibold">{form.errors.imagen}</p>}
                                </div>

                                {/* Video URL field */}
                                <div>
                                    <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">URL del Video (Youtube)</label>
                                    <input 
                                        value={form.data.video_url} 
                                        onChange={e => form.setData('video_url', e.target.value)} 
                                        placeholder="Ej: https://www.youtube.com/embed/..."
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium" 
                                    />
                                    {form.errors.video_url && <p className="text-rose-500 text-xs mt-1 font-semibold">{form.errors.video_url}</p>}
                                </div>

                                <div className="flex gap-4 items-center">
                                    <div className="flex-1">
                                        <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Orden</label>
                                        <input 
                                            type="number" 
                                            min="0" 
                                            value={form.data.orden} 
                                            onChange={e => form.setData('orden', Number(e.target.value))} 
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4.5 py-2 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium" 
                                        />
                                    </div>
                                    <div className="flex items-end h-full pt-4">
                                        <label className="flex items-center gap-2 cursor-pointer select-none">
                                            <input 
                                                type="checkbox" 
                                                checked={form.data.activo} 
                                                onChange={e => form.setData('activo', e.target.checked)} 
                                                className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-opacity-25" 
                                            />
                                            <span className="text-slate-600 text-sm font-semibold">Visible</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-slate-100 mt-5">
                                <button type="submit" disabled={form.processing} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl py-3 text-sm transition cursor-pointer shadow-md shadow-blue-500/10 active:scale-[0.98]">
                                    {form.processing ? 'Guardando…' : 'Guardar Testimonio'}
                                </button>
                                <button type="button" onClick={cerrar} className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl py-3 text-sm transition font-bold cursor-pointer">Cancelar</button>
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
    imagen:    { label: 'Imagen',    color: 'bg-blue-50 text-blue-600',      icon: 'I' },
    video:     { label: 'Video',     color: 'bg-purple-50 text-purple-600',  icon: 'V' },
    titulo:    { label: 'Titulo',    color: 'bg-amber-50 text-amber-600',    icon: 'H' },
    separador: { label: 'Separador', color: 'bg-rose-50 text-rose-600',      icon: '—' },
};

function BloqueEditor({ bloque, idx, total, onChange, onDelete, onMoveUp, onMoveDown, fileRef }) {
    const meta = TIPO_META[bloque.tipo] || TIPO_META.texto;

    function handleFile(e) {
        const f = e.target.files[0];
        if (!f) return;
        fileRef(idx, f);
        onChange(idx, { ...bloque, _preview: URL.createObjectURL(f), imagen: '' });
    }

    const previewSrc = bloque._preview || (bloque.imagen ? `/storage/${bloque.imagen}` : null);

    return (
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
            {/* Header de bloque */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-100">
                <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black ${meta.color}`}>{meta.icon}</span>
                <span className="text-xs font-bold text-slate-600">{meta.label}</span>
                <div className="flex gap-1 ml-auto">
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

            {/* Contenido editable */}
            <div className="p-4">
                {bloque.tipo === 'texto' && (
                    <textarea rows={3} value={bloque.contenido || ''} onChange={e => onChange(idx, { ...bloque, contenido: e.target.value })}
                        placeholder="Escribe el parrafo aqui..."
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium resize-none" />
                )}
                {bloque.tipo === 'titulo' && (
                    <input value={bloque.contenido || ''} onChange={e => onChange(idx, { ...bloque, contenido: e.target.value })}
                        placeholder="Titulo de seccion..."
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition" />
                )}
                {bloque.tipo === 'separador' && (
                    <div className="flex items-center gap-3 py-1">
                        <div className="flex-1 h-px bg-slate-200"></div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Separador visual</span>
                        <div className="flex-1 h-px bg-slate-200"></div>
                    </div>
                )}
                {bloque.tipo === 'video' && (
                    <div className="space-y-3">
                        <input value={bloque.url || ''} onChange={e => onChange(idx, { ...bloque, url: e.target.value })}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium" />
                        <input value={bloque.titulo || ''} onChange={e => onChange(idx, { ...bloque, titulo: e.target.value })}
                            placeholder="Titulo del video (opcional)..."
                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium" />
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
                            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
                        </label>
                        <input value={bloque.leyenda || ''} onChange={e => onChange(idx, { ...bloque, leyenda: e.target.value })}
                            placeholder="Leyenda de la imagen (opcional)..."
                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium" />
                    </div>
                )}
            </div>
        </div>
    );
}

function NoticiasTab({ noticias, flash }) {
    const [editando, setEditando] = useState(null);
    const [creando, setCreando] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Metadata
    const [titulo, setTitulo] = useState('');
    const [resumen, setResumen] = useState('');
    const [categoria, setCategoria] = useState('noticia');
    const [publicado_en, setPublicadoEn] = useState('');
    const [activo, setActivo] = useState(true);
    const [portadaFile, setPortadaFile] = useState(null);
    const [portadaPreview, setPortadaPreview] = useState(null);

    // Bloques
    const [bloques, setBloques] = useState([]);
    const blockFilesRef = useState({})[0]; // { idx: File }
    const [errors, setErrors] = useState({});

    const basePath = window.location.pathname.replace(/\/[^/]+$/, '');
    const categoriaLabel = { noticia: 'Noticia', evento: 'Evento', comunicado: 'Comunicado' };

    function resetForm() {
        setTitulo(''); setResumen(''); setCategoria('noticia');
        setPublicadoEn(''); setActivo(true);
        setPortadaFile(null); setPortadaPreview(null);
        setBloques([]); Object.keys(blockFilesRef).forEach(k => delete blockFilesRef[k]);
        setErrors({});
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
            // remap blockFiles
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
        const base = { tipo, _key: Math.random().toString(36).slice(2) };
        if (tipo === 'texto') setBloques(p => [...p, { ...base, contenido: '' }]);
        else if (tipo === 'titulo') setBloques(p => [...p, { ...base, contenido: '' }]);
        else if (tipo === 'imagen') setBloques(p => [...p, { ...base, imagen: '', leyenda: '' }]);
        else if (tipo === 'video') setBloques(p => [...p, { ...base, url: '', titulo: '' }]);
        else if (tipo === 'separador') setBloques(p => [...p, base]);
    }

    function handlePortada(e) {
        const f = e.target.files[0];
        if (!f) return;
        setPortadaFile(f);
        setPortadaPreview(URL.createObjectURL(f));
    }

    async function guardar(e) {
        e.preventDefault();
        if (!titulo.trim()) { setErrors({ titulo: 'El titulo es obligatorio.' }); return; }
        setSubmitting(true);

        const fd = new FormData();
        fd.append('titulo', titulo);
        fd.append('resumen', resumen);
        fd.append('categoria', categoria);
        fd.append('publicado_en', publicado_en);
        fd.append('activo', activo ? '1' : '0');
        if (portadaFile) fd.append('portada', portadaFile);

        // Bloques sin propiedades de UI
        const bloquesData = bloques.map((b, idx) => {
            const { _preview, ...rest } = b;
            if (b.tipo === 'imagen' && blockFilesRef[idx]) {
                return { ...rest, _file_idx: idx };
            }
            return rest;
        });
        fd.append('bloques', JSON.stringify(bloquesData));

        // Imagenes de bloques
        Object.entries(blockFilesRef).forEach(([idx, file]) => {
            fd.append(`img_bloque_${idx}`, file);
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
        if (!confirm('¿Eliminar permanentemente este registro?')) return;
        router.delete(`${basePath}/noticias/${id}`);
    }

    return (
        <div className="bg-white border border-slate-100 rounded-[24px] p-8 shadow-sm">
            <Flash message={flash} />
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                    <h2 className="text-slate-800 font-extrabold text-lg tracking-tight">Noticias y Eventos ({noticias.length})</h2>
                    <p className="text-slate-400 text-xs mt-1">Gestiona las publicaciones y eventos escolares</p>
                </div>
                <button onClick={abrirCrear} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/10 transition duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Nueva Publicacion
                </button>
            </div>

            {/* Lista de noticias */}
            <div className="space-y-4">
                {noticias.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-400 text-sm">No hay publicaciones registradas aun.</p>
                    </div>
                )}
                {noticias.map(n => (
                    <div key={n.id} className="bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 hover:border-slate-300/80 rounded-2xl p-4 flex items-center gap-4 transition duration-200">
                        {/* Portada miniatura */}
                        {n.imagen ? (
                            <img src={`/storage/${n.imagen}`} alt={n.titulo} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200" />
                        ) : (
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 shrink-0 border border-slate-200 flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-slate-800 text-sm truncate">{n.titulo}</span>
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border uppercase tracking-wider ${
                                    n.categoria === 'evento' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                    n.categoria === 'comunicado' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                    'bg-blue-50 text-blue-600 border-blue-100'
                                }`}>
                                    {categoriaLabel[n.categoria]}
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${n.activo ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                    {n.activo ? 'Visible' : 'Oculto'}
                                </span>
                            </div>
                            {n.resumen && <p className="text-slate-500 text-xs mt-1 line-clamp-1">{n.resumen}</p>}
                            {n.publicado_en && (
                                <p className="text-slate-400 text-[10px] font-semibold mt-1 flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    {new Date(n.publicado_en).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </p>
                            )}
                        </div>
                        <div className="flex gap-1 shrink-0">
                            <button onClick={() => abrirEditar(n)} className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition cursor-pointer">Editar</button>
                            <button onClick={() => eliminar(n.id)} className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition cursor-pointer">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Editor de publicacion (modal ancho) */}
            {(creando || editando) && (
                <Modal title={editando ? 'Editar Publicacion' : 'Nueva Publicacion'} onClose={cerrar} isWide>
                    <form onSubmit={guardar}>
                        {/* Metadata: dos columnas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {/* Col A */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block mb-1.5">Titulo *</label>
                                    <input value={titulo} onChange={e => setTitulo(e.target.value)} required
                                        placeholder="Gran feria de ciencias COLSIH 2026"
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium" />
                                    {errors.titulo && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.titulo}</p>}
                                </div>
                                <div>
                                    <label className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block mb-1.5">Concepto / Resumen</label>
                                    <textarea value={resumen} onChange={e => setResumen(e.target.value)} rows={3}
                                        placeholder="Breve descripcion que aparece en la tarjeta de la noticia..."
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium resize-none" />
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <label className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block mb-1.5">Categoria *</label>
                                        <select value={categoria} onChange={e => setCategoria(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium">
                                            <option value="noticia">Noticia</option>
                                            <option value="evento">Evento</option>
                                            <option value="comunicado">Comunicado</option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block mb-1.5">Fecha</label>
                                        <input type="date" value={publicado_en} onChange={e => setPublicadoEn(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition font-medium" />
                                    </div>
                                </div>
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input type="checkbox" checked={activo} onChange={e => setActivo(e.target.checked)}
                                        className="w-4.5 h-4.5 text-blue-600 border-slate-300 rounded" />
                                    <span className="text-slate-600 text-sm font-semibold">Visible en la Web</span>
                                </label>
                            </div>

                            {/* Col B: Portada */}
                            <div>
                                <label className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block mb-1.5">Imagen de Portada</label>
                                <label className="block cursor-pointer group">
                                    <div className={`w-full h-44 rounded-2xl border-2 border-dashed overflow-hidden flex items-center justify-center transition ${portadaPreview ? 'border-slate-200' : 'border-slate-300 hover:border-blue-400 bg-slate-50'}`}>
                                        {portadaPreview ? (
                                            <img src={portadaPreview} alt="portada" className="w-full h-full object-cover group-hover:opacity-80 transition" />
                                        ) : (
                                            <div className="text-center text-slate-400 space-y-2 p-4">
                                                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                <p className="text-xs font-semibold">Clic para seleccionar portada</p>
                                                <p className="text-[10px]">JPG, PNG o WebP — max 6 MB</p>
                                            </div>
                                        )}
                                    </div>
                                    <input type="file" accept="image/*" className="hidden" onChange={handlePortada} />
                                </label>
                                {portadaPreview && (
                                    <button type="button" onClick={() => { setPortadaFile(null); setPortadaPreview(editando?.imagen ? `/storage/${editando.imagen}` : null); }}
                                        className="mt-2 text-[10px] font-bold text-rose-500 hover:text-rose-700 cursor-pointer">
                                        Quitar nueva imagen
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Tablero de bloques */}
                        <div className="border-t border-slate-100 pt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-extrabold text-slate-800">Tablero de contenido</p>
                                    <p className="text-xs text-slate-400 mt-0.5">Agrega y ordena los bloques que apareceran en la pagina de la noticia</p>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">{bloques.length} bloque{bloques.length !== 1 ? 's' : ''}</span>
                            </div>

                            {/* Bloques existentes */}
                            {bloques.length === 0 && (
                                <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl">
                                    <p className="text-slate-400 text-sm font-medium">El tablero esta vacio. Agrega bloques con los botones de abajo.</p>
                                </div>
                            )}
                            <div className="space-y-3">
                                {bloques.map((bloque, idx) => (
                                    <BloqueEditor key={bloque._key || idx} bloque={bloque} idx={idx} total={bloques.length}
                                        onChange={cambiarBloque} onDelete={borrarBloque}
                                        onMoveUp={moverArriba} onMoveDown={moverAbajo}
                                        fileRef={setBlockFile} />
                                ))}
                            </div>

                            {/* Botonera de agregar bloques */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {Object.entries(TIPO_META).map(([tipo, meta]) => (
                                    <button key={tipo} type="button" onClick={() => agregarBloque(tipo)}
                                        className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg border transition cursor-pointer hover:opacity-80 active:scale-95 ${meta.color} border-current/20`}>
                                        <span className="font-black">{meta.icon}</span>
                                        + {meta.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Botones de accion */}
                        <div className="flex gap-3 pt-6 mt-4 border-t border-slate-100">
                            <button type="submit" disabled={submitting}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl py-3 text-sm transition cursor-pointer shadow-md shadow-blue-500/10 active:scale-[0.98]">
                                {submitting ? 'Guardando...' : (editando ? 'Actualizar Publicacion' : 'Crear Publicacion')}
                            </button>
                            <button type="button" onClick={cerrar} className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl py-3 text-sm transition font-bold cursor-pointer">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}

/* ── Preguntas Frecuentes ── */
function PreguntasTab({ preguntas, flash }) {
    const [editando, setEditando] = useState(null);
    const [creando, setCreando] = useState(false);

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
        if (!confirm('¿Eliminar esta pregunta?')) return;
        router.delete(`${basePath}/preguntas/${id}`);
    }

    return (
        <div className="bg-white border border-slate-100 rounded-[24px] p-8 shadow-sm">
            <Flash message={flash} />
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                    <h2 className="text-slate-800 font-extrabold text-lg tracking-tight">Preguntas Frecuentes ({preguntas.length})</h2>
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
                    <div key={p.id} className="bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 hover:border-slate-300/80 rounded-2xl p-5 flex items-start gap-4 transition duration-200">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-slate-800 text-sm">{p.pregunta}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                    p.activo 
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                        : 'bg-rose-50 text-rose-600 border-rose-100'
                                }`}>
                                    {p.activo ? 'Visible' : 'Oculto'}
                                </span>
                            </div>
                            <p className="text-slate-500 text-xs mt-2 leading-relaxed">{p.respuesta}</p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                            <button onClick={() => abrirEditar(p)} className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition cursor-pointer">Editar</button>
                            <button onClick={() => eliminar(p.id)} className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition cursor-pointer">Eliminar</button>
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

/* ── Dashboard principal ── */
const TABS = [
    { key: 'testimonios', label: 'Testimonios' },
    { key: 'noticias',    label: 'Noticias y Eventos' },
    { key: 'preguntas',   label: 'Preguntas Frecuentes' },
];

export default function AdminDashboard({ seccion, testimonios, noticias, preguntas, flash }) {
    const basePath = window.location.pathname.replace(/\/[^/]+$/, '');

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
            <div className="min-h-screen bg-[#F4F7FA] text-slate-800 font-sans antialiased flex">

                {/* ── Sidebar Izquierda (Able Pro layout) ── */}
                <aside className="w-72 bg-white border-r border-slate-100 h-screen fixed left-0 top-0 z-40 flex flex-col justify-between">
                    <div>
                        {/* Sidebar Header Brand */}
                        <div className="h-20 px-8 flex items-center gap-3 border-b border-slate-100">
                            <img src="/Logo COLSIH.svg" alt="COLSIH" className="h-10 w-auto object-contain" />
                            <div className="flex flex-col">
                                <span className="font-black text-slate-800 text-sm leading-tight uppercase tracking-wide">COLSIH</span>
                                <span className="text-[10px] font-bold text-blue-600 uppercase">Admin Panel</span>
                            </div>
                        </div>

                        {/* User profile card inside sidebar */}
                        <div className="m-5 p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md shadow-blue-500/10">
                                    A
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-extrabold text-slate-800 leading-tight">Administrador</span>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">Gestor Portal</span>
                                </div>
                            </div>
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border-2 border-white shadow-sm"></div>
                        </div>

                        {/* Sidebar Nav Links */}
                        <div className="mt-4 space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-400 tracking-[1.5px] uppercase block px-8 mb-3">
                                Módulos de Gestión
                            </span>

                            {TABS.map(tab => {
                                const isActive = seccion === tab.key;
                                return (
                                    <Link
                                        key={tab.key}
                                        href={`${basePath}/${tab.key}`}
                                        className={`flex items-center justify-between px-7 py-3.5 mx-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                                            isActive
                                                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 pl-6'
                                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
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
                                            {tab.label}
                                        </div>
                                        
                                        {/* Count badge */}
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                            isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {tab.key === 'testimonios' && testimonios.length}
                                            {tab.key === 'noticias' && noticias.length}
                                            {tab.key === 'preguntas' && preguntas.length}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-5 border-t border-slate-100 bg-slate-50/50">
                        <form method="POST" action={`${basePath}/logout`} onSubmit={e => { e.preventDefault(); router.post(`${basePath}/logout`); }}>
                            <button type="submit" className="w-full flex items-center justify-center gap-2 text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/60 border border-rose-100 px-4 py-3 rounded-xl transition duration-200 cursor-pointer shadow-sm active:scale-[0.98]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Cerrar Sesión
                            </button>
                        </form>
                    </div>
                </aside>

                {/* ── Right Content Container ── */}
                <div className="flex-1 pl-72 flex flex-col min-h-screen">
                    
                    {/* Header Top Navbar */}
                    <header className="h-20 bg-white border-b border-slate-100 fixed top-0 left-72 right-0 z-30 flex items-center justify-between px-8 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                        {/* Search input mock */}
                        <div className="relative bg-slate-50 border border-slate-200 rounded-xl px-4.5 py-2 flex items-center gap-3 w-80">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input 
                                type="text" 
                                placeholder="Buscar en el panel..." 
                                className="bg-transparent text-xs font-medium text-slate-600 placeholder-slate-400 focus:outline-none w-full"
                                readOnly
                            />
                            <div className="bg-white border border-slate-200 text-[9px] font-bold text-slate-400 px-1.5 py-0.5 rounded shadow-sm">
                                Ctrl + K
                            </div>
                        </div>

                        {/* Topbar Right Tools */}
                        <div className="flex items-center gap-4">
                            {/* Decorative tool buttons */}
                            <button className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/50 flex items-center justify-center text-slate-500 hover:text-slate-800 transition cursor-pointer">
                                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
                                </svg>
                            </button>
                            <button className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/50 flex items-center justify-center text-slate-500 hover:text-slate-800 transition relative cursor-pointer">
                                <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-blue-600 border border-white"></span>
                                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                            <div className="h-6 w-[1px] bg-slate-200"></div>
                            
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center text-xs shadow-sm">
                                    A
                                </div>
                                <span className="text-xs font-bold text-slate-700">Administrador</span>
                            </div>
                        </div>
                    </header>

                    {/* Main Scrollable Area */}
                    <main className="flex-1 p-8 pt-28 bg-[#F4F7FA] overflow-y-auto">
                        
                        {/* Welcome Banner Card */}
                        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-[28px] p-8 text-white mb-8 shadow-lg shadow-blue-500/10 flex flex-col md:flex-row items-center justify-between">
                            {/* Abstract decorative circles */}
                            <div className="absolute right-0 top-0 w-84 h-84 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
                            <div className="absolute left-1/3 bottom-0 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>
                            
                            <div className="space-y-3.5 max-w-xl z-10 text-left">
                                <span className="text-[10px] font-bold tracking-[2px] uppercase bg-white/15 px-3 py-1 rounded-full text-white/95 inline-block border border-white/10 select-none">
                                    GESTIÓN DEL PORTAL
                                </span>
                                <h2 className="text-3xl font-black tracking-tight leading-tight">
                                    ¡Bienvenido al Gestor Web!
                                </h2>
                                <p className="text-white/80 text-sm leading-relaxed font-medium">
                                    Controla, actualiza y edita los contenidos del sitio institucional del Colegio Santa Isabel de Hungría de forma rápida y sencilla.
                                </p>
                            </div>

                            {/* 3D-style Rocket Illustration */}
                            <div className="relative w-40 h-40 z-10 mt-6 md:mt-0 select-none pointer-events-none shrink-0 flex items-center justify-center">
                                <svg className="w-32 h-32 animate-bounce" style={{ animationDuration: '4s' }} viewBox="0 0 200 200" fill="none">
                                    <circle cx="100" cy="120" r="40" fill="white" fillOpacity="0.1" />
                                    <path d="M120 70 L140 50 A 20 20 0 0 1 170 80 L150 100 Z" fill="white" fillOpacity="0.15" />
                                    <path d="M85 135 L65 145 C60 148 55 142 58 137 L68 117 Z" fill="#E2E8F0" />
                                    <path d="M115 105 L135 115 C140 118 138 126 132 125 L112 115 Z" fill="#E2E8F0" />
                                    <path d="M70 125 C80 90 100 70 135 60 C125 95 105 115 70 125 Z" fill="white" />
                                    <path d="M115 80 C120 75 130 65 135 60 C130 65 120 75 115 80 Z" fill="#F87171" />
                                    <circle cx="102" cy="98" r="5" fill="#3B82F6" />
                                    <path d="M68 127 L50 145 L60 135 L45 150 L63 133" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>

                        {/* KPI Grid (Count of items in DB) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            
                            {/* KPI 1: Testimonios */}
                            <div className="bg-white border border-slate-100 rounded-[22px] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Testimonios</span>
                                        <span className="text-3xl font-extrabold text-slate-800 mt-1">{testimonios.length}</span>
                                    </div>
                                    <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                        </svg>
                                    </div>
                                </div>
                                {/* Sparkline */}
                                <div className="h-10 mt-4 select-none pointer-events-none">
                                    <svg className="w-full h-full" viewBox="0 0 120 40" preserveAspectRatio="none">
                                        <path d="M0 30 Q20 15 40 25 T80 10 T120 18" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
                                        <path d="M0 30 Q20 15 40 25 T80 10 T120 18 L120 40 L0 40 Z" fill="url(#blue-grad)" opacity="0.1" />
                                        <defs>
                                            <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#2563EB" />
                                                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mt-3 pt-3 border-t border-slate-50">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    Carrusel principal activo
                                </div>
                            </div>

                            {/* KPI 2: Noticias */}
                            <div className="bg-white border border-slate-100 rounded-[22px] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Publicaciones</span>
                                        <span className="text-3xl font-extrabold text-slate-800 mt-1">{noticias.length}</span>
                                    </div>
                                    <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                        </svg>
                                    </div>
                                </div>
                                {/* Sparkline */}
                                <div className="h-10 mt-4 select-none pointer-events-none">
                                    <svg className="w-full h-full" viewBox="0 0 120 40" preserveAspectRatio="none">
                                        <path d="M0 25 Q20 35 40 15 T80 20 T120 8" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
                                        <path d="M0 25 Q20 35 40 15 T80 20 T120 8 L120 40 L0 40 Z" fill="url(#amber-grad)" opacity="0.1" />
                                        <defs>
                                            <linearGradient id="amber-grad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#D97706" />
                                                <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mt-3 pt-3 border-t border-slate-50">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    Eventos y comunicados
                                </div>
                            </div>

                            {/* KPI 3: Preguntas */}
                            <div className="bg-white border border-slate-100 rounded-[22px] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preguntas FAQ</span>
                                        <span className="text-3xl font-extrabold text-slate-800 mt-1">{preguntas.length}</span>
                                    </div>
                                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                {/* Sparkline */}
                                <div className="h-10 mt-4 select-none pointer-events-none">
                                    <svg className="w-full h-full" viewBox="0 0 120 40" preserveAspectRatio="none">
                                        <path d="M0 20 Q20 8 40 25 T80 15 T120 5" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
                                        <path d="M0 20 Q20 8 40 25 T80 15 T120 5 L120 40 L0 40 Z" fill="url(#emerald-grad)" opacity="0.1" />
                                        <defs>
                                            <linearGradient id="emerald-grad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#059669" />
                                                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mt-3 pt-3 border-t border-slate-50">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    Ayuda al proceso de Admisión
                                </div>
                            </div>

                        </div>

                        {/* ── Active Module Content Card ── */}
                        <div className="transition-all duration-300">
                            {seccion === 'testimonios' && <TestimoniosTab testimonios={testimonios} flash={flash} />}
                            {seccion === 'noticias'    && <NoticiasTab    noticias={noticias}       flash={flash} />}
                            {seccion === 'preguntas'   && <PreguntasTab   preguntas={preguntas}     flash={flash} />}
                        </div>

                    </main>

                    {/* Footer branding */}
                    <footer className="h-14 bg-white border-t border-slate-100 px-8 flex items-center justify-between text-xs text-slate-400 font-semibold select-none">
                        <span>Colegio Santa Isabel de Hungría &copy; {new Date().getFullYear()}</span>
                        <span>Desarrollado con React & InertiaJS</span>
                    </footer>

                </div>
            </div>
        </>
    );
}
