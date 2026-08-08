import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PageBuilder from './PageBuilder/PageBuilder';
import CarnetsAdminTab from './CarnetsAdminTab';
import AdminSidebar from '@/Components/AdminSidebar';
import DashboardOverview from '@/Components/DashboardOverview';
import { Sun, Moon, Eye, Move, ZoomIn, Camera, User, X, Check, Upload, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Plus, Minus, Trash2, Terminal, Server, RefreshCw, Database, HardDrive, ShieldAlert, Cpu, Copy, Play, CreditCard, GitBranch, Trophy, Flame, Sparkles, Shield, Star, Bell, Search, PanelLeft, UserCheck, UserX, Mail, Phone, AtSign, Lock, Image } from 'lucide-react';
import { processImageFile } from '@/utils/heicConverter';
import { mediaUrl } from '@/utils/mediaUrl';

const getAdminBasePath = () => {
    if (typeof window === 'undefined') return '/sih-panel-308';
    const parts = window.location.pathname.split('/').filter(Boolean);
    return parts.length > 0 ? `/${parts[0]}` : '/sih-panel-308';
};

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
    if (typeof document === 'undefined') return null;
    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-6 md:p-8 animate-fadeIn" onClick={onClose}>
            <div 
                className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl sm:rounded-[24px] p-5 sm:p-6 lg:p-8 w-full ${isWide ? 'max-w-5xl' : 'max-w-xl'} max-h-[90vh] overflow-y-auto shadow-2xl transform scale-100 transition-all duration-300 relative`} 
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
                    <h3 className="text-slate-800 dark:text-slate-100 font-extrabold text-base sm:text-lg tracking-tight">{title}</h3>
                    <button 
                        onClick={onClose} 
                        className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-700 dark:text-slate-400 transition flex items-center justify-center text-sm font-bold cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>,
        document.body
    );
}

/* ── Testimonios ── */
const ROLES_TESTIMONIO = ['Estudiante', 'Docente', 'Administrativo', 'Planta'];

const FotoPositionEditor = React.memo(function FotoPositionEditor({ previewImage, posicion, onChange }) {
    const containerRef = useRef(null);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startPos = useRef(50);
    const rafRef = useRef(null);

    const getClientY = (e) => e.touches ? e.touches[0].clientY : e.clientY;

    const onStart = useCallback((e) => {
        isDragging.current = true;
        startY.current = getClientY(e);
        startPos.current = posicion;
        
        const handleMove = (moveEvent) => {
            if (!isDragging.current) return;
            const dy = getClientY(moveEvent) - startY.current;
            const h = containerRef.current?.offsetHeight || 1;
            const next = Math.round(Math.max(0, Math.min(100, startPos.current + (dy / h) * 100)));
            
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                onChange(next);
            });
        };

        const handleEnd = () => {
            isDragging.current = false;
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleEnd);
        };

        window.addEventListener('mousemove', handleMove, { passive: true });
        window.addEventListener('mouseup', handleEnd);
        window.addEventListener('touchmove', handleMove, { passive: true });
        window.addEventListener('touchend', handleEnd);
    }, [posicion, onChange]);

    return (
        <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Posición de la Foto
            </label>
            <div
                ref={containerRef}
                className="relative rounded-xl overflow-hidden h-36 cursor-ns-resize select-none border border-slate-200 dark:border-slate-700"
                onMouseDown={onStart}
                onTouchStart={onStart}
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
                        <span className="text-slate-400 text-xs font-semibold">Sube una foto primero</span>
                    </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        Arrastra para ajustar
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button 
                    type="button" 
                    onClick={() => onChange(Math.max(0, posicion - 10))}
                    className="flex-1 text-xs font-bold py-1.5 bg-[#E5E7EB] hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition cursor-pointer active:scale-95"
                >
                    ↑ Arriba
                </button>
                <span className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 w-12 text-center shrink-0">{posicion}%</span>
                <button 
                    type="button" 
                    onClick={() => onChange(Math.min(100, posicion + 10))}
                    className="flex-1 text-xs font-bold py-1.5 bg-[#E5E7EB] hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition cursor-pointer active:scale-95"
                >
                    ↓ Abajo
                </button>
            </div>
        </div>
    );
});

const INITIAL_TESTIMONIO = {
    nombre: '',
    cargo: 'Estudiante',
    texto: '',
    imagen: null,
    foto_posicion: 50,
    video_url: '',
    video_activo: false,
    activo: true,
    orden: 0
};

const TestimonioModal = React.memo(function TestimonioModal({ editando, creando, cerrar }) {
    const basePath = getAdminBasePath();
    const form = useForm(
        editando ? {
            nombre: editando.nombre || '',
            cargo: editando.cargo ?? 'Estudiante',
            texto: editando.texto || '',
            imagen: null,
            foto_posicion: Number(editando.foto_posicion ?? 50),
            video_url: editando.video_url ?? '',
            video_activo: !!editando.video_activo,
            activo: !!editando.activo,
            orden: editando.orden ?? 0
        } : INITIAL_TESTIMONIO
    );

    const [previewImage, setPreviewImage] = useState(() => {
        if (editando && editando.imagen) {
            return mediaUrl(editando.imagen);
        }
        return null;
    });

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
            setPreviewImage(mediaUrl(editando.imagen));
        } else {
            setPreviewImage(null);
        }
    }, [form.data.imagen, editando]);

    function guardar(e) {
        e.preventDefault();
        if (editando) {
            router.post(`${basePath}/testimonios/${editando.id}`, {
                _method: 'PUT',
                ...form.data
            }, {
                forceFormData: true,
                onSuccess: cerrar,
                onError: (errs) => {
                    Object.keys(errs).forEach(key => form.setError(key, errs[key]));
                }
            });
        } else {
            form.post(`${basePath}/testimonios`, { onSuccess: cerrar });
        }
    }

    if (!creando && !editando) return null;
    if (typeof document === 'undefined') return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] bg-[#6C727F]/90 dark:bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn" onClick={cerrar}>
            <div className="w-full max-w-6xl my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" onClick={e => e.stopPropagation()}>
                
                {/* COLUMNA IZQUIERDA: Vista Previa Testimonio */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    {/* Card Header Vista Previa */}
                    <div className="bg-white dark:bg-slate-900 rounded-[20px] py-3.5 px-6 shadow-xl text-center border border-slate-100/50 dark:border-slate-800">
                        <h3 className="text-[#000000] dark:text-white font-bold text-xl tracking-tight font-sans">Vista Previa</h3>
                    </div>

                    {/* Tarjeta de Vista Previa (Directa sin card de fondo externa, con sombra 2xl) */}
                    <div className="w-full rounded-[30px] overflow-hidden shadow-2xl border border-slate-800/80 bg-slate-900/90 relative flex flex-col justify-between p-6 select-none min-h-[440px] transition-all duration-300">
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Vista Previa"
                                className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
                                style={{ objectPosition: `center ${form.data.foto_posicion}%` }}
                            />
                        ) : (
                            <div className="absolute inset-0 bg-slate-800 z-0 flex items-center justify-center">
                                <span className="text-slate-500 text-xs font-semibold">Sin imagen seleccionada</span>
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
                        <div className="relative z-30 flex flex-col justify-between h-full flex-1 min-h-[380px]">
                            <div className="flex justify-between items-start">
                                <span className="text-6xl font-serif text-white/30 leading-none">"</span>
                                {form.data.video_activo && form.data.video_url && (
                                    <div className="bg-[#800A15] text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                        Video
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-h-[40px]"></div>
                            <div className="space-y-3">
                                <p className="text-white text-xs sm:text-sm font-bold italic leading-relaxed text-left"
                                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.95)' }}>
                                    {form.data.texto ? `«${form.data.texto}»` : '«Texto del testimonio...»'}
                                </p>
                                <div className="text-left pt-2 border-t border-white/10">
                                    <span className="block text-sm font-extrabold text-white drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">
                                        {form.data.nombre || 'Nombre de la Persona'}
                                    </span>
                                    <span className="block text-[10px] font-bold text-[#3b82f6] uppercase tracking-wider mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                        {form.data.cargo || 'Rol'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Formulario Testimonio */}
                <form onSubmit={guardar} className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[30px] p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                    {/* Título */}
                    <h2 className="text-[#000000] dark:text-white font-bold text-xl sm:text-2xl text-center tracking-tight font-sans">
                        {editando ? 'Editar testimonio' : 'Nuevo testimonio'}
                    </h2>

                    {/* Separador 1 */}
                    <div className="h-px bg-slate-200/80 dark:bg-slate-800 my-3" />

                    <div className="space-y-4">
                        {/* Campo Nombre */}
                        <div>
                            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                                NOMBRE COMPLETO *
                            </label>
                            <input
                                value={form.data.nombre}
                                onChange={e => form.setData('nombre', e.target.value)}
                                required
                                placeholder="Ej: María Camila Restrepo"
                                className="w-full bg-[#E5E7EB] dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 rounded-md px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition border-none"
                            />
                            {form.errors.nombre && <p className="text-rose-500 text-xs mt-1 font-semibold">{form.errors.nombre}</p>}
                        </div>

                        {/* Campo Rol */}
                        <div>
                            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                                ROL / CARGO *
                            </label>
                            <select
                                value={form.data.cargo}
                                onChange={e => form.setData('cargo', e.target.value)}
                                className="w-full bg-[#E5E7EB] dark:bg-slate-800 text-slate-900 dark:text-white rounded-md px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer border-none"
                            >
                                {ROLES_TESTIMONIO.map(r => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                        </div>

                        {/* Campo Texto */}
                        <div>
                            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                                TEXTO DEL TESTIMONIO *
                            </label>
                            <textarea
                                value={form.data.texto}
                                onChange={e => form.setData('texto', e.target.value)}
                                required
                                rows={3}
                                placeholder="Escribe el testimonio aquí..."
                                className="w-full bg-[#E5E7EB] dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 rounded-md px-3.5 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none border-none"
                            />
                            {form.errors.texto && <p className="text-rose-500 text-xs mt-1 font-semibold">{form.errors.texto}</p>}
                        </div>

                        {/* Campo Foto */}
                        <div>
                            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                                FOTO DE FONDO *
                            </label>
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
                                <label 
                                    htmlFor="testimonio-file-upload"
                                    className="bg-[#E5E7EB] dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold px-4 py-2 rounded-md transition cursor-pointer select-none whitespace-nowrap"
                                >
                                    {form.data.imagen ? 'Cambiar Foto' : 'Seleccionar Foto'}
                                </label>
                                <span className="text-xs font-medium text-slate-400 dark:text-slate-500 truncate max-w-[240px]">
                                    {form.data.imagen ? form.data.imagen.name : (editando ? 'Conservar foto actual' : 'Ningún archivo seleccionado')}
                                </span>
                            </div>
                            {form.errors.imagen && <p className="text-rose-500 text-xs mt-1 font-semibold">{form.errors.imagen}</p>}
                        </div>

                        {/* Editor de Posición */}
                        <FotoPositionEditor
                            previewImage={previewImage}
                            posicion={form.data.foto_posicion}
                            onChange={v => form.setData('foto_posicion', v)}
                        />

                        {/* Toggle de Video */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3.5 space-y-2.5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-slate-800 dark:text-slate-200 text-xs font-bold">Video del testimonio</span>
                                    <p className="text-slate-400 text-[10px] mt-0.5">
                                        {form.data.video_activo ? 'Habilitado — se mostrará botón de reproducción' : 'Deshabilitado — la tarjeta no tendrá video'}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => form.setData('video_activo', !form.data.video_activo)}
                                    className={`relative inline-flex h-5.5 w-10 items-center rounded-full transition-colors duration-200 focus:outline-none cursor-pointer ${
                                        form.data.video_activo ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
                                    }`}
                                >
                                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                        form.data.video_activo ? 'translate-x-5' : 'translate-x-1'
                                    }`} />
                                </button>
                            </div>
                            {form.data.video_activo && (
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">URL de YouTube</label>
                                    <input
                                        value={form.data.video_url}
                                        onChange={e => form.setData('video_url', e.target.value)}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className="w-full bg-[#E5E7EB] dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 rounded-md px-3.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition border-none"
                                    />
                                    {form.errors.video_url && <p className="text-rose-500 text-xs mt-1 font-semibold">{form.errors.video_url}</p>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Separador 2 */}
                    <div className="h-px bg-slate-200/80 dark:bg-slate-800 my-4" />

                    {/* Orden & Visible */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                ORDEN:
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={form.data.orden}
                                onChange={e => form.setData('orden', Number(e.target.value))}
                                className="w-20 bg-[#E5E7EB] dark:bg-slate-800 text-slate-900 dark:text-white rounded-md px-3 py-1.5 text-xs font-semibold text-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition border-none"
                            />
                        </div>

                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={form.data.activo}
                                onChange={e => form.setData('activo', e.target.checked)}
                                className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer accent-blue-600"
                            />
                            <span className="text-slate-700 dark:text-slate-300 text-xs font-semibold">Visible en la web</span>
                        </label>
                    </div>

                    {/* Separador 3 */}
                    <div className="h-px bg-slate-200/80 dark:bg-slate-800 my-4" />

                    {/* Botones de Acción */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-1">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="w-full sm:w-auto bg-[#E5E7EB] dark:bg-slate-800 hover:bg-emerald-600 hover:text-white disabled:opacity-50 text-slate-800 dark:text-slate-200 text-xs font-bold px-4 py-2 rounded-md transition cursor-pointer active:scale-95"
                        >
                            {form.processing ? 'Guardando…' : 'Guardar Testimonio'}
                        </button>
                        <button
                            type="button"
                            onClick={cerrar}
                            className="w-full sm:w-auto bg-[#E5E7EB] dark:bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold px-4 py-2 rounded-md transition cursor-pointer active:scale-95"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>

            </div>
        </div>,
        document.body
    );
});

function TestimoniosTab({ testimonios, flash }) {
    const [editando, setEditando] = useState(null);
    const [creando, setCreando] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    function abrirCrear() {
        setEditando(null);
        setCreando(true);
    }

    function abrirEditar(t) {
        setEditando(t);
        setCreando(false);
    }

    function cerrar() {
        setCreando(false);
        setEditando(null);
    }

    function eliminar(id) {
        setDeletingId(null);
        const basePath = getAdminBasePath();
        router.delete(`${basePath}/testimonios/${id}`, {
            preserveState: true, preserveScroll: true,
        });
    }

    return (
        <div className="space-y-6 animate-fadeIn">
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
                            <img src={mediaUrl(t.imagen)} alt={t.nombre} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700" />
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
                <TestimonioModal 
                    editando={editando} 
                    creando={creando} 
                    cerrar={cerrar} 
                />
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

    const previewSrc = bloque._preview || mediaUrl(bloque.imagen);

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
    const [seccionNoticia, setSeccionNoticia] = useState('general');
    const [esDeporte, setEsDeporte] = useState(false);
    const [publicado_en, setPublicadoEn] = useState('');
    const [activo, setActivo] = useState(true);
    const [portadaFile, setPortadaFile] = useState(null);
    const [portadaPreview, setPortadaPreview] = useState(null);

    const [bloques, setBloques] = useState([]);
    const blockFilesRef = useState({})[0];
    const [errors, setErrors] = useState({});

    const basePath = window.location.pathname.replace(/\/[^/]+$/, '');
    const categoriaLabel = { noticia: 'Noticia', evento: 'Evento', comunicado: 'Comunicado', preescolar: 'Preescolar' };

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
        setSeccionNoticia('general'); setEsDeporte(false);
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
        setSeccionNoticia(n.seccion || 'general');
        setEsDeporte(!!n.es_deporte);
        setPublicadoEn(n.publicado_en ? n.publicado_en.substring(0, 10) : '');
        setActivo(!!n.activo);
        if (n.imagen) setPortadaPreview(mediaUrl(n.imagen));
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
        fd.append('seccion', seccionNoticia);
        fd.append('es_deporte', seccionNoticia === 'sena' ? '0' : (esDeporte ? '1' : '0'));
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
        <div className="space-y-6 animate-fadeIn">
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
                            <img src={mediaUrl(n.imagen)} alt={n.titulo} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700" />
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

            {(creando || editando) && paso === 1 && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] bg-[#6C727F]/90 dark:bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn" onClick={cerrar}>
                    <div className="w-full max-w-6xl my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" onClick={e => e.stopPropagation()}>
                        
                        {/* COLUMNA IZQUIERDA: Vista Previa */}
                        <div className="lg:col-span-4 flex flex-col gap-4">
                            {/* Card Header Vista Previa */}
                            <div className="bg-white dark:bg-slate-900 rounded-[20px] py-3.5 px-6 shadow-xl text-center border border-slate-100/50 dark:border-slate-800">
                                <h3 className="text-[#000000] dark:text-white font-bold text-xl tracking-tight font-sans">Vista Previa</h3>
                            </div>

                            {/* Tarjeta de Vista Previa (Directa sin card de fondo, más grande y con sombra) */}
                            <div className="w-full rounded-[30px] overflow-hidden shadow-2xl border border-slate-100/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between transition-all duration-300 min-h-[440px]">
                                <div className="h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative shrink-0">
                                    {portadaPreview ? (
                                        <img src={portadaPreview} alt={titulo} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 relative">
                                            <img src="https://media.colsih.edu.co/home/estudiantes-colsih.png" className="w-full h-full object-cover grayscale opacity-20" />
                                            <img src="/marca/logo-colsih.svg" className="w-12 h-auto opacity-20 absolute center" />
                                        </div>
                                    )}
                                    <span className="absolute top-3.5 left-3.5 bg-[#800A15] text-white font-extrabold text-[10px] uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md">
                                        {categoriaLabel[categoria]}
                                    </span>
                                </div>
                                <div className="p-6 flex-grow flex flex-col justify-between text-left space-y-4">
                                    <div className="space-y-2">
                                        <time className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                                            {publicado_en ? new Date(publicado_en + 'T00:00:00').toLocaleDateString('es-CO') : 'Hoy'}
                                        </time>
                                        <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug line-clamp-2">
                                            {titulo || 'Título de la Publicación'}
                                        </h3>
                                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-4 leading-relaxed">
                                            {resumen || 'Resumen o copete de la noticia que se mostrará en la tarjeta de la página de inicio...'}
                                        </p>
                                    </div>
                                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                                        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-900 dark:text-blue-400 uppercase tracking-wider">
                                            Leer noticia →
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* COLUMNA DERECHA: Formulario Nueva Publicación */}
                        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[30px] p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                            {/* Título de la tarjeta */}
                            <h2 className="text-[#000000] dark:text-white font-bold text-xl sm:text-2xl text-center tracking-tight font-sans">
                                {editando ? 'Editar publicación' : 'Nueva publicación'}
                            </h2>

                            {/* Separador 1 */}
                            <div className="h-px bg-slate-200/80 dark:bg-slate-800 my-3" />

                            <div className="space-y-4">
                                {/* Campo Título */}
                                <div>
                                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                                        TÍTULO DE LA PUBLICACIÓN *
                                    </label>
                                    <input 
                                        value={titulo} 
                                        onChange={e => setTitulo(e.target.value)} 
                                        required 
                                        placeholder="Ej: Gran feria de ciencias COLSIH 2026" 
                                        className="w-full bg-[#E5E7EB] dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 rounded-md px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition border-none" 
                                    />
                                    {errors.titulo && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.titulo}</p>}
                                </div>

                                {/* Campo Resumen */}
                                <div>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                                            RESUMEN / COPETE DE TARJETA
                                        </label>
                                        <span className="text-[10px] font-bold text-slate-400">{resumen.length}/400</span>
                                    </div>
                                    <textarea 
                                        value={resumen} 
                                        onChange={e => setResumen(e.target.value.substring(0, 400))} 
                                        rows={3} 
                                        placeholder="Escribe un breve resumen descriptivo para la tarjeta..." 
                                        className="w-full bg-[#E5E7EB] dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 rounded-md px-3.5 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none border-none" 
                                    />
                                </div>

                                {/* Fila 3 Columnas: Categoría / Sección / Fecha */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                                            TIPO / CATEGORÍA*
                                        </label>
                                        <select 
                                            value={categoria} 
                                            onChange={e => setCategoria(e.target.value)} 
                                            className="w-full bg-[#E5E7EB] dark:bg-slate-800 text-slate-900 dark:text-white rounded-md px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer border-none"
                                        >
                                            <option value="noticia">Noticia</option>
                                            <option value="evento">Evento</option>
                                            <option value="comunicado">Comunicado</option>
                                            <option value="preescolar">Preescolar (Blog)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                                            SECCIÓN ACADÉMICA
                                        </label>
                                        <select 
                                            value={seccionNoticia} 
                                            onChange={e => {
                                                const val = e.target.value;
                                                setSeccionNoticia(val);
                                                if (val === 'sena') setEsDeporte(false);
                                            }} 
                                            className="w-full bg-[#E5E7EB] dark:bg-slate-800 text-slate-900 dark:text-white rounded-md px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer border-none"
                                        >
                                            <option value="general">Toda la Institución</option>
                                            <option value="preescolar">Preescolar</option>
                                            <option value="primaria">Primaria</option>
                                            <option value="bachillerato">Bachillerato</option>
                                            <option value="sena">SENA</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                                            FECHA PUBLICACIÓN
                                        </label>
                                        <input 
                                            type="date" 
                                            value={publicado_en} 
                                            onChange={e => setPublicadoEn(e.target.value)} 
                                            className="w-full bg-[#E5E7EB] dark:bg-slate-800 text-slate-900 dark:text-white rounded-md px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer border-none" 
                                        />
                                    </div>
                                </div>

                                {/* Campo Foto de Portada */}
                                <div>
                                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                                        FOTO DE PORTADA
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input type="file" accept="image/*,.heic,.heif,image/heic,image/heif" onChange={handlePortada} className="hidden" id="noticia-portada-upload" />
                                        <label htmlFor="noticia-portada-upload" className="bg-[#E5E7EB] dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold px-4 py-2 rounded-md transition cursor-pointer select-none">
                                            {portadaFile ? 'Cambiar Portada' : 'Seleccionar Portada'}
                                        </label>
                                        <span className="text-xs font-medium text-slate-400 dark:text-slate-500 truncate max-w-[240px]">
                                            {portadaFile ? portadaFile.name : (editando ? 'Conservar imagen actual' : 'Ninguno Seleccionado')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Separador 2 */}
                            <div className="h-px bg-slate-200/80 dark:bg-slate-800 my-4" />

                            {/* Checkboxes */}
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                    <input 
                                        type="checkbox" 
                                        checked={activo} 
                                        onChange={e => setActivo(e.target.checked)} 
                                        className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer accent-blue-600" 
                                    />
                                    <span className="text-slate-700 dark:text-slate-300 text-xs font-semibold">Visible en la web</span>
                                </label>

                                <label className={`flex items-center gap-2.5 select-none ${seccionNoticia === 'sena' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                                    <input 
                                        type="checkbox" 
                                        checked={seccionNoticia === 'sena' ? false : esDeporte} 
                                        disabled={seccionNoticia === 'sena'}
                                        onChange={e => setEsDeporte(e.target.checked)} 
                                        className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer accent-blue-600" 
                                    />
                                    <span className="text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                                        Destacar en Sección de Deportes
                                        {seccionNoticia === 'sena' && (
                                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                                (SENA no aplica)
                                            </span>
                                        )}
                                    </span>
                                </label>
                            </div>

                            {/* Separador 3 */}
                            <div className="h-px bg-slate-200/80 dark:bg-slate-800 my-4" />

                            {/* Botones de Acción */}
                            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-1">
                                <button 
                                    type="button" 
                                    onClick={() => setPaso(2)} 
                                    disabled={!titulo} 
                                    className="w-full sm:w-auto bg-[#E5E7EB] dark:bg-slate-800 hover:bg-blue-600 hover:text-white disabled:opacity-50 text-slate-800 dark:text-slate-200 text-xs font-bold px-4 py-2 rounded-md transition cursor-pointer active:scale-95 flex items-center justify-center gap-1"
                                >
                                    <span>Siguiente: Escribir Contenido</span>
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => guardar()} 
                                    disabled={!titulo || submitting} 
                                    className="w-full sm:w-auto bg-[#E5E7EB] dark:bg-slate-800 hover:bg-emerald-600 hover:text-white disabled:opacity-50 text-slate-800 dark:text-slate-200 text-xs font-bold px-4 py-2 rounded-md transition cursor-pointer active:scale-95"
                                >
                                    {submitting ? 'Guardando...' : 'Guardar Rápido'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={cerrar} 
                                    className="w-full sm:w-auto bg-[#E5E7EB] dark:bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold px-4 py-2 rounded-md transition cursor-pointer active:scale-95"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>

                    </div>
                </div>,
                document.body
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

const INITIAL_PREGUNTA = {
    pregunta: '',
    respuesta: '',
    activo: true,
    orden: 0
};

/* ── Preguntas Frecuentes ── */
function PreguntasTab({ preguntas, flash }) {
    const [editando, setEditando] = useState(null);
    const [creando, setCreando] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const form = useForm(INITIAL_PREGUNTA);

    function abrirCrear() {
        form.setData(INITIAL_PREGUNTA);
        setEditando(null);
        form.clearErrors();
        setCreando(true);
    }

    function abrirEditar(p) {
        form.setData({
            pregunta: p.pregunta || '',
            respuesta: p.respuesta || '',
            activo: !!p.activo,
            orden: p.orden ?? 0
        });
        setEditando(p);
        setCreando(false);
    }

    function cerrar() {
        setCreando(false);
        setEditando(null);
        form.clearErrors();
        form.setData(INITIAL_PREGUNTA);
    }

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
        <div className="space-y-6 animate-fadeIn">
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

    const [modoCargaModal, setModoCargaModal] = useState('masa'); // 'individual' | 'masa'
    const [batchItems, setBatchItems] = useState([]);
    const [batchUploading, setBatchUploading] = useState(false);
    const [batchProgress, setBatchProgress] = useState(0);
    const [uploadSummary, setUploadSummary] = useState(null);

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

    const handleBatchFilesSelect = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        if (files.length > 50) {
            alert('Has seleccionado más de 50 imágenes. Se procesarán las primeras 50.');
        }

        const validFiles = files.slice(0, 50);

        const processedItems = validFiles.map((file, idx) => {
            const cleanName = file.name
                .replace(/\.[^/.]+$/, "")
                .replace(/[-_]/g, " ")
                .replace(/^\d+[\s.-]*/, "")
                .trim();
            const formattedName = cleanName
                ? cleanName.charAt(0).toUpperCase() + cleanName.slice(1)
                : `Espacio ${batchItems.length + idx + 1}`;

            return {
                id: `batch-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 4)}`,
                file,
                previewUrl: URL.createObjectURL(file),
                nombre: formattedName,
                status: 'pending',
            };
        });

        setBatchItems((prev) => [...prev, ...processedItems].slice(0, 50));
    };

    const updateBatchItemName = (id, newName) => {
        setBatchItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, nombre: newName } : item))
        );
    };

    const removeBatchItem = (id) => {
        setBatchItems((prev) => prev.filter((item) => item.id !== id));
    };

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

    // Carga Secuencial 1 a 1 usando Inertia Router (Evita errores 419 CSRF y Timeouts de PHP)
    const guardarEscenasMasa = (e) => {
        if (e) e.preventDefault();
        if (batchItems.length === 0 || batchUploading) return;

        setBatchUploading(true);
        setBatchProgress(0);
        setUploadSummary({ done: 0, total: batchItems.length });

        const itemsToUpload = [...batchItems];

        const procesarSiguiente = (index) => {
            if (index >= itemsToUpload.length) {
                setBatchUploading(false);
                setTimeout(() => {
                    setCreando(false);
                    setBatchItems([]);
                    setBatchProgress(0);
                    setUploadSummary(null);
                }, 1000);
                return;
            }

            const item = itemsToUpload[index];

            // Si ya fue guardado previamente con éxito, pasar al siguiente
            if (item.status === 'done') {
                setBatchProgress(Math.round(((index + 1) / itemsToUpload.length) * 100));
                setUploadSummary({ done: index + 1, total: itemsToUpload.length });
                procesarSiguiente(index + 1);
                return;
            }

            // Marcar elemento actual como 'uploading'
            setBatchItems((prev) =>
                prev.map((it) => (it.id === item.id ? { ...it, status: 'uploading' } : it))
            );

            const formData = new FormData();
            formData.append('nombre', item.nombre || `Espacio ${index + 1}`);
            formData.append('imagen', item.file);

            router.post(`${basePath}/recorrido/scenes`, formData, {
                forceFormData: true,
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setBatchItems((prev) =>
                        prev.map((it) => (it.id === item.id ? { ...it, status: 'done' } : it))
                    );
                    setBatchProgress(Math.round(((index + 1) / itemsToUpload.length) * 100));
                    setUploadSummary({ done: index + 1, total: itemsToUpload.length });
                    
                    // Procesar la siguiente imagen inmediatamente
                    procesarSiguiente(index + 1);
                },
                onError: (errors) => {
                    console.error(`Error al guardar escena ${item.nombre}:`, errors);
                    setBatchItems((prev) =>
                        prev.map((it) => (it.id === item.id ? { ...it, status: 'error' } : it))
                    );
                    setBatchProgress(Math.round(((index + 1) / itemsToUpload.length) * 100));
                    setUploadSummary({ done: index + 1, total: itemsToUpload.length });
                    
                    // Continuar con la siguiente imagen incluso si una falla
                    procesarSiguiente(index + 1);
                }
            });
        };

        // Iniciar la secuencia en el índice 0
        procesarSiguiente(0);
    };

    const eliminarEscena = (id) => {
        setDeletingId(null);
        setLocalScenes(prev => prev.filter(s => s.id !== id));
        router.delete(`${basePath}/recorrido/scenes/${id}`, {
            preserveState: true, preserveScroll: true,
        });
    };

    const marcarComoPrincipal = (sceneId) => {
        setLocalScenes(prev => prev.map(s => ({
            ...s,
            es_escena_inicial: s.id === sceneId
        })));
        router.post(`${basePath}/recorrido/scenes/${sceneId}/principal`, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <Flash message={flash} />

            {/* Tarjeta de Control Modo En Construccion */}
            <div className={`mb-6 p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                tour?.en_construccion
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-200'
                    : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
            }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                            tour?.en_construccion ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
                        }`}>
                            {tour?.en_construccion ? (
                                <span className="text-xl">🚧</span>
                            ) : (
                                <Check className="w-5 h-5" />
                            )}
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-extrabold text-sm sm:text-base">
                                    Modo "En Construcción" para Usuarios
                                </h3>
                                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                                    tour?.en_construccion
                                        ? 'bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100'
                                        : 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100'
                                }`}>
                                    {tour?.en_construccion ? 'ACTIVADO (Bloqueado a usuarios)' : 'DESACTIVADO (Público)'}
                                </span>
                            </div>
                            <p className="text-xs mt-1 opacity-90 leading-relaxed font-medium">
                                {tour?.en_construccion
                                    ? 'Los usuarios que ingresen al Recorrido 360° desde el sitio web verán un mensaje de "En construcción" y no podrán acceder al visualizador.'
                                    : 'El recorrido 360° se encuentra activo y accesible para todos los visitantes del sitio web.'}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            router.post(`${basePath}/recorrido/toggle-construccion`, {
                                en_construccion: !tour?.en_construccion
                            }, {
                                preserveScroll: true
                            });
                        }}
                        className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer shrink-0 border ${
                            tour?.en_construccion
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500'
                                : 'bg-amber-600 hover:bg-amber-700 text-white border-amber-500'
                        }`}
                    >
                        {tour?.en_construccion ? 'Habilitar Acceso Público' : 'Activar "En Construcción"'}
                    </button>
                </div>
            </div>
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
                        className="bg-[#800A15] hover:bg-[#600710] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-rose-950/20"
                    >
                        <svg className="w-4 h-4 text-rose-200" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Ver Vista Previa
                    </a>
                    <button
                        onClick={() => setCreando(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
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
                                        src={s.imagen_url || mediaUrl(s.imagen_path)}
                                        alt={s.nombre}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {s.es_escena_inicial && (
                                        <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow flex items-center gap-0.5">
                                            ⭐ Principal
                                        </span>
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm truncate">{s.nombre}</h3>
                                        <span className="bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0">
                                            {s.hotspots?.length || 0} puntos
                                        </span>
                                        {s.es_escena_inicial && (
                                            <span className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-400/30 text-[10px] font-extrabold px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1">
                                                ⭐ Escena Principal
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-400 text-xs mt-1 font-mono truncate">Slug: {s.slug}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-800/60">
                                {!s.es_escena_inicial && (
                                    <button
                                        type="button"
                                        onClick={() => marcarComoPrincipal(s.id)}
                                        className="px-3 py-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl transition cursor-pointer border border-amber-300/40 shrink-0 flex items-center gap-1"
                                        title="Establecer como la imagen principal inicial del recorrido 360°"
                                    >
                                        ⭐ Marcar Principal
                                    </button>
                                )}

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
                                        src={s.imagen_url || mediaUrl(s.imagen_path)}
                                        alt={s.nombre}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {s.es_escena_inicial && (
                                        <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-md flex items-center gap-1">
                                            ⭐ Escena Principal
                                        </span>
                                    )}
                                    <span className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-md text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/20">
                                        {s.hotspots?.length || 0} puntos
                                    </span>
                                </div>

                                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{s.nombre}</h3>
                                <p className="text-slate-400 text-xs mt-0.5 font-mono">Slug: {s.slug}</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                                {!s.es_escena_inicial && (
                                    <button
                                        type="button"
                                        onClick={() => marcarComoPrincipal(s.id)}
                                        className="px-2.5 py-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl transition cursor-pointer border border-amber-300/40 flex items-center gap-1"
                                        title="Establecer como la imagen principal del recorrido 360°"
                                    >
                                        ⭐ Principal
                                    </button>
                                )}

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
                <Modal title="Agregar Escenas 360°" onClose={() => setCreando(false)}>
                    {/* Selector de Modo: Individual vs Carga en Masa */}
                    <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-4">
                        <button
                            type="button"
                            onClick={() => setModoCargaModal('individual')}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
                                modoCargaModal === 'individual'
                                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                        >
                            Carga Individual
                        </button>
                        <button
                            type="button"
                            onClick={() => setModoCargaModal('masa')}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                                modoCargaModal === 'masa'
                                    ? 'bg-[#800A15] text-white shadow-sm'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                        >
                            <span>Carga en Masa (Máx. 50)</span>
                            {batchItems.length > 0 && (
                                <span className="bg-white text-[#800A15] text-[10px] font-black px-1.5 py-0.5 rounded-full">
                                    {batchItems.length}
                                </span>
                            )}
                        </button>
                    </div>

                    {modoCargaModal === 'individual' ? (
                        /* Formulario Carga Individual */
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
                                    accept="image/*,.heic,.heif,image/heic,image/heif"
                                    onChange={(e) => {
                                        const f = e.target.files[0];
                                        if (!f) return;
                                        form.setData('imagen', f);
                                    }}
                                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                />
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <button type="submit" disabled={form.processing} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3 text-sm transition cursor-pointer">
                                    {form.processing ? 'Guardando...' : 'Guardar Escena 360°'}
                                </button>
                                <button type="button" onClick={() => setCreando(false)} className="px-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl py-3 text-sm font-bold">Cancelar</button>
                            </div>
                        </form>
                    ) : (
                        /* Formulario Carga en Masa (Hasta 50 imágenes) */
                        <form onSubmit={guardarEscenasMasa} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block">
                                    Seleccionar Archivos de Imagen 360° (Hasta 50 imágenes)
                                </label>
                                
                                <input
                                    type="file"
                                    multiple
                                    id="batch-files-input"
                                    accept="image/jpeg,image/png,image/jpg"
                                    onChange={handleBatchFilesSelect}
                                    className="hidden"
                                />

                                <label
                                    htmlFor="batch-files-input"
                                    className="w-full py-5 border-2 border-dashed border-blue-400 dark:border-blue-600/60 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition flex flex-col items-center justify-center cursor-pointer text-center group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-extrabold text-blue-700 dark:text-blue-300">
                                        Haz clic aquí para seleccionar imágenes 360° en masa (Máximo 50)
                                    </span>
                                    <span className="text-[10px] text-slate-400 mt-1">
                                        Formatos soportados: JPG, JPEG, PNG • Genera vista previa y títulos automáticamente
                                    </span>
                                </label>
                            </div>

                            {/* Barra de Progreso de Carga en Masa */}
                            {batchUploading && uploadSummary && (
                                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-xl space-y-2 animate-fadeIn">
                                    <div className="flex items-center justify-between text-xs font-bold text-blue-900 dark:text-blue-200">
                                        <span>Subiendo imágenes secuencialmente ({uploadSummary.done} de {uploadSummary.total})...</span>
                                        <span>{batchProgress}%</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-blue-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#800A15] to-blue-600 transition-all duration-300 rounded-full"
                                            style={{ width: `${batchProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Lista de Imágenes Seleccionadas con Vista Previa e Inputs para Nombre */}
                            {batchItems.length > 0 && (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                            Lista de imágenes a guardar ({batchItems.length} / 50):
                                        </span>
                                        {!batchUploading && (
                                            <button
                                                type="button"
                                                onClick={() => setBatchItems([])}
                                                className="text-[10px] font-bold text-rose-500 hover:text-rose-700"
                                            >
                                                Limpiar lista
                                            </button>
                                        )}
                                    </div>

                                    <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
                                        {batchItems.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className={`flex items-center gap-3 p-2.5 rounded-xl border transition-colors ${
                                                    item.status === 'done'
                                                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300/80 dark:border-emerald-800/60'
                                                        : item.status === 'error'
                                                        ? 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-300/80 dark:border-rose-800/60'
                                                        : item.status === 'uploading'
                                                        ? 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-400 dark:border-blue-700 animate-pulse'
                                                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80'
                                                }`}
                                            >
                                                {/* Vista Previa de Imagen */}
                                                <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-900 border border-slate-200 dark:border-slate-700">
                                                    <img
                                                        src={item.previewUrl}
                                                        alt={item.nombre || ''}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <span className="absolute bottom-0 right-0 bg-slate-900/80 text-white text-[8px] font-mono px-1">
                                                        #{index + 1}
                                                    </span>
                                                </div>

                                                {/* Input para Editar Nombre de la Escena */}
                                                <div className="flex-1 min-w-0">
                                                    <input
                                                        type="text"
                                                        value={item.nombre || ''}
                                                        disabled={batchUploading}
                                                        onChange={(e) => updateBatchItemName(item.id, e.target.value)}
                                                        placeholder="Nombre del Espacio / Escena"
                                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-lg px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-blue-600 disabled:opacity-75"
                                                    />
                                                    <div className="flex items-center justify-between mt-0.5">
                                                        <span className="text-[9px] text-slate-400 truncate">
                                                            {item.file.name} ({(item.file.size / (1024 * 1024)).toFixed(2)} MB)
                                                        </span>
                                                        {item.status === 'done' && (
                                                            <span className="text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                                                                ✓ Guardado
                                                            </span>
                                                        )}
                                                        {item.status === 'uploading' && (
                                                            <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 animate-pulse">
                                                                Subiendo...
                                                            </span>
                                                        )}
                                                        {item.status === 'error' && (
                                                            <span className="text-[9px] font-bold text-rose-600 dark:text-rose-400">
                                                                ✕ Error
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Botón Quitar */}
                                                {!batchUploading && item.status !== 'done' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeBatchItem(item.id)}
                                                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition cursor-pointer"
                                                        title="Quitar de la lista"
                                                    >
                                                        ✕
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <button
                                    type="submit"
                                    disabled={batchItems.length === 0 || batchUploading}
                                    className="flex-1 bg-[#800A15] hover:bg-[#600710] text-white font-bold rounded-xl py-3 text-sm transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {batchUploading ? (
                                        <>
                                            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                            <span>Guardando {uploadSummary?.done || 0} de {uploadSummary?.total || batchItems.length}... ({batchProgress}%)</span>
                                        </>
                                    ) : (
                                        <span>Guardar {batchItems.length} Escenas 360° en Masa</span>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    disabled={batchUploading}
                                    onClick={() => setCreando(false)}
                                    className="px-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl py-3 text-sm font-bold cursor-pointer disabled:opacity-50"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    )}
                </Modal>
            )}
        </div>
    );
}

/* ── Equipo Institucional Tab ── */
const AREAS_EQUIPO = [
    'Todos',
    'Equipo Directivo',
    'Preescolar y Primaria',
    'Matemáticas',
    'Lengua Castellana',
    'Ciencias Naturales',
    'Ciencias Sociales',
    'Inglés',
    'Tecnología e Informática',
    'Ed. Física y Expresión',
    'Ed. Religiosa y Ética',
    'Contabilidad SENA'
];

const INITIAL_MEMBER = {
    nombre: '',
    cargo: '',
    area: 'Matemáticas',
    tipo: 'docente',
    foto: null,
    foto_posicion: 20,
    foto_posicion_x: 50,
    foto_posicion_y: 20,
    foto_zoom: 100,
    orden: 0,
    activo: true,
};

function EquipoTab({ equipo = [], flash }) {
    const [selectedArea, setSelectedArea] = useState('Todos');
    const [editando, setEditando] = useState(null);
    const [creando, setCreando] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const cardRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const startY = useRef(0);
    const startPosX = useRef(50);
    const startPosY = useRef(20);
    const touchDist = useRef(null);

    const form = useForm(INITIAL_MEMBER);

    function getClientCoords(e) {
        if (e.touches && e.touches.length > 0) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
    }

    function handleStart(e) {
        if (e.touches && e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            touchDist.current = Math.hypot(dx, dy);
            return;
        }
        const coords = getClientCoords(e);
        isDragging.current = true;
        startX.current = coords.x;
        startY.current = coords.y;
        startPosX.current = form.data.foto_posicion_x ?? 50;
        startPosY.current = form.data.foto_posicion_y ?? form.data.foto_posicion ?? 20;
    }

    function handleMove(e) {
        if (e.touches && e.touches.length === 2 && touchDist.current) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.hypot(dx, dy);
            const factor = dist / touchDist.current;
            const newZoom = Math.round(Math.max(100, Math.min(250, form.data.foto_zoom * factor)));
            form.setData('foto_zoom', newZoom);
            touchDist.current = dist;
            return;
        }

        if (!isDragging.current) return;
        const coords = getClientCoords(e);
        const dx = coords.x - startX.current;
        const dy = coords.y - startY.current;
        const width = cardRef.current?.offsetWidth || 1;
        const height = cardRef.current?.offsetHeight || 1;

        const nextPosX = Math.round(Math.max(0, Math.min(100, startPosX.current + (dx / width) * 100)));
        const nextPosY = Math.round(Math.max(0, Math.min(100, startPosY.current + (dy / height) * 100)));

        form.setData({
            ...form.data,
            foto_posicion_x: nextPosX,
            foto_posicion_y: nextPosY,
            foto_posicion: nextPosY,
        });
    }

    function handleEnd() {
        isDragging.current = false;
        touchDist.current = null;
    }

    function abrirCrear() {
        form.setData(INITIAL_MEMBER);
        setPreviewImage(null);
        setEditando(null);
        form.clearErrors();
        setCreando(true);
    }

    function abrirEditar(m) {
        form.setData({
            nombre: m.nombre || '',
            cargo: m.cargo || '',
            area: m.area || 'Matemáticas',
            tipo: m.tipo || 'docente',
            foto: null,
            foto_posicion: Number(m.foto_posicion_y ?? m.foto_posicion ?? 20),
            foto_posicion_x: Number(m.foto_posicion_x ?? 50),
            foto_posicion_y: Number(m.foto_posicion_y ?? m.foto_posicion ?? 20),
            foto_zoom: Number(m.foto_zoom ?? 100),
            orden: Number(m.orden ?? 0),
            activo: !!m.activo,
        });
        setEditando(m);
        setCreando(false);
    }

    function cerrar() {
        setCreando(false);
        setEditando(null);
        setPreviewImage(null);
        form.clearErrors();
        form.setData(INITIAL_MEMBER);
    }

    useEffect(() => {
        if (form.data.foto instanceof File) {
            const objectUrl = URL.createObjectURL(form.data.foto);
            setPreviewImage(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else if (editando && editando.foto) {
            setPreviewImage(mediaUrl(editando.foto));
        } else {
            setPreviewImage(null);
        }
    }, [form.data.foto, editando, creando]);

    function guardar(e) {
        e.preventDefault();
        const basePath = getAdminBasePath();
        if (editando) {
            router.post(`${basePath}/equipo/${editando.id}`, {
                _method: 'PUT',
                ...form.data
            }, {
                forceFormData: true,
                onSuccess: cerrar,
                onError: (errs) => {
                    Object.keys(errs).forEach(key => form.setError(key, errs[key]));
                }
            });
        } else {
            form.post(`${basePath}/equipo`, { onSuccess: cerrar });
        }
    }

    function eliminar(id) {
        setDeletingId(null);
        const basePath = getAdminBasePath();
        router.delete(`${basePath}/equipo/${id}`);
    }

    const directivosList = equipo.filter(m => m.tipo === 'directivo');
    const docentesList = equipo.filter(m => m.tipo === 'docente');

    const docentesFiltrados = selectedArea === 'Todos'
        ? docentesList
        : selectedArea === 'Equipo Directivo'
            ? []
            : docentesList.filter(m => m.area === selectedArea);

    const mostrarDirectivos = selectedArea === 'Todos' || selectedArea === 'Equipo Directivo';

    return (
        <div className="space-y-8 animate-fadeIn">
            <Flash message={flash} />

            {/* Encabezado */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight flex items-center gap-2">
                        <User className="w-6 h-6 text-[#800A15]" />
                        <span>Gestión del Equipo Institucional</span>
                    </h2>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                        Haz clic en cualquier tarjeta para encuadrar la imagen (arriba, abajo, izquierda, derecha) y zoom en vivo.
                    </p>
                </div>
                <button
                    onClick={abrirCrear}
                    className="px-5 py-2.5 bg-[#800A15] hover:bg-[#600710] text-white text-xs font-extrabold rounded-2xl shadow-md transition-all duration-300 hover:scale-105 shrink-0 cursor-pointer flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Integrante</span>
                </button>
            </div>

            {/* Barra de Filtros */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 w-full select-none">
                {AREAS_EQUIPO.map((areaName) => (
                    <button
                        key={areaName}
                        onClick={() => setSelectedArea(areaName)}
                        className={`px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full font-extrabold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                            selectedArea === areaName
                                ? 'bg-[#800A15] text-white shadow-md shadow-[#800A15]/20 scale-105'
                                : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#800A15]'
                        }`}
                    >
                        {areaName}
                    </button>
                ))}
            </div>

            {/* ── 1. Equipo Directivo (Admin View) ── */}
            {mostrarDirectivos && (
                <div className="space-y-4">
                    <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                        <h3 className="text-lg font-black text-slate-800 dark:text-white">Equipo Directivo ({directivosList.length})</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {directivosList.map((p, idx) => {
                            const isVino = idx % 2 === 0;
                            const borderClass = isVino ? 'border-t-4 border-t-[#800A15]' : 'border-t-4 border-t-[#003C8F]';
                            const roleClass = isVino ? 'text-[#800A15] dark:text-rose-400' : 'text-[#003C8F] dark:text-blue-400';

                            return (
                                <div
                                    key={p.id}
                                    onClick={() => abrirEditar(p)}
                                    className={`group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer ${borderClass}`}
                                >
                                    <div className="aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden relative flex items-center justify-center">
                                        {p.foto ? (
                                            <img
                                                src={mediaUrl(p.foto)}
                                                alt={p.nombre}
                                                className="w-full h-full object-cover transition-all duration-300 pointer-events-none"
                                                style={{
                                                    objectPosition: `${p.foto_posicion_x ?? 50}% ${p.foto_posicion_y ?? p.foto_posicion ?? 20}%`,
                                                    transform: `scale(${(p.foto_zoom ?? 100) / 100})`
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600">
                                                <User className="w-20 h-20" />
                                            </div>
                                        )}
                                        {/* Overlay de Ajustar Foto */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-black px-4 py-2 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                                                <Camera className="w-4 h-4 text-blue-600" />
                                                <span>Ajustar Foto / Zoom</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5 text-center bg-white dark:bg-slate-900">
                                        <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-base leading-snug">
                                            {p.nombre}
                                        </h4>
                                        <span className={`text-[11px] font-black uppercase tracking-widest block mt-1.5 ${roleClass}`}>
                                            {p.cargo}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── 2. Cuerpo Docente (Admin View) ── */}
            {selectedArea !== 'Equipo Directivo' && (
                <div className="space-y-4 pt-4">
                    <div className="border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between">
                        <h3 className="text-lg font-black text-slate-800 dark:text-white">Cuerpo Docente ({docentesFiltrados.length})</h3>
                        <span className="text-xs font-bold text-slate-400">Área: {selectedArea}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {docentesFiltrados.map((prof) => (
                            <div
                                key={prof.id}
                                onClick={() => abrirEditar(prof)}
                                className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                            >
                                <div className="w-full aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden relative flex items-center justify-center">
                                    {prof.foto ? (
                                        <img
                                            src={mediaUrl(prof.foto)}
                                            alt={prof.nombre}
                                            className="w-full h-full object-cover transition-all duration-300 pointer-events-none"
                                            style={{
                                                objectPosition: `${prof.foto_posicion_x ?? 50}% ${prof.foto_posicion_y ?? prof.foto_posicion ?? 20}%`,
                                                transform: `scale(${(prof.foto_zoom ?? 100) / 100})`
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600">
                                            <User className="w-12 h-12" />
                                        </div>
                                    )}
                                    {/* Overlay de Ajustar Foto */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                                        <span className="bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-[10px] sm:text-xs font-black px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm text-center flex items-center gap-1.5">
                                            <Camera className="w-3.5 h-3.5 text-blue-600" />
                                            <span>Ajustar Foto</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 text-center flex-1 flex flex-col justify-between bg-white dark:bg-slate-900">
                                    <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-snug">
                                        {prof.nombre}
                                    </h4>
                                    <span className="text-[11px] font-bold text-[#003C8F] dark:text-blue-400 mt-2 block">
                                        {prof.cargo}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Editor: panel fijo anclado a la pantalla ── */}
            {(creando || editando) && createPortal(
                <div
                    className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
                    onClick={cerrar}
                >
                    <div
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden"
                        style={{ height: 'min(92vh, 680px)' }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
                            <h3 className="font-black text-slate-800 dark:text-white text-sm flex items-center gap-2">
                                <User className="w-4 h-4 text-[#800A15]" />
                                {editando ? 'Editar Integrante' : 'Nuevo Integrante'}
                            </h3>
                            <button onClick={cerrar} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 transition flex items-center justify-center cursor-pointer">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Body: izquierda fija + derecha scrollable */}
                        <div className="flex-1 flex overflow-hidden">

                            {/* ── Izquierda: previsualización de la tarjeta ── */}
                            <div className="w-52 xl:w-60 shrink-0 border-r border-slate-100 dark:border-slate-800 p-5 flex flex-col items-center gap-4 bg-slate-50/60 dark:bg-slate-900/60">
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Vista en tarjeta</span>

                                <div
                                    ref={cardRef}
                                    className="w-full aspect-[4/5] bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden relative select-none cursor-move touch-none border-2 border-blue-300 dark:border-blue-800"
                                    onMouseDown={handleStart}
                                    onMouseMove={handleMove}
                                    onMouseUp={handleEnd}
                                    onMouseLeave={handleEnd}
                                    onTouchStart={handleStart}
                                    onTouchMove={handleMove}
                                    onTouchEnd={handleEnd}
                                >
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="Foto"
                                            draggable={false}
                                            className="w-full h-full object-cover pointer-events-none transition-transform duration-75"
                                            style={{
                                                objectPosition: `${form.data.foto_posicion_x ?? 50}% ${form.data.foto_posicion_y ?? form.data.foto_posicion ?? 20}%`,
                                                transform: `scale(${form.data.foto_zoom / 100})`
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600">
                                            <User className="w-14 h-14" />
                                        </div>
                                    )}
                                    <div className="absolute bottom-2 inset-x-2 flex justify-center pointer-events-none">
                                        <span className="bg-black/70 text-white text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                            <Move className="w-2.5 h-2.5" /> Arrastra para centrar
                                        </span>
                                    </div>
                                </div>

                                <div className="text-center w-full space-y-1">
                                    <p className="font-extrabold text-slate-800 dark:text-slate-100 text-xs leading-snug truncate">
                                        {form.data.nombre || 'Nombre del Integrante'}
                                    </p>
                                    <p className="text-[11px] font-bold text-[#003C8F] dark:text-blue-400 truncate">
                                        {form.data.cargo || 'Cargo / Asignatura'}
                                    </p>
                                    <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider mt-1 ${
                                        form.data.tipo === 'directivo'
                                            ? 'bg-[#800A15]/10 text-[#800A15]'
                                            : 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                    }`}>
                                        {form.data.tipo === 'directivo' ? 'Equipo Directivo' : 'Docente'}
                                    </span>
                                </div>
                            </div>

                            {/* ── Derecha: formulario scrollable ── */}
                            <form id="equipo-form" onSubmit={guardar} className="flex-1 overflow-y-auto p-6 space-y-4">

                                {/* Nombre + Cargo */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Nombre completo *</label>
                                        <input
                                            type="text" required
                                            value={form.data.nombre}
                                            onChange={e => form.setData('nombre', e.target.value)}
                                            placeholder="Ej: Sor Beatriz Cortés"
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-xs font-medium rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition"
                                        />
                                        {form.errors.nombre && <p className="text-rose-500 text-[10px] mt-1">{form.errors.nombre}</p>}
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Cargo o asignatura *</label>
                                        <input
                                            type="text" required
                                            value={form.data.cargo}
                                            onChange={e => form.setData('cargo', e.target.value)}
                                            placeholder="Ej: Rectora, Matemáticas"
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-xs font-medium rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition"
                                        />
                                        {form.errors.cargo && <p className="text-rose-500 text-[10px] mt-1">{form.errors.cargo}</p>}
                                    </div>
                                </div>

                                {/* Tipo + Área */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Tipo</label>
                                        <select
                                            value={form.data.tipo}
                                            onChange={e => form.setData('tipo', e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition cursor-pointer"
                                        >
                                            <option value="docente">Docente</option>
                                            <option value="directivo">Equipo Directivo</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Área académica</label>
                                        <select
                                            value={form.data.area}
                                            onChange={e => form.setData('area', e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition cursor-pointer"
                                        >
                                            {AREAS_EQUIPO.filter(a => a !== 'Todos').map(area => (
                                                <option key={area} value={area}>{area}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Upload foto */}
                                <div>
                                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1.5">Fotografía</label>
                                    <input
                                        type="file"
                                        id="equipo-foto-input"
                                        accept="image/*,.heic,.heif,image/heic,image/heif"
                                        className="hidden"
                                        onChange={async (e) => {
                                            const f = e.target.files[0];
                                            if (!f) return;
                                            const processed = await processImageFile(f);
                                            form.setData('foto', processed);
                                        }}
                                    />
                                    <label
                                        htmlFor="equipo-foto-input"
                                        className="flex items-center gap-3 w-full border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-400 hover:bg-blue-50/30 dark:hover:border-blue-700 rounded-xl px-4 py-3 transition cursor-pointer group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition">
                                            <Upload className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
                                                {form.data.foto instanceof File
                                                    ? form.data.foto.name
                                                    : editando?.foto ? 'Conservar foto actual' : 'Seleccionar fotografía'}
                                            </p>
                                            <p className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, WEBP, HEIC · máx. 20 MB</p>
                                        </div>
                                    </label>
                                </div>

                                {/* Ajustes de imagen */}
                                <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 px-4 py-3.5 space-y-3">
                                    <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Ajuste de imagen</p>

                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 w-5 shrink-0">← →</span>
                                        <input type="range" min="0" max="100"
                                            value={form.data.foto_posicion_x ?? 50}
                                            onChange={e => form.setData('foto_posicion_x', Number(e.target.value))}
                                            className="flex-1 h-1.5 accent-blue-600 cursor-pointer"
                                        />
                                        <span className="text-[10px] font-mono text-slate-400 w-8 text-right shrink-0">{form.data.foto_posicion_x ?? 50}%</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 w-5 shrink-0">↑ ↓</span>
                                        <input type="range" min="0" max="100"
                                            value={form.data.foto_posicion_y ?? form.data.foto_posicion ?? 20}
                                            onChange={e => {
                                                const v = Number(e.target.value);
                                                form.setData({ ...form.data, foto_posicion_y: v, foto_posicion: v });
                                            }}
                                            className="flex-1 h-1.5 accent-blue-600 cursor-pointer"
                                        />
                                        <span className="text-[10px] font-mono text-slate-400 w-8 text-right shrink-0">{form.data.foto_posicion_y ?? form.data.foto_posicion ?? 20}%</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <ZoomIn className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <input type="range" min="100" max="250" step="5"
                                            value={form.data.foto_zoom}
                                            onChange={e => form.setData('foto_zoom', Number(e.target.value))}
                                            className="flex-1 h-1.5 accent-blue-600 cursor-pointer"
                                        />
                                        <span className="text-[10px] font-mono text-slate-400 w-8 text-right shrink-0">{form.data.foto_zoom}%</span>
                                    </div>
                                </div>

                                {/* Orden + Activo */}
                                <div className="flex items-center gap-4">
                                    <div className="w-24">
                                        <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Orden</label>
                                        <input
                                            type="number" min="0"
                                            value={form.data.orden}
                                            onChange={e => form.setData('orden', Number(e.target.value))}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 transition"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 pt-5">
                                        <button
                                            type="button"
                                            onClick={() => form.setData('activo', !form.data.activo)}
                                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none cursor-pointer ${form.data.activo ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                                        >
                                            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ${form.data.activo ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
                                        </button>
                                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Visible en la web</span>
                                    </div>
                                </div>

                            </form>
                        </div>

                        {/* Footer: botones siempre visibles */}
                        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
                            {editando ? (
                                <button
                                    type="button"
                                    onClick={() => setDeletingId(editando.id)}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-xs font-bold transition cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    Eliminar
                                </button>
                            ) : <div />}
                            <div className="flex gap-2">
                                <button type="button" onClick={cerrar} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold transition cursor-pointer">
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    form="equipo-form"
                                    disabled={form.processing}
                                    className="px-5 py-2 bg-[#800A15] hover:bg-[#600710] text-white text-xs font-black rounded-xl cursor-pointer shadow-md shadow-[#800A15]/20 disabled:opacity-50 flex items-center gap-1.5 transition"
                                >
                                    <Check className="w-3.5 h-3.5" />
                                    {form.processing ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            , document.body)}

            {/* Modal Confirmación Eliminar */}
            {deletingId && (
                <Modal title="Confirmar Eliminación" onClose={() => setDeletingId(null)}>
                    <div className="space-y-4">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                            ¿Estás seguro de que deseas eliminar este integrante del equipo? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setDeletingId(null)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl">
                                Cancelar
                            </button>
                            <button onClick={() => eliminar(deletingId)} className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl">
                                Eliminar Definitivamente
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

/* ── 6. Mantenimiento y Comandos del Sistema (cPanel / Artisan) ── */
function MantenimientoTab({ flash, flash_error, command_output, basePath }) {
    const [executing, setExecuting] = useState(null);
    const [copied, setCopied] = useState(false);
    const [confirmModal, setConfirmModal] = useState(null);

    const comandos = [
        {
            key: 'migrate',
            title: 'php artisan migrate --force',
            desc: 'Ejecuta todas las migraciones pendientes en la base de datos de producción.',
            cat: 'Base de Datos',
            badge: 'Acción Crítica',
            icon: Database,
            color: 'blue',
            requiresConfirm: true,
        },
        {
            key: 'cache_clear',
            title: 'php artisan cache:clear',
            desc: 'Elimina la caché general almacenada en la aplicación.',
            cat: 'Caché',
            badge: 'Seguro',
            icon: RefreshCw,
            color: 'emerald',
            requiresConfirm: false,
        },
        {
            key: 'view_clear',
            title: 'php artisan view:clear',
            desc: 'Limpia la caché de plantillas Blade e Inertia renderizadas.',
            cat: 'Caché',
            badge: 'Seguro',
            icon: Eye,
            color: 'amber',
            requiresConfirm: false,
        },
        {
            key: 'route_clear',
            title: 'php artisan route:clear',
            desc: 'Limpia la caché de rutas del sistema.',
            cat: 'Caché',
            badge: 'Seguro',
            icon: Cpu,
            color: 'indigo',
            requiresConfirm: false,
        },
        {
            key: 'config_clear',
            title: 'php artisan config:clear',
            desc: 'Elimina la caché de configuración para leer variables .env actualizadas.',
            cat: 'Caché',
            badge: 'Seguro',
            icon: Server,
            color: 'purple',
            requiresConfirm: false,
        },
        {
            key: 'optimize_clear',
            title: 'php artisan optimize:clear',
            desc: 'Limpia de un solo paso todas las cachés: vistas, rutas, eventos y configuración.',
            cat: 'Caché Global',
            badge: 'Recomendado al Actualizar',
            icon: HardDrive,
            color: 'rose',
            requiresConfirm: false,
        },
        {
            key: 'storage_link',
            title: 'php artisan storage:link',
            desc: 'Crea el enlace simbólico entre public/storage y storage/app/public en cPanel.',
            cat: 'Almacenamiento',
            badge: 'cPanel útil',
            icon: Upload,
            color: 'cyan',
            requiresConfirm: false,
        },
        {
            key: 'seed_equipo',
            title: 'php artisan db:seed --class=EquipoSeeder',
            desc: 'Re-pobla y restaura la información inicial del equipo institucional.',
            cat: 'Base de Datos',
            badge: 'Restauración',
            icon: User,
            color: 'orange',
            requiresConfirm: true,
        },
        {
            key: 'git_pull',
            title: 'git pull + migrate + optimize',
            desc: 'Descarga los últimos cambios de GitHub, ejecuta migraciones pendientes y limpia todas las cachés. Úsalo después de cada commit.',
            cat: 'Deploy',
            badge: 'Actualizar Sitio',
            icon: GitBranch,
            color: 'violet',
            requiresConfirm: true,
        },
    ];

    function ejecutar(cmdKey) {
        setExecuting(cmdKey);
        setConfirmModal(null);
        router.post(`${basePath}/sistema/ejecutar-comando`, { action: cmdKey }, {
            onFinish: () => setExecuting(null),
        });
    }

    function handleRequest(cmd) {
        if (cmd.requiresConfirm) {
            setConfirmModal(cmd);
        } else {
            ejecutar(cmd.key);
        }
    }

    function copiarConsola(text) {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="space-y-8 animate-fadeIn">
            <Flash message={flash} />
            {flash_error && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl flex items-center gap-2 shadow-sm">
                    <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
                    <span>{flash_error}</span>
                </div>
            )}

            {/* Header del Tab */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight flex items-center gap-2.5">
                        <Terminal className="w-6 h-6 text-blue-600" />
                        <span>Mantenimiento del Servidor y Comandos Artisan (cPanel)</span>
                    </h2>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                        Ejecuta funciones PHP de mantenimiento en un solo clic sin necesidad de acceso SSH ni terminal en el hosting cPanel.
                    </p>
                </div>
                <button
                    onClick={() => ejecutar('optimize_clear')}
                    disabled={!!executing}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold rounded-2xl shadow-md transition-all duration-300 hover:scale-105 shrink-0 cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${executing === 'optimize_clear' ? 'animate-spin' : ''}`} />
                    <span>Limpiar Toda la Caché</span>
                </button>
            </div>

            {/* Consola interactiva de salida de Artisan */}
            {command_output && (
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-3 font-mono text-xs animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2 text-slate-300 font-bold">
                            <Terminal className="w-4 h-4 text-emerald-400" />
                            <span>Consola de Salida Artisan</span>
                            <span className="text-[10px] text-slate-500 font-normal">[{command_output.executed_at}]</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => copiarConsola(command_output.output)}
                                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5"
                            >
                                <Copy className="w-3.5 h-3.5 text-blue-400" />
                                <span>{copied ? '¡Copiado!' : 'Copiar Salida'}</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px]">
                        <span>$ {command_output.label || command_output.command}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] ${command_output.exitCode === 0 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'}`}>
                            {command_output.exitCode === 0 ? 'EXIT 0 (Éxito)' : `EXIT ${command_output.exitCode} (Error)`}
                        </span>
                    </div>

                    <pre className="p-4 bg-black/60 rounded-xl text-slate-200 overflow-x-auto max-h-80 overflow-y-auto text-[11px] leading-relaxed whitespace-pre-wrap border border-slate-800/80">
                        {command_output.output}
                    </pre>
                </div>
            )}

            {/* Grid de Botones de Comandos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {comandos.map((cmd) => {
                    const Icon = cmd.icon;
                    const isRunning = executing === cmd.key;

                    return (
                        <div
                            key={cmd.key}
                            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between space-y-4"
                        >
                            <div className="space-y-2.5">
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                                        cmd.requiresConfirm 
                                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800' 
                                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                                    }`}>
                                        {cmd.badge}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="font-mono font-extrabold text-slate-900 dark:text-white text-xs leading-tight">
                                        {cmd.title}
                                    </h3>
                                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mt-1">
                                        {cmd.cat}
                                    </span>
                                </div>

                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                    {cmd.desc}
                                </p>
                            </div>

                            <button
                                onClick={() => handleRequest(cmd)}
                                disabled={!!executing}
                                className={`w-full py-2.5 px-4 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                                    cmd.requiresConfirm
                                        ? 'bg-[#800A15] hover:bg-[#600710] text-white disabled:opacity-50'
                                        : 'bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white disabled:opacity-50'
                                }`}
                            >
                                {isRunning ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                        <span>Ejecutando...</span>
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-3.5 h-3.5 fill-current" />
                                        <span>Ejecutar Comando</span>
                                    </>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Modal de Confirmación para comandos sensibles */}
            {confirmModal && (
                <div 
                    className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden animate-fadeIn"
                    onClick={() => setConfirmModal(null)}
                >
                    <div 
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-scaleIn"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 text-rose-600">
                            <ShieldAlert className="w-8 h-8 shrink-0" />
                            <h3 className="text-lg font-black text-slate-900 dark:text-white">
                                Confirmar Ejecución
                            </h3>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                            ¿Estás seguro de que deseas ejecutar <strong className="font-mono text-blue-600">{confirmModal.title}</strong> en el servidor de producción?
                        </p>

                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                            <button
                                type="button"
                                onClick={() => setConfirmModal(null)}
                                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={() => ejecutar(confirmModal.key)}
                                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl cursor-pointer shadow-md flex items-center gap-1.5"
                            >
                                <Check className="w-4 h-4" />
                                <span>Sí, Ejecutar Ahora</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function DeportesAdminTab({ torneoPartidos = [], deportesBanners = [], cuadrangularesBloqueado = false, flash }) {
    const [subTab, setSubTab] = useState('cuadrangulares');
    const [partidoEditar, setPartidoEditar] = useState(null);
    const [submittingPartido, setSubmittingPartido] = useState(false);

    // Form para Banners
    const [bannerEditar, setBannerEditar] = useState(null);
    const [creandoBanner, setCreandoBanner] = useState(false);
    const [bannerTitulo, setBannerTitulo] = useState('');
    const [bannerTag, setBannerTag] = useState('Microfútbol Intercolegiado');
    const [bannerSubtitulo, setBannerSubtitulo] = useState('');
    const [bannerDescripcion, setBannerDescripcion] = useState('');
    const [bannerPortada, setBannerPortada] = useState(null);
    const [bannerPortadaPreview, setBannerPortadaPreview] = useState(null);
    const [submittingBanner, setSubmittingBanner] = useState(false);

    const basePath = getAdminBasePath();
    const equiposInterclases = [
        'Grado 6°A', 'Grado 6°B',
        'Grado 7°A', 'Grado 7°B',
        'Grado 8°A', 'Grado 8°B',
        'Grado 9°A', 'Grado 9°B',
        'Grado 10°A', 'Grado 10°B',
        'Grado 11°A', 'Grado 11°B',
        'Docentes', 'Estudiantes',
        'Casa Don Bosco', 'Casa María Auxiliadora'
    ];

    // Formulario de edición de partido
    const [partidoForm, setPartidoForm] = useState({
        equipo_local: '',
        equipo_visitante: '',
        escudo_local: '',
        escudo_visitante: '',
        escudo_local_file: null,
        escudo_visitante_file: null,
        goles_local: '',
        goles_visitante: '',
        ganador: '',
        estado: 'programado',
        fecha_partido: ''
    });

    function abrirEditarPartido(p) {
        setPartidoForm({
            equipo_local: p.equipo_local || '',
            equipo_visitante: p.equipo_visitante || '',
            escudo_local: p.escudo_local || '',
            escudo_visitante: p.escudo_visitante || '',
            escudo_local_file: null,
            escudo_visitante_file: null,
            goles_local: p.goles_local ?? '',
            goles_visitante: p.goles_visitante ?? '',
            ganador: p.ganador || '',
            estado: p.estado || 'programado',
            fecha_partido: p.fecha_partido || ''
        });
        setPartidoEditar(p);
    }

    function guardarPartido(e) {
        e.preventDefault();
        if (!partidoEditar) return;
        setSubmittingPartido(true);

        const fd = new FormData();
        fd.append('_method', 'PUT');
        fd.append('equipo_local', partidoForm.equipo_local);
        fd.append('equipo_visitante', partidoForm.equipo_visitante);
        if (partidoForm.escudo_local) fd.append('escudo_local', partidoForm.escudo_local);
        if (partidoForm.escudo_visitante) fd.append('escudo_visitante', partidoForm.escudo_visitante);
        if (partidoForm.escudo_local_file) fd.append('escudo_local_file', partidoForm.escudo_local_file);
        if (partidoForm.escudo_visitante_file) fd.append('escudo_visitante_file', partidoForm.escudo_visitante_file);
        if (partidoForm.goles_local !== '') fd.append('goles_local', partidoForm.goles_local);
        if (partidoForm.goles_visitante !== '') fd.append('goles_visitante', partidoForm.goles_visitante);
        fd.append('ganador', partidoForm.ganador);
        fd.append('estado', partidoForm.estado);
        fd.append('fecha_partido', partidoForm.fecha_partido);

        router.post(`${basePath}/deportes-admin/partidos/${partidoEditar.id}`, fd, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setSubmittingPartido(false);
                setPartidoEditar(null);
            },
            onError: () => setSubmittingPartido(false)
        });
    }

    // Funciones para Banners
    function abrirCrearBanner() {
        setBannerTitulo('');
        setBannerTag('Microfútbol Intercolegiado');
        setBannerSubtitulo('');
        setBannerDescripcion('');
        setBannerPortada(null);
        setBannerPortadaPreview(null);
        setBannerEditar(null);
        setCreandoBanner(true);
    }

    function abrirEditarBanner(b) {
        setBannerTitulo(b.titulo);
        setBannerTag(b.tag || '');
        setBannerSubtitulo(b.subtitulo || '');
        setBannerDescripcion(b.descripcion || '');
        setBannerPortada(null);
        setBannerPortadaPreview(b.imagen ? mediaUrl(b.imagen) : null);
        setBannerEditar(b);
        setCreandoBanner(false);
    }

    function guardarBanner(e) {
        e.preventDefault();
        setSubmittingBanner(true);
        const fd = new FormData();
        fd.append('titulo', bannerTitulo);
        fd.append('tag', bannerTag);
        fd.append('subtitulo', bannerSubtitulo);
        fd.append('descripcion', bannerDescripcion);
        fd.append('activo', '1');
        if (bannerPortada) fd.append('portada', bannerPortada);

        if (bannerEditar) fd.append('_method', 'PUT');

        router.post(
            bannerEditar ? `${basePath}/deportes-admin/banners/${bannerEditar.id}` : `${basePath}/deportes-admin/banners`,
            fd,
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setSubmittingBanner(false);
                    setCreandoBanner(false);
                    setBannerEditar(null);
                },
                onError: () => setSubmittingBanner(false)
            }
        );
    }

    function eliminarBanner(id) {
        if (confirm('¿Eliminar este banner deportivo?')) {
            router.delete(`${basePath}/deportes-admin/banners/${id}`, { preserveState: true, preserveScroll: true });
        }
    }

    // Partidos clasificados por fase
    const cuartos = torneoPartidos.filter(p => p.fase === 'cuartos');
    const semifinales = torneoPartidos.filter(p => p.fase === 'semifinal');
    const finalMatch = torneoPartidos.find(p => p.fase === 'final');

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header del Tab */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                        <Trophy className="w-6 h-6 text-amber-500" />
                        <span>Gestión de Deportes y Cuadrangulares</span>
                    </h2>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                        Administra el mapa interactivo de eliminatorias (Inter-Casas) y los banners deportivos.
                    </p>

                    {/* Toggle Receso Cuadrangulares */}
                    <div className="mt-4 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => router.post(`${basePath}/deportes-admin/toggle-bloqueo`, {}, { preserveScroll: true })}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                                cuadrangularesBloqueado
                                    ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-500'
                                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                            }`}
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            {cuadrangularesBloqueado ? 'Receso activo — Mostrar cuadrangulares' : 'Activar receso de temporada'}
                        </button>
                        {cuadrangularesBloqueado && (
                            <span className="text-[11px] font-semibold text-amber-500">
                                El Cuadrangulares está oculto con el mensaje "Nos veremos en {new Date().getFullYear() + 1}".
                            </span>
                        )}
                    </div>
                </div>

                {/* SubTab Selector */}
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700">
                    <button
                        type="button"
                        onClick={() => setSubTab('cuadrangulares')}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${subTab === 'cuadrangulares' ? 'bg-white dark:bg-slate-900 text-[#001659] dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                    >
                        🏆 Mapa Cuadrangulares
                    </button>
                    <button
                        type="button"
                        onClick={() => setSubTab('banners')}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${subTab === 'banners' ? 'bg-white dark:bg-slate-900 text-[#001659] dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                    >
                        🖼️ Banners Deportivo
                    </button>
                </div>
            </div>

            {/* SubTab 1: Mapa Cuadrangulares */}
            {subTab === 'cuadrangulares' && (
                <div className="space-y-6">
                    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
                        <div className="relative z-10 space-y-2 mb-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                                Árbol de Eliminatorias Inter-Casas
                            </span>
                            <h3 className="text-2xl font-black tracking-tight text-white uppercase font-sans">
                                Mapa de Eliminatorias (Haz clic en un partido para editar)
                            </h3>
                            <p className="text-xs text-slate-400 max-w-xl">
                                Selecciona el ganador de cada partido. El sistema avanzará automáticamente a la Casa ganadora a la siguiente ronda (Semifinal o Final) en tiempo real.
                            </p>
                        </div>

                        {/* Visual Bracket Diagram */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 items-center">
                            
                            {/* Cuartos de Final */}
                            <div className="space-y-4">
                                <div className="text-center text-xs font-extrabold text-amber-400 uppercase tracking-wider py-1 bg-slate-800/80 rounded-lg border border-slate-700">
                                    Cuartos de Final
                                </div>
                                {cuartos.map((p, idx) => (
                                    <div
                                        key={p.id}
                                        onClick={() => abrirEditarPartido(p)}
                                        className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/60 rounded-2xl p-3 cursor-pointer transition shadow-md group relative"
                                    >
                                        <div className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 flex justify-between">
                                            <span>Llave {idx + 1}</span>
                                            <span className="text-amber-400 font-bold">{p.estado}</span>
                                        </div>

                                        <div className="space-y-1.5 text-xs font-bold">
                                            <div className={`flex items-center justify-between p-1.5 rounded-lg ${p.ganador === 'local' ? 'bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/40' : 'text-slate-200'}`}>
                                                <span className="truncate">{p.equipo_local}</span>
                                                <span className="bg-slate-900/60 px-2 py-0.5 rounded text-amber-400 font-mono">{p.goles_local ?? '-'}</span>
                                            </div>

                                            <div className={`flex items-center justify-between p-1.5 rounded-lg ${p.ganador === 'visitante' ? 'bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/40' : 'text-slate-200'}`}>
                                                <span className="truncate">{p.equipo_visitante}</span>
                                                <span className="bg-slate-900/60 px-2 py-0.5 rounded text-amber-400 font-mono">{p.goles_visitante ?? '-'}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Semifinales */}
                            <div className="space-y-6">
                                <div className="text-center text-xs font-extrabold text-blue-400 uppercase tracking-wider py-1 bg-slate-800/80 rounded-lg border border-slate-700">
                                    Semifinales
                                </div>
                                {semifinales.map((p, idx) => (
                                    <div
                                        key={p.id}
                                        onClick={() => abrirEditarPartido(p)}
                                        className="bg-slate-800/90 hover:bg-slate-800 border border-blue-500/30 hover:border-blue-500 rounded-2xl p-4 cursor-pointer transition shadow-lg group relative my-4"
                                    >
                                        <div className="text-[9px] font-extrabold text-blue-400 uppercase tracking-widest mb-1.5 flex justify-between">
                                            <span>Semifinal {idx + 1}</span>
                                            <span className="text-blue-300 font-bold">{p.estado}</span>
                                        </div>

                                        <div className="space-y-2 text-xs font-bold">
                                            <div className={`flex items-center justify-between p-2 rounded-xl ${p.ganador === 'local' ? 'bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/40' : 'text-slate-200'}`}>
                                                <span className="truncate">{p.equipo_local}</span>
                                                <span className="bg-slate-900/60 px-2.5 py-1 rounded-md text-amber-400 font-mono text-sm">{p.goles_local ?? '-'}</span>
                                            </div>

                                            <div className={`flex items-center justify-between p-2 rounded-xl ${p.ganador === 'visitante' ? 'bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/40' : 'text-slate-200'}`}>
                                                <span className="truncate">{p.equipo_visitante}</span>
                                                <span className="bg-slate-900/60 px-2.5 py-1 rounded-md text-amber-400 font-mono text-sm">{p.goles_visitante ?? '-'}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Gran Final */}
                            <div className="space-y-4">
                                <div className="text-center text-xs font-extrabold text-amber-300 uppercase tracking-wider py-1 bg-amber-500/20 rounded-lg border border-amber-500/40">
                                    🏆 Gran Final
                                </div>
                                {finalMatch && (
                                    <div
                                        onClick={() => abrirEditarPartido(finalMatch)}
                                        className="bg-gradient-to-b from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border-2 border-amber-500/70 rounded-3xl p-5 cursor-pointer transition shadow-2xl group relative"
                                    >
                                        <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-2 text-center flex items-center justify-center gap-1.5">
                                            <Trophy className="w-4 h-4" />
                                            <span>Partido por el Título</span>
                                        </div>

                                        <div className="space-y-2.5 text-sm font-bold">
                                            <div className={`flex items-center justify-between p-2.5 rounded-xl ${finalMatch.ganador === 'local' ? 'bg-amber-500/30 text-amber-300 font-black border border-amber-400' : 'text-white'}`}>
                                                <span className="truncate">{finalMatch.equipo_local}</span>
                                                <span className="bg-slate-950 px-3 py-1 rounded-md text-amber-400 font-mono text-base font-black">{finalMatch.goles_local ?? '-'}</span>
                                            </div>

                                            <div className={`flex items-center justify-between p-2.5 rounded-xl ${finalMatch.ganador === 'visitante' ? 'bg-amber-500/30 text-amber-300 font-black border border-amber-400' : 'text-white'}`}>
                                                <span className="truncate">{finalMatch.equipo_visitante}</span>
                                                <span className="bg-slate-950 px-3 py-1 rounded-md text-amber-400 font-mono text-base font-black">{finalMatch.goles_visitante ?? '-'}</span>
                                            </div>
                                        </div>

                                        {finalMatch.ganador && (
                                            <div className="mt-3 text-center bg-amber-400 text-slate-950 text-xs font-black py-1.5 rounded-xl uppercase tracking-wider">
                                                🥇 Campeón: {finalMatch.ganador === 'local' ? finalMatch.equipo_local : finalMatch.equipo_visitante}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* Modal Editar Partido */}
            {partidoEditar && (
                <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-scaleIn">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-amber-500" />
                                <span>Editar Partido: {partidoEditar.fecha_partido || partidoEditar.fase}</span>
                            </h3>
                            <button type="button" onClick={() => setPartidoEditar(null)} className="text-slate-400 hover:text-slate-600 font-black text-xl">✕</button>
                        </div>

                        <form onSubmit={guardarPartido} className="space-y-4">
                            {/* Equipo Local */}
                            <div className="space-y-2">
                                <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Equipo Local (Izquierda/Arriba)</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={partidoForm.equipo_local}
                                        onChange={e => setPartidoForm({ ...partidoForm, equipo_local: e.target.value })}
                                        className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none"
                                        placeholder="Nombre del equipo"
                                    />
                                    <input
                                        type="number"
                                        min="0"
                                        value={partidoForm.goles_local}
                                        onChange={e => setPartidoForm({ ...partidoForm, goles_local: e.target.value })}
                                        className="w-16 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-center font-bold text-sm rounded-xl px-2 py-2"
                                        placeholder="Goles"
                                    />
                                </div>

                                {/* Logo / Escudo Oficial del Equipo Local */}
                                <div className="space-y-1">
                                    <label className="text-slate-400 text-[10px] font-bold block">Logo del Equipo Local (Imagen)</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setPartidoForm({ ...partidoForm, escudo_local_file: e.target.files[0] })}
                                            className="text-[10px] text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:bg-blue-50 file:text-[#001659]"
                                        />
                                        <input
                                            type="text"
                                            value={partidoForm.escudo_local}
                                            onChange={e => setPartidoForm({ ...partidoForm, escudo_local: e.target.value })}
                                            placeholder="O URL del logo/escudo"
                                            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1 text-[11px] font-semibold"
                                        />
                                    </div>
                                </div>

                                {/* Selección Rápida de Equipos/Grados */}
                                <div className="flex flex-wrap gap-1 pt-1 max-h-20 overflow-y-auto">
                                    {equiposInterclases.map(eq => (
                                        <button
                                            type="button"
                                            key={eq}
                                            onClick={() => setPartidoForm({ ...partidoForm, equipo_local: eq })}
                                            className="text-[10px] font-semibold bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700 transition"
                                        >
                                            {eq}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Equipo Visitante */}
                            <div className="space-y-2 pt-2">
                                <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Equipo Visitante (Derecha/Abajo)</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={partidoForm.equipo_visitante}
                                        onChange={e => setPartidoForm({ ...partidoForm, equipo_visitante: e.target.value })}
                                        className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none"
                                        placeholder="Nombre del equipo"
                                    />
                                    <input
                                        type="number"
                                        min="0"
                                        value={partidoForm.goles_visitante}
                                        onChange={e => setPartidoForm({ ...partidoForm, goles_visitante: e.target.value })}
                                        className="w-16 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-center font-bold text-sm rounded-xl px-2 py-2"
                                        placeholder="Goles"
                                    />
                                </div>

                                {/* Logo / Escudo Oficial del Equipo Visitante */}
                                <div className="space-y-1">
                                    <label className="text-slate-400 text-[10px] font-bold block">Logo del Equipo Visitante (Imagen)</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setPartidoForm({ ...partidoForm, escudo_visitante_file: e.target.files[0] })}
                                            className="text-[10px] text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:bg-blue-50 file:text-[#001659]"
                                        />
                                        <input
                                            type="text"
                                            value={partidoForm.escudo_visitante}
                                            onChange={e => setPartidoForm({ ...partidoForm, escudo_visitante: e.target.value })}
                                            placeholder="O URL del logo/escudo"
                                            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1 text-[11px] font-semibold"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1 pt-1 max-h-20 overflow-y-auto">
                                    {equiposInterclases.map(eq => (
                                        <button
                                            type="button"
                                            key={eq}
                                            onClick={() => setPartidoForm({ ...partidoForm, equipo_visitante: eq })}
                                            className="text-[10px] font-semibold bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700 transition"
                                        >
                                            {eq}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Ganador & Estado */}
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <div>
                                    <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Declarar Ganador *</label>
                                    <select
                                        value={partidoForm.ganador}
                                        onChange={e => setPartidoForm({ ...partidoForm, ganador: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3 py-2 text-xs font-bold"
                                    >
                                        <option value="">Por definir (Sin Ganador)</option>
                                        <option value="local">Ganador: Local ({partidoForm.equipo_local || 'Local'})</option>
                                        <option value="visitante">Ganador: Visitante ({partidoForm.equipo_visitante || 'Visitante'})</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Estado del Partido</label>
                                    <select
                                        value={partidoForm.estado}
                                        onChange={e => setPartidoForm({ ...partidoForm, estado: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3 py-2 text-xs font-bold"
                                    >
                                        <option value="programado">Programado</option>
                                        <option value="en_curso">En Curso / En Vivo</option>
                                        <option value="finalizado">Finalizado</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 justify-end">
                                <button type="button" onClick={() => setPartidoEditar(null)} className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl cursor-pointer">
                                    Cancelar
                                </button>
                                <button type="submit" disabled={submittingPartido} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer transition">
                                    {submittingPartido ? 'Guardando...' : 'Guardar y Avanzar Ganador'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* SubTab 2: Gestor de Banners Deportivos */}
            {subTab === 'banners' && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div>
                            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Banners y Destacados Deportivos</h3>
                            <p className="text-xs text-slate-500">Publica anuncios de alta visibilidad para eventos y torneos escolares.</p>
                        </div>
                        <button type="button" onClick={abrirCrearBanner} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5">
                            <span>+ Nuevo Banner</span>
                        </button>
                    </div>

                    {/* Lista de Banners */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {deportesBanners.map(b => (
                            <div key={b.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition">
                                {b.imagen && (
                                    <img src={mediaUrl(b.imagen)} alt={b.titulo} className="w-full h-40 object-cover" />
                                )}
                                <div className="p-5 space-y-2">
                                    <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                        {b.tag || 'Deportes'}
                                    </span>
                                    <h4 className="text-sm font-black text-slate-900 dark:text-white line-clamp-1">{b.titulo}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{b.descripcion}</p>

                                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                                        <button type="button" onClick={() => abrirEditarBanner(b)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg cursor-pointer">
                                            Editar
                                        </button>
                                        <button type="button" onClick={() => eliminarBanner(b.id)} className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-lg cursor-pointer">
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Modal Crear/Editar Banner */}
            {(creandoBanner || bannerEditar) && (
                <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white">
                            {bannerEditar ? 'Editar Banner Deportivo' : 'Nuevo Banner Deportivo'}
                        </h3>

                        <form onSubmit={guardarBanner} className="space-y-3">
                            <div>
                                <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Etiqueta / Tag</label>
                                <input type="text" value={bannerTag} onChange={e => setBannerTag(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3 py-2 text-xs font-bold" placeholder="Ej: Microfútbol Intercolegiado" />
                            </div>

                            <div>
                                <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Título *</label>
                                <input type="text" required value={bannerTitulo} onChange={e => setBannerTitulo(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3 py-2 text-xs font-bold" placeholder="Título del evento deportivo" />
                            </div>

                            <div>
                                <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Descripción</label>
                                <textarea rows={3} value={bannerDescripcion} onChange={e => setBannerDescripcion(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3 py-2 text-xs font-bold resize-none" placeholder="Breve descripción..." />
                            </div>

                            <div>
                                <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Imagen de Banner</label>
                                <input type="file" accept="image/*" onChange={e => setBannerPortada(e.target.files[0])} className="text-xs font-bold text-slate-600" />
                            </div>

                            <div className="flex gap-3 pt-3 justify-end">
                                <button type="button" onClick={() => { setCreandoBanner(false); setBannerEditar(null); }} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl cursor-pointer">
                                    Cancelar
                                </button>
                                <button type="submit" disabled={submittingBanner} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-md cursor-pointer">
                                    {submittingBanner ? 'Guardando...' : 'Guardar Banner'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── Dashboard principal ── */
const TABS = [
    { key: 'carnets-admin',   label: 'Tarjetas NFC & Carnets' },
    { key: 'deportes-admin',  label: 'Deportes & Cuadrangulares' },
    { key: 'equipo',          label: 'Equipo Institucional' },
    { key: 'testimonios',     label: 'Testimonios' },
    { key: 'noticias',        label: 'Noticias y Eventos' },
    { key: 'preguntas',       label: 'Preguntas Frecuentes' },
    { key: 'recorrido',       label: 'Recorrido 360°' },
    { key: 'mantenimiento',   label: 'Servidor / cPanel' },
];

/* ── Usuarios Admin Tab ── */
function UsuariosAdminTab({ adminUsuarios = [], flash }) {
    const basePath = getAdminBasePath();
    const [modal, setModal] = useState(null);
    const [editando, setEditando] = useState(null);
    const [confirmEliminar, setConfirmEliminar] = useState(null);
    const [fotoPreview, setFotoPreview] = useState(null);
    const [form, setForm] = useState({ nombre: '', usuario: '', password: '', email: '', contacto: '', foto: null, activo: true });

    const resetForm = () => {
        setForm({ nombre: '', usuario: '', password: '', email: '', contacto: '', foto: null, activo: true });
        setFotoPreview(null);
    };

    const abrirCrear = () => { resetForm(); setEditando(null); setModal('form'); };

    const abrirEditar = (u) => {
        setForm({ nombre: u.nombre, usuario: u.usuario, password: '', email: u.email || '', contacto: u.contacto || '', foto: null, activo: u.activo });
        setFotoPreview(u.foto || null);
        setEditando(u);
        setModal('form');
    };

    const cerrar = () => { setModal(null); setEditando(null); resetForm(); };

    const handleFoto = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setForm(f => ({ ...f, foto: file }));
        setFotoPreview(URL.createObjectURL(file));
    };

    const guardar = () => {
        const payload = { nombre: form.nombre, usuario: form.usuario, email: form.email, contacto: form.contacto, activo: form.activo };
        if (form.password) payload.password = form.password;
        if (form.foto) payload.foto = form.foto;

        const opts = { preserveScroll: true, preserveState: true, onSuccess: cerrar };
        if (editando) {
            router.post(`${basePath}/usuarios/${editando.id}`, { ...payload, _method: 'PUT' }, opts);
        } else {
            router.post(`${basePath}/usuarios`, payload, opts);
        }
    };

    const toggleActivo = (u) => {
        router.post(`${basePath}/usuarios/${u.id}/toggle`, {}, { preserveScroll: true, preserveState: true });
    };

    const eliminar = () => {
        router.delete(`${basePath}/usuarios/${confirmEliminar.id}`, {
            preserveScroll: true, preserveState: true,
            onSuccess: () => setConfirmEliminar(null),
        });
    };

    const initials = (nombre) => nombre ? nombre.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2) : 'U';

    return (
        <div>
            <Flash message={flash} />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                <div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">Usuarios del Panel</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Cuentas con acceso al panel administrativo</p>
                </div>
                <button
                    onClick={abrirCrear}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-extrabold hover:opacity-90 transition cursor-pointer shrink-0"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Nuevo usuario
                </button>
            </div>

            {/* Grid de usuarios */}
            {adminUsuarios.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-600 gap-3">
                    <User className="w-10 h-10 opacity-30" />
                    <p className="text-sm font-semibold">No hay usuarios creados aún.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {adminUsuarios.map(u => (
                        <div key={u.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition">
                            {/* Avatar + nombre */}
                            <div className="flex items-center gap-3">
                                <div className="relative shrink-0">
                                    {u.foto ? (
                                        <img src={u.foto} alt={u.nombre} className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#800A15] to-[#003C8F] flex items-center justify-center text-white font-black text-sm select-none">
                                            {initials(u.nombre)}
                                        </div>
                                    )}
                                    <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-white dark:ring-slate-900 ${u.activo ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-extrabold text-slate-900 dark:text-white truncate">{u.nombre}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                        <AtSign className="w-3 h-3 shrink-0" />
                                        <span className="truncate">{u.usuario}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Datos opcionales */}
                            <div className="space-y-1">
                                {u.email && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
                                        <Mail className="w-3 h-3 shrink-0" /> {u.email}
                                    </p>
                                )}
                                {u.contacto && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
                                        <Phone className="w-3 h-3 shrink-0" /> {u.contacto}
                                    </p>
                                )}
                                <p className="text-[10px] text-slate-400 dark:text-slate-600">Creado {u.created_at}</p>
                            </div>

                            {/* Acciones */}
                            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                                <button
                                    onClick={() => abrirEditar(u)}
                                    className="flex-1 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => toggleActivo(u)}
                                    title={u.activo ? 'Desactivar' : 'Activar'}
                                    className={`p-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${u.activo ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200'}`}
                                >
                                    {u.activo ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => setConfirmEliminar(u)}
                                    title="Eliminar"
                                    className="p-1.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 transition cursor-pointer"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal crear / editar */}
            {modal === 'form' && (
                <Modal title={editando ? 'Editar Usuario' : 'Nuevo Usuario'} onClose={cerrar}>
                    <div className="space-y-4">
                        {/* Foto */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                {fotoPreview ? (
                                    <img src={fotoPreview} alt="preview" className="w-full h-full object-cover" />
                                ) : (
                                    <Image className="w-6 h-6 text-slate-400" />
                                )}
                            </div>
                            <div>
                                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                                    <Upload className="w-3.5 h-3.5" />
                                    {fotoPreview ? 'Cambiar foto' : 'Subir foto'}
                                    <input type="file" accept="image/*" className="hidden" onChange={handleFoto} />
                                </label>
                                <p className="text-[10px] text-slate-400 mt-1">JPG, PNG, WebP · máx 5 MB · opcional</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { label: 'Nombre completo *', field: 'nombre', icon: User, placeholder: 'Ej: Juan Pérez' },
                                { label: 'Usuario (login) *', field: 'usuario', icon: AtSign, placeholder: 'Ej: jperez' },
                            ].map(({ label, field, icon: Icon, placeholder }) => (
                                <div key={field}>
                                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">{label}</label>
                                    <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 bg-slate-50 dark:bg-slate-800 focus-within:ring-2 focus-within:ring-blue-500">
                                        <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <input
                                            type="text"
                                            value={form[field]}
                                            onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                                            placeholder={placeholder}
                                            className="bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none w-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                                Contraseña {editando ? '(dejar vacío para no cambiar)' : '*'}
                            </label>
                            <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 bg-slate-50 dark:bg-slate-800 focus-within:ring-2 focus-within:ring-blue-500">
                                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                    placeholder="Mínimo 8 caracteres"
                                    className="bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none w-full"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { label: 'Correo (opcional)', field: 'email', icon: Mail, placeholder: 'correo@ejemplo.com', type: 'email' },
                                { label: 'Contacto (opcional)', field: 'contacto', icon: Phone, placeholder: 'Ej: +57 300 000 0000' },
                            ].map(({ label, field, icon: Icon, placeholder, type = 'text' }) => (
                                <div key={field}>
                                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">{label}</label>
                                    <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 bg-slate-50 dark:bg-slate-800 focus-within:ring-2 focus-within:ring-blue-500">
                                        <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <input
                                            type={type}
                                            value={form[field]}
                                            onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                                            placeholder={placeholder}
                                            className="bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none w-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Activo toggle */}
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                            <div
                                onClick={() => setForm(f => ({ ...f, activo: !f.activo }))}
                                className={`w-10 h-5 rounded-full transition-colors relative ${form.activo ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                            >
                                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.activo ? 'translate-x-5' : 'translate-x-0'}`} />
                            </div>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                {form.activo ? 'Usuario activo' : 'Usuario inactivo'}
                            </span>
                        </label>

                        <div className="flex gap-3 pt-2">
                            <button onClick={cerrar} className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer">
                                Cancelar
                            </button>
                            <button onClick={guardar} className="flex-1 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-extrabold hover:opacity-90 transition cursor-pointer">
                                {editando ? 'Guardar cambios' : 'Crear usuario'}
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Modal confirmar eliminación */}
            {confirmEliminar && (
                <Modal title="Eliminar usuario" onClose={() => setConfirmEliminar(null)}>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                        ¿Eliminar a <span className="font-extrabold text-slate-900 dark:text-white">{confirmEliminar.nombre}</span>? Esta acción no se puede deshacer.
                    </p>
                    <div className="flex gap-3">
                        <button onClick={() => setConfirmEliminar(null)} className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer">
                            Cancelar
                        </button>
                        <button onClick={eliminar} className="flex-1 py-2 rounded-xl bg-red-600 text-white text-xs font-extrabold hover:bg-red-700 transition cursor-pointer">
                            Eliminar
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default function AdminDashboard({ seccion, carnets = [], equipo = [], testimonios = [], noticias = [], preguntas = [], tour, scenes = [], torneoPartidos = [], deportesBanners = [], cuadrangularesBloqueado = false, flash, adminCounts, adminUsuarios = [] }) {
    const pageProps = usePage().props;
    const flash_error = pageProps.flash_error;
    const command_output = pageProps.command_output;
    const adminSesion = pageProps.adminSesion;

    const basePath = window.location.pathname.replace(/\/[^/]+$/, '');
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('sih-dark-mode') === 'true');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('sih-sidebar-collapsed') === 'true');

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('sih-dark-mode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('sih-dark-mode', 'false');
        }
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem('sih-sidebar-collapsed', isCollapsed ? 'true' : 'false');
    }, [isCollapsed]);

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

                {/* ── Sidebar Izquierda Minimalista (AdminSidebar) ── */}
                <AdminSidebar
                    seccion={seccion}
                    basePath={basePath}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    adminCounts={adminCounts}
                />

                {/* ── Right Content Container (Ajustable segun isCollapsed) ── */}
                <div className={`flex-1 flex flex-col min-h-screen w-full transition-all duration-300 ${
                    isCollapsed ? 'pl-0 lg:pl-[84px]' : 'pl-0 lg:pl-[260px]'
                }`}>
                    
                    {/* Header Top Navbar estilo SnowUI / Apple Minimal (Breadcrumbs + Buscador + Herramientas) */}
                    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] shrink-0">
                        
                        {/* Izquierda: Drawer Móvil + Breadcrumbs estilo SnowUI */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                                aria-label="Abrir Menú"
                            >
                                <PanelLeft className="w-4 h-4" />
                            </button>

                            {/* Breadcrumbs de Navegación */}
                            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500">
                                <button className="hover:text-slate-700 dark:hover:text-slate-300 transition">
                                    <Star className="w-3.5 h-3.5" />
                                </button>
                                <span>/</span>
                                <span className="text-slate-500 dark:text-slate-400 font-semibold">Panel COLSIH</span>
                                <span>/</span>
                                <span className="text-slate-900 dark:text-white font-extrabold capitalize">
                                    {seccion ? seccion.replace('-admin', '') : 'Resumen'}
                                </span>
                            </div>
                        </div>

                        {/* Derecha: Buscador Plano + Modo Oscuro + Notificaciones + Perfil */}
                        <div className="flex items-center gap-3">
                            {/* Buscador plano minimalista estilo SnowUI */}
                            <div className="hidden md:flex items-center gap-2 bg-[#F4F5F7] dark:bg-slate-800/80 rounded-xl px-3 py-1.5 w-56 lg:w-72">
                                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <input 
                                    type="text" 
                                    placeholder="Buscar en el portal..." 
                                    className="bg-transparent text-xs font-medium text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none w-full"
                                    readOnly
                                />
                                <span className="text-[9px] font-bold text-slate-400 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
                                    Ctrl K
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                {/* Botón Tema (Sol/Luna) */}
                                <button 
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="w-8 h-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                                    title="Cambiar Tema"
                                >
                                    {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                                </button>

                                {/* Botón Notificaciones */}
                                <button 
                                    className="w-8 h-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition relative cursor-pointer"
                                    title="Notificaciones"
                                >
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600"></span>
                                    <Bell className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
                            
                            {/* Avatar Administrador */}
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#800A15] to-[#003C8F] p-0.5 shadow-xs">
                                    {adminSesion?.foto ? (
                                        <img src={adminSesion.foto} alt={adminSesion.nombre} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-white/10 text-white font-extrabold flex items-center justify-center text-xs">
                                            {(adminSesion?.nombre ?? 'A').charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main Area Plano Minimalista (Fondo Blanco Suave #F8FAFC) */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#F8FAFC] dark:bg-[#090D16] overflow-y-auto">
                        
                        {/* ── Dashboard Overview (Cuando no hay seccion o es dashboard) ── */}
                        {(!seccion || seccion === 'dashboard') && (
                            <DashboardOverview 
                                adminCounts={adminCounts}
                                carnets={carnets}
                                torneoPartidos={torneoPartidos}
                                equipo={equipo}
                                noticias={noticias}
                                basePath={basePath}
                            />
                        )}

                        {/* ── Módulos de Gestión (Renderizado Plano Directo a Pantalla) ── */}
                        {seccion && seccion !== 'dashboard' && (
                            <div className="w-full animate-fadeIn">
                                {(seccion === 'carnets' || seccion === 'carnets-admin') && <CarnetsAdminTab carnets={carnets} flash={flash} />}
                                {(seccion === 'deportes' || seccion === 'deportes-admin') && <DeportesAdminTab torneoPartidos={torneoPartidos} deportesBanners={deportesBanners} cuadrangularesBloqueado={cuadrangularesBloqueado} flash={flash} />}
                                {seccion === 'equipo'         && <EquipoTab        equipo={equipo}           flash={flash} />}
                                {seccion === 'testimonios'    && <TestimoniosTab   testimonios={testimonios} flash={flash} />}
                                {seccion === 'noticias'       && <NoticiasTab      noticias={noticias}       flash={flash} />}
                                {seccion === 'preguntas'      && <PreguntasTab     preguntas={preguntas}     flash={flash} />}
                                {seccion === 'recorrido'      && <RecorridoTab     tour={tour} scenes={scenes} flash={flash} basePath={basePath} />}
                                {seccion === 'mantenimiento'  && <MantenimientoTab flash={flash} flash_error={flash_error} command_output={command_output} basePath={basePath} />}
                                {seccion === 'usuarios'       && <UsuariosAdminTab adminUsuarios={adminUsuarios} flash={flash} />}
                            </div>
                        )}

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
