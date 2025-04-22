import type { KeyboardAsset } from "./types/Asset";
import type { ObstacleOptions } from "./types/Obstacle";

export const ASSETS = "./img/game/";

export const AVAILABLE_KEYS: KeyboardAsset[] = [
    { name: "space", src: "keyboard-space", alt: "Keyboard space bar" },
    { name: "up", src: "keyboard-up", alt: "Keyboard up arrow" },
    { name: "left", src: "keyboard-left", alt: "Keyboard left arrow" },
    { name: "right", src: "keyboard-right", alt: "Keyboard right arrow" },
];

export const EYE_LEVEL_Y = 0.3;
export const EYE_LEVEL_X = -10;
export const BEAM_HEIGHT = 1;

export const OBSTACLE_OPTIONS: Required<ObstacleOptions> = {
    width: 20,
    height: 20,
    speedMultiplier: 1,
};

export const PLAYER_LOCATION_CLASS = ".player-loc";
