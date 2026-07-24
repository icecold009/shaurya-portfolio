import {
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "framer-motion";

import Home from "../pages/home/Home";
import ProjectsPage from "../pages/ProjectsPage";
import AboutPage from "../pages/about/AboutPage";
import Blog from "../components/Blog";
import ContactPage from "../pages/ContactPage";
import UsesPage from "../pages/uses/UsesPage";
import NotFound from "../pages/not-found/NotFound";
import ArtworkPage from "../pages/artwork/ArtworkPage";
import CertificatesPage from "../pages/certificates/CertificatesPage";
import AchievementsPage from "../pages/AchievementsPage";

import { EDITORIAL_EASE } from "../lib/motion";

export default function AnimatedRoutes() {
    const location = useLocation();
    const shouldReduceMotion = useReducedMotion();

    const transitionProps = shouldReduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 18 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -12 },
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
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/uses" element={<UsesPage />} />
                    <Route path="/artwork" element={<ArtworkPage />} />
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