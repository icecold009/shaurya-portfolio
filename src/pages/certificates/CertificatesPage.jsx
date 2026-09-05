import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import MediaDetailDialog from "../../components/MediaDetailDialog";
import {
    getMediaFromSearchParams,
    updateMediaSearchParams,
} from "../../lib/mediaSelection";

const sections = [
    {
        id: "competitions",
        label: "Competitions",
        groups: [
            {
                org: "IYMC: International Youth Math Challenge",
                entries: [
                    {
                        title: "IYMC Final Round Silver",
                        year: "2026",
                        img: "/certificates/images/cert-IYMC-Final-Round-Silver.webp",
                        pdf: "/certificates/pdfs/cert-IYMC-Final-Round-Silver.pdf",
                    },
                    {
                        title: "IYMC Pre-Final Round",
                        year: "2026",
                        img: "/certificates/images/cert-IYMC-Pre-Final-round.webp",
                        pdf: "/certificates/pdfs/cert-IYMC-Pre-Final-round.pdf",
                    },
                    {
                        title: "IYMC Qualification Round",
                        year: "2025",
                        img: "/certificates/images/cert-IYMC-Qualification-Round.webp",
                        pdf: "/certificates/pdfs/cert-IYMC-Qualification-Round.pdf",
                    },
                    {
                        title: "IYMC Performance Report",
                        year: "2024",
                        img: "/certificates/images/cert-IYMC-Performance-Report.webp",
                        pdf: "/certificates/pdfs/cert-IYMC-Performance-Report.pdf",
                    }
                ],
            },
            {
                org: "EWB: Engineers Without Borders",
                entries: [
                    {
                        title: "MIT EWB Individual Certificate",
                        year: "2026",
                        img: "/certificates/images/cert-MIT-EWB-Individual.webp",
                        pdf: "/certificates/pdfs/cert-MIT-EWB-Individual.pdf",
                    },
                    {
                        title: "MIT EWB Team Certificate",
                        year: "2026",
                        img: "/certificates/images/cert-MIT-EWB-Team.webp",
                        pdf: "/certificates/pdfs/cert-MIT-EWB-Team.pdf",
                    },
                    {
                        title: "MIT EWB Participant Certificate",
                        year: "2026",
                        img: "/certificates/images/cert-MIT-EWB-Participation.webp",
                        pdf: "/certificates/pdfs/cert-MIT-EWB-Participation.pdf",
                    },
                ],
            },
            {
                org: "NFO: National Finance Olympiad",
                entries: [
                    {
                        title: "NFO Stage Qualifier",
                        year: "2025",
                        img: "/certificates/images/cert-NFO-Stage-1.webp",
                        pdf: "/certificates/pdfs/cert-NFO-Stage-1.pdf",
                    },
                    {
                        title: "NFO Stage National",
                        year: "2026",
                        img: "/certificates/images/cert-NFO-Stage-National.webp",
                        pdf: "/certificates/pdfs/cert-NFO-Stage-National.pdf",
                    },
                    {
                        title: "NFO Stage Qualifier Performance Report",
                        year: "2025",
                        img: "/certificates/images/cert-NFO-Performance-Report-2025.webp",
                        pdf: "/certificates/pdfs/cert-NFO-Performance-Report-2025.pdf",
                    },
                    {
                        title: "NFO Stage National Performance Report",
                        year: "2026",
                        img: "/certificates/images/cert-NFO-Performance-Report-2026.webp",
                        pdf: "/certificates/pdfs/cert-NFO-Performance-Report-2026.pdf",
                    }
                ],
            },
            {
                org: "Wharton: Investment Competition",
                entries: [
                    {
                        title: "Wharton Investment Competition",
                        year: "2025",
                        img: "/certificates/images/cert-Wharton-Investment-Competition.webp",
                        pdf: null,
                    },
                ],
            },
            {
                org: "Immerse Education",
                entries: [
                    {
                        title: "Immerse Essay Scholarship",
                        year: "2025",
                        img: "/certificates/images/cert-Immerse-Gmail1-Essay-Scholarship.webp",
                        pdf: "/certificates/pdfs/cert-Immerse-Gmail1-Essay-Scholarship.pdf",
                    },
                    {
                        title: "Immerse Essay Scholarship",
                        year: "2025",
                        img: "/certificates/images/cert-Immerse-Gmail2-Essay-Scholarship.webp",
                        pdf: "/certificates/pdfs/cert-Immerse-Gmail2-Essay-Scholarship.pdf",
                    },
                    {
                        title: "Immerse Essay Certificate",
                        year: "2025",
                        img: "/certificates/images/cert-Immerse-Essay.webp",
                        pdf: "/certificates/pdfs/cert-Immerse-Essay.pdf",
                    },
                    {
                        title: "Immerse Certified Entrant",
                        year: "2025",
                        img: "/certificates/images/cert-Immerse-Certified-Entrant.webp",
                        pdf: "/certificates/pdfs/cert-Immerse-Certified-Entrant.pdf",
                    },
                ],
            },
        ],
    },
    {
        id: "programs",
        label: "Programs",
        groups: [
            {
                org: "Clever Harvey",
                entries: [
                    {
                        title: "Junior MBA",
                        year: "2025",
                        img: "/certificates/images/cert-Clever-Harvey-JuniorMBA.webp",
                        pdf: "/certificates/pdfs/cert-Clever-Harvey-JuniorMBA.pdf",
                    },
                ],
            },
            {
                org: "Vivek Agro",
                entries: [
                    {
                        title: "Internship Certificate",
                        year: "2025",
                        img: "/certificates/images/cert-Vivek-agro-internship.webp",
                        pdf: "/certificates/pdfs/cert-Vivek-agro-internship.pdf",
                    },
                ],
            },
            {
                org: "IIT Madras",
                entries: [
                    {
                        title: "Data Science Certificate",
                        year: "2025",
                        img: "/certificates/images/cert-IIT-Madras-Data-Science.webp",
                        pdf: null,
                    },
                ],
            },
        ],
    },
    {
        id: "coding",
        label: "Coding & ML",
        groups: [
            {
                org: "Google",
                entries: [
                    {
                        title: "30 Days of AI",
                        year: "2025",
                        img: "/certificates/images/cert-30-days-of-AI.webp",
                        pdf: null,
                    },
                ],
            },
            {
                org: "Anthropic",
                entries: [
                    {
                        title: "Claude Code in Action",
                        year: "2025",
                        img: "/certificates/images/cert-Claude-Code-In-Action.webp",
                        pdf: "/certificates/pdfs/cert-Claude-Code-In-Action.pdf",
                    },
                    {
                        title: "AI Fluency: Capabilities and Limitations",
                        year: "2025",
                        img: "/certificates/images/cert-AI-fluency-Capabilities-and-limitations.webp",
                        pdf: "/certificates/pdfs/cert-AI-fluency-Capabilities-and-limitations.pdf",
                    },
                ],
            },
            {
                org: "Springpod UCAS",
                entries: [
                    {
                        title: "Amazon Data Analysis",
                        year: "2025",
                        img: "/certificates/images/cert-Amazon-Data-analysis.webp",
                        pdf: "/certificates/pdfs/cert-Amazon-Data-analysis.pdf",
                    },
                    {
                        title: "Amazon Future Careers Experience",
                        year: "2025",
                        img: "/certificates/images/cert-Amazon-Future-careers-experience.webp",
                        pdf: "/certificates/pdfs/cert-Amazon-Future-careers-experience.pdf",
                    },
                ],
            },
            {
                org: "freeCodeCamp",
                entries: [
                    {
                        title: "Data Analysis Certification",
                        year: "2025",
                        img: "/certificates/images/cert-Freecodecamp-Data.webp",
                        pdf: null,
                    },
                    {
                        title: "Web Development Certification",
                        year: "2025",
                        img: "/certificates/images/cert-Freecodecamp-Web.webp",
                        pdf: null,
                    },
                ],
            },
            {
                org: "Udemy",
                entries: [
                    {
                        title: "Web Development Bootcamp",
                        year: "2025",
                        img: "/certificates/images/cert-Udemy-Web-development.webp",
                        pdf: null,
                    },
                ],
            },
        ],
    },
];

function getCertificateEntry(section, group, entry, groupIndex, entryIndex) {
    return {
        ...entry,
        id: `${section.id}-${groupIndex + 1}-${entryIndex + 1}`,
        organization: group.org,
        section: section.label,
    };
}

export default function CertificatesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const certificateEntries = sections.flatMap((section) =>
        section.groups.flatMap((group, groupIndex) =>
            group.entries.map((entry, entryIndex) =>
                getCertificateEntry(section, group, entry, groupIndex, entryIndex),
            ),
        ),
    );
    const selectedCertificate = getMediaFromSearchParams(
        searchParams,
        "certificate",
        certificateEntries,
    );
    const triggerElementRef = useRef(null);

    useEffect(() => {
        if (!searchParams.has("certificate") || selectedCertificate) {
            return undefined;
        }

        setSearchParams(updateMediaSearchParams(searchParams, "certificate"), { replace: true });
        return undefined;
    }, [searchParams, selectedCertificate?.id, setSearchParams]);

    const openCertificate = useCallback(
        (certificate, triggerElement) => {
            triggerElementRef.current = triggerElement;
            setSearchParams(
                updateMediaSearchParams(searchParams, "certificate", certificate.id),
                { replace: false },
            );
        },
        [searchParams, setSearchParams],
    );

    const closeCertificate = useCallback(() => {
        setSearchParams(updateMediaSearchParams(searchParams, "certificate"), {
            replace: false,
        });
    }, [searchParams, setSearchParams]);

    return (
        <>
            <div className="page-wrapper">
                <div className="page-header">
                    <p className="page-breadcrumb">certificates</p>
                </div>

                <section className="artwork-section">
                    <div className="section-heading">
                        <p className="section-label">Proof of the work</p>
                        <h1>Certificates &amp; <em>awards.</em></h1>
                    </div>

                    {/* Section tabs */}
                    <div className="cert-tabs">
                        {sections.map((section) => (
                            <a key={section.id} href={`#${section.id}`} className="tl-filter">
                                {section.label}
                            </a>
                        ))}
                    </div>

                    {sections.map((section) => (
                        <div key={section.id} id={section.id} className="cert-section">
                            {/* Section header */}
                            <div className="cert-section-header">
                                <span className="section-label">{section.label}</span>
                            </div>

                            {section.groups.map((group, groupIndex) => (
                                <div key={group.org} className="cert-group">
                                    {/* Org divider */}
                                    <p className="cert-org-label">{group.org}</p>

                                    {/* Cards grid: reuses existing artwork-grid */}
                                    <div className="artwork-grid">
                                        {group.entries.map((entry, entryIndex) => {
                                            const certificate = getCertificateEntry(
                                                section,
                                                group,
                                                entry,
                                                groupIndex,
                                                entryIndex,
                                            );

                                            return (
                                                <figure key={certificate.id} className="artwork-card">
                                                    {certificate.img && (
                                                        <button
                                                            type="button"
                                                            className="artwork-card-trigger"
                                                            onClick={(event) => openCertificate(certificate, event.currentTarget)}
                                                            aria-haspopup="dialog"
                                                            aria-label={`Open ${certificate.title} certificate`}
                                                        >
                                                            <div className="artwork-img-wrap">
                                                                <img
                                                                    src={certificate.img}
                                                                    alt={certificate.title}
                                                                    loading="lazy"
                                                                    className="artwork-img"
                                                                />
                                                            </div>
                                                        </button>
                                                    )}
                                                    <figcaption className="artwork-caption">
                                                        <span className="artwork-title">{certificate.title}</span>
                                                        <span className="artwork-meta">
                                                            {certificate.organization} · {certificate.year}
                                                        </span>
                                                        {certificate.pdf && (
                                                            <a
                                                                href={certificate.pdf}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="cert-pdf-link"
                                                                aria-label={`Open PDF for ${certificate.title} in a new tab`}
                                                            >
                                                                view pdf ↗
                                                            </a>
                                                        )}
                                                    </figcaption>
                                                </figure>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </section>
            </div>

            {selectedCertificate ? (
                <MediaDetailDialog
                    item={{
                        ...selectedCertificate,
                        src: selectedCertificate.img,
                    }}
                    kind="certificate"
                    onClose={closeCertificate}
                    triggerElement={triggerElementRef.current}
                />
            ) : null}
        </>
    );
}
