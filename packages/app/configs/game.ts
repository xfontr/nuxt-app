import type { Asset, GameOptions } from "@portfolio/ui";

export const GAME_DATA: GameOptions = {
    physics: {
        gravity: 0.6,
        baseJumpStrength: -10,
        jumpStrength: -10,
        boostMultiplier: 2.5,
        slowMultiplier: 0.2,
        baseSpeed: 3,
    },
    score: {
        frameToDistance: 0.1,
        bugKilled: 10,
    },
    player: {
        size: 40,
        offsetX: 550,
        lives: 3,
    },
    laser: {
        cost: 15,
        min: 200,
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
        obstacleThresholds: [20, 40, 60, 80, 120, 160],
        canvas: { height: 0, width: 0 },
    },
};

export const ASSETS: Asset[] = [
    "player-neutral.png",
    "player-laser.png",
    "player-disgusted.png",
    "player-fast.png",
    // "bullet.png",
    "cloud.png",
    "bug-1.png",
    "bug-2.png",
    // "bug-3.png",
    // "bug-4.png",
    // "heart.png",
    "heart-full.png",
    "heart-empty.png",
];
