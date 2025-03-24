/**
 * Linearly interpolates between two values.
 *
 * @param {number} factor - The interpolation factor (0 = start, 1 = end).
 * @returns A function that takes `start` and `end` and returns the interpolated value.
 *
 * @example
 * const lerpHalfway = lerp(0.5);
 * console.log(lerpHalfway(10, 20)); // 15
 */
export const lerp = (factor: number) => (start: number, end: number) =>
    start + (end - start) * factor;
