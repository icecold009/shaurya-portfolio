import Projects from "../components/Projects";
export default function ProjectsPage() {
    return (
        <div className="page-wrapper">
            <div className="page-header">
                <p className="page-breadcrumb">projects</p>
            </div>
            <Projects />
        </div>
    );
}