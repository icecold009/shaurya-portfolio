import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { positioningStatement, profileLinks } from "../lib/profileLinks";
import { CONTACT_LIMITS, validateContactForm } from "../lib/contactValidation";

function Contact() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const requestedProjectType = searchParams.get("projectType");
    const initialProjectType = ["portfolio-site", "product-site", "dashboard", "ai-prototype", "other"].includes(requestedProjectType)
        ? requestedProjectType
        : "";
    const [status, setStatus] = useState("idle");
    const [fieldErrors, setFieldErrors] = useState({});
    const [form, setForm] = useState({
        name: "",
        email: "",
        projectType: initialProjectType,
        timeline: "",
        budget: "",
        message: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedName = form.name.trim();
        const trimmedEmail = form.email.trim();
        const trimmedMessage = form.message.trim();
        const nextErrors = validateContactForm(form);
        const honeypot = event.currentTarget.elements.website?.value ?? "";

        setFieldErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            document.getElementById(Object.keys(nextErrors)[0])?.focus();
            return;
        }

        if (honeypot) {
            setStatus("error");
            return;
        }

        setStatus("sending");

        try {
            const response = await fetch("https://formspree.io/f/mwvdyllv", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: trimmedName,
                    email: trimmedEmail,
                    projectType: form.projectType,
                    timeline: form.timeline,
                    budget: form.budget,
                    message: trimmedMessage,
                }),
            });

            if (!response.ok) {
                throw new Error("Contact submission failed");
            }

            navigate("/contact/thanks");
        } catch {
            setStatus("error");
        }
    };

    const handleFieldChange = (field) => (event) => {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: event.target.value,
        }));

        setFieldErrors((currentErrors) => {
            if (!currentErrors[field]) {
                return currentErrors;
            }

            const nextErrors = { ...currentErrors };
            delete nextErrors[field];
            return nextErrors;
        });

        if (status === "error") {
            setStatus("idle");
        }
    };

    return (
        <section className="contact" id="contact" aria-labelledby="contact-title">
            <div className="contact-topline" aria-hidden="true">
                <span>Direct line</span>
                <span>Bengaluru, India</span>
                <span>Open to thoughtful problems</span>
            </div>

            <div className="section-heading">
                <p className="section-label">Start a conversation</p>
                <h1 id="contact-title">Let&apos;s <em>work on something real.</em></h1>
            </div>

            <div className="contact-grid">
                <div className="contact-form-panel">
                    <div className="contact-column-heading">
                        <span>01</span>
                        <p>Send a note</p>
                    </div>

                    <form
                        className="contact-form"
                        action="https://formspree.io/f/mwvdyllv"
                        method="post"
                        onSubmit={handleSubmit}
                        aria-busy={status === "sending"}
                        noValidate
                    >
                        <div className="form-group">
                            <label htmlFor="name">Your name</label>
                            <input
                                id="name"
                                name="name"
                                required
                                autoComplete="name"
                                value={form.name}
                                onChange={handleFieldChange("name")}
                                maxLength={CONTACT_LIMITS.name}
                                aria-invalid={Boolean(fieldErrors.name)}
                                aria-describedby={fieldErrors.name ? "name-error" : undefined}
                            />
                            {fieldErrors.name && <p className="form-field-error" id="name-error" role="alert">{fieldErrors.name}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={form.email}
                                onChange={handleFieldChange("email")}
                                maxLength={CONTACT_LIMITS.email}
                                inputMode="email"
                                aria-invalid={Boolean(fieldErrors.email)}
                                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                            />
                            {fieldErrors.email && <p className="form-field-error" id="email-error" role="alert">{fieldErrors.email}</p>}
                        </div>

                        <div className="contact-form-grid">
                            <div className="form-group">
                                <label htmlFor="projectType">What do you need?</label>
                                <select id="projectType" name="projectType" value={form.projectType} onChange={handleFieldChange("projectType")}>
                                    <option value="">Choose a project type</option>
                                    <option value="portfolio-site">Portfolio or personal site</option>
                                    <option value="product-site">Product or landing page</option>
                                    <option value="dashboard">Dashboard or data interface</option>
                                    <option value="ai-prototype">AI or ML prototype</option>
                                    <option value="other">Something else</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="timeline">When are you thinking?</label>
                                <select id="timeline" name="timeline" value={form.timeline} onChange={handleFieldChange("timeline")}>
                                    <option value="">Choose a timeline</option>
                                    <option value="exploring">Just exploring</option>
                                    <option value="this-month">This month</option>
                                    <option value="next-quarter">Next quarter</option>
                                    <option value="flexible">I am flexible</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="budget">Budget or scope note <span>(optional)</span></label>
                            <input id="budget" name="budget" value={form.budget} onChange={handleFieldChange("budget")} maxLength="160" placeholder="A range, constraint, or not sure yet" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">What are you building or trying to understand?</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                required
                                value={form.message}
                                onChange={handleFieldChange("message")}
                                maxLength={CONTACT_LIMITS.message}
                                aria-invalid={Boolean(fieldErrors.message)}
                                aria-describedby={fieldErrors.message ? "message-error" : undefined}
                            />
                            {fieldErrors.message && <p className="form-field-error" id="message-error" role="alert">{fieldErrors.message}</p>}
                        </div>

                        <div className="contact-form-honeypot" aria-hidden="true">
                            <label htmlFor="website">Website</label>
                            <input id="website" name="website" tabIndex="-1" autoComplete="off" />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={status === "sending"}
                            aria-busy={status === "sending"}
                        >
                            {status === "sending" ? "Sending message…" : "Send message"}
                        </button>

                        <p className="contact-form-privacy">
                            By sending this message, you agree that I can use the details you provide to reply. Read the <Link to="/privacy">privacy note</Link>.
                        </p>

                        {status === "error" && (
                            <p className="contact-form-feedback" role="alert">
                                I couldn&apos;t send that message. Please try
                                again or email me directly at{" "}
                                <a href="mailto:sariashaurya09@gmail.com">
                                    sariashaurya09@gmail.com
                                </a>
                                .
                            </p>
                        )}
                    </form>
                </div>

                <aside className="contact-sidebar">
                    <div className="contact-column-heading">
                        <span>02</span>
                        <p>Elsewhere</p>
                    </div>

                    <p className="contact-text">
                        {positioningStatement}
                    </p>

                    <div className="contact-links">
                        {profileLinks.map((link) => (
                            <a
                                key={link.key}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noreferrer" : undefined}
                                download={link.download ? true : undefined}
                                aria-label={link.external ? `${link.label} (opens in a new tab)` : link.label}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="contact-availability">
                        <span>Availability</span>
                        <strong>Internships · research · thoughtful collaborations</strong>
                    </div>
                </aside>
            </div>
        </section>
    );
}

export default Contact;

