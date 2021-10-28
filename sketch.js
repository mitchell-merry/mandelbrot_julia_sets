// represents what each pixel represents on the real number plane
var scale;
// Amount to change the scale when scrolling
var scaleChangeAmount = 0.01;

// bounds of the screen according to the real numbers
var leftBound = -2, rightBound = 2, topBound, bottomBound;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Starting scale is from -2 to 2 on the x axis
  scale = 4/windowWidth;

  // Get top and bottom bound from this
  topBound = -scale*windowHeight/2;
  bottomBound = scale*windowHeight/2;
  
}

function draw() {
  background(255);
  ellipse(realXtoPixelX(-0.5), realYtoPixelY(0.5), realSizetoPixelSize(0.25), realSizetoPixelSize(0.25));
  ellipse(realXtoPixelX(0), realYtoPixelY(0), realSizetoPixelSize(0.01), realSizetoPixelSize(0.01))
  ellipse(realXtoPixelX(0.01), realYtoPixelY(0.01), realSizetoPixelSize(0.0001), realSizetoPixelSize(0.0001))

}

// change the camera zoom - amount is a percentage of the current zoom (e.g. 0.999)
// aroundX/Y is the point around which to zoom (real)
function zoom(amount, aroundX, aroundY) {
  scale *= amount;

  leftBound = aroundX - (aroundX-leftBound) * amount;
  rightBound = aroundX + (rightBound-aroundX) * amount;
  
  topBound = aroundY - (aroundY - topBound) * amount;
  bottomBound = aroundY + (bottomBound - aroundY) * amount;
}

function mouseWheel(event) {
  zoom(1 + 0.0001 * event.delta, pixelXtoRealX(mouseX), pixelYtoRealY(mouseY));

  // prevent scrolling
  return false;
}

// drag across the plane
function mouseDragged(event) {
  leftBound -= pixelSizetoRealSize(event.movementX);
  rightBound -= pixelSizetoRealSize(event.movementX);
  topBound += pixelSizetoRealSize(event.movementY);
  bottomBound += pixelSizetoRealSize(event.movementY);

  return false;
}

// Convert a pixel position on the x/y-axis to the equivalent position on the cartesian (?!) plane on the x/y-axis, and vice-versa
function pixelXtoRealX(x) { return map(x, 0, windowWidth, leftBound, rightBound); }
function pixelYtoRealY(y) { return map(y, windowHeight, 0, topBound, bottomBound); }
function realXtoPixelX(x) { return map(x, leftBound, rightBound, 0, windowWidth); }
function realYtoPixelY(y) { return map(y, topBound, bottomBound, windowHeight, 0); }

// scale = real / pixel
// pixel = real / scale
// real  = scale * pixel
function realSizetoPixelSize(size) { return size/scale; }
function pixelSizetoRealSize(size) { return size*scale; }

// Gets the left/right/top/bottom bounds of the canvas as real numbers according to scale/center 
// function getLeftBound() { return center.x-scale*windowWidth/2; }
// function getRightBound() { return center.x+scale*windowWidth/2; }
// function getTopBound() { return center.y-scale*windowHeight/2; }
// function getBottomBound() { return center.y+scale*windowHeight/2; }

// https://stackoverflow.com/questions/44061621/how-can-i-resize-my-canvas-to-fit-the-browser-window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log(scale*windowWidth);
}