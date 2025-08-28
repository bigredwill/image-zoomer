import { join, resolve } from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import { peerDependencies } from "./package.json";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "library") {
    // Build the library for npm publishing
    return {
      plugins: [react(), dts({ rollupTypes: true })],
      build: {
        target: "esnext",
        minify: false,
        lib: {
          entry: resolve(__dirname, join("lib", "index.ts")),
          fileName: "index",
          cssFileName: "style",
          formats: ["es", "cjs"],
        },
        rollupOptions: {
          external: ["react/jsx-runtime", ...Object.keys(peerDependencies)],
        },
      },
    };
  }

  // Default: build the demo site as static files
  return {
    plugins: [react()],
    base: process.env.NODE_ENV === "production" ? "/image-zoomer/" : "/",
    build: {
      outDir: "demo-dist",
    },
  };
});
