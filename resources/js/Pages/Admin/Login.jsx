import { Head, useForm } from '@inertiajs/react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        usuario: '',
        password: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(window.location.pathname, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Acceso Administrativo" />
            <div className="min-h-screen bg-[#08111F] flex items-center justify-center px-4">
                <div className="w-full max-w-sm">
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-8 gap-3">
                        <img src="/Logo COLSIH.svg" alt="COLSIH" className="h-16 w-auto" />
                        <p className="text-white/40 text-xs tracking-widest uppercase">Panel Administrativo</p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5 backdrop-blur-md">
                        <div>
                            <label className="block text-sm font-semibold text-white/70 mb-1.5">Usuario</label>
                            <input
                                type="text"
                                value={data.usuario}
                                onChange={e => setData('usuario', e.target.value)}
                                autoComplete="username"
                                required
                                className="w-full bg-white/10 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                            />
                            {errors.usuario && <p className="mt-1 text-xs text-red-400">{errors.usuario}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white/70 mb-1.5">Contraseña</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                autoComplete="current-password"
                                required
                                className="w-full bg-white/10 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#0057D9] hover:bg-blue-600 disabled:opacity-50 text-white font-bold rounded-xl py-2.5 text-sm transition cursor-pointer"
                        >
                            {processing ? 'Verificando…' : 'Ingresar'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
