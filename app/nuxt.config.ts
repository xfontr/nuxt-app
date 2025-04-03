import { THEME } from "./configs/constants";
import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: false },
    modules: [
        "@nuxt/eslint",
        "@nuxt/fonts",
        "@nuxt/test-utils",
        "nuxt-i18n-micro",
    ],
    app: {
        head: { bodyAttrs: { class: THEME } },
    },
    future: { compatibilityVersion: 4 },
    css: [
        "@portfolio/ui/dist/index.css",
        "@portfolio/ui/src/assets/scss/index.scss",
    ],
    vite: {
        resolve: {
            alias: {
                // Required for css.preprocessorOptions.scss.additionalData
                "@portfolio/ui": fileURLToPath(
                    new URL("./node_modules/@portfolio/ui", import.meta.url),
                ),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use "@portfolio/ui/src/assets/scss/variables/_colors.scss" as *;
                        @use "@portfolio/ui/src/assets/scss/variables/_breakpoints.scss" as *;
                        @use "@portfolio/ui/src/assets/scss/variables/_distances.scss" as *;
                        @use "@portfolio/ui/src/assets/scss/variables/_fonts.scss" as *;
                    `,
                },
            },
        },
    },
    i18n: {
        locales: [{ code: "en", iso: "en-US", dir: "ltr" }],
        defaultLocale: "en",
        translationDir: "locales",
        meta: true,
        autoDetectLanguage: true,
    },
    fonts: {
        defaults: {
            weights: [300, 600, 900],
        },
    },
});
