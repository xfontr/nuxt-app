<script lang="ts" setup>
import Matter from "matter-js";
import { ICON_KEYS } from "./constants";
import Tech from "./helpers/Tech";
import Borders from "./helpers/Borders";

const {
    Engine,
    Render,
    Runner,
    MouseConstraint,
    Mouse,
    Composite,
    Events,
    Body,
} = Matter;

const matter = ref<HTMLDivElement>();

const canvas = ref<{
    width: number;
    height: number;
}>({ width: 0, height: 0 });

const techList = ref<ReturnType<typeof Tech>[]>([]);
const currentTechList = ref<ReturnType<typeof Tech>[]>([]);
const world = ref<Matter.World>();

const show = () => {
    if (currentTechList.value.length) {
        techList.value = [...techList.value, ...currentTechList.value];
        currentTechList.value = [];
    }

    ICON_KEYS.forEach((key) => {
        const tech = Tech(render.value!, key);
        currentTechList.value.push(tech);

        Composite.add(world.value, tech.body);

        const angle = ((Math.random() - 0.5) * Math.PI) / 2; // ~[-45°, 45°]
        const speed = 15 + Math.random() * 5;

        Body.setVelocity(tech.body, {
            x: Math.cos(angle) * speed,
            y: -Math.abs(Math.sin(angle) * speed),
        });
        Body.setAngularVelocity(tech.body, (Math.random() - 0.5) * 0.2);
    });
};

defineExpose({
    show,
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
    for (const tech of currentTechList.value) {
        tech.render();
    }
};

const render = ref<Matter.Render>();

onMounted(() => {
    canvas.value = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    const engine = Engine.create();
    world.value = engine.world;

    render.value = Render.create({
        element: matter.value,
        engine,
        options: {
            width: canvas.value.width,
            height: canvas.value.height,
            background: "transparent",
            wireframes: false,
        },
    });

    Render.run(render.value);
    const runner = Runner.create();
    Runner.run(runner, engine);

    Composite.add(world.value, Borders(canvas.value).body);

    const { mouse, mouseConstraint } = getMouse(render.value.canvas, engine);

    Composite.add(world.value, mouseConstraint);
    render.value.mouse = mouse;

    Events.on(render.value, "afterRender", loadAssets);

    Render.lookAt(render.value, {
        min: { x: 0, y: 0 },
        max: { x: canvas.value.width, y: canvas.value.height },
    });

    onBeforeUnmount(() => {
        Render.stop(render.value!);
        Runner.stop(runner);

        for (const tech of currentTechList.value) {
            tech.unmount();
        }
    });
});
</script>

<template>
    <div
        ref="matter"
        class="matter"
    ></div>
</template>

<style lang="scss" scoped>
.matter {
    position: absolute;
    width: 100%;
    height: auto;
    overflow: hidden;
}
</style>
