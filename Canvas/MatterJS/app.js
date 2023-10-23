const canvas = document.querySelector("canvas");
const cw = 500;
const ch = 700;

const {
    Engine,
    Render,
    Runner,
    Bodies,
    Composite,
    Mouse,
    MouseConstraint,
    Events,
} = Matter;

const engine = Engine.create();

const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
        width: cw,
        height: ch,
        wireframes: false,
    },
});

const runner = Runner.create();

Render.run(render);
Runner.run(runner, engine);

const mouse = Mouse.create(canvas);

const mouseConstraint = MouseConstraint.create(engine, { mouse: mouse });

const ground = Bodies.rectangle(cw / 2, ch, cw, 50, { isStatic: true });
Composite.add(engine.world, [ground, mouseConstraint]);

canvas.addEventListener("mousewheel", () => {
    createBox();
});

function createBox() {
    const box = Bodies.rectangle(mouse.position.x, mouse.position.y, 50, 50);
    Composite.add(engine.world, [box]);
}

Events.on(runner, "tick", () => {
    engine.world.bodies.forEach((body) => {
        if (body.position.y > ch) Composite.remove(engine.world, body);
    });
});
