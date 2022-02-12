$(function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var ballRadius = 4;

    var x = canvas.width / 2;
    var y = canvas.height - 30;

    var dx = 1;
    var dy = -1;

    var paddleHeight = 5;
    var paddleWidth = 70;

    var paddleX = (canvas.width - paddleWidth) / 2;
    var paddleY = (canvas.height - paddleHeight);

    var rightPressed = false;
    var leftPressed = false;

    var brickNbColumn = 5;
    var brickNbRow = 3;
    var brickWidth = 50;
    var brickHeight = 10;
    var brickPadding = 5;
    var brickOffsetTop = 15;
    var brickOffsetLeft = 15;

    var score = 0;
    var lives = 3;

    var bricks = [];
    for (var row = 0; row < brickNbRow; row++) {
        bricks[row] = [];
        for (var col = 0; col < brickNbColumn; col++) {
            bricks[row][col] = {
                x: 0,
                y: 0,
                status: 1
            };
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }

    function keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }

    function collisionDetection() {
        for (var row = 0; row < brickNbRow; row++) {
            for (var col = 0; col < brickNbColumn; col++) {
                var b = bricks[row][col];
                if (b.status == 1) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if (score == brickNbColumn * brickNbRow) {
                            alert("YOU WIN, CONGRATS!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgb(236, 17, 127)";
        ctx.fill();
        ctx.strokeStyle = "purple";
        ctx.stroke();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
        ctx.fillStyle = "rgb(236, 17, 127)";
        ctx.fill();
        ctx.strokeStyle = "purple";
        ctx.stroke();
        ctx.closePath();
    }

    function drawBricks() {
        for (var row = 0; row < brickNbRow; row++) {
            for (var col = 0; col < brickNbColumn; col++) {
                if (bricks[row][col].status == 1) {
                    var brickX = (col * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[row][col].x = brickX;
                    bricks[row][col].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "rgb(236, 17, 127)";
                    ctx.fill();
                    ctx.strokeStyle = "purple";
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    function drawScore() {
        ctx.fillStyle = "rgb(236, 17, 127)";
        ctx.fill();
        ctx.strokeStyle = "purple";
        ctx.stroke();
        ctx.fillText("Score: " + score, 60, 10);
    }

    function drawLives() {
        ctx.fillStyle = "rgb(236, 17, 127)";
        ctx.fill();
        ctx.strokeStyle = "purple";
        ctx.stroke();
        ctx.fillText("Vie: " + lives, 15, 10);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            } else {
                lives--;
                if (!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 1;
                    dy = -1;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 5;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 5;
        }

        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }

    draw();
});