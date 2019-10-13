var can = document.getElementById('canvas1'); 
var ctx = can.getContext('2d'); 
can.width = 1280; 
can.height = 720; 

var img = new Image(); 
img.src = "images/bgsubte.png"; 

var runningImage = new Image();
runningImage.src = "images/runningsp.png";

var subeImage = new Image();
subeImage.src = "images/sube.png";

var jumpingImage = new Image();
jumpingImage.src = "images/jumpingspsubte.png";

var subteImage = new Image();
subteImage.src = "images/subte.png";


///BACKGROUND
var imgW = can.width;
var scrollSpeed = 5;
var count = 0;
var score = 0;
var jumpCount = 0; 
var manY = 400;
var subteW = 0;

//running
var rwidth = 700;
    rheight = 152,
    rnumberOfFrames = 7,
    rticksPerFrame = 2,
    rframeIndex = 0,
    rtickCount = 0;

function run(){
    imgW -= scrollSpeed;
    score += count*scrollSpeed/2;
    count++;
    updater();
    manY = 400;
}

var jwidth = 500;
    jheight = 148,
    jnumberOfFrames = 5,
    jticksPerFrame = 10,
    jframeIndex = 0,
    jtickCount = 0,
    jumping = false;

function updatej(){
    jtickCount +=1;
    if (jtickCount > jticksPerFrame){
        jtickCount = 0;
        if (jframeIndex < jnumberOfFrames - 1) {    
            jframeIndex += 1;
        } else {
            jframeIndex = 0;
        }
    }
    
}

function jump(){
    jumping = true;
}

function updater(){
    rtickCount +=1;
    if (rtickCount > rticksPerFrame){
        rtickCount = 0;
        if (rframeIndex < rnumberOfFrames - 1) {    
            rframeIndex += 1;
        } else {
            rframeIndex = 0;
        }
    }   
}

document.getElementById("canvas1").addEventListener("click", run);
document.getElementById("saltar").onclick = jump;


window.onload = function() { 

    var obstacles = [];
    var rand;
    var timeLeft = 15;
    var continueGame = true;
    var subteEntrando = false;

    function isColliding(obstacle,manY){
        if (manY == 250 && 90<obstacle.x && obstacle.x<170){
            return true;
        }
        return false;
    }

    function dropObstacle(){
        rand = Math.floor(Math.random() * 3);
        if (rand == 0){
            var sube = {image: subeImage, x:1560, y:200};
            obstacles.push(sube);
        }
    }

    function changeTime(){
        timeLeft--;
    }

    var obstacleInterval = setInterval(dropObstacle, 5000);
    var timeInterval = setInterval(changeTime, 1000);

    function loop(){

        if(timeLeft == 0){
            subteEntrando = true;
        }


        if(continueGame){

        // draw bg images 
            ctx.drawImage(img, imgW, 0); 
            ctx.drawImage(img, imgW - can.width, 0); 
            if (imgW <= 0) 
                imgW = can.width; 

            if (count == 6) {
                scrollSpeed += 2;
                count = 0;
            }


            if(jumping){
                if(jumpCount > (jticksPerFrame*jnumberOfFrames)){
                        jumping = false;
                        running = true;
                        jumpCount = 0;
                        jframeIndex = 0;
                }
                jumpCount += 1;
                switch(jframeIndex){
                    case 0:
                        manY = 350;
                        break;
                    case 1:
                        manY = 300;
                        break;
                    case 2:
                        manY = 250;
                        break;
                    case 3:
                        manY = 300;
                        break;
                    case 4:
                        manY = 400;
                        break;
                }
                ctx.drawImage(jumpingImage,jframeIndex * jwidth / jnumberOfFrames, 0, jwidth / jnumberOfFrames, jheight, 100, manY, jwidth / jnumberOfFrames,jheight);
                updatej();
            } else {
                ctx.drawImage(runningImage,rframeIndex * rwidth / rnumberOfFrames, 0, rwidth / rnumberOfFrames, rheight, 100, manY, rwidth / rnumberOfFrames, rheight);
            }

            document.getElementById('score').innerHTML = 'Puntaje: '+score+'     Tiempo: '+timeLeft;


            for (var j = obstacles.length - 1; j >= 0; j--) {
                ctx.drawImage(obstacles[j].image, obstacles[j].x, obstacles[j].y,100,70);
                obstacles[j].x -= 5;

                if(isColliding(obstacles[j], manY)){
                    score += 100;
                    timeLeft++;
                    obstacles[j].x = -1;
                }

                if (obstacles[j].x < 0) {
                    obstacles.pop();
                }

            }

            if(subteEntrando){
                ctx.drawImage(img, imgW, 0); 
                ctx.drawImage(subteImage, subteW - can.width, 0);
                clearInterval(timeInterval);
                clearInterval(obstacleInterval);
                if (subteW < can.width){
                   subteW += 4;
                }
                else{
                    if(score >= 600){
                        $('#myModalWin').modal('show');
                    }
                    else{
                        $('#myModalLose').modal('show');
                }
                continueGame = false
                }
            }


            window.requestAnimationFrame(loop); 
        }
    } 
  
    loop(); 
  
} 

