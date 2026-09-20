import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DISMISS_KEY = "portfolio-cookie-banner-dismissed";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        try {
            setIsVisible(window.localStorage.getItem(DISMISS_KEY) !== "true");
        } catch {
            setIsVisible(true);
        }
    }, []);

    function dismissBanner() {
        try {
            window.localStorage.setItem(DISMISS_KEY, "true");
        } catch {
            // The notice can still be dismissed for the current render.
        }
        setIsVisible(false);
    }

    if (!isVisible) {
        return null;
    }

    return (
        <aside className="cookie-banner" role="status" aria-label="Privacy notice">
            <div>
                <strong>Small privacy note</strong>
                <p>
                    This site uses privacy-friendly analytics and local browser storage for preferences. It does not set advertising cookies.
                </p>
            </div>
            <div className="cookie-banner__actions">
                <Link to="/privacy" onClick={dismissBanner}>Read privacy</Link>
                <button type="button" onClick={dismissBanner}>Got it</button>
            </div>
        </aside>
    );
}
