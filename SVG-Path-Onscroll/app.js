let ticking = false;
let memoizedPathD = {};

const path = document.querySelector('#number-path');
window.addEventListener('scroll', requestTick);

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(handleScroll);
  }
  ticking = true;
}

function handleScroll() {
  ticking = false;
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const heightRate = Math.round((window.pageYOffset / totalHeight) * 100) / 100;
  const d = getCalculatedPath(heightRate);
  path.setAttribute('d', d);
  const numberColor = getCalculatedColor(heightRate, false);
  path.setAttribute('stroke', numberColor);
  const bgColor = getCalculatedPath(heightRate, true);
  document.body.style.backgroundColor = bgColor;
}

function getCalculatedPath(_heightRate) {
  const { preIndex, nextIndex, calcRate } = getCalculatorInfo(_heightRate);
  const preD = getPathItem(preIndex);
  const nextD = getPathItem(nextIndex);
  return nextD
    .reduce((acc, item, index) => {
      let nodeText = '';
      const { x, y, type } = item;
      if (type) {
        nodeText += type + ' ';
      }
      const { x: ax, y: ay } = preD[index];
      const { x: bx, y: by } = nextD[index];
      const calcX = ax + (bx - ax) * calcRate;
      const calcY = ay + (by - ay) * calcRate;
      nodeText += calcX + ' ' + calcY;
      acc.push(nodeText);
      return acc;
    }, [])
    .join(' ');
}

function getPathItem(index) {
  if (memoizedPathD[index]) {
    return memoizedPathD[index];
  }
  const items = PATH_D_LIST[index].split(' ');
  let itemCount = 0;

  const d = items.reduce((acc, item, index) => {
    if (!acc[itemCount]) {
      acc.push({});
    }
    if (item === 'M' || item === 'C') {
      acc[itemCount].type = item;
    } else if (!acc[itemCount].x) {
      acc[itemCount].x = Number(item);
    } else if (!acc[itemCount].y) {
      acc[itemCount].y = Number(item);
      itemCount++;
    }
    return acc;
  }, []);
  memoizedPathD[index] = d;
  return d;
}

function getCalculatedColor(_heightRate, isBg) {
  const { preIndex, nextIndex, calcRate } = getCalculatorInfo(_heightRate);
  const bgPadding = isBg ? 2 : 0;
  const preColor = PATH_STROKE_COLOR_LIST[preIndex + bgPadding];
  const nextColor = PATH_STROKE_COLOR_LIST[nextIndex + bgPadding];
  const calcR = getCalculatedColorPart(preColor, nextColor, calcRate, 0);
  const calcG = getCalculatedColorPart(preColor, nextColor, calcRate, 2);
  const calcB = getCalculatedColorPart(preColor, nextColor, calcRate, 4);
  return `#${calcR}${calcG}${calcB}`;
}

function getCalculatorInfo(_heightRate) {
  const heightRate = Math.min(_heightRate, 1);
  const length = PATH_D_LIST.length - 1;
  const preIndex = Math.floor(heightRate * length);
  const nextIndex = Math.ceil(heightRate * length);
  const calcRate = heightRate * length - preIndex;
  return { preIndex, nextIndex, calcRate };
}

function getCalculatedColorPart(preColor, nextColor, calcRate, rgbIdx) {
  const calcPrePart = preColor.substr(rgbIdx, 2);
  const calcNextPart = nextColor.substr(rgbIdx, 2);
  const r1 = parseInt(calcPrePart, 16);
  const r2 = parseInt(calcNextPart, 16);
  return Math.round(r1 + (r2 - r1) * calcRate).toString(16);
}

const PATH_D_LIST = [
  'M 400 50 C 400 80 400 100 400 100 C 400 120 400 150 400 150 C 400 150 400 180 400 200 C 400 220 400 300 400 300 C 400 300 400 350 400 350 C 400 350 400 450 400 500',
  'M 250 150 C 300 50 400 50 400 50 C 500 50 550 100 550 200 C 550 250 500 300 400 350 C 300 400 250 500 250 500 C 250 500 350 500 400 500 C 420 500 450 500 550 500',
  'M 250 150 C 300 50 400 50 400 50 C 500 50 550 100 550 200 C 550 250 500 300 400 300 C 500 300 550 350 550 400 C 550 500 500 550 400 550 C 400 550 300 550 250 450',
  'M 550 350 C 500 350 450 350 400 350 C 350 350 300 350 250 350 C 250 350 350 200 350 200 C 350 200 450 50 450 50 C 450 150 450 350 450 400 C 450 400 450 500 450 500',
  'M 550 50 C 500 50 300 50 250 50 C 250 100 250 200 250 250 C 300 250 350 250 400 250 C 500 250 550 300 550 350 C 550 450 500 500 400 500 C 300 500 250 450 250 400',
  'M 550 150 C 550 50 450 50 400 50 C 250 50 250 150 250 350 C 250 300 300 250 400 250 C 500 250 550 300 550 350 C 550 450 500 500 400 500 C 300 500 250 450 250 350',
  'M 250 50 C 300 50 300 50 350 50 C 400 50 400 50 450 50 C 500 50 500 50 550 50 C 550 50 500 200 500 200 C 500 200 450 350 450 350 C 450 350 400 500 400 500',
  'M 400 300 C 350 300 250 250 250 150 C 250 0 550 0 550 150 C 550 250 450 300 400 300 C 350 300 250 350 250 450 C 250 600 550 600 550 450 C 550 350 450 300 400 300',
  'M 550 250 C 550 300 500 300 350 300 C 200 300 200 50 400 50 C 500 50 550 100 550 150 C 550 350 550 350 550 400 C 550 450 550 550 400 550 C 300 550 250 500 250 450',
];
const PATH_STROKE_COLOR_LIST = [
  'C0362C',
  'FF9642',
  'F4DCB5',
  '816C5B',
  'C3B7AC',
  'E7E3DC',
  '668D3C',
  'B1DDA1',
  'E5F3CF',
  '0097AC',
  '97EAF4',
];
