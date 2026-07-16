import { motion, useTransform } from 'framer-motion';
import AnimatedBlob from './AnimatedBlob';

export default function OrganicBackground({ mouseX, mouseY }) {
    // Transforms for the giant background circles (zero React re-renders)
    const circle1X = useTransform(mouseX, val => val * 12);
    const circle1Y = useTransform(mouseY, val => val * 12);

    const circle2X = useTransform(mouseX, val => -val * 15);
    const circle2Y = useTransform(mouseY, val => -val * 15);

    return (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
            
            {/* Giant Circles (Opacity 5%) */}
            <motion.div 
                className="absolute w-[800px] h-[800px] rounded-full border border-slate-200/50 opacity-5 -top-[200px] -left-[200px]"
                style={{ x: circle1X, y: circle1Y }}
            />
            <motion.div 
                className="absolute w-[600px] h-[600px] rounded-full border border-slate-200/50 opacity-5 -bottom-[150px] right-[100px]"
                style={{ x: circle2X, y: circle2Y }}
            />

            {/* Subtle Curved SVG Line */}
            <svg 
                className="absolute left-10 top-1/4 w-[40%] h-1/2 opacity-30 text-slate-100 hidden lg:block" 
                viewBox="0 0 400 300" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M 10 50 Q 200 200 380 250" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                />
            </svg>

            {/* Background Parallax Blur Lights (Azul & Rojo) */}
            <AnimatedBlob 
                className="w-96 h-96 bg-[#0057D9]/10 -top-24 -left-24 blur-3xl" 
                mouseX={mouseX} 
                mouseY={mouseY} 
                speed={0.8} 
            />
            <AnimatedBlob 
                className="w-[500px] h-[500px] bg-[#E31C23]/8 bottom-24 -right-12 blur-3xl" 
                mouseX={mouseX} 
                mouseY={mouseY} 
                speed={0.6} 
            />
        </div>
    );
}
