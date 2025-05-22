<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import type { PointerOptions } from "../types/Pointer";
import usePointer from "../composables/usePointer";
import { toCssUnit } from "../../../utils/text";

const props = withDefaults(defineProps<Partial<PointerOptions>>(), {
    size: 16,
    unit: "vw",
    enabled: true,
    alwaysVisible: true,
    canOverflow: true,
});

const target = ref<HTMLDivElement>();
const pointer = ref<HTMLDivElement>();
const usesMouse = ref<boolean>();

const $p = usePointer(pointer, target, props);

const css = computed(() => ({
    left: toCssUnit($p.location.value.x - $p.radius.value, "px"),
    top: toCssUnit($p.location.value.y - $p.radius.value, "px"),
    size: toCssUnit(props.size, props.unit),
    display: $p.isVisible.value ? "block" : "none",
}));

onMounted(() => {
    usesMouse.value = window.matchMedia("(hover: hover)").matches;
});
</script>

<template>
    <div
        :class="['pointer', { 'pointer--overflow': canOverflow }]"
        ref="target"
        @mouseenter="$p.mouse.enter"
        @mousemove="$p.mouse.move"
        @mouseleave="$p.mouse.leave"
    >
        <slot />

        <div
            v-show="enabled && usesMouse"
            class="pointer__pointer"
            ref="pointer"
        >
            <slot name="pointer" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.pointer {
    position: relative;
    user-select: none;
    cursor: none;
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
