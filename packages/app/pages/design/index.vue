<script setup lang="ts">
import { Pointer } from "@portfolio/ui";

onMounted(() => {
    // document.body.classList.add("reversed");
});
</script>

<template>
    <div>
        <Pointer
            :size="35"
            :unit="'vw'"
            :always-visible="true"
            :can-overflow="true"
        >
            <span
                class="test"
                v-html="$t('meta.title')"
            />
            <template #pointer>
                <div class="custom-pointer"></div>
            </template>
        </Pointer>

        <Pointer
            :size="200"
            :unit="'px'"
            :always-visible="true"
            :can-overflow="true"
        >
            <span
                class="test test--difference"
                v-html="$t('meta.title')"
            />
            <template #pointer>
                <div class="custom-pointer"></div>
            </template>
        </Pointer>
    </div>
</template>

<style lang="scss" scoped>
.test {
    font-size: 300px;
    -webkit-text-stroke: 1px black;
    -webkit-text-fill-color: white;
    font-weight: $fonts-extra-bold;
    color: $colors-secondary;
    margin: 1rem;
    padding: 0 2rem;

    &--difference {
        background-color: black;
        -webkit-text-stroke: 1px white;
    }
}

.custom-pointer {
    mix-blend-mode: difference;
    background-color: white;
    border-radius: 50%;
}
</style>
