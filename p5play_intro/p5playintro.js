let ball;
let box;
let xo;
function setup() {
  // Set up the canvas
  new Canvas(800, 400);
  background(250); //background color
  
  world.gravity.y=10;
  let floor = new Sprite(400,390,800,20,'static'); // create a border so that when ball is spawn it will not go out of the canvas
  let topfloor = new Sprite(400,5,800,20,'static');
  let leftfloor = new Sprite(5,50,20,800,'static');
  let rightfloor = new Sprite(800,50,20,800,'static');
  floor.color = 'blue';
  topfloor.color ='blue';
  leftfloor.color = 'blue';
  rightfloor.color = 'blue';
  strokeWeight(0);

  // fill('skyblue');//fill the object with the color
  // stroke('pink');//create the border color
  // strokeWeight(10); //border thickness 

  // Basic shape testing 


  box = new Sprite(); //(x,y,w,h) //(x,y,D)
  box.x = 400;  
  box.y = 300;
  box.w = 30;// set the rect width
  box.h = 30;// set the rect height 
  box.color = 'red';

  // write your codes here
  circle(30,30,50); //circle(x,y,diameter)
  rect(50,50,100,200);//rect(x,y,width,height)
  circle(750,30,50);// create a circle top right
  circle(30,350,50);//create a circle bottom left
  circle(750,350,50);//create a cirle bottom right 

  // End Basic shape testing
   
   // Create a bouncing ball sprite
    ball = new Sprite();
    ball.x = 400;
    ball.y = 200;
    ball.diameter = 40;
    ball.color = 'yellow';
    ball.vel.x = 3; // set velocity for x-axis
    ball.vel.y = 3; // set velocity for y-axis
    ball.bounciness = 1; // for more realistic bounce
    ball.collider = 'dynamic';
    // write your codes here

}

function draw() {
  // write your codes here
  background(240); // clear screen each frame

  //show the coordinate for the ball sprite
  fill(0);
  textSize(16);
  text("Ball: ("+ int(ball.x) +","+int(ball.y)+")",10,20);
  text("Mouse: ("+ mouseX +","+mouseY+")",10,40);
  
  //if x posistion goes off the left or right
  if(ball.x < 0 +ball.diameter /2 || ball.x>width- ball.diameter/2){
    ball.vel.x *= -1; // change +x to -x vice versa
  }
  if(ball.y < 0 +ball.diameter /2 || ball.y>height- ball.diameter/2){
    ball.vel.y *= -1; // change +y to -y vice versa
  }
  
  //if left click is pressed new sprite of ball will be created
  if(mouse.presses('left')){
    xo = new Sprite(mouse.x,mouse.y, 30);
    xo.collider = 'dynamic';
    xo.bounciness = 1;
  }
  if(mouse.presses('right')){
    xo = new Sprite(mouse.x,mouse.y,100,20);
    xo.collider = 'dynamic';
    xo.bounciness = 1; 
  }
  
  // make rect follow the mouse
  box.x = mouseX;
  box.y = mouseY;
}