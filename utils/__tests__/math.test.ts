describe("lerp function", () => {
    it("should return the start value when target = 0", () => {
        expect(lerp(0)(0, 100)).toBe(0);
        expect(lerp(0)(10, 20)).toBe(10);
    });

    it("should return the end value when target = 1", () => {
        expect(lerp(1)(0, 100)).toBe(100);
        expect(lerp(1)(10, 20)).toBe(20);
    });

    it("should return the midpoint when target = 0.5", () => {
        expect(lerp(0.5)(0, 100)).toBe(50);
        expect(lerp(0.5)(10, 20)).toBe(15);
    });

    it("should correctly interpolate values for other target values", () => {
        expect(lerp(0.25)(0, 100)).toBe(25);
        expect(lerp(0.75)(-50, 50)).toBe(25);
        expect(lerp(0.33)(30, 60)).toBeCloseTo(39.9, 1);
    });

    it("should extrapolate when target is outside [0,1]", () => {
        expect(lerp(-0.5)(0, 100)).toBe(-50);
        expect(lerp(1.5)(0, 100)).toBe(150);
    });
});

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
