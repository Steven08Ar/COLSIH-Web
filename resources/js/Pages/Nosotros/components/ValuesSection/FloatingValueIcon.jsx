import React from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingValueIcon({ iconName, alignment, index }) {
    // Dynamic icon lookup with a safe fallback
    const IconComponent = LucideIcons[iconName] || LucideIcons.Sparkles;

    // Alternating institutional colors: odd cards = Vino tinto, even cards = Azul rey
    const isVino = index % 2 === 0;
    const bgClass = isVino 
        ? 'bg-[#800A15] shadow-red-500/20 text-white' 
        : 'bg-[#003C8F] shadow-blue-500/20 text-white';

    // Position styling: overlap left or right on desktop, sit top-right inside card on mobile
    const positionClass = alignment === 'left'
        ? 'md:-left-8 md:top-1/2 md:-translate-y-1/2'
        : 'md:-right-8 md:top-1/2 md:-translate-y-1/2';

    return (
        <motion.div 
            animate={{ 
                y: ["-50%", "-58%", "-50%"]
            }}
            transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: index * 0.3
            }}
            className={`absolute top-4 right-4 md:top-auto md:bottom-auto ${positionClass} z-20 w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-slate-900 ${bgClass}`}
        >
            <IconComponent className="w-4.5 h-4.5 md:w-7 md:h-7" />
        </motion.div>
    );
}
