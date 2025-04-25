<script lang="ts" setup>
import Tag from "../../../components/Tag.vue";
import { ASSETS, AVAILABLE_KEYS } from "../constants";
import type { Asset } from "../types";
import type { GameState } from "../types/Game";
import type { Translations } from "../types/Translations";

defineProps<{
    t: Translations;
    state: GameState;
}>();

const getAsset = (name: string): Asset => `${ASSETS}${name}.png`;
</script>

<template>
    <article
        :class="[
            'instructions',
            { 'instructions--right': state.status === 'OVER' },
        ]"
    >
        <Tag
            class="instructions__hint"
            :contrast="true"
        >
            <img
                class="hint-img"
                :src="getAsset('keyboard-space')"
                alt="Keyboard space bar"
                :height="20"
            />
            {{
                state.status === "OVER"
                    ? t.instructions.restart
                    : t.instructions.start
            }}
        </Tag>
        <Tag
            class="instructions__hint"
            v-for="{ alt, name, src } in AVAILABLE_KEYS"
            :key="name"
        >
            <img
                class="hint-img"
                :src="getAsset(src)"
                :alt
                :height="20"
            />
            {{ t.keyboard[name] }}
        </Tag>
    </article>
</template>

<style lang="scss">
@use "../../../assets/scss/variables/colors" as *;
@use "../../../assets/scss/variables/distances" as *;
@use "../../../assets/scss/variables/breakpoints" as *;

.instructions {
    opacity: 0.9;
    gap: $distances-xs;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-end;

    &__hint {
        opacity: 0.6;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: $distances-xs;

        &--contrast {
            width: 100%;
            font-weight: 600;
            opacity: 1;
            font-size: 0.9rem;
            color: $colors-contrast;
        }
    }

    @media (min-width: $breakpoints-xl) {
        flex-direction: row;
    }

    &--right {
        @media (min-width: $breakpoints-xl) {
            flex-direction: column;
        }
    }
}
</style>
