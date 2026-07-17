import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function PrimaryButton({ href, children }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="inline-flex shrink-0"
        >
            <Link
                href={href}
                className="inline-flex items-center justify-center bg-[#800A15] hover:bg-[#c4181e] text-white font-extrabold text-sm py-[18px] px-[34px] rounded-full transition-all duration-200 cursor-pointer shadow-lg shadow-red-700/10 group focus:outline-none"
            >
                {children}
                <svg 
                    className="w-4 h-4 ml-1.5 transform transition-transform duration-300 group-hover:translate-x-1.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </motion.div>
    );
}
