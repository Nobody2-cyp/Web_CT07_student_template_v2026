let digitImgs =[];
let digitLabel;
let score = 1;
let ScoreGroup;
function preload() {
    digitImg = loadImage("assets/7.png");
    let prefix = "assets/";
    let suffix = ".png";
    let filename = "";

    for (let count=0; count<10; count++) {
        filename = prefix + count + suffix;
        //print(filename);
        digitImgs[count] = loadImage(filename);
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

    scoreGroup = new Group();
    scoreGroup.collider = "none";
}
function draw() {
    background("skyblue");
    digitLabel.img = digitImgs[score];
    textSize(14);
    text("score: " + score, 50, 50);
    text("frameCount: " + frameCount, 50, 70);
}
// add keyboard events
// up arrow to increase score
// down arrow to decrease score
if (kb.pressed("up")) {
    score++;
}
else if (kb.pressed("down")) {
    score--;
}
else if (kb.presses("2")) {


}
function drawScore() {
    let scoreStr = str(score);
    let digitArray = scoreStr.split("");
    // print(digitArray.length);
    // print(digitArray[0]);
    // print(digitArray[1]);

    // if (score > 10) {
    //     noLoop();
}
function moveGroup() {
}
