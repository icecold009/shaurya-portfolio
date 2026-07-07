import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const LINES = ["I build.", "I ship.", "I solve."];

function Hero() {
    const titleRef = useRef(null);

    // Matrix canvas — single effect, correct resize with drops reset
    useEffect(() => {
        const canvas = document.getElementById("matrix-canvas");
        const ctx = canvas.getContext("2d");
        const fontSize = 14;
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";
        let cols, drops, animId;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            cols = Math.floor(canvas.width / fontSize);
            drops = Array(cols).fill(1);   // ← reset on every resize/orient change
        };

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

        resize();
        window.addEventListener("resize", resize);
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    // Scramble effect — text only, no canvas involvement
    useEffect(() => {
        const el = titleRef.current;
        if (!el) return;
        const spans = el.querySelectorAll(".scramble-line");
        const originals = LINES.map((l) => l);
        const CHARS = "01アイウエオABCDEF!@#$%";
        let frame = 0;

        const scramble = () => {
            spans.forEach((span, si) => {
                const target = originals[si];
                const progress = Math.max(0, frame - si * 8);
                let result = "";
                for (let i = 0; i < target.length; i++) {
                    if (target[i] === " ") { result += " "; continue; }
                    if (i < progress) {
                        result += target[i];
                    } else {
                        result += CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                }
                span.textContent = result;
            });
            frame++;
            if (frame < originals[originals.length - 1].length + (originals.length - 1) * 8 + 10) {
                requestAnimationFrame(scramble);
            } else {
                spans.forEach((span, si) => { span.textContent = originals[si]; });
            }
        };

        requestAnimationFrame(scramble);
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
                <a href="/resume.pdf" download className="btn btn-ghost">↓ Resume</a>
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