import About from "../components/About";
import Skills from "../components/skills";
export default function AboutPage() {
    return (
        <div className="page-wrapper">
            <div className="page-header">
                <p className="page-breadcrumb">about</p>
            </div>
            <About />
            <Skills />
        </div>
    );
}