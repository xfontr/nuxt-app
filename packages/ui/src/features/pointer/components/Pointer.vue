<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import type { PointerOptions } from "../types/Pointer";
import type { Ranges } from "../types/Ranges";
import useCooldown from "../../../composables/useCooldown";
import usePointer from "../composables/usePointer";
import useAnimation from "../composables/useAnimation";
import { toCssUnit } from "../../../utils/text";
import { DEFAULT_RANGES } from "../constants";

const props = withDefaults(
    defineProps<
        Partial<PointerOptions> & {
            animate?: boolean;
            canInterfereAnimation?: boolean;
            animationRange?: Ranges;
        }
    >(),
    {
        size: 16,
        unit: "vw",
        enabled: true,
        alwaysVisible: true,
        canOverflow: true,
        canInterfereAnimation: true,
        animate: true,
        animationRange: () => DEFAULT_RANGES,
    },
);

const target = ref<HTMLDivElement>();
const pointer = ref<HTMLDivElement>();
const blocker = ref<ReturnType<typeof setTimeout>>();
const isAnimationPaused = ref<boolean>(false);

const { cooldown } = useCooldown();
const $p = usePointer(pointer, target, props);
const animation = useAnimation(pointer, props.animationRange);

const css = computed(() => ({
    left: toCssUnit($p.location.value.x - $p.radius.value, "px"),
    top: toCssUnit($p.location.value.y - $p.radius.value, "px"),
    size: toCssUnit(props.size, props.unit),
    display: $p.isVisible.value ? "block" : "none",
    cursor: props.canInterfereAnimation ? "none" : "revert",
}));

const isMouseDisabled = computed<boolean>(
    () => props.animate && !props.canInterfereAnimation,
);

const enter = (): void => {
    if (isMouseDisabled.value) return;
    $p.mouse.enter();
};

const leave = (): void => {
    if (isMouseDisabled.value) return;
    $p.mouse.leave();
};

const resumeAnimationIfNotMoving = () => {
    cooldown(async () => {
        blocker.value = undefined;
        isAnimationPaused.value = false;
        await animation.init($p.location.value);
    }, 800);
};

const pauseAnimation = (): void => {
    if (!isAnimationPaused.value) animation.stop();
    isAnimationPaused.value = true;
};

const move = (event: MouseEvent): void => {
    if (isMouseDisabled.value) return;

    if (props.animate) {
        pauseAnimation();
        resumeAnimationIfNotMoving();
    }

    $p.mouse.move(event, true);
};

onMounted(() => {
    if (!props.animate) return;
    animation.set($p.mouse.move);
    void animation.init($p.location.value);
});
</script>

<template>
    <div
        v-if="$p.isEnabled"
        :class="['pointer', { 'pointer--overflow': canOverflow }]"
        ref="target"
        @mouseenter="enter"
        @mousemove="move"
        @mouseleave="leave"
    >
        <slot />

        <div
            class="pointer__pointer"
            ref="pointer"
        >
            <slot name="pointer" />
        </div>
    </div>

    <slot v-else />
</template>

<style lang="scss" scoped>
.pointer {
    position: relative;
    user-select: none;
    cursor: v-bind("css.cursor");
    width: fit-content;
    height: 100%;

    &__pointer {
        position: absolute;
        display: v-bind("css.display");
        height: v-bind("css.size");
        width: v-bind("css.size");
        top: v-bind("css.top");
        left: v-bind("css.left");
        pointer-events: none;
    }

    &__pointer > * {
        width: 100%;
        height: 100%;
    }

    &--overflow {
        overflow: hidden;
    }
}
</style>
