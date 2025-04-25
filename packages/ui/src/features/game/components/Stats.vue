<script lang="ts" setup>
import { computed } from "vue";
import type { GameState } from "../types/Game";
import type { Translations } from "../types";

const props = defineProps<{ state: GameState; t: Translations }>();

const bestScore = computed<GameState["stats"][number]>(
    () => [...props.state.stats].sort((a, b) => b.score - a.score)[0],
);

const current = computed<GameState["stats"][number] | undefined>(() =>
    props.state.stats.at(-1),
);
</script>

<template>
    <p
        v-if="current"
        class="stats"
    >
        <span class="stats__contrast">{{ current.bugsKilled }}{{ " " }}</span
        >{{ t.stats.bugs_fixed }},
        <span class="stats__contrast">{{ current.score }}</span>
        {{ t.stats.points }}
        <br />
        <span class="stats__best"
            >{{ t.stats.best_score }} {{ bestScore.score }}
            {{ t.stats.points }}</span
        >
    </p>
</template>

<style lang="scss" scoped>
@use "../../../assets/scss/variables/colors" as *;
@use "../../../assets/scss/variables/fonts" as *;

.stats {
    font-size: $fonts-size-base;
    opacity: 0.9;
    color: $colors-primary-light;

    &__contrast {
        font-weight: 600;
    }

    &__best {
        text-transform: uppercase;
        font-size: $fonts-size-small;
    }
}
</style>
