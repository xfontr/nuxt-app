import { mountComposable } from "~/test-utils/composables";

const RESIZE_EVENT = new Event("resize");

describe("useWindow composable", () => {
    it("should register and call onResize callbacks on window resize", () => {
        const callback = vi.fn();

        mountComposable(() => {
            useWindow().onResize(callback);
        });

        window.dispatchEvent(RESIZE_EVENT);

        expect(callback).toHaveBeenCalled();
    });

    it("should clean up event listeners on unmount", () => {
        const callback = vi.fn();

        const wrapper = mountComposable(() => {
            useWindow().onResize(callback);
        });

        wrapper.unmount();

        window.dispatchEvent(RESIZE_EVENT);

        expect(callback).not.toHaveBeenCalled();
    });
});
