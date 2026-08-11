import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// Routes are prerendered to static HTML at build time. When that markup is
// present we hydrate it instead of throwing it away, so crawlers and users
// both get real content in the initial response.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
