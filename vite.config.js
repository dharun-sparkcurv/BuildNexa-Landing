import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Forward /api/* to the contact API (yarn server) during development
    proxy: { "/api": "http://localhost:8787" },
  },
});
