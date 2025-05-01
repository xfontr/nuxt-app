import type { BackgroundItemOptions } from "./types/Background";
import type { InstructionName } from "./types/Instruction";
import type { ObstacleOptions } from "./types/Obstacle";

export const EYE_LEVEL_Y = 0.3;
export const EYE_LEVEL_X = -10;
export const BEAM_HEIGHT = 1;

export const OBSTACLE_OPTIONS: Required<ObstacleOptions> = {
    width: 20,
    height: 20,
    speedMultiplier: 1,
};

export const PLAYER_LOCATION_CLASS = ".player-loc";

export const ASSETS = [
    "player-neutral",
    "player-laser",
    "player-disgusted",
    "player-fast",
    "cloud",
    "bug-0",
    "bug-1",
    "bug-2",
    "bug-3",
];

export const DESKTOP_INSTRUCTIONS: InstructionName[] = [
    "space",
    "up",
    "left",
    "right",
];
export const MOBILE_INSTRUCTIONS: InstructionName[] = ["tap_hold", "tap"];

export const CLOUD_SHAPE: BackgroundItemOptions = {
    baseHeight: 40,
    baseWidth: 60,
    density: 10,
    sizeMultiplier: 4,
};

export const STAR_SHAPE: BackgroundItemOptions = {
    density: 100,
    baseHeight: 2,
    baseWidth: 2,
    sizeMultiplier: 3,
};
