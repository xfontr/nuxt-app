import type { FullLocation, Location } from "~/types/Location";
import type { PointerOptions } from "~/types/Pointer";

const usePointer = <Pointer extends HTMLElement, Target extends HTMLElement>(
    pointer: Ref<Pointer | undefined>,
    target: Ref<Target | undefined>,
    options: PointerOptions,
) => {
    const { onResize } = useWindow();

    const limit = ref<FullLocation>({
        left: { x: 0, y: 0 },
        right: { x: 0, y: 0 },
    });

    const radius = ref<number>(options.size / 2);
    const isVisible = ref<boolean>(true); // renders on server
    const location = ref<Location>(options.start ?? ({} as Location));

    const isEnabled = computed<boolean>(
        () => !!target.value && !!pointer.value && options.enabled,
    );

    const isSizeRelative = computed<boolean>(() => options.unit !== "px");

    const actualSize = computed(() => target.value?.getBoundingClientRect());

    const togglePointerVisibility = (visible: boolean): void => {
        isVisible.value = options.alwaysVisible || visible;
    };

    const leave = (): void => togglePointerVisibility(false);
    const enter = (): void => togglePointerVisibility(true);

    const move = ({ x: mouseX, y: mouseY }: MouseEvent | Location): void => {
        if (!isEnabled.value) return;

        const { left, right } = limit.value;

        let x = mouseX - actualSize.value!.left;
        let y = mouseY - actualSize.value!.top;

        x = Math.max(left.x, Math.min(x, right.x));
        y = Math.max(left.y, Math.min(y, right.y));

        location.value = { x, y };
    };

    const setLimits = (): void => {
        const overflow = options.canOverflow ? 10 : 1;
        const { left, right } = limit.value;

        left.x = left.y = options.canOverflow ? 0 : radius.value;

        right.x = actualSize.value!.width - radius.value / overflow;
        right.y = actualSize.value!.height - radius.value / overflow;
    };

    const resize = (): void => {
        if (!isEnabled.value) return;
        if (isSizeRelative.value) radius.value = pointer.value!.clientWidth / 2;
        setLimits();
    };

    onResize(resize, { immediate: true });

    onMounted(() => {
        isVisible.value = options.alwaysVisible;

        location.value.x ??= random(0, actualSize.value!.width);
        location.value.y ??= random(0, actualSize.value!.height);
    });

    return {
        mouse: { enter, leave, move },
        location,
        radius,
        isEnabled,
        isVisible,
    };
};

export default usePointer;
