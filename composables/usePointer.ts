import type { FullLocation, Location } from "~/types/Location";
import type { PointerOptions } from "~/types/Pointer";

const usePointer = <Pointer extends HTMLElement, Target extends HTMLElement>(
    pointer: Ref<Pointer | undefined>,
    target: Ref<Target | undefined>,
    options: Required<PointerOptions>,
) => {
    const { onResize } = useWindow();

    const location = ref<Location>({
        x: options.start.x,
        y: options.start.y,
    });

    const limit = ref<FullLocation>({
        left: { x: 0, y: 0 },
        right: { x: 0, y: 0 },
    });

    const radius = ref<number>(options.size / 2);

    const isEnabled = computed<boolean>(
        () => !!target.value && !!pointer.value && options.enabled,
    );

    const isSizeRelative = computed<boolean>(() => options.unit !== "px");

    const actualSize = computed(() => target.value?.getBoundingClientRect());

    const togglePointerVisibility = (visible: boolean): void => {
        if (options.alwaysVisible) return;
        pointer.value!.style.display = visible ? "block" : "none";
    };

    const leave = (): void => togglePointerVisibility(false);
    const enter = (): void => togglePointerVisibility(true);

    const move = ({ x: mouseX, y: mouseY }: MouseEvent): void => {
        if (!isEnabled.value) return;

        const { left, right } = limit.value;

        let x = mouseX - actualSize.value!.left;
        let y = mouseY - actualSize.value!.top;

        x = Math.min(Math.max(x, left.x), right.x);
        y = Math.min(Math.max(y, left.y), right.y);

        location.value = { x, y };
    };

    const setLimits = (): void => {
        if (!isEnabled.value) return;

        const overflow = options.canOverflow ? 10 : 1;
        const { left, right } = limit.value;

        left.y = left.x = options.canOverflow ? -radius.value : radius.value;

        right.x = actualSize.value!.width - radius.value / overflow;
        right.y = actualSize.value!.height - radius.value / overflow;
    };

    const resize = (): void => {
        if (!isEnabled.value) return;
        if (isSizeRelative.value) radius.value = pointer.value!.clientWidth / 2;
        setLimits();
    };

    onResize(resize, { immediate: true });

    if (isSizeRelative.value) watch(() => pointer.value?.clientWidth, resize);

    return {
        mouse: { enter, leave, move },
        setLimits,
        location,
        limit,
        isEnabled,
        radius,
    };
};

export default usePointer;
