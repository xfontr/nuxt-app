import { colors, random } from "@portfolio/ui";
import { ASSETS } from "../constants";
import { Bodies } from "matter-js";

const TECH_STROKE = 2;
const FRICTION_AIR = [0.01, 0.02, 0.03, 0.05, 0.07];

const Tech = (Render: Matter.Render, icon: keyof typeof ASSETS) => {
    let size: number | undefined = Render.canvas.width / 13;

    let store = {
        size: size * 0.3,
        cache: undefined as undefined | HTMLImageElement,
        body: Bodies.rectangle(0, Render.canvas.height - 100, size, size, {
            restitution: 0.6,
            frictionAir: FRICTION_AIR[random(0, 4)],
            render: {
                fillStyle: colors.THEME_MAIN.colorsPrimary,
                strokeStyle: colors.THEME_MAIN.colorsSecondary,
                lineWidth: TECH_STROKE,
            },
        }),
    };

    const init = (): void => {
        const img = new Image();
        img.src = ASSETS[icon];

        img.onload = () => {
            store.cache = img;
        };
    };

    const render = (): void => {
        if (!store.cache) {
            init();
            return;
        }

        Render.context.save();
        Render.context.translate(store.body.position.x, store.body.position.y);
        Render.context.rotate(store.body.angle);
        Render.context.drawImage(
            store.cache,
            -store.size / 2,
            -store.size / 2,
            store.size,
            store.size,
        );
        Render.context.restore();
    };

    const unmount = (): void => {
        size = undefined;
        store = undefined as unknown as typeof store;
    };

    return {
        render,
        unmount,
        body: store.body,
    };
};

export default Tech;
