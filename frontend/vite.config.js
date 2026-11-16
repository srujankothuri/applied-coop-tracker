import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In development, Vite forwards /api requests to the Express server,
// so the browser sees one origin and no CORS setup is needed.
// The production build goes into backend/public, which Vercel serves
// from its CDN alongside the Express API.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  build: {
    outDir: "../backend/public",
    emptyOutDir: true,
  },
});
