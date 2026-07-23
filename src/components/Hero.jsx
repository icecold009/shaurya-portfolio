import { useRef } from "react";
import { Link } from "react-router-dom";
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import {
    ArrowDown,
    ArrowRight,
    Code2,
    ExternalLink,
    MapPin,
    Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import "./Hero.css";

const technologies = [
    "React",
    "Supabase",
    "Node.js",
    "Python",
    "Generative AI",
];

const activityLines = [
    {
        command: "portfolio.status",
        response: "Available for projects",
        status: "success",
    },
    {
        command: "current.focus",
        response: "AI + full-stack products",
        status: "default",
    },
    {
        command: "location",
        response: "Bengaluru, India",
        status: "default",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.09,
            delayChildren: 0.12,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

function Hero() {
    const sectionRef = useRef(null);
    const cardRef = useRef(null);
    const shouldReduceMotion = useReducedMotion();

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const smoothRotateX = useSpring(rotateX, {
        stiffness: 180,
        damping: 24,
        mass: 0.4,
    });

    const smoothRotateY = useSpring(rotateY, {
        stiffness: 180,
        damping: 24,
        mass: 0.4,
    });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const contentY = useTransform(
        scrollYProgress,
        [0, 1],
        shouldReduceMotion ? [0, 0] : [0, 90],
    );

    const visualY = useTransform(
        scrollYProgress,
        [0, 1],
        shouldReduceMotion ? [0, 0] : [0, 150],
    );

    const visualScale = useTransform(
        scrollYProgress,
        [0, 1],
        shouldReduceMotion ? [1, 1] : [1, 0.92],
    );

    const heroOpacity = useTransform(
        scrollYProgress,
        [0, 0.78],
        [1, 0.18],
    );

    const handlePointerMove = (event) => {
        if (shouldReduceMotion || !cardRef.current) return;

        const bounds = cardRef.current.getBoundingClientRect();
        const relativeX = event.clientX - bounds.left;
        const relativeY = event.clientY - bounds.top;

        const percentageX = relativeX / bounds.width - 0.5;
        const percentageY = relativeY / bounds.height - 0.5;

        rotateY.set(percentageX * 10);
        rotateX.set(percentageY * -10);
    };

    const resetCardRotation = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    const scrollToContent = () => {
        const nextSection =
            sectionRef.current?.nextElementSibling ||
            document.querySelector(".home-sections");

        nextSection?.scrollIntoView({
            behavior: shouldReduceMotion ? "auto" : "smooth",
            block: "start",
        });
    };

    return (
        <section
            ref={sectionRef}
            className="hero-v2"
            id="home"
            aria-labelledby="hero-v2-title"
        >
            <div className="hero-v2-background" aria-hidden="true">
                <div className="hero-v2-grid" />
                <div className="hero-v2-glow hero-v2-glow-primary" />
                <div className="hero-v2-glow hero-v2-glow-secondary" />
                <div className="hero-v2-orb hero-v2-orb-one" />
                <div className="hero-v2-orb hero-v2-orb-two" />
            </div>

            <motion.div
                className="hero-v2-inner"
                style={{ opacity: heroOpacity }}
            >
                <motion.div
                    className="hero-v2-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ y: contentY }}
                >
                    <motion.div
                        className="hero-v2-status-row"
                        variants={itemVariants}
                    >
                        <span className="hero-v2-availability">
                            <span
                                className="hero-v2-status-dot"
                                aria-hidden="true"
                            />
                            Available for selected projects
                        </span>

                        <span className="hero-v2-location">
                            <MapPin size={14} aria-hidden="true" />
                            Bengaluru, India
                        </span>
                    </motion.div>

                    <motion.p
                        className="hero-v2-eyebrow"
                        variants={itemVariants}
                    >
                        <Sparkles size={15} aria-hidden="true" />
                        Student developer and product builder
                    </motion.p>

                    <motion.h1
                        id="hero-v2-title"
                        className="hero-v2-title"
                        variants={itemVariants}
                    >
                        I turn ambitious ideas into{" "}
                        <span className="hero-v2-title-accent">
                            useful digital products.
                        </span>
                    </motion.h1>

                    <motion.p
                        className="hero-v2-description"
                        variants={itemVariants}
                    >
                        I&apos;m Shaurya, a full-stack developer building
                        responsive web applications, AI-powered tools and
                        practical software with a focus on clean interaction
                        design.
                    </motion.p>

                    <motion.div
                        className="hero-v2-actions"
                        variants={itemVariants}
                    >
                        <motion.div
                            whileHover={
                                shouldReduceMotion
                                    ? undefined
                                    : { y: -3, scale: 1.015 }
                            }
                            whileTap={
                                shouldReduceMotion
                                    ? undefined
                                    : { scale: 0.98 }
                            }
                        >
                            <Link
                                to="/projects"
                                className="hero-v2-button hero-v2-button-primary"
                            >
                                Explore my work
                                <ArrowRight size={17} aria-hidden="true" />
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={
                                shouldReduceMotion
                                    ? undefined
                                    : { y: -3 }
                            }
                            whileTap={
                                shouldReduceMotion
                                    ? undefined
                                    : { scale: 0.98 }
                            }
                        >
                            <Link
                                to="/contact"
                                className="hero-v2-button hero-v2-button-secondary"
                            >
                                Start a conversation
                            </Link>
                        </motion.div>

                        <a
                            className="hero-v2-github-link"
                            href="https://github.com/icecold009"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaGithub size={17} aria-hidden="true" />
                            GitHub
                            <ExternalLink
                                size={13}
                                aria-hidden="true"
                            />
                        </a>
                    </motion.div>

                    <motion.div
                        className="hero-v2-tech-stack"
                        variants={itemVariants}
                        aria-label="Core technologies"
                    >
                        <span className="hero-v2-tech-label">
                            Core stack
                        </span>

                        <div className="hero-v2-tech-list">
                            {technologies.map((technology) => (
                                <span
                                    className="hero-v2-tech-item"
                                    key={technology}
                                >
                                    {technology}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-v2-visual-column"
                    initial={{
                        opacity: 0,
                        x: shouldReduceMotion ? 0 : 45,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 0.9,
                        delay: 0.25,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                        y: visualY,
                        scale: visualScale,
                    }}
                >
                    <motion.div
                        ref={cardRef}
                        className="hero-v2-showcase hero-v2-showcase-compact"
                        style={{
                            rotateX: smoothRotateX,
                            rotateY: smoothRotateY,
                            transformPerspective: 1200,
                        }}
                        onPointerMove={handlePointerMove}
                        onPointerLeave={resetCardRotation}
                    >
                        <div className="hero-v2-browser">
                            <div className="hero-v2-browser-bar">
                                <div
                                    className="hero-v2-browser-controls"
                                    aria-hidden="true"
                                >
                                    <span />
                                    <span />
                                    <span />
                                </div>

                                <div className="hero-v2-browser-address">
                                    <span className="hero-v2-browser-lock">
                                        ●
                                    </span>
                                    stadiumpulse.ai/dashboard
                                </div>

                                <span className="hero-v2-browser-live">
                                    Live
                                </span>
                            </div>

                            <div className="hero-v2-browser-content">
                                <div className="hero-v2-preview-header">
                                    <div>
                                        <span className="hero-v2-project-kicker">
                                            Featured project
                                        </span>

                                        <h2>StadiumPulse AI</h2>
                                    </div>

                                    <Link
                                        to="/projects"
                                        className="hero-v2-preview-open"
                                        aria-label="View StadiumPulse AI project"
                                    >
                                        <ArrowRight
                                            size={16}
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </div>

                                <p className="hero-v2-preview-description">
                                    Real-time AI support for stadium alerts,
                                    operations and crowd management.
                                </p>

                                <div className="hero-v2-dashboard">
                                    <aside className="hero-v2-dashboard-sidebar">
                                        <span className="hero-v2-dashboard-logo">
                                            SP
                                        </span>

                                        <div className="hero-v2-dashboard-nav">
                                            <span className="active" />
                                            <span />
                                            <span />
                                            <span />
                                        </div>
                                    </aside>

                                    <div className="hero-v2-dashboard-main">
                                        <div className="hero-v2-dashboard-top">
                                            <div>
                                                <span className="hero-v2-dashboard-label">
                                                    Operations overview
                                                </span>
                                                <strong>Good evening</strong>
                                            </div>

                                            <span className="hero-v2-dashboard-avatar">
                                                S
                                            </span>
                                        </div>

                                        <div className="hero-v2-dashboard-stats">
                                            <article>
                                                <span>Active zones</span>
                                                <strong>24</strong>
                                                <small>+3 today</small>
                                            </article>

                                            <article>
                                                <span>Open alerts</span>
                                                <strong>06</strong>
                                                <small>2 priority</small>
                                            </article>

                                            <article>
                                                <span>System health</span>
                                                <strong>98%</strong>
                                                <small>Operational</small>
                                            </article>
                                        </div>

                                        <div className="hero-v2-dashboard-lower">
                                            <div className="hero-v2-dashboard-chart">
                                                <div className="hero-v2-chart-header">
                                                    <span>Crowd activity</span>
                                                    <small>Last 60 min</small>
                                                </div>

                                                <svg
                                                    viewBox="0 0 320 110"
                                                    role="img"
                                                    aria-label="Crowd activity chart"
                                                >
                                                    <defs>
                                                        <linearGradient
                                                            id="hero-chart-fill"
                                                            x1="0"
                                                            y1="0"
                                                            x2="0"
                                                            y2="1"
                                                        >
                                                            <stop
                                                                offset="0%"
                                                                stopColor="currentColor"
                                                                stopOpacity="0.3"
                                                            />
                                                            <stop
                                                                offset="100%"
                                                                stopColor="currentColor"
                                                                stopOpacity="0"
                                                            />
                                                        </linearGradient>
                                                    </defs>

                                                    <path
                                                        className="hero-v2-chart-area"
                                                        d="M0,91 C28,86 35,62 63,68 C89,74 98,42 128,48 C155,54 166,31 194,39 C224,47 235,17 261,25 C284,32 296,13 320,16 L320,110 L0,110 Z"
                                                    />

                                                    <path
                                                        className="hero-v2-chart-line"
                                                        d="M0,91 C28,86 35,62 63,68 C89,74 98,42 128,48 C155,54 166,31 194,39 C224,47 235,17 261,25 C284,32 296,13 320,16"
                                                    />
                                                </svg>
                                            </div>

                                            <div className="hero-v2-dashboard-alert">
                                                <div className="hero-v2-alert-heading">
                                                    <span>Latest alert</span>
                                                    <small>2m ago</small>
                                                </div>

                                                <strong>Gate B congestion</strong>

                                                <p>
                                                    Increased crowd density detected.
                                                </p>

                                                <span className="hero-v2-alert-status">
                                                    AI recommendation ready
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="hero-v2-preview-footer">
                                    <div className="hero-v2-project-tags">
                                        <span>React</span>
                                        <span>Supabase</span>
                                        <span>Gemini</span>
                                    </div>

                                    <Link
                                        to="/projects"
                                        className="hero-v2-project-link"
                                    >
                                        View project
                                        <ArrowRight
                                            size={14}
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.button
                type="button"
                className="hero-v2-scroll"
                onClick={scrollToContent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                aria-label="Scroll to portfolio content"
            >
                <span>Scroll to explore</span>

                <motion.span
                    animate={
                        shouldReduceMotion
                            ? undefined
                            : {
                                y: [0, 5, 0],
                            }
                    }
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <ArrowDown size={15} aria-hidden="true" />
                </motion.span>
            </motion.button>
        </section>
    );
}

export default Hero;