import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

export default function PageTransitionLoader() {
    const [visible, setVisible] = useState(true);
    const [animating, setAnimating] = useState(true);
    const [isMjs, setIsMjs] = useState(false);
    const [isReturningFromMjs, setIsReturningFromMjs] = useState(false);
    
    // State machine for MJS loading sequence
    const [showMjsFilled, setShowMjsFilled] = useState(false);
    const [mjsSequenceDone, setMjsSequenceDone] = useState(false);

    // State machine for COLSIH loading sequence (only when returning from MJS)
    const [showColsihFilled, setShowColsihFilled] = useState(false);
    const [colsihSequenceDone, setColsihSequenceDone] = useState(false);

    const [pageLoaded, setPageLoaded] = useState(false);
    const [loaderSessionId, setLoaderSessionId] = useState(0);

    // Initial mount loading phase (runs on initial page visit)
    useEffect(() => {
        const path = window.location.pathname;
        const isInitialMjs = path.startsWith('/mjs') || path.includes('/mjs');
        setIsMjs(isInitialMjs);
        setIsReturningFromMjs(false);
        
        if (isInitialMjs) {
            setPageLoaded(false);
            setMjsSequenceDone(false);
            
            // Initial mount is immediate, simulate a brief page load completion
            const timerLoad = setTimeout(() => {
                setPageLoaded(true);
            }, 600);

            // Phase 1: Draw borders for 3.9s
            const timer1 = setTimeout(() => {
                setShowMjsFilled(true);
                
                // Phase 2: Fade in Logo-MJS over 700ms, hold for 300ms (total 1s)
                const timer2 = setTimeout(() => {
                    setMjsSequenceDone(true);
                }, 1000);

                return () => clearTimeout(timer2);
            }, 3900);

            return () => {
                clearTimeout(timerLoad);
                clearTimeout(timer1);
            };
        } else {
            // COLSIH initial load fade out after 1 second
            const timer = setTimeout(() => {
                setVisible(false);
                const timerUnmount = setTimeout(() => setAnimating(false), 600);
                return () => clearTimeout(timerUnmount);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    // Hook into Inertia global router requests for client-side navigation
    useEffect(() => {
        let timer1 = null;
        let timer2 = null;

        const handleStart = (event) => {
            let targetPath = '';
            const url = event.detail.visit.url;
            if (url) {
                if (typeof url === 'string') {
                    targetPath = url;
                } else if (url.pathname) {
                    targetPath = url.pathname;
                } else if (url.href) {
                    try {
                        targetPath = new URL(url.href).pathname;
                    } catch (e) {}
                }
            }
            
            const isTargetMjs = targetPath.startsWith('/mjs') || targetPath.includes('/mjs');
            const isCurrentMjs = window.location.pathname.startsWith('/mjs') || window.location.pathname.includes('/mjs');
            
            // Check if returning from MJS to COLSIH
            const returning = isCurrentMjs && !isTargetMjs;
            setIsReturningFromMjs(returning);

            // Reset state machine for new transition session
            setIsMjs(isTargetMjs);
            setShowMjsFilled(false);
            setMjsSequenceDone(false);
            
            setShowColsihFilled(false);
            setColsihSequenceDone(false);
            
            setPageLoaded(false);
            setLoaderSessionId(prev => prev + 1);
            setAnimating(true);
            setVisible(true);
            if (isTargetMjs) {
                // MJS Loader sequence (Phase 1: 3.9s draw -> Phase 2: 1.0s filled fade-in)
                timer1 = setTimeout(() => {
                    setShowMjsFilled(true);
                    timer2 = setTimeout(() => {
                        setMjsSequenceDone(true);
                    }, 1000);
                }, 3900);
            } else if (returning) {
                // COLSIH special draw sequence when returning from MJS (Phase 1: 3.2s draw -> Phase 2: 1.0s filled fade-in)
                timer1 = setTimeout(() => {
                    setShowColsihFilled(true);
                    timer2 = setTimeout(() => {
                        setColsihSequenceDone(true);
                    }, 1000);
                }, 3200);
            } else {
                // Regular COLSIH transitions don't enforce sequential phases
                setMjsSequenceDone(true);
                setColsihSequenceDone(true);
            }
        };

        const handleFinish = () => {
            setPageLoaded(true);
        };

        const unbindStart = router.on('start', handleStart);
        const unbindFinish = router.on('finish', handleFinish);

        return () => {
            unbindStart();
            unbindFinish();
            if (timer1) clearTimeout(timer1);
            if (timer2) clearTimeout(timer2);
        };
    }, []);

    // Trigger loading screen fade-out once BOTH the animation sequence is done AND the page has loaded
    useEffect(() => {
        const sequenceCompleted = isMjs 
            ? mjsSequenceDone 
            : (isReturningFromMjs ? colsihSequenceDone : true);

        if (sequenceCompleted && pageLoaded) {
            const timer = setTimeout(() => {
                setVisible(false);
                const timerUnmount = setTimeout(() => {
                    setAnimating(false);
                }, 600);
                return () => clearTimeout(timerUnmount);
            }, 300); // Small visual holding delay
            return () => clearTimeout(timer);
        }
    }, [mjsSequenceDone, colsihSequenceDone, pageLoaded, isMjs, isReturningFromMjs]);

    if (!animating) return null;

    return (
        <div 
            className={`fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                visible ? 'opacity-100 scale-100' : 'opacity-0 scale-102 pointer-events-none'
            }`}
        >
            {/* Aspect-ratio aligned container with overflow visible to display glowing drop shadows */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center overflow-visible select-none">
                
                {/* 1. Base Skeleton Draw / School Shield Logo */}
                <img 
                    key={`ske-${loaderSessionId}`}
                    src={
                        isMjs 
                            ? '/Esqueleto MJS.svg' 
                            : (isReturningFromMjs ? '/Bordado COLSIH Draw.svg' : '/Bordado COLSIH.svg')
                    } 
                    alt={isMjs ? 'Esqueleto MJS' : 'Bordado COLSIH'} 
                    className="absolute inset-0 w-full h-full object-contain p-6 overflow-visible transition-opacity duration-[800ms] ease-out"
                    style={{
                        animation: isMjs 
                            ? 'mjs-logo-glow 3s ease-in-out infinite' 
                            : (isReturningFromMjs ? 'none' : 'logo-glow 3s ease-in-out infinite'),
                        filter: isReturningFromMjs 
                            ? 'drop-shadow(0 0 15px rgba(128, 10, 21, 0.65))' 
                            : undefined,
                        overflow: 'visible',
                        opacity: (isMjs && showMjsFilled) || (isReturningFromMjs && showColsihFilled) ? 0.25 : 1
                    }}
                />

                {/* 2. Full Colored Logo overlay (Fades in over the drawn skeleton in MJS routes) */}
                {isMjs && (
                    <img 
                        key={`fill-mjs-${loaderSessionId}`}
                        src="/Logo-MJS.svg" 
                        alt="Logo MJS" 
                        className={`absolute inset-0 w-full h-full object-contain p-6 transition-all duration-[800ms] ease-out pointer-events-none ${
                            showMjsFilled ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1'
                        }`}
                        style={{
                            filter: 'drop-shadow(0 0 25px rgba(255, 232, 0, 0.45)) drop-shadow(0 0 10px rgba(243, 11, 15, 0.35))'
                        }}
                    />
                )}

                {/* 3. Full Colored Logo overlay for COLSIH (Fades in when returning from MJS to COLSIH) */}
                {isReturningFromMjs && (
                    <img 
                        key={`fill-colsih-${loaderSessionId}`}
                        src="/Logo COLSIH.svg" 
                        alt="Logo COLSIH" 
                        className={`absolute inset-0 w-full h-full object-contain p-6 transition-all duration-[800ms] ease-out pointer-events-none ${
                            showColsihFilled ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1'
                        }`}
                        style={{
                            filter: 'drop-shadow(0 0 25px rgba(128, 10, 21, 0.35)) drop-shadow(0 0 10px rgba(0, 60, 143, 0.25))'
                        }}
                    />
                )}
                
            </div>
        </div>
    );
}
