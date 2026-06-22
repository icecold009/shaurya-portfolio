import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";

function App() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Projects />
                <About />
            </main>
        </>
    );
}

export default App;