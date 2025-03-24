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
