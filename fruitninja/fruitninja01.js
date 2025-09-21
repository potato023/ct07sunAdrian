let dojobg;

function preload(){
    dojobg = loadimage('assets/dojobackround.png');
}

function setup(){
    new Canvas(800,600);
}

function draw(){
    world.gravity.y = 10;
    image(dojobg)
}