import Matter from "matter-js";
import type { TechItemMouse } from "../types/Tech";

declare module "matter-js" {
    interface Mouse {
        mousewheel: EventListenerOrEventListenerObject;
    }
}

const TechMouse = (matter: typeof Matter): TechItemMouse => {
    let mouse: Matter.Mouse;
    let mouseConstraint: Matter.MouseConstraint;

    const mount: TechItemMouse["mount"] = (canvas, engine) => {
        mouse = matter.Mouse.create(canvas);
        mouseConstraint = matter.MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false },
            },
        });

        mouseConstraint.mouse.element.removeEventListener(
            "wheel",
            mouseConstraint.mouse.mousewheel,
        );
    };

    const render: TechItemMouse["render"] = (matterRender, world) => {
        matter.Composite.add(world, mouseConstraint!);
        matterRender.mouse = mouse!;
    };

    return {
        mount,
        render,
    };
};

export default TechMouse;
