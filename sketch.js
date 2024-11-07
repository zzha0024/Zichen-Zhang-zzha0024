//Control the speed  of the animation
let frameOffset = 0.01; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background(255);
  drawRandomLines();
  drawFixedRects(); 
  randomRect();
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
  //Line thickness depends on canvas size
  strokeWeight(size / 40);
  
  //Create random positions for horizontal lines
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

// Create white wireframe in the four fixed rects
function drawFixedRects() {
  let size = min(windowWidth, windowHeight);

  // Apply perlin noise to each fixed rects
  drawPerlinNoiseFrames(0.037 * size, 0.186 * size, 0.125 * size, 0.2 * size, color(239, 17, 17)); 
  drawPerlinNoiseFrames(0.625 * size, 0.15 * size, 0.125 * size, 0.2 * size, color(43, 115, 247)); 
  drawPerlinNoiseFrames(0.138 * size, 0.725 * size, 0.2 * size, 0.125 * size, color(211, 211, 211)); 
  drawPerlinNoiseFrames(0.7 * size, 0.7 * size, 0.175 * size, 0.225 * size, color(239, 17, 17)); 
}

//Create shrinking wireframe each fresh
function drawPerlinNoiseFrames(x, y, w, h, baseColor) {
  fill(baseColor);
  noStroke();
  rect(x, y, w, h);


  // Control the number of white wireframe
  let steps = 20; 
  noFill();

  //function stroke(v1: number, v2: number, v3: number, alpha?: number)
  //alpha parameter controls the transparency of the stroke color
  stroke(255, 255, 255,150); 
  strokeWeight(1);

  // Draw wireframe layers inside the rect, making it gradually shrink
  for (let i = 0; i < steps; i++) {
    // use Perlin noise to control scaling and offset
    let noiseValue = noise(frameOffset + i * 0.1);
    //Control the shrinking range
    let scale = map(noiseValue, 0, 1, 0.9, 0.1); 
    // Make sure the offset in the center
    let offsetX = (w * (1 - scale)) / 2; 
    let offsetY = (h * (1 - scale)) / 2;


    //Draw wireframe based on shrinking scale
    rect(x + offsetX, y + offsetY, w * scale, h * scale); 
  }
    //Update frame offset for continuous animation effect
    frameOffset += 0.02; 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
