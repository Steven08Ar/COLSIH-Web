import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';
import { 
    Sparkles, 
    ArrowRight, 
    Send, 
    CheckCircle2, 
    Plus, 
    Minus, 
    Smile, 
    Palette, 
    Gamepad2, 
    Heart, 
    BookOpen, 
    Star, 
    Users, 
    ChevronRight,
    HelpCircle
} from 'lucide-react';
import { useState } from 'react';

constLINK_INSCRIPCIONES = "https://e.plataformaintegra.net/sihungria/index.php/cupo";

const docentesPreescolar = [
    {
        nombre: 'Lic. María Fernanda',
        cargo: 'Docente de Jardín',
        colorBlob: 'bg-[#FFD25D]',
        foto: 'https://media.colsih.edu.co/espacios_academicos/jardin.JPG'
    },
    {
        nombre: 'Lic. Johana Gómez',
        cargo: 'Docente de Transición',
        colorBlob: 'bg-[#F3E3D4]',
        foto: 'https://media.colsih.edu.co/ofertas_academicas/preescolar/preescolar_dos.JPG'
    },
    {
        nombre: 'Lic. Carolina Silva',
        cargo: 'Psicóloga Infantil',
        colorBlob: 'bg-[#ADA3DA]',
        foto: 'https://media.colsih.edu.co/ofertas_academicas/preescolar/preescolar_uno.JPG'
    },
    {
        nombre: 'Prof. Carlos Ruiz',
        cargo: 'Docente de Expresión & Música',
        colorBlob: 'bg-[#90C5DE]',
        foto: 'https://media.colsih.edu.co/deportes/deportes.JPG'
    }
];

const blogCards = [
    {
        titulo: 'Aprendizaje a través del Juego: ¿Por qué es la mejor opción?',
        desc: 'Descubre cómo las actividades lúdicas en Jardín y Transición potencian la creatividad y la inteligencia emocional.',
        imagen: 'https://media.colsih.edu.co/ofertas_academicas/preescolar/preescolar_dos.JPG'
    },
    {
        titulo: '10 Ideas de Juegos Educativos para Compartir en Casa',
        desc: 'Actividades sencillas y divertidas para fortalecer el lenguaje, el dibujo y la motricidad fina en familia.',
        imagen: 'https://media.colsih.edu.co/ofertas_academicas/preescolar/preescolar_uno.JPG'
    },
    {
        titulo: 'Iniciación al Bilingüismo desde Temprana Edad',
        desc: 'Estrategias lúdicas con canciones y comandos diarios que preparan a los niños para comunicarse en inglés.',
        imagen: 'https://media.colsih.edu.co/espacios_academicos/jardin.JPG'
    }
];

const faqsPreescolar = [
    {
        pregunta: '¿Qué hace diferente al Preescolar COLSIH de otros jardines infantiles?',
        respuesta: 'Nuestra educación salesiana preventiva centrada en el afecto, la iniciación al bilingüismo desde Jardín, las amplias instalaciones campestres de Floridablanca y el acompañamiento psicológico continuo.'
    },
    {
        pregunta: '¿Cómo es el proceso de admisión e ingreso para Preescolar 2027?',
        respuesta: 'El proceso inicia en línea diligenciando el formulario en el portal oficial de inscripciones. Tras la recepción del pago, se programa una cita académica y una entrevista presencial familiar.'
    },
    {
        pregunta: '¿Cuál es el horario escolar y cómo se gestiona la adaptación?',
        respuesta: 'El horario para Jardín y Transición es de 7:00 a.m. a 12:30 p.m. Ofrecemos un protocolo de acogida respetuosa y progresiva que garantiza una transición escolar feliz y segura.'
    }
];

export default function Preescolar() {
    const [faqOpen, setFaqOpen] = useState(null);
    const [nombreForm, setNombreForm] = useState('');
    const [contactoForm, setContactoForm] = useState('');
    const [formEnviado, setFormEnviado] = useState(false);

    const toggleFaq = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (nombreForm.trim() && contactoForm.trim()) {
            setFormEnviado(true);
            setTimeout(() => setFormEnviado(false), 4000);
            setNombreForm('');
            setContactoForm('');
        }
    };

    return (
        <AppLayout>
            <Head title="Preescolar COLSIH | Jardín y Transición 2027" />

            <div className="bg-[#FAF8FF] font-sans overflow-x-hidden text-[#1F1943] select-none">

                {/* 1. HERO SECTION ("The best place to learn and play for kids") */}
                <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden">
                    
                    {/* Elementos decorativos circulares de fondo */}
                    <div className="absolute top-12 left-10 w-32 h-32 rounded-full bg-[#DEC8FE]/30 blur-2xl pointer-events-none" />
                    <div className="absolute top-1/3 right-10 w-48 h-48 rounded-full bg-[#FFD25D]/30 blur-3xl pointer-events-none" />

                    <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            
                            {/* Columna Izquierda: Texto e Interactividad */}
                            <div className="lg:col-span-7 space-y-8 text-left">
                                <ScrollReveal distance="translate-y-6">
                                    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#EAE0FE] text-[#704FE6] text-xs md:text-sm font-extrabold tracking-wider uppercase shadow-xs">
                                        <Sparkles className="w-4 h-4 text-[#704FE6]" />
                                        <span>EDUCACIÓN INICIAL · JARDÍN Y TRANSICIÓN</span>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal distance="translate-y-6" delay={150}>
                                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-[#1F1943] leading-[1.02] tracking-tight">
                                        El mejor lugar para <br className="hidden sm:block" />
                                        <span className="font-serif italic text-[#704FE6]">aprender</span> y{' '}
                                        <span className="font-serif italic text-[#FFB800]">jugar</span> tus hijos
                                    </h1>
                                </ScrollReveal>

                                <ScrollReveal distance="translate-y-6" delay={300}>
                                    <p className="text-lg md:text-xl font-medium text-slate-600 leading-relaxed max-w-2xl">
                                        Descubre miles de actividades lúdicas e interactivas diseñadas para apoyar el crecimiento feliz, la afectividad y el aprendizaje integral en nuestros pequeños.
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal distance="translate-y-6" delay={450}>
                                    <div className="pt-2 flex flex-wrap items-center gap-5">
                                        <a
                                            href={LINK_INSCRIPCIONES}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center gap-4 px-9 py-4.5 rounded-full bg-[#704FE6] hover:bg-[#5b3cc4] text-white font-extrabold text-lg shadow-xl shadow-[#704FE6]/25 hover:scale-105 transition-all duration-300 cursor-pointer"
                                        >
                                            <span>Empezar Inscripción</span>
                                            <div className="w-10 h-10 rounded-full bg-white text-[#704FE6] flex items-center justify-center group-hover:rotate-12 transition-transform shadow-xs">
                                                <Send className="w-5 h-5 ml-0.5" />
                                            </div>
                                        </a>

                                        <a
                                            href="#caracteristicas"
                                            className="inline-flex items-center gap-2 px-8 py-4.5 rounded-full bg-white hover:bg-slate-100 text-[#1F1943] font-bold text-base border-2 border-slate-200 shadow-sm hover:scale-105 transition-all"
                                        >
                                            <span>Conocer Experiencia</span>
                                            <ArrowRight className="w-5 h-5 text-[#704FE6]" />
                                        </a>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Columna Derecha: Fotos con Badges Orgánicos y Stickers */}
                            <div className="lg:col-span-5 relative">
                                <ScrollReveal distance="translate-y-8" delay={300}>
                                    <div className="relative mx-auto max-w-md lg:max-w-none">
                                        
                                        {/* Foto Principal en Blob / Badge redondeado */}
                                        <div className="relative z-10 w-full h-[420px] sm:h-[480px] rounded-[48px] bg-[#DEC8FE] p-4 overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                                            <img 
                                                src="https://media.colsih.edu.co/ofertas_academicas/preescolar/preescolar_dos.JPG" 
                                                alt="Niños de Preescolar COLSIH" 
                                                className="w-full h-full object-cover rounded-[36px]"
                                            />
                                        </div>

                                        {/* Badge Circular Giratorio / Floating Top Right */}
                                        <div className="absolute -top-6 -right-6 z-20 w-32 h-32 rounded-full bg-[#FFD25D] p-3 shadow-xl flex items-center justify-center border-4 border-white animate-bounce-slow">
                                            <div className="text-center font-black text-xs uppercase tracking-tight text-slate-900 leading-tight">
                                                ★ PREESCOLAR <br /> COLSIH 2027 ★
                                            </div>
                                        </div>

                                        {/* Tarjeta flotante inferior */}
                                        <div className="absolute -bottom-8 -left-6 z-20 bg-white p-5 rounded-3xl shadow-xl border-2 border-slate-100 flex items-center gap-4 max-w-xs">
                                            <div className="w-12 h-12 rounded-2xl bg-[#704FE6] text-white flex items-center justify-center shrink-0">
                                                <Heart className="w-6 h-6 text-amber-300" />
                                            </div>
                                            <div>
                                                <span className="text-xs font-black uppercase text-[#704FE6] tracking-wider block">PEDAGOGÍA SALESIANA</span>
                                                <p className="text-sm font-extrabold text-[#1F1943]">Aprender con amor y alegría</p>
                                            </div>
                                        </div>

                                    </div>
                                </ScrollReveal>
                            </div>

                        </div>
                    </div>
                </section>


                {/* 2. OUR INTERACTIVE FEATURES ("Our interactive features") */}
                <section id="caracteristicas" className="py-20 md:py-32 bg-white border-y border-slate-100">
                    <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-16">
                        
                        {/* Header con Tags Orgánicos */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-3 text-left max-w-2xl">
                                <span className="text-xs font-black uppercase tracking-widest text-[#704FE6] block">
                                    VIVENCIA EN EL AULA
                                </span>
                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F1943] leading-tight">
                                    Nuestras características <span className="font-serif italic text-[#704FE6]">interactivas</span>
                                </h2>
                            </div>

                            {/* Blob de Tags */}
                            <div className="p-4 rounded-3xl bg-[#EAE0FE] border border-[#704FE6]/20 flex flex-wrap gap-2.5 items-center">
                                <span className="px-4 py-2 rounded-full bg-white text-[#704FE6] font-bold text-sm shadow-xs">#felicidad</span>
                                <span className="px-4 py-2 rounded-full bg-[#FFD25D] text-slate-950 font-bold text-sm shadow-xs">#diversión</span>
                                <span className="px-4 py-2 rounded-full bg-[#704FE6] text-white font-bold text-sm shadow-xs">#aprender</span>
                            </div>
                        </div>

                        {/* Grid de 3 Tarjetas Grandes ("Fun Quiz", "Creative Activities", "Learn with Games") */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            
                            {/* Card 1: Lavender Card */}
                            <ScrollReveal distance="translate-y-8" delay={100}>
                                <div className="bg-[#EAE0FE] rounded-[36px] p-8 md:p-10 border-2 border-[#DEC8FE] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 space-y-6 relative overflow-hidden group h-full flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 rounded-2xl bg-white text-[#704FE6] flex items-center justify-center shadow-md">
                                            <BookOpen className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-3xl font-black text-[#1F1943] leading-snug">
                                            Pruebas <br />
                                            <span className="font-serif italic text-[#704FE6]">Divertidas</span>
                                        </h3>
                                        <p className="text-base font-semibold text-slate-700 leading-relaxed">
                                            Evaluación continua a través de cuestionarios breves e interactivos que estimulan la lógica y la memoria.
                                        </p>
                                    </div>
                                    <div className="pt-4 border-t border-[#704FE6]/20 font-extrabold text-sm text-[#704FE6] flex items-center gap-2">
                                        <span>Estimulación Cognitiva</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Card 2: Vibrant Purple Card */}
                            <ScrollReveal distance="translate-y-8" delay={200}>
                                <div className="bg-[#704FE6] text-white rounded-[36px] p-8 md:p-10 border-2 border-[#704FE6] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 space-y-6 relative overflow-hidden group h-full flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 rounded-2xl bg-[#FFD25D] text-slate-950 flex items-center justify-center shadow-md">
                                            <Palette className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-3xl font-black leading-snug">
                                            Actividades <br />
                                            <span className="font-serif italic text-[#FFD25D]">Creativas</span>
                                        </h3>
                                        <p className="text-base font-semibold text-purple-100 leading-relaxed">
                                            Pintura, dibujo, expresión corporal, modelado y pequeñas experiencias de ciencia adaptadas a la primera infancia.
                                        </p>
                                    </div>
                                    <div className="pt-4 border-t border-white/20 font-extrabold text-sm text-[#FFD25D] flex items-center gap-2">
                                        <span>Motricidad & Arte</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Card 3: Bright Yellow Card */}
                            <ScrollReveal distance="translate-y-8" delay={300}>
                                <div className="bg-[#FFD25D] text-slate-950 rounded-[36px] p-8 md:p-10 border-2 border-[#FFC837] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 space-y-6 relative overflow-hidden group h-full flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 rounded-2xl bg-white text-slate-950 flex items-center justify-center shadow-md">
                                            <Gamepad2 className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-3xl font-black leading-snug">
                                            Aprender con <br />
                                            <span className="font-serif italic text-[#704FE6]">Juegos</span>
                                        </h3>
                                        <p className="text-base font-semibold text-slate-900 leading-relaxed">
                                            Aprender algo nuevo mientras juegan y conviven con sus amiguitos en entornos seguros y guiados.
                                        </p>
                                    </div>
                                    <div className="pt-4 border-t border-slate-950/20 font-extrabold text-sm text-[#704FE6] flex items-center gap-2">
                                        <span>Juego Didáctico</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </ScrollReveal>

                        </div>

                    </div>
                </section>


                {/* 3. LEARNING MATERIALS ("The learning materials provided are enjoyable for children") */}
                <section className="py-20 md:py-32 bg-[#FAF8FF]">
                    <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            
                            {/* Columna Izquierda: Texto e Información */}
                            <div className="lg:col-span-6 space-y-8 text-left">
                                <ScrollReveal distance="translate-y-6">
                                    <div className="space-y-4">
                                        <span className="text-xs font-black uppercase tracking-widest text-[#704FE6] block">
                                            RECURSOS PEDAGÓGICOS
                                        </span>
                                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F1943] leading-tight">
                                            Materiales educativos <br />
                                            <span className="font-serif italic text-[#704FE6]">diseñados</span> para disfrutar
                                        </h2>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal distance="translate-y-6" delay={200}>
                                    <p className="text-lg font-semibold text-slate-600 leading-relaxed">
                                        ¡No te preocupes! Tus hijos disfrutarán cada jornada escolar con recursos ilustrados, interactivos y acordes a su nivel de comprensión, respaldados por la tradición salesiana.
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal distance="translate-y-6" delay={350}>
                                    <div className="space-y-3 pt-2">
                                        <div className="flex items-center gap-3 text-base font-bold text-slate-800">
                                            <CheckCircle2 className="w-6 h-6 text-[#704FE6]" />
                                            <span>Textos ilustrados y cuentos interactivos en aula</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-base font-bold text-slate-800">
                                            <CheckCircle2 className="w-6 h-6 text-[#704FE6]" />
                                            <span>Iniciación lúdica al bilingüismo desde Jardín</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-base font-bold text-slate-800">
                                            <CheckCircle2 className="w-6 h-6 text-[#704FE6]" />
                                            <span>Salones temáticos y zonas recreativas campestres</span>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal distance="translate-y-6" delay={500}>
                                    <div className="pt-4">
                                        <a
                                            href={LINK_INSCRIPCIONES}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center gap-4 px-8 py-4 rounded-full bg-[#704FE6] hover:bg-[#5b3cc4] text-white font-black text-base shadow-lg shadow-[#704FE6]/20 transition-all cursor-pointer"
                                        >
                                            <span>Solicitar Cupo Preescolar</span>
                                            <div className="w-8 h-8 rounded-full bg-white text-[#704FE6] flex items-center justify-center">
                                                <Send className="w-4 h-4 ml-0.5" />
                                            </div>
                                        </a>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Columna Derecha: Pill Cards Apiladas con Fotografías */}
                            <div className="lg:col-span-6 space-y-6">
                                <ScrollReveal distance="translate-y-8" delay={150}>
                                    <div className="p-6 rounded-[36px] bg-[#FFD25D] flex flex-col sm:flex-row items-center gap-6 shadow-md border-2 border-white">
                                        <img 
                                            src="https://media.colsih.edu.co/espacios_academicos/jardin.JPG" 
                                            alt="Espacio Jardín COLSIH" 
                                            className="w-full sm:w-44 h-36 object-cover rounded-2xl shadow-xs"
                                        />
                                        <div className="space-y-2 text-left">
                                            <span className="text-xs font-black uppercase text-slate-900 tracking-wider">AULAS LÚDICAS Y AMPLIAS</span>
                                            <h3 className="text-2xl font-black text-slate-950">Aulas Diseñadas para Jugar</h3>
                                            <p className="text-xs font-semibold text-slate-900 leading-relaxed">Mobiliario ergonómico y material seguro para el libre aprendizaje.</p>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal distance="translate-y-8" delay={300}>
                                    <div className="p-6 rounded-[36px] bg-[#704FE6] text-white flex flex-col sm:flex-row items-center gap-6 shadow-md border-2 border-white">
                                        <img 
                                            src="https://media.colsih.edu.co/ofertas_academicas/preescolar/preescolar_uno.JPG" 
                                            alt="Experiencia Preescolar COLSIH" 
                                            className="w-full sm:w-44 h-36 object-cover rounded-2xl shadow-xs"
                                        />
                                        <div className="space-y-2 text-left">
                                            <span className="text-xs font-black uppercase text-amber-300 tracking-wider">APRENDIZAJE INTEGRAL</span>
                                            <h3 className="text-2xl font-black text-white">Desarrollo Afectivo y Social</h3>
                                            <p className="text-xs font-semibold text-purple-100 leading-relaxed">Formación en valores, amistad y convivencia salesiana.</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>

                        </div>
                    </div>
                </section>


                {/* 4. OUR TEACHERS / DOCENTES ("We aim to help children discover the joy of creative learning...") */}
                <section className="py-20 md:py-32 bg-white">
                    <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                        <div className="bg-[#704FE6] text-white rounded-[44px] p-8 md:p-16 relative overflow-hidden shadow-2xl space-y-12">
                            
                            {/* Titular Grande */}
                            <div className="max-w-4xl mx-auto text-center space-y-4">
                                <ScrollReveal distance="translate-y-6">
                                    <span className="inline-block px-5 py-2 rounded-full bg-white/10 text-amber-300 font-extrabold text-xs uppercase tracking-widest border border-white/20">
                                        EQUIPO DOCENTE PREESCOLAR
                                    </span>
                                </ScrollReveal>
                                <ScrollReveal distance="translate-y-6" delay={150}>
                                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                                        Buscamos ayudar a los niños a <span className="font-serif italic text-[#FFD25D]">descubrir la alegría</span> de aprender y crecer felices.
                                    </h2>
                                </ScrollReveal>
                            </div>

                            {/* Grid de 4 Profesores */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                                {docentesPreescolar.map((docente, idx) => (
                                    <ScrollReveal key={idx} distance="translate-y-8" delay={idx * 100}>
                                        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all space-y-4">
                                            <div className="relative mx-auto w-28 h-28">
                                                <div className={`absolute inset-0 rounded-full ${docente.colorBlob} rotate-6 scale-105`} />
                                                <img 
                                                    src={docente.foto} 
                                                    alt={docente.nombre} 
                                                    className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-white">{docente.nombre}</h3>
                                                <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mt-1">{docente.cargo}</p>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>

                        </div>
                    </div>
                </section>


                {/* 5. OUR BLOG / NOTICIAS PREESCOLAR ("Read our blog") */}
                <section className="py-20 md:py-32 bg-[#FAF8FF]">
                    <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-16">
                        
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="space-y-2 text-left">
                                <span className="text-xs font-black uppercase tracking-widest text-[#704FE6] block">ARTÍCULOS Y NOVEDADES</span>
                                <h2 className="text-4xl sm:text-5xl font-black text-[#1F1943]">
                                    Lee nuestro <span className="font-serif italic text-[#704FE6]">blog</span> de Preescolar
                                </h2>
                            </div>

                            <Link
                                href="/noticias"
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#704FE6] text-white font-extrabold text-sm shadow-md hover:scale-105 transition-all self-start sm:self-auto"
                            >
                                <span>Ver Todo</span>
                                <Send className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* 3 Tarjetas de Blog */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            {blogCards.map((blog, idx) => (
                                <ScrollReveal key={idx} distance="translate-y-8" delay={idx * 100}>
                                    <div className="bg-[#F5F5F5] rounded-3xl overflow-hidden p-5 space-y-4 hover:shadow-xl hover:bg-white transition-all duration-300 border border-slate-200/80 group h-full flex flex-col justify-between">
                                        <div className="space-y-4">
                                            <div className="h-48 rounded-2xl overflow-hidden">
                                                <img 
                                                    src={blog.imagen} 
                                                    alt={blog.titulo} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <h3 className="text-2xl font-black text-[#1F1943] leading-snug group-hover:text-[#704FE6] transition-colors">
                                                {blog.titulo}
                                            </h3>
                                            <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                                                {blog.desc}
                                            </p>
                                        </div>

                                        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-black uppercase text-[#704FE6]">
                                            <span>Leer artículo completo</span>
                                            <div className="w-7 h-7 rounded-full bg-[#704FE6] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                                <Send className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>

                    </div>
                </section>


                {/* 6. FAQ ("Frequently asked questions") */}
                <section className="py-20 md:py-32 bg-white border-t border-slate-100">
                    <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            
                            {/* Titular */}
                            <div className="lg:col-span-5 space-y-6 text-left">
                                <ScrollReveal distance="translate-y-6">
                                    <span className="text-xs font-black uppercase tracking-widest text-[#704FE6] block">RESOLVEMOS TUS DUDAS</span>
                                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F1943] leading-tight">
                                        Preguntas <br />
                                        <span className="font-serif italic text-[#704FE6]">frecuentes</span>
                                    </h2>
                                    <p className="text-base font-semibold text-slate-600 leading-relaxed pt-2">
                                        Encuentra aquí la información clave sobre nuestra propuesta pedagógica, matrículas y adaptación para los más pequeños.
                                    </p>
                                </ScrollReveal>
                            </div>

                            {/* Acordeón de FAQs */}
                            <div className="lg:col-span-7 space-y-4 text-left">
                                {faqsPreescolar.map((faq, idx) => {
                                    const isOpen = faqOpen === idx;
                                    return (
                                        <ScrollReveal key={idx} distance="translate-y-4" delay={idx * 100}>
                                            <div 
                                                onClick={() => toggleFaq(idx)}
                                                className={`rounded-3xl p-6 md:p-8 transition-all cursor-pointer border-2 ${
                                                    isOpen
                                                        ? 'bg-[#EAE0FE] border-[#704FE6] shadow-md'
                                                        : 'bg-[#F8FAFC] border-slate-200 hover:border-slate-300'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between gap-4">
                                                    <h3 className="text-xl font-black text-[#1F1943] font-sans">
                                                        {faq.pregunta}
                                                    </h3>
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'bg-[#704FE6] text-white rotate-45' : 'bg-white text-[#704FE6] border border-slate-200'}`}>
                                                        <Plus className="w-5 h-5" />
                                                    </div>
                                                </div>

                                                {isOpen && (
                                                    <p className="mt-4 pt-4 border-t border-[#704FE6]/20 text-base font-semibold text-slate-700 leading-relaxed">
                                                        {faq.respuesta}
                                                    </p>
                                                )}
                                            </div>
                                        </ScrollReveal>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </section>


                {/* 7. JOIN COMMUNITY CTA ("Join our WonderKids community now") */}
                <section className="py-24 bg-[#FAF8FF]">
                    <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                        <div className="bg-[#704FE6] text-white rounded-[44px] p-8 md:p-16 shadow-2xl relative overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                                
                                {/* Foto de Form */}
                                <div className="lg:col-span-5">
                                    <div className="rounded-3xl overflow-hidden border-4 border-white shadow-xl h-80 lg:h-96">
                                        <img 
                                            src="https://media.colsih.edu.co/ofertas_academicas/preescolar/preescolar_dos.JPG" 
                                            alt="Preescolar COLSIH Comunidad" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Formulario */}
                                <div className="lg:col-span-7 space-y-6 text-left">
                                    <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white font-sans">
                                        Únete a la comunidad de <br />
                                        <span className="font-serif italic text-[#FFD25D]">Preescolar COLSIH</span> ahora
                                    </h2>

                                    <p className="text-purple-100 font-semibold text-lg">
                                        Déjanos tus datos de contacto y te enviaremos la información personalizada sobre cupos e inscripciones para el año escolar 2027.
                                    </p>

                                    <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <input 
                                                type="text" 
                                                required
                                                placeholder="Nombre del Acudiente" 
                                                value={nombreForm}
                                                onChange={(e) => setNombreForm(e.target.value)}
                                                className="w-full px-6 py-4 rounded-full bg-white text-slate-900 font-bold placeholder-slate-400 border-none outline-none focus:ring-4 focus:ring-amber-300"
                                            />
                                            <input 
                                                type="text" 
                                                required
                                                placeholder="Correo o Teléfono" 
                                                value={contactoForm}
                                                onChange={(e) => setContactoForm(e.target.value)}
                                                className="w-full px-6 py-4 rounded-full bg-white text-slate-900 font-bold placeholder-slate-400 border-none outline-none focus:ring-4 focus:ring-amber-300"
                                            />
                                        </div>

                                        <div className="flex items-center gap-4 pt-2">
                                            <button 
                                                type="submit"
                                                className="px-9 py-4.5 rounded-full bg-[#FFD25D] hover:bg-amber-300 text-slate-950 font-black text-lg shadow-xl hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
                                            >
                                                <span>Enviar Solicitud</span>
                                                <Send className="w-5 h-5" />
                                            </button>

                                            {formEnviado && (
                                                <span className="text-amber-300 font-black text-sm flex items-center gap-2 animate-bounce">
                                                    <CheckCircle2 className="w-5 h-5" />
                                                    ¡Información enviada con éxito!
                                                </span>
                                            )}
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </AppLayout>
    );
}
