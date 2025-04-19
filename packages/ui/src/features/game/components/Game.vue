<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { Game } from "../types/Game";
import type { Asset } from "../types/Asset";
import GameInterface from "./GameInterface.vue";
import useGame from "../composables/useGame";
import { useWindow } from "../../../composables";

const thisWindow = useWindow();
const props = defineProps<{
    game: Game;
    assets: Asset[];
    t: { linterRay: string };
}>();

const canvas = ref<HTMLCanvasElement>();

const { animate, setup, state } = useGame(props.game, props.assets, canvas);

thisWindow.on("resize", (window) => {
    state.value.layout.width = window.innerWidth;
    state.value.layout.height = window.innerHeight;
    const playerLocationX = document
        .querySelector(".player-loc")
        ?.getBoundingClientRect().x;

    state.value.player.x = playerLocationX ?? state.value.player.x;
});

onMounted(() => {
    state.value.layout.width = window.innerWidth;
    state.value.layout.height = window.innerHeight;
    const playerLocationX = document
        .querySelector(".player-loc")
        ?.getBoundingClientRect().x;

    if (!canvas.value) return;

    state.value.player.x = playerLocationX ?? state.value.player.x;

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

<style lang="scss">
.canvas {
    // background: linear-gradient(to top, #f1e9d2 0%, transparent 100%); //old
    background: linear-gradient(
        to bottom,
        #e8fcff 0%,
        #c2f7ff 30%,
        #f7feff 70%,
        white 70%
    ); //new
    // background: linear-gradient(
    //     180deg,
    //     #ffffff 0%,
    //     #ffffff 70%,
    //     #f4f4f4 70%
    // ); //new
    // background: url("./img/game/grid.png");
    // background-size: 30%;
    z-index: 1;
}
</style>
