const game = new Game();

function preload() {
  game.preload();
}

function setup() {
  createCanvas(352, 198);
  noSmooth();
}

function draw() {
  console.log("It's working");
  game.draw();
}
