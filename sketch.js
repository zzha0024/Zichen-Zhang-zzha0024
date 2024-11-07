
let frames = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  //constructor NoisyFrame(x: any, y: any, w: any, h: any, baseColor: any)
  //creating four frames with noise animation
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
    //display each frame with noise animation
    frame.display(); 
  }
}

//draw random lines, generating a random yellow grid 
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

//create a class for NoisyFrame
class NoisyFrame {
  constructor(x, y, w, h, baseColor) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.baseColor = baseColor;
    //randomly initialize noise effect
    this.noiseOffset = random(10); 
  }

  //function to display the frame with noise animation
  display() {
    fill(this.baseColor);
    noStroke();
    rect(this.x, this.y, this.w, this.h);

    // draw wireframe in the fixed rects
    this.drawNoisyFrames();
  }

  drawNoisyFrames() {
    noFill();
    stroke(255, 255, 255, 150); 
    strokeWeight(1);

    //Number of shrinking frames
    let steps = 10; 

    for (let i = 0; i < steps; i++) {
      let noiseValue = noise(this.noiseOffset + i * 0.1);
      //map noise value to scaling 
      let scale = map(noiseValue, 0, 1, 1, 0.05); 
      let offsetX = (this.w * (1 - scale)) / 2;
      let offsetY = (this.h * (1 - scale)) / 2;

      rect(this.x + offsetX, this.y + offsetY, this.w * scale, this.h * scale);
    }

    // increase noise offset to create an animation 
    this.noiseOffset += 0.01;
    //use setInterval to call display() 60 times per second
    setInterval(() => this.display(), 60);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
