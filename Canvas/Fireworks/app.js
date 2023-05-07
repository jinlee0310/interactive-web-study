import CanvasOption from "../Boiler-Plate/CanvasOption.js";
import Particle from "./Particle.js";
import { hypotenuse, randomNumBetween } from "../Boiler-Plate/utils.js";
import Tail from "./Tail.js";
import Spark from "./Spark.js";

class Canvas extends CanvasOption {
  constructor() {
    super();

    this.bgColor = "#000000";

    this.tails = [];
    this.particles = [];
    this.sparks = [];
  }

  init() {
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;
    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.canvas.style.width = this.canvasWidth + "px";
    this.canvas.style.height = this.canvasHeight + "px";

    // this.createParticles();
  }

  createTail() {
    const x = randomNumBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8);
    const vy = this.canvasHeight * randomNumBetween(0.01, 0.015) * -1;
    const r = randomNumBetween(0, 255);
    const g = randomNumBetween(0, 255);
    const b = randomNumBetween(0, 255);
    const color = `${r}, ${g}, ${b}`;
    this.tails.push(new Tail(x, vy, color));
  }

  createParticles(x, y, color) {
    const PARTICLE_NUM = 400;

    for (let i = 0; i < PARTICLE_NUM; i++) {
      const r =
        randomNumBetween(2, 100) * hypotenuse(innerWidth, innerHeight) * 0.0001;
      const angle = (Math.PI / 180) * randomNumBetween(0, 360);

      const vx = r * Math.cos(angle);
      const vy = r * Math.sin(angle);

      const opacity = randomNumBetween(0.6, 0.9);

      this.particles.push(new Particle(x, y, vx, vy, opacity, color));
    }
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if (delta < this.interval) return;
      this.ctx.fillStyle = this.bgColor + "30"; //#00000010: 잔상이 남도록
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      this.ctx.fillStyle = `rgba(255,255,255,${this.particles.length / 30000})`;
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      if (Math.random() < 0.03) this.createTail();

      this.tails.forEach((tail, idx) => {
        tail.update();
        tail.draw();

        const vx = randomNumBetween(-5, 5) * 0.05;
        const vy = randomNumBetween(-5, 5) * 0.05;
        const opacity = Math.min(-tail.vy, 0.5);
        for (let i = 0; i < Math.round(-tail.vy * 0.5); i++) {
          this.sparks.push(
            new Spark(tail.x, tail.y, vx, vy, opacity, tail.color)
          );
        }

        if (tail.vy > -0.7) {
          this.tails.splice(idx, 1);
          this.createParticles(tail.x, tail.y, tail.color);
        }
      });

      this.particles.forEach((particle, idx) => {
        particle.update();
        particle.draw();

        if (Math.random() < 0.1) {
          this.sparks.push(
            new Spark(particle.x, particle.y, 0, 0, 0.3, "255,210,77")
          );
        }

        if (particle.opacity < 0) this.particles.splice(idx, 1);
      });

      this.sparks.forEach((spark, idx) => {
        spark.update();
        spark.draw();

        if (spark.opacity < 0) this.sparks.splice(idx, 1);
      });

      then = now - (delta % this.interval);
    };
    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

window.addEventListener("load", () => {
  canvas.init();
  canvas.render();
});

window.addEventListener("resize", () => {
  canvas.init();
});
