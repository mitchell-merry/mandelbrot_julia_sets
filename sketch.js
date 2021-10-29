// represents what each pixel represents on the real number plane
var scale;

// bounds of the screen according to the real numbers
var leftBound = -2, rightBound = 0.5, topBound, bottomBound;

var W = 550, H = W;

function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(W, H);

  // Starting scale is from -2 to 2 on the x axis
  scale = (rightBound-leftBound)/width;

  // Get top and bottom bound from this
  topBound = -scale*height/2;
  bottomBound = scale*height/2;

  updatePlane();
}

function updatePlane() {
  loadPixels();
  
  var realX = leftBound;
  for(var pixelX = 0; pixelX < width; pixelX++) {
    
    var realY = topBound;
    for(var pixelY = 0; pixelY < height; pixelY++) {

      // var [ realX, realY ] = [ pixelXtoRealX(pixelX), pixelYtoRealY(pixelY) ];

      var isU = isUnbounded(realX, realY); 
      
      var pix = (pixelX + pixelY * width) * 4;
      var bright = isU ? 255 : 0;
      pixels[pix] = bright;
      pixels[pix+1] = bright;
      pixels[pix+2] = bright;
      pixels[pix+3] = 255;
      realY += scale;
    }
    
    realX += scale;
  }
  updatePixels();
}

// change the camera zoom - amount is a percentage of the current zoom (e.g. 0.999)
// aroundX/Y is the point around which to zoom (real)
function zoom(amount, aroundX, aroundY) {
  scale *= amount;

  // completely forgot how this works lmfao - but it is original
  leftBound = aroundX - (aroundX - leftBound) * amount;
  rightBound = aroundX + (rightBound - aroundX) * amount;
  
  topBound = aroundY - (aroundY - topBound) * amount;
  bottomBound = aroundY + (bottomBound - aroundY) * amount;

  updatePlane();
}

function mouseWheel(event) {
  zoom(1 + 0.0005 * event.delta, pixelXtoRealX(mouseX), pixelYtoRealY(mouseY));

  // prevent scrolling
  return false;
}

// drag across the plane
function mouseDragged(event) {
  leftBound -= pixelSizetoRealSize(event.movementX);
  rightBound -= pixelSizetoRealSize(event.movementX);
  topBound -= pixelSizetoRealSize(event.movementY);
  bottomBound -= pixelSizetoRealSize(event.movementY);

  updatePlane();

  return false;
}

// Convert a pixel position on the x/y-axis to the equivalent position on the cartesian (?!) plane on the x/y-axis, and vice-versa
function pixelXtoRealX(x) { return map(x, 0, width, leftBound, rightBound); }
function pixelYtoRealY(y) { return map(y, 0, height, topBound, bottomBound); }
function realXtoPixelX(x) { return map(x, leftBound, rightBound, 0, width); }
function realYtoPixelY(y) { return map(y, topBound, bottomBound, 0, height); }

// scale = real / pixel
// pixel = real / scale
// real  = scale * pixel
function realSizetoPixelSize(size) { return size/scale; }
function pixelSizetoRealSize(size) { return size*scale; }

// https://stackoverflow.com/questions/44061621/how-can-i-resize-my-canvas-to-fit-the-browser-window
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   updatePlane();
// }