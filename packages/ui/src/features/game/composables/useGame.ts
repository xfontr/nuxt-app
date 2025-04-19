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

const AVAILABLE_OBSTACLE_IMAGES = ["bug-1", "bug-2"];
const DISGUSTED_FACE_TIMER = 2000;
const DEATH_COOLDOWN = 500;

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
        laserLeft: game.laser.offset,
        laserReach: game.laser.minReach,
        gameSpeed: game.physics.baseSpeed,
        player: {
            x: game.player.offsetX,
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
    const canvas = useCanvas(canvasElement, assets);
    const bullets = useObstacle(state, game);
    const clouds = useClouds(state);

    thisWindow.on<KeyboardEvent>("keyup", (_, e) => keyUp(e));
    thisWindow.on<KeyboardEvent>("keydown", (_, e) => keyDown(e));

    const size = state.value.layout;

    const restartGame = () => {
        state.value.player.y =
            size.height - game.player.size - game.layout.floorPadding;
        state.value.velocityY = 0;
        state.value.isJumping = false;
        state.value.isColliding = false;
        state.value.laserLeft = game.laser.offset;
        state.value.gameSpeed = game.physics.baseSpeed;
        state.value.player.lives = game.player.lives;
        state.value.bugsKilled = 0;
        state.value.framesAlive = 0;
        game.physics.jumpStrength = game.physics.baseJumpStrength;

        bullets.reset();
    };

    const setup = () => {
        restartGame();
        state.value.player.y =
            size.height - game.player.size - game.layout.floorPadding;
        clouds.init();
        state.value.status = "ON";
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
        if (!lasers.laser.value) return;
        drawBeam(lasers.laser.value, canvas.ctx.value!);
    };

    const draw = (image: string, pool: CanvasDrawOptions[]) => {
        pool.forEach((option) => {
            canvas.draw.image(image, option);
        });
    };

    const updateGame = () => {
        if (state.value.status === "ON") bullets.update();
        clouds.update();
        if (state.value.status === "ON") lasers.update();

        // Check laser collisions

        bullets.list.value = bullets.list.value.filter((obstacle) => {
            const laserBeam = lasers.laser.value;
            if (!laserBeam) return true;

            // Laser ends at this world X position
            const laserEndX =
                state.value.player.x +
                game.player.size +
                state.value.layout.width * state.value.laserReach;

            const verticalHit =
                laserBeam.y < obstacle.y + obstacle.height &&
                laserBeam.y + laserBeam.height > obstacle.y;

            const horizontalHit = obstacle.x < laserEndX;

            const hit = verticalHit && horizontalHit;

            if (hit) {
                state.value.bugsKilled += 1;
            }

            return !hit;
        });

        // Apply gravity
        state.value.player.y += state.value.velocityY;
        state.value.velocityY += state.value.jumpKeyHeld
            ? game.physics.gravity * 0.5
            : game.physics.gravity;

        // Ground check
        const groundY =
            size.height - game.player.size - game.layout.floorPadding;
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
                if (!state.value.isColliding) {
                    state.value.player.lives -= 1;
                    state.value.isColliding = true;
                    state.value.player.image = "player-disgusted";

                    collisionTimeout.value ??= setTimeout(() => {
                        state.value.isColliding = false;
                        collisionTimeout.value = undefined;
                    }, DEATH_COOLDOWN);

                    disgustedTimeout.value ??= setTimeout(() => {
                        if (state.value.player.image === "player-disgusted") {
                            state.value.player.image = "player-neutral";
                        }
                        disgustedTimeout.value = undefined;
                    }, DISGUSTED_FACE_TIMER);

                    if (!state.value.player.lives) {
                        state.value.status = "IDLE";
                    }
                }
            }
        }
    };

    const obstacle = () =>
        AVAILABLE_OBSTACLE_IMAGES[
            random(0, AVAILABLE_OBSTACLE_IMAGES.length - 1)
        ];

    const animate = () => {
        if (state.value.status === "ON") state.value.framesAlive += 1;
        canvas.ctx.value!.clearRect(
            0,
            0,
            state.value.layout.width,
            state.value.layout.height,
        );
        draw(obstacle(), bullets.list.value);
        draw("cloud", clouds.list.value);
        drawPlayer();
        drawLasers();
        updateGame();
        requestAnimationFrame(animate);
    };

    return { setup, animate, state };
};

export default useGame;
