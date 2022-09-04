import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      /* command === "serve"
        ? (() => {
            const appEnv = decodeAppEnv();
            return {
              name: "appEnv-inject",
              transformIndexHtml: (html) => htmlInject(appEnv, html),
            };
          })()
        : null,*/
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
      include: ["@anontown-frontend/common"],
      exclude: [],
      disabled: false,
    },
  };
});
