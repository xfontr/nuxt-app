<script lang="ts" setup>
import { Game, GradientScroll, Pointer, gradients } from "@portfolio/ui";
import { ASSETS, GAME_DATA } from "~/configs/game";

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
                <h1
                    ref="title"
                    class="header__title"
                    v-html="$t('landing.title')"
                />

                <Game
                    class="game"
                    :game="GAME_DATA"
                    :assets="ASSETS"
                />
            </section>
        </template>
        <div>wharevs</div>
    </GradientScroll>
</template>

<style lang="scss">
.atf {
    min-height: 100vh;
    display: flex;
    align-items: flex-end;
}

.header {
    &__title {
        max-width: 80%;
        position: absolute;
        bottom: -2.3vw;
        color: white;
        font-size: clamp(100px, 20vw, 20vw);
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
        user-select: none;
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
    height: 20vw;
    display: flex;
    align-items: center;
    padding-right: 10px;
    margin-top: -4%;
}

.game {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>

<style lang="scss">
:root {
    background-color: transparent !important;
}

.player-loc {
    margin-left: 2rem;
}
</style>
