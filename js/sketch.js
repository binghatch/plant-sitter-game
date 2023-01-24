const game = new Game();

function preload() {
  game.preload();
}

function setup() {
  createCanvas(352, 198);
  noSmooth();
  game.setup();
}

function draw() {
  game.draw();
}

function keyPressed() {
  game.userInput.keyPressed(keyCode);
}

function keyReleased() {
  game.userInput.keyReleased(keyCode);
}