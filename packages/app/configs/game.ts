import type { GameOptions } from "@portfolio/ui";

export const GAME_DATA: GameOptions = {
    physics: {
        gravity: 0.6,
        jumpStrength: -10,
        boostMultiplier: 1.5,
        slowMultiplier: 0.4,
        baseSpeed: 4,
    },
    score: {
        frameToDistance: 0.03,
        bugKilled: 50,
        difficultyMultiplier: 0.015,
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
    obstacles: {
        minSpacing: 60,
        difficultyIncrease: 10,
        spacing: 120,
        difficultyBreakpoint: 3000,
        offset: 200,
        thresholds: [20, 40, 80, 100],
    },
    assetsSrc: "./img/game",
};
