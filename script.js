const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];
const colors = ["red", "yellow", "lime", "magenta", "cyan", "orange", "blue"];
const maxSize = 40;
const minSize = 0;
const mouseRadius = 60;

// Mouse position
let mouse = {
    x: null,
    y: null,
};

window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function Particle(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}

Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
};

Particle.prototype.update = function() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.directionX = -this.directionX;
    }

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;

    // Mouse interactivity
    if (
        mouse.x - this.x < mouseRadius &&
        mouse.x - this.x > -mouseRadius &&
        mouse.y - this.y < mouseRadius &&
        mouse.y - this.y > -mouseRadius
    ) {
        if (this.size < maxSize - 2) {
            this.size += 3;
        }
    } else if (this.size > minSize) {
        this.size -= 0.1;
    }
    if (this.size < 0) {
        this.size = 0;
    }
    this.draw();
};

function init() {
    particleArray = [];
    for (let i = 0; i < 1000; i++) {
        let size = 0;
        let x = Math.random() * (innerWidth - maxSize * 2) + maxSize * 2;
        let y = Math.random() * (innerHeight - maxSize * 2) + maxSize * 2;
        let directionX = Math.random() * 0.8 - 0.4;
        let directionY = Math.random() * 0.8 - 0.4;
        let color = colors[Math.floor(Math.random() * colors.length)];

        particleArray.push(
            new Particle(x, y, directionX, directionY, size, color)
        );
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}

init();
animate();

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

setInterval(() => {
    mouse.x = undefined;
    mouse.y = undefined;
}, 1000);
