import { computed, watch, type Ref } from "vue";
import type { GameState } from "../types/Game";
import type { Background, BackgroundItem } from "../types/Background";
import type { CanvasDrawOptions } from "../types/Canvas";

const useBackground = (state: Ref<GameState>, ...items: Background[]) => {
    const cycle = computed<"DAY" | "NIGHT">(() =>
        state.value.status === "ON" ? "NIGHT" : "DAY",
    );

    const cycleItems = computed(() =>
        items.filter((item) => item.cycle === cycle.value),
    );

    const list = computed<BackgroundItem[]>(() =>
        cycleItems.value.flatMap((item) => item.list.value),
    );

    const drawList = computed<CanvasDrawOptions[]>(() =>
        cycleItems.value.flatMap((item) => item.drawList.value),
    );

    watch(
        () => state.value.status,
        (newStatus, oldStatus) => {
            items.forEach((item) => {
                if (!item.status.includes(newStatus)) return;
                if (!item.status.includes(oldStatus)) item.reset(state);
            });
        },
    );

    watch(
        () => state.value.layout,
        (newSize) => {
            items.forEach((item) => {
                item.resize?.(newSize);
            });
        },
        { deep: true },
    );

    const init = (): void => {
        cycleItems.value.forEach((item) => item.init());
    };

    const update = (): void => {
        cycleItems.value.forEach((item) => item.update(state));
    };

    return {
        list,
        drawList,
        init,
        update,
    };
};

export default useBackground;
