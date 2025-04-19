import { ref, type Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import { useLaser } from "./useLaser";
import useUserActions from "./useUserActions";
import useCanvas from "./useCanvas";
import useObstacle from "./useObstacle";
import useClouds from "../../../composables/useClouds";
import type { Asset } from "../types";
import type { CanvasDrawOptions } from "../types/Canvas";
import { drawBeam } from "../utils/beam";
import { random } from "../../../utils";
import { useWindow } from "../../../composables";

const OBSTACLE_IMAGES = ["bug-1", "bug-2"];
const FACE_TIMER = 2000;
const COLLISION_COOLDOWN = 500;

const useGame = (
    game: Game,
    assets: Asset[],
    canvasElement: Ref<HTMLCanvasElement | undefined>,
) => {
    const collisionTimeout = ref();
    const disgustedTimeout = ref();
    const state = ref<GameState>({
        status: "IDLE",
        velocityY: 0,
        jumpKeyHeld: false,
        isJumping: false,
        isLasering: false,
        isColliding: false,
        isSpawning: true,
        laserLeft: game.laser.offset,
        laserReach: game.laser.minReach,
        gameSpeed: game.physics.baseSpeed,
        player: {
            offsetX: 0,
            x: 0,
            y: 0,
            image: "player-neutral",
            lives: game.player.lives,
        },
        framesAlive: 0,
        bugsKilled: 0,
        layout: {
            width: 0,
            height: 0,
        },
    });

    const thisWindow = useWindow();
    const lasers = useLaser(state, game);
    const { keyDown, keyUp } = useUserActions(state, game);
    const canvas = useCanvas(state, canvasElement, assets);
    const bugs = useObstacle(state, game);
    const clouds = useClouds(state);

    thisWindow.on<KeyboardEvent>("keyup", (_, e) => keyUp(e));
    thisWindow.on<KeyboardEvent>("keydown", (_, e) => keyDown(e));

    const groundY = () =>
        state.value.layout.height - game.player.size - game.layout.floorPadding;

    const restartGame = () => {
        Object.assign(state.value, {
            player: {
                ...state.value.player,
                x: 0,
                y: groundY(),
                image: "player-neutral",
                lives: game.player.lives,
            },
            velocityY: 0,
            isJumping: false,
            isColliding: false,
            laserLeft: game.laser.offset,
            gameSpeed: game.physics.baseSpeed,
            bugsKilled: 0,
            framesAlive: 0,
        });

        game.physics.jumpStrength = game.physics.baseJumpStrength;
        bugs.reset();
    };

    const setup = () => {
        restartGame();
        clouds.init();
        state.value.status = "ON";
    };

    const spawnPlayer = () => {
        const { player } = state.value;

        if (player.x < player.offsetX) {
            player.x += state.value.gameSpeed;
            return;
        }

        player.x = player.offsetX;
        state.value.isSpawning = false;
    };

    const applyGravity = () => {
        const gravity = game.physics.gravity;
        const velocity = state.value.jumpKeyHeld ? gravity * 0.5 : gravity;

        state.value.player.y += state.value.velocityY;
        state.value.velocityY += velocity;

        if (state.value.player.y >= groundY()) {
            state.value.player.y = groundY();
            state.value.velocityY = 0;
            state.value.isJumping = false;
        }
    };

    const handleLaserHits = () => {
        const laser = lasers.laser.value;
        if (!laser) return;

        bugs.list.value = bugs.list.value.filter(({ y, x, height }) => {
            const laserEnd =
                state.value.player.x + game.player.size + laser.width;

            const yHit = laser.y < y + height && laser.y + laser.height > y;
            const xHit = x < laserEnd;

            const hit = yHit && xHit;

            if (hit) state.value.bugsKilled += 1;

            return !hit;
        });
    };

    const checkCollision =
        (x: number, y: number, size: number) => (obstacle: CanvasDrawOptions) =>
            x < obstacle.x + obstacle.width &&
            x + size > obstacle.x &&
            y < obstacle.y + obstacle.height &&
            y + size > obstacle.y;

    const resetStatePostCollision = () => {
        collisionTimeout.value ??= setTimeout(() => {
            state.value.isColliding = false;
            collisionTimeout.value = undefined;
        }, COLLISION_COOLDOWN);

        disgustedTimeout.value ??= setTimeout(() => {
            disgustedTimeout.value = undefined;

            if (state.value.player.image !== "player-disgusted") return;
            state.value.player.image = "player-neutral";
        }, FACE_TIMER);
    };

    const handleCollisions = () => {
        const { x, y } = state.value.player;
        const { size } = game.player;

        const isColliding = checkCollision(x, y, size);

        for (const obstacle of bugs.list.value) {
            if (!isColliding(obstacle) || state.value.isColliding) continue;

            state.value.player.lives -= 1;
            state.value.isColliding = true;
            state.value.player.image = "player-disgusted";

            resetStatePostCollision();

            if (state.value.player.lives > 0) return;

            state.value.status = "IDLE";
        }
    };

    const updateGame = () => {
        if (state.value.isSpawning) return spawnPlayer();
        if (state.value.status !== "ON") return;

        bugs.update();
        clouds.update();
        lasers.update();
        handleLaserHits();
        applyGravity();
        handleCollisions();
    };

    const drawScene = () => {
        canvas.reset();
        draw("cloud", clouds.list.value);
        draw(randomObstacleImage(), bugs.list.value);
        drawPlayer();
        drawLasers();
    };

    const drawPlayer = () => {
        const { player, framesAlive, isColliding } = state.value;
        if (isColliding && framesAlive % 2 === 0) return;

        canvas.draw.image(player.image, {
            x: player.x,
            y: player.y,
            width: game.player.size,
            height: game.player.size,
        });
    };

    const drawLasers = () => {
        if (!lasers.laser.value) return;
        drawBeam(lasers.laser.value, canvas.ctx.value!);
    };

    const draw = (image: string, pool: CanvasDrawOptions[]) => {
        pool.forEach((option) => canvas.draw.image(image, option));
    };

    const randomObstacleImage = () =>
        OBSTACLE_IMAGES[random(0, OBSTACLE_IMAGES.length - 1)];

    const animate = () => {
        if (state.value.status === "ON") state.value.framesAlive++;
        drawScene();
        updateGame();
        requestAnimationFrame(animate);
    };

    return { setup, animate, state };
};

export default useGame;
