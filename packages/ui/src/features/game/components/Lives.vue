<script lang="ts" setup>
import { computed, onMounted, useTemplateRef, watch } from "vue";
import type { GameState } from "../types/Game";
import type { Asset } from "../types";
import { ASSETS } from "../constants";

const props = defineProps<{ lives: number; state: GameState }>();

const heartImages = useTemplateRef<HTMLImageElement[]>("heart");

const getAsset = (name: string): Asset => `${ASSETS}${name}.png`;

const lives = computed<boolean[]>(() =>
    Array.from({ length: props.lives }, (_, i) => props.state.player.lives > i),
);

const setUpLives = () => {
    lives.value.forEach((alive, i) => {
        const img = heartImages.value?.[i];
        if (img) img.src = getAsset(alive ? "heart-full" : "heart-empty");
    });
};

watch(lives, setUpLives);

onMounted(setUpLives);
</script>

<template>
    <ul class="lives">
        <li
            v-for="(_, i) in lives"
            :key="i"
        >
            <img
                ref="heart"
                alt="Heart"
                width="16"
                height="16"
            />
        </li>
    </ul>
</template>

<style lang="scss" scoped>
@use "../../../assets/scss/variables/distances" as *;

.lives {
    display: flex;
    gap: $distances-xs;
}
</style>
