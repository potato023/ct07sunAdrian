let dojobg;
let fruitgroup;
let fruittype = [];
function preload(){
    dojobg = loadimage('assets/dojobackround.png');
}

function setup(){
    let peach = {
        whole:loadimage('assets/dojobackround.png')
    }
    new Canvas(800,600);
}

function draw(){
    world.gravity.y = 10;
    image(dojobg,0,0,innerWidth,height)
}