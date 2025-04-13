import { mountComposable } from "../../test-utils/composables";
import useWindow from "../useWindow";

const RESIZE_EVENT = new Event("resize");

describe("useWindow composable", () => {
    it("should register and call onResize callbacks on window resize", () => {
        const callback = vi.fn();

        mountComposable(() => {
            useWindow().on("resize", callback);
        });

        window.dispatchEvent(RESIZE_EVENT);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should immediately run the callback, and once again after mount", () => {
        const callback = vi.fn();

        mountComposable(() => {
            useWindow().on("resize", callback, { immediate: true });
            expect(callback).not.toHaveBeenCalled();
        });

        window.dispatchEvent(RESIZE_EVENT);

        expect(callback).toHaveBeenCalledTimes(2);
    });

    it("should clean up event listeners on unmount", () => {
        const callback = vi.fn();

        const wrapper = mountComposable(() => {
            useWindow().on("resize", callback);
        });

        wrapper.unmount();

        window.dispatchEvent(RESIZE_EVENT);

        expect(callback).not.toHaveBeenCalled();
    });

    it("should forward the window object to the callback", () => {
        const callback = vi.fn();

        mountComposable(() => {
            useWindow().on("resize", callback);
        });

        window.dispatchEvent(RESIZE_EVENT);

        expect(callback).toHaveBeenCalledWith(window, expect.any(Event));
    });

    it("should forward the window object to the callback when immediate option is true", () => {
        const callback = vi.fn();

        mountComposable(() => {
            useWindow().on("resize", callback, { immediate: true });
        });

        expect(callback).toHaveBeenCalledWith(window, undefined);
    });
});
