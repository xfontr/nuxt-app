import { join } from "path";
import useRuntimeConfig from "../stores/runtimeConfig.js";
import { parseCss } from "../utils/css.js";
import { createTsFile, getAllFiles } from "../utils/file.js";
import { parseScss } from "../utils/scss.js";
import { headerTemplate } from "../utils/template.js";

const parse = async () => {
    const { current } = useRuntimeConfig();

    const configs = current();

    const rawFiles = await getAllFiles(configs.compile);

    await Promise.all(
        rawFiles.map(async ({ type, name, rawContent, extension }) => {
            let parsed: string;

            if (extension === "css") parsed = parseCss(rawContent, type);
            if (extension === "scss") parsed = parseScss(rawContent);

            await createTsFile(
                join(configs.outDir, name),
                headerTemplate(parsed),
            );
        }),
    );
};

export default parse;
