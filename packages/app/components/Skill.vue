<template>
    <div class="skill">
        <i class="skill__icon"
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="4rem"
                height="4rem"
                viewBox="0 0 24 24"
                fill="none"
                stroke="inherit"
            >
                <g
                    id="SVGRepo_bgCarrier"
                    stroke-width="0"
                />

                <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M12 4V20M18 6L6 18M20 12H4M18 18L6 6"
                        stroke="inherit"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </g></svg
        ></i>

        <span class="skill__text"><slot /></span>
    </div>
</template>

<style lang="scss" scoped>
.skill {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;

    &:hover {
        .skill__icon {
            transform: rotate(360deg);
        }
    }

    &__icon {
        transition: 2s;
        transform-origin: center;
        display: block;
        height: 4rem;
        width: 4rem;
    }

    &__text {
        display: inline-block;
        font-size: 4rem;
    }

    &::after {
        content: "";
        transition: 1.5s;
        background-color: black;
        position: absolute;
        bottom: -3px;
        left: 0;
        height: 3px;
        width: 0;
    }

    &:hover::after {
        width: 100%;
    }
}
</style>
