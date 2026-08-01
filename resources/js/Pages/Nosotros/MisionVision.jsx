import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState, useRef, useEffect } from 'react';
import ScrollReveal from '@/Components/ScrollReveal';
import FloatingShapes from '@/Components/FloatingShapes';
import { 
    GraduationCap, 
    Heart, 
    Users, 
    Briefcase, 
    Sparkles, 
    ShieldCheck, 
    Handshake, 
    Compass, 
    Target, 
    Eye, 
    ChevronLeft, 
    ChevronRight,
    Award
} from 'lucide-react';

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
            icon: <GraduationCap className="w-7 h-7 text-blue-600" />
        },
        {
            id: '02',
            titulo: 'Formación Salesiana y Humana',
            desc: 'Orientar el proceso formativo basado en los principios del evangelio y el sistema preventivo salesiano. Cultivamos la amabilidad, la razón y la espiritualidad para entregar ciudadanos íntegros, solidarios y éticos a la sociedad.',
            color: 'border-rose-100 dark:border-slate-800/80 text-[#800A15] bg-white dark:bg-slate-900 hover:border-rose-500/50 hover:shadow-[0_20px_40px_rgba(128,10,21,0.06)] dark:hover:shadow-[0_20px_40px_rgba(128,10,21,0.15)]',
            iconColor: 'bg-rose-50 text-[#800A15] dark:bg-rose-950/40 dark:text-rose-400',
            badgeBg: 'bg-[#800A15] text-white shadow-sm shadow-red-500/10',
            icon: <Heart className="w-7 h-7 text-[#800A15]" />
        },
        {
            id: '03',
            titulo: 'Inclusión y Valoración de la Persona',
            desc: 'Garantizar un entorno seguro, inclusivo y equitativo que atienda a la diversidad de ritmos de aprendizaje, promoviendo el respeto por los derechos humanos, la empatía mutua y la valoración de las capacidades únicas de cada estudiante.',
            color: 'border-emerald-100 dark:border-slate-800/80 text-emerald-600 bg-white dark:bg-slate-900 hover:border-emerald-500/50 hover:shadow-[0_20px_40px_rgba(16,185,129,0.06)] dark:hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)]',
            iconColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
            badgeBg: 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/10',
            icon: <Users className="w-7 h-7 text-emerald-600" />
        },
        {
            id: '04',
            titulo: 'Articulación Técnica y Comercial',
            desc: 'Desarrollar y consolidar los lineamientos curriculares contextualizados a través del convenio estratégico de media técnica con el SENA, capacitando a los jóvenes en competencias laborales prácticas de administración y comercio.',
            color: 'border-orange-100 dark:border-slate-800/80 text-orange-600 bg-white dark:bg-slate-900 hover:border-orange-500/50 hover:shadow-[0_20px_40px_rgba(249,115,22,0.06)] dark:hover:shadow-[0_20px_40px_rgba(249,115,22,0.15)]',
            iconColor: 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400',
            badgeBg: 'bg-orange-500 text-white shadow-sm shadow-orange-500/10',
            icon: <Briefcase className="w-7 h-7 text-orange-600" />
        },
        {
            id: '05',
            titulo: 'Innovación y Mentalidad Digital',
            desc: 'Planear y ejecutar proyectos educativos fundamentados en las últimas tecnologías y herramientas digitales, preparando a los estudiantes para afrontar los desafíos de la era de la información con responsabilidad y creatividad.',
            color: 'border-violet-100 dark:border-slate-800/80 text-violet-600 bg-white dark:bg-slate-900 hover:border-violet-500/50 hover:shadow-[0_20px_40px_rgba(139,92,246,0.06)] dark:hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)]',
            iconColor: 'bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400',
            badgeBg: 'bg-violet-600 text-white shadow-sm shadow-violet-500/10',
            icon: <Sparkles className="w-7 h-7 text-violet-600" />
        },
        {
            id: '06',
            titulo: 'Gestión Sostenible y Recursos',
            desc: 'Administrar con absoluta transparencia y eficiencia los recursos físicos, tecnológicos y financieros del colegio, garantizando la viabilidad del proyecto educativo y el mantenimiento de una infraestructura escolar moderna.',
            color: 'border-cyan-100 dark:border-slate-800/80 text-cyan-600 bg-white dark:bg-slate-900 hover:border-cyan-500/50 hover:shadow-[0_20px_40px_rgba(6,182,212,0.06)] dark:hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)]',
            iconColor: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400',
            badgeBg: 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/10',
            icon: <ShieldCheck className="w-7 h-7 text-cyan-600" />
        },
        {
            id: '07',
            titulo: 'Convenios y Formación Laboral',
            desc: 'Establecer y fortalecer alianzas estratégicas con empresas y organizaciones del sector privado, permitiendo a los alumnos realizar prácticas reales que faciliten su pronta inserción laboral y comercial en la región.',
            color: 'border-amber-100 dark:border-slate-800/80 text-amber-600 bg-white dark:bg-slate-900 hover:border-amber-500/50 hover:shadow-[0_20px_40px_rgba(245,158,11,0.06)] dark:hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)]',
            iconColor: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
            badgeBg: 'bg-amber-500 text-white shadow-sm shadow-amber-500/10',
            icon: <Handshake className="w-7 h-7 text-amber-600" />
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
                                <Compass className="w-3.5 h-3.5 text-blue-600" />
                                Nuestra esencia
                            </span>
                        </ScrollReveal>

                        {/* Título Grande */}
                        <ScrollReveal delay={200} duration={700}>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] font-sans">
                                Misión, Visión y <br />
                                <span className="bg-gradient-to-r from-[#003C8F] via-blue-600 to-[#800A15] bg-clip-text text-transparent">
                                    Objetivos Institucionales
                                </span>
                            </h1>
                        </ScrollReveal>

                        {/* Subtítulo */}
                        <ScrollReveal delay={300} duration={800}>
                            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-[620px] mx-auto leading-relaxed font-medium">
                                Los pilares estratégicos y espirituales que guían nuestro compromiso de formar "buenos cristianos y honestos ciudadanos".
                            </p>
                        </ScrollReveal>

                    </div>
                </section>


                {/* ── Second Section (Misión y Visión Grid) ── */}
                <section className="relative z-10 py-12 px-6 max-w-[1280px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                        
                        {/* Card 1: Misión */}
                        <ScrollReveal delay={150} duration={700} className="h-full">
                            <div className="group h-full p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,60,143,0.08)] dark:hover:shadow-[0_20px_50px_rgba(0,60,143,0.2)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                                
                                <div className="space-y-6">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-[#003C8F] dark:text-blue-400 flex items-center justify-center shadow-sm">
                                        <Target className="w-7 h-7 text-[#003C8F]" />
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <span className="text-xs font-black uppercase tracking-widest text-[#003C8F] block font-sans">
                                            PROPÓSITO FUNDAMENTAL
                                        </span>
                                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
                                            Nuestra Misión
                                        </h2>
                                    </div>

                                    <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                                        El Colegio Santa Isabel de Hungría de Floridablanca es una institución educativa católica administrada por las Hijas de María Auxiliadora, que ofrece educación en preescolar, básica y media técnica en convenio con el SENA. Fundamenta su acción en el Evangelio y el Sistema Preventivo Salesiano de Razón, Religión y Amabilidad, formando personas íntegras, competentes y comprometidas con la transformación social.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Card 2: Visión */}
                        <ScrollReveal delay={300} duration={700} className="h-full">
                            <div className="group h-full p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(128,10,21,0.08)] dark:hover:shadow-[0_20px_50px_rgba(128,10,21,0.2)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                                
                                <div className="space-y-6">
                                    <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-[#800A15] dark:text-rose-400 flex items-center justify-center shadow-sm">
                                        <Eye className="w-7 h-7 text-[#800A15]" />
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <span className="text-xs font-black uppercase tracking-widest text-[#800A15] block font-sans">
                                            PROYECCIÓN AL 2028
                                        </span>
                                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
                                            Nuestra Visión
                                        </h2>
                                    </div>

                                    <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                                        Para el año 2028, el Colegio Santa Isabel de Hungría se consolidará como una comunidad educativa de referencia en la región por su excelencia académica, sólida formación en valores salesianos, liderazgo ambiental e innovación tecnológica, formando egresados autónomos, empáticos y altamente preparados para la educación superior y el mundo laboral.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                    </div>
                </section>


                {/* ── Third Section (Carousel de Objetivos Institucionales) ── */}
                <section className="relative z-10 pt-16 pb-12">
                    <div className="max-w-[1400px] mx-auto px-6 mb-10 text-center space-y-3">
                        <ScrollReveal delay={100}>
                            <span className="text-xs font-black uppercase tracking-widest text-[#003C8F] font-sans block">
                                METAS ESTRATÉGICAS
                            </span>
                        </ScrollReveal>
                        <ScrollReveal delay={200}>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans">
                                Objetivos de Calidad Institucional
                            </h2>
                        </ScrollReveal>
                    </div>

                    {/* Draggable & Autoplay Carousel Container */}
                    <div 
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => { setIsPaused(false); handleMouseLeave(); }}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onScroll={handleScrollEvent}
                        ref={carouselRef}
                        className="flex gap-6 overflow-x-auto no-scrollbar px-6 md:px-12 py-6 cursor-grab active:cursor-grabbing select-none scroll-smooth"
                    >
                        {objetivosData.map((obj, idx) => (
                            <div 
                                key={idx}
                                className={`shrink-0 w-[300px] sm:w-[350px] p-8 rounded-3xl border ${obj.color} transition-all duration-300 flex flex-col justify-between relative group`}
                            >
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <div className={`w-12 h-12 rounded-2xl ${obj.iconColor} flex items-center justify-center shadow-xs`}>
                                            {obj.icon}
                                        </div>
                                        <span className={`text-xs font-black px-3 py-1 rounded-full ${obj.badgeBg} font-sans`}>
                                            OBJETIVO {obj.id}
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
                                            {obj.titulo}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
                                            {obj.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots indicator */}
                    <div className="flex justify-center items-center gap-2 mt-6">
                        {[0, 1, 2].map((dot) => (
                            <button
                                key={dot}
                                onClick={() => {
                                    if (carouselRef.current) {
                                        const { scrollWidth, clientWidth } = carouselRef.current;
                                        const targetScroll = (dot / 2) * (scrollWidth - clientWidth);
                                        carouselRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
                                    }
                                }}
                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                    activeDot === dot ? 'w-8 bg-[#003C8F]' : 'w-2.5 bg-slate-200 dark:bg-slate-800'
                                }`}
                                aria-label={`Ir a diapositiva ${dot + 1}`}
                            />
                        ))}
                    </div>
                </section>

            </div>
        </AppLayout>
    );
}
