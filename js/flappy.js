// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = -1;
var labelScore;
var player;
var gap = game.rnd.integerInRange(1, 5);
var pipes = [];
var gapSize = 100;
var gapMargin = 50;
var blockHeight = 50;
var pipeEndHeight = 25;
var pipeEndExtraWidth = 10;
var gameGravity = 200;
var g = 50;
var foxsay1 = false;
balloons = [];
weight = [];


/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("playerImg", "../assets/37954223818723.563294d96a5c4.png");
game.load.image("clouds", "../assets/clouuud.png");
game.load.audio("score", "../assets/point.ogg");
game.load.audio("die", "../assets/Balloon Popping-SoundBible.com-1247261379.wav");
game.load.image("flappybird", "../assets/flappy-cropped.png");
game.load.image("smolfox", "../assets/smol_fox.png");
game.load.image("pipeBlock","../assets/pipe_bark.png");
game.load.image("pipeEnd","../assets/pipe-end.png");
game.load.image("smolfoxdead", "../assets/smol_fox_dead.png");
game.load.image("balloons","../assets/balloons2.png");
game.load.image("weight","../assets/badcloud.png");

game.load.image("smol_fox_blue","../assets/smol_fox_blue.png");
game.load.image("smol_fox_green","../assets/smol_fox_green.png");
game.load.image("smol_fox_purple","../assets/smol_fox_purple.png");
game.load.image("smol_fox_pink","../assets/smol_fox_pink.png");
game.load.image("key","../assets/bgm.jpg");
game.load.audio("foxsay", "../assets/foxfoxfox.wav");
game.load.audio("gulp", "../assets/Mario_Jumping-Mike_Koenig-989896458.wav");
game.load.audio("splat", "../assets/Splat-SoundBible.com-1826190667.wav");
}

/*
 * Initialises the game. This function is only called once.
 */

 //create
function create() {
//if (foxsay1 === false){
sound = game.sound.play("foxsay");
//foxsay1 = true;
//}

  game.physics.startSystem(Phaser.Physics.ARCADE);
 game.add.text(40, 200, "don't die", {font: "30px Futura", fill: "#666666"});
  game.add.sprite(20,20, "clouds");
  player = game.add.sprite(100, 200, "smolfox");
  game.physics.arcade.enable(player);
  game.stage.setBackgroundColor("#99FFCC");
  Background = game.add.sprite(0,0, "key");
  splashDisplay = game.add.text(100,200, "Press ENTER to start, SPACEBAR OR N to jump", {font: "30px sans-serif", fill: "#666666"});

  game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(start);


}
//end of create


function start() {
sound.destroy();
sound = game.sound.play("foxsay");
splashDisplay.destroy();
Background.destroy();

game.stage.setBackgroundColor("#99FFCC");
game.add.sprite(40,20, "playerImg");
game.add.sprite(300,40, "playerImg");

game.add.sprite(450,20, "clouds");
//game.add.text(40, 200, "don't die", {font: "30px Futura", fill: "#666666"});
//decor
game.input
.onDown
.add(clickHandler);
//add clouds
game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(playerJump);
game.input.keyboard.addKey(Phaser.Keyboard.N)
    .onDown.add(playerJump);
//game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
//    .onDown.add(changefox);
game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.remove(start);
//sound
labelScore = game.add.text(20, 20, "0", {font: "30px Futura", fill: "#666666"});
game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
                   .onDown.add(moveRight);
game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
                    .onDown.add(moveLeft);
game.input.keyboard.addKey(Phaser.Keyboard.UP)
                    .onDown.add(moveUp);
game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
                    .onDown.add(moveDown);
    // set the background colour of the scene
generatePipe();

//player.body.velocity.x = 50;
player.body.gravity.y = 200;
var pipeInterval = 2.00 * Phaser.Timer.SECOND;
game.time.events.loop(pipeInterval,generate);

player.anchor.setTo(0.5, 0.5);
}


/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(
      player,
    pipes,
    gameOver);
if (player.y >400) {gameOver();}

if (player.y < 0){player.y = 0;}
player.rotation = Math.atan(player.body.velocity.y / 200);

for(var i = balloons.length - 1; i >= 0; i--){

    game.physics.arcade.overlap(player, balloons[i], function(){
      changeGravity(-50);
      game.sound.play("gulp");
      balloons[i].destroy();
      balloons.splice(i, 1);
    });
  }for(var i = weight.length - 1; i >= 0; i--){

      game.physics.arcade.overlap(player, weight[i], function(){
        game.sound.play("splat");
        changeGravity(50);
        weight[i].destroy();
        weight.splice(i, 1);
      });
    }
  if(score >= 5 && 10>score){change1();}
  if(score >= 10 && 15 >score){change2();}
  if(score>=15 && 20>score){change3();}
  if(score>=15 && 20>score){change4();}
}
//end of update


/*
function changefox() {
  player = game.add.sprite(100, 200, "smolfoxdead");
}
*/

function clickHandler(event) {
     game.add.sprite(event.x, event.y, "clouds");
}


function changeScore() {
    score = score + 1;
    labelScore.setText(score.toString());
}

function moveLeft() {
		player.x -= 10;
}
function moveRight() {
	player.x += 10;
}
function moveUp() {
		player.y -= 10;
}
function moveDown() {
		player.y += 10;
}


function generatePipe() {
  height = 400;
  width = 790;
  changeScore();
  var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);

    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart - pipeEndHeight);
    for(var y = gapStart - pipeEndHeight; y > 0; y -= blockHeight) {
        addPipeBlock(width, y - blockHeight);
    }

    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize);
    for(var y = gapStart + gapSize + pipeEndHeight; y < height; y += blockHeight) {
        addPipeBlock(width, y);
    }
}

function addPipeBlock(x, y) {
    // create a new pipe block
    var block = game.add.sprite(x,y,"pipeBlock");
    // insert it in the 'pipes' array
    game.physics.arcade.enable(block);
    block.body.velocity.x = -200;
    pipes.push(block);
/*
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -10;
*/
}
function addPipeEnd(x,y){
  //create new pipe end
  var end = game.add.sprite(x,y,"pipeEnd");
    end.bringToTop();
  //insert it in the 'pipes' array
  game.physics.arcade.enable(end);
  end.body.velocity.x= -200;
  //end.scale.x = 2;
  pipes.push(end);


}


function playerJump() {
    player.body.velocity.y = -120;
    game.sound.play("score");




}


function gameOver(){
  //game.load.image("pipeBlock","../assets/imagesevil.jpg");
  game.add.text(0, 50, "dead", {font: "400px Futura", fill: "#FF0000"});
     game.sound.play("die");
    registerScore(score);
    sound.destroy();
  game.state.restart();
    //location.reload();
 score = -1;
 gameGravity = 200;
}

function changeGravity(g) {
    gameGravity += g;
    player.body.gravity.y = gameGravity;
}

function generateBalloons(){
    var bonus = game.add.sprite(width, height, "balloons");
    balloons.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - 200;
    bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);
}
function generateWeight(){
    var bonus = game.add.sprite(width, 0, "weight");
    weight.push(bonus);
    game.physics.enable(bonus);
    bonus.body.velocity.x =  - 200;
    bonus.body.velocity.y = game.rnd.integerInRange(60, 100);
}

function generate() {
    var diceRoll = game.rnd.integerInRange(1, 10);
    if(diceRoll==1) {
        generateBalloons();
    } else if(diceRoll==2) {
        generateWeight();
    } else {
        generatePipe();
    }
}

function change1() {
player.loadTexture("smol_fox_green", 0);
}
function change2() {
player.loadTexture("smol_fox_blue", 0);
}
function change3() {
player.loadTexture("smol_fox_purple", 0);
}
function change4() {
player.loadTexture("smol_fox_pink", 0);
}
