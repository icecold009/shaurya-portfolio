import {
    BrowserRouter,
    Link,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "framer-motion";

import Navbar from "./components/Navbar";
import Blog from "./components/Blog";

import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import UsesPage from "./pages/UsesPage";
import NotFound from "./pages/NotFound";
import ArtworkPage from "./pages/ArtworkPage";
import CertificatesPage from "./pages/CertificatesPage";
import AchievementsPage from "./pages/AchievementsPage";

import { EDITORIAL_EASE } from "./lib/motion";

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

function AnimatedRoutes() {
    const location = useLocation();
    const shouldReduceMotion = useReducedMotion();

    const transitionProps = shouldReduceMotion
        ? {}
        : {
            initial: {
                opacity: 0,
                y: 18,
            },
            animate: {
                opacity: 1,
                y: 0,
            },
            exit: {
                opacity: 0,
                y: -12,
            },
            transition: {
                duration: 0.45,
                ease: EDITORIAL_EASE,
            },
        };

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={location.pathname}
                {...transitionProps}
            >
                <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/projects"
                        element={<ProjectsPage />}
                    />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route
                        path="/contact"
                        element={<ContactPage />}
                    />
                    <Route path="/uses" element={<UsesPage />} />
                    <Route
                        path="/artwork"
                        element={<ArtworkPage />}
                    />
                    <Route
                        path="/certificates"
                        element={<CertificatesPage />}
                    />
                    <Route
                        path="/achievements"
                        element={<AchievementsPage />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <main>
                <AnimatedRoutes />
            </main>

            <footer className="site-footer">
                <div className="footer-inner">
                    <div className="footer-callout">
                        <p className="footer-eyebrow">
                            Available for internships and collaborations
                        </p>

                        <h2>
                            Have an idea worth
                            <span> building properly?</span>
                        </h2>

                        <Link
                            to="/contact"
                            className="footer-contact-link"
                        >
                            Start a conversation
                            <span aria-hidden="true">↗</span>
                        </Link>
                    </div>

                    <div className="footer-directory">
                        <div className="footer-identity">
                            <Link to="/">Shaurya Saria</Link>

                            <p>
                                Student developer building full-stack
                                applications, AI tools and thoughtful
                                digital experiences.
                            </p>
                        </div>

                        <nav
                            className="footer-nav"
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
                            className="footer-explore"
                            aria-label="More pages"
                        >
                            <p>Explore</p>

                            {footerExplore.map(({ to, label }) => (
                                <Link key={to} to={to}>
                                    {label}
                                </Link>
                            ))}
                        </nav>

                        <div className="footer-social">
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

                    <div className="footer-bottom">
                        <p>
                            © {new Date().getFullYear()} Shaurya Saria
                        </p>

                        <p>Designed and built in Bengaluru, India</p>
                    </div>
                </div>
            </footer>
        </BrowserRouter>
    );
}

export default App;