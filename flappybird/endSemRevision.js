let birdImg;
let backgroundImg;
let bird;
function preload() {
    //bird image, background and the floor
    birdImg = loadImage('assets/bluebird-midflap.png');
    backgroundImg = loadImage('assets/background-night.png');
}
function setup() {
    new Canvas(400, 600);
    
    bird = new Sprite();
    bird.x = width / 2;
    bird.y = height / 2;
    bird.width = 30;
    bird.height = 30;
    bird.img = birdImg;
    world.gravity.y = 10;
}
function draw() {
    if (kb.presses('space')) {
        bird.vel.y = -5;
        bird.sleeping = false;
    }
    image(backgroundImg, 0, 0, width, height);

}
