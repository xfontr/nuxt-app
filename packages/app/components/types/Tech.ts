import type Matter from "matter-js";

type Tech<
    MountArgs extends unknown[] = [],
    RenderArgs extends unknown[] = [],
> = {
    mount?: (...args: MountArgs) => void;
    render: (...args: RenderArgs) => void;
    unmount?: () => void;
};

export type FullTech = Required<Tech<[Matter.Engine["world"], number], []>>;

export type TechItemBody = Required<
    Tech<[HTMLCanvasElement], [Matter.Engine["world"], number]>
> & { body: () => undefined | Matter.Body };

export type TechItem = Tech<[], [CanvasRenderingContext2D, number]>;
