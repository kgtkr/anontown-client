import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { ViteFaviconsPlugin } from "vite-plugin-favicon";
import { loadEnv, htmlInject } from "@anontown-frontend/common/dist/env";

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      VitePWA(),
      ViteFaviconsPlugin({
        logo: "icon.svg",
        inject: true,
        favicons: {
          appName: "Anontown",
          appDescription: "高機能匿名掲示板Anontown",
          background: "#006400",
          theme_color: "#00ff00",
          icons: {},
        },
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
