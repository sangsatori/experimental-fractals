const internalScale = 10;
const frameSize = 800;

const clrs = new Map([
  ['accent', [255, 0, 100, 255]],
]);

const directions = new Map([
  [
    'up',
    (pos, dist) => assign(copy(pos), {y: pos.y + dist})
  ],
  [
    'down',
    (pos, dist) => assign(copy(pos), {y: pos.y - dist})
  ],
  [
    'right',
    (pos, dist) => assign(copy(pos), {x: pos.x + dist})
  ],
  [
    'left',
    (pos, dist) => assign(copy(pos), {x: pos.x - dist})
  ],
  [
    'zero',
    (pos, dist) => pos
  ]
]);

let scaleFactor;
let change = 0;
let step = .01;
let range;

function setup() {
  range = inRange(0, 1.5); // get range fn
  for (key of clrs.keys()) {
    clrs.set(key, toColour(clrs.get(key)));
  }

  scaleFactor = frameSize / internalScale;
  createCanvas(frameSize, frameSize);

  strokeWeight(internalScale * .001);
  stroke(clrs.get('accent'));
  noFill();
}

function draw() {
  clear(); // maintain transparent canvas

  // center origin
  scale(scaleFactor, scaleFactor);
  translate(internalScale / 2, internalScale / 2);

  // render
  fractal({x: 0, y: 0}, internalScale / 8, 4);

  if (!range(change)) {
    step *= -1; // invert
  }
  change += step;
}

function fractal(pos, s, n) {
  if (n <= 0) {
    return;
  }
  n-=1;
  const {x, y} = pos; // destrucuring
  // expansion directions
  for (direction of directions.values()) {
    let calcPos = direction(pos, 2);
    drawShape(calcPos, s);
    fractal(calcPos, s - change, n);
  }
}

// draw
const drawShape = (pos, s) => ellipse(pos.x, pos.y, s * .5, s * .5);

// process
const inRange = (min, max) => (n) => ((min <= n) && (n <= max));
const toColour = (arr) => color(...arr);
const assign = Object.assign; // lazy
const copy = (obj) => assign({}, obj);
