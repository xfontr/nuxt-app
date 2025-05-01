import type {
    BackgroundFactory,
    BackgroundItemOptions,
    BackgroundOptions,
} from "../../types/Background";
import createBackgroundItem from "../background";

const FACTORY: BackgroundFactory = vi.fn(() => ({
    init: vi.fn(),
    reset: vi.fn(),
    update: vi.fn(),
    resize: vi.fn(),
}));

const BACKGROUND_OPTIONS: BackgroundOptions = {
    cycle: "DAY",
    status: ["IDLE", "OVER"],
    isCircle: true,
    image: "cloud",
};

const ITEM_OPTIONS: BackgroundItemOptions = {
    baseWidth: 50,
    baseHeight: 50,
    density: 5,
    sizeMultiplier: 2,
};

describe("createBackgroundItem", () => {
    it("should return a background object with expected props", () => {
        const create = createBackgroundItem(BACKGROUND_OPTIONS, FACTORY);

        const result = create(ITEM_OPTIONS, { width: 1920, height: 1080 });

        expect(result).toHaveProperty("list");
        expect(result).toHaveProperty("drawList");
        expect(result).toHaveProperty("init");
        expect(result).toHaveProperty("reset");
        expect(result).toHaveProperty("update");
        expect(result).toHaveProperty("resize");

        expect(result.image).toBe("cloud");
        expect(result.isCircle).toBe(true);
        expect(result.status).toEqual(["IDLE", "OVER"]);

        expect(FACTORY).toHaveBeenCalledOnce();
    });

    it("should compute drawList with image and isCircle", () => {
        const item = {
            x: 10,
            y: 20,
            width: 30,
            height: 40,
            offsetX: 0,
            offsetY: 0,
            scale: 1,
            speedMultiplier: 1,
        };

        const create = createBackgroundItem(BACKGROUND_OPTIONS, FACTORY);

        const background = create(ITEM_OPTIONS, { width: 1000, height: 1000 });

        background.list.value = [item];

        expect(background.drawList.value[0]).toMatchObject({
            ...item,
            image: BACKGROUND_OPTIONS.image,
            isCircle: BACKGROUND_OPTIONS.isCircle,
        });
    });
});
