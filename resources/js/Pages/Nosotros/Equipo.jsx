import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { motion } from 'framer-motion';
import { 
    Users, 
    Briefcase, 
    GraduationCap, 
    Mail, 
    Phone, 
    Award,
    Sparkles,
    User
} from 'lucide-react';

const R2_DOCENTES_BASE = "https://pub-c4ddb3fb75904158bbda5fbc35d6963e.r2.dev/nuestro_colegio/equipo/docentes/";
const R2_ADMINS_BASE   = "https://pub-c4ddb3fb75904158bbda5fbc35d6963e.r2.dev/nuestro_colegio/equipo/administrativos/";

const getDocenteR2Url = (nombreCompleto) => {
    return `${R2_DOCENTES_BASE}${encodeURIComponent(nombreCompleto)}.JPG`;
};

const getAdminR2Url = (nombreCompleto) => {
    return `${R2_ADMINS_BASE}${encodeURIComponent(nombreCompleto)}.JPG`;
};

export default function Equipo({ equipo = [] }) {
    const [selectedArea, setSelectedArea] = useState('Todos');

    // Separar equipo directivo y docente desde la base de datos (o usar fallback estático)
    const directivosFromDb = equipo.filter(m => m.tipo === 'directivo');
    const docentesFromDb = equipo.filter(m => m.tipo === 'docente');

    const defaultDirectivos = [
        { nombre: 'Sor Beatriz Cortés Jerez', cargo: 'Rectora', foto: getAdminR2Url('Sor Beatriz Cortés Jerez'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Jaime Manuel Ardila Parra', cargo: 'Coordinador Académico', foto: getDocenteR2Url('Jaime Manuel Ardila Parra'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Margarita María Valle Manrique', cargo: 'Coordinadora de Convivencia', foto: getDocenteR2Url('Margarita María Valle Manrique'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Erika Tatiana Delgadillo Avella', cargo: 'Coordinadora de Pastoral', foto: getDocenteR2Url('Erika Tatiana Delgadillo Avella'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Mayra Alexandra Parada Ruiz', cargo: 'Psicoorientación / Apoyo Administrativo', foto: getAdminR2Url('Mayra Alexandra Parada Ruiz'), foto_posicion: 20, foto_zoom: 100 }
    ];

    const directivos = directivosFromDb.length > 0 ? directivosFromDb : defaultDirectivos;

    // Áreas de Administración
    const administracion = [
        { area: 'Rectoría', encargado: 'Sor Beatriz Cortés Jerez', cargo: 'Rectora', tel: '(607) 637 1234', email: 'rectoria@colsih.edu.co' },
        { area: 'Coordinación Académica', encargado: 'Jaime Manuel Ardila Parra', cargo: 'Coordinador Académico', tel: '(607) 637 1235', email: 'academica@colsih.edu.co' },
        { area: 'Coordinación de Convivencia', encargado: 'Margarita María Valle Manrique', cargo: 'Coordinadora de Convivencia', tel: '(607) 637 1236', email: 'convivencia@colsih.edu.co' },
        { area: 'Coordinación Pastoral', encargado: 'Erika Tatiana Delgadillo Avella', cargo: 'Coordinadora de Pastoral', tel: '(607) 637 1237', email: 'pastoral@colsih.edu.co' },
        { area: 'Psicoorientación y Apoyo', encargado: 'Mayra Alexandra Parada Ruiz', cargo: 'Psicoorientadora', tel: '(607) 637 1238', email: 'orientacion@colsih.edu.co' }
    ];

    const defaultDocentes = [
        { nombre: 'Adriana María Jaimes Ruiz', asignatura: 'Ed. Religiosa', area: 'Ed. Religiosa y Ética', foto: getDocenteR2Url('Adriana María Jaimes Ruiz'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Bruna Mercedes Peña Solano', asignatura: 'Lengua Castellana', area: 'Lengua Castellana', foto: getDocenteR2Url('Bruna Mercedes Peña Solano'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Clara Inés Joya Herrera', asignatura: 'Matemáticas', area: 'Matemáticas', foto: getDocenteR2Url('Clara Inés Joya Herrera'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Daniela Villamizar Villamizar', asignatura: 'Todas las Dimensiones', area: 'Preescolar y Primaria', foto: getDocenteR2Url('Daniela Villamizar Villamizar'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Diana Soidé Villamizar Bautista', asignatura: 'Lengua Castellana (Primaria)', area: 'Lengua Castellana', foto: getDocenteR2Url('Diana Soidé Villamizar Bautista'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Edgar Javier García Estupiñán', asignatura: 'Ciencias Sociales', area: 'Ciencias Sociales', foto: getDocenteR2Url('Edgar Javier García Estupiñán'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Erika Tatiana Delgadillo Avella', asignatura: 'Ciencias Sociales', area: 'Ciencias Sociales', foto: getDocenteR2Url('Erika Tatiana Delgadillo Avella'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Fredy Neira Roa', asignatura: 'Matemáticas y Física', area: 'Matemáticas', foto: getDocenteR2Url('Fredy Neira Roa'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Gloria Mercedes Serrano Salazar', asignatura: 'Ed. Religiosa', area: 'Ed. Religiosa y Ética', foto: getDocenteR2Url('Gloria Mercedes Serrano Salazar'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Héctor Manuel Garzón Gómez', asignatura: 'Ética y Ed. Religiosa', area: 'Ed. Religiosa y Ética', foto: getDocenteR2Url('Héctor Manuel Garzón Gómez'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Irma Sánchez Espinosa', asignatura: 'Ciencias Naturales', area: 'Ciencias Naturales', foto: getDocenteR2Url('Irma Sanchez Espinosa'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Iván Martínez Peña', asignatura: 'Tecnología e Informática', area: 'Tecnología e Informática', foto: getDocenteR2Url('Iván Martínez Peña'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Jenny Marcela Pérez Medina', asignatura: 'Química', area: 'Ciencias Naturales', foto: getDocenteR2Url('Jenny Marcela Pérez Medina'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Jesús David Arias Estupiñán', asignatura: 'Tecnología y Estadística', area: 'Tecnología e Informática', foto: getDocenteR2Url('Jesús David Arias Estupiñán'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Jeyson Eduardo Suárez Ardila', asignatura: 'Matemáticas', area: 'Matemáticas', foto: getDocenteR2Url('Jeyson Eduardo Suárez Ardila'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Jeyson Mauricio Ávila Triana', asignatura: 'Ed. Física y Deportes', area: 'Ed. Física y Expresión', foto: getDocenteR2Url('Jeyson Mauricio Ávila Triana'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Karen Navarro Pisciotti', asignatura: 'Lengua Castellana', area: 'Lengua Castellana', foto: getDocenteR2Url('Karen Navarro Pisciotti'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Karen Tatiana Linares Gelvez', asignatura: 'Lengua Castellana', area: 'Lengua Castellana', foto: getDocenteR2Url('Karen Tatiana Linares Gelvez'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Katerin Johanna Delgado Ruda', asignatura: 'Ciencias Sociales', area: 'Ciencias Sociales', foto: getDocenteR2Url('Katerin Johanna Delgado Ruda'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Lady Diana Osorio Fonseca', asignatura: 'Todas las Asignaturas', area: 'Preescolar y Primaria', foto: getDocenteR2Url('Lady Diana Osorio Fonseca'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Leidy Andrea Portilla Gelvez', asignatura: 'Matemáticas', area: 'Matemáticas', foto: getDocenteR2Url('Leidy Andrea Portilla Gelvez'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Leidy Paola Basto Ramírez', asignatura: 'Inglés', area: 'Inglés', foto: getDocenteR2Url('Leidy Paola Basto Ramírez'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Ludwin Fernando Caballero Espinosa', asignatura: 'Ed. Física y Deportes', area: 'Ed. Física y Expresión', foto: getDocenteR2Url('Ludwin Fernando Caballero Espinosa'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Luz Adriana García Villamizar', asignatura: 'Artes y Ética', area: 'Ed. Física y Expresión', foto: getDocenteR2Url('Luz Adriana García Villamizar'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Mayra Jisseth Sierra Lombana', asignatura: 'Inglés', area: 'Inglés', foto: getDocenteR2Url('Mayra Jisseth Sierra Lombana'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Miguel Oswaldo Lizarazo Latorre', asignatura: 'Contabilidad SENA', area: 'Contabilidad SENA', foto: getDocenteR2Url('Miguel Oswaldo Lizarazo Latorre'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Paula Lorena Cuadros Ballesteros', asignatura: 'Todas las Dimensiones', area: 'Preescolar y Primaria', foto: getDocenteR2Url('Paula Lorena Cuadros Ballesteros'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Robin Javier Aparicio Aparicio', asignatura: 'Filosofía y Ed. Religiosa', area: 'Ciencias Sociales', foto: getDocenteR2Url('Robin Javier Aparicio Aparicio'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Sandra Patricia Parada Leal', asignatura: 'Música', area: 'Ed. Física y Expresión', foto: getDocenteR2Url('Sandra Patricia Parada Leal'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Sergio Andrés Mendoza Gómez', asignatura: 'Inglés', area: 'Inglés', foto: getDocenteR2Url('Sergio Andrés Mendoza Gómez'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Yesica Zoraya Badillo Corredor', asignatura: 'Ciencias Naturales', area: 'Ciencias Naturales', foto: getDocenteR2Url('Yesica Zoraya Badillo Corredor'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Yoleida Patricia Camacho Corzo', asignatura: 'Inglés', area: 'Inglés', foto: getAdminR2Url('Yoleida Patricia Camacho Corzo'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Yoni Amparo Méndez Álvarez', asignatura: 'Matemáticas e Informática', area: 'Matemáticas', foto: getDocenteR2Url('Yoni Amparo Méndez Álvarez'), foto_posicion: 20, foto_zoom: 100 }
    ];

    const todosLosProfesores = docentesFromDb.length > 0
        ? docentesFromDb.map(d => ({ ...d, asignatura: d.cargo }))
        : defaultDocentes;

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
                                    <div className="aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden relative flex items-center justify-center">
                                        {p.foto ? (
                                            <img 
                                                src={p.foto} 
                                                alt={p.nombre} 
                                                className="w-full h-full object-cover"
                                                style={{
                                                    objectPosition: `center ${p.foto_posicion ?? 20}%`,
                                                    transform: `scale(${(p.foto_zoom ?? 100) / 100})`
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600">
                                                <User className="w-20 h-20" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 text-center bg-white dark:bg-slate-900">
                                        <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-base leading-snug">
                                            {p.nombre}
                                        </h4>
                                        <span className={`text-xs font-extrabold uppercase tracking-wider block mt-1 ${roleClass}`}>
                                            {p.cargo}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* ── 3. Directorio Administrativo ── */}
                <section className="relative z-10 py-12 px-6 max-w-[1240px] mx-auto">
                    <div className="flex items-center gap-3.5 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-[#800A15] dark:text-rose-400 flex items-center justify-center shrink-0 shadow-sm">
                            <Briefcase className="w-5.5 h-5.5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
                                Directorio Administrativo
                            </h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                                Canales directos de atención y gestión escolar
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {administracion.map((item, idx) => {
                            const isVino = idx % 2 === 0;
                            const borderHover = isVino ? 'hover:border-t-[#800A15]' : 'hover:border-t-[#003C8F]';

                            return (
                                <motion.div 
                                    key={item.area}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                                    className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border-t-4 border-t-transparent ${borderHover} flex flex-col justify-between`}
                                >
                                    <div>
                                        <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 mb-4 font-bold text-xs">
                                            0{idx + 1}
                                        </div>
                                        <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm leading-tight mb-2">
                                            {item.area}
                                        </h4>
                                        <div className="space-y-0.5">
                                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
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

                {/* ── 4. Docentes de la Institución ── */}
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

                    {/* Barra de filtros envolvente para que no se recorte ninguna asignatura */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 w-full select-none">
                        {areasList.map((areaName) => (
                            <button
                                key={areaName}
                                onClick={() => setSelectedArea(areaName)}
                                className={`px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full font-extrabold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                                    selectedArea === areaName
                                        ? 'bg-[#800A15] text-white shadow-md shadow-[#800A15]/20 scale-105'
                                        : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#800A15]'
                                }`}
                            >
                                {areaName}
                            </button>
                        ))}
                    </div>

                    {/* Tarjetas de Docentes en Formato Retrato (Foto ocupa la mitad superior) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {profesoresFiltrados.map((prof, idx) => (
                            <motion.div 
                                key={prof.nombre}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: (idx % 15) * 0.03 }}
                                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                            >
                                {/* Foto de la mitad superior de la card */}
                                <div className="w-full aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden relative flex items-center justify-center">
                                    {prof.foto ? (
                                        <img 
                                            src={prof.foto} 
                                            alt={prof.nombre} 
                                            className="w-full h-full object-cover transition-all duration-300"
                                            style={{
                                                objectPosition: `center ${prof.foto_posicion ?? 20}%`,
                                                transform: `scale(${(prof.foto_zoom ?? 100) / 100})`
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600">
                                            <User className="w-12 h-12" />
                                        </div>
                                    )}
                                </div>

                                {/* Información en la mitad inferior de la card */}
                                <div className="p-4 text-center flex-1 flex flex-col justify-between bg-white dark:bg-slate-900">
                                    <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-snug">
                                        {prof.nombre}
                                    </h4>
                                    <span className="text-[11px] font-bold text-[#003C8F] dark:text-blue-400 mt-2 block">
                                        {prof.asignatura}
                                    </span>
                                </div>
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
