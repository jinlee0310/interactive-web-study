import CanvasOption from "../Boiler-Plate/CanvasOption.js";

class Spark extends CanvasOption {
  constructor(x, y, vx, vy, opacity, color) {
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.opacity = opacity;
    this.color = color;
  }
  update() {
    this.opacity -= 0.01;

    this.x += this.vx;
    this.y += this.vy;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Spark;
