<script lang="ts" setup>
withDefaults(defineProps<{ contrast?: boolean }>(), { contrast: false });
</script>

<template>
    <div :class="['tag', { 'tag--contrast': contrast }]"><slot /></div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/variables/distances" as *;
@use "../assets/scss/variables/colors" as *;

.tag {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $distances-xxs $distances-xs;
    box-shadow: 3px 3px 7px 3px rgba(0, 0, 0, 0.08);
    background-color: $colors-secondary;
    color: $colors-primary;
    gap: $distances-xs;
    border-radius: 5px;

    font-size: 0.9rem;

    &--contrast {
        box-shadow: 8px 8px 25px 8px rgba(0, 0, 0, 0.2);
    }
}
</style>
