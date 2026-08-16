import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import AnimatedRoutes from "./AnimatedRoutes";
import ScrollToTop from "./ScrollToTop";

export default function App() {
    useEffect(() => {
        const loader = document.getElementById("app-loader");

        if (!loader) {
            return undefined;
        }

        const frame = window.requestAnimationFrame(() => {
            loader.classList.add("app-loader--hidden");
        });

        const cleanupTimer = window.setTimeout(() => {
            loader.remove();
        }, 300);

        return () => {
            window.cancelAnimationFrame(frame);
            window.clearTimeout(cleanupTimer);
        };
    }, []);

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
