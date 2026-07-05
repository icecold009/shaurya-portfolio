// Contact.jsx — drop-in replacement
import { useState } from 'react';

function Contact() {
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        const res = await fetch('https://formspree.io/f/mwvdyllv', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        setStatus(res.ok ? 'sent' : 'error');
    };

    if (status === 'sent') return (
        <section className="contact" id="contact">
            <div className="contact-success">
                <span className="contact-success-icon">✓</span>
                <p>Message received. I'll get back to you soon.</p>
            </div>
        </section>
    );

    return (
        <section className="contact" id="contact">
            <div className="section-heading">
                <p className="section-label">Contact</p>
                <h2>Let's build something useful.</h2>
            </div>
            <div className="contact-grid">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" rows="5" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending...' : 'Send Message →'}
                    </button>
                </form>

                <div className="contact-sidebar">
                    <p className="contact-text">Open to internships, collabs, and interesting projects.</p>
                    <div className="contact-links">
                        <a href="mailto:sariashaurya09@gmail.com">✉ Email</a>
                        <a href="https://github.com/icecold009" target="_blank" rel="noreferrer">⌥ GitHub</a>
                        <a href="https://linkedin.com/in/shaurya-saria009" target="_blank" rel="noreferrer">◈ LinkedIn</a>
                        <a href="/resume.pdf" download className="btn btn-primary">↓ Resume</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;