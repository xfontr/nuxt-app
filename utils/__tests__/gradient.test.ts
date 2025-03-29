describe("getGradient", () => {
    it("returns the next threshold when isDown is true", () => {
        const thresholds = [0, 0.5, 1];
        expect(getGradient(thresholds, 0.5, true)).toBe(1);
    });

    it("returns the previous threshold when isDown is false", () => {
        const thresholds = [0, 0.5, 1];
        expect(getGradient(thresholds, 0.5, false)).toBe(0);
    });

    it("returns the same threshold if no next exists (isDown true at last threshold)", () => {
        const thresholds = [0, 1];
        expect(getGradient(thresholds, 1, true)).toBe(1);
    });

    it("returns the same threshold if no previous exists (isDown false at first threshold)", () => {
        const thresholds = [0, 1];
        expect(getGradient(thresholds, 0, false)).toBe(0);
    });

    it("returns 0 if closestThreshold is undefined", () => {
        const thresholds = [0, 1];
        expect(getGradient(thresholds, undefined, true)).toBe(0);
    });

    it("handles a single-element threshold array", () => {
        const thresholds = [0.5];
        expect(getGradient(thresholds, 0.5, true)).toBe(0.5);
        expect(getGradient(thresholds, 0.5, false)).toBe(0.5);
    });

    it("handles an empty thresholds array", () => {
        const thresholds: number[] = [];
        expect(getGradient(thresholds, 0.5, true)).toBe(0.5);
    });
});
