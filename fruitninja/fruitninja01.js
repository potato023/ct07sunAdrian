let dojobg;

function preload(){
    dojobg = loadimage('assets/doj')
}

function setup(){
    new Canvas(800,600);
}

function draw(){
    watermelon = new sprite();
    world.gravity.y = 10;
}