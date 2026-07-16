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
            className="relative py-20 lg:py-24 bg-white border-b border-slate-100 overflow-hidden select-none"
        >
            <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px]">
                
                {/* Horizontal Stat Items divided by fine line grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b lg:border-l lg:border-r border-slate-100 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                    {stats.map((stat, index) => (
                        <ScrollReveal 
                            key={index}
                            distance="translate-y-8"
                            delay={index * 100}
                            className="flex flex-col justify-center p-8 md:p-10 lg:p-12 text-left"
                        >
                            <span className="block text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1F3A] tracking-tighter leading-none font-sans">
                                <CountUp end={stat.value} startCount={inView} />
                            </span>
                            <span className="block text-[14px] font-extrabold uppercase tracking-widest text-[#E31C23] mt-4 font-sans">
                                {stat.label}
                            </span>
                            <span className="block text-xs font-semibold text-slate-400 mt-1">
                                {stat.sublabel}
                            </span>
                        </ScrollReveal>
                    ))}
                </div>

            </div>
        </section>
    );
}
