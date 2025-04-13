import { parseScss } from "../scss.js";

describe("parseScss", () => {
    const mockScss = `$primary-color: #ff0000;\n$secondary-color: #00ff00;\n$font-size: 16px;`;

    it("should correctly parse multiple SCSS variables into TypeScript constants", () => {
        const result = parseScss(mockScss);
        expect(result).toContain('export const PRIMARY_COLOR = "#ff0000";');
        expect(result).toContain('export const SECONDARY_COLOR = "#00ff00";');
        expect(result).toContain('export const FONT_SIZE = "16px";');
    });

    it("should return an empty string if no SCSS variables exist", () => {
        expect(parseScss("body { color: red; }")).toBe("");
    });

    it("should handle SCSS variables with double quotes and convert them", () => {
        const scssWithQuotes = `$font-family: "Arial", "sans-serif";`;
        const expectedTs = `export const FONT_FAMILY = "'Arial', 'sans-serif'";`;
        expect(parseScss(scssWithQuotes)).toContain(expectedTs);
    });
});
