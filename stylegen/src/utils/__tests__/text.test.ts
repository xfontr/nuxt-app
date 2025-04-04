import { toCamelCase } from "../text.js";

describe("toCamelCase", () => {
    it("should convert kebab-case to camelCase", () => {
        expect(toCamelCase("hello-world")).toBe("helloWorld");
        expect(toCamelCase("this-is-a-test")).toBe("thisIsATest");
    });

    it("should return the same string if there's no hyphen", () => {
        expect(toCamelCase("helloWorld")).toBe("helloWorld");
        expect(toCamelCase("alreadyCamel")).toBe("alreadyCamel");
    });

    it("should handle multiple hyphens correctly", () => {
        expect(toCamelCase("long-string-with-many-parts")).toBe(
            "longStringWithManyParts",
        );
    });

    it("should return an empty string if given an empty string", () => {
        expect(toCamelCase("")).toBe("");
    });

    it("should correctly handle strings ending in a hyphen", () => {
        expect(toCamelCase("trailing-")).toBe("trailing-");
    });

    it("should correctly handle strings starting with a hyphen", () => {
        expect(toCamelCase("-leading")).toBe("Leading");
    });
});
