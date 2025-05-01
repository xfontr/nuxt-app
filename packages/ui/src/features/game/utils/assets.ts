import type { i18n } from "../types";
import type { UiAssetName, UiAsset } from "../types/UiAsset";

export const getUiAsset = (
    t: i18n,
    name: UiAssetName,
    src: string,
): UiAsset => {
    const path = t<string>(`game.assets.${name}.src`);

    return {
        src: `${src}/${path}.png`,
        alt: t(`game.assets.${name}.alt`),
    };
};
