import * as CONFIGS from "./eslintConfigs.js";
import tseslint from "typescript-eslint";

/**
 * @param  {("tsConfig" | "tsTestConfig" | "tsVueConfig"| "prettierConfig")[]} configs
 */
const createEslintConfig = (...configs) =>
    tseslint.config(...configs.map((config) => CONFIGS[config]));

export default createEslintConfig;
