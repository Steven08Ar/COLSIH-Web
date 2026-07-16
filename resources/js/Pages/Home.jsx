import { useState } from 'react';
import { Head } from '@inertiajs/react';

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
import Contact from './HomeSections/Contact';
import Footer from './HomeSections/Footer';

export default function Home({ noticias }) {
    const [videoOpen, setVideoOpen] = useState(false);

    return (
        <div className="relative min-h-screen bg-white overflow-hidden flex flex-col font-sans selection:bg-red-100 selection:text-red-900">
            <Head title="Colegio Santa Isabel de Hungría" />

            {/* Section 1: Hero */}
            <Hero setVideoOpen={setVideoOpen} />

            {/* Section 2: About */}
            <About />

            {/* Section 3: Why Choose Us */}
            <WhyChooseUs />

            {/* Section 4: Programs */}
            <Programs />

            {/* Section 5: Video Experience */}
            <VideoExperience setVideoOpen={setVideoOpen} />

            {/* Section 6: Statistics */}
            <Stats />

            {/* Section 7: Testimonials */}
            <Testimonials />

            {/* Section 8: Gallery */}
            <Gallery />

            {/* Section 9: News */}
            <News noticias={noticias} />

            {/* Section 10: Admissions */}
            <Admissions />

            {/* Section 11: FAQ */}
            <FAQ />

            {/* Section 12: Contact */}
            <Contact />

            {/* Footer */}
            <Footer />

            {/* CENTRALIZED VIDEO MODAL */}
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
                            <iframe 
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/9yc15O2qTus?autoplay=1" 
                                title="Video institucional COLSIH"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
