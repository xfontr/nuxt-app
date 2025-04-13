import createEslintConfig from "../eslint";
import tseslint from "typescript-eslint";
import { tsConfig, tsTestConfig, tsVueConfig } from "./eslint.config.js";

describe("Given a createEslintConfig function", () => {
    it("should call tseslint.config with the correct arguments", () => {
        const mockTseslintConfig = vi.spyOn(tseslint, "config");

        createEslintConfig("tsConfig", "tsTestConfig", "tsVueConfig");

        expect(mockTseslintConfig).toHaveBeenCalledWith(
            tsConfig,
            tsTestConfig,
            tsVueConfig,
        );
    });
});
