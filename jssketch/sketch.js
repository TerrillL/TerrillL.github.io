var enemy = [];
var lasers = [];
var score = 0;
var speed = 0;
var gamestate = 0;

function setup() {
  var canvas = createCanvas(300, 600);
    canvas.parent('sketch-holder');
  for (var i = 0; i < 25; i++) {
    enemy[i] = new eShip(random(width), random(height / 2), speed);
  }
  for (var l = 0; l < 0; l++) {
    lasers[l] = new laser(mouseX, height - 10);
  }
}

function draw() {
  if (gamestate == 0) {
    background(220);
    textAlign(CENTER, CENTER);
    textSize(30);
    textStyle(BOLD);
    fill(0);
    text("Click to Start", width / 2, height / 8);
    textSize(14);
    text("-Controls-", width / 2, height / 2);
    textStyle(NORMAL);
    text("Use mouse to move", width / 2, height / 2 + 15);
    text("Mousebutton = Fire", width / 2, height / 2 + 30);
    text("Spacebar = Level Increase", width / 2, height / 2 + 45);
    noLoop();


  } else if (gamestate == 1) {
    background(220);
    for (var i = 0; i < enemy.length; i++) {
      enemy[i].update();
      enemy[i].display();
      for (var j = i + 1; j < enemy.length; j++) {
        if (enemy[i].intersects(enemy[j])) {
          enemy[i].x += 1;
          enemy[j].x += -1;
          enemy[i].y += 1;
          enemy[j].y += -1;
        }
      }
    }

    ship = new starShip(mouseX, height - 10);
    ship.display();
    for (var l = 0; l < lasers.length; l++) {
      lasers[l].display();
      lasers[l].update();
    }

    for (i = 0; i < enemy.length; i++) {
      for (l = 0; l < lasers.length; l++) {
        if (lasers[l].intersects(enemy[i])) {
          enemy[i].show = false;
          lasers.splice(l, 1);
          score = score + (5 * (ceil((1 / 0.35) * speed + 1)));
        }
      }
    }

    if (35 < lasers.length) {
      lasers.splice(lasers, 1);
    }

    for (i = 0; i < enemy.length; i++) {
      if (enemy[i].show == false) {
        enemy.splice(i, 1);
      }
    }
    textSize(12);
    textStyle(BOLD);
    fill(0);
    text("Level:" + ceil(((1 / 0.35) * speed + 1)), 36, 20);
    text("Score:" + score, 36, 40);
    textStyle(NORMAL);
    for (i = 0; i < enemy.length; i++) {
      if (enemy[i].y > height) {
        gamestate = 3;
      }
    }
  } else if (gamestate == 3) {
    textAlign(CENTER, CENTER);
    textSize(30);
    textStyle(BOLD);
    fill(0);
    text("Game Over", width / 2, height / 8);
    textSize(16);
    textStyle(NORMAL);
    text("Press Spacebar to Retry", width / 2, height / 8 + 20);
    noLoop();

  }
}


function mousePressed() {

  if (gamestate == 0 && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < width) {
    gamestate = 1;
    loop();
  } else lasers.push(new laser(mouseX, height - 10));
}

function keyPressed() {
  speed = speed + 0.35;
  for (var i = 0; i < 25; i++) {
    enemy.push(new eShip(random(width), random(height / 2), speed));
  }

  if (gamestate == 3) {
    gamestate = 0;
    enemy = [];
    speed = 0;
    score = 0;
    lasers = [];
    for (var k = 0; k < 25; k++) {
      enemy.push(new eShip(random(width), random(height / 2), speed));
    }
    loop();
  }
}