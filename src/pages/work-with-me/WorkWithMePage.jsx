import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import { availability, serviceOffers, workProcess } from "../../data/profile";
import { projects } from "../../data/projects";

import "./WorkWithMePage.css";

const proofProjects = projects.filter((project) =>
    ["stadium-pulse-ai", "f1-championship-prediction", "audio-recognition"].includes(project.id),
);

export default function WorkWithMePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedOffer = serviceOffers.find((offer) => offer.id === searchParams.get("service")) ?? serviceOffers[0];
    const selectedStep = workProcess.find((step) => step.number === searchParams.get("step")) ?? workProcess[0];

    const selectWorkOption = (key, value) => {
        const next = new URLSearchParams(searchParams);
        next.set(key, value);
        setSearchParams(next, { replace: true });
    };

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

                <div className="work-offer-selector" role="group" aria-label="Choose a service focus">
                    {serviceOffers.map((offer) => (
                        <button
                            type="button"
                            key={offer.id}
                            className={`work-offer-option ${selectedOffer.id === offer.id ? "work-offer-option--active" : ""}`}
                            aria-pressed={selectedOffer.id === offer.id}
                            aria-controls="work-offer-panel"
                            onClick={() => selectWorkOption("service", offer.id)}
                        >
                            <span>{offer.number}</span>
                            <strong>{offer.title}</strong>
                            <ArrowUpRight size={16} aria-hidden="true" />
                        </button>
                    ))}
                </div>

                <div className="work-offer-panel" id="work-offer-panel" aria-live="polite">
                    <div className="work-offer-panel__heading">
                        <div className="work-offer-card__topline"><span>{selectedOffer.number}</span><span>Focused build</span></div>
                        <h3>{selectedOffer.title}</h3>
                        <p>{selectedOffer.summary}</p>
                    </div>
                    <div className="work-offer-panel__details">
                        <span className="section-label">What the first version includes</span>
                        <ul>
                            {selectedOffer.deliverables.map((deliverable) => <li key={deliverable}><Check size={15} aria-hidden="true" />{deliverable}</li>)}
                        </ul>
                        <small>{selectedOffer.fit}</small>
                        <Link className="btn btn-primary" to={`/contact?projectType=${selectedOffer.id}`}>
                            Start with this scope <ArrowUpRight size={17} aria-hidden="true" />
                        </Link>
                    </div>
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

                <div className="work-process-selector" role="group" aria-label="Explore the project process">
                    {workProcess.map((step) => (
                        <button
                            type="button"
                            key={step.number}
                            className={`work-process-option ${selectedStep.number === step.number ? "work-process-option--active" : ""}`}
                            aria-pressed={selectedStep.number === step.number}
                            aria-controls="work-process-panel"
                            onClick={() => selectWorkOption("step", step.number)}
                        >
                            <span>{step.number}</span>
                            <strong>{step.title}</strong>
                        </button>
                    ))}
                </div>

                <div className="work-process-panel" id="work-process-panel" aria-live="polite">
                    <span>{selectedStep.number}</span>
                    <div>
                        <h3>{selectedStep.title}</h3>
                        <p>{selectedStep.detail}</p>
                    </div>
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
