import { ref } from "vue";
import type {
    BackgroundFactory,
    BackgroundItem,
    BackgroundMethods,
} from "../types/Background";
import { random } from "../../../utils";
import createBackgroundItem from "../utils/background";

export const Cloud: BackgroundFactory = (options, container, list) => {
    const sizeMultiplier = ref<number>(options.sizeMultiplier);

    const updateSizeMultiplier = () => {
        sizeMultiplier.value = Math.min(
            options.sizeMultiplier * (container.width / 1920) + 1,
            options.sizeMultiplier,
        );
    };

    const resize = (newSize: typeof container) => {
        container = newSize;
        updateSizeMultiplier();
    };

    const init: BackgroundMethods["init"] = () => {
        updateSizeMultiplier();

        list.value = Array.from({ length: options.density }, () => {
            const scale = 1 + Math.random() * sizeMultiplier.value;
            const speedMultiplier = 0.1 + Math.random() * 0.4;

            return {
                x: Math.random() * container.width,
                y:
                    Math.random() * (container.height / 2) +
                    container.height / 3,
                width: options.baseWidth * scale,
                height: options.baseHeight * scale,
                scale,
                speedMultiplier,
                offsetX: 0,
                offsetY: 0,
            } satisfies BackgroundItem;
        });
    };

    const update: BackgroundMethods["update"] = (state) => {
        list.value.forEach((cloud) => {
            cloud.x -= state.value.gameSpeed * cloud.speedMultiplier;

            cloud.x += cloud.offsetX;
            cloud.y += cloud.offsetY;

            cloud.offsetX *= 0.9;
            cloud.offsetY *= 0.9;

            if (cloud.x + cloud.width >= 0) return;

            cloud.x = container.width + random(0, 50);
            cloud.y = Math.random() * (container.height / 2);
            cloud.offsetX = 0;
            cloud.offsetY = 0;
        });
    };

    const reset: BackgroundMethods["reset"] = () => {
        list.value = list.value.map((cloud) => {
            const scale = 1 + Math.random() * sizeMultiplier.value;
            return {
                ...cloud,
                width: options.baseWidth * scale,
                height: options.baseHeight * scale,
                scale,
            } satisfies BackgroundItem;
        });
    };

    return {
        init,
        update,
        reset,
        resize,
    };
};

export default createBackgroundItem(
    { cycle: "DAY", status: ["LOADING", "IDLE", "OVER"], image: "cloud" },
    Cloud,
);
