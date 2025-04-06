import assert from "assert";
import { toTsVariable } from "./template.js";

const parseScssVariable = (variable: string) => {
    assert(variable.startsWith("$") && variable.includes(":"));

    const [name, value] = variable
        .replace("$", "")
        .replaceAll('"', "'")
        .split(":");

    return [name.replaceAll("-", "_").toLocaleUpperCase(), value];
};

/**
 * Parses SCSS variable declarations and converts them into TypeScript `export const` definitions.
 *
 * Supported SCSS variables must:
 * - Start with `$`
 * - Follow the format: `$VARIABLE-NAME: value;`
 *
 * The function will:
 * - Replace hyphens (`-`) in variable names with underscores (`_`)
 * - Convert variable names to uppercase
 * - Replace double quotes in values with single quotes
 * - Convert values ending in `rem;` to pixel numbers using a constant multiplier (via `toTsVariable`)
 *
 * @example
 * parseScss("$font-size: 1rem;\n$primary-color: #ff0000;");
 * // export const FONT_SIZE = 16;
 * // export const PRIMARY_COLOR = "#ff0000";
 */
export const parseScss = (rawContent: string): string =>
    rawContent
        .split("\n")
        .filter((line) => line.startsWith("$"))
        .map(parseScssVariable)
        .map(([name, value]) => toTsVariable(name, value))
        .join("\n");
