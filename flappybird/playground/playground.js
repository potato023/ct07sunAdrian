//1)create two main functions
//2)set up canvas (800,400)
//3)declare a var square and create a  sqaure sprite (X,Y,Width,Hegiht)
//x = midpoint of canvas y midpoint of canvas
//4)declare a var circle and create a circle sprite (X,Y,D)
//x= 100, y = 350 , D of ur choosing
//5)declare a var pipe and create a new group
//setup gravity
//7)while loop syntax and for loop syntax
//6)left click create a dynamic circle add in bounciness and gravity
//add in color red to ballsprite
circle = new sprite()
circle.color='red';
//8)create a sprite at mouse position 
//9)declare var popimage and preload it in preload function
//10)// --- Exercise: Age category classification --- 
//if score 90 A ifscore70 b else c.

let square
let circle
let pipe
function setup(){
    new canvas (800,400);
    pipe = new group();
    world.gravity.y=10;

}
function draw(){
        while(i>0){
        i++
    }
    for(let i in 0){
        i++
    }
    if(mouse.presses('left')){
        dyncircle=new sprite(mouse.x,mouse.y,10)
        dyncircle.bounciness=1
        dyncircle.gravity.y=10
    }
    if(mouse.presses('right')){
        circle=new sprite(mouse.x,mouse.y,10)
    }

    square=new sprite(400,200,10,10);
    circle=new sprite(100,350,10);  
}

function preload(){
    let popimage;
}