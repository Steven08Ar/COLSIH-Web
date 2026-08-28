import { useRef } from 'react';
import BlockToolbar from './BlockToolbar';
import ResizableHandles from './ResizableHandles';
import { Type, Heading, Image, Video, Quote, HelpCircle, CreditCard, PlaySquare, List, Minus, ArrowUpDown } from 'lucide-react';
import { getYouTubeThumbnailUrl } from '@/utils/youtube';

const BLOCK_BADGES = {
    hero:      { label: 'Hero Section',      bg: 'bg-indigo-50 border-indigo-100 text-indigo-700' },
    texto:     { label: 'Párrafo de Texto',  bg: 'bg-blue-50 border-blue-100 text-blue-700' },
    titulo:    { label: 'Título de Sección', bg: 'bg-amber-50 border-amber-100 text-amber-700' },
    imagen:    { label: 'Imagen',            bg: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
    video:     { label: 'Video Integrado',   bg: 'bg-purple-50 border-purple-100 text-purple-700' },
    cita:      { label: 'Cita Destacada',    bg: 'bg-rose-50 border-rose-100 text-rose-700' },
    cards:     { label: 'Fichas en Grid',    bg: 'bg-cyan-50 border-cyan-100 text-cyan-700' },
    boton:     { label: 'Botón CTA',         bg: 'bg-indigo-50 border-indigo-100 text-indigo-700' },
    lista:     { label: 'Lista de Ítems',    bg: 'bg-cyan-50 border-cyan-100 text-cyan-700' },
    ficha:     { label: 'Ficha Técnica',     bg: 'bg-teal-50 border-teal-100 text-teal-700' },
    separador: { label: 'Separador Visual',  bg: 'bg-slate-50 border-slate-100 text-slate-500' },
    espaciador:{ label: 'Espacio en Blanco', bg: 'bg-stone-50 border-stone-100 text-stone-500' },
};

// Map stored bgGradient key → real CSS background color
const BG_MAP = {
    'from-blue-50 to-indigo-50':  '#EEF2FF',
    'from-amber-50 to-orange-50': '#FFFBEB',
    'from-rose-50 to-red-50':     '#FFF1F2',
    'from-slate-50 to-slate-100': '#F8FAFC',
};

function StarIcon(props) {
    return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.198-.39.757-.39.955 0l3.053 6.007 6.368.852c.437.06.611.58.282.879l-4.74 4.316 1.417 6.134c.101.44-.372.785-.758.556L12 19.315l-5.362 2.923c-.386.23-.859-.116-.758-.556l1.417-6.134-4.74-4.316c-.329-.3-.155-.82.282-.879l6.368-.852 3.053-6.007z" />
        </svg>
    );
}

const ICON_MAP = {
    hero: StarIcon, texto: Type, titulo: Heading, imagen: Image, video: Video,
    cita: Quote, faq: HelpCircle, cards: CreditCard, boton: PlaySquare,
    lista: List, ficha: StarIcon, separador: Minus, espaciador: ArrowUpDown,
};

export default function EditorBlock({
    bloque,
    index,
    isSelected,
    onSelect,
    onUpdate,
    onDelete,
    onDuplicate,
    onMove,
    onUpdateWidth,
    onUpdateStyles,
    previewMode
}) {
    const badge = BLOCK_BADGES[bloque.tipo] || { label: 'Bloque', bg: 'bg-slate-50 border-slate-100 text-slate-700' };
    const IconComponent = ICON_MAP[bloque.tipo] || Type;

    const s = bloque.styles || {};

    // Container layout styles (from Advanced tab)
    const paddingCls = s.padding      || 'p-6';
    const radiusCls  = s.borderRadius || 'rounded-2xl';
    const shadowCls  = s.shadow       || '';

    // Background color
    const bgColor = BG_MAP[s.bgGradient] || '#ffffff';
    const minHeightStyle = s.minHeight ? { minHeight: s.minHeight } : {};

    // Text/content styles (from Styles tab) — applied as wrapper so all block types inherit them
    const contentStyle = {};
    if (s.fontSize)       contentStyle.fontSize       = s.fontSize;
    if (s.fontWeight)     contentStyle.fontWeight     = s.fontWeight;
    if (s.fontStyle)      contentStyle.fontStyle      = s.fontStyle;
    if (s.textDecoration) contentStyle.textDecoration = s.textDecoration;
    if (s.textColor)      contentStyle.color          = s.textColor;
    if (s.align)          contentStyle.textAlign      = s.align;

    // Mouse-drag height resize via bottom handle
    const startDataRef = useRef(null);

    function handleResizeStart(e) {
        e.preventDefault();
        e.stopPropagation();
        const startY = e.clientY;
        const currentMinH = parseInt(bloque.styles?.minHeight || '0') || 0;
        startDataRef.current = { startY, currentMinH };

        function onMouseMove(ev) {
            if (!startDataRef.current) return;
            const delta = ev.clientY - startDataRef.current.startY;
            const newH = Math.max(60, startDataRef.current.currentMinH + delta);
            onUpdateStyles?.(bloque.id, { minHeight: `${newH}px` });
        }
        function onMouseUp() {
            startDataRef.current = null;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    function renderBlockContent() {
        switch (bloque.tipo) {
            case 'hero':
                return (
                    <div className="space-y-6" style={{ textAlign: s.align || 'center' }}>
                        {bloque.content.tagline && (
                            <span className="inline-block bg-indigo-100/60 border border-indigo-200 text-indigo-600 font-extrabold text-[10px] uppercase tracking-widest px-4 py-1 rounded-full">
                                {bloque.content.tagline}
                            </span>
                        )}
                        <input
                            type="text"
                            value={bloque.content.title || ''}
                            onChange={(e) => onUpdate(bloque.id, { title: e.target.value })}
                            className="w-full font-black focus:outline-none bg-transparent"
                            placeholder="Escribe el título aquí..."
                            style={{
                                fontSize:  s.fontSize  || '2.5rem',
                                color:     s.textColor || '#08111F',
                                textAlign: s.align     || 'center',
                            }}
                        />
                        <textarea
                            value={bloque.content.subtitle || ''}
                            onChange={(e) => onUpdate(bloque.id, { subtitle: e.target.value })}
                            rows={2}
                            className="w-full focus:outline-none bg-transparent resize-none leading-relaxed"
                            placeholder="Escribe el subtítulo descriptivo aquí..."
                            style={{ color: s.textColor ? s.textColor + '99' : '#64748b', textAlign: s.align || 'center', fontSize: s.fontSize ? `calc(${s.fontSize} * 0.5)` : '1rem' }}
                        />
                        {bloque.content.buttonText && (
                            <div style={{ textAlign: s.align || 'center' }}>
                                <button
                                    type="button"
                                    className="px-6 py-3 text-white font-bold text-xs rounded-xl shadow-md cursor-default"
                                    style={{ backgroundColor: bloque.content.buttonColor || '#003C8F' }}
                                >
                                    {bloque.content.buttonText}
                                </button>
                            </div>
                        )}
                    </div>
                );

            case 'texto':
                return (
                    <textarea
                        value={bloque.content.text || ''}
                        onChange={(e) => onUpdate(bloque.id, { text: e.target.value })}
                        className="w-full focus:outline-none bg-transparent resize-none leading-relaxed"
                        placeholder="Comienza a escribir párrafos..."
                        style={{
                            fontSize:       s.fontSize        || '16px',
                            fontWeight:     s.fontWeight      || '400',
                            fontStyle:      s.fontStyle       || 'normal',
                            textDecoration: s.textDecoration  || 'none',
                            color:          s.textColor       || '#475569',
                            textAlign:      s.align           || 'left',
                        }}
                        rows={4}
                    />
                );

            case 'titulo': {
                const lvl = bloque.content.level || 'h3';
                const lvlSize = { h2: '2rem', h3: '1.5rem', h4: '1.125rem' };
                return (
                    <input
                        type="text"
                        value={bloque.content.text || ''}
                        onChange={(e) => onUpdate(bloque.id, { text: e.target.value })}
                        className="w-full focus:outline-none bg-transparent"
                        placeholder="Título de sección..."
                        style={{
                            fontSize:       s.fontSize        || lvlSize[lvl] || '1.5rem',
                            fontWeight:     s.fontWeight      || '800',
                            fontStyle:      s.fontStyle       || 'normal',
                            textDecoration: s.textDecoration  || 'none',
                            color:          s.textColor       || '#0f172a',
                            textAlign:      s.align           || 'left',
                        }}
                    />
                );
            }

            case 'cita':
                return (
                    <div className="border-l-4 border-blue-600 pl-6 space-y-3" style={{ textAlign: s.align || 'left' }}>
                        <textarea
                            value={bloque.content.quote || ''}
                            onChange={(e) => onUpdate(bloque.id, { quote: e.target.value })}
                            className="w-full italic focus:outline-none bg-transparent resize-none leading-relaxed"
                            placeholder="Escribe la cita..."
                            rows={2}
                            style={{
                                fontSize:   s.fontSize   || '1.125rem',
                                fontWeight: s.fontWeight || '600',
                                color:      s.textColor  || '#334155',
                                textAlign:  s.align      || 'left',
                            }}
                        />
                        <input
                            type="text"
                            value={bloque.content.author || ''}
                            onChange={(e) => onUpdate(bloque.id, { author: e.target.value })}
                            className="w-full font-bold text-xs uppercase tracking-wider focus:outline-none bg-transparent"
                            placeholder="Nombre del autor"
                            style={{ color: s.textColor ? s.textColor + '99' : '#94a3b8', textAlign: s.align || 'left' }}
                        />
                    </div>
                );

            case 'cards':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ textAlign: s.align || 'left' }}>
                        {(bloque.content.items || []).map((card, i) => (
                            <div key={i} className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl space-y-3 shadow-2xs">
                                <span className="inline-block bg-blue-100 text-blue-600 font-extrabold text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-md">{card.badge}</span>
                                <h4 className="font-extrabold text-sm" style={{ color: s.textColor || '#1e293b' }}>{card.title}</h4>
                                <p className="text-xs font-semibold leading-relaxed" style={{ color: s.textColor ? s.textColor + 'aa' : '#64748b' }}>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                );

            case 'ficha': {
                const items = (bloque.content.items || '').split('\n').filter(l => l.trim());
                return (
                    <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 space-y-3" style={{ textAlign: s.align || 'left' }}>
                        <div className="flex items-center gap-2 text-blue-600">
                            <span className="font-extrabold text-sm uppercase tracking-wide">{bloque.content.title || 'Ficha Técnica'}</span>
                        </div>
                        {items.length > 0 ? (
                            <ul className="space-y-1.5 text-xs font-semibold list-disc list-inside" style={{ color: s.textColor || '#475569', fontSize: s.fontSize || undefined }}>
                                {items.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        ) : (
                            <p className="text-slate-400 text-xs italic">Añade datos en el panel de ajustes →</p>
                        )}
                    </div>
                );
            }

            case 'lista': {
                const items = (bloque.content.items || '').split('\n').filter(l => l.trim());
                return (
                    <div className="space-y-2" style={{ textAlign: s.align || 'left' }}>
                        {bloque.content.title && (
                            <p className="font-bold text-sm" style={{ color: s.textColor || '#1e293b' }}>{bloque.content.title}</p>
                        )}
                        {items.length > 0 ? (
                            <ul className="space-y-1.5 list-disc list-inside">
                                {items.map((item, i) => (
                                    <li key={i} className="font-medium" style={{ color: s.textColor || '#475569', fontSize: s.fontSize || '0.875rem' }}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-slate-400 text-xs italic">Añade ítems en el panel de ajustes →</p>
                        )}
                    </div>
                );
            }

            case 'boton':
                return (
                    <div className="py-2" style={{ textAlign: s.align || 'center' }}>
                        <button
                            type="button"
                            className="inline-block px-8 py-3 rounded-xl font-bold text-sm shadow-md cursor-default"
                            style={{
                                backgroundColor: bloque.content.color || '#003C8F',
                                color: bloque.content.textColor || '#ffffff',
                            }}
                        >
                            {bloque.content.text || 'Haz clic aquí'}
                        </button>
                        {bloque.content.url && (
                            <div className="mt-1 text-[10px] text-slate-400 font-mono">{bloque.content.url}</div>
                        )}
                    </div>
                );

            case 'separador': {
                const sep = bloque.styles?.separatorStyle || 'punto';
                if (sep === 'espaciado') return <div className="py-6 text-center text-[10px] text-slate-300 font-bold">— espacio —</div>;
                if (sep === 'punto') return (
                    <div className="flex items-center gap-3 py-2">
                        <div className="flex-1 h-px bg-slate-200" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#800A15]" />
                        <div className="flex-1 h-px bg-slate-200" />
                    </div>
                );
                return <div className="flex-1 h-px bg-slate-200 py-2" />;
            }

            case 'espaciador': {
                const h = parseInt(bloque.content.height || '40');
                return (
                    <div className="flex flex-col items-center justify-center" style={{ height: `${h}px` }}>
                        <div className="w-full h-px border border-dashed border-slate-200" />
                        <span className="text-[9px] text-slate-300 font-bold mt-1">{h}px de espacio</span>
                    </div>
                );
            }

            case 'imagen':
                return bloque.content.url ? (
                    <figure className="space-y-2 w-full">
                        <div className="w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                            <img src={bloque.content.url} alt={bloque.content.caption || ''} className="w-full h-auto max-h-[400px] object-cover" />
                        </div>
                        {bloque.content.caption && (
                            <figcaption className="text-center text-xs text-slate-400 font-semibold italic">{bloque.content.caption}</figcaption>
                        )}
                    </figure>
                ) : (
                    <div className="w-full aspect-[21/9] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 space-y-2 select-none">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-2xs flex items-center justify-center border border-slate-200">
                            <Image className="w-6 h-6 text-slate-400" />
                        </div>
                        <div>
                            <span className="block text-xs font-bold text-slate-700">Subir imagen en el panel derecho</span>
                            <span className="block text-[10px] text-slate-400">Selecciona este bloque y usa "Ajustes del Bloque"</span>
                        </div>
                    </div>
                );

            case 'video': {
                const directSrc = bloque.content._videoPreviewUrl
                    || (bloque.content.videoFile ? `/storage/${bloque.content.videoFile}` : null);
                const posterUrl = bloque.content.poster || getYouTubeThumbnailUrl(bloque.content.url || '');
                if (directSrc) {
                    return <video src={directSrc} controls poster={posterUrl || undefined} className="w-full rounded-2xl border border-slate-200 bg-slate-900" style={{ maxHeight: '360px' }} />;
                }
                return (
                    <div
                        className="aspect-video rounded-2xl relative flex items-center justify-center cursor-pointer select-none overflow-hidden"
                        style={posterUrl
                            ? { backgroundImage: `url(${posterUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                            : { backgroundColor: '#0f172a' }}
                    >
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="relative z-10 w-16 h-16 rounded-full bg-white/20 border border-white/40 backdrop-blur-sm flex items-center justify-center shadow-xl">
                            <svg className="w-6 h-6 fill-white ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                        {bloque.content.url && (
                            <div className="absolute top-3 left-3 bg-black/60 border border-white/10 px-2.5 py-1 rounded-full text-white text-[9px] font-bold z-10">
                                YouTube
                            </div>
                        )}
                        {!bloque.content.url && (
                            <div className="absolute bottom-3 text-white/60 text-[10px] font-bold z-10">Sin video aún — configura en el panel →</div>
                        )}
                    </div>
                );
            }

            default:
                return (
                    <div className="py-6 text-center text-slate-400 text-xs italic">
                        Bloque «{bloque.tipo}» — configura en el panel derecho
                    </div>
                );
        }
    }

    return (
        <div
            onClick={onSelect}
            className="transition-all duration-300 relative group cursor-default select-none w-full"
        >
            <div
                className={`w-full ${radiusCls} border transition duration-300 ${paddingCls} ${shadowCls} text-left ${
                    isSelected
                        ? 'border-blue-600 bg-white ring-4 ring-blue-500/10'
                        : 'border-slate-200 bg-slate-50/20 hover:bg-slate-50/50 hover:border-slate-300/80 hover:shadow-xs'
                }`}
                style={{ backgroundColor: bgColor, ...minHeightStyle }}
            >
                {isSelected && !previewMode && (
                    <BlockToolbar
                        bloque={bloque}
                        index={index}
                        badge={badge}
                        Icon={IconComponent}
                        onDelete={() => onDelete(bloque.id)}
                        onDuplicate={() => onDuplicate(bloque.id)}
                        onMoveUp={() => onMove(bloque.id, 'up')}
                        onMoveDown={() => onMove(bloque.id, 'down')}
                        onUpdateWidth={(w) => onUpdateWidth(bloque.id, w)}
                    />
                )}

                <div
                    className={`transition-all ${previewMode ? '' : 'pointer-events-none'}`}
                    style={Object.keys(contentStyle).length > 0 ? contentStyle : undefined}
                >
                    {renderBlockContent()}
                </div>

                {isSelected && !previewMode && (
                    <ResizableHandles onResizeStart={handleResizeStart} />
                )}
            </div>
        </div>
    );
}
