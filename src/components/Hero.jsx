import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const LINES = ["I build.", "I ship.", "I solve."];
const CHARS = "01アイウエオABCDEF!@#$%";

function useScramble(lines, containerRef) {
    useEffect(() => {
        const canvas = document.getElementById("matrix-canvas");
        const ctx = canvas.getContext("2d");
        let animId;
        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            cols = Math.floor(canvas.width / fontSize);
            drops = Array(cols).fill(1);          // ← fix: reset drops on resize
        };
        const fontSize = 14;
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";
        let cols = Math.floor(canvas.width / fontSize);
        let drops = Array(cols).fill(1);
        resize();
        window.addEventListener("resize", resize);
        const draw = () => {
            ctx.fillStyle = "rgba(6, 10, 6, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#00ff41";
            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
            for (let i = 0; i < cols; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
    }, []);
}

function Hero() {
    const titleRef = useRef(null);
    useScramble(LINES, titleRef);

    useEffect(() => {
        const canvas = document.getElementById("matrix-canvas");
        const ctx = canvas.getContext("2d");
        let animId;
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener("resize", resize);
        const fontSize = 14;
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";
        let cols = Math.floor(canvas.width / fontSize);
        let drops = Array(cols).fill(1);
        const draw = () => {
            ctx.fillStyle = "rgba(6, 10, 6, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#00ff41";
            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
            cols = Math.floor(canvas.width / fontSize);
            if (drops.length < cols) drops = [...drops, ...Array(cols - drops.length).fill(1)];
            for (let i = 0; i < cols; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
    }, []);

    return (
        <section className="hero" id="home">
            <canvas id="matrix-canvas" aria-hidden="true" />
            <p className="hero-kicker">BENGALURU &nbsp;·&nbsp; CS STUDENT &nbsp;·&nbsp; FULL-STACK DEV</p>
            <h1 className="hero-title" ref={titleRef}>
                {LINES.map((line, i) => (
                    <span key={i} className="scramble-line">
                        <span className="dim">{line[0]}</span>{line.slice(1)}
                    </span>
                ))}
            </h1>
            <p className="hero-description">
                I'm <span className="hl">Shaurya</span> — a student developer building{" "}
                <span className="hl">full-stack apps</span>,{" "}
                <span className="hl">AI-powered tools</span>, and{" "}
                <span className="hl">music recognition systems</span>.
                Practical products, clean code, no fluff.
            </p>
            <div className="hero-actions">
                <Link to="/projects" className="btn btn-primary">View Projects</Link>
                <Link to="/contact" className="btn btn-secondary">Get In Touch</Link>
            </div>
            <div className="scroll-indicator" aria-hidden="true">
                <span className="scroll-label">scroll</span>
                <div className="scroll-line">
                    <div className="scroll-dot" />
                </div>
            </div>
        </section>
    );
}

export default Hero;