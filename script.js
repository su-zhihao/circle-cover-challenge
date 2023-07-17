let circles = [];
let selectedCircle = null;
let creatingCircle = false;
let circleColor;

function setup() {
    createCanvas(windowWidth, windowHeight);
    circles.push(new Circle(width / 2, height / 2, 100, color(0, 0, 255, 100)));

  // Add event listeners for the buttons and color picker
    let addButton = select('#addCircle');
    addButton.mousePressed(addCircle);
    let removeButton = select('#removeCircle');
    removeButton.mousePressed(removeCircle);
    let colorPicker = select('#colorPicker');
    colorPicker.input(pickColor);
    circleColor = color(colorPicker.value() || '#ff0000');
}

function draw() {
    background(220);
    for (let circle of circles) {
        circle.display();
    }
    if (creatingCircle) {
        let r = dist(mouseX, mouseY, pmouseX, pmouseY);
        ellipse(pmouseX, pmouseY, r * 2);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Function to add a new circle
function addCircle() {
    circles.push(new Circle(random(width), random(height), 50, circleColor));
}

// Function to remove the last added circle
function removeCircle() {
    if (circles.length > 1) {
        circles.pop();
    }
}

// Function to pick a color
function pickColor() {
    circleColor = color(this.value() || '#ff0000');
}

function mousePressed() {
    if (mouseButton === LEFT) {
        for (let circle of circles) {
            if (circle.contains(mouseX, mouseY)) {
                selectedCircle = circle;
                break;
            }
        }
        if (!selectedCircle) {
            creatingCircle = true;
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
    if (mouseButton === LEFT) {
        if (creatingCircle) {
            let r = dist(mouseX, mouseY, pmouseX, pmouseY);
            circles.push(new Circle(pmouseX, pmouseY, r, color(random(255), random(255), random(255), 100)));
            creatingCircle = false;
        }
        selectedCircle = null;
    }
}

class Circle {
    constructor(x, y, r, c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
    }

    contains(x, y) {
        let d = dist(x, y, this.x, this.y);
        return d < this.r;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    display() {
        fill(this.c);
        ellipse(this.x, this.y, this.r * 2);
    }
}