import type { Count } from "~/types/Count";
import type { Location } from "~/types/Location";
import type { Ranges } from "~/types/Ranges";

export const DEFAULT_RANGES: Ranges = {
    short: [10, 15],
    medium: [20, 80],
    long: [100, 150],
};

/**
 * Updates the count object by decrementing the `long` property
 * and resetting the `short` and `long` properties if necessary.
 *
 * @param {Count} count - The count object to be updated.
 * @returns {Count} A new count object with updated values.
 */
export const getUpdatedCount = (
    { long }: Count,
    range: Ranges = DEFAULT_RANGES,
): Count =>
    long <= 0
        ? { short: random(...range.long), long: random(...range.short) }
        : { short: random(...range.medium), long: long - 1 };

/**
 * Compares two location objects to check if their x and y values are equal.
 */
export const areLocationsEqual = (a: Location, b: Location): boolean =>
    a.x === b.x && a.y === b.y;
