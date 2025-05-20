import { random, randomizeDirection } from "../math";

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
