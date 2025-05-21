import Matter from "matter-js";
import type { TechItemBorder } from "../types/Tech";

const TechBorder = ({ Bodies, Composite }: typeof Matter): TechItemBorder => {
    const render: TechItemBorder["render"] = (canvas, world) => {
        const { width, height } = canvas;

        const options = {
            thickness: 8,
            options: {
                isStatic: true,
                render: {
                    strokeStyle: "transparent",
                    opacity: 0,
                },
            },
        };

        const body = [
            Bodies.rectangle(
                width / 2,
                0,
                width,
                options.thickness,
                options.options,
            ),
            Bodies.rectangle(
                width / 2,
                height,
                width,
                options.thickness,
                options.options,
            ),
            Bodies.rectangle(
                0,
                height / 2,
                options.thickness,
                height,
                options.options,
            ),
            Bodies.rectangle(
                width,
                height / 2,
                options.thickness,
                height,
                options.options,
            ),
        ];

        Composite.add(world, body);
    };

    return { render };
};

export default TechBorder;
