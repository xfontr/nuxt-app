import { colors, random } from "@portfolio/ui";
import type { TechItemBody } from "../types/Tech";
import Matter from "matter-js";
import { FRICTION_AIR, GRID_SIZE, TECH_STROKE } from "../constants";

const TechBody = ({ Bodies, Composite, Body }: typeof Matter): TechItemBody => {
    let size: number | undefined;
    let body: Matter.Body | undefined;

    const mount: TechItemBody["mount"] = (canvas: HTMLCanvasElement) => {
        size = canvas.width / GRID_SIZE;
        body = Bodies.rectangle(0, canvas.height, size, size, {
            restitution: 0.6,
            frictionAir: FRICTION_AIR[random(0, FRICTION_AIR.length - 1)],
            render: {
                fillStyle: colors.THEME_MAIN.colorsPrimary,
                strokeStyle: colors.THEME_MAIN.colorsSecondary,
                lineWidth: TECH_STROKE,
            },
        });
    };

    const getAngleAndSpeed = (multiplier: number) => ({
        angle: ((Math.random() - 0.5) * Math.PI) / 2, // ~[-45°, 45°]
        speed: 15 + Math.random() * (30 / (multiplier + 1)),
    });

    const render: TechItemBody["render"] = (world, multiplier) => {
        const { angle, speed } = getAngleAndSpeed(multiplier);

        Composite.add(world, body!);

        Body.setVelocity(body!, {
            x: Math.cos(angle) * speed,
            y: -Math.abs(Math.sin(angle) * speed),
        });

        Body.setAngularVelocity(body!, (Math.random() - 0.5) * 0.2);
    };

    const unmount: TechItemBody["unmount"] = () => {
        size = undefined;
        body = undefined;
    };

    return {
        mount,
        render,
        unmount,
        body: () => body,
    };
};

export default TechBody;
