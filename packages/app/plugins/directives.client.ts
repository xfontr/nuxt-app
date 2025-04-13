import { vIntersect } from "@portfolio/ui";

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.directive("intersect", vIntersect);
});
