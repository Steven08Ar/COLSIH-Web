import { useState } from 'react';
import { Map, MapPin, X, ChevronUp, ChevronDown } from 'lucide-react';

export default function TourMap({
    scenes = [],
    activeSceneSlug = null,
    onSelectScene = null,
    mapImageUrl = '/recorrido_virtual/plano_colegio.png'
}) {
    const [isExpanded, setIsExpanded] = useState(true);

    if (!scenes || scenes.length === 0) return null;

    const activeScene = scenes.find((s) => s.slug === activeSceneSlug);

    // Fallback default percentages if backend scene doesn't specify x_porcentaje / y_porcentaje
    const getCoordinates = (scene, index, total) => {
        if (typeof scene.x_porcentaje === 'number' && typeof scene.y_porcentaje === 'number') {
            return { x: scene.x_porcentaje, y: scene.y_porcentaje };
        }

        // Auto distribute in a grid layout across map canvas if x/y not set
        const cols = Math.ceil(Math.sqrt(total));
        const row = Math.floor(index / cols);
        const col = index % cols;

        const x = Math.round(15 + (col / Math.max(1, cols - 1)) * 70);
        const y = Math.round(15 + (row / Math.max(1, Math.ceil(total / cols) - 1)) * 70);

        return { x, y };
    };

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
            {/* Toggle Expand / Collapse Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-slate-900/90 hover:bg-slate-900 border border-white/20 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold transition-all duration-300 hover:scale-105 cursor-pointer mb-2"
                aria-label="Alternar plano aéreo"
            >
                <Map className="w-4 h-4 text-blue-400" />
                <span>{isExpanded ? 'Ocultar Plano Aéreo' : 'Plano Aéreo'}</span>
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>

            {/* Expandable Map Panel */}
            {isExpanded && (
                <div className="w-[320px] sm:w-[380px] h-[240px] sm:h-[280px] bg-slate-950/90 border border-white/20 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative transition-all duration-300 animate-fadeIn">
                    
                    {/* Header bar */}
                    <div className="absolute top-0 left-0 right-0 z-20 px-4 py-2 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
                            Mapa Interactivo
                        </span>
                        <span className="text-xs font-bold text-white truncate max-w-[180px]">
                            {activeScene?.nombre || 'Colegio COLSIH'}
                        </span>
                    </div>

                    {/* Map Background Canvas */}
                    <div className="relative w-full h-full pt-8 pb-2 px-2 flex items-center justify-center overflow-hidden">
                        {/* Background map image or fallback grid pattern */}
                        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
                            <img
                                src={mapImageUrl}
                                alt="Plano Aéreo del Colegio"
                                className="w-full h-full object-cover opacity-60"
                                onError={(e) => {
                                    // Fallback styled SVG grid if map image file doesn't exist
                                    e.target.style.display = 'none';
                                }}
                            />
                            
                            {/* Stylized architectural grid background */}
                            <div
                                className="absolute inset-0 opacity-20 pointer-events-none"
                                style={{
                                    backgroundImage: 'radial-gradient(#3b82f6 1.5px, transparent 1.5px)',
                                    backgroundSize: '16px 16px'
                                }}
                            />

                            {/* Scene Pin Markers */}
                            {scenes.map((scene, idx) => {
                                const isActive = scene.slug === activeSceneSlug;
                                const { x, y } = getCoordinates(scene, idx, scenes.length);

                                return (
                                    <div
                                        key={scene.slug || idx}
                                        onClick={() => onSelectScene && onSelectScene(scene.slug)}
                                        style={{ left: `${x}%`, top: `${y}%` }}
                                        className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
                                    >
                                        {/* Pin Pulse Aura if Active */}
                                        {isActive && (
                                            <span className="absolute -inset-2 rounded-full bg-rose-500/40 animate-ping pointer-events-none"></span>
                                        )}

                                        {/* Pin Button */}
                                        <div
                                            className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                                                isActive
                                                    ? 'bg-[#800A15] text-white scale-125 border-2 border-white ring-4 ring-rose-500/30 z-20'
                                                    : 'bg-blue-600/85 hover:bg-blue-500 text-white hover:scale-110 border border-white/50'
                                            }`}
                                        >
                                            <MapPin className="w-4 h-4" />
                                        </div>

                                        {/* Hover Tooltip displaying scene title */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 whitespace-nowrap">
                                            <div className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-white/20 shadow-2xl">
                                                {scene.nombre}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer helper note */}
                    <div className="absolute bottom-2 left-4 right-4 z-20 flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                        <span>Haz clic en un marcador</span>
                        <span>{scenes.length} espacios</span>
                    </div>
                </div>
            )}
        </div>
    );
}
