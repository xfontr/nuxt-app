import { computed, ref, type Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import type { CanvasDrawOptions } from "../types/Canvas";
import { random } from "../../../utils";
import { OBSTACLE_OPTIONS } from "../constants";

const WAVE_HEIGHT = 2.5;
const WAVE_WIDTH = 0.3;

const useObstacle = (state: Ref<GameState>, game: Game) => {
    const { width, height, speedMultiplier } = OBSTACLE_OPTIONS;
    const canvas = state.value.layout;

    const obstacles = ref<(CanvasDrawOptions & { baseY: number })[]>([]);

    const maxDifficulty = computed<number>(
        () =>
            +(
                (game.obstacles.spacing - game.obstacles.minSpacing) /
                game.obstacles.difficultyIncrease
            ).toFixed(0),
    );

    const spacing = computed<number>(() => {
        const extra =
            state.value.difficulty * game.obstacles.difficultyIncrease;
        return game.obstacles.spacing - extra;
    });

    const setY = () =>
        canvas.height -
        game.obstacles.thresholds[random(0, game.obstacles.thresholds.length)];

    const generateObstacle = (): CanvasDrawOptions & { baseY: number } => {
        const baseY = setY();

        return {
            x: canvas.width + spacing.value + random(0, 25),
            y: baseY,
            baseY,
            width,
            height,
            image: `bug-${random(0, 3)}`,
            imageSecond: `bug-${random(0, 3)}`,
            imageRate: 4,
        };
    };

    const setDifficulty = () => {
        if (
            state.value.distanceCount / game.obstacles.difficultyBreakpoint -
                1 <
            state.value.difficulty
        ) {
            return;
        }

        if (state.value.difficulty === maxDifficulty.value) return;

        state.value.difficulty += 1;
    };

    const update = () => {
        const frame = state.value.frameCount;
        setDifficulty();

        obstacles.value.forEach((obstacle, index) => {
            obstacle.x -= state.value.gameSpeed * speedMultiplier;

            const wave = Math.sin((frame + index * 13) * WAVE_WIDTH);
            obstacle.y = obstacle.baseY + wave * WAVE_HEIGHT;
        });

        obstacles.value = obstacles.value.filter(
            ({ x, width }) => x + width > 0,
        );

        const lastX = obstacles.value.at(-1)?.x ?? -Infinity;

        if (lastX >= canvas.width - spacing.value) return;

        obstacles.value.push(generateObstacle());
    };

    const reset = () => {
        obstacles.value = [];
    };

    return {
        list: obstacles,
        update,
        reset,
    };
};

export default useObstacle;
