import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Layers, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import ValuesHero from './components/ValuesSection/ValuesHero';
import InstitutionalMotto from './components/ValuesSection/InstitutionalMotto';
import ValueCard from './components/ValuesSection/ValueCard';
import GalleryLightbox from './components/ValuesSection/GalleryLightbox';
import SectionBackground from './components/ValuesSection/SectionBackground';
import { valoresData, valoresCategories } from './components/ValuesSection/data/values';

export default function Valores() {
    const [selectedCategory, setSelectedCategory] = useState('todos');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeImages, setActiveImages] = useState([]);
    const [activeImgIdx, setActiveImgIdx] = useState(0);

    const categoriesScrollRef = useRef(null);
    const jumpScrollRef = useRef(null);

    const scrollCategories = (direction) => {
        if (!categoriesScrollRef.current) return;
        const scrollAmount = direction === 'left' ? -260 : 260;
        categoriesScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    const scrollJump = (direction) => {
        if (!jumpScrollRef.current) return;
        const scrollAmount = direction === 'left' ? -240 : 240;
        jumpScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    const filteredValores = useMemo(() => {
        if (selectedCategory === 'todos') return valoresData;
        return valoresData.filter(v => v.categoria === selectedCategory);
    }, [selectedCategory]);

    const handleOpenGallery = (value, startIndex) => {
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

    const scrollToValue = (valId) => {
        const el = document.getElementById(`valor-${valId}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <AppLayout>
            <Head title="Nuestros Valores Corporativos | COLSIH">
                <meta name="description" content="Conoce los 9 valores corporativos que guían la vivencia salesiana en el Colegio Santa Isabel de Hungría de Floridablanca." />
            </Head>

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

                {/* Interactive Category Filter & Quick-Jump Carousel */}
                <section className="relative z-20 max-w-[1140px] mx-auto px-4 md:px-6 pt-6 pb-8 space-y-5">
                    
                    {/* 1. Category Tabs Row with Left & Right Arrow Buttons */}
                    <div className="relative flex items-center justify-center gap-2 max-w-4xl mx-auto">
                        <button
                            type="button"
                            onClick={() => scrollCategories('left')}
                            className="w-9 h-9 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-[#800A15] hover:text-white dark:hover:bg-[#800A15] transition-all cursor-pointer shrink-0 z-10"
                            title="Desplazar izquierda"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div 
                            ref={categoriesScrollRef}
                            className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 flex-nowrap w-full"
                        >
                            {valoresCategories.map((cat) => {
                                const isActive = selectedCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`px-4 py-2 rounded-full text-xs font-black transition-all duration-300 select-none cursor-pointer flex items-center gap-2 shrink-0 whitespace-nowrap ${
                                            isActive
                                                ? 'bg-[#800A15] text-white shadow-md shadow-red-950/20 scale-105'
                                                : 'bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                    >
                                        {cat.id === 'todos' ? <Layers className="w-3.5 h-3.5" /> : <Filter className="w-3.5 h-3.5" />}
                                        <span>{cat.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={() => scrollCategories('right')}
                            className="w-9 h-9 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-[#800A15] hover:text-white dark:hover:bg-[#800A15] transition-all cursor-pointer shrink-0 z-10"
                            title="Desplazar derecha"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* 2. Quick Jump Badges Row with Left & Right Arrow Buttons */}
                    <div className="relative flex items-center justify-center gap-2 max-w-4xl mx-auto pt-1">
                        <button
                            type="button"
                            onClick={() => scrollJump('left')}
                            className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-[#003C8F] hover:text-white transition-all cursor-pointer shrink-0 z-10"
                            title="Anterior"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-1.5 shrink-0 pl-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 whitespace-nowrap">
                                IR A:
                            </span>
                        </div>

                        <div 
                            ref={jumpScrollRef}
                            className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1 flex-nowrap w-full"
                        >
                            {valoresData.map((val) => (
                                <button
                                    key={val.id}
                                    onClick={() => {
                                        if (selectedCategory !== 'todos' && val.categoria !== selectedCategory) {
                                            setSelectedCategory('todos');
                                            setTimeout(() => scrollToValue(val.id), 100);
                                        } else {
                                            scrollToValue(val.id);
                                        }
                                    }}
                                    className="px-3 py-1 rounded-xl bg-white/90 dark:bg-slate-900/90 hover:bg-[#003C8F] hover:text-white text-slate-700 dark:text-slate-300 text-[11px] font-bold transition-all duration-200 cursor-pointer border border-slate-200 dark:border-slate-800 whitespace-nowrap shrink-0 shadow-sm"
                                >
                                    {val.numero}. {val.titulo}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => scrollJump('right')}
                            className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-[#003C8F] hover:text-white transition-all cursor-pointer shrink-0 z-10"
                            title="Siguiente"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Count Indicator */}
                    <div className="text-center pt-1">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                            Mostrando {filteredValores.length} de {valoresData.length} valores corporativos
                        </span>
                    </div>

                </section>

                {/* Main Values Cards Recorrido Section */}
                <section className="relative z-10 py-6 flex flex-col gap-10 md:gap-14 w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col gap-10 md:gap-14 w-full"
                        >
                            {filteredValores.map((val, idx) => (
                                <ValueCard 
                                    key={val.id}
                                    value={val}
                                    index={idx}
                                    onOpenGallery={(startIndex) => handleOpenGallery(val, startIndex)}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </section>

                {/* Bottom Navigation & CTA Banner */}
                <section className="relative z-10 mt-16 max-w-[1140px] mx-auto px-6">
                    <div className="bg-gradient-to-r from-[#08111F] via-[#003C8F] to-[#800A15] p-8 md:p-12 rounded-[32px] text-white shadow-xl text-center space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                        
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block font-sans">
                            COMPROMISO INSTITUCIONAL
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black font-sans tracking-tight">
                            Formando con el Sistema Preventivo Salesiano
                        </h3>
                        <p className="text-sm font-medium text-slate-200 max-w-xl mx-auto leading-relaxed">
                            Nuestros valores no son palabras aisladas: se viven a diario en las aulas, la pastoral, el deporte y la comunidad escolar.
                        </p>

                        <div className="pt-4 flex items-center justify-center gap-4 flex-wrap">
                            <Link 
                                href="/nosotros/mision-vision" 
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#08111F] hover:bg-slate-100 font-extrabold text-xs uppercase tracking-wider rounded-full shadow-md transition-all cursor-pointer"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Misión y Visión
                            </Link>

                            <Link 
                                href="/nosotros/equipo" 
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#800A15] hover:bg-rose-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-md transition-all cursor-pointer"
                            >
                                Equipo Docente
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>

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
