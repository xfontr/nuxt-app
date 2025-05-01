import { getInitialState, restartState } from "../game";
import type { GameState } from "../../types/Game";
import mockGame from "../../test-utils/__mocks__/mockGame";

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
