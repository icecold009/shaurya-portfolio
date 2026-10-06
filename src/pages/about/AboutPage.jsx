import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

import ProjectTechnologyTag from "../../components/ProjectTechnologyTag";
import { projects } from "../../data/projects";
import { academicProfile, availability } from "../../data/profile";
import { profileLinks } from "../../lib/profileLinks";

import "./AboutPage.css";

const featuredProjectIds = [
    "stadium-pulse-ai",
    "f1-championship-prediction",
    "movie-tracker",
];

const featuredProjectCopy = {
    "stadium-pulse-ai":
        "A simulated operations prototype that keeps alert context close to the next action.",
    "f1-championship-prediction":
        "A leakage-safe forecasting study measured against a previous-season baseline.",
    "movie-tracker":
        "A watchlist and recommendation product with a transparent, inspectable baseline.",
};

const featuredProjects = featuredProjectIds
    .map((projectId) => projects.find((project) => project.id === projectId))
    .filter(Boolean);

const experience = [
    {
        date: "Jun 2025–present",
        organization: "Mathematics Club, Vidyashilp Academy",
        role: "President and co-founder",
        detail:
            "Grew the club from 3 to 20+ active members, led problem-solving sessions, and coordinated IOQM and AMC preparation.",
    },
    {
        date: "May 2025 · 2 days",
        organization: "National Sports Club of India",
        role: "Art workshop mentor and organiser",
        detail:
            "Coordinated participant materials and guided students through creative exercises in visual communication.",
    },
    {
        date: "Apr 2025 · 3 weeks",
        organization: "Infinitea",
        role: "Data analytics intern",
        detail:
            "Analysed ordering and weekly sales reports to identify peak hours and best-selling items for inventory planning.",
    },
    {
        date: "Apr 2024 · 4 weeks",
        organization: "Vivek Agro Foods",
        role: "Graphic design and market research intern",
        detail:
            "Created marketing materials and researched grain types, customers, and competitors.",
    },
];

const principles = [
    {
        number: "01",
        title: "Name the job",
        description:
            "Start with a clear user, a useful question, and the next step the product should make possible.",
    },
    {
        number: "02",
        title: "Show the reasoning",
        description:
            "Keep evidence, baselines, fallbacks, and limitations visible in the experience.",
    },
    {
        number: "03",
        title: "Finish one useful loop",
        description:
            "Make a focused path work end to end before growing the feature list.",
    },
];

const aboutLinks = profileLinks.filter((link) =>
    ["github", "kaggle", "linkedin", "email"].includes(link.key),
);

export default function AboutPage() {
    return (
        <div className="page-wrapper about-page-shell">
            <div className="about-page">
                <section className="about-hero" aria-labelledby="about-title">
                    <div className="about-hero__copy">
                        <p className="about-hero__location">
                            <MapPin size={16} aria-hidden="true" />
                            {academicProfile.location}
                        </p>

                        <p className="about-eyebrow">A little about how I work</p>

                        <h1 id="about-title">
                            I build to find out{" "}
                            <em>what an idea can do.</em>
                        </h1>

                        <p className="about-hero__intro">
                            I’m Shaurya, a student developer building <strong>web
                            products</strong> and <strong>applied machine-learning projects.</strong> I
                            care about whether people can understand what the
                            software is doing, not only whether it runs.
                        </p>

                        <div className="about-hero__actions">
                            <Link
                                className="about-button about-button--primary"
                                to="/projects"
                            >
                                Explore selected work
                                <ArrowRight size={18} aria-hidden="true" />
                            </Link>

                            <a
                                className="about-button about-button--secondary"
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open résumé PDF in a new tab"
                            >
                                Read my résumé
                                <ArrowUpRight size={17} aria-hidden="true" />
                            </a>
                        </div>

                        <ul className="about-hero__focus" aria-label="Areas of interest">
                            <li>Full-stack products</li>
                            <li>Applied ML</li>
                            <li>Data interfaces</li>
                        </ul>
                    </div>

                    <figure className="about-portrait">
                        <div className="about-portrait__frame">
                            <img
                                src="/images/shaurya-portrait.jpeg"
                                alt="Portrait of Shaurya Saria wearing glasses and a grey shirt."
                                fetchPriority="high"
                                decoding="async"
                            />
                            <span className="about-portrait__label">
                                BENGALURU, INDIA
                            </span>
                        </div>

                        <figcaption>
                            <span>
                                <strong>Shaurya Saria</strong>
                                <small>Student developer</small>
                            </span>
                            <span className="about-portrait__availability">
                                {availability.headline}
                            </span>
                        </figcaption>
                    </figure>
                </section>

                <nav className="about-jumpbar" aria-label="About page sections">
                    <span>On this page</span>
                    <a href="#story">The throughline</a>
                    <a href="#selected-work">Selected work</a>
                    <a href="#background">Learning and experience</a>
                    <a href="#approach">How I work</a>
                    <a href="#elsewhere">Elsewhere</a>
                </nav>

                <section
                    className="about-section about-story"
                    id="story"
                    aria-labelledby="about-story-title"
                >
                    <header className="about-section__heading">
                        <p className="about-section__eyebrow">
                            <span>01</span> The throughline
                        </p>
                        <h2 id="about-story-title">
                            I like the questions that sit between{" "}
                            <em>data and people.</em>
                        </h2>
                    </header>

                    <div className="about-story__body">
                        <p className="about-story__lead">
                            How do you know a forecast is useful? What would
                            make revision easier to navigate? What does someone
                            need to understand before choosing what to do next?
                        </p>

                        <div>
                            <p>
                                Those questions lead me across very different
                                projects: F1 forecasting, Cambridge study
                                tools, and full-stack products. I like moving
                                between the system underneath and the person
                                who has to use it.
                            </p>
                            <p>
                                The common thread is clarity. I try to make the
                                important choices visible: the baseline behind
                                a prediction, the limits of a prototype, and
                                the next useful action.
                            </p>
                        </div>
                    </div>
                </section>

                <section
                    className="about-section"
                    id="selected-work"
                    aria-labelledby="about-work-title"
                >
                    <header className="about-section__heading about-section__heading--row">
                        <div>
                            <p className="about-section__eyebrow">
                                <span>02</span> Proof in progress
                            </p>
                            <h2 id="about-work-title">
                                A few things I’ve been{" "}
                                <em>learning by building.</em>
                            </h2>
                        </div>

                        <Link className="about-text-link" to="/projects">
                            Browse all projects
                            <ArrowRight size={17} aria-hidden="true" />
                        </Link>
                    </header>

                    <div className="about-work-grid">
                        {featuredProjects.map((project) => (
                            <Link
                                className="about-work-card"
                                key={project.id}
                                to={"/projects?project=" + project.id}
                            >
                                <div className="about-work-card__visual">
                                    <img
                                        className={
                                            project.thumbnailFit === "contain"
                                                ? "about-work-card__image about-work-card__image--contained"
                                                : "about-work-card__image"
                                        }
                                        src={project.thumbnail}
                                        alt={
                                            project.thumbnailAlt ||
                                            project.title + " project preview"
                                        }
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>

                                <div className="about-work-card__body">
                                    <p className="about-work-card__meta">
                                        {project.year}
                                        <span aria-hidden="true">·</span>
                                        {project.status}
                                    </p>
                                    <h3>{project.title}</h3>
                                    <p className="about-work-card__description">
                                        {featuredProjectCopy[project.id]}
                                    </p>
                                    <ul
                                        className="about-work-card__stack"
                                    >
                                        {project.stack.slice(0, 4).map((technology) => (
                                            <li key={technology}>
                                                <ProjectTechnologyTag technology={technology} compact />
                                            </li>
                                        ))}
                                    </ul>
                                    <span className="about-work-card__action">
                                        Open project details
                                        <ArrowUpRight size={16} aria-hidden="true" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section
                    className="about-section"
                    id="background"
                    aria-labelledby="about-background-title"
                >
                    <header className="about-section__heading">
                        <p className="about-section__eyebrow">
                            <span>03</span> Learning and experience
                        </p>
                        <h2 id="about-background-title">
                            Still studying.{" "}
                            <em>Already putting ideas to work.</em>
                        </h2>
                    </header>

                    <div className="about-background">
                        <article className="about-education">
                            <p className="about-card-label">STUDYING NOW</p>
                            <h3>{academicProfile.school}</h3>
                            <p className="about-education__course">
                                {academicProfile.curriculum}
                            </p>
                            <p className="about-education__graduation">
                                Expected graduation ·{" "}
                                {academicProfile.expectedGraduation}
                            </p>

                            <div
                                className="about-education__subjects"
                                aria-label="Subjects"
                            >
                                {academicProfile.focus.map((subject) => (
                                    <span key={subject}>{subject}</span>
                                ))}
                            </div>

                            <Link className="about-text-link" to="/achievements">
                                Academic and community record
                                <ArrowRight size={17} aria-hidden="true" />
                            </Link>
                        </article>

                        <div className="about-experience">
                            <p className="about-card-label">SELECTED EXPERIENCE</p>

                            <ol className="about-timeline">
                                {experience.map((item) => (
                                    <li key={item.organization}>
                                        <p className="about-timeline__date">
                                            {item.date}
                                        </p>
                                        <div>
                                            <h3>{item.organization}</h3>
                                            <p className="about-timeline__role">
                                                {item.role}
                                            </p>
                                            <p className="about-timeline__detail">
                                                {item.detail}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </section>

                <section
                    className="about-section"
                    id="approach"
                    aria-labelledby="about-approach-title"
                >
                    <header className="about-section__heading about-section__heading--row">
                        <div>
                            <p className="about-section__eyebrow">
                                <span>04</span> How I work
                            </p>
                            <h2 id="about-approach-title">
                                Keep the reasoning{" "}
                                <em>close to the result.</em>
                            </h2>
                        </div>
                    </header>

                    <ol className="about-principles">
                        {principles.map((principle) => (
                            <li key={principle.number}>
                                <span className="about-principles__number">
                                    {principle.number}
                                </span>
                                <h3>{principle.title}</h3>
                                <p>{principle.description}</p>
                            </li>
                        ))}
                    </ol>
                </section>

                <section
                    className="about-section about-elsewhere"
                    id="elsewhere"
                    aria-labelledby="about-elsewhere-title"
                >
                    <div>
                        <p className="about-section__eyebrow">
                            <span>05</span> Elsewhere
                        </p>
                        <h2 id="about-elsewhere-title">
                            Follow the work{" "}
                            <em>as it takes shape.</em>
                        </h2>
                    </div>

                    <nav
                        className="about-social-links"
                        aria-label="Shaurya’s profiles and email"
                    >
                        {aboutLinks.map((link) => (
                            <a
                                key={link.key}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={
                                    link.external
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                            >
                                {link.label}
                                {link.external && (
                                    <ArrowUpRight size={16} aria-hidden="true" />
                                )}
                            </a>
                        ))}
                    </nav>
                </section>
            </div>
        </div>
    );
}
