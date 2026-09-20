import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import Hero from "../../components/Hero";
import GitHubContributions from "../../components/GitHubContributions";
import { projects } from "../../data/projects";
import {
    REVEAL,
    REVEAL_CONTAINER,
    REVEAL_VIEWPORT,
} from "../../lib/motion";
import { positioningStatement } from "../../lib/profileLinks";
import { academicProfile, audienceLenses, availability } from "../../data/profile";
import { getAudienceLens, getLensProjects } from "../../lib/audienceLens";
import { getProjectProofLabel } from "../../lib/projectEvidence";
import { formatPostDate, posts } from "../../posts";

import "./Home.css";

const writingSlugs = ["shazam-clone", "shipping-is-a-design-decision"];

export default function Home() {
    const shouldReduceMotion = useReducedMotion();
    const [searchParams, setSearchParams] = useSearchParams();
    const lensTabRefs = useRef({});
    const requestedLens = searchParams.get("lens");
    const activeLens = getAudienceLens(audienceLenses, requestedLens, "admissions");
    const lensProjects = getLensProjects(activeLens, projects);
    const writing = writingSlugs
        .map((slug) => posts.find((post) => post.slug === slug))
        .filter(Boolean);

    const setActiveLens = (lensId, shouldFocus = false) => {
        const next = new URLSearchParams(searchParams);
        next.set("lens", lensId);
        setSearchParams(next, { replace: true });

        if (shouldFocus) {
            window.requestAnimationFrame(() => lensTabRefs.current[lensId]?.focus());
        }
    };

    const handleLensKeyDown = (event) => {
        const currentIndex = audienceLenses.findIndex((lens) => lens.id === activeLens?.id);

        if (currentIndex < 0 || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
            return;
        }

        event.preventDefault();
        const nextIndex = event.key === "Home"
            ? 0
            : event.key === "End"
                ? audienceLenses.length - 1
                : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + audienceLenses.length) % audienceLenses.length;

        setActiveLens(audienceLenses[nextIndex].id, true);
    };

    return (
        <div className="home-page">
            <Hero />

            <motion.section
                className="home-section home-section--work"
                aria-labelledby="home-work-title"
                variants={shouldReduceMotion ? undefined : REVEAL_CONTAINER}
                initial={shouldReduceMotion ? undefined : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={REVEAL_VIEWPORT}
            >
                <motion.div
                    className="home-section__heading"
                    variants={shouldReduceMotion ? undefined : REVEAL}
                >
                    <div>
                        <p className="home-kicker">Selected work / choose a lens</p>
                        <h2 id="home-work-title">Explore the work <em>your way.</em></h2>
                    </div>
                    <Link className="home-text-link cta-link" to="/projects">
                        View all projects <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                </motion.div>

                <motion.div
                    className="home-lens-explorer"
                    variants={shouldReduceMotion ? undefined : REVEAL}
                >
                    <div className="home-lens-tabs" role="tablist" aria-label="Choose how to explore the portfolio" onKeyDown={handleLensKeyDown}>
                        {audienceLenses.map((lens) => (
                            <button
                                key={lens.id}
                                ref={(element) => {
                                    if (element) {
                                        lensTabRefs.current[lens.id] = element;
                                    }
                                }}
                                type="button"
                                className={`home-lens-tab ${activeLens?.id === lens.id ? "home-lens-tab--active" : ""}`}
                                id={`home-lens-tab-${lens.id}`}
                                role="tab"
                                aria-selected={activeLens?.id === lens.id}
                                aria-controls="home-lens-panel"
                                tabIndex={activeLens?.id === lens.id ? 0 : -1}
                                onClick={() => setActiveLens(lens.id)}
                            >
                                <span>{lens.label}</span>
                                <ArrowUpRight size={15} aria-hidden="true" />
                            </button>
                        ))}
                    </div>

                    <div
                        className="home-lens-panel"
                        id="home-lens-panel"
                        role="tabpanel"
                        aria-labelledby={`home-lens-tab-${activeLens?.id}`}
                        aria-live="polite"
                    >
                        <div className="home-lens-panel__copy">
                            <p className="home-kicker">{activeLens?.kicker}</p>
                            <h3>{activeLens?.title}</h3>
                            <p>{activeLens?.description}</p>
                            <Link className="home-text-link cta-link" to={activeLens?.actionTo ?? "/projects"}>
                                {activeLens?.actionLabel} <ArrowUpRight size={16} aria-hidden="true" />
                            </Link>
                        </div>

                        <div className="home-lens-projects" aria-label={`${activeLens?.label} project trail`}>
                            {lensProjects.map((project) => (
                                <Link className="home-lens-project" to={`/projects?project=${project.id}`} key={project.id}>
                                    <span className="home-lens-project__number">{project.number}</span>
                                    <span className="home-lens-project__body">
                                        <strong>{project.title}</strong>
                                        <small>{getProjectProofLabel(project)}</small>
                                    </span>
                                    <ArrowUpRight size={17} aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.section>

            <motion.section
                className="home-section home-section--profile"
                aria-labelledby="home-profile-title"
                variants={shouldReduceMotion ? undefined : REVEAL_CONTAINER}
                initial={shouldReduceMotion ? undefined : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={REVEAL_VIEWPORT}
            >
                <motion.div
                    className="home-section__heading"
                    variants={shouldReduceMotion ? undefined : REVEAL}
                >
                    <div>
                        <p className="home-kicker">A little context</p>
                        <h2 id="home-profile-title">Technical range, <em>human scale.</em></h2>
                    </div>
                </motion.div>
                <motion.div
                    className="home-profile-grid"
                    variants={shouldReduceMotion ? undefined : REVEAL}
                >
                    <p className="home-profile-lead">
                        {positioningStatement}
                    </p>
                    <div className="home-profile-facts">
                        <div><span>School and stage</span><strong>{academicProfile.school} · {academicProfile.expectedGraduation}</strong></div>
                        <div><span>Based in</span><strong>{academicProfile.location}</strong></div>
                        <div><span>Working across</span><strong>ML experiments, full-stack products, and interfaces</strong></div>
                        <div><span>Open to</span><strong>{availability.detail}</strong></div>
                    </div>
                </motion.div>
                <motion.div variants={shouldReduceMotion ? undefined : REVEAL}>
                    <Link className="home-text-link cta-link" to="/about">Read my story <ArrowUpRight size={16} aria-hidden="true" /></Link>
                </motion.div>
            </motion.section>

            <motion.section
                className="home-section home-section--paths"
                aria-labelledby="home-paths-title"
                variants={shouldReduceMotion ? undefined : REVEAL_CONTAINER}
                initial={shouldReduceMotion ? undefined : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={REVEAL_VIEWPORT}
            >
                <motion.div className="home-section__heading" variants={shouldReduceMotion ? undefined : REVEAL}>
                    <div>
                        <p className="home-kicker">Choose a path</p>
                        <h2 id="home-paths-title">Start with the <em>right context.</em></h2>
                    </div>
                </motion.div>
                <div className="home-path-grid">
                    <motion.div className="home-path-card" variants={shouldReduceMotion ? undefined : REVEAL}>
                        <span>For admissions and research</span>
                        <h3>See the academic profile, selected evidence, and the thinking behind the work.</h3>
                        <Link className="home-text-link cta-link" to="/achievements">View the admissions snapshot <ArrowUpRight size={16} aria-hidden="true" /></Link>
                    </motion.div>
                    <motion.div className="home-path-card" variants={shouldReduceMotion ? undefined : REVEAL}>
                        <span>For founders and collaborators</span>
                        <h3>See what a focused website, data interface, or AI prototype can become.</h3>
                        <Link className="home-text-link cta-link" to="/work-with-me">Explore working together <ArrowUpRight size={16} aria-hidden="true" /></Link>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                className="home-section home-section--writing"
                aria-labelledby="home-writing-title"
                variants={shouldReduceMotion ? undefined : REVEAL_CONTAINER}
                initial={shouldReduceMotion ? undefined : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={REVEAL_VIEWPORT}
            >
                <motion.div
                    className="home-section__heading"
                    variants={shouldReduceMotion ? undefined : REVEAL}
                >
                    <div>
                        <p className="home-kicker">Writing / 02 selected notes</p>
                        <h2 id="home-writing-title">Notes from the <em>workbench.</em></h2>
                    </div>
                    <Link className="home-text-link cta-link" to="/blog">Read all notes <ArrowUpRight size={16} aria-hidden="true" /></Link>
                </motion.div>
                <motion.div
                    className="home-writing-list"
                    variants={shouldReduceMotion ? undefined : REVEAL_CONTAINER}
                >
                    {writing.map((post) => (
                        <motion.div
                            key={post.slug}
                            variants={shouldReduceMotion ? undefined : REVEAL}
                        >
                            <Link className="home-writing-item" to={`/blog/${post.slug}`}>
                                <div>
                                    <span>{post.tag}</span>
                                    <h3>{post.title}</h3>
                                </div>
                                <div className="home-writing-meta">
                                    <span>{formatPostDate(post.date)}</span>
                                    <ArrowUpRight size={17} aria-hidden="true" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            <GitHubContributions />
        </div>
    );
}
