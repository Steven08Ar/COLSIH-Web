import { useMemo, useState } from 'react';
import { Search, PartyPopper, Users } from 'lucide-react';
import { ADMITIDOS_2027, GRADOS_ADMITIDOS } from '@/data/admitidos2027';

const normalizar = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function AdmitidosSection() {
    const [busqueda, setBusqueda] = useState('');
    const [gradoActivo, setGradoActivo] = useState('todos');

    const grados = useMemo(
        () =>
            Object.entries(GRADOS_ADMITIDOS)
                .map(([key, g]) => ({
                    key,
                    ...g,
                    total: ADMITIDOS_2027.filter((a) => a.gradoKey === key).length,
                }))
                .filter((g) => g.total > 0)
                .sort((a, b) => a.orden - b.orden),
        []
    );

    const grupos = useMemo(() => {
        const q = normalizar(busqueda.trim());
        return grados
            .filter((g) => gradoActivo === 'todos' || gradoActivo === g.key)
            .map((g) => ({
                ...g,
                estudiantes: ADMITIDOS_2027.filter(
                    (a) => a.gradoKey === g.key && (!q || normalizar(a.nombre).includes(q))
                ),
            }))
            .filter((g) => g.estudiantes.length > 0);
    }, [grados, gradoActivo, busqueda]);

    return (
        <div id="admitidos" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-6 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
                        <PartyPopper className="w-6 h-6" />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="text-xl font-bold text-[#0B1F3A] font-sans">Estudiantes admitidos 2027</h3>
                        <p className="text-xs font-medium text-slate-500 font-sans">
                            ¡Bienvenidos a la familia COLSIH! Listado oficial de admitidos por grado.
                        </p>
                    </div>
                </div>
                <div className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-full bg-[#003C8F]/5 text-[#003C8F] text-xs font-bold">
                    <Users className="w-4 h-4" />
                    {ADMITIDOS_2027.length} admitidos
                </div>
            </div>

            <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                    type="search"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por nombre o apellido..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#003C8F] focus:bg-white transition-colors"
                />
            </div>

            <div className="flex flex-wrap gap-2">
                {[{ key: 'todos', nombre: 'Todos', total: ADMITIDOS_2027.length }, ...grados].map((g) => (
                    <button
                        key={g.key}
                        type="button"
                        onClick={() => setGradoActivo(g.key)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            gradoActivo === g.key
                                ? 'bg-[#003C8F] text-white'
                                : 'bg-slate-100 text-[#003C8F] hover:bg-slate-200'
                        }`}
                    >
                        {g.nombre} <span className="opacity-60">({g.total})</span>
                    </button>
                ))}
            </div>

            {grupos.length === 0 ? (
                <p className="text-sm font-medium text-slate-500 text-center py-8">
                    No se encontraron estudiantes con esa búsqueda.
                </p>
            ) : (
                <div className="space-y-6">
                    {grupos.map((g) => (
                        <div key={g.key} className="space-y-3">
                            <h4 className="flex items-center gap-2 text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wide font-sans">
                                {g.nombre}
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[11px] font-bold normal-case tracking-normal">
                                    {g.estudiantes.length}
                                </span>
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {g.estudiantes.map((a) => (
                                    <li
                                        key={a.id}
                                        className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                                    >
                                        <span className="text-xs font-semibold text-slate-700 capitalize">
                                            {a.nombre.toLowerCase()}
                                        </span>
                                        <span className="shrink-0 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold uppercase">
                                            Admitido
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
