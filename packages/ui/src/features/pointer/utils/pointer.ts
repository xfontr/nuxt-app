import type { Location } from "../../../types/Location";

/**
 * Compares two location objects to check if their x and y values are equal.
 */
export const areLocationsEqual = (a: Location, b: Location): boolean =>
    a.x === b.x && a.y === b.y;
