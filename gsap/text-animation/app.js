const texts = document.querySelectorAll(".split");

const getInnerText = ($text) => $text.innerText;
const splitText = (text) => text.split("");
const coverSpan = (textArr) =>
    textArr
        .map(
            (text) =>
                `<span aria-hidden="true">${
                    text === " " ? "&nbsp;" : text
                }</span>`
        )
        .join("");

const splitedText = [...texts].map(getInnerText).map(splitText).map(coverSpan);
texts.forEach((text, i) => (text.innerHTML = splitedText[i]));
console.log(splitedText);

// gsap.from(".split span", {
//     yPercent: 100,
//     autoAlpha: 0,
//     duration: 2,
//     ease: "circ.out",
//     stagger: 0.05,
//     scrollTrigger: {
//         trigger: ".split",
//         start: "top center",
//         markers: true,
//     },
// });

document.querySelectorAll(".split").forEach((text) => {
    gsap.from(text.querySelectorAll("span"), {
        yPercent: 100,
        autoAlpha: 0,
        duration: 1,
        ease: "circ.out",
        stagger: {
            amount: 1,
            from: "random",
            each: 0.01,
        },
        scrollTrigger: {
            trigger: text,
            start: "top center",
            markers: true,
        },
    });
});
