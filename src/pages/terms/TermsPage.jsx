import { Link } from "react-router-dom";

export default function TermsPage() {
    return (
        <div className="page-wrapper legal-page-shell">
            <article className="legal-page" aria-labelledby="terms-page-title">
                <header className="legal-page__header">
                    <p className="page-breadcrumb">terms</p>
                    <p className="section-label">A plain-language site agreement</p>
                    <h1 id="terms-page-title">A small site, with <em>clear boundaries.</em></h1>
                    <p className="legal-page__lede">
                        These terms describe the basic rules for using this personal portfolio and sending a message through it.
                    </p>
                    <p className="legal-page__updated">Last updated: 13 September 2026</p>
                </header>

                <div className="legal-page__body">
                    <section aria-labelledby="terms-use-title">
                        <p className="section-label">01 / Use</p>
                        <h2 id="terms-use-title">Use the site respectfully</h2>
                        <p>
                            You may browse, link to, and reference this portfolio for ordinary personal, educational, or professional purposes. Do not use it to interfere with the site, probe for unauthorized access, or misrepresent its content as your own.
                        </p>
                    </section>

                    <section aria-labelledby="terms-content-title">
                        <p className="section-label">02 / Content</p>
                        <h2 id="terms-content-title">The work remains attributed</h2>
                        <p>
                            The writing, artwork, project descriptions, code samples, and visual identity on this site belong to Shaurya Saria or their respective owners. Ask before reusing substantial material, and keep attribution when a reference is permitted.
                        </p>
                    </section>

                    <section aria-labelledby="terms-links-title">
                        <p className="section-label">03 / External services</p>
                        <h2 id="terms-links-title">Other services have their own terms</h2>
                        <p>
                            This portfolio links to services such as GitHub, LinkedIn, Kaggle, Formspree, and Vercel. Those services operate under their own terms and policies. This site does not control their availability, content, or handling of information after you leave this domain.
                        </p>
                    </section>

                    <section aria-labelledby="terms-contact-title">
                        <p className="section-label">04 / Contact</p>
                        <h2 id="terms-contact-title">Messages are for conversation</h2>
                        <p>
                            A contact-form submission is an invitation to reply, not a guarantee of a project, job, response time, or ongoing service. Please do not send confidential information or credentials through the form. See the <Link to="/privacy">privacy note</Link> for how submissions are handled.
                        </p>
                    </section>

                    <section aria-labelledby="terms-changes-title">
                        <p className="section-label">05 / Changes</p>
                        <h2 id="terms-changes-title">The site can evolve</h2>
                        <p>
                            These terms may be updated when the site or its services materially change. The date above identifies the current version. If a provision does not apply to your situation, the rest of the terms remain in effect.
                        </p>
                    </section>
                </div>

                <footer className="legal-page__footer">
                    <Link className="cta-link" to="/privacy">Read the privacy note <span aria-hidden="true">↗</span></Link>
                    <Link className="cta-link" to="/contact">Contact Shaurya <span aria-hidden="true">↗</span></Link>
                    <Link className="cta-link" to="/">Return home <span aria-hidden="true">↗</span></Link>
                </footer>
            </article>
        </div>
    );
}
