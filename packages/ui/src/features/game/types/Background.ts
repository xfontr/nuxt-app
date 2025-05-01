import type { ComputedRef, Ref } from "vue";
import type { GameState } from "./Game";
import type { CanvasDrawOptions } from "./Canvas";

export type BackgroundItem = {
    offsetX: number;
    offsetY: number;
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
    speedMultiplier: number;
};

export type BackgroundItemOptions = {
    baseWidth: number;
    baseHeight: number;
    density: number;
    sizeMultiplier: number;
};

export type BackgroundOptions = {
    cycle: "DAY" | "NIGHT";
    status: GameState["status"][];
    isCircle?: boolean;
    image?: string;
};

export type BackgroundInfo = BackgroundOptions & {
    list: Ref<BackgroundItem[]>;
    drawList: ComputedRef<CanvasDrawOptions[]>;
};

export type BackgroundMethods = {
    init: () => void;
    reset: (state: Ref<GameState>) => void;
    update: (state: Ref<GameState>) => void;
    resize?: (newSize: { width: number; height: number }) => void;
};

export type Background = BackgroundInfo & BackgroundMethods;

export type BackgroundFactory = (
    options: BackgroundItemOptions,
    container: { width: number; height: number },
    list: Ref<BackgroundItem[]>,
) => BackgroundMethods;
