import { ref, type Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import type { ObstacleOptions } from "../types/Obstacle";
import type { CanvasDrawOptions } from "../types/Canvas";
import { random } from "../../../utils";

const DEFAULT_OPTIONS: Required<ObstacleOptions> = {
    width: 20,
    height: 20,
    speedMultiplier: 1,
};

const useObstacle = (
    state: Ref<GameState>,
    game: Game,
    options: ObstacleOptions = {},
) => {
    const canvas = state.value.layout;
    const {
        game: { layout },
        ...opts
    } = {
        ...DEFAULT_OPTIONS,
        ...options,
        game: game,
    };

    const obstacles = ref<CanvasDrawOptions[]>([]);
    const minSpacing = layout.obstacleSpacing;

    const generateObstacle = (): CanvasDrawOptions => {
        return {
            x: canvas.width + random(0, 50),
            y:
                canvas.height -
                layout.obstacleThresholds[
                    random(0, layout.obstacleThresholds.length)
                ],
            width: opts.width,
            height: opts.height,
        };
    };

    const update = () => {
        // Move obstacles
        obstacles.value.forEach((o) => {
            o.x -= state.value.gameSpeed * opts.speedMultiplier;
        });

        // Remove those out of view
        obstacles.value = obstacles.value.filter((o) => o.x + o.width > 0);

        // Check if it's time to add a new one
        const lastX = obstacles.value.at(-1)?.x ?? -Infinity;
        if (lastX < canvas.width - minSpacing) {
            obstacles.value.push(generateObstacle());
        }
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
