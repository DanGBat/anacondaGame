// GRAB THE CANVAS AND APPLY IT TO CANVAS CONSTANT
const canvas = document.getElementById('canvas');
// MAKE CTX A CONSTANT WITH ALL 2D CLASS AND METHOD FUNCTIONALITY
const ctx = canvas.getContext('2d');

// SET A SIMPLE SCALE AND DIVIDE THE CANVAS INTO ROWS AND COLUMNS
const scale = 20;
const rows = canvas.height / scale; /* 40 */
const columns = canvas.width / scale; /* 30 */

var gameSpeed = 300 /* in milliseconds */

//! BELOW HANDLES THE SNAKE AND HOW IT MOVES
var snake;

function Snake() {
    this.x = 20;
    this.y = 20;
    this.xSpeed = 1 * scale;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];

// DRAW THE SNAKE
    this.draw = function() {
        ctx.fillStyle = "green";

        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }

        ctx.fillRect(this.x, this.y, scale, scale);
    }

    this.update = function() {

        for (let i = 0; i < this.tail.length - 1; i++ ) {
            this.tail[i] = this.tail[i+1];
        }

        this.tail[this.total - 1] = { x: this.x, y: this.y};

        this.x += this.xSpeed;
        this.y += this.ySpeed;

// BELOW HANDLES IF THE SNAKE MOVES OFF THE CANVAS RESET TO OPPOSING SIDE
        if (this.x > canvas.width - scale) {
            this.x = 0;
        }
        if (this.y > canvas.height - scale) {
            this.y = 0;
        }
        if (this.x < 0) {
            this.x = canvas.width - scale;
        }
        if (this.y < 0) {
            this.y = canvas.height - scale;
        }
    }

// BELOW HANDLES THE CONTROL OF THE SNAKE DIRECTION
    this.changeDirection = function(direction) {
        switch(direction) {
            case 'Up':
                this.xSpeed = 0;
                this.ySpeed = -scale * 1;
                break;
            case 'Down':
                this.xSpeed = 0;
                this.ySpeed = scale * 1;
                break;
            case 'Left':
                this.xSpeed = -scale * 1;
                this.ySpeed = 0;
                break;
            case 'Right':
                this.xSpeed = scale * 1;
                this.ySpeed = 0;
                break;
        }
    }

    this.eat = function(fruit) {
        //console.log(fruit)
        if (this.x === fruit.x && this.y === fruit.y) {
            this.total++;
            return true;
        }
            return false;
    }
}

//! BELOW HANDLES THE SNAKE FOOD AND WHAT HAPPENS AT INTERATION

function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = Math.floor(1 + (Math.random() * (columns - 1))) * scale;
        this.y = Math.floor(1 + (Math.random() * (rows - 1))) * scale;
    }

    this.draw = function() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, scale, scale)
    }
}

(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();


    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
        console.log("Snake Eats Fruit")
        fruit.pickLocation();
        console.log(fruit);
        gameSpeed = gameSpeed - 50;
        console.log(gameSpeed);
        }

    }, gameSpeed);
}());

window.addEventListener('keydown', ((evt) => {
    // BELOW REPLACES THE DEFAULT ARROW KEY VALUES
    // BY PASSING IN AN EMPTY STRING FOR ARROW - ('Arrow Up' becomes 'Up')
    const direction = evt.key.replace('Arrow', '');
    // console.log(direction);
    snake.changeDirection(direction);
}))