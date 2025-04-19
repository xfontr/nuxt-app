import { ref, type Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import type { CanvasDrawOptions } from "../types/Canvas";
import { random } from "../../../utils";
import { OBSTACLE_OPTIONS } from "../constants";

const useObstacle = (state: Ref<GameState>, { layout }: Game) => {
    const { width, height, speedMultiplier } = OBSTACLE_OPTIONS;
    const canvas = state.value.layout;

    const obstacles = ref<CanvasDrawOptions[]>([]);

    const setY = () =>
        canvas.height -
        layout.obstacleThresholds[random(0, layout.obstacleThresholds.length)];

    const generateObstacle = (): CanvasDrawOptions => ({
        x: canvas.width + random(0, 50),
        y: setY(),
        width,
        height,
    });

    const update = () => {
        obstacles.value.forEach((obstacle) => {
            obstacle.x -= state.value.gameSpeed * speedMultiplier;
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
