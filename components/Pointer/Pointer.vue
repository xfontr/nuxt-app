<script lang="ts" setup>
import type { PointerOptions } from "~/types/Pointer";

const props = withDefaults(defineProps<PointerOptions>(), {
    size: 16,
    unit: "vw",
    enabled: true,
    alwaysVisible: false,
    canOverflow: true,
    start: () => ({ x: 0, y: 0 }),
});

const target = ref<HTMLDivElement>();
const pointer = ref<HTMLDivElement>();

const $p = usePointer(pointer, target, props);

const cssLeft = computed(() =>
    toCssUnit($p.location.value.x - $p.radius.value, "px"),
);

const cssTop = computed(() =>
    toCssUnit($p.location.value.y - $p.radius.value, "px"),
);

const cssSize = computed(() => toCssUnit(props.size, props.unit));

const cssDisplay = computed<"block" | "none">(() =>
    props.alwaysVisible ? "block" : "none",
);
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
