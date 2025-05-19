<script lang="ts" setup>
const GRID: (0 | string)[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, "Nuxt", 0],
    ["CSS", 0, 0, 0, "TS", 0, 0, 0, 0, "Vue", "React"],
    ["HTML", "JS", 0, 0, 0, 0, 0, "C", 0, 0, "Node"],
];
</script>

<template>
    <!-- <Gravity /> -->
    <!-- <div class="tech-grid">
        <div
            v-for="(techRow, key) in GRID"
            :key
            class="tech-grid__row"
        >
            <Tech
                v-for="tech in techRow"
                :key="tech"
                :tech="tech ? tech : undefined"
            />
        </div>
    </div> -->
</template>

<style lang="scss">
.tech-grid {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    right: 0;
    gap: 0.3rem;

    &__row {
        display: flex;
        justify-content: flex-end;
        gap: 0.3rem;
    }
}
</style>
