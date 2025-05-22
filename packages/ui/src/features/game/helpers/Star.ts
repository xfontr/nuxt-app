import { random } from "../../../utils";
import type {
    BackgroundFactory,
    BackgroundItem,
    BackgroundMethods,
} from "../types/Background";
import createBackgroundItem from "../utils/background";

export const Star: BackgroundFactory = (options, container, list) => {
    const init = () => {
        list.value = Array.from({ length: options.density }, () => {
            const size = random(2, 5);
            return {
                x: random(0, container.width),
                y: random(0, container.height),
                width: size,
                height: size,
                speedMultiplier: 0.5 + Math.random() * 3.5,
                offsetX: 0,
                offsetY: 0,
                scale: 1,
            } satisfies BackgroundItem;
        });
    };

    const update: BackgroundMethods["update"] = (state) => {
        list.value.forEach((star) => {
            const speed = state.value.gameSpeed * star.speedMultiplier;

            star.y += speed;
            star.x += speed * 0.5;

            if (star.y <= container.height || star.x <= container.width) return;

            const fromLeft = random(0, 12) < 4;

            if (fromLeft) {
                star.x = (-container.width / 4) * (Math.random() + 1);
                star.y = random(0, container.height / 2);
                return;
            }

            star.x = random(-400, container.width - 400);
            star.y = -star.height;
        });
    };

    return {
        init,
        update,
        reset: init,
    };
};

export default createBackgroundItem(
    { cycle: "NIGHT", status: ["ON"], isCircle: true },
    Star,
);
