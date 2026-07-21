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
            <Head title="Acceso Administrativo | COLSIH" />
            <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center px-4 relative overflow-hidden font-sans">
                {/* Decorative background shapes */}
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-[120px] pointer-events-none z-0"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-[130px] pointer-events-none z-0"></div>
                
                {/* Stylized background grid pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ 
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
                    backgroundSize: '24px 24px' 
                }}></div>

                <div className="w-full max-w-[440px] relative z-10">
                    {/* Card container */}
                    <div className="bg-white border border-slate-100 rounded-[32px] p-10 shadow-[0_20px_60px_rgba(31,41,55,0.06)] backdrop-blur-sm">
                        {/* Logo & Header */}
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <img src="/Logo COLSIH.svg" alt="COLSIH" className="h-12 w-auto object-contain" />
                                <div className="h-6 w-[1px] bg-slate-200"></div>
                                <span className="text-[10px] font-bold tracking-[1.5px] uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                                    ADMIN v9.6.1
                                </span>
                            </div>
                            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                                ¡Bienvenido de nuevo!
                            </h1>
                            <p className="text-slate-400 text-xs mt-1.5 font-medium">
                                Ingresa al panel de gestión del Colegio
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Usuario
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nombre de usuario"
                                    value={data.usuario}
                                    onChange={e => setData('usuario', e.target.value)}
                                    autoComplete="username"
                                    required
                                    className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition duration-200 font-medium"
                                />
                                {errors.usuario && (
                                    <p className="mt-1.5 text-xs text-red-500 font-semibold">{errors.usuario}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••••••"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    autoComplete="current-password"
                                    required
                                    className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition duration-200 font-medium"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold rounded-2xl py-3.5 text-sm transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 cursor-pointer active:scale-[0.98]"
                            >
                                {processing ? 'Autenticando…' : 'Iniciar Sesión'}
                            </button>
                        </form>
                    </div>

                    {/* Footer note */}
                    <div className="text-center mt-6">
                        <p className="text-slate-400 text-xs font-medium">
                            Colegio Santa Isabel de Hungría &copy; {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
