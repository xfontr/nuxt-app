import type { Asset, GameOptions } from "@portfolio/ui";

export const GAME_DATA: GameOptions = {
    physics: {
        gravity: 0.6,
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
        lives: 3,
    },
    laser: {
        cost: 15,
        min: 300,
        max: 800,
        offset: 800,
        recoveryRate: 2,
        maxReach: 0.4,
        minReach: 0,
    },
    layout: {
        floorPadding: 0,
        obstacleSpacing: 120,
        obstacleStartOffset: 300,
        obstacleThresholds: [20, 40, 80, 100],
        canvas: { height: 0, width: 0 },
    },
};

export const ASSETS: Asset[] = [
    "player-neutral.png",
    "player-laser.png",
    "player-disgusted.png",
    "player-fast.png",
    "cloud.png",
    "bug-0.png",
    "bug-1.png",
    "bug-2.png",
    "bug-3.png",
    "meteor-0.png",
    "framework-0.png",
    "framework-1.png",
    "framework-2.png",
    "framework-3.png",
    "framework-4.png",
    "framework-5.png",
    "framework-6.png",
    "framework-7.png",
    "framework-8.png",
    "framework-9.png",
    "framework-10.png",
    "heart-full.png",
    "heart-empty.png",
];
