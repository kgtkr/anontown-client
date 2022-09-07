import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { loadEnv, htmlInject } from "@anontown-frontend/app-env";
import manifest from "./manifest.json";

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      VitePWA({
        includeAssets: ["icon.svg", "icons/*.png"],
        manifest,
      }),
      command === "serve"
        ? (() => {
            const appEnv = loadEnv(process.env);
            return {
              name: "appEnv-inject",
              transformIndexHtml: (html) => htmlInject(appEnv, html),
            };
          })()
        : null,
    ],
    server: {
      port: 3000,
    },
    build: {
      commonjsOptions: {
        include: [],
      },
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
        },
      },
    },
    optimizeDeps: {
      include: [],
      exclude: [],
      disabled: false,
    },
  };
});
