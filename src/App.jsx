import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

function App() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Projects />
                <About />
                <Skills />
                <Contact />
            </main>
            <footer>
                <p>shaurya@portfolio:~$ echo "built with React + Vite" &nbsp;·&nbsp; © 2026</p>
            </footer>
        </>
    );
}

export default App;