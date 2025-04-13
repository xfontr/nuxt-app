// @ts-check
import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import globals from "globals";
import tseslint from "typescript-eslint";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import prettierConfig from "eslint-config-prettier";

export { prettierConfig };

const baseConfig = tseslint.config(
    {
        ignores: [
            "**/dist",
            "**/coverage",
            "**/types",
            "**/*.d.ts",
            "*.config.ts",
        ],
    },
    eslint.configs.recommended,
);

export const tsConfig = tseslint.config(baseConfig, {
    extends: tseslint.configs.recommendedTypeChecked,
    files: ["**/*.ts"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
    },
    languageOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2020,
        sourceType: "module",
        globals: { ...globals.node },
        parserOptions: {
            projectService: true,
            project: "./tsconfig.json",
        },
    },
});

export const tsTestConfig = tseslint.config({
    files: ["**/**/*.test.ts", "**/*.test.ts"],
    plugins: { vitest },
    rules: { ...vitest.configs.recommended.rules },
    settings: {
        vitest: { typecheck: true },
    },
    languageOptions: {
        globals: {
            ...vitest.environments.env.globals,
        },
    },
});

export const tsVueConfig = tseslint.config({
    files: ["**/*.vue"],
    extends: [
        ...tseslint.configs.recommendedTypeChecked,
        vue.configs["flat/strongly-recommended"],
    ],
    rules: {
        "vue/multi-word-component-names": "off",
        "vue/html-indent": [
            "error",
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
    },
    languageOptions: {
        parser: vueParser,
        globals: { ...globals.node, ...vitest.environments.env.globals },
        parserOptions: {
            project: "./tsconfig.app.json",
            parser: tseslint.parser,
            extraFileExtensions: ["vue"],
        },
    },
});
