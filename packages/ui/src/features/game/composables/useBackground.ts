import { computed, ref, watch, type Ref } from "vue";
import type { GameState } from "../types/Game";
import type { CanvasDrawOptions } from "../types/Canvas";
import { random } from "../../../utils";
import useWindow from "../../../composables/useWindow";
import type { BackgroundOptions } from "../types/Background";

const TILT_X = 0.01;
const TILT_Y = 0.004;
const BASE_WIDTH = 60;
const BASE_HEIGHT = 40;
const BASE_SIZE_MULTIPLIER = 4;
const STAR_DENSITY = 100;
const CLOUD_DENSITY = 10;

type Background = CanvasDrawOptions & BackgroundOptions;

const useBackground = (state: Ref<GameState>) => {
    const thisWindow = useWindow();
    const canvas = state.value.layout;

    const day = ref<Background[]>([]);
    const night = ref<Background[]>([]);
    const mouse = ref({ x: canvas.width / 2, y: canvas.height / 2 });
    const lastMouse = ref({ x: mouse.value.x, y: mouse.value.y });
    const lastScrollY = ref<number>(0);

    const sizeMultiplier = ref<number>(BASE_SIZE_MULTIPLIER);

    const updateSizeMultiplier = ({ width }: typeof canvas) => {
        sizeMultiplier.value = Math.min(
            BASE_SIZE_MULTIPLIER * (width / 1920) + 1,
            BASE_SIZE_MULTIPLIER,
        );
    };

    const mode = computed<"day" | "night">(() =>
        state.value.status === "ON" ? "night" : "day",
    );

    const handleScroll = ({ scrollY }: Window) => {
        lastScrollY.value ??= scrollY;
        const dy = scrollY - lastScrollY.value || 1;
        lastScrollY.value = scrollY;

        day.value.forEach((cloud) => {
            cloud.offsetY += dy * 0.02 * cloud.scale;
        });
    };

    const handleMouseMove = (_: Window, { clientX, clientY }: MouseEvent) => {
        const rect = document.querySelector(".canvas")!.getBoundingClientRect();
        if (!rect) return;

        lastMouse.value = { ...mouse.value };
        mouse.value.x = clientX - rect.left;
        mouse.value.y = clientY - rect.top;

        const dx = mouse.value.x - lastMouse.value.x;
        const dy = mouse.value.y - lastMouse.value.y;

        day.value.forEach((cloud) => {
            cloud.offsetX += dx * TILT_X * cloud.scale;
            cloud.offsetY += dy * TILT_Y * cloud.scale;
        });
    };

    watch(() => canvas, updateSizeMultiplier, { deep: true });

    watch(
        () => state.value.status,
        (status, prevStatus) => {
            if (prevStatus === "LOADING") return;

            if (status === "IDLE" || status === "OVER") {
                day.value = day.value.map((cloud) => {
                    const scale = 1 + Math.random() * sizeMultiplier.value;
                    return {
                        ...cloud,
                        width: BASE_WIDTH * scale,
                        height: BASE_HEIGHT * scale,
                        scale,
                        icon: undefined,
                        image: "cloud",
                    };
                });
            }

            if (status === "ON") initNight();
        },
    );

    const init = () => {
        updateSizeMultiplier(canvas);

        day.value = Array.from({ length: CLOUD_DENSITY }, () => {
            const scale = 1 + Math.random() * sizeMultiplier.value;

            return {
                x: Math.random() * canvas.width,
                y: Math.random() * (canvas.height / 2),
                width: BASE_WIDTH * scale,
                height: BASE_HEIGHT * scale,
                scale,
                speedMultiplier: 0.1 + Math.random() * 0.4,
                offsetX: 0,
                offsetY: 0,
                image: "cloud",
            };
        });
    };

    const initNight = () => {
        night.value = Array.from({ length: STAR_DENSITY }, () => {
            const size = random(2, 5);
            return {
                x: random(0, canvas.width),
                y: random(0, canvas.height),
                width: size,
                height: size,
                speedMultiplier: 0.5 + Math.random() * 3.5,
                offsetX: 0,
                offsetY: 0,
                isCircle: true,
                scale: 1,
            } satisfies Background;
        });
    };

    const updateDay = () => {
        day.value.forEach((cloud) => {
            cloud.x -= state.value.gameSpeed * cloud.speedMultiplier;

            cloud.x += cloud.offsetX;
            cloud.y += cloud.offsetY;

            cloud.offsetX *= 0.9;
            cloud.offsetY *= 0.9;

            if (cloud.x + cloud.width >= 0) return;

            cloud.x = canvas.width + random(0, 50);
            cloud.y = Math.random() * (canvas.height / 2);
            cloud.offsetX = 0;
            cloud.offsetY = 0;
        });
    };

    const updateNight = () => {
        night.value.forEach((star) => {
            const speed = state.value.gameSpeed * star.speedMultiplier;

            star.y += speed;
            star.x += speed * 0.5;

            if (star.y <= canvas.height || star.x <= canvas.width) return;

            const fromLeft = Math.random() < 0.2;

            if (fromLeft) {
                star.x = -star.width;
                star.y = random(0, canvas.height / 2);
                return;
            }

            star.x = random(0, canvas.width);
            star.y = -star.height;
        });
    };

    const update = (): void => {
        if (mode.value === "day") {
            updateDay();
            return;
        }

        updateNight();
    };

    thisWindow.on("scroll", handleScroll, { passive: true });
    thisWindow.on<MouseEvent>("mousemove", handleMouseMove, { passive: true });

    return {
        list: computed(() => (mode.value === "day" ? day.value : night.value)),
        init,
        update,
        mode,
    };
};

export default useBackground;
