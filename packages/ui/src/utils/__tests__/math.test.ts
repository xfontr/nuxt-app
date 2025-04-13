import {
    findClosestValue,
    generateThresholds,
    random,
    randomizeDirection,
} from "../math";

describe("random", () => {
    it("should return a number within the specified range (inclusive)", () => {
        const min = 0;
        const max = 7;

        for (let i = 0; i < 1000; i++) {
            const result = random(min, max);
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        }
    });

    it("should return the min value when min equals max", () => {
        const min = 5;
        const max = 5;

        const result = random(min, max);
        expect(result).toBe(min);
    });

    it("should return a random number within a larger range", () => {
        const min = 1;
        const max = 10;

        for (let i = 0; i < 1000; i++) {
            const result = random(min, max);
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        }
    });
});

describe("randomizeDirection", () => {
    it("should never return (0,0)", () => {
        for (let i = 0; i < 1000; i++) {
            const { x, y } = randomizeDirection();
            expect(x !== 0 || y !== 0).toBe(true);
        }
    });

    it("should respect the given factor limit", () => {
        const factor = 5;
        for (let i = 0; i < 1000; i++) {
            const { x, y } = randomizeDirection(factor);
            expect(x).toBeGreaterThanOrEqual(-factor);
            expect(x).toBeLessThanOrEqual(factor);
            expect(y).toBeGreaterThanOrEqual(-factor);
            expect(y).toBeLessThanOrEqual(factor);
        }
    });

    it("should work correctly with factor = 1 (default case)", () => {
        for (let i = 0; i < 1000; i++) {
            const { x, y } = randomizeDirection(1);
            expect([-1, 0, 1]).toContain(x);
            expect([-1, 0, 1]).toContain(y);
        }
    });

    it("should work correctly with factor = 10", () => {
        for (let i = 0; i < 1000; i++) {
            const { x, y } = randomizeDirection(10);
            expect(x).toBeGreaterThanOrEqual(-10);
            expect(x).toBeLessThanOrEqual(10);
            expect(y).toBeGreaterThanOrEqual(-10);
            expect(y).toBeLessThanOrEqual(10);
        }
    });
});

describe("generateThresholds", () => {
    it("should return an array with thresholds from 0 to 1", () => {
        const thresholds = generateThresholds(5);
        expect(thresholds).toEqual([
            0, 0.24390243902439027, 0.48780487804878053, 0.7317073170731708,
            0.9,
        ]);
    });

    it("should handle 2 thresholds correctly", () => {
        const thresholds = generateThresholds(2);
        expect(thresholds).toEqual([0, 0.9]);
    });

    it("should handle 3 thresholds correctly", () => {
        const thresholds = generateThresholds(3);
        expect(thresholds).toEqual([0, 0.47619047619047616, 0.9]);
    });

    it("should return a correct threshold array with large amount", () => {
        const thresholds = generateThresholds(10);
        expect(thresholds).toEqual([
            0, 0.10989010989010989, 0.21978021978021978, 0.32967032967032966,
            0.43956043956043955, 0.5494505494505495, 0.6593406593406593,
            0.7692307692307692, 0.8791208791208791, 0.9,
        ]);
    });

    it("should set a threshold of 0, 1 if the amount is less than 1", () => {
        const thresholds = generateThresholds(0);
        expect(thresholds).toEqual([0, 0.9]);

        const thresholds2 = generateThresholds(-5);
        expect(thresholds2).toEqual([0, 0.9]);
    });
});

describe("findClosestValue", () => {
    it("returns the closest value to the target", () => {
        expect(findClosestValue([1, 3, 7, 10], 5)).toBe(3);
        expect(findClosestValue([1, 3, 7, 10], 8)).toBe(7);
        expect(findClosestValue([1, 3, 7, 10], 9)).toBe(10);
    });

    it("returns the exact target if present in the array", () => {
        expect(findClosestValue([1, 3, 7, 10], 7)).toBe(7);
        expect(findClosestValue([1, 3, 7, 10], 1)).toBe(1);
    });

    it("handles negative numbers correctly", () => {
        expect(findClosestValue([-10, -5, 0, 5, 10], -3)).toBe(-5);
        expect(findClosestValue([-10, -5, 0, 5, 10], 3)).toBe(5);
    });

    it("handles an array with a single element", () => {
        expect(findClosestValue([42], 100)).toBe(42);
        expect(findClosestValue([42], -100)).toBe(42);
    });

    it("returns undefined when given an empty array", () => {
        expect(findClosestValue([], 5)).toBeUndefined();
    });
});
