#!/usr/bin/env node
import { existsSync } from "fs";
import { getFile } from "./utils/file.js";
import { Instructions } from "./types/Instructions.js";
import useRuntimeConfig from "./stores/runtimeConfig.js";
import parse from "./helpers/parse.js";

const instructionsPath = process.argv[2] || "./instructions.json";

if (!existsSync(instructionsPath)) {
    process.stderr.write(`Instructions file not found: ${instructionsPath}\n`);
    process.exit(1);
}

void (async () => {
    const instructions = JSON.parse(
        await getFile(instructionsPath),
    ) as Instructions;

    const configs = useRuntimeConfig();
    configs.init(instructions);

    await parse();

    configs.$reset();

    process.exit(0);
})();

export type { Instructions };
