import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

/* ── helpers ── */
function Flash({ message }) {
    if (!message) return null;
    return (
        <div className="mb-4 px-4 py-2.5 bg-green-500/20 border border-green-500/30 text-green-300 text-sm rounded-xl">
            {message}
        </div>
    );
}

function Modal({ title, onClose, children }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={onClose}>
            <div className="bg-[#0d1f35] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-white font-bold text-base">{title}</h3>
                    <button onClick={onClose} className="text-white/40 hover:text-white transition text-xl leading-none cursor-pointer">✕</button>
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

    const form = useForm({ nombre: '', cargo: '', texto: '', activo: true, orden: 0 });

    function abrirCrear() {
        form.reset();
        setEditando(null);
        setCreando(true);
    }

    function abrirEditar(t) {
        form.setData({ nombre: t.nombre, cargo: t.cargo ?? '', texto: t.texto, activo: t.activo, orden: t.orden });
        setEditando(t);
        setCreando(false);
    }

    function cerrar() { setCreando(false); setEditando(null); form.clearErrors(); }

    function guardar(e) {
        e.preventDefault();
        if (editando) {
            form.put(`${window.location.pathname.replace(/\/[^/]+$/, '')}/testimonios/${editando.id}`, { onSuccess: cerrar });
        } else {
            form.post(`${window.location.pathname.replace(/\/[^/]+$/, '')}/testimonios`, { onSuccess: cerrar });
        }
    }

    function eliminar(id) {
        if (!confirm('¿Eliminar este testimonio?')) return;
        router.delete(`${window.location.pathname.replace(/\/[^/]+$/, '')}/testimonios/${id}`);
    }

    const basePath = window.location.pathname.replace(/\/[^/]+$/, '');

    return (
        <div>
            <Flash message={flash} />
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-bold text-lg">Testimonios ({testimonios.length})</h2>
                <button onClick={abrirCrear} className="bg-[#0057D9] hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition cursor-pointer">+ Nuevo</button>
            </div>

            <div className="space-y-3">
                {testimonios.length === 0 && <p className="text-white/40 text-sm">No hay testimonios aún.</p>}
                {testimonios.map(t => (
                    <div key={t.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-white text-sm">{t.nombre}</span>
                                {t.cargo && <span className="text-white/40 text-xs">{t.cargo}</span>}
                                <span className={`text-xs px-2 py-0.5 rounded-full ${t.activo ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{t.activo ? 'Activo' : 'Oculto'}</span>
                            </div>
                            <p className="text-white/60 text-xs mt-1 line-clamp-2">{t.texto}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <button onClick={() => abrirEditar(t)} className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer">Editar</button>
                            <button onClick={() => eliminar(t.id)} className="text-xs text-red-400 hover:text-red-300 cursor-pointer">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

            {(creando || editando) && (
                <Modal title={editando ? 'Editar Testimonio' : 'Nuevo Testimonio'} onClose={cerrar}>
                    <form onSubmit={guardar} className="space-y-4">
                        <div>
                            <label className="text-white/70 text-xs font-semibold block mb-1">Nombre *</label>
                            <input value={form.data.nombre} onChange={e => form.setData('nombre', e.target.value)} required className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                            {form.errors.nombre && <p className="text-red-400 text-xs mt-1">{form.errors.nombre}</p>}
                        </div>
                        <div>
                            <label className="text-white/70 text-xs font-semibold block mb-1">Cargo / Rol</label>
                            <input value={form.data.cargo} onChange={e => form.setData('cargo', e.target.value)} className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="text-white/70 text-xs font-semibold block mb-1">Testimonio *</label>
                            <textarea value={form.data.texto} onChange={e => form.setData('texto', e.target.value)} required rows={4} className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none" />
                            {form.errors.texto && <p className="text-red-400 text-xs mt-1">{form.errors.texto}</p>}
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-white/70 text-xs font-semibold block mb-1">Orden</label>
                                <input type="number" min="0" value={form.data.orden} onChange={e => form.setData('orden', Number(e.target.value))} className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="flex items-end pb-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={form.data.activo} onChange={e => form.setData('activo', e.target.checked)} className="w-4 h-4 rounded" />
                                    <span className="text-white/70 text-sm">Visible</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button type="submit" disabled={form.processing} className="flex-1 bg-[#0057D9] hover:bg-blue-600 disabled:opacity-50 text-white font-bold rounded-xl py-2 text-sm transition cursor-pointer">
                                {form.processing ? 'Guardando…' : 'Guardar'}
                            </button>
                            <button type="button" onClick={cerrar} className="px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl py-2 text-sm transition cursor-pointer">Cancelar</button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}

/* ── Noticias ── */
function NoticiasTab({ noticias, flash }) {
    const [editando, setEditando] = useState(null);
    const [creando, setCreando] = useState(false);

    const form = useForm({ titulo: '', resumen: '', contenido: '', categoria: 'noticia', activo: true, publicado_en: '' });

    function abrirCrear() {
        form.reset();
        form.setData('categoria', 'noticia');
        form.setData('activo', true);
        setEditando(null);
        setCreando(true);
    }

    function abrirEditar(n) {
        form.setData({
            titulo: n.titulo,
            resumen: n.resumen ?? '',
            contenido: n.contenido,
            categoria: n.categoria,
            activo: n.activo,
            publicado_en: n.publicado_en ? n.publicado_en.substring(0, 10) : '',
        });
        setEditando(n);
        setCreando(false);
    }

    function cerrar() { setCreando(false); setEditando(null); form.clearErrors(); }

    const basePath = window.location.pathname.replace(/\/[^/]+$/, '');

    function guardar(e) {
        e.preventDefault();
        if (editando) {
            form.put(`${basePath}/noticias/${editando.id}`, { onSuccess: cerrar });
        } else {
            form.post(`${basePath}/noticias`, { onSuccess: cerrar });
        }
    }

    function eliminar(id) {
        if (!confirm('¿Eliminar permanentemente este registro?')) return;
        router.delete(`${basePath}/noticias/${id}`);
    }

    const categoriaLabel = { noticia: 'Noticia', evento: 'Evento', comunicado: 'Comunicado' };

    return (
        <div>
            <Flash message={flash} />
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-bold text-lg">Noticias y Eventos ({noticias.length})</h2>
                <button onClick={abrirCrear} className="bg-[#0057D9] hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition cursor-pointer">+ Nuevo</button>
            </div>

            <div className="space-y-3">
                {noticias.length === 0 && <p className="text-white/40 text-sm">No hay registros aún.</p>}
                {noticias.map(n => (
                    <div key={n.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-white text-sm truncate">{n.titulo}</span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">{categoriaLabel[n.categoria]}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${n.activo ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{n.activo ? 'Activo' : 'Oculto'}</span>
                            </div>
                            {n.publicado_en && <p className="text-white/40 text-xs mt-1">{new Date(n.publicado_en).toLocaleDateString('es-CO')}</p>}
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <button onClick={() => abrirEditar(n)} className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer">Editar</button>
                            <button onClick={() => eliminar(n.id)} className="text-xs text-red-400 hover:text-red-300 cursor-pointer">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

            {(creando || editando) && (
                <Modal title={editando ? 'Editar Noticia / Evento' : 'Nueva Noticia / Evento'} onClose={cerrar}>
                    <form onSubmit={guardar} className="space-y-4">
                        <div>
                            <label className="text-white/70 text-xs font-semibold block mb-1">Título *</label>
                            <input value={form.data.titulo} onChange={e => form.setData('titulo', e.target.value)} required className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                            {form.errors.titulo && <p className="text-red-400 text-xs mt-1">{form.errors.titulo}</p>}
                        </div>
                        <div>
                            <label className="text-white/70 text-xs font-semibold block mb-1">Categoría *</label>
                            <select value={form.data.categoria} onChange={e => form.setData('categoria', e.target.value)} className="w-full bg-[#0d1f35] border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                                <option value="noticia">Noticia</option>
                                <option value="evento">Evento</option>
                                <option value="comunicado">Comunicado</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-white/70 text-xs font-semibold block mb-1">Resumen</label>
                            <textarea value={form.data.resumen} onChange={e => form.setData('resumen', e.target.value)} rows={2} className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none" />
                        </div>
                        <div>
                            <label className="text-white/70 text-xs font-semibold block mb-1">Contenido *</label>
                            <textarea value={form.data.contenido} onChange={e => form.setData('contenido', e.target.value)} required rows={5} className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none" />
                            {form.errors.contenido && <p className="text-red-400 text-xs mt-1">{form.errors.contenido}</p>}
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-white/70 text-xs font-semibold block mb-1">Fecha publicación</label>
                                <input type="date" value={form.data.publicado_en} onChange={e => form.setData('publicado_en', e.target.value)} className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="flex items-end pb-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={form.data.activo} onChange={e => form.setData('activo', e.target.checked)} className="w-4 h-4 rounded" />
                                    <span className="text-white/70 text-sm">Visible</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button type="submit" disabled={form.processing} className="flex-1 bg-[#0057D9] hover:bg-blue-600 disabled:opacity-50 text-white font-bold rounded-xl py-2 text-sm transition cursor-pointer">
                                {form.processing ? 'Guardando…' : 'Guardar'}
                            </button>
                            <button type="button" onClick={cerrar} className="px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl py-2 text-sm transition cursor-pointer">Cancelar</button>
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
        <div>
            <Flash message={flash} />
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-bold text-lg">Preguntas Frecuentes ({preguntas.length})</h2>
                <button onClick={abrirCrear} className="bg-[#0057D9] hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition cursor-pointer">+ Nueva</button>
            </div>

            <div className="space-y-3">
                {preguntas.length === 0 && <p className="text-white/40 text-sm">No hay preguntas aún.</p>}
                {preguntas.map(p => (
                    <div key={p.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-white text-sm">{p.pregunta}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${p.activo ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{p.activo ? 'Activa' : 'Oculta'}</span>
                            </div>
                            <p className="text-white/50 text-xs mt-1 line-clamp-2">{p.respuesta}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <button onClick={() => abrirEditar(p)} className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer">Editar</button>
                            <button onClick={() => eliminar(p.id)} className="text-xs text-red-400 hover:text-red-300 cursor-pointer">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

            {(creando || editando) && (
                <Modal title={editando ? 'Editar Pregunta' : 'Nueva Pregunta'} onClose={cerrar}>
                    <form onSubmit={guardar} className="space-y-4">
                        <div>
                            <label className="text-white/70 text-xs font-semibold block mb-1">Pregunta *</label>
                            <input value={form.data.pregunta} onChange={e => form.setData('pregunta', e.target.value)} required className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                            {form.errors.pregunta && <p className="text-red-400 text-xs mt-1">{form.errors.pregunta}</p>}
                        </div>
                        <div>
                            <label className="text-white/70 text-xs font-semibold block mb-1">Respuesta *</label>
                            <textarea value={form.data.respuesta} onChange={e => form.setData('respuesta', e.target.value)} required rows={4} className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none" />
                            {form.errors.respuesta && <p className="text-red-400 text-xs mt-1">{form.errors.respuesta}</p>}
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-white/70 text-xs font-semibold block mb-1">Orden</label>
                                <input type="number" min="0" value={form.data.orden} onChange={e => form.setData('orden', Number(e.target.value))} className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="flex items-end pb-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={form.data.activo} onChange={e => form.setData('activo', e.target.checked)} className="w-4 h-4 rounded" />
                                    <span className="text-white/70 text-sm">Visible</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button type="submit" disabled={form.processing} className="flex-1 bg-[#0057D9] hover:bg-blue-600 disabled:opacity-50 text-white font-bold rounded-xl py-2 text-sm transition cursor-pointer">
                                {form.processing ? 'Guardando…' : 'Guardar'}
                            </button>
                            <button type="button" onClick={cerrar} className="px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl py-2 text-sm transition cursor-pointer">Cancelar</button>
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

    return (
        <>
            <Head title="Panel Administrativo | COLSIH" />
            <div className="min-h-screen bg-[#08111F] text-white">

                {/* Header */}
                <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/Logo COLSIH.svg" alt="COLSIH" className="h-9 w-auto" />
                        <span className="font-bold text-sm text-white/80">Panel Administrativo</span>
                    </div>
                    <form method="POST" action={`${basePath}/logout`} onSubmit={e => { e.preventDefault(); router.post(`${basePath}/logout`); }}>
                        <button type="submit" className="text-xs text-white/40 hover:text-white transition cursor-pointer">Cerrar sesión</button>
                    </form>
                </header>

                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Tabs */}
                    <div className="flex gap-1 bg-white/5 p-1 rounded-xl mb-8 border border-white/10">
                        {TABS.map(tab => (
                            <Link
                                key={tab.key}
                                href={`${basePath}/${tab.key}`}
                                className={`flex-1 text-center text-sm font-semibold py-2 rounded-lg transition ${
                                    seccion === tab.key
                                        ? 'bg-[#0057D9] text-white'
                                        : 'text-white/50 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {tab.label}
                            </Link>
                        ))}
                    </div>

                    {/* Contenido */}
                    {seccion === 'testimonios' && <TestimoniosTab testimonios={testimonios} flash={flash} />}
                    {seccion === 'noticias'    && <NoticiasTab    noticias={noticias}       flash={flash} />}
                    {seccion === 'preguntas'   && <PreguntasTab   preguntas={preguntas}     flash={flash} />}
                </div>
            </div>
        </>
    );
}
