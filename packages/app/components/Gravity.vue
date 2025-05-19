<script lang="ts" setup>
import Matter from "matter-js";
import Tech from "./helpers/Tech";
import Borders from "./helpers/Borders";
import { ASSETS } from "./constants";
import TechBody from "./helpers/TechBody";

const { Engine, Render, Runner, MouseConstraint, Mouse, Composite, Events } =
    Matter;

const matter = ref<HTMLDivElement>();

const canvas = ref<{
    width: number;
    height: number;
}>({ width: 0, height: 0 });

const step = ref<number>(0);
const techList = ref<ReturnType<typeof Tech>[]>([]);
const engine = ref<Matter.Engine>();

const objectKeys = <T extends object>(object: T): (keyof T)[] =>
    Object.keys(object) as (keyof T)[];

const next = (): -1 | (NonNullable<unknown> & number) => {
    const currentAssets = ASSETS[step.value];

    if (!currentAssets) return -1;

    objectKeys(currentAssets).forEach((key) => {
        const tech = Tech(TechBody(Matter), currentAssets[key]!, render.value!);

        tech.mount(engine.value!.world, step.value);

        techList.value.push(tech);
    });

    step.value += 1;

    return ASSETS[step.value] ? step.value : -1;
};

defineExpose({
    next,
});

const getMouse = (canvas: HTMLCanvasElement, engine: Matter.Engine) => {
    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false },
        },
    });

    mouseConstraint.mouse.element.removeEventListener(
        "wheel",
        mouseConstraint.mouse.mousewheel,
    );
    mouseConstraint.mouse.element.removeEventListener(
        "DOMMouseScroll",
        mouseConstraint.mouse.mousewheel,
    );

    return {
        mouse,
        mouseConstraint,
    };
};

const loadAssets = () => {
    for (const tech of techList.value) {
        tech.render(render.value);
    }
};

const render = ref<Matter.Render>();

onMounted(() => {
    canvas.value = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    engine.value = Engine.create();

    render.value = Render.create({
        element: matter.value,
        engine: engine.value,
        options: {
            width: canvas.value.width,
            height: canvas.value.height,
            background: "transparent",
            wireframes: false,
        },
    });

    Render.run(render.value);
    const runner = Runner.create();
    Runner.run(runner, engine.value);

    Composite.add(engine.value.world, Borders(canvas.value).body);

    const { mouse, mouseConstraint } = getMouse(
        render.value.canvas,
        engine.value,
    );

    Composite.add(engine.value.world, mouseConstraint);
    render.value.mouse = mouse;

    Events.on(render.value, "afterRender", loadAssets);

    Render.lookAt(render.value, {
        min: { x: 0, y: 0 },
        max: { x: canvas.value.width, y: canvas.value.height },
    });

    onBeforeUnmount(() => {
        Render.stop(render.value!);
        Runner.stop(runner);

        for (const tech of techList.value) {
            tech.unmount();
        }
    });
});
</script>

<template>
    <div
        ref="matter"
        class="matter"
    >
        <div class="corner-fade-overlay"></div>
    </div>
</template>

<style lang="scss" scoped>
.matter {
    position: absolute;
    width: 100%;
    height: auto;
    overflow: hidden;
}
</style>
