import type { Asset, GameOptions } from "@portfolio/ui";

export const GAME_DATA: GameOptions = {
    physics: {
        gravity: 0.6,
        baseJumpStrength: -12,
        jumpStrength: -12,
        boostMultiplier: 2.5,
        baseSpeed: 3,
    },
    player: {
        size: 40,
        offsetX: 550,
    },
    laser: {
        cost: 15,
        min: 300,
        max: 500,
        offset: 500,
        recoveryRate: 1,
        maxReach: 0.25,
        minReach: 0,
    },
    layout: {
        floorPadding: 0,
        obstacleSpacing: 80,
        obstacleStartOffset: 300,
        obstacleThresholds: [20, 40, 80, 120],
        canvas: { height: 0, width: 0 },
    },
};

export const ASSETS: Asset[] = [
    "player-neutral.png",
    "player-laser.png",
    "bullet.png",
    "cloud.png",
];
