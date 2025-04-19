<script lang="ts" setup>
import { computed, useTemplateRef } from "vue";
import type { Game } from "../types";
import type { GameState } from "../types/Game";

const PROGRESS_BAR_WIDTH = 100; // we should probably make this dynamic
const props = defineProps<{
    game: Game;
    state: GameState;
    t: {
        linterRay: string;
    };
}>();

const heartImages = useTemplateRef<HTMLImageElement[]>("heart");

const ratio = computed(() => props.game.laser.max / PROGRESS_BAR_WIDTH);

const bar = computed(
    () => (props.game.laser.min / ratio.value).toString() + "px",
);

const lives = computed<boolean[]>(() => {
    const list: boolean[] = [];
    const max = props.game.player.lives;

    for (let i = 0; i < max; i += 1) {
        list.push(props.state.player.lives > i);
    }

    list?.forEach((img, i) => {
        if (!heartImages.value?.[i]) return;
        heartImages.value[i].src = img
            ? "./img/game/heart-full.png"
            : "./img/game/heart-empty.png";
    });

    return list;
});

const distance = computed(
    () =>
        +(props.state.framesAlive * props.game.score.frameToDistance).toFixed(
            0,
        ),
);

const score = computed(
    () => props.state.bugsKilled * props.game.score.bugKilled + distance.value,
);
</script>

<template>
    <div class="game-interface">
        <slot />

        <nav class="interface-navigation">
            <div class="stats">
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

            <div class="laser">
                <label
                    class="laser__label"
                    for="linter-laser"
                    >{{ t.linterRay }}</label
                >
                <progress
                    id="linter-laser"
                    class="laser__progress"
                    :value="state.laserLeft"
                    :max="game.laser.max"
                />
            </div>
        </nav>
    </div>
</template>

<style lang="scss">
@use "../../../assets/scss/variables/colors" as *;
@use "../../../assets/scss/variables/fonts" as *;

.interface-navigation {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    font-size: $fonts-size-small;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: space-between;
    height: 8rem;
}

.laser {
    display: flex;
    flex-direction: column;
    gap: 0;

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

        // WebKit-based browsers
        &::-webkit-progress-bar {
            background-color: $colors-secondary;
        }

        &::-webkit-progress-value {
            background-color: $colors-primary;
        }

        // Firefox
        &::-moz-progress-bar {
            background-color: $colors-primary;
        }

        // The vertical line at game.laser.min %
        &::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            width: 1px;
            background-color: $colors-contrast;
            left: v-bind(bar); // e.g., "25%"
            pointer-events: none;
            z-index: 1;
        }
    }
}

.lives__list {
    display: flex;
    gap: 0.5rem;
}

.stats {
    display: flex;
    align-items: flex-end;
    flex-direction: column;

    & p {
        font-size: inherit;
    }
}
</style>
