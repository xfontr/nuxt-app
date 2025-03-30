import { File } from "../types/File.js";
import { stringifyObject } from "./template.js";
import { toCamelCase } from "./text.js";

const groupByTheme = (colors: [string, string][], theme: string) =>
    colors.reduce(
        (allColors, [name, value]) => ({
            [theme]: {
                ...allColors[theme],
                [name]: value,
            },
        }),
        { [theme]: {} },
    );

const getThemeName = (name: string) =>
    name.replace(" {", "").toLocaleUpperCase().replaceAll("-", "_");

const cleanVariable = (variable: string): [string, string] => {
    const [name, value] = variable
        .replace("--", "")
        .replace(";", "")
        .split(":");

    return [name.trim(), value];
};

export const parseCss = (css: string, type: File["type"]): string => {
    if (type !== "THEME") return "";

    return css
        .split(".body")
        .filter((theme) => theme.startsWith("theme"))
        .map((theme) => {
            let currentTheme = "";

            const colors: [string, string][] = theme
                .split("\n")
                .filter((variable) => variable.trim().startsWith("--"))
                .map((variable, i) => {
                    if (!i) currentTheme = getThemeName(variable);

                    const [name, value] = cleanVariable(variable);

                    return [toCamelCase(name), value];
                });

            const themes = groupByTheme(colors, currentTheme);

            return stringifyObject(themes);
        })
        .join("\n");
};
