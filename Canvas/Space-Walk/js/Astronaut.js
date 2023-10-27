import App from "./App.js";

export default class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.vx = 2;
        this.vy = 0.25;

        this.image = document.querySelector("img");

        this.imageWidth = 100;
        this.imageHeight =
            this.imageWidth * (this.image.height / this.image.width);

        App.canvas.addEventListener("click", (e) => {
            if (
                this.x >= e.clientX - this.imageWidth &&
                this.x <= e.clientX &&
                this.y >= e.clientY - this.imageHeight &&
                this.y <= e.clientY
            ) {
                this.vx *= -1;
                this.vy *= -1;
            }
        });
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -this.imageWidth) {
            this.x = App.width;
        }
        if (this.x > App.width) {
            this.x = 0;
        }
        if (this.y < -this.imageHeight) {
            this.y = App.height;
        }
        if (this.y > App.height) {
            this.y = 0;
        }
        // if (this.y < 0 || this.y + this.imageHeight > App.height) {
        //     this.vy *= -1;
        // }
    }

    draw() {
        App.ctx.drawImage(
            this.image,
            0,
            0,
            this.image.width,
            this.image.height,
            this.x,
            this.y,
            this.imageWidth,
            this.imageHeight
        );
    }
}
