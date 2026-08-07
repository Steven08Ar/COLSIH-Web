import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ScrollReveal from '../HomeSections/ScrollReveal';
import { 
    ArrowUpRight, 
    Plus, 
    Minus, 
    Sparkles, 
    BookOpen, 
    Palette, 
    Gamepad2,
    User
} from 'lucide-react';
import { useState } from 'react';
import { mediaUrl } from '@/utils/mediaUrl';

const LINK_INSCRIPCIONES = "https://e.plataformaintegra.net/sihungria/index.php/cupo";

const docentesPreescolar = [
    {
        nombre: 'Lic. Daniela Villamizar',
        cargo: 'Docente de Preescolar',
        colorCircle: 'bg-[#FFD25D]',
        foto: 'https://media.colsih.edu.co/nuestro_colegio/equipo/docentes/Daniela%20Villamizar%20Villamizar.JPG'
    },
    {
        nombre: 'Lady Diana Osorio',
        cargo: 'Docente de Desarrollo Infantil',
        colorCircle: 'bg-[#F3E3D4]',
        foto: 'https://media.colsih.edu.co/nuestro_colegio/equipo/docentes/Lady%20Diana%20Osorio%20Fonseca.JPG'
    },
    {
        nombre: 'Paula Lorena Cuadros',
        cargo: 'Docente de Dimensión Comunicativa',
        colorCircle: 'bg-[#ADA3DA]',
        foto: 'https://media.colsih.edu.co/nuestro_colegio/equipo/docentes/Paula%20Lorena%20Cuadros%20Ballesteros.JPG'
    },
    {
        nombre: 'Diana Soidé Villamizar',
        cargo: 'Docente de Lectoescritura Inicial',
        colorCircle: 'bg-[#90C5DE]',
        foto: 'https://media.colsih.edu.co/nuestro_colegio/equipo/docentes/Diana%20Soid%C3%A9%20Villamizar%20Bautista.JPG'
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
        <div className={`relative w-16 h-16 rounded-full ${bg} flex items-center justify-center shadow-sm`}>
            <div className="absolute inset-0 rounded-2xl rotate-45 border-2 border-dashed border-current opacity-25" />
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
function StarburstSunSVG({ className = "w-20 h-20 text-[#FFD25D]" }) {
    return (
        <svg className={className} viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 L59 13 L75 4 L78 21 L95 21 L90 38 L100 50 L90 62 L95 79 L78 79 L75 96 L59 87 L50 100 L41 87 L25 96 L22 79 L5 79 L10 62 L0 50 L10 38 L5 21 L22 21 L25 4 L41 13 Z" />
        </svg>
    );
}

// Componente helper para zigzag wavy element
function ZigZagWavySVG({ className = "w-28 h-14 text-[#DEC8FE]" }) {
    return (
        <svg className={className} viewBox="0 0 120 60" fill="currentColor">
            <path d="M10,30 Q20,10 30,30 T50,30 T70,30 T90,30 T110,30" stroke="currentColor" strokeWidth="16" strokeLinecap="round" fill="none" />
        </svg>
    );
}

// Estilos para las formas orgánicas asimétricas no perfectas (Blobs) idénticas a Figma
const organicBlobStyles = [
    { borderRadius: '58% 42% 62% 38% / 44% 56% 44% 56%' }, // Blob 1 (Yellow)
    { borderRadius: '42% 58% 38% 62% / 56% 44% 56% 44%' }, // Blob 2 (Beige)
    { borderRadius: '65% 35% 55% 45% / 45% 55% 35% 65%' }, // Blob 3 (Lavender)
    { borderRadius: '45% 55% 40% 60% / 60% 40% 60% 40%' }  // Blob 4 (Sky Blue)
];

// Componente para la tarjeta de cada docente con forma orgánica grande y avatar limpio si falta foto
function TeacherCard({ docente, idx }) {
    const [hasError, setHasError] = useState(false);
    const blobStyle = organicBlobStyles[idx % 4];

    return (
        <ScrollReveal distance="translate-y-8" delay={idx * 100}>
            <div className="space-y-5 group flex flex-col items-center">
                {/* Contenedor Orgánico Asimétrico Grande idéntico a Figma */}
                <div 
                    className={`relative w-56 h-56 sm:w-64 sm:h-64 lg:w-68 lg:h-68 ${docente.colorCircle} shadow-xl group-hover:scale-105 transition-transform duration-500 overflow-hidden flex items-center justify-center`}
                    style={blobStyle}
                >
                    {(!docente.foto || hasError) ? (
                        <div className="flex flex-col items-center justify-center text-white/80 p-4">
                            <User className="w-24 h-24 stroke-[1.5]" />
                        </div>
                    ) : (
                        <img 
                            src={docente.foto} 
                            alt={docente.nombre} 
                            className="w-full h-full object-cover"
                            onError={() => setHasError(true)}
                        />
                    )}
                </div>

                <div className="space-y-1 text-center">
                    <h3 className="text-2xl font-black text-white leading-snug">{docente.nombre}</h3>
                    <p className="text-base font-semibold text-purple-200">{docente.cargo}</p>
                </div>
            </div>
        </ScrollReveal>
    );
}

export default function Preescolar({ noticias = [] }) {
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
                    <div className="hidden lg:block absolute top-20 left-16 z-10 w-28 h-28 rounded-full bg-[#DEC8FE] p-2 shadow-lg hover:scale-105 transition-transform">
                        <img 
                            src="https://media.colsih.edu.co/ofertas_academicas/preescolar.JPG" 
                            alt="Niño Preescolar" 
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>

                    {/* Flecha Rizada Púrpura apuntando desde la foto superior izquierda hacia el título */}
                    <div className="hidden lg:block absolute top-48 left-16 z-10 pointer-events-none">
                        <svg className="w-24 h-24 text-[#704FE6]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M 20,15 C 10,45 35,70 50,45 C 65,20 20,25 35,70 C 45,85 80,80 92,70" />
                            <path d="M 82,76 L 94,70 L 90,56" />
                        </svg>
                    </div>

                    {/* Stamp Circular Giratorio de Figma "WonderKids · Learning Kids ·" */}
                    <div className="hidden lg:block absolute top-20 right-16 z-10 w-32 h-32 pointer-events-none">
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Texto circular giratorio */}
                            <svg className="w-full h-full animate-spin-slow text-[#FFBE17]" viewBox="0 0 100 100">
                                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                                <text className="text-[9.5px] font-extrabold fill-[#FFBE17] tracking-widest uppercase">
                                    <textPath href="#circlePath" startOffset="0%">
                                        WonderKids • Learning Kids •
                                    </textPath>
                                </text>
                            </svg>
                            {/* Flor central en púrpura */}
                            <div className="absolute w-10 h-10 rounded-full bg-[#DEC8FE] flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-[#704FE6]" />
                            </div>
                        </div>
                    </div>

                    {/* Círculo suave en el centro derecho */}
                    <div className="hidden lg:block absolute top-1/2 right-28 z-10 w-5 h-5 rounded-full bg-[#DEC8FE] pointer-events-none" />

                    {/* Elemento Flotante Bottom-Left: Concentric Circles SVG */}
                    <div className="hidden lg:block absolute bottom-20 left-20 z-10 opacity-75">
                        <ConcentricCirclesSVG className="w-24 h-24 text-[#DEC8FE]" />
                    </div>

                    {/* Niño en Blob Orgánico Vertical Lavanda idéntico a Figma */}
                    <div className="hidden lg:block absolute bottom-12 right-16 z-10 w-44 h-56 pointer-events-none">
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Formación orgánica de fondo lavanda vertical */}
                            <div 
                                className="absolute inset-0 bg-[#DEC8FE] shadow-sm"
                                style={{ borderRadius: '35% 65% 60% 40% / 50% 30% 70% 50%' }}
                            />
                            <img 
                                src="https://media.colsih.edu.co/espacios_academicos/jardin.JPG" 
                                alt="Niño feliz preescolar" 
                                className="relative z-10 w-36 h-48 object-cover rounded-[28px] shadow-sm transform -rotate-3"
                            />
                        </div>
                    </div>

                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-20 text-center flex flex-col items-center justify-center">
                        <div className="max-w-4xl mx-auto space-y-8 text-center flex flex-col items-center">
                            
                            {/* Titular Gigante en Quicksand Semibold idéntico a Figma */}
                            <ScrollReveal distance="translate-y-6">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-['Quicksand'] font-semibold text-[#121212] leading-[1.3] tracking-tight text-center">
                                    <span className="block mb-2 font-['Quicksand'] font-semibold text-[#121212]">
                                        El mejor lugar para
                                    </span>
                                    
                                    <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 my-2 py-1">
                                        <span className="relative inline-block font-serif italic text-[#704FE6] text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-normal px-2">
                                            aprender
                                            {/* Squiggle púrpura */}
                                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#DEC8FE]" viewBox="0 0 100 20" preserveAspectRatio="none">
                                                <path d="M0,10 Q25,18 50,10 T100,10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                                            </svg>
                                        </span>

                                        <span className="font-['Quicksand'] font-semibold text-[#121212] text-3xl sm:text-4xl md:text-5xl mx-1 align-baseline">
                                            y
                                        </span>

                                        <span className="relative inline-block font-serif italic text-[#FFBE17] text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-normal px-2">
                                            jugar
                                            {/* Trazo amarillo */}
                                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FFD25D]" viewBox="0 0 100 20" preserveAspectRatio="none">
                                                <path d="M0,10 Q25,2 50,14 T100,8" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                                            </svg>
                                        </span>
                                    </span>

                                    <span className="block mt-4 font-['Quicksand'] font-semibold text-[#121212]">
                                        para tus hijos
                                    </span>
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
                        
                        {/* Header con Título + 3 Tags Rotados sin fondo gris */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-2 text-left">
                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#121212] tracking-tight">
                                    Nuestras <span className="font-serif italic text-[#704FE6]">características</span> <br />
                                    interactivas
                                </h2>
                            </div>

                            {/* 3 tags rotados sin contenedor ni fondo gris */}
                            <div className="flex items-center gap-3">
                                <span className="px-5 py-2.5 rounded-full bg-[#DEC8FE] text-[#704FE6] font-bold text-base shadow-xs -rotate-6 inline-block">#divertido</span>
                                <span className="px-5 py-2.5 rounded-full bg-[#FFD25D] text-[#121212] font-bold text-base shadow-xs rotate-6 inline-block">#disfruta</span>
                                <span className="px-5 py-2.5 rounded-full bg-[#704FE6] text-white font-bold text-base shadow-xs -rotate-3 inline-block">#feliz</span>
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

                                    {/* Ícono grande sin círculo alrededor */}
                                    <div className="relative z-10 pt-2">
                                        <BookOpen className="w-14 h-14 text-[#121212] stroke-[1.8]" />
                                    </div>

                                    <div className="space-y-4 relative z-10 pt-4">
                                        <h3 className="text-4xl font-black text-[#121212] leading-tight">
                                            Cuestionarios <br />
                                            <span className="font-serif italic text-[#121212]">Divertidos</span>
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

                                    {/* Ícono grande sin círculo alrededor */}
                                    <div className="relative z-10 pt-2">
                                        <Palette className="w-14 h-14 text-white stroke-[1.8]" />
                                    </div>

                                    <div className="space-y-4 relative z-10 pt-4">
                                        <h3 className="text-4xl font-black text-white leading-tight">
                                            Actividades <br />
                                            <span className="font-serif italic text-purple-200">Creativas</span>
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

                                    {/* Ícono grande sin círculo alrededor */}
                                    <div className="relative z-10 pt-2">
                                        <Gamepad2 className="w-14 h-14 text-[#121212] stroke-[1.8]" />
                                    </div>

                                    <div className="space-y-4 relative z-10 pt-4">
                                        <h3 className="text-4xl font-black text-[#121212] leading-tight">
                                            Aprende con <br />
                                            <span className="font-serif italic text-[#121212]">Juegos</span>
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


                {/* 3. LEARNING MATERIALS ("The learning materials provided are enjoyable for children") - RÉPLICA EXACTA 100% FIGMA */}
                <section className="py-20 md:py-32 bg-white">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            
                            {/* Columna Izquierda: Título con Ovalo Dibujado y Botón "Learn More" */}
                            <div className="lg:col-span-6 space-y-8 text-left">
                                <ScrollReveal distance="translate-y-6">
                                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#121212] leading-[1.1] tracking-tight font-sans">
                                        Los materiales didácticos <br />
                                        proporcionados son{' '}
                                        <span className="relative inline-block font-serif italic text-[#704FE6] px-1">
                                            disfrutables
                                            {/* Ovalo amarillo dibujado alrededor de disfrutables exacto a Figma */}
                                            <svg className="absolute -inset-x-4 -inset-y-3 w-[130%] h-[150%] text-[#FFD25D] pointer-events-none -left-3 -top-3" viewBox="0 0 140 70" fill="none">
                                                <ellipse cx="70" cy="35" rx="64" ry="26" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
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

                            {/* Columna Derecha: Composición de Nodos 100% Réplica de Figma */}
                            <div className="lg:col-span-6 relative h-[560px] w-full max-w-[580px] mx-auto">
                                
                                {/* 1. Píldora Superior (Soft Lavender `#DEC8FE`) + Sol Starburst + Foto Niño 1 */}
                                <ScrollReveal distance="translate-y-6" delay={100}>
                                    <div className="absolute right-0 top-12 w-[72%] sm:w-[340px] h-32 rounded-full bg-[#DEC8FE] shadow-sm flex items-center justify-between px-6 z-10">
                                        {/* Sol Starburst en la esquina superior derecha de la píldora lavanda */}
                                        <div className="absolute -top-7 -right-4 z-20 pointer-events-none">
                                            <StarburstSunSVG className="w-24 h-24 text-[#FFD25D] drop-shadow-sm" />
                                        </div>
                                        {/* Niña con peluche sobresaliendo en el lado izquierdo de la píldora (SIN BORDE) */}
                                        <img 
                                            src="https://media.colsih.edu.co/ofertas_academicas/preescolar.JPG" 
                                            alt="Niños en preescolar" 
                                            className="absolute -top-8 left-8 h-40 w-32 object-cover rounded-[32px] z-30 shadow-md"
                                        />
                                    </div>
                                </ScrollReveal>

                                {/* 2. Píldora Central (Vibrant Purple `#704FE6`) + Splash ZigZag + Foto Niña 2 */}
                                <ScrollReveal distance="translate-y-6" delay={200}>
                                    <div className="absolute right-0 top-52 w-[88%] sm:w-[450px] h-32 rounded-full bg-[#704FE6] shadow-md z-20 overflow-visible">
                                        {/* Splash ZigZag Lavanda a la izquierda */}
                                        <div className="absolute left-6 top-5 z-20 pointer-events-none">
                                            <ZigZagWavySVG className="w-32 h-16 text-[#DEC8FE]" />
                                        </div>
                                        {/* Niña feliz sobresaliendo en la derecha de la píldora (SIN BORDE) */}
                                        <img 
                                            src="https://media.colsih.edu.co/espacios_academicos/jardin.JPG" 
                                            alt="Espacio de Jardín Preescolar" 
                                            className="absolute -top-8 right-6 h-40 w-32 object-cover rounded-[32px] z-30 shadow-md"
                                        />
                                    </div>
                                </ScrollReveal>

                                {/* 3. Píldora Inferior (Golden Yellow `#FFD25D`) + Foto Niño 3 + Círculos Concéntricos */}
                                <ScrollReveal distance="translate-y-6" delay={300}>
                                    <div className="absolute right-0 top-[370px] w-full sm:w-[530px] h-32 rounded-full bg-[#FFD25D] shadow-md z-30 overflow-visible">
                                        {/* Foto de estudiantes sobresaliendo en la parte izquierda (SIN BORDE) */}
                                        <img 
                                            src="/valores/hermanos.JPG" 
                                            alt="Estudiantes en el colegio" 
                                            className="absolute -top-10 left-10 h-44 w-44 object-cover rounded-[32px] z-40 shadow-md"
                                        />
                                        {/* Círculos Concéntricos Púrpura flotando abajo a la derecha de la píldora amarilla */}
                                        <div className="absolute -bottom-6 right-6 z-40 pointer-events-none">
                                            <ConcentricCirclesSVG className="w-28 h-28 text-[#704FE6]" />
                                        </div>
                                    </div>
                                </ScrollReveal>

                            </div>

                        </div>
                    </div>
                </section>


                {/* 4. OUR TEACHERS / DOCENTES - FONDO DE ESQUINA A ESQUINA (FULL-BLEED EDGE-TO-EDGE) */}
                <section className="w-full bg-[#704FE6] text-white py-24 md:py-32 relative overflow-hidden my-12">
                    {/* Decorador Sol Izquierda Top */}
                    <div className="absolute top-10 left-8 md:left-16 pointer-events-none">
                        <StarburstSunSVG className="w-24 h-24 text-[#FFD25D]" />
                    </div>

                    {/* Decorador Wavy Derecha Top */}
                    <div className="absolute top-12 right-8 md:right-16 pointer-events-none rotate-45">
                        <ZigZagWavySVG className="w-32 h-16 text-[#DEC8FE]" />
                    </div>

                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-16 relative z-10">
                        {/* Titular Limpio, Tipografía Perfecta y Espaciada */}
                        <div className="max-w-4xl mx-auto text-center space-y-4">
                            <ScrollReveal distance="translate-y-6">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug tracking-tight text-white font-sans">
                                    Buscamos ayudar a los niños a{' '}
                                    <span className="font-serif italic text-[#FFD25D] mx-2 inline-block">
                                        descubrir la alegría
                                    </span>{' '}
                                    del aprendizaje creativo y crecer como personas integrales.
                                </h2>
                            </ScrollReveal>
                        </div>

                        {/* Grid de 4 Profesoras Reales de Preescolar COLSIH en Formas Orgánicas Grandes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center items-start">
                            {docentesPreescolar.map((docente, idx) => (
                                <TeacherCard key={idx} docente={docente} idx={idx} />
                            ))}
                        </div>
                    </div>
                </section>


                {/* 5. READ OUR BLOG - Solo aparece si el administrador ha creado publicaciones en la categoría Preescolar */}
                {noticias && noticias.length > 0 && (
                    <section className="py-20 md:py-32 bg-white">
                        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-16">
                            
                            {/* Header + Botón "Ver Todo" a la derecha */}
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

                            {/* Tarjetas de Blog Creadas por el Administrador */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                                {noticias.map((blog, idx) => (
                                    <ScrollReveal key={blog.id || idx} distance="translate-y-8" delay={idx * 100}>
                                        <Link 
                                            href={`/noticias/${blog.slug}`}
                                            className="bg-[#F7F7F7] rounded-[32px] overflow-hidden p-5 space-y-6 hover:shadow-xl hover:bg-white transition-all duration-300 border border-slate-200/80 group h-full flex flex-col justify-between block"
                                        >
                                            <div className="space-y-4">
                                                <div className="h-52 rounded-2xl overflow-hidden">
                                                    <img 
                                                        src={blog.imagen ? mediaUrl(blog.imagen) : 'https://media.colsih.edu.co/espacios_academicos/jardin.JPG'} 
                                                        alt={blog.titulo} 
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <h3 className="text-2xl font-black text-[#121212] leading-snug group-hover:text-[#704FE6] transition-colors">
                                                    {blog.titulo}
                                                </h3>
                                                <p className="text-base font-semibold text-[#666666] leading-relaxed line-clamp-3">
                                                    {blog.resumen || 'Noticia de Preescolar COLSIH'}
                                                </p>
                                            </div>

                                            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-sm font-extrabold text-[#704FE6]">
                                                <span>Conocer más</span>
                                                <div className="w-8 h-8 rounded-full bg-[#704FE6] text-white flex items-center justify-center group-hover:rotate-45 transition-transform">
                                                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                                                </div>
                                            </div>
                                        </Link>
                                    </ScrollReveal>
                                ))}
                            </div>

                        </div>
                    </section>
                )}


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
