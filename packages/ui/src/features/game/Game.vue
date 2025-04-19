<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { Game } from "./types/Game";
import type { Asset } from "./types/Asset";
import GameInterface from "./GameInterface.vue";
import useGame from "./composables/useGame";
import { useWindow } from "../../composables";

const thisWindow = useWindow();
const props = defineProps<{ game: Game; assets: Asset[] }>();
const canvas = ref<HTMLCanvasElement>();

const { animate, setup, state } = useGame(props.game, props.assets, canvas);

thisWindow.on("resize", (window) => {
    state.value.layout.width = window.innerWidth;
    state.value.layout.height = window.innerHeight;
});

onMounted(() => {
    state.value.layout.width = window.innerWidth;
    state.value.layout.height = window.innerHeight;

    if (!canvas.value) return;

    setup();
    animate();
});
</script>

<template>
    <GameInterface
        :game
        :state
    >
        <canvas
            ref="canvas"
            :width="state.layout.width"
            :height="state.layout.height"
        />
    </GameInterface>
</template>
