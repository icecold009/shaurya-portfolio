import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import Hero from "../../components/Hero";
import PortfolioTour from "../../components/PortfolioTour";
import SkillsProjectExplorer from "../../components/SkillsProjectExplorer";
import GitHubContributions from "../../components/GitHubContributions";
import { artworkPieces } from "../../data/artwork";
import { projects } from "../../data/projects";
import { audienceLenses } from "../../data/profile";
import {
    getInteractionTransition,
    INTERACTION_OFFSET,
    REVEAL,
    REVEAL_CONTAINER,
    REVEAL_VIEWPORT,
} from "../../lib/motion";
import { getAudienceLens, getLensProjects } from "../../lib/audienceLens";
import { getProjectProofLabel } from "../../lib/projectEvidence";
import { formatPostDate, posts } from "../../posts";

import "./Home.css";

const writingSlugs = ["shazam-clone", "shipping-is-a-design-decision"];
const lablabHackathons = [
    "AMD Developer Hackathon: ACT II",
    "Alpaca AI Trading Agents Hackathon",
    "IBM Bob 2.0 Hackathon",
];
const curatedProjectIds = ["past-paper-ai", "f1-championship-prediction", "audio-recognition"];
const homeProjectFindings = {
    "past-paper-ai": "A focused practice flow built around a supported question set, topic filters, and mark-scheme-aware feedback.",
    "f1-championship-prediction": "Across ten untouched test seasons (2016-2025), the previous-season-order baseline had lower mean RMSE than Random Forest: 3.728 vs 5.982.",
    "audio-recognition": "One source-linked app handles microphone and file input with normalized matches and clear no-match states.",
};
const curatedProjects = curatedProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean);
const featuredArtwork = artworkPieces.find((piece) => piece.id === "piece-09");

export default function Home() {
    const shouldReduceMotion = useReducedMotion();
    const [searchParams, setSearchParams] = useSearchParams();
    const [animateLensChange, setAnimateLensChange] = useState(false);
    const [isExploreOpen, setIsExploreOpen] = useState(() => Boolean(searchParams.get("lens")));
    const lensTabRefs = useRef({});
    const requestedLens = searchParams.get("lens");
    const activeLens = getAudienceLens(audienceLenses, requestedLens, "admissions");
    const lensProjects = getLensProjects(activeLens, projects);
    const writing = writingSlugs
        .map((slug) => posts.find((post) => post.slug === slug))
        .filter(Boolean);

    useEffect(() => {
        if (requestedLens) {
            setIsExploreOpen(true);
        }
    }, [requestedLens]);

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

        setAnimateLensChange(false);
        setActiveLens(audienceLenses[nextIndex].id, true);
    };

    return (
        <div className="home-page">
            <Hero />

            <motion.section
                className="home-section home-section--hackathons"
                id="home-hackathons"
                aria-labelledby="home-hackathons-title"
                variants={shouldReduceMotion ? undefined : REVEAL_CONTAINER}
                initial={shouldReduceMotion ? undefined : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={REVEAL_VIEWPORT}
            >
                <motion.div className="home-section__heading home-hackathon-heading" variants={shouldReduceMotion ? undefined : REVEAL}>
                    <div>
                        <p className="home-kicker">Featured certificates / lablab.ai</p>
                        <h2 id="home-hackathons-title">Three AI <em>hackathons.</em></h2>
                    </div>
                    <p className="home-section__intro">
                        Three lablab.ai hackathon completion certificates, collected in one place.
                    </p>
                </motion.div>

                <motion.ul
                    className="home-hackathon-list"
                    aria-label="Featured lablab.ai hackathon completion certificates"
                    variants={shouldReduceMotion ? undefined : REVEAL_CONTAINER}
                >
                    {lablabHackathons.map((title, index) => (
                        <motion.li
                            className="home-hackathon-item"
                            key={title}
                            variants={shouldReduceMotion ? undefined : REVEAL}
                        >
                            <span className="home-hackathon-item__index" aria-hidden="true">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="home-hackathon-item__copy">
                                <strong>{title}</strong>
                                <small>lablab.ai · completion certificate</small>
                            </span>
                        </motion.li>
                    ))}
                </motion.ul>

                <motion.div variants={shouldReduceMotion ? undefined : REVEAL}>
                    <Link className="home-hackathon-cta cta-link" to="/certificates">
                        Browse all certificates <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                </motion.div>
            </motion.section>

            <motion.section
                className="home-section home-section--curated"
                id="home-selected-work"
                aria-labelledby="home-selected-work-title"
                variants={shouldReduceMotion ? undefined : REVEAL_CONTAINER}
                initial={shouldReduceMotion ? undefined : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={REVEAL_VIEWPORT}
            >
                <motion.div className="home-section__heading" variants={shouldReduceMotion ? undefined : REVEAL}>
                    <div>
                        <p className="home-kicker">Selected work / product · research · prototype</p>
                        <h2 id="home-selected-work-title">Three questions, <em>three approaches.</em></h2>
                    </div>
                    <p className="home-section__intro">
                        A focused study tool, a forecasting benchmark, and an audio-matching prototype.
                    </p>
                </motion.div>

                <div className="home-curated-grid">
                    {curatedProjects.map((project) => (
                        <motion.article
                            className={"home-curated-card home-curated-card--" + project.id}
                            key={project.id}
                            aria-labelledby={"home-project-title-" + project.id}
                            variants={shouldReduceMotion ? undefined : REVEAL}
                        >
                            <Link
                                className="home-curated-card__visual"
                                to={"/projects?project=" + project.id}
                                aria-label={"Open " + project.title + " project details"}
                            >
                                <img
                                    src={project.thumbnail}
                                    alt={project.thumbnailAlt}
                                    style={project.thumbnailFit ? { objectFit: project.thumbnailFit } : undefined}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </Link>
                            <div className="home-curated-card__body">
                                <div className="home-curated-card__meta">
                                    <span>{project.category}</span>
                                    <span>{project.year} · {getProjectProofLabel(project)}</span>
                                </div>
                                <h3 id={"home-project-title-" + project.id}>{project.title}</h3>
                                <p>{project.description}</p>
                                <p className="home-curated-card__finding">
                                    <strong>{project.id === "f1-championship-prediction" ? "Finding" : "In practice"}</strong>
                                    {homeProjectFindings[project.id] || project.outcome}
                                </p>
                                <p className="home-curated-card__boundary">
                                    <strong>Boundary</strong>
                                    {project.limitations}
                                </p>
                                <Link className="home-text-link home-curated-card__link cta-link" to={"/projects?project=" + project.id}>
                                    Read project details <ArrowUpRight size={16} aria-hidden="true" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </motion.section>

            <details
                className="home-exploration"
                open={isExploreOpen}
                onToggle={(event) => setIsExploreOpen(event.currentTarget.open)}
            >
                <summary className="home-exploration__summary" aria-controls="home-exploration-content">
                    <span>
                        <span className="home-kicker">More ways into the work</span>
                        <strong>Explore by audience, skill, or guided tour</strong>
                    </span>
                    <ChevronDown size={22} aria-hidden="true" />
                </summary>

                <div className="home-exploration__content" id="home-exploration-content">
                    <motion.section
                        className="home-section home-section--lens"
                        aria-labelledby="home-work-title"
                    >
                        <motion.div className="home-section__heading">
                            <div>
                                <p className="home-kicker">Selected work / choose a lens</p>
                                <h2 id="home-work-title">Explore the work <em>your way.</em></h2>
                            </div>
                            <Link className="home-text-link cta-link" to="/projects">
                                View all projects <ArrowUpRight size={16} aria-hidden="true" />
                            </Link>
                        </motion.div>

                        <div className="home-lens-explorer">
                            <div
                                className="home-lens-tabs"
                                role="tablist"
                                aria-label="Choose how to explore the portfolio"
                                onKeyDown={handleLensKeyDown}
                            >
                                {audienceLenses.map((lens) => (
                                    <button
                                        key={lens.id}
                                        ref={(element) => {
                                            lensTabRefs.current[lens.id] = element;
                                        }}
                                        id={"home-lens-tab-" + lens.id}
                                        className={"home-lens-tab" + (activeLens?.id === lens.id ? " home-lens-tab--active" : "")}
                                        role="tab"
                                        type="button"
                                        aria-selected={activeLens?.id === lens.id}
                                        aria-controls="home-lens-panel"
                                        tabIndex={activeLens?.id === lens.id ? 0 : -1}
                                        onFocus={() => {
                                            setAnimateLensChange(false);
                                            setActiveLens(lens.id);
                                        }}
                                        onClick={(event) => {
                                            const shouldAnimate = !shouldReduceMotion && event.detail > 0;
                                            setAnimateLensChange(shouldAnimate && activeLens?.id !== lens.id);
                                            setActiveLens(lens.id);
                                        }}
                                    >
                                        {activeLens?.id === lens.id ? (
                                            <motion.span
                                                className="home-lens-tab-indicator"
                                                aria-hidden="true"
                                                layoutId="home-lens-tab-indicator"
                                                transition={getInteractionTransition(animateLensChange)}
                                            />
                                        ) : null}
                                        <span>{lens.label}</span>
                                        <ArrowUpRight size={15} aria-hidden="true" />
                                    </button>
                                ))}
                            </div>

                            <motion.div
                                key={activeLens?.id}
                                className="home-lens-panel"
                                id="home-lens-panel"
                                role="tabpanel"
                                aria-labelledby={"home-lens-tab-" + activeLens?.id}
                                aria-live="polite"
                                initial={animateLensChange ? {
                                    opacity: 0,
                                    transform: "translateY(" + INTERACTION_OFFSET + "px)",
                                } : false}
                                animate={{ opacity: 1, transform: "translateY(0px)" }}
                                transition={getInteractionTransition(animateLensChange)}
                            >
                                <div className="home-lens-panel__copy">
                                    <p className="home-kicker">{activeLens?.kicker}</p>
                                    <h3>{activeLens?.title}</h3>
                                    <p>{activeLens?.description}</p>
                                    <Link className="home-text-link cta-link" to={activeLens?.actionTo ?? "/projects"}>
                                        {activeLens?.actionLabel} <ArrowUpRight size={16} aria-hidden="true" />
                                    </Link>
                                </div>

                                <div className="home-lens-projects" aria-label={activeLens?.label + " project trail"}>
                                    {lensProjects.map((project) => (
                                        <Link className="home-lens-project" to={"/projects?project=" + project.id} key={project.id}>
                                            <span className="home-lens-project__number">{project.number}</span>
                                            <span className="home-lens-project__body">
                                                <strong>{project.title}</strong>
                                                <small>{getProjectProofLabel(project)}</small>
                                            </span>
                                            <ArrowUpRight size={17} aria-hidden="true" />
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.section>

                    <PortfolioTour />

                    <motion.section
                        className="home-section home-section--skills"
                        aria-labelledby="home-skills-title"
                    >
                        <motion.div className="home-section__heading">
                            <div>
                                <p className="home-kicker">Skills / linked to project evidence</p>
                                <h2 id="home-skills-title">Follow a skill into the work.</h2>
                            </div>
                            <p className="home-section__intro">
                                Choose a topic to surface the projects, outcomes, and boundaries behind it.
                            </p>
                        </motion.div>
                        <SkillsProjectExplorer />
                    </motion.section>

                    <GitHubContributions />
                </div>
            </details>

            <section
                className="home-section home-section--interlude"
                aria-labelledby="home-interlude-title"
            >
                <div className="home-interlude__layout">
                    <div className="home-interlude__visuals">
                        <figure className="home-interlude__portrait">
                            <img
                                src="/images/shaurya-portrait.jpeg"
                                alt="Portrait of Shaurya Saria."
                                loading="lazy"
                                decoding="async"
                            />
                            <figcaption>Shaurya · Bengaluru</figcaption>
                        </figure>
                        {featuredArtwork ? (
                            <figure className="home-interlude__art">
                                <img
                                    src={featuredArtwork.src}
                                    alt={"Original pencil-shaded artwork: " + featuredArtwork.title + "."}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <figcaption>{featuredArtwork.title} · {featuredArtwork.medium}</figcaption>
                            </figure>
                        ) : null}
                    </div>

                    <div className="home-interlude__copy">
                        <p className="home-kicker">Outside the interface</p>
                        <h2 id="home-interlude-title">A different kind of <em>making.</em></h2>
                        <p>
                            My original drawings and paintings sit alongside the software projects. This pencil-shaded leopard study is one of them.
                        </p>
                        <Link className="home-text-link cta-link" to="/artwork">
                            See the artwork archive <ArrowUpRight size={16} aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>

            <motion.section
                className="home-section home-section--writing"
                aria-labelledby="home-writing-title"
                variants={shouldReduceMotion ? undefined : REVEAL_CONTAINER}
                initial={shouldReduceMotion ? undefined : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={REVEAL_VIEWPORT}
            >
                <motion.div className="home-section__heading" variants={shouldReduceMotion ? undefined : REVEAL}>
                    <div>
                        <p className="home-kicker">Writing / 02 selected notes</p>
                        <h2 id="home-writing-title">Notes from the <em>workbench.</em></h2>
                    </div>
                    <Link className="home-text-link cta-link" to="/blog">
                        Read all notes <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                </motion.div>

                <motion.div
                    className="home-writing-list"
                    variants={shouldReduceMotion ? undefined : REVEAL_CONTAINER}
                >
                    {writing.map((post) => (
                        <motion.div key={post.slug} variants={shouldReduceMotion ? undefined : REVEAL}>
                            <Link className="home-writing-item" to={"/blog/" + post.slug}>
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
        </div>
    );
}
