<script lang="ts" setup>
import { Game, GamePlayerLoc } from "@portfolio/ui";
import { GAME_DATA as game } from "~/configs/game";

const { t } = useI18n();
</script>

<template>
    <section class="atf">
        <img
            class="game-img"
            src="/img/game/background-mountain.svg"
        />

        <h1 class="game-title">
            {{ $t("landing.title") }}
            <GamePlayerLoc />
        </h1>

        <Game
            class="game"
            :game
            :t
        />
    </section>
</template>

<style lang="scss" scoped>
.atf {
    user-select: none;
    height: 96vh;
    display: flex;
    align-items: flex-end;
}

.game {
    position: absolute;
    bottom: 1.55rem;
    z-index: -2;
}

.game-img {
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

.game-title {
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
