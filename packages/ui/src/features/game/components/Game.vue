<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import type { Game, GameState } from "../types/Game";
import GameInterface from "./GameInterface.vue";
import useGame from "../composables/useGame";
import { useWindow } from "../../../composables";
import { PLAYER_LOCATION_CLASS } from "../constants";
import type { i18n } from "../types/Translations";

const props = defineProps<{
    isPaused: boolean;
    game: Game;
    t: i18n;
}>();

const thisWindow = useWindow();
const canvas = ref<HTMLCanvasElement>();
const { animate, setup, state } = useGame(props.game, canvas);

const prePauseState = ref<GameState["status"]>(state.value.status);

const updateLayoutAndPlayerPosition = (): void => {
    state.value.layout.width = document.body.clientWidth;
    state.value.layout.height = document.body.clientHeight;

    const x = document
        .querySelector(PLAYER_LOCATION_CLASS)
        ?.getBoundingClientRect().x;

    if (x === undefined) return;

    if (state.value.status === "ON") state.value.player.x = x;
    if (state.value.status !== "ON") state.value.player.offsetX = x;
};

watch(
    () => props.isPaused,
    (paused) => {
        if (paused) {
            prePauseState.value = state.value.status;
            state.value.status = "PAUSED";
        }

        if (!paused) state.value.status = prePauseState.value;
    },
);

thisWindow.on("resize", updateLayoutAndPlayerPosition);

onMounted(() => {
    if (!canvas.value) return;

    updateLayoutAndPlayerPosition();
    setup();
    animate();
});
</script>

<template>
    <GameInterface
        :game
        :state
        :t
    >
        <canvas
            ref="canvas"
            :class="['canvas', { 'canvas--on': state.status === 'ON' }]"
            :width="state.layout.width"
            :height="state.layout.height"
        />
    </GameInterface>
</template>

<style lang="scss">
@use "../../../assets/scss/variables/colors" as *;
@use "../../../assets/scss/variables/breakpoints" as *;

@layer base {
    $game-area-color: white;

    @property --color-stop-1 {
        syntax: "<color>";
        initial-value: #d4e3ed;
        inherits: false;
    }

    @property --color-stop-2 {
        syntax: "<color>";
        initial-value: #bcd3e3;
        inherits: false;
    }

    @property --color-stop-3 {
        syntax: "<color>";
        initial-value: #a9c3da;
        inherits: false;
    }

    @mixin gradient($game-area-size) {
        background: linear-gradient(
                to top,
                $game-area-color 0%,
                $game-area-color $game-area-size,
                transparent $game-area-size
            ),
            linear-gradient(
                to bottom,
                var(--color-stop-1) 20%,
                var(--color-stop-2) 60%,
                var(--color-stop-3) 100%
            );
    }

    .canvas {
        user-select: none;
        border-bottom: 1px solid $colors-primary-very-light !important;

        @include gradient(17rem);

        @media (min-width: $breakpoints-m) {
            @include gradient(13.5rem);
        }

        z-index: 1;
        transition: --color-stop-1 1s ease, --color-stop-2 1s ease,
            --color-stop-3 1s ease;

        --color-stop-1: #d4e3ed;
        --color-stop-2: #bcd3e3;
        --color-stop-3: #a9c3da;

        &--on {
            --color-stop-1: #656565;
            --color-stop-2: #323232;
            --color-stop-3: black;
        }
    }
}
</style>
