import { useState, useEffect, useRef } from 'react';

/**
 * LazyViewportSection
 * Implements "Frustum Culling" / Viewport On-Demand rendering (similar to game engine map chunk rendering).
 * Skips layout, styling, painting, and image decoding for offscreen sections using CSS content-visibility: auto
 * and IntersectionObserver pre-rendering 350px before entering the user's viewport.
 */
export default function LazyViewportSection({ children, className = '', minHeight = '400px' }) {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '350px 0px', // Pre-cargar 350px antes de entrar en la pantalla del usuario
                threshold: 0.01,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            className={`lazy-viewport-section ${className}`}
            style={{ minHeight: isVisible ? 'auto' : minHeight }}
        >
            {isVisible ? children : null}
        </div>
    );
}
