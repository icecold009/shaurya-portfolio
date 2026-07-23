import Hero from "../components/Hero";
import Projects from "../components/Projects";
import "./Home.css";

export default function Home() {
    return (
        <div className="home-page">
            <Hero />

            <main className="home-sections">
                <Projects />
            </main>
        </div>
    );
}