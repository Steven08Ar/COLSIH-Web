import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const hitos = [
    { 
        año: '1980', 
        titulo: 'Fundación de FUNDAVILLABEL', 
        texto: 'El 28 de febrero se constituye la Fundación Centro Parroquial Villabel (FUNDAVILLABEL) bajo el decreto diocesano No. 633. Este hito sentó las bases comunitarias y eclesiásticas fundamentales para gestar el sueño de una educación salesiana en Floridablanca.',
        imagen: '/historia_1983.png',
        caption: 'Primeras reuniones comunitarias en Villabel, 1980'
    },
    { 
        año: '1988', 
        titulo: 'Creación del Centro Educativo', 
        texto: 'Ante el ferviente anhelo de la comunidad, el párroco Ramiro Parra Mantilla gestiona la creación de un centro educativo ante la Arquidiócesis de Bucaramanga. El 25 de noviembre de 1988 queda formalmente fundado el plantel de enseñanza.',
        imagen: '/historia_1983.png',
        caption: 'Plano y acta de fundación de la sede parroquial, 1988'
    },
    { 
        año: '1989', 
        titulo: 'Inicio de Labores Académicas', 
        texto: 'El 6 de febrero inician oficialmente las clases, abriendo las puertas a cientos de niños y jóvenes del sector, bajo la dirección inicial del Lic. Orlando Becerra y la recordada Lic. Nubia Carrillo Rodríguez.',
        imagen: '/historia_1995.png',
        caption: 'Primer grupo escolar en las instalaciones iniciales, 1989'
    },
    { 
        año: '1991', 
        titulo: 'Nombre Oficial: Santa Isabel de Hungría', 
        texto: 'El 25 de octubre, mediante resolución 033, se aprueba la denominación oficial de la institución en honor a Santa Isabel de Hungría, patrona del servicio y la caridad salesiana, dotando al colegio de su propia identidad independiente.',
        imagen: '/historia_1995.png',
        caption: 'Consagración a nuestra patrona, 1991'
    },
    { 
        año: '1993', 
        titulo: 'Primera Promoción de Bachilleres', 
        texto: 'Se conmemora la graduación y proclamación de la primera promoción oficial de Bachilleres Académicos del colegio, marcando un precedente de excelencia académica para la región.',
        imagen: '/historia_1995.png',
        caption: 'Ceremonia de graduación, Promoción de Bachilleres, 1993'
    },
    { 
        año: '1998', 
        titulo: 'Convenio de Articulación con el SENA', 
        texto: 'Inicia el convenio de articulación SENA-MEN, permitiendo que los estudiantes de la media técnica accedan a una formación técnica comercial y de negocios, ampliando su proyección laboral.',
        imagen: '/historia_2010.png',
        caption: 'Prácticas de contabilidad y comercio de los estudiantes, 1998'
    },
    { 
        año: '2016', 
        titulo: 'Administración de las Hijas de María Auxiliadora', 
        texto: 'La dirección y pastoral del plantel es asumida con orgullo por la Comunidad de las Hijas de María Auxiliadora (Hermanas Salesianas). Bajo la rectoría de Sor Gloria María Arbeláez Hoyos, se implanta el Sistema Preventivo de Don Bosco.',
        imagen: '/historia_hoy.png',
        caption: 'Sor Gloria María junto a la comunidad educativa, 2016'
    },
];

// Helper to render footprints connector path
function FootprintsConnector({ direction }) {
    return (
        <div className="hidden lg:flex justify-center items-center h-32 w-full my-4 relative overflow-visible select-none pointer-events-none">
            <svg width="200" height="128" viewBox="0 0 200 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
                {/* Left to Right Curve */}
                {direction === 'ltr' ? (
                    <>
                        {/* Winding trail line */}
                        <path 
                            d="M 20 0 C 20 64, 180 64, 180 128" 
                            stroke="#800A15" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeDasharray="4 16" 
                            opacity="0.55"
                        />
                        {/* Parallel trail offset to represent footprints pair */}
                        <path 
                            d="M 35 5 C 35 69, 195 69, 195 123" 
                            stroke="#003C8F" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeDasharray="4 16" 
                            strokeDashoffset="10" 
                            opacity="0.45"
                        />
                    </>
                ) : (
                    <>
                        {/* Right to Left Curve */}
                        <path 
                            d="M 180 0 C 180 64, 20 64, 20 128" 
                            stroke="#800A15" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeDasharray="4 16" 
                            opacity="0.55"
                        />
                        <path 
                            d="M 165 5 C 165 69, 5 69, 5 123" 
                            stroke="#003C8F" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeDasharray="4 16" 
                            strokeDashoffset="10" 
                            opacity="0.45"
                        />
                    </>
                )}
            </svg>
        </div>
    );
}

export default function Historia() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenMap = () => {
        setIsOpen(true);
        setTimeout(() => {
            const mapSection = document.getElementById('map-road-section');
            if (mapSection) {
                mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 150); // Small delay to let the browser begin opening height
    };

    return (
        <AppLayout>
            <Head title="Historia | COLSIH" />
            <section className="relative pt-24 pb-16 bg-white text-slate-900 overflow-hidden border-b border-slate-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(128,10,21,0.03),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,60,143,0.03),transparent_50%)]"></div>
                
                <div className="relative z-10 max-w-[850px] mx-auto px-6 flex flex-col items-center text-center space-y-6">
                    
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 font-sans text-center">
                        Reseña Histórica
                    </h1>
                    <div className="h-1 w-20 bg-gradient-to-r from-[#800A15] to-[#003C8F] rounded-full mx-auto"></div>
                    
                    <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed font-medium text-center">
                        <p>
                            El origen de nuestra institución se remonta al <strong className="text-slate-950 font-semibold">28 de febrero de 1980</strong> con la creación de la <strong className="text-slate-950 font-semibold">Fundación Centro Parroquial Villabel (FUNDAVILLABEL)</strong> bajo el decreto diocesano No. 633. Esta fundación sentó las bases comunitarias y eclesiásticas necesarias para materializar el sueño de un centro educativo de excelencia para las familias del barrio Villabel en Floridablanca.
                        </p>
                        <p>
                            Ante la inquietud de la comunidad, el Pbro. Ramiro Parra Mantilla, párroco de Santa Isabel de Hungría, solicitó al arzobispo de Bucaramanga el permiso para erigir una sede alterna del Gimnasio José Alejandro Peralta, quedando oficialmente fundado el centro el <strong className="text-slate-950 font-semibold">25 de noviembre de 1988</strong>.
                        </p>
                        <p>
                            La institución inició labores académicas el <strong className="text-slate-950 font-semibold">6 de febrero de 1989</strong>. En 1991, el colegio adoptó oficialmente su nombre definitivo: <strong className="text-[#800A15] font-semibold">Colegio Santa Isabel de Hungría</strong>. Posteriormente, en 2016, la administración del colegio fue encomendada a la comunidad de las <strong className="text-[#003C8F] font-semibold">Hijas de María Auxiliadora (Salesianas)</strong>, fortaleciendo nuestra formación bajo el Sistema Preventivo de Don Bosco.
                        </p>
                    </div>
                    
                    {/* Pirate Map Expander Button */}
                    <div className="pt-8 flex justify-center">
                        <button
                            onClick={handleOpenMap}
                            className={`group relative flex flex-col items-center justify-center p-5 bg-[#F5ECD7] border-2 border-dashed border-[#800A15]/60 rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(128,10,21,0.25)] transition-all duration-500 cursor-pointer transform hover:scale-105 hover:rotate-1 max-w-[200px] ${
                                isOpen ? 'opacity-40 pointer-events-none' : ''
                            }`}
                        >
                            {/* Vintage Pirate Map SVG Logo */}
                            <div className="w-16 h-16 text-[#800A15] mb-2 transform group-hover:rotate-6 transition-transform duration-500">
                                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                    <path d="M12 8 C16 8, 16 16, 12 16 C8 16, 8 8, 12 8 Z" fill="#EAD6B3" stroke="#800A15" strokeWidth="2" />
                                    <path d="M52 48 C56 48, 56 56, 52 56 C48 56, 48 48, 52 48 Z" fill="#EAD6B3" stroke="#800A15" strokeWidth="2" />
                                    <path d="M12 16 C12 16, 20 12, 48 16 L 48 48 C 48 48, 20 44, 12 48 Z" fill="#F9F1DC" stroke="#800A15" strokeWidth="2" />
                                    <rect x="28" y="24" width="8" height="6" rx="1" fill="#800A15" />
                                    <path d="M26 34 L38 46 M38 34 L26 46" stroke="#800A15" strokeWidth="3" strokeLinecap="round" />
                                    <path d="M16 28 C18 32, 22 34, 25 36" stroke="#003C8F" strokeWidth="2" strokeDasharray="2 3" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-widest text-[#800A15] font-serif">
                                {isOpen ? 'Mapa Abierto' : 'Desplegar Mapa'}
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Map Unfolding Wrapper */}
            <div 
                id="map-road-section"
                className={`transition-all duration-[1400ms] ease-[cubic-bezier(0.86,0,0.07,1)] overflow-hidden origin-top ${
                    isOpen ? 'max-h-[15000px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95 pointer-events-none'
                }`}
            >
                {/* Treasure Map Scroll Road */}
                <section className="py-24 bg-[#FAF5EE] relative overflow-hidden bg-[radial-gradient(#d3c7b3_1px,transparent_1px)] [background-size:24px_24px] border-b border-[#e5d5be]">
                    
                    {/* Vintage map frame overlay edge */}
                    <div className="absolute inset-0 border-[16px] border-double border-[#d9c5a5]/30 pointer-events-none z-20"></div>

                    <div className="max-w-[1100px] mx-auto px-6 relative z-10">

                        {/* Start node: Compass Rose decoration */}
                        <div className="flex flex-col items-center mb-16 select-none">
                            <div className="w-16 h-16 md:w-20 md:h-20 text-[#800A15] animate-[spin_60s_linear_infinite] drop-shadow-md">
                                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                                    <path d="M 50 5 L 54 40 L 50 45 L 46 40 Z" fill="#800A15" />
                                    <path d="M 50 95 L 54 60 L 50 55 L 46 60 Z" fill="#003C8F" />
                                    <path d="M 5 50 L 40 54 L 45 50 L 40 46 Z" fill="currentColor" />
                                    <path d="M 95 50 L 60 54 L 55 50 L 60 46 Z" fill="currentColor" />
                                    <circle cx="50" cy="50" r="4" fill="#E5A900" />
                                </svg>
                            </div>
                            <span className="text-[11px] font-black text-slate-500 tracking-widest uppercase mt-3 font-sans">INICIO DE LA RUTA</span>
                            <div className="w-0.5 h-12 border-l border-dashed border-[#800A15]/60 mt-2"></div>
                        </div>

                        {/* Timeline Alternating Blocks */}
                        <div className="relative space-y-0">
                            {hitos.map((hito, idx) => {
                                const isEven = idx % 2 === 0;
                                return (
                                    <div key={idx} className="relative">
                                        
                                        {/* Main Row layout */}
                                        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                                            isEven ? '' : 'lg:flex-row-reverse'
                                        } pl-8 lg:pl-0 border-l-2 lg:border-l-0 border-dashed border-[#800A15]/30 relative pb-12 lg:pb-0`}>
                                            
                                            {/* Mobile and Desktop Compass Node Pin */}
                                            <div className="absolute -left-[17px] lg:left-1/2 top-0 lg:-translate-x-1/2 z-15 w-8 h-8 rounded-full bg-white border-2 border-[#800A15] shadow-md flex items-center justify-center">
                                                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#800A15] to-[#003C8F] flex items-center justify-center">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                                                </div>
                                            </div>

                                            {/* Left Side (Scroll Card) */}
                                            <div className={`flex flex-col ${
                                                isEven ? 'lg:items-end lg:text-right' : 'lg:order-2 lg:items-start lg:text-left'
                                            }`}>
                                                <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e8dfcf] shadow-md hover:shadow-xl transition-all duration-300 relative max-w-[500px] overflow-hidden text-left bg-[radial-gradient(#fdfcf9_1px,transparent_1px)] [background-size:20px_20px]">
                                                    {/* Giant Watermark Year in serif style */}
                                                    <div className="absolute right-4 bottom-2 text-7xl font-black text-slate-100/70 select-none pointer-events-none font-serif italic">
                                                        {hito.año}
                                                    </div>

                                                    <div className="relative z-10 space-y-4">
                                                        <span className="inline-block text-[11px] font-black text-[#800A15] tracking-widest uppercase font-sans">
                                                            AÑO {hito.año}
                                                        </span>
                                                        <h3 className="text-xl font-bold text-[#08111F] leading-tight font-sans">
                                                            {hito.titulo}
                                                        </h3>
                                                        <div className="h-0.5 w-12 bg-[#800A15] rounded-full"></div>
                                                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
                                                            {hito.texto}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Side (Polaroid Frame Picture) */}
                                            <div className={`flex justify-center ${
                                                isEven ? 'lg:order-2' : 'lg:order-1'
                                            }`}>
                                                {/* Photo Frame Container styled like Polaroid */}
                                                <div className="bg-white p-4 pb-6 rounded-lg border border-[#e8dfcf] shadow-lg hover:shadow-xl transition-transform duration-500 hover:scale-102 hover:-rotate-1 max-w-[340px] w-full transform rotate-1">
                                                    <div className="relative overflow-hidden aspect-video bg-slate-900 rounded border border-slate-100 group">
                                                        <img 
                                                            src={hito.imagen} 
                                                            alt={hito.titulo} 
                                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                        />
                                                    </div>
                                                    <div className="mt-4 text-center">
                                                        <span className="text-[10px] md:text-xs font-bold text-slate-500 font-serif italic">
                                                            "{hito.caption}"
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Footsteps trail leading to the next year (only if not last hito) */}
                                        {idx < hitos.length - 1 && (
                                            <FootprintsConnector direction={isEven ? 'ltr' : 'rtl'} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* End node: Treasure chest / key illustration decoration */}
                        <div className="flex flex-col items-center mt-16 select-none">
                            <div className="w-0.5 h-12 border-l border-dashed border-[#003C8F]/60 mb-2"></div>
                            <div className="w-16 h-16 md:w-20 md:h-20 text-[#003C8F] flex items-center justify-center bg-white rounded-full border-2 border-double border-[#003C8F] shadow-lg">
                                {/* Key / Treasure SVG icon */}
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce">
                                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#800A15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 2v7M12 15v7M2 12h7M15 12h7M18.364 5.636l-4.95 4.95M10.586 13.414l-4.95 4.95M5.636 5.636l4.95 4.95M13.414 13.414l4.95 4.95" stroke="#003C8F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="text-[11px] font-black text-slate-500 tracking-widest uppercase mt-3 font-sans">DESTINO DE LA HISTORIA</span>
                        </div>

                    </div>
                </section>
            </div>

        </AppLayout>
    );
}
