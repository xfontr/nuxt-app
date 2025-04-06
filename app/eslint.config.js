// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import createEslintConfig from "@portfolio/configs/eslint";

const nuxtConfigs = await withNuxt();

export default [
    ...nuxtConfigs,
    ...createEslintConfig(
        "tsConfig",
        "tsVueConfig",
        "tsTestConfig",
        "prettierConfig",
    ),
];
