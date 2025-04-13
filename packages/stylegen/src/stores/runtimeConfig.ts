import { join } from "path";
import { Instructions } from "../types/Instructions.js";

let store: Instructions = undefined;

const useRuntimeConfig = () => {
    const init = (instructions: Instructions) => {
        if (store) return;
        store = instructions;

        const consumerPath = process.cwd();

        store.compile = store.compile.map(({ path, ...instruction }) => ({
            ...instruction,
            path: join(consumerPath, path),
        }));

        store.outDir = join(consumerPath, store.outDir);
    };

    const $reset = () => {
        store = undefined;
    };

    const current = (): Instructions | undefined => store;

    return { init, $reset, current };
};

export default useRuntimeConfig;
