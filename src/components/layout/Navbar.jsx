import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail, Menu, Moon, Sun, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { profileLinks } from "../../lib/profileLinks";
import { DRAWER, POPOVER } from "../../lib/motion";

const primaryLinks = [
    { to: "/projects", label: "Work" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Writing" },
    { to: "/contact", label: "Contact" },
];

const secondaryLinks = [
    { to: "/achievements", label: "Achievements" },
    { to: "/certificates", label: "Certificates" },
    { to: "/uses", label: "Uses" },
    { to: "/artwork", label: "Artwork" },
];

const resumeLink = profileLinks.find((link) => link.key === "resume");
const desktopProfileLinks = profileLinks.filter((link) => ["github", "linkedin"].includes(link.key));

function GithubIcon({ size = 18, ...props }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
    );
}

function Navbar() {
    const location = useLocation();
    const reduceMotion = useReducedMotion();
    const [menuOpen, setMenuOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("portfolio-theme");
        if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
        return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    });

    const moreRef = useRef(null);
    const mobilePanelRef = useRef(null);
    const closeButtonRef = useRef(null);
    const menuTriggerRef = useRef(null);
    const moreTriggerRef = useRef(null);
    const isDark = theme === "dark";
    const secondaryPageActive = secondaryLinks.some(({ to }) => location.pathname === to);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("portfolio-theme", theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 12);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
        setMoreOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (moreRef.current && !moreRef.current.contains(event.target)) setMoreOpen(false);
        };
        const handleEscape = (event) => {
            if (event.key !== "Escape") return;
            if (menuOpen) {
                setMenuOpen(false);
                menuTriggerRef.current?.focus();
            } else if (moreOpen) {
                setMoreOpen(false);
                moreTriggerRef.current?.focus();
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [menuOpen, moreOpen]);

    useEffect(() => {
        if (!menuOpen) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 80);
        const handleResize = () => {
            if (window.innerWidth >= 900) setMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.clearTimeout(focusTimer);
            window.removeEventListener("resize", handleResize);
            document.body.style.overflow = previousOverflow;
        };
    }, [menuOpen]);

    const closeMenu = () => {
        setMenuOpen(false);
        menuTriggerRef.current?.focus();
    };

    const handleMobileKeyDown = (event) => {
        if (event.key !== "Tab" || !mobilePanelRef.current) return;
        const focusableElements = mobilePanelRef.current.querySelectorAll("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])");
        if (!focusableElements.length) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    };

    return (
        <>
            <header className={["site-header", scrolled ? "site-header--scrolled" : "", menuOpen ? "site-header--menu-open" : ""].filter(Boolean).join(" ")}>
                <nav className="navbar" aria-label="Main navigation">
                    <Link to="/" className="nav-brand" aria-label="Shaurya portfolio home">
                        <span className="nav-brand-mark" aria-hidden="true">↗</span>
                        <span className="nav-brand-copy"><strong>Shaurya</strong><small>AI + product engineer</small></span>
                    </Link>

                    <div className="desktop-nav" aria-label="Primary navigation">
                        <div className="desktop-nav-links">
                            {primaryLinks.map(({ to, label }) => (
                                <NavLink key={to} to={to} className={({ isActive }) => isActive ? "desktop-nav-link desktop-nav-link--active" : "desktop-nav-link"}>
                                    {({ isActive }) => <><span>{label}</span>{isActive && <span className="desktop-active-indicator" aria-hidden="true" />}</>}
                                </NavLink>
                            ))}
                            <div className="desktop-more" ref={moreRef}>
                                <button ref={moreTriggerRef} type="button" className={["desktop-more-trigger", moreOpen ? "desktop-more-trigger--open" : "", secondaryPageActive ? "desktop-more-trigger--active" : ""].filter(Boolean).join(" ")} onClick={() => setMoreOpen((open) => !open)} aria-expanded={moreOpen} aria-controls="desktop-more-menu" aria-haspopup="menu">
                                    Archive <ChevronDown size={15} aria-hidden="true" />
                                </button>
                                <AnimatePresence>
                                    {moreOpen && (
                                        <motion.div id="desktop-more-menu" className="desktop-more-menu" role="menu" initial={reduceMotion ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: POPOVER.duration, ease: POPOVER.ease }}>
                                            <p className="desktop-more-label">Explore</p>
                                            {secondaryLinks.map(({ to, label }) => <NavLink key={to} to={to} role="menuitem" className={({ isActive }) => isActive ? "desktop-more-link desktop-more-link--active" : "desktop-more-link"}><span>{label}</span><ArrowUpRight size={14} aria-hidden="true" /></NavLink>)}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-actions">
                        <nav className="navbar-profile-links" aria-label="Profile links">
                            {desktopProfileLinks.map((link) => <a key={link.key} href={link.href} target="_blank" rel="noreferrer" aria-label={`${link.label} (opens in a new tab)`}>{link.label}</a>)}
                        </nav>
                        {resumeLink && <a className="navbar-resume-link" href={resumeLink.href} target="_blank" rel="noopener noreferrer" aria-label="Open résumé PDF in a new tab">Résumé</a>}
                        <button type="button" className="nav-icon-button" onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}>
                            {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
                        </button>
                        <button ref={menuTriggerRef} type="button" className={["mobile-menu-trigger", menuOpen ? "mobile-menu-trigger--open" : ""].filter(Boolean).join(" ")} onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation">
                            <span>Menu</span>{menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
                        </button>
                    </div>
                </nav>
            </header>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div className="mobile-nav-layer" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                        <button type="button" className="mobile-nav-backdrop" onClick={closeMenu} aria-label="Dismiss navigation overlay" tabIndex={-1} />
                        <motion.aside id="mobile-navigation" ref={mobilePanelRef} className="mobile-nav-panel" role="dialog" aria-modal="true" aria-label="Navigation menu" onKeyDown={handleMobileKeyDown} initial={reduceMotion ? false : { opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} transition={{ duration: DRAWER.duration, ease: DRAWER.ease }}>
                            <div className="mobile-nav-header">
                                <Link to="/" className="mobile-nav-identity" onClick={closeMenu}><span className="nav-brand-mark" aria-hidden="true">↗</span><span><strong>Shaurya</strong><small>Portfolio navigation</small></span></Link>
                                <button ref={closeButtonRef} type="button" className="mobile-nav-close" onClick={closeMenu} aria-label="Close navigation menu"><X size={20} aria-hidden="true" /></button>
                            </div>
                            <div className="mobile-nav-scroll">
                                <p className="mobile-nav-section-label">Navigate</p>
                                <div className="mobile-primary-links">
                                    {primaryLinks.map(({ to, label }, index) => <NavLink key={to} to={to} onClick={closeMenu} className={({ isActive }) => isActive ? "mobile-primary-link mobile-primary-link--active" : "mobile-primary-link"}><span className="mobile-link-index">{String(index + 1).padStart(2, "0")}</span><span className="mobile-link-label">{label}</span><ArrowUpRight className="mobile-link-arrow" size={19} aria-hidden="true" /></NavLink>)}
                                </div>
                                <div className="mobile-secondary-section"><p className="mobile-nav-section-label">Explore</p><div className="mobile-secondary-links">{secondaryLinks.map(({ to, label }) => <NavLink key={to} to={to} onClick={closeMenu} className={({ isActive }) => isActive ? "mobile-secondary-link mobile-secondary-link--active" : "mobile-secondary-link"}>{label}</NavLink>)}</div></div>
                            </div>
                            <div className="mobile-nav-footer">
                                <div className="mobile-status"><span className="mobile-status-dot" /><p>Open to internships, research, and collaborations</p></div>
                                <div className="mobile-social-links">
                                    {profileLinks.map((link) => <a key={link.key} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined} download={link.download ? true : undefined} aria-label={link.external ? `${link.label} (opens in a new tab)` : link.label}>{link.key === "github" ? <GithubIcon size={16} /> : link.key === "email" ? <Mail size={16} /> : null}{link.label}</a>)}
                                </div>
                            </div>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navbar;
