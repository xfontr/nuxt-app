import { coverageConfigDefaults } from "vitest/config";
import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
    test: {
        globals: true,
        environment: "happy-dom",
        coverage: {
            exclude: [
                ...coverageConfigDefaults.exclude,
                "**/types/**",
                "**/configs/**",
                "**/index.ts",
            ],
        },
    },
});
