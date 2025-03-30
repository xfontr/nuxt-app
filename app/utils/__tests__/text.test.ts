describe("toCssUnit", () => {
    it("should append the unit correctly for vh", () => {
        expect(toCssUnit(10, "vh")).toBe("10vh");
    });
});
