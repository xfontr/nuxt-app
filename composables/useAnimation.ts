import type { Count } from "~/types/Count";
import type { Location } from "~/types/Location";
import type { Ranges } from "~/types/Ranges";

// TODO: Bug that happens that if not on top of screen, pointer only works at the top of its container. I'm trying to use the
// diff - delta - between the parent and the target current location to fix this. I'm not sure if it's the best approach.
const useAnimation = <T extends HTMLElement>(
    pointer: Ref<T | undefined>,
    ranges?: Ranges,
) => {
    const direction = ref<Location>({ x: 0, y: 0 });
    const location = ref<Location>({ x: 0, y: 0 });
    const delta = ref<Location>({ x: 0, y: 0 });
    const count = ref<Count>({ long: 0, short: 0 });
    const animationId = ref<number>();
    const callback = ref<(location: Location, ...args: any[]) => void>();

    const updateDirection = (): void => {
        direction.value = randomizeDirection();
        count.value = getUpdatedCount(count.value, ranges);
    };

    const getRealLocation = (): Location => ({
        x: pointer.value?.offsetLeft ?? 0,
        y: pointer.value?.offsetTop ?? 0,
    });

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

    const animation = async (): Promise<void> => {
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

    const init = async (start?: Location): Promise<void> => {
        if (!import.meta.client) return;

        stop();

        delta.value.x = start ? start?.x - location.value.x : 0;
        delta.value.y = start ? start?.y - location.value.y : 0;

        location.value = start ?? location.value;

        await runCallback();

        animationId.value = requestAnimationFrame(animation);
    };

    const set = <T>(
        newCallback: (location: Location, ...args: T[]) => void,
    ): void => {
        callback.value = newCallback;
    };

    onUnmounted(stop);

    return { set, init, stop };
};

export default useAnimation;
