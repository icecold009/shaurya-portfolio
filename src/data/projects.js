import { positioningStatement } from "../lib/profileLinks.js";

export const projectProofIntro = `${positioningStatement} The archive shows the methods, evidence, and limitations behind each build.`;

export const projects = [
    {
        id: "stadium-pulse-ai",
        number: "01",
        year: "2026",
        category: "AI · Full-stack · Operations",
        title: "StadiumPulse AI",
        description:
            "A simulated stadium-operations dashboard for turning venue telemetry into zone status, grounded alerts and recommendations.",
        summary:
            "A simulated operations dashboard that turns venue telemetry into legible zone status, alerts, and next actions.",
        problem:
            "Event operators need a fast way to move from scattered signals to a grounded next action.",
        constraints:
            "The telemetry is simulated, so the interface must never imply live venue monitoring or production alerting.",
        contribution:
            "I shaped the product surface and full-stack workflow around an operator's questions: what is happening, where, how urgent it is and what action is suggested.",
        decisions:
            "I made the operator's questions the primary information architecture and kept alert context beside the action it supports.",
        outcome:
            "A focused prototype for making operational decisions legible during a crowded event without presenting simulated telemetry as live production data.",
        limitations:
            "It still needs real operator feedback, authorized data sources and a hosted verification pass before any deployment claim.",
        status: "Prototype · simulated data",
        stack: ["React", "Supabase", "Gemini", "Realtime", "RLS"],
        github: "https://github.com/icecold009/stadiumpulse-ai",
        visual: "stadium",
        thumbnail: "/projects/stadiumpulse-live-login.png",
        thumbnailAlt: "StadiumPulse AI PulseOps command center sign-in screen",
        accent: "01",
    },
    {
        id: "audio-recognition",
        number: "02",
        year: "2025",
        category: "Audio · Python · Flask",
        title: "Audio Recognition",
        description:
            "The repository-linked local-first Shazam-style project, separate from the earlier React + Supabase browser prototype covered in the companion note.",
        summary:
            "A local-first recognition path from microphone or upload to normalized audio and fingerprint matching, with its earlier browser prototype documented separately.",
        problem:
            "Recognition is only useful when inconsistent audio inputs can reach one understandable result path.",
        constraints:
            "Uploads, microphone capture, conversion and no-match states need to stay bounded and inspectable on a local-first stack.",
        contribution:
            "I built the shared audio pipeline, Flask browser UI and CLI flow, then added provider adapters alongside a local spectrogram and constellation-hash matcher.",
        decisions:
            "I kept provider adapters beside a local matcher so the interface can distinguish a useful result from an unavailable provider.",
        outcome:
            "One same-origin application for microphone and file recognition, with bounded input handling, normalized results and honest no-match states.",
        limitations:
            "Catalog coverage, noisy audio performance and any public hosted flow remain to be measured outside the repository.",
        status: "Prototype · source linked",
        stack: ["Python", "Flask", "FFmpeg", "Fingerprinting", "Docker"],
        github: "https://github.com/icecold009/Audio-Recognition",
        visual: "music",
        thumbnail: "/projects/audio-recognition-fft.png",
        thumbnailAlt: "Audio Recognition frequency spectrum diagnostic",
        thumbnailFit: "contain",
        accent: "02",
    },
    {
        id: "past-paper-ai",
        number: "03",
        year: "2025",
        category: "Education · AI · Product design",
        title: "Past Paper AI",
        description:
            "A Cambridge A-Level study tool that turns past papers into structured practice instead of leaving revision buried inside PDFs.",
        problem:
            "Students need to reach the right question and feedback without manually searching a pile of past-paper PDFs.",
        constraints:
            "The supported paper set, extraction quality and mark-scheme context define what the product can responsibly promise.",
        contribution:
            "I designed the experience around question extraction, subject and topic filtering, and mark-scheme-aware feedback across the supported paper set.",
        decisions:
            "I treated the supported corpus and feedback path as first-class product boundaries instead of presenting every PDF as equally understood.",
        outcome:
            "A more direct revision workflow for finding the right question, practising a topic and understanding how an answer can improve.",
        limitations:
            "Coverage, model quality and real student outcomes need corpus, identity and production evidence before broader claims.",
        status: "Prototype · source linked",
        stack: ["Python", "Gemini", "PDF parsing", "Flask"],
        github: "https://github.com/icecold009/past-paper-ai",
        visual: "paper",
        thumbnail: "/projects/past-paper-ai.svg",
        thumbnailFit: "contain",
        accent: "03",
    },
    {
        id: "movie-tracker",
        number: "04",
        year: "2026",
        category: "Full-stack · Web · Data",
        title: "Movie Tracker",
        description:
            "A personal watch tracker for movies and series, built around TMDB metadata, structured ratings, watch status and a transparent recommendation baseline.",
        problem:
            "A watchlist becomes less useful when status, ratings and the next recommendation live in separate places.",
        constraints:
            "Public browsing, protected mutations, third-party metadata and recommendation logic need separate trust boundaries.",
        contribution:
            "I built the Flask and PostgreSQL application, separated public browsing from protected mutations, and shaped the watchlist around how I actually choose what to watch next.",
        decisions:
            "I kept recommendations deterministic and visible so a suggestion can be inspected instead of treated as a mysterious score.",
        outcome:
            "A clear public and admin experience with TMDB-backed cover art and deterministic recommendations that stay transparent about their limits.",
        limitations:
            "The hosted database, authentication and deployment behavior still need live verification before this is presented as a public service.",
        status: "Prototype · source linked",
        stack: ["Flask", "PostgreSQL", "Supabase", "TMDB", "Vercel"],
        github: "https://github.com/icecold009/movie-tracker",
        visual: "movie",
        thumbnail: "/projects/movie-tracker-production.png",
        thumbnailAlt: "Movie Tracker production watchlist screenshot",
        accent: "04",
    },
    {
        id: "face-attendance-system",
        number: "05",
        year: "2026",
        category: "Computer vision · Offline · Flask",
        title: "Face Attendance System",
        description:
            "A local-first face recognition system that turns a webcam into an attendance workflow without requiring a cloud service.",
        problem:
            "Small teams need attendance records without sending camera input to a third-party service by default.",
        constraints:
            "Camera permissions, local dependencies, duplicate marks and uncertain recognition results must fail visibly.",
        contribution:
            "I built the Flask dashboard, enrollment workflow, live recognition loop, attendance deduplication and CSV reporting path, with a dependency-safe fallback for development.",
        decisions:
            "I kept the workflow local and separated enrollment, recognition and export so each step can be checked independently.",
        outcome:
            "A self-contained workflow for enrolling people, recognizing faces at the camera and producing daily records while keeping the runtime local and inspectable.",
        limitations:
            "Recognition accuracy, consent, hardware coverage and real-world privacy review are outside this portfolio preview.",
        status: "Prototype · local-first",
        stack: ["Python", "OpenCV", "Flask", "face-recognition", "CSV"],
        github: "https://github.com/icecold009/face-attendance-opencv-python",
        visual: "attendance",
        thumbnail: "/projects/face-attendance.svg",
        thumbnailFit: "contain",
        accent: "05",
    },
    {
        id: "f1-championship-prediction",
        number: "06",
        year: "2026",
        category: "Data science · ML · Evaluation",
        title: "F1 Championship Prediction",
        description:
            "A leakage-safe forecasting study that estimates final Formula 1 standings from signals available before a season begins.",
        summary:
            "A leakage-safe forecasting study that tests pre-season signals against a simple previous-season baseline.",
        homeCategory: "ML · Evaluation · Research",
        problem:
            "A forecast is not useful if its features quietly contain information from after the prediction point.",
        constraints:
            "Chronological splits, pre-season features and a simple baseline are more important than a flattering single score.",
        contribution:
            "I designed the leak-aware feature pipeline, rolling-origin evaluation and report generation so every forecast can be traced back to an earlier season.",
        decisions:
            "I compared the model with a previous-season baseline and treated the evaluation design as part of the result.",
        outcome:
            "A reproducible benchmark whose most useful lesson was that a simple previous-season baseline can deserve more trust than a complex model.",
        limitations:
            "The dataset is historical and the forecast is not a live betting, strategy or future-results guarantee.",
        status: "Research study · source linked",
        stack: ["Python", "Pandas", "scikit-learn", "Jupyter", "Pytest"],
        github: "https://github.com/icecold009/f1-championship-prediction",
        visual: "f1",
        thumbnail: "/projects/f1-predicted-vs-actual-2023.png",
        thumbnailAlt: "F1 Championship Prediction chart comparing predicted and actual standings",
        thumbnailFit: "contain",
        accent: "06",
    },
    {
        id: "token-smart-router",
        number: "07",
        year: "2026",
        category: "AI · Routing · Full-stack",
        title: "Token Smart Router",
        description:
            "A compact AI routing layer that answers simple prompts locally and sends genuinely complex requests to a configured Fireworks model.",
        problem:
            "Not every prompt needs a hosted model, but the cost and routing decision is often hidden from the person using the tool.",
        constraints:
            "The router depends on configured credentials and a deliberately small policy; it is not a general model-quality benchmark.",
        contribution:
            "I built the React/Vite interface, Express API and Docker workflow around a deliberately small routing policy that makes the cost decision visible.",
        decisions:
            "I exposed the route beside the response and kept the policy small enough to inspect before adding more model complexity.",
        outcome:
            "A focused prototype for reducing unnecessary model calls while keeping a clear path from prompt classification to hosted inference.",
        limitations:
            "Hosted inference, credentials, latency and routing quality need an authorized environment before performance claims are made.",
        status: "Prototype · hosted path unverified",
        stack: ["React", "Express", "Docker", "Fireworks AI"],
        github: "https://github.com/icecold009/token-smart-router",
        visual: "router",
        thumbnail: "/projects/token-router.svg",
        thumbnailFit: "contain",
        accent: "07",
    },
    {
        id: "student-dropout-risk-prediction",
        number: "08",
        year: "2025",
        category: "Data science · Education · Risk modeling",
        title: "Student Dropout Risk Prediction",
        description:
            "A student-dropout risk prediction project documented through a report, template workbook, sample data and an updated dataset.",
        problem:
            "A structured prediction exercise should show how the inputs and reporting support a decision, not turn a student into a fixed label.",
        constraints:
            "The available workbook, sample data and academic context limit what can be inferred responsibly.",
        contribution:
            "I completed the prediction exercise by working through the supplied workbook and datasets, keeping the analysis structured and traceable.",
        decisions:
            "I kept the report and data artifacts together so the analysis can be read as a documented exercise rather than a production risk system.",
        outcome:
            "A documented academic project showing how structured data and reporting can support risk analysis without turning a prediction into a fixed label.",
        limitations:
            "There is no linked source repository or production evaluation record in this portfolio entry.",
        status: "Archive record · source link pending",
        stack: ["Python", "Pandas", "scikit-learn", "Matplotlib"],
        github: null,
        visual: "dropout",
        thumbnail: null,
        accent: "08",
    },
];
