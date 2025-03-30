import type { Directive } from "vue";

export type CustomDirectiveBinding = {
    handler: (entry?: IntersectionObserverEntry) => void;
    options?: IntersectionObserverInit;
};

export type CustomDirective = Directive<Element, CustomDirectiveBinding>;
