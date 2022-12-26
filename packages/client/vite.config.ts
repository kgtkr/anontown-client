import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { loadEnv, htmlInject } from "@anontown-frontend/app-env";
import manifest from "./manifest.json";

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      VitePWA({
        includeAssets: ["icon.svg"],
        manifest,
        filename: "vite-pwa-sw.js",
        workbox: {
          maximumFileSizeToCacheInBytes: 3000000,
        },
        base: "/",
        strategies: "injectManifest",
        devOptions: {
          enabled: true,
          type: "module",
        },
        srcDir: "src",
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
      chunkSizeWarningLimit: 3000,
    },
    optimizeDeps: {
      disabled: false,
    },
  };
});
