<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { Game } from "../types/Game";
import type { Asset } from "../types/Asset";
import GameInterface from "./GameInterface.vue";
import useGame from "../composables/useGame";
import { useWindow } from "../../../composables";
import { PLAYER_LOCATION_CLASS } from "../constants";

const thisWindow = useWindow();
const canvas = ref<HTMLCanvasElement>();

const props = defineProps<{
    game: Game;
    assets: Asset[];
    t: { linterRay: string };
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
            class="canvas"
            :width="state.layout.width"
            :height="state.layout.height"
        />
    </GameInterface>
</template>

<style lang="scss" scoped>
.canvas {
    background: linear-gradient(
        to bottom,
        #e8fcff 0%,
        #c2f7ff 30%,
        #f7feff 70%,
        white 70%
    );
    z-index: 1;
}
</style>
