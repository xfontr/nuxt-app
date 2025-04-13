declare module "@portfolio/configs/eslint" {
    const config: {
        createEslintConfig: (...configs: unknown[]) => object[];
    };
    export default config;
}
