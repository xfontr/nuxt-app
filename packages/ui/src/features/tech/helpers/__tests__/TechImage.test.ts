import TechImage from "../TechImage";

vi.stubGlobal(
    "Image",
    class {
        src = "";
        complete = true;
    },
);

describe("TechImage", () => {
    const size = 100;

    it("calls drawImage with correct parameters when image is loaded", () => {
        const mockContext = {
            drawImage: vi.fn(),
        } as unknown as CanvasRenderingContext2D;

        const item = TechImage("id");
        item.mount?.();

        item.render(mockContext, size);

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockContext.drawImage).toHaveBeenCalledWith(
            expect.any(Image),
            -size / 2,
            -size / 2,
            size,
            size,
        );
    });

    it("does not call drawImage if image is not loaded", () => {
        const mockContext = {
            drawImage: vi.fn(),
        } as unknown as CanvasRenderingContext2D;

        const item = TechImage("id");

        item.render(mockContext, size);

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockContext.drawImage).not.toHaveBeenCalled();
    });
});
