<script lang="ts" setup>
import {
    Game,
    GamePlayerLoc,
    GradientScroll,
    Pointer,
    gradients,
} from "@portfolio/ui";
import { GAME_DATA } from "~/configs/game";

const { t } = useI18n();

const title = ref<HTMLHeadingElement>();
const target = ref<HTMLElement>();
const gradientThreshold = ref<number>(0);

onMounted(() => {
    target.value = document.body;
    if (!title.value) return;
});

const updateGradientThreshold = (threshold: number) => {
    gradientThreshold.value = threshold;
};

const isReversed = computed<boolean>(() => gradientThreshold.value < 0.2);

const handleCta = () => {
    if (isReversed.value) {
        window.scrollBy({ top: 750, behavior: "smooth" });
        return;
    }

    console.log("pinis");
};
</script>

<template>
    <div>
        <GradientScroll
            :target="target"
            :gradients="gradients.GRADIENTS_MAIN.toReversed()"
            :transition="1"
            @update:threshold="updateGradientThreshold"
        >
            <template #reference>
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
            </template>

            <Pointer
                class="btf__pointer"
                :can-overflow="false"
                :size="1"
                :animate="false"
            >
                <p class="btf__text">
                    Full stack web developer and ex-Lawyer based in Barcelona.
                    Clean code nerd with a strong focus in architecture,
                    performance, CRO and design. 3 years long journey in e-com
                    stores.
                </p>

                <button
                    type="button"
                    :class="['btf__cta', { 'btf__cta--reversed': isReversed }]"
                    @click="handleCta"
                >
                    <span v-if="isReversed">Scroll</span>
                    <span
                        v-else
                        class="cta-text"
                        >Say hi</span
                    >
                </button>

                <template #pointer>
                    <div
                        :class="[
                            'custom-pointer',
                            { 'custom-pointer--reversed': isReversed },
                        ]"
                    ></div>
                </template>
            </Pointer>
        </GradientScroll>

        <section class="skills">Yo</section>
    </div>
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

.skills {
    height: 100vh;
    background-color: $colors-primary;
}

.atf {
    user-select: none;
    height: 96vh;
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

.game {
    position: absolute;
    bottom: 1.55rem;
    z-index: -2;
}

.custom-pointer {
    mix-blend-mode: difference;
    color: $colors-primary;
    background-color: $colors-secondary;
    border-radius: 50%;
    transition: 1s;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;

    &--reversed {
        color: $colors-secondary;
        background-color: $colors-primary;
    }
}

.btf {
    height: 100vh;
    position: relative;

    &__pointer {
        width: 100% !important;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__text {
        text-align: center;
        max-width: 30rem;
    }

    &__cta {
        position: fixed;
        left: 3rem;
        bottom: 3rem;

        border-radius: 50%;
        height: 6rem;
        width: 6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: rotate(-12deg);
        transition: 0.8s;
        color: $colors-primary;
        background-color: $colors-secondary;
        cursor: none;

        &--reversed {
            position: absolute;
            bottom: 85vh;

            color: $colors-secondary;
            background-color: $colors-primary;
        }

        &:hover {
            transform: rotate(-372deg) scale(1.1);
        }

        &:active {
            transition: 0.2s;
            transform: scale(0.9);
        }
    }
}

@keyframes rotation-in {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(721deg);
    }
}

.cta-text {
    animation: rotation-in 1.5s ease;
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
