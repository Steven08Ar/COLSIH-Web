import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';
import ValuesHero from './components/ValuesSection/ValuesHero';
import InstitutionalMotto from './components/ValuesSection/InstitutionalMotto';
import ValueCard from './components/ValuesSection/ValueCard';
import GalleryLightbox from './components/ValuesSection/GalleryLightbox';
import SectionBackground from './components/ValuesSection/SectionBackground';
import { valoresData } from './components/ValuesSection/data/values';

export default function Valores() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeImages, setActiveImages] = useState([]);
    const [activeImgIdx, setActiveImgIdx] = useState(0);

    const handleOpenGallery = (value, startIndex) => {
        // Combines main cover and the 3 mini gallery images
        const allImages = [value.portada, ...value.galeria];
        setActiveImages(allImages);
        setActiveImgIdx(startIndex);
        setLightboxOpen(true);
    };

    const handlePrevImg = () => {
        setActiveImgIdx((prev) => (prev === 0 ? activeImages.length - 1 : prev - 1));
    };

    const handleNextImg = () => {
        setActiveImgIdx((prev) => (prev === activeImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <AppLayout>
            <Head title="Nuestros Valores | COLSIH" />

            {/* Custom scrollbar hiding helper */}
            <style dangerouslySetInnerHTML={{__html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none !important;
                }
                .no-scrollbar {
                    -ms-overflow-style: none !important;
                    scrollbar-width: none !important;
                }
            `}} />

            {/* Main Page Outer Container */}
            <div className="relative bg-[#FAFCFF] dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen overflow-hidden pb-20 transition-colors duration-300">
                
                {/* Visual Backdrop Particles & Orbs */}
                <SectionBackground />

                {/* Hero Section */}
                <ValuesHero />

                {/* Institutional Motto Section */}
                <InstitutionalMotto />

                {/* Main Values Recorrido Section (32-48px gap range is ~10-12 in Tailwind) */}
                <section className="relative z-10 py-10 flex flex-col gap-10 md:gap-14 w-full">
                    {valoresData.map((val, idx) => (
                        <ValueCard 
                            key={val.id}
                            value={val}
                            index={idx}
                            onOpenGallery={(startIndex) => handleOpenGallery(val, startIndex)}
                        />
                    ))}
                </section>

                {/* Bottom navigation links */}
                <nav className="relative z-10 mt-20 max-w-[1240px] mx-auto border-t border-slate-100 dark:border-slate-800/80 pt-10 flex items-center justify-center gap-6 select-none px-6">
                    <Link 
                        href="/nosotros/mision-vision" 
                        className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-[#800A15] transition-colors flex items-center gap-1.5"
                    >
                        ← Misión y Visión
                    </Link>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <Link 
                        href="/nosotros/equipo" 
                        className="text-xs font-bold text-[#08111F] dark:text-slate-300 hover:text-[#800A15] transition-colors flex items-center gap-1.5"
                    >
                        Equipo Docente →
                    </Link>
                </nav>

            </div>

            {/* Custom Lightbox Portal */}
            <GalleryLightbox 
                isOpen={lightboxOpen}
                images={activeImages}
                activeIndex={activeImgIdx}
                onClose={() => setLightboxOpen(false)}
                onPrev={handlePrevImg}
                onNext={handleNextImg}
            />
        </AppLayout>
    );
}
