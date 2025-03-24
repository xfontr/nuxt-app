<script lang="ts" setup>
import type { PointerOptions } from "~/types/Pointer";

const props = withDefaults(
    defineProps<
        {
            sizeMagnitude?: "vh" | "vw" | "%" | "px";
        } & PointerOptions
    >(),
    {
        size: 16,
        sizeMagnitude: "vw",
        enabled: true,
        alwaysVisible: false,
        canOverflow: true,
        start: () => ({ x: 0, y: 0 }),
    },
);

const target = ref<HTMLDivElement>();
const pointer = ref<HTMLDivElement>();

const $p = usePointer(pointer, target, props);
const { onResize } = useWindow();

const toMagnitude = <T>(
    text: T,
    magnitude = props.sizeMagnitude,
): `${string}${typeof props.sizeMagnitude}` => `${text}${magnitude}`;

const isSizeRelative = computed<boolean>(() => props.sizeMagnitude !== "px");

const locationX = computed<string>(() =>
    toMagnitude($p.location.value.x - $p.distanceToMiddle.value, "px"),
);

const locationY = computed<string>(() =>
    toMagnitude($p.location.value.y - $p.distanceToMiddle.value, "px"),
);

const cssSize = computed<string>(() => toMagnitude(props.size));

const display = computed<"block" | "none">(() =>
    props.alwaysVisible ? "block" : "none",
);

const resize = (): void => {
    if (isSizeRelative.value && pointer.value) {
        $p.distanceToMiddle.value = pointer.value.clientWidth / 2;
    }

    if (target.value) $p.setLimits();
};

onResize(resize, { immediate: true });

if (isSizeRelative.value) {
    watch(() => pointer.value?.clientWidth, resize);
}
</script>

<template>
    <div
        v-if="$p.isEnabled"
        :class="['pointer', { 'pointer--overflow': canOverflow }]"
        ref="target"
        @mouseenter="$p.mouse.enter"
        @mousemove="$p.mouse.move"
        @mouseleave="$p.mouse.leave"
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
    cursor: none;
    width: fit-content;

    &__pointer {
        position: absolute;
        display: v-bind(display);
        height: v-bind(cssSize);
        width: v-bind(cssSize);
        top: v-bind(locationY);
        left: v-bind(locationX);
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
