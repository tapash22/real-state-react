import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n"; // Import the i18n configuration
import "./index.css";
import { Providers } from "./providers/Providers";
import { QueryProvider } from "./providers/QueryProvider";

//  ADD HERE (GLOBAL STYLES)
import "leaflet/dist/leaflet.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <QueryProvider>
      <Providers>
        <App />
      </Providers>
    </QueryProvider>
  </React.StrictMode>,
);
