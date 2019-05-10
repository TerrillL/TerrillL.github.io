function eShip(x, y, speed) {
  this.x = x;
  this.y = y;
  this.r = 10;
  this.show = true;
  this.speed = speed;

  this.display = function() {
    strokeWeight(2);
    if (this.show) {
      fill("red");
      ellipse(this.x, this.y, this.r, this.r);
    }
  this.intersects = function(other) {
  	var d = dist(this.x, this.y, other.x, other.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }
  }
  this.update = function() {
    this.x += random(-1 - this.speed, 1 + this.speed);
    this.y += random(-1, 1 + this.speed);
		strokeWeight(2);
    if (this.x > width) {
      this.x = width
    } else if (this.x < 0) {
      this.x = 0
    } else if (this.y < 0) {
      this.y = 0
    }
  }
}

function starShip(x, y) {
  this.x = x;
  this.y = y;
  this.r = 15


  this.display = function() {
    strokeWeight(2);
    fill("blue"); 
    ellipse(this.x, this.y, this.r, this.r);
    if (mouseX > width) {
      mouseX = width
    }
    if (mouseX < 0) {
        mouseX = 0
    }
  }
}


function laser(x, y) {
  this.x = x;
  this.y = y;
  this.length = 10;

  this.display = function() {
    strokeWeight(3);
    line(this.x, this.y, this.x, (this.y - this.length));
  }

  this.update = function() {
    strokeWeight(5);
    this.x = this.x;
    this.y = this.y - 5;
  }

  this.intersects = function(other) {
    var d = dist(this.x, this.y - this.length, other.x, other.y);
    if (d < other.r) {
      return true;
    } else {
      return false;
    }
  }
}