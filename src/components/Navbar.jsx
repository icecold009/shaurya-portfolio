import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dark, setDark] = useState(true);
    const location = useLocation();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    }, [dark]);

    useEffect(() => { setMenuOpen(false); }, [location]);

    const navLinks = [
        { to: "/projects", label: "projects" },
        { to: "/about", label: "about" },
        { to: "/artwork", label: "artwork" },
        { to: "/certificates", label: "certificates" },
        { to: "/achievements", label: "achievements" },
        { to: "/uses", label: "uses" },
        { to: "/blog", label: "blog" },
        { to: "/contact", label: "contact" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="site-header">
            <nav className="navbar">
                <Link to="/" className="brand">
                    <span className="brand-prompt">root@shaurya</span>:~$
                </Link>

                <div className="nav-links desktop-nav">
                    {navLinks.map(({ to, label }) => (
                        <Link key={to} to={to} className={isActive(to) ? "nav-active" : ""}>
                            {label}
                        </Link>
                    ))}
                </div>

                <div className="nav-right">
                    <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
                        {dark ? "◑" : "○"}
                    </button>
                    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
                        <span className={`ham-line ${menuOpen ? "open" : ""}`} />
                        <span className={`ham-line ${menuOpen ? "open" : ""}`} />
                        <span className={`ham-line ${menuOpen ? "open" : ""}`} />
                    </button>
                </div>
            </nav>

            <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
                {navLinks.map(({ to, label }) => (
                    <Link key={to} to={to}>{label}</Link>
                ))}
            </div>
        </header>
    );
}

export default Navbar;