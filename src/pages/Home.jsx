import Hero from "../components/Hero";
import Skills from "../components/skills";
import Projects from "../components/Projects";
import Timeline from "../components/timeline";

export default function Home() {
    return (
        <>
            <Hero />
            <div className="home-sections">
                <Skills />
                <Projects />
                <Timeline />
            </div>
        </>
    );
}