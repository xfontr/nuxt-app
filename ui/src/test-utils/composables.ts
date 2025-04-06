import { defineComponent } from "vue";
import { mount } from "./test";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const mountComposable = <T extends Function>(callback: T) =>
    mount(
        defineComponent({
            setup: () => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                callback();
            },
            render: () => "",
        }),
    );
