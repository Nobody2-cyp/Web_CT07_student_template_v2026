let bird, floor;

function preload() {
    //bird image, background and the floor
    startScreenImg = loadImage('assets/message.png')
    flapMidImg = loadImage('assets/bluebird-midflap.png');
    bg = loadImage('assets/background-night.png');
    base = loadImage('assets/base.png');
}

function preload() {
    

        if (kb.presses('space'))
        
    {
            bird.vel.y = -5;
            bird.sleeping = false
    }
}