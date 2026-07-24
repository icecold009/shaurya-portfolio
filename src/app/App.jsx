import { BrowserRouter } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import AnimatedRoutes from "./AnimatedRoutes";
import ScrollToTop from "./ScrollToTop";

export default function App() {
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