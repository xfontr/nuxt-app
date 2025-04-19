import { ref, type Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import { useWindow } from "../../../composables";
import { useLaser } from "./useLaser";
import useUserActions from "./useUserActions";
import useCanvas from "./useCanvas";
import useObstacle from "./useObstacle";
import useClouds from "../../../composables/useClouds";
import type { Asset } from "../types";
import type { CanvasDrawOptions } from "../types/Canvas";
import { drawBeam } from "../utils/beam";

const useGame = (
    game: Game,
    assets: Asset[],
    canvasElement: Ref<HTMLCanvasElement | undefined>,
) => {
    const state = ref<GameState>({
        velocityY: 0,
        jumpKeyHeld: false,
        isJumping: false,
        isLasering: false,
        laserLeft: game.laser.offset,
        laserReach: game.laser.minReach,
        gameSpeed: game.physics.baseSpeed,
        boosted: false,
        player: {
            x: game.player.offsetX,
            y: 0,
            image: "player-neutral",
        },
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
        state.value.laserLeft = game.laser.offset;
        state.value.gameSpeed = game.physics.baseSpeed;
        game.physics.jumpStrength = game.physics.baseJumpStrength;
        state.value.boosted = false;

        bullets.reset();
    };

    const setup = () => {
        state.value.player.y =
            size.height - game.player.size - game.layout.floorPadding;
        clouds.init();
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
        bullets.update();
        clouds.update();
        lasers.update();

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
                restartGame();
                return;
            }
        }
    };
    const animate = () => {
        canvas.ctx.value!.clearRect(
            0,
            0,
            state.value.layout.width,
            state.value.layout.height,
        );
        draw("bullet", bullets.list.value);
        draw("cloud", clouds.list.value);
        drawPlayer();
        drawLasers();
        updateGame();
        requestAnimationFrame(animate);
    };

    return { setup, animate, state };
};

export default useGame;
