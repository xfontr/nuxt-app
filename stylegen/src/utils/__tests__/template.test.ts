import { REM_TO_PX } from "../../configs/constants.js";
import {
    headerTemplate,
    tsNumberVariable,
    tsStringVariable,
    toTsVariable,
    stringifyObject,
} from "../template.js";

vi.mock("crypto", () => ({
    randomUUID: () => "123e4567-e89b-12d3-a456-426614174000", // Static UUID for tests
}));

describe("headerTemplate", () => {
    it("should generate a valid header with the provided data", () => {
        const data = "export const test = 42;";
        const result = headerTemplate(data);
        expect(result).toContain(
            "* WARNING: Any changes here could get overriden.",
        );
        expect(result).toContain("123e4567-e89b-12d3-a456-426614174000"); // Static UUID
        expect(result).toContain(data);
    });
});

describe("tsNumberVariable", () => {
    it("should generate a TypeScript number variable", () => {
        expect(tsNumberVariable("myVar", 42)).toBe("export const myVar = 42;");
        expect(tsNumberVariable("anotherVar", "100")).toBe(
            "export const anotherVar = 100;",
        );
    });
});

describe("tsStringVariable", () => {
    it("should generate a TypeScript string variable", () => {
        expect(tsStringVariable("myVar", "hello")).toBe(
            'export const myVar = "hello";',
        );
        expect(tsStringVariable("anotherVar", " world ")).toBe(
            'export const anotherVar = "world";',
        ); // Trims value
    });
});

describe("toTsVariable", () => {
    it("should convert rem values to px", () => {
        expect(toTsVariable("size", "2rem;")).toBe(
            `export const size = ${2 * REM_TO_PX};`,
        );
    });

    it("should handle numeric values correctly", () => {
        expect(toTsVariable("amount", "100;")).toBe(
            'export const amount = "100";',
        );
        expect(toTsVariable("zero", "0;")).toBe('export const zero = "0";');
    });

    it("should handle string values correctly", () => {
        expect(toTsVariable("greeting", "hello;")).toBe(
            'export const greeting = "hello";',
        );
    });
});

describe("stringifyObject", () => {
    it("should correctly stringify an object into TypeScript exports", () => {
        const themes = {
            dark: { color: "black", background: "gray" },
            light: { color: "white", background: "lightgray" },
        };

        const result = stringifyObject(themes);

        expect(result).toContain("export const dark = {");
        expect(result).toContain('"color": "black"');
        expect(result).toContain('"background": "gray"');
        expect(result).toContain("export const light = {");
    });

    it("should return an empty string if given an empty object", () => {
        expect(stringifyObject({})).toBe("");
    });
});
