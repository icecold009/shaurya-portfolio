import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { positioningStatement, profileLinks } from "../../lib/profileLinks";

import "./Footer.css";

const footerNavigation = [
    { to: "/projects", label: "Work" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Writing" },
    { to: "/contact", label: "Contact" },
];

const footerExplore = [
    { to: "/achievements", label: "Achievements" },
    { to: "/certificates", label: "Certificates" },
    { to: "/uses", label: "Uses" },
    { to: "/artwork", label: "Artwork" },
];

export default function Footer() {
    return (
        <footer className="contact-ending">
            <section className="contact-ending__hero" aria-labelledby="contact-ending-title">
                <p className="contact-ending__eyebrow">Available for internships and collaborations</p>
                <h2 id="contact-ending-title">Have an idea worth <em>building properly?</em></h2>
                <div className="contact-ending__action">
                    <p>Tell me what you are working on, what problem you are trying to solve, and where I could help.</p>
                    <Link to="/contact" className="contact-ending__link cta-link">Start a conversation <ArrowUpRight size={18} aria-hidden="true" /></Link>
                </div>
            </section>

            <div className="contact-ending__directory">
                <div className="contact-ending__identity">
                    <Link to="/">Shaurya Saria</Link>
                    <p>{positioningStatement}</p>
                </div>
                <nav className="contact-ending__nav" aria-label="Footer navigation">
                    <p>Navigate</p>
                    {footerNavigation.map(({ to, label }) => <Link key={to} to={to}>{label}</Link>)}
                </nav>
                <nav className="contact-ending__nav" aria-label="Explore pages">
                    <p>Explore</p>
                    {footerExplore.map(({ to, label }) => <Link key={to} to={to}>{label}</Link>)}
                </nav>
                <div className="contact-ending__social">
                    <p>Connect</p>
                    {profileLinks.map((link) => <a key={link.key} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined} download={link.download ? true : undefined} aria-label={link.external ? `${link.label} (opens in a new tab)` : link.label}>{link.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}
                </div>
            </div>

            <div className="contact-ending__bottom">
                <p>© {new Date().getFullYear()} Shaurya Saria</p>
                <p>Designed and built in Bengaluru, India</p>
            </div>
        </footer>
    );
}
