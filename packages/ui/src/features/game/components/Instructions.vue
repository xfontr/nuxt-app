<script lang="ts" setup>
import Tag from "../../../components/Tag.vue";
import type { i18n } from "../types";
import type { Game, GameState } from "../types/Game";
import { getUiAsset } from "../utils/assets";
import { DESKTOP_INSTRUCTIONS, MOBILE_INSTRUCTIONS } from "../constants";
import { getInstruction } from "../utils/instructions";
import type { Instruction, InstructionName } from "../types/Instruction";

const props = defineProps<{
    t: i18n;
    state: GameState;
    game: Game;
}>();

const desktopStart = getUiAsset(props.t, "space", props.game.assetsSrc);
const mobileStart = getUiAsset(props.t, "tap", props.game.assetsSrc);

const getInstructions = (instructions: InstructionName[]) =>
    instructions.map((instruction) => {
        const fullInstruction: Instruction = getInstruction(
            props.t,
            instruction,
        );

        return {
            ...fullInstruction,
            ...getUiAsset(props.t, fullInstruction.asset, props.game.assetsSrc),
        };
    });

const getStartInstruction = (device: "mobile" | "desktop"): string =>
    getInstruction(
        props.t,
        props.state.status === "OVER" ? `restart_${device}` : `start_${device}`,
    ).instruction;
</script>

<template>
    <article
        :class="[
            'instructions',
            { 'instructions--right': state.status === 'OVER' },
        ]"
    >
        <Tag
            class="instructions__hint--desktop"
            :contrast="true"
        >
            <img
                class="hint-img"
                :height="20"
                :src="desktopStart.src"
                :alt="desktopStart.alt"
            />
            {{ getStartInstruction("desktop") }}
        </Tag>

        <Tag
            class="instructions__hint--mobile"
            :contrast="true"
        >
            <img
                class="hint-img"
                :height="20"
                :src="mobileStart.src"
                :alt="mobileStart.alt"
            />
            {{ getStartInstruction("mobile") }}
        </Tag>

        <Tag
            class="instructions__hint instructions__hint--desktop"
            v-for="{ alt, src, instruction } in getInstructions(
                DESKTOP_INSTRUCTIONS,
            )"
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

        <Tag
            class="instructions__hint instructions__hint--mobile"
            v-for="{ alt, src, instruction } in getInstructions(
                MOBILE_INSTRUCTIONS,
            )"
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

    &--desktop {
        display: none;
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

@media (pointer: fine) {
    .hint-img--mobile,
    .instructions__hint--mobile {
        display: none !important;
    }

    .hint-img--desktop,
    .instructions__hint--desktop {
        display: flex !important;
    }
}

@media (pointer: coarse) {
    .hint-img--mobile,
    .instructions__hint--mobile {
        display: flex !important;
    }

    .hint-img--desktop,
    .instructions__hint--desktop {
        display: none !important;
    }
}
</style>
