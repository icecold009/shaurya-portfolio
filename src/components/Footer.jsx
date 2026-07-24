import { Link } from "react-router-dom";

import "./Footer.css";

const footerNavigation = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
    { to: "/achievements", label: "Achievements" },
    { to: "/contact", label: "Contact" },
];

const footerExplore = [
    { to: "/certificates", label: "Certificates" },
    { to: "/uses", label: "Uses" },
    { to: "/artwork", label: "Artwork" },
    { to: "/blog", label: "Blog" },
];

export default function Footer() {
    return (
        <footer className="contact-ending">
            <div
                className="contact-ending__background"
                aria-hidden="true"
            />

            <section
                className="contact-ending__hero"
                aria-labelledby="contact-ending-title"
            >
                <p className="contact-ending__eyebrow">
                    Available for internships and collaborations
                </p>

                <div className="contact-ending__heading">
                    <h2 id="contact-ending-title">
                        Have an idea worth
                        <span> building properly?</span>
                    </h2>
                </div>

                <div className="contact-ending__action">
                    <p>
                        Tell me what you are working on, what problem
                        you are trying to solve and where I could help.
                    </p>

                    <Link
                        to="/contact"
                        className="contact-ending__link"
                    >
                        <span>Start a conversation</span>
                        <span aria-hidden="true">↗</span>
                    </Link>
                </div>

                <div
                    className="contact-ending__index"
                    aria-hidden="true"
                >
                    <span>Contact</span>
                    <span>Bengaluru, India</span>
                    <span>Scroll for directory</span>
                </div>
            </section>

            <div className="contact-ending__directory">
                <div className="contact-ending__identity">
                    <Link to="/">Shaurya Saria</Link>

                    <p>
                        Student developer building full-stack
                        applications, AI tools and thoughtful digital
                        experiences.
                    </p>
                </div>

                <nav
                    className="contact-ending__nav"
                    aria-label="Footer navigation"
                >
                    <p>Navigate</p>

                    {footerNavigation.map(({ to, label }) => (
                        <Link key={to} to={to}>
                            {label}
                        </Link>
                    ))}
                </nav>

                <nav
                    className="contact-ending__nav"
                    aria-label="More pages"
                >
                    <p>Explore</p>

                    {footerExplore.map(({ to, label }) => (
                        <Link key={to} to={to}>
                            {label}
                        </Link>
                    ))}
                </nav>

                <div className="contact-ending__social">
                    <p>Connect</p>

                    <a
                        href="https://github.com/icecold009"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                        <span aria-hidden="true">↗</span>
                    </a>

                    <a href="mailto:sariashaurya09@gmail.com">
                        Email
                        <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </div>

            <div className="contact-ending__bottom">
                <p>
                    © {new Date().getFullYear()} Shaurya Saria
                </p>

                <p>Designed and built in Bengaluru, India</p>
            </div>
        </footer>
    );
}