import { readFile, writeFile } from "fs/promises";
import { Instructions } from "../types/Instructions.js";
import { extname } from "path";
import assert from "assert";
import { File } from "../types/File.js";

export const getFile = async (path: string) => await readFile(path, "utf8");

export const createTsFile = async (path: string, data: string) =>
    await writeFile(`${path}.ts`, data);

export const getExtension = (path: string): File["extension"] => {
    const extension = extname(path).replace(".", "");

    assert(extension === "css" || extension === "scss");

    return extension;
};

export const getAllFiles = async (
    compilePaths: Instructions["compile"],
): Promise<File[]> => {
    const files: Promise<File>[] = compilePaths.map(
        async ({ name, path, type }) => ({
            name,
            rawContent: await getFile(path),
            extension: getExtension(path),
            type,
        }),
    );

    return await Promise.all(files);
};
