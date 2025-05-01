<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import type { Game } from "../types";
import type { GameState } from "../types/Game";
import { colors } from "../../../configs";
import type { Unit } from "../../../types/Unit";
import Instructions from "./Instructions.vue";
import Tag from "../../../components/Tag.vue";
import Lives from "./Lives.vue";
import Stats from "./Stats.vue";
import type { i18n } from "../types/Translations";

const PROGRESS_BAR_WIDTH = 100;

const props = defineProps<{
    game: Game;
    state: GameState;
    t: i18n;
}>();

const linterLaser = ref<HTMLDivElement>();

const ratio = computed<number>(() => props.game.laser.max / PROGRESS_BAR_WIDTH);
const minBarWidth = computed<`${string}${Unit}`>(
    () => `${props.game.laser.min / ratio.value}px`,
);

const distance = computed<number>(
    () =>
        +(
            props.state.distanceCount *
            (props.game.score.frameToDistance +
                props.game.score.difficultyMultiplier * props.state.difficulty)
        ).toFixed(0),
);

const score = computed(
    () => props.state.bugsKilled * props.game.score.bugKilled + distance.value,
);

const applyLaserBarStyles = () => {
    if (!linterLaser.value) return;

    const isBelowMin = props.game.laser.min > props.state.laserLeft;

    const color = isBelowMin
        ? colors.THEME_MAIN.colorsPrimary
        : colors.THEME_MAIN.colorsSecondary;

    linterLaser.value.style.setProperty("--min-bar", minBarWidth.value);
    linterLaser.value.style.setProperty("--min-bar-color", color);
};

watch(() => props.state.laserLeft, applyLaserBarStyles, { immediate: true });
</script>

<template>
    <div class="game-interface">
        <slot />
        <nav
            :class="[
                'interface-navigation',
                { 'interface-navigation--spaced': state.status === 'OVER' },
            ]"
        >
            <Stats
                v-show="state.status === 'OVER'"
                :t
                :state
            />

            <Instructions
                v-if="state.status === 'IDLE' || state.status === 'OVER'"
                :t
                :state
                :game
            />

            <div
                class="column"
                v-show="state.status === 'ON'"
            >
                <div class="up">
                    <Tag
                        >{{ state.bugsKilled }}
                        {{ t("game.stats.bugs_fixed") }}</Tag
                    >
                    <span class="up__score"
                        >{{ score }} {{ t("game.stats.points") }}</span
                    >
                </div>

                <div class="bottom">
                    <Lives
                        :state
                        :game
                        :t
                    />
                    <div class="bottom__laser">
                        <progress
                            ref="linterLaser"
                            id="linter-laser"
                            class="laser__progress"
                            :value="state.laserLeft"
                            :max="game.laser.max"
                        />
                        <label
                            class="laser__label"
                            for="linter-laser"
                            >{{ t("game.linter_ray") }}</label
                        >
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<style lang="scss">
@use "../../../assets/scss/variables/colors" as *;
@use "../../../assets/scss/variables/fonts" as *;
@use "../../../assets/scss/variables/distances" as *;
@use "../../../assets/scss/variables/breakpoints" as *;

.interface-navigation {
    position: absolute;
    bottom: $distances-s;
    right: $distances-s;
    font-size: $fonts-size-small;
    height: 13.5rem;
    gap: 0;
    display: flex;
    gap: $distances-s;
    justify-content: flex-end;
    align-items: flex-end;
    width: 75%;

    &--spaced {
        justify-content: space-between;
    }

    @media (min-width: $breakpoints-m) {
        height: 9.5rem;
        width: 55%;
    }
}

.column {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: space-between;
}

.bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;

    &__instructions {
        display: flex;
        gap: 0.5rem;
    }

    &__laser {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.25rem;
    }
}

.laser {
    &__label {
        text-align: right;
    }

    &__progress {
        font-size: inherit;
        appearance: none;
        width: 100px;
        height: 5px;
        border-radius: 5px;
        border: 1px solid $colors-primary;
        background-color: $colors-secondary;
        position: relative;
        overflow: hidden;

        &::-webkit-progress-bar {
            background-color: $colors-secondary;
        }

        &::-webkit-progress-value {
            background-color: $colors-primary;
        }

        &::-moz-progress-bar {
            background-color: $colors-primary;
        }

        &::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            width: 1px;
            background-color: var(--min-bar-color);
            left: var(--min-bar);
            pointer-events: none;
            z-index: 1;
        }
    }
}

.up {
    display: flex;
    flex-direction: column;
    gap: $distances-xs;
    align-items: flex-end;

    &__score {
        font-size: inherit;
    }
}
</style>
