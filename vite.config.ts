import { join, resolve } from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import { peerDependencies } from "./package.json";

// https://vite.dev/config/
export default defineConfig({
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
      // Exclude peer dependencies from the bundle to reduce bundle size
      external: ["react/jsx-runtime", ...Object.keys(peerDependencies)],
    },
  },
});
