import { onMounted, onUnmounted } from "vue";
import { mountComposable } from "../composables";

const onMountCallback = vi.fn();
const onUnMountCallback = vi.fn();

const useMock = () => {
    onMounted(onMountCallback);
    onUnmounted(onUnMountCallback);
};

describe("mountComposable function", () => {
    it("should call the mount and unmount functions", () => {
        const wrapper = mountComposable(useMock);

        expect(onMountCallback).toHaveBeenCalledTimes(1);

        wrapper.unmount();

        expect(onUnMountCallback).toHaveBeenCalledTimes(1);
    });
});
