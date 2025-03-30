#!/usr/bin/env node
import { existsSync } from "fs";
import { getFile } from "./utils/file.js";
import { Instructions } from "./types/Instructions.js";
import useRuntimeConfig from "./stores/runtimeConfig.js";
import parse from "./helpers/parse.js";

const instructionsPath =
    process.argv[2]?.split("=")[1] || "./instructions.json";

if (!existsSync(instructionsPath)) {
    console.error(`Instructions file not found: ${instructionsPath}`);
    process.exit(1);
}

(async () => {
    const instructions: Instructions = JSON.parse(
        await getFile(instructionsPath),
    );

    const configs = useRuntimeConfig();
    configs.init(instructions);

    await parse();

    configs.$reset();
})();

export type { Instructions };
