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
import { profileLinks as sharedProfileLinks } from "../../lib/profileLinks";

import "./AboutPage.css";

const principles = [
    {
        number: "01",
        title: <>Start with the real <em>question</em></>,
        description:
            "I define the user, the input and the smallest useful outcome before reaching for a larger stack.",
    },
    {
        number: "02",
        title: <>Make the system <em>explain itself</em></>,
        description:
            "I want the interface, model, data path and failure state to be understandable—not just the happy path.",
    },
    {
        number: "03",
        title: <>Keep the first version <em>small</em></>,
        description:
            "A focused prototype creates better evidence than a polished idea that has never met a real user or input.",
    },
];

const experiences = [
    {
        organization: "Infinitea",
        role: "Data Analytics Intern",
        meta: "Apr 2025 · 3 weeks · Offline",
        detail:
            "Analysed customer-ordering data and weekly sales reports to identify peak hours and best-selling items, then linked those patterns to inventory and stock planning.",
    },
    {
        organization: "Vivek Agro Foods",
        role: "Graphic Design & Market Research Intern",
        meta: "Apr 2024 · 4 weeks · Hybrid",
        detail:
            "Designed marketing materials for whole-wheat and grain products using Canva and Adobe Photoshop, and researched grain types, customers and competitors.",
    },
    {
        organization: "National Sports Club of India (NSCI)",
        role: "Mentor and Organiser - Art Workshop",
        meta: "May 2025 · 2 days · Offline",
        detail:
            "Coordinated participant materials and group activities, and guided students through creative exercises connecting visual communication with professional presentation.",
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
    ...sharedProfileLinks.map((link) => ({
        ...link,
        label: "Profile",
        value: link.label,
    })),
    {
        label: "Writing",
        value: "Field notes",
        to: "/blog",
        external: false,
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
                        Student developer · Machine learning
                        · Product engineering
                    </motion.p>

                    <motion.h1
                        id="about-editorial-title"
                        className="about-editorial__title"
                        variants={itemVariant}
                    >
                        I like hard problems that become
                        <span> useful software.</span>
                    </motion.h1>

                    <motion.div
                        className="about-editorial__hero-bottom"
                        variants={itemVariant}
                    >
                        <p className="about-editorial__intro">
                            I am Shaurya Saria, a student developer
                            based in Bengaluru. I move between
                            mathematics, machine learning, full-stack
                            products and interface design—usually by
                            building the first version and learning
                            what the idea actually needs.
                        </p>

                        <dl className="about-editorial__facts">
                            <div>
                                <dt>Based in</dt>
                                <dd>Bengaluru, India</dd>
                            </div>

                            <div>
                                <dt>Working across</dt>
                                <dd>
                                    ML experiments, full-stack
                                    products and interfaces
                                </dd>
                            </div>

                            <div>
                                <dt>Interested in</dt>
                                <dd>
                                    Internships, research and
                                    thoughtful collaborations
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
                        <span>Experience</span>
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
                            design and problem-solving overlap—
                            especially when the problem is still
                            a little undefined.
                        </p>

                        <div className="about-editorial__story-copy">
                            <p>
                                I started building seriously while
                                studying mathematics, physics,
                                further mathematics and computer
                                science. Those subjects shaped my
                                default approach: break a difficult
                                system into understandable parts,
                                then make the parts work together.
                            </p>

                            <p>
                                That has led to a deliberately mixed
                                project archive: F1 forecasting,
                                audio fingerprinting, Cambridge past
                                papers, face attendance, a movie
                                tracker, stadium operations and AI
                                routing. The common thread is making
                                technical ideas usable.
                            </p>

                            <p>
                                I care about visual clarity, but not
                                decoration for its own sake. A good
                                interface should reveal how the
                                system behaves, where it is uncertain
                                and what the user can do next.
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
                        <p>Experience</p>
                    </motion.header>

                    <motion.div
                        className="about-editorial__experience"
                        variants={itemVariant}
                    >
                        {experiences.map((experience, index) => (
                            <article
                                className="about-editorial__experience-card"
                                key={experience.organization}
                            >
                                <div className="about-editorial__experience-topline">
                                    <span>{String(index + 1).padStart(2, "0")}</span>
                                    <span>{experience.meta}</span>
                                </div>

                                <h2>{experience.organization}</h2>
                                <p className="about-editorial__experience-role">
                                    {experience.role}
                                </p>
                                <p>{experience.detail}</p>
                            </article>
                        ))}
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
                        <span>03</span>
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
                        <span>04</span>
                        <p>Tools and trails</p>
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
                                    <h2
                                        className={
                                            group.label === "AI and data"
                                                ? "heading-italic"
                                                : undefined
                                        }
                                    >
                                        {group.label}
                                    </h2>

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

                                if (link.href) {
                                    return (
                                        <motion.a
                                            key={link.key || link.label}
                                            href={link.href}
                                            target={link.external ? "_blank" : undefined}
                                            rel={link.external ? "noopener noreferrer" : undefined}
                                            download={link.download ? true : undefined}
                                            whileHover={linkHover}
                                        >
                                            {content}
                                        </motion.a>
                                    );
                                }

                                return (
                                    <motion.div
                                        key={link.key || link.label}
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
