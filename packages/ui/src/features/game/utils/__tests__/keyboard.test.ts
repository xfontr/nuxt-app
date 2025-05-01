import { isLeftKey, isRightKey, isSpaceKey, isUpKey } from "../keyboard";

describe("key utils", () => {
    describe("isUpKey", () => {
        it("returns true for 'w' or 'ArrowUp'", () => {
            expect(isUpKey("w")).toBe(true);
            expect(isUpKey("ArrowUp")).toBe(true);
        });

        it("returns false for other keys", () => {
            expect(isUpKey("s")).toBe(false);
            expect(isUpKey(undefined)).toBe(false);
        });
    });

    describe("isRightKey", () => {
        it("returns true for 'd' or 'ArrowRight'", () => {
            expect(isRightKey("d")).toBe(true);
            expect(isRightKey("ArrowRight")).toBe(true);
        });

        it("returns false for other keys", () => {
            expect(isRightKey("a")).toBe(false);
            expect(isRightKey(undefined)).toBe(false);
        });
    });

    describe("isLeftKey", () => {
        it("returns true for 'a' or 'ArrowLeft'", () => {
            expect(isLeftKey("a")).toBe(true);
            expect(isLeftKey("ArrowLeft")).toBe(true);
        });

        it("returns false for other keys", () => {
            expect(isLeftKey("d")).toBe(false);
            expect(isLeftKey(undefined)).toBe(false);
        });
    });

    describe("isSpaceKey", () => {
        it("returns true for 'Space'", () => {
            expect(isSpaceKey("Space")).toBe(true);
        });

        it("returns false for other values", () => {
            expect(isSpaceKey("Enter")).toBe(false);
            expect(isSpaceKey(undefined)).toBe(false);
        });
    });
});
