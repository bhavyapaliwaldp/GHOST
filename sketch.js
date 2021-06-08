var towerImg,tower;
var doorImg,door;
var doorGroup;
var climberImg,climber;
var climberGroup;
var ghostImg,ghost;
var invisibleBlockGroup,invisibleBlock;
var spookySound;
var gameState="play";

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleBlockGroup=new Group();
}

function setup (){
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1.5;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.4;
  
  

}

function draw(){
  background(0);
  
  if(gameState==="play"){
    
  
  if(tower.y>400){
    tower.y=300; 
  
  }
  
  if(keyDown("a")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("d")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
    
  }
  
  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600 ){
    ghost.destroy();
    gameState="end";
  }
    
  
 spawnDoors();
  
    
  drawSprites();
    
  }
if(gameState==="end"){
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("game over",230,250);
  
}
}

function spawnDoors(){
  if(frameCount %240===0){
    door=createSprite(200,-50);
  door.addImage("door",doorImg);
  
    climber=createSprite(200,10);
    climber.addImage("climber",climberImg);
    
    invisibleBlock=createSprite(200,50);
    invisibleBlock.widht=climber.width;
    invisibleBlock.height=2;
    
    
    door.x=Math.round(random(120,400));
    door.velocityY=1.5;
    
    climber.x=door.x;
    climber.velocityY=1.5;
    
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1.5;
    
    ghost.depth=door.depth;
    ghost.depth+=1;
    
    
     door.lifetime=800;
    climber.lifetime=800;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
  
}



