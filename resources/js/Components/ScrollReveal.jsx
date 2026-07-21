import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, delay = 0, duration = 800, className = '' }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
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

    return (
        <div
            ref={ref}
            className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
            }}
        >
            {children}
        </div>
    );
}
