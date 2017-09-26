var intervalCount;
var remainingSecond;

function soundAlarm(){
	var audio= new Audio("Alan Walker - Faded-60ItHLz5WEA.m4a");
	audio.play();
	audio.loop = true;
	/*var context = new AudioContext();
	var osc = context.createOscillator();
	var vol = context.createGain();

	vol.gain.value = 0.1; // from 0 to 1, 1 full volume, 0 is muted
	osc.connect(vol); // connect osc to vol
	vol.connect(context.destination); // connect vol to context destination
	osc.start(context.currentTime + 3); // start it three seconds from now
	osc.stop(context.currentTime + 10); // stop 2 seconds after the current time */
	alert("Done!");
	audio.pause();
	}

function tick(){
	var min = Math.floor(remainingSecond/60);
	var sec = remainingSecond - min * 60;
	var display = document.getElementById("time");
	if(sec < 10){
		message = min + ":0" + sec;
	}else{
		message = min + ":" + sec;
	}
	display.innerHTML = message;
	if (remainingSecond === 0){
		soundAlarm();
		clearInterval(intervalCount);
		document.getElementById("inputArea").style.display = "block";
	}
	remainingSecond--;
}

function startCountdown(){
	var Minutes = document.getElementById("minutes").value;
	if(isNaN(Minutes)){
		alert("The given input is not a number.Just give a number !!");
		return;
	}
	remainingSecond = Minutes * 60;
	intervalCount = setInterval(tick,1000);
	document.getElementById("inputArea").style.display="none";
}

window.onload = function () {
	var text=document.createTextNode("Give a number");
	var lineBreak = document.createElement("br");
	var inputMinutes = document.createElement("input");
	inputMinutes.setAttribute("type","text");
	inputMinutes.setAttribute("id","minutes");
	inputMinutes.setAttribute("placeholder","Eg: 5");

	var startButton = document.createElement("input")
	startButton.setAttribute("type","button");
	startButton.setAttribute("value","Start Countdown");
	startButton.onclick = function() {
		startCountdown();
	};
	var inputArea = document.getElementById("inputArea");
	inputArea.appendChild(text);
	inputArea.appendChild(lineBreak);
	inputArea.appendChild(inputMinutes);
	inputArea.appendChild(startButton);
	//document.getElementById("inputArea").innerHTML = "Give a number";

};
