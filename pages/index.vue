<template>
    <Pointer :size="15" :unit="'vw'" :alwaysVisible="false">
        <span class="test">{{ $t("meta.title") }}</span>
        <template #pointer>
            <div class="custom-pointer"></div>
        </template>
    </Pointer>

    <Pointer
        :size="200"
        :unit="'px'"
        :alwaysVisible="false"
        :canOverflow="true"
    >
        <span class="test test--difference">{{ $t("meta.title") }}</span>
        <template #pointer>
            <div class="custom-pointer"></div>
        </template>
    </Pointer>
</template>

<style lang="scss" scoped>
.test {
    cursor: none;
    font-size: 300px;
    -webkit-text-stroke: 1px black;
    font-weight: $fonts-extra-bold;
    color: $colors-secondary;

    &--difference {
        background-color: black;
        -webkit-text-stroke: 1px white;
    }
}

.custom-pointer {
    mix-blend-mode: exclusion;
    background-color: $colors-secondary;
    border-radius: 50%;
}
</style>
