const useCanvas = () => {
    const canvas = ref<HTMLCanvasElement>();
    const ctx = ref<CanvasRenderingContext2D>();

    const drawImage = (
        image: HTMLImageElement,
        options: {
            x: number;
            y: number;
            width: number;
            height: number;
        },
    ) => {
        ctx.value!.drawImage(
            image,
            options.x,
            options.y,
            options.width,
            options.height,
        );
    };

    onMounted(() => {
        if (!canvas.value) return;
        const ctx = canvas.value.getContext("2d");
    });

    return {
        draw: { image: drawImage },
    };
};

export default useCanvas;
