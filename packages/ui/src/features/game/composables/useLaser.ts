import { ref, watch, type Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import type { CanvasDrawOptions } from "../types/Canvas";

const EYE_LEVEL_Y = 0.3;
const EYE_LEVEL_X = -10;
const BEAM_HEIGHT = 1;

export const useLaser = (state: Ref<GameState>, game: Game) => {
    const laser = ref<CanvasDrawOptions>();
    const yOffset = game.player.size * EYE_LEVEL_Y;

    watch(
        () => state.value.isLasering,
        (isLasering) => {
            if (isLasering) shoot();
        },
    );

    const shoot = () => {
        if (
            state.value.laserLeft < game.laser.cost ||
            state.value.laserLeft < game.laser.min
        ) {
            return;
        }

        const { player } = state.value;

        laser.value = {
            x: player.x + game.player.size + EYE_LEVEL_X,
            y: player.y + yOffset,
            width: state.value.layout.width * state.value.laserReach,
            height: BEAM_HEIGHT,
        };

        state.value.player.image = "player-laser";
    };

    const reset = () => {
        if (state.value.player.image === "player-laser") {
            state.value.player.image = "player-neutral";
        }

        state.value.laserReach = game.laser.minReach;
        laser.value = undefined;
    };

    const update = () => {
        if (!state.value.isLasering || !laser.value) {
            state.value.laserLeft += game.laser.recoveryRate;

            if (state.value.laserLeft >= game.laser.max)
                state.value.laserLeft = game.laser.max;

            reset();

            return;
        }

        if (state.value.laserLeft < game.laser.cost) {
            state.value.isLasering = false;
            reset();
            return;
        }

        if (state.value.laserReach < game.laser.maxReach) {
            state.value.laserReach += game.laser.cost / game.laser.max;
        }

        laser.value.y = state.value.player.y + yOffset;
        laser.value.width = state.value.layout.width * state.value.laserReach;
        state.value.laserLeft -= game.laser.cost;
    };

    return {
        laser,
        shoot,
        update,
    };
};
