import * as CONFIGS from "./eslint.config.js";
import tseslint from "typescript-eslint";

const createEslintConfig = (...configs) =>
    tseslint.config(...configs.map((config) => CONFIGS[config]));

export default createEslintConfig;
