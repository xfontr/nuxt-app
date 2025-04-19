<script lang="ts" setup>
import { Game, GradientScroll, gradients } from "@portfolio/ui";
import { ASSETS, GAME_DATA } from "~/configs/game";

const { ts } = useI18n();

const title = ref<HTMLHeadingElement>();
const target = ref<HTMLElement>();
const translations = ref({
    linterRay: ts("game.linter_ray"),
});

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
                <img
                    class="atf__img"
                    :style="{}"
                    src="/img/game/background-mountain.svg"
                />
                <img
                    class="atf__img"
                    :style="{ 'z-index': -1, bottom: '14rem' }"
                    src="/img/game/background-clouds.svg"
                />

                <h1
                    ref="title"
                    class="atf__title"
                    v-html="$t('landing.title')"
                />

                <Game
                    class="game"
                    :game="GAME_DATA"
                    :assets="ASSETS"
                    :t="translations"
                />
            </section>
        </template>
        <div class="atf">wharevs</div>
    </GradientScroll>
</template>

<style lang="scss">
.ground-layer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(to top, #f1e9d2 0%, transparent 100%);
    z-index: 1;
}

.atf {
    min-height: 100vh;
    display: flex;
    align-items: flex-end;

    &__img {
        position: absolute;
        height: 100vh;
        width: 100vw;
        bottom: 11rem;
        object-fit: cover;
    }

    &__title {
        padding-left: 2rem;
        filter: drop-shadow(15px 30px 6px rgba(0, 0, 0, 0.1));
        max-width: 80%;
        position: absolute;
        bottom: calc(-2.3vw + 2rem);
        font-size: clamp(100px, 20vw, 20vw);
        line-height: 40%;
        -webkit-text-stroke: 1px $colors-primary-very-light;
        -webkit-text-fill-color: $colors-secondary;
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
    bottom: 1.55rem;
    z-index: -2;
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
