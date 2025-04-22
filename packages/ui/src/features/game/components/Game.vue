<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { Game } from "../types/Game";
import type { Asset } from "../types/Asset";
import GameInterface from "./GameInterface.vue";
import useGame from "../composables/useGame";
import { useWindow } from "../../../composables";
import { PLAYER_LOCATION_CLASS } from "../constants";
import type { Translations } from "../types/Translations";

const thisWindow = useWindow();
const canvas = ref<HTMLCanvasElement>();

const props = defineProps<{
    game: Game;
    assets: Asset[];
    t: Translations;
}>();

const { animate, setup, state } = useGame(props.game, props.assets, canvas);

const updateLayoutAndPlayerPosition = () => {
    state.value.layout.width = window.innerWidth;
    state.value.layout.height = window.innerHeight;

    const x = document
        .querySelector(PLAYER_LOCATION_CLASS)
        ?.getBoundingClientRect().x;

    if (x === undefined) return;

    if (state.value.status === "ON") state.value.player.x = x;
    if (state.value.status === "IDLE") state.value.player.offsetX = x;
};

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

@layer base {
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

    .canvas {
        border-bottom: 1px solid $colors-primary-very-light !important;
        background: linear-gradient(
            to bottom,
            var(--color-stop-1),
            var(--color-stop-2) 40%,
            var(--color-stop-3) 80%,
            #ffffff 80%
        );
        z-index: 1;
        transition: --color-stop-1 1s ease, --color-stop-2 1s ease,
            --color-stop-3 1s ease;

        --color-stop-1: #d4e3ed;
        --color-stop-2: #bcd3e3;
        --color-stop-3: #a9c3da;

        &--on {
            --color-stop-1: #2b0000;
            --color-stop-2: #8b1e1e;
            --color-stop-3: #f94e4e;
        }
    }
}
</style>
