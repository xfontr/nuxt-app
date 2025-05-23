import { randomUUID } from "crypto";
import assert from "assert";
import { REM_TO_PX } from "../configs/constants.js";

export const headerTemplate = (data: string) => `/*
*
* WARNING: Any changes here could get overriden.
* This file was autogenerated.
*
* ${randomUUID()}
*
*/

${data}
`;

export const tsNumberVariable = (name: string, value: string | number) =>
    `export const ${name} = ${value};`;

export const tsStringVariable = (name: string, value: string) =>
    `export const ${name} = "${value.trim()}";`;

export const toTsVariable = (name: string, value: string) => {
    assert(name && value !== undefined);

    if (value.includes("rem;")) {
        return tsNumberVariable(
            name,
            +value.trim().replace("rem;", "") * REM_TO_PX,
        );
    }

    if (Number.isNaN(+value))
        return tsStringVariable(name, value.replace(";", ""));

    return tsNumberVariable(name, value.trim().replace(";", ""));
};

export const stringifyObject = (
    themes: Record<string, Record<string, string>>,
): string =>
    Object.keys(themes)
        .map(
            (theme) =>
                `export const ${theme} = ${JSON.stringify(
                    themes[theme],
                    null,
                    4,
                )}\n`,
        )
        .join("\n");
