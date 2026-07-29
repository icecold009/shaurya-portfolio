import { useState } from "react";

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
                <span>Open to good problems</span>
            </div>

            <div className="section-heading">
                <p className="section-label">Start a conversation</p>
                <h2>Let&apos;s <em>build something useful.</em></h2>
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
                            <label htmlFor="message">What are you working on?</label>
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
                        Open to internships, collabs, and interesting projects.
                    </p>

                    <div className="contact-links">
                        <a href="mailto:sariashaurya09@gmail.com">Email</a>
                        <a
                            href="https://github.com/icecold009"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/shaurya-saria009"
                            target="_blank"
                            rel="noreferrer"
                        >
                            LinkedIn
                        </a>
                        <a href="/resume.pdf" download>
                            Download resume
                        </a>
                    </div>

                    <div className="contact-availability">
                        <span>Availability</span>
                        <strong>Internships and thoughtful collaborations</strong>
                    </div>
                </aside>
            </div>
        </section>
    );
}

export default Contact;
