import * as math from "../../../utils/math";
import { areLocationsEqual, getUpdatedCount } from "./pointer";
import type { Ranges } from "../types/Ranges";

const mockRandom = vi.spyOn(math, "random");

beforeEach(() => {
    vi.resetAllMocks();
});

describe("getUpdatedCount", () => {
    it("should decrement the long property by 1 and update short with random medium range if long > 0", () => {
        const count = { short: 20, medium: 60, long: 10 };

        const mockRandom = vi.spyOn(math, "random");

        mockRandom.mockReturnValueOnce(50);
        mockRandom.mockReturnValueOnce(120);

        const result = getUpdatedCount(count);

        expect(result.short).toBe(50);
        expect(result.long).toBe(9);
    });

    it("should reset short and long properties with random values from the ranges when long <= 0", () => {
        const count = { short: 0, medium: 0, long: 0 };

        mockRandom.mockReturnValueOnce(120);
        mockRandom.mockReturnValueOnce(12);

        const result = getUpdatedCount(count);

        expect(result.short).toBe(120);
        expect(result.long).toBe(12);
    });

    it("should use default ranges if no range is passed", () => {
        const count = { short: 20, medium: 60, long: 10 };

        mockRandom.mockReturnValueOnce(30);
        mockRandom.mockReturnValueOnce(110);

        const result = getUpdatedCount(count);

        expect(result.short).toBe(30);
        expect(result.long).toBe(9);
    });

    it("should work with custom range passed as argument", () => {
        const count = { short: 0, medium: 0, long: 5 };
        const customRanges: Ranges = {
            short: [5, 10],
            medium: [15, 30],
            long: [50, 100],
        };

        mockRandom.mockReturnValueOnce(25);
        mockRandom.mockReturnValueOnce(60);

        const result = getUpdatedCount(count, customRanges);

        expect(result.short).toBe(25);
        expect(result.long).toBe(4);
    });

    it("should handle edge case where long is exactly 0", () => {
        const count = { short: 0, medium: 0, long: 0 };

        mockRandom.mockReturnValueOnce(150);
        mockRandom.mockReturnValueOnce(10);

        const result = getUpdatedCount(count);

        expect(result.short).toBe(150);
        expect(result.long).toBe(10);
    });
});

describe("areLocationsEqual", () => {
    it("should return true when both locations have the same x and y values", () => {
        const location1 = { x: 10, y: 20 };
        const location2 = { x: 10, y: 20 };

        expect(areLocationsEqual(location1, location2)).toBe(true);
    });

    it("should return false when the x values are different", () => {
        const location1 = { x: 10, y: 20 };
        const location2 = { x: 15, y: 20 };

        expect(areLocationsEqual(location1, location2)).toBe(false);
    });

    it("should return false when the y values are different", () => {
        const location1 = { x: 10, y: 20 };
        const location2 = { x: 10, y: 25 };

        expect(areLocationsEqual(location1, location2)).toBe(false);
    });

    it("should return false when both x and y values are different", () => {
        const location1 = { x: 10, y: 20 };
        const location2 = { x: 15, y: 25 };

        expect(areLocationsEqual(location1, location2)).toBe(false);
    });

    it("should return true when both locations are identical references", () => {
        const location = { x: 10, y: 20 };

        expect(areLocationsEqual(location, location)).toBe(true);
    });
});
