import { computed, type Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import { isLeftKey, isRightKey, isSpaceKey, isUpKey } from "../utils/keyboard";

const useUserActions = (state: Ref<GameState>, game: Game) => {
    const enabled = computed(() => state.value.status === "ON");

    const keyDown = (e: KeyboardEvent) => {
        e.preventDefault();

        if (isSpaceKey(e.code) && !enabled.value) {
            state.value.status = "ON";
            return;
        }

        if (!enabled.value) return;

        if (isSpaceKey(e.code)) {
            state.value.isLasering = true;
        }

        if (!enabled.value) return;

        if (isUpKey(e.key)) {
            if (state.value.isJumping) return;

            state.value.velocityY = game.physics.jumpStrength;
            state.value.isJumping = true;
            state.value.jumpKeyHeld = true;
        }

        if (isRightKey(e.key)) {
            state.value.gameSpeed =
                game.physics.boostMultiplier * game.physics.baseSpeed;

            if (state.value.player.image !== "player-neutral") return;
            state.value.player.image = "player-fast";
        }

        if (isLeftKey(e.key)) {
            state.value.gameSpeed =
                game.physics.slowMultiplier * game.physics.baseSpeed;
        }
    };

    const keyUp = (e: KeyboardEvent) => {
        if (!enabled.value) return;

        e.preventDefault();

        if (isUpKey(e.key)) state.value.jumpKeyHeld = false;

        if (isRightKey(e.key)) {
            state.value.gameSpeed = game.physics.baseSpeed;

            if (state.value.player.image !== "player-fast") return;
            state.value.player.image = "player-neutral";
        }

        if (isLeftKey(e.key)) {
            state.value.gameSpeed = game.physics.baseSpeed;
        }

        if (isSpaceKey(e.code)) {
            state.value.isLasering = false;
        }
    };

    const click = (e: MouseEvent) => {
        e.preventDefault();
        state.value.status = "IDLE";
    };

    return { keyDown, keyUp, click };
};

export default useUserActions;
