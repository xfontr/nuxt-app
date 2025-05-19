import Matter from "matter-js";
import type { FullTech, TechItem, TechItemBody } from "../types/Tech";
import { GRID_SIZE } from "../constants";

const Tech = (
    itemBody: TechItemBody,
    tech: TechItem,
    { canvas, context }: Matter.Render,
): FullTech => {
    const mount: FullTech["mount"] = (world, multiplier) => {
        itemBody.mount(canvas);
        tech.mount?.();
        itemBody.render(world, multiplier);
    };

    const render: FullTech["render"] = (): void => {
        const current = itemBody.body();

        context.save();
        context.translate(current!.position.x, current!.position.y);
        context.rotate(current!.angle);

        tech.render(context, (canvas.width / GRID_SIZE) * 0.3);

        context.restore();
    };

    const unmount: FullTech["unmount"] = (): void => {
        tech.unmount?.();
        itemBody.unmount();
    };

    return {
        mount,
        render,
        unmount,
    };
};

export default Tech;
