import React, { useState } from 'react';
import EditorBlock from './EditorBlock';
import EmptyState from './EmptyState';
import { Plus, Calendar } from 'lucide-react';

export default function EditorCanvas({
    blocks,
    selectedBlockId,
    onSelectBlock,
    onUpdateBlock,
    onDeleteBlock,
    onDuplicateBlock,
    onMoveBlock,
    onUpdateBlockWidth,
    canvasWidth,
    previewMode,
    onAddBlock,
    
    metaTitle,
    metaResumen,
    metaCategoria,
    metaPublicadoEn,
    metaPortada,
    onReorder
}) {
    const [dragOverIdx, setDragOverIdx] = useState(null);

    const widthClasses = {
        desktop: 'max-w-[1200px] w-full',
        tablet: 'max-w-[768px] w-full',
        mobile: 'max-w-[390px] w-full'
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'Fecha de Hoy';
        try {
            return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-CO', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch {
            return dateStr;
        }
    };

    const categoryLabel = {
        noticia: 'Noticia',
        evento: 'Evento',
        comunicado: 'Comunicado'
    };

    const getCategoryStyles = (cat) => {
        if (cat === 'evento') return 'bg-amber-50 text-amber-600 border-amber-100';
        if (cat === 'comunicado') return 'bg-rose-50 text-rose-600 border-rose-100';
        return 'bg-blue-50 text-blue-600 border-blue-100';
    };

    // Drag-and-drop handlers
    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        setDragOverIdx(index);
    };

    const handleDrop = (e, index) => {
        const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
        if (!isNaN(dragIndex) && dragIndex !== index) {
            onReorder(dragIndex, index);
        }
        setDragOverIdx(null);
    };

    return (
        <div 
            className={`transition-all duration-300 min-h-[calc(100vh-160px)] bg-white shadow-xl rounded-[36px] border border-slate-200/60 p-10 flex flex-col h-fit relative ${widthClasses[canvasWidth]}`}
        >
            {/* Header: Replicating Show.jsx faithfully */}
            <header className="space-y-4 text-left border-b border-slate-100 pb-6 mb-8 select-none">
                <span className={`inline-block text-[11px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full border ${getCategoryStyles(metaCategoria)}`}>
                    {categoryLabel[metaCategoria] || 'Noticia'}
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-[#08111F] leading-tight">
                    {metaTitle || 'Título de la Publicación'}
                </h1>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{formatDate(metaPublicadoEn)}</span>
                </div>
            </header>

            {/* Cover image: Replicating Show.jsx faithfully */}
            {metaPortada && (
                <div className="w-full rounded-[32px] overflow-hidden border border-slate-100 shadow-md mb-8 aspect-[21/9] select-none">
                    <img src={metaPortada} alt={metaTitle} className="w-full h-full object-cover" />
                </div>
            )}

            {/* Resumen/copete box: Replicating Show.jsx faithfully */}
            {metaResumen && (
                <div className="border-l-4 border-[#800A15] pl-6 py-1.5 text-left mb-8 select-none">
                    <p className="text-lg md:text-[22px] font-bold text-slate-700 leading-relaxed">
                        {metaResumen}
                    </p>
                </div>
            )}

            {/* Flex-wrap layout block container to allow side-by-side positioning (50% and 50% blocks) */}
            <div className="flex-grow">
                <div className="flex flex-wrap -mx-3 items-start">
                    {blocks.length === 0 ? (
                        <EmptyState onAddBlock={onAddBlock} />
                    ) : (
                        blocks.map((bloque, idx) => (
                            <div
                                key={bloque.id}
                                draggable={!previewMode}
                                onDragStart={(e) => handleDragStart(e, idx)}
                                onDragOver={(e) => handleDragOver(e, idx)}
                                onDrop={(e) => handleDrop(e, idx)}
                                className={`transition-all duration-200 ${
                                    dragOverIdx === idx ? 'border-2 border-dashed border-blue-400 opacity-60' : ''
                                } ${
                                    bloque.width === 'estrecho' ? 'w-full md:w-1/3 px-3 mb-6' : (bloque.width === 'mediano' ? 'w-full md:w-1/2 px-3 mb-6' : 'w-full px-3 mb-6')
                                }`}
                            >
                                <EditorBlock
                                    bloque={bloque}
                                    index={idx}
                                    isSelected={selectedBlockId === bloque.id}
                                    onSelect={() => !previewMode && onSelectBlock(bloque.id)}
                                    onUpdate={onUpdateBlock}
                                    onDelete={onDeleteBlock}
                                    onDuplicate={onDuplicateBlock}
                                    onMove={onMoveBlock}
                                    onUpdateWidth={onUpdateBlockWidth}
                                    previewMode={previewMode}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add block helper at the bottom */}
            {!previewMode && (
                <div className="mt-12 pt-6 border-t border-slate-100 flex justify-center">
                    <button 
                        type="button"
                        onClick={() => onAddBlock('texto')}
                        className="flex items-center gap-2 px-6 py-3.5 bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl text-slate-500 hover:text-blue-600 text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Añadir nuevo bloque</span>
                    </button>
                </div>
            )}

            {/* Canvas Footer simulation */}
            <div className="mt-20 pt-8 border-t border-slate-100 text-center select-none opacity-30">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© Colegio Santa Isabel de Hungría</p>
            </div>
        </div>
    );
}
