import type { CanvasDrawOptions } from "../types/Canvas";

export const drawBeam = (
    { x, y, width, height }: CanvasDrawOptions,
    ctx: CanvasRenderingContext2D,
) => {
    const originY = y + height / 2;

    const gradient = ctx.createRadialGradient(x, originY, 0, x, originY, 30);
    gradient.addColorStop(0, "rgba(255, 0, 0, 1)");
    gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, originY, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.filter = "blur(1.5px)";
    ctx.globalCompositeOperation = "lighter";

    // Outer beam glow
    ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
    ctx.fillRect(x - 2, y - 2, width + 4, height + 4);

    // Inner hot core
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillRect(x, y, width, height);

    ctx.filter = "none";
    ctx.globalCompositeOperation = "source-over";
};
