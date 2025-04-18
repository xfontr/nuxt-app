import { ref, type Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import type { CanvasDrawOptions } from "../types/Canvas";

const EYE_LEVEL_Y = 0.3;
const EYE_LEVEL_X = -10;
const BEAM_HEIGHT = 1;

export const useLaser = (state: Ref<GameState>, game: Game) => {
    const lasers = ref<CanvasDrawOptions[]>([]);
    const yOffset = game.player.size * EYE_LEVEL_Y;

    const shoot = () => {
        if (state.value.isLasering) return;

        state.value.isLasering = true;
        const { player } = state.value;

        lasers.value.push({
            x: player.x + game.player.size + EYE_LEVEL_X,
            y: player.y + yOffset,
            width: game.layout.canvas.width,
            height: BEAM_HEIGHT,
            ttl: 10, // frames
        });

        state.value.player.image = "player-laser";
    };

    const update = () => {
        lasers.value = lasers.value
            .map((laser) => ({
                ...laser,
                ttl: laser.ttl! - 1,
                y: state.value.player.y + yOffset,
            }))
            .filter(({ ttl }) => ttl);

        if (
            state.value.player.image === "player-laser" &&
            !lasers.value.length
        ) {
            state.value.player.image = "player-neutral";

            setTimeout(() => {
                state.value.isLasering = false;
            }, 500);
        }
    };

    return {
        lasers,
        shoot,
        update,
    };
};
