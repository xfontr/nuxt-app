/* eslint-disable @typescript-eslint/unbound-method */
import TechImage from "../TechImage";
import { IMG_MIN_SIZE, IMG_MAX_SIZE } from "../../constants";

class MockImage {
    src = "";
    complete = true;
}
vi.stubGlobal("Image", MockImage);

describe("TechImage", () => {
    const mockContext = {
        drawImage: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("calls drawImage with clamped size when image is loaded", () => {
        const item = TechImage("some-id");
        item.mount?.();

        const testSize = 1000; // higher than max to test clamping
        const clampedSize = Math.min(
            Math.max(IMG_MIN_SIZE, testSize),
            IMG_MAX_SIZE,
        );

        item.render(mockContext, testSize);

        expect(mockContext.drawImage).toHaveBeenCalledWith(
            expect.any(Image),
            -clampedSize / 2,
            -clampedSize / 2,
            clampedSize,
            clampedSize,
        );
    });

    it("clamps size to IMG_MIN_SIZE when below minimum", () => {
        const item = TechImage("some-id");
        item.mount?.();

        const testSize = IMG_MIN_SIZE - 50;
        item.render(mockContext, testSize);

        expect(mockContext.drawImage).toHaveBeenCalledWith(
            expect.any(Image),
            -IMG_MIN_SIZE / 2,
            -IMG_MIN_SIZE / 2,
            IMG_MIN_SIZE,
            IMG_MIN_SIZE,
        );
    });

    it("does not call drawImage if image is not complete", () => {
        const IncompleteImage = class {
            src = "";
            complete = false;
        };
        vi.stubGlobal("Image", IncompleteImage);

        const item = TechImage("some-id");
        item.mount?.();

        item.render(mockContext, 100);

        expect(mockContext.drawImage).not.toHaveBeenCalled();
    });
});
