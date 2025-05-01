import { computed, ref } from "vue";
import type {
    Background,
    BackgroundFactory,
    BackgroundItem,
    BackgroundItemOptions,
    BackgroundOptions,
} from "../types/Background";
import type { CanvasDrawOptions } from "../types/Canvas";

const createBackgroundItem = (
    baseOptions: BackgroundOptions,
    callback: BackgroundFactory,
) => {
    const list = ref<BackgroundItem[]>([]);

    const drawList = computed(() =>
        list.value.map(
            (item) =>
                ({
                    ...item,
                    image: baseOptions.image,
                    isCircle: baseOptions.isCircle,
                } satisfies CanvasDrawOptions),
        ),
    );

    return (
        options: BackgroundItemOptions,
        container: { width: number; height: number },
    ): Background => ({
        ...callback(options, container, list),
        ...baseOptions,
        list,
        drawList,
    });
};

export default createBackgroundItem;
