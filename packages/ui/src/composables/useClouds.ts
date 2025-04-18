import { ref, type Ref } from "vue";
import type { GameState } from "../features/game/types/Game";
import type { CanvasDrawOptions } from "../features/game/types/Canvas";
import { random } from "../utils";
import type { CloudOptions } from "../features/game/types/Cloud";
import useWindow from "./useWindow";

const TILT_X = 0.01;
const TILT_Y = 0.004;
const BASE_WIDTH = 60;
const BASE_HEIGHT = 40;

type Cloud = CanvasDrawOptions & CloudOptions;

const useClouds = (state: Ref<GameState>) => {
    const thisWindow = useWindow();

    const canvas = state.value.layout;
    const clouds = ref<Cloud[]>([]);
    const mouse = ref({ x: canvas.width / 2, y: canvas.height / 2 });
    const lastMouse = ref({ x: mouse.value.x, y: mouse.value.y });
    const lastScrollY = ref<number>(0);

    const handleScroll = ({ scrollY }: Window) => {
        lastScrollY.value ??= scrollY;
        const dy = scrollY - lastScrollY.value || 1;
        lastScrollY.value = scrollY;

        clouds.value.forEach((cloud) => {
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

        clouds.value.forEach((cloud) => {
            cloud.offsetX += dx * TILT_X * cloud.scale;
            cloud.offsetY += dy * TILT_Y * cloud.scale;
        });
    };

    const init = (amount = 10) => {
        clouds.value = Array.from({ length: amount }, () => {
            const scale = 1 + Math.random() * 4;
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * (canvas.height / 2),
                width: BASE_WIDTH * scale,
                height: BASE_HEIGHT * scale,
                scale,
                speedMultiplier: 0.1 + Math.random() * 0.4,
                offsetX: 0,
                offsetY: 0,
            };
        });
    };

    thisWindow.on("scroll", handleScroll, { passive: true });
    thisWindow.on<MouseEvent>("mousemove", handleMouseMove, { passive: true });

    const update = () => {
        clouds.value.forEach((cloud) => {
            // Drift left
            cloud.x -= state.value.gameSpeed * cloud.speedMultiplier;

            // Add offset
            cloud.x += cloud.offsetX;
            cloud.y += cloud.offsetY;

            // Slowly decay offset back to 0 (easing)
            cloud.offsetX *= 0.9;
            cloud.offsetY *= 0.9;

            // Respawn on left side if off-screen
            if (cloud.x + cloud.width < 0) {
                cloud.x = canvas.width + random(0, 50);
                cloud.y = Math.random() * (canvas.height / 2);
                cloud.offsetX = 0;
                cloud.offsetY = 0;
            }
        });
    };

    return {
        list: clouds,
        init,
        update,
    };
};

export default useClouds;
