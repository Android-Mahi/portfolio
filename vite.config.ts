import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // If you deploy to GitHub Pages under a repo subpath (e.g. user.github.io/portfolio),
  // set base to "/portfolio/". For Vercel/Netlify or a custom domain, keep "/".
  base: "/",
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        // Split the heavy 3D/animation libs into their own chunks so the initial
        // HTML/CSS paints fast and Three.js streams in afterwards.
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          motion: ["framer-motion", "gsap"],
        },
      },
    },
  },
});
