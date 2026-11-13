import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { PartyPopper, X, ArrowRight } from 'lucide-react';

const STORAGE_KEY = 'colsih_popup_admitidos_2027';

const safeGet = () => {
    try {
        return sessionStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
};

const safeSet = () => {
    try {
        sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
        /* sin almacenamiento: el popup solo se verá una vez por carga */
    }
};

export default function AdmitidosPopup() {
    const [open, setOpen] = useState(false);

    // Aparece una sola vez por sesión, poco después de entrar
    useEffect(() => {
        if (safeGet()) return;
        const t = setTimeout(() => setOpen(true), 1200);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && cerrar();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    const cerrar = () => {
        safeSet();
        setOpen(false);
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={cerrar}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-admitidos-titulo"
        >
            <div
                className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 font-sans"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="h-2 bg-gradient-to-r from-[#003C8F] via-[#003C8F] to-[#800A15]" />

                <button
                    type="button"
                    onClick={cerrar}
                    aria-label="Cerrar"
                    className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="p-7 sm:p-8 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
                        <PartyPopper className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                        <h2 id="popup-admitidos-titulo" className="text-2xl font-extrabold text-[#0B1F3A] leading-tight">
                            ¡Ya está la lista de <span className="text-[#800A15]">admitidos 2027</span>!
                        </h2>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed">
                            Consulta si tu hijo fue admitido y conoce los próximos pasos para completar la matrícula.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                        <Link
                            href="/admitidos-2027"
                            onClick={cerrar}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#800A15] hover:bg-[#9E0D1C] text-white text-sm font-bold shadow-md transition-all duration-300"
                        >
                            <span>Ver lista de admitidos</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                            type="button"
                            onClick={cerrar}
                            className="px-6 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                        >
                            Ahora no
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
