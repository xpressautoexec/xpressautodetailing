import { createRoot, hydrateRoot } from "react-dom/client";
import App, { preloadRoute } from "./App.tsx";
import "./index.css";
import { captureAttribution } from "./lib/attribution";
import { initAnalytics } from "./lib/tracking";

captureAttribution();
initAnalytics();

const container = document.getElementById("root")!;

// Routes are prerendered to static HTML at build time. When that markup is
// present we hydrate it instead of throwing it away, so crawlers and users
// both get real content in the initial response.
if (container.hasChildNodes()) {
  // Load this page's code first so hydration matches the prerendered HTML (no flash).
  preloadRoute(window.location.pathname).then(() => hydrateRoot(container, <App />));
} else {
  createRoot(container).render(<App />);
}
