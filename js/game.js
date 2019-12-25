let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

let fly = new Audio();
let scoreSound = new Audio();

fly.src = "snd/fly.mp3";
scoreSound.src = "snd/score.mp3";

let gap = 90;

//pipes
let pipe = [];
pipe[0] = {
	x : cvs.width,
	y : 0
}

let score = 0;

//bird position
let xPos = 10;
let yPos = 150;

let grav = 1.5;

const draw = () => {
	ctx.drawImage(bg, 0, 0);
	for(let i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
		
		pipe[i].x--;
		
		if(pipe[i].x == 125) {
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			});
		}
		if(pipe[i].x = 5) {
			score++;
			scoreSound.play();
		}
		if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height <= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
			location.reload()
		}
	}
	
	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);
	yPos += grav;
	ctx.fillstyle = "#000";
	ctx.font = "24px Verdana";
	ctx.fillText("Score: " + score, 10, cvs.height - 20);
	requestAnimationFrame(draw);
}
pipeBottom.onload = draw;

//click button
const moveUp = () =>  {
	yPos -= 25;
	fly.play();
}
document.addEventListener("keydown", moveUp);