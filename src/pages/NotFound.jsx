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
        <div className="notfound-wrap">
            <p className="notfound-code">404</p>
            <pre className="notfound-terminal">{shown}<span className="notfound-cursor">█</span></pre>
            <Link to="/" className="btn btn-primary" style={{ marginTop: "2rem" }}>
                cd ~/home
            </Link>
        </div>
    );
}