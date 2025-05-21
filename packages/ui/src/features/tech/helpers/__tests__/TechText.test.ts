import TechText from "../TechText";
import { colors, fonts } from "../../../../configs";

const mockContext = {
    fillStyle: "",
    font: "",
    textAlign: "center",
    textBaseline: "alphabetic",
    fillText: vi.fn(),
} as unknown as CanvasRenderingContext2D;

describe("TechText", () => {
    it("renders text with correct styles and positioning", () => {
        const size = 100;
        const text = "Hello World";
        const techItem = TechText(text);

        techItem.render(mockContext, size);

        expect(mockContext.fillStyle).toBe(colors.THEME_MAIN.colorsSecondary);
        expect(mockContext.font).toBe(
            `${Math.max(fonts.FONTS_SIZE_BASE, size / 2)}px ${
                fonts.FONTS_PRIMARY
            }`,
        );
        expect(mockContext.textAlign).toBe("center");
        expect(mockContext.textBaseline).toBe("middle");
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockContext.fillText).toHaveBeenCalledWith(text, 0, 0);
    });
});
