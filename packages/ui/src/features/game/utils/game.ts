import type { Game, GameState } from "../types/Game";

export const getInitialState = ({
    laser,
    physics,
    player,
}: Game): GameState => ({
    status: "LOADING",
    velocityY: 0,
    jumpKeyHeld: false,
    isJumping: false,
    isLasering: false,
    isColliding: false,
    isSpawning: true,
    laserLeft: laser.offset,
    laserReach: laser.minReach,
    gameSpeed: physics.baseSpeed,
    player: {
        offsetX: 0,
        x: 0,
        y: 0,
        image: "player-neutral",
        lives: player.lives,
    },
    framesAlive: 0,
    bugsKilled: 0,
    layout: {
        width: 0,
        height: 0,
    },
    stats: [],
});

const distance = (game: Game, state: GameState) =>
    +(state.framesAlive * game.score.frameToDistance).toFixed(0);

const score = (game: Game, state: GameState) =>
    state.bugsKilled * game.score.bugKilled + distance(game, state);

export const restartState = (game: Game, state: GameState): GameState => {
    const initialState = getInitialState(game);

    return {
        ...initialState,
        player: {
            ...initialState.player,
            offsetX: state.player.offsetX,
            x: state.player.x,
            y: state.player.y,
        },
        layout: {
            ...state.layout,
        },
        stats: [
            ...state.stats,
            {
                bugsKilled: state.bugsKilled,
                framesAlive: state.framesAlive,
                score: score(game, state),
            },
        ],
    };
};
