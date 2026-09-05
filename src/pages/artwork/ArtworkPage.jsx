import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import MediaDetailDialog from "../../components/MediaDetailDialog";
import { artworkPieces } from "../../data/artwork";
import {
    getMediaFromSearchParams,
    updateMediaSearchParams,
} from "../../lib/mediaSelection";

function ArtworkPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedPiece = getMediaFromSearchParams(searchParams, "piece", artworkPieces);
    const triggerElementRef = useRef(null);

    useEffect(() => {
        if (!searchParams.has("piece") || selectedPiece) {
            return undefined;
        }

        setSearchParams(updateMediaSearchParams(searchParams, "piece"), { replace: true });
        return undefined;
    }, [searchParams, selectedPiece, setSearchParams]);

    const openPiece = useCallback(
        (piece, triggerElement) => {
            triggerElementRef.current = triggerElement;
            setSearchParams(updateMediaSearchParams(searchParams, "piece", piece.id), {
                replace: false,
            });
        },
        [searchParams, setSearchParams],
    );

    const closePiece = useCallback(() => {
        setSearchParams(updateMediaSearchParams(searchParams, "piece"), {
            replace: false,
        });
    }, [searchParams, setSearchParams]);

    return (
        <>
            <div className="page-wrapper">
                <div className="page-header">
                    <p className="page-breadcrumb">artwork</p>
                </div>
                <section className="artwork-section">
                    <div className="section-heading">
                        <p className="section-label">Work away from the terminal</p>
                        <h1>Drawing taught me to see <em>structure first.</em></h1>
                    </div>
                    <div className="artwork-grid">
                        {artworkPieces.map((piece) => (
                            <figure key={piece.id} className="artwork-card">
                                <button
                                    type="button"
                                    className="artwork-card-trigger"
                                    onClick={(event) => openPiece(piece, event.currentTarget)}
                                    aria-haspopup="dialog"
                                    aria-label={`Open ${piece.title} artwork`}
                                >
                                    <div className="artwork-img-wrap">
                                        <img
                                            src={piece.src}
                                            alt={piece.title}
                                            loading="lazy"
                                            className="artwork-img"
                                        />
                                    </div>
                                </button>
                                <figcaption className="artwork-caption">
                                    <span className="artwork-title">{piece.title}</span>
                                    <span className="artwork-meta">{piece.medium} · {piece.year}</span>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </section>
            </div>

            {selectedPiece ? (
                <MediaDetailDialog
                    item={selectedPiece}
                    kind="artwork"
                    onClose={closePiece}
                    triggerElement={triggerElementRef.current}
                />
            ) : null}
        </>
    );
}

export default ArtworkPage;
