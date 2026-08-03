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

const R2_DOCENTES_BASE = "https://pub-c4ddb3fb75904158bbda5fbc35d6963e.r2.dev/nuestro_colegio/equipo/docentes/";

const getDocenteR2Url = (nombreCompleto) => {
    return `${R2_DOCENTES_BASE}${encodeURIComponent(nombreCompleto)}.JPG`;
};

export default function Equipo({ equipo = [] }) {
    const [selectedArea, setSelectedArea] = useState('Todos');

    // Separar equipo directivo y docente desde la base de datos (o usar fallback estático)
    const directivosFromDb = equipo.filter(m => m.tipo === 'directivo');
    const docentesFromDb = equipo.filter(m => m.tipo === 'docente');

    const defaultDirectivos = [
        { nombre: 'Sor Beatriz Cortés Jerez', cargo: 'Rectora', foto: '/docentes/Sor%20Betty.JPG', foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Jaime Manuel Ardila Parra', cargo: 'Coordinador Académico', foto: getDocenteR2Url('Jaime Manuel Ardila Parra'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Margarita María Valle Manrique', cargo: 'Coordinadora de Convivencia', foto: getDocenteR2Url('Margarita María Valle Manrique'), foto_posicion: 20, foto_zoom: 100 },
        { nombre: 'Erika Tatiana Delgadillo Avella', cargo: 'Coordinadora de Pastoral', foto: getDocenteR2Url('Erika Tatiana Delgadillo Avella'), foto_posicion: 20, foto_zoom: 100 }
    ];

    const directivos = directivosFromDb.length > 0 ? directivosFromDb : defaultDirectivos;

    // Áreas de Administración
    const administracion = [
        { area: 'Rectoría', encargado: 'Sor Beatriz Cortés Jerez', cargo: 'Rectora', tel: '(607) 637 1234', email: 'rectoria@colsih.edu.co' },
        { area: 'Coordinación Académica', encargado: 'Jaime Manuel Ardila Parra', cargo: 'Coordinador Académico', tel: '(607) 637 1235', email: 'academica@colsih.edu.co' },
        { area: 'Coordinación de Convivencia', encargado: 'Margarita María Valle Manrique', cargo: 'Coordinadora de Convivencia', tel: '(607) 637 1236', email: 'convivencia@colsih.edu.co' },
        { area: 'Coordinación Pastoral', encargado: 'Erika Tatiana Delgadillo Avella', cargo: 'Coordinadora de Pastoral', tel: '(607) 637 1237', email: 'pastoral@colsih.edu.co' }
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
        { nombre: 'Yoleida Patricia Camacho Corzo', asignatura: 'Inglés', area: 'Inglés', foto: getDocenteR2Url('Yoleida Patricia Camacho Corzo'), foto_posicion: 20, foto_zoom: 100 },
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
            <Head title="Equipo Docente y Directivo | COLSIH" />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans">
                
                {/* Hero Banner */}
                <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#800A15] text-white overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-black/20 blur-2xl pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4 max-w-3xl mx-auto"
                        >
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-amber-300">
                                <Users className="w-4 h-4 text-amber-400" />
                                <span>Comunidad Educativa Salesiana</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                                Nuestro Equipo
                            </h1>

                            <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-medium">
                                Profesionales apasionados comprometidos con la formación integral de nuestros estudiantes en la fe, la ciencia y la justicia.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Equipo Directivo */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                        <span className="text-xs font-black uppercase tracking-widest text-[#800A15] dark:text-rose-400">
                            Liderazgo Institucional
                        </span>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            Equipo Directivo
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Guiando a nuestra comunidad con la visión pedagógica salesiana.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {directivos.map((persona, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md group hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    {persona.foto ? (
                                        <img 
                                            src={persona.foto} 
                                            alt={persona.nombre}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            style={{
                                                objectPosition: `${persona.foto_posicion_x ?? 50}% ${persona.foto_posicion_y ?? (persona.foto_posicion ?? 20)}%`,
                                                transform: `scale(${(persona.foto_zoom ?? 100) / 100})`
                                            }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    <div 
                                        className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400"
                                        style={{ display: persona.foto ? 'none' : 'flex' }}
                                    >
                                        <User className="w-16 h-16 stroke-1" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 right-3 text-white">
                                        <span className="bg-[#800A15] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-block mb-1 shadow-md">
                                            {persona.cargo}
                                        </span>
                                        <h3 className="text-base font-black text-white leading-tight">
                                            {persona.nombre}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Cuerpo Docente */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/80 dark:border-slate-800">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-[#003C8F] dark:text-blue-400">
                                Excelencia Académica
                            </span>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                                Cuerpo Docente ({profesoresFiltrados.length})
                            </h2>
                        </div>

                        {/* Filtros por Área */}
                        <div className="flex flex-wrap gap-2">
                            {areasList.map((area) => (
                                <button
                                    key={area}
                                    onClick={() => setSelectedArea(area)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                        selectedArea === area
                                            ? 'bg-[#800A15] text-white shadow-md'
                                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {area}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {profesoresFiltrados.map((profesor, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
                                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                            >
                                <div className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    {profesor.foto ? (
                                        <img 
                                            src={profesor.foto} 
                                            alt={profesor.nombre}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            style={{
                                                objectPosition: `${profesor.foto_posicion_x ?? 50}% ${profesor.foto_posicion_y ?? (profesor.foto_posicion ?? 20)}%`,
                                                transform: `scale(${(profesor.foto_zoom ?? 100) / 100})`
                                            }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    <div 
                                        className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400"
                                        style={{ display: profesor.foto ? 'none' : 'flex' }}
                                    >
                                        <User className="w-16 h-16 stroke-1" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 right-3 text-white">
                                        <span className="bg-[#003C8F] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-block mb-1 shadow-md">
                                            {profesor.asignatura}
                                        </span>
                                        <h3 className="text-sm font-black text-white leading-snug">
                                            {profesor.nombre}
                                        </h3>
                                        <span className="text-[11px] font-medium text-slate-300 block mt-0.5">
                                            {profesor.area}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Directorio de Contacto por Área / Administración */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/80 dark:border-slate-800">
                    <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                        <span className="text-xs font-black uppercase tracking-widest text-[#800A15] dark:text-rose-400">
                            Atención a la Comunidad
                        </span>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            Directorio Administrativo
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {administracion.map((item, index) => (
                            <div 
                                key={index}
                                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
                            >
                                <div className="space-y-2">
                                    <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-[#800A15] dark:text-rose-400 font-bold">
                                        <Briefcase className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                                        {item.area}
                                    </h3>
                                    <p className="text-xs font-bold text-[#800A15] dark:text-rose-400">
                                        {item.encargado}
                                    </p>
                                    <span className="text-xs text-slate-500 font-medium block">
                                        {item.cargo}
                                    </span>
                                </div>

                                <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                                        <span>{item.tel}</span>
                                    </div>
                                    <div className="flex items-center gap-2 truncate">
                                        <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                                        <a href={`mailto:${item.email}`} className="hover:underline text-blue-600 dark:text-blue-400 truncate">
                                            {item.email}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </AppLayout>
    );
}
