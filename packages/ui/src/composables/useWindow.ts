import { onMounted, onUnmounted, ref } from "vue";
import type { OnEventOptions } from "../types/Window";

type Callback<EventType extends Event> = (
    window: Window,
    event?: EventType,
) => void;
type EventCallback = (event?: Event) => void;

const useWindow = () => {
    const onEventCallbacks = new Set<{
        event: string;
        callback: EventCallback;
    }>();
    const immediateCallbacks = new Set<EventCallback>();
    const mounted = ref<boolean>(false);

    const on = <EventType extends Event>(
        event: keyof WindowEventMap,
        callback: Callback<EventType>,
        options?: OnEventOptions,
    ) => {
        const fullCallback: EventCallback = (event?: Event) => {
            callback(window, event as EventType);
        };

        onEventCallbacks.add({ event, callback: fullCallback });

        if (options?.immediate) immediateCallbacks.add(fullCallback);

        if (mounted.value)
            window.addEventListener(event.toLocaleLowerCase(), fullCallback);
    };

    onMounted(() => {
        mounted.value = true;

        onEventCallbacks.forEach(({ event, callback }) => {
            window.addEventListener(event, callback);
        });

        immediateCallbacks.forEach((callback) => {
            callback();
        });

        immediateCallbacks.clear();
    });

    onUnmounted(() => {
        onEventCallbacks.forEach(({ event, callback }) => {
            window.removeEventListener(event.toLocaleLowerCase(), callback);
        });

        onEventCallbacks.clear();
    });

    return { on };
};

export default useWindow;
