let bird, floor;
letflapMidImg, bg;

function preload() {
    //bird image, background and the floor
    flapMidImg = loadImage('assets/yellowbird-midflap.png');
    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');
function setup() {
    new Canvas(400, 600);

    floor = new Sprite();
    floor.x = 200;
    floor.y = height - 20;
    floor.width = 400;
    floor.height = 125;
    floor.collider = "static";
    floor.img = base; 

    bird.collider = "dynamic";
    bird.mass = 2;
    bird.drag = 0.02;
    world.gravity.y = 10;
    bird = new bird = new Sprite();
    bird.x = width / 2;
    bird.y = 200
    bird.width = 30;
    bird.height = 30;
    bird.img = flapMidImg
    }
    function draw(){
        Image(bg, 0, 0, width, height);
        
        if (kb.presses('space')) {
            bird.vel.y = -15;
            bird.sleeping = false
            fill("blue");
            textSize(14);
            text('vel.y: ' + bird.vel.y.toFixed(2), 10, 20);
            text( 'isMoving: ' + bird.isMoving, 10, 40);
            text('sleeping: ' + bird.sleeping , 10, 60);
        }
    }
}