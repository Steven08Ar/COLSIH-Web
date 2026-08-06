import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';
import { 
    ArrowUpRight, 
    ChevronLeft, 
    ChevronRight, 
    Plus, 
    Minus, 
    Sparkles, 
    Heart, 
    BookOpen, 
    Palette, 
    Gamepad2,
    CheckCircle2
} from 'lucide-react';
import { useState } from 'react';

const LINK_INSCRIPCIONES = "https://e.plataformaintegra.net/sihungria/index.php/cupo";

const docentesPreescolar = [
    {
        nombre: 'Lic. Kristin Watson',
        cargo: 'Docente de Ciencias Infantiles',
        colorCircle: 'bg-[#FFD25D]',
        foto: 'https://media.colsih.edu.co/espacios_academicos/jardin.JPG',
        decoracion: 'none'
    },
    {
        nombre: 'Lic. Jenny Wilson',
        cargo: 'Docente de Arte & Dibujo',
        colorCircle: 'bg-[#F3E3D4]',
        foto: 'https://media.colsih.edu.co/ofertas_academicas/preescolar/preescolar_dos.JPG',
        decoracion: 'circles'
    },
    {
        nombre: 'Lic. Jacob Jones',
        cargo: 'Docente de Lógica & Matemáticas',
        colorCircle: 'bg-[#ADA3DA]',
        foto: 'https://media.colsih.edu.co/ofertas_academicas/preescolar/preescolar_uno.JPG',
        decoracion: 'dots'
    },
    {
        nombre: 'Lic. Savannah Nguyen',
        cargo: 'Docente de Bilingüismo & Lectura',
        colorCircle: 'bg-[#90C5DE]',
        foto: 'https://media.colsih.edu.co/deportes/deportes.JPG',
        decoracion: 'none'
    }
];

const blogCards = [
    {
        titulo: 'Aprender Jugando: ¿Por qué no?',
        desc: '¡Abraza la alegría del juego para enriquecer cada etapa de la experiencia de aprendizaje de tus hijos!',
        imagen: 'https://media.colsih.edu.co/ofertas_academicas/preescolar/preescolar_dos.JPG'
    },
    {
        titulo: '10 Ideas de Juegos Educativos',
        desc: '10 sugerencias lúdicas e inspiradoras para divertirse y aprender en familia sin salir de casa.',
        imagen: 'https://media.colsih.edu.co/ofertas_academicas/preescolar/preescolar_uno.JPG'
    },
    {
        titulo: 'Actividades Recreativas Infantiles',
        desc: '¿Quieres desconectar un rato de las pantallas? Aquí tienes nuestras mejores recomendaciones dinámicas.',
        imagen: 'https://media.colsih.edu.co/espacios_academicos/jardin.JPG'
    }
];

const faqsPreescolar = [
    {
        pregunta: '¿Qué hace que Preescolar COLSIH sea diferente de otras plataformas e instituciones?',
        respuesta: 'Nuestra educación preventiva salesiana con un enfoque centrado en la afectividad, iniciación al bilingüismo desde Jardín, campus campestre seguro en Floridablanca y acompañamiento psicológico continuo.'
    },
    {
        pregunta: '¿Cómo puedo acceder e iniciar el proceso de matrícula para Jardín y Transición?',
        respuesta: 'Puedes ingresar directamente al portal oficial de admisiones e inscripciones. Una vez registrado el pago del formulario, coordinaremos la citación para la prueba académica y entrevista presencial.'
    },
    {
        pregunta: '¿Qué garantía existe sobre la seguridad, adaptación y bienestar de los niños?',
        respuesta: 'Contamos con protocolos de adaptación paulatina respaldados por nuestro equipo de psicólogas infantiles y educadoras salesianas, garantizando un entorno 100% seguro y afectuoso.'
    }
];

// Componente helper para la estrella de 8 puntas scalloped (Starburst badge)
function ScallopedBadge({ children, bg = "bg-white", iconColor = "text-[#121212]" }) {
    return (
        <div className={`relative w-16 h-16 rounded-full ${bg} flex items-center justify-center shadow-md`}>
            {/* Scalloped outer ring */}
            <div className="absolute inset-0 rounded-2xl rotate-45 border-2 border-dashed border-current opacity-30" />
            <div className={`relative z-10 ${iconColor}`}>
                {children}
            </div>
        </div>
    );
}

// Componente helper para círculos concéntricos SVG
function ConcentricCirclesSVG({ className = "w-20 h-20 text-[#704FE6]" }) {
    return (
        <svg className={className} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" />
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="4" />
            <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="4" />
            <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="4" />
            <circle cx="50" cy="50" r="6" fill="currentColor" />
        </svg>
    );
}

// Componente helper para sol / estrella dentada (Starburst shape)
function StarburstSunSVG({ className = "w-16 h-16 text-[#FFD25D]" }) {
    return (
        <svg className={className} viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 L59 13 L75 4 L78 21 L95 21 L90 38 L100 50 L90 62 L95 79 L78 79 L75 96 L59 87 L50 100 L41 87 L25 96 L22 79 L5 79 L10 62 L0 50 L10 38 L5 21 L22 21 L25 4 L41 13 Z" />
        </svg>
    );
}

// Componente helper para zigzag wavy element
function ZigZagWavySVG({ className = "w-24 h-12 text-[#DEC8FE]" }) {
    return (
        <svg className={className} viewBox="0 0 120 60" fill="currentColor">
            <path d="M10,30 Q20,10 30,30 T50,30 T70,30 T90,30 T110,30" stroke="currentColor" strokeWidth="14" strokeLinecap="round" fill="none" />
        </svg>
    );
}

export default function Preescolar() {
    const [faqOpen, setFaqOpen] = useState(null);

    const toggleFaq = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    return (
        <AppLayout>
            <Head title="Preescolar | Oferta Académica COLSIH" />

            <div className="bg-white font-sans overflow-x-hidden text-[#121212] select-none">

                {/* 1. HERO SECTION ("The best place to learn and play for kids") */}
                <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 bg-white overflow-hidden">
                    
                    {/* Elemento Flotante Top-Left: Foto de Niño en Círculo Lavanda */}
                    <div className="hidden lg:block absolute top-28 left-12 z-10 w-28 h-28 rounded-full bg-[#DEC8FE] p-2 shadow-lg hover:scale-105 transition-transform">
                        <img 
                            src="https://media.colsih.edu.co/ofertas_academicas/preescolar/preescolar_uno.JPG" 
                            alt="Niño Preescolar" 
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>

                    {/* Elemento Flotante Top-Right: Revolve Sticker "WonderKids · Learning Kids" */}
                    <div className="hidden lg:block absolute top-24 right-16 z-10 w-32 h-32 rounded-full border-2 border-dashed border-[#FFD25D] p-2 flex items-center justify-center shadow-sm">
                        <div className="w-full h-full rounded-full bg-[#FFD25D] text-[#121212] flex flex-col items-center justify-center p-2 text-center">
                            <span className="text-[10px] font-black uppercase leading-tight tracking-tight">Preescolar<br/>COLSIH</span>
                            <Sparkles className="w-4 h-4 text-[#704FE6] mt-1" />
                        </div>
                    </div>

                    {/* Elemento Flotante Bottom-Left: Concentric Circles SVG */}
                    <div className="hidden lg:block absolute bottom-20 left-20 z-10 opacity-75">
                        <ConcentricCirclesSVG className="w-24 h-24 text-[#DEC8FE]" />
                    </div>

                    {/* Elemento Flotante Bottom-Right: Niño en Splash Púrpura Suave */}
                    <div className="hidden lg:block absolute bottom-16 right-20 z-10 w-32 h-36">
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-[#DEC8FE] rounded-[40px] rotate-12" />
                            <img 
                                src="https://media.colsih.edu.co/espacios_academicos/jardin.JPG" 
                                alt="Niño feliz" 
                                className="relative z-10 w-full h-full object-cover rounded-[32px] border-2 border-white shadow-md"
                            />
                        </div>
                    </div>

                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-20 text-center">
                        <div className="max-w-4xl mx-auto space-y-8">
                            
                            {/* Titular Gigante idéntico a Figma */}
                            <ScrollReveal distance="translate-y-6">
                                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-black text-[#121212] leading-[1.05] tracking-tight font-sans">
                                    El mejor lugar para <br />
                                    <span className="relative inline-block font-serif italic text-[#704FE6] px-2">
                                        aprender
                                        {/* Squiggle púrpura */}
                                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#DEC8FE]" viewBox="0 0 100 20" preserveAspectRatio="none">
                                            <path d="M0,10 Q25,18 50,10 T100,10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                                        </svg>
                                    </span>{' '}
                                    y{' '}
                                    <span className="relative inline-block font-serif italic text-[#FFBE17] px-2">
                                        jugar
                                        {/* Trazo amarillo */}
                                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FFD25D]" viewBox="0 0 100 20" preserveAspectRatio="none">
                                            <path d="M0,10 Q25,2 50,14 T100,8" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                                        </svg>
                                    </span> <br />
                                    tus hijos
                                </h1>
                            </ScrollReveal>

                            {/* Subtítulo */}
                            <ScrollReveal distance="translate-y-6" delay={150}>
                                <p className="text-lg md:text-xl font-medium text-[#666666] max-w-2xl mx-auto leading-relaxed">
                                    Descubre miles de actividades lúdicas e interactivas diseñadas para apoyar el crecimiento y proceso de aprendizaje de tu hijo.
                                </p>
                            </ScrollReveal>

                            {/* Botón Púrpura Píldora con ícono de flecha ↗ en círculo blanco */}
                            <ScrollReveal distance="translate-y-6" delay={300}>
                                <div className="pt-2 flex justify-center">
                                    <a
                                        href={LINK_INSCRIPCIONES}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-[#704FE6] hover:bg-[#5e3ed4] text-white font-black text-lg shadow-xl shadow-[#704FE6]/30 hover:scale-105 transition-all duration-300 cursor-pointer"
                                    >
                                        <span>Empezar Inscripción</span>
                                        <div className="w-10 h-10 rounded-full bg-white text-[#704FE6] flex items-center justify-center shadow-xs group-hover:rotate-45 transition-transform">
                                            <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />
                                        </div>
                                    </a>
                                </div>
                            </ScrollReveal>

                        </div>
                    </div>
                </section>


                {/* 2. OUR INTERACTIVE FEATURES ("Our interactive features") */}
                <section className="py-20 md:py-32 bg-white">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-16">
                        
                        {/* Header con Título + Blob de 3 Tags Rotados a la derecha */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-2 text-left">
                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#121212] tracking-tight">
                                    Nuestras <span className="font-serif italic text-[#704FE6]">características</span> <br />
                                    interactivas
                                </h2>
                            </div>

                            {/* Blob contenedor con 3 tags rotados */}
                            <div className="relative p-6 rounded-[32px] border-2 border-[#DEC8FE]/50 bg-[#F7F7FB] flex items-center gap-3">
                                <span className="px-5 py-2.5 rounded-full bg-[#DEC8FE] text-[#704FE6] font-bold text-base shadow-xs -rotate-6 inline-block">#funny</span>
                                <span className="px-5 py-2.5 rounded-full bg-[#FFD25D] text-[#121212] font-bold text-base shadow-xs rotate-6 inline-block">#enjoy</span>
                                <span className="px-5 py-2.5 rounded-full bg-[#704FE6] text-white font-bold text-base shadow-xs -rotate-3 inline-block">#happy</span>
                            </div>
                        </div>

                        {/* Grid de 3 Tarjetas Grandes e Iguales (`rounded-[40px]`) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            
                            {/* Card 1: Lavender Card */}
                            <ScrollReveal distance="translate-y-8" delay={100}>
                                <div className="bg-[#DEC8FE] rounded-[40px] p-8 md:p-10 relative overflow-hidden space-y-8 h-full flex flex-col justify-between hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-[#DEC8FE]">
                                    {/* Patrón de Círculos Concéntricos en la esquina superior derecha */}
                                    <div className="absolute -top-4 -right-4 pointer-events-none">
                                        <ConcentricCirclesSVG className="w-36 h-36 text-[#704FE6]" />
                                    </div>

                                    {/* Badge con ícono */}
                                    <div className="relative z-10">
                                        <ScallopedBadge bg="bg-white" iconColor="text-[#121212]">
                                            <BookOpen className="w-7 h-7" />
                                        </ScallopedBadge>
                                    </div>

                                    <div className="space-y-4 relative z-10 pt-4">
                                        <h3 className="text-4xl font-black text-[#121212] leading-tight">
                                            Fun <br />
                                            <span className="font-serif italic text-[#121212]">Quiz</span>
                                        </h3>
                                        <p className="text-base font-semibold text-[#555670] leading-relaxed">
                                            ¡Evalúa la comprensión de forma lúdica con cuestionarios breves e interactivos muy divertidos!
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Card 2: Vibrant Purple Card */}
                            <ScrollReveal distance="translate-y-8" delay={200}>
                                <div className="bg-[#704FE6] text-white rounded-[40px] p-8 md:p-10 relative overflow-hidden space-y-8 h-full flex flex-col justify-between hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-[#704FE6]">
                                    {/* Elemento ZigZag Wavy en la esquina superior derecha */}
                                    <div className="absolute top-6 -right-2 pointer-events-none rotate-12">
                                        <ZigZagWavySVG className="w-32 h-16 text-[#DEC8FE]" />
                                    </div>

                                    {/* Badge con ícono */}
                                    <div className="relative z-10">
                                        <ScallopedBadge bg="bg-[#9B84EE]" iconColor="text-white">
                                            <Palette className="w-7 h-7" />
                                        </ScallopedBadge>
                                    </div>

                                    <div className="space-y-4 relative z-10 pt-4">
                                        <h3 className="text-4xl font-black text-white leading-tight">
                                            Creative <br />
                                            <span className="font-serif italic text-purple-200">Activities</span>
                                        </h3>
                                        <p className="text-base font-semibold text-purple-100 leading-relaxed">
                                            Descubre actividades disfrutables como colorear, hacer manualidades y pequeñas ciencias infantiles.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Card 3: Golden Yellow Card */}
                            <ScrollReveal distance="translate-y-8" delay={300}>
                                <div className="bg-[#FFD25D] text-[#121212] rounded-[40px] p-8 md:p-10 relative overflow-hidden space-y-8 h-full flex flex-col justify-between hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-[#FFC837]">
                                    {/* Matriz de Puntos Blancos 5x5 en la esquina superior derecha */}
                                    <div className="absolute top-6 right-6 pointer-events-none opacity-80 grid grid-cols-5 gap-2">
                                        {[...Array(25)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 rounded-full bg-white" />
                                        ))}
                                    </div>

                                    {/* Badge con ícono */}
                                    <div className="relative z-10">
                                        <ScallopedBadge bg="bg-white" iconColor="text-[#121212]">
                                            <Gamepad2 className="w-7 h-7" />
                                        </ScallopedBadge>
                                    </div>

                                    <div className="space-y-4 relative z-10 pt-4">
                                        <h3 className="text-4xl font-black text-[#121212] leading-tight">
                                            Learn with <br />
                                            <span className="font-serif italic text-[#121212]">Games</span>
                                        </h3>
                                        <p className="text-base font-semibold text-slate-900 leading-relaxed">
                                            ¡Aprende algo nuevo todos los días mientras tus hijos disfrutan jugando alegremente!
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                        </div>

                    </div>
                </section>


                {/* 3. LEARNING MATERIALS ("The learning materials provided are enjoyable for children") */}
                <section className="py-20 md:py-32 bg-white">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            
                            {/* Columna Izquierda: Título con Ovalo Dibujado y Botón "Learn More" */}
                            <div className="lg:col-span-6 space-y-8 text-left">
                                <ScrollReveal distance="translate-y-6">
                                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#121212] leading-[1.1] tracking-tight">
                                        Los materiales educativos <br />
                                        proporcionados son{' '}
                                        <span className="relative inline-block font-serif italic text-[#704FE6]">
                                            disfrutables
                                            {/* Ovalo amarillo dibujado alrededor de disfrutables */}
                                            <svg className="absolute -inset-3 w-[120%] h-[140%] text-[#FFD25D] -left-2 -top-2 pointer-events-none" viewBox="0 0 120 60" fill="none">
                                                <ellipse cx="60" cy="30" rx="55" ry="24" stroke="currentColor" strokeWidth="5" strokeDasharray="300" strokeDashoffset="0" />
                                            </svg>
                                        </span> <br />
                                        para los niños
                                    </h2>
                                </ScrollReveal>

                                <ScrollReveal distance="translate-y-6" delay={150}>
                                    <p className="text-lg font-semibold text-[#666666] leading-relaxed max-w-lg">
                                        ¡No te preocupes! Tus hijos pasarán momentos muy divertidos mientras aprenden con nuestros materiales didácticos de fácil comprensión.
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal distance="translate-y-6" delay={300}>
                                    <div className="pt-2">
                                        <a
                                            href={LINK_INSCRIPCIONES}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center gap-4 px-8 py-3.5 rounded-full border-2 border-[#704FE6] hover:bg-[#704FE6] text-[#704FE6] hover:text-white font-extrabold text-base transition-all duration-300 shadow-xs cursor-pointer"
                                        >
                                            <span>Conocer Más</span>
                                            <div className="w-8 h-8 rounded-full bg-[#704FE6] text-white group-hover:bg-white group-hover:text-[#704FE6] flex items-center justify-center transition-colors">
                                                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                                            </div>
                                        </a>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Columna Derecha: 3 Pill Cards Apiladas Horizontalmente */}
                            <div className="lg:col-span-6 space-y-6">
                                
                                {/* Top Pill Card (Lavender `#DEC8FE` + Yellow Starburst Sun) */}
                                <ScrollReveal distance="translate-y-6" delay={100}>
                                    <div className="relative p-6 rounded-full bg-[#DEC8FE] flex items-center justify-between shadow-xs">
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src="https://media.colsih.edu.co/ofertas_academicas/preescolar/preescolar_uno.JPG" 
                                                alt="Niño aprendiendo" 
                                                className="w-24 h-24 object-cover rounded-full border-2 border-white shadow-xs"
                                            />
                                            <div className="text-left">
                                                <span className="text-xs font-black uppercase text-[#704FE6] tracking-wider">APRENDIZAJE LÚDICO</span>
                                                <h4 className="text-xl font-black text-[#121212]">MaterialDidáctico</h4>
                                            </div>
                                        </div>
                                        {/* Sol Starburst */}
                                        <div className="pr-4 hidden sm:block">
                                            <StarburstSunSVG className="w-16 h-16 text-[#FFD25D]" />
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* Middle Pill Card (Vibrant Purple `#704FE6` + Lavender Wavy Element) */}
                                <ScrollReveal distance="translate-y-6" delay={200}>
                                    <div className="relative p-6 rounded-full bg-[#704FE6] text-white flex items-center justify-between shadow-xs">
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src="https://media.colsih.edu.co/ofertas_academicas/preescolar/preescolar_dos.JPG" 
                                                alt="Niña sonriendo" 
                                                className="w-24 h-24 object-cover rounded-full border-2 border-white shadow-xs"
                                            />
                                            <div className="text-left">
                                                <span className="text-xs font-black uppercase text-purple-200 tracking-wider">DESARROLLO CREATIVO</span>
                                                <h4 className="text-xl font-black text-white">Experiencias Felices</h4>
                                            </div>
                                        </div>
                                        {/* Zigzag Wavy Splash */}
                                        <div className="pr-4 hidden sm:block">
                                            <ZigZagWavySVG className="w-20 h-10 text-[#DEC8FE]" />
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* Bottom Pill Card (Golden Yellow `#FFD25D` + Concentric Circles) */}
                                <ScrollReveal distance="translate-y-6" delay={300}>
                                    <div className="relative p-6 rounded-full bg-[#FFD25D] text-[#121212] flex items-center justify-between shadow-xs">
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src="https://media.colsih.edu.co/espacios_academicos/jardin.JPG" 
                                                alt="Niña escribiendo" 
                                                className="w-24 h-24 object-cover rounded-full border-2 border-white shadow-xs"
                                            />
                                            <div className="text-left">
                                                <span className="text-xs font-black uppercase text-slate-900 tracking-wider">COMPRENSIÓN FÁCIL</span>
                                                <h4 className="text-xl font-black text-[#121212]">Lectura & Dibujo</h4>
                                            </div>
                                        </div>
                                        {/* Círculos Concéntricos */}
                                        <div className="pr-4 hidden sm:block">
                                            <ConcentricCirclesSVG className="w-16 h-16 text-[#704FE6]" />
                                        </div>
                                    </div>
                                </ScrollReveal>

                            </div>

                        </div>
                    </div>
                </section>


                {/* 4. OUR TEACHERS / DOCENTES ("We aim to help children discover the joy of creative learning...") */}
                <section className="py-20 md:py-32 bg-white">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                        <div className="bg-[#704FE6] text-white rounded-[44px] p-10 md:p-16 relative overflow-hidden shadow-2xl space-y-16">
                            
                            {/* Decorador Sol Izquierda Top */}
                            <div className="absolute top-8 left-8 pointer-events-none">
                                <StarburstSunSVG className="w-20 h-20 text-[#FFD25D]" />
                            </div>

                            {/* Decorador Wavy Derecha Top */}
                            <div className="absolute top-12 right-12 pointer-events-none rotate-45">
                                <ZigZagWavySVG className="w-28 h-14 text-[#DEC8FE]" />
                            </div>

                            {/* Titular Grande Centrado idéntico a Figma */}
                            <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10 pt-4">
                                <ScrollReveal distance="translate-y-6">
                                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                                        Buscamos ayudar a los niños a <br />
                                        <span className="font-serif italic text-[#FFD25D]">descubrir la alegría</span> del aprendizaje <br />
                                        creativo y crecer como personas integrales.
                                    </h2>
                                </ScrollReveal>
                            </div>

                            {/* Grid de 4 Profesores con Avatares Circulares y Fondos de Colores */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
                                {docentesPreescolar.map((docente, idx) => (
                                    <ScrollReveal key={idx} distance="translate-y-8" delay={idx * 100}>
                                        <div className="space-y-4 group">
                                            <div className="relative mx-auto w-36 h-36 flex items-center justify-center">
                                                {/* Círculo de color de fondo */}
                                                <div className={`absolute inset-0 rounded-full ${docente.colorCircle} group-hover:scale-105 transition-transform duration-300 shadow-md`} />
                                                <img 
                                                    src={docente.foto} 
                                                    alt={docente.nombre} 
                                                    className="relative z-10 w-32 h-32 object-cover rounded-full border-4 border-white shadow-sm"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-white">{docente.nombre}</h3>
                                                <p className="text-sm font-semibold text-purple-200 mt-1">{docente.cargo}</p>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>

                        </div>
                    </div>
                </section>


                {/* 5. READ OUR BLOG ("Read our blog") */}
                <section className="py-20 md:py-32 bg-white">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-16">
                        
                        {/* Header + Botón "See All" a la derecha */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="space-y-2 text-left">
                                <h2 className="text-4xl sm:text-5xl font-black text-[#121212] tracking-tight">
                                    Lee nuestro <span className="font-serif italic text-[#704FE6]">blog</span>
                                </h2>
                            </div>

                            <Link
                                href="/noticias"
                                className="group inline-flex items-center gap-3 font-extrabold text-base text-[#704FE6] hover:text-[#5e3ed4] transition-colors self-start sm:self-auto"
                            >
                                <span>Ver Todo</span>
                                <div className="w-9 h-9 rounded-full bg-[#704FE6] text-white flex items-center justify-center group-hover:rotate-45 transition-transform">
                                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                                </div>
                            </Link>
                        </div>

                        {/* 3 Tarjetas de Blog (`bg-[#F7F7F7] rounded-[32px] p-4`) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            {blogCards.map((blog, idx) => (
                                <ScrollReveal key={idx} distance="translate-y-8" delay={idx * 100}>
                                    <div className="bg-[#F7F7F7] rounded-[32px] overflow-hidden p-5 space-y-6 hover:shadow-xl hover:bg-white transition-all duration-300 border border-slate-200/80 group h-full flex flex-col justify-between">
                                        <div className="space-y-4">
                                            <div className="h-52 rounded-2xl overflow-hidden">
                                                <img 
                                                    src={blog.imagen} 
                                                    alt={blog.titulo} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <h3 className="text-2xl font-black text-[#121212] leading-snug group-hover:text-[#704FE6] transition-colors">
                                                {blog.titulo}
                                            </h3>
                                            <p className="text-base font-semibold text-[#666666] leading-relaxed">
                                                {blog.desc}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-sm font-extrabold text-[#704FE6]">
                                            <span>Conocer más</span>
                                            <div className="w-8 h-8 rounded-full bg-[#704FE6] text-white flex items-center justify-center group-hover:rotate-45 transition-transform">
                                                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
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
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            
                            {/* Columna Izquierda: Título + Adornos Gráficos */}
                            <div className="lg:col-span-5 space-y-6 text-left relative">
                                <ScrollReveal distance="translate-y-6">
                                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#121212] leading-tight tracking-tight">
                                        Preguntas <br />
                                        <span className="font-serif italic text-[#704FE6]">frecuentes</span>
                                    </h2>

                                    {/* Adorno gráfico Sol + Zigzag */}
                                    <div className="pt-6 flex items-center gap-4 opacity-90">
                                        <StarburstSunSVG className="w-16 h-16 text-[#FFD25D]" />
                                        <ZigZagWavySVG className="w-24 h-12 text-[#DEC8FE]" />
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Columna Derecha: Acordeón de FAQs */}
                            <div className="lg:col-span-7 space-y-4 text-left">
                                {faqsPreescolar.map((faq, idx) => {
                                    const isOpen = faqOpen === idx;
                                    return (
                                        <ScrollReveal key={idx} distance="translate-y-4" delay={idx * 100}>
                                            <div 
                                                onClick={() => toggleFaq(idx)}
                                                className={`rounded-[24px] p-6 md:p-8 transition-all cursor-pointer border-2 ${
                                                    isOpen
                                                        ? 'bg-[#F7F7FB] border-[#704FE6] shadow-md'
                                                        : 'bg-[#F9F9F9] border-slate-200 hover:border-slate-300'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between gap-4">
                                                    <h3 className="text-xl font-bold text-[#121212] font-sans">
                                                        {faq.pregunta}
                                                    </h3>
                                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'bg-[#704FE6] text-white' : 'bg-[#EAE0FE] text-[#704FE6]'}`}>
                                                        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                                    </div>
                                                </div>

                                                {isOpen && (
                                                    <p className="mt-4 pt-4 border-t border-slate-200 text-base font-semibold text-[#666666] leading-relaxed">
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

            </div>
        </AppLayout>
    );
}
