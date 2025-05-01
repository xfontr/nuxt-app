<script lang="ts" setup>
import { computed } from "vue";
import Tag from "../../../components/Tag.vue";
import type { i18n } from "../types";
import type { Game, GameState } from "../types/Game";
import { getUiAsset } from "../utils/assets";
import { DESKTOP_INSTRUCTIONS, MOBILE_INSTRUCTIONS } from "../constants";
import { getInstruction } from "../utils/instructions";
import type { Instruction } from "../types/Instruction";
import type { UiAsset } from "../types/UiAsset";

const isMobile = false;

const props = defineProps<{
    t: i18n;
    state: GameState;
    game: Game;
}>();

const space = getUiAsset(props.t, "space", props.game.assetsSrc);

const instructionNames = computed(() =>
    isMobile ? MOBILE_INSTRUCTIONS : DESKTOP_INSTRUCTIONS,
);

const instructions = computed<(Instruction & UiAsset)[]>(() =>
    instructionNames.value.map((instruction) => {
        const fullInstruction: Instruction = getInstruction(
            props.t,
            instruction,
        );

        return {
            ...fullInstruction,
            ...getUiAsset(props.t, fullInstruction.asset, props.game.assetsSrc),
        };
    }),
);

const restartInstruction = computed<string>(() => {
    const device = isMobile ? "mobile" : "desktop";

    return getInstruction(
        props.t,
        props.state.status === "OVER" ? `restart_${device}` : `start_${device}`,
    ).instruction;
});
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
                :height="20"
                :src="space.src"
                :alt="space.alt"
            />
            {{ restartInstruction }}
        </Tag>
        <Tag
            class="instructions__hint"
            v-for="{ alt, src, instruction } in instructions"
            :key="instruction"
        >
            <img
                class="hint-img"
                :src
                :alt
                :height="20"
            />
            {{ instruction }}
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
