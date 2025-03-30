import type { OnEventOptions } from "~/types/Window";

type Callback = (window: Window, event?: Event) => void;
type EventCallback = (event?: Event) => void;

const useWindow = () => {
    const onEventCallbacks = new Set<{
        event: string;
        callback: EventCallback;
    }>();
    const immediateCallbacks = new Set<EventCallback>();
    const mounted = ref<boolean>(false);

    const on = (
        event: keyof WindowEventMap,
        callback: Callback,
        options?: OnEventOptions,
    ) => {
        const fullCallback: EventCallback = (event?: Event) => {
            callback(window, event);
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
