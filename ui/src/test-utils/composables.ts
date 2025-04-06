import { defineComponent } from "vue";
import { mount } from "./test";

export const mountComposable = <T extends <R>(...args: unknown[]) => R>(
    callback: T,
) =>
    mount(
        defineComponent({
            setup: () => {
                callback();
            },
            render: () => "",
        }),
    );
