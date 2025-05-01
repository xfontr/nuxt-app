<script lang="ts" setup>
import { Game, GamePlayerLoc, GradientScroll, gradients } from "@portfolio/ui";
import { GAME_DATA } from "~/configs/game";

const { t } = useI18n();

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
                <img
                    class="atf__img"
                    src="/img/game/background-mountain.svg"
                />

                <h1
                    ref="title"
                    class="atf__title"
                >
                    {{ $t("landing.title") }}
                    <GamePlayerLoc />
                </h1>

                <Game
                    class="game"
                    :game="GAME_DATA"
                    :t
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
    user-select: none;
    min-height: 100vh;
    display: flex;
    align-items: flex-end;

    &__img {
        position: absolute;
        height: 100vh;
        width: 100%;
        object-fit: cover;
        object-position: left;

        bottom: 17rem;

        @media (min-width: $breakpoints-m) {
            width: 100vw;
            bottom: 13.5rem;
        }
    }

    &__title {
        padding-left: 1rem;
        filter: drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.05));
        max-width: 80%;
        line-height: 45%;
        font-size: clamp(100px, 20vw, 20vw);
        -webkit-text-stroke: 1px $colors-primary-very-light;
        -webkit-text-fill-color: $colors-secondary;
        font-weight: $fonts-extra-bold;
        letter-spacing: -0.5rem;
        margin-bottom: 33vh;

        @media (min-width: $breakpoints-m) {
            padding-left: 2rem;
            margin-bottom: 30vh;
        }

        @media (min-width: $breakpoints-xl) {
            margin-bottom: 12%;
        }
    }
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
    margin-left: 0.5rem;
    display: block;

    @media (min-width: $breakpoints-xl) {
        display: inline;
    }
}
</style>
