import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: ["src/_exports/mouse-parallax"],
      formats: ["es"],
    },

    rollupOptions: {
      // external: /^lit/,
      output: {
        entryFileNames: "[name].js", // Pattern for entry file names
        chunkFileNames: "chunks/[name].[hash].js", // Pattern for chunk file names
      },
    },
  },
});
