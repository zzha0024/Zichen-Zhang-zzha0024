
let frames = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // create four frames with noise animation and add to the frames array
  frames.push(new NoisyFrame(0.037 * min(width, height), 0.186 * min(width, height), 0.125 * min(width, height), 0.2 * min(width, height), color(239, 17, 17)));
  frames.push(new NoisyFrame(0.625 * min(width, height), 0.15 * min(width, height), 0.125 * min(width, height), 0.2 * min(width, height), color(43, 115, 247)));
  frames.push(new NoisyFrame(0.138 * min(width, height), 0.725 * min(width, height), 0.2 * min(width, height), 0.125 * min(width, height), color(211, 211, 211)));
  frames.push(new NoisyFrame(0.7 * min(width, height), 0.7 * min(width, height), 0.175 * min(width, height), 0.225 * min(width, height), color(239, 17, 17)));
  noLoop();
}

function draw() {
  background(255);
  drawRandomLines();
  
  for (let frame of frames) {
    frame.display(); 
  }

  //create random rects in random position
  randomRect(); 
  //draw colored road at specific positions
  drawColouredHorizontalRoad(min(width, height) / 40 * 21);
  drawColouredVerticalRoad(min(width, height) / 40 * 1);
  drawColouredVerticalRoad(min(width, height) / 40 * 23);
  drawColouredHorizontalRoad(min(width, height) / 40 * 15);
  drawColouredVerticalRoad(min(width, height) / 40 * 13);
  drawColouredHorizontalRoad(min(width, height) / 40 * 37);
}

function drawRandomLines() {
  let size = min(windowWidth, windowHeight);
  stroke(252, 224, 46);
  strokeWeight(size / 40);

  let yPositions = [0, size];
  for (let i = 0; i < 5; i++) {
    yPositions.push(random(50, size - 50));
  }
  yPositions.sort((a, b) => a - b);

  for (let y of yPositions) {
    line(0, y, size, y);
  }

  let xPositions = [0, size];
  for (let j = 0; j < 5; j++) {
    xPositions.push(random(50, size - 30));
  }
  xPositions.sort((a, b) => a - b);

  for (let x of xPositions) {
    line(x, 0, x, size);
  }
}

//function to create random rects and avoid overlaping with fixed rects
function randomRect() {
  let size = min(windowWidth, windowHeight);
  let colors = [
    [239, 17, 17],  // red
    [43, 115, 247], // blue
    [211, 211, 211] // gray
  ];

  // fixed rects
  let fixedRects = [
    { x: 0.037 * size, y: 0.186 * size, w: 0.125 * size, h: 0.2 * size },
    { x: 0.625 * size, y: 0.15 * size, w: 0.125 * size, h: 0.2 * size },
    { x: 0.138 * size, y: 0.725 * size, w: 0.2 * size, h: 0.125 * size },
    { x: 0.7 * size, y: 0.7 * size, w: 0.175 * size, h: 0.225 * size }
  ];

  for (let i = 0; i < 5; i++) {
    let rectSize = random(20, 80);
    let x, y;
    let overlapping = true;

    
    while (overlapping) {
      x = random(0, size - 70);
      y = random(0, size - 70);
      overlapping = false;
 
      // make sure the random rects will not overlap with the fixed rects
      for (let rect of fixedRects) {
        let horizontalOverlap = x < rect.x + rect.w && x + rectSize > rect.x;
        let verticalOverlap = y < rect.y + rect.h && y + rectSize > rect.y;

        if (horizontalOverlap && verticalOverlap) {
          // regenerate new position if overlapping
          overlapping = true;
          break;
        }
      }
    }

    let color = random(colors);
    fill(color);
    noStroke();
    rect(x, y, rectSize, rectSize);
  }
}

  
//class for noisy frame
class NoisyFrame {
  constructor(x, y, w, h, baseColor) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.baseColor = baseColor;
    //randomly initialize noise offset
    this.noiseOffset = random(10); 
  }

  display() {
    fill(this.baseColor);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
    //draw dynamic wireframe in the rectangle
    this.drawNoisyFrames();
    //increase noise offset to create an animation effect
    this.noiseOffset += 0.01;
  }

  drawNoisyFrames() {
    noFill();
    stroke(255, 255, 255, 150);
    strokeWeight(1);
    //the number of shrinking wireframes
    let steps = 33;

    this.noiseOffset += 0.0009;
    //use setInterval to call display() 60 times per second
    setInterval(() => this.display(), 60);

    for (let i = 0; i < steps; i++) {
      let noiseValue = noise(this.noiseOffset + i * 0.1);
      let scale = map(noiseValue, 0, 1, 1, 0.05);
      let offsetX = (this.w * (1 - scale)) / 2;
      let offsetY = (this.h * (1 - scale)) / 2;

      rect(this.x + offsetX, this.y + offsetY, this.w * scale, this.h * scale);
    }
  }
}

//resize the canvas to fit the new window size when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  frames = [
    new NoisyFrame(0.037 * min(width, height), 0.186 * min(width, height), 0.125 * min(width, height), 0.2 * min(width, height), color(239, 17, 17)),
    new NoisyFrame(0.625 * min(width, height), 0.15 * min(width, height), 0.125 * min(width, height), 0.2 * min(width, height), color(43, 115, 247)),
    new NoisyFrame(0.138 * min(width, height), 0.725 * min(width, height), 0.2 * min(width, height), 0.125 * min(width, height), color(211, 211, 211)),
    new NoisyFrame(0.7 * min(width, height), 0.7 * min(width, height), 0.175 * min(width, height), 0.225 * min(width, height), color(239, 17, 17))
  ];
}
