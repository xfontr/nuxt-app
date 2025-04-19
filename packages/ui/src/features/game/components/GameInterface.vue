<script lang="ts" setup>
import { computed, onMounted, ref, useTemplateRef, watch } from "vue";
import type { Game } from "../types";
import type { GameState } from "../types/Game";
import { colors } from "../../../configs";
import { ASSETS, AVAILABLE_KEYS } from "../constants";

const PROGRESS_BAR_WIDTH = 100; // we should probably make this dynamic

const props = defineProps<{
    game: Game;
    state: GameState;
    t: {
        linterRay: string;
    };
}>();

const getAsset = (name: string) => `${ASSETS}${name}.png`;

const heartImages = useTemplateRef<HTMLImageElement[]>("heart");

const availableKeys = ref(AVAILABLE_KEYS);

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
            ? getAsset("heart-full")
            : getAsset("heart-empty");
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

const linterLaser = ref<HTMLDivElement>();

// Prevents unexpected vue bug
const customVBind = () => {
    if (!linterLaser.value) return;
    linterLaser.value.style.setProperty("--min-bar", bar.value);

    if (props.game.laser.min > props.state.laserLeft) {
        linterLaser.value.style.setProperty(
            "--min-bar-color",
            colors.THEME_MAIN.colorsPrimary,
        );
    }
};

onMounted(customVBind);

watch(() => props.state.laserLeft, customVBind);
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
            background-color: var(--min-bar-color, $colors-secondary);
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
