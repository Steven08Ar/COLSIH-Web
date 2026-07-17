import { motion } from 'framer-motion';

export default function VideoButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center gap-3.5 group cursor-pointer focus:outline-none py-2 text-left"
        >
            <motion.span
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-12 h-12 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-[#08111F] group-hover:bg-slate-50 transition-all shrink-0"
            >
                <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
            </motion.span>
            <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-[#08111F] group-hover:text-[#800A15] transition-colors">
                    Ver video
                </span>
                <span className="text-[11px] font-semibold text-slate-400 mt-1">
                    Conoce nuestra esencia
                </span>
            </div>
        </button>
    );
}
