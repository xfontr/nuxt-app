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
        <GradientScroll
            :target
            :gradients="gradients.GRADIENTS_MAIN.toReversed()"
            :transition="1"
            @update:threshold="updateGradientThreshold"
        >
            <template #reference>
                <GameSection />
            </template>

            <SummarySection :is-reversed />
        </GradientScroll>

        <SkillsSection />
    </div>
</template>

<style lang="scss">
.atf {
    user-select: none;
    height: 96vh;
    display: flex;
    align-items: flex-end;
}

.btf {
    height: 100vh;
    position: relative;
}

:root {
    background-color: transparent !important;
}
</style>
