import type { PointerOptions } from "~/types/Pointer";

export const toCssUnit = <T extends PointerOptions["unit"]>(
    number: number,
    magnitude: T,
): `${string}${T}` => `${number}${magnitude}`;
