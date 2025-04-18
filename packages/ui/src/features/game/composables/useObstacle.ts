import { ref, type Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import type { ObstacleOptions } from "../types/Obstacle";
import type { CanvasDrawOptions } from "../types/Canvas";
import { random } from "../../../utils";

const DEFAULT_OPTIONS: Required<ObstacleOptions> = {
    amount: 5,
    canScale: false,
    width: 20,
    height: 20,
    speedMultiplier: 1,
};

const useObstacle = (
    gameOptions: Game,
    gameState: Ref<GameState>,
    options: ObstacleOptions = {},
) => {
    const {
        game: { layout },
        ...opts
    } = {
        ...DEFAULT_OPTIONS,
        ...options,
        game: gameOptions,
    };

    const obstacles = ref<CanvasDrawOptions[]>(
        Array.from({ length: opts.amount }, (_, i) => {
            const scale = opts.canScale ? 0.5 + Math.random() * 1.5 : undefined;

            return {
                x:
                    i * layout.obstacleStartOffset +
                    layout.obstacleSpacing +
                    random(-50, 50),
                y:
                    layout.canvas.height -
                    layout.obstacleThresholds[
                        random(0, layout.obstacleThresholds.length)
                    ],
                width: opts.width * (scale ?? 1),
                height: opts.height * (scale ?? 1),
                ...(scale ? { scale } : {}),
            };
        }),
    );

    const update = () => {
        obstacles.value.forEach((obstacle) => {
            obstacle.x -= gameState.value.gameSpeed * opts.speedMultiplier;

            if (obstacle.x + obstacle.width < 0) {
                const farthestX = Math.max(...obstacles.value.map((o) => o.x));
                obstacle.x =
                    farthestX + layout.obstacleSpacing + random(-20, 20);
            }
        });
    };

    const reset = () => {
        obstacles.value.forEach((obstacle, i) => {
            obstacle.x =
                i * layout.obstacleSpacing + layout.obstacleStartOffset;
        });
    };

    return {
        list: obstacles,
        update,
        reset,
    };
};

export default useObstacle;
