import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: isSsrBuild
        ? {}
        : {
            manualChunks: {
              vendor: ["react", "react-dom", "react-router-dom"],
              animations: ["framer-motion"],
              ui: [
                "@radix-ui/react-accordion",
                "@radix-ui/react-dialog",
                "@radix-ui/react-dropdown-menu",
                "@radix-ui/react-tooltip",
              ],
            },
          },
    },
    cssMinify: true,
    minify: "esbuild",
  },
}));

