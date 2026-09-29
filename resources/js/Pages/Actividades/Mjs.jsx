import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MjsLayout from '@/Layouts/MjsLayout';
import { 
    Sparkles, 
    ArrowDown, 
    ArrowUpRight, 
    Globe, 
    Users, 
    Flame, 
    Heart, 
    Music, 
    Compass, 
    Smile, 
    Calendar, 
    Clock, 
    MapPin, 
    Check, 
    ChevronDown 
} from 'lucide-react';

export default function Mjs() {
    const [faqOpen, setFaqOpen] = useState(null);

    const toggleFaq = (idx) => {
        setFaqOpen(faqOpen === idx ? null : idx);
    };

    const scrollTo = (id) => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    // Espacios e instalaciones destacadas del colegio para el MJS
    const espaciosColegio = [
        { nombre: 'Canchas Polideportivas', desc: 'Escenario para el juego libre, torneos juveniles y dinámicas de integración al aire libre.' },
        { nombre: 'Salones Formativos & Liderazgo', desc: 'Espacios dotados para talleres de crecimiento personal, proyectos y animación grupal.' },
        { nombre: 'Capilla & Espacio Interior', desc: 'Lugar sagrado de recogimiento, oración mariana y encuentro espiritual.' },
        { nombre: 'Zonas Verdes & Convivencia', desc: 'Áreas de descanso, música y diálogo fraterno entre animadores y jóvenes.' },
        { nombre: 'Aulas de Música y Expresión', desc: 'Salones para ensayos del coro juvenil, guitarra, percusión y expresiones culturales.' }
    ];

    // Preguntas frecuentes minimalistas
    const faqs = [
        {
            q: '¿Tengo que ser estudiante del Colegio Santa Isabel de Hungría para pertenecer al MJS?',
            a: '¡No! El MJS es una obra de puertas abiertas para todos. Cualquier niño o joven de Floridablanca y el área metropolitana es bienvenido a integrarse. Las puertas de nuestra sede están abiertas para la comunidad.'
        },
        {
            q: '¿Tiene algún costo pertenecer al Movimiento Juvenil Salesiano?',
            a: 'Es 100% gratuito. Don Bosco fundó su pedagogía para que ningún joven quedara excluido por motivos económicos.'
        },
        {
            q: '¿A partir de qué edad puedo ingresar al movimiento?',
            a: 'Recibimos niños y jóvenes desde los 7 años hasta jóvenes universitarios o profesionales y animadores (hasta 24+ años).'
        },
        {
            q: '¿Dónde está ubicada la sede del Movimiento Juvenil Salesiano?',
            a: 'Nuestra sede central funciona en las instalaciones del Colegio Santa Isabel de Hungría, ubicado en la Calle 11 # 8-15, en el Casco Urbano de Floridablanca, Santander.'
        }
    ];

    return (
        <MjsLayout>
            <Head>
                <title>MJS Floridablanca · Movimiento Juvenil Salesiano | COLSIH</title>
                <meta 
                    name="description" 
                    content="Movimiento Juvenil Salesiano en Floridablanca, Santander y el mundo. Una experiencia transformadora de liderazgo, amistad y alegría viva inspirada en San Juan Bosco." 
                />
            </Head>

            {/* Left Floating Social Dock - Exclusivo Instagram MJS */}
            <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/15 rounded-2xl py-3 px-3 flex-col items-center gap-2 text-white/80 shadow-2xl transition-all duration-300 group">
                <a 
                    href="https://www.instagram.com/mjsbosco_floridablanca/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram Oficial MJS Floridablanca"
                    className="p-2 rounded-xl text-white hover:text-rose-400 hover:scale-125 transition-all"
                    title="@mjsbosco_floridablanca"
                >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                </a>
            </div>

            {/* ========================================================
                HERO SECTION (Clon Estilístico del Mockup: Crimson & Navy)
                ======================================================== */}
            <section 
                id="inicio" 
                className="relative min-h-[92vh] sm:min-h-screen flex items-end pb-16 sm:pb-24 pt-36 bg-[#080D3B] text-white overflow-hidden select-none"
            >
                {/* Background Image con Gradiente y Volumetría */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/marca/mjs-hero.jpg" 
                        alt="Jóvenes Salesianos MJS" 
                        className="w-full h-full object-cover object-center sm:object-right-top filter brightness-[0.75] contrast-[1.05]"
                    />
                    {/* Dark gradient overlay idéntico a la atmósfera del mockup */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080D3B] via-[#080D3B]/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#080D3B] via-[#080D3B]/80 to-transparent" />
                    {/* Volumetric red/crimson glow */}
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#920709]/30 blur-[120px] pointer-events-none" />
                </div>

                {/* Contenido Hero */}
                <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full relative z-10">
                    <div className="flex flex-col lg:flex-row items-end justify-between gap-10">
                        
                        {/* Lado Izquierdo: Titular Gigante Editorial + Descripción */}
                        <div className="max-w-3xl">
                            {/* Titular Principal Estilo "WHERE STYLE SPEAKS VOLUMES." */}
                            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-black uppercase tracking-tighter leading-[0.95] font-['Poppins'] text-white">
                                DONDE LA JUVENTUD<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
                                    HACE HISTORIA.
                                </span>
                            </h1>

                            {/* Línea horizontal minimalista + Párrafo de apoyo */}
                            <div className="flex items-start gap-4 sm:gap-6 pt-6 sm:pt-8 max-w-xl">
                                <div className="w-12 h-[2px] bg-white/40 mt-3 shrink-0" />
                                <p className="text-white/85 text-sm sm:text-base leading-relaxed font-light font-sans">
                                    El Movimiento Juvenil Salesiano en Floridablanca y el mundo. Una experiencia transformadora de liderazgo, amistad y alegría viva inspirada en el carisma de Don Bosco.
                                </p>
                            </div>
                        </div>

                        {/* Lado Derecho: Widget de Prueba Social + Badge de Año + Scroll Button */}
                        <div className="flex flex-col items-start lg:items-end gap-6 sm:gap-8 shrink-0">
                            
                            {/* Widget Flotante de Jóvenes (Estilo "320k Influenced people" del mockup) */}
                            <div className="flex items-center gap-3 bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/20 px-4 py-2.5 rounded-full shadow-2xl transition-all">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-[#FFC606] text-[#080D3B] text-[10px] font-black flex items-center justify-center border-2 border-[#080D3B] shadow-sm">
                                        MJS
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-[#920709] text-white text-[10px] font-black flex items-center justify-center border-2 border-[#080D3B] shadow-sm">
                                        SYM
                                    </div>
                                    <img 
                                        src="https://media.colsih.edu.co/home/estudiantes-colsih.png" 
                                        alt="Estudiantes" 
                                        className="w-8 h-8 rounded-full object-cover border-2 border-[#080D3B] shadow-sm"
                                    />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-black text-white leading-none">
                                        1.2M+
                                    </div>
                                    <div className="text-[10px] text-white/70 font-medium mt-0.5">
                                        Jóvenes en el Mundo
                                    </div>
                                </div>
                            </div>

                            {/* Año y Botón Circular de Scroll hacia abajo */}
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-[11px] uppercase tracking-widest text-white/60 font-semibold">
                                        Edición Juvenil
                                    </div>
                                    <div className="text-sm font-bold text-white tracking-wider">
                                        COLSIH · 2026
                                    </div>
                                </div>

                                <button
                                    onClick={() => scrollTo('#manifiesto')}
                                    className="w-12 h-12 rounded-full border border-white/30 hover:border-white flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer group"
                                    aria-label="Desplazarse hacia abajo"
                                >
                                    <ArrowDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* ========================================================
                SECTION 01: MANIFIESTO & CARISMA (Split Editorial Layout)
                ======================================================== */}
            <section id="manifiesto" className="py-24 bg-[#05081E] text-white select-none relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs uppercase tracking-[0.25em] text-white/60 font-bold">
                            01 / MANIFIESTO
                        </span>
                        <div className="w-12 h-[1px] bg-white/20" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        
                        {/* Titular y Frase de Don Bosco */}
                        <div className="lg:col-span-6 space-y-6">
                            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1] font-['Poppins']">
                                MÁS QUE UN GRUPO.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                                    UN ESTILO DE VIDA.
                                </span>
                            </h2>

                            <blockquote className="border-l-2 border-white/40 pl-6 py-2 text-slate-300 text-base sm:text-lg font-light leading-relaxed italic">
                                «Basta que seáis jóvenes para que os ame. La santidad consiste en estar siempre alegres y hacer bien nuestros deberes cotidianos.»
                                <footer className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-300 not-italic">
                                    — San Juan Bosco
                                </footer>
                            </blockquote>

                            <p className="text-slate-400 text-sm leading-relaxed font-light">
                                El Movimiento Juvenil Salesiano (MJS) no impone reglas vacías. Es una red donde cada joven descubre su voz, desarrolla talentos y vive una fe que abraza el juego, la música y el servicio a los demás.
                            </p>
                        </div>

                        {/* Los 4 Criterios Oratorianos de Don Bosco */}
                        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/30 transition-all space-y-3">
                                <div className="text-xs font-bold uppercase tracking-widest text-white/80">
                                    01. EL ENCUENTRO
                                </div>
                                <h3 className="text-lg font-bold text-white font-['Poppins']">
                                    Donde nace la amistad
                                </h3>
                                <p className="text-xs text-slate-400 font-light leading-relaxed">
                                    Juego limpio, risas y deportes. El espacio donde nadie es invisible y todos encuentran un amigo sincero.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-rose-400/40 transition-all space-y-3">
                                <div className="text-xs font-bold uppercase tracking-widest text-rose-400">
                                    02. LA CASA
                                </div>
                                <h3 className="text-lg font-bold text-white font-['Poppins']">
                                    Una familia que acoge
                                </h3>
                                <p className="text-xs text-slate-400 font-light leading-relaxed">
                                    Un hogar seguro donde eres valorado por lo que eres, sin juicios y con calidez salesiana.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-sky-400/40 transition-all space-y-3">
                                <div className="text-xs font-bold uppercase tracking-widest text-sky-400">
                                    03. LA ESCUELA
                                </div>
                                <h3 className="text-lg font-bold text-white font-['Poppins']">
                                    Formación de líderes
                                </h3>
                                <p className="text-xs text-slate-400 font-light leading-relaxed">
                                    Desarrollamos criterio ético, oratoria, trabajo en equipo y liderazgo para transformar la sociedad.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-emerald-400/40 transition-all space-y-3">
                                <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                                    04. LA PARROQUIA
                                </div>
                                <h3 className="text-lg font-bold text-white font-['Poppins']">
                                    Una fe viva y cercana
                                </h3>
                                <p className="text-xs text-slate-400 font-light leading-relaxed">
                                    Descubrimos a Jesús como el mejor amigo y a María Auxiliadora como la madre que nos protege.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================
                SECTION 02: FLORIDABLANCA & EL MJS EN EL COLSIH
                ======================================================== */}
            <section id="floridablanca" className="py-24 bg-[#080D3B] text-white select-none border-t border-white/10 relative">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs uppercase tracking-[0.25em] text-white/60 font-bold">
                            02 / FLORIDABLANCA
                        </span>
                        <div className="w-12 h-[1px] bg-white/20" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        
                        {/* Lado Izquierdo: Datos de la Sede Local */}
                        <div className="lg:col-span-6 space-y-6">
                            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[1] font-['Poppins']">
                                COLEGIO SANTA ISABEL<br />
                                DE HUNGRÍA · NUESTRA CASA.
                            </h2>

                            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                                En el <strong>Colegio Santa Isabel de Hungría</strong> (Calle 11 # 8-15, Casco Urbano de Floridablanca), el MJS encuentra su hogar permanente. Un campus formativo con amplias zonas recreativas, canchas polideportivas y ambientes diseñados para el encuentro y la fraternidad juvenil.
                            </p>

                            {/* Badge de Sede */}
                            <div className="p-5 rounded-2xl bg-white/[0.05] border border-white/10 flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-white/80" />
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs uppercase tracking-wider text-white/70 font-bold">
                                        Sede Oficial
                                    </div>
                                    <div className="text-sm font-bold text-white">
                                        Colegio Santa Isabel de Hungría · Floridablanca
                                    </div>
                                    <div className="text-xs text-slate-400">
                                        Calle 11 # 8-15, Casco Urbano. Arquidiócesis de Bucaramanga.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lado Derecho: Espacios e Instalaciones del Colegio */}
                        <div className="lg:col-span-6">
                            <div className="p-6 sm:p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/15 space-y-4">
                                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-white/70" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                                            Instalaciones y Espacios de la Sede
                                        </span>
                                    </div>
                                    <span className="text-[10px] uppercase tracking-wider text-white/50">
                                        Campus COLSIH
                                    </span>
                                </div>

                                <div className="space-y-3 pt-2">
                                    {espaciosColegio.map((espacio, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/[0.04] transition-colors">
                                            <span className="text-xs font-black text-white/50 tracking-wider w-8 shrink-0 pt-0.5">
                                                0{idx + 1}
                                            </span>
                                            <div>
                                                <h4 className="text-xs sm:text-sm font-bold text-white">
                                                    {espacio.nombre}
                                                </h4>
                                                <p className="text-xs text-slate-400 font-light mt-0.5 leading-snug">
                                                    {espacio.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================
                SECTION 03: RED GLOBAL SYM (130+ Países)
                ======================================================== */}
            <section id="mundo" className="py-24 bg-[#080D3B] text-white select-none border-t border-white/10 relative overflow-hidden">
                <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-[#0B09A1]/30 blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                    
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs uppercase tracking-[0.25em] text-white/60 font-bold">
                            03 / RED GLOBAL SYM
                        </span>
                        <div className="w-12 h-[1px] bg-white/20" />
                    </div>

                    <div className="max-w-3xl mb-14">
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[1] font-['Poppins']">
                            130 PAÍSES. 5 CONTINENTES.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                                UN SOLO CORAZÓN JUVENIL.
                            </span>
                        </h2>
                        <p className="mt-3 text-slate-400 text-sm sm:text-base font-light">
                            El <em>Salesian Youth Movement (SYM)</em> conecta a cientos de miles de jóvenes en colegios, oratorios y misiones alrededor del planeta.
                        </p>
                    </div>

                    {/* 4 Métricas Editoriales Gigantes */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-y border-white/10">
                        <div>
                            <div className="text-4xl sm:text-6xl font-black font-['Poppins'] text-white">
                                130+
                            </div>
                            <div className="text-xs uppercase tracking-widest text-white/70 font-bold mt-1">
                                Países Activos
                            </div>
                            <p className="text-xs text-slate-400 font-light mt-1">
                                En los 5 continentes del mundo.
                            </p>
                        </div>

                        <div>
                            <div className="text-4xl sm:text-6xl font-black font-['Poppins'] text-white">
                                1.2M+
                            </div>
                            <div className="text-xs uppercase tracking-widest text-white/70 font-bold mt-1">
                                Jóvenes Conectados
                            </div>
                            <p className="text-xs text-slate-400 font-light mt-1">
                                En la red juvenil salesiana global.
                            </p>
                        </div>

                        <div>
                            <div className="text-4xl sm:text-6xl font-black font-['Poppins'] text-white">
                                2
                            </div>
                            <div className="text-xs uppercase tracking-widest text-white/70 font-bold mt-1">
                                Inspectorías en Colombia
                            </div>
                            <p className="text-xs text-slate-400 font-light mt-1">
                                COM (Medellín/Santander) y COB (Bogotá).
                            </p>
                        </div>

                        <div>
                            <div className="text-4xl sm:text-6xl font-black font-['Poppins'] text-white">
                                1859
                            </div>
                            <div className="text-xs uppercase tracking-widest text-white/70 font-bold mt-1">
                                Legado Histórico
                            </div>
                            <p className="text-xs text-slate-400 font-light mt-1">
                                Desde Valdocco, Turín hasta hoy.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* ========================================================
                SECTION 04: ESPIRITUALIDAD SALESIANA (Los 5 Pilares)
                ======================================================== */}
            <section id="espiritualidad" className="py-24 bg-[#05081E] text-white select-none border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs uppercase tracking-[0.25em] text-white/60 font-bold">
                            04 / ESPIRITUALIDAD
                        </span>
                        <div className="w-12 h-[1px] bg-white/20" />
                    </div>

                    <div className="max-w-3xl mb-14">
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[1] font-['Poppins']">
                            LOS CINCO PILARES DE LA EJS.
                        </h2>
                        <p className="mt-3 text-slate-400 text-sm sm:text-base font-light">
                            La Espiritualidad Juvenil Salesiana enseña que la santidad se vive en lo ordinario con alegría desbordante.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all space-y-3">
                            <span className="text-xs font-black text-white/80">01</span>
                            <h3 className="text-sm font-bold text-white font-['Poppins']">
                                Alegría y Fiesta
                            </h3>
                            <p className="text-xs text-slate-400 font-light leading-relaxed">
                                La tristeza no es salesiana. Vivir con optimismo es nuestro primer deber cristiano.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-300/40 transition-all space-y-3">
                            <span className="text-xs font-black text-sky-400">02</span>
                            <h3 className="text-sm font-bold text-white font-['Poppins']">
                                Lo Cotidiano
                            </h3>
                            <p className="text-xs text-slate-400 font-light leading-relaxed">
                                En el estudio, el juego y la casa. Hacer bien lo ordinario es extraordinario.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-rose-300/40 transition-all space-y-3">
                            <span className="text-xs font-black text-rose-400">03</span>
                            <h3 className="text-sm font-bold text-white font-['Poppins']">
                                Jesús Amigo
                            </h3>
                            <p className="text-xs text-slate-400 font-light leading-relaxed">
                                Una fe sin máscaras ni miedos. Jesús camina al lado de tus sueños juveniles.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-300/40 transition-all space-y-3">
                            <span className="text-xs font-black text-purple-400">04</span>
                            <h3 className="text-sm font-bold text-white font-['Poppins']">
                                María Auxiliadora
                            </h3>
                            <p className="text-xs text-slate-400 font-light leading-relaxed">
                                La madre protectora que Don Bosco nos dejó para sostener el camino de la vida.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-300/40 transition-all space-y-3">
                            <span className="text-xs font-black text-emerald-400">05</span>
                            <h3 className="text-sm font-bold text-white font-['Poppins']">
                                Servicio Solidario
                            </h3>
                            <p className="text-xs text-slate-400 font-light leading-relaxed">
                                Salir al encuentro del que sufre en Floridablanca como ciudadanos éticos y justos.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* ========================================================
                SECTION 05: PREGUNTAS FRECUENTES (Minimalist Dark FAQ)
                ======================================================== */}
            <section id="faq" className="py-24 bg-[#080D3B] text-white select-none border-t border-white/10">
                <div className="max-w-4xl mx-auto px-6 sm:px-12">
                    
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs uppercase tracking-[0.25em] text-white/60 font-bold">
                            05 / FAQ
                        </span>
                        <div className="w-12 h-[1px] bg-white/20" />
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[1] font-['Poppins'] mb-12">
                        TODO LO QUE NECESITAS SABER.
                    </h2>

                    <div className="divide-y divide-white/10">
                        {faqs.map((f, idx) => {
                            const isOpen = faqOpen === idx;
                            return (
                                <div key={idx} className="py-6">
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer group"
                                    >
                                        <span className="text-base sm:text-lg font-bold text-white group-hover:text-white transition-colors">
                                            {f.q}
                                        </span>
                                        <span className="text-xs font-mono text-white/50 group-hover:text-white">
                                            {isOpen ? '—' : '+'}
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <p className="mt-3 text-sm text-slate-400 font-light leading-relaxed animate-fadeIn">
                                            {f.a}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* ========================================================
                SECTION 06: COMUNIDAD & INFORMACIÓN (Editorial Info Card)
                ======================================================== */}
            <section id="contacto" className="py-24 bg-[#05081E] text-white select-none border-t border-white/10 relative overflow-hidden">
                {/* Glow ambient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#920709]/30 via-transparent to-[#0B09A1]/30 pointer-events-none" />

                <div className="max-w-5xl mx-auto px-6 sm:px-12 relative z-10">
                    
                    <div className="p-8 sm:p-14 rounded-3xl bg-black/50 backdrop-blur-2xl border border-white/20 shadow-2xl space-y-10">
                        
                        <div className="max-w-2xl">
                            <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                                06 / ENCUENTROS & COMUNIDAD
                            </span>
                            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] font-['Poppins'] text-white mt-2">
                                VIVE LA EXPERIENCIA<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                                    SALESIANA.
                                </span>
                            </h2>
                            <p className="mt-4 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                                No requieres trámites complicados. El Colegio Santa Isabel de Hungría es la casa y punto de encuentro permanente para que cualquier niño o joven de Floridablanca y el área metropolitana viva los valores salesianos.
                            </p>
                        </div>

                        {/* 3 Bloques Informativos Clave */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                                <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                                    SEDE & CAMPUS
                                </div>
                                <div className="text-lg font-bold text-white font-['Poppins']">
                                    Colegio COLSIH
                                </div>
                                <div className="text-xs text-slate-400 font-light leading-relaxed">
                                    Instalaciones deportivas, amplios salones y zonas verdes para el desarrollo formativo.
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                                <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                                    UBICACIÓN
                                </div>
                                <div className="text-lg font-bold text-white font-['Poppins']">
                                    Floridablanca
                                </div>
                                <div className="text-xs text-slate-400 font-light leading-relaxed">
                                    Calle 11 # 8-15, Casco Urbano, Floridablanca, Santander.
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                                <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                                    ACCESO
                                </div>
                                <div className="text-lg font-bold text-white font-['Poppins']">
                                    100% Libre y Gratuito
                                </div>
                                <div className="text-xs text-slate-400 font-light leading-relaxed">
                                    Abierto a niños y jóvenes desde los 7 hasta los 25 años.
                                </div>
                            </div>
                        </div>

                        {/* Canal Oficial de Información (Instagram) */}
                        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg">
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-wider text-white/60 font-semibold">
                                        Canal Oficial de Avisos & Retiros
                                    </div>
                                    <div className="text-sm font-bold text-white">
                                        @mjsbosco_floridablanca
                                    </div>
                                </div>
                            </div>

                            <a
                                href="https://www.instagram.com/mjsbosco_floridablanca/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-slate-200 text-black font-black text-xs uppercase tracking-wider shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
                            >
                                <span>Ver Noticias en Instagram</span>
                                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                            </a>
                        </div>

                    </div>

                </div>
            </section>
        </MjsLayout>
    );
}
