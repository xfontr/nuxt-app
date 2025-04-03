import { defineComponent } from "vue";
import { mount } from "./test";

export const mountComposable = <T extends Function>(callback: T) =>
    mount(
        defineComponent({
            setup: () => {
                callback();
            },
            render: () => "",
        }),
    );
