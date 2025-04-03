<script lang="ts" setup>
import { colors, GradientScroll, Pointer } from "@portfolio/ui";

const target = ref<HTMLElement>();

onMounted(() => {
    target.value = document.body;
});
</script>

<template>
    <GradientScroll
        :target="target"
        :gradients="[
            colors.THEME_BLACK_WHITE.colorsPrimary,
            colors.THEME_BLACK_WHITE.colorsSecondary,
        ]"
        :transition="1"
    >
        <template #reference>
            <section>
                <Pointer
                    class="header"
                    :size="50"
                    unit="px"
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
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                </p>
            </section>
        </template>

        <section :style="{ height: '110vh' }">Second section</section>
    </GradientScroll>
</template>

<style lang="scss" scoped>
.header {
    &__title {
        font-size: 300px;
        height: 400px;
        line-height: 40%;
        -webkit-text-stroke: 1px $colors-primary;
        font-weight: $fonts-extra-bold;

        margin: auto 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;

        :deep(.space-left) {
            padding: 10px;
        }
    }

    .custom-pointer {
        mix-blend-mode: exclusion;
        background-color: $colors-secondary;
        border-radius: 50%;
    }
}
</style>
