const expenseByAllCategory = [
  { category: "life", percent: 0.31 },
  { category: "health", percent: 0.22 },
  { category: "shopping", percent: 0.18 },
  { category: "traffic", percent: 0.11 },
  { category: "food", percent: 0.08 },
  { category: "culture", percent: 0.06 },
  { category: "etc", percent: 0.04 },
];

const COLORS_BY_CATEGORY = {
  life: "#4c4bb0",
  health: "#12c1bc",
  shopping: "#ffba10",
  traffic: "#00555b",
  food: "#97c12f",
  culture: "#782b64",
  etc: "#8d73f7",
};

const getCoordinatesForPercent = (percent) => {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);
  return [x, y];
};

const getDoughnutChartPaths = (data) => {
  let accumulatedPercent = 0;
  const paths = data
    .map(({ percent, category }, idx) => {
      const [startX, startY] = getCoordinatesForPercent(accumulatedPercent);
      accumulatedPercent += percent;
      const [endX, endY] = getCoordinatesForPercent(accumulatedPercent);
      const isLarge = percent > 0.5 ? 1 : 0;

      return getCategoryDataPath(
        { percent, category },
        { startX, startY, endX, endY, isLarge },
        idx
      );
    })
    .join("");
  return paths;
};

const getCategoryDataPath = (
  { percent, category },
  { startX, startY, endX, endY, isLarge },
  idx
) => {
  const targetRad = 2 * Math.PI * percent;
  const targetRestRad = 2 * Math.PI * (1 - percent);
  const animationDuration = 0.2;

  const $path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  $path.setAttribute(
    "d",
    `M ${startX} ${startY} A 1 1 0 ${isLarge} 1 ${endX} ${endY} L 0 0`
  );
  $path.setAttribute("fill", "none");
  $path.setAttribute("stroke-width", "0.6");
  $path.setAttribute("stroke", COLORS_BY_CATEGORY[category]);
  $path.setAttribute("stroke-dasharray", `${targetRad} ${targetRestRad}`);
  $path.setAttribute("stroke-dashoffset", `${targetRad}`);

  const $animate = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animate"
  );
  $animate.setAttribute("attributeName", "stroke-dashoffset");
  $animate.setAttribute("begin", `${animationDuration * idx}`);
  $animate.setAttribute("from", `${targetRad}`);
  $animate.setAttribute("to", "0.001");
  $animate.setAttribute("dur", `${animationDuration}`);
  $animate.setAttribute("fill", "freeze");
  $path.appendChild($animate);

  return $path.outerHTML;
};

const paths = getDoughnutChartPaths(expenseByAllCategory);
const $svg = document.querySelector("svg");
$svg.innerHTML = paths;
