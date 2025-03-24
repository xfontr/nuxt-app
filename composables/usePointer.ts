import type { FullLocation, Location } from "~/types/Location";
import type { PointerOptions } from "~/types/Pointer";

const usePointer = <Pointer extends HTMLElement, Target extends HTMLElement>(
    pointer: Ref<Pointer | undefined>,
    target: Ref<Target | undefined>,
    options: Required<PointerOptions>,
) => {
    const location = ref<Location>({
        x: options.start.x,
        y: options.start.y,
    });

    const limit = ref<FullLocation>({
        left: { x: 0, y: 0 },
        right: { x: 0, y: 0 },
    });

    const distanceToMiddle = ref<number>(options.size / 2);

    const isEnabled = computed<boolean>(
        () => !!target.value && !!pointer.value && options.enabled,
    );

    const leave = (): void => {
        if (options.alwaysVisible) return;
        pointer.value!.style.display = "none";
    };

    const enter = (): void => {
        if (options.alwaysVisible) return;
        pointer.value!.style.display = "block";
    };

    const move = ({ x: mouseX, y: mouseY }: MouseEvent): void => {
        if (!isEnabled.value) return;

        const rect = target.value!.getBoundingClientRect();
        const x = mouseX - rect.left;
        const y = mouseY - rect.top;

        location.value = { x, y };

        if (x <= limit.value.left.x) location.value.x = limit.value.left.x;
        if (y <= limit.value.left.y) location.value.y = limit.value.left.y;

        if (x >= limit.value.right.x) location.value.x = limit.value.right.x;
        if (y >= limit.value.right.y) location.value.y = limit.value.right.y;
    };

    const setLimits = (): void => {
        if (!isEnabled.value) return;

        const { width, height } = target.value!.getBoundingClientRect();

        limit.value.left.y = limit.value.left.x = options.canOverflow
            ? -distanceToMiddle.value
            : distanceToMiddle.value;

        limit.value.right.x =
            width - distanceToMiddle.value / (options.canOverflow ? 10 : 1);
        limit.value.right.y =
            height - distanceToMiddle.value / (options.canOverflow ? 10 : 1);
    };

    return {
        mouse: { enter, leave, move },
        setLimits,
        location,
        limit,
        isEnabled,
        distanceToMiddle,
    };
};

export default usePointer;
