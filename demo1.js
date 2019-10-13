var can = document.getElementById('canvas1');
var ctx = can.getContext('2d');
can.width = 1280;
can.height = 720;

var canWidth = 1280;

var img = new Image();
img.src = "images/bgciudad.png";

var runningImage = new Image();
runningImage.src = "images/runningsp.png";

var jumpingImage = new Image();
jumpingImage.src = "images/jumpingsp.png";

var deadImage = new Image();
deadImage.src = "images/dead.png";

//OBSTACLES IMAGES

var vallaImage = new Image();
vallaImage.src = "images/vallas.png";

var tachoImage = new Image();
tachoImage.src = "images/tacho.png";

var macetaImage = new Image();
macetaImage.src = "images/maceta.png";

var pozoImage = new Image();
pozoImage.src = "images/pozo.png";

var entradaSubteImage = new Image();
entradaSubteImage.src = "images/entrada-subte.png";


window.onload = function(){
	///BACKGROUND
	var imgW = can.width;
	var scrollSpeed = 4;
	///

	///SPRITES RELATED

	//running
	var rwidth = 700;
		rheight = 142,
		rnumberOfFrames = 7,
		rticksPerFrame = 10,
		rframeIndex = 0,
		rtickCount = 0;

	//jumping
	var jwidth = 700;
		jheight = 148,
		jnumberOfFrames = 7,
		jticksPerFrame = 15,
		jframeIndex = 0,
		jtickCount = 0;

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

	var rand;

	function dropObstacle(){

		rand = Math.floor(Math.random() * 4);

		if (rand == 0){
			var obstacle = {image: tachoImage, x: canWidth, y:530, width:130, height:115};
		}
		if(rand == 1){ 
			var obstacle = {image: vallaImage, x: canWidth, y:550, width:150, height:120};
		}
		if(rand == 2){
			var obstacle = {image: pozoImage, x: canWidth, y:530, width:120, height:145};
		}
		if(rand == 3){
			var obstacle = {image: macetaImage, x: canWidth, y:540, width:60, height:95};
		}
	
		obstacles.push(obstacle);

	}

	function dropEnd(){
		var obstacle = {image: entradaSubteImage, x: canWidth, y:300, width:200, height: 330};
		obstacles.push(obstacle);
	}

    ////

    ///EVENTS

    document.getElementById("canvas1").addEventListener("click", changeState); 

    function changeState(e){
    	running = false;
    	jumping = true;
    }

	function increaseSpeed(){
		scrollSpeed+=1; 
	}

	var man;
    function isColliding(obstacle,man){
    	// Esto chequea eje x
    	if(man.x > obstacle.x && man.x+15 < obstacle.x+obstacle.width || man.x + man.width - 15 > obstacle.x && man.x + man.width < obstacle.x + obstacle.width){
    		// Ahora chequear eje y
    		if(man.y + man.height >= obstacle.y) {
    			return true;
    		}else{
				score += 2;
    		}

    	}
		return false;
	}
/*
	function modalWin(){
		won = true;
		running = false;
		sliding = false;
		dead = false;
	}
*/
    ///
    var obstacles = [];
    var running = true;
    var jumping = false;
    var sliding = false;
    var dead = false;
    var won = false;
    var jumpCount = 0;
    var droptime = 3200;
    var speedtime = 10000;
    var endTime = 24000;
    var score = 0;

	var dropInterval = setInterval(dropObstacle, droptime);
	var speedInterval = setInterval(increaseSpeed,speedtime);
	//var endInterval = setInterval(modalWin, endTime+2000); 
	var entradaSubteInterval = setInterval(dropEnd, endTime);
	var manY;

	/// MAIN LOOP
	function loop(){
		ctx.drawImage(img, imgW, 0);
		ctx.drawImage(img, imgW - can.width, 0);
		imgW -= scrollSpeed;
		if (imgW <= 0){
			imgW = can.width;
		}
		document.onkeydown = changeState;

		if(running){
			// img sx sy sw sh dx dy dw dh
			ctx.drawImage(runningImage,rframeIndex * rwidth / rnumberOfFrames, 0, rwidth / rnumberOfFrames, rheight, 100, 500, rwidth / rnumberOfFrames, rheight);
			manY = 500;
			manW = rwidth / rnumberOfFrames;
			manH = rheight;
			updater();
		
		}else if(jumping){
			// img sx sy sw sh dx dy dw dh
			if(jumpCount > (jticksPerFrame*jnumberOfFrames)){
				jumping = false;
				running = true;
				jumpCount = 0;
				jframeIndex = 0;
			}
			jumpCount += 1;

			switch(jframeIndex){
				case 0:
					manY = 500;
					ctx.drawImage(jumpingImage,jframeIndex * jwidth / jnumberOfFrames, 0, jwidth / jnumberOfFrames, jheight, 100, manY, jwidth / jnumberOfFrames,jheight);
					break;
				case 1:
					manY = 380;
					ctx.drawImage(jumpingImage,jframeIndex * jwidth / jnumberOfFrames, 0, jwidth / jnumberOfFrames, jheight, 100, manY, jwidth / jnumberOfFrames,jheight);
					break;
				case 2:
					manY = 320;
					ctx.drawImage(jumpingImage,jframeIndex * jwidth / jnumberOfFrames, 0, jwidth / jnumberOfFrames, jheight, 100, manY, jwidth / jnumberOfFrames,jheight);
					break;
				case 3:
					manY = 300;
					ctx.drawImage(jumpingImage,jframeIndex * jwidth / jnumberOfFrames, 0, jwidth / jnumberOfFrames, jheight, 100, manY, jwidth / jnumberOfFrames,jheight);
					break;
				case 4:
					manY = 320;
					ctx.drawImage(jumpingImage,jframeIndex * jwidth / jnumberOfFrames, 0, jwidth / jnumberOfFrames, jheight, 100, manY, jwidth / jnumberOfFrames,jheight);
					break;
				case 5:
					manY = 380;
					ctx.drawImage(jumpingImage,jframeIndex * jwidth / jnumberOfFrames, 0, jwidth / jnumberOfFrames, jheight, 100, manY, jwidth / jnumberOfFrames,jheight);
					break;
				case 6:
					manY = 500;
					ctx.drawImage(jumpingImage,jframeIndex * jwidth / jnumberOfFrames, 0, jwidth / jnumberOfFrames, jheight, 100, manY, jwidth / jnumberOfFrames,jheight);
					break;
			}
			manW = jwidth / jnumberOfFrames;
			manH = jheight;
			updatej();


		}else if(dead){
			//clearInterval(endInterval);
			clearInterval(dropInterval);
			clearInterval(speedInterval);
			scrollSpeed = 0;
			ctx.drawImage(deadImage, 0,0,480,266,100,580,200,110);
			$('#myModalLose').modal('show');

		}else if(won){
			scrollSpeed = 0;
			clearInterval(dropInterval);
			clearInterval(speedInterval);
			for (var j = obstacles.length - 1; j >= 0; j--) {
				obstacles.pop();
			}
			ctx.drawImage(runningImage,rframeIndex * rwidth / rnumberOfFrames, 0, rwidth / rnumberOfFrames, rheight, 100, 500, rwidth / rnumberOfFrames, rheight);

			$('#myModalWin').modal('show');

		}


		 //hitbox del jugador
/*		ctx.rect(100, manY, manW, manH);
		ctx.stroke();
		*/

		man = {x: 100, y: manY, width: manW,height: manH};
		for (var j = obstacles.length - 1; j >= 0; j--) {
			ctx.drawImage(obstacles[j].image, obstacles[j].x, obstacles[j].y, obstacles[j].width, obstacles[j].height);
			obstacles[j].x -= scrollSpeed;

			//hitbox obstaculo
/*			ctx.rect(obstacles[j].x, obstacles[j].y, obstacles[j].width, obstacles[j].height);
			ctx.stroke();*/

			if(isColliding(obstacles[j], man)){
				if(obstacles[j].y == 300){ //es la entrada al subte
					won = true;
					running = false;
					sliding = false;
					dead = false;
				}
				else{
					obstacles.pop();
					dead = true;
					jumping = false;
					running = false;
				}
			}

			//revisar si anda lento x no hacerles pop

		}
		document.getElementById('score').innerHTML = "Puntaje: "+score;

		window.requestAnimationFrame(loop);
	}

	loop();
}