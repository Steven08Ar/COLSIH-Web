import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState, useRef, useEffect } from 'react';
import ScrollReveal from '@/Components/ScrollReveal';
import FloatingShapes from '@/Components/FloatingShapes';

export default function MisionVision() {
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftState, setScrollLeftState] = useState(0);
    const [activeDot, setActiveDot] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const objetivosData = [
        {
            id: '01',
            titulo: 'Excelencia Académica y Terciaria',
            desc: 'Ofrecer un servicio educativo completo y riguroso de alta calidad que prepare de manera integral a los estudiantes para su exitoso ingreso y desempeño en la educación terciaria, fomentando el pensamiento crítico, la investigación y la disciplina intelectual.',
            color: 'border-blue-100 dark:border-slate-800/80 text-blue-600 bg-white dark:bg-slate-900 hover:border-blue-500/50 hover:shadow-[0_20px_40px_rgba(37,99,235,0.06)] dark:hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)]',
            iconColor: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
            badgeBg: 'bg-blue-600 text-white shadow-sm shadow-blue-500/10',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
            )
        },
        {
            id: '02',
            titulo: 'Formación Salesiana y Humana',
            desc: 'Orientar el proceso formativo basado en los principios del evangelio y el sistema preventivo salesiano. Cultivamos la amabilidad, la razón y la espiritualidad para entregar ciudadanos íntegros, solidarios y éticos a la sociedad.',
            color: 'border-rose-100 dark:border-slate-800/80 text-[#800A15] bg-white dark:bg-slate-900 hover:border-rose-500/50 hover:shadow-[0_20px_40px_rgba(128,10,21,0.06)] dark:hover:shadow-[0_20px_40px_rgba(128,10,21,0.15)]',
            iconColor: 'bg-rose-50 text-[#800A15] dark:bg-rose-950/40 dark:text-rose-400',
            badgeBg: 'bg-[#800A15] text-white shadow-sm shadow-red-500/10',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            )
        },
        {
            id: '03',
            titulo: 'Inclusión y Valoración de la Persona',
            desc: 'Garantizar un entorno seguro, inclusivo y equitativo que atienda a la diversidad de ritmos de aprendizaje, promoviendo el respeto por los derechos humanos, la empatía mutua y la valoración de las capacidades únicas de cada estudiante.',
            color: 'border-emerald-100 dark:border-slate-800/80 text-emerald-600 bg-white dark:bg-slate-900 hover:border-emerald-500/50 hover:shadow-[0_20px_40px_rgba(16,185,129,0.06)] dark:hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)]',
            iconColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
            badgeBg: 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/10',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        {
            id: '04',
            titulo: 'Articulación Técnica y Comercial',
            desc: 'Desarrollar y consolidar los lineamientos curriculares contextualizados a través del convenio estratégico de media técnica con el SENA, capacitando a los jóvenes en competencias laborales prácticas de administración y comercio.',
            color: 'border-orange-100 dark:border-slate-800/80 text-orange-600 bg-white dark:bg-slate-900 hover:border-orange-500/50 hover:shadow-[0_20px_40px_rgba(249,115,22,0.06)] dark:hover:shadow-[0_20px_40px_rgba(249,115,22,0.15)]',
            iconColor: 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400',
            badgeBg: 'bg-orange-500 text-white shadow-sm shadow-orange-500/10',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            id: '05',
            titulo: 'Innovación y Mentalidad Digital',
            desc: 'Planear y ejecutar proyectos educativos fundamentados en las últimas tecnologías y herramientas digitales, preparando a los estudiantes para afrontar los desafíos de la era de la información con responsabilidad y creatividad.',
            color: 'border-violet-100 dark:border-slate-800/80 text-violet-600 bg-white dark:bg-slate-900 hover:border-violet-500/50 hover:shadow-[0_20px_40px_rgba(139,92,246,0.06)] dark:hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)]',
            iconColor: 'bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400',
            badgeBg: 'bg-violet-600 text-white shadow-sm shadow-violet-500/10',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            )
        },
        {
            id: '06',
            titulo: 'Gestión Sostenible y Recursos',
            desc: 'Administrar con absoluta transparencia y eficiencia los recursos físicos, tecnológicos y financieros del colegio, garantizando la viabilidad del proyecto educativo y el mantenimiento de una infraestructura escolar moderna.',
            color: 'border-cyan-100 dark:border-slate-800/80 text-cyan-600 bg-white dark:bg-slate-900 hover:border-cyan-500/50 hover:shadow-[0_20px_40px_rgba(6,182,212,0.06)] dark:hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)]',
            iconColor: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400',
            badgeBg: 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/10',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            id: '07',
            titulo: 'Convenios y Formación Laboral',
            desc: 'Establecer y fortalecer alianzas estratégicas con empresas y organizaciones del sector privado, permitiendo a los alumnos realizar prácticas reales que faciliten su pronta inserción laboral y comercial en la región.',
            color: 'border-amber-100 dark:border-slate-800/80 text-amber-600 bg-white dark:bg-slate-900 hover:border-amber-500/50 hover:shadow-[0_20px_40px_rgba(245,158,11,0.06)] dark:hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)]',
            iconColor: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
            badgeBg: 'bg-amber-500 text-white shadow-sm shadow-amber-500/10',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        }
    ];

    // Carousel Autoplay Loop with Pause-on-Hover
    useEffect(() => {
        if (isPaused || isDragging) return;
        const timer = setInterval(() => {
            if (carouselRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
                const cardWidth = 350 + 24; // width + gap
                let nextScroll = scrollLeft + cardWidth;
                
                if (nextScroll >= scrollWidth - clientWidth - 10) {
                    nextScroll = 0;
                }
                
                carouselRef.current.scrollTo({
                    left: nextScroll,
                    behavior: 'smooth'
                });
            }
        }, 5500);

        return () => clearInterval(timer);
    }, [isPaused, isDragging]);

    const handleScrollEvent = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
            const dotIndex = Math.round(scrollPercentage * 2);
            setActiveDot(Math.max(0, Math.min(2, dotIndex)));
        }
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - carouselRef.current.offsetLeft);
        setScrollLeftState(carouselRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        carouselRef.current.scrollLeft = scrollLeftState - walk;
    };

    return (
        <AppLayout>
            <Head title="Misión, Visión y Objetivos | COLSIH" />

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

            {/* Main Outer Container with Dynamic Elements */}
            <div className="relative bg-[#FAFCFF] dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen overflow-hidden pb-20 transition-colors duration-300">
                
                {/* Abstract Vector Backdrop Shapes */}
                <FloatingShapes />

                {/* ── First Section (Hero) ── */}
                <section className="relative z-10 pt-28 pb-10 px-6">
                    <div className="max-w-[800px] mx-auto text-center space-y-6">
                        
                        {/* Decorative Tag Badge */}
                        <ScrollReveal delay={100} duration={600}>
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 select-none">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-5.096L17 21l1.813-5.096C19.75 14.88 21 13.064 21 11V5a2 2 0 00-2-2h-3.813M9.813 3H5a2 2 0 00-2 2v6c0 2.064 1.25 3.88 3.187 4.904" />
                                </svg>
                                Nuestra esencia
                            </span>
                        </ScrollReveal>

                        {/* Título Grande */}
                        <ScrollReveal delay={200} duration={700}>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                                Misión, Visión y <br />
                                <span className="bg-gradient-to-r from-[#003C8F] to-[#800A15] bg-clip-text text-transparent">
                                    Objetivos Institucionales
                                </span>
                            </h1>
                        </ScrollReveal>

                        {/* Texto Introductorio */}
                        <ScrollReveal delay={300} duration={800}>
                            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed break-words">
                                Conoce los principios que orientan nuestras decisiones y el propósito que inspira cada paso de nuestra comunidad educativa.
                            </p>
                        </ScrollReveal>

                    </div>
                </section>

                {/* ── Misión Section ── */}
                <section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20 max-w-[1440px] mx-auto">
                    <ScrollReveal delay={100} duration={850}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-center">
                            
                            {/* Left Text */}
                            <div className="col-span-full lg:col-span-7 space-y-6 text-center lg:text-left min-w-0 flex flex-col items-center lg:items-start">
                                <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3.5 py-1.5 rounded-md select-none">
                                    Misión Institucional
                                </span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white font-sans leading-tight">
                                    Nuestra Misión
                                </h2>
                                <div className="w-20 h-1.5 bg-indigo-600 rounded-full" />
                                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium pt-2 break-words">
                                    El Colegio Santa Isabel de Hungría es una institución educativa de carácter privado de la Arquidiócesis de Bucaramanga, que educa con principios evangélicos según el sistema preventivo salesiano, fundamentado en la religión, la amabilidad y la razón. Ofrecemos los niveles de jardín, preescolar, primaria, básica y media técnica, con énfasis en comercio, empeñados en alcanzar una educación contextual que pase de la enseñanza al aprendizaje.
                                </p>
                            </div>

                            {/* Right Abstract Graphic composition */}
                            <div className="col-span-full lg:col-span-5 relative w-full max-w-md mx-auto aspect-video md:aspect-square flex flex-col justify-center gap-5">
                                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/5 dark:from-indigo-950/20 dark:to-purple-950/10 rounded-3xl blur-2xl pointer-events-none" />
                                
                                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.01)] dark:shadow-none hover:translate-x-2 transition-transform duration-300 flex items-center gap-4.5">
                                    <span className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0">I</span>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Religión</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Educación orientada por principios evangélicos y espirituales.</p>
                                    </div>
                                </div>
                                
                                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.01)] dark:shadow-none hover:translate-x-2 transition-transform duration-300 delay-75 flex items-center gap-4.5">
                                    <span className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm shrink-0">II</span>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Amabilidad</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Sistema preventivo basado en el afecto, cercanía y respeto mutuo.</p>
                                    </div>
                                </div>

                                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.01)] dark:shadow-none hover:translate-x-2 transition-transform duration-300 delay-150 flex items-center gap-4.5">
                                    <span className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold text-sm shrink-0">III</span>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Razón</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Formación del criterio intelectual y preparación comercial técnica.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </ScrollReveal>
                </section>

                {/* ── Visión Section ── */}
                <section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20 max-w-[1440px] mx-auto">
                    <ScrollReveal delay={150} duration={850}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-center">
                            
                             {/* Left Abstract Graphic Container (Alternating) */}
                             <div className="col-span-full lg:col-span-5 relative w-full max-w-md mx-auto aspect-video md:aspect-square flex items-center justify-center order-2 lg:order-1">
                                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-teal-500/5 dark:from-emerald-950/20 dark:to-teal-950/10 rounded-3xl blur-2xl pointer-events-none" />
 
                                 <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-slate-200/50 dark:border-slate-800 flex items-center justify-center shrink-0">
                                     <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-emerald-500/20 dark:border-emerald-500/10 flex items-center justify-center animate-spin" style={{ animationDuration: '40s' }}>
                                         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500" />
                                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-teal-400" />
                                     </div>
 
                                     <div className="absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center shadow-md text-center p-4">
                                         <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Meta Clave</span>
                                         <span className="text-3xl font-black text-slate-800 dark:text-white mt-1">2028</span>
                                         <span className="text-[9px] text-slate-500 dark:text-slate-400 mt-1.5 font-bold uppercase tracking-wide">Líderes Ambientales</span>
                                     </div>
                                 </div>
                             </div>

                            {/* Right Text */}
                            <div className="col-span-full lg:col-span-7 space-y-6 order-1 lg:order-2 text-center lg:text-left min-w-0 flex flex-col items-center lg:items-start">
                                <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3.5 py-1.5 rounded-md">
                                    Visión de Futuro
                                </span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white font-sans leading-tight">
                                    Nuestra Visión
                                </h2>
                                <div className="w-20 h-1.5 bg-emerald-500 rounded-full" />
                                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium pt-2 break-words">
                                    En el año 2028, el Colegio Santa Isabel de Hungría será reconocido en la región por la formación integral de líderes comprometidos con el cuidado de la vida en todas sus manifestaciones, aportando a la ecología integral en el respeto y cuidado de la Casa Común, fundamentados en el sistema salesiano, viviendo como "Buenos Cristianos y Honestos Ciudadanos".
                                </p>
                            </div>

                        </div>
                    </ScrollReveal>
                </section>

                {/* ── Objetivos Estratégicos ── */}
                <section className="relative z-10 w-full px-6 md:px-12 py-20 max-w-[1240px] mx-auto text-center scroll-mt-24">
                    <ScrollReveal delay={100} duration={850}>
                        <div className="space-y-5">
                            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3.5 py-1.5 rounded-md">
                                Directrices y Misión
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white font-sans leading-tight">
                                Objetivos Estratégicos
                            </h2>
                            <div className="w-20 h-1.5 bg-amber-500 rounded-full mx-auto" />
                            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium max-w-3xl mx-auto pt-2 break-words">
                                Orientamos el rumbo y el quehacer institucional a través de directrices y metas claras de excelencia formativa, técnica, espiritual y humana, asegurando el desarrollo integral de cada miembro de nuestra comunidad estudiantil.
                            </p>
                        </div>
                    </ScrollReveal>
                </section>

                {/* ── Objetivos en Acción Carousel Section ── */}
                <section 
                    className="relative z-10 w-full mb-16 mt-4 scroll-mt-24"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Slider Carousel Container Wrapper (py-10 provides vertical height for hover scales) */}
                    <ScrollReveal delay={150} duration={850} className="relative group overflow-hidden py-10 w-full">
                        
                        {/* Draggable and Swipeable Slider Viewport (Starts pegado al lateral izquierdo) */}
                        <div 
                            ref={carouselRef}
                            onScroll={handleScrollEvent}
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            className="flex overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory gap-6 pl-6 md:pl-12 lg:pl-[max(1.5rem,calc((100vw-1200px)/2))] pr-8 pb-8 pt-4 select-none cursor-grab active:cursor-grabbing"
                            style={{
                                msOverflowStyle: 'none',
                                scrollbarWidth: 'none'
                            }}
                        >
                            {objetivosData.map((obj) => (
                                <div 
                                    key={obj.id} 
                                    className={`w-[310px] md:w-[350px] shrink-0 snap-center border rounded-[32px] p-8 shadow-sm transition-all duration-300 hover:scale-[1.03] flex flex-col justify-between space-y-6 relative overflow-hidden ${obj.color}`}
                                >
                                    {/* Subtle decorative dot grid overlay in card background */}
                                    <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.03] pointer-events-none select-none" style={{
                                        backgroundImage: 'radial-gradient(currentColor 1.5px, transparent 1.5px)',
                                        backgroundSize: '12px 12px'
                                    }} />

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            {/* Category Icon */}
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${obj.iconColor}`}>
                                                {obj.icon}
                                            </div>
                                            {/* Numeric Index Badge */}
                                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-md tracking-wider ${obj.badgeBg}`}>
                                                {obj.id}
                                            </span>
                                        </div>
                                        
                                        <h4 className="text-base md:text-lg font-extrabold text-slate-800 dark:text-white leading-tight">
                                            {obj.titulo}
                                        </h4>
                                    </div>
                                    
                                    <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed font-medium flex-1">
                                        {obj.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Dot Index Indicators */}
                        <div className="flex items-center justify-center gap-2 mt-2">
                            {[0, 1, 2].map(dot => (
                                <button
                                    key={dot}
                                    onClick={() => {
                                        if (carouselRef.current) {
                                            const targetLeft = (carouselRef.current.scrollWidth - carouselRef.current.clientWidth) * (dot / 2);
                                            carouselRef.current.scrollTo({ left: targetLeft, behavior: 'smooth' });
                                        }
                                    }}
                                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                                        activeDot === dot ? 'w-6 bg-blue-600' : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                                    }`}
                                    aria-label={`Ir al grupo ${dot + 1}`}
                                />
                            ))}
                        </div>

                    </ScrollReveal>
                </section>

            </div>
        </AppLayout>
    );
}
