//two must have function 1)setup 2)draw
let bird ,floor;
let bg, base, flapMidImg, flapDownImg, flapUpImg;
let bird2;
let gameoverLabel, gameoverImg;
let pipeGroup;
let pipe;
let topPipe, bottomPipe;
let startScreenLabel, startScreenImg;
let startGame = false;
let score = 0;
let numberimages = [];


//load the images before game starts
function preload(){
  bg = loadImage('assets/background-day.png');
  base = loadImage('assets/base.png');
  flapMidImg = loadImage('assets/yellowbird-midflap.png');
  flapUpImg = loadImage('assets/yellowbird-upflap.png');
  flapDownImg = loadImage('assets/yellowbird-downflap.png');
  gameoverImg = loadImage('assets/gameover.png');
  pipe= loadImage("assets/pipe-green.png");
  startScreenImg = loadImage('assets/message.png');
}

function setup(){
//to create a new Canvas
 new Canvas(400,600);

 bird = new Sprite();//sprite(x,y,w,h)
 bird.x =  width/2;
 bird.y = 200;
 bird.width = 30;
 bird.height = 30;
 bird.img = flapMidImg; //call image to  asprite

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

 pipeGroup = new Group();
 //setup start message and display 
 //create new sprite startscreenlabel
 startScreenLabel = new Sprite(width/2,height/2,50,50,'none');
 //width/2, height/2,50,50,'none;
 //load image to startScreenLabel
 startScreenLabel.img = startScreenImg;
}

function draw(){
  image(bg,0,0,width,height); // draw the bg
  
  //if press space or press mouse left click startgame = true;
  if(kb.presses('space') || mouse.presses('left')){
    startGame = true;
    //set screenlabel visibility to false
    startScreenLabel.visible = false;
    //set bird visibility to true;
    bird.visible = true;
  }
  
  if(startGame){
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
  
  bird.x +=3;//shfiting the bird 3 pixels every frame
  camera.x = bird.x;
  floor.x = camera.x;


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

  if(frameCount===1){
    spawnPipePair();
  }

  if(frameCount % 90 === 0){
    spawnPipePair();//spawn the pipe every 1.5 seconds
  }
  
  //remove off screenpipes
  for (let pipe of pipeGroup){
    if (pipe.x < -50){
      pipe.remove();
    }
  }

  if(bird.collides(pipeGroup) || bird.collides(floor)){
    //create new sprite var name = gameoverLabel
    //x = width/2 y= height / 2, w=192, h=42
    //load the image into the sprite(gameoverLabel)
    gameoverLabel = new Sprite(width/2,height/2,192,42);
    gameoverLabel.img = gameoverImg
    gameoverLabel.layer = 100;
    gameoverLabel.x = camera.x;
    noLoop();// noLoop() paused the entire draw() loop function
  }
  }
}

function spawnPipePair(){

    let gap= 50;
    let midY = random(250, height-250);
    topPipe = new Sprite(bird.x+400, midY-gap /2 -200, 52,320 , 'static')
    topPipe.img=pipe;
    topPipe.rotation=180;
    bottomPipe=  new Sprite(bird.x+400, midY+gap /2 +200, 52,320 , 'static') 
    bottomPipe.img=pipe;
    pipeGroup.add(topPipe);
    pipeGroup.add(bottomPipe);
    pipeGroup.layer=0;


}
