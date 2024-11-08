let frames = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  //create four frames with noise animation and add them to the frames array
  frames.push(new NoisyFrame(0.037 * min(width, height), 0.186 * min(width, height), 0.125 * min(width, height), 0.2 * min(width, height), color(239, 17, 17)));
  frames.push(new NoisyFrame(0.625 * min(width, height), 0.15 * min(width, height), 0.125 * min(width, height), 0.2 * min(width, height), color(43, 115, 247)));
  frames.push(new NoisyFrame(0.138 * min(width, height), 0.725 * min(width, height), 0.2 * min(width, height), 0.125 * min(width, height), color(211, 211, 211)));
  frames.push(new NoisyFrame(0.7 * min(width, height), 0.7 * min(width, height), 0.175 * min(width, height), 0.225 * min(width, height), color(239, 17, 17)));
  noLoop();
}

function draw() {
  background(255);
  drawRandomLines();
  //display each frame with noise animation
  for (let frame of frames) {
    frame.display(); 
  }

 
  randomRect();
  //draw colored roads at specific position
  drawColouredHorizontalRoad(min(width, height) / 40 * 21);
  drawColouredVerticalRoad(min(width, height) / 40 * 1);
  drawColouredVerticalRoad(min(width, height) / 40 * 23);
  drawColouredHorizontalRoad(min(width, height) / 40 * 15);
  drawColouredVerticalRoad(min(width, height) / 40 * 13);
  drawColouredHorizontalRoad(min(width, height) / 40 * 37);
}

// Function to draw random lines as the yellow grid background
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

// draw random rectangles and avoid overlapping with the fixed rectangles
function randomRect() {
  let size = min(windowWidth, windowHeight);
  let colors = [
    [239, 17, 17],  
    [43, 115, 247], 
    [211, 211, 211] 
  ];

  //fixed rectangles with specific positions and sizes
  let fixedRects = [
    { x: 0.037 * size, y: 0.186 * size, w: 0.125 * size, h: 0.2 * size },
    { x: 0.625 * size, y: 0.15 * size, w: 0.125 * size, h: 0.2 * size },
    { x: 0.138 * size, y: 0.725 * size, w: 0.2 * size, h: 0.125 * size },
    { x: 0.7 * size, y: 0.7 * size, w: 0.175 * size, h: 0.225 * size }
  ];

  for (let i = 0; i < 7; i++) {
    let rectSize = random(20, 80);
    let x, y;
    let overlapping = true;
 
    //make sure random rectangles will not overlap with the fixed rectangles
    while (overlapping) {
      //create random x and y coordinates
      x = random(0, size - 70);
      y = random(0, size - 70);
      overlapping = false;

      //check for overlap with each fixed rectangle
      for (let rect of fixedRects) {
        //check if the new rectangle horizontally overlaps with the fixed rect
        let horizontalOverlap = x < rect.x + rect.w && x + rectSize > rect.x;
        //check if the new rectangle vertically overlaps with the fixed rect
        let verticalOverlap = y < rect.y + rect.h && y + rectSize > rect.y;
        //if both horizontal and vertical overlaps exist, mark as overlapping
        if (horizontalOverlap && verticalOverlap) {
          overlapping = true;
          //exit the loop to generate a new position
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

// Class for the noisy frames
class NoisyFrame {
  constructor(x, y, w, h, baseColor) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.baseColor = baseColor;
    //randomly initialize noise offset
    this.noiseOffset = random(100);
  }

  display() {
    fill(this.baseColor);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
    this.drawNoisyFrames();
    //slightly increment noise offset for animation
    this.noiseOffset += 0.01;
  }

  //draw multiple wireframes with noise effect to create animation
  drawNoisyFrames() {
    noFill();
    stroke(255, 255, 255, 150);
    strokeWeight(1);

    //create the number of noise effect frames to overlay
    let steps = 33;

    for (let i = 0; i < steps; i++) {
      //generate noise values
      let noiseValue = noise(this.noiseOffset + i * 0.1);
      //make a scale range
      let scale = map(noiseValue, 0, 1, 1, 0.05);
      let offsetX = (this.w * (1 - scale)) / 2;
      let offsetY = (this.h * (1 - scale)) / 2;

      rect(this.x + offsetX, this.y + offsetY, this.w * scale, this.h * scale);
    }
  }
}

// Draw small squares with colors on horizontal lines
function drawColouredHorizontalRoad(y){
  let boxSize = min(width, height) / 40;
  let boxNumbers = min(width, height) / boxSize;
  let colourChoice;
  for (let i = 0; i < boxNumbers; i ++){
    let x = i * boxSize;
    if(i % 2 === 0){
      colourChoice = color(252, 224, 46); 
    } else if (i % 6 == 1 || i % 6 == 5){
      //70% chance to be yellow, otherwise gray
      if(random(1) < 0.7){
        colourChoice = color(252, 224, 46); // yellow
      } else {
        colourChoice = color(211, 211, 211); // gray
      }
    } else {
      colourChoice = random([color(239, 17, 17), color(43, 115, 247)]);
    }

    fill(colourChoice);
    noStroke();
    rect(x, y, boxSize, boxSize);
  }
}

// Draw small squares with colors on vertical lines
function drawColouredVerticalRoad(x){
  let boxSize = min(width, height) / 40;
  let boxNumbers = min(width, height) / boxSize;
  let colourChoice;
  for (let i = 0; i < boxNumbers; i ++){
    let y = i * boxSize;
    if(i % 2 === 0){
      colourChoice = color(252, 224, 46); // yellow
    } else if (i % 6 == 1 || i % 6 == 5){
      if(random(1) < 0.7){
        colourChoice = color(252, 224, 46); // yellow
      } else {
        colourChoice = color(211, 211, 211); // gray
      }
    } else {
      colourChoice = random([color(239, 17, 17), color(43, 115, 247)]);
    }

    fill(colourChoice);
    noStroke();
    rect(x, y, boxSize, boxSize);
  }
}

//the size of prototype will change according to the browser window resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  frames = [
    new NoisyFrame(0.037 * min(width, height), 0.186 * min(width, height), 0.125 * min(width, height), 0.2 * min(width, height), color(239, 17, 17)),
    new NoisyFrame(0.625 * min(width, height), 0.15 * min(width, height), 0.125 * min(width, height), 0.2 * min(width, height), color(43, 115, 247)),
    new NoisyFrame(0.138 * min(width, height), 0.725 * min(width, height), 0.2 * min(width, height), 0.125 * min(width, height), color(211, 211, 211)),
    new NoisyFrame(0.7 * min(width, height), 0.7 * min(width, height), 0.175 * min(width, height), 0.225 * min(width, height), color(239, 17, 17))
  ];
}
