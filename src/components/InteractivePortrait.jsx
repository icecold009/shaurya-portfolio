import { useEffect, useRef } from "react";

import "./InteractivePortrait.css";

const DOT_SPACING = 7;
const POINTER_RADIUS = 100;

function createPortraitDots(width, height, image) {
    if (!image.complete || !image.naturalWidth) return [];

    const source = document.createElement("canvas");
    const sourceContext = source.getContext("2d", { willReadFrequently: true });
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    source.width = Math.ceil(width);
    source.height = Math.ceil(height);
    sourceContext.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    const pixels = sourceContext.getImageData(0, 0, source.width, source.height).data;
    const dots = [];

    for (let y = DOT_SPACING; y < height; y += DOT_SPACING) {
        for (let x = DOT_SPACING; x < width; x += DOT_SPACING) {
            const index = (Math.floor(y) * source.width + Math.floor(x)) * 4;
            const alpha = pixels[index + 3];
            const luminance =
                pixels[index] * 0.2126 +
                pixels[index + 1] * 0.7152 +
                pixels[index + 2] * 0.0722;

            if (alpha < 20 || luminance > 238) continue;

            dots.push({
                homeX: x,
                homeY: y,
                x,
                y,
                shade: 1 - luminance / 255,
                phase: Math.random() * Math.PI * 2,
                radius: 0.8 + (1 - luminance / 255) * 0.8,
            });
        }
    }

    return dots;
}

export default function InteractivePortrait() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const context = canvas.getContext("2d");
        const portrait = new Image();
        const pointer = { x: -1000, y: -1000, active: false };
        let animationFrame;
        let resizeObserver;
        let dots = [];
        let width = 0;
        let height = 0;
        let reducedMotion = false;

        const resize = () => {
            const bounds = canvas.getBoundingClientRect();
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            width = bounds.width;
            height = bounds.height;
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            dots = createPortraitDots(width, height, portrait);
        };

        const movePointer = (event) => {
            const bounds = canvas.getBoundingClientRect();
            pointer.x = event.clientX - bounds.left;
            pointer.y = event.clientY - bounds.top;
            pointer.active = true;
        };

        const clearPointer = () => {
            pointer.active = false;
        };

        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updateMotionPreference = () => {
            reducedMotion = mediaQuery.matches;
        };

        const render = (time) => {
            context.clearRect(0, 0, width, height);
            const seconds = time / 1000;
            const dotColor = getComputedStyle(canvas)
                .getPropertyValue("--portrait-dot")
                .trim() || "#b8ff6b";

            dots.forEach((dot) => {
                const idleX = reducedMotion
                    ? dot.homeX
                    : dot.homeX + Math.sin(seconds * 0.75 + dot.phase) * 1.1;
                const idleY = reducedMotion
                    ? dot.homeY
                    : dot.homeY + Math.cos(seconds * 0.6 + dot.phase) * 1.1;
                const dx = idleX - pointer.x;
                const dy = idleY - pointer.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const influence = pointer.active
                    ? Math.max(0, 1 - distance / POINTER_RADIUS)
                    : 0;
                const push = influence * influence * 30;

                dot.x += (idleX + (dx / (distance || 1)) * push - dot.x) * 0.16;
                dot.y += (idleY + (dy / (distance || 1)) * push - dot.y) * 0.16;

                context.beginPath();
                context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                context.fillStyle = dotColor;
                context.globalAlpha = Math.min(0.9, 0.25 + dot.shade * 0.7 + influence * 0.25);
                context.fill();
            });

            context.globalAlpha = 1;
            animationFrame = window.requestAnimationFrame(render);
        };

        const rebuild = () => {
            dots = createPortraitDots(width, height, portrait);
        };

        portrait.addEventListener("load", rebuild);
        portrait.src = "/images/shaurya-portrait.jpeg";
        updateMotionPreference();
        mediaQuery.addEventListener("change", updateMotionPreference);
        canvas.addEventListener("pointermove", movePointer);
        canvas.addEventListener("pointerleave", clearPointer);
        resize();
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);
        animationFrame = window.requestAnimationFrame(render);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            resizeObserver?.disconnect();
            portrait.removeEventListener("load", rebuild);
            mediaQuery.removeEventListener("change", updateMotionPreference);
            canvas.removeEventListener("pointermove", movePointer);
            canvas.removeEventListener("pointerleave", clearPointer);
        };
    }, []);

    return (
        <div className="interactive-portrait" aria-hidden="true">
            <canvas ref={canvasRef} />
        </div>
    );
}
