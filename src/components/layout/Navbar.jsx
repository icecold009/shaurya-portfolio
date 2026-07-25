import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    ChevronDown,
    Mail,
    Menu,
    Moon,
    Sun,
    X,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

const primaryLinks = [
    { to: "/", label: "Home", index: "01" },
    { to: "/projects", label: "Projects", index: "02" },
    { to: "/about", label: "About", index: "03" },
    { to: "/achievements", label: "Achievements", index: "04" },
    { to: "/contact", label: "Contact", index: "05" },
];

const secondaryLinks = [
    { to: "/certificates", label: "Certificates" },
    { to: "/uses", label: "Uses" },
    { to: "/artwork", label: "Artwork" },
    { to: "/blog", label: "Blog" },
];

function GithubIcon({ size = 18, ...props }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            {...props}
        >
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

        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark";
    });

    const moreRef = useRef(null);
    const mobilePanelRef = useRef(null);
    const closeButtonRef = useRef(null);
    const menuTriggerRef = useRef(null);

    const isDark = theme === "dark";

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("portfolio-theme", theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 12);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        setMenuOpen(false);
        setMoreOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                moreRef.current &&
                !moreRef.current.contains(event.target)
            ) {
                setMoreOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key !== "Escape") return;

            if (menuOpen) {
                setMenuOpen(false);
                menuTriggerRef.current?.focus();
            }

            setMoreOpen(false);
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [menuOpen]);

    useEffect(() => {
        if (!menuOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const focusTimer = window.setTimeout(() => {
            closeButtonRef.current?.focus();
        }, 80);

        const handleResize = () => {
            if (window.innerWidth >= 900) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.clearTimeout(focusTimer);
            window.removeEventListener("resize", handleResize);
            document.body.style.overflow = previousOverflow;
        };
    }, [menuOpen]);

    const toggleTheme = () => {
        setTheme((currentTheme) =>
            currentTheme === "dark" ? "light" : "dark",
        );
    };

    const closeMenu = () => {
        setMenuOpen(false);
        menuTriggerRef.current?.focus();
    };

    const handleMobileKeyDown = (event) => {
        if (event.key !== "Tab" || !mobilePanelRef.current) return;

        const focusableElements = mobilePanelRef.current.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement =
            focusableElements[focusableElements.length - 1];

        if (
            event.shiftKey &&
            document.activeElement === firstElement
        ) {
            event.preventDefault();
            lastElement.focus();
        } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
        ) {
            event.preventDefault();
            firstElement.focus();
        }
    };

    const secondaryPageActive = secondaryLinks.some(
        ({ to }) => location.pathname === to,
    );

    return (
        <>
            <header
                className={[
                    "site-header",
                    scrolled ? "site-header--scrolled" : "",
                    menuOpen ? "site-header--menu-open" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                <nav className="navbar" aria-label="Main navigation">
                    <Link
                        to="/"
                        className="nav-brand"
                        aria-label="Shaurya portfolio home"
                    >
                        <span className="nav-brand-mark" aria-hidden="true">
                            S
                        </span>

                        <span className="nav-brand-copy">
                            <strong>Shaurya</strong>
                            <small>student developer</small>
                        </span>
                    </Link>

                    <div className="desktop-nav" aria-label="Desktop navigation">
                        <div className="desktop-nav-links">
                            {primaryLinks.slice(1).map(({ to, label }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "desktop-nav-link desktop-nav-link--active"
                                            : "desktop-nav-link"
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span>{label}</span>

                                            {isActive && (
                                                <motion.span
                                                    className="desktop-active-indicator"
                                                    layoutId="desktop-nav-active"
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 420,
                                                        damping: 34,
                                                    }}
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}

                            <div
                                className="desktop-more"
                                ref={moreRef}
                            >
                                <button
                                    type="button"
                                    className={[
                                        "desktop-more-trigger",
                                        moreOpen
                                            ? "desktop-more-trigger--open"
                                            : "",
                                        secondaryPageActive
                                            ? "desktop-more-trigger--active"
                                            : "",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                    onClick={() =>
                                        setMoreOpen((open) => !open)
                                    }
                                    aria-expanded={moreOpen}
                                    aria-haspopup="menu"
                                >
                                    More
                                    <ChevronDown
                                        size={15}
                                        aria-hidden="true"
                                    />
                                </button>

                                <AnimatePresence>
                                    {moreOpen && (
                                        <motion.div
                                            className="desktop-more-menu"
                                            role="menu"
                                            initial={
                                                reduceMotion
                                                    ? false
                                                    : {
                                                        opacity: 0,
                                                        y: -8,
                                                        scale: 0.97,
                                                    }
                                            }
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -6,
                                                scale: 0.98,
                                            }}
                                            transition={{
                                                duration: 0.17,
                                            }}
                                        >
                                            <p className="desktop-more-label">
                                                More pages
                                            </p>

                                            {secondaryLinks.map(
                                                ({ to, label }) => (
                                                    <NavLink
                                                        key={to}
                                                        to={to}
                                                        role="menuitem"
                                                        className={({
                                                            isActive,
                                                        }) =>
                                                            isActive
                                                                ? "desktop-more-link desktop-more-link--active"
                                                                : "desktop-more-link"
                                                        }
                                                    >
                                                        <span>{label}</span>
                                                        <ArrowUpRight
                                                            size={14}
                                                            aria-hidden="true"
                                                        />
                                                    </NavLink>
                                                ),
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-actions">
                        <a
                            href="https://github.com/icecold009"
                            target="_blank"
                            rel="noreferrer"
                            className="nav-icon-button nav-github-button"
                            aria-label="Open Shaurya's GitHub profile"
                        >
                            <GithubIcon size={18} />
                        </a>

                        <button
                            type="button"
                            className="nav-icon-button"
                            onClick={toggleTheme}
                            aria-label={
                                isDark
                                    ? "Switch to light mode"
                                    : "Switch to dark mode"
                            }
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={theme}
                                    className="theme-icon"
                                    initial={
                                        reduceMotion
                                            ? false
                                            : {
                                                opacity: 0,
                                                rotate: -35,
                                                scale: 0.75,
                                            }
                                    }
                                    animate={{
                                        opacity: 1,
                                        rotate: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        rotate: 35,
                                        scale: 0.75,
                                    }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {isDark ? (
                                        <Sun size={18} />
                                    ) : (
                                        <Moon size={18} />
                                    )}
                                </motion.span>
                            </AnimatePresence>
                        </button>

                        <button
                            ref={menuTriggerRef}
                            type="button"
                            className={[
                                "mobile-menu-trigger",
                                menuOpen
                                    ? "mobile-menu-trigger--open"
                                    : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            onClick={() =>
                                setMenuOpen((open) => !open)
                            }
                            aria-label={
                                menuOpen
                                    ? "Close navigation menu"
                                    : "Open navigation menu"
                            }
                            aria-expanded={menuOpen}
                            aria-controls="mobile-navigation"
                        >
                            <span>Menu</span>
                            {menuOpen ? (
                                <X size={19} />
                            ) : (
                                <Menu size={19} />
                            )}
                        </button>
                    </div>
                </nav>
            </header>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-nav-layer"
                        initial={
                            reduceMotion ? false : { opacity: 0 }
                        }
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.button
                            type="button"
                            className="mobile-nav-backdrop"
                            onClick={closeMenu}
                            aria-label="Close navigation menu"
                            tabIndex={-1}
                        />

                        <motion.aside
                            id="mobile-navigation"
                            ref={mobilePanelRef}
                            className="mobile-nav-panel"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Navigation menu"
                            onKeyDown={handleMobileKeyDown}
                            initial={
                                reduceMotion
                                    ? false
                                    : {
                                        opacity: 0,
                                        x: "100%",
                                    }
                            }
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            exit={{
                                opacity: 0,
                                x: "100%",
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 340,
                                damping: 34,
                            }}
                        >
                            <div className="mobile-nav-header">
                                <Link
                                    to="/"
                                    className="mobile-nav-identity"
                                    onClick={closeMenu}
                                >
                                    <span className="nav-brand-mark">
                                        S
                                    </span>

                                    <span>
                                        <strong>Shaurya</strong>
                                        <small>Portfolio navigation</small>
                                    </span>
                                </Link>

                                <button
                                    ref={closeButtonRef}
                                    type="button"
                                    className="mobile-nav-close"
                                    onClick={closeMenu}
                                    aria-label="Close navigation menu"
                                >
                                    <X size={21} />
                                </button>
                            </div>

                            <div className="mobile-nav-scroll">
                                <p className="mobile-nav-section-label">
                                    Navigate
                                </p>

                                <div className="mobile-primary-links">
                                    {primaryLinks.map(
                                        ({ to, label, index }, itemIndex) => (
                                            <motion.div
                                                key={to}
                                                initial={
                                                    reduceMotion
                                                        ? false
                                                        : {
                                                            opacity: 0,
                                                            x: 22,
                                                        }
                                                }
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                transition={{
                                                    delay:
                                                        0.06 +
                                                        itemIndex * 0.045,
                                                }}
                                            >
                                                <NavLink
                                                    to={to}
                                                    onClick={closeMenu}
                                                    className={({
                                                        isActive,
                                                    }) =>
                                                        isActive
                                                            ? "mobile-primary-link mobile-primary-link--active"
                                                            : "mobile-primary-link"
                                                    }
                                                >
                                                    <span className="mobile-link-index">
                                                        {index}
                                                    </span>

                                                    <span className="mobile-link-label">
                                                        {label}
                                                    </span>

                                                    <ArrowUpRight
                                                        className="mobile-link-arrow"
                                                        size={19}
                                                        aria-hidden="true"
                                                    />
                                                </NavLink>
                                            </motion.div>
                                        ),
                                    )}
                                </div>

                                <div className="mobile-secondary-section">
                                    <p className="mobile-nav-section-label">
                                        Explore more
                                    </p>

                                    <div className="mobile-secondary-links">
                                        {secondaryLinks.map(
                                            ({ to, label }) => (
                                                <NavLink
                                                    key={to}
                                                    to={to}
                                                    onClick={closeMenu}
                                                    className={({
                                                        isActive,
                                                    }) =>
                                                        isActive
                                                            ? "mobile-secondary-link mobile-secondary-link--active"
                                                            : "mobile-secondary-link"
                                                    }
                                                >
                                                    {label}
                                                </NavLink>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mobile-nav-footer">
                                <div>
                                    <span className="mobile-status-dot" />
                                    <p>
                                        Open to internships and
                                        collaborations
                                    </p>
                                </div>

                                <div className="mobile-social-links">
                                    <a
                                        href="https://github.com/icecold009"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <GithubIcon size={17} />
                                        GitHub
                                    </a>

                                    <a href="mailto:sariashaurya09@gmail.com">
                                        <Mail size={17} />
                                        Email
                                    </a>
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