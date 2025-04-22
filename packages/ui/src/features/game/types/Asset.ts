import type { Translations } from "./Translations";

export type Asset = `${string}.${"png" | "svg"}`;

export type KeyboardAsset = {
    name: keyof Translations["keyboard"];
    src: string;
    alt: string;
};
