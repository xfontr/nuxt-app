import type { OnResizeOptions } from "~/types/Window";

type Callback = (event?: Event) => void;

const useWindow = () => {
    const onResizeCallbacks = new Set<Callback>();
    const immediateCallbacks = new Set<Callback>();

    const onResize = (callback: Callback, options?: OnResizeOptions) => {
        onResizeCallbacks.add(callback);

        if (options?.immediate) immediateCallbacks.add(callback);
        if (!import.meta.client) return;

        window.addEventListener("resize", callback);
    };

    onMounted(() => {
        onResizeCallbacks.forEach((callback) => {
            window.addEventListener("resize", callback);
        });

        immediateCallbacks.forEach((callback) => {
            callback();
        });
    });

    onUnmounted(() => {
        onResizeCallbacks.forEach((callback) => {
            window.removeEventListener("resize", callback);
        });

        onResizeCallbacks.clear();
        immediateCallbacks.clear();
    });

    return { onResize };
};

export default useWindow;
