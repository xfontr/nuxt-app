<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        target?: HTMLElement;
        gradients?: string[];
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
        target: () => document?.body,
        transition: 0.3,
    },
);

const { on } = useWindow();

const currentThreshold = ref<number>(0);
const lastScrollY = ref<number>(0);
const isDown = ref<boolean>();

const threshold = computed<number[]>(() => {
    const e = generateThresholds(props.gradients.length);
    console.log(e);
    return e;
});

const gradients = computed<Record<string, string>>(() =>
    threshold.value.reduce(
        (all, threshold, i) => ({
            ...all,
            [threshold]: props.gradients[i],
        }),
        {},
    ),
);

const updateBackground = (): void => {
    const closestThreshold = findClosestValue(
        threshold.value,
        currentThreshold.value,
    );

    props.target.style.background =
        gradients.value[
            getGradient(threshold.value, closestThreshold, !!isDown.value)!
        ]!;
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

watch(currentThreshold, updateBackground);

onMounted(() => {
    props.target.style.transition = `${props.transition}s`;
});
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
