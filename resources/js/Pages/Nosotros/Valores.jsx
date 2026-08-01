import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Layers, ArrowRight, ArrowLeft, ChevronDown, Check, Compass } from 'lucide-react';
import ValuesHero from './components/ValuesSection/ValuesHero';
import InstitutionalMotto from './components/ValuesSection/InstitutionalMotto';
import ValueCard from './components/ValuesSection/ValueCard';
import GalleryLightbox from './components/ValuesSection/GalleryLightbox';
import SectionBackground from './components/ValuesSection/SectionBackground';
import { valoresData, valoresCategories } from './components/ValuesSection/data/values';

export default function Valores() {
    const [selectedCategory, setSelectedCategory] = useState('todos');
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);
    const [jumpMenuOpen, setJumpMenuOpen] = useState(false);
    
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeImages, setActiveImages] = useState([]);
    const [activeImgIdx, setActiveImgIdx] = useState(0);

    const filterMenuRef = useRef(null);
    const jumpMenuRef = useRef(null);

    // Cerrar menús desplegables al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (filterMenuRef.current && !filterMenuRef.current.contains(e.target)) {
                setFilterMenuOpen(false);
            }
            if (jumpMenuRef.current && !jumpMenuRef.current.contains(e.target)) {
                setJumpMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredValores = useMemo(() => {
        if (selectedCategory === 'todos') return valoresData;
        return valoresData.filter(v => v.categoria === selectedCategory);
    }, [selectedCategory]);

    const activeCatObj = useMemo(() => {
        return valoresCategories.find(c => c.id === selectedCategory) || valoresCategories[0];
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

                {/* Interactive Category Filter & Quick-Jump Dropdown Buttons */}
                <section className="relative z-20 max-w-[1140px] mx-auto px-4 md:px-6 pt-6 pb-8 space-y-4">
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
                        
                        {/* 1. BOTÓN DESPLEGABLE ÚNICO DE FILTRADO */}
                        <div className="relative w-full sm:w-auto flex-1" ref={filterMenuRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setFilterMenuOpen(!filterMenuOpen);
                                    setJumpMenuOpen(false);
                                }}
                                className="w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between gap-3 text-slate-800 dark:text-slate-100 hover:border-[#800A15] transition-all cursor-pointer select-none"
                            >
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-[#800A15]/10 text-[#800A15] dark:text-rose-400 flex items-center justify-center">
                                        <Filter className="w-4 h-4" />
                                    </div>
                                    <div className="text-left">
                                        <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                            Filtrar por Dimensión
                                        </span>
                                        <span className="block text-sm font-black text-slate-800 dark:text-white">
                                            {activeCatObj.label}
                                        </span>
                                    </div>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${filterMenuOpen ? 'rotate-180 text-[#800A15]' : ''}`} />
                            </button>

                            {/* Lista Desplegable de Categorías */}
                            <AnimatePresence>
                                {filterMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 overflow-hidden"
                                    >
                                        {valoresCategories.map((cat) => {
                                            const isSelected = selectedCategory === cat.id;
                                            return (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedCategory(cat.id);
                                                        setFilterMenuOpen(false);
                                                    }}
                                                    className={`w-full px-4 py-3 text-left text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                                                        isSelected
                                                            ? 'bg-[#800A15]/10 text-[#800A15] dark:text-rose-400 font-black'
                                                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {cat.id === 'todos' ? <Layers className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
                                                        <span>{cat.label}</span>
                                                    </div>
                                                    {isSelected && <Check className="w-4 h-4 text-[#800A15] dark:text-rose-400" />}
                                                </button>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* 2. BOTÓN DESPLEGABLE ÚNICO DE IR A VALOR */}
                        <div className="relative w-full sm:w-auto flex-1" ref={jumpMenuRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setJumpMenuOpen(!jumpMenuOpen);
                                    setFilterMenuOpen(false);
                                }}
                                className="w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between gap-3 text-slate-800 dark:text-slate-100 hover:border-[#003C8F] transition-all cursor-pointer select-none"
                            >
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-[#003C8F]/10 text-[#003C8F] dark:text-blue-400 flex items-center justify-center">
                                        <Compass className="w-4 h-4" />
                                    </div>
                                    <div className="text-left">
                                        <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                            Ir al Valor...
                                        </span>
                                        <span className="block text-sm font-black text-slate-800 dark:text-white">
                                            Seleccionar de la lista
                                        </span>
                                    </div>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${jumpMenuOpen ? 'rotate-180 text-[#003C8F]' : ''}`} />
                            </button>

                            {/* Lista Desplegable de Valores */}
                            <AnimatePresence>
                                {jumpMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 max-h-64 overflow-y-auto no-scrollbar"
                                    >
                                        {valoresData.map((val) => (
                                            <button
                                                key={val.id}
                                                type="button"
                                                onClick={() => {
                                                    setJumpMenuOpen(false);
                                                    if (selectedCategory !== 'todos' && val.categoria !== selectedCategory) {
                                                        setSelectedCategory('todos');
                                                        setTimeout(() => scrollToValue(val.id), 100);
                                                    } else {
                                                        scrollToValue(val.id);
                                                    }
                                                }}
                                                className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-[#003C8F] transition-colors flex items-center gap-2 cursor-pointer"
                                            >
                                                <span className="w-6 text-slate-400 text-[11px] font-mono">{val.numero}.</span>
                                                <span>{val.titulo}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

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
