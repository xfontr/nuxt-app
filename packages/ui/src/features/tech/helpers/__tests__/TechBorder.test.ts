import type Matter from "matter-js";
import TechBorder from "../TechBorder";

describe("TechBorder", () => {
    it("adds 4 static invisible bodies to the world", () => {
        const width = 1920;
        const height = 1080;
        const Bodies = { rectangle: vi.fn() };
        const Composite = { add: vi.fn() };

        Bodies.rectangle.mockImplementation((...args: unknown[]) => args);

        const item = TechBorder({
            Bodies,
            Composite,
        } as unknown as typeof Matter);

        const canvas = { width, height } as HTMLCanvasElement;
        const world = {} as Matter.Engine["world"];

        item.render(canvas, world);

        expect(Bodies.rectangle).toHaveBeenCalledTimes(4);
        expect(Composite.add).toHaveBeenCalledWith(world, expect.any(Array));

        const calls = Bodies.rectangle.mock.calls;

        expect(calls[0][1]).toBe(0);
        expect(calls[1][1]).toBe(height);
        expect(calls[2][0]).toBe(0);
        expect(calls[3][0]).toBe(width);
    });
});
