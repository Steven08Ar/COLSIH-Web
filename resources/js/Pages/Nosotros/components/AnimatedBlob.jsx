import { motion, useTransform, useMotionValue } from 'framer-motion';

export default function AnimatedBlob({ className, mouseX, mouseY, speed = 1 }) {
    // Fallback MotionValues to prevent any "undefined" get() crashes during mount or hot-reload
    const fallbackX = useMotionValue(0);
    const fallbackY = useMotionValue(0);

    const activeMouseX = mouseX || fallbackX;
    const activeMouseY = mouseY || fallbackY;

    // Transform normalized coordinates (-1 to 1) into pixel offsets dynamically
    const x = useTransform(activeMouseX, val => val * speed * 30);
    const y = useTransform(activeMouseY, val => val * speed * 30);

    return (
        <motion.div
            className={`absolute rounded-full pointer-events-none ${className}`}
            style={{ x, y }}
        />
    );
}
