import useRuntimeConfig from "../stores/runtimeConfig.js";
import { parseCss } from "../utils/css.js";
import { createTsFile, getAllFiles } from "../utils/file.js";
import { parseScss } from "../utils/scss.js";
import { headerTemplate } from "../utils/template.js";

const parse = async () => {
    const { current } = useRuntimeConfig();

    const rawFiles = await getAllFiles(current().compile);

    await Promise.all(
        rawFiles.map(async ({ type, name, rawContent, extension }) => {
            let parsed: string;

            if (extension === "css") parsed = parseCss(rawContent, type);
            if (extension === "scss") parsed = parseScss(rawContent);

            await createTsFile(name, headerTemplate(parsed));
        }),
    );
};

export default parse;
