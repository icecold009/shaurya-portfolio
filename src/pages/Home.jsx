import Hero from "../components/Hero";
import Skills from "../components/skills";
import Projects from "../components/Projects";
import "./Home.css";

export default function Home() {
    return (
        <div className="home-page">
            <Hero />

            <div className="home-sections">
                <Skills />
                <Projects />
            </div>
        </div>
    );
}