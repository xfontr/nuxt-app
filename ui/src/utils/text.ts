import type { Unit } from "../types/Unit";

export const toCssUnit = <T extends Unit>(
    number: number,
    magnitude: T,
): `${string}${T}` => `${number}${magnitude}`;
