/* eslint-disable @typescript-eslint/unbound-method */
import { drawBeam } from "../beam";

describe("drawBeam", () => {
    it("draws the laser beam with correct canvas calls", () => {
        const mockCtx = {
            createRadialGradient: vi.fn().mockReturnValue({
                addColorStop: vi.fn(),
            }),
            fillStyle: "",
            beginPath: vi.fn(),
            arc: vi.fn(),
            fill: vi.fn(),
            filter: "",
            globalCompositeOperation: "",
            fillRect: vi.fn(),
        } as unknown as CanvasRenderingContext2D;

        const options = { x: 50, y: 100, width: 10, height: 30 };

        drawBeam(options, mockCtx);

        expect(mockCtx.createRadialGradient).toHaveBeenCalledWith(
            options.x,
            options.y + options.height / 2,
            0,
            options.x,
            options.y + options.height / 2,
            30,
        );

        expect(mockCtx.beginPath).toHaveBeenCalled();
        expect(mockCtx.arc).toHaveBeenCalledWith(
            options.x,
            options.y + options.height / 2,
            30,
            0,
            Math.PI * 2,
        );
        expect(mockCtx.fill).toHaveBeenCalled();

        expect(mockCtx.fillRect).toHaveBeenCalledTimes(2);
        expect(mockCtx.fillRect).toHaveBeenCalledWith(
            options.x - 2,
            options.y - 2,
            options.width + 4,
            options.height + 4,
        );
        expect(mockCtx.fillRect).toHaveBeenCalledWith(
            options.x,
            options.y,
            options.width,
            options.height,
        );

        expect(mockCtx.filter).toBe("none");
        expect(mockCtx.globalCompositeOperation).toBe("source-over");
    });
});
