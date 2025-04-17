<script lang="ts" setup>
import { GradientScroll, Pointer, gradients } from "@portfolio/ui";

const target = ref<HTMLElement>();

onMounted(() => {
    target.value = document.body;
});
</script>

<template>
    <GradientScroll
        :target="target"
        :gradients="gradients.GRADIENTS_MAIN.toReversed()"
        :transition="1"
    >
        <template #reference>
            <section>
                <Pointer
                    class="header"
                    :size="50"
                    unit="px"
                    :always-visible="true"
                    :animate="true"
                    :can-overflow="false"
                >
                    <h1
                        class="header__title"
                        v-html="$t('meta.title')"
                    />

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

<style lang="scss" scoped>
.header {
    &__title {
        font-size: 300px;
        height: 400px;
        line-height: 40%;
        -webkit-text-stroke: 1px $colors-secondary;
        font-weight: $fonts-extra-bold;
        // -webkit-text-fill-color: $colors-primary;

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
        background-color: $colors-primary;
        border-radius: 50%;
    }
}
</style>
