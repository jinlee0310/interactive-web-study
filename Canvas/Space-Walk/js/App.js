import Circle from "./Astronaut.js";

export default class App {
    static canvas = document.querySelector("canvas");
    static ctx = App.canvas.getContext("2d");
    static width = innerWidth;
    static height = innerHeight;
    static dpr = devicePixelRatio > 1 ? 2 : 1;
    static interval = 1000 / 60;

    constructor() {
        this.resize();
    }

    // canvas size 조절
    resize() {
        App.width = innerWidth;
        App.height = innerHeight;

        App.canvas.style.width = App.width + "px";
        App.canvas.style.height = App.height + "px";

        App.canvas.width = App.width * App.dpr;
        App.canvas.height = App.height * App.dpr;
        App.ctx.scale(App.dpr, App.dpr);

        this.circle = new Circle(100, App.height / 2);
    }

    render() {
        let now, delta;
        let then = Date.now();

        const frame = () => {
            requestAnimationFrame(frame);
            now = Date.now();
            delta = now - then;
            if (delta < App.interval) return;
            then = now - (delta % App.interval);

            App.ctx.clearRect(0, 0, App.width, App.height);

            this.circle.update();
            this.circle.draw(App.ctx);
        };
        requestAnimationFrame(frame);
    }
}
