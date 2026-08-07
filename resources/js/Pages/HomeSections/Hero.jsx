import Navbar from '@/Components/Navbar';

export default function Hero({ setVideoOpen }) {
    return (
        <section className="relative flex items-center min-h-[900px] lg:min-h-[980px] h-screen w-full bg-[#08111F] overflow-hidden select-none">
            <Navbar />

            {/* Background Video ("Video Home.mp4" nativo HTML5, autoplay sin bloqueo, bucle perfecto e indetectable por Brave) */}
            <div className="absolute inset-0 w-full h-full z-0 select-none overflow-hidden pointer-events-none">
                <video
                    ref={(videoEl) => {
                        if (videoEl) {
                            videoEl.muted = true;
                            videoEl.play().catch(() => {});
                        }
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    controls={false}
                    disablePictureInPicture
                    onEnded={(e) => {
                        e.target.currentTime = 0;
                        e.target.play().catch(() => {});
                    }}
                    className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover contrast-[1.05] brightness-75 md:brightness-[0.85] scale-105 pointer-events-none"
                >
                    <source src="/Video%20Home.mp4" type="video/mp4" />
                    <source src="/Video Home.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Dark Gradient Overlay for Mobile (full overlay) */}
            <div className="absolute inset-0 bg-slate-950/70 md:hidden z-10 pointer-events-none"></div>

            {/* Wavy Dark Gradient Overlay for Desktop (left 50%) */}
            <div className="absolute top-[-50px] bottom-[-50px] h-[calc(100%+100px)] left-0 w-full md:w-[60%] lg:w-[50%] z-10 hidden md:block pointer-events-none">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 600 800"
                    preserveAspectRatio="none"
                    fill="none"
                >
                    <defs>
                        <linearGradient id="darkWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#08111F" stopOpacity="1" />
                            <stop offset="70%" stopColor="#08111F" stopOpacity="1" />
                            <stop offset="90%" stopColor="#08111F" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#08111F" stopOpacity="0" />
                        </linearGradient>
                        <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="30" />
                        </filter>
                    </defs>
                    <path
                        d="M -150 0 L 540 0 C 510 200, 480 350, 480 400 C 480 450, 460 650, 420 800 L -150 800 Z"
                        fill="url(#darkWaveGrad)"
                        filter="url(#softBlur)"
                    />
                </svg>
            </div>

            {/* BOTTOM organic layered waves (Red, Blue, and White) */}
            <div className="absolute bottom-0 left-0 w-full h-[120px] sm:h-[150px] md:h-[220px] z-20 pointer-events-none select-none">
                <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="none">
                    {/* Onda Roja (Atrás izquierda) */}
                    <path d="M 0 70 C 200 150, 450 180, 700 180 L 1200 200 L 0 200 Z" fill="#800A15" />

                    {/* Onda Azul (Atrás derecha) */}
                    <path d="M 0 130 C 350 190, 700 150, 1200 0 L 1200 200 L 0 200 Z" fill="#003C8F" />

                    {/* Onda Blanca (Al frente) */}
                    <path d="M 0 130 C 250 210, 600 190, 900 110 C 1050 70, 1150 35, 1200 15 L 1200 200 L 0 200 Z" fill="white" />
                </svg>
            </div>

            {/* Main Content Container (Figma grid aligned) */}
            <div className="relative z-30 max-w-[1680px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full pt-16 sm:pt-24 md:pt-32 pb-44 md:pb-36">
                <div className="grid grid-cols-12 gap-6 items-center">

                    {/* Left Side Content (centered on mobile, left-aligned on desktop) */}
                    <div className="col-span-12 md:col-span-7 lg:col-span-6 space-y-6 text-center md:text-left mx-auto md:mx-0 md:-ml-2 lg:-ml-4">
                        {/* Headline con tipografias y brillo destacado */}
                        <h1 className="text-4xl sm:text-5xl lg:text-[64px] xl:text-[72px] font-black text-white leading-[1.1] tracking-tight font-sans animate-fadeIn text-center md:text-left">
                            {/* Linea 1: Formamos */}
                            <span className="block text-slate-200 text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-widest uppercase font-sans mb-1 drop-shadow-md">
                                Formamos
                            </span>

                            {/* Linea 2: buenos Cristianos */}
                            <span className="block leading-tight my-1">
                                <span className="font-serif text-amber-300 text-4xl sm:text-5xl lg:text-[72px] xl:text-[82px] font-normal lowercase tracking-normal mr-3 inline-block transform -rotate-2 drop-shadow-[0_4px_20px_rgba(251,191,36,0.5)]">
                                    buenos
                                </span>
                                <span className="text-amber-400 font-black tracking-tight drop-shadow-[0_4px_25px_rgba(245,158,11,0.6)]">
                                    Cristianos
                                </span>
                            </span>

                            {/* Linea 3: Honestos ciudadanos */}
                            <span className="block leading-tight mt-1">
                                <span className="text-sky-300 font-black tracking-tight drop-shadow-[0_4px_25px_rgba(56,189,248,0.6)]">
                                    Honestos
                                </span>{" "}
                                <span className="text-white font-extrabold tracking-tight drop-shadow-lg">
                                    ciudadanos
                                </span>
                            </span>
                        </h1>

                        <div className="pt-2 space-y-4">
                            {/* 1. Botón Principal de INSCRIPCIONES ABIERTAS 2027 (Estilo 3D Píldora Institucional) */}
                            <div className="flex justify-center md:justify-start">
                                <a
                                    href="https://e.plataformaintegra.net/sihungria/index.php/cupo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-pill-3d-blue text-base sm:text-lg px-9 py-4"
                                >
                                    <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <span className="tracking-wider uppercase">INSCRIPCIONES ABIERTAS 2027</span>
                                </a>
                            </div>

                            {/* 2. Lista de Grados Habilitados con Cupo (Debajo del Botón) */}
                            <div className="space-y-2">
                                <span className="text-xs font-black text-slate-300 uppercase tracking-wider block text-center md:text-left">
                                    Grados habilitados con cupo exclusivo:
                                </span>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                    {['Prejardín', 'Jardín', 'Transición', 'Primero (1°)', 'Sexto (6°)'].map((grado) => (
                                        <span
                                            key={grado}
                                            className="px-3.5 py-1.5 rounded-xl bg-white text-[#001659] text-xs sm:text-sm font-black shadow-md border border-slate-200 hover:scale-105 transition-transform"
                                        >
                                            {grado}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
