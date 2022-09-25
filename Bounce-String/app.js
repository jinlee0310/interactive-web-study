import { BounceString } from "./bounceString.js";
import { Ball } from "./ball.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.strings = [];
    this.moveX = -5000;
    this.moveY = -5000;
    this.isDown = false;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.ball = new Ball(this.stageWidth, this.stageHeight, 50, 6);

    document.addEventListener("pointerdown", this.onDown.bind(this), false);
    document.addEventListener("pointermove", this.onMove.bind(this), false);
    document.addEventListener("pointerup", this.onUp.bind(this), false);

    // this.animate.bind(this)???
    window.requestAnimationFrame(this.animate.bind(this));
  }

  //retina display를 위한 resize event
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    const xGap = 20;
    const yGap = 20;
    const x1 = xGap;
    const x2 = this.stageWidth - xGap;
    const total = Math.floor((this.stageHeight - yGap) / yGap);

    this.strings = [];

    for (let i = 0; i < total; i++) {
      this.strings[i] = new BounceString(
        {
          // 선의 왼쪽 x위치
          x1: x1,
          // 선의 왼쪽 y위치
          y1: i * yGap + yGap,
          // 선의 오른쪽 x위치
          x2: x2,
          // 선의 오른쪽 y위치
          y2: i * yGap + yGap,
        },
        "#ff5038"
      );
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    if (this.strings.length > 0) {
      for (let i = 0; i < this.strings.length; i++) {
        this.strings[i].animate(this.ctx, this.ball.x, this.ball.y);
        // bounce string by click window
        // this.strings[i].animate(this.ctx, this.moveX, this.moveY);
      }
    }

    this.ball.animate(this.ctx, this.stageWidth, this.stageHeight);
  }

  onDown(e) {
    this.isDown = true;
    this.moveX = e.clientX;
    this.moveY = e.clientY;
  }

  onMove(e) {
    if (this.isDown) {
      this.moveX = e.clientX;
      this.moveY = e.clientY;
    }
  }

  onUp(e) {
    this.isDown = false;

    this.moveX = -5000;
    this.moveY = -5000;
  }
}

//???
window.onload = () => {
  new App();
};
