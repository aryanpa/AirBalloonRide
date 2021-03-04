const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var balloon,balloonImg;
var backgroundImg;
var database, height;
var position;

function preload(){

  backgroundImg = loadImage("Hot Air Ballon-01.png");

  balloonImg = loadImage("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");

}

function setup() {
  createCanvas(800,400);
  engine = Engine.create();
  world = engine.world;

  database = firebase.database();
 
  var balloonPosition = database.ref("balloon/height");
  balloonPosition.on("value", readPosition, errorMsg);

  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("hotairballoon", balloonImg);
  balloon.scale = balloon.scale - 0.5;


}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  fill(0);
  stroke("red");
  textSize(15);
  text("Use Arrow Keys To Move The Hot Air Balloon",30,30);

   if(keyDown(LEFT_ARROW)){
      balloon.x = balloon.x -10
    }
    else if(keyDown(RIGHT_ARROW)){
      balloon.x = balloon.x +10
    }
    else if(keyDown(UP_ARROW)){
     writePosition(0,-10);
     balloon.addAnimation("hotairballoon", balloonImg);
     balloon.scale = balloon.scale -0.1;
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+10);
     balloon.addAnimation("hotairballoon", balloonImg);
     balloon.scale = balloon.scale +0.1;
    } 

  balloon.display();


  
  drawSprites();

}

function writePosition(x,y){
  database.ref("balloon/position").set({

  'x' : balloon.x+x,
  'y' : balloon.y+y

  })
 // ball.x = ball.x + x;
 // ball.y = ball.y + y;
}

function readPosition(data){
  position = data.val();
  balloon.x = balloon.x,
  balloon.y = balloon.y


}

function errorMsg(){
  console.log("error");
}
