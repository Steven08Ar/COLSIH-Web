import { useState, useRef, useEffect } from 'react';
import {
    X, AlignLeft, AlignCenter, AlignRight, Layout,
    Type, SlidersHorizontal, Sparkles, Image, Video,
    Minus, Quote, List
} from 'lucide-react';

function toEmbedUrl(url) {
    if (!url) return null;
    if (url.includes('/embed/')) return url;
    const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : null;
}

/* ── Imagen ── */
function ImagenPanel({ block, onUpdateContent }) {
    const [isDragging, setIsDragging] = useState(false);
    const fileRef = useRef();
    const previewUrl = block.content.url || null;
    const externalUrl = block.content.dbPath?.startsWith('http') ? block.content.dbPath : '';

    function handleFile(file) {
        if (!file || !file.type.startsWith('image/')) return;
        onUpdateContent({ url: URL.createObjectURL(file), _pendingFile: file, dbPath: '' });
    }

    function handleExternalUrl(e) {
        const url = e.target.value.trim();
        if (url) {
            onUpdateContent({ url, dbPath: url, _pendingFile: null });
        } else {
            onUpdateContent({ url: '', dbPath: '', _pendingFile: null });
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-400">
                <Image className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">Imagen del Bloque</span>
            </div>

            {previewUrl && (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-50">
                    <img src={previewUrl} alt="" className="w-full h-full object-cover" />
                    <button
                        type="button"
                        onClick={() => onUpdateContent({ url: '', dbPath: '', _pendingFile: null })}
                        className="absolute top-2 right-2 w-6 h-6 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center text-[10px] cursor-pointer transition"
                    >✕</button>
                </div>
            )}

            {/* Upload drop zone */}
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all select-none ${
                    isDragging ? 'border-blue-500 bg-blue-50 scale-[1.01]' : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 bg-slate-50/80'
                }`}
            >
                <div className="flex flex-col items-center gap-2 pointer-events-none">
                    <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center shadow-xs">
                        <Image className="w-5 h-5 text-slate-300" />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{previewUrl && !externalUrl ? 'Cambiar imagen' : 'Arrastrar o hacer clic'}</span>
                    <span className="text-[10px] text-slate-400">PNG, JPG, WebP · Máx. 6MB</span>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest shrink-0">o pegar enlace</span>
                <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* External URL */}
            <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">URL de Imagen</label>
                <input
                    type="url"
                    value={externalUrl}
                    onChange={handleExternalUrl}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Leyenda / Pie de Foto</label>
                <input
                    type="text"
                    value={block.content.caption || ''}
                    onChange={(e) => onUpdateContent({ caption: e.target.value })}
                    placeholder="Descripción de la imagen..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
            </div>
        </div>
    );
}

/* ── Video ── */
function VideoPanel({ block, onUpdateContent }) {
    const videoFileRef = useRef();
    const embedUrl = toEmbedUrl(block.content.url || '');
    const directVideoSrc = block.content._videoPreviewUrl
        || (block.content.videoFile ? `/storage/${block.content.videoFile}` : null);

    function handleVideoFile(file) {
        if (!file) return;
        onUpdateContent({
            _pendingVideoFile: file,
            _videoPreviewUrl: URL.createObjectURL(file),
            url: '',
        });
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-400">
                <Video className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">Video del Bloque</span>
            </div>

            {/* Section 1 – YouTube */}
            <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Enlace de YouTube</label>
                <input
                    type="url"
                    value={block.content.url || ''}
                    onChange={(e) => onUpdateContent({ url: e.target.value, _pendingVideoFile: null, _videoPreviewUrl: null, videoFile: '' })}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
            </div>

            {embedUrl && (
                <div className="rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-900">
                    <iframe
                        src={embedUrl}
                        title="Vista previa YouTube"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest shrink-0">o adjuntar video</span>
                <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Section 2 – Direct file upload */}
            {directVideoSrc ? (
                <div className="space-y-2">
                    <video
                        src={directVideoSrc}
                        controls
                        className="w-full rounded-xl border border-slate-200 bg-slate-900"
                        style={{ maxHeight: '200px' }}
                    />
                    <button
                        type="button"
                        onClick={() => onUpdateContent({ _pendingVideoFile: null, _videoPreviewUrl: null, videoFile: '' })}
                        className="w-full py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-rose-50 hover:border-rose-200 text-slate-500 hover:text-rose-600 text-xs font-bold transition cursor-pointer"
                    >
                        Eliminar video adjunto
                    </button>
                </div>
            ) : (
                <div>
                    <button
                        type="button"
                        onClick={() => videoFileRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 bg-slate-50/80 rounded-xl p-4 text-xs font-bold text-slate-600 transition cursor-pointer"
                    >
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82V15.18a1 1 0 01-1.447.89L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                        </svg>
                        Subir archivo de video (MP4, WebM)
                    </button>
                    <input
                        ref={videoFileRef}
                        type="file"
                        accept="video/mp4,video/webm,video/ogg"
                        className="hidden"
                        onChange={(e) => handleVideoFile(e.target.files[0])}
                    />
                    <p className="text-[10px] text-slate-400 text-center mt-2">MP4, WebM u OGG · Se guardará en el servidor</p>
                </div>
            )}

            <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Título del Video</label>
                <input
                    type="text"
                    value={block.content.title || ''}
                    onChange={(e) => onUpdateContent({ title: e.target.value })}
                    placeholder="Ej: Acto de Grados 2026..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
            </div>
        </div>
    );
}

/* ── Texto ── */
function TextoPanel({ block, onUpdateContent, onUpdateStyles }) {
    const styles = block.styles || {};
    const isBold = styles.fontWeight === '700' || styles.fontWeight === '800';
    const isItalic = styles.fontStyle === 'italic';
    const isUnderline = styles.textDecoration === 'underline';

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-400">
                <Type className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">Párrafo de Texto</span>
            </div>

            <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Contenido</label>
                <textarea
                    value={block.content.text || ''}
                    onChange={(e) => onUpdateContent({ text: e.target.value })}
                    rows={6}
                    placeholder="Escribe el párrafo aquí..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:bg-white focus:border-blue-600 transition resize-none leading-relaxed"
                />
            </div>

            <div className="h-px bg-slate-100" />

            <div className="space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Formato Rápido</span>
                <div className="flex gap-1.5">
                    <button
                        type="button"
                        onClick={() => onUpdateStyles({ fontWeight: isBold ? '400' : '700' })}
                        className={`w-9 h-9 rounded-lg border text-xs font-extrabold transition cursor-pointer ${isBold ? 'bg-slate-800 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-400'}`}
                    >N</button>
                    <button
                        type="button"
                        onClick={() => onUpdateStyles({ fontStyle: isItalic ? 'normal' : 'italic' })}
                        className={`w-9 h-9 rounded-lg border text-xs italic font-semibold transition cursor-pointer ${isItalic ? 'bg-slate-800 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-400'}`}
                    >K</button>
                    <button
                        type="button"
                        onClick={() => onUpdateStyles({ textDecoration: isUnderline ? 'none' : 'underline' })}
                        className={`w-9 h-9 rounded-lg border text-xs underline font-semibold transition cursor-pointer ${isUnderline ? 'bg-slate-800 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-400'}`}
                    >S</button>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Color del Texto</label>
                <div className="grid grid-cols-3 gap-1.5">
                    {[
                        { label: 'Gris', value: '#475569' },
                        { label: 'Rojo', value: '#800A15' },
                        { label: 'Azul', value: '#003C8F' },
                    ].map(({ label, value }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => onUpdateStyles({ textColor: value })}
                            className={`py-2 rounded-xl border text-[10px] font-extrabold transition cursor-pointer ${
                                (styles.textColor || '#475569') === value
                                    ? 'ring-2 ring-offset-1 ring-blue-500 border-blue-300'
                                    : 'border-slate-200 hover:border-slate-400'
                            }`}
                            style={{ color: value }}
                        >{label}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── Titulo ── */
function TituloPanel({ block, onUpdateContent, onUpdateStyles }) {
    const styles = block.styles || {};

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-400">
                <span className="text-base font-black text-slate-300 leading-none">H</span>
                <span className="text-[10px] font-black uppercase tracking-wider">Título de Sección</span>
            </div>

            <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Texto del Título</label>
                <input
                    type="text"
                    value={block.content.text || ''}
                    onChange={(e) => onUpdateContent({ text: e.target.value })}
                    placeholder="Escribe el título aquí..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-black rounded-xl px-3 py-2.5 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Nivel de Encabezado</label>
                <div className="grid grid-cols-3 gap-1.5">
                    {['h2', 'h3', 'h4'].map((level) => (
                        <button
                            key={level}
                            type="button"
                            onClick={() => onUpdateContent({ level })}
                            className={`py-2 rounded-xl border text-xs font-extrabold transition cursor-pointer ${
                                (block.content.level || 'h3') === level
                                    ? 'bg-blue-600 border-blue-600 text-white'
                                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-300'
                            }`}
                        >{level.toUpperCase()}</button>
                    ))}
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Color del Título</label>
                <div className="grid grid-cols-3 gap-1.5">
                    {[
                        { label: 'Negro', value: '#0f172a' },
                        { label: 'Rojo', value: '#800A15' },
                        { label: 'Azul', value: '#003C8F' },
                    ].map(({ label, value }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => onUpdateStyles({ textColor: value })}
                            className={`py-2 rounded-xl border text-[10px] font-extrabold transition cursor-pointer ${
                                (styles.textColor || '#0f172a') === value
                                    ? 'ring-2 ring-offset-1 ring-blue-500 border-blue-300'
                                    : 'border-slate-200 hover:border-slate-400'
                            }`}
                            style={{ color: value }}
                        >{label}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── Separador ── */
function SeparadorPanel({ block, onUpdateStyles }) {
    const styles = block.styles || {};
    const current = styles.separatorStyle || 'punto';

    const estilos = [
        {
            value: 'simple',
            label: 'Línea Simple',
            preview: <div className="flex-1 h-px bg-slate-300" />,
        },
        {
            value: 'punto',
            label: 'Con Punto Central',
            preview: <><div className="flex-1 h-px bg-slate-300" /><div className="w-1.5 h-1.5 rounded-full bg-[#800A15]" /><div className="flex-1 h-px bg-slate-300" /></>,
        },
        {
            value: 'espaciado',
            label: 'Solo Espacio',
            preview: <span className="text-[9px] text-slate-400 font-bold w-full text-center">— sin línea —</span>,
        },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-400">
                <Minus className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">Separador Visual</span>
            </div>

            <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Estilo</label>
                {estilos.map(({ value, label, preview }) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => onUpdateStyles({ separatorStyle: value })}
                        className={`w-full px-4 py-3 rounded-xl border text-left transition cursor-pointer flex items-center gap-3 ${
                            current === value
                                ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-300'
                                : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                        }`}
                    >
                        <div className="flex items-center gap-2 flex-1 min-w-0">{preview}</div>
                        <span className="text-[10px] font-bold text-slate-600 shrink-0">{label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ── Cita ── */
function CitaPanel({ block, onUpdateContent }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-400">
                <Quote className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">Cita Destacada</span>
            </div>

            <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Texto de la Cita</label>
                <textarea
                    value={block.content.quote || ''}
                    onChange={(e) => onUpdateContent({ quote: e.target.value })}
                    rows={4}
                    placeholder="Escribe la cita aquí..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium italic rounded-xl px-3 py-2.5 focus:outline-none focus:bg-white focus:border-blue-600 transition resize-none"
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Autor / Fuente</label>
                <input
                    type="text"
                    value={block.content.author || ''}
                    onChange={(e) => onUpdateContent({ author: e.target.value })}
                    placeholder="Ej: Rector del Colegio"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
            </div>

            {(block.content.quote || block.content.author) && (
                <blockquote className="bg-slate-50 border-l-4 border-blue-600 p-4 rounded-r-xl italic text-slate-700 text-xs font-medium">
                    {block.content.quote || '...'}
                    {block.content.author && (
                        <span className="block text-[10px] font-extrabold text-blue-600 uppercase tracking-wider mt-2 not-italic">— {block.content.author}</span>
                    )}
                </blockquote>
            )}
        </div>
    );
}

/* ── Ficha ── */
function FichaPanel({ block, onUpdateContent }) {
    const items = (block.content.items || '').split('\n').filter(l => l.trim());

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-400">
                <List className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">Ficha Técnica</span>
            </div>

            <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Título de la Ficha</label>
                <input
                    type="text"
                    value={block.content.title || ''}
                    onChange={(e) => onUpdateContent({ title: e.target.value })}
                    placeholder="Ej: Información del Evento"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2.5 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Datos (uno por línea)</label>
                <textarea
                    value={block.content.items || ''}
                    onChange={(e) => onUpdateContent({ items: e.target.value })}
                    rows={5}
                    placeholder={"Fecha: 15 de Agosto 2026\nLugar: Auditorio Principal\nHora: 8:00 AM"}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:bg-white focus:border-blue-600 transition resize-none font-mono"
                />
                <p className="text-[10px] text-slate-400 font-medium">Cada línea se convierte en una viñeta</p>
            </div>

            {items.length > 0 && (
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 space-y-2">
                    <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wide">{block.content.title || 'Ficha'}</span>
                    <ul className="space-y-1 list-disc list-inside">
                        {items.map((item, i) => (
                            <li key={i} className="text-[10px] text-slate-600 font-semibold">{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

/* ── PropertyPanel Principal ── */
const BLOCK_LABELS = {
    texto: 'Párrafo de Texto',
    titulo: 'Título de Sección',
    imagen: 'Imagen',
    video: 'Video Embebido',
    separador: 'Separador',
    cita: 'Cita Destacada',
    ficha: 'Ficha Técnica',
};

export default function PropertyPanel({ block, onUpdateStyles, onUpdateContent, onClose }) {
    const [activeTab, setActiveTab] = useState('content');
    const styles = block.styles || {};

    useEffect(() => {
        setActiveTab('content');
    }, [block.id]);

    const handleStyleChange = (key, value) => onUpdateStyles({ [key]: value });

    function renderContentTab() {
        switch (block.tipo) {
            case 'imagen':    return <ImagenPanel block={block} onUpdateContent={onUpdateContent} />;
            case 'video':     return <VideoPanel block={block} onUpdateContent={onUpdateContent} />;
            case 'texto':     return <TextoPanel block={block} onUpdateContent={onUpdateContent} onUpdateStyles={onUpdateStyles} />;
            case 'titulo':    return <TituloPanel block={block} onUpdateContent={onUpdateContent} onUpdateStyles={onUpdateStyles} />;
            case 'separador': return <SeparadorPanel block={block} onUpdateStyles={onUpdateStyles} />;
            case 'cita':      return <CitaPanel block={block} onUpdateContent={onUpdateContent} />;
            case 'ficha':     return <FichaPanel block={block} onUpdateContent={onUpdateContent} />;
            default:          return <p className="text-xs text-slate-400 italic text-center py-4">No hay opciones para este tipo de bloque.</p>;
        }
    }

    return (
        <div className="h-full flex flex-col text-slate-700 bg-white">

            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h3 className="font-extrabold text-sm text-slate-800">Ajustes del Bloque</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{BLOCK_LABELS[block.tipo] || 'Bloque'}</p>
                </div>
                <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition cursor-pointer"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Tabs */}
            <div className="px-5 border-b border-slate-100 flex bg-slate-50/50">
                {[
                    { key: 'content', label: 'Contenido' },
                    { key: 'styles', label: 'Estilos' },
                    { key: 'advanced', label: 'Avanzado' },
                ].map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`flex-1 py-3 text-xs font-bold border-b-2 transition cursor-pointer ${activeTab === key ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Panel body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 text-left">

                {activeTab === 'content' && renderContentTab()}

                {activeTab === 'styles' && (
                    <>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Type className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-wider">Tipografía</span>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Tamaño de Fuente</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range" min="12" max="64"
                                        value={parseInt(styles.fontSize || '16')}
                                        onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
                                        className="flex-1 accent-blue-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
                                    />
                                    <span className="text-xs font-extrabold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md shrink-0 w-12 text-center">
                                        {styles.fontSize || '16px'}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Grosor (Weight)</label>
                                <select
                                    value={styles.fontWeight || '400'}
                                    onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2.5 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                                >
                                    <option value="300">Ligero (300)</option>
                                    <option value="400">Normal (400)</option>
                                    <option value="500">Medio (500)</option>
                                    <option value="600">Seminegrita (600)</option>
                                    <option value="700">Negrita (700)</option>
                                    <option value="800">Extra Negrita (800)</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Alineación</label>
                                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/50">
                                    {[['left', AlignLeft], ['center', AlignCenter], ['right', AlignRight]].map(([align, Icon]) => (
                                        <button
                                            key={align}
                                            type="button"
                                            onClick={() => handleStyleChange('align', align)}
                                            className={`py-2 rounded-md transition flex items-center justify-center cursor-pointer ${(styles.align || 'left') === align ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            <Icon className="w-4 h-4" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-slate-100" />

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-wider">Fondo & Colores</span>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Color de Texto</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={styles.textColor || '#475569'}
                                        onChange={(e) => handleStyleChange('textColor', e.target.value)}
                                        className="w-10 h-10 border border-slate-200 rounded-xl overflow-hidden cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={styles.textColor || '#475569'}
                                        onChange={(e) => handleStyleChange('textColor', e.target.value)}
                                        className="flex-1 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Fondo del Contenedor</label>
                                <select
                                    value={styles.bgGradient || ''}
                                    onChange={(e) => handleStyleChange('bgGradient', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2.5 focus:outline-none"
                                >
                                    <option value="">Blanco (Sólido)</option>
                                    <option value="from-blue-50 to-indigo-50">Azul Suave</option>
                                    <option value="from-amber-50 to-orange-50">Cálido Gradiente</option>
                                    <option value="from-rose-50 to-red-50">Rojo Suave</option>
                                    <option value="from-slate-50 to-slate-100">Gris Pálido</option>
                                </select>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'advanced' && (
                    <>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Layout className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-wider">Espaciado & Dimensiones</span>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Margen Interno (Padding)</label>
                                <select
                                    value={styles.padding || 'p-8'}
                                    onChange={(e) => handleStyleChange('padding', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2.5 focus:outline-none"
                                >
                                    <option value="p-4">Estrecho (p-4)</option>
                                    <option value="p-6">Normal (p-6)</option>
                                    <option value="p-8">Amplio (p-8)</option>
                                    <option value="p-12">Grande (p-12)</option>
                                    <option value="py-20 px-12">Extragrande Hero</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Margen Externo (Margin)</label>
                                <select
                                    value={styles.margin || 'my-4'}
                                    onChange={(e) => handleStyleChange('margin', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2.5 focus:outline-none"
                                >
                                    <option value="my-2">Reducido (my-2)</option>
                                    <option value="my-4">Medio (my-4)</option>
                                    <option value="my-8">Separado (my-8)</option>
                                    <option value="my-12">Amplio (my-12)</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Bordes Redondeados</label>
                                <select
                                    value={styles.borderRadius || 'rounded-2xl'}
                                    onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2.5 focus:outline-none"
                                >
                                    <option value="rounded-none">Esquinas Rectas</option>
                                    <option value="rounded-xl">Redondeado Normal</option>
                                    <option value="rounded-2xl">Redondeado Grande</option>
                                    <option value="rounded-[32px]">Cápsula Premium (32px)</option>
                                </select>
                            </div>
                        </div>

                        <div className="h-px bg-slate-100" />

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-400">
                                <SlidersHorizontal className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-wider">Configuración Responsive</span>
                            </div>

                            <div className="flex items-center justify-between py-1">
                                <div className="text-left">
                                    <span className="block text-xs font-bold text-slate-700">Mostrar en Móviles</span>
                                    <span className="block text-[9px] text-slate-400 font-semibold">Ocultar este bloque en pantallas pequeñas</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer select-none">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-between select-none">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest self-center">ID: {block.id?.substring(0, 8)}</span>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                    Aplicar
                </button>
            </div>
        </div>
    );
}
