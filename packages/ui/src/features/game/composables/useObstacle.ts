import { ref, type Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import type { CanvasDrawOptions } from "../types/Canvas";
import { random } from "../../../utils";
import { OBSTACLE_OPTIONS } from "../constants";

const useObstacle = (state: Ref<GameState>, { layout }: Game) => {
    const { width, height, speedMultiplier } = OBSTACLE_OPTIONS;
    const canvas = state.value.layout;

    const obstacles = ref<(CanvasDrawOptions & { baseY: number })[]>([]);

    const setY = () =>
        canvas.height -
        layout.obstacleThresholds[random(0, layout.obstacleThresholds.length)];

    const generateObstacle = (): CanvasDrawOptions & { baseY: number } => {
        const baseY = setY();

        return {
            x: canvas.width + random(0, 50),
            y: baseY,
            baseY,
            width,
            height,
            image: `bug-${random(0, 3)}`,
            imageSecond: `bug-${random(0, 3)}`,
            imageRate: 4,
        };
    };

    const update = () => {
        const frame = state.value.framesAlive;

        obstacles.value.forEach((obstacle, index) => {
            obstacle.x -= state.value.gameSpeed * speedMultiplier;

            const wave = Math.sin((frame + index * 13) * 0.3);
            obstacle.y = obstacle.baseY + wave * 2.5;
        });

        obstacles.value = obstacles.value.filter(
            ({ x, width }) => x + width > 0,
        );

        const lastX = obstacles.value.at(-1)?.x ?? -Infinity;

        if (lastX >= canvas.width - layout.obstacleSpacing) return;

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
