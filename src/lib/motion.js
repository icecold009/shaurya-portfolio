export const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

export const REVEAL = {
    hidden: {
        opacity: 0,
        y: 32,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: EDITORIAL_EASE,
        },
    },
};

export const REVEAL_CONTAINER = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.08,
            staggerChildren: 0.1,
        },
    },
};

export const REVEAL_VIEWPORT = {
    once: true,
    amount: 0.18,
};