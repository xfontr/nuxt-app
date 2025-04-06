import { nextTick } from "vue";
import useCooldown from "../useCooldown";
import { mountComposable } from "../../test-utils/composables";

vi.useFakeTimers();

describe("useCooldown composable", () => {
    it("should call only the first action", () => {
        const first = vi.fn();
        const second = vi.fn();
        const third = vi.fn();

        const queuedActions = [first, second, third];
        const { cooldown } = useCooldown();

        queuedActions.forEach((action) => cooldown(action as () => void, 0));

        vi.advanceTimersByTime(0);

        expect(first).toHaveBeenCalled();
        expect(second).not.toHaveBeenCalled();
        expect(third).not.toHaveBeenCalled();
    });

    it("should reset and allow another action after cooldown", async () => {
        const action = vi.fn();
        const { cooldown } = useCooldown();

        cooldown(action, 100);
        expect(action).not.toHaveBeenCalled();

        vi.advanceTimersByTime(100);
        expect(action).toHaveBeenCalled();
        await nextTick();

        cooldown(action, 100);
        vi.advanceTimersByTime(100);
        await nextTick();

        expect(action).toHaveBeenCalledTimes(2);
    });

    it("should not call the callback before cooldown ends", () => {
        const action = vi.fn();
        const { cooldown } = useCooldown();

        cooldown(action, 200);
        expect(action).not.toHaveBeenCalled();

        vi.advanceTimersByTime(199);
        expect(action).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1);
        expect(action).toHaveBeenCalled();
    });

    it("should clean up on scope dispose", () => {
        const action = vi.fn();

        const wrapper = mountComposable(() => {
            const { cooldown } = useCooldown();
            cooldown(action, 100);
        });

        vi.advanceTimersByTime(50);

        expect(action).not.toHaveBeenCalled();

        wrapper.unmount();

        vi.advanceTimersByTime(100);

        expect(action).not.toHaveBeenCalled();
    });
});
