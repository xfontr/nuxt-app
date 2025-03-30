import type { FullLocation, Location } from "~/types/Location";
import type { PointerOptions } from "~/types/Pointer";

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

    const isEnabled = computed<boolean>(
        () => !!target.value && !!pointer.value && options.enabled,
    );

    const isSizeRelative = computed<boolean>(() => options.unit !== "px");

    const togglePointerVisibility = (visible: boolean): void => {
        isVisible.value = options.alwaysVisible || visible;
    };

    const leave = (): void => togglePointerVisibility(false);
    const enter = (): void => togglePointerVisibility(true);

    const targetRect = computed(() => target.value!.getBoundingClientRect());

    const move = (
        { x: clientX, y: clientY }: MouseEvent | Location,
        isMouse: boolean,
    ): void => {
        if (!isEnabled.value) return;

        const { left, right } = limit.value;

        let x = isMouse ? clientX - targetRect.value.left : clientX;
        let y = isMouse ? clientY - targetRect.value.top : clientY;

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
        if (!isEnabled.value) return;
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
        isEnabled,
        isVisible,
    };
};

export default usePointer;
