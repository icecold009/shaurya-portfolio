import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import AnimatedRoutes from "./AnimatedRoutes";
import RouteMetadata from "../components/RouteMetadata";
import ScrollToTop from "./ScrollToTop";

export default function App() {
    useEffect(() => {
        const loader = document.getElementById("app-loader");

        if (!loader) {
            return undefined;
        }

        if (typeof window.__appLoaderAppReady === "function") {
            window.__appLoaderAppReady();
            return undefined;
        }

        const frame = window.requestAnimationFrame(() => {
            document.getElementById("root")?.classList.add("app-loader__site-visible");
            loader.classList.add("app-loader--hidden");
        });

        const cleanupTimer = window.setTimeout(() => loader.remove(), 560);

        return () => {
            window.cancelAnimationFrame(frame);
            window.clearTimeout(cleanupTimer);
        };
    }, []);

    return (
        <BrowserRouter>
            <RouteMetadata />
            <ScrollToTop />

            <a className="skip-link" href="#main-content">
                Skip to main content
            </a>

            <Navbar />

            <main id="main-content" tabIndex={-1}>
                <AnimatedRoutes />
            </main>

            <Footer />
        </BrowserRouter>
    );
}

