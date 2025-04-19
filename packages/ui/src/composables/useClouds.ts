import { ref, type Ref } from "vue";
import type { GameState } from "../features/game/types/Game";
import type { CanvasDrawOptions } from "../features/game/types/Canvas";
import { random } from "../utils";

type Cloud = CanvasDrawOptions & {
    speedMultiplier: number;
};

const useClouds = (state: Ref<GameState>) => {
    const canvas = state.value.layout;
    const clouds = ref<Cloud[]>([]);

    const init = (amount = 10) => {
        clouds.value = Array.from({ length: amount }, () => {
            const scale = 1 + Math.random(); // clouds are now 1x–3x in size
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * (canvas.height / 2),
                width: 60 * scale,
                height: 40 * scale,
                scale,
                speedMultiplier: 0.1 + Math.random() * 0.4, // each cloud has unique drift speed
            };
        });
    };

    const update = () => {
        clouds.value.forEach((cloud) => {
            cloud.x -= state.value.gameSpeed * cloud.speedMultiplier;

            if (cloud.x + cloud.width < 0) {
                cloud.x = canvas.width + random(0, 50);
                cloud.y = Math.random() * (canvas.height / 2);
            }
        });
    };

    return {
        list: clouds,
        init,
        update,
    };
};
export default useClouds;
