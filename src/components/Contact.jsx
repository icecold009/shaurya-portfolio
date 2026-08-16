import { useState } from "react";

import { profileLinks } from "../lib/profileLinks";

function Contact() {
    const [status, setStatus] = useState("idle");
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus("sending");

        const response = await fetch("https://formspree.io/f/mwvdyllv", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        setStatus(response.ok ? "sent" : "error");
    };

    if (status === "sent") {
        return (
            <section className="contact" id="contact">
                <div className="contact-success">
                    <span className="contact-success-icon" aria-hidden="true">
                        +
                    </span>
                    <p>Message received. I&apos;ll get back to you soon.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="contact" id="contact">
            <div className="contact-topline" aria-hidden="true">
                <span>Direct line</span>
                <span>Bengaluru, India</span>
                <span>Open to thoughtful problems</span>
            </div>

            <div className="section-heading">
                <p className="section-label">Start a conversation</p>
                <h2>Let&apos;s <em>work on something real.</em></h2>
            </div>

            <div className="contact-grid">
                <div className="contact-form-panel">
                    <div className="contact-column-heading">
                        <span>01</span>
                        <p>Send a note</p>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your name</label>
                            <input
                                id="name"
                                autoComplete="name"
                                value={form.name}
                                onChange={(event) =>
                                    setForm({ ...form, name: event.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                value={form.email}
                                onChange={(event) =>
                                    setForm({ ...form, email: event.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">What are you building or trying to understand?</label>
                            <textarea
                                id="message"
                                rows="5"
                                value={form.message}
                                onChange={(event) =>
                                    setForm({ ...form, message: event.target.value })
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={status === "sending"}
                        >
                            {status === "sending" ? "Sending..." : "Send message ->"}
                        </button>
                    </form>
                </div>

                <aside className="contact-sidebar">
                    <div className="contact-column-heading">
                        <span>02</span>
                        <p>Elsewhere</p>
                    </div>

                    <p className="contact-text">
                        I am especially interested in internships, research,
                        AI and data products, and collaborations where the
                        problem is worth understanding properly.
                    </p>

                    <div className="contact-links">
                        {profileLinks.map((link) => (
                            <a
                                key={link.key}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noreferrer" : undefined}
                                download={link.download ? true : undefined}
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
