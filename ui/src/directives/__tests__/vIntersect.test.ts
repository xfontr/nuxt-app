import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { beforeMount, unmounted } from "../vIntersect";
import type { DirectiveBinding } from "vue";
import type { CustomDirectiveBinding } from "../../types/CustomDirective";

const mockElement = document.createElement("div");
const observeSpy = vi.fn();
const disconnectSpy = vi.fn();

beforeEach(() => {
    globalThis.IntersectionObserver = Object.assign(
        vi.fn(() => ({
            observe: observeSpy,
            disconnect: disconnectSpy,
        })),
        { prototype: {} },
    ) as unknown as typeof IntersectionObserver;
});

describe("vIntersect directive", () => {
    it("should create an observer and attach it to the element", () => {
        const binding: CustomDirectiveBinding = { handler: vi.fn() };

        beforeMount(mockElement, {
            value: binding,
        } as unknown as DirectiveBinding<CustomDirectiveBinding>);

        expect(globalThis.IntersectionObserver).toHaveBeenCalledOnce();
        expect(observeSpy).toHaveBeenCalledWith(mockElement);
    });

    it("should remove the observer when unmounted", () => {
        const binding: CustomDirectiveBinding = { handler: vi.fn() };

        beforeMount(mockElement, {
            value: binding,
        } as unknown as DirectiveBinding<CustomDirectiveBinding>);
        unmounted(mockElement);

        expect(disconnectSpy).toHaveBeenCalledOnce();
    });

    it("should trigger handler when element intersects", () => {
        const handler = vi.fn();
        const binding: CustomDirectiveBinding = { handler };

        beforeMount(mockElement, {
            value: binding,
        } as unknown as DirectiveBinding<CustomDirectiveBinding>);

        const callback = (globalThis.IntersectionObserver as Mock).mock
            .calls[0][0];
        const entry = { isIntersecting: true } as IntersectionObserverEntry;

        callback([entry]);

        expect(handler).toHaveBeenCalledWith(entry);
    });
});
