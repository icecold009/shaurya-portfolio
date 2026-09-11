import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    BrainCircuit,
    Check,
    Code2,
    Database,
    Rocket,
    Workflow,
} from "lucide-react";

const principles = [
    {
        number: "01",
        title: "Start with the constraint.",
        description:
            "The tool follows the problem. I keep the first version small enough to understand, test and explain.",
    },
    {
        number: "02",
        title: "Make the boundary visible.",
        description:
            "Credentials, model limits, fallbacks and incomplete evidence should be part of the product story, not hidden footnotes.",
    },
    {
        number: "03",
        title: "Ship a useful slice.",
        description:
            "A focused workflow with a clear next step is more valuable than a broad demo that cannot survive contact with real use.",
    },
];

const workflow = [
    {
        number: "01",
        title: "Frame",
        description: "Define the user, the input contract and the smallest useful outcome.",
    },
    {
        number: "02",
        title: "Build",
        description: "Use the lightest stack that gives the idea a durable home.",
    },
    {
        number: "03",
        title: "Check",
        description: "Test the failure paths, inspect the evidence and keep claims proportional.",
    },
    {
        number: "04",
        title: "Publish",
        description: "Leave a reviewable commit, a reproducible setup and a clear next action.",
    },
];

const toolGroups = [
    {
        number: "A",
        category: "Make",
        icon: Code2,
        summary: "The interface layer",
        tools: [
            {
                name: "React + Vite",
                detail: "This portfolio, Token Smart Router and the fast product surfaces I use to test an idea.",
                tags: ["JSX", "HMR"],
            },
            {
                name: "Vanilla CSS",
                detail: "The editorial layouts, theme tokens and responsive systems that keep my interfaces recognisable.",
                tags: ["CSS", "Tokens"],
            },
            {
                name: "Framer Motion",
                detail: "Small transitions for hierarchy and orientation, not motion added just to make a page feel busy.",
                tags: ["Motion", "A11y"],
            },
        ],
    },
    {
        number: "B",
        category: "Reason",
        icon: BrainCircuit,
        summary: "The intelligence layer",
        tools: [
            {
                name: "Python",
                detail: "F1 evaluation, audio recognition, computer vision, past-paper tooling and practical automation.",
                tags: ["Scripts", "ML"],
            },
            {
                name: "Gemini + Fireworks",
                detail: "Gemini for study and AI experiments; Fireworks for the routing prototype, with boundaries kept visible.",
                tags: ["AI", "APIs"],
            },
            {
                name: "Pandas + scikit-learn",
                detail: "Chronological experiments, serious baselines and reproducible reports rather than leaderboard theatre.",
                tags: ["Data", "Models"],
            },
        ],
    },
    {
        number: "C",
        category: "Connect",
        icon: Database,
        summary: "The data layer",
        tools: [
            {
                name: "Flask",
                detail: "Focused same-origin apps for audio recognition, Movie Tracker and the local attendance workflow.",
                tags: ["Python", "HTTP"],
            },
            {
                name: "Supabase + Postgres",
                detail: "Structured product data, ownership boundaries and realtime primitives where the workflow needs them.",
                tags: ["SQL", "RLS"],
            },
            {
                name: "FFmpeg",
                detail: "The bounded conversion step that makes inconsistent audio inputs usable by the recognition pipeline.",
                tags: ["Audio", "CLI"],
            },
        ],
    },
    {
        number: "D",
        category: "Ship",
        icon: Rocket,
        summary: "The delivery layer",
        tools: [
            {
                name: "GitHub",
                detail: "Feature branches, reviewable commits, public project history and the place I keep the work honest.",
                tags: ["Git", "Review"],
                link: "https://github.com/icecold009",
            },
            {
                name: "Vercel",
                detail: "The deployment path for this portfolio and selected web applications when a project is ready to share.",
                tags: ["Deploy", "Web"],
                link: "https://vercel.com",
            },
            {
                name: "Docker + Actions",
                detail: "Portable runtime checks and automated gates when reproducibility matters more than keeping setup tiny.",
                tags: ["CI", "Runtime"],
            },
        ],
    },
];

const reveal = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
};

function Reveal({ children, className, delay = 0, reduceMotion, id }) {
    return (
        <motion.div
            id={id}
            className={className}
            variants={reduceMotion ? undefined : reveal}
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.16 }}
            transition={
                reduceMotion
                    ? undefined
                    : { duration: 0.42, delay, ease: [0.23, 1, 0.32, 1] }
            }
        >
            {children}
        </motion.div>
    );
}

function SectionMarker({ number, label }) {
    return (
        <div className="uses-section-marker" aria-hidden="true">
            <span>{number}</span>
            <span>{label}</span>
        </div>
    );
}

export default function UsesPage() {
    const reduceMotion = useReducedMotion();

    return (
        <div className="page-wrapper uses-page">
            <header className="uses-hero">
                <div className="uses-hero-copy">
                    <p className="page-breadcrumb">uses / working-system</p>
                    <p className="uses-eyebrow">A practical setup for thoughtful software</p>
                    <h1>
                        Less stack,
                        <span> more signal.</span>
                    </h1>
                    <p className="uses-hero-description">
                        The tools, habits and boundaries behind my ML experiments,
                        full-stack products and interfaces, from small prototypes to
                        AI systems that need to behave honestly.
                    </p>
                    <a className="uses-hero-action cta-link" href="#uses-workflow">
                        View my workflow
                        <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                </div>

                <div className="uses-hero-meta" aria-label="Current setup status">
                    <div className="uses-hero-meta-topline">
                        <span><i /> current working system</span>
                        <span>2026.08</span>
                    </div>
                    <p>
                        A compact toolchain for turning questions into working software,
                        then checking what the software actually proves.
                    </p>
                    <dl>
                        <div>
                            <dt>Base</dt>
                            <dd>Bengaluru</dd>
                        </div>
                        <div>
                            <dt>Timezone</dt>
                            <dd>UTC +05:30</dd>
                        </div>
                    </dl>
                </div>
            </header>

            <div className="uses-content">
                <Reveal className="uses-intro-grid" reduceMotion={reduceMotion}>
                    <SectionMarker number="01" label="Working principles" />
                    <div>
                        <p className="uses-lead">
                            My setup is intentionally ordinary. The interesting part is
                            how it is combined across my projects: small enough to reason
                            about, strong enough to carry a real workflow.
                        </p>
                        <div className="uses-principles">
                            {principles.map((principle) => (
                                <article key={principle.number} className="uses-principle">
                                    <span>{principle.number}</span>
                                    <div>
                                        <h2>{principle.title}</h2>
                                        <p>{principle.description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </Reveal>

                <Reveal className="uses-workflow-section" reduceMotion={reduceMotion} delay={0.04} id="uses-workflow">
                    <SectionMarker number="02" label="How work moves" />
                    <div className="uses-workflow">
                        <div className="uses-workflow-heading">
                            <div>
                                <Workflow size={18} aria-hidden="true" />
                                <span>From question to release</span>
                            </div>
                            <p>Every project gets a version that can teach me something.</p>
                        </div>
                        <div className="uses-workflow-list">
                            {workflow.map((step) => (
                                <article key={step.number} className="uses-workflow-step">
                                    <div className="uses-workflow-number">{step.number}</div>
                                    <h2>{step.title}</h2>
                                    <p>{step.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </Reveal>

                <section className="uses-tools-section" aria-labelledby="uses-tools-title">
                    <SectionMarker number="03" label="Tools by job" />
                    <div>
                        <div className="uses-tools-heading">
                            <div>
                                <p className="uses-eyebrow">The current kit</p>
                                <h2 id="uses-tools-title">Tools earn their place by <em>doing a job.</em></h2>
                            </div>
                            <p>
                                This is a living list, not a shopping list. React carries the
                                interfaces, Python carries the experiments, and the boundaries
                                between them stay visible.
                            </p>
                        </div>

                        <div className="uses-tool-groups">
                            {toolGroups.map((group, groupIndex) => {
                                const Icon = group.icon;

                                return (
                                    <Reveal
                                        className="uses-tool-group"
                                        key={group.category}
                                        reduceMotion={reduceMotion}
                                        delay={groupIndex * 0.03}
                                    >
                                        <div className="uses-tool-group-header">
                                            <div className="uses-tool-icon"><Icon size={18} aria-hidden="true" /></div>
                                            <div>
                                                <span>{group.number} / {group.category}</span>
                                                <h3>{group.summary}</h3>
                                            </div>
                                        </div>
                                        <ul className="uses-tool-list">
                                            {group.tools.map((tool) => (
                                                <li className="uses-tool" key={tool.name}>
                                                    <div className="uses-tool-name-row">
                                                        {tool.link ? (
                                                            <a href={tool.link} target="_blank" rel="noreferrer" aria-label={`Open ${tool.name} in a new tab`}>
                                                                {tool.name}<ArrowUpRight size={15} aria-hidden="true" />
                                                            </a>
                                                        ) : (
                                                            <h4>{tool.name}</h4>
                                                        )}
                                                        <Check size={15} aria-hidden="true" />
                                                    </div>
                                                    <p>{tool.detail}</p>
                                                    <div className="uses-tool-tags" aria-label={`${tool.name} attributes`}>
                                                        {tool.tags.map((tag) => <span key={tag}>{tag}</span>)}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </Reveal>
                                );
                            })}
                        </div>

                        <p className="uses-closing-note">
                            Tool choices are provisional. Working habits are the durable part.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
