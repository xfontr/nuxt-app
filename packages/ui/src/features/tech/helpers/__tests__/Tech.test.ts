import type Matter from "matter-js";
import Tech from "../Tech";
import type { TechItemBody } from "../../types/Tech";

const itemBody = {
    mount: vi.fn(),
    render: vi.fn(),
    body: vi.fn(() => ({
        position: { x: 100, y: 200 },
        angle: Math.PI / 4,
    })),
} as unknown as TechItemBody;

const tech = {
    mount: vi.fn(),
    render: vi.fn(),
};

const canvas = { width: 300 } as HTMLCanvasElement;
const context = {
    save: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    restore: vi.fn(),
};

describe("Tech", () => {
    const render = { canvas, context } as unknown as Matter.Render;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("calls mount functions and itemBody.render", () => {
        const fullTech = Tech(itemBody, tech, render);
        const world = {} as Matter.Engine["world"];

        fullTech.mount(world);

        expect(itemBody.mount).toHaveBeenCalledWith(canvas);
        expect(tech.mount).toHaveBeenCalled();
        expect(itemBody.render).toHaveBeenCalledWith(world);
    });

    it("renders with correct transformations and calls tech.render", () => {
        const fullTech = Tech(itemBody, tech, render);

        fullTech.render();

        expect(context.save).toHaveBeenCalled();
        expect(context.translate).toHaveBeenCalledWith(100, 200);
        expect(context.rotate).toHaveBeenCalledWith(Math.PI / 4);
        expect(tech.render).toHaveBeenCalledWith(context, expect.any(Number));
        expect(context.restore).toHaveBeenCalled();
    });
});
