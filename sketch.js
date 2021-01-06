
var dog,dogimg,dogimg1
var database
var foods,foodstock

function preload() {
  dogimg=loadImage("images/dogImg.png")
  dogimg1=loadImage("images/dogImg1.png")
}
function setup() {
  database = firebase.database()

  createCanvas(500,500);

  dog=createSprite(250,300,150,150)
  dog.addImage(dogimg)
  dog.scale=0.15

  foodstock = database.ref('Food').on("value", (data =>{
    foods = data.val()
  }))

  textSize(20)  
}
function draw() {  
  background(46,139,87)
  if(keyWentDown(UP_ARROW)){
    writestock(foods)
    dog.addImage(dogimg1)
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foods,170,200);
  textSize(13);
  text("Note: Press Up Arrow Key To Feed Drago Milk!",130,10,300,20);
}
function writestock(x){
  var x;
  if(x <= 0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food: x
  })
}