<script lang="ts" setup>
import { computed, onMounted, ref, useTemplateRef, watch } from "vue";
import type { Asset, Game } from "../types";
import type { GameState } from "../types/Game";
import { colors } from "../../../configs";
import { ASSETS, AVAILABLE_KEYS } from "../constants";
import type { Unit } from "../../../types/Unit";

const PROGRESS_BAR_WIDTH = 100;

const props = defineProps<{
    game: Game;
    state: GameState;
    t: { linterRay: string };
}>();

const heartImages = useTemplateRef<HTMLImageElement[]>("heart");
const availableKeys = ref(AVAILABLE_KEYS);
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

onMounted(applyLaserBarStyles);

watch(() => props.state.laserLeft, applyLaserBarStyles);

watch(lives, (newLives) => {
    newLives.forEach((alive, i) => {
        const img = heartImages.value?.[i];
        if (img) img.src = getAsset(alive ? "heart-full" : "heart-empty");
    });
});
</script>

<template>
    <div class="game-interface">
        <slot />

        <nav class="interface-navigation">
            <div class="up">
                <div class="lives">
                    <ul class="lives__list">
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
                </div>
                <span>
                    Score:
                    {{ score }}
                </span>
                <span>
                    Bugs:
                    {{ state.bugsKilled }} | {{ distance }} m.
                </span>
            </div>

            <div class="bottom">
                <div class="bottom__laser">
                    <label
                        class="laser__label"
                        for="linter-laser"
                        >{{ t.linterRay }}</label
                    >
                    <progress
                        ref="linterLaser"
                        id="linter-laser"
                        class="laser__progress"
                        :value="state.laserLeft"
                        :max="game.laser.max"
                    />
                </div>
                <ul class="bottom__instructions">
                    <li
                        v-for="{ src, alt } in availableKeys"
                        :key="src"
                    >
                        <img
                            :src="getAsset(src)"
                            :alt
                            height="24"
                        />
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<style lang="scss">
@use "../../../assets/scss/variables/colors" as *;
@use "../../../assets/scss/variables/fonts" as *;

.interface-navigation {
    position: absolute;
    bottom: 0;
    right: 1rem;
    left: 1rem;
    font-size: $fonts-size-small;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: space-between;
    height: 9rem;
}

.bottom {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &__instructions {
        display: flex;
        gap: 0.5rem;
    }

    &__laser {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
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
        height: 10px;
        border: 1px solid $colors-primary;
        background-color: $colors-secondary;
        border-radius: 0;
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

.lives__list {
    display: flex;
    gap: 0.5rem;
}

.up {
    display: flex;
    align-items: flex-end;
    flex-direction: column;

    & p {
        font-size: inherit;
    }
}
</style>
