import { ref, type Ref } from "vue";
import type { Game, GameState } from "../types/Game";
import type { CanvasDrawOptions } from "../types/Canvas";

export const useLaser = (state: Ref<GameState>, game: Game) => {
    const lasers = ref<CanvasDrawOptions[]>([]);

    const shoot = () => {
        const { player } = state.value;
        const beamHeight = 2;
        const yOffset = game.player.size * 0.3; // eye level

        lasers.value.push({
            x: player.x + game.player.size - 10,
            y: player.y + yOffset,
            width: game.layout.canvas.width, // reaches to the end
            height: beamHeight,
            ttl: 10, // lasts 10 frames
        });

        state.value.player.image = "player-laser";
    };

    const update = () => {
        lasers.value = lasers.value
            .map((laser) => ({ ...laser, ttl: laser.ttl! - 1 }))
            .filter(({ ttl }) => ttl > 0);

        if (state.value.player.image === "player-laser" && !lasers.value.length)
            state.value.player.image = "player-neutral";
    };

    return {
        lasers,
        shoot,
        update,
    };
};
