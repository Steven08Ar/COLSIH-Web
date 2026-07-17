import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const directivos = [
    { nombre: 'Sor Gloria María Arbeláez Hoyos', cargo: 'Rectora', descripcion: 'Responsable de la dirección general y el liderazgo pedagógico y formativo de la institución.' },
    { nombre: 'Sor Nancy Venegas Aponte', cargo: 'Directora de Comunidad y Docente', descripcion: 'Líder comunitaria y formadora activa dentro de la propuesta pedagógica salesiana.' },
    { nombre: 'Sor Danyely Bedoya Solarte', cargo: 'Encargada de Pastoral', descripcion: 'Coordinadora de la pastoral y de la formación espiritual de estudiantes, docentes y familias.' },
];

const areas = [
    { nombre: 'Ciencias Naturales', desc: 'Educación ambiental, biología, física y química.' },
    { nombre: 'Ciencias Sociales', desc: 'Historia, geografía, constitución y filosofía.' },
    { nombre: 'Humanidades y Lengua Castellana', desc: 'Comprensión lectora, producción escrita y literatura.' },
    { nombre: 'Humanidades e Idioma Extranjero', desc: 'Formación en lengua extranjera (Inglés).' },
    { nombre: 'Matemáticas y Estadística', desc: 'Pensamiento lógico-matemático y razonamiento cuantitativo.' },
    { nombre: 'Tecnología e Informática', desc: 'Herramientas digitales, programación básica y tecnología aplicada.' },
    { nombre: 'Educación Física y Deportes', desc: 'Desarrollo motriz, disciplinas deportivas y recreación saludable.' },
    { nombre: 'Educación Artística', desc: 'Expresión plástica, musical, teatral y corporal.' },
    { nombre: 'Educación Ética y en Valores', desc: 'Formación moral, ciudadanía activa y valores cristianos.' },
    { nombre: 'Área Técnica Comercial (SENA)', desc: 'Énfasis en comercio, contabilidad, finanzas y competencias laborales.' },
];

export default function Equipo() {
    return (
        <AppLayout>
            <Head title="Nuestro Equipo | COLSIH" />

            {/* Header Hero Section */}
            <section className="relative bg-gradient-to-b from-[#08111F] to-[#0D1B2E] pt-32 pb-20 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0, 60, 143,0.12),transparent_60%)]"></div>
                <div className="relative z-10 max-w-[1200px] mx-auto px-6">
                    <nav className="text-sm font-semibold text-slate-400 mb-4 flex items-center justify-center gap-2">
                        <Link href="/nosotros" className="hover:text-white transition-colors">Quiénes Somos</Link>
                        <span>/</span>
                        <span className="text-white">Nuestro Equipo</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-sans">
                        Equipo Institucional
                    </h1>
                </div>
            </section>

            {/* Directivos */}
            <section className="py-20 bg-white">
                <div className="max-w-[1200px] mx-auto px-6 text-left">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-[#08111F] tracking-tight">
                            Equipo Directivo
                        </h2>
                        <div className="w-16 h-1 bg-[#800A15] rounded-full mx-auto mt-4 mb-4"></div>
                        <p className="text-slate-500 font-medium">
                            Comunidad Hijas de María Auxiliadora y directivos al frente de la administración escolar.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {directivos.map((persona) => (
                            <div key={persona.nombre} className="bg-slate-50 border border-slate-100 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between hover:border-slate-200 transition-all">
                                <div>
                                    <div className="w-10 h-10 rounded-xl bg-[#003C8F]/10 text-[#003C8F] flex items-center justify-center mb-6">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#08111F] mb-1 font-sans">{persona.nombre}</h3>
                                    <span className="inline-block text-xs font-extrabold text-[#800A15] uppercase tracking-wider mb-4">
                                        {persona.cargo}
                                    </span>
                                    <p className="text-slate-500 text-sm font-semibold leading-relaxed">
                                        {persona.descripcion}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Docentes / Áreas */}
            <section className="py-20 bg-slate-50/50 border-t border-slate-100">
                <div className="max-w-[1200px] mx-auto px-6 text-left">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-[#08111F] tracking-tight">
                            Áreas de Formación
                        </h2>
                        <div className="w-16 h-1 bg-[#800A15] rounded-full mx-auto mt-4 mb-4"></div>
                        <p className="text-slate-500 font-medium">
                            Nuestros educadores son profesionales altamente capacitados comprometidos con cada asignatura.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {areas.map((area, idx) => (
                            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs flex items-start gap-4">
                                <span className="w-8 h-8 rounded-lg bg-[#800A15]/5 text-[#800A15] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                    0{idx + 1}
                                </span>
                                <div>
                                    <h4 className="font-bold text-[16px] text-[#08111F] mb-1 font-sans">{area.nombre}</h4>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{area.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Navigation Tabs */}
            <nav className="py-12 bg-white border-t border-slate-100 flex items-center justify-center gap-6">
                <Link href="/nosotros/valores" className="text-sm font-bold text-slate-500 hover:text-[#800A15] transition-colors flex items-center gap-1.5">
                    ← Valores Corporativos
                </Link>
                <span className="text-slate-300">|</span>
                <Link href="/" className="text-sm font-bold text-[#08111F] hover:text-[#800A15] transition-colors flex items-center gap-1.5">
                    Ir al Inicio →
                </Link>
            </nav>
        </AppLayout>
    );
}
