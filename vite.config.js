import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/web-search-website-/" : "/",
  build: { outDir: "dist", emptyOutDir: true },
  server: { port: 5173, strictPort: false },
  preview: { port: 4173, strictPort: false }
});
