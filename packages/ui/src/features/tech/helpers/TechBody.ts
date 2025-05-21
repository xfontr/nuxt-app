import type { TechItemBody } from "../types/Tech";
import Matter from "matter-js";
import {
    FRICTION_AIR,
    GRID_SIZE,
    EXPLOSION,
    TECH_STROKE,
    THROWER_LOCATION,
} from "../constants";
import { colors } from "../../../configs";
import { random } from "../../../utils";

const TechBody = (
    { Bodies, Composite, Body }: typeof Matter,
    index: number = 0,
): TechItemBody => {
    let size: number;
    let body: Matter.Body;

    const mount: TechItemBody["mount"] = (canvas: HTMLCanvasElement) => {
        size = canvas.width / GRID_SIZE;

        body = Bodies.rectangle(
            THROWER_LOCATION,
            canvas.height - THROWER_LOCATION,
            size,
            size,
            {
                restitution: 0.6,
                frictionAir: FRICTION_AIR[random(0, FRICTION_AIR.length - 1)],
                render: {
                    fillStyle: colors.THEME_MAIN.colorsPrimary,
                    strokeStyle: colors.THEME_MAIN.colorsSecondary,
                    lineWidth: TECH_STROKE,
                    opacity: 0,
                },
            },
        );
    };

    const getAngleAndSpeed = () => {
        const t = index / EXPLOSION.power;

        const angleDeg =
            EXPLOSION.minAngleDeg +
            (EXPLOSION.maxAngleDeg - EXPLOSION.minAngleDeg) * t;
        const angle = (angleDeg * Math.PI) / 180;

        const speed =
            EXPLOSION.maxSpeed - (EXPLOSION.maxSpeed - EXPLOSION.minSpeed) * t;

        return {
            angle:
                angle +
                ((Math.random() - 0.5) * Math.PI) / EXPLOSION.maxAngleDeg,
            speed: speed + (Math.random() - 0.5) * 1.5,
        };
    };

    const render: TechItemBody["render"] = (world) => {
        const { angle, speed } = getAngleAndSpeed();

        setTimeout(() => {
            body.render.opacity = 1;

            Composite.add(world, body!);

            Body.setVelocity(body!, {
                x: Math.cos(angle) * speed,
                y: -Math.abs(Math.sin(angle) * speed),
            });

            Body.setAngularVelocity(body!, (Math.random() - 0.5) * 0.2);
        }, index * EXPLOSION.delay);
    };

    return {
        mount,
        render,
        body: () => body,
    };
};

export default TechBody;
