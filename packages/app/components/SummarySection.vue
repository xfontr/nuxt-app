<script lang="ts" setup>
import { Pointer } from "@portfolio/ui";

const props = defineProps<{ isReversed: boolean }>();

const { t } = useI18n();

const handleCta = () => {
    if (props.isReversed) {
        window.scrollBy({ top: 750, behavior: "smooth" });
        return;
    }
};
</script>

<template>
    <Pointer
        class="summary"
        :can-overflow="false"
        :size="1"
        :animate="false"
    >
        <p class="summary__text">{{ t("landing.summary.description") }}</p>

        <button
            type="button"
            :class="['summary__cta', { reversed: isReversed }]"
            @click="handleCta"
        >
            <span v-if="isReversed">{{ t("global.scroll") }}</span>
            <span
                v-else
                class="cta-text"
                >{{ t("landing.summary.cta") }}</span
            >
        </button>

        <template #pointer>
            <div :class="['summary__pointer', { reversed: isReversed }]"></div>
        </template>
    </Pointer>
</template>

<style lang="scss" scoped>
.summary {
    width: 100% !important;
    display: flex;
    justify-content: center;
    align-items: center;

    &__pointer {
        mix-blend-mode: difference;
        color: $colors-primary;
        background-color: $colors-secondary;
        border-radius: 50%;
        transition: 1s;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
    }

    &__text {
        text-align: center;
        max-width: 30rem;
    }

    &__cta {
        position: fixed;
        left: 3rem;
        bottom: 3rem;

        border-radius: 50%;
        height: 6rem;
        width: 6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: rotate(-12deg);
        transition: 0.8s;
        color: $colors-primary;
        background-color: $colors-secondary;
        cursor: none;

        &.reversed {
            position: absolute;
            bottom: 85vh;

            color: $colors-secondary;
            background-color: $colors-primary;
        }

        &:hover {
            transform: rotate(-372deg) scale(1.1);
        }

        &:active {
            transition: 0.2s;
            transform: scale(0.9);
        }
    }
}

@keyframes rotation-in {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(721deg);
    }
}

.cta-text {
    animation: rotation-in 1.5s ease;
}

.reversed {
    color: $colors-secondary;
    background-color: $colors-primary;
}
</style>
