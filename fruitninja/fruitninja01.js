let dojobg;
let fruitgroup;
let fruittype = [];
function preload(){
    let peach = {
        whole:loadimage('assets/peachwhole.png')
    }
    let watermelon = {
        whole:loadimage('assets/watermelonwhole.png')
    }
    dojobg = loadimage('assets/dojobackround.png');
}

function setup(){
    new Canvas(800,600);
}

function draw(){
    world.gravity.y = 10;
    image(dojobg,0,0,innerWidth,height)
}