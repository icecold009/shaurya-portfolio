import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { availability, serviceOffers, workProcess } from "../../data/profile";
import { projects } from "../../data/projects";

import "./WorkWithMePage.css";

const proofProjects = projects.filter((project) =>
    ["stadium-pulse-ai", "f1-championship-prediction", "audio-recognition"].includes(project.id),
);

export default function WorkWithMePage() {
    return (
        <div className="page-wrapper work-with-me-page">
            <header className="work-with-me-hero">
                <div className="work-with-me-hero__topline" aria-hidden="true">
                    <span>Work with me</span>
                    <span>Bengaluru, India</span>
                    <span>Focused scope / 2026</span>
                </div>

                <div className="work-with-me-hero__grid">
                    <div>
                        <p className="page-breadcrumb">collaboration / practical software</p>
                        <p className="work-with-me-eyebrow">For founders, teams, and thoughtful collaborators</p>
                        <h1>Make the next step <em>clear.</em></h1>
                        <p className="work-with-me-hero__lede">
                            I build focused websites, data interfaces, and AI prototypes that explain what they do, who they are for, and where their limits are.
                        </p>
                        <div className="work-with-me-hero__actions">
                            <Link className="btn btn-primary" to="/contact">Tell me what you are building <ArrowUpRight size={17} aria-hidden="true" /></Link>
                            <Link className="cta-link" to="/projects">See the evidence <ArrowUpRight size={17} aria-hidden="true" /></Link>
                        </div>
                    </div>

                    <aside className="work-with-me-hero__note" aria-label="Collaboration note">
                        <MessageCircle size={20} aria-hidden="true" />
                        <p>{availability.detail}</p>
                        <span>{availability.responseTime}</span>
                    </aside>
                </div>
            </header>

            <section className="work-with-me-section" aria-labelledby="work-with-me-offers-title">
                <div className="work-with-me-section__heading">
                    <div>
                        <p className="section-label">What I can help with</p>
                        <h2 id="work-with-me-offers-title">Small teams need <em>clear leverage.</em></h2>
                    </div>
                    <p>Every offer is intentionally bounded so the first version can be reviewed, tested, and improved.</p>
                </div>

                <div className="work-offer-grid">
                    {serviceOffers.map((offer) => (
                        <article className="work-offer-card" key={offer.number}>
                            <div className="work-offer-card__topline"><span>{offer.number}</span><span>Focused build</span></div>
                            <h3>{offer.title}</h3>
                            <p>{offer.summary}</p>
                            <ul>
                                {offer.deliverables.map((deliverable) => <li key={deliverable}><Check size={15} aria-hidden="true" />{deliverable}</li>)}
                            </ul>
                            <small>{offer.fit}</small>
                        </article>
                    ))}
                </div>
            </section>

            <section className="work-with-me-section work-with-me-section--process" aria-labelledby="work-with-me-process-title">
                <div className="work-with-me-section__heading">
                    <div>
                        <p className="section-label">How a project moves</p>
                        <h2 id="work-with-me-process-title">A process that keeps the <em>unknown visible.</em></h2>
                    </div>
                    <p>Scope first, then build enough to learn something real. The exact timeline depends on the pages, integrations, and review depth.</p>
                </div>

                <div className="work-process-list">
                    {workProcess.map((step) => (
                        <article className="work-process-step" key={step.number}>
                            <span>{step.number}</span>
                            <div><h3>{step.title}</h3><p>{step.detail}</p></div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="work-with-me-section" aria-labelledby="work-with-me-proof-title">
                <div className="work-with-me-section__heading">
                    <div>
                        <p className="section-label">Proof, with boundaries</p>
                        <h2 id="work-with-me-proof-title">See how the work <em>holds up.</em></h2>
                    </div>
                    <p>I am a student developer. The best fit is focused product work, portfolio systems, research interfaces, and prototypes rather than large agency engagements.</p>
                </div>

                <div className="work-proof-list">
                    {proofProjects.map((project) => (
                        <Link className="work-proof-item" to={`/projects?project=${project.id}`} key={project.id}>
                            <span><strong>{project.title}</strong><small>{project.category}</small></span>
                            <span>{project.status}</span>
                            <ArrowUpRight size={18} aria-hidden="true" />
                        </Link>
                    ))}
                </div>
            </section>

            <section className="work-with-me-final" aria-labelledby="work-with-me-final-title">
                <p className="section-label">Next step</p>
                <h2 id="work-with-me-final-title">Bring the rough version. We can find the <em>useful one.</em></h2>
                <p>{availability.headline}. Share the audience, the problem, and whatever already exists. A polished brief is not required.</p>
                <Link className="btn btn-primary" to="/contact">Start a conversation <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </section>
        </div>
    );
}
