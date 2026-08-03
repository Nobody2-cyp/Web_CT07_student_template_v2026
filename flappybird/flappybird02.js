let bird, floor;
let flapMidImg, bg, base;
let flapUpImg, flapDownImg;
let pipeGroup;
let pipe;
let topPipe, bottomPipe;
let gameoverImg;
let gameoverLabel;
let startScreenLabel;
let startScreemImg;
function preload() {
    //bird image, background and the floor
    startScreenImg = loadImage('assets/message.png')
    gameoverImg = loadImage('assets/gameover.png')
    flapMidImg = loadImage('assets/yellowbird-midflap.png');
    flapUpImg = loadImage('assets/yellowbird-upflap.png');
    flapDownImg = loadImage('assets/yellowbird-downflap.png');
    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');
    
    pipe = loadImage('assets/pipe-green.png');
}

function setup() {
    new Canvas(400, 600);
    pipeGroup = new Group();
    floor = new Sprite();
    floor.x = 200;
    floor.y = height - 20;
    floor.width = 400;
    floor.height = 125;
    floor.collider = "static";
    floor.img = base; 



    bird = new Sprite();
    bird.x = width / 2;
    bird.y = 200
    bird.width = 30;
    bird.height = 30;
    bird.img = flapMidImg
    bird.collider = "dynamic";
    bird.mass = 2;
    bird.drag = 0.02;
    world.gravity.y = 10;

  
}
    


function draw(){


    if (bird.collides(pipeGroup) || bird.collides(floor)){
        gameoverLabel = new Sprite(width/2, height/2, 192, 42);
        gameoverLabel.img = gameoverImg;
    gameoverLabel.layer = 100;
    gameoverLabel.x = camera.x;
        noLoop();
    }
    

    

    
    bird.x += 3;
    camera.x = bird.x;
    floor.x = bird.x;
    if (frameCount % 90 === 0){
        spawnPipePair();
    }
    for (let pipe of pipeGroup){
        if (pipe.x < -50){
            pipe.remove();
        }
    }
    image(bg, 0, 0, width, height);
    if (frameCount === 1){
        spawnPipePair();
    }

    if (kb.presses('space')) {
        bird.vel.y = -5;
        bird.sleeping = false
    
    }

    if (bird.vel.y < 0) {
        bird.img = flapDownImg
    
    }
    if (bird.vel.y > 0) {
        bird.img = flapUpImg
        
    }
    if (bird.vel.y == 0){
         bird.img = flapMidImg

    }

    fill("blue");
    textSize(14);
    text('vel.y: ' + bird.vel.y.toFixed(2), 10, 20);
    text( 'isMoving: ' + bird.isMoving, 10, 40);
    text('sleeping: ' + bird.sleeping , 10, 60);

}

function spawnPipePair() {
    let gap = 50;
    let midY = random(250, height - 250);

    
    bottomPipe = new Sprite(bird.x + 400, midY + gap / 2 + 200, 52, 320, 'Static');
    bottomPipe.img = pipe;

    topPipe = new Sprite(bird.x + 400, midY - gap / 2 -200, 52, 320, 'static');
    topPipe.img = pipe;
    topPipe.rotation = 180;

    pipeGroup.add(topPipe);
    pipeGroup.add(bottomPipe);
    pipeGroup.layer = 0;
}