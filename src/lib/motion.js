export const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

export const EDITORIAL_DURATION = {
    fast: 0.35,
    normal: 0.55,
    reveal: 0.8,
};

export const EDITORIAL_STAGGER = {
    delay: 0.08,
    interval: 0.1,
};

export const REVEAL = {
    hidden: {
        opacity: 0,
        y: 32,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: EDITORIAL_DURATION.reveal,
            ease: EDITORIAL_EASE,
        },
    },
};

export const REVEAL_CONTAINER = {
    hidden: {},

    visible: {
        transition: {
            delayChildren: EDITORIAL_STAGGER.delay,
            staggerChildren: EDITORIAL_STAGGER.interval,
        },
    },
};

export const REVEAL_VIEWPORT = {
    once: true,
    amount: 0.18,
};