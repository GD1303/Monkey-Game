var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, monkey_jumping;
var ground, groundImage, invisible_ground;
var background, backgroundImage;
var banana ,bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;

var survival_time, score;

function preload(){
  groundImage = loadImage("grass.png");
  
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  monkey_jumping = loadImage("monkey_3.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 }

function setup() {
  createCanvas(400, 400);
  
  ground = createSprite(330,346,500,20)
  ground.addImage("ground", groundImage);
  ground.scale = 0.9;
  
  monkey = createSprite(40,365)
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.13;
  
  invisible_ground = createSprite(250,405,10000,0)
  invisible_ground.scale = 0.35;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  survival_time = 0;
  score = 0;
}


function draw() {
  background("lightblue");
  
  textSize(13);
  textFont("TimesNewRoman");
  fill("black");
  text("Survival Time: " + survival_time + "s", 10,35);
  
  survival_time = survival_time + Math.round(getFrameRate()/61);
  
  textSize(13);
  textFont("TimesNewRoman");
  fill("black");
  text("Score: " + score,10,20);
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score = score + 1
  }
  
  if(gameState === PLAY){
    ground.velocityX = -3
    
    if(ground.x < 300){
      ground.x = 330;
    }
    
    if(keyDown("space") && monkey.y > 364){
      monkey.velocityY = monkey.velocityY - 15;
    }
    
    if(monkey.y > 364){
      monkey.addImage("jumping", monkey_jumping)
    }
    
    //console.log(monkey.y)
    //console.log(getFrameRate())
    
    monkey.velocityY = monkey.velocityY + 0.6;
    
    bananas();
    obstacles();
  
  }
  
  invisible_ground.visible = false;
  
  monkey.collide(invisible_ground);
  
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  
  if(gameState === END){
    monkey.destroy();
    
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    
    ground.velocityX = 0;
    
    textSize(60);
    textFont("Algerian");
    textAlign(CENTER);
    fill("black");
    text("GAME OVER",200,200);
    
    survival_time = 0;
    score = 0;
  }
  
  drawSprites();
}

function bananas(){
 if (frameCount % 80 === 0){
   var banana = createSprite(500,Math.round(random(200,300)),10,40);
   banana.addImage(bananaImage);
   banana.scale = 0.1;
   banana.velocityX = -5;
   banana.lifetime = -1;
   
   bananaGroup.add(banana);
    }
}

function obstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(500,370,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.2;
   obstacle.velocityX = -5;
   obstacle.lifetime = -1;
   
   obstacle.setCollider("circle",0,0,200)
   obstacle.debug = false;
   
   obstacleGroup.add(obstacle);
    }
}
