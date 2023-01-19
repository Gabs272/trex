//Variables
var trex, trex_running, trex_collided;  
//
var ground, invisibleGround, groundImage;
//
var cloudImage, cloudsGroup;
//
var cactus, cactus1Img, cactus2Img, cactus3Img, cactus4Img, cactus5Img, cactus6Img, cactusGroup;
//
var gameOver, gameOverImg, gamerestart, gamerestartImg;
//
var score;
//
var PLAY = 1;
var END = 0 ;
var gameState = PLAY;

//Animacion
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png ");
  trex_collided = loadImage("trex_collided.png");
  trex_end = loadImage("trex1.png");
  //
  groundImage = loadImage("ground2.png");
  //
  cloudImage = loadImage("cloud.png");
  //
  cactus1Img = loadImage("obstacle1.png");
  cactus2Img = loadImage("obstacle2.png");
  cactus3Img = loadImage("obstacle3.png");
  cactus4Img = loadImage("obstacle4.png");
  cactus5Img = loadImage("obstacle5.png");
  cactus6Img = loadImage("obstacle6.png");
  //
  gameOverImg = loadImage("gameOver.png");
  gameResartImg = loadImage("restart.png");
 
}

//Sprites
function setup() {
 createCanvas(600, 200);
 //Trex sprites
 trex = createSprite(50,160,20,50);
 trex.addAnimation("running", trex_running);
 trex.scale = 0.5; 
 //Suelo 1 sprites  
 ground = createSprite(200,180,400,20);
 ground.addImage("ground",groundImage);
 //Suelo 2 sprites
 invisibleGround = createSprite(200,200,400,20);
 invisibleGround.visible = false;
 //
 score = 0;
 //
 cloudsGroup = new Group();
 cactusGroup = new Group();
 //
 gameOver = createSprite(200,100,400,10);
 gameOver.addImage("gameOver", gameOverImg);
 //
 gamerestart = createSprite(200,100,400,10);
 gamerestart.addImage("gameResart", gameResartImg);
 
}

//Draw
function draw() {
 background("crimson");
 text("puntuación: " + score, 500,50);

 //gameState
 if(gameState === PLAY){
   ground.velocityX = -4;
   if (ground.x < 0) {
     ground.x = ground.width / 2;
   }
   score = score + Math.round(frameCount/60);
   //
   if (keyDown("space") && trex.y >= 130) {
     trex.velocityY = -10;
   }
   trex.velocityY = trex.velocityY + 1;
   //
   spawnObstacle();
   spawnClouds();
   //
   if(cactusGroup.isTouching(trex)){
     gameState = END;
   }
 }
 else if(gameState === END){
  ground.velocityX = 0; 
  
  cactusGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
 }

 trex.collide(invisibleGround);

 drawSprites();
}

function spawnClouds(){

  if(frameCount % 60 === 0){
   cloud = createSprite(600,100,40,10);
   cloud.addImage("nubes",cloudImage);
   cloud.scale = 0.15;
   cloud.velocityX = -3;
   cloud.lifetime = 200;

   cloud.y = Math.round(random(10, 90));

   cloud.depth = trex.depth;
   trex.depth = trex.depth +1;

   cloudsGroup.add(cloud);
  }
}

function spawnObstacle(){
  if(frameCount % 80 === 0){
   cactus = createSprite(600,170.40,10);
   cactus.velocityX = -5;   
   cactus.lifetime = 120;
   cactusGroup.add(obstacles);

   var obstacles = Math.round(random(1,6));

   switch(obstacles){ 
    case 1: cactus.addImage(cactus1Img); 
     cactus.scale = 0.08;
      break; 
    case 2: cactus.addImage(cactus2Img);
     cactus.scale = 0.1;  
      break;
    case 3: cactus.addImage(cactus3Img); 
     cactus.scale = 0.13;
      break;
    case 4: cactus.addImage(cactus4Img); 
     cactus.scale = 0.05;
      break; 
    case 5: cactus.addImage(cactus5Img); 
     cactus.scale = 0.04;
      break; 
    case 6: cactus.addImage(cactus6Img); 
     cactus.scale = 0.11;
      break; 
    default: break; 
   }
  }
}