<script lang="ts" setup>
import { computed, ref, useTemplateRef, watch } from "vue";
import type { Asset, Game } from "../types";
import type { GameState } from "../types/Game";
import { colors } from "../../../configs";
import { ASSETS } from "../constants";
import type { Unit } from "../../../types/Unit";
import type { Translations } from "../types/Translations";
import Hints from "./Hints.vue";
import Tag from "../../../components/Tag.vue";

const PROGRESS_BAR_WIDTH = 100;

const props = defineProps<{
    game: Game;
    state: GameState;
    t: Translations;
}>();

const heartImages = useTemplateRef<HTMLImageElement[]>("heart");
const linterLaser = ref<HTMLDivElement>();

const getAsset = (name: string): Asset => `${ASSETS}${name}.png`;

const ratio = computed<number>(() => props.game.laser.max / PROGRESS_BAR_WIDTH);
const minBarWidth = computed<`${string}${Unit}`>(
    () => `${props.game.laser.min / ratio.value}px`,
);

const lives = computed<boolean[]>(() =>
    Array.from(
        { length: props.game.player.lives },
        (_, i) => props.state.player.lives > i,
    ),
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

const setUpLives = () => {
    lives.value.forEach((alive, i) => {
        const img = heartImages.value?.[i];
        if (img) img.src = getAsset(alive ? "heart-full" : "heart-empty");
    });
};

watch(() => props.state.laserLeft, applyLaserBarStyles, { immediate: true });
watch(lives, setUpLives, { immediate: true });
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
            <Transition>
                <Hints
                    class="interface-navigation__hints"
                    v-if="state.status === 'IDLE'"
                    :t
            /></Transition>

            <div
                class="column"
                v-show="state.status === 'ON'"
            >
                <div class="up">
                    <Tag> {{ state.bugsKilled }} bugs fixed</Tag>
                    <span class="up__score">{{ score }} pts.</span>
                </div>

                <div class="bottom">
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
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 0;
    width: 55%;

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

.lives {
    display: flex;
    gap: $distances-xs;
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
