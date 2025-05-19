import { Bodies } from "matter-js";

const Borders = ({ width, height }: { width: number; height: number }) => {
    let options = {
        thickness: 8,
        options: {
            isStatic: true,
            render: {
                strokeStyle: "transparent",
                opacity: 0,
            },
        },
    };

    return {
        body: [
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
        ],
        unmount: () => {
            options = undefined as unknown as typeof options;
        },
    };
};

export default Borders;
