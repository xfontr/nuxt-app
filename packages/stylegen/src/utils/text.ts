export const toCamelCase = (text: string) =>
    text.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
