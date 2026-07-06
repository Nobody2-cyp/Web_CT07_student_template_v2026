let ball;
let box; 

function setup() {
  // Set up the canvas
  new Canvas(800, 400);
  background(250); //background color


  ball = new Sprite();
  ball.x = 100;
  ball.y = 200;
  ball.diameter = 40;
  ball.color = 'blue';
  ball.vel.x = 30;
  ball.vel.

  // ball = new Sprite();
  // ball.x = 100;
  // ball.y = 100;
  // ball.w = 50;
  // ball.h = 50;
  // box.color = "green"

  fill("skyblue");
  stroke("pink")
  strokeWeight(10);

  circle(30,30,50);
  rect(50,50,100,200);

}

  // Basic shape testing
  // write your codes here
 
  // End Basic shape testing

   // Create a bouncing ball sprite
   // write your codes here



function draw() {
  // write your codes here
background(240);
fill(0);
text("Ball:  ("+int(ball.x)+", "+ int(ball.y) + ")", 10, 20);

text("Mouse: (" + mouseX + ", " + mouseY + ")", 10, 40);
if (ball.x < 0 + ball.diameter / 2 || ball.x > width - ball.diameter / 2){
    ball.vel.x *= -1;
}

if (ball.y < 0 + ball.diameter / 2 || ball.y > height - ball.diameter / 2) {
  ball.vel.y *=-1;
}


// box.x = mouseX;
// box.y = mouseY;

}