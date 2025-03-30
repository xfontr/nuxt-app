import assert from "assert";
import { toTsVariable } from "./template.js";

export const parseScssVariable = (variable: string) => {
    assert(variable.startsWith("$") && variable.includes(":"));

    const [name, value] = variable
        .replace("$", "")
        .replace(";", "")
        .replaceAll('"', "'")
        .split(":");

    return [name.replaceAll("-", "_").toLocaleUpperCase(), value];
};

export const parseScss = (rawContent: string) =>
    rawContent
        .split("\n")
        .filter((line) => line.startsWith("$"))
        .map(parseScssVariable)
        .map(([name, value]) => toTsVariable(name, value))
        .join("\n");
