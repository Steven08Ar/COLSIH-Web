import { motion, useTransform } from 'framer-motion';

export default function AnimatedBlob({ className, mouseX, mouseY, speed = 1 }) {
    // Transform normalized mouse coordinates (-1 to 1) into pixel offsets dynamically
    const x = useTransform(mouseX, val => val * speed * 30);
    const y = useTransform(mouseY, val => val * speed * 30);

    return (
        <motion.div
            className={`absolute rounded-full pointer-events-none ${className}`}
            style={{ x, y }}
        />
    );
}
