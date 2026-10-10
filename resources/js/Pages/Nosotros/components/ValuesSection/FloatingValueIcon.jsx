import React from 'react';
import { 
    Sun, 
    HandHelping, 
    Heart, 
    ShieldCheck, 
    Smile, 
    Users, 
    Lightbulb, 
    HeartHandshake, 
    Star, 
    Sparkles 
} from 'lucide-react';

const ICON_MAP = {
    Sun,
    HandHelping,
    Heart,
    ShieldCheck,
    Smile,
    Users,
    Lightbulb,
    HeartHandshake,
    Star,
    Sparkles,
};

export default function FloatingValueIcon({ iconName, alignment, index }) {
    // Búsqueda dinámica con fallback seguro
    const IconComponent = ICON_MAP[iconName] || Sparkles;

    // Alternar colores institucionales: vino tinto / azul rey
    const isVino = index % 2 === 0;
    const bgClass = isVino 
        ? 'bg-[#800A15] shadow-red-900/20 text-white' 
        : 'bg-[#001659] shadow-blue-900/20 text-white';

    // Posicionamiento responsive sin desborde
    const positionClass = alignment === 'left'
        ? 'md:-left-8 md:top-1/2 md:-translate-y-1/2'
        : 'md:-right-8 md:top-1/2 md:-translate-y-1/2';

    return (
        <div 
            className={`absolute top-4 right-4 md:top-auto md:bottom-auto ${positionClass} z-20 w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-900 transition-transform duration-300 hover:scale-110 will-change-transform ${bgClass}`}
        >
            <IconComponent className="w-4.5 h-4.5 md:w-7 md:h-7" />
        </div>
    );
}
