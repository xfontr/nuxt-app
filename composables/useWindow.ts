const useWindow = () => {
    const onResizeCallbacks = new Set<(event: Event) => void>();

    const onResize = (callback: (event: Event) => void) => {
        onResizeCallbacks.add(callback);

        if (!import.meta.client) return;

        window.addEventListener("resize", callback);
    };

    onMounted(() => {
        onResizeCallbacks.forEach((callback) => {
            window.addEventListener("resize", callback);
        });
    });

    onUnmounted(() => {
        onResizeCallbacks.forEach((callback) => {
            window.removeEventListener("resize", callback);
        });

        onResizeCallbacks.clear();
    });

    return { onResize };
};

export default useWindow;
