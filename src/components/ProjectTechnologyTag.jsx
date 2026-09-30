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

const TECHNOLOGY_COLORS = {
    docker: "#2496ed",
    express: "#8a91a0",
    facerecognition: "#da8e85",
    ffmpeg: "#80b918",
    fingerprinting: "#a782d7",
    flask: "#758092",
    fireworksai: "#f18d67",
    git: "#f05032",
    github: "#7a8392",
    gemini: "#8e75ff",
    jupyter: "#f37626",
    matplotlib: "#7fa7a1",
    nextjs: "#7c8492",
    opencv: "#7964e8",
    pandas: "#a58ade",
    pdfparsing: "#d16b77",
    postgresql: "#5b87d3",
    prisma: "#7180c6",
    pullrequests: "#8a97aa",
    pytest: "#5b9c63",
    python: "#4f9bd8",
    react: "#53c1de",
    realtime: "#dfb66b",
    rls: "#88a3cf",
    scikitlearn: "#eea33a",
    spotifyapi: "#1db954",
    supabase: "#3ecf8e",
    tailwind: "#38bdf8",
    tmdb: "#01b878",
    typescript: "#4c8dcc",
    vercel: "#9aa2ae",
    vite: "#a89aff",
    csv: "#6da7cf",
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
            style={{ "--project-tech-mark-color": TECHNOLOGY_COLORS[key] ?? "currentColor" }}
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
