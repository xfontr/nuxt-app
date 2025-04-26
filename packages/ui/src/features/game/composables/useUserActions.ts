import { computed, onUnmounted, ref, watch, type Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import { isLeftKey, isRightKey, isSpaceKey, isUpKey } from "../utils/keyboard";

const COOLDOWN = 500;

const useUserActions = (state: Ref<GameState>, game: Game) => {
    const blockedTimer = ref<NodeJS.Timeout>();
    const enabled = computed(
        () => !blockedTimer.value && state.value.status !== "LOADING",
    );

    watch(
        () => state.value.status,
        () => {
            clearTimeout(blockedTimer.value);
            blockedTimer.value = setTimeout(() => {
                blockedTimer.value = undefined;
            }, COOLDOWN);
        },
    );

    const keyDown = (e: KeyboardEvent) => {
        e.preventDefault();
        if (!enabled.value) return;

        if (
            !state.value.isLasering &&
            isSpaceKey(e.code) &&
            (state.value.status === "IDLE" || state.value.status === "OVER")
        ) {
            state.value.status = "ON";
            return;
        }

        if (state.value.status !== "ON") return;

        if (isSpaceKey(e.code)) state.value.isLasering = true;
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

        if (isSpaceKey(e.code)) state.value.isLasering = false;
        if (state.value.status !== "ON" || !enabled.value) return;

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

    const laserTimeout = ref<NodeJS.Timeout>();
    const shouldJump = ref(false);
    const hasStartedLaser = ref(false);

    const touchDown = () => {
        if (!enabled.value) return;

        if (
            !state.value.isLasering &&
            (state.value.status === "IDLE" || state.value.status === "OVER")
        ) {
            state.value.status = "ON";
            return;
        }

        if (state.value.status !== "ON") return;

        hasStartedLaser.value = false;
        shouldJump.value = true;

        // ⏱️ If held long enough, laser instead
        laserTimeout.value = setTimeout(() => {
            state.value.isLasering = true;
            hasStartedLaser.value = true;
            shouldJump.value = false; // cancel jump
        }, 200);
    };

    const touchUp = () => {
        clearTimeout(laserTimeout.value);

        if (!enabled.value) return;

        if (shouldJump.value && !state.value.isJumping) {
            state.value.velocityY = game.physics.jumpStrength;
            state.value.isJumping = true;
            state.value.jumpKeyHeld = true;
        }

        state.value.isLasering = false;
        state.value.jumpKeyHeld = false;
    };

    onUnmounted(() => {
        clearTimeout(blockedTimer.value);
    });

    return {
        keyDown,
        keyUp,
        touchDown,
        touchUp,
    };
};

export default useUserActions;
