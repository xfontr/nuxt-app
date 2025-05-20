<script lang="ts" setup>
import Matter from "matter-js";
import Tech from "./helpers/Tech";
import TechBody from "./helpers/TechBody";
import TechMouse from "./helpers/TechMouse";
import type { FullTech, TechItem } from "./types/Tech";
import TechBorder from "./helpers/TechBorder";

const { Render, Engine, Runner, Events } = Matter;

const matter = ref<HTMLDivElement>();
const techList = ref<FullTech[]>([]);
const render = ref<Matter.Render>();
const runner = ref<Matter.Runner>();
const techUpdatesCount = ref<number>(0);

const props = defineProps<{ tech: TechItem[]; isPaused: boolean }>();

const setUpRender = () => {
    render.value = Render.create({
        element: matter.value,
        engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            background: "transparent",
            wireframes: false,
        },
    });
};

const setUpBorders = (render: Matter.Render, engine: Matter.Engine) => {
    const borders = TechBorder(Matter);
    borders.render(render.canvas, engine.world);
};

const setUpMouse = (render: Matter.Render, engine: Matter.Engine) => {
    const mouse = TechMouse(Matter);

    mouse.mount(render.canvas, engine);
    mouse.render(render, engine.world);
};

const setUpTech = (
    render: Matter.Render,
    engine: Matter.Engine,
    newTech: TechItem[],
) => {
    newTech.forEach((item) => {
        const tech = Tech(TechBody(Matter), item, render);
        tech.mount(engine.world, techUpdatesCount.value);
        techList.value.push(tech);
    });
};

const engine = Engine.create();

onMounted(() => {
    setUpRender();

    if (!render.value) return;

    runner.value = Runner.create();
    runner.value.enabled = !props.isPaused;

    Render.run(render.value);
    Runner.run(runner.value, engine);

    setUpBorders(render.value, engine);
    setUpMouse(render.value, engine);

    const { width: x, height: y } = render.value.canvas;

    Render.lookAt(render.value, {
        min: { x: 0, y: 0 },
        max: { x, y },
    });

    Events.on(render.value, "afterRender", () => {
        techList.value.forEach(({ render }) => render());
    });

    onBeforeUnmount(() => {
        Render.stop(render.value!);
        Runner.stop(runner.value!);
    });
});

watch(
    () => props.tech,
    (tech) => {
        techUpdatesCount.value += 1;

        if (!render.value) return;

        setUpTech(render.value, engine, tech);
    },
);

watch(
    () => props.isPaused,
    (paused) => {
        if (!runner.value) return;
        runner.value.enabled = !paused;
    },
);
</script>

<template>
    <div
        ref="matter"
        class="matter"
    />
</template>

<style lang="scss" scoped>
.matter {
    position: absolute;
    width: 100%;
    height: auto;
    overflow: hidden;
}
</style>
