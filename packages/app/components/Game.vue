<script lang="ts" setup>
import { random, useWindow } from "@portfolio/ui";

const GAME_DATA = {
    physics: {
        gravity: 0.6,
        baseJumpStrength: -12,
        jumpStrength: -12,
        boostMultiplier: 1.5,
    },
    state: {
        velocityY: 0,
        jumpKeyHeld: false,
        isJumping: ref(false),
        gameSpeed: 2,
        boosted: false,
    },
    player: {
        x: 100,
        y: 0,
        size: 40,
    },
    layout: {
        floorPadding: 20,
        canvas: { width: 800, height: 400 },
        obstacleSpacing: 200,
        obstacleStartOffset: 300,
        obstacleThresholds: [40, 80, 120],
    },
    assets: {
        cloud: "img/game/cloud.png",
        bullet: "img/game/bullet.png",
    },
};

defineProps<{ width: number; height: number }>();

const thisWindow = useWindow();
const canvas = ref<HTMLCanvasElement>();
const assets = ref<
    Partial<Record<keyof typeof GAME_DATA.assets, HTMLImageElement | undefined>>
>({});

let obstacles: { x: number; y: number; width: number; height: number }[] = [];
let clouds: { x: number; y: number; scale: number }[] = [];

const handleJump = () => {
    if (!GAME_DATA.state.isJumping.value) {
        GAME_DATA.state.velocityY = GAME_DATA.physics.jumpStrength;
        GAME_DATA.state.isJumping.value = true;
    }
};

const restartGame = (H: number) => {
    GAME_DATA.player.y =
        H - GAME_DATA.player.size - GAME_DATA.layout.floorPadding;
    GAME_DATA.state.velocityY = 0;
    GAME_DATA.state.isJumping.value = false;
    GAME_DATA.state.gameSpeed = 2;
    GAME_DATA.physics.jumpStrength = GAME_DATA.physics.baseJumpStrength;
    GAME_DATA.state.boosted = false;

    obstacles.forEach((obstacle, i) => {
        obstacle.x =
            i * GAME_DATA.layout.obstacleSpacing +
            GAME_DATA.layout.obstacleStartOffset;
    });
};

const setupInputHandlers = () => {
    thisWindow.on<KeyboardEvent>("keydown", (_, event) => {
        event?.preventDefault();
        const { key } = event ?? {};

        if (key === "w" || key === "ArrowUp") {
            handleJump();
            GAME_DATA.state.jumpKeyHeld = true;
        }

        if ((key === "d" || key === "ArrowRight") && !GAME_DATA.state.boosted) {
            GAME_DATA.state.gameSpeed *= GAME_DATA.physics.boostMultiplier;
            GAME_DATA.state.boosted = true;
        }
    });

    thisWindow.on<KeyboardEvent>("keyup", (_, event) => {
        event?.preventDefault();
        const { key } = event ?? {};

        if ((key === "d" || key === "ArrowRight") && GAME_DATA.state.boosted) {
            GAME_DATA.state.gameSpeed /= GAME_DATA.physics.boostMultiplier;
            GAME_DATA.state.boosted = false;
        }

        if (key === "w" || key === "ArrowUp") {
            GAME_DATA.state.jumpKeyHeld = false;
        }
    });

    thisWindow.on("click", handleJump);
};

const initGame = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
    // Init player
    GAME_DATA.player.y =
        H - GAME_DATA.player.size - GAME_DATA.layout.floorPadding;

    // Init obstacles
    obstacles = Array.from({ length: 5 }, (_, i) => ({
        x:
            i * GAME_DATA.layout.obstacleSpacing +
            GAME_DATA.layout.obstacleStartOffset,
        y: H - GAME_DATA.layout.obstacleThresholds[random(0, 2)]!,
        width: 20,
        height: 20,
    }));

    // Init clouds
    clouds = Array.from({ length: 6 }, () => ({
        x: Math.random() * W,
        y: Math.random() * (H / 2),
        scale: 0.5 + Math.random() * 1.5,
    }));
};

const drawPlayer = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#ff4757";
    ctx.fillRect(
        GAME_DATA.player.x,
        GAME_DATA.player.y,
        GAME_DATA.player.size,
        GAME_DATA.player.size,
    );
};

const drawObstacles = (ctx: CanvasRenderingContext2D) => {
    // ctx.fillStyle = "#2ed573";
    obstacles.forEach((obstacle) => {
        // ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        ctx.drawImage(
            assets.value.bullet!,
            obstacle.x,
            obstacle.y,
            obstacle.width,
            obstacle.height,
        );
    });
};

const drawClouds = (ctx: CanvasRenderingContext2D) => {
    clouds.forEach((cloud) => {
        ctx.drawImage(
            assets.value.cloud!,
            cloud.x,
            cloud.y,
            60 * cloud.scale,
            40 * cloud.scale,
        );
    });
};

const updateGame = (W: number, H: number) => {
    // Update obstacles
    obstacles.forEach((obstacle) => {
        obstacle.x -= GAME_DATA.state.gameSpeed;
        if (obstacle.x + obstacle.width < 0)
            obstacle.x = W + Math.random() * 100;
    });

    // Update clouds
    clouds.forEach((cloud) => {
        cloud.x -= GAME_DATA.state.gameSpeed * 0.2;
        if (cloud.x + 60 * cloud.scale < 0) {
            cloud.x = W + Math.random() * 100;
            cloud.y = Math.random() * (H / 2);
        }
    });

    // Apply gravity
    GAME_DATA.player.y += GAME_DATA.state.velocityY;
    GAME_DATA.state.velocityY += GAME_DATA.state.jumpKeyHeld
        ? GAME_DATA.physics.gravity * 0.5
        : GAME_DATA.physics.gravity;

    // Ground check
    const groundY = H - GAME_DATA.player.size - GAME_DATA.layout.floorPadding;
    if (GAME_DATA.player.y >= groundY) {
        GAME_DATA.player.y = groundY;
        GAME_DATA.state.velocityY = 0;
        GAME_DATA.state.isJumping.value = false;
    }

    // Collision check
    for (const obstacle of obstacles) {
        const collisionX =
            GAME_DATA.player.x < obstacle.x + obstacle.width &&
            GAME_DATA.player.x + GAME_DATA.player.size > obstacle.x;

        const collisionY =
            GAME_DATA.player.y < obstacle.y + obstacle.height &&
            GAME_DATA.player.y + GAME_DATA.player.size > obstacle.y;

        if (collisionX && collisionY) {
            restartGame(H);
            return;
        }
    }
};

const buildAssets = () => {
    assets.value.cloud = new Image();
    assets.value.bullet = new Image();

    assets.value.cloud.src = GAME_DATA.assets.cloud;
    assets.value.bullet.src = GAME_DATA.assets.bullet;
};

onMounted(() => {
    if (!canvas.value) return;
    buildAssets();
    const ctx = canvas.value.getContext("2d")!;
    const W = canvas.value.width;
    const H = canvas.value.height;

    initGame(ctx, W, H);
    setupInputHandlers();

    const animate = () => {
        ctx.clearRect(0, 0, W, H);
        drawClouds(ctx);
        drawObstacles(ctx);
        drawPlayer(ctx);
        updateGame(W, H);
        requestAnimationFrame(animate);
    };

    animate();
});
</script>

<template>
    <canvas
        ref="canvas"
        :width="width"
        :height="height"
    />
</template>
