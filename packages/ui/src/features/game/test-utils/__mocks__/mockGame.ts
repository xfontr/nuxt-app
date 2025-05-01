import type { Game } from "../../types";

const mockGame: Game = {
    physics: {
        gravity: 1,
        jumpStrength: -30,
        boostMultiplier: 3,
        slowMultiplier: 0.1,
        baseSpeed: 2,
    },
    score: {
        frameToDistance: 1,
        bugKilled: 500,
        difficultyMultiplier: 0.15,
    },
    player: {
        size: 20,
        lives: 5,
    },
    laser: {
        cost: 150,
        min: 250,
        max: 950,
        offset: 850,
        recoveryRate: 10,
        maxReach: 1,
        minReach: 0.1,
    },
    obstacles: {
        minSpacing: 95,
        difficultyIncrease: 5,
        spacing: 125,
        difficultyBreakpoint: 1255,
        offset: 100,
        thresholds: [5, 10, 15],
    },
    assetsSrc: "./game",
};

export default mockGame;
