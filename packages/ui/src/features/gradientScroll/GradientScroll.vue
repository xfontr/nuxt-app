<script lang="ts" setup>
import { ref, watch } from "vue";
import type { GradientStyle, IntersectionCallback } from "./GradientScroll";

const props = withDefaults(
    defineProps<{
        target?: HTMLElement;
        gradients?: GradientStyle[];
        transition?: number;
    }>(),
    {
        gradients: () => [],
        transition: 0.3,
        target: undefined,
    },
);

const emit = defineEmits<{ "update:threshold": [number] }>();

const currentIntersection = ref<number>(0);

const updateColors = (): void => {
    if (!props.target) return;

    const index = currentIntersection.value > 0.5 ? 1 : 0;
    const { backgroundColor, color } = props.gradients[index];

    // eslint-disable-next-line vue/no-mutating-props
    props.target.style.background = backgroundColor;
    // eslint-disable-next-line vue/no-mutating-props
    if (color) props.target.style.color = color;
    // eslint-disable-next-line vue/no-mutating-props
    if (color) props.target.style.stroke = color;
};

const update =
    (callback: IntersectionCallback) => (entry?: IntersectionObserverEntry) => {
        callback(entry ?? {});
        updateColors();
        emit("update:threshold", currentIntersection.value);
    };

const handleIn = update(({ intersectionRatio }) => {
    currentIntersection.value = intersectionRatio;
});

watch(
    () => props.target,
    (target) => {
        if (!target) return;
        target.style.transition = `${props.transition}s`;
    },
);
</script>

<template>
    <section
        class="btf"
        v-intersect="{
            handler: handleIn,
            options: { threshold: [0, 0.5] },
        }"
    >
        <slot />
    </section>
</template>
