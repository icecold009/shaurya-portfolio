import { Link } from "react-router-dom";
import {
    motion,
    useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import {
    EDITORIAL_EASE,
    REVEAL,
    REVEAL_CONTAINER,
    REVEAL_VIEWPORT,
} from "../../lib/motion";

import "./AboutPage.css";

const principles = [
    {
        number: "01",
        title: "Clarity before complexity",
        description:
            "I prefer simple interfaces, understandable systems and deliberate decisions over unnecessary abstraction.",
    },
    {
        number: "02",
        title: "Build end to end",
        description:
            "I enjoy moving across product thinking, frontend interaction, backend logic, databases and deployment.",
    },
    {
        number: "03",
        title: "Ship and improve",
        description:
            "Working software creates better questions. I build, observe what works and refine from real feedback.",
    },
];

const stackGroups = [
    {
        label: "Frontend",
        tools: [
            "React",
            "JavaScript",
            "Vite",
            "HTML",
            "CSS",
            "Motion",
        ],
    },
    {
        label: "Backend",
        tools: [
            "Python",
            "Node.js",
            "REST APIs",
            "Supabase",
            "PostgreSQL",
        ],
    },
    {
        label: "AI and data",
        tools: [
            "Gemini",
            "Applied machine learning",
            "Data workflows",
            "Kaggle",
        ],
    },
    {
        label: "Workflow",
        tools: [
            "Git",
            "GitHub",
            "Deployment",
            "Product iteration",
        ],
    },
];

const profileLinks = [
    {
        label: "Selected work",
        value: "Projects",
        to: "/projects",
        external: false,
    },
    {
        label: "Code",
        value: "GitHub",
        href: "https://github.com/icecold009",
        external: true,
    },
    {
        label: "Data",
        value: "Kaggle",
        href: "https://www.kaggle.com/icecold009",
        external: true,
    },
];

export default function AboutPage() {
    const shouldReduceMotion = useReducedMotion();

    const heroMotion = shouldReduceMotion
        ? {}
        : {
            variants: REVEAL_CONTAINER,
            initial: "hidden",
            animate: "visible",
        };

    const sectionMotion = shouldReduceMotion
        ? {}
        : {
            variants: REVEAL_CONTAINER,
            initial: "hidden",
            whileInView: "visible",
            viewport: REVEAL_VIEWPORT,
        };

    const itemVariant = shouldReduceMotion
        ? undefined
        : REVEAL;

    const linkHover = shouldReduceMotion
        ? undefined
        : {
            x: 6,
            transition: {
                duration: 0.35,
                ease: EDITORIAL_EASE,
            },
        };

    return (
        <div className="about-editorial">
            <section
                className="about-editorial__hero"
                aria-labelledby="about-editorial-title"
            >
                <div
                    className="about-editorial__background"
                    aria-hidden="true"
                >
                    <div className="about-editorial__grid" />
                    <div className="about-editorial__glow" />
                </div>

                <motion.div
                    className="about-editorial__hero-inner"
                    {...heroMotion}
                >
                    <motion.div
                        className="about-editorial__topline"
                        variants={itemVariant}
                    >
                        <span>About</span>
                        <span>Bengaluru, India</span>
                        <span>Portfolio · 2026</span>
                    </motion.div>

                    <motion.p
                        className="about-editorial__eyebrow"
                        variants={itemVariant}
                    >
                        Student developer · Product engineering
                        · Applied AI
                    </motion.p>

                    <motion.h1
                        id="about-editorial-title"
                        className="about-editorial__title"
                        variants={itemVariant}
                    >
                        Curious about how systems work.
                        <span> Focused on making them useful.</span>
                    </motion.h1>

                    <motion.div
                        className="about-editorial__hero-bottom"
                        variants={itemVariant}
                    >
                        <p className="about-editorial__intro">
                            I am Shaurya, a developer based in
                            Bengaluru. I build full-stack
                            products, AI-powered tools and web
                            experiences that turn technical
                            ideas into practical software.
                        </p>

                        <dl className="about-editorial__facts">
                            <div>
                                <dt>Based in</dt>
                                <dd>Bengaluru, India</dd>
                            </div>

                            <div>
                                <dt>Working across</dt>
                                <dd>
                                    Software, AI and product
                                    design
                                </dd>
                            </div>

                            <div>
                                <dt>Interested in</dt>
                                <dd>
                                    Internships and ambitious
                                    collaborations
                                </dd>
                            </div>
                        </dl>
                    </motion.div>

                    <motion.div
                        className="about-editorial__index"
                        variants={itemVariant}
                        aria-hidden="true"
                    >
                        <span>Background</span>
                        <span>Process</span>
                        <span>Tools</span>
                    </motion.div>
                </motion.div>
            </section>

            <motion.section
                className="about-editorial__section"
                {...sectionMotion}
            >
                <div className="about-editorial__shell">
                    <motion.header
                        className="about-editorial__section-heading"
                        variants={itemVariant}
                    >
                        <span>01</span>
                        <p>Background</p>
                    </motion.header>

                    <motion.div
                        className="about-editorial__story"
                        variants={itemVariant}
                    >
                        <p className="about-editorial__story-lead">
                            I like working where engineering,
                            design and problem-solving overlap.
                        </p>

                        <div className="about-editorial__story-copy">
                            <p>
                                I started building seriously
                                while studying mathematics,
                                physics, further mathematics and
                                computer science. Those subjects
                                shaped how I approach software:
                                break difficult systems into
                                understandable parts, then make
                                those parts work together.
                            </p>

                            <p>
                                My projects have taken me through
                                React interfaces, backend APIs,
                                database architecture, AI
                                integration, deployment and
                                security. I am most interested in
                                products that help people make
                                better decisions or complete
                                difficult work more easily.
                            </p>

                            <p>
                                I care about visual clarity, but
                                not decoration for its own sake.
                                The final product should feel
                                considered because the underlying
                                structure is considered.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                className="about-editorial__section"
                {...sectionMotion}
            >
                <div className="about-editorial__shell">
                    <motion.header
                        className="about-editorial__section-heading"
                        variants={itemVariant}
                    >
                        <span>02</span>
                        <p>How I work</p>
                    </motion.header>

                    <div className="about-editorial__principles">
                        {principles.map((principle) => (
                            <motion.article
                                className="about-editorial__principle"
                                key={principle.number}
                                variants={itemVariant}
                            >
                                <span className="about-editorial__principle-number">
                                    {principle.number}
                                </span>

                                <h2>
                                    {principle.title}
                                </h2>

                                <p>
                                    {principle.description}
                                </p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </motion.section>

            <motion.section
                className="about-editorial__section about-editorial__section--last"
                {...sectionMotion}
            >
                <div className="about-editorial__shell">
                    <motion.header
                        className="about-editorial__section-heading"
                        variants={itemVariant}
                    >
                        <span>03</span>
                        <p>Tools and profiles</p>
                    </motion.header>

                    <div className="about-editorial__tools-layout">
                        <motion.div
                            className="about-editorial__stack"
                            variants={itemVariant}
                        >
                            {stackGroups.map((group) => (
                                <div
                                    className="about-editorial__stack-row"
                                    key={group.label}
                                >
                                    <h2>{group.label}</h2>

                                    <p>
                                        {group.tools.join(" · ")}
                                    </p>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div
                            className="about-editorial__links"
                            variants={itemVariant}
                        >
                            {profileLinks.map((link) => {
                                const content = (
                                    <>
                                        <span>
                                            <small>
                                                {link.label}
                                            </small>

                                            {link.value}
                                        </span>

                                        <ArrowUpRight
                                            size={19}
                                            aria-hidden="true"
                                        />
                                    </>
                                );

                                if (link.external) {
                                    return (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={linkHover}
                                        >
                                            {content}
                                        </motion.a>
                                    );
                                }

                                return (
                                    <motion.div
                                        key={link.label}
                                        whileHover={linkHover}
                                    >
                                        <Link to={link.to}>
                                            {content}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}