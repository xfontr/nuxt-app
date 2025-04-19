<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import useWindow from "../../composables/useWindow";
import { findClosestValue, generateThresholds } from "../../utils/math";
import { getGradient } from "./utils/gradient";
import type { GradientStyle } from "./types/GradientStyle";

const props = withDefaults(
    defineProps<{
        target?: HTMLElement;
        gradients?: (string | GradientStyle)[];
        transition?: number;
    }>(),
    {
        gradients: () => [
            "#00000000",
            "#3e2a47",
            "#7f5f5f",
            "#5a2a83",
            "#8b6e8e",
            "#4682b4",
            "#ff6347",
            "#ffb6c1",
            "#000000",
        ],
        transition: 0.3,
        /**
         * Can be defined anytime (this is particularly important for SSR).
         */
        target: undefined,
    },
);

const { on } = useWindow();

const currentThreshold = ref<number>(0);
const lastScrollY = ref<number>(0);
const isDown = ref<boolean>();

const threshold = computed<number[]>(() =>
    generateThresholds(props.gradients.length),
);

const gradientStyles = computed<GradientStyle[]>(() =>
    props.gradients.map((gradient) =>
        typeof gradient === "string"
            ? {
                  backgroundColor: gradient,
              }
            : gradient,
    ),
);

const gradientsByThreshold = computed<Record<string, GradientStyle>>(() =>
    threshold.value.reduce(
        (all, threshold, i) => ({
            ...all,
            [threshold]: gradientStyles.value[i],
        }),
        {},
    ),
);

const updateColors = (): void => {
    if (!props.target) return;

    const closestThreshold = findClosestValue(
        threshold.value,
        currentThreshold.value,
    );

    const { backgroundColor, color } =
        gradientsByThreshold.value[
            getGradient(threshold.value, closestThreshold, !!isDown.value)!
        ];

    // eslint-disable-next-line vue/no-mutating-props
    props.target.style.background = backgroundColor;

    // eslint-disable-next-line vue/no-mutating-props
    if (color) props.target.style.color = color;
};

const handleIn = ({ intersectionRatio }: IntersectionObserverEntry): void => {
    if (isDown.value === undefined && intersectionRatio > 0.5) {
        isDown.value = true;
    }

    if (!isDown.value) return;

    currentThreshold.value =
        currentThreshold.value > intersectionRatio
            ? currentThreshold.value
            : intersectionRatio;
};

const handleOut = ({ intersectionRatio }: IntersectionObserverEntry): void => {
    if (isDown.value) return;

    const adjustedRatio = 1 - intersectionRatio;
    currentThreshold.value = Math.max(0, adjustedRatio);
};

on("scroll", ({ scrollY }) => {
    isDown.value = scrollY > lastScrollY.value;
    lastScrollY.value = scrollY;
});

watch(currentThreshold, updateColors);

watch(
    () => props.target,
    (target) => {
        if (!target) return;
        target.style.transition = `${props.transition}s`;
    },
);
</script>

<template>
    <div
        v-intersect="{
            handler: handleOut,
            options: { threshold },
        }"
    >
        <slot name="reference" />
    </div>

    <div
        v-intersect="{
            handler: handleIn,
            options: { threshold },
        }"
    >
        <slot />
    </div>
</template>
