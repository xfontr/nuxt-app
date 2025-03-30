import { join } from "path";
import { Instructions } from "../types/Instructions.js";

let store: Instructions = undefined;

const useRuntimeConfig = () => {
    const init = (instructions: Instructions) => {
        if (!store) store = instructions;

        const consumerPath = process.cwd();

        store.compile = store.compile.map(({ path, ...instruction }) => ({
            ...instruction,
            path: join(consumerPath, path),
        }));

        store.outDir = join(consumerPath, store.outDir);
    };

    const $reset = () => {
        for (const key in store) {
            delete store[key];
        }
    };

    const current = () => store;

    return { init, $reset, current };
};

export default useRuntimeConfig;
