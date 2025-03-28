<script lang="ts" setup>
const handleIn = () => {
    document.querySelector("body")!.style.background = "black";
};

const handleOut = () => {
    document.querySelector("body")!.style.background = "none";
};
</script>

<template>
    <Pointer
        v-intersect="{ handler: handleOut }"
        class="header"
        :size="50"
        unit="vw"
        :alwaysVisible="true"
        :animate="true"
    >
        <h1 class="header__title" v-html="$t('meta.title')" />

        <template #pointer>
            <div class="custom-pointer" />
        </template>
    </Pointer>
    <p
        :style="{
            width: '30rem',
            'padding-top': '3rem',
            'line-height': '1rem',
            'font-size': '16px',
        }"
    >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
    </p>
    <section
        :style="{ height: '100vh' }"
        v-intersect="{ handler: handleIn }"
    ></section>
</template>

<style lang="scss" scoped>
.header {
    &__title {
        font-size: 300px;
        height: 400px;
        line-height: 40%;
        -webkit-text-stroke: 1px black;
        font-weight: $fonts-extra-bold;
        color: $colors-secondary;

        margin: auto 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;

        &--difference {
            background-color: black;
            -webkit-text-stroke: 1px white;
        }

        :deep(.space-left) {
            padding: 10px;
        }
    }

    .custom-pointer {
        mix-blend-mode: exclusion;
        background-color: $colors-secondary;
        // border-radius: 50%;
    }
}
</style>

<style lang="scss">
body {
    transition: 1s;
}
</style>
