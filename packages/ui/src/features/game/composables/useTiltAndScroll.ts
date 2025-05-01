import { ref, type Ref } from "vue";
import type { BackgroundItem } from "../types/Background";
import type { GameState } from "../types/Game";

const TILT_X = 0.01;
const TILT_Y = 0.004;

const useTiltAndScroll = (
    state: Ref<GameState>,
    list: Ref<BackgroundItem[]>,
    canvasElement: Ref<HTMLCanvasElement | undefined>,
) => {
    const mouse = ref({
        x: state.value.layout.width / 2,
        y: state.value.layout.height / 2,
    });
    const lastMouse = ref({ x: mouse.value.x, y: mouse.value.y });
    const lastScrollY = ref<number>(0);

    const scroll = ({ scrollY }: Window) => {
        lastScrollY.value ??= scrollY;
        const dy = scrollY - lastScrollY.value || 1;
        lastScrollY.value = scrollY;

        list.value.forEach((item) => {
            item.offsetY += dy * 0.02 * item.scale;
        });
    };

    const tilt = (_: Window, { clientX, clientY }: MouseEvent) => {
        const rect = canvasElement.value?.getBoundingClientRect();

        if (!rect) return;

        lastMouse.value = { ...mouse.value };
        mouse.value.x = clientX - rect.left;
        mouse.value.y = clientY - rect.top;
        const dx = mouse.value.x - lastMouse.value.x;
        const dy = mouse.value.y - lastMouse.value.y;

        list.value.forEach((item) => {
            item.offsetX += dx * TILT_X * item.scale;
            item.offsetY += dy * TILT_Y * item.scale;
        });
    };

    return {
        scroll,
        tilt,
    };
};

export default useTiltAndScroll;
