let ball;
let ballShape = "circle";
let gravity;
let mouseIsPressed = false;
let resetButton;

function setup() {
    createCanvas(800, 600);
    ball = new Ball(width/2, height/2, 20);
    gravity = createVector(0, 0.1);
    resetButton = select("#resetButton");
    resetButton.mousePressed(resetBall);
}

function draw() {
    background(255);
    ball.applyForce(gravity);
    ball.update();
    ball.display();
    if (mouseIsPressed) {
        ball.applyForce(p5.Vector.sub(mouseX, ball.position.x), p5.Vector.sub(mouseY, ball.position.y));
    }
}

function resetBall() {
    ball.position.set(width/2, height/2);
    ball.velocity.set(0, 0);
}

class Ball {
    constructor(x, y, size) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.size = size;
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.set(0, 0);
    }

    display() {
        if (ballShape === "circle") {
            ellipse(this.position.x, this.position.y, this.size, this.size);
        } else if (ballShape === "square") {
            rect(this.position.x, this.position.y, this.size, this.size);
        } else if (ballShape === "triangle") {
            triangle(this.position.x, this.position.y, this.position.x + this.size/2, this.position.y - this.size, this.position.x + this.size, this.position.y);
        }
    }
}
