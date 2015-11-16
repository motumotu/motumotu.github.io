$(function() {
    const BALL_NUM = 500;
    const BALL_SIZE = 30;
    const BALL_SPEED = 5;
    const ICON_SIZE = 300;

    var container;
    var canvas;
    var context;
    var imageBall;
    var imageIcon;
    var ballPosX;
    var ballPosY;
    var ballDireX;
    var ballDireY;
    var wait = 300;
    var queue = null;

    window.onload = function() {
        init();
        setInterval(function() {
            updatePos();
            draw();
        }, 16);    // wait time
    }

    function init() {
        container = document.getElementById("canvasContainer");
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        settingCanvas();
        initBallPos();
        loadImage();
    }
    function initBallPos() {
        ballPosX = new Array();
        ballPosY = new Array();
        ballDireX = new Array();
        ballDireY = new Array();
        for (var i = 0; i < BALL_NUM; i++) {
            ballPosX[i] = Math.floor(Math.random()*10000) % (canvas.width - BALL_SIZE);
            ballPosY[i] = Math.floor(Math.random()*10000) % (canvas.height - BALL_SIZE);
            ballDireX[i] = Math.random();
            ballDireY[i] = Math.random();
        }
    }
    function loadImage() {
        imageBall = new Image();
        imageIcon = new Image();
        imageBall.src = "image/ball.png";
        imageIcon.src = "image/icon.png";
    }
    function settingCanvas() {
        $('#canvas').attr('width', $('#canvasContainer').width());
        $('#canvas').attr('height', $('#canvasContainer').height());
    }

    function updatePos() {
        for (var i = 0; i < BALL_NUM; i++) {
            //ballPosX[i]+=5;
            ballPosX[i] += ballDireX[i] * BALL_SPEED;
            ballPosY[i] += ballDireY[i] * BALL_SPEED;
            if (ballPosX[i] < 0) {
                ballPosX[i] = 0;
                ballDireX[i] *= -1;
            }
            if (ballPosX[i] >= canvas.width - BALL_SIZE) {
                ballPosX[i] = canvas.width - BALL_SIZE;
                ballDireX[i] *= -1;
            }
            if (ballPosY[i] < 0) {
                ballPosY[i] = 0;
                ballDireY[i] *= -1;
            }
            if (ballPosY[i] >= canvas.height - BALL_SIZE) {
                ballPosY[i] = canvas.height - BALL_SIZE;
                ballDireY[i] *= -1;
            }
        }
    }
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        //context.drawImage(imageIcon, (canvas.width - ICON_SIZE) / 2, (canvas.height - ICON_SIZE) / 2);
    }
    function drawBall() {
        for (var i = 0; i < BALL_NUM; i++) {
            context.drawImage(imageBall, ballPosX[i], ballPosY[i]);
        }
    }
    window.addEventListener("resize", function() {
        clearTimeout( queue );
        queue = setTimeout(function() {
            settingCanvas();
        }, wait );
    }, false );
})

