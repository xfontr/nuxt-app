import type { i18n } from "../../types";
import { getUiAsset } from "../assets";

const mockT = vi.fn((key: string) => {
    if (key.endsWith(".src")) return "icons/test-icon";
    if (key.endsWith(".alt")) return "Test Icon";
    return "";
}) as i18n;

describe("getUiAsset", () => {
    it("should return the correct src and alt for a given asset name", () => {
        const result = getUiAsset(mockT, "space", "/assets/ui");

        expect(result).toEqual({
            src: "/assets/ui/icons/test-icon.png",
            alt: "Test Icon",
        });

        expect(mockT).toHaveBeenCalledWith("game.assets.space.src");
        expect(mockT).toHaveBeenCalledWith("game.assets.space.alt");
    });
});
