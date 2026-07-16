import { useEffect, useRef } from 'react';

export default function ScrollReveal({ 
    children, 
    className = "", 
    delay = 0, 
    duration = 800, 
    distance = "translate-y-8" 
}) {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    // Reset opacity and transforms at DOM level for zero-render high performance
                    el.style.opacity = '1';
                    el.style.transform = 'translate(0, 0) scale(1)';
                    observer.unobserve(el);
                }
            },
            {
                threshold: 0.05,
                rootMargin: "0px 0px -40px 0px"
            }
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

    // Determine initial transform based on distance string
    const getInitialTransform = () => {
        if (distance.includes('translate-y-')) {
            const val = distance.split('-').pop();
            const numVal = isNaN(parseInt(val)) ? 30 : parseInt(val);
            return `translateY(${numVal}px) scale(0.99)`;
        }
        if (distance.includes('translate-x-')) {
            const val = distance.split('-').pop();
            const numVal = isNaN(parseInt(val)) ? 30 : parseInt(val);
            return `translateX(${numVal}px) scale(0.99)`;
        }
        if (distance.includes('scale-')) {
            return 'scale(0.95)';
        }
        return 'translateY(30px) scale(0.99)';
    };

    return (
        <div
            ref={ref}
            style={{
                opacity: 0,
                transform: getInitialTransform(),
                transitionProperty: 'opacity, transform',
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className={className}
        >
            {children}
        </div>
    );
}
