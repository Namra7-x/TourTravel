import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for intersection observer animations
 * Detects when an element enters the viewport
 * No external dependencies required
 */
export const useInView = (options = {}) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    const { threshold = 0.2, triggerOnce = true, amount = 0.3 } = options;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (triggerOnce) {
                        setHasAnimated(true);
                    }
                } else {
                    if (!triggerOnce) {
                        setInView(false);
                    }
                }
            },
            {
                threshold: threshold,
            }
        );

        const currentRef = ref.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, triggerOnce]);

    return {
        ref,
        inView: triggerOnce ? hasAnimated || inView : inView,
    };
};
