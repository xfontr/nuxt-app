import { parseCss } from "../css.js";

const mockCss = `
body.theme-dark {
    --primary-color: #ff0000;
    --secondary-color: #00ff00;
}
body.theme-light {
    --primary-color: #ffffff;
    --secondary-color: #cccccc;
}
`;

describe("parseCss", () => {
    it("should parse THEME type CSS into TypeScript object strings", () => {
        const result = parseCss(mockCss, "THEME");
        expect(result).toContain("export const THEME_DARK =");
        expect(result).toContain('"primaryColor": "#ff0000"');
        expect(result).toContain('"secondaryColor": "#00ff00"');
        expect(result).toContain("export const THEME_LIGHT =");
        expect(result).toContain('"primaryColor": "#ffffff"');
        expect(result).toContain('"secondaryColor": "#cccccc"');
    });

    it("should return an empty string for non-THEME types", () => {
        expect(parseCss(mockCss, "" as "THEME")).toBe("");
    });

    it("should return an empty string if no valid themes exist", () => {
        expect(parseCss("body { color: red; }", "THEME")).toBe("");
    });
});
