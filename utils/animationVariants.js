/**
 * Reusable Framer Motion animation variants
 * Industry-standard smooth animations for consistent UX
 */

export const fadeInUp = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
};

export const fadeInDown = {
    hidden: {
        opacity: 0,
        y: -40,
    },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
};

export const fadeInLeft = {
    hidden: {
        opacity: 0,
        x: -60,
    },
    visible: (i = 0) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
};

export const fadeInRight = {
    hidden: {
        opacity: 0,
        x: 60,
    },
    visible: (i = 0) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
};

export const scaleIn = {
    hidden: {
        opacity: 0,
        scale: 0.8,
    },
    visible: (i = 0) => ({
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            delay: i * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.2,
        },
    },
};

export const staggerContainerFast = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
        },
    },
};

export const hoverScale = {
    whileHover: {
        scale: 1.05,
        transition: { duration: 0.3 },
    },
    whileTap: {
        scale: 0.98,
    },
};

export const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: (i = 0) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            delay: i * 0.1,
            ease: [0.34, 1.56, 0.64, 1],
        },
    }),
};

export const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: (i = 0) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            delay: i * 0.1,
            ease: [0.34, 1.56, 0.64, 1],
        },
    }),
};

export const floatingAnimation = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

export const rotateIn = {
    hidden: {
        opacity: 0,
        rotate: -10,
    },
    visible: (i = 0) => ({
        opacity: 1,
        rotate: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
};

export const shimmerAnimation = {
    animate: {
        backgroundPosition: ['200% 0', '-200% 0'],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
        },
    },
};

// Viewport configuration for scroll animations
export const viewportConfig = {
    once: false,
    amount: 0.3,
};
