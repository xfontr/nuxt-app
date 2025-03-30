import { THEME } from "./configs/constants";

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
        head: {
            bodyAttrs: {
                class: THEME,
            },
        },
    },
    future: {
        compatibilityVersion: 4,
    },
    css: ["@/assets/scss/index.scss"],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use "./assets/scss/variables/_colors.scss" as *;
                        @use "./assets/scss/variables/_breakpoints.scss" as *;
                        @use "./assets/scss/variables/_distances.scss" as *;
                        @use "./assets/scss/variables/_fonts.scss" as *;
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
