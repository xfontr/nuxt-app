import { onMounted, ref, type Ref } from "vue";
import type { CanvasDrawOptions } from "../types/Canvas";
import type { Asset } from "..";

const ASSETS_DIR = "./img/game/";

const useCanvas = (
    canvas: Ref<HTMLCanvasElement | undefined>,
    assetsSrc: Asset[],
) => {
    const ctx = ref<CanvasRenderingContext2D>();
    const assets = ref<Record<string, HTMLImageElement>>({});

    const drawImage = (
        image: keyof typeof assets.value,
        options: CanvasDrawOptions,
    ) => {
        if (!assets.value[image]) {
            throw new Error(`Could not find requested asset: ${image}`);
        }

        ctx.value!.drawImage(
            assets.value[image],
            options.x,
            options.y,
            options.width,
            options.height,
        );
    };

    onMounted(() => {
        if (!canvas.value) return;
        ctx.value = canvas.value.getContext("2d")!;

        assetsSrc.forEach((asset) => {
            const image = new Image();
            image.src = `${ASSETS_DIR}${asset}`;
            assets.value[asset.split(".")[0]] = image;
        });
    });

    return {
        ctx,
        draw: { image: drawImage },
        assets,
    };
};

export default useCanvas;
