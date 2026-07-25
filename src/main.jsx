import React from "react";
import ReactDOM from "react-dom/client";
import { ReactLenis } from "lenis/react";

import App from "./app/App.jsx";
import "lenis/dist/lenis.css";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ReactLenis
            root
            options={{
                autoRaf: true,
                anchors: true,
                lerp: 0.085,
                smoothWheel: true,
                wheelMultiplier: 0.9,
                syncTouch: false,
            }}
        >
            <App />
        </ReactLenis>
    </React.StrictMode>
);