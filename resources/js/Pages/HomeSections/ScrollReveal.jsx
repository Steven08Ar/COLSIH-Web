import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ 
    children, 
    className = "", 
    delay = 0, 
    duration = 1000, 
    distance = "translate-y-12" 
}) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
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
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`
            }}
            className={`transition-all ease-out ${
                isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 ${distance} scale-[0.98]`
            } ${className}`}
        >
            {children}
        </div>
    );
}
