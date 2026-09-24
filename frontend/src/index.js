import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import App from "@/App";

// Emergent preview-platform scripts (analytics + preview tooling) load ONLY on
// Emergent-hosted domains. On GitHub Pages / VPS deployments none of this runs,
// keeping the public build clean and tracker-free.
const loadEmergentPlatformScripts = () => {
  const host = window.location.hostname;
  const onEmergent = host.endsWith(".emergentagent.com") || host.endsWith("emergent.sh");
  if (!onEmergent) return;

  window.addEventListener("error", (e) => {
    if (
      e.error instanceof DOMException &&
      e.error.name === "DataCloneError" &&
      e.message &&
      e.message.includes("PerformanceServerTiming")
    ) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }, true);

  const main = document.createElement("script");
  main.src = "https://assets.emergent.sh/scripts/emergent-main.js";
  main.async = true;
  document.head.appendChild(main);

  const ph = document.createElement("script");
  ph.src = "https://ap.emergent.sh/static/array.js";
  ph.async = true;
  ph.crossOrigin = "anonymous";
  ph.onload = () => {
    if (window.posthog) {
      window.posthog.init("phc_DbsPb39SRc8z3EiQ6Dhj6ikv4H4rTKcht9d4sZSesceP", {
        api_host: "https://ap.emergent.sh",
        person_profiles: "identified_only",
        session_recording: { recordCrossOriginIframes: true, capturePerformance: false },
      });
    }
  };
  document.head.appendChild(ph);
};

loadEmergentPlatformScripts();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
