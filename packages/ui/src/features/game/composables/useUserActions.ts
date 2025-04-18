import type { Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import { isRightKey, isUpKey } from "../utils/keyboard";

const useUserActions = (
    state: Ref<GameState>,
    game: Game,
    shoot: () => void,
) => {
    const keyDown = (e: KeyboardEvent) => {
        e.preventDefault();

        if (isUpKey(e.key)) {
            if (state.value.isJumping) return;

            state.value.velocityY = game.physics.jumpStrength;
            state.value.isJumping = true;
            state.value.jumpKeyHeld = true;
        }

        if (isRightKey(e.key) && !state.value.boosted) {
            state.value.gameSpeed *= game.physics.boostMultiplier;
            state.value.boosted = true;
        }

        if (e.code === "Space") {
            shoot();
        }
    };

    const keyUp = (e: KeyboardEvent) => {
        e.preventDefault();

        if (isUpKey(e.key)) state.value.jumpKeyHeld = false;

        if (isRightKey(e.key) && state.value.boosted) {
            state.value.gameSpeed /= game.physics.boostMultiplier;
            state.value.boosted = false;
        }
    };

    return { keyDown, keyUp };
};

export default useUserActions;
