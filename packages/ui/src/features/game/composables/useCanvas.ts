import { onMounted, ref, type Ref } from "vue";
import type { CanvasDrawOptions } from "../types/Canvas";
import type { Game, GameState } from "../types/Game";
import { ASSETS } from "../constants";

const useCanvas = (
    state: Ref<GameState>,
    { assetsSrc }: Game,
    canvas: Ref<HTMLCanvasElement | undefined>,
) => {
    const ctx = ref<CanvasRenderingContext2D>();
    const assets = ref<Record<string, HTMLImageElement>>({});

    const drawImage = (options: CanvasDrawOptions) => {
        if (!options.image || !assets.value[options.image]) {
            throw new Error(`Could not find requested asset: ${options.image}`);
        }

        if (options.imageSecond) {
            ctx.value!.drawImage(
                assets.value[
                    state.value.frameCount % (options.imageRate ?? 4) === 0
                        ? options.image
                        : options.imageSecond
                ],
                options.x,
                options.y,
                options.width,
                options.height,
            );
        } else {
            ctx.value!.drawImage(
                assets.value[options.image],
                options.x,
                options.y,
                options.width,
                options.height,
            );
        }
    };

    const reset = () => {
        ctx.value!.clearRect(
            0,
            0,
            state.value.layout.width,
            state.value.layout.height,
        );
    };

    onMounted(() => {
        if (!canvas.value) return;
        ctx.value = canvas.value.getContext("2d")!;

        ASSETS.forEach((asset) => {
            const image = new Image();
            image.src = `${assetsSrc}/${asset}.png`; // TODO: Properly join url
            assets.value[asset.split(".")[0]] = image;
        });
    });

    return {
        ctx,
        draw: { image: drawImage },
        assets,
        reset,
    };
};

export default useCanvas;
