// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NotFound() {
    const [shown, setShown] = useState("");
    const lines = [
        "$ cd /this/page",
        "bash: cd: /this/page: No such file or directory",
        "$ ls ../",
        "home/  projects/  about/  contact/  uses/",
        "$ _",
    ];

    useEffect(() => {
        let i = 0;
        let charIdx = 0;
        let output = "";

        const tick = setInterval(() => {
            if (i >= lines.length) { clearInterval(tick); return; }
            if (charIdx < lines[i].length) {
                output += lines[i][charIdx];
                charIdx++;
            } else {
                output += "\n";
                i++;
                charIdx = 0;
            }
            setShown(output);
        }, 28);

        return () => clearInterval(tick);
    }, []);

    return (
        <div className="page-wrapper not-found-page-shell">
            <div className="notfound-wrap">
                <h1 className="notfound-code">
                    <span aria-hidden="true">404</span>
                    <span className="sr-only">Page not found</span>
                </h1>
                <pre className="notfound-terminal">{shown}<span className="notfound-cursor">█</span></pre>
                <Link to="/" className="btn btn-primary" style={{ marginTop: "2rem" }}>
                    Return home
                </Link>
            </div>
        </div>
    );
}
