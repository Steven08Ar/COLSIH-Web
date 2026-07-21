import React from 'react';
import { GripVertical, ArrowUp, ArrowDown, Copy, Trash2, Maximize2, Minimize2 } from 'lucide-react';

export default function BlockToolbar({
    bloque,
    index,
    badge,
    Icon,
    onDelete,
    onDuplicate,
    onMoveUp,
    onMoveDown,
    onUpdateWidth
}) {
    return (
        <div 
            className="absolute -top-14 left-6 bg-white border border-slate-200/80 shadow-lg py-2 px-3.5 rounded-2xl flex items-center gap-3.5 z-30 select-none"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Drag Handle simulation */}
            <div className="flex items-center gap-1.5 text-slate-300 hover:text-slate-500 transition cursor-grab active:cursor-grabbing">
                <GripVertical className="w-4 h-4 shrink-0" />
            </div>

            {/* Block Type Badge */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${badge.bg}`}>
                {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                <span>{badge.label}</span>
            </div>

            <div className="h-4 w-px bg-slate-200"></div>

            {/* Block Width toggle layout options */}
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => onUpdateWidth('estrecho')}
                    className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition ${bloque.width === 'estrecho' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'text-slate-400 hover:text-slate-700'}`}
                >
                    33%
                </button>
                <button
                    type="button"
                    onClick={() => onUpdateWidth('mediano')}
                    className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition ${bloque.width === 'mediano' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'text-slate-400 hover:text-slate-700'}`}
                >
                    50%
                </button>
                <button
                    type="button"
                    onClick={() => onUpdateWidth('completo')}
                    className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition ${bloque.width === 'completo' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'text-slate-400 hover:text-slate-700'}`}
                >
                    100%
                </button>
            </div>

            <div className="h-4 w-px bg-slate-200"></div>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5">
                <button 
                    type="button"
                    onClick={onMoveUp}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition cursor-pointer"
                    title="Mover arriba"
                >
                    <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button 
                    type="button"
                    onClick={onMoveDown}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition cursor-pointer"
                    title="Mover abajo"
                >
                    <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button 
                    type="button"
                    onClick={onDuplicate}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                    title="Duplicar bloque"
                >
                    <Copy className="w-3.5 h-3.5" />
                </button>
                <button 
                    type="button"
                    onClick={onDelete}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                    title="Eliminar bloque"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>

        </div>
    );
}
