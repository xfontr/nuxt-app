<script lang="ts" setup>
import { Game, GamePlayerLoc } from "@portfolio/ui";
import { GAME_DATA as game } from "~/configs/game";

const { t } = useI18n();

const isPaused = ref<boolean>(false);

const pause = (entry?: IntersectionObserverEntry) => {
    isPaused.value = !entry?.isIntersecting;
};
</script>

<template>
    <section
        v-intersect="{ handler: pause }"
        class="game-section"
    >
        <img
            class="game-section__img"
            src="/img/game/background-mountain.svg"
        />

        <h1 class="game-section__title">
            {{ $t("landing.title") }}
            <GamePlayerLoc />
        </h1>

        <Game
            class="game-section__game"
            :is-paused
            :game
            :t
        />
    </section>
</template>

<style lang="scss" scoped>
.game-section {
    position: relative;
    user-select: none;
    height: 99vh;
    display: flex;
    align-items: flex-end;
    width: 100%;

    &__game {
        position: absolute;
        bottom: 1.55rem;
        z-index: -2;
    }

    &__img {
        position: absolute;
        height: 100vh;
        width: 100%;
        object-fit: cover;
        object-position: left;

        bottom: 17rem;

        @media (min-width: $breakpoints-m) {
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
        margin-bottom: 16rem;

        @media (min-width: $breakpoints-m) {
            padding-left: 2rem;
            margin-bottom: 13rem;
        }

        @media (min-width: $breakpoints-l) {
            margin-bottom: 11rem;
        }

        @media (min-width: $breakpoints-xl) {
            margin-bottom: 9rem;
        }
    }
}
</style>

<style lang="scss">
.player-loc {
    margin-left: 0.5rem;
    display: block;

    @media (min-width: $breakpoints-xl) {
        display: inline;
    }
}
</style>
