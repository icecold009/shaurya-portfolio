import { useEffect, useRef } from "react";

import "./BubbleField.css";

const BUBBLE_SEEDS = [
    { x: 8, y: 21, size: 116, driftX: 18, driftY: 22, speed: 0.45, phase: 0.4 },
    { x: 18, y: 63, size: 74, driftX: 16, driftY: 14, speed: 0.7, phase: 1.3 },
    { x: 30, y: 17, size: 86, driftX: 12, driftY: 18, speed: 0.34, phase: 2.2 },
    { x: 41, y: 78, size: 124, driftX: 20, driftY: 18, speed: 0.52, phase: 0.7 },
    { x: 52, y: 20, size: 66, driftX: 16, driftY: 12, speed: 0.8, phase: 2.9 },
    { x: 62, y: 64, size: 94, driftX: 22, driftY: 16, speed: 0.6, phase: 1.8 },
    { x: 72, y: 16, size: 108, driftX: 16, driftY: 23, speed: 0.38, phase: 3.5 },
    { x: 82, y: 51, size: 76, driftX: 18, driftY: 17, speed: 0.67, phase: 0.9 },
    { x: 94, y: 24, size: 126, driftX: 19, driftY: 20, speed: 0.31, phase: 2.6 },
    { x: 6, y: 86, size: 62, driftX: 14, driftY: 12, speed: 0.74, phase: 1.1 },
    { x: 26, y: 91, size: 92, driftX: 18, driftY: 16, speed: 0.48, phase: 3.8 },
    { x: 57, y: 90, size: 72, driftX: 16, driftY: 14, speed: 0.63, phase: 4.4 },
    { x: 75, y: 83, size: 116, driftX: 20, driftY: 19, speed: 0.36, phase: 1.7 },
    { x: 90, y: 72, size: 68, driftX: 15, driftY: 13, speed: 0.78, phase: 5.2 },
    { x: 13, y: 42, size: 82, driftX: 17, driftY: 17, speed: 0.56, phase: 2.1 },
    { x: 36, y: 47, size: 64, driftX: 13, driftY: 16, speed: 0.88, phase: 0.2 },
    { x: 69, y: 39, size: 88, driftX: 20, driftY: 15, speed: 0.43, phase: 4.9 },
    { x: 98, y: 91, size: 98, driftX: 18, driftY: 18, speed: 0.5, phase: 3.1 },
];

const REPEL_RADIUS = 170;
const MAX_REPEL_DISTANCE = 34;

function setBubbleTransform(element, offsetX, offsetY) {
    element.style.transform = `translate3d(calc(-50% + ${offsetX.toFixed(2)}px), calc(-50% + ${offsetY.toFixed(2)}px), 0)`;
}

export default function BubbleField() {
    const fieldRef = useRef(null);

    useEffect(() => {
        const field = fieldRef.current;

        if (!field) {
            return undefined;
        }

        const bubbles = Array.from(field.children);
        const pointer = { x: 0, y: 0, active: false };
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        let fieldRect = field.getBoundingClientRect();
        let frameId = 0;
        let shouldAnimate = !motionQuery.matches;

        const updateFieldRect = () => {
            fieldRect = field.getBoundingClientRect();
        };

        const setRestingPosition = () => {
            bubbles.forEach((bubble) => setBubbleTransform(bubble, 0, 0));
        };

        const animate = (time) => {
            if (!shouldAnimate) {
                frameId = 0;
                setRestingPosition();
                return;
            }

            const seconds = time / 1000;
            const pointerIsInside = pointer.active
                && pointer.x >= fieldRect.left
                && pointer.x <= fieldRect.right
                && pointer.y >= fieldRect.top
                && pointer.y <= fieldRect.bottom;

            BUBBLE_SEEDS.forEach((bubble, index) => {
                const element = bubbles[index];

                if (!element) {
                    return;
                }

                const floatX = Math.sin(seconds * bubble.speed + bubble.phase) * bubble.driftX
                    + Math.cos(seconds * bubble.speed * 0.61 + bubble.phase) * bubble.driftX * 0.22;
                const floatY = Math.cos(seconds * bubble.speed * 0.87 + bubble.phase) * bubble.driftY
                    + Math.sin(seconds * bubble.speed * 0.52 + bubble.phase) * bubble.driftY * 0.2;
                let repelX = 0;
                let repelY = 0;

                if (pointerIsInside) {
                    const centerX = fieldRect.left + (fieldRect.width * bubble.x) / 100 + floatX;
                    const centerY = fieldRect.top + (fieldRect.height * bubble.y) / 100 + floatY;
                    const distanceX = centerX - pointer.x;
                    const distanceY = centerY - pointer.y;
                    const distance = Math.hypot(distanceX, distanceY);

                    if (distance > 0 && distance < REPEL_RADIUS) {
                        const intensity = (1 - distance / REPEL_RADIUS) ** 2;
                        const repelDistance = MAX_REPEL_DISTANCE * intensity;

                        repelX = (distanceX / distance) * repelDistance;
                        repelY = (distanceY / distance) * repelDistance;
                    }
                }

                setBubbleTransform(element, floatX + repelX, floatY + repelY);
            });

            frameId = window.requestAnimationFrame(animate);
        };

        const startAnimation = () => {
            if (frameId === 0) {
                frameId = window.requestAnimationFrame(animate);
            }
        };

        const stopAnimation = () => {
            if (frameId !== 0) {
                window.cancelAnimationFrame(frameId);
                frameId = 0;
            }

            setRestingPosition();
        };

        const handlePointerMove = (event) => {
            if (event.pointerType === "touch") {
                return;
            }

            pointer.x = event.clientX;
            pointer.y = event.clientY;
            pointer.active = true;
        };

        const clearPointer = () => {
            pointer.active = false;
        };

        const handleMotionChange = () => {
            shouldAnimate = !motionQuery.matches;

            if (shouldAnimate) {
                updateFieldRect();
                startAnimation();
            } else {
                stopAnimation();
            }
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        window.addEventListener("blur", clearPointer);
        window.addEventListener("resize", updateFieldRect);
        window.addEventListener("scroll", updateFieldRect, { passive: true });

        if (typeof motionQuery.addEventListener === "function") {
            motionQuery.addEventListener("change", handleMotionChange);
        } else {
            motionQuery.addListener(handleMotionChange);
        }

        if (shouldAnimate) {
            startAnimation();
        } else {
            setRestingPosition();
        }

        return () => {
            stopAnimation();
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("blur", clearPointer);
            window.removeEventListener("resize", updateFieldRect);
            window.removeEventListener("scroll", updateFieldRect);

            if (typeof motionQuery.removeEventListener === "function") {
                motionQuery.removeEventListener("change", handleMotionChange);
            } else {
                motionQuery.removeListener(handleMotionChange);
            }
        };
    }, []);

    return (
        <div className="portfolio-hero__bubble-field" ref={fieldRef} aria-hidden="true">
            {BUBBLE_SEEDS.map((bubble, index) => (
                <span
                    key={`hero-bubble-${index + 1}`}
                    className="portfolio-hero__bubble"
                    aria-hidden="true"
                    style={{
                        "--bubble-size": `${bubble.size}px`,
                        "--bubble-x": `${bubble.x}%`,
                        "--bubble-y": `${bubble.y}%`,
                    }}
                />
            ))}
        </div>
    );
}
