import { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

function CountUp({ end, duration = 1500, startCount = false }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startCount) return;

        const target = parseInt(end.replace(/\+/g, '').replace(/\./g, ''));
        let start = 0;
        
        if (target === 0) return;
        
        const stepTime = Math.max(Math.floor(duration / 60), 16); 
        const increment = Math.ceil(target / (duration / stepTime));

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [end, duration, startCount]);

    const formatNumber = (num) => {
        if (num >= 1000) {
            return num.toLocaleString('es-CO');
        }
        return num.toString();
    };

    const hasPlus = end.includes('+');
    return (
        <span>
            {hasPlus && '+'}
            {formatNumber(count)}
        </span>
    );
}

export default function Stats() {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    // Real, high-fidelity PEI statistics
    const stats = [
        {
            value: "37",
            label: "Años",
            sublabel: "de trayectoria educativa"
        },
        {
            value: "+3.000",
            label: "Egresados",
            sublabel: "con proyección profesional"
        },
        {
            value: "+60",
            label: "Docentes",
            sublabel: "y directivos calificados"
        },
        {
            value: "4",
            label: "Niveles",
            sublabel: "desde Preescolar a Media Técnica"
        }
    ];

    return (
        <section 
            ref={ref}
            className="relative py-10 lg:py-12 bg-white border-b border-slate-100 overflow-hidden select-none"
        >
            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                
                {/* Horizontal Stat Items divided by fine line grid with top animated borders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-b md:border-l md:border-r border-slate-100 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    {stats.map((stat, index) => {
                        const isEven = index % 2 === 0;
                        const accentColor = isEven ? '#003C8F' : '#800A15';
                        const hoverBgClass = isEven ? 'hover:bg-blue-50/10' : 'hover:bg-red-50/10';
                        return (
                            <ScrollReveal 
                                key={index}
                                distance="translate-y-8"
                                delay={index * 100}
                                className={`group relative flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-10 text-left transition-all duration-300 ${hoverBgClass} overflow-hidden`}
                            >
                                {/* Top sliding brand border indicator */}
                                <div 
                                    className="absolute top-0 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full"
                                    style={{ backgroundColor: accentColor }}
                                />

                                <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#08111F] tracking-tighter leading-none font-sans transition-all duration-300 group-hover:text-[var(--accent-hover)] group-hover:translate-x-1" style={{ '--accent-hover': accentColor }}>
                                    <CountUp end={stat.value} startCount={inView} />
                                </span>
                                <span 
                                    className="block text-[13px] font-extrabold uppercase tracking-widest mt-4 font-sans transition-colors duration-300"
                                    style={{ color: accentColor }}
                                >
                                    {stat.label}
                                </span>
                                <span className="block text-[10px] sm:text-xs font-semibold text-slate-400 mt-1">
                                    {stat.sublabel}
                                </span>
                            </ScrollReveal>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
