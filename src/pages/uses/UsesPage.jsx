import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    BrainCircuit,
    Check,
    Code2,
    Database,
    Layers3,
    Rocket,
    Terminal,
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
            "Credentials, model limits, fallbacks and incomplete evidence should be part of the product story—not hidden footnotes.",
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
                detail: "Fast iteration for product surfaces, dashboards and this portfolio.",
                tags: ["JSX", "HMR"],
            },
            {
                name: "Vanilla CSS",
                detail: "Custom properties, responsive layouts and deliberate visual systems.",
                tags: ["CSS", "Tokens"],
            },
            {
                name: "Framer Motion",
                detail: "Small, purposeful transitions that support hierarchy and orientation.",
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
                detail: "Data work, audio pipelines, computer vision and practical automation.",
                tags: ["Scripts", "ML"],
            },
            {
                name: "Gemini + Fireworks",
                detail: "Model APIs used behind explicit product boundaries and fallback states.",
                tags: ["AI", "APIs"],
            },
            {
                name: "Pandas + scikit-learn",
                detail: "Chronological experiments with baselines, evaluation and reproducible reports.",
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
                detail: "Simple, inspectable servers for focused tools and same-origin web apps.",
                tags: ["Python", "HTTP"],
            },
            {
                name: "Supabase + Postgres",
                detail: "Data, authentication and realtime primitives where the product needs them.",
                tags: ["SQL", "RLS"],
            },
            {
                name: "FFmpeg",
                detail: "A bounded conversion step for messy real-world audio inputs.",
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
                detail: "Feature branches, reviewable commits, issue context and public project history.",
                tags: ["Git", "Review"],
                link: "https://github.com/icecold009",
            },
            {
                name: "Vercel",
                detail: "The deployment path for the portfolio and selected web applications.",
                tags: ["Deploy", "Web"],
                link: "https://vercel.com",
            },
            {
                name: "Docker + Actions",
                detail: "Portable runtime checks and automated gates when a project earns the extra weight.",
                tags: ["CI", "Runtime"],
            },
        ],
    },
];

const reveal = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

function Reveal({ children, className, delay = 0, reduceMotion }) {
    return (
        <motion.div
            className={className}
            variants={reduceMotion ? undefined : reveal}
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            transition={
                reduceMotion
                    ? undefined
                    : { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }
            }
        >
            {children}
        </motion.div>
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
                        The tools, habits and boundaries behind the things I build—from
                        small interfaces to AI systems that need to behave honestly.
                    </p>
                </div>

                <div className="uses-status-card" aria-label="Current setup status">
                    <div className="uses-status-topline">
                        <span><i /> currently building</span>
                        <span>2026.08</span>
                    </div>
                    <div className="uses-status-mark">S</div>
                    <p>
                        A compact toolchain for shipping full-stack products,
                        testing their edges and documenting what is still unknown.
                    </p>
                    <div className="uses-status-footer">
                        <span>Based in Bengaluru</span>
                        <span>UTC +05:30</span>
                    </div>
                </div>
            </header>

            <main className="uses-content">
                <Reveal className="uses-intro-grid" reduceMotion={reduceMotion}>
                    <div className="uses-section-marker">
                        <span>01</span>
                        <span>Working principles</span>
                    </div>
                    <div>
                        <p className="uses-lead">
                            My setup is intentionally unremarkable. The interesting part is
                            how the pieces are combined: small enough to reason about, strong
                            enough to carry a real workflow.
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

                <Reveal className="uses-workflow-section" reduceMotion={reduceMotion} delay={0.05}>
                    <div className="uses-section-marker">
                        <span>02</span>
                        <span>How work moves</span>
                    </div>
                    <div className="uses-workflow-panel">
                        <div className="uses-workflow-heading">
                            <div>
                                <Workflow size={18} aria-hidden="true" />
                                <span>From question to release</span>
                            </div>
                            <p>Every project gets a smaller first version.</p>
                        </div>
                        <div className="uses-workflow-list">
                            {workflow.map((step, index) => (
                                <article key={step.number} className="uses-workflow-step">
                                    <div className="uses-workflow-number">{step.number}</div>
                                    <div>
                                        <h2>{step.title}</h2>
                                        <p>{step.description}</p>
                                    </div>
                                    {index < workflow.length - 1 && <ArrowUpRight size={17} aria-hidden="true" />}
                                </article>
                            ))}
                        </div>
                    </div>
                </Reveal>

                <section className="uses-tools-section" aria-labelledby="uses-tools-title">
                    <div className="uses-section-marker">
                        <span>03</span>
                        <span>Tools by job</span>
                    </div>
                    <div className="uses-tools-heading">
                        <div>
                            <p className="uses-eyebrow">The current kit</p>
                            <h2 id="uses-tools-title">Tools earn their place by <em>doing a job.</em></h2>
                        </div>
                        <p>
                            This is a living list, not a shopping list. The stack changes when
                            the problem changes.
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
                                    delay={groupIndex * 0.04}
                                >
                                    <div className="uses-tool-group-header">
                                        <div className="uses-tool-icon"><Icon size={19} aria-hidden="true" /></div>
                                        <div>
                                            <span>{group.number} / {group.category}</span>
                                            <h3>{group.summary}</h3>
                                        </div>
                                    </div>
                                    <div className="uses-tool-list">
                                        {group.tools.map((tool) => (
                                            <article className="uses-tool" key={tool.name}>
                                                <div className="uses-tool-name-row">
                                                    {tool.link ? (
                                                        <a href={tool.link} target="_blank" rel="noreferrer">
                                                            {tool.name}<ArrowUpRight size={15} aria-hidden="true" />
                                                        </a>
                                                    ) : (
                                                        <h4>{tool.name}</h4>
                                                    )}
                                                    <Check size={15} aria-hidden="true" />
                                                </div>
                                                <p>{tool.detail}</p>
                                                <div className="uses-tool-tags">
                                                    {tool.tags.map((tag) => <span key={tag}>{tag}</span>)}
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </section>

                <Reveal className="uses-terminal-note" reduceMotion={reduceMotion} delay={0.08}>
                    <div className="uses-terminal-heading">
                        <Terminal size={18} aria-hidden="true" />
                        <span>setup-note.md</span>
                    </div>
                    <div className="uses-terminal-body">
                        <p><span>$</span> git status --short --branch</p>
                        <p className="uses-terminal-success">feature/work-in-progress · clean enough to share</p>
                        <p><span>$</span> echo $NEXT_STEP</p>
                        <p>make the evidence easier to inspect.</p>
                    </div>
                    <div className="uses-terminal-footer">
                        <Layers3 size={16} aria-hidden="true" />
                        <span>Tool choices are provisional. Working habits are the durable part.</span>
                    </div>
                </Reveal>
            </main>
        </div>
    );
}
