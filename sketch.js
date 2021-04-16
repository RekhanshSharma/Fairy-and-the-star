var starImg, fairyImg, bgImg;
var fairy , fairyVoice;
var star, starBody;
var gameState = 0;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("star.png");
	fairyImg = loadAnimation("fairyImage1.png","fairyImage2.png");
	bgImg = loadImage("starNight.png");
	fairyVoice = loadSound("JoyMusic.mp3");

}

function setup() {
	createCanvas(800, 750);

	fairyVoice.play();

	fairy = createSprite(130, 520);
	fairy.addAnimation("fairyflying",fairyImg);  
	fairy.scale =0.25;

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	Engine.run(engine);
	
	fairy.setCollider("rectangle",0, 0, 1000, 200);

}

function draw() {
  background(bgImg);

  drawSprites();
  if(gameState === 0){
	fairyControls();
	
  }

  if(fairy.x === 510){
	star.velocityY = 5;
	gameState = 1;
  }

  if(star.isTouching(fairy)){
	star.velocityY = 0;
  }
}
function fairyControls(){
	if(keyDown(LEFT_ARROW)){
		fairy.x = fairy.x-5;
	}
	if(keyDown(RIGHT_ARROW)){
		fairy.x = fairy.x+5;
	}
}

