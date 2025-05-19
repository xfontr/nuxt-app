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
        context.drawImage(img, -size / 2, -size / 2, size, size);
    };

    return {
        mount,
        render,
        unmount: () => {
            img = undefined;
        },
    };
};

export default TechImage;
