import Matter from "matter-js";
import type { TechItemMouse } from "../types/Tech";

const TechMouse = (matter: typeof Matter): TechItemMouse => {
    let mouse: Matter.Mouse;
    let mouseConstraint: Matter.MouseConstraint;

    const removeWheelListener = (listener: "wheel" | "DOMMouseScroll") => {
        mouseConstraint!.mouse.element.removeEventListener(
            listener,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            mouseConstraint.mouse.mousewheel,
        );
    };

    const mount: TechItemMouse["mount"] = (canvas, engine) => {
        mouse = matter.Mouse.create(canvas);
        mouseConstraint = matter.MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false },
            },
        });

        removeWheelListener("wheel");
        removeWheelListener("DOMMouseScroll");
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
