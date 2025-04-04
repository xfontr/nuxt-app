import { join } from "path";
import useRuntimeConfig from "./runtimeConfig.js";
import { Instructions } from "../types/Instructions.js";

describe("useRuntimeConfig", () => {
    let runtimeConfig: ReturnType<typeof useRuntimeConfig>;
    const mockCwd = "/mocked/path";

    beforeEach(() => {
        vi.spyOn(process, "cwd").mockReturnValue(mockCwd);
        runtimeConfig = useRuntimeConfig();
        runtimeConfig.$reset();
    });

    it("initializes store correctly", () => {
        const instructions: Instructions = {
            compile: [{ path: "src/file.ts", name: "test" }],
            outDir: "dist",
        };

        runtimeConfig.init(instructions);

        expect(runtimeConfig.current()).toEqual({
            compile: [{ path: join(mockCwd, "src/file.ts"), name: "test" }],
            outDir: join(mockCwd, "dist"),
        } satisfies Instructions);
    });

    it("does not overwrite store if already initialized", () => {
        const firstConfig: Instructions = { compile: [], outDir: "first" };
        const secondConfig: Instructions = { compile: [], outDir: "second" };

        runtimeConfig.init(firstConfig);
        runtimeConfig.init(secondConfig);

        expect(runtimeConfig.current()).toEqual({
            compile: [],
            outDir: join(mockCwd, "first"),
        } satisfies Instructions);
    });

    it("resolves paths correctly", () => {
        const instructions: Instructions = {
            compile: [
                { path: "file1.ts", name: "A" },
                { path: "subdir/file2.ts", name: "B" },
            ],
            outDir: "output",
        };

        runtimeConfig.init(instructions);

        expect(runtimeConfig.current()).toEqual({
            compile: [
                { path: join(mockCwd, "file1.ts"), name: "A" },
                { path: join(mockCwd, "subdir/file2.ts"), name: "B" },
            ],
            outDir: join(mockCwd, "output"),
        } satisfies Instructions);
    });

    it("resets store correctly", () => {
        runtimeConfig.init({ compile: [], outDir: "somewhere" });

        runtimeConfig.$reset();

        expect(runtimeConfig.current()).toBeUndefined();
    });
});
