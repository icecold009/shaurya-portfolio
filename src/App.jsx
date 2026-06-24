import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import UsesPage from "./pages/UsesPage";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/uses" element={<UsesPage />} />
                </Routes>
            </main>
            <footer>
                <p>shaurya@portfolio:~$ echo "built with React + Vite" &nbsp;·&nbsp; © 2026</p>
            </footer>
        </BrowserRouter>
    );
}

export default App;