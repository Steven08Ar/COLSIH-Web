import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

export default function PageTransitionLoader() {
    const [visible, setVisible] = useState(true);
    const [animating, setAnimating] = useState(true);

    // Initial mount loading phase (1 second)
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            // Complete fade-out animation before unmounting
            setTimeout(() => setAnimating(false), 600);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Hook into Inertia global router requests
    useEffect(() => {
        const unbindStart = router.on('start', () => {
            setAnimating(true);
            setVisible(true);
        });

        const unbindFinish = router.on('finish', () => {
            // Keep loader active for 1 second, then fade out
            setTimeout(() => {
                setVisible(false);
                setTimeout(() => setAnimating(false), 600);
            }, 1000);
        });

        return () => {
            unbindStart();
            unbindFinish();
        };
    }, []);

    if (!animating) return null;

    return (
        <div 
            className={`fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                visible ? 'opacity-100 scale-100' : 'opacity-0 scale-102 pointer-events-none'
            }`}
        >
            {/* Padded, overflow-visible wrapper container to prevent borders/glows from being cut off */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center p-6 overflow-visible select-none">
                <img 
                    src="/Bordado COLSIH.svg" 
                    alt="Bordado COLSIH" 
                    className="w-full h-full object-contain overflow-visible"
                    style={{
                        animation: 'logo-glow 3s ease-in-out infinite',
                        overflow: 'visible'
                    }}
                />
            </div>
        </div>
    );
}
