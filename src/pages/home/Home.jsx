import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import Hero from "../../components/Hero";
import GitHubContributions from "../../components/GitHubContributions";
import { projects } from "../../data/projects";
import {
    REVEAL,
    REVEAL_CONTAINER,
    REVEAL_VIEWPORT,
} from "../../lib/motion";
import { positioningStatement } from "../../lib/profileLinks";
import { formatPostDate, posts } from "../../posts";

import "./Home.css";

const featuredProjectNumbers = ["01", "02", "06"];
const featuredProjects = projects.filter((project) =>
    featuredProjectNumbers.includes(project.number)
);

const writingSlugs = ["shazam-clone", "shipping-is-a-design-decision"];

export default function Home() {
    const shouldReduceMotion = useReducedMotion();
    const writing = writingSlugs
        .map((slug) => posts.find((post) => post.slug === slug))
        .filter(Boolean);

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
                        <p className="home-kicker">Selected work / 03</p>
                        <h2 id="home-work-title">Built to make hard things <em>clearer.</em></h2>
                    </div>
                    <Link className="home-text-link cta-link" to="/projects">
                        View all projects <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                </motion.div>

                <motion.div
                    className="home-project-list"
                    variants={shouldReduceMotion ? undefined : REVEAL_CONTAINER}
                >
                    {featuredProjects.map((project) => (
                        <motion.article
                            className="home-project-card"
                            key={project.title}
                            variants={shouldReduceMotion ? undefined : REVEAL}
                        >
                            <div className={`home-project-card__visual home-project-card__visual--${project.number}`}>
                                <img src={project.thumbnail} alt={project.thumbnailAlt ?? `${project.title} project preview`} loading="lazy" decoding="async" />
                            </div>
                            <div className="home-project-card__body">
                                <div className="home-project-card__meta">
                                    <span>{project.number}</span>
                                    <span>{project.homeCategory ?? project.category}</span>
                                </div>
                                <h3>{project.title}</h3>
                                <p>{project.summary ?? project.description}</p>
                                <div className="home-project-card__footer">
                                    <span>{project.status}</span>
                                    <Link className="cta-link" to={`/projects#project-detail-${project.number}`} aria-label={`Open the ${project.title} project overview`}>
                                        View project <ArrowUpRight size={16} aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
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
                        <div><span>Based in</span><strong>Bengaluru, India</strong></div>
                        <div><span>Working across</span><strong>ML experiments, full-stack products, and interfaces</strong></div>
                        <div><span>Open to</span><strong>Internships, research, and thoughtful collaborations</strong></div>
                    </div>
                </motion.div>
                <motion.div variants={shouldReduceMotion ? undefined : REVEAL}>
                    <Link className="home-text-link cta-link" to="/about">Read my story <ArrowUpRight size={16} aria-hidden="true" /></Link>
                </motion.div>
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
                        <p className="home-kicker">Writing / 02</p>
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
