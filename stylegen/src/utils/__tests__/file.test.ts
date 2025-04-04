import { vi, describe, it, expect, beforeEach } from "vitest";
import * as fs from "fs/promises";
import { createTsFile, getAllFiles, getExtension, getFile } from "../file.js";
import { Instructions } from "../../types/Instructions.js";

vi.mock("fs/promises", () => ({
    readFile: vi.fn(),
    writeFile: vi.fn(),
}));

vi.mock("path", async () => {
    const actual = await vi.importActual<typeof import("path")>("path");
    return {
        ...actual,
        extname: vi.fn(actual.extname),
    };
});

describe("file utilities", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("getFile reads file content as utf8", async () => {
        vi.mocked(fs.readFile).mockResolvedValue("file content");
        const result = await getFile("fake/path.scss");

        expect(fs.readFile).toHaveBeenCalledWith("fake/path.scss", "utf8");
        expect(result).toBe("file content");
    });

    it("createTsFile writes .ts file", async () => {
        await createTsFile("some/path/file", "export const test = 1;");

        expect(fs.writeFile).toHaveBeenCalledWith(
            "some/path/file.ts",
            "export const test = 1;",
        );
    });

    it("getExtension returns valid extension", () => {
        const result = getExtension("styles/theme.scss");
        expect(result).toBe("scss");
    });

    it("getExtension throws for invalid extensions", () => {
        expect(() => getExtension("styles/theme.js")).toThrow();
    });

    it("getAllFiles returns full file object", async () => {
        vi.mocked(fs.readFile).mockResolvedValue("some raw content");

        const compile: Instructions["compile"] = [
            { name: "light", path: "theme/light.scss", type: "THEME" },
        ];

        const result = await getAllFiles(compile);

        expect(result).toEqual([
            {
                name: "light",
                rawContent: "some raw content",
                extension: "scss",
                type: "THEME",
            },
        ]);
    });
});
