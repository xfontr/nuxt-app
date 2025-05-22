import { computed, onMounted, ref, type Ref } from "vue";
import useWindow from "../../../composables/useWindow";
import type { FullLocation, Location } from "../../../types/Location";
import type { PointerOptions } from "../types/Pointer";
import { random } from "../../../utils/math";

const usePointer = <Pointer extends HTMLElement, Target extends HTMLElement>(
    pointer: Ref<Pointer | undefined>,
    target: Ref<Target | undefined>,
    options: PointerOptions,
) => {
    const { on } = useWindow();

    const limit = ref<FullLocation>({
        left: { x: 0, y: 0 },
        right: { x: 0, y: 0 },
    });

    const radius = ref<number>(options.size / 2);
    const isVisible = ref<boolean>(true); // renders on server
    const location = ref<Location>(options.start ?? ({} as Location));

    const isSizeRelative = computed<boolean>(() => options.unit !== "px");

    const togglePointerVisibility = (visible: boolean): void => {
        isVisible.value = options.alwaysVisible || visible;
    };

    const leave = (): void => togglePointerVisibility(false);
    const enter = (): void => togglePointerVisibility(true);

    const move = (event: MouseEvent | Location): void => {
        if (!options.enabled) return;

        const { left, right } = limit.value;

        let x: number;
        let y: number;

        const e = event as MouseEvent;
        const targetEl = target.value!;
        const rect = targetEl.getBoundingClientRect();

        const scrollLeft =
            window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

        const offsetLeft = rect.left + scrollLeft;
        const offsetTop = rect.top + scrollTop;

        x = e.pageX - offsetLeft;
        y = e.pageY - offsetTop;

        x = Math.max(left.x, Math.min(x, right.x));
        y = Math.max(left.y, Math.min(y, right.y));

        location.value = { x, y };
    };

    const setLimits = (): void => {
        const overflow = options.canOverflow ? 10 : 1;
        const { left, right } = limit.value;

        left.x = left.y = options.canOverflow ? 0 : radius.value;

        right.x = target.value!.offsetWidth - radius.value / overflow;
        right.y = target.value!.offsetHeight - radius.value / overflow;
    };

    const resize = (): void => {
        if (isSizeRelative.value) radius.value = pointer.value!.clientWidth / 2;
        setLimits();
    };

    on("resize", resize, { immediate: true });

    onMounted(() => {
        isVisible.value = options.alwaysVisible;

        location.value.x ??= random(0, target.value!.offsetWidth);
        location.value.y ??= random(0, target.value!.offsetHeight);
    });

    return {
        mouse: { enter, leave, move },
        location,
        radius,
        isVisible,
    };
};

export default usePointer;
