import {
    FRICTION_AIR,
    GRID_SIZE,
    TECH_STROKE,
    THROWER_LOCATION,
} from "../../constants";
import * as utils from "../../../../utils";
import TechBody from "../TechBody";
import { colors } from "../../../../configs";
import Matter from "matter-js";

vi.useFakeTimers();

const mockBody = {
    render: { opacity: 0 },
};

const Bodies = {
    rectangle: vi.fn(() => mockBody),
};

const Composite = {
    add: vi.fn(),
};

const Body = {
    setVelocity: vi.fn(),
    setAngularVelocity: vi.fn(),
};

const canvas = {
    width: 600,
    height: 400,
} as HTMLCanvasElement;

beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(utils, "random").mockReturnValue(0);
    Math.random = vi.fn(() => 0.5);
});

describe("TechBody", () => {
    it("mount creates a body with correct params", () => {
        const techBody = TechBody(
            { Bodies, Composite, Body } as unknown as typeof Matter,
            0,
        );
        techBody.mount(canvas);

        expect(Bodies.rectangle).toHaveBeenCalledWith(
            THROWER_LOCATION,
            canvas.height - THROWER_LOCATION,
            canvas.width / GRID_SIZE,
            canvas.width / GRID_SIZE,
            expect.objectContaining({
                restitution: 0.6,
                frictionAir: FRICTION_AIR[0],
                render: {
                    fillStyle: colors.THEME_MAIN.colorsPrimary,
                    strokeStyle: colors.THEME_MAIN.colorsSecondary,
                    lineWidth: TECH_STROKE,
                    opacity: 0,
                },
            }),
        );
    });

    it("render schedules body addition with velocity and angular velocity", () => {
        const techBody = TechBody(
            { Bodies, Composite, Body } as unknown as typeof Matter,
            0,
        );
        techBody.mount(canvas);
        const world = {} as Matter.Engine["world"];

        techBody.render(world);

        vi.runOnlyPendingTimers();

        expect(mockBody.render.opacity).toBe(1);
        expect(Composite.add).toHaveBeenCalledWith(world, mockBody);
        expect(Body.setVelocity).toHaveBeenCalledWith(mockBody, {
            x: expect.any(Number) as number,
            y: expect.any(Number) as number,
        });
        expect(Body.setAngularVelocity).toHaveBeenCalledWith(
            mockBody,
            expect.any(Number),
        );
    });

    it("body() returns internal body", () => {
        const techBody = TechBody(
            { Bodies, Composite, Body } as unknown as typeof Matter,
            0,
        );
        techBody.mount(canvas);
        expect(techBody.body()).toBe(mockBody);
    });
});
