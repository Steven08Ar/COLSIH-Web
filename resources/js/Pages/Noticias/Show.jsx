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
                <h3 className="text-2xl md:text-3xl font-black text-[#08111F] tracking-tight leading-tight pt-4">
                    {bloque.contenido}
                </h3>
            );
        case 'texto':
            return (
                <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium whitespace-pre-line">
                    {bloque.contenido}
                </p>
            );
        case 'separador':
            return (
                <div className="flex items-center gap-4 py-2">
                    <div className="flex-1 h-px bg-slate-200"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#800A15]"></div>
                    <div className="flex-1 h-px bg-slate-200"></div>
                </div>
            );
        case 'imagen':
            return (
                <figure className="space-y-2">
                    {bloque.imagen && (
                        <div onClick={() => onOpenImage(`/storage/${bloque.imagen}`)}
                            className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm cursor-zoom-in group">
                            <img src={`/storage/${bloque.imagen}`} alt={bloque.leyenda || ''}
                                className="w-full h-auto max-h-[500px] object-cover transition duration-500 group-hover:scale-[1.02]" />
                        </div>
                    )}
                    {bloque.leyenda && (
                        <figcaption className="text-center text-xs text-slate-400 font-semibold italic">{bloque.leyenda}</figcaption>
                    )}
                </figure>
            );
        case 'video': {
            const embedUrl = toEmbedUrl(bloque.url);
            if (!embedUrl) return null;
            return (
                <div className="space-y-2">
                    {bloque.titulo && <p className="text-sm font-bold text-slate-700">{bloque.titulo}</p>}
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

    // Extraer videos del tablero para el widget lateral
    const videosEnBloques = bloques.filter(b => b.tipo === 'video' && b.url);
    const imagenesEnBloques = bloques.filter(b => b.tipo === 'imagen' && b.imagen);

    return (
        <AppLayout>
            <Head title={`${noticia.titulo} | COLSIH`} />

            <div className="min-h-screen bg-slate-50/50 pt-28 lg:pt-36 pb-20">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-24">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                        {/* ── Columna principal ── */}
                        <article className="lg:col-span-7 space-y-8">
                            <header className="space-y-4">
                                <span className={`inline-block text-[11px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full border ${getCategoryStyles(noticia.categoria)}`}>
                                    {categoryLabel(noticia.categoria)}
                                </span>
                                <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-[#08111F] leading-[1.15] tracking-tight">
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

                            {/* Portada */}
                            <div onClick={() => noticia.imagen && setSelectedImage(`/storage/${noticia.imagen}`)}
                                className={`w-full rounded-[32px] overflow-hidden border border-slate-100 shadow-md ${noticia.imagen ? 'cursor-zoom-in group' : ''}`}>
                                {noticia.imagen ? (
                                    <img src={`/storage/${noticia.imagen}`} alt={noticia.titulo}
                                        className="w-full h-auto max-h-[500px] object-cover transition duration-700 group-hover:scale-[1.02]" />
                                ) : (
                                    <div className="w-full h-[320px] bg-gradient-to-br from-[#003C8F] to-[#800A15] relative flex items-center justify-center">
                                        <img src="/Panoramica COLSIH.png" alt="COLSIH" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 pointer-events-none" />
                                        <div className="z-10 text-center space-y-4">
                                            <img src="/Logo COLSIH.svg" alt="COLSIH" className="h-16 mx-auto drop-shadow-xl" />
                                            <span className="text-[10px] font-black tracking-[3px] uppercase bg-white/15 border border-white/10 px-4 py-1.5 rounded-full text-white inline-block">
                                                {categoryLabel(noticia.categoria)} INSTITUCIONAL
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Contenido del tablero */}
                            <div className="bg-white border border-slate-100 rounded-[32px] p-8 md:p-12 shadow-xs space-y-6">
                                {noticia.resumen && (
                                    <div className="border-l-4 border-[#800A15] pl-6 py-1.5">
                                        <p className="text-lg md:text-[22px] font-bold text-slate-700 leading-relaxed">
                                            {noticia.resumen}
                                        </p>
                                    </div>
                                )}

                                {bloques.length > 0 ? (
                                    bloques.map((bloque, idx) => (
                                        <BloqueRenderer key={idx} bloque={bloque}
                                            onOpenVideo={setActiveVideoUrl}
                                            onOpenImage={setSelectedImage} />
                                    ))
                                ) : (
                                    <p className="text-slate-400 text-sm italic text-center py-8">
                                        Esta publicacion no tiene contenido adicional aun.
                                    </p>
                                )}
                            </div>

                            <div>
                                <Link href="/noticias"
                                    className="inline-flex items-center gap-2.5 text-xs font-extrabold text-slate-500 hover:text-[#800A15] bg-white hover:bg-slate-50 border border-slate-100 px-6 py-3.5 rounded-full shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                    Volver a Noticias
                                </Link>
                            </div>
                        </article>

                        {/* ── Columna lateral (widgets dinamicos) ── */}
                        <div className="lg:col-span-5 space-y-6">

                            {/* Widget Video: primer video del tablero */}
                            {videosEnBloques.length > 0 && (
                                <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm space-y-4 hover:-translate-y-1 transition duration-300">
                                    <h3 className="text-base font-extrabold text-slate-800">
                                        {videosEnBloques[0].titulo || 'Reportaje en Video'}
                                    </h3>
                                    <div onClick={() => setActiveVideoUrl(toEmbedUrl(videosEnBloques[0].url))}
                                        className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group cursor-pointer shadow-md hover:shadow-lg transition-all">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#003C8F]/70 to-[#800A15]/70 flex items-center justify-center">
                                            <span className="absolute w-16 h-16 rounded-full bg-white/10 animate-ping"></span>
                                            <div className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/35 border border-white/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-xl z-10">
                                                <svg className="w-5 h-5 fill-white ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Widget Galeria: imagenes del tablero */}
                            {imagenesEnBloques.length > 0 && (
                                <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm space-y-4 hover:-translate-y-1 transition duration-300">
                                    <h3 className="text-base font-extrabold text-slate-800">Galeria</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {imagenesEnBloques.slice(0, 4).map((b, i) => (
                                            <div key={i} onClick={() => setSelectedImage(`/storage/${b.imagen}`)}
                                                className="relative group rounded-2xl overflow-hidden border border-slate-200 aspect-square bg-slate-100 cursor-zoom-in">
                                                <img src={`/storage/${b.imagen}`} alt={b.leyenda || ''}
                                                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300 flex items-end justify-center p-2 opacity-0 group-hover:opacity-100">
                                                    <span className="text-[10px] text-white font-bold bg-[#800A15] px-2 py-0.5 rounded-md">Ver</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Widget: noticias relacionadas */}
                            {relacionadas && relacionadas.length > 0 && (
                                <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm space-y-4">
                                    <h3 className="text-base font-extrabold text-slate-800">Otras publicaciones</h3>
                                    <div className="space-y-3">
                                        {relacionadas.map(r => (
                                            <Link key={r.id} href={`/noticias/${r.slug}`}
                                                className="flex items-center gap-3 group p-2 rounded-xl hover:bg-slate-50 transition">
                                                {r.imagen ? (
                                                    <img src={`/storage/${r.imagen}`} alt={r.titulo} className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100" />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 shrink-0 border border-slate-100 flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold text-slate-800 line-clamp-2 group-hover:text-[#003C8F] transition">{r.titulo}</p>
                                                    {r.publicado_en && <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{formatDate(r.publicado_en)}</p>}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Fallback decorativo si no hay widgets dinamicos */}
                            {videosEnBloques.length === 0 && imagenesEnBloques.length === 0 && (
                                <div className="bg-blue-50/50 border border-blue-100 rounded-[32px] p-6 shadow-xs space-y-4">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-extrabold text-sm uppercase tracking-wide">Colegio Santa Isabel de Hungria</span>
                                    </div>
                                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                        Formando lideres con valores salesianos para un mundo mejor.
                                    </p>
                                    <Link href="/admisiones"
                                        className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#003C8F] hover:bg-[#003C8F]/90 px-4 py-2.5 rounded-xl transition cursor-pointer">
                                        Conoce nuestras Admisiones
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                                    </Link>
                                </div>
                            )}
                        </div>

                    </div>
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
