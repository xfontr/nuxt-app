import { describe, it, expect, beforeEach } from "vitest";
import { ref } from "vue";
import type {
    BackgroundItem,
    BackgroundItemOptions,
} from "../../types/Background";
import type { GameState } from "../../types/Game";
import { Cloud } from "../Cloud";
import { getInitialState } from "../../utils/game";
import mockGame from "../../test-utils/__mocks__/mockGame";

const defaultOptions: BackgroundItemOptions = {
    baseWidth: 100,
    baseHeight: 50,
    density: 5,
    sizeMultiplier: 2,
};

const container = { width: 1920, height: 1080 };

describe("Cloud factory", () => {
    const list = ref<BackgroundItem[]>([]);
    let cloud: ReturnType<typeof Cloud>;

    beforeEach(() => {
        list.value = [];
        cloud = Cloud(defaultOptions, { ...container }, list);
    });

    it("should generate clouds with correct properties", () => {
        cloud.init();

        expect(list.value).toHaveLength(defaultOptions.density);

        for (const item of list.value) {
            expect(item.x).toBeGreaterThanOrEqual(0);
            expect(item.x).toBeLessThanOrEqual(container.width);
            expect(item.y).toBeGreaterThanOrEqual(0);
            expect(item.y).toBeLessThanOrEqual(container.height / 2);

            expect(item.scale).toBeGreaterThanOrEqual(1);
            expect(item.speedMultiplier).toBeGreaterThanOrEqual(0.1);
            expect(item.speedMultiplier).toBeLessThanOrEqual(0.5);
        }
    });

    it("should move clouds and respawn if off-screen", () => {
        cloud.init();

        const gameState = ref<GameState>(getInitialState(mockGame));

        list.value[0].x = -list.value[0].width - 1;

        cloud.update(gameState);

        expect(list.value[0].x).toBeGreaterThanOrEqual(container.width);
        expect(list.value[0].offsetX).toBe(0);
        expect(list.value[0].offsetY).toBe(0);
    });

    it("should randomize cloud sizes", () => {
        const state = ref<GameState>(getInitialState(mockGame));
        cloud.init();

        const oldWidths = list.value.map((c) => c.width);
        cloud.reset?.(state);
        const newWidths = list.value.map((c) => c.width);

        expect(newWidths).not.toEqual(oldWidths);
    });
});
