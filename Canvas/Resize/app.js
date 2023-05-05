const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;

let canvasWidth;
let canvasHeight;
let particles;

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;

  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);

  const TOTAL = canvasWidth / 50;

  particles = [];

  for (let i = 0; i < TOTAL; i++) {
    const x = randomNumBetween(0, canvasWidth);
    const y = randomNumBetween(0, canvasHeight);
    const radius = randomNumBetween(30, 80);
    const vy = randomNumBetween(1, 5);
    const particle = new Particle(x, y, radius, vy);
    particles.push(particle);
  }
}

const feGaussianBlur = document.querySelector("feGaussianBlur");
const feColorMatrix = document.querySelector("feColorMatrix");

const controls = new (function () {
  this.blurValue = 40;
  this.alphaChannel = 100;
  this.alphaOffset = -23;
  this.acc = 1.03;
})();

let gui = new dat.GUI();

const f1 = gui.addFolder("Gooey Effect");
const f2 = gui.addFolder("Particle Property");

f1.add(controls, "blurValue", 0, 100).onChange((value) => {
  feGaussianBlur.setAttribute("stdDeviation", value);
});
f1.add(controls, "alphaChannel", 1, 200).onChange((value) => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`
  );
});

f1.add(controls, "alphaOffset", -40, 40).onChange((value) => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`
  );
});

f2.add(controls, "acc", 1, 1.5, 0.01).onChange((value) => {
  particles.forEach((particle) => (particle.acc = value));
});

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.acc = 1.03;
  }
  draw() {
    ctx.beginPath(); //path를 그리기 시작함
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360); //각도 단위는 rad
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }
}

const x = 100;
const y = 100;
const radius = 50;

// const particle = new Particle(x, y, radius);

const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

let interval = 1000 / 60;
let now, delta;
let then = Date.now();

function animate() {
  // 1초에 주사율만큼 함수를 실행함.
  // 따라서 주사율이 높은 모니터에서는 1초에 144px만큼 움직일 수도 있음
  window.requestAnimationFrame(animate); // 프레임을 무한으로 생성

  now = Date.now();
  delta = now - then;

  if (delta < interval) return;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight); // 이전 프레임을 지우고 새 프레임을 만듦

  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = randomNumBetween(0, canvasWidth);
      particle.radius = randomNumBetween(30, 100);
      particle.vy = randomNumBetween(1, 5);
    }
  });

  then = now - (delta % interval);
}

window.addEventListener("load", () => {
  init();
  animate();
});

window.addEventListener("resize", () => {
  init();
});
