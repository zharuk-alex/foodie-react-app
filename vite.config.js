import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  resolve: {
    alias: {
      api: "/src/api",
      assets: "/src/assets",
      styles: "/src/styles",
      components: "/src/components",
      pages: "/src/pages",
      store: "/src/store",
      helpers: "/src/helpers",
    },
  },
  plugins: [react()],
});
