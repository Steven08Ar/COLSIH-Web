import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from './HomeSections/ScrollReveal';

const niveles = [
    {
        nombre: 'Preescolar',
        edad: '3 a 6 años',
        grados: ['Prejardín', 'Jardín', 'Transición'],
        descripcion: 'Estimulación temprana, desarrollo psicomotriz y socialización con bases en la alegría salesiana.',
        destacados: ['Iniciación al inglés', 'Proyectos lúdicos', 'Valores básicos'],
        href: '/oferta-academica/preescolar',
        badge: 'Educación Inicial',
        btnBg: 'bg-amber-500 hover:bg-amber-600 text-white',
        borderAccent: 'hover:border-amber-300'
    },
    {
        nombre: 'Básica Primaria',
        edad: '6 a 11 años',
        grados: ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto'],
        descripcion: 'Consolidación de la lectoescritura, razonamiento matemático inicial y fomento de la curiosidad científica.',
        destacados: ['Pensamiento lógico', 'Comprensión lectora', 'Inglés intensivo'],
        href: '/oferta-academica/primaria',
        badge: 'Grados 1° a 5°',
        btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        borderAccent: 'hover:border-emerald-300'
    },
    {
        nombre: 'Bachillerato',
        edad: '11 a 17 años',
        grados: ['Sexto', 'Séptimo', 'Octavo', 'Noveno', 'Décimo', 'Undécimo'],
        descripcion: 'Desarrollo de habilidades de investigación, laboratorio experimental, informática y liderazgo social y ético.',
        destacados: ['Pre-ICFES especializado', 'Laboratorios STEM', 'Ciudadanía crítica'],
        href: '/oferta-academica/bachillerato',
        badge: 'Grados 6° a 11°',
        btnBg: 'bg-[#001659] hover:bg-blue-800 text-white',
        borderAccent: 'hover:border-blue-300'
    },
    {
        nombre: 'Articulación SENA',
        edad: 'Grados 10° y 11°',
        grados: ['Técnico en Contabilización de Operaciones Comerciales y Financieras'],
        descripcion: 'Formación técnica oficial acreditada por el SENA con doble titulación. Nuestros egresados obtienen el título de Bachiller Técnico con competencias laborales en contabilización de operaciones comerciales y financieras.',
        destacados: ['Doble titulación oficial', 'Prácticas reales', 'Homologación universitaria'],
        href: '/oferta-academica/sena',
        badge: 'Convenio SENA',
        btnBg: 'bg-orange-600 hover:bg-orange-700 text-white',
        borderAccent: 'hover:border-orange-300'
    }
];

const ofrecemos = [
    { titulo: 'Educación en Valores', descripcion: 'Formación integral basada en principios éticos, morales y espirituales de la tradición salesiana.' },
    { titulo: 'Escuela de Padres', descripcion: 'Espacios de formación y acompañamiento para las familias como aliadas del proceso educativo.' },
    { titulo: 'Comunicación Permanente', descripcion: 'Canal directo y continuo entre padres de familia y el colegio para el seguimiento del estudiante.' },
    { titulo: 'Orientación Psicológica', descripcion: 'Servicio de apoyo psicoemocional para estudiantes y familias, disponible durante el año escolar.' },
    { titulo: 'Calidad Académica y Formativa', descripcion: 'Propuesta pedagógica de alto nivel que combina exigencia académica con desarrollo humano integral.' },
    { titulo: 'Servicio de Capellanía', descripcion: 'Acompañamiento espiritual y pastoral salesiano que nutre la fe y los valores de toda la comunidad.' },
    { titulo: 'Ambiente Alegre y Seguro', descripcion: 'Un entorno escolar donde cada estudiante se siente bienvenido, protegido y motivado a crecer.' }
];

const areas = [
    { titulo: 'Pensamiento Lógico y Matemáticas', desc: 'Resolución de problemas, álgebra y razonamiento lógico aplicado.' },
    { titulo: 'Humanidades y Bilingüismo', desc: 'Dominio de la lengua castellana y desarrollo del idioma inglés.' },
    { titulo: 'Ciencia y Medio Ambiente', desc: 'Física, química, biología y conciencia de preservación ecológica.' },
    { titulo: 'Ciudadanía e Historia', desc: 'Ciencias sociales, filosofía e historia patria y global.' },
    { titulo: 'Tecnología y Robótica', desc: 'Informática, lógica de programación y robótica educativa.' },
    { titulo: 'Expresión Artística y Deporte', desc: 'Danzas, música, artes plásticas y desarrollo físico saludable.' },
    { titulo: 'Pastoral Juvenil y Ética', desc: 'Formación cristiana, valores salesianos y crecimiento interior.' }
];

const extracurriculares = [
    { club: 'Club de Robótica', detalle: 'Diseño y lógica aplicados a competencias juveniles.' },
    { club: 'Escuela de Fútbol', detalle: 'Entrenamiento físico, disciplina y trabajo colectivo.' },
    { club: 'Grupo de Música y Coro', detalle: 'Expresión rítmica e instrumental salesiana.' },
    { club: 'Gestores Ambientales', detalle: 'Liderazgo en reciclaje y cuidado del entorno.' }
];

export default function OfertaAcademica() {
    return (
        <AppLayout>
            <Head title="Oferta Académica | COLSIH" />

            {/* 1. HERO SECTION (Dark theme with waves) */}
            <section className="relative pt-36 pb-32 md:pt-44 md:pb-40 bg-[#08111F] overflow-hidden select-none">
                
                {/* Glowing light blobs */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#001659]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#800A15]/8 rounded-full blur-[120px] pointer-events-none z-0"></div>

                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-10 text-center lg:text-left">
                    <div className="max-w-3xl mx-auto lg:mx-0 space-y-6 flex flex-col items-center lg:items-start">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#800A15] text-xs md:text-[13px] font-bold tracking-[3px] uppercase block font-sans">
                                PROYECTO EDUCATIVO
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black text-white leading-[1.05] tracking-tight font-sans">
                                Forjando el futuro con ciencia, fe y justicia
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-lg md:text-[20px] font-medium text-slate-300 leading-relaxed max-w-2xl font-sans">
                                Descubre nuestro modelo formativo integral estructurado para acompañar a los estudiantes en cada etapa de su crecimiento y desarrollo intelectual.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Bottom Wave Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                    <svg className="relative block w-full h-[50px] md:h-[90px]" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path d="M0,100 C380,10 760,90 1080,30 C1200,10 1320,20 1440,60 L1440,100 L0,100 Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            {/* 2. NIVELES EDUCATIVOS (Grid cards) */}
            <section className="relative py-24 md:py-32 bg-white overflow-hidden select-none">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-20">
                    
                    <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left space-y-4 flex flex-col items-center lg:items-start">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#001659] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                ETAPAS FORMATIVAS
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Niveles Educativos
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {niveles.map((nivel, idx) => (
                            <ScrollReveal key={idx} distance="translate-y-8" delay={idx * 150} className="h-full">
                                <div className="group relative h-full border border-slate-100 p-8 md:p-10 rounded-3xl bg-slate-50/50 hover:bg-white hover:border-slate-200/80 hover:shadow-[0_20px_50px_rgba(8,17,31,0.04)] transition-all duration-300 flex flex-col justify-between text-left">
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-start gap-4">
                                            <h3 className="text-2xl font-black text-[#08111F] group-hover:text-[#001659] transition-colors duration-300 font-sans">
                                                {nivel.nombre}
                                            </h3>
                                            <span className="px-3 py-1.5 bg-white border border-slate-200 text-slate-500 rounded-full text-xs font-bold shrink-0 font-sans">
                                                {nivel.edad}
                                            </span>
                                        </div>
                                        <p className="text-[15px] font-semibold text-slate-500 leading-relaxed font-sans">
                                            {nivel.descripcion}
                                        </p>
                                        
                                        <div className="space-y-2.5">
                                            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 font-sans">Grados:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {nivel.grados.map((grado, gIdx) => (
                                                    <span key={gIdx} className="px-2.5 py-1 bg-white border border-slate-100 rounded-md text-xs font-semibold text-slate-600 font-sans">
                                                        {grado}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-100 pt-6 mt-6 space-y-4">
                                        <div className="flex flex-wrap gap-3">
                                            {nivel.destacados.map((item, dIdx) => (
                                                <span key={dIdx} className="flex items-center gap-1.5 text-xs font-extrabold text-[#001659] font-sans">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#800A15]" />
                                                    {item}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="pt-2">
                                            <Link
                                                href={nivel.href}
                                                className={`inline-flex items-center justify-between w-full px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] ${nivel.btnBg}`}
                                            >
                                                <span>Ver Plan Completo de {nivel.nombre}</span>
                                                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. LO QUE OFRECEMOS */}
            <section className="relative py-24 md:py-32 bg-slate-50 border-y border-slate-100 overflow-hidden select-none">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-20">

                    <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left space-y-4 flex flex-col items-center lg:items-start">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#800A15] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                PROPUESTA INSTITUCIONAL
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Lo que Ofrecemos
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-[15px] font-semibold text-slate-500 leading-relaxed font-sans">
                                Más allá del aula, COLSIH brinda una experiencia educativa completa que acompaña a estudiantes y familias en cada etapa.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {ofrecemos.map((item, idx) => (
                            <ScrollReveal key={idx} distance="translate-y-6" delay={idx * 80} className="h-full">
                                <div className="p-7 border border-slate-200/60 rounded-2xl bg-white hover:border-slate-300 hover:shadow-[0_12px_40px_rgba(8,17,31,0.05)] transition-all duration-300 text-left space-y-3 h-full flex flex-col">
                                    <div className="w-8 h-8 rounded-lg bg-[#001659]/8 flex items-center justify-center">
                                        <span className="w-2 h-2 rounded-full bg-[#800A15]" />
                                    </div>
                                    <h3 className="text-[15px] font-extrabold text-[#08111F] font-sans leading-snug">
                                        {item.titulo}
                                    </h3>
                                    <p className="text-xs font-semibold text-slate-500 leading-relaxed font-sans flex-1">
                                        {item.descripcion}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. JORNADA ÚNICA — HORARIOS POR NIVEL */}
            <section className="relative py-20 bg-white border-b border-slate-100 overflow-hidden select-none">
                <div className="max-w-[1680px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[120px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

                    <div className="col-span-full lg:col-span-4 text-center lg:text-left space-y-4 flex flex-col items-center lg:items-start">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#800A15] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                ORGANIZACIÓN
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-3xl sm:text-4xl font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Jornada Única por Nivel
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-[15px] font-semibold text-slate-500 leading-relaxed font-sans">
                                Calendario A · Floridablanca, Santander. La institución opera en jornada única adaptada a cada etapa formativa.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="col-span-full lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { nivel: 'Preescolar', grados: 'Jardín y Transición', horario: '7:00 a.m.', fin: '12:30 p.m.' },
                            { nivel: 'Primaria', grados: '1° a 5°', horario: '6:30 a.m.', fin: '1:00 p.m.' },
                            { nivel: 'Bachillerato', grados: '6° a 11°', horario: '6:30 a.m.', fin: '2:00 p.m.' }
                        ].map((h, idx) => (
                            <ScrollReveal key={idx} distance="translate-x-6" delay={idx * 120} className="h-full">
                                <div className="p-8 bg-slate-50 border border-slate-100 rounded-2xl text-left space-y-4 flex flex-col justify-between h-full">
                                    <div className="space-y-1">
                                        <span className="text-[#001659] text-xs font-bold uppercase tracking-wider font-sans">{h.nivel}</span>
                                        <h3 className="text-lg font-extrabold text-[#08111F] font-sans">{h.grados}</h3>
                                    </div>
                                    <div className="p-4 bg-white border border-slate-100 rounded-xl">
                                        <span className="block text-2xl font-black text-[#08111F] font-sans">{h.horario}</span>
                                        <span className="block text-xs font-bold text-slate-400 mt-1 uppercase font-sans">a {h.fin}</span>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. ÁREAS DE CONOCIMIENTO (Clean grid) */}
            <section className="relative py-24 md:py-32 bg-white overflow-hidden select-none">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-20">
                    
                    <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left space-y-4 flex flex-col items-center lg:items-start">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#001659] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                PLAN ACADÉMICO
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                Áreas del Conocimiento
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {areas.map((area, idx) => (
                            <ScrollReveal key={idx} distance="translate-y-6" delay={idx * 100} className="h-full">
                                <div className="p-8 border border-slate-100 rounded-2xl hover:border-slate-200/80 transition-all duration-300 text-left space-y-3 bg-white">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#001659] font-black text-sm font-sans">
                                        {(idx + 1).toString().padStart(2, '0')}
                                    </div>
                                    <h3 className="text-[17px] font-extrabold text-[#08111F] font-sans">
                                        {area.titulo}
                                    </h3>
                                    <p className="text-xs font-semibold text-slate-500 leading-relaxed font-sans">
                                        {area.desc}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. FORMACIÓN COMPLEMENTARIA (Extracurricular activities and MJS link) */}
            <section className="relative py-24 bg-slate-50 border-t border-slate-100 overflow-hidden select-none">
                <div className="max-w-[1680px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[120px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    
                    <div className="col-span-full lg:col-span-5 text-center lg:text-left space-y-6 flex flex-col items-center lg:items-start">
                        <div className="space-y-4 flex flex-col items-center lg:items-start">
                            <ScrollReveal distance="translate-y-6">
                                <span className="text-[#800A15] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                    INTEGRALIDAD
                                </span>
                            </ScrollReveal>
                            <ScrollReveal distance="translate-y-6" delay={150}>
                                <h2 className="text-3xl sm:text-4xl lg:text-[45px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                    Formación Complementaria
                                </h2>
                            </ScrollReveal>
                        </div>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-[15px] font-semibold text-slate-500 leading-relaxed font-sans">
                                Creemos en el desarrollo de talentos que van más allá del aula. Nuestros clubes y el **Movimiento Juvenil Salesiano (MJS)** permiten a los estudiantes ser protagonistas en el arte, la ciencia y la vida comunitaria.
                            </p>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={400} className="pt-2">
                            <Link href="/mjs" className="inline-flex items-center gap-2 px-6 py-3 bg-[#08111F] hover:bg-[#001659] text-white font-extrabold text-xs tracking-wider uppercase rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-sans cursor-pointer">
                                Conocer el MJS
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </ScrollReveal>
                    </div>

                    <div className="col-span-full lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {extracurriculares.map((item, idx) => (
                            <ScrollReveal key={idx} distance="translate-x-6" delay={idx * 150} className="h-full">
                                <div className="p-6 bg-white border border-slate-200/50 rounded-2xl text-left space-y-2 hover:border-slate-300 transition-all duration-300">
                                    <h3 className="font-extrabold text-[15px] text-[#08111F] font-sans flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#001659]" />
                                        {item.club}
                                    </h3>
                                    <p className="text-xs font-semibold text-slate-500 leading-relaxed font-sans">
                                        {item.detalle}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                </div>
            </section>

            {/* 6. CALL TO ACTION (CTA Admissions) */}
            <section className="relative py-24 bg-white overflow-hidden select-none border-t border-slate-100">
                <div className="max-w-[1000px] mx-auto px-6 text-center space-y-10">
                    <div className="space-y-4">
                        <ScrollReveal distance="translate-y-6">
                            <span className="text-[#001659] text-xs font-bold tracking-[3px] uppercase block font-sans">
                                INSCRIPCIONES
                            </span>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={150}>
                            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#08111F] leading-[1.1] tracking-tight font-sans">
                                ¿Quieres que tu hijo sea parte de COLSIH?
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal distance="translate-y-6" delay={300}>
                            <p className="text-[15px] md:text-lg font-semibold text-slate-500 leading-relaxed font-sans max-w-2xl mx-auto">
                                Consulta nuestro proceso de admisiones en 4 pasos, revisa los requisitos y separa tu cupo para el próximo ciclo escolar.
                            </p>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal distance="translate-y-6" delay={450} className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link href="/admisiones" className="w-full sm:w-auto px-8 py-4 bg-[#001659] hover:bg-[#08111F] text-white font-extrabold text-xs tracking-wider uppercase rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-sans cursor-pointer">
                            Proceso de Admisión
                        </Link>
                        <Link href="/contacto" className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-slate-400 text-[#08111F] font-extrabold text-xs tracking-wider uppercase rounded-full transition-all duration-300 font-sans cursor-pointer">
                            Contactar al Colegio
                        </Link>
                    </ScrollReveal>
                </div>
            </section>
        </AppLayout>
    );
}
