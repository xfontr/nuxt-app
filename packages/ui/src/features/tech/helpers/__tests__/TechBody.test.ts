import {
    FRICTION_AIR,
    GRID_SIZE,
    TECH_STROKE,
    THROWER_LOCATION_XS,
    THROWER_LOCATION_MD,
    THROWER_LOCATION_LG,
    BODY_MIN_SIZE,
    BODY_MAX_SIZE,
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

beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(utils, "random").mockReturnValue(0);
    Math.random = vi.fn(() => 0.5);
});

describe("TechBody", () => {
    it("mount uses THROWER_LOCATION_XS and clamps size above BODY_MIN_SIZE", () => {
        const canvas = {
            width: 300,
            height: 400,
        } as HTMLCanvasElement;

        const techBody = TechBody(
            { Bodies, Composite, Body } as unknown as typeof Matter,
            0,
        );
        techBody.mount(canvas);

        const expectedSize = Math.min(
            Math.max(BODY_MIN_SIZE, canvas.width / GRID_SIZE),
            BODY_MAX_SIZE,
        );

        expect(Bodies.rectangle).toHaveBeenCalledWith(
            THROWER_LOCATION_XS,
            canvas.height - THROWER_LOCATION_XS,
            expectedSize,
            expectedSize,
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

    it("mount uses THROWER_LOCATION_MD when width >= 600 and < 1500", () => {
        const canvas = {
            width: 1000,
            height: 800,
        } as HTMLCanvasElement;

        const techBody = TechBody(
            { Bodies, Composite, Body } as unknown as typeof Matter,
            1,
        );
        techBody.mount(canvas);

        const expectedSize = Math.min(
            Math.max(BODY_MIN_SIZE, canvas.width / GRID_SIZE),
            BODY_MAX_SIZE,
        );

        expect(Bodies.rectangle).toHaveBeenCalledWith(
            THROWER_LOCATION_MD,
            canvas.height - THROWER_LOCATION_MD,
            expectedSize,
            expectedSize,
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

    it("mount uses THROWER_LOCATION_LG when width >= 1500", () => {
        const canvas = {
            width: 1600,
            height: 900,
        } as HTMLCanvasElement;

        const techBody = TechBody(
            { Bodies, Composite, Body } as unknown as typeof Matter,
            2,
        );
        techBody.mount(canvas);

        const expectedSize = Math.min(
            Math.max(BODY_MIN_SIZE, canvas.width / GRID_SIZE),
            BODY_MAX_SIZE,
        );

        expect(Bodies.rectangle).toHaveBeenCalledWith(
            THROWER_LOCATION_LG,
            canvas.height - THROWER_LOCATION_LG,
            expectedSize,
            expectedSize,
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
        const canvas = {
            width: 600,
            height: 400,
        } as HTMLCanvasElement;

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

    it("returns internal body", () => {
        const canvas = {
            width: 600,
            height: 400,
        } as HTMLCanvasElement;

        const techBody = TechBody(
            { Bodies, Composite, Body } as unknown as typeof Matter,
            0,
        );
        techBody.mount(canvas);
        expect(techBody.body()).toBe(mockBody);
    });
});
