import { onMounted, ref, type Ref } from "vue";
import type { CanvasDrawOptions } from "../types/Canvas";
import type { Asset } from "..";
import { ASSETS } from "../constants";
import type { GameState } from "../types/Game";

const useCanvas = (
    state: Ref<GameState>,
    canvas: Ref<HTMLCanvasElement | undefined>,
    assetsSrc: Asset[],
) => {
    const ctx = ref<CanvasRenderingContext2D>();
    const assets = ref<Record<string, HTMLImageElement>>({});

    const drawImage = (options: CanvasDrawOptions) => {
        if (!options.image || !assets.value[options.image]) {
            throw new Error(`Could not find requested asset: ${options.image}`);
        }

        const ctxRef = ctx.value!;

        if (options.imageSecond) {
            ctxRef.drawImage(
                assets.value[
                    state.value.framesAlive % (options.imageRate ?? 2) === 0
                        ? options.image
                        : options.imageSecond
                ],
                options.x,
                options.y,
                options.width,
                options.height,
            );
        } else {
            ctxRef.drawImage(
                assets.value[options.image],
                options.x,
                options.y,
                options.width,
                options.height,
            );
        }

        if (options.icon && assets.value[options.icon]) {
            const iconSize = 70;
            const centerX = options.x + options.width / 2;
            const centerY = options.y + options.height / 2;

            ctxRef.drawImage(
                assets.value[options.icon],
                centerX - iconSize / 2,
                centerY - iconSize / 2,
                iconSize,
                iconSize,
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

        assetsSrc.forEach((asset) => {
            const image = new Image();
            image.src = `${ASSETS}${asset}`;
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
