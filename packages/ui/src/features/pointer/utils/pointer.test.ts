import { areLocationsEqual } from "./pointer";

beforeEach(() => {
    vi.resetAllMocks();
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
