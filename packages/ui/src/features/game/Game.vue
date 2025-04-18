<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { Game, GameState } from "./types/Game";
import useCanvas from "./composables/useCanvas";
import useObstacle from "./composables/useObstacle";
import useWindow from "../../composables/useWindow";
import type { CanvasDrawOptions } from "./types/Canvas";
import type { Asset } from "./types/Asset";
import useUserActions from "./composables/useUserActions";
import { useLaser } from "./composables/useLaser";
import { drawBeam } from "./utils/beam";

const props = defineProps<{ game: Game; assets: Asset[] }>();

const game = props.game;
const { height, width } = game.layout.canvas;

const state = ref<GameState>({
    velocityY: 0,
    jumpKeyHeld: false,
    isJumping: false,
    isLasering: false,
    gameSpeed: game.physics.baseSpeed,
    boosted: false,
    player: {
        x: 100,
        y: 0,
        image: "player-neutral",
    },
});

const canvasElement = ref<HTMLCanvasElement>();

const thisWindow = useWindow();
const lasers = useLaser(state, game);
const { keyDown, keyUp } = useUserActions(state, game, lasers.shoot);
const canvas = useCanvas(canvasElement, props.assets);
const bullets = useObstacle(game, state, { amount: 10 });
const clouds = useObstacle(game, state, {
    speedMultiplier: 0.2,
    amount: 10,
    canScale: true,
    width: 60,
    height: 40,
});

thisWindow.on<KeyboardEvent>("keyup", (_, e) => keyUp(e));
thisWindow.on<KeyboardEvent>("keydown", (_, e) => keyDown(e));

const restartGame = () => {
    state.value.player.y = height - game.player.size - game.layout.floorPadding;
    state.value.velocityY = 0;
    state.value.isJumping = false;
    state.value.gameSpeed = game.physics.baseSpeed;
    game.physics.jumpStrength = game.physics.baseJumpStrength;
    state.value.boosted = false;

    bullets.reset();
};

const setup = () => {
    state.value.player.y = height - game.player.size - game.layout.floorPadding;

    clouds.list.value = clouds.list.value.map((cloud) => ({
        ...cloud,
        x: Math.random() * width,
        y: Math.random() * (height / 2),
    }));
};

const drawPlayer = () => {
    canvas.draw.image(state.value.player.image, {
        x: state.value.player.x,
        y: state.value.player.y,
        width: game.player.size,
        height: game.player.size,
    });
};

const drawLasers = () => {
    lasers.lasers.value.forEach((beam) => {
        drawBeam(beam, canvas.ctx.value!);
    });
};

const draw = (image: string, pool: CanvasDrawOptions[]) => {
    pool.forEach((option) => {
        canvas.draw.image(image, option);
    });
};

const updateGame = () => {
    bullets.update();
    clouds.update();
    lasers.update();

    // Check laser collisions
    for (const laser of lasers.lasers.value) {
        bullets.list.value = bullets.list.value.filter((obstacle) => {
            const hit =
                laser.y < obstacle.y + obstacle.height &&
                laser.y + laser.height > obstacle.y &&
                laser.x < obstacle.x + obstacle.width;
            return !hit;
        });
    }

    // Apply gravity
    state.value.player.y += state.value.velocityY;
    state.value.velocityY += state.value.jumpKeyHeld
        ? game.physics.gravity * 0.5
        : game.physics.gravity;

    // Ground check
    const groundY = height - game.player.size - game.layout.floorPadding;
    if (state.value.player.y >= groundY) {
        state.value.player.y = groundY;
        state.value.velocityY = 0;
        state.value.isJumping = false;
    }

    // Collision check
    for (const obstacle of bullets.list.value) {
        const collisionX =
            state.value.player.x < obstacle.x + obstacle.width &&
            state.value.player.x + game.player.size > obstacle.x;

        const collisionY =
            state.value.player.y < obstacle.y + obstacle.height &&
            state.value.player.y + game.player.size > obstacle.y;

        if (collisionX && collisionY) {
            restartGame();
            return;
        }
    }
};
const animate = () => {
    canvas.ctx.value!.clearRect(0, 0, width, height);
    draw("bullet", bullets.list.value);
    draw("cloud", clouds.list.value);
    drawPlayer();
    drawLasers();
    updateGame();
    requestAnimationFrame(animate);
};

onMounted(() => {
    if (!canvasElement.value) return;

    setup();
    animate();
});
</script>

<template>
    <canvas
        ref="canvasElement"
        :width="width"
        :height="height"
    />
</template>
