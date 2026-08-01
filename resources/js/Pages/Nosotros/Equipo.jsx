import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { motion } from 'framer-motion';
import { 
    Users, 
    Briefcase, 
    GraduationCap, 
    Lightbulb, 
    Mail, 
    Phone, 
    Award,
    Sparkles,
    User
} from 'lucide-react';

export default function Equipo() {
    const [selectedArea, setSelectedArea] = useState('Todos');

    // Equipo Directivo Oficial con fotos reales de la carpeta /docentes/
    const directivos = [
        { nombre: 'Sor Beatriz Cortés Jerez', cargo: 'Rectora', foto: '/docentes/Hermana%20de%20coso.JPG' },
        { nombre: 'Jaime Manuel Ardila Parra', cargo: 'Coordinador Académico', foto: '/docentes/Jaime.JPG' },
        { nombre: 'Margarita María Valle Manrique', cargo: 'Coordinadora de Convivencia', foto: '/docentes/Margara.JPG' },
        { nombre: 'Erika Tatiana Delgadillo Avella', cargo: 'Coordinadora de Pastoral', foto: '/docentes/Erika.JPG' }
    ];

    // Áreas de Administración
    const administracion = [
        { area: 'Rectoría', encargado: 'Sor Beatriz Cortés Jerez', cargo: 'Rectora', tel: '(607) 637 1234', email: 'rectoria@colsih.edu.co' },
        { area: 'Coordinación Académica', encargado: 'Jaime Manuel Ardila Parra', cargo: 'Coordinador Académico', tel: '(607) 637 1235', email: 'academica@colsih.edu.co' },
        { area: 'Coordinación de Convivencia', encargado: 'Margarita María Valle Manrique', cargo: 'Coordinadora de Convivencia', tel: '(607) 637 1236', email: 'convivencia@colsih.edu.co' },
        { area: 'Coordinación Pastoral', encargado: 'Erika Tatiana Delgadillo Avella', cargo: 'Coordinadora de Pastoral', tel: '(607) 637 1237', email: 'pastoral@colsih.edu.co' }
    ];

    // Listado Oficial de Docentes asignando fotos de /docentes/ y gris para los que no tengan
    const todosLosProfesores = [
        { nombre: 'Adriana María Jaimes Ruiz', asignatura: 'Ed. Religiosa', area: 'Ed. Religiosa y Ética', foto: '/docentes/Adriana.JPG' },
        { nombre: 'Bruna Mercedes Peña Solano', asignatura: 'Lengua Castellana', area: 'Lengua Castellana', foto: '/docentes/Bruna.JPG' },
        { nombre: 'Clara Inés Joya Herrera', asignatura: 'Matemáticas', area: 'Matemáticas', foto: '/docentes/Clara.JPG' },
        { nombre: 'Daniela Villamizar Villamizar', asignatura: 'Todas las Dimensiones', area: 'Preescolar y Primaria', foto: '/docentes/Daniela.JPG' },
        { nombre: 'Diana Soidé Villamizar Bautista', asignatura: 'Lengua Castellana (Primaria)', area: 'Lengua Castellana', foto: null },
        { nombre: 'Edgar Javier García Estupiñán', asignatura: 'Ciencias Sociales', area: 'Ciencias Sociales', foto: '/docentes/Edgar.JPG' },
        { nombre: 'Erika Tatiana Delgadillo Avella', asignatura: 'Ciencias Sociales', area: 'Ciencias Sociales', foto: '/docentes/Erika.JPG' },
        { nombre: 'Fredy Neira Roa', asignatura: 'Matemáticas y Física', area: 'Matemáticas', foto: '/docentes/Fredy.JPG' },
        { nombre: 'Gloria Mercedes Serrano Salazar', asignatura: 'Ed. Religiosa', area: 'Ed. Religiosa y Ética', foto: '/docentes/Gloria.JPG' },
        { nombre: 'Héctor Manuel Garzón Gómez', asignatura: 'Ética y Ed. Religiosa', area: 'Ed. Religiosa y Ética', foto: '/docentes/Hector.JPG' },
        { nombre: 'Irma Sánchez Espinosa', asignatura: 'Ciencias Naturales', area: 'Ciencias Naturales', foto: null },
        { nombre: 'Iván Martínez Peña', asignatura: 'Tecnología e Informática', area: 'Tecnología e Informática', foto: '/docentes/Ivan.JPG' },
        { nombre: 'Jenny Marcela Pérez Medina', asignatura: 'Química', area: 'Ciencias Naturales', foto: null },
        { nombre: 'Jesús David Arias Estupiñán', asignatura: 'Tecnología y Estadística', area: 'Tecnología e Informática', foto: '/docentes/Jes%C3%BAs.JPG' },
        { nombre: 'Jeyson Eduardo Suárez Ardila', asignatura: 'Matemáticas', area: 'Matemáticas', foto: '/docentes/Jeison.JPG' },
        { nombre: 'Jeyson Mauricio Ávila Triana', asignatura: 'Ed. Física y Deportes', area: 'Ed. Física y Expresión', foto: '/docentes/Jeyson.JPG' },
        { nombre: 'Karen Navarro Pisciotti', asignatura: 'Lengua Castellana', area: 'Lengua Castellana', foto: '/docentes/Karen%20Piziote.JPG' },
        { nombre: 'Karen Tatiana Linares Gelvez', asignatura: 'Lengua Castellana', area: 'Lengua Castellana', foto: '/docentes/Karen%20Linares.JPG' },
        { nombre: 'Katerin Johanna Delgado Ruda', asignatura: 'Ciencias Sociales', area: 'Ciencias Sociales', foto: '/docentes/Katerin.JPG' },
        { nombre: 'Lady Diana Osorio Fonseca', asignatura: 'Todas las Asignaturas', area: 'Preescolar y Primaria', foto: '/docentes/Ladi.JPG' },
        { nombre: 'Leidy Andrea Portilla Gelvez', asignatura: 'Matemáticas', area: 'Matemáticas', foto: '/docentes/Leidy%20Portilla.JPG' },
        { nombre: 'Leidy Paola Basto Ramírez', asignatura: 'Inglés', area: 'Inglés', foto: '/docentes/Leidy%20Bastos.JPG' },
        { nombre: 'Ludwin Fernando Caballero Espinosa', asignatura: 'Ed. Física y Deportes', area: 'Ed. Física y Expresión', foto: '/docentes/Ludwin.JPG' },
        { nombre: 'Luz Adriana García Villamizar', asignatura: 'Artes y Ética', area: 'Ed. Física y Expresión', foto: null },
        { nombre: 'Mayra Jisseth Sierra Lombana', asignatura: 'Inglés', area: 'Inglés', foto: '/docentes/Mayra.JPG' },
        { nombre: 'Miguel Oswaldo Lizarazo Latorre', asignatura: 'Contabilidad SENA', area: 'Contabilidad SENA', foto: '/docentes/Miguel.JPG' },
        { nombre: 'Paula Lorena Cuadros Ballesteros', asignatura: 'Todas las Dimensiones', area: 'Preescolar y Primaria', foto: null },
        { nombre: 'Robin Javier Aparicio Aparicio', asignatura: 'Filosofía y Ed. Religiosa', area: 'Ciencias Sociales', foto: null },
        { nombre: 'Sandra Patricia Parada Leal', asignatura: 'Música', area: 'Ed. Física y Expresión', foto: null },
        { nombre: 'Sergio Andrés Mendoza Gómez', asignatura: 'Inglés', area: 'Inglés', foto: null },
        { nombre: 'Yesica Zoraya Badillo Corredor', asignatura: 'Ciencias Naturales', area: 'Ciencias Naturales', foto: null },
        { nombre: 'Yoleida Patricia Camacho Corzo', asignatura: 'Inglés', area: 'Inglés', foto: null },
        { nombre: 'Yoni Amparo Méndez Álvarez', asignatura: 'Matemáticas e Informática', area: 'Matemáticas', foto: null }
    ];

    const areasList = [
        'Todos',
        'Preescolar y Primaria',
        'Matemáticas',
        'Lengua Castellana',
        'Ciencias Naturales',
        'Ciencias Sociales',
        'Inglés',
        'Tecnología e Informática',
        'Ed. Física y Expresión',
        'Ed. Religiosa y Ética',
        'Contabilidad SENA'
    ];

    const profesoresFiltrados = selectedArea === 'Todos' 
        ? todosLosProfesores 
        : todosLosProfesores.filter(p => p.area === selectedArea);

    return (
        <AppLayout>
            <Head title="Equipo Institucional | COLSIH" />

            {/* Ocultar barra de scroll en solapas */}
            <style dangerouslySetInnerHTML={{__html: `
                .no-scrollbar::-webkit-scrollbar { display: none !important; }
                .no-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
            `}} />

            <div className="relative bg-[#FAFCFF] dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen overflow-hidden pb-16 transition-colors duration-300">
                
                {/* Dotted Grid Backdrop Decoration */}
                <div 
                    className="absolute inset-0 opacity-[0.05] dark:opacity-[0.01] pointer-events-none" 
                    style={{
                        backgroundImage: 'radial-gradient(#003C8F 1.2px, transparent 1.2px)',
                        backgroundSize: '24px 24px'
                    }} 
                />

                {/* ── 1. Hero Section ── */}
                <section className="relative w-full bg-gradient-to-r from-[#003C8F] to-[#0D1B2E] text-white pt-36 pb-36 px-6 overflow-hidden">
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-10 brightness-[0.2] pointer-events-none"
                        style={{ backgroundImage: "url('/galeria/panoramica.png')" }}
                    />
                    <div className="absolute right-0 bottom-0 top-0 w-[35%] opacity-15 border-l border-amber-400 rounded-l-[50%] bg-gradient-to-r from-transparent to-amber-400/5 pointer-events-none hidden lg:block" />

                    <div className="relative z-10 max-w-[1240px] mx-auto text-center lg:text-left">
                        <div className="max-w-2xl mx-auto lg:mx-0 space-y-4 flex flex-col items-center lg:items-start">
                            <div className="flex items-center justify-center lg:justify-start gap-2 text-amber-400 font-bold uppercase tracking-wider text-xs">
                                <Users className="w-4 h-4 text-amber-400" />
                                Conoce a quienes hacen posible la excelencia
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                                Equipo Institucional
                            </h1>
                            <div className="w-20 h-1.5 bg-amber-400 rounded-full" />
                            <p className="text-slate-300 font-semibold text-sm md:text-base leading-relaxed pt-1">
                                Nuestro cuerpo directivo y docente dedicado día a día a la formación integral, humana y académica de la juventud salesiana.
                            </p>
                        </div>
                    </div>

                    {/* Divisor de ola */}
                    <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
                        <svg 
                            className="relative block w-full h-[30px] md:h-[60px] translate-y-[2px] scale-y-105" 
                            viewBox="0 0 1440 120" 
                            preserveAspectRatio="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" 
                                className="fill-[#FAFCFF] dark:fill-slate-950" 
                            />
                        </svg>
                    </div>
                </section>

                {/* ── 2. Equipo Directivo ── */}
                <section className="relative z-10 py-12 px-6 max-w-[1240px] mx-auto">
                    <div className="flex items-center gap-3.5 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div className="w-10 h-10 rounded-2xl bg-[#003C8F]/10 dark:bg-blue-950/40 text-[#003C8F] dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
                            <Award className="w-5.5 h-5.5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
                                Equipo Directivo
                            </h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                                Liderazgo y dirección académica de la institución
                            </p>
                        </div>
                    </div>

                    {/* Directivos Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {directivos.map((p, idx) => {
                            const isVino = idx % 2 === 0;
                            const borderClass = isVino ? 'border-t-4 border-t-[#800A15]' : 'border-t-4 border-t-[#003C8F]';
                            const roleClass = isVino ? 'text-[#800A15] dark:text-rose-400' : 'text-[#003C8F] dark:text-blue-400';

                            return (
                                <motion.div 
                                    key={p.nombre}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[28px] overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 ${borderClass}`}
                                >
                                    <div className="aspect-[4/5] bg-slate-50 dark:bg-slate-950 overflow-hidden relative">
                                        <img 
                                            src={p.foto} 
                                            alt={p.nombre} 
                                            className="w-full h-full object-cover object-[center_20%]"
                                        />
                                    </div>
                                    <div className="p-5 text-center bg-white dark:bg-slate-900">
                                        <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-base leading-snug">
                                            {p.nombre}
                                        </h4>
                                        <span className={`text-[11px] font-black uppercase tracking-widest block mt-1.5 ${roleClass}`}>
                                            {p.cargo}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* ── 3. Administración ── */}
                <section className="relative z-10 py-12 px-6 max-w-[1240px] mx-auto">
                    <div className="flex items-center gap-3.5 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
                            <Briefcase className="w-5.5 h-5.5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
                                Administración y Gestión
                            </h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                                Canales oficiales de comunicación institucional
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
                        {administracion.map((item, idx) => {
                            const isVino = idx % 2 === 0;
                            const borderClass = isVino ? 'border-l-4 border-l-[#800A15]' : 'border-l-4 border-l-[#003C8F]';
                            const badgeBg = isVino ? 'bg-[#800A15]/10 text-[#800A15]' : 'bg-[#003C8F]/10 text-[#003C8F]';

                            return (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden ${borderClass}`}
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-base font-black text-slate-800 dark:text-white">
                                                {item.area}
                                            </h4>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${badgeBg}`}>
                                                <Briefcase className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight">
                                                {item.encargado}
                                            </p>
                                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                                                {item.cargo}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-left">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                            {item.tel}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 break-all">
                                            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                            {item.email}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* ── 4. Docentes de la Institución (Con fotos asociadas e imagen gris para quienes no tengan) ── */}
                <section className="relative z-10 py-12 px-6 max-w-[1240px] mx-auto">
                    <div className="flex items-center gap-3.5 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
                            <GraduationCap className="w-5.5 h-5.5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
                                Cuerpo Docente
                            </h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                                Profesores especializados por área de enseñanza
                            </p>
                        </div>
                    </div>

                    {/* Area category sliding tabs */}
                    <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar w-full select-none snap-x">
                        {areasList.map((areaName) => (
                            <button
                                key={areaName}
                                onClick={() => setSelectedArea(areaName)}
                                className={`px-4.5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shrink-0 snap-center transition-all duration-300 cursor-pointer ${
                                    selectedArea === areaName
                                        ? 'bg-[#800A15] text-white shadow-md'
                                        : 'bg-white hover:bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 text-slate-500 dark:text-slate-400'
                                }`}
                            >
                                {areaName}
                            </button>
                        ))}
                    </div>

                    {/* Compact & Organized Teachers Grid (5 Columns Desktop) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {profesoresFiltrados.map((prof, idx) => (
                            <motion.div 
                                key={prof.nombre}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: (idx % 15) * 0.03 }}
                                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
                            >
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3.5 border-2 border-slate-100 dark:border-slate-800 group-hover:border-[#003C8F] transition-colors shadow-sm shrink-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                    {prof.foto ? (
                                        <img 
                                            src={prof.foto} 
                                            alt={prof.nombre} 
                                            className="w-full h-full object-cover object-[center_20%]" 
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600">
                                            <User className="w-9 h-9" />
                                        </div>
                                    )}
                                </div>
                                <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-snug min-h-[36px] flex items-center justify-center">
                                    {prof.nombre}
                                </h4>
                                <span className="text-[11px] font-bold text-[#003C8F] dark:text-blue-400 mt-1.5 block">
                                    {prof.asignatura}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Banner inspiracional */}
                    <div className="mt-14 bg-gradient-to-r from-[#003C8F] via-blue-800 to-[#800A15] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                        <div className="space-y-2 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-300 font-bold text-xs uppercase tracking-widest">
                                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                                Tradición Salesiana de Don Bosco
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-white">
                                "Educación es cosa del corazón"
                            </h3>
                            <p className="text-blue-100 text-sm font-medium max-w-xl">
                                Nuestros docentes inspiran, acompañan y guían con vocación y alegría el aprendizaje de los estudiantes.
                            </p>
                        </div>
                        <Link
                            href="/contacto"
                            className="px-6 py-3.5 rounded-2xl bg-white text-[#003C8F] font-extrabold text-sm hover:scale-105 transition-all duration-300 shadow-lg shrink-0"
                        >
                            Contactar con la Institución
                        </Link>
                    </div>
                </section>

            </div>
        </AppLayout>
    );
}
