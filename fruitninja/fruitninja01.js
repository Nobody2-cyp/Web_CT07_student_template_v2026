let dojoBG;
let fruitGroup
let fruitTypes = [];
let trail;
let fruitHalves;
function preload(){
    dojoBG =loadImage('assets/dojobackground.png')
     let peach = {
        whole: loadImage('assets/peachwhole.png'),
        half1: loadImage('assets/peachhalf.png'),
        half2: loadImage('assets/peachhalf.png'),
    };
    let watermelon = {
        whole: loadImage('assets/watermelonwhole.png'),
        half1: loadImage('assets/watermelonhalf.png'),
        half2: loadImage('assets/watermelonhalf.png'),
    }
    fruitTypes = [peach, watermelon];
}

function setup(){
    new Canvas(800,600);
    world.gravity.y = 10;
    fruitGroup = new Group();
    fruitHalves = new Group();
}

function draw(){
    clear();
    image(dojoBG, 0, 0, width, height);
    if (frameCount %120 === 0){
        spawnFruit();
         
    }
    if (mouse.pressing()){
            trail = new Sprite(mouse.x, mouse.y, 7);
            trail.collider = 'none';
            trail.color = 'blue';
            trail.life = 10;
    }
}

function spawnFruit(){
    let fruitData = random(fruitTypes);
    let randomX = random(300, 500)
    let fruit = new fruitGroup.Sprite(randomX, height+20, 40);
    fruit.image = fruitData.whole
    fruit.type = fruitData;
    fruit.vel.y = random(-10, -15);
    fruit.vel.x = random(-2, 2);
    fruit.friction = 0;
}
function sliceFruit(){
for (let fruit of fruitGroup){
    if (fruit.sliced){
        continue;
    }

    let d = dist(mouse.x, mouse.y, fruit.x, fruit.y);

    if((d < fruit.width/2) + 5){
        fruit.sliced = true;
        const fx = fruit.x;
        const fy = fruit.y;
        fruit.remove();
        splitFruit(fx, fy, fruit.type);
        break;
    }
}
}
function splitFruit(x, y, fruitData){
    let half1 = new fruitHalves.Sprite(x, y, 20);
    half1.image = fruitData.half1;
    half1.vel.x = -3;
    half1.vel.y = random(-5, -2);
    half1.rotationSpeed = random-5;
    half1.life = 30;
let right = new fruitHalves.Sprite(x+ 10, y, 20);
}
