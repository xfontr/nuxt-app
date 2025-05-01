import type { i18n } from "../../types";
import { getInstruction } from "../instructions";

const mockT: i18n = <T>(key: string) => {
    const map: Record<string, string> = {
        "game.instructions.space.instruction": "Press space to jump",
        "game.instructions.space.asset": "space",
    };
    return map[key] as T;
};

describe("getInstruction", () => {
    it("should return the correct instruction and asset for a given name", () => {
        const result = getInstruction(mockT, "space");

        expect(result.instruction).toBe("Press space to jump");
        expect(result.asset).toBe("space");
    });
});
