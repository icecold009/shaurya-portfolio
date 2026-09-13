import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { BrowserRouter, Link, useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CookieBanner from "../components/CookieBanner";

import AnimatedRoutes from "./AnimatedRoutes";
import RouteMetadata from "../components/RouteMetadata";
import ScrollToTop from "./ScrollToTop";

function MobileContactCta() {
    const { pathname } = useLocation();

    if (["/contact", "/contact/thanks", "/privacy", "/terms"].includes(pathname)) {
        return null;
    }

    return (
        <Link className="mobile-contact-cta" to="/contact">
            <span>Have a project in mind?</span>
            <strong>Let&apos;s talk <span aria-hidden="true">↗</span></strong>
        </Link>
    );
}

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
            <MobileContactCta />
            <CookieBanner />
            <Analytics />
        </BrowserRouter>
    );
}

