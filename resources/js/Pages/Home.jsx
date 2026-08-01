import { useState } from 'react';
import { Head } from '@inertiajs/react';
import LazyViewportSection from '@/Components/LazyViewportSection';

// Import Modular Sections
import Hero from './HomeSections/Hero';
import About from './HomeSections/About';
import WhyChooseUs from './HomeSections/WhyChooseUs';
import Programs from './HomeSections/Programs';
import VideoExperience from './HomeSections/VideoExperience';
import Stats from './HomeSections/Stats';
import Testimonials from './HomeSections/Testimonials';
import Gallery from './HomeSections/Gallery';
import News from './HomeSections/News';
import Admissions from './HomeSections/Admissions';
import FAQ from './HomeSections/FAQ';
import Footer from './HomeSections/Footer';

export default function Home({ noticias, testimonios, preguntas, tour, scenes = [] }) {
    const [videoOpen, setVideoOpen] = useState(false);

    return (
        <div className="relative min-h-screen bg-white overflow-hidden flex flex-col font-sans selection:bg-red-100 selection:text-red-900">
            <Head title="Colegio Santa Isabel de Hungría" />

            {/* Section 1: Hero (Pantalla principal visible de entrada) */}
            <Hero setVideoOpen={setVideoOpen} />

            {/* Section 2: About (Renderizado Bajo Demanda al acercarse en pantalla) */}
            <LazyViewportSection minHeight="500px">
                <About />
            </LazyViewportSection>

            {/* Section 3: Why Choose Us */}
            <LazyViewportSection minHeight="500px">
                <WhyChooseUs />
            </LazyViewportSection>

            {/* Section 4: Programs */}
            <LazyViewportSection minHeight="600px">
                <Programs />
            </LazyViewportSection>

            {/* Section 5: Video Experience 360 */}
            <LazyViewportSection minHeight="500px">
                <VideoExperience scenes={scenes} />
            </LazyViewportSection>

            {/* Section 6: Statistics */}
            <LazyViewportSection minHeight="300px">
                <Stats />
            </LazyViewportSection>

            {/* Section 7: Testimonials */}
            <LazyViewportSection minHeight="600px">
                <Testimonials testimonios={testimonios} />
            </LazyViewportSection>

            {/* Section 8: Gallery */}
            <LazyViewportSection minHeight="600px">
                <Gallery />
            </LazyViewportSection>

            {/* Section 9: News */}
            <LazyViewportSection minHeight="500px">
                <News noticias={noticias} />
            </LazyViewportSection>

            {/* Section 10: Admissions */}
            <LazyViewportSection minHeight="500px">
                <Admissions />
            </LazyViewportSection>

            {/* Section 11: FAQ */}
            <LazyViewportSection minHeight="500px">
                <FAQ preguntas={preguntas} />
            </LazyViewportSection>

            {/* Footer */}
            <Footer />

            {/* CENTRALIZED VIDEO MODAL USING NATIVE Video Home.mp4 WITHOUT CONTROLS */}
            {videoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 transition-all duration-300">
                    <div className="relative w-full max-w-4xl bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                        {/* Close Button */}
                        <button 
                            onClick={() => setVideoOpen(false)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors cursor-pointer focus:outline-none"
                            aria-label="Cerrar video"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {/* Video Container */}
                        <div className="aspect-video w-full">
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
                                controls={false}
                                disablePictureInPicture
                                className="w-full h-full object-cover pointer-events-none"
                            >
                                <source src="/Video%20Home.mp4" type="video/mp4" />
                                <source src="/Video Home.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
