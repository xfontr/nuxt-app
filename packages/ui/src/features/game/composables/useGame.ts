import { ref, type Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import { useLaser } from "./useLaser";
import useUserActions from "./useUserActions";
import useCanvas from "./useCanvas";
import useObstacle from "./useObstacle";
import useBackground from "./useBackground";
import type { Asset } from "../types";
import type { CanvasDrawOptions } from "../types/Canvas";
import { drawBeam } from "../utils/beam";
import { useWindow } from "../../../composables";
import { getInitialState, restartState } from "../utils/game";

const FACE_TIMER = 2000;
const COLLISION_COOLDOWN = 500;

const useGame = (
    game: Game,
    assets: Asset[],
    canvasElement: Ref<HTMLCanvasElement | undefined>,
) => {
    const collisionTimeout = ref();
    const disgustedTimeout = ref();
    const state = ref<GameState>(getInitialState(game));

    const thisWindow = useWindow();
    const lasers = useLaser(state, game);
    const { keyDown, keyUp, touchDown, touchUp } = useUserActions(state, game);
    const canvas = useCanvas(state, canvasElement, assets);
    const bugs = useObstacle(state, game);
    const background = useBackground(state);

    thisWindow.on<KeyboardEvent>("keyup", (_, e) => keyUp(e));
    thisWindow.on<KeyboardEvent>("keydown", (_, e) => keyDown(e));
    thisWindow.on("touchstart", touchDown);
    thisWindow.on("touchend", touchUp);

    const groundY = () => state.value.layout.height - game.player.size;

    const restartGame = () => {
        state.value = restartState(game, state.value);
        bugs.reset();
    };

    const setup = () => {
        state.value.player.y = groundY();
        background.init();
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

        bugs.list.value = bugs.list.value.filter(({ y, x, height, width }) => {
            const laserStart = state.value.player.x + game.player.size;
            const laserEnd = laserStart + laser.width;

            const yHit = laser.y < y + height && laser.y + laser.height > y;
            const xHit = x < laserEnd && x + width > laserStart;

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

            state.value.status = "OVER";
            restartGame();
        }
    };

    const updateGame = () => {
        background.update();

        if (state.value.isSpawning) return spawnPlayer();
        if (!state.value.isSpawning && state.value.status === "LOADING") {
            state.value.status = "IDLE";
        }

        if (state.value.status !== "ON") return;

        bugs.update();
        lasers.update();
        handleLaserHits();
        applyGravity();
        handleCollisions();
    };

    const drawBackground = () => {
        background.list.value.forEach((item) => {
            if (item.isCircle) {
                canvas.ctx.value!.beginPath();
                canvas.ctx.value!.arc(
                    item.x + item.width / 2,
                    item.y + item.height / 2,
                    item.width / 2,
                    0,
                    Math.PI * 2,
                );
                canvas.ctx.value!.fillStyle = "white";
                canvas.ctx.value!.fill();
            } else {
                canvas.draw.image(item);
            }
        });
    };

    const drawScene = () => {
        canvas.reset();

        drawBackground();
        drawBugs();
        drawPlayer();
        drawLasers();
    };

    const drawPlayer = () => {
        const { player, frameCount, isColliding } = state.value;
        if (isColliding && frameCount % 4 === 0) return;

        canvas.draw.image({
            image: player.image,
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

    const drawBugs = () => {
        bugs.list.value.forEach(canvas.draw.image);
    };

    const updateFrameCount = () => {
        if (state.value.status !== "ON") return;

        state.value.frameCount += 1;

        if (state.value.gameSpeed === game.physics.baseSpeed) {
            state.value.distanceCount += 3;
            return;
        }

        state.value.distanceCount +=
            state.value.gameSpeed > game.physics.baseSpeed ? 4 : 2;
    };

    const animate = () => {
        updateFrameCount();
        drawScene();
        updateGame();
        requestAnimationFrame(animate);
    };

    return { setup, animate, state };
};

export default useGame;
