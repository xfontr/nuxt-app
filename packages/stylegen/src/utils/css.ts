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

const parseCssVariables = (variables: string[]): [string, string][] =>
    variables
        .filter((variable) => variable.trim().startsWith("--"))
        .map((variable) => {
            const [name, value] = cleanVariable(variable);
            return [toCamelCase(name), value.trim()];
        });

export const parseCss = (css: string, type: File["type"]): string => {
    if (type !== "THEME") return "";

    return css
        .split("body.")
        .filter((theme) => theme.trim().startsWith("theme"))
        .map((theme) => {
            const [themeName, ...variables] = theme.split("\n");

            return stringifyObject(
                groupByTheme(
                    parseCssVariables(variables),
                    getThemeName(themeName),
                ),
            );
        })
        .join("\n");
};
