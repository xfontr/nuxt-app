/* eslint-disable @typescript-eslint/unbound-method */
import type Matter from "matter-js";
import TechMouse from "../TechMouse";

const mockMouse = {
    element: {
        removeEventListener: vi.fn(),
    },
    mousewheel: vi.fn(),
};

const mockMouseConstraint = {
    mouse: mockMouse,
};

const matter = {
    Mouse: { create: vi.fn(() => mockMouse) },
    MouseConstraint: {
        create: vi.fn(() => mockMouseConstraint),
    },
    Composite: {
        add: vi.fn(),
    },
} as unknown as typeof Matter;

const canvas = {} as HTMLCanvasElement;
const engine = {} as Matter.Engine;

describe("TechMouse", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("mounts mouse and removes scroll listeners", () => {
        const techMouse = TechMouse(matter);
        techMouse.mount(canvas, engine);

        expect(matter.Mouse.create).toHaveBeenCalledWith(canvas);
        expect(matter.MouseConstraint.create).toHaveBeenCalledWith(engine, {
            mouse: mockMouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false },
            },
        });

        expect(mockMouse.element.removeEventListener).toHaveBeenCalledWith(
            "wheel",
            mockMouse.mousewheel,
        );
    });

    it("renders mouse and adds mouseConstraint to world", () => {
        const techMouse = TechMouse(matter);
        techMouse.mount(canvas, engine);

        const world = {} as Matter.Engine["world"];
        const render = {} as Matter.Render;

        techMouse.render(render, world);

        expect(matter.Composite.add).toHaveBeenCalledWith(
            world,
            mockMouseConstraint,
        );
        expect(render.mouse).toBe(mockMouse);
    });
});
