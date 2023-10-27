import App from "./App.js";

export default class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.vx = 2;
        this.vy = 0.25;

        App.canvas.addEventListener("click", (e) => {
            if (
                this.x >= e.clientX - 50 &&
                this.x <= e.clientX + 50 &&
                this.y >= e.clientY - 50 &&
                this.y <= e.clientY + 50
            ) {
                this.vx *= -1;
                this.vy *= -1;
            }
        });
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - 50 < 0 || this.x + 50 > App.width) {
            this.vx *= -1;
        }
        if (this.y - 50 < 0 || this.y + 50 > App.height) {
            this.vy *= -1;
        }
    }

    draw(ctx) {
        ctx.beginPath(); //path를 그리기 시작함
        ctx.arc(this.x, this.y, 50, 0, (Math.PI / 180) * 360); //각도 단위는 rad
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();
    }
}
