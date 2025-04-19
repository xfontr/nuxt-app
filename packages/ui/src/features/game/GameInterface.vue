<script lang="ts" setup>
import { computed } from "vue";
import type { Game } from "./types";
import type { GameState } from "./types/Game";

const PROGRESS_BAR_WIDTH = 100; // we should probably make this dynamic
const props = defineProps<{ game: Game; state: GameState }>();

const ratio = computed(() => props.game.laser.max / PROGRESS_BAR_WIDTH);
const bar = computed(
    () => (props.game.laser.min / ratio.value).toString() + "px",
);
</script>

<template>
    <div class="game-interface">
        <slot />
        <!-- TODO: The ID for the label -->

        <nav class="game-interface__items">
            <progress
                id="beam-left"
                class="beam-left"
                :value="state.laserLeft"
                :max="game.laser.max"
            />
        </nav>
    </div>
</template>

<style lang="scss" setup>
@use "../../assets/scss/variables/colors" as *;

.game-interface {
    &__items {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
}

.beam-left {
    appearance: none;
    width: 100px;
    height: 20px;
    border: 1px solid $colors-primary;
    background-color: $colors-secondary;
    border-radius: 0;
    position: relative;
    overflow: hidden;

    // WebKit-based browsers
    &::-webkit-progress-bar {
        background-color: $colors-secondary;
    }

    &::-webkit-progress-value {
        background-color: $colors-primary;
    }

    // Firefox
    &::-moz-progress-bar {
        background-color: $colors-primary;
    }

    // The vertical line at game.laser.min %
    &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: $colors-contrast;
        left: v-bind(bar); // e.g., "25%"
        pointer-events: none;
        z-index: 1;
    }
}
</style>
