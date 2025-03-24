<script lang="ts" setup>
withDefaults(
    defineProps<{
        shape?: "SQUARE" | "CIRCLE";
    }>(),
    { shape: "CIRCLE" },
);
</script>

<template>
    <Pointer
        :class="{
            'pointer__pointer--circle': shape === 'CIRCLE',
        }"
    >
        <slot />
        <template #pointer>
            <slot name="pointer"></slot>
        </template>
    </Pointer>
</template>

<style lang="scss" scoped>
:deep(.pointer__pointer--circle) {
    border-radius: 50%;
}
</style>
