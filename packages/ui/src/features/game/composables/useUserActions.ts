import { computed, type Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import { isLeftKey, isRightKey, isSpaceKey, isUpKey } from "../utils/keyboard";

const useUserActions = (state: Ref<GameState>, game: Game) => {
    const enabled = computed(() => state.value.status !== "LOADING");
    const isOn = computed(() => state.value.status === "ON");
    const isIdle = computed(() => state.value.status === "IDLE");
    const isOver = computed(() => state.value.status === "OVER");

    const keyDown = (e: KeyboardEvent) => {
        e.preventDefault();

        if (!enabled.value) return;

        if (
            !state.value.isLasering &&
            isSpaceKey(e.code) &&
            (isIdle.value || isOver.value)
        ) {
            state.value.status = "ON";
            return;
        }

        if (!isOn.value) return;

        if (isSpaceKey(e.code)) {
            state.value.isLasering = true;
        }

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
        e.preventDefault();

        if (isSpaceKey(e.code)) {
            state.value.isLasering = false;
        }

        if (!isOn.value || !enabled.value) return;

        if (isUpKey(e.key)) state.value.jumpKeyHeld = false;

        if (isRightKey(e.key)) {
            state.value.gameSpeed = game.physics.baseSpeed;

            if (state.value.player.image !== "player-fast") return;
            state.value.player.image = "player-neutral";
        }

        if (isLeftKey(e.key)) {
            state.value.gameSpeed = game.physics.baseSpeed;
        }
    };

    return { keyDown, keyUp };
};

export default useUserActions;
