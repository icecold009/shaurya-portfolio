import { useEffect } from "react";
import {
    BrowserRouter,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "framer-motion";
import { useLenis } from "lenis/react";

import Navbar from "./components/Navbar";
import Blog from "./components/Blog";
import Footer from "./components/Footer";

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

function ScrollToTop() {
    const { pathname } = useLocation();
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, {
                immediate: true,
            });

            return;
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto",
        });
    }, [pathname, lenis]);

    return null;
}

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

                    <Route
                        path="/about"
                        element={<AboutPage />}
                    />

                    <Route path="/blog" element={<Blog />} />

                    <Route
                        path="/contact"
                        element={<ContactPage />}
                    />

                    <Route
                        path="/uses"
                        element={<UsesPage />}
                    />

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
            <ScrollToTop />

            <Navbar />

            <main>
                <AnimatedRoutes />
            </main>

            <Footer />
        </BrowserRouter>
    );
}

export default App;