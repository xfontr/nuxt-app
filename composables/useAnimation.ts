import type { Count } from "~/types/Count";
import type { Location } from "~/types/Location";
import type { Ranges } from "~/types/Ranges";

const useAnimation = <T extends HTMLElement>(
    pointer: Ref<T | undefined>,
    ranges?: Ranges,
) => {
    const direction = ref<Location>({ x: 0, y: 0 });
    const location = ref<Location>({ x: 0, y: 0 });
    const count = ref<Count>({ long: 0, short: 0 });
    const animationId = ref<number>();
    const callback = ref<(location: Location) => void>();

    const updateDirection = (): void => {
        direction.value = randomizeDirection();
        count.value = getUpdatedCount(count.value, ranges);
    };

    const getRealLocation = (): Location => {
        const { left, top } = pointer.value?.getBoundingClientRect() ?? {};
        return { x: left ?? 0, y: top ?? 0 };
    };

    const runCallback = async (): Promise<void> => {
        callback.value?.({ ...location.value });
        await nextTick();
    };

    const moveLocation = (forward?: boolean): void => {
        if (!forward) {
            location.value.x -= direction.value.x;
            location.value.y -= direction.value.y;
            count.value.short -= 1;
            return;
        }

        location.value.x += direction.value.x;
        location.value.y += direction.value.y;
        count.value.short += 1;
    };

    const animation = async () => {
        if (count.value.short <= 0) updateDirection();

        moveLocation();

        const lastRealLocation = getRealLocation();
        await runCallback();
        const currentLocation = getRealLocation();

        if (areLocationsEqual(lastRealLocation, currentLocation)) {
            moveLocation(false);
            updateDirection();
        }

        animationId.value = requestAnimationFrame(animation);
    };

    const stop = (): void => {
        if (animationId.value === undefined) return;
        cancelAnimationFrame(animationId.value);
    };

    const init = (start?: Location): void => {
        if (!import.meta.client) return;
        stop();
        location.value = start ?? location.value;
        animationId.value = requestAnimationFrame(animation);
    };

    const animate = (newCallback: (location: Location) => void): void => {
        callback.value = newCallback;
        init();
    };

    onUnmounted(stop);

    return { animate, init, stop };
};

export default useAnimation;
