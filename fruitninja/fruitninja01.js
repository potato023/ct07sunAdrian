let dojobg;
let fruitgroup;
let fruittype = [watermelon,peach];
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
    world.gravity.y = 10;
    new Canvas(800,600);
}

function draw(){
    image(dojobg,0,0,innerWidth,height)
    fruitgroup = new group();
    if (framecount%120 ===0){
        spawnfruit();
    }
}

function spawnfruit(){
    let fruitdata = random(fruittype);
    let randomx = random(300,500);
    let fruit = new fruitgroup.sprite(randomx,height+20,40)
}