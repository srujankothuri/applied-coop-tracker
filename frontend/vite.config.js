import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In development, Vite forwards /api requests to the Express server,
// so the browser sees one origin and no CORS setup is needed.
// In production, frontend/vercel.json forwards /api to the deployed
// Express API, which keeps the same single-origin setup.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
