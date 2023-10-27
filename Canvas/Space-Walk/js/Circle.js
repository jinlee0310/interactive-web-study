import App from "./App.js";

export default class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.vx = 2;
        this.vy = 0.25;

        this.image = document.querySelector("img");

        this.imageWidth = 50;
        this.imageHeight =
            this.imageWidth * (this.image.height / (this.image.width / 8));

        App.canvas.addEventListener("click", (e) => {
            if (
                this.x >= e.clientX - this.imageWidth / 2 &&
                this.x <= e.clientX + this.imageWidth / 2 &&
                this.y >= e.clientY - this.imageHeight / 2 &&
                this.y <= e.clientY + this.imageHeight / 2
            ) {
                this.vx *= -1;
                this.vy *= -1;
            }
        });
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x + this.imageWidth > App.width) {
            this.vx *= -1;
        }
        if (this.y < 0 || this.y + this.imageHeight > App.height) {
            this.vy *= -1;
        }
    }

    draw() {
        App.ctx.drawImage(
            this.image,
            (this.image.width / 8) * 3,
            0,
            this.image.width / 8,
            this.image.height,
            this.x,
            this.y,
            this.imageWidth,
            this.imageHeight
        );
    }
}
