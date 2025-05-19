<script lang="ts" setup>
const SKILLS = [
    "vue.js",
    "express",
    "react.js",
    "node.js",
    "Typescript",
    "CSS, HTML",
];
</script>

<template>
    <section class="skills">
        <ul class="skills__list">
            <li
                v-for="skill in SKILLS"
                :key="skill"
            >
                <Skill>{{ skill }}</Skill>
            </li>
        </ul>
    </section>
</template>

<style lang="scss" scoped>
.skills {
    padding: 0 2rem;
    height: 100vh;
    display: flex;
    padding-top: 2rem;

    &__list {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1rem;
    }
}
</style>
