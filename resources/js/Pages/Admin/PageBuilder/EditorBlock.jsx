import BlockToolbar from './BlockToolbar';
import ResizableHandles from './ResizableHandles';
import { Type, Heading, Image, Video, Quote, HelpCircle, CreditCard, PlaySquare } from 'lucide-react';

const BLOCK_BADGES = {
    hero: { label: 'Hero Section', icon: StarBadge, bg: 'bg-indigo-50 border-indigo-100 text-indigo-700' },
    texto: { label: 'Párrafo de Texto', icon: Type, bg: 'bg-blue-50 border-blue-100 text-blue-700' },
    titulo: { label: 'Título de Sección', icon: Heading, bg: 'bg-amber-50 border-amber-100 text-amber-700' },
    imagen: { label: 'Imagen', icon: Image, bg: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
    video: { label: 'Video Integrado', icon: Video, bg: 'bg-purple-50 border-purple-100 text-purple-700' },
    cita: { label: 'Cita Destacada', icon: Quote, bg: 'bg-rose-50 border-rose-100 text-rose-700' },
    faq: { label: 'Preguntas FAQ', icon: HelpCircle, bg: 'bg-teal-50 border-teal-100 text-teal-700' },
    cards: { label: 'Fichas en Grid', icon: CreditCard, bg: 'bg-cyan-50 border-cyan-100 text-cyan-700' },
    boton: { label: 'Botón CTA', icon: PlaySquare, bg: 'bg-indigo-50 border-indigo-100 text-indigo-700' }
};

function StarBadge(props) {
    return (
        <svg {...props} className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.198-.39.757-.39.955 0l3.053 6.007 6.368.852c.437.06.611.58.282.879l-4.74 4.316 1.417 6.134c.101.44-.372.785-.758.556L12 19.315l-5.362 2.923c-.386.23-.859-.116-.758-.556l1.417-6.134-4.74-4.316c-.329-.3-.155-.82.282-.879l6.368-.852 3.053-6.007z" />
        </svg>
    );
}

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
    previewMode
}) {
    const badge = BLOCK_BADGES[bloque.tipo] || { label: 'Bloque', icon: Type, bg: 'bg-slate-50 border-slate-100 text-slate-700' };
    const IconComponent = badge.icon;

    // Render contents inside the editor card dynamically
    function renderBlockContent() {
        switch (bloque.tipo) {
            case 'hero':
                return (
                    <div className="space-y-6">
                        {bloque.content.tagline && (
                            <span className="inline-block bg-indigo-100/60 border border-indigo-200 text-indigo-600 font-extrabold text-[10px] uppercase tracking-widest px-4 py-1 rounded-full">
                                {bloque.content.tagline}
                            </span>
                        )}
                        <input
                            type="text"
                            value={bloque.content.title || ''}
                            onChange={(e) => onUpdate(bloque.id, { title: e.target.value })}
                            className="w-full text-3xl md:text-5xl font-black text-slate-800 focus:outline-none bg-transparent"
                            placeholder="Escribe el título aquí..."
                        />
                        <textarea
                            value={bloque.content.subtitle || ''}
                            onChange={(e) => onUpdate(bloque.id, { subtitle: e.target.value })}
                            rows={2}
                            className="w-full text-slate-500 font-medium text-base md:text-lg focus:outline-none bg-transparent resize-none leading-relaxed"
                            placeholder="Escribe el subtítulo descriptivo aquí..."
                        />
                        {bloque.content.buttonText && (
                            <button
                                type="button"
                                className="px-6 py-3 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer select-none"
                                style={{ backgroundColor: bloque.content.buttonColor }}
                            >
                                {bloque.content.buttonText}
                            </button>
                        )}
                    </div>
                );

            case 'texto':
                return (
                    <textarea
                        value={bloque.content.text || ''}
                        onChange={(e) => onUpdate(bloque.id, { text: e.target.value })}
                        className="w-full text-slate-600 focus:outline-none bg-transparent resize-none leading-relaxed font-medium"
                        placeholder="Comienza a escribir párrafos..."
                        style={{
                            fontSize: bloque.styles.fontSize || '16px',
                            fontWeight: bloque.styles.fontWeight || '400',
                            color: bloque.styles.textColor || '#475569',
                            textAlign: bloque.styles.align || 'left'
                        }}
                        rows={3}
                    />
                );

            case 'titulo':
                return (
                    <input
                        type="text"
                        value={bloque.content.text || ''}
                        onChange={(e) => onUpdate(bloque.id, { text: e.target.value })}
                        className="w-full font-black text-slate-800 focus:outline-none bg-transparent text-left"
                        placeholder="Título intermedio..."
                        style={{
                            fontSize: bloque.styles.fontSize || '28px',
                            color: bloque.styles.textColor || '#0f172a'
                        }}
                    />
                );

            case 'cita':
                return (
                    <div className="border-l-4 border-blue-600 pl-6 space-y-3">
                        <textarea
                            value={bloque.content.quote || ''}
                            onChange={(e) => onUpdate(bloque.id, { quote: e.target.value })}
                            className="w-full text-slate-700 italic font-semibold text-lg md:text-xl focus:outline-none bg-transparent resize-none leading-relaxed"
                            placeholder="Escribe la cita..."
                            rows={2}
                        />
                        <input
                            type="text"
                            value={bloque.content.author || ''}
                            onChange={(e) => onUpdate(bloque.id, { author: e.target.value })}
                            className="w-full text-slate-400 font-bold text-xs uppercase tracking-wider focus:outline-none bg-transparent"
                            placeholder="Nombre del autor"
                        />
                    </div>
                );

            case 'cards':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {(bloque.content.items || []).map((card, i) => (
                            <div key={i} className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl space-y-3 text-left shadow-2xs hover:shadow-xs transition duration-300">
                                <span className="inline-block bg-blue-100 text-blue-600 font-extrabold text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-md">
                                    {card.badge}
                                </span>
                                <h4 className="font-extrabold text-sm text-slate-800">{card.title}</h4>
                                <p className="text-slate-500 text-xs font-semibold leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                );

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
                if (directSrc) {
                    return (
                        <video
                            src={directSrc}
                            controls
                            className="w-full rounded-2xl border border-slate-200 bg-slate-900"
                            style={{ maxHeight: '360px' }}
                        />
                    );
                }
                return (
                    <div className="aspect-video bg-slate-900 border border-slate-800 rounded-2xl relative flex items-center justify-center cursor-pointer select-none">
                        <div className="w-16 h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shadow-xl">
                            <svg className="w-6 h-6 fill-white ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                        <div className="absolute top-4 left-4 bg-black/60 border border-white/10 px-3 py-1 rounded-full text-white text-[10px] font-bold">
                            {bloque.content.url ? 'YouTube · ' + bloque.content.url.slice(0, 30) + '…' : 'Sin video aún'}
                        </div>
                    </div>
                );
            }

            default:
                return (
                    <div className="py-6 text-center text-slate-400 text-xs italic">
                        Visualización del bloque {bloque.tipo} preparado
                    </div>
                );
        }
    }

    return (
        <div 
            onClick={onSelect}
            className="transition-all duration-300 relative group cursor-default select-none w-full"
        >
            {/* Outline highlight */}
            <div 
                className={`w-full rounded-[24px] border transition duration-300 p-8 text-left ${
                    isSelected 
                        ? 'border-blue-600 bg-white ring-4 ring-blue-500/10' 
                        : 'border-slate-200 bg-slate-50/20 hover:bg-slate-50/50 hover:border-slate-300/80 hover:shadow-xs'
                }`}
                style={{
                    backgroundColor: bloque.styles.bgGradient ? undefined : '#ffffff'
                }}
            >
                {/* Visual drag handle and selector float toolbar */}
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

                {/* Block Content Renderer */}
                <div className={`transition-all ${previewMode ? '' : 'pointer-events-none'}`}>
                    {renderBlockContent()}
                </div>

                {/* Resize Figma handles */}
                {isSelected && !previewMode && <ResizableHandles />}

            </div>
        </div>
    );
}
