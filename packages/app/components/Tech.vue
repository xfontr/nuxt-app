<script lang="ts" setup>
import { random } from "@portfolio/ui";

withDefaults(defineProps<{ tech?: string }>(), { tech: undefined });

const ASSETS = {
    nuxt: "https://img.icons8.com/?size=100&id=24eF8YVaoAR5&format=png&color=ffffff",
    vue: "https://img.icons8.com/?size=100&id=rSpdgU9ntuoU&format=png&color=ffffff",
    react: "https://img.icons8.com/?size=100&id=0Da6k7SMq0hs&format=png&color=ffffff",
    ts: "https://img.icons8.com/?size=100&id=vMqgHSToxrJR&format=png&color=ffffff",
    js: "https://img.icons8.com/?size=100&id=106036&format=png&color=ffffff",
    css: "https://img.icons8.com/?size=100&id=38272&format=png&color=ffffff",
    html: "https://img.icons8.com/?size=100&id=23028&format=png&color=ffffff",
    node: "https://img.icons8.com/?size=100&id=FQlr_bFSqEdG&format=png&color=ffffff",
};

const radialSizeCss = computed<`${string}%`>(() => `${random(10, 90)}%`);
const radialChapeCss = computed<"ellipse" | "circle">(() =>
    random(0, 1) ? "circle" : "ellipse",
);
</script>

<template>
    <div :class="['tech', { 'tech--empty': !tech }]">
        <img
            v-if="tech && ASSETS[tech.toLocaleLowerCase()]"
            :src="ASSETS[tech.toLocaleLowerCase()]"
            alt=""
            width="30"
            height="30"
        />
        <span v-else>{{ tech }}</span>
    </div>
</template>

<style lang="scss" scoped>
.tech {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8.7vw;
    height: 8.7vw;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.535);

    mask-image: radial-gradient(
        v-bind("radialChapeCss") at v-bind("radialSizeCss"),
        rgba(0, 0, 0, 1) 60%,
        rgba(0, 0, 0, 0.4) 80%,
        rgba(0, 0, 0, 0) 100%
    );
    -webkit-mask-image: radial-gradient(
        v-bind("radialChapeCss") at v-bind("radialSizeCss"),
        rgba(0, 0, 0, 1) 60%,
        rgba(0, 0, 0, 0.4) 80%,
        rgba(0, 0, 0, 0) 100%
    );

    &--empty {
        border: none;
    }
}
</style>
