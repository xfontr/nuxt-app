import Matter from "matter-js";

type Tech<
    MountArgs extends unknown[] = [],
    RenderArgs extends unknown[] = [],
> = {
    mount?: (...args: MountArgs) => void;
    render: (...args: RenderArgs) => void;
};

export type FullTech = Required<Tech<[Matter.Engine["world"]], []>>;

export type TechItemBody = Required<
    Tech<[HTMLCanvasElement], [Matter.Engine["world"]]>
> & { body: () => undefined | Matter.Body };

export type TechItemMouse = Required<
    Tech<
        [Matter.Render["canvas"], Matter.Engine],
        [Matter.Render, Matter.Engine["world"]]
    >
>;

export type TechItemBorder = Required<
    Pick<Tech<[], [Matter.Render["canvas"], Matter.Engine["world"]]>, "render">
>;

export type TechItem = Tech<[], [CanvasRenderingContext2D, number]>;
