//two must have function 1)setup 2)draw
let bird , floor;
let bg, base, flapMidImg, flapDownImg, flapUpImg;
let bird2;
//load the images before game starts
function preload(){
  bg = loadImage('assets/background-day.png');
  base = loadImage('assets/base.png');
  flapMidImg = loadImage('assets/yellowbird-midflap.png');
  flapUpImg = loadImage('assets/yellowbird-upflap.png');
  flapDownImg = loadImage('assets/yellowbird-downflap.png');
}

function setup(){
//to create a new Canvas
 new Canvas(400,600);
 bird = new Sprite();
 bird.x =  width/2;
 bird.y = 200;
 bird.width = 30;
 bird.height = 30;
 bird.img = flapMidImg;

 //bird physics
 bird.collider ='dynamic';
 bird.mass =2;
 bird.drag = 0.02;
 bird.bounciness = 0.5;
 world.gravity.y = 10;
 
 floor = new Sprite();
 floor.x = 200;
 floor.y = height -20;
 floor.width = 400;
 floor.height = 125;
 floor.collider = 'static';
 floor.img = base;

}

function draw(){
  image(bg,0,0,width,height); // draw the bg

  if(kb.presses('space') || mouse.presses('left')){
    bird.vel.y = -5;
    bird.sleeping = false;
  }

  // if(mouse.presses('left')){
  //   bird2 = new Sprite(mouse.x,mouse.y,30,30,'dynamic');
  //   bird2.img = flapMidImg
  // }
  // if(mouse.presses('right')){
  //   bird2= new Sprite(mouse.x,mouse.y,30,30,'static');
  //   bird2.img = flapMidImg
  // }
  
  if(bird.vel.y <-1){
    bird.img = flapUpImg;
    bird.rotation = -30;
  }else if(bird.vel.y>1){
    bird.img = flapDownImg;
    bird.rotation = 30;
  }else{
    bird.img = flapMidImg;
    bird.rotation = 0;
  }
}