<script lang="ts" setup>
import { GradientScroll, Pointer, gradients } from "@portfolio/ui";

const title = ref<HTMLHeadingElement>();
const target = ref<HTMLElement>();

onMounted(() => {
    target.value = document.body;

    if (!title.value) return;
});
</script>

<template>
    <GradientScroll
        :target="target"
        :gradients="gradients.GRADIENTS_MAIN.toReversed()"
        :transition="1"
    >
        <template #reference>
            <section class="atf">
                <Pointer
                    class="header"
                    :size="20"
                    unit="vw"
                    :always-visible="true"
                    :animate="true"
                    :can-overflow="false"
                >
                    <h1
                        ref="title"
                        class="header__title"
                        v-html="$t('landing.title')"
                    />

                    <template #pointer>
                        <div class="custom-pointer" />
                    </template>
                </Pointer>
                <Game
                    class="game"
                    :width="1920"
                    :height="600"
                />
                <p
                    :style="{
                        width: '30rem',
                        'padding-top': '3rem',
                        'line-height': '1rem',
                        'font-size': '16px',
                    }"
                >
                    {{ $t("landing.description") }}
                </p>
            </section>
        </template>

        <section :style="{ height: '110vh' }">
            <p
                :style="{
                    width: '30rem',
                    'padding-top': '3rem',
                    'line-height': '1rem',
                    'font-size': '16px',
                }"
            >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
            </p>
        </section>
    </GradientScroll>
</template>

<style lang="scss">
.header {
    &__title {
        color: white;
        font-size: 14rem;
        height: 650px;
        line-height: 40%;
        -webkit-text-stroke: 1px $colors-primary;
        -webkit-text-fill-color: 1px $colors-secondary;
        font-weight: $fonts-extra-bold;
        letter-spacing: -0.5rem;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: end;
        flex-wrap: wrap;
        justify-content: start;
        margin: -5rem 0;

        :deep(.space-left) {
            padding: 10px;
        }
    }

    .custom-pointer {
        mix-blend-mode: difference;
        background-color: $colors-secondary;
    }
}

.matrix {
    color: transparent;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 0;
    background: url("https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWIwMGN1cnZhenBycGRuaTVyZm9lanl2c3J2aWd4OTJrcG13MTV1YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1yvoDVJQsTfHi/giphy.gif")
        repeat 50%;
    background-size: cover;
    background-clip: text;
    font-weight: $fonts-extra-bold;
    height: 230px;
    display: flex;
    align-items: center;
    padding-right: 10px;
    margin-top: -10rem;
}

.game {
    position: absolute;
    top: 0;
    left: 550px;
}
</style>

<style lang="scss">
:root {
    background-color: transparent !important;
}
</style>
