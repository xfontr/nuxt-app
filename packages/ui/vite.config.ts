/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";

export default defineConfig({
    plugins: [
        vue(),
        // Creates a `types` entry in package.json
        dts({ insertTypesEntry: true, tsconfigPath: "./tsconfig.app.json" }),
    ],
    publicDir: "./src/assets",

    build: {
        lib: {
            name: "@portfolio/ui",
            entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
            fileName: "index",
            formats: ["es"],
        },
        cssCodeSplit: true,
        rollupOptions: {
            external: ["vue"],
            input: {
                index: fileURLToPath(
                    new URL("./src/index.ts", import.meta.url),
                ),
            },
            output: {
                globals: { vue: "Vue" },
            },
        },
    },
    optimizeDeps: { exclude: ["@portfolio/ui"] },
    // resolve: { dedupe: ["vue"] },
});
