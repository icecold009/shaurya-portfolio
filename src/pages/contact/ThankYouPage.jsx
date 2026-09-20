import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function ThankYouPage() {
    return (
        <div className="page-wrapper thank-you-page-shell">
            <section className="thank-you-page" aria-labelledby="thank-you-title">
                <p className="page-breadcrumb">contact / received</p>
                <div className="thank-you-page__icon" aria-hidden="true">
                    <CheckCircle2 size={34} strokeWidth={1.5} />
                </div>
                <p className="section-label">Message received</p>
                <h1 id="thank-you-title">Thanks for starting the <em>conversation.</em></h1>
                <p>
                    Your note reached me. I&apos;ll read it carefully and get back to you as soon as I can.
                </p>
                <div className="thank-you-page__actions">
                    <Link className="btn btn-primary" to="/">Return home</Link>
                    <Link className="cta-link" to="/projects">Explore the work <span aria-hidden="true">↗</span></Link>
                </div>
            </section>
        </div>
    );
}
