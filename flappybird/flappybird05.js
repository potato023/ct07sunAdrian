let bird, floor; // objects
let flapMidImg,  bg, base; // images
let flapUpImg,flapDownImg; // images for flap up and down
let pipe; // image for pipes
let topPipe, bottomPipe;
let pipeGroup; // declare the group for pipe
let gameoverImg; // declare variable for image
let gameoverLabel; // declare variable for game over sprite
let startGame = false;

let startScreenLabel; // declare variable for start screen
let startScreenImg; // declare variable for image

// scoring
let score = 0;
let numberImages = []; // store number/score images
let scoreDigits; // group for storing the different numbers

// sound assets
let flapSound, pointSound, failSound;

function preload() {
    // bird image, background and the floor
    flapMidImg = loadImage('assets/yellowbird-midflap.png'); 
    // preload images for flap up and down
    flapUpImg = loadImage('assets/yellowbird-upflap.png');
    flapDownImg = loadImage('assets/yellowbird-downflap.png')

    pipe = loadImage('assets/pipe-green.png'); // preload image for pipe

    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');

    gameoverImg = loadImage('assets/gameover.png'); // preload the image

    startScreenImg = loadImage('assets/message.png'); // preload the image

    for (let i = 0; i < 10; i++){
      numberImages[i] = loadImage('assets/' + i +'.png');
    }

    // sound assets
    flapSound = createAudio('assets/sfx_wing.mp3');
    pointSound = createAudio('assets/sfx_point.mp3');
    failSound = createAudio('assets/sfx_die.mp3');  
}

function setup() {
  new Canvas(400, 600);

  // Bird Sprite construction
  bird = new Sprite();
  bird.x = width / 2;
  bird.y = 200,
  bird.width = 30;
  bird.height = 30;
  bird.img = flapMidImg; // defined earlier in preload()
  bird.visible = false;

  // setting bird physics
  bird.collider = "static"; 
  bird.mass = 2;         // heavier = stronger pull from gravity
  bird.drag = 0.02;      // air resistance
  bird.bounciness = 0.5; // how much it bounces when hitting floor
  world.gravity.y = 10;

  // Floor to bounce bird
  floor = new Sprite();
  floor.x = 200;
  floor.y = height - 20;
  floor.width = 400;
  floor.height = 125;
  floor.collider = "static"; 
  floor.img = base;

  pipeGroup = new Group();

  // setup the start message and display
  startScreenLabel = new Sprite(width/2, height/2, 50, 50, 'none');
  startScreenLabel.img = startScreenImg;

  // setup group for score
  scoreDigits = new Group();
  scoreDigits.collider = 'none';
  scoreDigits.layer = 1000;
}

function draw() {
  image(bg, 0, 0, width, height);        

  // at start of game, press space or mouse to start
  if (kb.presses('space') || mouse.presses()){
    startGame = true;
    startScreenLabel.visible = false;
    bird.visible = true;
  }

  // if startGame flag is true, then run all the other code
  if (startGame){
    // new code to make bird dynamic only when game start
    bird.collider = "dynamic"; 
  // make the bird move "forward"
    bird.x += 2; // make the bird move forward
    camera.x = bird.x; // "lock" the camera pos to the bird.x pos
    floor.x = camera.x;// "lock" the floor pos to the bird.x pos

      // Apply upward push when space is pressed
    if (kb.presses('space') || mouse.presses()) {
      bird.vel.y = -5; // which direction do you think this is?
      bird.sleeping = false; // wake up if sleeping
      flapSound.play();
    }
    
    // Activity: Change image according to flying action/ falling
    if (bird.vel.y < -1) {
      bird.img = flapUpImg; // flying upward
      bird.rotation = -30; // rotate up
    } 
    else if (bird.vel.y > 1) {
      bird.img = flapDownImg; // falling
      bird.rotation = 30; // rotate down
    } 
    else {
      bird.img = flapMidImg; // neutral
      bird.rotation = 0;
    }

    if (frameCount === 1){
      spawnPipePair();
    }

    if (frameCount % 120 === 0){
      spawnPipePair();
    }

    // remove offscreenpipes
    for (let pipe of pipeGroup){
      if (pipe.x < -50){
        pipe.remove();
      }
    }

    // increase score if pipe passed
    for (let pipe of pipeGroup) {
      // center pos + half pipe width = right edge pos
      let pipeRightEdge = pipe.x + pipe.w / 2; 

      // center pos - half bird width = left edge pos
      let birdLeftEdge = bird.x - bird.w / 2; 

      // compare x-coordinates of player and pipes
      if (pipe.passed == false && pipeRightEdge < birdLeftEdge){
        pipe.passed = true;
        pointSound.play(); // play point sound
        score++; 
      }
    }

    // call drawScore function. scoreWidth=24,scoreHeight=36
    drawScore(width/2, 20, score, 24, 36)

    // End Game on Collision
    // note that this is checking collision against the group
    if (bird.collides(pipeGroup) || bird.collides(floor)){
      failSound.play();// play fail sound
      gameoverLabel = new Sprite(width/2, height/2, 192, 42);
      gameoverLabel.img = gameoverImg;
      gameoverLabel.layer = 100; // make the game over text come to front
      gameoverLabel.x = camera.x;

      noLoop(); 
      
      // Use setTimeout to wait 3 seconds before restarting the game
      setTimeout(() => {
        score = 0; // reset score to 0
        startGame = false; // set game state to "not started"
        
        pipeGroup.removeAll(); // remove all pipes
        bird.vel.x = 0; // stop horizontal movement
        bird.vel.y = 0; // stop falling
        bird.rotation = 0; // reset angle to upright
        bird.collider = 'static'; // freeze bird again
        bird.y = 200; // reset bird to starting height
        
        gameoverLabel.remove(); // remove "game over" label from screen
        // show the "start game" image again
        startScreenLabel.visible = true;
        startScreenLabel.x = bird.x;
        startScreenLabel.y = height / 2 - 50;

        loop(); // resume the game loop
      }, 3000); // run after 3000ms (3 seconds)
    }

    // Debug info (optional)
    fill("blue");
    textSize(14);
    text('vel.y: ' + bird.vel.y.toFixed(2), 10, 20);
    text('isMoving: ' + bird.isMoving, 10, 40);
    text('sleeping: ' + bird.sleeping , 10, 60);
    text('bird.x: ' + bird.x.toFixed(2), 10, 80);
  }
}
 
/* 
Function to create a pair of pipes
and add it to the group
*/ 
function spawnPipePair(){
  // control the gap and height of the top and bottom pipe
  let gap = 70;
  // let midY = height / 2;
  let midY = random(250, height - 250); // random(min, max)

  // create the top pipe
  topPipe = new Sprite(bird.x + 400, midY - gap / 2 - 200, 52, 320, 'static');
  topPipe.img = pipe;
  topPipe.rotation = 180;

  // Add to one pipe per pair (top or bottom)
  topPipe.passed = false; 

  // create the bottom pipe sprite
  bottomPipe = new Sprite(bird.x + 400, midY + gap / 2 + 200, 52, 320, 'static');
  bottomPipe.img = pipe;

  pipeGroup.add(topPipe);
  pipeGroup.add(bottomPipe);
  pipeGroup.layer = 0;
}

/* 
Function to draw the scores 
using sprite images
*/
function drawScore(x, y, score, digitWidth, digitHeight) {

  // Clear old digit sprites
  scoreDigits.removeAll();
  // make it a string so we can get each digit indivisually rather than a value
  let scoreStr = str(score);
  // total width taken up by all digits
  let totalWidth = scoreStr.length * digitWidth;
  // starting x coordinates
  let startX = x - totalWidth / 2;

  // loop through each digit
  for (let i = 0; i < scoreStr.length; i++) {
    // gets digit from the score string (e.g. "4" or "2")
    let digit = int(scoreStr[i]); 

    // x-position of this digit
    let xPos = startX + i * digitWidth;

    // create sprite the size of the digit image
    let digitSprite = new scoreDigits.Sprite(xPos, y, digitWidth, digitHeight); 

    //get the digit image from the array based on placement order which corresponds to the digit
    digitSprite.img = numberImages[digit]; 
  }

  // call function to keep score centered on camera
  moveGroup(scoreDigits, camera.x, 24); 
}

/* 
Function to lock the group of sprites into a specific position
*/
function moveGroup(group, targetX, spacing) {
  // E.g. 3 digits → 2 gaps → (3 - 1) * 24 = 48px
  let totalWidth = (group.length -1) * spacing;

  // Find Left-most X Position
  // Shifts the starting point left, so the entire group becomes centered
  let startX = (targetX - totalWidth/2);

  // Place Each Sprite in the Group
  for (let i = 0; i < group.length; i++) {
    group[i].x = startX + i * spacing;
  }
}