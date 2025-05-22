import { ref } from "vue";
import type {
    BackgroundItem,
    BackgroundItemOptions,
} from "../../types/Background";
import type { GameState } from "../../types/Game";
import { Star } from "../Star";
import { getInitialState } from "../../utils/game";
import mockGame from "../../test-utils/__mocks__/mockGame";

const defaultOptions: BackgroundItemOptions = {
    baseWidth: 100,
    baseHeight: 50,
    density: 5,
    sizeMultiplier: 2,
};

const container = { width: 1920, height: 1080 };

describe("Star factory", () => {
    const list = ref<BackgroundItem[]>([]);
    let star: ReturnType<typeof Star>;

    beforeEach(() => {
        list.value = [];
        star = Star(defaultOptions, { ...container }, list);
    });

    it("should generate stars with correct properties", () => {
        star.init();

        expect(list.value).toHaveLength(defaultOptions.density);

        for (const item of list.value) {
            expect(item.x).toBeGreaterThanOrEqual(0);
            expect(item.x).toBeLessThanOrEqual(container.width);
            expect(item.y).toBeGreaterThanOrEqual(0);
            expect(item.y).toBeLessThanOrEqual(container.height);
            expect(item.width).toBeGreaterThanOrEqual(2);
            expect(item.width).toBeLessThanOrEqual(5);
            expect(item.height).toBe(item.width); // square stars
            expect(item.speedMultiplier).toBeGreaterThanOrEqual(0.5);
            expect(item.speedMultiplier).toBeLessThanOrEqual(4); // 0.5 + up to 3.5
            expect(item.offsetX).toBe(0);
            expect(item.offsetY).toBe(0);
        }
    });

    it("should move stars and respawn when off-screen", () => {
        star.init();

        const state = ref<GameState>(getInitialState(mockGame));
        const item = list.value[0];

        item.x = container.width + 10;
        item.y = container.height + 10;

        star.update(state);

        expect(item.x).toBeLessThanOrEqual(container.width);
        expect(item.y).toBeLessThanOrEqual(container.height);
    });

    it("should regenerate the stars", () => {
        star.init();
        const original = list.value.map((s) => ({ ...s }));

        const state = ref<GameState>(getInitialState(mockGame));
        star.reset?.(state);

        const resetStars = list.value;
        let changed = false;

        for (let i = 0; i < original.length; i++) {
            if (
                original[i].x !== resetStars[i].x ||
                original[i].y !== resetStars[i].y ||
                original[i].width !== resetStars[i].width
            ) {
                changed = true;
                break;
            }
        }

        expect(changed).toBe(true);
    });
});
