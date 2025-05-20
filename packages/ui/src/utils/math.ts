import type { Location } from "../types/Location";

/**
 * Generates a random integer between a specified minimum and maximum value (inclusive).
 *
 * @returns {number} A random integer between `min` and `max` (inclusive).
 *
 * @example
 * random(0, 7); // Returns a random number between 0 and 7
 * random(1, 10); // Returns a random number between 1 and 10
 */
export const random = (min: number, max: number): number => {
    return +(Math.floor(Math.random() * (max - min + 1)) + min).toFixed(0);
};

/**
 * Generates a random location for a 2D plane.
 * @param {number} factor - The maximum increase/decrease for both x and y.
 * @example
 * const factor = 1; // 1, 0 or -1
 * randomizeDirection(factor); // { x: 1, y: 0 } or { x: 0, y: -1 } or { x: -1, y: 1 }
 */
export const randomizeDirection = (factor: number = 1): Location => {
    let x: number, y: number;

    do {
        x = random(-factor, factor);
        y = random(-factor, factor);
    } while (!x && !y);

    return { x, y };
};
