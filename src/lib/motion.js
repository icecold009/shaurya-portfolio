export const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

export const EDITORIAL_DURATION = {
    fast: 0.14,
    normal: 0.24,
    popover: 0.18,
    drawer: 0.2,
    page: 0.2,
    reveal: 0.72,
};

export const EDITORIAL_STAGGER = {
    delay: 0,
    interval: 0.05,
};

export const PRESS = {
    scale: 0.975,
    transition: {
        duration: EDITORIAL_DURATION.fast,
        ease: EDITORIAL_EASE,
    },
};

export const POPOVER = {
    duration: EDITORIAL_DURATION.popover,
    ease: EDITORIAL_EASE,
};

export const DRAWER = {
    duration: EDITORIAL_DURATION.drawer,
    ease: EDITORIAL_EASE,
};

export const PAGE_REVEAL = {
    duration: EDITORIAL_DURATION.page,
    ease: EDITORIAL_EASE,
};

export const REVEAL = {
    hidden: {
        opacity: 0,
        transform: "translateY(2rem)",
    },

    visible: {
        opacity: 1,
        transform: "translateY(0)",

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
