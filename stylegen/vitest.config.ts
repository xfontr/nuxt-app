import {
    configDefaults,
    coverageConfigDefaults,
    defineConfig,
} from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        exclude: [...configDefaults.exclude, "dist/**/*"],
        coverage: {
            provider: "v8",
            exclude: [...coverageConfigDefaults.exclude, "dist/**/*"],
        },
    },
    plugins: [],
});
