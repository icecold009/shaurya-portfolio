import {
    Activity,
    BarChart3,
    Braces,
    FileSpreadsheet,
    FileText,
    Fingerprint,
    GitPullRequest,
    ScanFace,
    ShieldCheck,
    Sparkles,
} from "lucide-react";
import {
    SiDocker,
    SiExpress,
    SiFfmpeg,
    SiFlask,
    SiGit,
    SiGithub,
    SiGooglegemini,
    SiJupyter,
    SiNextdotjs,
    SiOpencv,
    SiPandas,
    SiPostgresql,
    SiPrisma,
    SiPytest,
    SiPython,
    SiReact,
    SiScikitlearn,
    SiSpotify,
    SiSupabase,
    SiTailwindcss,
    SiThemoviedatabase,
    SiTypescript,
    SiVercel,
    SiVite,
} from "react-icons/si";

import "../styles/components/project-technology-tag.css";

const TECHNOLOGY_ICONS = {
    activity: Activity,
    barChart3: BarChart3,
    csv: FileSpreadsheet,
    docker: SiDocker,
    express: SiExpress,
    facerecognition: ScanFace,
    ffmpeg: SiFfmpeg,
    fingerprinting: Fingerprint,
    flask: SiFlask,
    fireworksai: Sparkles,
    git: SiGit,
    github: SiGithub,
    gemini: SiGooglegemini,
    jupyter: SiJupyter,
    matplotlib: BarChart3,
    nextjs: SiNextdotjs,
    opencv: SiOpencv,
    pandas: SiPandas,
    pdfparsing: FileText,
    postgresql: SiPostgresql,
    prisma: SiPrisma,
    pullrequests: GitPullRequest,
    pytest: SiPytest,
    python: SiPython,
    react: SiReact,
    realtime: Activity,
    rls: ShieldCheck,
    scikitlearn: SiScikitlearn,
    spotifyapi: SiSpotify,
    supabase: SiSupabase,
    tailwind: SiTailwindcss,
    tmdb: SiThemoviedatabase,
    typescript: SiTypescript,
    vercel: SiVercel,
    vite: SiVite,
};

function normalizeTechnology(value) {
    const normalized = value.toLowerCase().replace(/[^a-z0-9]/g, "");
    return normalized === "ffmeg" ? "ffmpeg" : normalized;
}

export default function ProjectTechnologyTag({ technology, compact = false }) {
    const key = normalizeTechnology(technology);
    const Icon = TECHNOLOGY_ICONS[key] ?? Braces;
    const iconSize = compact ? 11 : 13;

    return (
        <span
            className={`project-tech-tag${compact ? " project-tech-tag--compact" : ""}`}
        >
            <Icon
                className="project-tech-tag__icon"
                size={iconSize}
                aria-hidden="true"
                focusable="false"
            />
            <span className="project-tech-tag__label">{technology}</span>
        </span>
    );
}
