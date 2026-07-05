import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const [dark, setDark] = useState(true);
    const location = useLocation();
    const moreRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    }, [dark]);

    useEffect(() => {
        setMenuOpen(false);
        setMoreOpen(false);
    }, [location]);

    // Close "more" dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (moreRef.current && !moreRef.current.contains(e.target)) {
                setMoreOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const primaryLinks = [
        { to: "/projects", label: "projects" },
        { to: "/about", label: "about" },
        { to: "/certificates", label: "certificates" },
        { to: "/achievements", label: "achievements" },
        { to: "/contact", label: "contact" },
    ];

    const secondaryLinks = [
        { to: "/uses", label: "uses" },
        { to: "/artwork", label: "artwork" },
        { to: "/blog", label: "blog" },
    ];

    const allLinks = [...primaryLinks, ...secondaryLinks];
    const isActive = (path) => location.pathname === path;
    const anySecondaryActive = secondaryLinks.some(l => isActive(l.to));

    return (
        <header className="site-header">
            <nav className="navbar">
                <Link to="/" className="brand">
                    <span className="brand-prompt">root@shaurya</span>:~$
                </Link>

                <div className="nav-links desktop-nav">
                    {primaryLinks.map(({ to, label }) => (
                        <Link key={to} to={to} className={isActive(to) ? "nav-active" : ""}>
                            {label}
                        </Link>
                    ))}

                    {/* "More" dropdown */}
                    <div
                        className={`nav-more ${moreOpen ? "nav-more--open" : ""} ${anySecondaryActive ? "nav-active" : ""}`}
                        ref={moreRef}
                    >
                        <button
                            className="nav-more-trigger"
                            onClick={() => setMoreOpen(!moreOpen)}
                            aria-haspopup="true"
                            aria-expanded={moreOpen}
                        >
                            more {moreOpen ? "↑" : "↓"}
                        </button>
                        <div className="nav-more-dropdown" role="menu">
                            {secondaryLinks.map(({ to, label }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className={isActive(to) ? "nav-active" : ""}
                                    role="menuitem"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="nav-right">
                    <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
                        {dark ? "◑" : "○"}
                    </button>
                    <button
                        className="hamburger"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span className={`ham-line ${menuOpen ? "open" : ""}`} />
                        <span className={`ham-line ${menuOpen ? "open" : ""}`} />
                        <span className={`ham-line ${menuOpen ? "open" : ""}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile menu — all links flat */}
            <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
                {allLinks.map(({ to, label }) => (
                    <Link key={to} to={to}>{label}</Link>
                ))}
            </div>
        </header>
    );
}

export default Navbar;