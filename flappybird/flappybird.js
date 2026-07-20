let bird, floor;
letflapMidImg, bg, BaseAudioContext;

function preload() {
    //bird image, background and the floor
    flapMidImg = loadImage('assets/yellowbird-midflap.png');
    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');
function setup() {
    new Canvas(400, 600);


    bird
    bird = new bird = new Sprite();
    bird.x = width / 2;
    bird.y = 200
    bird.width = 30;
    bird.height = 30;
    bird.img = flapMidImg
    }
    function draw(){
        Image(bg, 0, 0, width, height);
    }
}