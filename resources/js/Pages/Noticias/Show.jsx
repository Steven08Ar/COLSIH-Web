import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { mediaUrl } from '@/utils/mediaUrl';

import { getYouTubeEmbedUrl, getYouTubeThumbnailUrl } from '@/utils/youtube';

function toEmbedUrl(url) {
    return getYouTubeEmbedUrl(url);
}

const BG_MAP = {
    'from-blue-50 to-indigo-50':  '#EEF2FF',
    'from-amber-50 to-orange-50': '#FFFBEB',
    'from-rose-50 to-red-50':     '#FFF1F2',
    'from-slate-50 to-slate-100': '#F8FAFC',
};

function BloqueRenderer({ bloque, onOpenVideo, onOpenImage }) {
    const blkStyles = bloque.styles || {};

    switch (bloque.tipo) {

        case 'hero': {
            const tagline   = bloque.tagline    || '';
            const titHero   = bloque.contenido  || '';
            const subtit    = bloque.subtitulo  || '';
            const btnTxt    = bloque.texto_boton || '';
            const btnUrl    = bloque.url_boton   || '#';
            const btnColor  = bloque.color_boton || '#003C8F';
            const heroAlign = blkStyles.align   || 'center';
            return (
                <div className="py-10 md:py-16 w-full" style={{ textAlign: heroAlign }}>
                    {tagline && (
                        <span className="inline-block bg-indigo-100 text-indigo-600 font-extrabold text-[10px] uppercase tracking-widest px-4 py-1 rounded-full mb-5">
                            {tagline}
                        </span>
                    )}
                    <h1 className="leading-tight" style={{ fontSize: blkStyles.fontSize || '2.5rem', fontWeight: blkStyles.fontWeight || '900', color: blkStyles.textColor || '#08111F' }}>{titHero}</h1>
                    {subtit && <p className="mt-4 font-medium leading-relaxed max-w-2xl mx-auto" style={{ color: blkStyles.textColor ? blkStyles.textColor + '99' : '#64748b', fontSize: blkStyles.fontSize ? `calc(${blkStyles.fontSize} * 0.45)` : '1rem' }}>{subtit}</p>}
                    {btnTxt && (
                        <a href={btnUrl} className="inline-block mt-6 px-8 py-3 rounded-xl font-bold text-white text-sm shadow-md hover:opacity-90 transition" style={{ backgroundColor: btnColor }}>
                            {btnTxt}
                        </a>
                    )}
                </div>
            );
        }

        case 'titulo': {
            const lvl = bloque.level || 'h3';
            const sizeMap = { h2: '2rem', h3: '1.5rem', h4: '1.125rem' };
            const Tag = ['h2','h3','h4'].includes(lvl) ? lvl : 'h3';
            const titStyle = {
                fontSize:   blkStyles.fontSize  || sizeMap[lvl] || '1.5rem',
                fontWeight: blkStyles.fontWeight || '800',
                color:      blkStyles.textColor  || '#08111F',
                textAlign:  blkStyles.align      || 'left',
            };
            if (blkStyles.fontStyle)      titStyle.fontStyle      = blkStyles.fontStyle;
            if (blkStyles.textDecoration) titStyle.textDecoration = blkStyles.textDecoration;
            return (
                <Tag className="tracking-tight leading-tight pt-4" style={titStyle}>
                    {bloque.contenido}
                </Tag>
            );
        }

        case 'texto': {
            const formato = bloque.formato || {};

            // Prefer new editor styles over legacy formato fields
            const inlineStyle = {};
            if (blkStyles.fontSize)      inlineStyle.fontSize      = blkStyles.fontSize;
            else if (formato.size === 'muy-grande') inlineStyle.fontSize = '1.75rem';
            else if (formato.size === 'grande')     inlineStyle.fontSize = '1.125rem';

            if (blkStyles.fontWeight)    inlineStyle.fontWeight    = blkStyles.fontWeight;
            else if (formato.bold)       inlineStyle.fontWeight    = '700';

            if (blkStyles.fontStyle)     inlineStyle.fontStyle     = blkStyles.fontStyle;
            else if (formato.italic)     inlineStyle.fontStyle     = 'italic';

            if (blkStyles.textDecoration) inlineStyle.textDecoration = blkStyles.textDecoration;
            else if (formato.underline)   inlineStyle.textDecoration = 'underline';

            if (blkStyles.textColor) {
                inlineStyle.color = blkStyles.textColor;
            } else if (formato.color === 'rojo') inlineStyle.color = '#800A15';
            else if (formato.color === 'azul')   inlineStyle.color = '#001659';
            else                                 inlineStyle.color = '#475569';

            if (blkStyles.align) inlineStyle.textAlign = blkStyles.align;

            return (
                <p className="leading-relaxed whitespace-pre-line text-base" style={inlineStyle}>
                    {bloque.contenido}
                </p>
            );
        }

        case 'separador': {
            const sepStyle = blkStyles.separatorStyle || 'punto';
            if (sepStyle === 'espaciado') return <div className="my-10 w-full" />;
            if (sepStyle === 'simple') return <hr className="my-6 border-t border-slate-200 w-full" />;
            return (
                <div className="flex items-center gap-4 py-4 w-full">
                    <div className="flex-1 h-px bg-slate-200" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#800A15]" />
                    <div className="flex-1 h-px bg-slate-200" />
                </div>
            );
        }

        case 'imagen': {
            const imgSrc = bloque.imagen ? mediaUrl(bloque.imagen) : null;
            return (
                <figure className="space-y-2 text-left w-full">
                    {imgSrc ? (
                        <div onClick={() => onOpenImage(imgSrc)}
                            className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm cursor-zoom-in group">
                            <img src={imgSrc} alt={bloque.leyenda || ''}
                                className="w-full h-auto max-h-[600px] object-cover transition duration-500 group-hover:scale-[1.02]"
                                loading="lazy" />
                        </div>
                    ) : (
                        <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 aspect-video flex items-center justify-center">
                            <img src="https://media.colsih.edu.co/home/estudiantes-colsih.png" className="w-full h-full object-cover grayscale opacity-20" />
                        </div>
                    )}
                    {bloque.leyenda && (
                        <figcaption className="text-center text-xs text-slate-400 font-semibold italic">{bloque.leyenda}</figcaption>
                    )}
                </figure>
            );
        }

        case 'video': {
            const embedUrl     = toEmbedUrl(bloque.url);
            const videoFileSrc = bloque.videoFile ? `/storage/${bloque.videoFile}` : null;
            const posterSrc    = bloque.poster ? mediaUrl(bloque.poster) : getYouTubeThumbnailUrl(bloque.url || '');
            if (!embedUrl && !videoFileSrc) return null;
            return (
                <div className="space-y-2 text-left w-full">
                    {bloque.titulo && <p className="text-sm font-bold text-slate-700">{bloque.titulo}</p>}
                    {embedUrl ? (
                        <div onClick={() => onOpenVideo(embedUrl)}
                            className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group cursor-pointer shadow-md hover:shadow-lg transition-all">
                            {posterSrc && (
                                <img src={posterSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <span className="absolute w-16 h-16 rounded-full bg-white/10 animate-ping" />
                                <div className="w-14 h-14 rounded-full bg-white/25 hover:bg-white/40 border border-white/40 backdrop-blur-md flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-xl z-10">
                                    <svg className="w-5 h-5 fill-white ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-[#001659]/50 to-[#800A15]/50" />
                        </div>
                    ) : (
                        <video src={videoFileSrc} controls poster={posterSrc || undefined}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-900 shadow-md"
                            style={{ maxHeight: '560px' }} />
                    )}
                </div>
            );
        }

        case 'cita':
            return (
                <blockquote className="bg-slate-50 border-l-4 border-blue-600 p-6 rounded-r-2xl italic w-full"
                    style={{ textAlign: blkStyles.align || 'left', color: blkStyles.textColor || '#334155', fontSize: blkStyles.fontSize || '1.125rem', fontWeight: blkStyles.fontWeight || '500' }}>
                    {bloque.contenido}
                    {bloque.autor && (
                        <span className="block text-xs font-bold text-blue-600 uppercase tracking-wider mt-3 not-italic">— {bloque.autor}</span>
                    )}
                </blockquote>
            );

        case 'ficha': {
            const titulo = bloque.titulo || 'Información';
            const items  = (bloque.items || '').split('\n').filter(x => x.trim());
            return (
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 space-y-3 w-full" style={{ textAlign: blkStyles.align || 'left' }}>
                    <div className="flex items-center gap-2 text-blue-600">
                        <span className="font-extrabold text-sm uppercase tracking-wide">{titulo}</span>
                    </div>
                    <ul className="space-y-2 font-semibold list-disc list-inside" style={{ color: blkStyles.textColor || '#475569', fontSize: blkStyles.fontSize || '0.75rem' }}>
                        {items.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                </div>
            );
        }

        case 'lista': {
            const tituloL = bloque.titulo || '';
            const items   = (bloque.items || '').split('\n').filter(x => x.trim());
            const listColor = blkStyles.textColor || '#475569';
            const listSize  = blkStyles.fontSize  || '1rem';
            const listAlign = blkStyles.align     || 'left';
            return (
                <div className="w-full space-y-2" style={{ textAlign: listAlign }}>
                    {tituloL && <p className="font-bold text-base" style={{ color: blkStyles.textColor || '#1e293b' }}>{tituloL}</p>}
                    <ul className="space-y-1.5 list-disc list-inside">
                        {items.map((item, idx) => (
                            <li key={idx} className="font-medium leading-relaxed" style={{ color: listColor, fontSize: listSize }}>{item}</li>
                        ))}
                    </ul>
                </div>
            );
        }

        case 'boton': {
            const btnText      = bloque.texto       || 'Ver más';
            const btnHref      = bloque.url         || '#';
            const btnColor     = bloque.color       || '#003C8F';
            const btnTextColor = bloque.texto_color || '#ffffff';
            return (
                <div className="w-full py-2" style={{ textAlign: blkStyles.align || 'center' }}>
                    <a
                        href={btnHref}
                        className="inline-block px-10 py-3.5 rounded-xl font-bold text-sm shadow-md hover:opacity-90 active:scale-95 transition"
                        style={{ backgroundColor: btnColor, color: btnTextColor }}
                    >
                        {btnText}
                    </a>
                </div>
            );
        }

        case 'espaciador': {
            const h = Math.max(8, Math.min(200, parseInt(bloque.altura || '40')));
            return <div style={{ height: `${h}px` }} className="w-full" />;
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
                        <header className="space-y-4 text-center lg:text-left flex flex-col items-center lg:items-start">
                            <span className={`inline-block text-[11px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full border ${getCategoryStyles(noticia.categoria)}`}>
                                {categoryLabel(noticia.categoria)}
                            </span>
                            <h1 className="text-2xl sm:text-4xl lg:text-[52px] font-black text-[#08111F] leading-[1.15] tracking-tight">
                                {noticia.titulo}
                            </h1>
                            <div className="flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-bold border-b border-slate-100 pb-6 w-full">
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
                            <div onClick={() => setSelectedImage(mediaUrl(noticia.imagen))}
                                className="w-full rounded-[32px] overflow-hidden border border-slate-100 shadow-md cursor-zoom-in group">
                                <img src={mediaUrl(noticia.imagen)} alt={noticia.titulo}
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
                                        const widthClass = width === 'cuarto' ? 'w-full md:w-1/4 px-3 mb-6' : (width === 'mediano' ? 'w-full md:w-1/2 px-3 mb-6' : (width === 'tres-cuartos' ? 'w-full md:w-3/4 px-3 mb-6' : 'w-full px-3 mb-6'));
                                        const bs = bloque.styles || {};
                                        const paddingCls = bs.padding      || '';
                                        const radiusCls  = bs.borderRadius || '';
                                        const shadowCls  = bs.shadow       || '';
                                        const bgColor    = BG_MAP[bs.bgGradient] || null;
                                        const hiddenCls  = bs.hiddenOnMobile ? 'hidden md:block' : '';
                                        const containerStyle = {};
                                        if (bgColor)          containerStyle.backgroundColor = bgColor;
                                        if (bs.textColor)     containerStyle.color           = bs.textColor;
                                        if (bs.fontSize)      containerStyle.fontSize        = bs.fontSize;
                                        if (bs.fontWeight)    containerStyle.fontWeight      = bs.fontWeight;
                                        if (bs.fontStyle)     containerStyle.fontStyle       = bs.fontStyle;
                                        if (bs.textDecoration)containerStyle.textDecoration  = bs.textDecoration;
                                        if (bs.align)         containerStyle.textAlign       = bs.align;
                                        if (bs.minHeight)     containerStyle.minHeight       = bs.minHeight;
                                        const hasContainer = paddingCls || radiusCls || shadowCls || Object.keys(containerStyle).length > 0;
                                        return (
                                            <div key={idx} className={`${widthClass} ${hiddenCls}`}>
                                                {hasContainer ? (
                                                    <div className={`${paddingCls} ${radiusCls} ${shadowCls}`} style={containerStyle}>
                                                        <BloqueRenderer bloque={bloque}
                                                            onOpenVideo={setActiveVideoUrl}
                                                            onOpenImage={setSelectedImage} />
                                                    </div>
                                                ) : (
                                                    <BloqueRenderer bloque={bloque}
                                                        onOpenVideo={setActiveVideoUrl}
                                                        onOpenImage={setSelectedImage} />
                                                )}
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/95" onClick={() => setActiveVideoUrl(null)}>
                    <button onClick={() => setActiveVideoUrl(null)} className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-xl cursor-pointer border border-white/10">✕</button>
                    <div className="relative bg-black rounded-3xl overflow-hidden max-w-4xl w-full aspect-video shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
                        <iframe src={`${activeVideoUrl}?autoplay=1`} title="Video" className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"></iframe>
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
