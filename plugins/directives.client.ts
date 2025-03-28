import vIntersect from "~/directives/vIntersect";

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.directive("intersect", vIntersect);
});
