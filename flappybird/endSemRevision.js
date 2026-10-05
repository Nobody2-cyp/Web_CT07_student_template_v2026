let bird, floor;
let pipeGroup;
let pipe;
let topPipe, bottomPipe;
let gameoverImg;
let gameoverLabel;
let startScreenLabel;
let startScreenImg;
let startGame = false;
function preload() {
    //bird image, background and the floor
    startScreenImg = loadImage('assets/message.png')
    gameoverImg = loadImage('assets/gameover.png')
    flapMidImg = loadImage('assets/bluebird-midflap.png');
    bg = loadImage('assets/background-night.png');
    base = loadImage('assets/base.png');
function preload() {
    pipe = loadImage('assets/pipe-green.png');

        if (kb.presses('space')
        
        ) {
            bird.vel.y = -5;
            bird.sleeping = false

        }

        

        }
        if (bird.vel.y == 0) {
            bird.img = flapMidImg

        }
    }