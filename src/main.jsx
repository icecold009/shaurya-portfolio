import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app/App.jsx";
import "./styles/index.css";
import "./styles/pages/editorial-pages.css";
import "./styles/pages/legal.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
