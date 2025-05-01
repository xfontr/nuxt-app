<script lang="ts" setup>
import { computed, onMounted, useTemplateRef, watch } from "vue";
import type { Game, GameState } from "../types/Game";
import { getUiAsset } from "../utils/assets";
import type { i18n } from "../types";

const props = defineProps<{
    state: GameState;
    game: Game;
    t: i18n;
}>();

const heartImages = useTemplateRef<HTMLImageElement[]>("heart");

const lives = computed<boolean[]>(() =>
    Array.from(
        { length: props.game.player.lives },
        (_, i) => props.state.player.lives > i,
    ),
);

const setUpLives = () => {
    lives.value.forEach((alive, i) => {
        const img = heartImages.value?.[i];
        if (!img) return;
        img.src = getUiAsset(
            props.t,
            alive ? "heart_full" : "heart_empty",
            props.game.assetsSrc,
        ).src;
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
