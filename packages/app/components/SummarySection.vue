<script lang="ts" setup>
import { Pointer, Tech } from "@portfolio/ui";
import { TECH } from "../../ui/src/features/tech/constants";
import type { TechItem } from "../../ui/src/features/tech/types/Tech";
import TechImage from "../../ui/src/features/tech/helpers/TechImage";
import TechText from "../../ui/src/features/tech/helpers/TechText";

const props = defineProps<{ isReversed: boolean }>();

const { t } = useI18n();

const skills = ref<string[]>(["select", "frontend", "backend", "soft"]);
const phase = ref<number>(0);
const highlight = ref(false);
const isPaused = ref<boolean>(true);

const currentSkill = computed(() => ({
    cta: `landing.skills.${skills.value.at(phase.value)}.next`,
    stack: `landing.skills.${skills.value.at(phase.value)}.stack`,
}));

const handleCta = () => {
    if (props.isReversed) {
        window.scrollBy({ top: 750, behavior: "smooth" });
        return;
    }

    if (phase.value === undefined) {
        phase.value = 0;
        return;
    }

    if (phase.value < TECH.length) phase.value += 1;
};

const createTech = ({ type, id }: { type: "IMAGE" | "TEXT"; id: string }) =>
    ({
        IMAGE: TechImage(id),
        TEXT: TechText(id),
    }[type]);

const tech = computed<TechItem[]>(() =>
    phase.value ? TECH[phase.value - 1]!.map(createTech) : [],
);

const pause = (entry?: IntersectionObserverEntry) => {
    isPaused.value = !entry?.isIntersecting;
};

watch(phase, () => {
    highlight.value = true;

    setTimeout(() => {
        highlight.value = false;
    }, 1500);
});
</script>

<template>
    <Pointer
        v-intersect="{ handler: pause }"
        class="summary"
        :can-overflow="false"
        :size="1"
        :animate="false"
    >
        <p class="summary__text">
            {{ t("landing.summary.description") }}
            <span
                v-if="phase"
                :class="[
                    'summary__subtitle',
                    { 'summary__subtitle--highlight': highlight },
                ]"
                >{{ t(currentSkill.stack) }}</span
            >
        </p>

        <Tech
            :tech
            :is-paused
        />

        <button
            type="button"
            :class="['summary__cta', { reversed: isReversed }]"
            @click="handleCta"
        >
            <span v-if="isReversed">{{ t("global.scroll") }}</span>
            <span
                v-else
                class="cta-text"
                >{{ t(currentSkill.cta) }}</span
            >
        </button>

        <template #pointer>
            <div :class="['summary__pointer', { reversed: isReversed }]" />
        </template>
    </Pointer>
</template>

<style lang="scss" scoped>
.summary {
    position: relative;
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
        position: relative;
        text-align: center;
        max-width: 30rem;
    }

    &__subtitle {
        position: absolute;
        bottom: -2rem;
        width: 100%;
        font-weight: $fonts-bold;
        font-size: 0.7rem;
        display: block;
        text-align: center;
        color: $colors-black-primary-light;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        transition: 0.3s;

        &--highlight {
            color: $colors-black-secondary;
        }
    }

    &__cta {
        position: absolute;
        left: 1.5rem;
        bottom: 1.5rem;

        @media (min-width: $breakpoints-m) {
            left: 3rem;
            bottom: 3rem;
        }

        border-radius: 50%;
        height: 6rem;
        width: 6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        transform: rotate(-12deg);
        transition: 0.4s;
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
