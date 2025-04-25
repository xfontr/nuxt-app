<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import type { Game } from "../types";
import type { GameState } from "../types/Game";
import { colors } from "../../../configs";
import type { Unit } from "../../../types/Unit";
import type { Translations } from "../types/Translations";
import Hints from "./Hints.vue";
import Tag from "../../../components/Tag.vue";
import Lives from "./Lives.vue";
import Stats from "./Stats.vue";

const PROGRESS_BAR_WIDTH = 100;

const props = defineProps<{
    game: Game;
    state: GameState;
    t: Translations;
}>();

const linterLaser = ref<HTMLDivElement>();

const ratio = computed<number>(() => props.game.laser.max / PROGRESS_BAR_WIDTH);
const minBarWidth = computed<`${string}${Unit}`>(
    () => `${props.game.laser.min / ratio.value}px`,
);

const distance = computed<number>(
    () =>
        +(props.state.framesAlive * props.game.score.frameToDistance).toFixed(
            0,
        ),
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
                { 'interface-navigation--right': state.status === 'ON' },
            ]"
        >
            <div v-show="state.status === 'OVER'">
                <Stats
                    :t
                    :state
                />
            </div>

            <Transition>
                <Hints
                    class="interface-navigation__hints"
                    v-if="state.status === 'IDLE' || state.status === 'OVER'"
                    :t
                    :state
            /></Transition>

            <div
                class="column"
                v-show="state.status === 'ON'"
            >
                <div class="up">
                    <Tag> {{ state.bugsKilled }} {{ t.stats.bugs_fixed }}</Tag>
                    <span class="up__score"
                        >{{ score }} {{ t.stats.points }}</span
                    >
                </div>

                <div class="bottom">
                    <Lives
                        :lives="game.player.lives"
                        :state
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
                            >{{ t.linterRay }}</label
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

.interface-navigation {
    position: absolute;
    bottom: $distances-xs;
    right: 2rem;
    font-size: $fonts-size-small;
    height: 10rem;
    gap: 0;
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: $distances-s;

    &--right {
        justify-content: flex-end;
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
