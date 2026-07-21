import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { motion } from 'framer-motion';
import { 
    Users, 
    UserCheck, 
    Briefcase, 
    GraduationCap, 
    Lightbulb, 
    Mail, 
    Phone, 
    Award
} from 'lucide-react';

export default function Equipo() {
    const [selectedArea, setSelectedArea] = useState('Matemáticas');

    // Custom Directivos Data
    const directivos = [
        { nombre: 'Sor María Eugenia', cargo: 'Rectora', foto: '/testimonio_egresada.png' },
        { nombre: 'Juan Camilo López', cargo: 'Coordinador Académico', foto: '/testimonio_padre.png' },
        { nombre: 'Laura Pérez', cargo: 'Coordinadora de Convivencia', foto: '/testimonio_egresada.png' },
        { nombre: 'Carlos Ramírez', cargo: 'Coordinador Pastoral', foto: '/testimonio_padre.png' }
    ];

    // Custom Acta Directiva Data
    const actaDirectiva = [
        { nombre: 'P. Alberto Gómez', cargo: 'Presidente', foto: '/testimonio_padre.png' },
        { nombre: 'María Claudia R.', cargo: 'Vicepresidente', foto: '/testimonio_egresada.png' },
        { nombre: 'José Ignacio T.', cargo: 'Secretario', foto: '/testimonio_padre.png' },
        { nombre: 'Ana Milena S.', cargo: 'Vocal', foto: '/testimonio_egresada.png' },
        { nombre: 'Andrés Felipe B.', cargo: 'Vocal', foto: '/testimonio_padre.png' }
    ];

    // Administration area cards
    const administracion = [
        { area: 'Rectoría', encargado: 'Sor María Eugenia', cargo: 'Rectora', tel: '(601) 123 4567', email: 'rectoria@santaisabel.edu.co' },
        { area: 'Contabilidad', encargado: 'Paola Andrea Silva', cargo: 'Contadora', tel: '(601) 123 4568', email: 'contabilidad@santaisabel.edu.co' },
        { area: 'Secretaría', encargado: 'Carolina Martínez', cargo: 'Secretaria', tel: '(601) 123 4569', email: 'secretaria@santaisabel.edu.co' }
    ];

    // Teachers listed per school area category
    const profesoresPorArea = {
        'Matemáticas': [
            { nombre: 'Natalia Gómez', cargo: 'Docente', foto: '/testimonio_egresada.png' },
            { nombre: 'Diego Mora', cargo: 'Docente', foto: '/testimonio_padre.png' },
            { nombre: 'Valentina Ruiz', cargo: 'Docente', foto: '/testimonio_egresada.png' },
            { nombre: 'Santiago Diaz', cargo: 'Docente', foto: '/testimonio_padre.png' }
        ],
        'Ciencias Naturales': [
            { nombre: 'Camilo Torres', cargo: 'Docente', foto: '/testimonio_padre.png' },
            { nombre: 'Diana Reyes', cargo: 'Docente', foto: '/testimonio_egresada.png' },
            { nombre: 'Andrés Mendoza', cargo: 'Docente', foto: '/testimonio_padre.png' },
            { nombre: 'Laura Medina', cargo: 'Docente', foto: '/testimonio_egresada.png' }
        ],
        'Lengua Castellana': [
            { nombre: 'María José Ortiz', cargo: 'Docente', foto: '/testimonio_egresada.png' },
            { nombre: 'Felipe Rueda', cargo: 'Docente', foto: '/testimonio_padre.png' },
            { nombre: 'Isabella Castro', cargo: 'Docente', foto: '/testimonio_egresada.png' },
            { nombre: 'Mateo Gómez', cargo: 'Docente', foto: '/testimonio_padre.png' }
        ],
        'Inglés': [
            { nombre: 'Daniela Vergara', cargo: 'Docente', foto: '/testimonio_egresada.png' },
            { nombre: 'Ricardo Rojas', cargo: 'Docente', foto: '/testimonio_padre.png' },
            { nombre: 'Sofía Londoño', cargo: 'Docente', foto: '/testimonio_egresada.png' },
            { nombre: 'Lucas Villa', cargo: 'Docente', foto: '/testimonio_padre.png' }
        ],
        'Ciencias Sociales': [
            { nombre: 'Alejandra Pérez', cargo: 'Docente', foto: '/testimonio_egresada.png' },
            { nombre: 'Javier Restrepo', cargo: 'Docente', foto: '/testimonio_padre.png' },
            { nombre: 'Clara Inés Silva', cargo: 'Docente', foto: '/testimonio_egresada.png' },
            { nombre: 'Juan Pablo Marín', cargo: 'Docente', foto: '/testimonio_padre.png' }
        ],
        'Educación Artística': [
            { nombre: 'Tatiana Suárez', cargo: 'Docente', foto: '/testimonio_egresada.png' },
            { nombre: 'Carlos Mario Gil', cargo: 'Docente', foto: '/testimonio_padre.png' },
            { nombre: 'Gabriela Muñoz', cargo: 'Docente', foto: '/testimonio_egresada.png' },
            { nombre: 'Esteban Ortiz', cargo: 'Docente', foto: '/testimonio_padre.png' }
        ],
        'Educación Física': [
            { nombre: 'Mauricio Henao', cargo: 'Docente', foto: '/testimonio_padre.png' },
            { nombre: 'Andrea Guerrero', cargo: 'Docente', foto: '/testimonio_egresada.png' },
            { nombre: 'Nelson Caicedo', cargo: 'Docente', foto: '/testimonio_padre.png' },
            { nombre: 'Paola Andrea G.', cargo: 'Docente', foto: '/testimonio_egresada.png' }
        ]
    };

    const areasKeys = Object.keys(profesoresPorArea);

    return (
        <AppLayout>
            <Head title="Equipo Institucional | COLSIH" />

            {/* Custom CSS overrides to guarantee cross-browser scrollbar hiding */}
            <style dangerouslySetInnerHTML={{__html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none !important;
                }
                .no-scrollbar {
                    -ms-overflow-style: none !important;
                    scrollbar-width: none !important;
                }
            `}} />

            {/* Main Page Outer Container */}
            <div className="relative bg-[#FAFCFF] dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen overflow-hidden pb-16 transition-colors duration-300">
                
                {/* Dotted Grid Backdrop Decoration */}
                <div 
                    className="absolute inset-0 opacity-[0.05] dark:opacity-[0.01] pointer-events-none" 
                    style={{
                        backgroundImage: 'radial-gradient(#003C8F 1.2px, transparent 1.2px)',
                        backgroundSize: '24px 24px'
                    }} 
                />

                {/* ── 1. Hero Section (Full Screen Width, Azul Rey + Wave Bottom) ── */}
                <section className="relative w-full bg-gradient-to-r from-[#003C8F] to-[#0D1B2E] text-white pt-36 pb-36 px-6 overflow-hidden">
                    {/* Background image overlay */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-10 brightness-[0.2] pointer-events-none"
                        style={{ backgroundImage: "url('/Panoramica COLSIH.png')" }}
                    />

                    {/* Left & Right abstract curves */}
                    <div className="absolute right-0 bottom-0 top-0 w-[35%] opacity-15 border-l border-amber-400 rounded-l-[50%] bg-gradient-to-r from-transparent to-amber-400/5 pointer-events-none hidden lg:block" />

                    <div className="relative z-10 max-w-[1240px] mx-auto text-left">
                        {/* Hero Left Info */}
                        <div className="max-w-2xl space-y-4">
                            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-xs">
                                <Users className="w-4 h-4 text-amber-400" />
                                Conoce a quienes hacen posible
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                                Equipo Institucional
                            </h1>
                            <div className="w-20 h-1.5 bg-amber-400 rounded-full" />
                            <p className="text-slate-300 font-semibold text-sm md:text-base leading-relaxed pt-1">
                                Un gran equipo comprometido con la formación integral de nuestros estudiantes, guiados por valores y excelencia.
                            </p>
                        </div>
                    </div>

                    {/* Wave SVG transition to body background (Pixel-perfect overlap check to fix bottom alignment line) */}
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

                {/* ── 2. Equipo Directivo (Cards styled with alternating Vino Tinto and Azul Rey top borders) ── */}
                <section className="relative z-10 py-12 px-6 max-w-[1240px] mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-3.5 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div className="w-10 h-10 rounded-2xl bg-[#003C8F]/10 dark:bg-blue-950/40 text-[#003C8F] dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
                            <Award className="w-5.5 h-5.5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
                                Equipo Directivo
                            </h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                                Comunidad de religiosas y directores de formación
                            </p>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {directivos.map((p, idx) => {
                            const isVino = idx % 2 === 0;
                            const borderClass = isVino ? 'border-t-4 border-t-[#800A15] hover:border-[#800A15]/50' : 'border-t-4 border-t-[#003C8F] hover:border-[#003C8F]/50';
                            const roleClass = isVino ? 'text-[#800A15] dark:text-rose-400' : 'text-[#003C8F] dark:text-blue-400';

                            return (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[28px] overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-300 ${borderClass}`}
                                >
                                    <div className="aspect-[4/5] bg-slate-50 dark:bg-slate-950 overflow-hidden relative">
                                        <img 
                                            src={p.foto} 
                                            alt={p.nombre} 
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Grid mesh on card background */}
                                        <div className="absolute inset-0 opacity-[0.03] bg-radial-gradient from-black to-transparent pointer-events-none" />
                                    </div>
                                    <div className="p-5 text-center bg-white dark:bg-slate-900">
                                        <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-base leading-snug">
                                            {p.nombre}
                                        </h4>
                                        <span className={`text-[10px] font-black uppercase tracking-widest block mt-1.5 ${roleClass}`}>
                                            {p.cargo}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* ── 3. Acta Directiva ── */}
                <section className="relative z-10 py-12 px-6 max-w-[1240px] mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-3.5 mb-10 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div className="w-10 h-10 rounded-2xl bg-[#800A15]/10 dark:bg-rose-950/40 text-[#800A15] dark:text-rose-400 flex items-center justify-center shrink-0 shadow-sm">
                            <UserCheck className="w-5.5 h-5.5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
                                Acta Directiva
                            </h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                                Consejeros de apoyo institucional
                            </p>
                        </div>
                    </div>

                    {/* Circular items grid (Larger sizes with wide grid spacing gaps to prevent overlapping) */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 sm:gap-10 lg:gap-14 justify-center">
                        {actaDirectiva.map((p, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                className="flex flex-col items-center text-center space-y-3.5"
                            >
                                <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full border-4 border-slate-100 dark:border-slate-800 overflow-hidden shadow-inner hover:border-amber-400 dark:hover:border-amber-400 transition-colors duration-300">
                                    <img 
                                        src={p.foto} 
                                        alt={p.nombre} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-[15px] leading-tight">
                                        {p.nombre}
                                    </h4>
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block mt-0.5">
                                        {p.cargo}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── 4. Administración (Cards with alternating left border colors of Vino Tinto and Azul Rey) ── */}
                <section className="relative z-10 py-12 px-6 max-w-[1240px] mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-3.5 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
                            <Briefcase className="w-5.5 h-5.5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
                                Administración
                            </h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                                Canales de comunicación con el personal de oficina
                            </p>
                        </div>
                    </div>

                    {/* Admin Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
                        
                        {/* Map administrative contact cards with always-visible details and alternating left border colors */}
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
                                            <h4 className="text-lg font-black text-slate-800 dark:text-white">
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
                                            <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
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

                        {/* Elegant banner card (Column 4) */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-gradient-to-tr from-blue-500/10 to-indigo-500/5 dark:from-blue-950/20 dark:to-transparent border border-blue-100/50 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-center gap-4 relative overflow-hidden text-left"
                        >
                            {/* Shield background design vector */}
                            <div className="absolute top-1/2 -right-8 -translate-y-1/2 opacity-25 text-blue-500 pointer-events-none">
                                <Award className="w-32 h-32" />
                            </div>

                            <div className="space-y-3 relative z-10">
                                <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm font-bold leading-relaxed">
                                    Cada área trabaja con compromiso y dedicación para brindar una educación de calidad.
                                </p>
                                <div className="w-10 h-[3px] bg-[#800A15] rounded-full" />
                            </div>
                        </motion.div>

                    </div>
                </section>

                {/* ── 5. Profesores por área (Cards styled with alternating border accents) ── */}
                <section className="relative z-10 py-12 px-6 max-w-[1240px] mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-3.5 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
                            <GraduationCap className="w-5.5 h-5.5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
                                Profesores por área
                            </h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                                Cuerpo docente especializado y formador
                            </p>
                        </div>
                    </div>

                    {/* Area category sliding tabs */}
                    <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar w-full select-none snap-x">
                        {areasKeys.map((areaName) => (
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

                    {/* Interactive Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        
                        {/* Teachers List Column (lg:col-span-8) */}
                        <div className="col-span-12 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {profesoresPorArea[selectedArea]?.map((prof, idx) => {
                                const isVino = idx % 2 === 0;
                                const borderClass = isVino ? 'border-b-4 border-b-[#800A15]' : 'border-b-4 border-b-[#003C8F]';
                                const textClass = isVino ? 'text-[#800A15] dark:text-rose-400' : 'text-[#003C8F] dark:text-blue-400';

                                return (
                                    <motion.div 
                                        key={prof.nombre + selectedArea}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.35, delay: idx * 0.05 }}
                                        className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 ${borderClass}`}
                                    >
                                        <div className="aspect-[4/5] bg-slate-50 dark:bg-slate-950 overflow-hidden">
                                            <img 
                                                src={prof.foto} 
                                                alt={prof.nombre} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-3 text-center">
                                            <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-tight">
                                                {prof.nombre}
                                            </h4>
                                            <span className={`text-[9px] font-black block mt-1 ${textClass}`}>
                                                {prof.cargo}
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Vino Tinto callout banner (lg:col-span-4) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="col-span-12 lg:col-span-4 bg-[#800A15] border border-rose-950 rounded-3xl p-8 text-white flex flex-col justify-between space-y-8 relative overflow-hidden shadow-xl text-left"
                        >
                            {/* Abstract glowing background inside banner */}
                            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/5 blur-2xl pointer-events-none" />

                            <div className="space-y-4 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center shadow-inner">
                                    <Lightbulb className="w-6 h-6 text-amber-300 animate-pulse" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-serif italic font-extrabold text-white leading-tight">
                                    Formación que deja huella
                                </h3>
                                <p className="text-rose-100 text-xs md:text-sm leading-relaxed font-semibold">
                                    Nuestros docentes inspiran, acompañan y guían cada paso del aprendizaje de los estudiantes.
                                </p>
                            </div>

                            <div className="w-14 h-[3px] bg-amber-400 rounded-full relative z-10" />
                        </motion.div>

                    </div>
                </section>



            </div>
        </AppLayout>
    );
}
