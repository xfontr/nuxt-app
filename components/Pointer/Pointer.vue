<script lang="ts" setup>
import type { PointerOptions } from "~/types/Pointer";
import type { Ranges } from "~/types/Ranges";

const props = withDefaults(
    defineProps<
        PointerOptions & {
            animate?: boolean;
            canInterfereAnimation?: boolean;
            animationRange?: Ranges;
        }
    >(),
    {
        size: 16,
        unit: "vw",
        enabled: true,
        alwaysVisible: false,
        canOverflow: true,
        canInterfereAnimation: true,
        animate: true,
        animationRange: undefined,
        start: () => ({ x: 0, y: 0 }),
    },
);

const target = ref<HTMLDivElement>();
const pointer = ref<HTMLDivElement>();

const $p = usePointer(pointer, target, props);
const { animate, stop, init } = useAnimation(pointer, props.animationRange);

const cssLeft = computed(() =>
    toCssUnit($p.location.value.x - $p.radius.value, "px"),
);

const cssTop = computed(() =>
    toCssUnit($p.location.value.y - $p.radius.value, "px"),
);

const cssSize = computed(() => toCssUnit(props.size, props.unit));

const cssDisplay = computed<"block" | "none">(() =>
    $p.isVisible.value ? "block" : "none",
);

const cssCursor = computed<"none" | "revert">(() =>
    props.canInterfereAnimation ? "none" : "revert",
);

const isMouseDisabled = computed<boolean>(
    () => props.animate && !props.canInterfereAnimation,
);

const enter = (): void => {
    if (isMouseDisabled.value) return;

    if (props.animate) {
        stop();
        return;
    }

    $p.mouse.enter();
};

const leave = (): void => {
    if (isMouseDisabled.value) return;

    if (props.animate) {
        init($p.location.value);
        return;
    }

    $p.mouse.leave();
};

const move = (event: MouseEvent): void => {
    if (isMouseDisabled.value) return;
    $p.mouse.move(event);
};

onMounted(() => {
    if (props.animate) animate($p.mouse.move);
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

        <div class="pointer__pointer" ref="pointer">
            <slot name="pointer" />
        </div>
    </div>

    <slot v-else />
</template>

<style lang="scss" scoped>
.pointer {
    position: relative;
    user-select: none;
    cursor: v-bind(cssCursor);
    width: fit-content;

    &__pointer {
        position: absolute;
        display: v-bind(cssDisplay);
        height: v-bind(cssSize);
        width: v-bind(cssSize);
        top: v-bind(cssTop);
        left: v-bind(cssLeft);
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
