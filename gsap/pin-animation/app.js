// section 01
const ani1 = gsap.timeline();
ani1.to("#section1 .parallax__item__img", {
    rotation: 720,
    scale: 0,
    borderRadius: 200,
}).to("#section1 .parallax__item__img", {
    rotation: 0,
    scale: 1,
    borderRadius: 20,
});

ScrollTrigger.create({
    animation: ani1,
    trigger: "#section1",
    start: "top top",
    end: "+=2000",
    scrub: true,
    pin: true,
    anticipatePin: 1,
});

// section 02
const ani2 = gsap.timeline();
ani2.from("#section2 .i1", { y: -100, autoAlpha: 0, borderRadius: 200 })
    .from("#section2 .i2", { y: 100, autoAlpha: 0, borderRadius: 200 })
    .from("#section2 .i3", { y: -100, autoAlpha: 0, borderRadius: 200 });

ScrollTrigger.create({
    animation: ani2,
    trigger: "#section2",
    start: "top top",
    end: "+=2000",
    scrub: true,
    pin: true,
    anticipatePin: 1,
    // markers: true,
});

// section 03
const ani3 = gsap.timeline();
ani3.from("#section3 .parallax__item__img", {
    autoAlpha: 0,
    y: -100,
    ease: "back.out(4)",
    stagger: {
        amount: 3,
        from: "random",
    },
});

ScrollTrigger.create({
    animation: ani3,
    trigger: "#section3",
    start: "top top",
    end: "+=3000",
    scrub: true,
    pin: true,
    anticipatePin: 1,
});

// section 04
const ani4 = gsap.timeline();
ani4.from("#section4 .parallax__item__img", {
    autoAlpha: 0,
    scale: 5,
    width: "100vw",
    height: "100vh",
});

ScrollTrigger.create({
    animation: ani4,
    trigger: "#section4",
    start: "top top",
    end: "+=3000",
    scrub: true,
    pin: true,
    anticipatePin: 1,
    // markers: true,
});

// section 05
const ani5 = gsap.timeline();
ani5.to("#section5 .t1", { xPercent: 300 }, "text")
    .to("#section5 .t2", { xPercent: -300 }, "text")
    .to("#section5 .t3", { xPercent: 300 }, "text")
    .to("#section5 .t4", { xPercent: -300 }, "text");

ScrollTrigger.create({
    animation: ani5,
    trigger: "#section5",
    start: "top top",
    end: "+=3000",
    scrub: true,
    pin: true,
    anticipatePin: 1,
    // markers: true,
});

// section 06
const ani6 = gsap.timeline();
ani6.to(
    "#section6 .parallax__item__text",
    { scale: 70, duration: 2 },
    "-=1"
).from(
    "#section6 .parallax__item__img",
    {
        autoAlpha: 0,
        scale: 5,
        width: "100vw",
        height: "100vh",
        duration: 2,
    },
    "-=1"
);

ScrollTrigger.create({
    animation: ani6,
    trigger: "#section6",
    start: "top top",
    end: "+=4000",
    scrub: true,
    pin: true,
    anticipatePin: 1,
    // markers: true,
});

// section 07
const ani7 = gsap.timeline();
ani7.from("#section7 .t1", { autoAlpha: 0, duration: 1, y: 50 }, "+=2")
    .from("#section7 .t2", { autoAlpha: 0, duration: 1, y: 50 }, "+=2")
    .from("#section7 .t3", { autoAlpha: 0, duration: 1, y: 50 }, "+=2")
    .from("#section7 .t4", { autoAlpha: 0, duration: 1, y: 50 }, "+=2")
    .from("#section7 .t5", { autoAlpha: 0, duration: 1, y: 50 }, "+=2")
    .from("#section7 .t6", { autoAlpha: 0, duration: 1, y: 50 }, "+=2")
    .from("#section7 .t7", { autoAlpha: 0, duration: 1, y: 50 }, "+=2");

ScrollTrigger.create({
    animation: ani7,
    trigger: "#section7",
    start: "top top",
    end: "+=6000",
    scrub: true,
    pin: true,
    anticipatePin: 1,
    // markers: true,
});
