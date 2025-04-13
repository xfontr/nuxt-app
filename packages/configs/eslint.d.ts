declare module "@portfolio/configs/eslint" {
    const config: {
        createEslintConfig: (
            ...configs: (
                | "tsConfig"
                | "tsTestConfig"
                | "tsVueConfig"
                | "prettierConfig"
            )[]
        ) => object[];
    };
    export default config.createEslintConfig;
}
