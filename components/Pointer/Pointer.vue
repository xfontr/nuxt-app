<script lang="ts" setup>
import type { FullLocation, Location } from "~/types/Location";

const props = withDefaults(
    defineProps<{
        size?: number;
        enabled?: boolean;
        alwaysVisible?: boolean;
        start?: Location;
        sizeMagnitude?: "vh" | "vw" | "%" | "px";
        canOverflow?: boolean;
    }>(),
    {
        size: 16,
        sizeMagnitude: "vw",
        shape: "CIRCLE",
        enabled: true,
        alwaysVisible: false,
        start: () => ({ x: 0, y: 0 }),
        canOverflow: true,
    },
);

const distanceToMiddle = ref<number>(props.size / 2);

const target = ref<HTMLDivElement>();
const pointer = ref<HTMLDivElement>();
const location = ref<Location>({
    x: props.start.x,
    y: props.start.y,
});
const limit = ref<FullLocation>({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
});

const toMagnitude = <T>(
    text: T,
    magnitude = props.sizeMagnitude,
): `${string}${typeof props.sizeMagnitude}` => `${text}${magnitude}`;

const isSizeRelative = computed<boolean>(() => props.sizeMagnitude !== "px");

const isEnabled = computed<boolean>(
    () => !!target.value && !!pointer.value && props.enabled,
);

const locationX = computed<string>(() =>
    toMagnitude(location.value.x - distanceToMiddle.value, "px"),
);

const locationY = computed<string>(() =>
    toMagnitude(location.value.y - distanceToMiddle.value, "px"),
);

const cssSize = computed<string>(() => toMagnitude(props.size));

const handleMouseMove = ({ x: mouseX, y: mouseY }: MouseEvent): void => {
    if (!isEnabled.value) return;

    const rect = target.value!.getBoundingClientRect();
    const x = mouseX - rect.left;
    const y = mouseY - rect.top;

    location.value = { x, y };

    if (x <= limit.value.left.x) location.value.x = limit.value.left.x;
    if (y <= limit.value.left.y) location.value.y = limit.value.left.y;

    if (x >= limit.value.right.x) location.value.x = limit.value.right.x;
    if (y >= limit.value.right.y) location.value.y = limit.value.right.y;
};

const handleMouseLeave = (): void => {
    if (!isEnabled.value || props.alwaysVisible) return;
    pointer.value!.style.display = "none";
};

const handleMouseEnter = (): void => {
    if (!isEnabled.value || props.alwaysVisible) return;
    pointer.value!.style.display = "block";
};

const setLimits = (element: HTMLElement) => {
    const { width, height } = element.getBoundingClientRect();

    limit.value.left.y = limit.value.left.x = props.canOverflow
        ? -distanceToMiddle.value
        : distanceToMiddle.value;

    limit.value.right.x =
        width - distanceToMiddle.value / (props.canOverflow ? 10 : 1);
    limit.value.right.y =
        height - distanceToMiddle.value / (props.canOverflow ? 10 : 1);
};

const handleScreenResize = () => {
    if (isSizeRelative.value && pointer.value)
        distanceToMiddle.value = pointer.value.clientWidth / 2;
    if (target.value) setLimits(target.value);
};

onMounted(() => {
    if (!isEnabled.value) return;

    setLimits(target.value!);

    pointer.value!.style.display = props.alwaysVisible ? "block" : "none";

    window.addEventListener("resize", handleScreenResize);
});

onUnmounted(() => {
    window.removeEventListener("resize", handleScreenResize);
});

if (isSizeRelative.value) {
    watch(() => pointer.value?.clientWidth, handleScreenResize);
}
</script>

<template>
    <div
        :class="['pointer', { 'pointer--overflow': canOverflow }]"
        ref="target"
        @mouseenter="handleMouseEnter"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
    >
        <slot />
        <div class="pointer__pointer" ref="pointer">
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

    &__pointer {
        display: none;
        position: absolute;
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
