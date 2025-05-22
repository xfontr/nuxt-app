import { IMG_MAX_SIZE, IMG_MIN_SIZE } from "../constants";
import type { TechItem } from "../types/Tech";

const getAsset = (id?: string): string =>
    id
        ? `https://img.icons8.com/?size=100&id=${id}&format=png&color=ffffff`
        : "#";

const TechImage = (id?: string): TechItem => {
    let img: HTMLImageElement | undefined;

    const mount: TechItem["mount"] = () => {
        img = new Image();
        img.src = getAsset(id);
    };

    const render: TechItem["render"] = (context, size) => {
        if (!img?.complete) return;
        const imgSize = Math.min(Math.max(IMG_MIN_SIZE, size), IMG_MAX_SIZE);
        context.drawImage(img, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
    };

    return {
        mount,
        render,
    };
};

export default TechImage;
