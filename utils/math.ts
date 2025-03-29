import type { Location } from "~/types/Location";

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

/**
 * Generates an array of threshold values between 0 and 1, evenly spaced.
 *
 * @param {number} amount - The number of thresholds to generate. Must be at least 1.
 * @returns {number[]} An array of threshold values ranging from 0 to 1.
 */
export const generateThresholds = (amount: number): number[] => {
    if (amount < 1) amount = 0;
    const thresholds = [0];

    const step = 1 / (amount - 0.9);

    for (let i = 1; i < amount - 1; i++) {
        thresholds.push(i * step);
    }

    thresholds.push(0.9);

    return thresholds;
};

/**
 * Finds the closest number in an array to a given target value.
 *
 * @param {number[]} values - An array of numbers to search through.
 * @param {number} target - The target number to find the closest match for.
 * @returns {number} The closest number in the array to the target.
 */
export const findClosestValue = (
    values: number[],
    target: number,
): undefined | number => {
    if (!values.length) return undefined;

    return values.reduce((prev, curr) =>
        Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev,
    );
};
