import { ref, watch, type Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import type { CanvasDrawOptions } from "../types/Canvas";
import { BEAM_HEIGHT, EYE_LEVEL_X, EYE_LEVEL_Y } from "../constants";

export const useLaser = (state: Ref<GameState>, game: Game) => {
    const laser = ref<CanvasDrawOptions>();
    const yOffset = game.player.size * EYE_LEVEL_Y;

    watch(
        () => state.value.isLasering,
        (isLasering) => {
            if (isLasering) shoot();
        },
    );

    const canShoot = (): boolean =>
        state.value.laserLeft >= game.laser.cost &&
        state.value.laserLeft >= game.laser.min;

    const shoot = () => {
        if (!canShoot()) return;

        updateLaserPosition();
        state.value.player.image = "player-laser";
    };

    const updateLaserPosition = () => {
        const { x, y } = state.value.player;

        laser.value = {
            x: x + game.player.size + EYE_LEVEL_X,
            y: y + yOffset,
            width: state.value.layout.width * state.value.laserReach,
            height: BEAM_HEIGHT,
        };
    };

    const resetLaser = () => {
        if (state.value.player.image === "player-laser") {
            state.value.player.image = "player-neutral";
        }

        state.value.laserReach = game.laser.minReach;
        laser.value = undefined;
    };

    const recoverLaserEnergy = () => {
        state.value.laserLeft += game.laser.recoveryRate;

        if (state.value.laserLeft <= game.laser.max) return;
        state.value.laserLeft = game.laser.max;
    };

    const graduallyIncreaseLength = () => {
        if (state.value.laserReach >= game.laser.maxReach) return;
        state.value.laserReach += game.laser.cost / game.laser.max;
    };

    const update = () => {
        if (!(state.value.isLasering && laser.value)) {
            recoverLaserEnergy();
            resetLaser();
            return;
        }

        if (state.value.laserLeft < game.laser.cost) {
            state.value.isLasering = false;
            resetLaser();
            return;
        }

        graduallyIncreaseLength();
        updateLaserPosition();

        state.value.laserLeft -= game.laser.cost;
    };

    return {
        laser,
        shoot,
        update,
    };
};
