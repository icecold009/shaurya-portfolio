import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import Hero from "../../components/Hero";
import { projects } from "../../data/projects";
import { formatPostDate, posts } from "../../posts";

import "./Home.css";

const featuredProjectNumbers = ["01", "02", "06"];
const featuredProjects = projects.filter((project) =>
    featuredProjectNumbers.includes(project.number)
);

const writingSlugs = ["shazam-clone", "shipping-is-a-design-decision"];

export default function Home() {
    const writing = writingSlugs
        .map((slug) => posts.find((post) => post.slug === slug))
        .filter(Boolean);

    return (
        <div className="home-page">
            <Hero />

            <section className="home-section home-section--work" aria-labelledby="home-work-title">
                <div className="home-section__heading">
                    <div>
                        <p className="home-kicker">Selected work / 03</p>
                        <h2 id="home-work-title">Built to make hard things <em>clearer.</em></h2>
                    </div>
                    <Link className="home-text-link" to="/projects">
                        See all work <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                </div>

                <div className="home-project-list">
                    {featuredProjects.map((project) => (
                        <article className="home-project-card" key={project.title}>
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
                                    <Link to={`/projects#project-detail-${project.number}`} aria-label={`Read the ${project.title} case study`}>
                                        Read case study <ArrowUpRight size={16} aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="home-section home-section--profile" aria-labelledby="home-profile-title">
                <div className="home-section__heading">
                    <div>
                        <p className="home-kicker">A little context</p>
                        <h2 id="home-profile-title">Technical range, <em>human scale.</em></h2>
                    </div>
                </div>
                <div className="home-profile-grid">
                    <p className="home-profile-lead">
                        I like working where engineering, design, and problem-solving overlap, especially when the problem is still a little undefined.
                    </p>
                    <div className="home-profile-facts">
                        <div><span>Based in</span><strong>Bengaluru, India</strong></div>
                        <div><span>Working across</span><strong>ML experiments, full-stack products, and interfaces</strong></div>
                        <div><span>Open to</span><strong>Internships, research, and thoughtful collaborations</strong></div>
                    </div>
                </div>
                <Link className="home-text-link" to="/about">More about me <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </section>

            <section className="home-section home-section--writing" aria-labelledby="home-writing-title">
                <div className="home-section__heading">
                    <div>
                        <p className="home-kicker">Writing / 02</p>
                        <h2 id="home-writing-title">Notes from the <em>workbench.</em></h2>
                    </div>
                    <Link className="home-text-link" to="/blog">Read all notes <ArrowUpRight size={16} aria-hidden="true" /></Link>
                </div>
                <div className="home-writing-list">
                    {writing.map((post) => (
                        <Link className="home-writing-item" to={`/blog?post=${post.slug}`} key={post.slug}>
                            <div>
                                <span>{post.tag}</span>
                                <h3>{post.title}</h3>
                            </div>
                            <div className="home-writing-meta">
                                <span>{formatPostDate(post.date)}</span>
                                <ArrowUpRight size={17} aria-hidden="true" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
