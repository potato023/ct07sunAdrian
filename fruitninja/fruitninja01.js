let fruitGroup;
let fruitTypes =[];
let dogoBG;
let fruitHalves;
let score=0;
let missFruits =0;
let gameState= 'start';
let sliceSound;
let backgroundTrack;
let gameStartTime = 0;
let gameTimer =0;
let gameduration =10;
let difficulyNumFruits =1;
let lastDifficultyIncrease=0;
function preload(){
     dogoBG = loadImage('assets/dojobackground.png');
    //declare peach 
    let peach = {
        whole:loadImage('assets/peachwhole.png'),
        half:loadImage('assets/peachhalf.png')
    };
    let watermelon = {
        whole:loadImage('assets/watermelonwhole.png'),
        half: loadImage('assets/watermelonhalf.png')
    }
    //store the fruit objject into fruitTypes array[]
    fruitTypes = [peach,watermelon];
    sliceSound = loadSound('assets/fruit-ninja-combo.mp3');
    backgroundTrack = loadSound('assets/fruit-ninja-bgtrack.mp3');
}
function setup(){
    new Canvas(800,600);
    //set gravity to 10
    world.gravity.y = 10;
    fruitGroup= new Group();
    fruitHalves = new Group();
}
function draw(){
    clear();
    image(dogoBG,0,0,width,height);
    if((kb.presses(' ')||mouse.presses()) && (gameState==='start' || gameState==='gameover')){
           gameState ='play';
           score =0;
           missFruits =0;
           fruitGroup.removeAll();
           fruitHalves.removeAll();
           gameStartTime = millis();
           gameTimer=0;
           difficulyNumFruits =1;
    }
    if(gameState === 'start'){
        backgroundTrack.stop();
        fill(0,180);
        rect(0,0,width,height);
        fill(255);
        textAlign(CENTER,CENTER);
        textSize(48);
        text('Fruit Ninja',width/2,height/2);
        textSize(24);
        text('Press SPACE or Click to Start',width/2,height/2+30);
        return;
    }
    if(gameState ==="play"){
    // % refers to the remainder so if framecount / by 120 and the remainder is 0 then i call spawnfruit function
        if(frameCount % 120 === 0){
            for(let i=0;i<difficulyNumFruits;i++){
                spawnFruit();
            }    
        }
        if(gameTimer - lastDifficultyIncrease>=15){
            difficulyNumFruits +=1;
            lastDifficultyIncrease = gameTimer;
        }
        if(mouse.pressing()){
            trail = new Sprite(mouse.x,mouse.y,7);
            trail.collider = 'none';
            trail.color ="red";
            trail.life = 10;
            sliceFruit();
        }
        //trrying access the items in the group
        for(fruits of fruitGroup){
            if(fruits.y> height +50){
                fruits.remove();
                missFruits +=1;
            }
            // if(missFruits==3){
            //     noLoop();
            // }
        }
        stroke(158,69,69);
        fill(255);
        textSize(24);
        textAlign(LEFT,TOP);
        text ('Score:' + score ,10,10);
        text('Missed:' + missFruits,200,10);
        if(!backgroundTrack.isPlaying()){
            backgroundTrack.loop();
        }
        gameTimer =floor((millis()-gameStartTime)/1000);
        text('Time:'+(gameduration-gameTimer),400,10);
        if(gameTimer >= gameduration){
            gameState='gameover';
            return;
        }
    }
    if(gameState==='gameover'){
        backgroundTrack.stop();
        fill(0,180);
        rect(0,0,width,height);
        fill(255,0,0);
        textAlign(CENTER,CENTER);
        textSize(48);
        text('GAME OVER',width/2,height/2-60);
        textSize(24);
        fill(255);
        text('Score:'+score,width/2,height/2);
        text('Missed Fruits:'+missFruits,width/2,height/2+40);
        text('Press SPACE or Click to Start',width/2,height/2+80);
        if((kb.presses(' ')||mouse.presses()) && (gameState==='start' || gameState==='gameover')){
           gameState ='play';
           score =0;
           missFruits =0;
           fruitGroup.removeAll();
           fruitHalves.removeAll();
           gameStartTime = millis();
           gameTimer=0;
           difficulyNumFruits =1;
    }
        return; 
    }
}
function spawnFruit(){
    let fruitData = random(fruitTypes);
    let randomX = random(300,500);
    let fruit = new fruitGroup.Sprite(randomX,600+20,40); 
    fruit.image = fruitData.whole;
    fruit.type = fruitData;
    fruit.vel.y = random(-10,-14);
    fruit.vel.x = random(-2,2);
    fruit.friction = 0;
}
function sliceFruit(){
    for(let fruit of fruitGroup){
        if(fruit.sliced){
            continue;
        }
        let distance  = dist(mouse.x,mouse.y,fruit.x,fruit.y);
        if(distance<((fruit.diameter/2)+5)){
            const fx = fruit.x;
            const fy = fruit.y;
            fruit.sliced= true;
            fruit.remove();
            sliceSound.play();
            splitFruit(fx,fy,fruit.type);
            score +=1;
            break;
        }
    }
}
function splitFruit(x,y,fruitData){
    let left = new fruitHalves.Sprite(x-10,y,40,40);
    left.img = fruitData.half;
    //set the physics
    left.vel.x = -3;
    left.vel.y = random(-5,-2);
    left.rotationSpeed = -5;
    left.life = 30;
    //do for the right as well
    let right = new fruitHalves.Sprite(x-10,y,40,40);
    right.img = fruitData.half;
    //set the physics
    right.vel.x = 3;
    right.vel.y = random(-5,-2);
    right.rotationSpeed = 5;
    right.life = 30;
}