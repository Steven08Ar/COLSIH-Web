import React from 'react';
import { Sparkles, Plus } from 'lucide-react';

export default function EmptyState({ onAddBlock }) {
    return (
        <div className="w-full py-24 px-6 my-4 select-none">
            <div className="max-w-md mx-auto text-center space-y-6">
                
                {/* Visual Icon Illustration */}
                <div className="w-20 h-20 mx-auto rounded-[24px] bg-blue-50 border border-blue-100 flex items-center justify-center shadow-xs animate-bounce-slow">
                    <Sparkles className="w-8 h-8 text-blue-600" />
                </div>

                <div className="space-y-2">
                    <h3 className="text-slate-800 font-extrabold text-lg">Tu lienzo de composición está vacío</h3>
                    <p className="text-slate-400 text-xs font-semibold leading-relaxed">
                        Crea una experiencia de lectura moderna agregando elementos desde la barra superior o haciendo clic en el siguiente botón rápido.
                    </p>
                </div>

                <div className="pt-2 flex justify-center">
                    <button 
                        type="button"
                        onClick={() => onAddBlock('hero')}
                        className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition duration-150 active:scale-95 cursor-pointer shadow-md shadow-blue-500/10"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Agregar Sección Hero</span>
                    </button>
                </div>

            </div>
        </div>
    );
}
