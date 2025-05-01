import { getInitialState, restartState } from "../game";
import type { Game } from "../../types";
import type { GameState } from "../../types/Game";

const mockGame: Game = {
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

describe("getInitialState", () => {
    it("should return a valid initial game state", () => {
        const state = getInitialState(mockGame);

        expect(state.status).toBe("LOADING");
        expect(state.laserLeft).toBe(mockGame.laser.offset);
        expect(state.laserReach).toBe(mockGame.laser.minReach);
        expect(state.gameSpeed).toBe(mockGame.physics.baseSpeed);
        expect(state.player.lives).toBe(mockGame.player.lives);
    });
});

describe("restartState", () => {
    it("should reset relevant fields while preserving layout, offset, and stats", () => {
        const oldState: GameState = {
            ...getInitialState(mockGame),
            status: "OVER",
            player: {
                offsetX: 42,
                x: 100,
                y: 200,
                image: "player-neutral",
                lives: 3,
            },
            layout: { width: 800, height: 600 },
            bugsKilled: 5,
            frameCount: 500,
            difficulty: 2,
            stats: [],
        };

        const newState = restartState(mockGame, oldState);

        expect(newState.status).toBe("OVER");
        expect(newState.player.offsetX).toBe(42);
        expect(newState.player.x).toBe(100);
        expect(newState.player.y).toBe(200);
        expect(newState.layout).toEqual({ width: 800, height: 600 });

        expect(newState.stats.length).toBe(1);
        expect(newState.stats[0].bugsKilled).toBe(5);
        expect(newState.stats[0].frameCount).toBe(500);

        const expectedScore =
            newState.stats[0].bugsKilled * mockGame.score.bugKilled;

        expect(newState.stats[0].score).toBe(expectedScore);
    });
});
