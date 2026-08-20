let digitImgs =[];
let digitLabel;
let score = 7;
function preload() {
    digitImg = loadImage("assets/7.png");
    let prefix = "assets/";
    let suffix = ".png";
    let filename = "";

    for (let count=0; count<10; count++) {
        filename = prefix + count + suffix;
        print(filename);
        digitImg = loadImage(filename);
    }
}
function setup() {
    new Canvas(400, 600);

    digitLabel = new Sprite();
    digitLabel.y = 50;
    digitLabel.w = 25;
    digitLabel.h = 36;
    digitLabel.collider = "none";
    digitLabel.img = digitImgs[score];
}
function draw() {
    background("skyblue");
    digitLabel.img = digitImgs[score];

// add keyboard events
// up arrow to increase score
// down arrow to decrease score
if (kb.pressed("up")) {
    score++;
}
if (kb.pressed("down")) {
    score--;
}
score = constrain(score, 0, 9);
}