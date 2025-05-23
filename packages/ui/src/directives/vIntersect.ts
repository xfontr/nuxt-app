import type { DirectiveBinding } from "vue";
import type {
    CustomDirective,
    CustomDirectiveBinding,
} from "../types/CustomDirective";

const observers = new WeakMap<Element, IntersectionObserver>();

export const beforeMount = (
    element: Element,
    binding: DirectiveBinding<CustomDirectiveBinding>,
) => {
    const { handler, options } = binding.value ?? {};

    const observer = new IntersectionObserver((entries) => {
        const entry = entries.find(({ isIntersecting }) => isIntersecting);

        handler?.(entry);
    }, options ?? { threshold: 0.5 });

    observer.observe(element);
    observers.set(element, observer);
};

export const unmounted = (element: Element) => {
    const observer = observers.get(element);
    if (!observer) return;

    observer.disconnect();
    observers.delete(element);
};

const vIntersect: CustomDirective = { beforeMount, unmounted };

export default vIntersect;
