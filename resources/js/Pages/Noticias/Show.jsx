import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

function toEmbedUrl(url) {
    if (!url) return null;
    if (url.includes('/embed/')) return url;
    const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : url;
}

function BloqueRenderer({ bloque, onOpenVideo, onOpenImage }) {
    switch (bloque.tipo) {
        case 'titulo':
            return (
                <h3 className="text-2xl md:text-3xl font-black text-[#08111F] tracking-tight leading-tight pt-4 text-left">
                    {bloque.contenido}
                </h3>
            );
        case 'texto': {
            const formato = bloque.formato || {};
            const styles = [];
            if (formato.bold) styles.push('font-bold');
            if (formato.italic) styles.push('italic');
            if (formato.underline) styles.push('underline');
            
            let sizeClass = 'text-base md:text-lg';
            if (formato.size === 'grande') sizeClass = 'text-lg md:text-xl font-bold';
            if (formato.size === 'muy-grande') sizeClass = 'text-2xl md:text-3xl font-extrabold';
            
            let colorClass = 'text-slate-600';
            if (formato.color === 'rojo') colorClass = 'text-[#800A15]';
            if (formato.color === 'azul') colorClass = 'text-[#003C8F]';
            
            return (
                <p className={`${sizeClass} ${colorClass} ${styles.join(' ')} leading-relaxed text-left whitespace-pre-line`}>
                    {bloque.contenido}
                </p>
            );
        }
        case 'separador':
            return (
                <div className="flex items-center gap-4 py-4 w-full">
                    <div className="flex-1 h-px bg-slate-200"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#800A15]"></div>
                    <div className="flex-1 h-px bg-slate-200"></div>
                </div>
            );
        case 'imagen': {
            const imgSrc = bloque.imagen
                ? (bloque.imagen.startsWith('http') ? bloque.imagen : `/storage/${bloque.imagen}`)
                : null;
            return (
                <figure className="space-y-2 text-left w-full">
                    {imgSrc ? (
                        <div onClick={() => onOpenImage(imgSrc)}
                            className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm cursor-zoom-in group">
                            <img src={imgSrc} alt={bloque.leyenda || ''}
                                className="w-full h-auto max-h-[600px] object-cover transition duration-500 group-hover:scale-[1.02]" />
                        </div>
                    ) : (
                        <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 aspect-video flex items-center justify-center">
                            <img src="/Estudiantes COLSIH.png" className="w-full h-full object-cover grayscale opacity-20" />
                        </div>
                    )}
                    {bloque.leyenda && (
                        <figcaption className="text-center text-xs text-slate-400 font-semibold italic">{bloque.leyenda}</figcaption>
                    )}
                </figure>
            );
        }
        case 'video': {
            const embedUrl = toEmbedUrl(bloque.url);
            const videoFileSrc = bloque.videoFile ? `/storage/${bloque.videoFile}` : null;

            if (!embedUrl && !videoFileSrc) return null;

            return (
                <div className="space-y-2 text-left w-full">
                    {bloque.titulo && <p className="text-sm font-bold text-slate-700">{bloque.titulo}</p>}
                    {embedUrl ? (
                        <div onClick={() => onOpenVideo(embedUrl)}
                            className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group cursor-pointer shadow-md hover:shadow-lg transition-all">
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <span className="absolute w-16 h-16 rounded-full bg-white/10 animate-ping"></span>
                                <div className="w-14 h-14 rounded-full bg-white/25 hover:bg-white/40 border border-white/40 backdrop-blur-md flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-xl z-10">
                                    <svg className="w-5 h-5 fill-white ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-[#003C8F]/60 to-[#800A15]/60"></div>
                        </div>
                    ) : (
                        <video
                            src={videoFileSrc}
                            controls
                            className="w-full rounded-2xl border border-slate-200 bg-slate-900 shadow-md"
                            style={{ maxHeight: '560px' }}
                        />
                    )}
                </div>
            );
        }
        case 'cita':
            return (
                <blockquote className="bg-slate-50 border-l-4 border-blue-600 p-6 rounded-r-2xl italic text-slate-700 text-base font-medium text-left w-full">
                    {bloque.contenido}
                    {bloque.autor && (
                        <span className="block text-xs font-bold text-blue-600 uppercase tracking-wider mt-3 not-italic">— {bloque.autor}</span>
                    )}
                </blockquote>
            );
        case 'ficha': {
            const titulo = bloque.titulo || 'Información';
            const items = (bloque.items || '').split('\n').filter(x => x.trim() !== '');
            return (
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 text-left space-y-3 w-full">
                    <div className="flex items-center gap-2 text-blue-600">
                        <span className="font-extrabold text-sm uppercase tracking-wide">{titulo}</span>
                    </div>
                    <ul className="space-y-2 text-xs font-semibold text-slate-600 list-disc list-inside">
                        {items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            );
        }
        default:
            return null;
    }
}

export default function NoticiasShow({ noticia, relacionadas }) {
    const [activeVideoUrl, setActiveVideoUrl] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const bloques = noticia.bloques || [];

    const formatDate = (dateStr) => {
        try {
            return new Date(dateStr).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
        } catch { return dateStr; }
    };

    const getCategoryStyles = (cat) => {
        if (cat === 'evento') return 'bg-amber-50 text-amber-600 border-amber-100';
        if (cat === 'comunicado') return 'bg-rose-50 text-rose-600 border-rose-100';
        return 'bg-blue-50 text-blue-600 border-blue-100';
    };

    const categoryLabel = (cat) => {
        if (cat === 'evento') return 'Evento';
        if (cat === 'comunicado') return 'Comunicado';
        return 'Noticia';
    };

    const videosEnBloques = bloques.filter(b => b.tipo === 'video' && b.url);
    const imagenesEnBloques = bloques.filter(b => b.tipo === 'imagen' && b.imagen);

    return (
        <AppLayout>
            <Head title={`${noticia.titulo} | COLSIH`} />
            <div className="min-h-screen bg-slate-50/50 pt-28 lg:pt-36 pb-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">

                    <article className="space-y-8">
                        <header className="space-y-4 text-left">
                            <span className={`inline-block text-[11px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full border ${getCategoryStyles(noticia.categoria)}`}>
                                {categoryLabel(noticia.categoria)}
                            </span>
                            <h1 className="text-2xl sm:text-4xl lg:text-[52px] font-black text-[#08111F] leading-[1.15] tracking-tight">
                                {noticia.titulo}
                            </h1>
                            <div className="flex items-center gap-6 text-xs text-slate-400 font-bold border-b border-slate-100 pb-6">
                                <time className="flex items-center gap-1.5" dateTime={noticia.publicado_en}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {formatDate(noticia.publicado_en)}
                                </time>
                            </div>
                        </header>

                        {/* Portada - Ocultada si no hay imagen de portada */}
                        {noticia.imagen && (
                            <div onClick={() => setSelectedImage(`/storage/${noticia.imagen}`)}
                                className="w-full rounded-[32px] overflow-hidden border border-slate-100 shadow-md cursor-zoom-in group">
                                <img src={`/storage/${noticia.imagen}`} alt={noticia.titulo}
                                    className="w-full h-auto max-h-[600px] object-cover transition duration-700 group-hover:scale-[1.02]" />
                            </div>
                        )}

                        {/* Contenido del tablero (Full width flex wrap) */}
                        <div className="bg-white border border-slate-100 rounded-[32px] p-5 sm:p-8 md:p-12 shadow-xs space-y-6">
                            {noticia.resumen && (
                                <div className="border-l-4 border-[#800A15] pl-6 py-1.5 text-left mb-6">
                                    <p className="text-lg md:text-[22px] font-bold text-slate-700 leading-relaxed">
                                        {noticia.resumen}
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-wrap -mx-3 items-start">
                                {bloques.length > 0 ? (
                                    bloques.map((bloque, idx) => {
                                        const width = bloque.width || 'completo';
                                        const widthClass = width === 'estrecho' ? 'w-full md:w-1/3 px-3 mb-6' : (width === 'mediano' ? 'w-full md:w-1/2 px-3 mb-6' : 'w-full px-3 mb-6');
                                        return (
                                            <div key={idx} className={widthClass}>
                                                <BloqueRenderer bloque={bloque}
                                                    onOpenVideo={setActiveVideoUrl}
                                                    onOpenImage={setSelectedImage} />
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="w-full text-center py-8">
                                        <p className="text-slate-400 text-sm italic">
                                            Esta publicacion no tiene contenido adicional aun.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="text-left pt-4">
                            <Link href="/noticias"
                                className="inline-flex items-center gap-2.5 text-xs font-extrabold text-slate-500 hover:text-[#800A15] bg-white hover:bg-slate-50 border border-slate-100 px-6 py-3.5 rounded-full shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                Volver a Noticias
                            </Link>
                        </div>
                    </article>

                </div>
            </div>

            {/* Modal video */}
            {activeVideoUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" onClick={() => setActiveVideoUrl(null)}>
                    <button onClick={() => setActiveVideoUrl(null)} className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-xl cursor-pointer border border-white/10">✕</button>
                    <div className="relative bg-black rounded-3xl overflow-hidden max-w-4xl w-full aspect-video shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
                        <iframe src={`${activeVideoUrl}?autoplay=1`} title="Video" className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
            )}

            {/* Modal imagen */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out" onClick={() => setSelectedImage(null)}>
                    <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-xl cursor-pointer border border-white/10">✕</button>
                    <div className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
                        <img src={selectedImage} alt="" className="w-full h-auto max-h-[85vh] object-contain rounded-2xl" />
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
