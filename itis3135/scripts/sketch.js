let x, y;
let xspeed, yspeed;
let diameter = 50;

function setup() {
    let canvas = createCanvas(800, 400);
    canvas.parent('canvas-container');
    
    x = width/2;
    y = height/2;
    xspeed = 2.5;
    yspeed = 2;
    
    background(240); 
}

function draw() {
    background(240); 
    x += xspeed;
    y += yspeed;
    
    if (x > width - diameter/2 || x < diameter/2) {
        xspeed *= -1;
    }
    if (y > height - diameter/2 || y < diameter/2) {
        yspeed *= -1;
    }
    
    fill(50, 120, 80); 
    stroke(30, 70, 50); 
    strokeWeight(2);
    ellipse(x, y, diameter, diameter);
    
    if (frameCount % 60 === 0) { 
        diameter = random(40, 60); 
    }
}