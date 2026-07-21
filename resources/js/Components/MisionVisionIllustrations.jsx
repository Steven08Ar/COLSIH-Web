import React from 'react';

// Illustration 3D-like Clay style for Mission (Rocket launching)
export function MissionRocket({ className = 'w-full h-full' }) {
    return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                {/* Gradients */}
                <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="60%" stopColor="#E2E8F0" />
                    <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>
                <linearGradient id="rocketAccents" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#800A15" />
                    <stop offset="100%" stopColor="#4A050B" />
                </linearGradient>
                <linearGradient id="rocketFins" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#003C8F" />
                    <stop offset="100%" stopColor="#001C47" />
                </linearGradient>
                <linearGradient id="fireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.3" />
                </linearGradient>
                {/* Glow & Shadow Filter */}
                <filter id="clayShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.15" />
                </filter>
            </defs>

            {/* Launching Clouds */}
            <g opacity="0.85">
                <circle cx="100" cy="165" r="30" fill="url(#cloudGrad)" />
                <circle cx="70" cy="155" r="22" fill="url(#cloudGrad)" />
                <circle cx="130" cy="155" r="22" fill="url(#cloudGrad)" />
                <circle cx="50" cy="165" r="15" fill="url(#cloudGrad)" />
                <circle cx="150" cy="165" r="15" fill="url(#cloudGrad)" />
            </g>

            {/* Fire Flame */}
            <path d="M85 130 C85 160 100 185 100 185 C100 185 115 160 115 130 Z" fill="url(#fireGrad)" opacity="0.9" />
            <path d="M92 130 C92 150 100 170 100 170 C100 170 108 150 108 130 Z" fill="#FFE800" opacity="0.9" />

            {/* Rocket Model */}
            <g filter="url(#clayShadow)">
                {/* Rocket Fins */}
                <path d="M75 100 L55 125 C50 130 60 135 70 130 L78 115 Z" fill="url(#rocketFins)" />
                <path d="M125 100 L145 125 C150 130 140 135 130 130 L122 115 Z" fill="url(#rocketFins)" />
                <path d="M100 110 L95 135 C95 138 105 138 105 135 Z" fill="url(#rocketFins)" />

                {/* Main Body */}
                <path d="M100 25 C125 55 125 110 120 125 C120 128 80 128 80 125 C75 110 75 55 100 25 Z" fill="url(#rocketBody)" />

                {/* Rocket Nose Cone */}
                <path d="M100 25 C112 40 115 55 115 65 C115 65 85 65 85 65 C85 55 88 40 100 25 Z" fill="url(#rocketAccents)" />

                {/* Window and Glass */}
                <circle cx="100" cy="85" r="16" fill="url(#rocketFins)" />
                <circle cx="100" cy="85" r="12" fill="#E2E8F0" />
                <circle cx="97" cy="82" r="3" fill="#FFFFFF" />

                {/* Decorative horizontal stripes */}
                <path d="M82 112 C88 115 112 115 118 112" stroke="url(#rocketAccents)" strokeWidth="3" strokeLinecap="round" />
            </g>
        </svg>
    );
}

// Illustration 3D-like Clay style for Vision (Binoculars looking at horizon)
export function VisionBinoculars({ className = 'w-full h-full' }) {
    return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                {/* Gradients */}
                <linearGradient id="binocBody" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                <linearGradient id="binocAccents" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E293B" />
                    <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <linearGradient id="lensGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="50%" stopColor="#0EA5E9" />
                    <stop offset="100%" stopColor="#0369A1" />
                </linearGradient>
                <linearGradient id="cloudGradVision" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
                {/* Shadow */}
                <filter id="binocShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.12" />
                </filter>
            </defs>

            {/* Background horizon lines / Vision field */}
            <path d="M30 110 C60 90 140 90 170 110" stroke="url(#cloudGradVision)" strokeWidth="6" strokeLinecap="round" />
            <path d="M45 125 C75 110 125 110 155 125" stroke="url(#cloudGradVision)" strokeWidth="4" strokeLinecap="round" />

            {/* Floating Stars */}
            <path d="M140 45 L143 52 L150 53 L145 58 L147 65 L140 61 L133 65 L135 58 L130 53 L137 52 Z" fill="#FBBF24" opacity="0.7" />
            <path d="M60 65 L61.5 68.5 L65 69 L62.5 71.5 L63.5 75 L60 73 L56.5 75 L57.5 71.5 L55 69 L58.5 68.5 Z" fill="#FBBF24" opacity="0.5" />

            {/* Binoculars */}
            <g filter="url(#binocShadow)">
                {/* Central hinge link */}
                <rect x="92" y="90" width="16" height="35" rx="8" fill="url(#binocAccents)" />
                <rect x="95" y="75" width="10" height="65" rx="5" fill="#64748B" />

                {/* Left Barrel */}
                <g transform="rotate(-4, 100, 110)">
                    {/* Main Tube */}
                    <path d="M52 65 C68 65 72 67 78 85 L84 125 C84 135 48 135 48 125 L50 85 C50 67 51 65 52 65 Z" fill="url(#binocBody)" />
                    {/* Eyepiece cap */}
                    <ellipse cx="64" cy="65" rx="15" ry="8" fill="url(#binocAccents)" />
                    <ellipse cx="64" cy="65" rx="9" ry="4" fill="#475569" />
                    {/* Objective ring */}
                    <path d="M46 123 H86 V132 C86 137 46 137 46 132 Z" fill="url(#binocAccents)" />
                    {/* Glass reflections */}
                    <ellipse cx="66" cy="130" rx="17" ry="6" fill="url(#lensGlass)" />
                    <ellipse cx="62" cy="129" rx="10" ry="3" fill="#FFFFFF" opacity="0.7" />
                </g>

                {/* Right Barrel */}
                <g transform="rotate(4, 100, 110)">
                    {/* Main Tube */}
                    <path d="M148 65 C132 65 128 67 122 85 L116 125 C116 135 152 135 152 125 L150 85 C150 67 149 65 148 65 Z" fill="url(#binocBody)" />
                    {/* Eyepiece cap */}
                    <ellipse cx="136" cy="65" rx="15" ry="8" fill="url(#binocAccents)" />
                    <ellipse cx="136" cy="65" rx="9" ry="4" fill="#475569" />
                    {/* Objective ring */}
                    <path d="M114 123 H154 V132 C154 137 114 137 114 132 Z" fill="url(#binocAccents)" />
                    {/* Glass reflections */}
                    <ellipse cx="134" cy="130" rx="17" ry="6" fill="url(#lensGlass)" />
                    <ellipse cx="130" cy="129" rx="10" ry="3" fill="#FFFFFF" opacity="0.7" />
                </g>

                {/* Central Focus Knob */}
                <rect x="90" y="80" width="20" height="12" rx="3" fill="#475569" />
                <line x1="95" y1="83" x2="105" y2="83" stroke="#94A3B8" strokeWidth="2" />
                <line x1="95" y1="87" x2="105" y2="87" stroke="#94A3B8" strokeWidth="2" />
            </g>
        </svg>
    );
}

// Illustration 3D-like Clay style for Objectives (Target with arrow)
export function ObjectivesTarget({ className = 'w-full h-full' }) {
    return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                {/* Gradients */}
                <linearGradient id="targetRed" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#C2410C" />
                </linearGradient>
                <linearGradient id="targetWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#F1F5F9" />
                </linearGradient>
                <linearGradient id="targetGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <linearGradient id="arrowShaft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>
                {/* Shadow */}
                <filter id="targetShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="14" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.14" />
                </filter>
            </defs>

            {/* Sparkle sparkles */}
            <g opacity="0.6">
                <circle cx="50" cy="50" r="3" fill="#F59E0B" />
                <path d="M50 42 L50 58 M42 50 L58 50" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                
                <circle cx="160" cy="130" r="2" fill="#F59E0B" />
                <path d="M160 124 L160 136 M124 160 C124 160 124 160 124 160" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" />
            </g>

            {/* Target Board */}
            <g filter="url(#targetShadow)" transform="translate(10, 10)">
                {/* Outer Ring - Red/Orange */}
                <circle cx="90" cy="90" r="70" fill="url(#targetWhite)" stroke="url(#targetRed)" strokeWidth="14" />

                {/* Middle Ring - White */}
                <circle cx="90" cy="90" r="45" fill="url(#targetWhite)" />

                {/* Inner Ring - Red */}
                <circle cx="90" cy="90" r="30" fill="url(#targetRed)" />

                {/* Bullseye - Gold */}
                <circle cx="90" cy="90" r="15" fill="url(#targetGold)" />
                <circle cx="87" cy="87" r="4" fill="#FFFFFF" opacity="0.5" />

                {/* Diagonal Arrow hitting bullseye */}
                <g transform="translate(10, -10)">
                    {/* Feathers */}
                    <path d="M160 20 L180 10 L175 30 L168 25 L160 20 Z" fill="#64748B" />
                    <path d="M160 20 L170 38 L150 33 L155 26 L160 20 Z" fill="#475569" />

                    {/* Shaft */}
                    <rect x="80" y="88" width="95" height="4" rx="2" fill="url(#arrowShaft)" transform="rotate(-45, 90, 90)" />

                    {/* Point head buried in the center */}
                    <path d="M85 85 L90 90 L85 95 Z" fill="#1E293B" />
                </g>
            </g>
        </svg>
    );
}
