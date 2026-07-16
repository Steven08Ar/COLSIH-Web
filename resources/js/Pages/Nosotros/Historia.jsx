import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const hitos = [
    { año: '1980', titulo: 'Fundación de FUNDAVILLABEL', texto: 'El 28 de febrero se crea la Fundación Centro Parroquial Villabel, sentando las bases del proyecto educativo.' },
    { año: '1988', titulo: 'Creación del Centro Educativo', texto: 'Se solicita formalmente el permiso de funcionamiento el 25 de noviembre, oficializando la creación del centro.' },
    { año: '1989', titulo: 'Inicio de Labores Académicas', texto: 'El 6 de febrero inician las clases oficiales, bajo la rectoría del Lic. Orlando Becerra y posteriormente la Lic. Nubia Carrillo Rodríguez.' },
    { año: '1991', titulo: 'Nombre Oficial: Colegio Santa Isabel de Hungría', texto: 'El 25 de octubre, mediante resolución 033, se aprueba el cambio de denominación oficial al actual nombre en honor a nuestra patrona.' },
    { año: '1993', titulo: 'Primera Promoción de Bachilleres', texto: 'Se gradúa con orgullo la primera promoción de Bachilleres Académicos de la institución.' },
    { año: '1998', titulo: 'Convenio con el SENA', texto: 'Se inicia el convenio de articulación SENA-MEN, ofreciendo formación en la media técnica con énfasis comercial.' },
    { año: '2016', titulo: 'Administración de las Hijas de María Auxiliadora', texto: 'La Comunidad de las Hijas de María Auxiliadora asume la dirección y pastoral del plantel, iniciando con la rectoría de Sor Gloria María Arbeláez Hoyos.' },
];

export default function Historia() {
    return (
        <AppLayout>
            <Head title="Historia | COLSIH" />

            {/* Header Hero Section */}
            <section className="relative bg-gradient-to-b from-[#08111F] to-[#0D1B2E] pt-32 pb-20 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,87,217,0.12),transparent_60%)]"></div>
                <div className="relative z-10 max-w-[1200px] mx-auto px-6">
                    <nav className="text-sm font-semibold text-slate-400 mb-4 flex items-center justify-center gap-2">
                        <Link href="/nosotros" className="hover:text-white transition-colors">Quiénes Somos</Link>
                        <span>/</span>
                        <span className="text-white">Historia</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-sans">
                        Nuestra Historia
                    </h1>
                </div>
            </section>

            {/* Historia Narrativa */}
            <section className="py-20 bg-white">
                <div className="max-w-[800px] mx-auto px-6 text-left space-y-6">
                    <h2 className="text-3xl font-extrabold text-[#08111F] tracking-tight">
                        Reseña Histórica
                    </h2>
                    <div className="w-16 h-1 bg-[#E31C23] rounded-full mb-8"></div>
                    
                    <p className="text-[16px] text-slate-600 leading-relaxed font-medium">
                        El origen de nuestra institución se remonta al 28 de febrero de 1980 con la creación de la <strong>Fundación Centro Parroquial Villabel (FUNDAVILLABEL)</strong> bajo el decreto diocesano No. 633. Esta fundación sentó las bases comunitarias y eclesiásticas necesarias para materializar el sueño de un centro educativo para las familias del barrio Villabel en Floridablanca.
                    </p>
                    
                    <p className="text-[16px] text-slate-600 leading-relaxed font-medium">
                        Ante la inquietud de la comunidad, el Pbro. Ramiro Parra Mantilla, párroco de Santa Isabel de Hungría, solicitó al arzobispo de Bucaramanga, Monseñor Héctor Rueda Hernández, el permiso para erigir una sede alterna del Gimnasio José Alejandro Peralta. La solicitud fue aprobada, y el 25 de noviembre de 1988 quedó oficialmente fundado el centro educativo.
                    </p>

                    <p className="text-[16px] text-slate-600 leading-relaxed font-medium">
                        La institución inició labores académicas el <strong>6 de febrero de 1989</strong>. En 1991, tras consultas organizativas con el fin de otorgarle su propia identidad independiente, el colegio adoptó oficialmente su nombre definitivo: <strong>Colegio Santa Isabel de Hungría</strong>.
                    </p>

                    <p className="text-[16px] text-slate-600 leading-relaxed font-medium">
                        A lo largo de los años, el colegio ha crecido de manera constante. En 1993 se graduó la primera promoción de Bachilleres Académicos. Posteriormente, en 1998, se firmó un convenio trascendental de articulación técnica comercial con el <strong>SENA</strong>, ampliando la oferta académica de la Media Técnica. En 2016, la administración del colegio fue encomendada a la comunidad de las <strong>Hijas de María Auxiliadora (Salesianas)</strong>, fortaleciendo nuestra formación bajo el Sistema Preventivo de Don Bosco.
                    </p>
                </div>
            </section>

            {/* Línea de Tiempo Visual */}
            <section className="py-20 bg-slate-50/50 border-t border-b border-slate-100">
                <div className="max-w-[1000px] mx-auto px-6 text-left">
                    <h2 className="text-3xl font-extrabold text-[#08111F] text-center tracking-tight mb-16">
                        Línea del Tiempo
                    </h2>
                    
                    <div className="relative border-l-2 border-[#0057D9]/20 ml-4 md:ml-32 space-y-12">
                        {hitos.map((hito, idx) => (
                            <div key={idx} className="relative pl-8 md:pl-12 group">
                                {/* Indicator Dot */}
                                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-[#0057D9] bg-white group-hover:bg-[#0057D9] transition-all"></div>
                                
                                {/* Label for Year on desktop */}
                                <div className="md:absolute md:-left-32 md:top-0 w-24 text-right hidden md:block">
                                    <span className="text-xl font-black text-[#0057D9] font-sans">{hito.año}</span>
                                </div>

                                {/* Content Card */}
                                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:border-slate-200 transition-all">
                                    <span className="text-sm font-extrabold text-[#0057D9] md:hidden block mb-1">{hito.año}</span>
                                    <h4 className="text-lg font-bold text-[#08111F] mb-2 font-sans">{hito.titulo}</h4>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{hito.texto}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Navigation Tabs */}
            <nav className="py-12 bg-white flex items-center justify-center gap-6">
                <Link href="/nosotros" className="text-sm font-bold text-slate-500 hover:text-[#E31C23] transition-colors flex items-center gap-1.5">
                    ← Quiénes Somos
                </Link>
                <span className="text-slate-300">|</span>
                <Link href="/nosotros/mision-vision" className="text-sm font-bold text-[#08111F] hover:text-[#E31C23] transition-colors flex items-center gap-1.5">
                    Misión y Visión →
                </Link>
            </nav>
        </AppLayout>
    );
}
