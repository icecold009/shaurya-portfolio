import { Link } from "react-router-dom";

export default function PrivacyPage() {
    return (
        <div className="page-wrapper legal-page-shell">
            <article className="legal-page" aria-labelledby="privacy-page-title">
                <header className="legal-page__header">
                    <p className="page-breadcrumb">privacy</p>
                    <p className="section-label">A short, plain-language note</p>
                    <h1 id="privacy-page-title">Your information should stay <em>understood.</em></h1>
                    <p className="legal-page__lede">
                        This page explains what this portfolio collects, why it is collected, and which services receive it.
                    </p>
                    <p className="legal-page__updated">Last updated: 13 September 2026</p>
                </header>

                <div className="legal-page__body">
                    <section aria-labelledby="privacy-contact-title">
                        <p className="section-label">01 / Contact messages</p>
                        <h2 id="privacy-contact-title">What you send through the form</h2>
                        <p>
                            If you use the contact form, I receive the name, email address, and message that you choose to submit. I use those details only to understand your request and reply to you.
                        </p>
                        <p>
                            The form is delivered through Formspree. Your submission is sent to that service over HTTPS and may be stored or processed according to Formspree&apos;s own privacy policy and terms. You can also contact me directly at <a href="mailto:sariashaurya09@gmail.com">sariashaurya09@gmail.com</a>.
                        </p>
                    </section>

                    <section aria-labelledby="privacy-analytics-title">
                        <p className="section-label">02 / Site measurement</p>
                        <h2 id="privacy-analytics-title">Analytics without advertising profiles</h2>
                        <p>
                            This site uses Vercel Web Analytics to understand aggregate page visits and improve the portfolio. It is not used here to build advertising profiles or sell personal information. Vercel may process technical request data as described in its own privacy documentation.
                        </p>
                    </section>

                    <section aria-labelledby="privacy-storage-title">
                        <p className="section-label">03 / Your browser</p>
                        <h2 id="privacy-storage-title">Small pieces of local preference data</h2>
                        <p>
                            The site uses your browser&apos;s local storage to remember your light or dark theme and session storage to remember whether the introduction animation has already been shown. The site does not set its own advertising cookies.
                        </p>
                    </section>

                    <section aria-labelledby="privacy-links-title">
                        <p className="section-label">04 / Other websites</p>
                        <h2 id="privacy-links-title">External links have their own rules</h2>
                        <p>
                            This portfolio links to GitHub, LinkedIn, Kaggle, Formspree, Vercel, and other external services. Once you leave this site, the destination&apos;s privacy policy controls how it handles your visit.
                        </p>
                    </section>

                    <section aria-labelledby="privacy-retention-title">
                        <p className="section-label">05 / Questions</p>
                        <h2 id="privacy-retention-title">Need something changed?</h2>
                        <p>
                            I keep contact information only for as long as it is useful for responding or maintaining a reasonable record of the conversation. For a privacy question or deletion request, email <a href="mailto:sariashaurya09@gmail.com">sariashaurya09@gmail.com</a>.
                        </p>
                    </section>
                </div>

                <footer className="legal-page__footer">
                    <Link className="cta-link" to="/contact">Start a conversation <span aria-hidden="true">↗</span></Link>
                    <Link className="cta-link" to="/">Return home <span aria-hidden="true">↗</span></Link>
                </footer>
            </article>
        </div>
    );
}
