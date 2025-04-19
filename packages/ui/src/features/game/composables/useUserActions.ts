import type { Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import { isLeftKey, isRightKey, isSpaceKey, isUpKey } from "../utils/keyboard";

const useUserActions = (state: Ref<GameState>, game: Game) => {
    const keyDown = (e: KeyboardEvent) => {
        e.preventDefault();

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

        if (isSpaceKey(e.code)) {
            state.value.isLasering = true;
        }
    };

    const keyUp = (e: KeyboardEvent) => {
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

    return { keyDown, keyUp };
};

export default useUserActions;
