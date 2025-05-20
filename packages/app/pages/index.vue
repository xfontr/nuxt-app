<script lang="ts" setup>
import { GradientScroll, gradients } from "@portfolio/ui";

const target = ref<HTMLElement>();
const gradientThreshold = ref<number>(0);

onMounted(() => {
    target.value = document.body;
});

const updateGradientThreshold = (threshold: number) => {
    gradientThreshold.value = threshold;
};

const isReversed = computed<boolean>(() => gradientThreshold.value < 0.5);
</script>

<template>
    <div>
        <GameSection />

        <GradientScroll
            :target
            :gradients="gradients.GRADIENTS_MAIN.toReversed()"
            :transition="1"
            @update:threshold="updateGradientThreshold"
        >
            <SummarySection :is-reversed />
        </GradientScroll>
    </div>
</template>

<style lang="scss">
.btf {
    height: 100vh;
    position: relative;
}

:root {
    background-color: transparent !important;
}
</style>
