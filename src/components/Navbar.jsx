import { useState, useEffect } from "react";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dark, setDark] = useState(true); // default dark for matrix theme

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    }, [dark]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="site-header">
            <nav className="navbar">
                <a href="#home" className="brand">
                    <span className="brand-prompt">root@shaurya</span>:~$
                </a>

                <div className="nav-links desktop-nav">
                    <a href="#projects" onClick={closeMenu}>projects</a>
                    <a href="#about" onClick={closeMenu}>about</a>
                    <a href="#skills" onClick={closeMenu}>skills</a>
                    <a href="#contact" onClick={closeMenu}>contact</a>
                </div>

                <div className="nav-right">
                    <button
                        className="theme-toggle"
                        onClick={() => setDark(!dark)}
                        aria-label="Toggle theme"
                    >
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

            <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
                <a href="#projects" onClick={closeMenu}>projects</a>
                <a href="#about" onClick={closeMenu}>about</a>
                <a href="#skills" onClick={closeMenu}>skills</a>
                <a href="#contact" onClick={closeMenu}>contact</a>
            </div>
        </header>
    );
}

export default Navbar;