let circles = [];
let selectedCircle = null;
let creatingCircle = false;
let circleColor;
let smallCircleRadius, largeCircleRadius;

function setup() {
    createCanvas(windowWidth, windowHeight);
    smallCircleRadius = select("#smallCircleRadius");
    largeCircleRadius = select("#largeCircleRadius");
    circles.push(new Circle(width / 2, height / 2, largeCircleRadius.value(), color(0, 0, 255, 100), false));

    // Add event listeners for the buttons and color picker
    let addButton = select('#addCircle');
    addButton.mousePressed(addCircle);
    let removeButton = select('#removeCircle');
    removeButton.mousePressed(removeCircle);
    let colorPicker = select('#colorPicker');
    colorPicker.input(pickColor);
    circleColor = color(colorPicker.value() || '#ff0000');
    smallCircleRadius.input(updateSmallCircleRadius);
    largeCircleRadius.input(updateLargeCircleRadius);
}

function draw() {
    background(220);
    for (let circle of circles) {
        circle.display();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Function to add a new circle
function addCircle() {
    circles.push(new Circle(random(width), random(height), smallCircleRadius.value(), circleColor));
}

// Function to update the radius of the small circles
function updateSmallCircleRadius() {
    let radius = parseInt(this.value());
    if (isNaN(radius) || radius < 10 || radius > 500) {
        alert("invalid radius. Please enter a number between 10 and 500.");
        return;
    }
    for (let i = 1; i < circles.length; i++) {
        // skip the large circle at index 0
        circles[i].setRadius(radius);
    }
}

// Function to update the radius of the target circle
function updateLargeCircleRadius() {
    let radius = parseInt(this.value());
    if (isNaN(radius) || radius < 10 || radius > 500) {
        alert("invalid radius. Please enter a number between 10 and 500.");
        return;
    }
    circles[0].setRadius(radius);
}

// Function to remove the last added circle
function removeCircle() {
    if (circles.length > 1) {
        circles.pop();
    }
}

// Function to pick a color
function pickColor() {
    circleColor = color(this.value());
}

function mousePressed() {
    if (mouseButton === LEFT) {
        for (let circle of circles) {
            if (circle.contains(mouseX, mouseY)) {
                selectedCircle = circle;
                break;
            }
        }
    }
}

function mouseDragged() {
    if (mouseButton === LEFT) {
        if (selectedCircle) {
            selectedCircle.move(mouseX, mouseY);
        }
    }
}

function mouseReleased() {
}

class Circle {
    constructor(x, y, r, c, movable = true) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
        this.movable = movable;
    }

    contains(x, y) {
        let d = dist(x, y, this.x, this.y);
        return d < this.r;
    }

    move(x, y) {
        if (this.movable) {
            this.x = x;
            this.y = y;
        }
    }

    display() {
        fill(this.c);
        ellipse(this.x, this.y, this.r * 2);
    }

    setRadius(r) {
        this.r = r;
    }
}